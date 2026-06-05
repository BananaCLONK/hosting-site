"use client";
import { motion } from "motion/react";
import { PrimaryButton, GhostButton } from "@/components/Button";
import { Globe, Shield, Zap } from "lucide-react";

const BUBBLES = [
  { size: 56,  left: "7%",  duration: 18, delay: 0,   filled: false },
  { size: 28,  left: "20%", duration: 22, delay: 5,   filled: false },
  { size: 72,  left: "35%", duration: 26, delay: 2,   filled: false },
  { size: 36,  left: "52%", duration: 20, delay: 8,   filled: false },
  { size: 20,  left: "65%", duration: 15, delay: 3.5, filled: false },
  { size: 64,  left: "78%", duration: 24, delay: 6,   filled: false },
  { size: 40,  left: "90%", duration: 21, delay: 11,  filled: false },
  { size: 32,  left: "44%", duration: 19, delay: 13,  filled: false },
  { size: 320, left: "5%",  duration: 38, delay: 0,   filled: true  },
  { size: 260, left: "60%", duration: 44, delay: 14,  filled: true  },
  { size: 180, left: "30%", duration: 34, delay: 7,   filled: true  },
];

export function CTA() {
  return (
    <section id="aloita" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-700 overflow-hidden px-8 py-20 text-center"
        >
          {/* Floating circles */}
          <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
            {BUBBLES.map((b) => (
              <motion.div
                key={`${b.left}-${b.size}`}
                className="absolute rounded-full"
                style={{
                  width: b.size,
                  height: b.size,
                  left: b.left,
                  bottom: -b.size,
                  ...(b.filled
                    ? { background: "rgba(255,255,255,0.04)" }
                    : { border: "1px solid rgba(255,255,255,0.12)" }),
                }}
                animate={{ y: -900 }}
                transition={{
                  duration: b.duration,
                  delay: b.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

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
