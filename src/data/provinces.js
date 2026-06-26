// Data 38 Provinsi Indonesia + Estimasi Potensi UCO
// Sumber: BPS Susenas 2025, estimasi faktor konversi:
// (Populasi / 3.5 jiwa/RT) × 0.9 L/bulan × 12 bulan / 1000 = ton/tahun

export const GROWTH_RATE = 0.011; // rata-rata pertumbuhan penduduk RI

export const provinces = [
  { id: "ID-JB", name: "Jawa Barat", population2025: 49935858, area: 35377, lat: -6.9, lng: 107.6, capital: "Bandung" },
  { id: "ID-JI", name: "Jawa Timur", population2025: 41149947, area: 47963, lat: -7.5, lng: 112.2, capital: "Surabaya" },
  { id: "ID-JT", name: "Jawa Tengah", population2025: 37227604, area: 32801, lat: -7.15, lng: 110.15, capital: "Semarang" },
  { id: "ID-SU", name: "Sumatera Utara", population2025: 15272832, area: 71681, lat: 2.1, lng: 99.5, capital: "Medan" },
  { id: "ID-JK", name: "DKI Jakarta", population2025: 10670852, area: 664, lat: -6.21, lng: 106.85, capital: "Jakarta" },
  { id: "ID-BT", name: "Banten", population2025: 13045000, area: 9663, lat: -6.4, lng: 106.0, capital: "Serang" },
  { id: "ID-SS", name: "Sumatera Selatan", population2025: 8694857, area: 91592, lat: -3.3, lng: 104.0, capital: "Palembang" },
  { id: "ID-SN", name: "Sulawesi Selatan", population2025: 9399124, area: 46717, lat: -3.65, lng: 120.0, capital: "Makassar" },
  { id: "ID-LA", name: "Lampung", population2025: 9227434, area: 33368, lat: -4.5, lng: 105.4, capital: "Bandar Lampung" },
  { id: "ID-RI", name: "Riau", population2025: 6819000, area: 87023, lat: 0.5, lng: 101.4, capital: "Pekanbaru" },
  { id: "ID-KS", name: "Kalimantan Selatan", population2025: 4360200, area: 37530, lat: -2.5, lng: 115.5, capital: "Banjarmasin" },
  { id: "ID-KT", name: "Kalimantan Timur", population2025: 3858022, area: 127267, lat: 1.0, lng: 116.0, capital: "Samarinda" },
  { id: "ID-BA", name: "Bali", population2025: 4381000, area: 5780, lat: -8.4, lng: 115.2, capital: "Denpasar" },
  { id: "ID-NB", name: "Nusa Tenggara Barat", population2025: 5657191, area: 18572, lat: -8.65, lng: 117.36, capital: "Mataram" },
  { id: "ID-NT", name: "Nusa Tenggara Timur", population2025: 5502762, area: 48718, lat: -8.66, lng: 121.08, capital: "Kupang" },
  { id: "ID-SB", name: "Sumatera Barat", population2025: 5549750, area: 42013, lat: -0.74, lng: 100.8, capital: "Padang" },
  { id: "ID-AC", name: "Aceh", population2025: 5491000, area: 57956, lat: 4.7, lng: 96.7, capital: "Banda Aceh" },
  { id: "ID-KI", name: "Kalimantan Barat", population2025: 5510000, area: 146807, lat: 0.0, lng: 109.3, capital: "Pontianak" },
  { id: "ID-SG", name: "Sulawesi Tengah", population2025: 3068000, area: 61841, lat: -1.43, lng: 121.44, capital: "Palu" },
  { id: "ID-ST", name: "Sulawesi Tenggara", population2025: 2697000, area: 36757, lat: -4.14, lng: 122.17, capital: "Kendari" },
  { id: "ID-SR", name: "Sulawesi Utara", population2025: 2690000, area: 13937, lat: 0.62, lng: 123.97, capital: "Manado" },
  { id: "ID-BE", name: "Bengkulu", population2025: 2020000, area: 19919, lat: -3.8, lng: 102.27, capital: "Bengkulu" },
  { id: "ID-MA", name: "Maluku", population2025: 1867000, area: 46914, lat: -3.24, lng: 130.14, capital: "Ambon" },
  { id: "ID-MU", name: "Maluku Utara", population2025: 1323000, area: 31982, lat: 1.57, lng: 127.81, capital: "Sofifi" },
  { id: "ID-PA", name: "Papua Selatan", population2025: 502000, area: 112915, lat: -6.5, lng: 138.4, capital: "Merauke" },
  { id: "ID-PB", name: "Papua Barat", population2025: 1065500, area: 97024, lat: -1.33, lng: 133.17, capital: "Manokwari" },
  { id: "ID-PP", name: "Papua Pegunungan", population2025: 1187000, area: 67974, lat: -4.1, lng: 138.5, capital: "Jayawijaya" },
  { id: "ID-PT", name: "Papua Tengah", population2025: 919000, area: 78658, lat: -3.5, lng: 136.5, capital: "Nabire" },
  { id: "ID-PD", name: "Papua", population2025: 3428000, area: 94248, lat: -4.27, lng: 138.08, capital: "Jayapura" },
  { id: "ID-YO", name: "DI Yogyakarta", population2025: 3831000, area: 3171, lat: -7.8, lng: 110.37, capital: "Yogyakarta" },
  { id: "ID-KU", name: "Kalimantan Utara", population2025: 760000, area: 72567, lat: 3.07, lng: 116.04, capital: "Tanjung Selor" },
  { id: "ID-KH", name: "Kalimantan Tengah", population2025: 2750000, area: 153564, lat: -1.68, lng: 113.38, capital: "Palangkaraya" },
  { id: "ID-JA", name: "Jambi", population2025: 3741000, area: 50160, lat: -1.61, lng: 103.61, capital: "Jambi" },
  { id: "ID-BB", name: "Bangka Belitung", population2025: 1493000, area: 16424, lat: -2.74, lng: 106.44, capital: "Pangkal Pinang" },
  { id: "ID-KR", name: "Kepulauan Riau", population2025: 2408000, area: 8201, lat: 3.94, lng: 108.14, capital: "Tanjung Pinang" },
  { id: "ID-GO", name: "Gorontalo", population2025: 1198000, area: 11258, lat: 0.54, lng: 123.06, capital: "Gorontalo" },
  { id: "ID-SW", name: "Sulawesi Barat", population2025: 1504000, area: 16787, lat: -2.84, lng: 119.23, capital: "Mamuju" },
  { id: "ID-PW", name: "Papua Barat Daya", population2025: 532000, area: 40623, lat: -1.48, lng: 132.14, capital: "Sorong" },
].map(p => {
  const ucoTonPerYear = Math.round((p.population2025 / 3.5) * 0.9 * 12 / 1000);
  const biodieselLiter = Math.round(ucoTonPerYear * 1000 * 0.85);
  const carbonOffset = Math.round(biodieselLiter * 2.28);
  const mwhProduced = Math.round(biodieselLiter * 0.0094);
  const busSupply = Math.round(biodieselLiter / 8 / 365);
  const absorptionRate = Math.min(0.85, Math.max(0.15, (p.population2025 / 49935858) * 0.7 + 0.1));
  const unabsorbedUco = Math.round(ucoTonPerYear * (1 - absorptionRate));
  return {
    ...p,
    ucoTonPerYear,
    biodieselLiter,
    carbonOffset,
    mwhProduced,
    busSupply,
    absorptionRate: Math.round(absorptionRate * 100),
    unabsorbedUco,
  };
});

// Simulasi kabupaten/kota untuk beberapa provinsi terpilih
export const kabupatenData = {
  "ID-JB": [
    { name: "Bandung", population: 2575478, ucoTonPerYear: 7930 },
    { name: "Bogor", population: 5558474, ucoTonPerYear: 17122 },
    { name: "Bekasi", population: 3444727, ucoTonPerYear: 10611 },
    { name: "Depok", population: 2548569, ucoTonPerYear: 7847 },
    { name: "Cimahi", population: 636792, ucoTonPerYear: 1961 },
    { name: "Tasikmalaya", population: 719782, ucoTonPerYear: 2217 },
    { name: "Sukabumi", population: 591000, ucoTonPerYear: 1820 },
  ],
  "ID-JI": [
    { name: "Surabaya", population: 2977248, ucoTonPerYear: 9172 },
    { name: "Malang", population: 895000, ucoTonPerYear: 2757 },
    { name: "Sidoarjo", population: 2264000, ucoTonPerYear: 6975 },
    { name: "Gresik", population: 1299000, ucoTonPerYear: 4002 },
    { name: "Jember", population: 2576000, ucoTonPerYear: 7933 },
    { name: "Mojokerto", population: 1116000, ucoTonPerYear: 3438 },
  ],
  "ID-JT": [
    { name: "Semarang", population: 1814110, ucoTonPerYear: 5588 },
    { name: "Solo", population: 562000, ucoTonPerYear: 1731 },
    { name: "Magelang", population: 125000, ucoTonPerYear: 385 },
    { name: "Cilacap", population: 1935000, ucoTonPerYear: 5961 },
    { name: "Banyumas", population: 1722000, ucoTonPerYear: 5305 },
    { name: "Klaten", population: 1234000, ucoTonPerYear: 3802 },
  ],
  "ID-JK": [
    { name: "Jakarta Pusat", population: 975000, ucoTonPerYear: 3003 },
    { name: "Jakarta Utara", population: 1781000, ucoTonPerYear: 5487 },
    { name: "Jakarta Barat", population: 2400000, ucoTonPerYear: 7396 },
    { name: "Jakarta Selatan", population: 2226000, 	ucoTonPerYear: 6858 },
    { name: "Jakarta Timur", population: 2905000, ucoTonPerYear: 8951 },
    { name: "Kepulauan Seribu", population: 28000, ucoTonPerYear: 86 },
  ],
};

export function getProvinceById(id) {
  return provinces.find(p => p.id === id);
}

export function getProjectedPopulation(basePopulation, year) {
  const t = year - 2025;
  return Math.round(basePopulation * Math.pow(1 + GROWTH_RATE, t));
}

export function getProjectedUCO(baseUco, year) {
  const t = year - 2025;
  return Math.round(baseUco * Math.pow(1 + GROWTH_RATE, t));
}

export function getUCOColor(ucoTon) {
  if (ucoTon > 50000) return '#7F1D1D';
  if (ucoTon > 30000) return '#B91C1C';
  if (ucoTon > 15000) return '#DC2626';
  if (ucoTon > 8000) return '#F97316';
  if (ucoTon > 4000) return '#EAB308';
  if (ucoTon > 2000) return '#22C55E';
  if (ucoTon > 1000) return '#16A34A';
  return '#15803D';
}
