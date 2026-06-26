import { motion } from 'framer-motion';

const stories = [
  {
    id: 'siti',
    avatar: '👩‍🍳',
    avatarBg: 'from-yellow-400 to-orange-400',
    name: 'Ibu Siti Rahayu',
    role: 'Pemilik Warung Gorengan',
    location: 'Simalungun, Sumatera Utara',
    quote:
      '"Setiap bulan saya menyetorkan minyak jelantah ke bank jelantah terdekat untuk mendukung energi bersih. Ternyata ini juga memberi saya penghasilan tambahan!"',
    stats: [
      { label: 'UCO/bulan', value: '30 L', icon: '🛢️' },
      { label: 'Air diselamatkan', value: '30.000 L', icon: '💧' },
    ],
    tag: '🌟 Pengepul Aktif',
    tagColor: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  },
  {
    id: 'ahmad',
    avatar: '👨‍🍳',
    avatarBg: 'from-green-400 to-emerald-500',
    name: 'Pak Ahmad Fauzi',
    role: 'UMKM Kuliner',
    location: 'Sidoarjo, Jawa Timur',
    quote:
      '"Dulu minyak jelantah langsung saya buang ke wastafel. Setelah bergabung dengan program ini, saya mulai mengumpulkan dan ternyata bisa dimanfaatkan menjadi sesuatu yang berharga."',
    stats: [
      { label: 'UCO/bulan', value: '85 L', icon: '🛢️' },
      { label: 'CO₂ dicegah', value: '165 kg', icon: '🌍' },
    ],
    tag: '🏆 Mitra Platinum',
    tagColor: 'bg-green-50 text-brand-green border-green-200',
  },
  {
    id: 'komunitas',
    avatar: '🌿',
    avatarBg: 'from-emerald-400 to-teal-500',
    name: 'Komunitas Hijau Bantul',
    role: 'Kelompok Swadaya Masyarakat',
    location: 'Bantul, DI Yogyakarta',
    quote:
      '"Bersama 45 anggota PKK, kami mengedukasi warga sekitar mengenai pengelolaan minyak jelantah yang benar. Kini 3 RT di kelurahan kami sudah aktif mengumpulkan jelantah setiap minggu."',
    stats: [
      { label: 'Anggota aktif', value: '45', icon: '👥' },
      { label: 'UCO/bulan', value: '120 L', icon: '🛢️' },
    ],
    tag: '🌿 Komunitas Hijau',
    tagColor: 'bg-teal-50 text-teal-700 border-teal-200',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

export default function StoriesSection() {
  return (
    <section id="stories" className="py-28 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">💚 Community Stories</span>
          <h2 className="section-title">
            Wajah di Balik Setiap{' '}
            <span className="text-gradient-green">Tetes Jelantah</span>
          </h2>
          <p className="section-subtitle">
            Perubahan dimulai dari komunitas terkecil. Inilah kisah nyata
            dari para penggerak ekonomi sirkular di Indonesia.
          </p>
        </motion.div>

        {/* Story cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <motion.article
              key={story.id}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-3xl p-8 shadow-card border border-gray-100 hover:shadow-card-hover transition-shadow flex flex-col"
              id={`story-${story.id}`}
            >
              {/* Avatar */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${story.avatarBg} flex items-center justify-center text-3xl flex-shrink-0 shadow-md`}>
                  {story.avatar}
                </div>
                <div>
                  <span className={`text-xs font-semibold border rounded-full px-3 py-1 ${story.tagColor}`}>
                    {story.tag}
                  </span>
                  <h3 className="font-jakarta font-bold text-brand-text mt-2 text-lg leading-tight">
                    {story.name}
                  </h3>
                  <p className="text-sm text-gray-400">{story.role}</p>
                  <p className="text-xs text-gray-300 mt-0.5">📍 {story.location}</p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-gray-500 text-sm leading-relaxed italic mb-6 relative pl-4">
                <span className="absolute left-0 top-0 text-brand-green text-4xl leading-none font-serif">"</span>
                <span className="pl-4">{story.quote.replace(/^"|"$/g, '')}</span>
              </blockquote>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-5 border-t border-gray-100">
                {story.stats.map((stat, j) => (
                  <div key={j} className="bg-gray-50 rounded-xl p-3 text-center">
                    <span className="text-lg block mb-0.5">{stat.icon}</span>
                    <span className="font-jakarta font-black text-base text-brand-text block">{stat.value}</span>
                    <span className="text-xs text-gray-400">{stat.label}</span>
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
