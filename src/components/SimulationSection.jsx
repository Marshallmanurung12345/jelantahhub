import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import simulationData from '../data/simulation.json';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-card-hover text-sm">
      <p className="font-jakarta font-bold text-brand-text mb-2">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }} className="font-semibold">
          {entry.name}: {entry.value.toLocaleString('id-ID')}
        </p>
      ))}
    </div>
  );
};

export default function SimulationSection() {
  const allYears = simulationData.years;
  const [selectedYear, setSelectedYear] = useState(2030);

  // Data up to selected year
  const chartData = useMemo(
    () => allYears.filter(d => d.year <= selectedYear),
    [selectedYear]
  );

  const currentData = allYears.find(d => d.year === selectedYear) || allYears[0];

  const stats = [
    {
      label: 'Estimated UCO',
      value: currentData.uco,
      unit: 'Liter',
      color: 'text-brand-yellow',
      bg: 'bg-yellow-50',
      icon: '🛢️',
    },
    {
      label: 'Potential Biodiesel',
      value: currentData.biodiesel,
      unit: 'Liter',
      color: 'text-brand-green',
      bg: 'bg-green-50',
      icon: '⚡',
    },
    {
      label: 'Carbon Saved',
      value: currentData.carbon,
      unit: 'kg CO₂',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      icon: '🌍',
    },
  ];

  return (
    <section id="simulation" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">📈 Feature Three</span>
          <h2 className="section-title">
            Future Impact <span className="text-gradient-green">Simulation</span>
          </h2>
          <p className="section-subtitle">
            Geser slider untuk mensimulasikan dampak program ReOil
            terhadap produksi biodiesel dan pengurangan emisi karbon dari 2025 hingga 2035.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="bg-brand-bg rounded-3xl border border-gray-100 p-8 md:p-10 shadow-card"
        >
          {/* Year Slider */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">2025</span>
              <div className="text-center">
                <span className="font-jakarta font-black text-5xl text-brand-green">{selectedYear}</span>
                <p className="text-xs text-gray-400 mt-1">Tahun Proyeksi</p>
              </div>
              <span className="text-sm font-medium text-gray-500">2035</span>
            </div>
            <input
              type="range"
              id="year-simulation-slider"
              min={2025}
              max={2035}
              step={1}
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
              className="w-full accent-brand-green h-2 cursor-pointer"
              aria-label={`Simulasi tahun ${selectedYear}`}
            />
            <div className="flex justify-between mt-2">
              {allYears.map(d => (
                <button
                  key={d.year}
                  onClick={() => setSelectedYear(d.year)}
                  className={`text-xs transition-all ${
                    d.year === selectedYear
                      ? 'text-brand-green font-bold scale-110'
                      : 'text-gray-300 hover:text-gray-500'
                  }`}
                >
                  {d.year}
                </button>
              ))}
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {stats.map((stat, i) => (
              <motion.div
                key={`${stat.label}-${selectedYear}`}
                initial={{ opacity: 0.6, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className={`${stat.bg} rounded-2xl p-5`}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className={`font-jakarta font-black text-2xl ${stat.color} mb-0.5`}>
                  {stat.value.toLocaleString('id-ID')}
                  <span className="text-sm font-medium text-gray-400 ml-1">{stat.unit}</span>
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Area Chart */}
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="gradUco" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FACC15" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FACC15" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradBio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradCarbon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => v >= 1000000 ? `${(v/1000000).toFixed(1)}M` : v >= 1000 ? `${(v/1000).toFixed(0)}K` : v}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: '13px', color: '#6B7280' }}
                />
                <Area type="monotone" dataKey="uco" name="Estimated UCO" stroke="#FACC15" strokeWidth={2.5} fill="url(#gradUco)" dot={{ r: 4, fill: '#FACC15', strokeWidth: 0 }} />
                <Area type="monotone" dataKey="biodiesel" name="Potential Biodiesel" stroke="#16A34A" strokeWidth={2.5} fill="url(#gradBio)" dot={{ r: 4, fill: '#16A34A', strokeWidth: 0 }} />
                <Area type="monotone" dataKey="carbon" name="Carbon Saved (kg)" stroke="#3B82F6" strokeWidth={2.5} fill="url(#gradCarbon)" dot={{ r: 4, fill: '#3B82F6', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            * Data proyeksi berdasarkan pertumbuhan rata-rata 10.5%/tahun · Sumber: Estimasi internal ReOil
          </p>
        </motion.div>
      </div>
    </section>
  );
}
