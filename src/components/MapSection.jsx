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
  low: "#86EFAC",
  medium: "#22C55E",
  high: "#16A34A",
  "very-high": "#14532D",
};

const LEVEL_LABELS = {
  low: "Low",
  medium: "Medium",
  high: "High",
  "very-high": "Very High",
};

const DEFAULT_PROVINCE_STYLE = {
  weight: 1,
  opacity: 1,
  color: "#FFFFFF",
  fillOpacity: 0.9,
};

const ACTIVE_PROVINCE_STYLE = {
  weight: 1.5,
  opacity: 1,
  color: "#FFFFFF",
  fillOpacity: 1,
};

const DEFAULT_REGIONAL_STYLE = {
  weight: 1,
  opacity: 1,
  color: "#0F172A",
  fillOpacity: 0.75,
};

const ACTIVE_REGIONAL_STYLE = {
  weight: 2,
  opacity: 1,
  color: "#FACC15",
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
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

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

  const updateTooltipPosition = (event) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setTooltipPos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleProvinceEnter = (event, provinceData) => {
    updateTooltipPosition(event.originalEvent ?? event);
    setHoveredProvince(provinceData);
    setHoveredRegional(null);
  };

  const handleProvinceMove = (event, provinceData) => {
    updateTooltipPosition(event.originalEvent ?? event);
    setHoveredProvince(provinceData);
    setHoveredRegional(null);
  };

  const handleProvinceLeave = () => {
    setHoveredProvince(null);
  };

  const handleRegionalEnter = (event, regionalDataItem) => {
    updateTooltipPosition(event.originalEvent ?? event);
    setHoveredRegional(regionalDataItem);
    setHoveredProvince(null);
  };

  const handleRegionalMove = (event, regionalDataItem) => {
    updateTooltipPosition(event.originalEvent ?? event);
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

    if (!provinceData) return "#E2E8F0";
    return LEVEL_COLORS[provinceData.level] ?? "#E2E8F0";
  };

  const getRegionalFillColor = (feature) => {
    const item = findRegionalItemByFeature(feature, selectedRegionalList);
    if (!item) return "#E2E8F0";
    return LEVEL_COLORS[getRegionalLevel(item)] ?? "#E2E8F0";
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
          fillColor: "#FACC15",
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
          fillColor: "#FACC15",
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

  const activeTooltip = hoveredRegional || hoveredProvince;

  return (
    <section id="map" className="bg-white py-28">
      <div className="mx-auto max-w-[1600px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-label">🗺️ Feature One</span>
          <h2 className="section-title">
            Interactive <span className="text-gradient-green">Impact Map</span>
          </h2>
          <p className="section-subtitle">
            {mapLevel === "province"
              ? "Klik provinsi untuk masuk ke peta kabupaten/kota."
              : `Hover kabupaten/kota di ${selectedProvince?.name || ""} untuk melihat detail.`}
          </p>
        </motion.div>

        <div className="grid gap-6">
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-3xl border border-gray-100 bg-brand-bg shadow-card"
            style={{ height: "720px" }}
          >
            <div
              className="pointer-events-none absolute inset-0 z-[1] opacity-10"
              aria-hidden="true"
            >
              <svg width="100%" height="100%">
                <defs>
                  <pattern
                    id="grid"
                    width="80"
                    height="80"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 80 0 L 0 0 0 80"
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {mapLevel === "regional" && selectedProvince && (
              <button
                type="button"
                onClick={handleBackToProvince}
                className="absolute left-4 top-4 z-[8] rounded-xl border border-slate-200 bg-white/95 px-4 py-2 text-sm font-semibold text-slate-700 shadow-md backdrop-blur-md transition hover:bg-slate-50"
              >
                ← Kembali ke Provinsi
              </button>
            )}

            {mapLevel === "regional" &&
              (filteredKabkotaGeoJSON?.features?.length ? (
                <div className="absolute right-4 top-4 z-[8] rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow">
                  Kab/Kota tampil: {filteredKabkotaGeoJSON.features.length}
                </div>
              ) : (
                <div className="absolute right-4 top-4 z-[8] rounded-xl bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 shadow">
                  Tidak ada kab/kota yang cocok
                </div>
              ))}

            <div className="absolute inset-0 z-[2]">
              <MapContainer
                key={
                  mapLevel === "regional"
                    ? `regional-${selectedProvinceId}`
                    : "province-view"
                }
                center={MAP_CENTER}
                zoom={MAP_ZOOM}
                minZoom={4}
                maxZoom={10}
                zoomControl={true}
                scrollWheelZoom={true}
                className="h-full w-full"
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
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
                        radius={6}
                        pathOptions={{
                          color: "#ffffff",
                          weight: 2,
                          fillColor: LEVEL_COLORS[province.level] ?? "#22C55E",
                          fillOpacity: 1,
                        }}
                        eventHandlers={{
                          mouseover: (event) =>
                            handleProvinceEnter(event, province),
                          mousemove: (event) =>
                            handleProvinceMove(event, province),
                          mouseout: handleProvinceLeave,
                          click: () => handleProvinceClick(province.id),
                        }}
                      >
                        <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                          <span className="font-semibold">{province.name}</span>
                        </Tooltip>
                      </CircleMarker>
                    ))}
                  </>
                ) : (
                  <>
                    {filteredKabkotaGeoJSON?.features?.length ? (
                      <>
                        <GeoJSON
                          key={`regional-${selectedProvinceId}`}
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

            <AnimatePresence>
              {activeTooltip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 8 }}
                  transition={{ duration: 0.16 }}
                  className="absolute z-[7] pointer-events-none"
                  style={{
                    left: Math.min(tooltipPos.x + 16, 1180),
                    top: Math.min(tooltipPos.y + 16, 620),
                  }}
                >
                  <div className="min-w-[300px] rounded-2xl border border-white/60 bg-white/95 p-5 shadow-2xl backdrop-blur-md">
                    <div className="mb-3 flex items-center gap-3 border-b border-gray-100 pb-3">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{
                          background:
                            mapLevel === "regional" && hoveredRegional
                              ? LEVEL_COLORS[getRegionalLevel(hoveredRegional)]
                              : LEVEL_COLORS[activeTooltip.level],
                        }}
                      />
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {activeTooltip.name}
                        </h4>
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                          {mapLevel === "regional" && hoveredRegional
                            ? hoveredRegional.jenis_wilayah
                            : "provinsi"}
                        </p>
                      </div>
                    </div>

                    {mapLevel === "regional" && hoveredRegional ? (
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="mb-0.5 font-medium text-gray-500">
                            Konsumsi Minyak Goreng
                          </div>
                          <div className="text-base font-bold text-gray-800">
                            {formatDecimal(
                              hoveredRegional.konsumsi_minyak_goreng_perkapita_minggu,
                            )}{" "}
                            <span className="text-xs font-normal text-gray-500">
                              {hoveredRegional.satuan_konsumsi}
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="mb-0.5 font-medium text-amber-600">
                            Estimasi UCO
                          </div>
                          <div className="text-base font-bold text-amber-700">
                            {formatDecimal(hoveredRegional.uco_estimate)}{" "}
                            <span className="text-xs font-normal text-gray-500">
                              {hoveredRegional.satuan_uco}
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="mb-0.5 font-medium text-green-600">
                            Estimasi Biodiesel
                          </div>
                          <div className="text-base font-bold text-green-700">
                            {formatDecimal(hoveredRegional.biodiesel_estimate)}{" "}
                            <span className="text-xs font-normal text-gray-500">
                              {hoveredRegional.satuan_biodiesel}
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="mb-0.5 font-medium text-blue-500">
                            Reduksi Emisi
                          </div>
                          <div className="text-base font-bold text-blue-600">
                            {formatDecimal(hoveredRegional.carbon_estimate)}{" "}
                            <span className="text-xs font-normal text-gray-500">
                              {hoveredRegional.satuan_carbon}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="mb-0.5 font-medium text-gray-500">
                            Potensi UCO
                          </div>
                          <div className="text-base font-bold text-gray-800">
                            {Number(activeTooltip.uco).toLocaleString("id-ID")}{" "}
                            <span className="text-xs font-normal text-gray-500">
                              Liter/thn
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="mb-0.5 font-medium text-green-600">
                            Biodiesel
                          </div>
                          <div className="text-base font-bold text-green-700">
                            {Number(activeTooltip.biodiesel).toLocaleString(
                              "id-ID",
                            )}{" "}
                            <span className="text-xs font-normal text-gray-500">
                              Liter/thn
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="mb-0.5 font-medium text-blue-500">
                            Reduksi Emisi
                          </div>
                          <div className="text-base font-bold text-blue-600">
                            {Number(activeTooltip.carbon).toLocaleString(
                              "id-ID",
                            )}{" "}
                            <span className="text-xs font-normal text-gray-500">
                              Ton CO₂
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute bottom-6 left-1/2 z-[6] flex -translate-x-1/2 gap-6 rounded-full border border-gray-100 bg-white/90 px-6 py-3 shadow-lg backdrop-blur-md">
              {Object.entries(LEVEL_LABELS).map(([level, label]) => (
                <div key={level} className="flex items-center gap-2">
                  <div
                    className="h-3.5 w-3.5 rounded-full shadow-sm"
                    style={{ background: LEVEL_COLORS[level] }}
                  />
                  <span className="text-xs font-semibold text-gray-600">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
