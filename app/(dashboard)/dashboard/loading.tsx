export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-4 w-32 bg-[#2a2a2a] rounded"></div>
        <div className="h-8 w-48 bg-[#2a2a2a] rounded"></div>
        <div className="h-4 w-64 bg-[#2a2a2a] rounded"></div>
      </div>

      {/* Top Row Skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="h-64 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl"></div>
        <div className="h-64 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl"></div>
        <div className="h-64 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl"></div>
      </div>

      {/* Bottom Row Skeleton */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="h-80 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl"></div>
        <div className="h-80 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl"></div>
        <div className="h-80 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl"></div>
      </div>
    </div>
  );
}
