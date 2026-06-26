import { useState, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SUPPLY_CHAIN_STEPS = [
  {
    id: 'household',
    icon: '🏠',
    title: 'Sumber Mikro',
    subtitle: 'Rumah Tangga & Warung',
    color: '#F59E0B',
    description:
      'Jutaan rumah tangga dan UMKM kuliner menghasilkan jelantah setiap hari. Rata-rata 0.9 liter per rumah tangga per bulan menjadi titik awal rantai nilai sirkular ini.',
    stats: [
      { label: 'Rumah Tangga Aktif', value: '78.8 Juta' },
      { label: 'Rata-rata UCO/RT/bulan', value: '0.9 Liter' },
    ],
  },
  {
    id: 'hub',
    icon: '🏪',
    title: 'Collection Hub',
    subtitle: 'Pengepul Wilayah',
    color: '#10B981',
    description:
      'Hub pengepul menjadi jembatan antara sumber mikro dan kilang industri. Efisiensi hub sangat dipengaruhi radius jangkauan armada pengumpulan dan kepadatan populasi.',
    stats: [
      { label: 'Kapasitas Hub Rata-rata', value: '2 Ton/minggu' },
      { label: 'Radius Operasi Ideal', value: '5-15 km' },
    ],
    hasCalculator: true,
  },
  {
    id: 'refinery',
    icon: '🏭',
    title: 'Kilang Industri',
    subtitle: 'B2B Buyer & Processor',
    color: '#8B5CF6',
    description:
      'Kilang industri menerima UCO dalam skala tonase untuk diproses menjadi Fatty Acid Methyl Ester (FAME) — bahan baku biodiesel B20/B35 sesuai standar SNI dan ESDM.',
    stats: [
      { label: 'Output Biodiesel', value: '85% dari UCO' },
      { label: 'Standar', value: 'SNI 04-7182-2015' },
    ],
  },
];

function HubCalculator({ provinceArea = 3638 }) {
  const [radius, setRadius] = useState(10);
  const hubCount = Math.ceil(provinceArea / (Math.PI * radius * radius));

  return (
    <div className="hub-calculator">
      <h4 className="hub-calculator__title">⚙️ Hub Allocation Recommender</h4>
      <p className="hub-calculator__desc">
        Untuk wilayah seluas <strong>{provinceArea.toLocaleString('id-ID')} km²</strong>:
      </p>

      <div className="hub-calc-slider">
        <label className="hub-calc-label">
          🏍️ Radius Jangkauan Motor
          <span className="hub-calc-value">{radius} km</span>
        </label>
        <input
          type="range"
          id="hub-radius-slider"
          min={5}
          max={20}
          step={1}
          value={radius}
          onChange={e => setRadius(Number(e.target.value))}
          className="hub-calc-input"
          aria-label={`Radius jangkauan ${radius} km`}
        />
        <div className="hub-calc-ticks">
          <span>5 km</span>
          <span>10 km</span>
          <span>15 km</span>
          <span>20 km</span>
        </div>
      </div>

      <div className="hub-result">
        <div className="hub-result__number">{hubCount}</div>
        <div className="hub-result__label">Hub Ideal Diperlukan</div>
        <div className="hub-result__formula">
          A / (π × r²) = {provinceArea} / (π × {radius}²) ≈ {hubCount}
        </div>
      </div>
    </div>
  );
}

function SupplyStep({ step, index, isVisible }) {
  const [ref, visible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`supply-step ${visible ? 'supply-step--visible' : ''}`}
      style={{ '--step-color': step.color, '--step-delay': `${index * 200}ms` }}
    >
      {/* Connector line */}
      {index < SUPPLY_CHAIN_STEPS.length - 1 && (
        <div className="supply-connector">
          <div className={`supply-connector__line ${visible ? 'supply-connector__line--animated' : ''}`} />
          <div className="supply-drop">🫙</div>
        </div>
      )}

      <div className="supply-node">
        <div className="supply-node__icon">{step.icon}</div>
        <div className="supply-node__content">
          <div className="supply-node__badge" style={{ background: step.color }}>
            {index + 1}
          </div>
          <h3 className="supply-node__title">{step.title}</h3>
          <p className="supply-node__subtitle">{step.subtitle}</p>
          <p className="supply-node__desc">{step.description}</p>

          <div className="supply-stats">
            {step.stats.map((s, i) => (
              <div key={i} className="supply-stat">
                <span className="supply-stat__label">{s.label}</span>
                <span className="supply-stat__value" style={{ color: step.color }}>{s.value}</span>
              </div>
            ))}
          </div>

          {step.hasCalculator && <HubCalculator />}
        </div>
      </div>
    </div>
  );
}

export default function SupplyChainSection() {
  const [ref, visible] = useScrollAnimation();

  return (
    <section className="supplychain" id="supplychain">
      <div className="section-container">
        <div
          ref={ref}
          className={`section-header ${visible ? 'fade-in-up' : 'fade-hidden'}`}
        >
          <span className="section-label">🔗 Logistik & Rantai Pasok</span>
          <h2 className="section-title">
            Dari Dapur Rumah Tangga<br />
            <span className="text-gradient-green">Hingga Kilang Biodiesel</span>
          </h2>
          <p className="section-subtitle">
            Visualisasi tiga lapisan rantai pasok UCO yang efisien dan terukur.
            Setiap tetesan jelantah memiliki perjalanan dan nilai ekonomi tersendiri.
          </p>
        </div>

        <div className="supply-timeline">
          {SUPPLY_CHAIN_STEPS.map((step, i) => (
            <SupplyStep key={step.id} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
