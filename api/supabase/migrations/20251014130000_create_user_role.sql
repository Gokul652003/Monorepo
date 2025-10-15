CREATE SCHEMA IF NOT EXISTS "user";

CREATE TABLE "user".user_role (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL,
    role text NOT NULL,
    permissions jsonb DEFAULT '{}',
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp NULL
);
