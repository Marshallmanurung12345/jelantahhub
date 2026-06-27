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
              CTA penutup
            </div>
            <h2 className="mt-4 max-w-[720px] text-[30px] font-bold leading-[1.2] text-white md:text-[42px]">
              Setiap tetes bisa menggerakkan masa depan saat pengumpulannya terlihat dan mudah ditindaklanjuti.
            </h2>
            <p className="mt-5 max-w-[560px] text-[14px] leading-[1.7] text-white/72">
              Penutup halaman saya buat lebih tegas dan product-like: kontras tinggi,
              aksen oranye yang fokus, dan dua CTA yang langsung mengarahkan pengguna
              ke aksi berikutnya.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("calculator")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="button-accent"
              >
                Hitung Dampak Anda
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("map")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex h-9 items-center justify-center border border-white/20 px-5 text-[14px] text-white transition-colors hover:bg-white hover:text-[#191919]"
              >
                Jelajahi Peta
              </button>
            </div>
          </div>

          <div className="bg-[#111111] p-6 md:p-8">
            <div className="text-[12px] uppercase tracking-[0.16em] text-white/60">
              Ringkasan
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
