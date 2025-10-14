-- Create schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS "user";

-- Create table
CREATE TABLE "user".user_role (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL,
    role text NOT NULL
    permissions jsonb DEFAULT '{}'
);
