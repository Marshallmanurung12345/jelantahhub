import { motion } from 'framer-motion';

const problems = [
  {
    id: 'pollution',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="#FEF2F2" />
        <path d="M24 14C18 14 12 18 12 24s6 10 12 10 12-4 12-10" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M16 20c0 0 4 6 8 6s8-6 8-6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="34" r="2" fill="#EF4444" />
        <path d="M20 38 Q24 42 28 38" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
    color: 'red',
    title: 'Pencemaran Lingkungan',
    desc: 'Minyak jelantah yang dibuang ke saluran air dapat mencemari lingkungan secara masif dan berdampak jangka panjang terhadap ekosistem perairan.',
    stat: '1 liter',
    statDesc: 'mencemari 1.000 liter air bersih',
  },
  {
    id: 'drainage',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="#FFF7ED" />
        <rect x="16" y="14" width="16" height="22" rx="4" stroke="#F97316" strokeWidth="2.5" />
        <path d="M20 20 H28 M20 25 H28 M20 30 H24" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 36 Q24 28 36 36" stroke="#F97316" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="32" cy="20" r="5" fill="#FFF7ED" stroke="#F97316" strokeWidth="2" />
        <path d="M30 20 H34 M32 18 V22" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: 'orange',
    title: 'Kerusakan Drainase',
    desc: 'Limbah minyak meningkatkan risiko penyumbatan saluran drainase, memperparah banjir dan menyebabkan pencemaran air tanah yang berkepanjangan.',
    stat: '3,6 juta ton',
    statDesc: 'limbah UCO per tahun di Indonesia',
  },
  {
    id: 'opportunity',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="#F0FDF4" />
        <path d="M24 14 L24 34" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 20 L24 14 L30 20" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="34" r="4" fill="#16A34A" />
        <path d="M16 38 Q24 34 32 38" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="34" cy="18" r="6" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5" />
        <text x="34" y="22" textAnchor="middle" fontSize="9" fill="#16A34A" fontWeight="bold">B</text>
      </svg>
    ),
    color: 'green',
    title: 'Potensi Biodiesel',
    desc: 'Padahal minyak jelantah masih dapat dimanfaatkan menjadi biodiesel berkualitas tinggi — mengurangi emisi 85% dibanding solar fosil menurut standar RED II EU.',
    stat: '85%',
    statDesc: 'reduksi emisi vs. solar fosil',
  },
];

const colorMap = {
  red: {
    border: 'border-red-100',
    statBg: 'bg-red-50',
    statText: 'text-red-600',
  },
  orange: {
    border: 'border-orange-100',
    statBg: 'bg-orange-50',
    statText: 'text-orange-600',
  },
  green: {
    border: 'border-green-100',
    statBg: 'bg-green-50',
    statText: 'text-brand-green',
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

export default function ProblemSection() {
  return (
    <section id="problem" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">⚠️ The Problem</span>
          <h2 className="section-title">
            Why Used Cooking Oil{' '}
            <span className="text-gradient-green">Matters?</span>
          </h2>
          <p className="section-subtitle">
            Setiap tahun jutaan liter minyak jelantah terbuang sia-sia —
            mencemari lingkungan, padahal menyimpan potensi energi yang luar biasa.
          </p>
        </motion.div>

        {/* 3 Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, i) => {
            const c = colorMap[problem.color];
            return (
              <motion.article
                key={problem.id}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`bg-white border-2 ${c.border} rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-shadow`}
                id={`problem-card-${problem.id}`}
              >
                <div className="mb-6">{problem.icon}</div>
                <h3 className="font-jakarta text-xl font-bold text-brand-text mb-3">
                  {problem.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {problem.desc}
                </p>
                <div className={`${c.statBg} rounded-2xl px-4 py-3 flex items-center gap-3`}>
                  <span className={`font-jakarta font-black text-xl ${c.statText}`}>
                    {problem.stat}
                  </span>
                  <span className="text-gray-500 text-xs">{problem.statDesc}</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
