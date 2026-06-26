import { motion } from 'framer-motion';

const footerLinks = {
  'Quick Links': [
    { label: 'About ReOil', href: '#hero' },
    { label: 'Impact Map', href: '#map' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Simulation', href: '#simulation' },
    { label: 'Stories', href: '#stories' },
  ],
  'Resources': [
    { label: 'FAQ', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'SDGs Report', href: '#sdgs' },
    { label: 'Data Sources', href: '#' },
  ],
};

const scrollTo = (href) => {
  if (href.startsWith('#')) {
    const id = href.replace('#', '');
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400" id="footer">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-green rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">R</span>
              </div>
              <span className="font-jakarta font-bold text-2xl text-white">
                Re<span className="text-brand-green-light">Oil</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              Platform edukasi sirkularitas minyak jelantah pertama di Indonesia.
              Mengubah limbah menjadi energi bersih untuk generasi mendatang.
            </p>
            <div className="flex gap-3">
              {['🌐', '📧', '📱'].map((icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-brand-green transition-colors text-lg"
                  aria-label={['Website', 'Email', 'Mobile'][i]}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-jakarta font-bold text-white mb-4 text-sm tracking-wider uppercase">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-sm text-gray-400 hover:text-brand-green-light transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-800 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2025 ReOil. All rights reserved. Dibuat untuk SDGs Creative Web Competition.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <span>Sumber: Susenas BPS 2025 · RED II EU · IPCC · WHO</span>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-700 italic">
            "Turning Used Cooking Oil Into Clean Energy — Every Drop Powers Tomorrow."
          </p>
        </div>
      </div>
    </footer>
  );
}
