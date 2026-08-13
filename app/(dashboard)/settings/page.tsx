import { getPreferencesAction } from "@/actions/settings";
import { SettingsForm } from "@/features/dashboard/components/settings-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | EcoNexus",
  description: "Manage your personal preferences and AI settings.",
};

export default async function SettingsPage() {
  const prefs = await getPreferencesAction();

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
          Profile & Settings
        </h1>
        <p className="text-sm text-gray-400">
          Customize your EcoNexus experience, including language, AI communication style, and challenges.
        </p>
      </div>

      <div className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Preferences</h2>
        <SettingsForm initialPreferences={prefs} />
      </div>
    </div>
  );
}
