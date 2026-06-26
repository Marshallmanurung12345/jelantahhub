import { useState } from 'react';
import { provinces } from '../data/provinces';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const MEDALS = ['🥇', '🥈', '🥉'];
const NEON_COLORS = ['#F59E0B', '#9CA3AF', '#CD7C41'];

export default function LeaderboardSection() {
  const [sortBy, setSortBy] = useState('ucoTonPerYear');
  const [ref, visible] = useScrollAnimation();

  const sorted = [...provinces].sort((a, b) => {
    if (sortBy === 'ucoTonPerYear') return b.ucoTonPerYear - a.ucoTonPerYear;
    if (sortBy === 'unabsorbedUco') return b.unabsorbedUco - a.unabsorbedUco;
    if (sortBy === 'absorptionRate') return b.absorptionRate - a.absorptionRate;
    return 0;
  });

  const topValue = sorted[0]?.[sortBy] || 1;

  return (
    <section className="leaderboard" id="leaderboard">
      <div className="section-container">
        <div
          ref={ref}
          className={`section-header ${visible ? 'fade-in-up' : 'fade-hidden'}`}
        >
          <span className="section-label">🏆 National Green Rank</span>
          <h2 className="section-title">
            Papan Peringkat <span className="text-gradient-gold">Kompetitif Nasional</span>
          </h2>
          <p className="section-subtitle">
            Daerah mana yang paling potensial? Mana yang sudah paling efisien?
            Urutkan berdasarkan metrik yang kamu pilih.
          </p>
        </div>

        {/* Sort controls */}
        <div className="leaderboard-controls">
          <button
            className={`lb-sort-btn ${sortBy === 'ucoTonPerYear' ? 'active' : ''}`}
            onClick={() => setSortBy('ucoTonPerYear')}
            id="lb-sort-volume"
          >
            🛢️ Volume UCO Tertinggi
          </button>
          <button
            className={`lb-sort-btn ${sortBy === 'unabsorbedUco' ? 'active' : ''}`}
            onClick={() => setSortBy('unabsorbedUco')}
            id="lb-sort-unabsorbed"
          >
            ⚠️ UCO Belum Terserap
          </button>
          <button
            className={`lb-sort-btn ${sortBy === 'absorptionRate' ? 'active' : ''}`}
            onClick={() => setSortBy('absorptionRate')}
            id="lb-sort-efficiency"
          >
            ✅ Efisiensi Penyerapan
          </button>
        </div>

        {/* Top 3 podium */}
        <div className="lb-podium">
          {sorted.slice(0, 3).map((prov, i) => (
            <div
              key={prov.id}
              className={`lb-podium-card lb-podium-card--${i + 1}`}
              style={{ '--neon': NEON_COLORS[i] }}
            >
              <div className="lb-podium-medal">{MEDALS[i]}</div>
              <div className="lb-podium-rank">#{i + 1}</div>
              <div className="lb-podium-name">{prov.name}</div>
              <div className="lb-podium-value">
                {sortBy === 'absorptionRate'
                  ? `${prov[sortBy]}%`
                  : `${prov[sortBy].toLocaleString('id-ID')} ton`}
              </div>
              <div className="lb-podium-label">
                {sortBy === 'ucoTonPerYear' ? 'UCO Potensial' :
                  sortBy === 'unabsorbedUco' ? 'UCO Belum Terserap' : 'Tingkat Penyerapan'}
              </div>
            </div>
          ))}
        </div>

        {/* Full table */}
        <div className="lb-table-wrapper">
          <table className="lb-table" id="leaderboard-table">
            <thead>
              <tr>
                <th className="lb-th lb-th--rank">Rank</th>
                <th className="lb-th">Provinsi</th>
                <th className="lb-th lb-th--num">UCO Potensial (ton/thn)</th>
                <th className="lb-th lb-th--num">UCO Belum Terserap</th>
                <th className="lb-th lb-th--num">Efisiensi (%)</th>
                <th className="lb-th lb-th--num">CO₂ Offset (ton)</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((prov, i) => {
                const isTop3 = i < 3;
                const barWidth = Math.round((prov[sortBy] / topValue) * 100);
                return (
                  <tr
                    key={prov.id}
                    className={`lb-row ${isTop3 ? `lb-row--top${i + 1}` : ''}`}
                  >
                    <td className="lb-td lb-td--rank">
                      <span className="lb-rank-num" style={{ color: isTop3 ? NEON_COLORS[i] : undefined }}>
                        {isTop3 ? MEDALS[i] : `#${i + 1}`}
                      </span>
                    </td>
                    <td className="lb-td lb-td--name">
                      <div className="lb-name-cell">
                        <span className="lb-prov-name">{prov.name}</span>
                        <div
                          className="lb-bar"
                          style={{
                            width: `${barWidth}%`,
                            background: isTop3 ? NEON_COLORS[i] : '#10B981',
                          }}
                        />
                      </div>
                    </td>
                    <td className="lb-td lb-td--num">{prov.ucoTonPerYear.toLocaleString('id-ID')}</td>
                    <td className="lb-td lb-td--num lb-td--warning">{prov.unabsorbedUco.toLocaleString('id-ID')}</td>
                    <td className="lb-td lb-td--num lb-td--green">{prov.absorptionRate}%</td>
                    <td className="lb-td lb-td--num">{(prov.carbonOffset / 1000).toFixed(0)} rb</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
