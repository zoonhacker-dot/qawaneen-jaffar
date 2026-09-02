import React, { useState, useEffect, useMemo } from 'react';
import {
  Moon,
  Sun,
  MapPin,
  Compass,
  Clock,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Navigation,
  ChevronRight,
  ChevronLeft,
  Info,
  Layers,
  Send,
  Printer,
  Check,
  AlertTriangle,
  Flame,
  Droplets,
  Wind,
  Mountain,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Sliders,
  Award
} from 'lucide-react';
import {
  GeoLocation,
  PRESET_LOCATIONS,
  TemporalPlanetaryHour,
  calculateLocationSolarSaat,
  SolarLocationData,
  formatTimeUrdu
} from '../utils/solarSaatEngine';
import {
  calculateLunarPhaseAndSpiritualInfluence,
  getHijriDateDetails,
  LUNAR_MANSIONS
} from '../utils/lunarEngine';

interface LocationMoonSaatTrackerProps {
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
}

export const LocationMoonSaatTracker: React.FC<LocationMoonSaatTrackerProps> = ({
  onSendToNaqsh,
  onSendToTakseer
}) => {
  // Current real-time clock
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // Selected simulation date & lunar day scrubber
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [scrubberHijriDay, setScrubberHijriDay] = useState<number | null>(null);

  // Selected Location (default: Turbat / Makran - Mawlana Sarbazi's region or Makkah)
  const [selectedLocation, setSelectedLocation] = useState<GeoLocation>(PRESET_LOCATIONS[2]); // Turbat default
  const [isGpsLoading, setIsGpsLoading] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [customCityModal, setCustomCityModal] = useState<boolean>(false);
  const [customCityName, setCustomCityName] = useState<string>('');
  const [customLat, setCustomLat] = useState<string>('24.8607');
  const [customLng, setCustomLng] = useState<string>('67.0011');
  const [customTz, setCustomTz] = useState<string>('5');

  // Filter for Hours View
  const [hourFilter, setHourFilter] = useState<'all' | 'saad_only' | 'nahs_only' | 'day_only' | 'night_only'>('all');
  const [selectedHourDetail, setSelectedHourDetail] = useState<TemporalPlanetaryHour | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Update clock every 10 seconds for real-time tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Compute Solar & Temporal Saat Data based on location and date
  const solarData: SolarLocationData = useMemo(() => {
    return calculateLocationSolarSaat(selectedDate, selectedLocation);
  }, [selectedDate, selectedLocation, currentTime]);

  // Compute Lunar Phase data
  const currentHijri = useMemo(() => getHijriDateDetails(selectedDate), [selectedDate]);
  const effectiveHijriDay = scrubberHijriDay !== null ? scrubberHijriDay : currentHijri.hijriDay;
  const lunarDetails = useMemo(() => {
    return calculateLunarPhaseAndSpiritualInfluence(
      effectiveHijriDay,
      currentHijri.hijriMonth,
      selectedDate
    );
  }, [effectiveHijriDay, currentHijri.hijriMonth, selectedDate]);

  // Filtered hours
  const filteredHours = useMemo(() => {
    return solarData.allHours.filter((h) => {
      if (hourFilter === 'saad_only') {
        return h.nature === 'saad_akbar' || h.nature === 'saad_asghar';
      }
      if (hourFilter === 'nahs_only') {
        return h.nature === 'nahs_akbar' || h.nature === 'nahs_asghar' || h.nature === 'mumtazij';
      }
      if (hourFilter === 'day_only') {
        return h.period === 'day';
      }
      if (hourFilter === 'night_only') {
        return h.period === 'night';
      }
      return true;
    });
  }, [solarData.allHours, hourFilter]);

  // Set default selected hour to current active hour or first hour
  useEffect(() => {
    if (solarData.currentActiveHour) {
      setSelectedHourDetail(solarData.currentActiveHour);
    } else if (solarData.allHours.length > 0 && !selectedHourDetail) {
      setSelectedHourDetail(solarData.allHours[0]);
    }
  }, [solarData.currentActiveHour]);

  // Handle GPS Auto-Detection
  const handleAutoDetectLocation = () => {
    if (!navigator.geolocation) {
      setGpsError('آپ کا براؤزر مقام (GPS) کی سہولت کو سپورٹ نہیں کرتا۔');
      return;
    }

    setIsGpsLoading(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsGpsLoading(false);
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        // Estimate timezone offset from local machine
        const tzOffset = -new Date().getTimezoneOffset() / 60;

        const detectedLoc: GeoLocation = {
          name: 'موجودہ جی پی ایس مقام',
          nameUrdu: `موجودہ مقام (عرض: ${lat.toFixed(2)}°, طول: ${lng.toFixed(2)}°)`,
          latitude: lat,
          longitude: lng,
          timezoneOffset: tzOffset,
          isCustom: true
        };

        setSelectedLocation(detectedLoc);
      },
      (err) => {
        setIsGpsLoading(false);
        setGpsError(`مقام حاصل کرنے میں دشواری: ${err.message || 'براہِ کرم فہرست سے شہر منتخب فرمائیں۔'}`);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Add custom city
  const handleSaveCustomCity = () => {
    const lat = parseFloat(customLat);
    const lng = parseFloat(customLng);
    const tz = parseFloat(customTz);

    if (isNaN(lat) || isNaN(lng) || isNaN(tz)) {
      alert('براہِ کرم درست اعداد درج فرمائیں۔');
      return;
    }

    const newLoc: GeoLocation = {
      name: customCityName || 'اپنی مرضی کا شہر',
      nameUrdu: customCityName ? `${customCityName} (حسبِ ضرورت)` : `شہر (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`,
      latitude: lat,
      longitude: lng,
      timezoneOffset: tz,
      isCustom: true
    };

    setSelectedLocation(newLoc);
    setCustomCityModal(false);
  };

  // Quick Moon Phase Scrubber Jumps
  const handleJumpPhase = (day: number) => {
    setScrubberHijriDay(day);
  };

  const handleResetScrubber = () => {
    setScrubberHijriDay(null);
  };

  const handlePrintSchedule = () => {
    window.print();
  };

  // Dynamic Visual Moon Phase Sphere parameters
  const moonIllumPercent = lunarDetails.moonIlluminationPercent;
  const isWaxing = effectiveHijriDay <= 14;

  return (
    <div className="space-y-6" dir="rtl">
      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: INTERACTIVE MOON TRACKER & GEOLOCATION CONTROL BAR */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-3xl border-2 border-[#70a9a1] bg-gradient-to-br from-[#0c121e] via-[#161f30] to-[#0a0f18] p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-[#70a9a1]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-[#bc6c25]/15 blur-3xl pointer-events-none" />

        {/* Location Selector Bar */}
        <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 border-b border-[#70a9a1]/30">
          {/* Location details */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#70a9a1]/20 border border-[#70a9a1] text-[#70a9a1] shadow-inner">
              <Compass className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#70a9a1] uppercase tracking-wider">
                  مقام و حسابِ افق (Geographic Location)
                </span>
                {selectedLocation.isCustom && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#bc6c25] text-white">
                    حسبِ منشاء
                  </span>
                )}
              </div>
              <h2 className="font-amiri text-xl sm:text-2xl font-bold text-[#fefae0]">
                {selectedLocation.nameUrdu}
              </h2>
              <p className="text-xs text-[#94a3b8]">
                عرضِ بلد: {selectedLocation.latitude.toFixed(2)}° | طولِ بلد: {selectedLocation.longitude.toFixed(2)}° | منطقۂ وقت: GMT {selectedLocation.timezoneOffset >= 0 ? `+${selectedLocation.timezoneOffset}` : selectedLocation.timezoneOffset}
              </p>
            </div>
          </div>

          {/* Location Actions & Dropdown */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAutoDetectLocation}
              disabled={isGpsLoading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#70a9a1] hover:bg-[#588b84] text-[#0b101b] text-xs font-extrabold transition-all shadow-md cursor-pointer disabled:opacity-50"
              title="خودکار GPS مقام حاصل کریں"
            >
              {isGpsLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Navigation className="h-4 w-4" />
              )}
              <span>خودکار GPS مقام</span>
            </button>

            <select
              value={PRESET_LOCATIONS.findIndex(l => l.name === selectedLocation.name)}
              onChange={(e) => {
                const idx = parseInt(e.target.value);
                if (idx >= 0 && PRESET_LOCATIONS[idx]) {
                  setSelectedLocation(PRESET_LOCATIONS[idx]);
                }
              }}
              className="bg-[#1e293b] text-[#f8fafc] border border-[#70a9a1]/50 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#70a9a1] cursor-pointer"
            >
              {PRESET_LOCATIONS.map((loc, i) => (
                <option key={loc.name} value={i} className="bg-[#1e293b] text-white">
                  {loc.nameUrdu}
                </option>
              ))}
            </select>

            <button
              onClick={() => setCustomCityModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#334155] hover:bg-[#475569] text-white text-xs font-bold border border-[#70a9a1]/40 cursor-pointer"
              title="نیا مقام / دستی کوآرڈینیٹس شامل کریں"
            >
              <MapPin className="h-3.5 w-3.5 text-[#70a9a1]" />
              <span>دیگر مقام...</span>
            </button>

            <button
              onClick={handlePrintSchedule}
              className="p-2 rounded-xl bg-[#1e293b] hover:bg-[#334155] text-[#cbd5e1] border border-[#70a9a1]/30 cursor-pointer"
              title="نقشہ ساعات پرنٹ کریں"
            >
              <Printer className="h-4 w-4" />
            </button>
          </div>
        </div>

        {gpsError && (
          <div className="mt-3 p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
            <span>{gpsError}</span>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE VISUAL MOON SPHERE & PHASE SCRUBBER */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Visual Moon Sphere Graphics (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#090d16]/90 border border-[#70a9a1]/40 shadow-inner text-center">
            {/* SVG Visual Moon Simulation */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 mb-4 flex items-center justify-center">
              {/* Outer atmospheric aura glow */}
              <div 
                className="absolute inset-0 rounded-full blur-2xl transition-all duration-700 pointer-events-none"
                style={{
                  backgroundColor: isWaxing ? 'rgba(112, 169, 161, 0.25)' : 'rgba(188, 108, 37, 0.2)',
                  transform: `scale(${0.9 + (moonIllumPercent / 100) * 0.3})`
                }}
              />

              {/* Realistic SVG Moon Sphere */}
              <svg className="w-40 h-40 sm:w-48 sm:h-48 drop-shadow-2xl" viewBox="0 0 100 100">
                <defs>
                  {/* Moon surface dark side */}
                  <radialGradient id="moonDark" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="85%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#020617" />
                  </radialGradient>

                  {/* Moon surface illuminated side */}
                  <radialGradient id="moonLight" cx="40%" cy="40%" r="55%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="35%" stopColor="#fefae0" />
                    <stop offset="70%" stopColor="#faedcd" />
                    <stop offset="100%" stopColor="#d4a373" />
                  </radialGradient>

                  {/* Surface Crater Pattern Clip */}
                  <clipPath id="moonDiscClip">
                    <circle cx="50" cy="50" r="46" />
                  </clipPath>
                </defs>

                {/* Base Dark Moon Sphere with Border */}
                <circle cx="50" cy="50" r="46" fill="url(#moonDark)" stroke="#70a9a1" strokeWidth="1.5" />

                {/* Simulated Illuminated Phase Shape */}
                <g clipPath="url(#moonDiscClip)">
                  {/* Craters on dark side */}
                  <circle cx="35" cy="40" r="6" fill="#0b101b" opacity="0.4" />
                  <circle cx="65" cy="55" r="9" fill="#0b101b" opacity="0.4" />
                  <circle cx="45" cy="70" r="5" fill="#0b101b" opacity="0.4" />
                  <circle cx="58" cy="30" r="4" fill="#0b101b" opacity="0.4" />

                  {/* Illuminated Phase Geometry */}
                  {effectiveHijriDay === 14 || effectiveHijriDay === 15 ? (
                    // Full Moon (بدرِ کامل)
                    <circle cx="50" cy="50" r="46" fill="url(#moonLight)" />
                  ) : effectiveHijriDay === 29 || effectiveHijriDay === 30 ? (
                    // New Moon / Mahq (محاق)
                    <circle cx="50" cy="50" r="46" fill="url(#moonDark)" opacity="0.95" />
                  ) : isWaxing ? (
                    // Waxing Phases (ہلال تا بدر - Light on Left/West in classical perspective)
                    <path
                      d={`M 50,4 A 46,46 0 0,1 50,96 A ${Math.abs(46 - (moonIllumPercent / 50) * 46)},46 0 0,${moonIllumPercent > 50 ? 1 : 0} 50,4 Z`}
                      fill="url(#moonLight)"
                    />
                  ) : (
                    // Waning Phases (بدر تا محاق - Light decreasing)
                    <path
                      d={`M 50,4 A 46,46 0 0,0 50,96 A ${Math.abs(46 - ((100 - moonIllumPercent) / 50) * 46)},46 0 0,${moonIllumPercent < 50 ? 0 : 1} 50,4 Z`}
                      fill="url(#moonLight)"
                    />
                  )}

                  {/* Surface Craters & Maria on Light Side */}
                  <g opacity="0.25">
                    <circle cx="42" cy="36" r="7" fill="#8d6e63" />
                    <circle cx="60" cy="48" r="10" fill="#8d6e63" />
                    <circle cx="38" cy="65" r="8" fill="#8d6e63" />
                    <ellipse cx="65" cy="30" rx="6" ry="4" fill="#8d6e63" />
                    <circle cx="52" cy="76" r="5" fill="#8d6e63" />
                  </g>
                </g>
              </svg>

              {/* Illumination % Floating Badge */}
              <div className="absolute -bottom-2 px-3 py-1 rounded-full bg-[#1e293b]/90 border border-[#70a9a1] text-xs font-mono font-bold text-[#fefae0] shadow-lg">
                ضیاء: {moonIllumPercent}٪
              </div>
            </div>

            {/* Phase Name & Hijri Date */}
            <h3 className="font-amiri text-xl sm:text-2xl font-bold text-[#fefae0]">
              {lunarDetails.phaseNameUrdu}
            </h3>
            <p className="text-xs text-[#70a9a1] font-medium mt-0.5">
              {lunarDetails.phaseNameEnglish} • تاریخ: {effectiveHijriDay} {currentHijri.hijriMonthNameUrdu} {currentHijri.hijriYear}ھ
            </p>

            {/* Spiritual Potency Badge */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#70a9a1]/20 border border-[#70a9a1] text-[#cbe5e2] text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5 text-[#70a9a1]" />
              <span>{lunarDetails.spiritualPotencyUrdu}</span>
            </div>
          </div>

          {/* Right Column: Interactive Scrubber & Ephemeris Data (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Scrubber Controls */}
            <div className="p-5 rounded-2xl bg-[#111827]/80 border border-[#70a9a1]/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-[#70a9a1]" />
                  <span className="text-xs font-bold text-[#fefae0]">
                    قمری محوری اسکربر (Interactive 30-Day Scrubber)
                  </span>
                </div>
                {scrubberHijriDay !== null && (
                  <button
                    onClick={handleResetScrubber}
                    className="text-[11px] text-[#70a9a1] hover:underline font-bold"
                  >
                    اصلی تاریخ پر واپس لائیں
                  </button>
                )}
              </div>

              {/* Slider for days 1 to 30 */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={effectiveHijriDay}
                  onChange={(e) => setScrubberHijriDay(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#70a9a1]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#94a3b8]">
                  <span>یکم (ہلال نو)</span>
                  <span>۷ (تربیع اول)</span>
                  <span>۱۴ (بدرِ کامل)</span>
                  <span>۲۱ (تربیع ثانی)</span>
                  <span>۳۰ (محاق)</span>
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { day: 1, label: 'یکم ہلال' },
                  { day: 7, label: 'تربیع اول' },
                  { day: 13, label: 'ایامِ بیض (۱۳)' },
                  { day: 14, label: 'بدرِ کامل (۱۴)' },
                  { day: 15, label: 'ایامِ بیض (۱۵)' },
                  { day: 21, label: 'تربیع ثانی' },
                  { day: 29, label: 'محاق (۲۹)' },
                ].map((item) => (
                  <button
                    key={item.day}
                    onClick={() => handleJumpPhase(item.day)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      effectiveHijriDay === item.day
                        ? 'bg-[#70a9a1] text-[#0b101b] font-extrabold shadow'
                        : 'bg-[#1f293d] text-[#cbd5e1] hover:bg-[#334155] border border-[#70a9a1]/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Solar Horizon Timings for Selected Location */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#1e293b]/70 border border-amber-500/30 text-center">
                <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-bold mb-1">
                  <Sun className="h-3.5 w-3.5" />
                  <span>طلوعِ آفتاب</span>
                </div>
                <div className="font-mono text-sm font-bold text-[#fefae0]">
                  {formatTimeUrdu(solarData.sunrise)}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1e293b]/70 border border-yellow-500/30 text-center">
                <div className="flex items-center justify-center gap-1 text-yellow-400 text-xs font-bold mb-1">
                  <Sun className="h-3.5 w-3.5" />
                  <span>نصف النہار (زوال)</span>
                </div>
                <div className="font-mono text-sm font-bold text-[#fefae0]">
                  {formatTimeUrdu(solarData.solarNoon)}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1e293b]/70 border border-orange-500/30 text-center">
                <div className="flex items-center justify-center gap-1 text-orange-400 text-xs font-bold mb-1">
                  <Sun className="h-3.5 w-3.5" />
                  <span>غروبِ آفتاب</span>
                </div>
                <div className="font-mono text-sm font-bold text-[#fefae0]">
                  {formatTimeUrdu(solarData.sunset)}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1e293b]/70 border border-sky-500/30 text-center">
                <div className="flex items-center justify-center gap-1 text-sky-400 text-xs font-bold mb-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>طولِ ساعتِ زمانی</span>
                </div>
                <div className="font-mono text-xs font-bold text-[#fefae0]">
                  نہار: {solarData.dayHourDurationMinutes} منٹ
                </div>
              </div>
            </div>

            {/* Current Active Hour Live Pulse Banner */}
            {solarData.currentActiveHour && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1c2938] to-[#121c27] border-2 border-[#70a9a1] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#70a9a1]">
                      موجودہ فعال ساعت (Active Hour Right Now):
                    </div>
                    <div className="font-amiri text-lg font-bold text-white flex items-center gap-2">
                      <span>{solarData.currentActiveHour.hourNameUrdu}</span>
                      <span className="text-xs font-mono text-[#cbd5e1]">
                        ({solarData.currentActiveHour.startTimeFormatted} تا {solarData.currentActiveHour.endTimeFormatted})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${solarData.currentActiveHour.natureBadgeColor}`}>
                    {solarData.currentActiveHour.planetUrdu} • {solarData.currentActiveHour.natureUrdu.split(' ')[0]}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: AUSPICIOUS & INAUSPICIOUS HOURS TIMELINE / GRID */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-[#fffef8] p-6 shadow-md space-y-6">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#d4a373]/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#bc6c25] text-white">
                <Clock className="h-5 w-5" />
              </span>
              <h3 className="font-amiri text-2xl font-bold text-[#5d4037]">
                نقشۂ ساعاتِ زمانیہ و کواکب بمطابقِ افق {selectedLocation.nameUrdu.split(' ')[0]}
              </h3>
            </div>
            <p className="text-xs text-[#8d6e63] mt-1">
              طلوع و غروبِ آفتاب کے مطابق تقسیم شدہ ۱۲ ساعاتِ نہار اور ۱۲ ساعاتِ لیل مع تعیینِ سعد و نحس
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#f5ebe0] p-1.5 rounded-2xl border border-[#d4a373]">
            {[
              { id: 'all', label: 'تمام ۲۴ ساعات' },
              { id: 'saad_only', label: '🟢 فقط سعد ساعات' },
              { id: 'nahs_only', label: '🔴 جلالی و محتاط ساعات' },
              { id: 'day_only', label: '☀️ دن کی ۱۲ ساعات' },
              { id: 'night_only', label: '🌙 رات کی ۱۲ ساعات' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setHourFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  hourFilter === tab.id
                    ? 'bg-[#bc6c25] text-white shadow-sm font-extrabold'
                    : 'text-[#5d4037] hover:bg-[#e6ccb2]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 24-Hours Ribbon Timeline */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-[#5d4037] flex items-center justify-between">
            <span>نوارِ فلکی (24-Hour Circular Horizon Bar):</span>
            <span className="text-[11px] text-[#8d6e63]">
              سبز = سعد اکبر | نیلا/فیروزی = سعد اصغر | بنفشی = ممتزج | سرخ/سیاہ = نحس و جلالی
            </span>
          </div>

          <div className="grid grid-cols-12 gap-1 p-1.5 rounded-2xl bg-[#2b2d42] border border-[#70a9a1]/30">
            {solarData.allHours.map((hour) => {
              const isSelected = selectedHourDetail?.hourIndex === hour.hourIndex;
              return (
                <button
                  key={hour.hourIndex}
                  onClick={() => setSelectedHourDetail(hour)}
                  className={`relative h-10 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer ${
                    hour.nature === 'saad_akbar'
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : hour.nature === 'saad_asghar'
                      ? 'bg-teal-600 hover:bg-teal-500 text-white'
                      : hour.nature === 'mumtazij'
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      : hour.nature === 'nahs_asghar'
                      ? 'bg-rose-700 hover:bg-rose-600 text-white'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  } ${isSelected ? 'ring-3 ring-amber-400 scale-105 z-10 shadow-lg' : 'opacity-90'} ${
                    hour.isActiveNow ? 'ring-2 ring-emerald-300 animate-pulse' : ''
                  }`}
                  title={`${hour.hourNameUrdu}: ${hour.planetUrdu} (${hour.natureUrdu})`}
                >
                  <span className="font-mono text-[10px] font-bold">
                    {hour.hourIndex <= 12 ? `ن${hour.hourIndex}` : `ل${hour.hourIndex - 12}`}
                  </span>
                  <span className="text-[9px] font-amiri truncate max-w-full px-0.5">
                    {hour.planetUrdu.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Hour Detailed Inspector Card */}
        {selectedHourDetail && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#fefae0] via-[#faedcd] to-[#f4ebe1] border-2 border-[#bc6c25] shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#dda15e]">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl text-white shadow-md ${
                  selectedHourDetail.nature === 'saad_akbar' ? 'bg-emerald-700' :
                  selectedHourDetail.nature === 'saad_asghar' ? 'bg-teal-700' :
                  selectedHourDetail.nature === 'mumtazij' ? 'bg-indigo-700' :
                  selectedHourDetail.nature === 'nahs_asghar' ? 'bg-rose-700' : 'bg-slate-800'
                }`}>
                  {selectedHourDetail.period === 'day' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#bc6c25] text-white">
                      {selectedHourDetail.period === 'day' ? 'ساعتِ نہار (دن)' : 'ساعتِ لیل (رات)'}
                    </span>
                    <span className="text-xs font-mono text-[#8d6e63]">
                      ساعت نمبر {selectedHourDetail.hourIndex} از ۲۴
                    </span>
                    {selectedHourDetail.isActiveNow && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white animate-pulse">
                        ● ابھی جاری ہے
                      </span>
                    )}
                  </div>
                  <h4 className="font-amiri text-2xl font-bold text-[#5d4037] mt-0.5">
                    {selectedHourDetail.hourNameUrdu} — حاکم: {selectedHourDetail.planetUrdu}
                  </h4>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="font-mono text-sm font-bold text-[#5d4037]">
                  {selectedHourDetail.startTimeFormatted} تا {selectedHourDetail.endTimeFormatted}
                </div>
                <div className="text-xs text-[#8d6e63]">
                  دورانیہ: {selectedHourDetail.durationMinutes} منٹ
                </div>
              </div>
            </div>

            {/* 3 Metrics Column */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-white/80 border border-[#dda15e] space-y-1">
                <span className="text-xs font-bold text-[#8d6e63]">طبیعت و درجۂ سعادت:</span>
                <p className="font-amiri font-bold text-base text-[#5d4037]">
                  {selectedHourDetail.natureUrdu}
                </p>
                <p className="text-[11px] text-[#8d6e63]">عنصر: {selectedHourDetail.elementUrdu}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/80 border border-[#dda15e] space-y-1">
                <span className="text-xs font-bold text-[#8d6e63]">بخور و خوشبوئے موافق:</span>
                <p className="font-amiri font-bold text-sm text-[#5d4037]">
                  {selectedHourDetail.incense}
                </p>
                <p className="text-[11px] text-[#8d6e63]">موکل: {selectedHourDetail.angelMoakkal}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/80 border border-[#dda15e] flex flex-col justify-between">
                <span className="text-xs font-bold text-[#8d6e63]">انتقال برائے کتابت و عمل:</span>
                <div className="flex items-center gap-2 mt-2">
                  {onSendToNaqsh && (
                    <button
                      onClick={() => onSendToNaqsh(selectedHourDetail.hourIndex * 110 + 786)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#bc6c25] hover:bg-[#a2591d] text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>نقش میں بھیجیں</span>
                    </button>
                  )}
                  {onSendToTakseer && (
                    <button
                      onClick={() => onSendToTakseer(`${selectedHourDetail.planetUrdu.split(' ')[0]} ${selectedHourDetail.hourNameUrdu}`)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#70a9a1] hover:bg-[#588b84] text-[#0b101b] text-xs font-bold flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                    >
                      <Layers className="h-3.5 w-3.5" />
                      <span>تکسیر اسٹوڈیو</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Allowed vs Restricted Tasks in this Hour */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-300 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>اس ساعت میں مبارک و جائز اعمال (سعد کام):</span>
                </div>
                <ul className="text-xs text-emerald-900 space-y-1 pr-4 list-disc">
                  {(selectedHourDetail.recommendedOperations || []).map((op, idx) => (
                    <li key={idx}>{op}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-300 space-y-1.5">
                <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs">
                  <ShieldAlert className="h-4 w-4 text-rose-600" />
                  <span>اس ساعت میں ممنوعہ و محتاط امور:</span>
                </div>
                <ul className="text-xs text-rose-900 space-y-1 pr-4 list-disc">
                  {(selectedHourDetail.restrictedOperations || []).map((op, idx) => (
                    <li key={idx}>{op}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Full Grid of Filtered Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHours.map((h) => {
            const isSelected = selectedHourDetail?.hourIndex === h.hourIndex;
            return (
              <div
                key={h.hourIndex}
                onClick={() => setSelectedHourDetail(h)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#bc6c25] bg-[#faedcd] shadow-md scale-[1.01]'
                    : 'border-[#e2e8f0] bg-white hover:border-[#bc6c25]/50 hover:bg-[#fdfaf1]'
                } ${h.isActiveNow ? 'ring-2 ring-emerald-500' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${h.natureBadgeColor}`}>
                    {h.planetUrdu.split(' ')[0]} • {h.natureUrdu.split(' ')[0]}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#64748b]">
                    {h.startTimeFormatted}
                  </span>
                </div>

                <h5 className="font-amiri text-lg font-bold text-[#1e293b] mt-2">
                  {h.hourNameUrdu}
                </h5>

                <p className="text-xs text-[#64748b] mt-0.5 line-clamp-1">
                  موافق: {h.recommendedOperations.slice(0, 2).join('، ')}
                </p>

                <div className="mt-3 pt-2 border-t border-[#e2e8f0] flex items-center justify-between text-[11px] text-[#64748b]">
                  <span>دورانیہ: {h.durationMinutes} منٹ</span>
                  <span className="text-[#bc6c25] font-bold">تفصیل دیکھیں ←</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: HARMONIOUS COUPLING (قمر و ساعت کا تطابق) */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-3xl border-2 border-[#70a9a1] bg-[#0d1424] p-6 text-white shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#70a9a1]/20 border border-[#70a9a1] text-[#70a9a1]">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-amiri text-xl font-bold text-[#fefae0]">
              قاعدۂ تطابقِ قمر و ساعت (Moon Phase & Hourly Synergy)
            </h4>
            <p className="text-xs text-[#cbd5e1]">
              کاش البرنی و مولانا محمد عمر سربازیؒ کے مطابق حالتِ قمر اور ساعتِ وقت کا باہمی ربط
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#172033] border border-[#70a9a1]/30 space-y-2">
            <span className="font-amiri font-bold text-sm text-[#70a9a1]">
              ۱۔ نصفِ اولِ قمر (یکم تا ۱۴ - ہلال تا بدرِ کامل):
            </span>
            <p className="text-[#cbd5e1] leading-relaxed">
              اس دورانیے میں چاند کے نور میں اضافہ ہو رہا ہوتا ہے۔ یہ تمام ایام <strong>اعمالِ خیر، محبت، برکتِ رزق، شفا، تسخیرِ قلوب، ترقیِ کاروبار اور عقدِ نکاح</strong> کے لیے اکسیر ہیں۔ اگر اس وقت <strong>ساعتِ مشتری یا ساعتِ زہرہ</strong> مل جائے تو تاثیر دہ چند ہو جاتی ہے۔
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#172033] border border-[#70a9a1]/30 space-y-2">
            <span className="font-amiri font-bold text-sm text-[#bc6c25]">
              ۲۔ نصفِ ثانیِ قمر (۱۶ تا ۲۸ - احدب تا محاق):
            </span>
            <p className="text-[#cbd5e1] leading-relaxed">
              اس دورانیے میں چاند کا نور گھٹتا ہے۔ یہ وقت <strong>ابطالِ سحر، دفعِ جنات و آسیب، علاجِ امراضِ خبیثہ، خاتمۂ نزاع اور زبان بندیِ اعداء</strong> کے لیے مخصوص ہے۔ اس دوران <strong>ساعتِ مریخ یا ساعتِ زحل</strong> میں جلالی و دافعِ شر نقوش تحریر کیے جاتے ہیں۔
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CUSTOM CITY / COORDINATES MODAL */}
      {/* ------------------------------------------------------------- */}
      {customCityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-[#1e293b] border-2 border-[#70a9a1] p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#70a9a1]/30">
              <h3 className="font-amiri text-xl font-bold text-[#fefae0]">
                حسبِ ضرورت مقام و کوآرڈینیٹس شامل کریں
              </h3>
              <button
                onClick={() => setCustomCityModal(false)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#cbd5e1] mb-1 font-bold">شہر / گاؤں کا نام:</label>
                <input
                  type="text"
                  value={customCityName}
                  onChange={(e) => setCustomCityName(e.target.value)}
                  placeholder="مثلاً: گوادر، خضدار، حیدرآباد وغیرہ"
                  className="w-full bg-[#0f172a] border border-[#70a9a1]/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#70a9a1]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#cbd5e1] mb-1 font-bold">عرضِ بلد (Latitude):</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={customLat}
                    onChange={(e) => setCustomLat(e.target.value)}
                    className="w-full bg-[#0f172a] border border-[#70a9a1]/40 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#70a9a1]"
                  />
                </div>

                <div>
                  <label className="block text-[#cbd5e1] mb-1 font-bold">طولِ بلد (Longitude):</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={customLng}
                    onChange={(e) => setCustomLng(e.target.value)}
                    className="w-full bg-[#0f172a] border border-[#70a9a1]/40 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#70a9a1]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#cbd5e1] mb-1 font-bold">منطقۂ وقت (Timezone Offset from GMT):</label>
                <input
                  type="number"
                  step="0.5"
                  value={customTz}
                  onChange={(e) => setCustomTz(e.target.value)}
                  placeholder="مثلاً +5 برائے پاکستان"
                  className="w-full bg-[#0f172a] border border-[#70a9a1]/40 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#70a9a1]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#70a9a1]/30">
              <button
                onClick={() => setCustomCityModal(false)}
                className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold cursor-pointer"
              >
                منسوخ
              </button>
              <button
                onClick={handleSaveCustomCity}
                className="px-5 py-2 rounded-xl bg-[#70a9a1] hover:bg-[#588b84] text-[#0b101b] text-xs font-extrabold cursor-pointer shadow-md"
              >
                مقام محفوظ کریں
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
