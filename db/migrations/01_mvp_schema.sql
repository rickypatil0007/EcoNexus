-- ==========================================
-- EcoNexus MVP Database Schema Migration
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. Profiles Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name VARCHAR(255),
    sustainability_level VARCHAR(100) DEFAULT 'Beginner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS: Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = user_id);
-- Insert is usually handled via Trigger upon signup, or explicitly by user.
CREATE POLICY "Users can insert their own profile" 
    ON public.profiles FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- 2. Carbon Records Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.carbon_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    total_emission FLOAT NOT NULL,
    transport_emission FLOAT NOT NULL DEFAULT 0,
    energy_emission FLOAT NOT NULL DEFAULT 0,
    food_emission FLOAT NOT NULL DEFAULT 0,
    waste_emission FLOAT NOT NULL DEFAULT 0,
    assessment_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS: Carbon Records
ALTER TABLE public.carbon_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own carbon records" 
    ON public.carbon_records FOR SELECT 
    USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own carbon records" 
    ON public.carbon_records FOR INSERT 
    WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own carbon records" 
    ON public.carbon_records FOR DELETE 
    USING (auth.uid() = user_id);


-- ==========================================
-- 3. Challenges Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    points INTEGER NOT NULL DEFAULT 10,
    category VARCHAR(100),
    difficulty VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS: Challenges (Public read, admin write)
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Challenges are viewable by everyone" 
    ON public.challenges FOR SELECT 
    TO authenticated
    USING (true);
-- We assume only service_role (admins) can create/update challenges for MVP


-- ==========================================
-- 4. User Challenges (Progress Tracking)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.user_challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed')),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, challenge_id) -- A user can only take a challenge once simultaneously
);

-- RLS: User Challenges
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own challenge progress" 
    ON public.user_challenges FOR SELECT 
    USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own challenge progress" 
    ON public.user_challenges FOR INSERT 
    WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own challenge progress" 
    ON public.user_challenges FOR UPDATE 
    USING (auth.uid() = user_id);


-- ==========================================
-- 5. Chat History Table (AI Memory)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.chat_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    message TEXT NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('user', 'assistant')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS: Chat History
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own chat history" 
    ON public.chat_history FOR SELECT 
    USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own chat history" 
    ON public.chat_history FOR INSERT 
    WITH CHECK (auth.uid() = user_id);


-- ==========================================
-- 6. Automate Profile Creation on Signup (Trigger)
-- ==========================================
-- Create a function to automatically create a user profile upon signing up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name, sustainability_level)
    VALUES (new.id, new.raw_user_meta_data->>'full_name', 'Beginner');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==========================================
-- Seed Data: Sample Challenges for MVP
-- ==========================================
INSERT INTO public.challenges (title, description, points, category, difficulty)
VALUES 
    ('Meatless Monday', 'Skip meat for an entire day to reduce your carbon and water footprint.', 50, 'Food', 'Easy'),
    ('Public Transit Commute', 'Use public transportation instead of driving a personal vehicle.', 100, 'Transport', 'Medium'),
    ('Zero Single-Use Plastic', 'Avoid all single-use plastics for an entire week.', 200, 'Waste', 'Hard'),
    ('Energy Fast', 'Turn off all non-essential lights and electronics for 4 hours during the evening.', 75, 'Energy', 'Easy')
ON CONFLICT DO NOTHING;
