import { useScrollAnimation, useCountUp } from '../hooks/useScrollAnimation';

function CrisisCard({ icon, color, title, number, unit, description, delay, index }) {
  const [ref, isVisible] = useScrollAnimation();
  const count = useCountUp(number, isVisible);

  return (
    <article
      ref={ref}
      className={`crisis-card ${isVisible ? 'crisis-card--visible' : ''}`}
      style={{ '--card-color': color, '--delay': `${delay}ms` }}
    >
      <div className="crisis-card__icon">{icon}</div>
      <div className="crisis-card__number">
        <span className="crisis-card__count">
          {count.toLocaleString('id-ID')}
        </span>
        <span className="crisis-card__unit">{unit}</span>
      </div>
      <h3 className="crisis-card__title">{title}</h3>
      <p className="crisis-card__desc">{description}</p>
      <div className="crisis-card__glow" aria-hidden="true" />
    </article>
  );
}

export default function CrisisSection() {
  const [titleRef, titleVisible] = useScrollAnimation();

  const cards = [
    {
      icon: '🛢️',
      color: '#EF4444',
      title: 'Potensi Limbah UCO Indonesia',
      number: 3600000,
      unit: 'Ton / Tahun',
      description:
        'Berdasarkan estimasi Susenas BPS 2025, Indonesia menghasilkan ±3,6 juta ton minyak jelantah per tahun dari 78 juta rumah tangga. Mayoritas dibuang ke selokan dan badan air.',
      delay: 0,
    },
    {
      icon: '💧',
      color: '#F97316',
      title: 'Pencemaran Air Bersih',
      number: 1000,
      unit: 'Liter Air / 1L Jelantah',
      description:
        '1 liter minyak jelantah mampu mencemari hingga 1.000 liter air bersih (standar WHO). Lapisan minyak menghambat oksigenasi air dan merusak ekosistem akuatik secara permanen.',
      delay: 150,
    },
    {
      icon: '🌱',
      color: '#10B981',
      title: 'Potensi Reduksi Emisi GRK',
      number: 85,
      unit: '% vs Solar Fosil',
      description:
        'Biodiesel berbahan baku UCO terbukti memotong emisi Gas Rumah Kaca hingga 85% dibanding solar fosil, sesuai standar Renewable Energy Directive II (RED II) Uni Eropa 2018.',
      delay: 300,
    },
  ];

  return (
    <section className="crisis" id="crisis">
      <div className="section-container">
        <div
          ref={titleRef}
          className={`section-header ${titleVisible ? 'fade-in-up' : 'fade-hidden'}`}
        >
          <span className="section-label">📊 Mengapa Ini Darurat?</span>
          <h2 className="section-title">
            Ancaman yang <span className="text-gradient-red">Nyata</span>,<br />
            Peluang yang <span className="text-gradient-green">Masih Terbuka</span>
          </h2>
          <p className="section-subtitle">
            Data saintifik yang menggambarkan skala masalah UCO di Indonesia
            dan potensi luar biasa yang menunggu untuk dioptimalkan.
          </p>
        </div>

        <div className="crisis-grid">
          {cards.map((card, i) => (
            <CrisisCard key={i} {...card} index={i} />
          ))}
        </div>

        {/* Data source note */}
        <p className="crisis-source">
          * Data bersumber dari: Susenas BPS 2025 · WHO Environmental Guidelines · RED II EU Directive (2018/2001)
        </p>
      </div>
    </section>
  );
}
