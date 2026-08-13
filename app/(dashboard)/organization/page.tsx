import { getOrganizationMetricsAction } from "@/actions/org";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organization | EcoNexus",
  description: "Enterprise and CSR environmental metrics.",
};

export default async function OrganizationPage() {
  const result = await getOrganizationMetricsAction();

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
          Organization Dashboard
        </h1>
        <p className="text-sm text-gray-400">
          Track employee engagement, carbon reduction, and CSR metrics across your organization.
        </p>
      </div>

      {result.error ? (
        <div className="p-6 bg-[#0a0a0a] border border-red-500/30 rounded-2xl text-center">
          <p className="text-red-400 font-medium">{result.error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl">
              <h3 className="text-gray-400 text-sm font-medium mb-1">Total Active Members</h3>
              <p className="text-3xl font-bold text-white">{result.metrics?.totalMembers}</p>
            </div>
            <div className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl">
              <h3 className="text-gray-400 text-sm font-medium mb-1">Total Carbon Reduced (kg)</h3>
              <p className="text-3xl font-bold text-[#2ED47A]">{result.metrics?.carbonReducedKg}</p>
            </div>
            <div className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl">
              <h3 className="text-gray-400 text-sm font-medium mb-1">Active Eco Campaigns</h3>
              <p className="text-3xl font-bold text-[#69E5FF]">{result.metrics?.activeCampaigns}</p>
            </div>
          </div>

          <div className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Department Impact</h2>
            <div className="space-y-4">
              {result.metrics?.departmentStats.map((dept, idx) => (
                <div key={idx} className="flex justify-between items-center pb-4 border-b border-[#1a1a1a] last:border-0 last:pb-0">
                  <span className="text-white font-medium">{dept.name}</span>
                  <span className="text-[#2ED47A] font-bold">{dept.reduction} kg CO2e</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
