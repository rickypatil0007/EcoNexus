import { NewCalculator } from "@/features/carbon-blueprint/components/new-calculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carbon Blueprint | EcoNexus",
  description: "Calculate your monthly carbon footprint.",
};

export default function BlueprintPage() {
  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto py-8">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
          Advanced Carbon Blueprint
        </h1>
        <p className="text-base text-gray-400">
          Powered by Climatiq. Answer a few questions to generate your highly accurate personalized environmental profile.
        </p>
      </div>

      <NewCalculator />
    </div>
  );
}
