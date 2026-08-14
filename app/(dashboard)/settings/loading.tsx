export default function SettingsLoading() {
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto py-8 animate-pulse">
      <div className="mb-8 flex flex-col gap-2">
        <div className="h-8 w-48 bg-[#2a2a2a] rounded"></div>
        <div className="h-4 w-96 bg-[#2a2a2a] rounded"></div>
      </div>

      <div className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl h-[400px]"></div>
    </div>
  );
}
