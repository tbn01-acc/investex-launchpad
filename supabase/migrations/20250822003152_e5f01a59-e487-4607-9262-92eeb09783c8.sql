-- Добавляем роль суперадминистратора в enum (отдельная транзакция)
ALTER TYPE user_role ADD VALUE 'superadmin';