import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section id="cta" className="page-section bg-[#191919] text-white">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid gap-px border border-white/10 bg-white/10 lg:grid-cols-[1fr_320px]"
        >
          <div className="bg-[#191919] p-6 md:p-10">
            <div className="text-[12px] uppercase tracking-[0.16em] text-white/60">
              Ringkasan
            </div>
            <h2 className="mt-4 max-w-[720px] text-[30px] font-bold leading-[1.2] text-white md:text-[42px]">
              Ringkasan Temuan Utama
            </h2>
            <p className="mt-5 max-w-[560px] text-[14px] leading-[1.7] text-white/72">
              Konsumsi minyak goreng dapat dibaca sebagai indikator awal untuk
              memahami potensi minyak jelantah, kemungkinan keluaran biodiesel,
              dan gambaran reduksi emisi di berbagai wilayah Indonesia.
            </p>

            <div className="mt-8 grid gap-px border border-white/10 bg-white/10">
              {[
                "Wilayah dengan konsumsi lebih tinggi cenderung menunjukkan potensi jelantah yang lebih besar.",
                "Estimasi biodiesel dan reduksi emisi diturunkan dari asumsi yang seragam agar perbandingan wilayah tetap konsisten.",
                "Peta interaktif dan peringkat wilayah membantu pembacaan pola spasial secara cepat.",
              ].map((item) => (
                <div key={item} className="bg-[#111111] px-4 py-4 text-[14px] leading-[1.6] text-white/78">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#111111] p-6 md:p-8">
            <div className="text-[12px] uppercase tracking-[0.16em] text-white/60">
              Gambaran umum nasional
            </div>
            <div className="mt-5 grid gap-px border border-white/10 bg-white/10">
              {[
                ["34", "Provinsi"],
                ["500K+", "Liter potensi UCO"],
                ["85%", "Potensi reduksi emisi"],
              ].map(([value, label]) => (
                <div key={label} className="bg-[#191919] px-4 py-4">
                  <div className="text-[24px] font-semibold text-white">{value}</div>
                  <div className="mt-1 text-[14px] text-white/68">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
