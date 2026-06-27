import { motion } from "framer-motion";

const problems = [
  {
    title: "Pencemaran lingkungan",
    description:
      "Minyak jelantah yang dibuang ke saluran air merusak kualitas air, mengganggu ekosistem, dan menambah beban pengolahan limbah domestik.",
    value: "1 Liter",
    note: "dapat mencemari hingga 1.000 liter air",
  },
  {
    title: "Drainase dan sanitasi terganggu",
    description:
      "Lemak dan residu minyak dapat menyumbat pipa, memperburuk drainase kota, dan memicu biaya pemeliharaan yang lebih tinggi.",
    value: "3,6 Juta Ton",
    note: "potensi limbah UCO per tahun di Indonesia",
  },
  {
    title: "Peluang energi belum dimanfaatkan",
    description:
      "Padahal limbah ini bisa masuk kembali ke rantai nilai sebagai biodiesel dan memberi reduksi emisi yang jauh lebih baik dibanding solar fosil.",
    value: "85%",
    note: "estimasi reduksi emisi vs solar fosil",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="page-section bg-white">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-[760px]"
        >
          <span className="section-eyebrow">The problem</span>
          <h2 className="section-title">Why used cooking oil deserves attention</h2>
          <p className="section-subtitle">
            Landing page ini perlu menjelaskan urgensi dengan bahasa visual yang
            lugas: masalah lingkungan jelas, peluang energinya nyata, dan aksi
            penggunanya terlihat masuk akal.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-px border border-[#E8E8E8] bg-[#E8E8E8] lg:grid-cols-3">
          {problems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="bg-white p-6 md:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[12px] uppercase tracking-[0.12em] text-[#AEAEAE]">
                  0{index + 1}
                </span>
                <span className="h-2 w-2 rounded-full bg-[#FF6900]" />
              </div>
              <h3 className="mt-6 text-[16px] font-bold leading-5 text-[#191919]">
                {item.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.6] text-[#303030]">
                {item.description}
              </p>
              <div className="mt-8 border-t border-[#E8E8E8] pt-5">
                <div className="text-[24px] font-semibold leading-6 text-[#191919]">
                  {item.value}
                </div>
                <p className="mt-2 text-[14px] leading-[1.5] text-[#303030]">
                  {item.note}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
