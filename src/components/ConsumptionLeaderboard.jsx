import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Filter } from "lucide-react";

import regionalData from "../data/regional_enriched.json";
import provincesData from "../data/provinces-map.json";

function formatValue(value) {
  return Number(value ?? 0).toLocaleString("id-ID", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}

function ListCard({ title, badge, items, type = "high" }) {
  const isHigh = type === "high";

  return (
    <div className="surface-card bg-white">
      <div className="grid gap-px border-b border-[#E8E8E8] bg-[#E8E8E8] md:grid-cols-[1fr_64px]">
        <div className="bg-white p-5 md:p-6">
          <span
            className={`inline-flex items-center px-2 py-1 text-[12px] font-semibold ${
              isHigh
                ? "bg-[#FFF4ED] text-[#BE7600]"
                : "bg-[#F7F7F7] text-[#303030]"
            }`}
          >
            {badge}
          </span>
          <div className="mt-3 text-[12px] uppercase tracking-[0.12em] text-[#AEAEAE]">
            Satuan: liter/orang/minggu
          </div>
          <h3 className="mt-3 text-[24px] font-semibold leading-6 text-[#191919]">
            {title}
          </h3>
        </div>
        <div className="flex items-center justify-center bg-[#F7F8FA] p-4">
          {isHigh ? (
            <ArrowUpRight className="h-5 w-5 text-[#FF6900]" />
          ) : (
            <ArrowDownRight className="h-5 w-5 text-[#BE7600]" />
          )}
        </div>
      </div>

      <div className="grid gap-px bg-[#E8E8E8]">
        {items.map((item, index) => (
          <div
            key={`${item.province_id}-${item.name}-${index}`}
            className="grid gap-3 bg-white px-4 py-3 md:grid-cols-[36px_1fr_auto] md:items-center md:px-5"
          >
            <div className="flex h-9 w-9 items-center justify-center border border-[#E8E8E8] bg-[#F7F8FA] text-[12px] font-bold text-[#191919]">
              {index + 1}
            </div>

            <div>
              <h4 className="text-[16px] font-bold leading-5 text-[#191919]">
                {item.name}
              </h4>
              <p className="mt-1 text-[12px] uppercase tracking-[0.1em] text-[#AEAEAE]">
                {item.jenis_wilayah} / {item.province_name}
              </p>
            </div>

            <div className="text-left md:text-right">
              <div className="text-[16px] font-bold leading-5 text-[#191919]">
                {formatValue(item.konsumsi_minyak_goreng_perkapita_minggu)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
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

  const highestTen = useMemo(
    () =>
      [...filteredData]
        .sort(
          (a, b) =>
            Number(b.konsumsi_minyak_goreng_perkapita_minggu ?? 0) -
            Number(a.konsumsi_minyak_goreng_perkapita_minggu ?? 0),
        )
        .slice(0, 10),
    [filteredData],
  );

  const lowestTen = useMemo(
    () =>
      [...filteredData]
        .sort(
          (a, b) =>
            Number(a.konsumsi_minyak_goreng_perkapita_minggu ?? 0) -
            Number(b.konsumsi_minyak_goreng_perkapita_minggu ?? 0),
        )
        .slice(0, 10),
    [filteredData],
  );

  return (
    <section id="leaderboard" className="page-section bg-white">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end"
        >
          <div className="max-w-[760px]">
            <span className="section-eyebrow">Insight wilayah</span>
            <h2 className="section-title">
              Konsumsi minyak goreng tertinggi dan terendah
            </h2>
            <p className="section-subtitle">
              Menampilkan 10 kabupaten atau kota dengan konsumsi minyak goreng
              per kapita per minggu tertinggi dan terendah. Satuan angka pada
              daftar ini ditampilkan seragam untuk memudahkan perbandingan antarwilayah.
            </p>
          </div>

          <div className="surface-soft p-4 md:p-5">
            <label className="mb-3 flex items-center gap-2 text-[14px] font-bold text-[#191919]">
              <Filter className="h-4 w-4 text-[#FF6900]" />
              Filter provinsi
            </label>
            <select
              value={selectedProvince}
              onChange={(event) => setSelectedProvince(event.target.value)}
              className="input-field bg-white"
            >
              <option value="all">Semua provinsi</option>
              {provinceOptions.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45 }}
          >
            <ListCard
              title="Top 10 tertinggi"
              badge="Konsumsi paling tinggi"
              items={highestTen}
              type="high"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <ListCard
              title="Top 10 terendah"
              badge="Konsumsi paling rendah"
              items={lowestTen}
              type="low"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
