-- ==========================================
-- EcoNexus Database Performance Migration
-- Adding missing indexes on foreign keys to prevent sequential scans
-- ==========================================

-- 1. Profiles Table
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);

-- 2. Carbon Records Table
CREATE INDEX IF NOT EXISTS idx_carbon_records_user_id ON public.carbon_records(user_id);

-- 3. User Challenges Table
CREATE INDEX IF NOT EXISTS idx_user_challenges_user_id ON public.user_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenges_challenge_id ON public.user_challenges(challenge_id);
-- Also index status since we query by status = 'active'
CREATE INDEX IF NOT EXISTS idx_user_challenges_status ON public.user_challenges(status);

-- 4. Chat History Table
CREATE INDEX IF NOT EXISTS idx_chat_history_user_id ON public.chat_history(user_id);

-- 5. Activities Table
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON public.activities(user_id);

-- 6. Preferences Table
CREATE INDEX IF NOT EXISTS idx_preferences_user_id ON public.preferences(user_id);

-- 7. Sustainability Goals Table
CREATE INDEX IF NOT EXISTS idx_sustainability_goals_user_id ON public.sustainability_goals(user_id);

-- 8. User Achievements Table
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON public.user_achievements(user_id);

-- 9. User Rewards Table
CREATE INDEX IF NOT EXISTS idx_user_rewards_user_id ON public.user_rewards(user_id);

-- 10. Carbon Reduction History Table
CREATE INDEX IF NOT EXISTS idx_carbon_reduction_history_user_id ON public.carbon_reduction_history(user_id);
