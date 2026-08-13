-- ==========================================
-- EcoNexus Production Tables Migration
-- Creates missing tables from database.md
-- ==========================================

-- 1. Preferences Table
CREATE TABLE IF NOT EXISTS public.preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    notification_time VARCHAR(50),
    preferred_language VARCHAR(50) DEFAULT 'en',
    communication_style VARCHAR(50) DEFAULT 'casual',
    challenge_difficulty VARCHAR(50) DEFAULT 'medium'
);

ALTER TABLE public.preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own preferences" ON public.preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own preferences" ON public.preferences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own preferences" ON public.preferences FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 2. Activities (carbon_activities)
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    activity_type VARCHAR(255) NOT NULL,
    activity_value FLOAT NOT NULL,
    carbon_impact FLOAT NOT NULL,
    activity_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Policies for activities are in 03_rls_policies.sql

-- 3. Carbon Reduction History
CREATE TABLE IF NOT EXISTS public.carbon_reduction_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    previous_carbon FLOAT NOT NULL,
    current_carbon FLOAT NOT NULL,
    reduction_amount FLOAT NOT NULL,
    reduction_percentage FLOAT NOT NULL,
    recorded_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.carbon_reduction_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own reduction history" ON public.carbon_reduction_history FOR SELECT USING (auth.uid() = user_id);

-- 4. Sustainability Goals
CREATE TABLE IF NOT EXISTS public.sustainability_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    goal_type VARCHAR(255) NOT NULL,
    target_value FLOAT NOT NULL,
    target_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'in-progress'
);

ALTER TABLE public.sustainability_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own goals" ON public.sustainability_goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own goals" ON public.sustainability_goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own goals" ON public.sustainability_goals FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. User Achievements
CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    achievement_name VARCHAR(255) NOT NULL,
    description TEXT,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Policies for user_achievements are in 03_rls_policies.sql

-- 6. User Rewards
CREATE TABLE IF NOT EXISTS public.user_rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    reward_name VARCHAR(255) NOT NULL,
    points_cost INTEGER NOT NULL,
    redeemed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Policies for user_rewards are in 03_rls_policies.sql

-- 7. RBAC Tables (Roles & Permissions)
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS public.permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    permission_name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS public.role_permissions (
    role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES public.permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- Basic RBAC Policies (Only admins can write, everyone can read roles)
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Roles are viewable by everyone" ON public.roles FOR SELECT USING (true);
CREATE POLICY "Permissions are viewable by everyone" ON public.permissions FOR SELECT USING (true);
CREATE POLICY "Role_permissions are viewable by everyone" ON public.role_permissions FOR SELECT USING (true);
