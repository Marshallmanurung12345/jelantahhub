import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

function calcResults(liters) {
  const biodiesel = +(liters * 0.85).toFixed(1);
  const carbon = +(biodiesel * 2.28).toFixed(1);
  const trees = Math.round(carbon / 21.7);
  return { biodiesel, carbon, trees };
}

// Animated result card using custom hook
function ResultCard({ icon, label, value, unit, color }) {
  const { ref, formatted } = useCountUp(Math.floor(value), 1400);
  return (
    <div ref={ref} className={`${color} rounded-2xl p-6 text-center`}>
      <div className="text-4xl mb-3">{icon}</div>
      <div className="font-jakarta font-black text-3xl text-brand-text mb-1">
        {formatted}
        <span className="text-lg font-semibold text-gray-400 ml-1">{unit}</span>
      </div>
      <div className="text-sm text-gray-500 font-medium">{label}</div>
    </div>
  );
}

export default function CalculatorSection() {
  const [liters, setLiters] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [calcKey, setCalcKey] = useState(0); // force re-mount to re-trigger countup

  const handleCalculate = () => {
    const val = parseFloat(liters);
    if (!val || val <= 0) {
      setError('Masukkan jumlah liter yang valid (> 0).');
      setResults(null);
      return;
    }
    if (val > 10000000) {
      setError('Nilai terlalu besar. Maksimum 10.000.000 liter.');
      return;
    }
    setError('');
    setResults(calcResults(val));
    setCalcKey(k => k + 1);
  };

  return (
    <section id="calculator" className="py-28 bg-brand-bg">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">🧮 Feature Two</span>
          <h2 className="section-title">
            Carbon Impact <span className="text-gradient-green">Calculator</span>
          </h2>
          <p className="section-subtitle">
            Masukkan volume minyak jelantah Anda dan lihat dampak nyata
            yang bisa dihasilkan untuk lingkungan.
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-card border border-gray-100 p-8 md:p-12"
        >
          {/* Input */}
          <div className="mb-8">
            <label htmlFor="uco-input" className="block font-jakarta font-semibold text-brand-text mb-2 text-lg">
              🛢️ Jumlah Minyak Jelantah
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  id="uco-input"
                  type="number"
                  min="0"
                  max="10000000"
                  value={liters}
                  onChange={e => { setLiters(e.target.value); setResults(null); setError(''); }}
                  onKeyDown={e => e.key === 'Enter' && handleCalculate()}
                  placeholder="Contoh: 10"
                  className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 text-lg font-semibold text-brand-text focus:outline-none focus:border-brand-green transition-colors placeholder-gray-300"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">Liter</span>
              </div>
              <button
                onClick={handleCalculate}
                className="btn-primary whitespace-nowrap"
                id="calc-button"
              >
                Calculate Impact
              </button>
            </div>

            {/* Slider */}
            <div className="mt-4">
              <label className="text-sm text-gray-400 mb-1 block">
                Atau pilih dengan slider: <span className="text-brand-green font-semibold">{liters || 0} L</span>
              </label>
              <input
                type="range"
                min="1"
                max="10000"
                value={liters || 1}
                onChange={e => { setLiters(e.target.value); setResults(null); }}
                className="w-full accent-brand-green"
                aria-label="Slider volume UCO"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1 L</span><span>2.500 L</span><span>5.000 L</span><span>10.000 L</span>
              </div>
            </div>

            {error && <p className="mt-3 text-red-500 text-sm font-medium">{error}</p>}
          </div>

          {/* Formula reference */}
          <div className="grid grid-cols-3 gap-3 mb-8 text-center">
            {[
              { formula: '× 0.85', label: 'Yield Biodiesel', color: 'bg-green-50 text-brand-green' },
              { formula: '× 2.28', label: 'kg CO₂ Offset', color: 'bg-blue-50 text-blue-600' },
              { formula: '÷ 21.7', label: 'Setara Pohon', color: 'bg-emerald-50 text-emerald-600' },
            ].map((f, i) => (
              <div key={i} className={`${f.color} rounded-xl p-3`}>
                <div className="font-jakarta font-bold text-lg">{f.formula}</div>
                <div className="text-xs opacity-70">{f.label}</div>
              </div>
            ))}
          </div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {results && (
              <motion.div
                key={calcKey}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="h-px bg-gray-100 mb-8" />
                <h3 className="font-jakarta font-bold text-lg text-brand-text mb-5 text-center">
                  ✨ Dampak dari{' '}
                  <span className="text-brand-green">
                    {parseFloat(liters).toLocaleString('id-ID')} Liter
                  </span>{' '}
                  Jelantah
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ResultCard icon="⚡" label="Biodiesel Produced" value={results.biodiesel} unit="L" color="bg-green-50" />
                  <ResultCard icon="🌍" label="Carbon Reduction" value={results.carbon} unit="kg CO₂" color="bg-blue-50" />
                  <ResultCard icon="🌳" label="Equivalent Trees" value={results.trees} unit="pohon" color="bg-emerald-50" />
                </div>
                <p className="text-center text-xs text-gray-400 mt-5">
                  * Kalkulasi berdasarkan standar RED II EU & faktor emisi IPCC
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
