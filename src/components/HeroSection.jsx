import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#fcfbf9] pt-24 md:pt-32"
    >
      <div className="absolute inset-0 orange-wash" aria-hidden="true" />
      <div className="page-container relative z-10">
        <div className="grid min-h-[75vh] items-center gap-12 py-12 lg:grid-cols-2 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[620px]"
          >
            <span className="section-eyebrow">Atlas Jelantah Indonesia</span>
            <h1 className="text-balance text-[48px] font-medium leading-[1.08] text-[#111111] md:text-[64px] lg:text-[76px]">
              Minyak Jelantah Menjadi Energi Bersih
            </h1>
            <p className="mt-8 text-[16px] leading-[1.7] text-[#444444] md:text-[18px]">
              Eksplorasi interaktif tentang potensi minyak jelantah di Indonesia. 
              Dari limbah dapur rumah tangga menjadi biodiesel ramah lingkungan, 
              serta perannya dalam mereduksi emisi karbon nasional. Pahami ceritanya 
              melalui rangkaian data spasial interaktif.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("map")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="button-accent"
              >
                Lihat Peta Interaktif
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("problem")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="button-secondary"
              >
                Mulai Membaca Cerita ↓
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
              {/* Custom Editorial SVG Visualizer representing oil to biodiesel sirkularitas */}
              <svg
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Concentric subtle background rings */}
                <circle cx="200" cy="200" r="180" stroke="#eae6df" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="200" cy="200" r="140" stroke="#eae6df" strokeWidth="1" />
                <circle cx="200" cy="200" r="100" stroke="#eae6df" strokeWidth="1" strokeDasharray="8 4" />

                {/* Animated flowing path (Used Cooking Oil to Clean Energy) */}
                <motion.path
                  d="M 60,200 C 60,122.68 122.68,60 200,60 C 277.32,60 340,122.68 340,200 C 340,277.32 277.32,340 200,340 C 122.68,340 60,277.32 60,200 Z"
                  stroke="url(#heroFlowGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                />

                {/* Node 1: Waste Oil (Amber/Yellow) */}
                <g>
                  <circle cx="60" cy="200" r="18" fill="#fcfbf9" stroke="#e05300" strokeWidth="1.5" />
                  <motion.circle
                    cx="60"
                    cy="200"
                    r="8"
                    fill="#e05300"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <text x="60" y="235" textAnchor="middle" fill="#111111" fontSize="11" fontWeight="600" letterSpacing="0.1em">LIMBAH UCO</text>
                </g>

                {/* Node 2: Biodiesel conversion (Golden Amber) */}
                <g>
                  <circle cx="200" cy="60" r="18" fill="#fcfbf9" stroke="#ff7819" strokeWidth="1.5" />
                  <motion.circle
                    cx="200"
                    cy="60"
                    r="8"
                    fill="#ff7819"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 3, delay: 1, repeat: Infinity }}
                  />
                  <text x="200" y="38" textAnchor="middle" fill="#111111" fontSize="11" fontWeight="600" letterSpacing="0.1em">BIODIESEL</text>
                </g>

                {/* Node 3: Clean Environment (Green/Eco) */}
                <g>
                  <circle cx="340" cy="200" r="18" fill="#fcfbf9" stroke="#16a34a" strokeWidth="1.5" />
                  <motion.circle
                    cx="340"
                    cy="200"
                    r="8"
                    fill="#16a34a"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, delay: 2, repeat: Infinity }}
                  />
                  <text x="340" y="235" textAnchor="middle" fill="#111111" fontSize="11" fontWeight="600" letterSpacing="0.1em">ENERGI BERSIH</text>
                </g>

                {/* Decorative center icon or element */}
                <g>
                  <circle cx="200" cy="200" r="32" fill="#eae6df" />
                  <path d="M194 206L200 212L212 200M188 194L200 182L206 188" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="200" cy="200" r="42" stroke="#e05300" strokeWidth="0.5" strokeDasharray="4 2" />
                </g>

                {/* Gradients */}
                <defs>
                  <linearGradient id="heroFlowGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#e05300" />
                    <stop offset="50%" stopColor="#ff7819" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Absolute background card element replaced with decorative label */}
              <div className="absolute -bottom-4 -left-4 bg-[#f4f1eb] p-6 max-w-[200px] hidden md:block">
                <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#e05300]">TEMUAN UTAMA</p>
                <p className="text-[20px] font-medium text-[#111111] leading-tight mt-2 font-serif">85% Reduksi Emisi</p>
                <p className="text-[12px] text-[#444444] mt-1">dibandingkan dengan penggunaan solar fosil standar.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
