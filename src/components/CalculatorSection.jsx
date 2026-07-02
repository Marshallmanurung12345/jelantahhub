import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCountUp } from "../hooks/useCountUp";

function calcResults(liters) {
  const biodiesel = +(liters * 0.85).toFixed(1);
  const carbon = +(biodiesel * 2.28).toFixed(1);
  const trees = Math.round(carbon / 21.7);
  return { biodiesel, carbon, trees };
}

function ResultRow({ label, value, unit }) {
  const { ref, formatted } = useCountUp(Math.floor(value), 1200);

  return (
    <div ref={ref} className="flex flex-col md:flex-row md:items-baseline md:justify-between py-6 border-b border-[#eae6df]">
      <span className="text-[12px] font-bold uppercase tracking-wider text-[#666666] md:w-1/3">
        {label}
      </span>
      <div className="flex items-baseline gap-2 mt-2 md:mt-0 md:w-2/3 md:justify-end">
        <span className="text-[36px] font-medium leading-none text-[#111111] font-serif md:text-[48px]">
          {formatted}
        </span>
        <span className="text-[15px] font-sans text-[#444444]">{unit}</span>
      </div>
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
      setError("Silakan masukkan volume minyak yang valid.");
      setResults(null);
      return;
    }
    if (value > 10000000) {
      setError("Maksimum batas kalkulasi adalah 10.000.000 liter.");
      return;
    }

    setError("");
    setResults(calcResults(value));
    setCalcKey((current) => current + 1);
  };

  return (
    <section id="calculator" className="page-section bg-[#fcfbf9] border-t border-[#eae6df]">
      <div className="page-container max-w-[840px]">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="section-eyebrow">Simulasi Dampak Mandiri</span>
          <h2 className="section-title">Kalkulator Dampak Lingkungan</h2>
          <p className="section-subtitle mx-auto">
            Kalkulasikan kontribusi Anda sendiri. Terjemahkan volume minyak sisa 
            yang Anda miliki menjadi nilai manfaat biodiesel dan emisi karbon yang dapat dihemat.
          </p>
        </motion.div>

        {/* Sentence Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#f4f1eb] p-8 md:p-12 border border-[#eae6df] text-center"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 text-[18px] md:text-[22px] font-medium text-[#111111] font-serif leading-relaxed">
            <span>Jika kami mengumpulkan</span>
            <div className="relative inline-block w-full sm:w-[160px]">
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
                onKeyDown={(event) => event.key === "Enter" && handleCalculate()}
                placeholder="0"
                className="w-full text-center border-b border-[#111111] bg-transparent pb-1 text-[22px] md:text-[26px] font-serif focus:border-[#e05300] outline-none"
              />
            </div>
            <span>liter minyak jelantah sisa dapur,</span>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleCalculate}
              className="button-accent px-10 text-[13px] tracking-widest uppercase font-bold"
            >
              Hitung Dampak
            </button>
            {error ? (
              <p className="text-[13px] text-[#b95213] font-medium mt-2">{error}</p>
            ) : null}
          </div>
        </motion.div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {results ? (
            <motion.div
              key={calcKey}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-12 border-t border-[#eae6df] pt-4"
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e05300] mb-4">
                Estimasi Kontribusi Energi Bersih
              </div>
              <div className="flex flex-col">
                <ResultRow
                  label="Biodiesel yang Dihasilkan"
                  value={results.biodiesel}
                  unit="liter"
                />
                <ResultRow
                  label="Reduksi Emisi Karbon"
                  value={results.carbon}
                  unit="kg CO₂"
                />
                <ResultRow
                  label="Ekuivalen Penyerapan Pohon"
                  value={results.trees}
                  unit="pohon / tahun"
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

      </div>
    </section>
  );
}
