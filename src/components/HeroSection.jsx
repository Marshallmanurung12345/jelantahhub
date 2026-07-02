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
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-start w-full lg:pl-12 lg:-mt-20"
          >
            <div className="relative w-full max-w-[720px] aspect-[5/4] flex items-center justify-center">
              {/* Unified circular-branching diagram SVG scaled up */}
              <svg
                viewBox="0 0 600 480"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* 1. PATHWAYS */}
                {/* Left-to-Top positive circular path: UCO -> Biodiesel */}
                <path
                  d="M 180,240 A 120,120 0 0,1 300,120"
                  stroke="#16a34a"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                
                {/* Top-to-Right positive circular path: Biodiesel -> Energi Bersih */}
                <path
                  d="M 300,120 A 120,120 0 0,1 420,240"
                  stroke="#16a34a"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Right-to-Bottom-Right positive circular path: Energi Bersih -> Manfaat Lingkungan */}
                <path
                  d="M 420,240 A 120,120 0 0,1 385,325"
                  stroke="#16a34a"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* UCO to Dibuang negative path (dashed) */}
                <path
                  d="M 180,240 L 180,325"
                  stroke="#e05300"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />

                {/* Dibuang to Pencemaran negative path (dashed) */}
                <path
                  d="M 180,325 L 180,410"
                  stroke="#e05300"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />

                {/* Animated active flows */}
                {/* Positive Flow Line */}
                <motion.path
                  d="M 180,240 A 120,120 0 0,1 300,120 A 120,120 0 0,1 420,240 A 120,120 0 0,1 385,325"
                  stroke="#16a34a"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                />

                {/* Negative Flow Line */}
                <motion.path
                  d="M 180,240 L 180,325 L 180,410"
                  stroke="#e05300"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="8 8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                />

                {/* Pathway Arrows */}
                {/* Arrow: UCO -> Biodiesel */}
                <path d="M 245,162 L 250,160 L 249,166" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Arrow: Biodiesel -> Energi Bersih */}
                <path d="M 365,168 L 370,168 L 369,173" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Arrow: Energi Bersih -> Manfaat Lingkungan */}
                <path d="M 414,284 L 413,290 L 408,288" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Arrow: UCO -> Dibuang */}
                <path d="M 177,276 L 180,280 L 183,276" stroke="#e05300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Arrow: Dibuang -> Pencemaran */}
                <path d="M 177,361 L 180,365 L 183,361" stroke="#e05300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />


                {/* 2. NODES (Circles and Icons) */}
                {/* Node: LIMBAH UCO */}
                <g>
                  <circle cx="180" cy="240" r="20" fill="#fcfbf9" stroke="#e05300" strokeWidth="1.5" />
                  {/* House Icon */}
                  <path d="M 173,243 V 238 H 187 V 243 Z M 173,238 L 180,232 L 187,238" stroke="#e05300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                {/* Node: BIODIESEL */}
                <g>
                  <circle cx="300" cy="120" r="20" fill="#fcfbf9" stroke="#16a34a" strokeWidth="1.5" />
                  {/* Refinery Factory Icon */}
                  <path d="M 292,126 V 116 L 298,120 V 116 L 304,120 V 116 H 308 V 126 Z M 295,126 H 305" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round" />
                </g>

                {/* Node: ENERGI BERSIH */}
                <g>
                  <circle cx="420" cy="240" r="20" fill="#fcfbf9" stroke="#16a34a" strokeWidth="1.5" />
                  {/* Lightning bolt icon */}
                  <path d="M 419,230 L 412,241 H 420 L 421,250 L 428,239 H 420 L 419,230 Z" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round" />
                </g>

                {/* Node: MANFAAT LINGKUNGAN */}
                <g>
                  <circle cx="385" cy="325" r="20" fill="#fcfbf9" stroke="#16a34a" strokeWidth="1.5" />
                  {/* Earth/Leaf Icon */}
                  <path d="M 377,327 A 8,8 0 1,1 393,327 A 8,8 0 1,1 377,327 M 382,332 L 388,322 M 385,327 H 393" stroke="#16a34a" strokeWidth="1.25" />
                </g>

                {/* Node: DIBUANG */}
                <g>
                  <circle cx="180" cy="325" r="20" fill="#fcfbf9" stroke="#e05300" strokeWidth="1.5" />
                  {/* Kitchen sink drain/pipe tap icon */}
                  <path d="M 173,327 H 187 M 177,327 V 320 A 3 3 0 0 1 183,320 V 323" stroke="#e05300" strokeWidth="1.5" />
                </g>

                {/* Node: PENCEMARAN */}
                <g>
                  <circle cx="180" cy="410" r="20" fill="#fcfbf9" stroke="#e05300" strokeWidth="1.5" />
                  {/* Waves icon */}
                  <path d="M 172,408 C 174,405 176,405 178,408 C 180,411 182,411 184,408 C 186,405 188,405 190,408" stroke="#e05300" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 172,402 C 174,399 176,399 178,402 C 180,405 182,405 184,402 C 186,399 188,399 190,402" stroke="#e05300" strokeWidth="1.5" strokeLinecap="round" />
                </g>


                {/* 3. CENTER RING (PROSES SIRKULAR) */}
                <g>
                  <circle cx="300" cy="240" r="32" fill="#eae6df" opacity="0.6" />
                  <circle cx="300" cy="240" r="42" stroke="#e05300" strokeWidth="0.5" strokeDasharray="3 2" />
                  {/* Oil droplet outline icon */}
                  <path
                    d="M 300,222 C 300,222 308,233 308,239 A 8 8 0 0 1 292,239 C 292,233 300,222 300,222 Z"
                    stroke="#111111"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text
                    x="300"
                    y="256"
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


                {/* 4. TYPOGRAPHY LABELS */}
                {/* Label: LIMBAH UCO */}
                <g>
                  <text x="145" y="235" textAnchor="end" fill="#111111" fontSize="11" fontWeight="700" className="font-sans">LIMBAH UCO</text>
                  <text x="145" y="247" textAnchor="end" fill="#444444" fontSize="9" className="font-sans">Minyak jelantah dari</text>
                  <text x="145" y="259" textAnchor="end" fill="#444444" fontSize="9" className="font-sans">aktivitas memasak</text>
                  <text x="145" y="271" textAnchor="end" fill="#444444" fontSize="9" className="font-sans">rumah tangga</text>
                </g>

                {/* Label: DIBUANG */}
                <g>
                  <text x="145" y="320" textAnchor="end" fill="#111111" fontSize="11" fontWeight="700" className="font-sans">DIBUANG</text>
                  <text x="145" y="332" textAnchor="end" fill="#444444" fontSize="9" className="font-sans">Dibuang sembarangan</text>
                  <text x="145" y="344" textAnchor="end" fill="#444444" fontSize="9" className="font-sans">ke saluran air</text>
                </g>

                {/* Label: PENCEMARAN */}
                <g>
                  <text x="145" y="402" textAnchor="end" fill="#111111" fontSize="11" fontWeight="700" className="font-sans">PENCEMARAN</text>
                  <text x="145" y="414" textAnchor="end" fill="#444444" fontSize="9" className="font-sans">Mencemari air, merusak</text>
                  <text x="145" y="426" textAnchor="end" fill="#444444" fontSize="9" className="font-sans">ekosistem dan kesehatan</text>
                </g>

                {/* Label: BIODIESEL */}
                <g>
                  <text x="300" y="74" textAnchor="middle" fill="#111111" fontSize="11" fontWeight="700" className="font-sans">BIODIESEL</text>
                  <text x="300" y="86" textAnchor="middle" fill="#444444" fontSize="9" className="font-sans">Diolah menjadi biodiesel</text>
                  <text x="300" y="98" textAnchor="middle" fill="#444444" fontSize="9" className="font-sans">berkualitas tinggi</text>
                </g>

                {/* Label: ENERGI BERSIH */}
                <g>
                  <text x="455" y="235" textAnchor="start" fill="#111111" fontSize="11" fontWeight="700" className="font-sans">ENERGI BERSIH</text>
                  <text x="455" y="247" textAnchor="start" fill="#444444" fontSize="9" className="font-sans">Menghasilkan energi</text>
                  <text x="455" y="259" textAnchor="start" fill="#444444" fontSize="9" className="font-sans">terbarukan yang</text>
                  <text x="455" y="271" textAnchor="start" fill="#444444" fontSize="9" className="font-sans">lebih bersih</text>
                </g>

                {/* Label: MANFAAT LINGKUNGAN */}
                <g>
                  <text x="420" y="322" textAnchor="start" fill="#111111" fontSize="11" fontWeight="700" className="font-sans">MANFAAT LINGKUNGAN</text>
                  <text x="420" y="334" textAnchor="start" fill="#444444" fontSize="9" className="font-sans">Mengurangi emisi karbon</text>
                  <text x="420" y="346" textAnchor="start" fill="#444444" fontSize="9" className="font-sans">dan mendukung masa depan</text>
                  <text x="420" y="358" textAnchor="start" fill="#444444" fontSize="9" className="font-sans">berkelanjutan</text>
                </g>
              </svg>

              <div className="absolute bottom-2 right-2 bg-[#f4f1eb] p-5 max-w-[200px] hidden md:block border border-[#eae6df] z-[5]">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#e05300]">TEMUAN UTAMA</p>
                <p className="text-[18px] font-medium text-[#111111] leading-tight mt-2 font-serif">85% Reduksi Emisi</p>
                <p className="text-[11px] text-[#444444] mt-1.5 leading-relaxed">dibandingkan dengan penggunaan solar fosil standar.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
