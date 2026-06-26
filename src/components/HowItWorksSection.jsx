import { motion } from 'framer-motion';

const steps = [
  {
    id: 'household',
    icon: '🏠',
    title: 'Rumah Tangga',
    desc: 'Masyarakat mengumpulkan minyak jelantah bekas memasak sehari-hari.',
    color: 'bg-yellow-50 border-yellow-200',
    iconBg: 'bg-yellow-100',
    num: '01',
  },
  {
    id: 'bank',
    icon: '🏪',
    title: 'Bank Jelantah',
    desc: 'Diserahkan ke pengepul atau bank jelantah terdekat di lingkungan.',
    color: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100',
    num: '02',
  },
  {
    id: 'processing',
    icon: '⚙️',
    title: 'Pengolahan Biodiesel',
    desc: 'Minyak jelantah diproses menjadi FAME — bahan baku biodiesel berkualitas.',
    color: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100',
    num: '03',
  },
  {
    id: 'energy',
    icon: '⚡',
    title: 'Energi Bersih',
    desc: 'Biodiesel siap digunakan sebagai bahan bakar ramah lingkungan untuk masa depan.',
    color: 'bg-emerald-50 border-emerald-200',
    iconBg: 'bg-emerald-100',
    num: '04',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-label">🔄 How It Works</span>
          <h2 className="section-title">
            How <span className="text-gradient-green">ReOil</span> Works
          </h2>
          <p className="section-subtitle">
            Proses sederhana yang mengubah limbah dapur menjadi aset energi nasional.
          </p>
        </motion.div>

        {/* Timeline — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gray-200" aria-hidden="true">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-300 via-green-400 to-emerald-500"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.18, ease: 'easeOut' }}
                className="flex flex-col items-center text-center"
                id={`step-${step.id}`}
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 5 }}
                  className={`w-16 h-16 ${step.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-6 border-2 ${step.color.split(' ')[1]} relative z-10 bg-white shadow-card`}
                >
                  {step.icon}
                </motion.div>

                {/* Step number */}
                <span className="font-jakarta font-black text-5xl text-gray-100 mb-2 leading-none select-none">
                  {step.num}
                </span>

                {/* Content card */}
                <div className={`border-2 ${step.color} rounded-2xl p-6 w-full`}>
                  <h3 className="font-jakarta font-bold text-lg text-brand-text mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>

                {/* Arrow (mobile vertical) */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden mt-4 text-gray-300 text-2xl">↓</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-full px-6 py-3">
            <span className="text-2xl">🌍</span>
            <span className="text-sm text-brand-green font-semibold">
              Setiap tetes jelantah yang dikumpulkan = satu langkah menuju energi bersih
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
