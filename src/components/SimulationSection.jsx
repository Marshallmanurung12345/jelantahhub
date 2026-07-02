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
          <span className="section-eyebrow">Simulasi waktu</span>
          <h2 className="section-title">Gambaran proyeksi indikator dari 2025 hingga 2035</h2>
          <p className="section-subtitle">
            Grafik ini menampilkan perubahan akumulatif estimasi UCO, biodiesel,
            dan reduksi karbon dalam rentang waktu yang dapat digeser.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 bg-[#f4f1eb] p-8 md:p-12 border border-[#eae6df]"
        >
          <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                Proyeksi Tahun
              </div>
              <div className="mt-3 text-[56px] font-medium leading-none text-[#111111] font-serif">
                {selectedYear}
              </div>
              <p className="mt-4 text-[14px] leading-[1.6] text-[#444444]">
                Geser slider di bawah untuk mensimulasikan akumulasi potensi minyak jelantah, biodiesel, 
                dan emisi karbon yang tereduksi hingga tahun 2035.
              </p>

              <input
                type="range"
                min={2025}
                max={2035}
                step={1}
                value={selectedYear}
                onChange={(event) => setSelectedYear(Number(event.target.value))}
                className="mt-8 h-1 w-full bg-[#eae6df] accent-[#e05300] cursor-pointer"
                aria-label={`Simulasi tahun ${selectedYear}`}
              />

              <div className="mt-8 space-y-6 border-t border-[#eae6df] pt-6">
                {stats.map((item) => (
                  <div key={item.label}>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                      {item.label}
                    </div>
                    <div className="mt-1 text-[24px] font-medium text-[#111111] font-serif">
                      {item.value.toLocaleString("id-ID")}{" "}
                      <span className="text-[13px] font-sans font-normal text-[#444444]">
                        {item.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-h-[380px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="gradUco" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#111111" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#111111" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradBio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e05300" stopOpacity={0.16} />
                      <stop offset="95%" stopColor="#e05300" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradCarbon" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ebd2bf" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ebd2bf" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#eae6df" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 11, fill: "#666666" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#666666" }}
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
                  <Legend wrapperStyle={{ fontSize: "12px", color: "#111111", paddingTop: "20px" }} />
                  <Area
                    type="monotone"
                    dataKey="uco"
                    name="Estimasi UCO"
                    stroke="#111111"
                    strokeWidth={1.5}
                    fill="url(#gradUco)"
                    dot={{ r: 2, fill: "#111111" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="biodiesel"
                    name="Potensi biodiesel"
                    stroke="#e05300"
                    strokeWidth={1.5}
                    fill="url(#gradBio)"
                    dot={{ r: 2, fill: "#e05300" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="carbon"
                    name="Karbon dihemat"
                    stroke="#b95213"
                    strokeWidth={1.5}
                    fill="url(#gradCarbon)"
                    dot={{ r: 2, fill: "#b95213" }}
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
