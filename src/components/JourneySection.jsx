import { motion } from "framer-motion";
import { ArrowRight, Droplets, Fuel, Leaf, Warehouse } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Konsumsi",
    value: "Konsumsi minyak goreng",
    description:
      "Konsumsi minyak goreng per kapita per minggu digunakan sebagai indikator dasar untuk membaca intensitas penggunaan di tiap wilayah.",
    icon: Droplets,
  },
  {
    id: "02",
    title: "Potensi jelantah",
    value: "Turunan dari konsumsi",
    description:
      "Dari konsumsi tersebut, dibuat estimasi besaran minyak jelantah yang berpotensi tersedia sebagai limbah sisa penggunaan.",
    icon: Warehouse,
  },
  {
    id: "03",
    title: "Potensi biodiesel",
    value: "Konversi asumsi",
    description:
      "Potensi minyak jelantah kemudian diterjemahkan ke estimasi biodiesel untuk memberi gambaran nilai energi yang mungkin dihasilkan.",
    icon: Fuel,
  },
  {
    id: "04",
    title: "Estimasi reduksi emisi",
    value: "Dampak lingkungan",
    description:
      "Tahap akhir menampilkan estimasi reduksi emisi sebagai indikator ringkas dampak lingkungan dari skenario pemanfaatan jelantah.",
    icon: Leaf,
  },
];

export default function JourneySection() {
  return (
    <section id="journey" className="page-section bg-white">
      <div className="page-container">
        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="bg-[#191919] p-6 text-white md:p-8"
          >
            <div className="text-[12px] uppercase tracking-[0.16em] text-white/60">
              Hubungan antarindikator
            </div>
            <h2 className="mt-4 text-[30px] font-bold leading-[1.2] text-white">
              Dari Konsumsi ke Potensi Energi
            </h2>
            <p className="mt-5 text-[14px] leading-[1.7] text-white/72">
              Bagian ini menjelaskan bagaimana satu indikator terhubung dengan
              indikator berikutnya. Fokusnya bukan pada alur operasional, tetapi
              pada cara membaca hubungan antarangka dalam visualisasi.
            </p>

            <div className="mt-8 grid gap-px border border-white/10 bg-white/10">
              {[
                ["Indikator awal", "Konsumsi minyak goreng"],
                ["Turunan utama", "Potensi minyak jelantah"],
                ["Konteks akhir", "Biodiesel dan estimasi emisi"],
              ].map(([label, value]) => (
                <div key={label} className="bg-[#111111] px-4 py-4">
                  <div className="text-[12px] uppercase tracking-[0.12em] text-white/50">
                    {label}
                  </div>
                  <div className="mt-2 text-[16px] font-bold text-white">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="overflow-visible grid gap-px border border-[#E8E8E8] bg-[#E8E8E8] pr-0 md:grid-cols-2 xl:grid-cols-4 xl:pr-6">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="relative bg-[#F7F8FA] p-5 md:p-6"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-[#E8E8E8] pb-4">
                    <div className="flex h-11 w-11 items-center justify-center bg-white text-[#FF6900]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-[24px] font-semibold leading-6 text-[#191919]">
                      {step.id}
                    </div>
                  </div>

                  <div className="mt-4 text-[12px] uppercase tracking-[0.12em] text-[#FF6900]">
                    {step.value}
                  </div>
                  <h3 className="mt-3 text-[16px] font-bold text-[#191919]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.6] text-[#303030]">
                    {step.description}
                  </p>

                  {index < steps.length - 1 ? (
                    <div className="mt-5 flex items-center gap-2 text-[12px] uppercase tracking-[0.1em] text-[#AEAEAE] xl:hidden">
                      <ArrowRight className="h-4 w-4 text-[#FF6900]" />
                      Tahap berikutnya
                    </div>
                  ) : null}

                  {index < steps.length - 1 ? (
                    <div className="pointer-events-none absolute right-0 top-1/2 z-[2] hidden translate-x-[60%] -translate-y-1/2 xl:flex">
                      <div className="flex h-9 w-9 items-center justify-center border border-[#E8E8E8] bg-white">
                        <ArrowRight className="h-4 w-4 text-[#FF6900]" />
                      </div>
                    </div>
                  ) : null}
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
