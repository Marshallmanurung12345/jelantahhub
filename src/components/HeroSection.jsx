import { motion } from "framer-motion";

const highlights = [
  { value: "500K+", label: "Liter potensi UCO yang sudah dipetakan" },
  { value: "425 Ton", label: "Estimasi emisi karbon yang bisa ditekan" },
  { value: "34", label: "Provinsi siap untuk pemetaan lebih dalam" },
];

const stats = [
  { label: "Sumber", value: "Rumah tangga, UMKM, dan komunitas" },
  { label: "Output", value: "Biodiesel dan insight wilayah" },
  { label: "Model", value: "Ekonomi sirkular berbasis data" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-[#E8E8E8] bg-white pt-12"
    >
      <div className="absolute inset-0 orange-wash" aria-hidden="true" />
      <div className="page-container relative">
        <div className="grid min-h-[calc(100vh-48px)] items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[680px]"
          >
            <span className="section-eyebrow">Transisi energi dimulai dari rumah</span>
            <h1 className="text-balance text-[32px] font-bold leading-[1.1] text-[#191919] md:text-[52px] lg:text-[64px]">
              Mengubah minyak jelantah menjadi aliran energi yang lebih bersih dan terukur.
            </h1>
            <p className="mt-6 max-w-[560px] text-[14px] leading-[1.7] text-[#303030] md:text-[16px]">
              UCOnnect menghadirkan landing page edukatif yang menunjukkan bahwa
              minyak jelantah bukan akhir dari siklus konsumsi, melainkan awal
              dari pasokan biodiesel yang lebih berguna, lebih aman, dan lebih
              mudah diukur dampaknya.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("map")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="button-accent"
              >
                Jelajahi Peta Dampak
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="button-secondary"
              >
                Lihat Cara Kerja
              </button>
            </div>

            <div className="mt-10 grid gap-px border border-[#E8E8E8] bg-[#E8E8E8] md:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="bg-white p-4 md:p-5">
                  <div className="text-[24px] font-semibold leading-6 text-[#191919]">
                    {item.value}
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.5] text-[#303030]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="surface-card relative overflow-hidden"
          >
            <div className="hairline-grid absolute inset-0 opacity-60" />
            <div className="absolute left-0 top-0 h-1 w-full bg-[#FF6900]" />
            <div className="relative grid gap-6 p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 border-b border-[#E8E8E8] pb-6">
                <div>
                  <div className="orange-chip">Ringkasan landing page</div>
                  <h2 className="mt-4 text-[30px] font-bold leading-[1.25] text-[#191919]">
                    Dari limbah menjadi bahan bakar.
                  </h2>
                  <p className="mt-3 max-w-[420px] text-[14px] leading-[1.6] text-[#303030]">
                    Sistem visualnya dibentuk seperti produk teknologi
                    konsumen: informatif, tajam, dan berorientasi aksi, dengan
                    aksen oranye untuk CTA utama.
                  </p>
                </div>
                <div className="hidden border border-[#E8E8E8] bg-[#F7F8FA] px-4 py-3 text-right md:block">
                  <div className="text-[12px] uppercase tracking-[0.14em] text-[#AEAEAE]">
                    Proyeksi 2026
                  </div>
                  <div className="mt-2 text-[24px] font-semibold text-[#191919]">
                    85%
                  </div>
                  <div className="text-[14px] text-[#303030]">potensi emisi lebih rendah</div>
                </div>
              </div>

              <div className="grid gap-px border border-[#E8E8E8] bg-[#E8E8E8]">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-2 bg-white px-4 py-4 md:grid-cols-[120px_1fr]"
                  >
                    <div className="text-[12px] uppercase tracking-[0.12em] text-[#AEAEAE]">
                      {item.label}
                    </div>
                    <div className="text-[14px] leading-[1.6] text-[#191919]">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                <div className="surface-soft p-5">
                  <div className="text-[12px] uppercase tracking-[0.12em] text-[#AEAEAE]">
                    Janji utama
                  </div>
                  <p className="mt-3 text-[24px] font-semibold leading-7 text-[#191919]">
                    Setiap tetes bisa dilacak, dinilai, dan dialihkan dari
                    pencemaran.
                  </p>
                </div>
                <div className="bg-[#191919] p-5 text-white">
                  <div className="text-[12px] uppercase tracking-[0.12em] text-white/60">
                    CTA utama
                  </div>
                  <p className="mt-3 text-[16px] leading-6">
                    Arahkan pengunjung untuk menjelajah data, memahami proses,
                    lalu ikut dalam gerakan pengumpulan.
                  </p>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .getElementById("calculator")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="inline-flex h-9 items-center justify-center bg-white px-5 text-[14px] text-[#191919] transition-colors hover:bg-[#F7F7F7]"
                    >
                      Hitung Dampak Anda
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
