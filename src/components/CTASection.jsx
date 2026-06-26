import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section
      id="cta"
      className="py-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #14532D 0%, #16A34A 40%, #22C55E 100%)',
      }}
    >
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FACC15, transparent)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, white, transparent)' }}
        />
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
          className="text-6xl mb-8"
        >
          🌱
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-jakarta font-black text-5xl md:text-6xl text-white leading-tight mb-6"
        >
          Every Drop{' '}
          <span
            className="inline-block"
            style={{
              background: 'linear-gradient(135deg, #FACC15, #FDE047)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Powers Tomorrow.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-green-100 text-xl leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Mari ubah minyak jelantah menjadi energi yang bermanfaat bagi lingkungan
          dan generasi mendatang. Setiap tetes jelantah yang tidak dibuang adalah
          langkah nyata menuju Indonesia yang lebih bersih.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 16px 40px rgba(250,204,21,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="bg-brand-yellow text-gray-900 font-jakarta font-bold text-lg px-12 py-5 rounded-full transition-all duration-300"
            style={{ boxShadow: '0 0 30px rgba(250, 204, 21, 0.4)' }}
            onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            id="cta-join-button"
          >
            🤝 Join The Movement
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="border-2 border-white/40 text-white font-semibold text-base px-8 py-5 rounded-full hover:bg-white/10 transition-all duration-300"
            onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}
            id="cta-explore-button"
          >
            Explore Impact Map →
          </motion.button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { value: '34', label: 'Provinsi Terpetakan' },
            { value: '500K+', label: 'Liter UCO Terdata' },
            { value: '85%', label: 'Reduksi Emisi' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-jakarta font-black text-3xl text-white">{stat.value}</div>
              <div className="text-green-200 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
