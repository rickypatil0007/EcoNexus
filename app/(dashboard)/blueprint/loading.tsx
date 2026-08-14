export default function BlueprintLoading() {
  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto py-8 animate-pulse">
      <div className="mb-12 text-center max-w-2xl mx-auto flex flex-col items-center gap-4">
        <div className="h-10 w-3/4 bg-[#2a2a2a] rounded"></div>
        <div className="h-5 w-full bg-[#2a2a2a] rounded"></div>
      </div>

      <div className="h-96 w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl"></div>
    </div>
  );
}
