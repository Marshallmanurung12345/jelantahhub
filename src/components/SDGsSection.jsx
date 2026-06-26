import { motion } from 'framer-motion';

const sdgs = [
  {
    id: 7,
    icon: '⚡',
    title: 'Affordable and Clean Energy',
    desc: 'ReOil berkontribusi pada produksi biodiesel sebagai energi terbarukan yang terjangkau.',
    color: '#FCD34D',
    bgColor: '#FEF9C3',
    borderColor: '#FDE047',
    textColor: '#854D0E',
  },
  {
    id: 11,
    icon: '🏙️',
    title: 'Sustainable Cities',
    desc: 'Pengelolaan limbah jelantah yang baik mendukung kota dan komunitas yang berkelanjutan.',
    color: '#F97316',
    bgColor: '#FFF7ED',
    borderColor: '#FDBA74',
    textColor: '#9A3412',
  },
  {
    id: 12,
    icon: '♻️',
    title: 'Responsible Consumption',
    desc: 'Mendorong masyarakat untuk mengonsumsi dan memproduksi secara bertanggung jawab.',
    color: '#D97706',
    bgColor: '#FFFBEB',
    borderColor: '#FCD34D',
    textColor: '#78350F',
  },
  {
    id: 13,
    icon: '🌍',
    title: 'Climate Action',
    desc: 'Biodiesel UCO mengurangi emisi GRK hingga 85% dibanding bahan bakar fosil.',
    color: '#16A34A',
    bgColor: '#F0FDF4',
    borderColor: '#86EFAC',
    textColor: '#14532D',
  },
];

export default function SDGsSection() {
  return (
    <section id="sdgs" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">🌐 Global Goals</span>
          <h2 className="section-title">
            SDGs <span className="text-gradient-green">Impact</span>
          </h2>
          <p className="section-subtitle">
            ReOil berkontribusi langsung pada empat tujuan pembangunan berkelanjutan PBB
            melalui program sirkularitas minyak jelantah.
          </p>
        </motion.div>

        {/* UN SDGs badge row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {sdgs.map((sdg, i) => (
            <motion.div
              key={sdg.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
              whileHover={{
                scale: 1.05,
                y: -6,
                boxShadow: `0 20px 40px ${sdg.color}30`,
                transition: { duration: 0.25 },
              }}
              className="flex flex-col rounded-3xl border-2 overflow-hidden cursor-default transition-shadow"
              style={{ borderColor: sdg.borderColor, background: sdg.bgColor }}
              id={`sdg-${sdg.id}`}
            >
              {/* SDG number header */}
              <div
                className="px-5 pt-6 pb-4 flex items-center gap-3"
                style={{ borderBottom: `2px solid ${sdg.borderColor}` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black text-white flex-shrink-0 shadow-md"
                  style={{ background: sdg.color }}
                >
                  {sdg.id}
                </div>
                <span className="text-2xl">{sdg.icon}</span>
              </div>

              {/* Content */}
              <div className="px-5 py-5 flex-1">
                <h3
                  className="font-jakarta font-bold text-sm leading-snug mb-2"
                  style={{ color: sdg.textColor }}
                >
                  SDG {sdg.id}: {sdg.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{sdg.desc}</p>
              </div>

              {/* Bottom tag */}
              <div
                className="px-5 py-3 flex items-center gap-2"
                style={{ background: sdg.color + '20' }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: sdg.color }}
                />
                <span className="text-xs font-semibold" style={{ color: sdg.textColor }}>
                  Aligned with ReOil
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* UN Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-gray-400">
            Berdasarkan{' '}
            <span className="font-semibold text-gray-600">
              United Nations Sustainable Development Goals (UN SDGs) 2030 Agenda
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
