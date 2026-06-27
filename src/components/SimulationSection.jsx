import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import simulationData from "../data/simulation.json";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="surface-card p-4 text-[14px] shadow-[0_8px_24px_rgba(25,25,25,0.12)]">
      <p className="font-bold text-[#191919]">{label}</p>
      <div className="mt-3 space-y-2">
        {payload.map((entry) => (
          <p key={entry.name} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString("id-ID")}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function SimulationSection() {
  const [selectedYear, setSelectedYear] = useState(2030);
  const allYears = simulationData.years;

  const chartData = useMemo(
    () => allYears.filter((item) => item.year <= selectedYear),
    [allYears, selectedYear],
  );

  const currentData =
    allYears.find((item) => item.year === selectedYear) ?? allYears[0];

  const stats = [
    { label: "Estimasi UCO", value: currentData.uco, unit: "Liter" },
    {
      label: "Potensi biodiesel",
      value: currentData.biodiesel,
      unit: "Liter",
    },
    { label: "Karbon dihemat", value: currentData.carbon, unit: "kg CO2" },
  ];

  return (
    <section id="simulation" className="page-section bg-[#F7F8FA]">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-[760px]"
        >
          <span className="section-eyebrow">Simulasi masa depan</span>
          <h2 className="section-title">Antarmuka proyeksi dengan gaya produk yang lebih rapi</h2>
          <p className="section-subtitle">
            Grafik tetap dipertahankan, tetapi container, legend, dan stat cards
            sekarang mengikuti surface tajam dan neutral palette yang diminta.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="mt-10 surface-card p-6 md:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            <div>
              <div className="text-[12px] uppercase tracking-[0.12em] text-[#AEAEAE]">
                Tahun proyeksi
              </div>
              <div className="mt-3 text-[32px] font-bold leading-10 text-[#191919]">
                {selectedYear}
              </div>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#303030]">
                Geser tahun untuk melihat akumulasi potensi UCO, biodiesel, dan
                reduksi karbon dari 2025 sampai 2035.
              </p>

              <input
                type="range"
                min={2025}
                max={2035}
                step={1}
                value={selectedYear}
                onChange={(event) => setSelectedYear(Number(event.target.value))}
                className="mt-6 h-2 w-full accent-[#FF6900]"
                aria-label={`Simulasi tahun ${selectedYear}`}
              />

              <div className="mt-6 grid gap-px border border-[#E8E8E8] bg-[#E8E8E8]">
                {stats.map((item) => (
                  <div key={item.label} className="bg-[#F7F8FA] p-4">
                    <div className="text-[12px] uppercase tracking-[0.12em] text-[#AEAEAE]">
                      {item.label}
                    </div>
                    <div className="mt-2 text-[24px] font-semibold text-[#191919]">
                      {item.value.toLocaleString("id-ID")}
                    </div>
                    <div className="text-[14px] text-[#303030]">{item.unit}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="gradUco" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#191919" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#191919" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradBio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6900" stopOpacity={0.24} />
                      <stop offset="95%" stopColor="#FF6900" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradCarbon" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#BE7600" stopOpacity={0.22} />
                      <stop offset="95%" stopColor="#BE7600" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#E8E8E8" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 12, fill: "#303030" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#303030" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) =>
                      value >= 1000000
                        ? `${(value / 1000000).toFixed(1)}M`
                        : value >= 1000
                          ? `${(value / 1000).toFixed(0)}K`
                          : value
                    }
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: "14px", color: "#303030" }} />
                  <Area
                    type="monotone"
                    dataKey="uco"
                    name="Estimasi UCO"
                    stroke="#191919"
                    strokeWidth={2}
                    fill="url(#gradUco)"
                    dot={{ r: 3, fill: "#191919" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="biodiesel"
                    name="Potensi biodiesel"
                    stroke="#FF6900"
                    strokeWidth={2}
                    fill="url(#gradBio)"
                    dot={{ r: 3, fill: "#FF6900" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="carbon"
                    name="Karbon dihemat"
                    stroke="#BE7600"
                    strokeWidth={2}
                    fill="url(#gradCarbon)"
                    dot={{ r: 3, fill: "#BE7600" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
