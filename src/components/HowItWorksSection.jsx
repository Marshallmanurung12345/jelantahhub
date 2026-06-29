import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Konsumsi minyak goreng",
    description:
      "Angka konsumsi per kapita per minggu menjadi dasar pembacaan awal untuk melihat intensitas penggunaan minyak goreng di suatu wilayah.",
  },
  {
    number: "02",
    title: "Estimasi potensi jelantah",
    description:
      "Dari konsumsi tersebut, visualisasi menurunkan perkiraan volume minyak jelantah yang berpotensi tersedia sebagai limbah sisa pakai.",
  },
  {
    number: "03",
    title: "Estimasi biodiesel",
    description:
      "Potensi jelantah kemudian diterjemahkan ke estimasi volume biodiesel melalui asumsi konversi yang sama di seluruh wilayah.",
  },
  {
    number: "04",
    title: "Estimasi reduksi emisi",
    description:
      "Dari estimasi biodiesel, visualisasi menampilkan perkiraan reduksi emisi untuk memberi gambaran dampak lingkungan pada level wilayah.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="page-section bg-[#F7F8FA]">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-[760px]"
        >
          <span className="section-eyebrow">Panduan baca</span>
          <h2 className="section-title">Cara Membaca Visualisasi Ini</h2>
          <p className="section-subtitle">
            Empat indikator utama di bawah ini dipakai untuk membaca hubungan
            antara konsumsi minyak goreng, potensi minyak jelantah, biodiesel,
            dan estimasi reduksi emisi.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-px border border-[#E8E8E8] bg-[#E8E8E8] lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="bg-white p-6 md:p-8"
            >
              <div className="flex items-center justify-between border-b border-[#E8E8E8] pb-4">
                <span className="text-[24px] font-semibold leading-6 text-[#191919]">
                  {step.number}
                </span>
                <span className="text-[12px] uppercase tracking-[0.12em] text-[#FF6900]">
                  Indikator
                </span>
              </div>
              <h3 className="mt-5 text-[16px] font-bold text-[#191919]">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#303030]">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 surface-card p-5 md:p-6">
          <p className="text-[14px] leading-[1.6] text-[#303030]">
            Seluruh angka pada halaman ini bersifat informatif dan dibangun dari
            asumsi simulasi yang konsisten, sehingga cocok dipakai untuk melihat
            pola umum antarwilayah, bukan untuk pembacaan operasional yang sangat rinci.
          </p>
        </div>
      </div>
    </section>
  );
}
