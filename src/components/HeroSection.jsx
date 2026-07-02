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
              {/* Premium Animated SVG representing fluid energy sirkularitas */}
              <svg
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Editorial grid lines background */}
                <circle cx="200" cy="200" r="170" stroke="#eae6df" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="200" cy="200" r="130" stroke="#eae6df" strokeWidth="0.75" />
                <circle cx="200" cy="200" r="90" stroke="#eae6df" strokeWidth="1" strokeDasharray="8 6" />

                {/* Flowing Path: Clean continuous oval track */}
                <path
                  d="M 70,200 C 70,100 130,60 200,60 C 270,60 330,100 330,200 C 330,300 270,340 200,340 C 130,340 70,300 70,200 Z"
                  stroke="#eae6df"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Animated active energy flow lines: Draws from UCO -> Biodiesel -> Energi Bersih */}
                <motion.path
                  d="M 70,200 C 70,100 130,60 200,60 C 270,60 330,100 330,200"
                  stroke="url(#heroFlowGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                />

                {/* Node 1: Waste Oil (Amber/Yellow) */}
                <g>
                  <circle cx="70" cy="200" r="14" fill="#fcfbf9" stroke="#e05300" strokeWidth="1.5" />
                  <motion.circle
                    cx="70"
                    cy="200"
                    r="6"
                    fill="#e05300"
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <text x="70" y="235" textAnchor="middle" fill="#111111" fontSize="10" fontWeight="700" letterSpacing="0.1em" className="font-sans">LIMBAH UCO</text>
                </g>

                {/* Node 2: Biodiesel conversion (Golden Amber) */}
                <g>
                  <circle cx="200" cy="60" r="14" fill="#fcfbf9" stroke="#ff7819" strokeWidth="1.5" />
                  <motion.circle
                    cx="200"
                    cy="60"
                    r="6"
                    fill="#ff7819"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2.2, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <text x="200" y="38" textAnchor="middle" fill="#111111" fontSize="10" fontWeight="700" letterSpacing="0.1em" className="font-sans">BIODIESEL</text>
                </g>

                {/* Node 3: Clean Environment (Green/Eco) */}
                <g>
                  <circle cx="330" cy="200" r="14" fill="#fcfbf9" stroke="#16a34a" strokeWidth="1.5" />
                  <motion.circle
                    cx="330"
                    cy="200"
                    r="6"
                    fill="#16a34a"
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 2.4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <text x="330" y="235" textAnchor="middle" fill="#111111" fontSize="10" fontWeight="700" letterSpacing="0.1em" className="font-sans">ENERGI BERSIH</text>
                </g>

                {/* Center abstract geometry */}
                <g>
                  <circle cx="200" cy="200" r="32" fill="#eae6df" opacity="0.6" />
                  <circle cx="200" cy="200" r="42" stroke="#e05300" strokeWidth="0.5" strokeDasharray="3 2" />
                  {/* Oil droplet outline icon */}
                  <path
                    d="M 200,180 C 200,180 210,192 210,199 A 10 10 0 0 1 190,199 C 190,192 200,180 200,180 Z"
                    stroke="#111111"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text
                    x="200"
                    y="218"
                    textAnchor="middle"
                    fill="#111111"
                    fontSize="7"
                    fontWeight="800"
                    letterSpacing="0.08em"
                    className="font-sans"
                  >
                    PROSES SIRKULAR
                  </text>
                </g>

                <defs>
                  <linearGradient id="heroFlowGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#e05300" />
                    <stop offset="50%" stopColor="#ff7819" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute -bottom-4 -left-4 bg-[#f4f1eb] p-6 max-w-[200px] hidden md:block border border-[#eae6df]">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#e05300]">TEMUAN UTAMA</p>
                <p className="text-[20px] font-medium text-[#111111] leading-tight mt-2 font-serif">85% Reduksi Emisi</p>
                <p className="text-[12px] text-[#444444] mt-1.5 leading-relaxed">dibandingkan dengan penggunaan solar fosil standar.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
