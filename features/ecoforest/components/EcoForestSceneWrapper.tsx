
"use client";
import dynamic from "next/dynamic";

const EcoForestScene = dynamic(() => import("./EcoForestScene").then((mod) => mod.EcoForestScene), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-black/40 border border-white/10 rounded-2xl relative overflow-hidden">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#2ED47A] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-eco-text-muted">Loading environment...</p>
      </div>
    </div>
  )
});

export function EcoForestSceneWrapper(props: any) {
  return <EcoForestScene {...props} />;
}

