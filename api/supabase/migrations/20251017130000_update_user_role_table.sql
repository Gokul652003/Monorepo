-- Migration: Add auth_id, trigger, RLS policies

-- 1️⃣ Add auth_id column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'user' 
          AND table_name = 'user_role' 
          AND column_name = 'auth_id'
    ) THEN
        ALTER TABLE "user".user_role
        ADD COLUMN auth_id uuid;
    END IF;
END$$;

-- 2️⃣ Add foreign key constraint
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints
        WHERE table_schema = 'user' 
          AND table_name = 'user_role' 
          AND constraint_name = 'fk_auth_user'
    ) THEN
        ALTER TABLE "user".user_role
        ADD CONSTRAINT fk_auth_user
        FOREIGN KEY (auth_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END$$;

-- 3️⃣ Function to auto-update updated_at
CREATE OR REPLACE FUNCTION "user".set_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating updated_at
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.triggers
        WHERE event_object_table = 'user_role'
          AND trigger_name = 'update_user_role_timestamp'
    ) THEN
        CREATE TRIGGER update_user_role_timestamp
        BEFORE UPDATE ON "user".user_role
        FOR EACH ROW
        EXECUTE FUNCTION "user".set_updated_at();
    END IF;
END$$;

-- 4️⃣ Function to handle new user signup with role from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user_with_metadata()
RETURNS trigger AS $$
DECLARE
    user_role text;
BEGIN
    user_role := (NEW.raw_user_meta_data ->> 'role');

    IF user_role NOT IN ('owner', 'admin', 'guest') THEN
        user_role := 'guest';
    END IF;

    INSERT INTO "user".user_role (auth_id, email, role)
    VALUES (NEW.id, NEW.email, user_role);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5️⃣ Trigger on auth.users table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.triggers
        WHERE event_object_table = 'users'
          AND trigger_name = 'on_auth_user_created'
    ) THEN
        CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW
        EXECUTE FUNCTION public.handle_new_user_with_metadata();
    END IF;
END$$;

-- 6️⃣ Enable Row-Level Security
ALTER TABLE "user".user_role ENABLE ROW LEVEL SECURITY;

-- 7️⃣ Policy: Users can view their own record
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE schemaname = 'user'
          AND tablename = 'user_role'
          AND policyname = 'Users_can_view_self'
    ) THEN
        CREATE POLICY "Users_can_view_self"
        ON "user".user_role
        FOR SELECT
        USING (auth.uid() = auth_id);
    END IF;
END$$;


CREATE POLICY "Admins_can_view_all"
ON "user".user_role
FOR SELECT
USING (
    auth.uid() IN (
        SELECT auth_id FROM "user".user_role WHERE role = 'admin'
    )
);

CREATE POLICY "Admins_can_update_all"
ON "user".user_role
FOR UPDATE
USING (
    auth.uid() IN (
        SELECT auth_id FROM "user".user_role WHERE role = 'admin'
    )
);