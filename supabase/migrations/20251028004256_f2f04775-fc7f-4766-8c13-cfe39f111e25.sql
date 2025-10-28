-- Создание таблицы для хранения цифровых отпечатков устройств
CREATE TABLE IF NOT EXISTS public.device_fingerprints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  fingerprint_hash TEXT NOT NULL,
  device_info JSONB,
  browser_info TEXT,
  ip_address TEXT,
  is_authorized BOOLEAN NOT NULL DEFAULT false,
  last_seen_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  authorized_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, fingerprint_hash)
);

-- Создание таблицы для активных сессий
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  fingerprint_id UUID NOT NULL REFERENCES public.device_fingerprints(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL UNIQUE,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_activity_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '7 days'),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.device_fingerprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- RLS политики для device_fingerprints
CREATE POLICY "Users can view their own device fingerprints"
ON public.device_fingerprints
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own device fingerprints"
ON public.device_fingerprints
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own device fingerprints"
ON public.device_fingerprints
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own device fingerprints"
ON public.device_fingerprints
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- RLS политики для user_sessions
CREATE POLICY "Users can view their own sessions"
ON public.user_sessions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions"
ON public.user_sessions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions"
ON public.user_sessions
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions"
ON public.user_sessions
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Функция для получения максимального количества устройств на основе тарифа
CREATE OR REPLACE FUNCTION public.get_max_devices_for_tariff(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_tariff TEXT;
  v_max_devices INTEGER := 1; -- По умолчанию для бесплатных тарифов
BEGIN
  -- Получаем текущий тариф пользователя из профиля
  SELECT tariff INTO v_tariff
  FROM public.profiles
  WHERE user_id = p_user_id;
  
  -- Определяем максимальное количество устройств
  CASE 
    WHEN v_tariff IN ('Премиум', 'Элитный', 'Масштаб', 'Синдикат', 'Партнер', 'Стратегический') THEN
      v_max_devices := 5;
    WHEN v_tariff IN ('Профи', 'Профессионал', 'Рост', 'Клуб', 'Поиск', 'Продвинутый', 'Агентство', 'Сертифицированный', 'Премиум', 'Консультант', 'Бизнес-консультант', 'Сениор') THEN
      v_max_devices := 2;
    WHEN v_tariff IN ('Администратор', 'Сотрудник', 'Партнер', 'Амбассадор', 'Блогер') THEN
      v_max_devices := 2;
    ELSE
      v_max_devices := 1;
  END CASE;
  
  RETURN v_max_devices;
END;
$$;

-- Функция для проверки и регистрации устройства
CREATE OR REPLACE FUNCTION public.check_and_register_device(
  p_fingerprint_hash TEXT,
  p_device_info JSONB,
  p_browser_info TEXT,
  p_ip_address TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_max_devices INTEGER;
  v_authorized_devices INTEGER;
  v_fingerprint_id UUID;
  v_requires_authorization BOOLEAN := false;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'User not authenticated'
    );
  END IF;
  
  -- Получаем максимальное количество устройств для тарифа пользователя
  v_max_devices := get_max_devices_for_tariff(v_user_id);
  
  -- Проверяем, есть ли уже такое устройство
  SELECT id INTO v_fingerprint_id
  FROM public.device_fingerprints
  WHERE user_id = v_user_id 
    AND fingerprint_hash = p_fingerprint_hash;
  
  IF v_fingerprint_id IS NOT NULL THEN
    -- Устройство уже зарегистрировано, обновляем last_seen_at
    UPDATE public.device_fingerprints
    SET last_seen_at = now(),
        ip_address = p_ip_address
    WHERE id = v_fingerprint_id;
    
    -- Проверяем, авторизовано ли устройство
    SELECT is_authorized INTO v_requires_authorization
    FROM public.device_fingerprints
    WHERE id = v_fingerprint_id;
    
    RETURN jsonb_build_object(
      'success', true,
      'fingerprint_id', v_fingerprint_id,
      'requires_authorization', NOT v_requires_authorization
    );
  END IF;
  
  -- Проверяем количество уже авторизованных устройств
  SELECT COUNT(*) INTO v_authorized_devices
  FROM public.device_fingerprints
  WHERE user_id = v_user_id 
    AND is_authorized = true;
  
  -- Если достигнут лимит устройств, требуется авторизация
  IF v_authorized_devices >= v_max_devices THEN
    -- Регистрируем устройство как неавторизованное
    INSERT INTO public.device_fingerprints (
      user_id, 
      fingerprint_hash, 
      device_info, 
      browser_info, 
      ip_address,
      is_authorized
    ) VALUES (
      v_user_id, 
      p_fingerprint_hash, 
      p_device_info, 
      p_browser_info, 
      p_ip_address,
      false
    ) RETURNING id INTO v_fingerprint_id;
    
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Device limit reached',
      'max_devices', v_max_devices,
      'requires_authorization', true,
      'fingerprint_id', v_fingerprint_id
    );
  END IF;
  
  -- Регистрируем новое устройство как авторизованное
  INSERT INTO public.device_fingerprints (
    user_id, 
    fingerprint_hash, 
    device_info, 
    browser_info, 
    ip_address,
    is_authorized,
    authorized_at
  ) VALUES (
    v_user_id, 
    p_fingerprint_hash, 
    p_device_info, 
    p_browser_info, 
    p_ip_address,
    true,
    now()
  ) RETURNING id INTO v_fingerprint_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'fingerprint_id', v_fingerprint_id,
    'requires_authorization', false
  );
END;
$$;

-- Функция для авторизации устройства
CREATE OR REPLACE FUNCTION public.authorize_device(p_fingerprint_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_max_devices INTEGER;
  v_authorized_devices INTEGER;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'User not authenticated');
  END IF;
  
  -- Проверяем, принадлежит ли устройство пользователю
  IF NOT EXISTS (
    SELECT 1 FROM public.device_fingerprints
    WHERE id = p_fingerprint_id AND user_id = v_user_id
  ) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Device not found');
  END IF;
  
  -- Получаем лимит устройств
  v_max_devices := get_max_devices_for_tariff(v_user_id);
  
  -- Считаем уже авторизованные устройства
  SELECT COUNT(*) INTO v_authorized_devices
  FROM public.device_fingerprints
  WHERE user_id = v_user_id AND is_authorized = true;
  
  IF v_authorized_devices >= v_max_devices THEN
    RETURN jsonb_build_object(
      'success', false, 
      'error', 'Device limit reached',
      'max_devices', v_max_devices
    );
  END IF;
  
  -- Авторизуем устройство
  UPDATE public.device_fingerprints
  SET is_authorized = true,
      authorized_at = now()
  WHERE id = p_fingerprint_id;
  
  RETURN jsonb_build_object('success', true);
END;
$$;

-- Функция для деавторизации устройства
CREATE OR REPLACE FUNCTION public.revoke_device_authorization(p_fingerprint_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'User not authenticated');
  END IF;
  
  -- Проверяем, принадлежит ли устройство пользователю
  IF NOT EXISTS (
    SELECT 1 FROM public.device_fingerprints
    WHERE id = p_fingerprint_id AND user_id = v_user_id
  ) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Device not found');
  END IF;
  
  -- Удаляем все активные сессии для этого устройства
  UPDATE public.user_sessions
  SET is_active = false
  WHERE fingerprint_id = p_fingerprint_id;
  
  -- Деавторизуем устройство
  UPDATE public.device_fingerprints
  SET is_authorized = false
  WHERE id = p_fingerprint_id;
  
  RETURN jsonb_build_object('success', true);
END;
$$;

-- Функция для завершения сессии
CREATE OR REPLACE FUNCTION public.terminate_session(p_session_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'User not authenticated');
  END IF;
  
  -- Проверяем, принадлежит ли сессия пользователю
  IF NOT EXISTS (
    SELECT 1 FROM public.user_sessions
    WHERE id = p_session_id AND user_id = v_user_id
  ) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Session not found');
  END IF;
  
  -- Завершаем сессию
  UPDATE public.user_sessions
  SET is_active = false
  WHERE id = p_session_id;
  
  RETURN jsonb_build_object('success', true);
END;
$$;

-- Создание индексов для оптимизации
CREATE INDEX IF NOT EXISTS idx_device_fingerprints_user_id ON public.device_fingerprints(user_id);
CREATE INDEX IF NOT EXISTS idx_device_fingerprints_hash ON public.device_fingerprints(fingerprint_hash);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_active ON public.user_sessions(is_active) WHERE is_active = true;