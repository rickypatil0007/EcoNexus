export default function EcoForestLoading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="h-8 w-48 bg-[#2a2a2a] rounded"></div>
        <div className="h-4 w-96 bg-[#2a2a2a] rounded"></div>
      </div>

      <div className="h-[600px] w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl"></div>
    </div>
  );
}
