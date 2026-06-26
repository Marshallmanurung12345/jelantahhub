import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import provincesData from '../data/provinces-map.json';
import indonesiaGeoJSON from '../data/indonesia.json';

const LEVEL_COLORS = {
  'low':       '#86EFAC',
  'medium':    '#22C55E',
  'high':      '#16A34A',
  'very-high': '#14532D',
};

const LEVEL_LABELS = {
  'low':       'Low  < 200K',
  'medium':    'Medium 200K–500K',
  'high':      'High  500K–800K',
  'very-high': 'Very High >800K',
};

const normalizeName = (name) => {
  if (!name) return null;
  const n = name.toUpperCase();
  if (n.includes('ACEH')) return 'aceh';
  if (n.includes('SUMATERA UTARA')) return 'sumut';
  if (n.includes('SUMATERA BARAT')) return 'sumbar';
  if (n.includes('RIAU') && !n.includes('KEPULAUAN')) return 'riau';
  if (n.includes('KEPULAUAN RIAU')) return 'kepri';
  if (n.includes('JAMBI')) return 'jambi';
  if (n.includes('BENGKULU')) return 'bengkulu';
  if (n.includes('SUMATERA SELATAN')) return 'sumsel';
  if (n.includes('BANGKA BELITUNG')) return 'babel';
  if (n.includes('LAMPUNG')) return 'lampung';
  if (n.includes('BANTEN') || n.includes('PROBANTEN')) return 'banten';
  if (n.includes('JAKARTA')) return 'jakarta';
  if (n.includes('JAWA BARAT')) return 'jabar';
  if (n.includes('JAWA TENGAH')) return 'jateng';
  if (n.includes('YOGYAKARTA') || n.includes('YOGYA')) return 'yogya';
  if (n.includes('JAWA TIMUR')) return 'jatim';
  if (n.includes('BALI')) return 'bali';
  if (n.includes('NUSATENGGARA BARAT') || n.includes('NUSA TENGGARA BARAT')) return 'ntb';
  if (n.includes('NUSATENGGARA TIMUR') || n.includes('NUSA TENGGARA TIMUR')) return 'ntt';
  if (n.includes('KALIMANTAN BARAT')) return 'kalbar';
  if (n.includes('KALIMANTAN TENGAH')) return 'kalteng';
  if (n.includes('KALIMANTAN SELATAN')) return 'kalsel';
  if (n.includes('KALIMANTAN TIMUR')) return 'kaltim';
  if (n.includes('KALIMANTAN UTARA')) return 'kaltara';
  if (n.includes('SULAWESI UTARA')) return 'sulut';
  if (n.includes('GORONTALO')) return 'gorontalo';
  if (n.includes('SULAWESI TENGAH')) return 'sulteng';
  if (n.includes('SULAWESI BARAT')) return 'sulbar';
  if (n.includes('SULAWESI SELATAN')) return 'sulsel';
  if (n.includes('SULAWESI TENGGARA')) return 'sultra';
  if (n.includes('MALUKU UTARA')) return 'malut';
  if (n === 'MALUKU') return 'maluku';
  if (n.includes('PAPUA BARAT') || n.includes('IRIAN JAYA BARAT')) return 'papua-bar';
  if (n.includes('PAPUA') || n.includes('IRIAN JAYA')) return 'papua';
  return null;
};

export default function MapSection() {
  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const provincesMap = useMemo(() => {
    const map = {};
    provincesData.provinces.forEach(p => {
      map[p.id] = p;
    });
    return map;
  }, []);

  const handleMouseMove = (e, provData) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHovered(provData);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <section id="map" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">🗺️ Feature One</span>
          <h2 className="section-title">
            Interactive <span className="text-gradient-green">Impact Map</span>
          </h2>
          <p className="section-subtitle">
            Jelajahi potensi minyak jelantah di setiap provinsi Indonesia.
            Hover untuk melihat detail estimasi UCO dan biodiesel.
          </p>
        </motion.div>

        {/* Map Container */}
        <div 
          ref={containerRef}
          className="relative bg-brand-bg rounded-3xl border border-gray-100 overflow-hidden shadow-card"
          style={{ height: '600px' }}
        >
          {/* Map Grid Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#22C55E" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Real Map */}
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 1200,
              center: [118, -2.5]
            }}
            width={1000}
            height={600}
            style={{ width: '100%', height: '100%' }}
          >
            <ZoomableGroup zoom={1} maxZoom={4} translateExtent={[[0, 0], [1000, 600]]}>
              <Geographies geography={indonesiaGeoJSON}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    const geoName = geo.properties.Propinsi;
                    const provId = normalizeName(geoName);
                    const provData = provId ? provincesMap[provId] : null;
                    const defaultColor = '#E2E8F0';
                    const color = provData ? LEVEL_COLORS[provData.level] : defaultColor;
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={(e) => provData && handleMouseMove(e, provData)}
                        onMouseMove={(e) => provData && handleMouseMove(e, provData)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          default: {
                            fill: color,
                            outline: 'none',
                            stroke: '#FFFFFF',
                            strokeWidth: 0.5,
                            transition: 'all 0.3s'
                          },
                          hover: {
                            fill: provData ? '#FACC15' : color,
                            outline: 'none',
                            stroke: '#FFFFFF',
                            strokeWidth: 1,
                            cursor: provData ? 'pointer' : 'default',
                            transition: 'all 0.2s'
                          },
                          pressed: {
                            fill: provData ? '#EAB308' : color,
                            outline: 'none'
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>

          {/* Tooltip Overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute z-50 pointer-events-none"
                style={{
                  left: tooltipPos.x + 16,
                  top: tooltipPos.y + 16,
                }}
              >
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-gray-100 min-w-[240px]">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ background: LEVEL_COLORS[hovered.level] }}
                    />
                    <h4 className="font-jakarta font-bold text-gray-900 text-lg">
                      {hovered.name}
                    </h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-gray-500 font-medium mb-0.5">Potensi UCO:</div>
                      <div className="font-bold text-gray-800 text-base">
                        {hovered.uco.toLocaleString('id-ID')} <span className="text-xs text-gray-500 font-normal">Liter/thn</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-brand-green font-medium mb-0.5">Biodiesel:</div>
                      <div className="font-bold text-brand-green text-base">
                        {hovered.biodiesel.toLocaleString('id-ID')} <span className="text-xs text-gray-500 font-normal">Liter/thn</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-blue-500 font-medium mb-0.5">Reduksi Emisi:</div>
                      <div className="font-bold text-blue-600 text-base">
                        {hovered.carbon.toLocaleString('id-ID')} <span className="text-xs text-gray-500 font-normal">Ton CO₂</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md py-3 px-6 rounded-full shadow-lg border border-gray-100 flex gap-6">
            {Object.entries(LEVEL_LABELS).map(([level, label]) => (
              <div key={level} className="flex items-center gap-2">
                <div
                  className="w-3.5 h-3.5 rounded-full shadow-sm"
                  style={{ background: LEVEL_COLORS[level] }}
                />
                <span className="text-xs font-semibold text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
