-- 03_rls_policies.sql
-- Master Migration for Row Level Security (RLS) and Performance Indexes

-- 1. Enable RLS on core tables (ensure they are enabled if they were disabled before)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE carbon_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to prevent conflicts during migration
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

DROP POLICY IF EXISTS "Users can view their own carbon records" ON carbon_records;
DROP POLICY IF EXISTS "Users can insert their own carbon records" ON carbon_records;
DROP POLICY IF EXISTS "Users can update their own carbon records" ON carbon_records;

DROP POLICY IF EXISTS "Challenges are viewable by everyone" ON challenges;

DROP POLICY IF EXISTS "Users can view their own challenges" ON user_challenges;
DROP POLICY IF EXISTS "Users can insert their own challenges" ON user_challenges;
DROP POLICY IF EXISTS "Users can update their own challenges" ON user_challenges;

DROP POLICY IF EXISTS "Users can view their own achievements" ON user_achievements;
DROP POLICY IF EXISTS "Users can view their own rewards" ON user_rewards;
DROP POLICY IF EXISTS "Users can view their own activities" ON activities;

-- 3. Profiles Policies
CREATE POLICY "Users can view their own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- 4. Carbon Records Policies
CREATE POLICY "Users can view their own carbon records" 
ON carbon_records FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own carbon records" 
ON carbon_records FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own carbon records" 
ON carbon_records FOR UPDATE 
USING (auth.uid() = user_id);

-- 5. Challenges Policies
-- Challenges themselves are globally visible
CREATE POLICY "Challenges are viewable by everyone" 
ON challenges FOR SELECT 
USING (true);

-- 6. User Challenges Policies
CREATE POLICY "Users can view their own challenges" 
ON user_challenges FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own challenges" 
ON user_challenges FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own challenges" 
ON user_challenges FOR UPDATE 
USING (auth.uid() = user_id);

-- 7. Activities Policies
CREATE POLICY "Users can view their own activities" 
ON activities FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activities" 
ON activities FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 8. User Achievements & Rewards
CREATE POLICY "Users can view their own achievements" 
ON user_achievements FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own rewards" 
ON user_rewards FOR SELECT 
USING (auth.uid() = user_id);

-- 9. Performance Indexes (High-read foreign keys)
CREATE INDEX IF NOT EXISTS idx_profiles_id ON profiles(id);
CREATE INDEX IF NOT EXISTS idx_carbon_records_user_id ON carbon_records(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenges_user_id ON user_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenges_challenge_id ON user_challenges(challenge_id);
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_rewards_user_id ON user_rewards(user_id);
