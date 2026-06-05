"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small sites and personal projects",
    monthly: 9,
    annual: 7,
    badge: null,
    color: "border-slate-200",
    cta: "Get started",
    ctaVariant: "outline" as const,
    features: [
      "1 website",
      "10 GB NVMe SSD storage",
      "100 GB bandwidth / month",
      "Free SSL certificate",
      "1-click CMS installs",
      "Weekly automated backups",
      "Email support (48h SLA)",
    ],
  },
  {
    name: "Business",
    description: "For growing businesses that need more power",
    monthly: 29,
    annual: 23,
    badge: "Most popular",
    color: "border-brand-500",
    cta: "Start free trial",
    ctaVariant: "primary" as const,
    features: [
      "Unlimited websites",
      "50 GB NVMe SSD storage",
      "Unlimited bandwidth",
      "Free SSL + wildcard SSL",
      "Staging environments",
      "Daily automated backups",
      "Priority support (4h SLA)",
      "Advanced caching (CDN)",
    ],
  },
  {
    name: "Enterprise",
    description: "Custom infrastructure for high-traffic applications",
    monthly: 99,
    annual: 79,
    badge: null,
    color: "border-slate-200",
    cta: "Contact sales",
    ctaVariant: "outline" as const,
    features: [
      "Everything in Business",
      "200 GB NVMe SSD storage",
      "Dedicated resources",
      "Custom DNS & load balancer",
      "On-demand scaling",
      "Real-time backups",
      "Dedicated account manager",
      "SLA 99.99% uptime guarantee",
      "Security audit & WAF",
    ],
  },
];

const billingOptions = [
  { id: "monthly", label: "Monthly", badge: undefined },
  { id: "annual",  label: "Annual",  badge: "-20%"    },
] as const;

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="py-24 bg-slate-50" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="info" className="mb-4">
              <Zap className="w-3.5 h-3.5" /> Simple pricing
            </Badge>
            <h2 className="text-4xl font-bold text-brand-900 mt-3">
              Choose the right plan
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              No contracts. No hidden fees. Cancel anytime. Upgrade or downgrade as your business grows.
            </p>

            {/* Toggle */}
            <div className="mt-8 inline-flex items-center bg-white border border-slate-200 rounded-full p-1 shadow-sm">
              {billingOptions.map((opt) => {
                const isActive = opt.id === (annual ? "annual" : "monthly");
                return (
                  <motion.button
                    key={opt.id}
                    onClick={() => setAnnual(opt.id === "annual")}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.1 }}
                    className="relative px-4 py-2 text-sm font-medium rounded-full select-none"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="billing-pill"
                        className="absolute inset-0 rounded-full bg-brand-900 shadow-sm"
                        transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.8 }}
                      />
                    )}
                    <span className={cn(
                      "relative z-10 flex items-center gap-1.5 transition-colors duration-150",
                      isActive ? "text-white" : "text-slate-500 hover:text-slate-700"
                    )}>
                      {opt.label}
                      {opt.badge && (
                        <span className="bg-emerald-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-md leading-none">
                          {opt.badge}
                        </span>
                      )}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-white rounded-2xl border-2 ${plan.color} p-8 shadow-sm flex flex-col`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="info">{plan.badge}</Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-brand-900">{plan.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-brand-900">
                    €{annual ? plan.annual : plan.monthly}
                  </span>
                  <span className="text-slate-400 mb-1">/mo</span>
                </div>
                {annual && (
                  <p className="text-sm text-slate-400 mt-1">
                    Billed annually (€{plan.annual * 12}/yr)
                  </p>
                )}
              </div>

              <div className="mb-8">
                {plan.ctaVariant === "primary" ? (
                  <PrimaryButton fullWidth>{plan.cta}</PrimaryButton>
                ) : (
                  <SecondaryButton fullWidth>{plan.cta}</SecondaryButton>
                )}
              </div>

              <ul className="space-y-3 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-slate-400 mt-8">
          All plans include free domain registration for the first year. Questions?{" "}
          <a href="#" className="text-brand-600 font-medium hover:underline">Talk to sales →</a>
        </p>
      </div>
    </section>
  );
}
