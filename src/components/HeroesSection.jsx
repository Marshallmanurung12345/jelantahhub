import { useState, useRef } from 'react';
import { heroes } from '../data/heroes';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function HeroCard({ hero }) {
  return (
    <article className="hero-card" style={{ '--hero-color': hero.color }} id={`hero-card-${hero.id}`}>
      <div className="hero-card__header">
        <div className="hero-card__avatar" style={{ background: `${hero.color}22`, border: `2px solid ${hero.color}` }}>
          <span className="hero-card__emoji">{hero.avatar}</span>
        </div>
        <div className="hero-card__meta">
          <span className="hero-card__badge" style={{ background: hero.color }}>{hero.badge}</span>
          <h3 className="hero-card__name">{hero.name}</h3>
          <p className="hero-card__role">{hero.role}</p>
          <p className="hero-card__location">📍 {hero.location}</p>
        </div>
      </div>

      <p className="hero-card__story">{hero.story}</p>

      <div className="hero-card__impact">
        <div className="hero-card__impact-item">
          <span className="hero-card__impact-icon">🛢️</span>
          <span className="hero-card__impact-value">{hero.monthlyUco}</span>
          <span className="hero-card__impact-label">Liter UCO/bulan</span>
        </div>
        <div className="hero-card__impact-item">
          <span className="hero-card__impact-icon">💧</span>
          <span className="hero-card__impact-value">{(hero.impact.waterSaved / 1000).toFixed(0)}k</span>
          <span className="hero-card__impact-label">Liter Air Diselamatkan</span>
        </div>
        <div className="hero-card__impact-item">
          <span className="hero-card__impact-icon">💚</span>
          <span className="hero-card__impact-value">+Rp{(hero.impact.extraIncome / 1000).toFixed(0)}k</span>
          <span className="hero-card__impact-label">Pendapatan/bulan</span>
        </div>
      </div>

      <div className="hero-card__footer">
        <span className="hero-card__joined">Bergabung sejak {hero.joined}</span>
        <span className="hero-card__co2">🌿 {hero.impact.co2Prevented} kg CO₂ dicegah/bulan</span>
      </div>
    </article>
  );
}

export default function HeroesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [headerRef, headerVisible] = useScrollAnimation();
  const trackRef = useRef(null);
  const startX = useRef(null);
  const isDragging = useRef(false);

  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(idx, heroes.length - 1));
    setCurrentIndex(clamped);
  };

  // Touch / drag support
  const onPointerDown = (e) => {
    startX.current = e.clientX || e.touches?.[0]?.clientX;
    isDragging.current = true;
  };
  const onPointerUp = (e) => {
    if (!isDragging.current) return;
    const endX = e.clientX || e.changedTouches?.[0]?.clientX;
    const diff = (startX.current || 0) - endX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(currentIndex + 1) : goTo(currentIndex - 1);
    }
    isDragging.current = false;
  };

  const visibleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;
  const maxIndex = Math.max(0, heroes.length - visibleCount);

  return (
    <section className="heroes-section" id="heroes">
      <div className="section-container">
        <div
          ref={headerRef}
          className={`section-header ${headerVisible ? 'fade-in-up' : 'fade-hidden'}`}
        >
          <span className="section-label">👑 Pahlawan Sirkular</span>
          <h2 className="section-title">
            Wajah di Balik <span className="text-gradient-gold">Setiap Tetes</span> Jelantah
          </h2>
          <p className="section-subtitle">
            Mereka adalah penggerak nyata ekonomi sirkular. Dari dapur sederhana hingga
            usaha katering, setiap kontribusi UCO menciptakan dampak berantai yang nyata.
          </p>
        </div>

        {/* Carousel */}
        <div className="carousel">
          <div
            className="carousel__track"
            ref={trackRef}
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            onMouseDown={onPointerDown}
            onMouseUp={onPointerUp}
            onTouchStart={onPointerDown}
            onTouchEnd={onPointerUp}
          >
            {heroes.map(hero => (
              <div key={hero.id} className="carousel__slide">
                <HeroCard hero={hero} />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel controls */}
        <div className="carousel__controls">
          <button
            className="carousel__btn"
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            id="carousel-prev"
            aria-label="Sebelumnya"
          >
            ←
          </button>

          <div className="carousel__dots">
            {Array.from({ length: Math.ceil(heroes.length / visibleCount) }).map((_, i) => (
              <button
                key={i}
                className={`carousel__dot ${i === Math.floor(currentIndex / visibleCount) ? 'active' : ''}`}
                onClick={() => goTo(i * visibleCount)}
                id={`carousel-dot-${i}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            className="carousel__btn"
            onClick={() => goTo(currentIndex + 1)}
            disabled={currentIndex >= maxIndex}
            id="carousel-next"
            aria-label="Berikutnya"
          >
            →
          </button>
        </div>

        {/* Total community impact */}
        <div className="heroes-total-impact">
          <h3 className="heroes-total-impact__title">📊 Dampak Kolektif Komunitas</h3>
          <div className="heroes-total-impact__grid">
            <div className="heroes-total-impact__item">
              <span className="heroes-total-impact__number">
                {heroes.reduce((s, h) => s + h.monthlyUco, 0).toLocaleString('id-ID')}
              </span>
              <span className="heroes-total-impact__label">Total Liter UCO/bulan</span>
            </div>
            <div className="heroes-total-impact__item">
              <span className="heroes-total-impact__number">
                {(heroes.reduce((s, h) => s + h.impact.waterSaved, 0) / 1000000).toFixed(1)} Juta
              </span>
              <span className="heroes-total-impact__label">Liter Air Diselamatkan</span>
            </div>
            <div className="heroes-total-impact__item">
              <span className="heroes-total-impact__number">
                {heroes.reduce((s, h) => s + h.impact.co2Prevented, 0).toFixed(0)} kg
              </span>
              <span className="heroes-total-impact__label">CO₂ Dicegah/bulan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
