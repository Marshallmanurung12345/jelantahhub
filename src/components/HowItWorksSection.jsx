import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Collect",
    description:
      "Rumah tangga dan UMKM mengumpulkan jelantah agar tidak berakhir di saluran pembuangan.",
  },
  {
    number: "02",
    title: "Aggregate",
    description:
      "Bank jelantah, pengepul, atau komunitas menjadi titik pengumpulan yang lebih efisien.",
  },
  {
    number: "03",
    title: "Process",
    description:
      "Jelantah diproses menjadi biodiesel dengan kualitas yang bisa dimanfaatkan kembali.",
  },
  {
    number: "04",
    title: "Measure impact",
    description:
      "Platform menampilkan potensi biodiesel, emisi yang bisa dikurangi, dan sebaran wilayahnya.",
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
          <span className="section-eyebrow">How it works</span>
          <h2 className="section-title">A simple flow from kitchen waste to clean fuel</h2>
          <p className="section-subtitle">
            Alih-alih timeline dekoratif, section ini dibuat seperti langkah
            produk digital: singkat, tegas, dan mudah dipindai di desktop maupun mobile.
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
                  Alur UCOnnect
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

        <div className="mt-8 surface-card grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-6">
          <p className="text-[14px] leading-[1.6] text-[#303030]">
            Nilai desain yang diambil dari brief terasa di sini: whitespace luas,
            sharp container, dan aksen oranye hanya dipakai untuk sinyal tindakan
            atau penekanan.
          </p>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("calculator")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="button-accent"
          >
            Calculate Impact
          </button>
        </div>
      </div>
    </section>
  );
}
