import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCountUp } from "../hooks/useCountUp";

function calcResults(liters) {
  const biodiesel = +(liters * 0.85).toFixed(1);
  const carbon = +(biodiesel * 2.28).toFixed(1);
  const trees = Math.round(carbon / 21.7);
  return { biodiesel, carbon, trees };
}

function ResultCard({ label, value, unit }) {
  const { ref, formatted } = useCountUp(Math.floor(value), 1400);

  return (
    <div ref={ref} className="surface-card p-5">
      <div className="text-[12px] uppercase tracking-[0.12em] text-[#AEAEAE]">
        {label}
      </div>
      <div className="mt-4 text-[30px] font-bold leading-[1.25] text-[#191919]">
        {formatted}
      </div>
      <div className="mt-1 text-[14px] text-[#303030]">{unit}</div>
    </div>
  );
}

export default function CalculatorSection() {
  const [liters, setLiters] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [calcKey, setCalcKey] = useState(0);

  const handleCalculate = () => {
    const value = parseFloat(liters);
    if (!value || value <= 0) {
      setError("Masukkan jumlah liter yang valid lebih dari 0.");
      setResults(null);
      return;
    }
    if (value > 10000000) {
      setError("Nilai maksimum adalah 10.000.000 liter.");
      return;
    }

    setError("");
    setResults(calcResults(value));
    setCalcKey((current) => current + 1);
  };

  return (
    <section id="calculator" className="page-section bg-white">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-[760px]"
        >
          <span className="section-eyebrow">Estimasi sederhana</span>
          <h2 className="section-title">Estimasi dampak berdasarkan volume jelantah</h2>
          <p className="section-subtitle">
            Bagian ini menyediakan simulasi sederhana untuk menerjemahkan volume
            minyak jelantah ke estimasi biodiesel, reduksi karbon, dan ekuivalen pohon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="mt-10 surface-soft border border-[#E8E8E8] p-6 md:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="text-[12px] uppercase tracking-[0.12em] text-[#AEAEAE]">
                Input
              </div>
              <h3 className="mt-3 text-[24px] font-semibold leading-7 text-[#191919]">
                Masukkan volume jelantah Anda
              </h3>
              <p className="mt-3 max-w-[420px] text-[14px] leading-[1.6] text-[#303030]">
                Kalkulasi ini memberi estimasi biodiesel, pengurangan emisi, dan
                ekuivalen pohon berdasarkan asumsi konversi yang dipakai secara konsisten.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
                <div className="relative">
                  <input
                    id="uco-input"
                    type="number"
                    min="0"
                    max="10000000"
                    value={liters}
                    onChange={(event) => {
                      setLiters(event.target.value);
                      setResults(null);
                      setError("");
                    }}
                    onKeyDown={(event) =>
                      event.key === "Enter" && handleCalculate()
                    }
                    placeholder="Contoh: 120"
                    className="input-field pr-16"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-[#AEAEAE]">
                    Liter
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCalculate}
                  className="button-primary"
                >
                  Hitung
                </button>
              </div>

              <div className="mt-5">
                <div className="mb-2 text-[14px] text-[#303030]">
                  Atau gunakan slider:{" "}
                  <span className="font-semibold text-[#191919]">
                    {liters || 1} L
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10000"
                  value={liters || 1}
                  onChange={(event) => {
                    setLiters(event.target.value);
                    setResults(null);
                    setError("");
                  }}
                  className="h-2 w-full accent-[#FF6900]"
                  aria-label="Slider volume UCO"
                />
              </div>

              {error ? (
                <p className="mt-3 text-[14px] text-[#D32F2F]">{error}</p>
              ) : null}
            </div>

            <div className="grid gap-px border border-[#E8E8E8] bg-[#E8E8E8] sm:grid-cols-3">
              {[
                { formula: "x 0.85", label: "estimasi biodiesel" },
                { formula: "x 2.28", label: "estimasi kg CO2" },
                { formula: "/ 21.7", label: "ekuivalen pohon" },
              ].map((item) => (
                <div key={item.label} className="bg-white p-4">
                  <div className="text-[24px] font-semibold text-[#191919]">
                    {item.formula}
                  </div>
                  <div className="mt-2 text-[14px] text-[#303030]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {results ? (
              <motion.div
                key={calcKey}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-8 border-t border-[#E8E8E8] pt-8"
              >
                <div className="mb-5 text-[16px] font-bold text-[#191919]">
                  Dampak dari {parseFloat(liters).toLocaleString("id-ID")} liter
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <ResultCard
                    label="Biodiesel dihasilkan"
                    value={results.biodiesel}
                    unit="liter"
                  />
                  <ResultCard
                    label="Reduksi karbon"
                    value={results.carbon}
                    unit="kg CO2"
                  />
                  <ResultCard
                    label="Setara pohon"
                    value={results.trees}
                    unit="pohon"
                  />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
