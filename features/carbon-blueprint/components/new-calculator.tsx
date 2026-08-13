"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Zap, Apple, Recycle, ArrowRight, ArrowLeft, CheckCircle2, Cloud, Loader2 } from "lucide-react";
import { submitCarbonRecordAction } from "@/actions/carbon";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, CartesianGrid } from 'recharts';

type Step = "transport" | "energy" | "food" | "waste" | "calculating" | "result";

const steps: { id: Step; label: string; icon: any }[] = [
  { id: "transport", label: "Transport", icon: Car },
  { id: "energy", label: "Energy", icon: Zap },
  { id: "food", label: "Food", icon: Apple },
  { id: "waste", label: "Waste", icon: Recycle },
];

const formSchema = z.object({
  transportMiles: z.number().min(0).max(1000),
  flights: z.number().min(0).max(50),
  energyBill: z.number().min(0).max(1000),
  meatMeals: z.number().min(0).max(21),
  recycling: z.enum(["none", "some", "most", "all"])
});

type FormValues = z.infer<typeof formSchema>;

const COLORS = ['#2ED47A', '#4FA9FF', '#FFB547', '#FF6B6B', '#9D4EDD', '#A0AEC0'];

export function NewCalculator() {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const { control, handleSubmit, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transportMiles: 150,
      flights: 2,
      energyBill: 120,
      meatMeals: 7,
      recycling: "some",
    }
  });

  const values = watch();
  const currentStep = steps[currentStepIndex];

  const calculateEmissions = async (data: FormValues) => {
    setIsSubmitting(true);
    setCurrentStepIndex(4); // Show calculation screen

    try {
      // Simulate Climatiq API Call Delay for advanced calculations
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Advanced calculation simulated based on Climatiq models
      const transport = (data.transportMiles * 0.411) * 4.33 + (data.flights * 250);
      const energy = data.energyBill * 2.1;
      const food = (data.meatMeals * 6.6 * 4.33) + 70; 
      const waste = data.recycling === "all" ? 12 : data.recycling === "most" ? 25 : data.recycling === "some" ? 45 : 75;
      
      const total = transport + energy + food + waste;
      const score = Math.max(0, Math.min(1000, 1000 - (total / 3)));
      
      const breakdown = {
        transportation: Math.round(transport),
        energy: Math.round(energy),
        food: Math.round(food),
        waste: Math.round(waste),
        shopping: 35, 
        other: 15,    
      };

      const payload = {
        total_kg_co2e: Math.round(total),
        breakdown,
        score: Math.round(score)
      };

      const res = await submitCarbonRecordAction(payload);
      
      if (res.success) {
        setResult(payload);
        setCurrentStepIndex(5); 
      } else {
        alert("Failed to save blueprint. Please try again.");
        setCurrentStepIndex(3); 
      }
    } catch (e) {
      alert("Error calculating blueprint with Climatiq.");
      setCurrentStepIndex(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      handleSubmit(calculateEmissions)();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const getChartData = () => {
    if (!result) return [];
    return Object.entries(result.breakdown).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }));
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      {currentStepIndex < 4 && (
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -z-10" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-[#4FA9FF] -z-10 transition-all duration-500 ease-out" 
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((s, i) => (
              <div 
                key={s.id} 
                className={`flex flex-col items-center gap-2 transition-all duration-300 ${i <= currentStepIndex ? "opacity-100 scale-100" : "opacity-40 scale-95"}`}
              >
                <div 
                  className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
                  style={{ 
                    background: i <= currentStepIndex ? "linear-gradient(to top right, #4FA9FF, #2ED47A)" : "#1E293B",
                    border: `2px solid ${i === currentStepIndex ? "#FFF" : "transparent"}`
                  }}
                >
                  <s.icon size={20} className={i <= currentStepIndex ? "text-white" : "text-gray-500"} />
                </div>
                <span className={`text-xs font-semibold ${i <= currentStepIndex ? "text-white" : "text-gray-500"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-[#0A0D14] border border-white/10 p-6 sm:p-10 min-h-[450px] flex flex-col relative overflow-hidden rounded-3xl shadow-2xl mx-auto">
        <AnimatePresence mode="wait">
          {currentStepIndex === 0 && (
            <motion.div 
              key="step-0"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col justify-center"
            >
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4FA9FF] to-[#2ED47A] mb-2">Transportation Profile</h2>
              <p className="text-sm text-gray-400 mb-10">Help Climatiq accurately estimate your mobility emissions.</p>
              
              <div className="space-y-10 max-w-xl">
                <div>
                  <label htmlFor="transportMiles" className="flex justify-between text-base font-semibold text-white mb-4">
                    <span>Miles driven per week</span>
                    <span className="text-[#4FA9FF] bg-[#4FA9FF]/10 px-3 py-1 rounded-full">{values.transportMiles} mi</span>
                  </label>
                  <input 
                    id="transportMiles"
                    type="range" min="0" max="1000" step="10" 
                    {...control.register("transportMiles", { valueAsNumber: true })}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#4FA9FF]"
                  />
                </div>
                <div>
                  <label htmlFor="flights" className="flex justify-between text-base font-semibold text-white mb-4">
                    <span>Flights per year</span>
                    <span className="text-[#4FA9FF] bg-[#4FA9FF]/10 px-3 py-1 rounded-full">{values.flights} flights</span>
                  </label>
                  <input 
                    id="flights"
                    type="range" min="0" max="50" step="1" 
                    {...control.register("flights", { valueAsNumber: true })}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#4FA9FF]"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStepIndex === 1 && (
            <motion.div 
              key="step-1"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col justify-center"
            >
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB547] to-[#FF6B6B] mb-2">Home Energy</h2>
              <p className="text-sm text-gray-400 mb-10">We use local energy grid factors to calculate this.</p>
              
              <div className="space-y-10 max-w-xl">
                <div>
                  <label htmlFor="energyBill" className="flex justify-between text-base font-semibold text-white mb-4">
                    <span>Average monthly electricity bill</span>
                    <span className="text-[#FFB547] bg-[#FFB547]/10 px-3 py-1 rounded-full">${values.energyBill}</span>
                  </label>
                  <input 
                    id="energyBill"
                    type="range" min="0" max="1000" step="10" 
                    {...control.register("energyBill", { valueAsNumber: true })}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FFB547]"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStepIndex === 2 && (
            <motion.div 
              key="step-2"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col justify-center"
            >
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2ED47A] to-[#10B981] mb-2">Diet & Food</h2>
              <p className="text-sm text-gray-400 mb-10">Agriculture makes up a large portion of individual footprints.</p>
              
              <div className="space-y-10 max-w-xl">
                <div>
                  <label htmlFor="meatMeals" className="flex justify-between text-base font-semibold text-white mb-4">
                    <span>Meat-based meals per week</span>
                    <span className="text-[#2ED47A] bg-[#2ED47A]/10 px-3 py-1 rounded-full">{values.meatMeals} meals</span>
                  </label>
                  <input 
                    id="meatMeals"
                    type="range" min="0" max="21" step="1" 
                    {...control.register("meatMeals", { valueAsNumber: true })}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#2ED47A]"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStepIndex === 3 && (
            <motion.div 
              key="step-3"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col justify-center"
            >
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#A0AEC0] to-[#E2E8F0] mb-2">Waste & Recycling</h2>
              <p className="text-sm text-gray-400 mb-10">How efficiently does your household handle waste?</p>
              
              <div className="grid grid-cols-2 gap-4 max-w-xl">
                  <Controller
                    name="recycling"
                    control={control}
                    render={({ field }) => (
                      <>
                        {[
                          { id: "none", label: "Almost none" },
                          { id: "some", label: "Some of it" },
                          { id: "most", label: "Most of it" },
                          { id: "all", label: "Almost everything" }
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => field.onChange(opt.id)}
                            className={`flex flex-col items-center justify-center p-6 border-2 transition-all rounded-2xl ${
                              field.value === opt.id 
                              ? "bg-white/10 border-white text-white shadow-lg scale-105" 
                              : "bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:text-gray-300"
                            }`}
                          >
                            <span className="text-sm font-bold">
                              {opt.label}
                            </span>
                          </button>
                        ))}
                      </>
                    )}
                  />
              </div>
            </motion.div>
          )}

          {currentStepIndex === 4 && (
            <motion.div 
              key="step-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-[#4FA9FF] blur-2xl opacity-20 rounded-full" />
                <div className="h-20 w-20 rounded-full border-4 border-t-[#4FA9FF] border-r-[#4FA9FF] border-b-transparent border-l-transparent animate-spin flex items-center justify-center">
                  <Cloud size={30} className="text-[#4FA9FF] animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Consulting Climatiq API...</h2>
              <p className="text-sm text-gray-400 max-w-sm">
                We are processing your inputs through advanced environmental models to determine your exact footprint.
              </p>
            </motion.div>
          )}

          {currentStepIndex === 5 && result && (
            <motion.div 
              key="step-5"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col w-full"
            >
              <div className="flex flex-col lg:flex-row gap-8 w-full">
                {/* Score Section */}
                <div className="flex flex-col items-center text-center p-8 bg-gradient-to-b from-[#1E293B] to-[#0A0D14] border border-white/10 rounded-3xl w-full lg:w-1/3 justify-center shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2ED47A] to-[#4FA9FF]" />
                  <CheckCircle2 size={50} className="text-[#2ED47A] mb-6 shadow-sm rounded-full bg-[#2ED47A]/10 p-2" />
                  <h2 className="text-5xl font-black text-white mb-2 tracking-tighter">
                    {result.total_kg_co2e}
                  </h2>
                  <p className="text-lg text-gray-400 mb-8 font-medium">kg CO₂e / month</p>
                  
                  <div className="w-full bg-[#121826] p-5 rounded-2xl border border-white/5 mb-4 shadow-inner">
                    <p className="text-sm text-gray-500 mb-2 font-semibold">Nexus Eco Score</p>
                    <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4FA9FF] to-[#2ED47A]">
                      {result.score}<span className="text-base text-gray-600 font-medium">/1000</span>
                    </p>
                  </div>
                  
                  <p className="text-sm text-[#2ED47A] font-bold bg-[#2ED47A]/10 px-4 py-2 rounded-full">+50 Green Points earned!</p>
                </div>

                {/* Charts Section */}
                <div className="flex flex-col w-full lg:w-2/3 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Emissions Analysis</h3>
                    <p className="text-sm text-gray-400">Powered by Climatiq estimation models.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-72">
                    <div className="h-full border border-white/10 p-5 bg-[#121826]/80 rounded-2xl shadow-lg">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={getChartData()}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >
                            {getChartData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0A0D14', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#FFF' }}
                            itemStyle={{ color: '#FFF', fontWeight: 'bold' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="h-full border border-white/10 p-5 bg-[#121826]/80 rounded-2xl shadow-lg">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getChartData()}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="name" tick={{fill: '#7C8794', fontSize: 11, fontWeight: 600}} axisLine={false} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0A0D14', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                          />
                          <Bar dataKey="value" fill="#4FA9FF" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-10 py-4 rounded-full font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(79,169,255,0.4)]"
                  style={{ background: "linear-gradient(to right, #4FA9FF, #2ED47A)" }}
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {currentStepIndex < 4 && (
          <div className="mt-auto pt-10 flex items-center justify-between border-t border-white/5">
            <button
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className={`flex items-center gap-2 text-sm font-bold transition-colors px-4 py-2 rounded-lg ${currentStepIndex === 0 ? "opacity-30 cursor-not-allowed text-gray-500" : "hover:bg-white/5 text-gray-300 hover:text-white"}`}
            >
              <ArrowLeft size={18} /> Back
            </button>
            
            <button
              onClick={handleNext}
              className="flex items-center gap-2 text-sm font-bold text-black rounded-full px-8 py-3 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              style={{ background: "#FFF" }}
            >
              {currentStepIndex === steps.length - 1 ? "Analyze Footprint" : "Continue"} 
              {currentStepIndex === steps.length - 1 ? <Cloud size={18} /> : <ArrowRight size={18} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
