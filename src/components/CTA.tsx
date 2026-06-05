"use client";
import { motion } from "motion/react";
import { PrimaryButton, GhostButton } from "@/components/Button";
import { Globe, Shield, Zap } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-700 overflow-hidden px-8 py-20 text-center"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl" />

          <div className="relative">
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Ready to launch your<br />next project?
            </h2>
            <p className="mt-5 text-lg text-brand-200 max-w-xl mx-auto">
              Join over 50,000 businesses already running on NexaHost. Set up in minutes — no technical knowledge required.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <PrimaryButton arrow className="bg-white text-brand-700 hover:bg-brand-50 shadow-lg">
                Start for free
              </PrimaryButton>
              <GhostButton arrow={false} className="text-white hover:text-brand-100">
                Talk to sales
              </GhostButton>
            </div>

            {/* Trust items */}
            <div className="mt-10 flex flex-wrap gap-6 justify-center text-sm text-brand-200">
              {[
                { icon: Zap, text: "Set up in under 5 minutes" },
                { icon: Shield, text: "No credit card required" },
                { icon: Globe, text: "Free domain for 1 year" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-brand-300" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
