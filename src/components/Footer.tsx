
const footerLinks = {
  Product: ["Shared Hosting", "VPS Hosting", "Dedicated Servers", "Cloud Hosting", "WordPress Hosting", "Domain Registration"],
  Company: ["About us", "Blog", "Careers", "Press kit", "Partners", "Contact"],
  Support: ["Help center", "Documentation", "API reference", "System status", "Community forum", "Migrate to NexaHost"],
  Legal: ["Privacy policy", "Terms of service", "Cookie policy", "GDPR compliance", "SLA", "Security"],
};

export function Footer() {
  return (
    <footer className="bg-brand-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-12 border-b border-brand-900/40">
          {/* Brand */}
          <div className="col-span-2">
            <div className="mb-4">
              <img src="/logo.svg" alt="NordicHost" className="h-8 brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Fast, reliable, and scalable hosting for businesses of all sizes. Built for performance, designed for simplicity.
            </p>
            <div className="flex gap-3">
              {["X", "Li", "Gh", "Yt"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 bg-brand-900 hover:bg-brand-700 rounded-lg flex items-center justify-center text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2026 NexaHost, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
