"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Activity, Server, Globe, Wifi } from "lucide-react";

const regions = [
  { name: "EU-West (Dublin)", lat: 53.3, ping: 8, requests: 142_300, status: "operational" },
  { name: "US-East (Virginia)", lat: 38.9, ping: 45, requests: 98_700, status: "operational" },
  { name: "APAC (Singapore)", lat: 1.3, ping: 98, requests: 67_400, status: "operational" },
  { name: "US-West (Oregon)", lat: 45.5, ping: 62, requests: 51_200, status: "degraded" },
  { name: "EU-Central (Frankfurt)", lat: 50.1, ping: 11, requests: 112_800, status: "operational" },
  { name: "LATAM (São Paulo)", lat: -23.5, ping: 134, requests: 23_100, status: "operational" },
];

function useAnimatedCounter(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

function StatCard({ label, value, suffix, icon: Icon, color }: {
  label: string; value: number; suffix: string; icon: React.ComponentType<{ className?: string }>; color: string;
}) {
  const animated = useAnimatedCounter(value);
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-3xl font-bold text-brand-900">
        {animated.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
    </div>
  );
}

export function Infrastructure() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const liveRequests = 496_302 + tick * Math.floor(Math.random() * 800 + 200);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="success" className="mb-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Live infrastructure
            </Badge>
            <h2 className="text-4xl font-bold text-brand-900 mt-3">
              Global network, local performance
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Our infrastructure spans 6 continents with real-time failover and redundant fiber connections.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatCard label="Requests served today" value={liveRequests} suffix="" icon={Activity} color="bg-brand-500" />
          <StatCard label="Active servers" value={1_284} suffix="" icon={Server} color="bg-brand-500" />
          <StatCard label="Edge locations" value={94} suffix="" icon={Globe} color="bg-emerald-500" />
          <StatCard label="Avg. response time" value={12} suffix="ms" icon={Wifi} color="bg-amber-500" />
        </div>

        {/* Region Status Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-brand-900">Region status</h3>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Updated just now
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {regions.map((region) => (
              <div key={region.name} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${region.status === "operational" ? "bg-emerald-500" : "bg-amber-400"}`} />
                  <div>
                    <p className="text-sm font-medium text-brand-900">{region.name}</p>
                    <p className="text-xs text-slate-400 capitalize">{region.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 text-sm">
                  <div className="text-right hidden sm:block">
                    <p className="font-semibold text-brand-900">{region.ping}ms</p>
                    <p className="text-xs text-slate-400">latency</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-brand-900">{region.requests.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">req/day</p>
                  </div>
                  <Badge variant={region.status === "operational" ? "success" : "warning"}>
                    {region.status === "operational" ? "Operational" : "Degraded"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Uptime History */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-brand-900">90-day uptime history</h3>
            <span className="text-sm font-semibold text-emerald-600">99.98% avg</span>
          </div>
          <div className="flex gap-0.5 h-8">
            {Array.from({ length: 90 }, (_, i) => {
              const isDown = [14, 37, 61].includes(i);
              return (
                <div
                  key={i}
                  title={isDown ? "Incident" : "Operational"}
                  className={`flex-1 rounded-sm ${isDown ? "bg-amber-400" : "bg-emerald-400"}`}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>90 days ago</span>
            <span>Today</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
