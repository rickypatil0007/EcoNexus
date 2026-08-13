-- ==========================================
-- EcoNexus Schema Alignment Migration
-- Brings the live DB in sync with types/database.ts
-- ==========================================


-- ==========================================
-- 1. profiles — align columns
-- ==========================================

-- Rename full_name → display_name
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='full_name') THEN
    ALTER TABLE public.profiles RENAME COLUMN full_name TO display_name;
  END IF;
END $$;

-- Drop old column that no longer exists in types
ALTER TABLE public.profiles
  DROP COLUMN IF EXISTS sustainability_level;

-- Add missing columns
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS avatar_url       TEXT,
  ADD COLUMN IF NOT EXISTS role             TEXT NOT NULL DEFAULT 'individual'
                                            CHECK (role IN ('individual', 'college', 'ngo', 'csr')),
  ADD COLUMN IF NOT EXISTS bio              TEXT,
  ADD COLUMN IF NOT EXISTS location         TEXT,
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS green_points     INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS streak_days      INTEGER NOT NULL DEFAULT 0;

-- Update the auto-create-profile trigger to populate new columns
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    user_id,
    display_name,
    role,
    onboarding_completed,
    green_points,
    streak_days
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    'individual',
    false,
    0,
    0
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ==========================================
-- 2. carbon_records — replace flat columns with typed JSONB
-- ==========================================

-- Drop old flat emission columns
ALTER TABLE public.carbon_records
  DROP COLUMN IF EXISTS total_emission,
  DROP COLUMN IF EXISTS transport_emission,
  DROP COLUMN IF EXISTS energy_emission,
  DROP COLUMN IF EXISTS food_emission,
  DROP COLUMN IF EXISTS waste_emission;

-- Rename assessment_date → created_at
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='carbon_records' AND column_name='assessment_date') THEN
    ALTER TABLE public.carbon_records RENAME COLUMN assessment_date TO created_at;
  END IF;
END $$;

-- Add new typed columns
ALTER TABLE public.carbon_records
  ADD COLUMN IF NOT EXISTS total_kg_co2e  FLOAT        NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS breakdown      JSONB        NOT NULL DEFAULT '{"transportation":0,"energy":0,"food":0,"waste":0,"shopping":0,"other":0}'::jsonb,
  ADD COLUMN IF NOT EXISTS score          FLOAT        NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS month          VARCHAR(7),   -- e.g. "2026-08"
  ADD COLUMN IF NOT EXISTS calculated_at  TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());


-- ==========================================
-- 3. challenges — rename points + add missing columns
-- ==========================================

-- Rename points → points_reward
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='challenges' AND column_name='points') THEN
    ALTER TABLE public.challenges RENAME COLUMN points TO points_reward;
  END IF;
END $$;

-- Add missing columns
ALTER TABLE public.challenges
  ADD COLUMN IF NOT EXISTS estimated_impact_kg FLOAT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS duration_days       INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS is_active           BOOLEAN NOT NULL DEFAULT true;

-- Update the 4 existing seed rows with sensible defaults
UPDATE public.challenges SET
  estimated_impact_kg = CASE title
    WHEN 'Meatless Monday'         THEN 2.5
    WHEN 'Public Transit Commute'  THEN 3.2
    WHEN 'Zero Single-Use Plastic' THEN 1.8
    WHEN 'Energy Fast'             THEN 1.2
    ELSE 1.0
  END,
  duration_days = CASE title
    WHEN 'Meatless Monday'         THEN 1
    WHEN 'Public Transit Commute'  THEN 1
    WHEN 'Zero Single-Use Plastic' THEN 7
    WHEN 'Energy Fast'             THEN 1
    ELSE 1
  END,
  difficulty = LOWER(difficulty),
  is_active = true
WHERE title IN (
  'Meatless Monday',
  'Public Transit Commute',
  'Zero Single-Use Plastic',
  'Energy Fast'
);


-- ==========================================
-- 4. user_challenges — add missing columns + fix status check
-- ==========================================

-- Drop old CHECK constraint and recreate with 'abandoned' added
ALTER TABLE public.user_challenges
  DROP CONSTRAINT IF EXISTS user_challenges_status_check;

ALTER TABLE public.user_challenges
  ADD CONSTRAINT user_challenges_status_check
    CHECK (status IN ('active', 'completed', 'abandoned'));

-- Add missing columns
ALTER TABLE public.user_challenges
  ADD COLUMN IF NOT EXISTS started_at      TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  ADD COLUMN IF NOT EXISTS proof_image_url TEXT,
  ADD COLUMN IF NOT EXISTS points_earned   INTEGER NOT NULL DEFAULT 0;


-- ==========================================
-- 5. chat_history — rename message → content
-- ==========================================

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='chat_history' AND column_name='message') THEN
    ALTER TABLE public.chat_history RENAME COLUMN message TO content;
  END IF;
END $$;


-- ==========================================
-- Done ✅
-- ==========================================
