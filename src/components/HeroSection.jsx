import { motion } from 'framer-motion';

const stats = [
  { icon: '🛢️', value: '500.000+', label: 'Estimated Used Cooking Oil' },
  { icon: '🌫️', value: '425 Ton',  label: 'Carbon Emission Reduced' },
  { icon: '🌿', value: '350.000+', label: 'Liter Biodiesel Potential' },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-white flex items-center overflow-hidden pt-16"
    >
      {/* ─── Main Grid ─── */}
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[calc(100vh-4rem)] items-center">

          {/* LEFT — Text Content */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="py-20 pr-0 lg:pr-8 flex flex-col justify-center"
          >
            {/* Badge */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 border border-green-300 bg-green-50 text-brand-green text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
                🌿 SDGs Creative Web Competition
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
              className="font-jakarta font-black text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-brand-text mb-6"
            >
              Turning Used<br />
              Cooking Oil Into<br />
              <span className="text-brand-green">Clean Energy.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
              className="text-gray-500 text-base md:text-lg leading-relaxed mb-10 max-w-md"
            >
              ReOil mengubah minyak jelantah dari limbah rumah tangga
              menjadi energi bersih melalui <strong className="text-brand-text">ekonomi sirkular.</strong>
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-green text-white font-jakarta font-semibold px-7 py-3.5 rounded-full flex items-center gap-2 hover:bg-brand-green-light transition-colors duration-200"
                id="hero-cta-explore"
              >
                Explore Impact
                <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm">→</span>
              </button>
              <button
                onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-gray-200 text-brand-text font-jakarta font-semibold px-7 py-3.5 rounded-full hover:border-brand-green hover:text-brand-green transition-colors duration-200"
                id="hero-cta-learn"
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT — Hero Image + Stats Card */}
          <div className="relative hidden lg:flex items-center justify-center h-full min-h-[600px]">
            {/* Background nature scene fills right half */}
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #e8f5e9 0%, #c8e6c9 30%, #a5d6a7 60%, #81c784 100%)',
              }}
            >
              {/* Mountain silhouette SVG */}
              <svg
                viewBox="0 0 800 500"
                className="absolute bottom-0 left-0 w-full opacity-30"
                preserveAspectRatio="xMidYMax meet"
              >
                <path d="M0,400 Q100,200 200,280 Q300,350 400,150 Q500,20 600,200 Q700,350 800,280 L800,500 L0,500 Z"
                  fill="#2d6a4f" />
                <path d="M0,450 Q150,320 300,380 Q450,430 600,350 Q700,300 800,380 L800,500 L0,500 Z"
                  fill="#40916c" />
              </svg>
              {/* Wind turbine */}
              <svg viewBox="0 0 200 400" className="absolute right-12 top-10 w-20 opacity-25">
                <line x1="100" y1="50" x2="100" y2="380" stroke="#1b4332" strokeWidth="6"/>
                <ellipse cx="100" cy="50" rx="6" ry="6" fill="#1b4332"/>
                <path d="M100,50 Q80,30 60,10 Q80,40 100,50" fill="#2d6a4f"/>
                <path d="M100,50 Q120,30 140,10 Q120,40 100,50" fill="#40916c"/>
                <path d="M100,50 Q90,70 85,100 Q100,70 100,50" fill="#1b4332"/>
              </svg>
              {/* Blur effect at edges */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to right, white 0%, transparent 20%, transparent 80%, white 100%)',
              }}/>
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to bottom, white 0%, transparent 10%, transparent 85%, white 100%)',
              }}/>
            </div>

            {/* Hero Bottle Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              className="relative z-10 flex items-center justify-center"
            >
              <motion.img
                src="/hero-bottle.png"
                alt="Minyak jelantah dalam botol kaca dengan simbol daur ulang"
                className="w-72 h-auto drop-shadow-2xl object-contain"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Stats Card — floating top right */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
              className="absolute top-12 right-6 z-20 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 w-52"
            >
              <p className="font-jakarta font-bold text-brand-text text-sm leading-snug mb-4">
                Setiap tetes punya<br />masa depan
              </p>
              <div className="space-y-3">
                {stats.map((s, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-lg leading-none mt-0.5">{s.icon}</span>
                    <div>
                      <div className="font-jakarta font-bold text-brand-text text-sm">{s.value}</div>
                      <div className="text-gray-400 text-xs leading-tight">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
