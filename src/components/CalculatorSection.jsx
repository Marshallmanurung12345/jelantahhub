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

import { useMemo } from "react";

export default function CalculatorSection() {
  const [liters, setLiters] = useState("5");

  // Reactive calculation logic
  const results = useMemo(() => {
    const value = parseFloat(liters);
    if (isNaN(value) || value <= 0 || value > 10000000) {
      return null;
    }
    return calcResults(value);
  }, [liters]);

  const error = useMemo(() => {
    if (!liters) return "";
    const value = parseFloat(liters);
    if (isNaN(value) || value <= 0) {
      return "Silakan masukkan volume minyak yang valid.";
    }
    if (value > 10000000) {
      return "Maksimum batas kalkulasi adalah 10.000.000 liter.";
    }
    return "";
  }, [liters]);

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
            Kalkulasikan kontribusi Anda sendiri secara langsung. Terjemahkan volume minyak sisa 
            yang Anda miliki menjadi nilai manfaat biodiesel dan emisi karbon yang dapat dihemat.
          </p>
        </motion.div>

        {/* Conversational Sentence Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#f4f1eb] p-10 md:p-14 border border-[#eae6df] text-center"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 text-[20px] md:text-[24px] font-medium text-[#111111] font-serif leading-relaxed">
            <span>Jika saya memiliki</span>
            <div className="relative inline-block w-full sm:w-[150px]">
              <input
                id="uco-input"
                type="number"
                min="0"
                max="10000000"
                value={liters}
                onChange={(event) => setLiters(event.target.value)}
                placeholder="5"
                className="w-full text-center border-b-2 border-[#111111] bg-transparent pb-1 text-[24px] md:text-[28px] font-serif font-bold focus:border-[#e05300] outline-none text-[#e05300] transition-colors duration-200"
              />
            </div>
            <span>liter minyak jelantah,</span>
          </div>
          <div className="mt-4 text-[18px] md:text-[22px] font-serif font-medium text-[#111111]">
            berapa dampaknya bagi lingkungan?
          </div>

          {error ? (
            <p className="text-[13px] text-[#b95213] font-medium mt-6">{error}</p>
          ) : null}
        </motion.div>

        {/* Results Area - Always visible when results are valid */}
        <div className="mt-12 border-t border-[#eae6df] pt-4">
          {results ? (
            <div>
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
            </div>
          ) : (
            <div className="text-center py-10 text-[#666666] italic text-[14px]">
              Menunggu input volume minyak yang valid untuk menghitung dampak...
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
