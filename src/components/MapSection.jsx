import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import provincesData from "../data/provinces-map.json";
import indonesiaGeoJSON from "../data/indonesia.json";
import regionalData from "../data/regional_enriched.json";
import kabkotaGeoJSON from "../data/geo/kabkota-indonesia.json";

const LEVEL_COLORS = {
  low: "#eae6df",
  medium: "#ebd2bf",
  high: "#d4976a",
  "very-high": "#b95213",
};

const LEVEL_LABELS = {
  low: "Rendah",
  medium: "Sedang",
  high: "Tinggi",
  "very-high": "Sangat Tinggi",
};

const DEFAULT_PROVINCE_STYLE = {
  weight: 0.8,
  opacity: 1,
  color: "#fcfbf9",
  fillOpacity: 0.9,
};

const ACTIVE_PROVINCE_STYLE = {
  weight: 1.2,
  opacity: 1,
  color: "#111111",
  fillOpacity: 1,
};

const DEFAULT_REGIONAL_STYLE = {
  weight: 0.6,
  opacity: 1,
  color: "#fcfbf9",
  fillOpacity: 0.85,
};

const ACTIVE_REGIONAL_STYLE = {
  weight: 1.2,
  opacity: 1,
  color: "#111111",
  fillOpacity: 1,
};

const MAP_CENTER = [-2.5, 118];
const MAP_ZOOM = 5;

function formatDecimal(value, digits = 3) {
  return Number(value ?? 0).toLocaleString("id-ID", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/^kabupaten\s+/i, "")
    .replace(/^kab\.\s+/i, "")
    .replace(/^kota administrasi\s+/i, "")
    .replace(/^kota adm\.\s+/i, "")
    .replace(/^kota\s+/i, "")
    .replace(/[().,/\\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeProvinceName(name) {
  if (!name) return null;
  const n = String(name).toUpperCase();

  if (n.includes("ACEH")) return "aceh";
  if (n.includes("SUMATERA UTARA")) return "sumut";
  if (n.includes("SUMATERA BARAT")) return "sumbar";
  if (n.includes("RIAU") && !n.includes("KEPULAUAN")) return "riau";
  if (n.includes("KEPULAUAN RIAU")) return "kepri";
  if (n.includes("JAMBI")) return "jambi";
  if (n.includes("BENGKULU")) return "bengkulu";
  if (n.includes("SUMATERA SELATAN")) return "sumsel";
  if (n.includes("BANGKA BELITUNG")) return "babel";
  if (n.includes("LAMPUNG")) return "lampung";
  if (n.includes("BANTEN") || n.includes("PROBANTEN")) return "banten";
  if (n.includes("JAKARTA")) return "jakarta";
  if (n.includes("JAWA BARAT")) return "jabar";
  if (n.includes("JAWA TENGAH")) return "jateng";
  if (n.includes("YOGYAKARTA") || n.includes("YOGYA")) return "yogya";
  if (n.includes("JAWA TIMUR")) return "jatim";
  if (n.includes("BALI")) return "bali";
  if (n.includes("NUSATENGGARA BARAT") || n.includes("NUSA TENGGARA BARAT"))
    return "ntb";
  if (n.includes("NUSATENGGARA TIMUR") || n.includes("NUSA TENGGARA TIMUR"))
    return "ntt";
  if (n.includes("KALIMANTAN BARAT")) return "kalbar";
  if (n.includes("KALIMANTAN TENGAH")) return "kalteng";
  if (n.includes("KALIMANTAN SELATAN")) return "kalsel";
  if (n.includes("KALIMANTAN TIMUR")) return "kaltim";
  if (n.includes("KALIMANTAN UTARA")) return "kaltara";
  if (n.includes("SULAWESI UTARA")) return "sulut";
  if (n.includes("GORONTALO")) return "gorontalo";
  if (n.includes("SULAWESI TENGAH")) return "sulteng";
  if (n.includes("SULAWESI BARAT")) return "sulbar";
  if (n.includes("SULAWESI SELATAN")) return "sulsel";
  if (n.includes("SULAWESI TENGGARA")) return "sultra";
  if (n.includes("MALUKU UTARA")) return "malut";
  if (n === "MALUKU") return "maluku";

  if (n.includes("PAPUA BARAT DAYA")) return "papua-barat-daya";
  if (n.includes("PAPUA SELATAN")) return "papua-selatan";
  if (n.includes("PAPUA TENGAH")) return "papua-tengah";
  if (n.includes("PAPUA PEGUNUNGAN")) return "papua-pegunungan";
  if (n.includes("PAPUA BARAT") || n.includes("IRIAN JAYA BARAT"))
    return "papua-bar";
  if (n.includes("PAPUA") || n.includes("IRIAN JAYA")) return "papua";

  return null;
}

function getProvinceName(feature) {
  return (
    feature?.properties?.Propinsi ||
    feature?.properties?.PROPINSI ||
    feature?.properties?.provinsi ||
    feature?.properties?.PROVINSI ||
    feature?.properties?.name ||
    feature?.properties?.NAME_1 ||
    null
  );
}

// Helper to resolve city/district name from properties
function getKabkotaName(feature) {
  return (
    feature?.properties?.KabKota ||
    feature?.properties?.KABKOT ||
    feature?.properties?.kabkot ||
    feature?.properties?.KABUPATEN ||
    feature?.properties?.KOTA ||
    feature?.properties?.WADMKK ||
    feature?.properties?.NAMOBJ ||
    feature?.properties?.name ||
    feature?.properties?.shapeName ||
    feature?.properties?.NAME_2 ||
    null
  );
}

function getRegionalLevel(item) {
  const value = Number(item?.konsumsi_minyak_goreng_perkapita_minggu ?? 0);

  if (value < 0.2) return "low";
  if (value < 0.25) return "medium";
  if (value < 0.3) return "high";
  return "very-high";
}

function findRegionalItemByFeature(feature, regionalList) {
  const featureName = normalizeText(getKabkotaName(feature));
  if (!featureName) return null;

  return (
    regionalList.find((item) => normalizeText(item.name) === featureName) ||
    null
  );
}

function FitToGeoJSON({ data, resetKey }) {
  const map = useMap();

  useEffect(() => {
    if (!data?.features?.length) return;

    const layer = L.geoJSON(data);
    const bounds = layer.getBounds();

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [data, map, resetKey]);

  return null;
}

export default function MapSection() {
  const containerRef = useRef(null);

  const [mapLevel, setMapLevel] = useState("province");
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const [hoveredRegional, setHoveredRegional] = useState(null);

  const provincesMap = useMemo(() => {
    const map = {};
    provincesData.provinces.forEach((province) => {
      map[province.id] = province;
    });
    return map;
  }, []);

  const provinceMarkers = useMemo(() => {
    return provincesData.provinces
      .filter((province) => Array.isArray(province.coordinates))
      .map((province) => ({
        id: province.id,
        name: province.name,
        level: province.level,
        uco: province.uco,
        biodiesel: province.biodiesel,
        carbon: province.carbon,
        coordinates: province.coordinates,
      }));
  }, []);

  const selectedProvince = selectedProvinceId
    ? provincesMap[selectedProvinceId]
    : null;

  const selectedRegionalList = selectedProvinceId
    ? regionalData[selectedProvinceId] || []
    : [];

  const filteredKabkotaGeoJSON = useMemo(() => {
    if (!selectedProvinceId) return null;

    const allFeatures = kabkotaGeoJSON?.features || [];
    const regionalList = regionalData[selectedProvinceId] || [];

    const regionalNameSet = new Set(
      regionalList.map((item) => normalizeText(item.name)),
    );

    const features = allFeatures.filter((feature) => {
      const kabkotaName = getKabkotaName(feature);
      const normalizedKabkotaName = normalizeText(kabkotaName);
      return regionalNameSet.has(normalizedKabkotaName);
    });

    return {
      type: "FeatureCollection",
      features,
    };
  }, [selectedProvinceId]);

  const handleProvinceEnter = (event, provinceData) => {
    setHoveredProvince(provinceData);
    setHoveredRegional(null);
  };

  const handleProvinceMove = (event, provinceData) => {
    setHoveredProvince(provinceData);
    setHoveredRegional(null);
  };

  const handleProvinceLeave = () => {
    setHoveredProvince(null);
  };

  const handleRegionalEnter = (event, regionalDataItem) => {
    setHoveredRegional(regionalDataItem);
    setHoveredProvince(null);
  };

  const handleRegionalMove = (event, regionalDataItem) => {
    setHoveredRegional(regionalDataItem);
    setHoveredProvince(null);
  };

  const handleRegionalLeave = () => {
    setHoveredRegional(null);
  };

  const handleProvinceClick = (provinceId) => {
    setSelectedProvinceId(provinceId);
    setMapLevel("regional");
    setHoveredProvince(null);
    setHoveredRegional(null);
  };

  const handleBackToProvince = () => {
    setSelectedProvinceId(null);
    setMapLevel("province");
    setHoveredProvince(null);
    setHoveredRegional(null);
  };

  const getProvinceFillColor = (feature) => {
    const geoName = getProvinceName(feature);
    const provinceId = normalizeProvinceName(geoName);
    const provinceData = provinceId ? provincesMap[provinceId] : null;

    if (!provinceData) return "#eae6df";
    return LEVEL_COLORS[provinceData.level] ?? "#eae6df";
  };

  const getRegionalFillColor = (feature) => {
    const item = findRegionalItemByFeature(feature, selectedRegionalList);
    if (!item) return "#eae6df";
    return LEVEL_COLORS[getRegionalLevel(item)] ?? "#eae6df";
  };

  const onEachProvince = (feature, layer) => {
    const geoName = getProvinceName(feature);
    const provinceId = normalizeProvinceName(geoName);
    const provinceData = provinceId ? provincesMap[provinceId] : null;

    layer.setStyle({
      ...DEFAULT_PROVINCE_STYLE,
      fillColor: getProvinceFillColor(feature),
    });

    if (!provinceData) return;

    layer.on({
      mouseover: (event) => {
        event.target.setStyle({
          ...ACTIVE_PROVINCE_STYLE,
          fillColor: "#e9c3a3",
        });
        handleProvinceEnter(event, provinceData);
      },
      mousemove: (event) => {
        handleProvinceMove(event, provinceData);
      },
      mouseout: (event) => {
        event.target.setStyle({
          ...DEFAULT_PROVINCE_STYLE,
          fillColor: getProvinceFillColor(feature),
        });
        handleProvinceLeave();
      },
      click: () => {
        handleProvinceClick(provinceId);
      },
    });
  };

  const onEachRegional = (feature, layer) => {
    const item = findRegionalItemByFeature(feature, selectedRegionalList);

    layer.setStyle({
      ...DEFAULT_REGIONAL_STYLE,
      fillColor: getRegionalFillColor(feature),
    });

    if (!item) return;

    layer.on({
      mouseover: (event) => {
        event.target.setStyle({
          ...ACTIVE_REGIONAL_STYLE,
          fillColor: "#e9c3a3",
        });
        handleRegionalEnter(event, item);
      },
      mousemove: (event) => {
        handleRegionalMove(event, item);
      },
      mouseout: (event) => {
        event.target.setStyle({
          ...DEFAULT_REGIONAL_STYLE,
          fillColor: getRegionalFillColor(feature),
        });
        handleRegionalLeave();
      },
    });
  };

  const activeFocus = hoveredRegional || hoveredProvince || selectedProvince;

  return (
    <section id="map" className="page-section bg-[#fcfbf9] border-t border-[#eae6df]">
      <div className="page-container">
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-[720px]"
        >
          <span className="section-label">Data Spasial</span>
          <h2 className="section-title">Peta Sirkularitas Jelantah Regional</h2>
          <p className="section-subtitle">
            {mapLevel === "province"
              ? "Pilih provinsi untuk masuk ke detail kabupaten/kota dan eksplorasi data konsumsi serta potensi biodiesel."
              : `Menjelajahi kabupaten/kota di ${selectedProvince?.name || ""}. Klik tombol di kiri atas untuk kembali.`}
          </p>
        </motion.div>

        <div className="relative overflow-hidden bg-[#f4f1eb] border border-[#eae6df] min-h-[600px] lg:h-[720px] flex flex-col justify-between" ref={containerRef}>
          
          {/* Fine grid overlay */}
          <div className="pointer-events-none absolute inset-0 z-[1] opacity-30" aria-hidden="true">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#eae6df" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mapGrid)" />
            </svg>
          </div>

          {/* Back Button for Regional View */}
          {mapLevel === "regional" && selectedProvince && (
            <button
              type="button"
              onClick={handleBackToProvince}
              className="absolute left-6 top-6 z-[10] bg-[#111111] text-white px-4 py-2 text-[12px] font-bold uppercase tracking-wider transition hover:bg-[#333333]"
            >
              ← Kembali ke Provinsi
            </button>
          )}

          {/* Leaflet Map taking full width/height */}
          <div className="absolute inset-0 z-[2]" data-lenis-prevent>
            <MapContainer
              key={mapLevel === "regional" ? `reg-${selectedProvinceId}` : "prov"}
              center={MAP_CENTER}
              zoom={MAP_ZOOM}
              minZoom={4}
              maxZoom={10}
              zoomControl={true}
              scrollWheelZoom={false}
              className="h-full w-full bg-transparent"
            >
              <TileLayer
                attribution=""
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
              />

              {mapLevel === "province" ? (
                <>
                  <GeoJSON
                    data={indonesiaGeoJSON}
                    style={(feature) => ({
                      ...DEFAULT_PROVINCE_STYLE,
                      fillColor: getProvinceFillColor(feature),
                    })}
                    onEachFeature={onEachProvince}
                  />

                  {provinceMarkers.map((province) => (
                    <CircleMarker
                      key={province.id}
                      center={province.coordinates}
                      radius={5}
                      pathOptions={{
                        color: "#fcfbf9",
                        weight: 1.5,
                        fillColor: LEVEL_COLORS[province.level] ?? "#eae6df",
                        fillOpacity: 1,
                      }}
                      eventHandlers={{
                        mouseover: (event) => handleProvinceEnter(event, province),
                        mousemove: (event) => handleProvinceMove(event, province),
                        mouseout: handleProvinceLeave,
                        click: () => handleProvinceClick(province.id),
                      }}
                    >
                      <Tooltip direction="top" offset={[0, -6]} opacity={0.9}>
                        <span className="font-medium text-[12px] text-[#111111]">{province.name}</span>
                      </Tooltip>
                    </CircleMarker>
                  ))}
                </>
              ) : (
                <>
                  {filteredKabkotaGeoJSON?.features?.length ? (
                    <>
                      <GeoJSON
                        key={`reg-geo-${selectedProvinceId}`}
                        data={filteredKabkotaGeoJSON}
                        style={(feature) => ({
                          ...DEFAULT_REGIONAL_STYLE,
                          fillColor: getRegionalFillColor(feature),
                        })}
                        onEachFeature={onEachRegional}
                      />
                      <FitToGeoJSON
                        data={filteredKabkotaGeoJSON}
                        resetKey={selectedProvinceId}
                      />
                    </>
                  ) : null}
                </>
              )}
            </MapContainer>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-6 left-6 z-[6] flex flex-wrap gap-4 bg-[#fcfbf9]/95 backdrop-blur-sm px-4 py-2 border border-[#eae6df]">
            {Object.entries(LEVEL_LABELS).map(([level, label]) => (
              <div key={level} className="flex items-center gap-2">
                <div
                  className="h-3 w-3"
                  style={{ background: LEVEL_COLORS[level] }}
                />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#444444]">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Floating slide-in sidebar detail panel */}
          <AnimatePresence>
            {activeFocus && (
              <motion.div
                initial={{ x: "110%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "110%", opacity: 0 }}
                transition={{ type: "spring", damping: 28, stiffness: 220 }}
                className="absolute right-6 top-6 bottom-6 z-[10] w-[330px] bg-[#fcfbf9]/95 backdrop-blur-md p-6 border border-[#eae6df] shadow-2xl flex flex-col justify-between m-0"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e05300]">Fokus Informasi</span>
                  
                  <div className="mt-6">
                    <span className="text-[11px] uppercase tracking-wider text-[#666666] font-bold">
                      {"jenis_wilayah" in activeFocus ? activeFocus.jenis_wilayah : "PROVINSI"}
                    </span>
                    <h3 className="text-[26px] font-medium text-[#111111] font-serif leading-tight mt-1">
                      {activeFocus.name}
                    </h3>

                    <div className="mt-8 space-y-6">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">
                          Konsumsi Minyak Goreng
                        </div>
                        <div className="text-[20px] font-medium text-[#111111] font-serif mt-1">
                          {"konsumsi_minyak_goreng_perkapita_minggu" in activeFocus ? (
                            <>
                              {formatDecimal(activeFocus.konsumsi_minyak_goreng_perkapita_minggu)}{" "}
                              <span className="text-[13px] font-sans text-[#444444]">
                                {activeFocus.satuan_konsumsi || "L/orang/minggu"}
                              </span>
                            </>
                          ) : (
                            "Pilih kota/kab"
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#e05300]">
                          Potensi Minyak Jelantah (UCO)
                        </div>
                        <div className="text-[20px] font-medium text-[#e05300] font-serif mt-1">
                          {"uco_estimate" in activeFocus ? (
                            <>
                              {formatDecimal(activeFocus.uco_estimate)}{" "}
                              <span className="text-[13px] font-sans text-[#e05300]/80">
                                {activeFocus.satuan_uco || "L/tahun"}
                              </span>
                            </>
                          ) : (
                            <>
                              {Number(activeFocus.uco || 0).toLocaleString("id-ID")}{" "}
                              <span className="text-[13px] font-sans text-[#e05300]/80">Liter/thn</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#111111]">
                          Estimasi Potensi Biodiesel
                        </div>
                        <div className="text-[20px] font-medium text-[#111111] font-serif mt-1">
                          {"biodiesel_estimate" in activeFocus ? (
                            <>
                              {formatDecimal(activeFocus.biodiesel_estimate)}{" "}
                              <span className="text-[13px] font-sans text-[#444444]">
                                {activeFocus.satuan_biodiesel || "L/tahun"}
                              </span>
                            </>
                          ) : (
                            <>
                              {Number(activeFocus.biodiesel || 0).toLocaleString("id-ID")}{" "}
                              <span className="text-[13px] font-sans text-[#444444]">Liter/thn</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#16a34a]">
                          Estimasi Reduksi Emisi
                        </div>
                        <div className="text-[20px] font-medium text-[#16a34a] font-serif mt-1">
                          {"carbon_estimate" in activeFocus ? (
                            <>
                              {formatDecimal(activeFocus.carbon_estimate)}{" "}
                              <span className="text-[13px] font-sans text-[#16a34a]/85">
                                {activeFocus.satuan_carbon || "Ton CO₂/tahun"}
                              </span>
                            </>
                          ) : (
                            <>
                              {Number(activeFocus.carbon || 0).toLocaleString("id-ID")}{" "}
                              <span className="text-[13px] font-sans text-[#16a34a]/85">Ton CO₂</span>
                            </>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#eae6df]">
                  <p className="text-[11px] text-[#666666] leading-relaxed">
                    Peringkat intensitas didasarkan pada tingkat konsumsi minyak goreng per kapita regional.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
