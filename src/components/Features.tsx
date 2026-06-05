"use client";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import {
  Search, Globe, CheckCircle, XCircle, Server,
  Activity, CreditCard, TrendingUp, Zap, Shield
} from "lucide-react";

/* ─── Domain Search Card mockup ─── */
function DomainSearchMockup() {
  const results = [
    { domain: "acmecorp.com", ok: true, price: "€12.99" },
    { domain: "acmecorp.io", ok: true, price: "€34.99" },
    { domain: "acmecorp.net", ok: false, price: null },
  ];
  return (
    <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-xs">
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-400">acmecorp</span>
        <span className="ml-auto text-brand-600 font-semibold">Search</span>
      </div>
      {results.map((r) => (
        <div key={r.domain} className="flex items-center justify-between bg-white border border-slate-100 rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            {r.ok ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <XCircle className="w-3.5 h-3.5 text-red-400" />}
            <span className="font-medium text-slate-700">{r.domain}</span>
          </div>
          {r.ok ? (
            <span className="text-brand-600 font-semibold">{r.price}</span>
          ) : (
            <span className="text-slate-400">Taken</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Hosting Usage Mockup ─── */
function HostingUsageMockup() {
  const metrics = [
    { label: "Storage", used: 14.2, total: 50, unit: "GB", color: "bg-brand-500" },
    { label: "Bandwidth", used: 187, total: 500, unit: "GB", color: "bg-brand-500" },
    { label: "CPU", used: 23, total: 100, unit: "%", color: "bg-emerald-500" },
  ];
  return (
    <div className="bg-slate-50 rounded-xl p-4 space-y-3 text-xs">
      {metrics.map((m) => (
        <div key={m.label}>
          <div className="flex justify-between mb-1.5 text-slate-600">
            <span className="font-medium">{m.label}</span>
            <span>{m.used}{m.unit} / {m.total}{m.unit}</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${m.color}`}
              style={{ width: `${(m.used / m.total) * 100}%` }}
            />
          </div>
        </div>
      ))}
      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
        <span className="text-slate-500">Next billing</span>
        <span className="font-semibold text-slate-700">Jun 15, 2026</span>
      </div>
    </div>
  );
}

/* ─── Server Uptime Mockup ─── */
function UptimeMockup() {
  const servers = [
    { name: "EU-West-1", status: "operational", ping: 12 },
    { name: "US-East-1", status: "operational", ping: 48 },
    { name: "APAC-1", status: "degraded", ping: 143 },
    { name: "EU-Central", status: "operational", ping: 9 },
  ];
  return (
    <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-xs">
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-slate-700 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          All systems nominal
        </span>
        <span className="text-slate-400">99.98% uptime</span>
      </div>
      {servers.map((s) => (
        <div key={s.name} className="flex items-center justify-between bg-white border border-slate-100 rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${s.status === "operational" ? "bg-emerald-500" : "bg-amber-400"}`} />
            <span className="font-medium text-slate-700">{s.name}</span>
          </div>
          <span className={`font-semibold ${s.ping < 50 ? "text-emerald-600" : "text-amber-500"}`}>{s.ping}ms</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Billing Dashboard Mockup ─── */
function BillingMockup() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const values = [38, 52, 45, 61, 55, 72];
  const max = Math.max(...values);
  return (
    <div className="bg-slate-50 rounded-xl p-4 text-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-slate-500">Total spend</p>
          <p className="text-xl font-bold text-brand-900 mt-0.5">€323.00</p>
        </div>
        <span className="flex items-center gap-1 text-emerald-600 font-semibold">
          <TrendingUp className="w-3.5 h-3.5" /> +12%
        </span>
      </div>
      <div className="flex items-end gap-1.5 h-16">
        {months.map((m, i) => (
          <div key={m} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t bg-brand-500 opacity-80"
              style={{ height: `${(values[i] / max) * 100}%` }}
            />
            <span className="text-slate-400">{m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Feature cards data ─── */
const features = [
  {
    icon: Globe,
    badge: "Domain Management",
    title: "Find and register the perfect domain",
    description: "Search across 500+ TLDs instantly. One-click DNS management, auto-renewal, and free WHOIS privacy protection included with every domain.",
    mockup: <DomainSearchMockup />,
    accent: "from-brand-50 to-blue-50",
  },
  {
    icon: Server,
    badge: "Resource Monitoring",
    title: "Real-time hosting usage at a glance",
    description: "Monitor storage, bandwidth, and CPU from a single dashboard. Get alerts before you hit limits — never be surprised by your usage again.",
    mockup: <HostingUsageMockup />,
    accent: "from-violet-50 to-purple-50",
  },
  {
    icon: Activity,
    badge: "Infrastructure",
    title: "99.99% uptime across global nodes",
    description: "Our redundant infrastructure spans 12 data centers worldwide. Real-time status monitoring with instant failover keeps your business always online.",
    mockup: <UptimeMockup />,
    accent: "from-emerald-50 to-teal-50",
  },
  {
    icon: CreditCard,
    badge: "Billing",
    title: "Transparent billing, no hidden fees",
    description: "Predictable monthly invoices, consolidated billing across all services, and detailed cost breakdowns so you always know exactly what you pay for.",
    mockup: <BillingMockup />,
    accent: "from-amber-50 to-orange-50",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="info" className="mb-4">
              <Zap className="w-3.5 h-3.5" /> Everything you need
            </Badge>
            <h2 className="text-4xl font-bold text-brand-900 mt-3 leading-tight">
              Built for modern businesses
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Powerful tools designed to help you launch, manage, and scale your online presence.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.badge}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 bg-gradient-to-br ${feat.accent} border border-white shadow-sm overflow-hidden`}
            >
              {/* Icon */}
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4">
                <feat.icon className="w-5 h-5 text-slate-700" />
              </div>

              <Badge variant="default" className="mb-3">{feat.badge}</Badge>
              <h3 className="text-xl font-bold text-brand-900 mb-2 leading-snug">{feat.title}</h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">{feat.description}</p>

              {/* Embedded Mockup */}
              <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-white shadow-sm p-1">
                {feat.mockup}
              </div>

              {/* Decorative circle */}
              <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-white/30 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Shield, label: "SOC 2 Type II certified" },
            { icon: Zap, label: "NVMe SSD storage" },
            { icon: Globe, label: "500+ domain extensions" },
            { icon: Activity, label: "Sub-10ms global DNS" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <Icon className="w-5 h-5 text-brand-500 flex-shrink-0" />
              <span className="text-sm font-medium text-slate-700">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
