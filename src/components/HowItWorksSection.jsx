import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  const containerRef = useRef(null);
  
  // Track scroll position of the section to animate timeline connection line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });
  
  // Transform scroll progress to line width percentage
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef}
      id="how-it-works" 
      className="page-section bg-[#f4f1eb] border-t border-[#eae6df] overflow-hidden"
    >
      <div className="page-container">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[760px] mb-24"
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
          
          {/* Dynamic Scroll-Linked Connecting Line */}
          <div className="absolute top-7 left-10 right-10 h-[2px] bg-[#eae6df] hidden lg:block" aria-hidden="true">
            <motion.div 
              className="h-full bg-[#e05300] origin-left"
              style={{ width: lineWidth }}
            />
          </div>

          <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-start"
              >
                {/* Larger step indicator dot */}
                <div className="z-10 flex h-14 w-14 items-center justify-center bg-[#f4f1eb] border-2 border-[#eae6df] text-[18px] font-bold text-[#e05300] transition-all duration-300 hover:border-[#e05300] hover:bg-[#eae6df]/30 font-serif">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="mt-8 text-[20px] font-medium text-[#111111] font-serif">
                  {step.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.7] text-[#444444]">
                  {step.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Narrative footnote */}
        <div className="mt-20 border-t border-[#eae6df] pt-8">
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
