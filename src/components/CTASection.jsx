import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section id="cta" className="page-section bg-[#111111] text-[#fcfbf9] relative overflow-hidden">
      <div className="absolute inset-0 hairline-grid opacity-5 pointer-events-none" />
      
      <div className="page-container relative z-10">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          
          {/* Narrative Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#e05300]">
              Kesimpulan & Harapan
            </span>
            <h2 className="mt-6 text-[36px] font-medium leading-[1.15] text-white font-serif md:text-[52px]">
              Mari Mewujudkan Ekonomi Sirkular Bersama
            </h2>
            <p className="mt-6 text-[16px] leading-[1.7] text-white/70">
              Setiap tetes minyak jelantah sisa dapur yang tidak dibuang sembarangan adalah 
              satu langkah penyelamatan air bersih kita. Dengan mengumpulkannya kembali, kita 
              berkontribusi langsung terhadap ketersediaan bahan baku biodiesel nasional dan 
              masa depan iklim bumi yang lebih cerah.
            </p>

            {/* High impact metric row */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <div className="text-[28px] font-medium text-white font-serif md:text-[36px]">
                  500K+
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/60 mt-1">
                  Liter Terpetakan
                </div>
              </div>
              <div>
                <div className="text-[28px] font-medium text-white font-serif md:text-[36px]">
                  85%
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/60 mt-1">
                  Emisi Ditekan
                </div>
              </div>
              <div>
                <div className="text-[28px] font-medium text-white font-serif md:text-[36px]">
                  34
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/60 mt-1">
                  Provinsi Aktif
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="button-accent border-0"
              >
                Kembali ke Atas
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("map")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex h-[48px] items-center justify-center border border-white/20 px-8 text-[14px] text-white transition hover:bg-white/5 hover:border-white"
              >
                Kembali ke Peta Spasial
              </button>
            </div>
          </motion.div>

          {/* Right Column: Beautiful custom leaf + oil drop outline SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <svg
              viewBox="0 0 320 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[280px]"
            >
              {/* Outer soft glowing circle */}
              <circle cx="160" cy="160" r="140" stroke="rgba(224,83,0,0.15)" strokeWidth="1" />
              <circle cx="160" cy="160" r="100" stroke="rgba(224,83,0,0.1)" strokeWidth="1" strokeDasharray="6 4" />

              {/* Continuous Line Droplet & Leaf */}
              <motion.path
                d="M160,80 C160,80 220,150 220,190 C220,223.14 193.14,250 160,250 C126.86,250 100,223.14 100,190 C100,150 160,80 160,80 Z"
                stroke="#e05300"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* The emerging leaf inside path */}
              <motion.path
                d="M160,250 C160,210 180,180 200,165 C180,195 160,200 160,250 Z"
                fill="#16a34a"
                opacity="0.8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.8, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />

              <circle cx="160" cy="80" r="4" fill="#e05300" />
            </svg>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
