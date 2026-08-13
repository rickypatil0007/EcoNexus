import { CloudRain, Wind, AlertCircle } from "lucide-react";
import Link from "next/link";

interface AQIResponse {
  status: string;
  data?: {
    aqi: number;
    city: { name: string };
    dominentpol: string;
  };
}

export async function AQICard() {
  const token = process.env.AQICN_API_KEY || process.env.WAQI_API_KEY;
  let aqiData: AQIResponse | null = null;
  let errorMsg = null;

  if (token) {
    try {
      const res = await fetch(`https://api.waqi.info/feed/here/?token=${token}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      const data = await res.json();
      
      if (data.status === "ok") {
        aqiData = data;
      } else {
        errorMsg = data.data || "Invalid API Key or Rate Limited";
      }
    } catch (err) {
      errorMsg = "Failed to fetch AQI data";
    }
  }

  return (
    <div className="glass-card flex flex-col justify-between p-5 rounded-[20px]" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: "rgba(105,229,255,0.15)" }}>
            <Wind size={16} color="#69E5FF" />
          </div>
          <h3 className="font-semibold text-white">Local Air Quality</h3>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {!token ? (
          <div className="text-sm text-gray-400">AQI API Key not configured</div>
        ) : errorMsg ? (
          <div className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle size={14} />
            <span>{errorMsg}</span>
          </div>
        ) : aqiData && aqiData.data ? (
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold" style={{ color: getAqiColor(aqiData.data.aqi) }}>
                {aqiData.data.aqi}
              </span>
              <span className="text-sm text-gray-400">AQI</span>
            </div>
            <p className="text-sm font-medium text-white">{aqiData.data.city.name}</p>
            <p className="text-xs text-gray-400 mt-2">
              Dominant Pollutant: <span className="uppercase text-gray-300">{aqiData.data.dominentpol}</span>
            </p>
          </div>
        ) : (
          <div className="text-sm text-gray-400">Loading AQI data...</div>
        )}
      </div>
    </div>
  );
}

function getAqiColor(aqi: number) {
  if (aqi <= 50) return "#2ED47A"; // Good (Green)
  if (aqi <= 100) return "#FFD166"; // Moderate (Yellow)
  if (aqi <= 150) return "#FF9F1C"; // Unhealthy for Sensitive (Orange)
  if (aqi <= 200) return "#EF476F"; // Unhealthy (Red)
  if (aqi <= 300) return "#9D4EDD"; // Very Unhealthy (Purple)
  return "#780000"; // Hazardous (Maroon)
}
