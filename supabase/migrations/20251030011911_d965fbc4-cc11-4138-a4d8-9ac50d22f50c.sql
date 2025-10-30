-- Add 'franchisee' value to new_user_role enum
ALTER TYPE new_user_role ADD VALUE IF NOT EXISTS 'franchisee';