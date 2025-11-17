-- Fix get_max_devices_for_tariff to use correct column name
CREATE OR REPLACE FUNCTION public.get_max_devices_for_tariff(p_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_subscription_tier TEXT;
  v_max_devices INTEGER := 1; -- По умолчанию для бесплатных тарифов
BEGIN
  -- Получаем текущий тариф пользователя из профиля
  SELECT subscription_tier::TEXT INTO v_subscription_tier
  FROM public.profiles
  WHERE user_id = p_user_id;
  
  -- Определяем максимальное количество устройств на основе тарифа
  CASE 
    WHEN v_subscription_tier IN ('premium', 'business', 'enterprise') THEN
      v_max_devices := 5;
    WHEN v_subscription_tier IN ('standard', 'professional', 'pro') THEN
      v_max_devices := 2;
    ELSE
      v_max_devices := 1;
  END CASE;
  
  RETURN v_max_devices;
END;
$function$;