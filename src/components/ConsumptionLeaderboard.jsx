import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

import regionalData from "../data/regional_enriched.json";
import provincesData from "../data/provinces-map.json";

function formatValue(value) {
  return Number(value ?? 0).toLocaleString("id-ID", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}

export default function ConsumptionLeaderboard() {
  const [selectedProvince, setSelectedProvince] = useState("all");

  const provinceOptions = useMemo(
    () =>
      provincesData.provinces.map((province) => ({
        id: province.id,
        name: province.name,
      })),
    [],
  );

  const flatRegional = useMemo(() => {
    const result = [];

    Object.entries(regionalData).forEach(([provinceId, items]) => {
      const province = provincesData.provinces.find((item) => item.id === provinceId);

      (items || []).forEach((item) => {
        result.push({
          ...item,
          province_id: provinceId,
          province_name: province?.name || provinceId,
        });
      });
    });

    return result;
  }, []);

  const filteredData = useMemo(() => {
    if (selectedProvince === "all") return flatRegional;
    return flatRegional.filter((item) => item.province_id === selectedProvince);
  }, [flatRegional, selectedProvince]);

  const highestFive = useMemo(
    () =>
      [...filteredData]
        .sort(
          (a, b) =>
            Number(b.konsumsi_minyak_goreng_perkapita_minggu ?? 0) -
            Number(a.konsumsi_minyak_goreng_perkapita_minggu ?? 0),
        )
        .slice(0, 5),
    [filteredData],
  );

  const lowestFive = useMemo(
    () =>
      [...filteredData]
        .sort(
          (a, b) =>
            Number(a.konsumsi_minyak_goreng_perkapita_minggu ?? 0) -
            Number(b.konsumsi_minyak_goreng_perkapita_minggu ?? 0),
        )
        .slice(0, 5),
    [filteredData],
  );

  // Compute local averages for highlights
  const avgValue = useMemo(() => {
    if (!filteredData.length) return 0;
    const sum = filteredData.reduce((acc, curr) => acc + Number(curr.konsumsi_minyak_goreng_perkapita_minggu ?? 0), 0);
    return sum / filteredData.length;
  }, [filteredData]);

  // Compute maximum value in dataset for visual progress bar normalization
  const maxWeeklyConsumption = useMemo(() => {
    if (!flatRegional.length) return 0.5;
    return Math.max(...flatRegional.map((item) => Number(item.konsumsi_minyak_goreng_perkapita_minggu ?? 0)), 0.1);
  }, [flatRegional]);

  return (
    <section id="leaderboard" className="page-section bg-[#fcfbf9] border-t border-[#eae6df]">
      <div className="page-container">
        
        {/* Layout Split: Left for Editorial Intro, Right for Filtered Visual Dot Plot */}
        <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:items-start">
          
          <div>
            <span className="section-eyebrow">Insight Spasial</span>
            <h2 className="section-title">Kesenjangan Konsumsi Nasional</h2>
            <p className="section-subtitle">
              Distribusi penggunaan minyak goreng per kapita menunjukkan perbedaan mencolok 
              antardaerah di Indonesia. Pola ini memengaruhi seberapa besar potensi pengumpulan 
              minyak jelantah di setiap daerah.
            </p>

            {/* Editorial Stats Block */}
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <div className="border-t border-[#eae6df] pt-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                  Rata-rata Konsumsi Wilayah
                </span>
                <div className="mt-3 text-[48px] font-medium text-[#111111] font-serif leading-none">
                  {formatValue(avgValue)}
                </div>
                <p className="mt-2 text-[13px] text-[#444444] leading-relaxed">
                  Liter per orang per minggu di wilayah yang sedang Anda filter.
                </p>
              </div>

              <div className="border-t border-[#eae6df] pt-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#e05300]">
                  Puncak Tertinggi
                </span>
                <div className="mt-3 text-[48px] font-medium text-[#e05300] font-serif leading-none">
                  {highestFive[0] ? formatValue(highestFive[0].konsumsi_minyak_goreng_perkapita_minggu) : "0,00"}
                </div>
                <p className="mt-2 text-[13px] text-[#444444] leading-relaxed">
                  Konsumsi tertinggi dicatatkan oleh {highestFive[0]?.name || "N/A"}.
                </p>
              </div>
            </div>

            {/* Filter Widget - Minimalist */}
            <div className="mt-12 bg-[#f4f1eb] p-6 border border-[#eae6df] max-w-[360px]">
              <label className="mb-2 flex items-center gap-2 text-[12px] font-bold text-[#111111] uppercase tracking-wider">
                <Filter className="h-3.5 w-3.5 text-[#e05300]" />
                Filter Fokus Provinsi
              </label>
              <select
                value={selectedProvince}
                onChange={(event) => setSelectedProvince(event.target.value)}
                className="w-full bg-transparent border-b border-[#111111] py-2 text-[15px] outline-none text-[#111111] cursor-pointer"
              >
                <option value="all">Seluruh Indonesia</option>
                {provinceOptions.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Column: Visual Dot Plot / List style graphic */}
          <div className="bg-[#f4f1eb] p-8 border border-[#eae6df] space-y-12">
            
            {/* Highest Group */}
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-[#eae6df] pb-3">
                <span className="h-2 w-2 bg-[#e05300] rounded-full" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                  Intensitas Tertinggi (5 Teratas)
                </span>
              </div>

              <div className="space-y-6">
                {highestFive.map((item, index) => {
                  const barWidth = `${Math.min((Number(item.konsumsi_minyak_goreng_perkapita_minggu) / maxWeeklyConsumption) * 100, 100)}%`;
                  return (
                    <div key={`high-${item.name}-${index}`} className="group">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <span className="text-[11px] font-bold text-[#e05300] mr-2">#{index + 1}</span>
                          <span className="text-[14px] font-bold text-[#111111]">{item.name}</span>
                          <span className="text-[11px] text-[#666666] ml-2">({item.province_name})</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[15px] font-medium text-[#111111] font-serif">
                            {formatValue(item.konsumsi_minyak_goreng_perkapita_minggu)}
                          </span>
                          <span className="text-[9px] text-[#666666] uppercase ml-1">L/org</span>
                        </div>
                      </div>
                      {/* Mini visual progress bar */}
                      <div className="w-full h-1 bg-[#eae6df] mt-2 relative overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: barWidth }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-[#e05300]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lowest Group */}
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-[#eae6df] pb-3">
                <span className="h-2 w-2 bg-[#444444] rounded-full" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                  Intensitas Terendah (5 Terbawah)
                </span>
              </div>

              <div className="space-y-6">
                {lowestFive.map((item, index) => {
                  const barWidth = `${Math.min((Number(item.konsumsi_minyak_goreng_perkapita_minggu) / maxWeeklyConsumption) * 100, 100)}%`;
                  return (
                    <div key={`low-${item.name}-${index}`} className="group">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <span className="text-[11px] font-bold text-[#666666] mr-2">#{index + 1}</span>
                          <span className="text-[14px] font-bold text-[#111111]">{item.name}</span>
                          <span className="text-[11px] text-[#666666] ml-2">({item.province_name})</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[15px] font-medium text-[#111111] font-serif">
                            {formatValue(item.konsumsi_minyak_goreng_perkapita_minggu)}
                          </span>
                          <span className="text-[9px] text-[#666666] uppercase ml-1">L/org</span>
                        </div>
                      </div>
                      {/* Mini visual progress bar */}
                      <div className="w-full h-1 bg-[#eae6df] mt-2 relative overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: barWidth }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-[#444444]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
