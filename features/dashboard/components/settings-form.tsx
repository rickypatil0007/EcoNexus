"use client";

import { useState } from "react";
import { savePreferencesAction } from "@/actions/settings";
import { CheckCircle2, Loader2 } from "lucide-react";

export function SettingsForm({ initialPreferences }: { initialPreferences: any }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      language: formData.get("language") as string,
      communicationStyle: formData.get("communicationStyle") as string,
      challengeDifficulty: formData.get("challengeDifficulty") as string,
    };

    const res = await savePreferencesAction(data);
    if (res.success) {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Preferred Language</label>
          <select 
            name="language" 
            defaultValue={initialPreferences?.preferred_language || "en"}
            className="w-full bg-[#111] border border-[#222] text-white p-3 rounded-xl focus:border-[#69E5FF] focus:ring-1 focus:ring-[#69E5FF] outline-none transition-all"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">AI Coach Communication Style</label>
          <select 
            name="communicationStyle" 
            defaultValue={initialPreferences?.communication_style || "casual"}
            className="w-full bg-[#111] border border-[#222] text-white p-3 rounded-xl focus:border-[#69E5FF] focus:ring-1 focus:ring-[#69E5FF] outline-none transition-all"
          >
            <option value="casual">Casual & Encouraging</option>
            <option value="formal">Formal & Educational</option>
            <option value="direct">Direct & Action-Oriented</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Challenge Difficulty Preference</label>
          <select 
            name="challengeDifficulty" 
            defaultValue={initialPreferences?.challenge_difficulty || "medium"}
            className="w-full bg-[#111] border border-[#222] text-white p-3 rounded-xl focus:border-[#69E5FF] focus:ring-1 focus:ring-[#69E5FF] outline-none transition-all"
          >
            <option value="easy">Easy (Beginner)</option>
            <option value="medium">Medium (Intermediate)</option>
            <option value="hard">Hard (Advanced)</option>
          </select>
        </div>
      </div>

      <div className="pt-4 flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[#69E5FF] text-black font-semibold hover:bg-[#4ddbff] disabled:opacity-50 transition-colors flex items-center justify-center min-w-[140px] rounded-xl"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Save Settings"}
        </button>

        {success && (
          <div className="flex items-center text-[#2ED47A] text-sm font-medium animate-in fade-in slide-in-from-left-2">
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            Preferences Saved
          </div>
        )}
      </div>
    </form>
  );
}
