export default function ChallengesLoading() {
  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto py-4 animate-pulse">
      <div className="mb-8 flex flex-col gap-2">
        <div className="h-8 w-48 bg-[#2a2a2a] rounded"></div>
        <div className="h-4 w-96 bg-[#2a2a2a] rounded"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-48 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}
