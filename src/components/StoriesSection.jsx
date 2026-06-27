import { motion } from "framer-motion";

const stories = [
  {
    name: "Ibu Siti Rahayu",
    role: "Pemilik warung gorengan",
    location: "Simalungun, Sumatera Utara",
    quote:
      "Setelah jelantah saya kumpulkan rutin, saya jadi melihat limbah dapur sebagai sumber nilai, bukan sesuatu yang harus langsung dibuang.",
    statA: "30 L / bulan",
    statB: "30.000 L air terlindungi",
  },
  {
    name: "Pak Ahmad Fauzi",
    role: "Pelaku UMKM kuliner",
    location: "Sidoarjo, Jawa Timur",
    quote:
      "Program seperti ini memudahkan kami memahami dampak sederhana dari kebiasaan yang tadinya terasa sepele.",
    statA: "85 L / bulan",
    statB: "165 kg CO2 dicegah",
  },
  {
    name: "Komunitas Hijau Bantul",
    role: "Kelompok swadaya masyarakat",
    location: "Bantul, DI Yogyakarta",
    quote:
      "Ketika datanya terlihat dan alurnya jelas, warga lebih mudah percaya bahwa pengumpulan jelantah memang memberi manfaat nyata.",
    statA: "45 anggota aktif",
    statB: "120 L / bulan",
  },
];

export default function StoriesSection() {
  return (
    <section id="stories" className="page-section bg-white">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-[760px]"
        >
          <span className="section-eyebrow">Cerita komunitas</span>
          <h2 className="section-title">Bukti manusia di balik data</h2>
          <p className="section-subtitle">
            Saya ubah section testimonial menjadi lebih editorial dan tidak terlalu
            dekoratif, supaya tetap selaras dengan bahasa visual landing page yang baru.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-px border border-[#E8E8E8] bg-[#E8E8E8] lg:grid-cols-3">
          {stories.map((story, index) => (
            <motion.article
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="bg-white p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#E8E8E8] pb-5">
                <div>
                  <h3 className="text-[16px] font-bold text-[#191919]">
                    {story.name}
                  </h3>
                  <p className="mt-1 text-[14px] text-[#303030]">{story.role}</p>
                  <p className="mt-1 text-[14px] text-[#AEAEAE]">{story.location}</p>
                </div>
                <span className="orange-chip">Cerita</span>
              </div>

              <blockquote className="mt-6 text-[14px] leading-[1.7] text-[#303030]">
                "{story.quote}"
              </blockquote>

              <div className="mt-8 grid gap-px border border-[#E8E8E8] bg-[#E8E8E8]">
                {[story.statA, story.statB].map((item) => (
                  <div key={item} className="bg-[#F7F8FA] px-4 py-3 text-[14px] text-[#191919]">
                    {item}
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
