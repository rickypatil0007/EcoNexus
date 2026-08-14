export default function OrganizationLoading() {
  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto py-8 animate-pulse">
      <div className="mb-8 flex flex-col gap-2">
        <div className="h-8 w-64 bg-[#2a2a2a] rounded"></div>
        <div className="h-4 w-96 bg-[#2a2a2a] rounded"></div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl h-32"></div>
          ))}
        </div>

        <div className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl h-64"></div>
      </div>
    </div>
  );
}
