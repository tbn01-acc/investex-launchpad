-- Функция для очистки устаревших токенов восстановления пароля
CREATE OR REPLACE FUNCTION clean_expired_password_reset_tokens()
RETURNS void AS $$
BEGIN
    DELETE FROM password_reset_requests 
    WHERE expires_at < NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Создание расписания для автоматической очистки (каждый час)
-- Примечание: В реальной среде это лучше настроить через cron job или scheduled function
COMMENT ON FUNCTION clean_expired_password_reset_tokens() IS 'Функция для очистки просроченных токенов восстановления пароля. Рекомендуется запускать каждый час.';