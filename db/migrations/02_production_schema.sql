-- ==========================================
-- EcoNexus Production Database Schema Migration
-- Run this in your Supabase SQL Editor
-- ==========================================

-- 1. Profiles Table Updates
-- Add green_points to track user's eco score and unlock EcoForest features
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS green_points INTEGER DEFAULT 0;

-- 2. Challenges Table Updates
-- Add is_active flag to support the UI queries
ALTER TABLE public.challenges 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- 3. User Challenges Table Updates
-- Add points_earned for reward history
ALTER TABLE public.user_challenges 
ADD COLUMN IF NOT EXISTS points_earned INTEGER DEFAULT 0;

-- 4. Carbon Records Table Updates
-- Align the table with the Next.js API actions
ALTER TABLE public.carbon_records 
ADD COLUMN IF NOT EXISTS month VARCHAR(20),
ADD COLUMN IF NOT EXISTS score INTEGER,
ADD COLUMN IF NOT EXISTS breakdown JSONB;
