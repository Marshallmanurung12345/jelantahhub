import { motion } from "framer-motion";

const metrics = [
  {
    value: "1 Liter",
    label: "mencemari hingga 1.000 liter air bersih",
    desc: "Minyak jelantah yang dibuang sembarangan menyumbat saluran air, merusak ekosistem akuatik, dan membebani sanitasi perkotaan.",
  },
  {
    value: "3,6 Juta Ton",
    label: "potensi limbah UCO per tahun",
    desc: "Besarnya konsumsi minyak goreng rumah tangga menghasilkan aliran limbah cair melimpah yang belum terkelola secara optimal.",
  },
  {
    value: "85%",
    label: "potensi reduksi emisi karbon",
    desc: "Mengonversi minyak sisa ini menjadi biodiesel mengurangi ketergantungan pada solar fosil sekaligus menekan emisi gas rumah kaca.",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="page-section bg-[#fcfbf9] border-t border-[#eae6df]">
      <div className="page-container">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          
          {/* Left Column: Narrative & Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-eyebrow">Dampak Lingkungan</span>
            <h2 className="section-title">
              Mengapa Minyak Jelantah Penting?
            </h2>
            <p className="section-subtitle">
              Konsumsi minyak goreng harian menyisakan limbah cair yang sering terabaikan. 
              Tanpa pengelolaan yang tepat, minyak sisa ini menjadi ancaman serius bagi 
              sanitasi perkotaan dan kualitas perairan kita. Namun di balik ancaman tersebut, 
              terdapat potensi energi bersih yang sangat besar.
            </p>

            <div className="mt-12 space-y-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.value}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex gap-6 border-l-2 border-[#e05300] pl-6 py-1"
                >
                  <div className="min-w-[120px] md:min-w-[150px]">
                    <div className="text-[28px] font-medium leading-none text-[#e05300] font-serif md:text-[36px]">
                      {metric.value}
                    </div>
                    <div className="mt-1.5 text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                      {metric.label}
                    </div>
                  </div>
                  <div className="text-[14px] leading-[1.6] text-[#444444]">
                    {metric.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Large Illustrative Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex items-center justify-center bg-[#f4f1eb] p-8 md:p-12 aspect-[4/5] relative overflow-hidden"
          >
            <div className="absolute inset-0 hairline-grid opacity-30 pointer-events-none" />
            
            <svg
              viewBox="0 0 320 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full max-w-[280px]"
            >
              {/* Flow representing water pollution on top/left vs clean energy on right */}
              {/* Flow Path 1 - Waste Path */}
              <path
                d="M 60,60 C 60,180 120,180 120,240 C 120,300 80,300 80,360"
                stroke="#e05300"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.6"
              />
              {/* Flow Path 2 - Green energy Path */}
              <path
                d="M 260,60 C 260,180 200,180 200,240 C 200,300 240,300 240,360"
                stroke="#16a34a"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Water Pollution Illustration (Top) */}
              <g>
                <circle cx="60" cy="80" r="28" fill="#fcfbf9" stroke="#e05300" strokeWidth="1" />
                {/* Abstract oil droplets in water */}
                <path d="M54 75 C54 70, 66 70, 66 75 C66 82, 54 82, 54 75" fill="#e05300" opacity="0.8" />
                <path d="M58 84 C58 81, 62 81, 62 84 C62 87, 58 87, 58 84" fill="#ff7819" />
                <text x="60" y="125" textAnchor="middle" fill="#111111" fontSize="10" fontWeight="700" letterSpacing="0.1em">CEMAR AIR</text>
              </g>

              {/* River/Drainage block (Middle left) */}
              <g>
                <circle cx="120" cy="220" r="24" fill="#fcfbf9" stroke="#111111" strokeWidth="1" />
                <path d="M112 216 H128 M112 220 H128 M112 224 H128" stroke="#111111" strokeWidth="1.5" />
                <text x="120" y="260" textAnchor="middle" fill="#111111" fontSize="10" fontWeight="700" letterSpacing="0.1em">SALURAN</text>
              </g>

              {/* Biodiesel leaf (Right/Bottom) */}
              <g>
                <circle cx="200" cy="260" r="32" fill="#fcfbf9" stroke="#16a34a" strokeWidth="1.5" />
                {/* Leaf icon */}
                <path d="M190 268C190 252 210 248 210 248C210 248 206 268 190 268Z" fill="#16a34a" />
                <path d="M210 248L190 268" stroke="#fcfbf9" strokeWidth="1.5" />
                <text x="200" y="310" textAnchor="middle" fill="#111111" fontSize="10" fontWeight="700" letterSpacing="0.1em">BIODIESEL</text>
              </g>

              <text x="160" y="20" textAnchor="middle" fill="#444444" fontSize="11" fontWeight="500" letterSpacing="0.15em">RUTE LIMBAH VS ENERGI</text>
            </svg>

            {/* Caption Overlay */}
            <div className="absolute bottom-4 right-4 bg-[#fcfbf9] px-4 py-2 border border-[#eae6df]">
              <span className="text-[11px] font-bold text-[#111111] uppercase tracking-wider">Visualisasi Sirkularitas</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
