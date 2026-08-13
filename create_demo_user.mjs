import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ghtamdppbuobiecoteax.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdodGFtZHBwYnVvYmllY290ZWF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5ODY2ODksImV4cCI6MjEwMTU2MjY4OX0.kGRPqKhhNFwGY52-caxKfhtYge7gL6nDjrke6lNQQ0w';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createDemoUser() {
  console.log("Attempting to sign up demo user...");
  const { data, error } = await supabase.auth.signUp({
    email: 'demo@econexus.com',
    password: 'password123',
    options: {
      data: {
        full_name: 'Demo User'
      }
    }
  });

  if (error) {
    console.error("SignUp Error:", error.message);
  } else {
    console.log("SignUp Success! Data:", data);
  }
}

createDemoUser();
