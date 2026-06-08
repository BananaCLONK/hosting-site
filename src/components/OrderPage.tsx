"use client";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Check, Globe, Shield, HardDrive, Mail, Activity,
  Server, Lock, ArrowRight,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    monthly: 3.99,
    yearly: 2.99,
    features: ["1 sivusto", "10 GB SSD", "5 sähköpostitiliä", "Ilmainen SSL", "24/7 tuki"],
  },
  {
    id: "business",
    name: "Business",
    monthly: 7.99,
    yearly: 5.99,
    popular: true,
    features: ["5 sivustoa", "50 GB SSD", "Rajaton sähköposti", "Ilmainen SSL", "Päivittäinen varmuuskopiointi", "Prioriteettituki"],
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 14.99,
    yearly: 11.99,
    features: ["Rajaton sivustot", "200 GB SSD", "Rajaton sähköposti", "Wildcard SSL", "Tuntivarmuuskopiointi", "Sivustovahti 24/7", "Dedikoitu tuki"],
  },
] as const;

type PlanId = (typeof PLANS)[number]["id"];

const ADDONS = [
  { id: "backup",  label: "Päivittäinen varmuuskopiointi", desc: "Automaattinen varmuuskopio joka yö",                    price: 1.99, Icon: HardDrive },
  { id: "email",   label: "Lisäsähköpostit (10 kpl)",       desc: "10 lisäpostilaatikkoa omalla verkkotunnuksella",        price: 2.99, Icon: Mail     },
  { id: "monitor", label: "Sivustovahti 24/7",              desc: "Välitön ilmoitus sivuston katkoksista",                 price: 0.99, Icon: Activity  },
  { id: "sslpro",  label: "SSL Pro (wildcard)",             desc: "Suojaa kaikki alidomainit yhdellä sertifikaatilla",    price: 4.99, Icon: Shield   },
] as const;

type AddonId = (typeof ADDONS)[number]["id"];

const TLD_PRICES: Record<string, number> = {
  ".fi": 7.99, ".com": 12.99, ".io": 34.99,
  ".eu": 9.99, ".net": 14.99, ".org": 12.99,
};

const DOMAIN_OPTS = ["new", "transfer", "existing"] as const;
type DomainOpt = (typeof DOMAIN_OPTS)[number];

const DOMAIN_LABELS: Record<DomainOpt, string> = {
  new:      "Rekisteröi uusi",
  transfer: "Siirrä olemassa oleva",
  existing: "Minulla on jo domain",
};

const FORM_FIELDS = [
  { key: "firstName", label: "Etunimi",              placeholder: "Matti" },
  { key: "lastName",  label: "Sukunimi",             placeholder: "Meikäläinen" },
  { key: "email",     label: "Sähköposti",           placeholder: "matti@yritys.fi",   span: true },
  { key: "phone",     label: "Puhelin",              placeholder: "+358 40 123 4567" },
  { key: "company",   label: "Yritys (valinnainen)", placeholder: "Yritys Oy" },
  { key: "address",   label: "Katuosoite",           placeholder: "Esimerkkikatu 1",   span: true },
  { key: "zip",       label: "Postinumero",          placeholder: "00100" },
  { key: "city",      label: "Kaupunki",             placeholder: "Helsinki" },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionCard({ title, step, children }: { title: string; step: number; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(15,23,42,0.07)] p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-7 h-7 rounded-full bg-brand-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
          {step}
        </span>
        <h2 className="text-lg font-bold text-brand-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function FieldInput({
  label, placeholder, value, onChange, span,
}: { label: string; placeholder: string; value: string; onChange: (v: string) => void; span?: boolean }) {
  return (
    <div className={span ? "sm:col-span-2" : ""}>
      <label className="block text-xs font-semibold text-brand-900/55 mb-1.5">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border text-sm text-brand-900 placeholder:text-brand-900/30 outline-none focus:border-brand-400 transition-colors"
        style={{ borderColor: "rgba(27,48,66,0.12)", background: "rgba(27,48,66,0.02)" }}
      />
    </div>
  );
}

function DomainInput({ placeholder }: { placeholder: string }) {
  return (
    <div
      className="flex-1 flex items-center gap-2 rounded-xl px-4 py-3 border"
      style={{ borderColor: "rgba(27,48,66,0.12)", background: "rgba(27,48,66,0.02)" }}
    >
      <Globe className="w-4 h-4 shrink-0" style={{ color: "rgba(27,48,66,0.28)" }} />
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm font-medium text-brand-900 outline-none placeholder:text-brand-900/30"
      />
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function OrderPage() {
  const [plan,    setPlan]    = useState<PlanId>("business");
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [domOpt,  setDomOpt]  = useState<DomainOpt>("new");
  const [query,   setQuery]   = useState("");
  const [tld,     setTld]     = useState(".fi");
  const [addons,  setAddons]  = useState<Set<AddonId>>(new Set());
  const [form,    setForm]    = useState<Record<string, string>>(
    Object.fromEntries(FORM_FIELDS.map(f => [f.key, ""]))
  );

  const selected    = PLANS.find(p => p.id === plan)!;
  const planPrice   = billing === "yearly" ? selected.yearly : selected.monthly;
  const domainPrice = domOpt === "new" && query ? (TLD_PRICES[tld] ?? 0) / 12 : 0;
  const addonsTotal = [...addons].reduce((s, id) => s + (ADDONS.find(a => a.id === id)?.price ?? 0), 0);
  const total       = planPrice + domainPrice + addonsTotal;

  const toggleAddon = (id: AddonId) =>
    setAddons(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Minimal header ──────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/"><img src="/logo.svg" alt="NordicHost" className="h-7" /></a>
            <span className="text-sm text-slate-400">/ Tilaa webhotel</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            Suojattu tilaus
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── Left: steps ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* 1 · Plan */}
            <SectionCard title="Valitse paketti" step={1}>
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                {(["monthly", "yearly"] as const).map(b => (
                  <button
                    key={b}
                    onClick={() => setBilling(b)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      billing === b ? "bg-brand-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {b === "monthly" ? "Kuukausittain" : "Vuosittain"}
                    {b === "yearly" && (
                      <span className="px-1.5 py-0.5 text-xs font-bold bg-emerald-500 text-white rounded-full">−25%</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {PLANS.map(p => {
                  const price   = billing === "yearly" ? p.yearly : p.monthly;
                  const active  = plan === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPlan(p.id)}
                      className={`relative text-left rounded-2xl border-2 p-5 transition-all ${
                        active ? "border-brand-600 bg-brand-50" : "border-slate-100 bg-white hover:border-brand-200"
                      }`}
                    >
                      {"popular" in p && p.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs font-bold bg-brand-600 text-white rounded-full whitespace-nowrap">
                          Suosituin
                        </span>
                      )}
                      <p className="font-bold text-brand-900 mb-1">{p.name}</p>
                      <p className="text-2xl font-bold text-brand-900 leading-none">
                        €{price.toFixed(2)}
                        <span className="text-sm font-normal text-slate-400"> /kk</span>
                      </p>
                      <ul className="mt-4 space-y-1.5">
                        {p.features.map(f => (
                          <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                            <Check className="w-3.5 h-3.5 text-brand-500 mt-0.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      {active && (
                        <span className="absolute top-4 right-4 w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </SectionCard>

            {/* 2 · Domain */}
            <SectionCard title="Toimialue" step={2}>
              <div className="flex gap-2 mb-6 flex-wrap">
                {DOMAIN_OPTS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setDomOpt(opt)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      domOpt === opt ? "bg-brand-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {DOMAIN_LABELS[opt]}
                  </button>
                ))}
              </div>

              {domOpt === "new" && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div
                      className="flex-1 flex items-center gap-2 rounded-xl px-4 py-3 border"
                      style={{ borderColor: "rgba(27,48,66,0.12)", background: "rgba(27,48,66,0.02)" }}
                    >
                      <Globe className="w-4 h-4 shrink-0" style={{ color: "rgba(27,48,66,0.28)" }} />
                      <input
                        type="text"
                        placeholder="yritysnimi"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="flex-1 bg-transparent text-sm font-medium text-brand-900 outline-none placeholder:text-brand-900/30"
                      />
                    </div>
                    <select
                      value={tld}
                      onChange={e => setTld(e.target.value)}
                      className="px-3 py-3 rounded-xl border text-sm font-semibold text-brand-900 bg-white outline-none cursor-pointer"
                      style={{ borderColor: "rgba(27,48,66,0.12)" }}
                    >
                      {Object.entries(TLD_PRICES).map(([t, price]) => (
                        <option key={t} value={t}>{t} — €{price}/v</option>
                      ))}
                    </select>
                  </div>
                  {query && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100"
                    >
                      <div className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-semibold text-emerald-800">{query}{tld} on saatavilla</span>
                      </div>
                      <span className="text-sm font-bold text-emerald-700">€{TLD_PRICES[tld]}/v</span>
                    </motion.div>
                  )}
                </div>
              )}

              {domOpt === "transfer" && (
                <div className="flex gap-2">
                  <DomainInput placeholder="yritysnimi.fi" />
                  <button className="px-5 py-3 rounded-xl bg-brand-900 text-white text-sm font-semibold hover:bg-brand-800 transition-colors whitespace-nowrap">
                    Tarkista
                  </button>
                </div>
              )}

              {domOpt === "existing" && (
                <DomainInput placeholder="yritysnimi.fi" />
              )}
            </SectionCard>

            {/* 3 · Add-ons */}
            <SectionCard title="Lisäpalvelut" step={3}>
              <div className="space-y-3">
                {ADDONS.map(({ id, label, desc, price, Icon }) => {
                  const active = addons.has(id);
                  return (
                    <button
                      key={id}
                      onClick={() => toggleAddon(id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                        active ? "border-brand-500 bg-brand-50" : "border-slate-100 bg-white hover:border-brand-200"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        active ? "bg-brand-500 text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-brand-900">{label}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm font-bold text-brand-900">+€{price.toFixed(2)}/kk</span>
                        <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          active ? "border-brand-500 bg-brand-500" : "border-slate-300"
                        }`}>
                          {active && <Check className="w-3 h-3 text-white" />}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </SectionCard>

            {/* 4 · Contact */}
            <SectionCard title="Yhteystiedot" step={4}>
              <div className="grid sm:grid-cols-2 gap-4">
                {FORM_FIELDS.map(f => (
                  <FieldInput
                    key={f.key}
                    label={f.label}
                    placeholder={f.placeholder}
                    value={form[f.key] ?? ""}
                    onChange={v => setForm(p => ({ ...p, [f.key]: v }))}
                    span={"span" in f ? f.span : false}
                  />
                ))}
              </div>
            </SectionCard>

          </div>

          {/* ── Right: summary ──────────────────────────────────── */}
          <div className="w-full lg:w-80 shrink-0 lg:sticky lg:top-8 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(15,23,42,0.07)] p-6">
              <h3 className="text-base font-bold text-brand-900 mb-5">Tilauksen yhteenveto</h3>

              <div className="space-y-0">
                <div className="flex items-start justify-between py-3 border-b border-slate-100">
                  <div>
                    <p className="text-sm font-semibold text-brand-900">NordicHost {selected.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{billing === "yearly" ? "Vuosilaskutus" : "Kuukausilaskutus"}</p>
                  </div>
                  <span className="text-sm font-bold text-brand-900 shrink-0 ml-3">€{planPrice.toFixed(2)}/kk</span>
                </div>

                {domOpt === "new" && query && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start justify-between py-3 border-b border-slate-100"
                  >
                    <div>
                      <p className="text-sm font-semibold text-brand-900">{query}{tld}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Rekisteröinti / 1 vuosi</p>
                    </div>
                    <span className="text-sm font-bold text-brand-900 shrink-0 ml-3">€{domainPrice.toFixed(2)}/kk</span>
                  </motion.div>
                )}

                {[...addons].map(id => {
                  const a = ADDONS.find(x => x.id === id)!;
                  return (
                    <div key={id} className="flex items-center justify-between py-2.5 border-b border-slate-100">
                      <p className="text-xs text-slate-600">{a.label}</p>
                      <span className="text-xs font-semibold text-brand-900 ml-3">+€{a.price.toFixed(2)}/kk</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t-2 border-slate-100">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-slate-500">Yhteensä</span>
                  <span className="text-2xl font-bold text-brand-900">
                    €{total.toFixed(2)}<span className="text-sm font-normal text-slate-400">/kk</span>
                  </span>
                </div>
                {billing === "yearly" && (
                  <p className="text-xs text-emerald-600 font-semibold mt-1">Säästät 25 % vuosilaskutuksella</p>
                )}
              </div>

              <button
                className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#0F243E] text-white text-sm font-semibold hover:bg-[#0d1f35] transition-colors"
              >
                Jatka maksuun <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                30 päivän tyytyväisyystakuu
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3">
              {[
                { Icon: Server,   text: "Palvelimet sijaitsevat Suomessa" },
                { Icon: Shield,   text: "GDPR-yhteensopiva hosting" },
                { Icon: Activity, text: "99.99 % uptime-takuu" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-xs text-slate-500">
                  <Icon className="w-4 h-4 text-brand-500 shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
