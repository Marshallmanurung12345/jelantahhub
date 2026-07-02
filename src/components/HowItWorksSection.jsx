import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Data Konsumsi",
    description:
      "Volume konsumsi minyak goreng per kapita per minggu di setiap wilayah menjadi titik awal seluruh perhitungan data.",
  },
  {
    number: "02",
    title: "Estimasi Jelantah",
    description:
      "Diperkirakan dari persentase minyak goreng sisa pakai (UCO) yang dilepaskan ke lingkungan setelah aktivitas memasak.",
  },
  {
    number: "03",
    title: "Potensi Biodiesel",
    description:
      "Volume UCO yang terkumpul diestimasi melalui konversi reaksi transesterifikasi menjadi metil ester asam lemak (biodiesel).",
  },
  {
    number: "04",
    title: "Reduksi Emisi",
    description:
      "Dihitung berdasarkan selisih emisi karbon antara pembakaran biodiesel jelantah dengan bahan bakar solar fosil murni.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="page-section bg-[#f4f1eb] border-t border-[#eae6df]">
      <div className="page-container">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[760px] mb-20"
        >
          <span className="section-eyebrow">Metodologi Data</span>
          <h2 className="section-title">Bagaimana Data Dihitung?</h2>
          <p className="section-subtitle">
            Alur di bawah menjelaskan bagaimana visualisasi menurunkan potensi 
            nilai energi dan estimasi dampak lingkungan secara bertahap dari basis 
            data konsumsi wilayah.
          </p>
        </motion.div>

        {/* Horizontal Timeline Container */}
        <div className="relative mt-16">
          
          {/* Subtle Horizontal Connecting Line */}
          <div className="absolute top-6 left-8 right-8 h-[2px] bg-[#eae6df] hidden lg:block" aria-hidden="true">
            <motion.div 
              className="h-full bg-[#e05300] origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative flex flex-col items-start"
              >
                {/* Connector dot for timeline */}
                <div className="z-10 flex h-12 w-12 items-center justify-center bg-[#f4f1eb] border-2 border-[#eae6df] text-[15px] font-bold text-[#111111] transition-all duration-300 hover:border-[#e05300]">
                  <span className="text-[#e05300]">{step.number}</span>
                </div>

                {/* Content */}
                <h3 className="mt-6 text-[18px] font-medium text-[#111111] font-serif">
                  {step.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-[#444444]">
                  {step.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Narrative footnote */}
        <div className="mt-16 border-t border-[#eae6df] pt-8">
          <p className="text-[13px] leading-[1.6] text-[#666666] max-w-3xl">
            * Seluruh perhitungan dibangun menggunakan asumsi koefisien konversi nasional 
            secara konsisten untuk menyoroti perbedaan pola kontribusi spasial antardaerah, 
            bukan sebagai angka pengukuran operasional langsung di lapangan.
          </p>
        </div>

      </div>
    </section>
  );
}
