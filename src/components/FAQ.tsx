"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What is included in the free domain registration?",
    a: "Every new hosting plan includes one free domain registration (.com, .net, .org, or .io) for the first year. WHOIS privacy protection is also included at no extra cost. After the first year, the domain renews at our standard rate.",
  },
  {
    q: "Can I upgrade or downgrade my hosting plan at any time?",
    a: "Yes, absolutely. You can switch between plans at any time from your control panel. When upgrading, you'll be charged the prorated difference. When downgrading, the credit is applied to your next invoice. There are no penalties or fees for changing plans.",
  },
  {
    q: "What kind of support do you offer?",
    a: "We offer 24/7 technical support via live chat and email. Business and Enterprise plans include priority support with guaranteed response times (4h and 1h SLAs respectively). Enterprise customers also get a dedicated account manager.",
  },
  {
    q: "Do you offer a money-back guarantee?",
    a: "Yes. We offer a 30-day money-back guarantee on all hosting plans. If you're not satisfied for any reason within the first 30 days, contact our support team and we'll issue a full refund — no questions asked.",
  },
  {
    q: "Can I host multiple websites on one plan?",
    a: "The Starter plan supports 1 website. Business and Enterprise plans support unlimited websites with no additional charges. You can manage all your sites from a single control panel dashboard.",
  },
  {
    q: "What CMS and frameworks are supported?",
    a: "We support WordPress, Joomla, Drupal, Magento, PrestaShop, and custom PHP/Node.js/Python applications. Our 1-click installer covers 100+ popular apps. We also offer managed WordPress hosting as an add-on.",
  },
  {
    q: "Is there a free trial available?",
    a: "Business plans include a 14-day free trial — no credit card required. You get full access to all Business features during the trial period. If you decide to continue, simply add your payment information before the trial ends.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="text-sm font-semibold text-slate-900 pr-4">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section className="py-24 bg-slate-50" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="default" className="mb-4">
              <HelpCircle className="w-3.5 h-3.5" /> FAQ
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mt-3">Frequently asked questions</h2>
            <p className="mt-4 text-lg text-slate-500">
              Everything you need to know before getting started. Can&apos;t find your answer?{" "}
              <a href="#" className="text-indigo-600 font-medium hover:underline">Chat with us →</a>
            </p>
          </motion.div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
