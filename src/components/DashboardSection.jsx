import { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { provinces, kabupatenData, getProjectedUCO, getUCOColor } from '../data/provinces';

// Simplified Indonesia GeoJSON — major island outlines mapped to provinces
// Using bounding box approximations for each province (lightweight, no external fetch needed)
function buildSimpleGeoJSON(provinceList, year) {
  return {
    type: 'FeatureCollection',
    features: provinceList.map(p => ({
      type: 'Feature',
      properties: {
        id: p.id,
        name: p.name,
        ucoTon: getProjectedUCO(p.ucoTonPerYear, year),
        population: p.population2025,
        capital: p.capital,
        absorptionRate: p.absorptionRate,
        area: p.area,
      },
      geometry: {
        type: 'Polygon',
        // Generate a simple rectangular polygon around province center
        coordinates: [[
          [p.lng - 1.5, p.lat - 0.8],
          [p.lng + 1.5, p.lat - 0.8],
          [p.lng + 1.5, p.lat + 0.8],
          [p.lng - 1.5, p.lat + 0.8],
          [p.lng - 1.5, p.lat - 0.8],
        ]],
      },
    })),
  };
}

function MapUpdater({ year, onProvinceClick, selectedProvince }) {
  const map = useMap();

  const style = useCallback((feature) => {
    const uco = feature.properties.ucoTon;
    const isSelected = selectedProvince?.id === feature.properties.id;
    return {
      fillColor: getUCOColor(uco),
      weight: isSelected ? 3 : 1,
      opacity: 1,
      color: isSelected ? '#F59E0B' : '#1a2e1a',
      dashArray: isSelected ? '0' : '3',
      fillOpacity: isSelected ? 0.9 : 0.72,
    };
  }, [selectedProvince]);

  const onEachFeature = useCallback((feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const l = e.target;
        l.setStyle({ weight: 2.5, fillOpacity: 0.9 });
        l.bindTooltip(
          `<div class="map-tooltip">
            <strong>${feature.properties.name}</strong><br/>
            UCO Potensial: <b>${feature.properties.ucoTon.toLocaleString('id-ID')} ton/tahun</b><br/>
            Penyerapan: ${feature.properties.absorptionRate}%
          </div>`,
          { direction: 'top', sticky: true }
        ).openTooltip();
      },
      mouseout: (e) => {
        e.target.closeTooltip();
        e.target.setStyle(style(feature));
      },
      click: () => {
        const prov = provinces.find(p => p.id === feature.properties.id);
        onProvinceClick(prov);
        map.flyTo([feature.properties.lat || prov.lat, feature.properties.lng || prov.lng], 6, {
          duration: 1,
        });
      },
    });
  }, [onProvinceClick, map, style]);

  const geoData = buildSimpleGeoJSON(provinces, year);

  return (
    <GeoJSON
      key={`${year}-${selectedProvince?.id}`}
      data={geoData}
      style={style}
      onEachFeature={onEachFeature}
    />
  );
}

function AnalyticsPanel({ province, year }) {
  if (!province) {
    return (
      <div className="analytics-empty">
        <div className="analytics-empty__icon">🗺️</div>
        <h3>Pilih Provinsi</h3>
        <p>Klik pada peta di sebelah kiri untuk melihat analisis detail potensi UCO dan estimasi produksi biodiesel daerah tersebut.</p>
        <div className="analytics-empty__hint">
          <span>💡</span> Warna merah = potensi UCO tertinggi
        </div>
      </div>
    );
  }

  const projectedUco = getProjectedUCO(province.ucoTonPerYear, year);
  const ucoLiter = projectedUco * 1000;
  const biodieselLiter = Math.round(ucoLiter * 0.85);
  const carbonOffset = Math.round(biodieselLiter * 2.28);
  const mwhProduced = Math.round(biodieselLiter * 0.0094);
  const busSupply = Math.round(biodieselLiter / 8 / 365);
  const fossilEmission = Math.round(biodieselLiter * 2.68); // solar fosil
  const reductionPct = 85;

  const kab = kabupatenData[province.id];

  return (
    <div className="analytics-panel">
      <div className="analytics-header">
        <h3 className="analytics-title">📍 {province.name}</h3>
        <span className="analytics-capital">{province.capital} · Proyeksi {year}</span>
      </div>

      {/* UCO Volume */}
      <div className="analytics-metric">
        <div className="analytics-metric__label">🛢️ Volume UCO Potensial</div>
        <div className="analytics-metric__value">
          {projectedUco.toLocaleString('id-ID')}
          <span className="analytics-metric__unit"> ton/tahun</span>
        </div>
      </div>

      {/* Biodiesel Yield */}
      <div className="analytics-metric analytics-metric--highlight">
        <div className="analytics-metric__label">⚡ Produksi Biodiesel (85% yield)</div>
        <div className="analytics-metric__value analytics-metric__value--green">
          {biodieselLiter.toLocaleString('id-ID')}
          <span className="analytics-metric__unit"> liter</span>
        </div>
        <div className="analytics-metric__sub">
          ≈ {mwhProduced.toLocaleString('id-ID')} MWh · Cukup untuk {busSupply.toLocaleString('id-ID')} bus/hari
        </div>
      </div>

      {/* Carbon Offset Bar */}
      <div className="analytics-carbon">
        <div className="analytics-carbon__header">
          <span>🌍 Carbon Offset Estimasi</span>
          <span className="analytics-carbon__value">{(carbonOffset / 1000000).toFixed(2)} juta kg CO₂</span>
        </div>
        <div className="analytics-carbon__bars">
          <div className="analytics-carbon__bar-label">
            <span>☠️ Solar Fosil</span>
            <span>{(fossilEmission / 1000000).toFixed(2)} jt kg CO₂</span>
          </div>
          <div className="analytics-carbon__bar analytics-carbon__bar--fossil">
            <div className="analytics-carbon__bar-fill" style={{ width: '100%' }} />
          </div>
          <div className="analytics-carbon__bar-label">
            <span>🌿 Biodiesel UCO</span>
            <span>{(carbonOffset / 1000000).toFixed(2)} jt kg CO₂</span>
          </div>
          <div className="analytics-carbon__bar analytics-carbon__bar--bio">
            <div
              className="analytics-carbon__bar-fill analytics-carbon__bar-fill--bio"
              style={{ width: `${100 - reductionPct}%` }}
            />
          </div>
        </div>
        <div className="analytics-carbon__badge">
          ✅ Hemat <strong>{reductionPct}%</strong> emisi dibanding solar fosil
        </div>
      </div>

      {/* Formula note */}
      <div className="analytics-formula">
        <code>CO₂ Offset = {biodieselLiter.toLocaleString('id-ID')} L × 2.28 = {carbonOffset.toLocaleString('id-ID')} kg</code>
      </div>

      {/* Kabupaten breakdown if available */}
      {kab && (
        <div className="analytics-kabupaten">
          <h4>🏘️ Kabupaten/Kota Terbesar</h4>
          <div className="analytics-kab-list">
            {kab.slice(0, 4).map((k, i) => (
              <div key={i} className="analytics-kab-item">
                <span className="analytics-kab-name">{k.name}</span>
                <span className="analytics-kab-value">{k.ucoTonPerYear.toLocaleString('id-ID')} ton</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardSection() {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [year, setYear] = useState(2025);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Small delay to let map tiles load
    const t = setTimeout(() => setMapReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const projectedYearData = provinces.map(p => ({
    ...p,
    ucoProjected: getProjectedUCO(p.ucoTonPerYear, year),
  }));

  return (
    <section className="dashboard" id="dashboard">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">🗺️ Peta Simulasi Interaktif</span>
          <h2 className="section-title">
            Jantung Utama:<br />
            <span className="text-gradient-green">Dashboard Geospasial UCO</span>
          </h2>
          <p className="section-subtitle">
            Klik provinsi manapun di peta untuk mengaktifkan panel analitik di sisi kanan.
            Gunakan slider tahun untuk memproyeksikan potensi UCO ke masa depan.
          </p>
        </div>

        {/* Year Slider */}
        <div className="year-slider">
          <div className="year-slider__header">
            <span className="year-slider__label">⏱️ Time-Travel Proyeksi</span>
            <span className="year-slider__year">{year}</span>
          </div>
          <input
            type="range"
            id="year-slider-input"
            min={2025}
            max={2035}
            value={year}
            onChange={e => setYear(Number(e.target.value))}
            className="year-slider__input"
            aria-label="Tahun proyeksi"
          />
          <div className="year-slider__ticks">
            {Array.from({ length: 11 }, (_, i) => 2025 + i).map(y => (
              <span key={y} className={`year-slider__tick ${y === year ? 'active' : ''}`}>
                {y}
              </span>
            ))}
          </div>
          <p className="year-slider__formula">
            Formula: Populasi₍ₜ₎ = Populasi₂₀₂₅ × (1 + 0.011)ᵗ
          </p>
        </div>

        {/* Split screen */}
        <div className="dashboard-split">
          {/* Left: Map */}
          <div className="dashboard-map-container">
            <div className="dashboard-map-legend">
              <span className="legend-label">🔴 Tinggi</span>
              <div className="legend-bar" />
              <span className="legend-label">🟢 Rendah</span>
            </div>
            <MapContainer
              center={[-2.5, 118]}
              zoom={4}
              className="leaflet-map"
              scrollWheelZoom={false}
              id="leaflet-map-main"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                opacity={0.25}
              />
              <MapUpdater
                year={year}
                onProvinceClick={setSelectedProvince}
                selectedProvince={selectedProvince}
              />
            </MapContainer>
            <p className="dashboard-map-hint">
              💡 Klik provinsi manapun · Scroll untuk zoom
            </p>

            {/* Province selector fallback for mobile */}
            <select
              className="province-select-mobile"
              onChange={e => {
                const prov = provinces.find(p => p.id === e.target.value);
                if (prov) setSelectedProvince(prov);
              }}
              value={selectedProvince?.id || ''}
              id="province-select-mobile"
            >
              <option value="">— Pilih Provinsi —</option>
              {provinces.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Right: Analytics */}
          <div className="dashboard-analytics">
            <AnalyticsPanel province={selectedProvince} year={year} />
          </div>
        </div>
      </div>
    </section>
  );
}
