import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// Node configuration data for the interactive flow diagram
const nodesData = {
  source: {
    id: "source",
    title: "Minyak Jelantah",
    desc: "Limbah minyak sisa memasak rumah tangga yang menyimpan potensi ekonomi dan energi tersembunyi.",
    x: 200,
    y: 50,
    color: "border-[#e05300]",
  },
  negative: [
    {
      id: "neg1",
      title: "Dibuang Sembarangan",
      desc: "Limbah dilepas langsung ke saluran air perkotaan atau tanah karena ketiadaan tempat penampung.",
      x: 100,
      y: 150,
      color: "border-[#e05300]",
    },
    {
      id: "neg2",
      title: "Pencemaran Air",
      desc: "Lapisan minyak memutus suplai oksigen, menurunkan baku mutu air bersih, dan merusak ekosistem.",
      x: 100,
      y: 250,
      color: "border-[#e05300]",
    },
    {
      id: "neg3",
      title: "Saluran Tersumbat",
      desc: "Minyak membeku dan berikatan dengan sampah padat, menyumbat saluran drainase kota.",
      x: 100,
      y: 350,
      color: "border-[#e05300]",
    },
    {
      id: "neg4",
      title: "Bencana Sanitasi",
      desc: "Menimbulkan beban biaya sanitasi daerah tinggi dan bau busuk yang mengganggu lingkungan.",
      x: 100,
      y: 450,
      color: "border-[#e05300]",
    },
  ],
  positive: [
    {
      id: "pos1",
      title: "Wadah Pengumpulan",
      desc: "Jelantah disaring dan disimpan di dalam wadah/jerigen tertutup sebelum diserahkan.",
      x: 300,
      y: 150,
      color: "border-[#16a34a]",
    },
    {
      id: "pos2",
      title: "Transesterifikasi",
      desc: "Diproses secara kimia di reaktor biodiesel untuk memisahkan kandungan gliserin kasar.",
      x: 300,
      y: 250,
      color: "border-[#16a34a]",
    },
    {
      id: "pos3",
      title: "Produk Biodiesel",
      desc: "Menghasilkan bahan bakar metil ester (FAME) berkualitas tinggi pengganti solar murni.",
      x: 300,
      y: 350,
      color: "border-[#16a34a]",
    },
    {
      id: "pos4",
      title: "Energi Ramah Lingkungan",
      desc: "Digunakan sebagai energi bersih dengan tingkat emisi karbon 85% lebih rendah dibanding solar fosil.",
      x: 300,
      y: 450,
      color: "border-[#16a34a]",
    },
  ],
};

export default function ProblemSection() {
  const [hoveredNode, setHoveredNode] = useState(null);

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

          {/* Right Column: Large Interactive Storytelling Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center justify-center bg-[#f4f1eb] p-6 md:p-8 aspect-[4/5] relative overflow-hidden border border-[#eae6df]"
          >
            <div className="absolute inset-0 hairline-grid opacity-30 pointer-events-none" />
            
            <div className="relative w-full h-full max-w-[360px]">
              <svg
                viewBox="0 0 400 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Branch Line: Source to Left (Negative Path) */}
                <motion.path
                  d="M 200,50 L 100,150"
                  stroke="#e05300"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
                />

                {/* Branch Line: Source to Right (Positive Path) */}
                <motion.path
                  d="M 200,50 L 300,150"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
                />

                {/* Left Route (Negative Lines) */}
                <motion.path
                  d="M 100,150 L 100,250"
                  stroke="#e05300"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 100,250 L 100,350"
                  stroke="#e05300"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.4, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 100,350 L 100,450"
                  stroke="#e05300"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 2.1, ease: "easeInOut" }}
                />

                {/* Right Route (Positive Lines) */}
                <motion.path
                  d="M 300,150 L 300,250"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 300,250 L 300,350"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.4, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 300,350 L 300,450"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 2.1, ease: "easeInOut" }}
                />

                {/* 1. SOURCE NODE: Minyak Jelantah */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 15, delay: 0 }}
                  onMouseEnter={() => setHoveredNode(nodesData.source)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  <circle cx="200" cy="50" r="20" fill="#fcfbf9" stroke="#e05300" strokeWidth="2" />
                  {/* Bottle Outline Icon */}
                  <path d="M197 45 H203 M196 48 H204 M196 48 V58 A 2 2 0 0 1 200 60 A 2 2 0 0 1 204 58 V48" stroke="#e05300" strokeWidth="1.5" strokeLinecap="round" />
                  <text x="200" y="82" textAnchor="middle" fill="#111111" fontSize="9" fontWeight="700" letterSpacing="0.1em" className="font-sans">JELANTAH</text>
                </motion.g>

                {/* NEGATIVE PATHWAY NODES */}
                {/* Neg 1: Dibuang */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 15, delay: 0.6 }}
                  onMouseEnter={() => setHoveredNode(nodesData.negative[0])}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  <circle cx="100" cy="150" r="18" fill="#fcfbf9" stroke="#e05300" strokeWidth="1.5" />
                  {/* Kitchen Drain Icon */}
                  <path d="M92 150 H108 M96 150 V156 A 4 4 0 0 0 104 156 V150" stroke="#e05300" strokeWidth="1.5" />
                  <text x="100" y="180" textAnchor="middle" fill="#666666" fontSize="9" fontWeight="700" className="font-sans">DIBUANG</text>
                </motion.g>

                {/* Neg 2: Cemar Air */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 15, delay: 1.3 }}
                  onMouseEnter={() => setHoveredNode(nodesData.negative[1])}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  <circle cx="100" cy="250" r="18" fill="#fcfbf9" stroke="#e05300" strokeWidth="1.5" />
                  {/* Water Wave Icon */}
                  <path d="M92 250 C94 247, 96 247, 98 250 C100 253, 102 253, 104 250 C106 247, 108 247, 110 250" stroke="#e05300" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M92 254 C94 251, 96 251, 98 254 C100 257, 102 257, 104 254 C106 251, 108 251, 110 254" stroke="#e05300" strokeWidth="1.5" strokeLinecap="round" />
                  <text x="100" y="280" textAnchor="middle" fill="#666666" fontSize="9" fontWeight="700" className="font-sans">CEMAR AIR</text>
                </motion.g>

                {/* Neg 3: Saluran Tersumbat */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 15, delay: 2.0 }}
                  onMouseEnter={() => setHoveredNode(nodesData.negative[2])}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  <circle cx="100" cy="350" r="18" fill="#fcfbf9" stroke="#e05300" strokeWidth="1.5" />
                  {/* Clogged Pipe Icon */}
                  <path d="M91 346 H109 M91 354 H109 M97 346 V354 M103 346 V354" stroke="#e05300" strokeWidth="1.5" />
                  <circle cx="100" cy="350" r="4" fill="#e05300" />
                  <text x="100" y="380" textAnchor="middle" fill="#666666" fontSize="9" fontWeight="700" className="font-sans">TERSUMBAT</text>
                </motion.g>

                {/* Neg 4: Dampak Lingkungan */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 15, delay: 2.7 }}
                  onMouseEnter={() => setHoveredNode(nodesData.negative[3])}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  <circle cx="100" cy="450" r="18" fill="#fcfbf9" stroke="#e05300" strokeWidth="1.5" />
                  {/* Clogged Ecosystem Indicator */}
                  <path d="M94 456 L100 444 L106 456 Z M100 449 V451 M100 454 H100.2" stroke="#e05300" strokeWidth="1.5" strokeLinecap="round" />
                  <text x="100" y="480" textAnchor="middle" fill="#666666" fontSize="9" fontWeight="700" className="font-sans">POLUSI</text>
                </motion.g>

                {/* POSITIVE PATHWAY NODES */}
                {/* Pos 1: Dikumpulkan */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 15, delay: 0.6 }}
                  onMouseEnter={() => setHoveredNode(nodesData.positive[0])}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  <circle cx="300" cy="150" r="18" fill="#fcfbf9" stroke="#16a34a" strokeWidth="1.5" />
                  {/* Barrel/Container Icon */}
                  <path d="M294 144 H306 M293 148 H307 M293 148 V156 A 7 7 0 0 0 307 156 V148" stroke="#16a34a" strokeWidth="1.5" />
                  <text x="300" y="180" textAnchor="middle" fill="#666666" fontSize="9" fontWeight="700" className="font-sans">KUMPUL</text>
                </motion.g>

                {/* Pos 2: Transesterifikasi */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 15, delay: 1.3 }}
                  onMouseEnter={() => setHoveredNode(nodesData.positive[1])}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  <circle cx="300" cy="250" r="18" fill="#fcfbf9" stroke="#16a34a" strokeWidth="1.5" />
                  {/* Factory refinery icon */}
                  <path d="M292 256 V244 L298 248 V244 L304 248 V244 L308 244 V256 Z M295 256 H305" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round" />
                  <text x="300" y="280" textAnchor="middle" fill="#666666" fontSize="9" fontWeight="700" className="font-sans">REAKTOR</text>
                </motion.g>

                {/* Pos 3: Produk Biodiesel */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 15, delay: 2.0 }}
                  onMouseEnter={() => setHoveredNode(nodesData.positive[2])}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  <circle cx="300" cy="350" r="18" fill="#fcfbf9" stroke="#16a34a" strokeWidth="1.5" />
                  {/* Fuel Droplet Icon */}
                  <path d="M300 341 C300 341, 307 348, 307 352 A 7 7 0 0 1 293 352 C293 348, 300 341, 300 341 Z" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round" />
                  <text x="300" y="380" textAnchor="middle" fill="#666666" fontSize="9" fontWeight="700" className="font-sans">BIODIESEL</text>
                </motion.g>

                {/* Pos 4: Energi Bersih */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 15, delay: 2.7 }}
                  onMouseEnter={() => setHoveredNode(nodesData.positive[3])}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  <circle cx="300" cy="450" r="18" fill="#fcfbf9" stroke="#16a34a" strokeWidth="1.5" />
                  {/* Leaf Icon */}
                  <path d="M292 454C292 444 304 442 304 442C304 442 302 454 292 454Z" fill="#16a34a" />
                  <path d="M304 442L292 454" stroke="#fcfbf9" strokeWidth="1.5" />
                  <text x="300" y="480" textAnchor="middle" fill="#666666" fontSize="9" fontWeight="700" className="font-sans">EKO ENERGI</text>
                </motion.g>
              </svg>

              {/* Absolute hovering tooltip */}
              <AnimatePresence>
                {hoveredNode && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-[20] w-[200px] bg-[#fcfbf9] p-3 border border-[#eae6df] shadow-xl text-left pointer-events-none"
                    style={{
                      left: `${(hoveredNode.x / 400) * 100}%`,
                      top: `${(hoveredNode.y / 500) * 100 - 12}%`,
                      transform: "translate(-50%, -100%)",
                    }}
                  >
                    <h5 className="font-serif font-bold text-[12px] text-[#111111] leading-snug">
                      {hoveredNode.title}
                    </h5>
                    <p className="mt-1 text-[10px] text-[#555555] leading-relaxed">
                      {hoveredNode.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sub-label explaining branching pathways */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[9px] font-bold tracking-widest text-[#666666] uppercase">
              <span>← Rute Dampak Negatif</span>
              <span>Rute Sirkular Positif →</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
