import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  calculateQiblaDirection, 
  calculatePrayerTimes, 
  PRESET_CITIES, 
  AUSPICIOUS_SPIRITUAL_WORKS, 
  KAABA_LAT, 
  KAABA_LNG 
} from '../utils/qiblaPrayerEngine';
import { calculatePlanetaryHoursForDay } from '../utils/jafrEngine';
import { 
  LocationCoordinates, 
  QiblaCalculationResult, 
  PrayerTimeSlot, 
  AuspiciousSpiritualHour,
  PlanetarySaat
} from '../types';
import { 
  Compass, 
  MapPin, 
  Navigation, 
  Clock, 
  Sparkles, 
  Flame, 
  Shield, 
  Heart, 
  Award, 
  Check, 
  Copy, 
  Info, 
  Locate, 
  RefreshCw, 
  Sun, 
  Moon, 
  Zap, 
  Layers, 
  Globe, 
  ArrowRight,
  TrendingUp,
  Eye,
  Sliders
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PrayerMapQiblaStudioProps {
  onSendToMatrixSuggester?: (text: string) => void;
  onSendToTakseer?: (text: string) => void;
}

export const PrayerMapQiblaStudio: React.FC<PrayerMapQiblaStudioProps> = ({
  onSendToMatrixSuggester,
  onSendToTakseer,
}) => {
  // Default to Karachi, Pakistan or user location
  const [currentLocation, setCurrentLocation] = useState<LocationCoordinates>(PRESET_CITIES[0]);
  const [isGpsLoading, setIsGpsLoading] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string>('work-rizq');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [customLat, setCustomLat] = useState<string>('24.8607');
  const [customLng, setCustomLng] = useState<string>('67.0011');
  const [showManualCoordModal, setShowManualCoordModal] = useState<boolean>(false);

  // Compass Heading state from device sensor if available
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [hasCompassSensor, setHasCompassSensor] = useState<boolean>(false);

  // Current time state
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Device orientation listener for physical compass
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // @ts-ignore (webkitCompassHeading for iOS)
      if (e.webkitCompassHeading !== undefined) {
        // @ts-ignore
        setDeviceHeading(e.webkitCompassHeading);
        setHasCompassSensor(true);
      } else if (e.alpha !== null) {
        setDeviceHeading(360 - e.alpha);
        setHasCompassSensor(true);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, []);

  // Qibla Calculation
  const qiblaResult: QiblaCalculationResult = useMemo(() => {
    return calculateQiblaDirection(currentLocation.latitude, currentLocation.longitude);
  }, [currentLocation.latitude, currentLocation.longitude]);

  // Prayer Times Calculation
  const prayerTimes: PrayerTimeSlot[] = useMemo(() => {
    return calculatePrayerTimes(currentLocation.latitude, currentLocation.longitude, now);
  }, [currentLocation.latitude, currentLocation.longitude, now]);

  // Planetary Hours for today
  const todayPlanetaryHours: PlanetarySaat[] = useMemo(() => {
    return calculatePlanetaryHoursForDay(now.getDay());
  }, [now]);

  // Find Current Planetary Saat
  const currentPlanetarySaat = useMemo(() => {
    const currentHour = now.getHours();
    // Approximate mapping: 6 AM is 0, 7 PM is 12, etc.
    const mappedIdx = (currentHour - 6 + 24) % 24;
    return todayPlanetaryHours[mappedIdx] || todayPlanetaryHours[0];
  }, [now, todayPlanetaryHours]);

  // Selected Auspicious Spiritual Work
  const activeSpiritualWork: AuspiciousSpiritualHour = useMemo(() => {
    return (
      AUSPICIOUS_SPIRITUAL_WORKS.find((w) => w.id === selectedObjectiveId) ||
      AUSPICIOUS_SPIRITUAL_WORKS[0]
    );
  }, [selectedObjectiveId]);

  // Find Next Active Prayer
  const nextPrayerSlot = useMemo(() => {
    const currentTotalMins = now.getHours() * 60 + now.getMinutes();
    for (const slot of prayerTimes) {
      const slotTotalMins = slot.hours * 60 + slot.minutes;
      if (slotTotalMins > currentTotalMins) {
        return slot;
      }
    }
    return prayerTimes[0]; // Next day's Fajr
  }, [now, prayerTimes]);

  // Handle GPS Auto-Detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGpsError('آپ کے براؤزر میں جی پی ایس (لوکیشن) سروس دستیاب نہیں ہے۔');
      return;
    }

    setIsGpsLoading(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCurrentLocation({
          latitude: lat,
          longitude: lng,
          cityName: `مقامِ حاضرہ (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`,
          countryName: 'جی پی ایس تصدیق شدہ',
          source: 'gps',
        });
        setCustomLat(lat.toFixed(4));
        setCustomLng(lng.toFixed(4));
        setIsGpsLoading(false);
      },
      (err) => {
        setIsGpsLoading(false);
        setGpsError('لوکیشن کی اجازت نہیں ملی۔ براہِ کرم فہرست سے شہر منتخب فرمائیں۔');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const handleApplyCustomCoords = () => {
    const lat = parseFloat(customLat);
    const lng = parseFloat(customLng);
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      setCurrentLocation({
        latitude: lat,
        longitude: lng,
        cityName: `تخصیص شدہ (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`,
        countryName: 'دستی اندراج',
        source: 'manual',
      });
      setShowManualCoordModal(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Compass rotation angle
  // If compass sensor is active, the needle rotates relative to phone heading. Otherwise, shows true Qibla bearing.
  const needleRotation = hasCompassSensor
    ? (qiblaResult.qiblaBearingDeg - deviceHeading + 360) % 360
    : qiblaResult.qiblaBearingDeg;

  return (
    <div className="space-y-8">
      {/* Top Hero Banner */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-[#f2e8cf] p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#bc6c25]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-12 w-48 h-48 bg-[#d4a373]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bc6c25] text-white text-xs font-bold shadow-sm mb-3">
              <Compass className="h-3.5 w-3.5" />
              <span>دعائیہ نقشہ، قبلہ نما و اوقاتِ سعد و نحس</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">کاش البرنی ایڈیشن</span>
            </div>
            <h1 className="font-amiri text-3xl sm:text-4xl font-bold text-[#5d4037] leading-tight">
              نقشۂ قبلہ، اوقاتِ صلوٰۃ و مستخرجِ ساعاتِ سعدِ اعظم
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#8d6e63] font-medium max-w-3xl leading-relaxed">
              اپنے موجودہ جغرافیائی مقام کے مطابق <strong className="text-[#5d4037]">عین قبلہ رخ</strong> کا تعین فرمائیں، اور علم الساعات (Planetary Clock) کے تحت مخصوص روحانی مقاصد کے لیے <strong className="text-[#bc6c25]">مبارک ترین اوقات (ساعاتِ سعد)</strong> کا مشاہدہ کریں۔
            </p>
          </div>

          {/* Quick Location & Saat Status */}
          <div className="flex flex-wrap items-center gap-3 self-stretch lg:self-auto">
            <div className="flex-1 sm:flex-initial rounded-2xl border-2 border-[#d4a373] bg-[#fdfaf1] px-5 py-3 text-center shadow-md">
              <span className="text-xs text-[#8d6e63] font-bold block mb-0.5">زاویۂ قبلہ (Bearing)</span>
              <span className="font-amiri text-3xl font-extrabold text-[#bc6c25]">{qiblaResult.qiblaBearingDeg}°</span>
              <span className="text-[10px] text-[#5d4037] block font-bold mt-0.5">{qiblaResult.directionCardinalUrdu}</span>
            </div>

            <div className="flex-1 sm:flex-initial rounded-2xl border-2 border-[#d4a373] bg-[#fdfaf1] px-5 py-3 text-center shadow-md">
              <span className="text-xs text-[#8d6e63] font-bold block mb-0.5">فاصلہ تا کعبۃ اللہ</span>
              <span className="font-amiri text-2xl font-extrabold text-[#5d4037]">{qiblaResult.distanceKm.toLocaleString()}</span>
              <span className="text-[10px] text-[#8d6e63] block font-bold">کلومیٹر</span>
            </div>

            <div className="flex-1 sm:flex-initial rounded-2xl border-2 border-[#d4a373] bg-[#fdfaf1] px-5 py-3 text-center shadow-md">
              <span className="text-xs text-[#8d6e63] font-bold block mb-0.5">ساعتِ وقت (Planetary Hour)</span>
              <span className="font-amiri text-lg font-bold text-[#9d0208] flex items-center justify-center gap-1">
                <Sun className="h-4 w-4 text-[#bc6c25]" />
                <span>{currentPlanetarySaat?.planetUrdu || 'مشتری'}</span>
              </span>
              <span className="text-[10px] text-[#283618] block font-bold">{currentPlanetarySaat?.natureUrdu || 'سعدِ اکبر'}</span>
            </div>
          </div>
        </div>

        {/* Location Selection & GPS Toolbar */}
        <div className="mt-8 pt-6 border-t border-[#d4a373]/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <span className="text-xs font-bold text-[#5d4037] flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#bc6c25]" />
              <span>شہر یا مقام منتخب فرمائیں:</span>
            </span>

            <select
              value={currentLocation.cityName}
              onChange={(e) => {
                const found = PRESET_CITIES.find((c) => c.cityName === e.target.value);
                if (found) setCurrentLocation(found);
              }}
              className="rounded-xl border-2 border-[#d4a373] bg-white px-4 py-2 text-xs sm:text-sm font-bold text-[#5d4037] focus:border-[#bc6c25] focus:outline-none font-amiri shadow-xs cursor-pointer"
            >
              {PRESET_CITIES.map((city) => (
                <option key={city.cityName} value={city.cityName}>
                  {city.cityName} ({city.countryName})
                </option>
              ))}
            </select>

            <button
              onClick={handleDetectLocation}
              disabled={isGpsLoading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#bc6c25] hover:bg-[#a65d1e] text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Locate className={`h-3.5 w-3.5 ${isGpsLoading ? 'animate-spin' : ''}`} />
              <span>{isGpsLoading ? 'تلاش جاری ہے...' : 'خودکار جی پی ایس (Auto GPS)'}</span>
            </button>

            <button
              onClick={() => setShowManualCoordModal(!showManualCoordModal)}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#fdfaf1] border border-[#d4a373] text-[#5d4037] hover:bg-[#faedcd] text-xs font-bold transition-colors cursor-pointer"
            >
              <Sliders className="h-3.5 w-3.5 text-[#8d6e63]" />
              <span>طول بلد و عرض بلد</span>
            </button>
          </div>

          <div className="text-xs text-[#8d6e63] font-medium flex items-center gap-1.5 bg-[#fdfaf1] px-3 py-1.5 rounded-xl border border-[#d4a373]/40">
            <Globe className="h-3.5 w-3.5 text-[#bc6c25]" />
            <span>عرض بلد: {currentLocation.latitude.toFixed(4)}° | طول بلد: {currentLocation.longitude.toFixed(4)}°</span>
          </div>
        </div>

        {/* GPS Error Warning */}
        {gpsError && (
          <div className="mt-3 p-3 rounded-xl bg-amber-100 text-amber-900 text-xs border border-amber-300 flex items-center gap-2">
            <Info className="h-4 w-4 shrink-0 text-amber-700" />
            <span>{gpsError}</span>
          </div>
        )}

        {/* Manual Coordinates Drawer */}
        {showManualCoordModal && (
          <div className="mt-4 p-4 rounded-2xl bg-white border border-[#d4a373] shadow-sm flex flex-wrap items-center gap-3">
            <div>
              <label className="text-[11px] font-bold text-[#8d6e63] block mb-1">عرض بلد (Latitude):</label>
              <input
                type="number"
                step="0.0001"
                value={customLat}
                onChange={(e) => setCustomLat(e.target.value)}
                className="rounded-lg border border-[#d4a373] px-3 py-1.5 text-xs text-[#5d4037] w-32"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#8d6e63] block mb-1">طول بلد (Longitude):</label>
              <input
                type="number"
                step="0.0001"
                value={customLng}
                onChange={(e) => setCustomLng(e.target.value)}
                className="rounded-lg border border-[#d4a373] px-3 py-1.5 text-xs text-[#5d4037] w-32"
              />
            </div>
            <button
              onClick={handleApplyCustomCoords}
              className="self-end px-4 py-2 rounded-xl bg-[#5d4037] hover:bg-[#43281c] text-white text-xs font-bold cursor-pointer"
            >
              نافذ کریں
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Visual Qibla Compass & Prayer Vector Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (6 cols): Visual Qibla Compass & Celestial Sphere */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border-2 border-[#d4a373] bg-white p-6 sm:p-8 shadow-lg flex flex-col items-center justify-center relative overflow-hidden">
            <div className="w-full flex items-center justify-between border-b border-[#e7d8c9] pb-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#faedcd] text-[#5d4037]">
                  <Compass className="h-5 w-5 text-[#bc6c25]" />
                </span>
                <div>
                  <h3 className="font-amiri text-xl sm:text-2xl font-bold text-[#5d4037]">
                    قطب نما و سمتِ کعبۃ اللہ (Qibla Compass)
                  </h3>
                  <span className="text-xs text-[#8d6e63]">
                    {hasCompassSensor ? 'لائیو سینسر فعال ہے' : 'حسابی زاویۂ قطب (True Bearing)'}
                  </span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#faedcd] border border-[#d4a373] text-xs font-bold text-[#5d4037]">
                {qiblaResult.qiblaBearingDeg}°
              </span>
            </div>

            {/* Circular High-Contrast Islamic Compass Dial */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-4">
              {/* Outer Golden Border with Engraved Degree Ticks */}
              <div className="absolute inset-0 rounded-full border-4 border-[#d4a373] bg-gradient-to-tr from-[#fdfaf1] via-[#fffbf2] to-[#f4ede1] shadow-2xl flex items-center justify-center">
                {/* 16 Geometric Stars Pattern Background */}
                <div className="absolute inset-4 rounded-full border border-dashed border-[#d4a373]/40 opacity-70" />
                <div className="absolute inset-10 rounded-full border border-[#bc6c25]/20" />
              </div>

              {/* Cardinal Markers (N, S, E, W & Urdu) */}
              <div className="absolute top-2 text-center">
                <span className="font-bold text-xs text-[#9d0208] block">شمال (N)</span>
                <span className="text-[9px] text-[#8d6e63]">0°</span>
              </div>
              <div className="absolute bottom-2 text-center">
                <span className="font-bold text-xs text-[#5d4037] block">جنوب (S)</span>
                <span className="text-[9px] text-[#8d6e63]">180°</span>
              </div>
              <div className="absolute right-2 text-center">
                <span className="font-bold text-xs text-[#5d4037] block">مشرق (E)</span>
                <span className="text-[9px] text-[#8d6e63]">90°</span>
              </div>
              <div className="absolute left-2 text-center">
                <span className="font-bold text-xs text-[#5d4037] block">مغرب (W)</span>
                <span className="text-[9px] text-[#8d6e63]">270°</span>
              </div>

              {/* Rotating Needle (Points to Qibla) */}
              <motion.div
                className="relative w-full h-full flex items-center justify-center pointer-events-none"
                animate={{ rotate: needleRotation }}
                transition={{ type: 'spring', damping: 20, stiffness: 80 }}
              >
                {/* Kaaba Direction Indicator Arrow */}
                <div className="absolute -top-6 flex flex-col items-center">
                  <div className="bg-[#bc6c25] text-white px-2.5 py-1 rounded-xl shadow-lg border-2 border-white flex items-center gap-1">
                    <span className="text-[11px] font-amiri font-bold">کعبہ</span>
                    <span className="text-[9px] bg-black/30 px-1 rounded">🕋</span>
                  </div>
                  <div className="w-0.5 h-6 bg-[#bc6c25]" />
                </div>

                {/* Main Pointer Needle */}
                <div className="w-2.5 h-44 sm:h-56 bg-gradient-to-t from-[#8d6e63] via-[#bc6c25] to-[#9d0208] rounded-full shadow-lg relative flex items-center justify-center">
                  {/* Glowing tip */}
                  <div className="absolute -top-1 w-4 h-4 bg-[#9d0208] rotate-45 rounded-xs" />
                </div>

                {/* Central Pivot Hub */}
                <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-[#5d4037] to-[#bc6c25] border-4 border-white shadow-xl flex items-center justify-center text-white">
                  <Compass className="h-5 w-5 animate-pulse" />
                </div>
              </motion.div>
            </div>

            {/* Compass Footer Description */}
            <div className="mt-4 text-center space-y-1">
              <span className="font-amiri text-lg font-bold text-[#5d4037]">
                سمتِ قبلہ: {qiblaResult.directionCardinalUrdu} ({qiblaResult.qiblaBearingDeg}°)
              </span>
              <p className="text-xs text-[#8d6e63] max-w-sm mx-auto">
                اپنا چہرہ مبارک اور سجادہ شمال سے <strong>{qiblaResult.qiblaBearingDeg}°</strong> کی گردش پر سیدھا کریں۔
              </p>
            </div>
          </div>

          {/* Great-Circle Flight & Vector Card */}
          <div className="rounded-3xl border-2 border-[#d4a373] bg-[#fdfaf1] p-6 shadow-md">
            <h4 className="font-amiri text-lg font-bold text-[#5d4037] mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#bc6c25]" />
              <span>جغرافیائی خطِ اتصال (Great-Circle Geodesic)</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-xl bg-white border border-[#e7d8c9]">
                <span className="text-[#8d6e63] font-medium">مقامِ آغاز (آپ کا مقام):</span>
                <span className="font-bold text-[#5d4037]">{currentLocation.cityName}</span>
              </div>

              <div className="flex justify-between p-2 rounded-xl bg-white border border-[#e7d8c9]">
                <span className="text-[#8d6e63] font-medium">مقامِ مقصود (کعبۃ اللہ):</span>
                <span className="font-bold text-[#bc6c25]">مکہ مکرمہ (21.42° N, 39.82° E)</span>
              </div>

              <div className="flex justify-between p-2 rounded-xl bg-white border border-[#e7d8c9]">
                <span className="text-[#8d6e63] font-medium">براہِ راست فاصلہ:</span>
                <span className="font-bold text-[#283618]">{qiblaResult.distanceKm.toLocaleString()} کلومیٹر</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Daily Prayer Schedule with Spiritual Virtues */}
        <div className="lg:col-span-6 space-y-6">
          {/* Active Prayer Card */}
          <div className="rounded-3xl border-2 border-[#606c38] bg-gradient-to-br from-[#fdfaf1] via-[#f7fbe9] to-[#eef4d7] p-6 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-[#606c38]/30 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#283618] text-white">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-[11px] font-bold text-[#606c38] uppercase">آئندہ نماز و روحانی وقت</span>
                  <h3 className="font-amiri text-2xl font-bold text-[#283618]">{nextPrayerSlot.nameUrdu}</h3>
                </div>
              </div>

              <div className="text-right">
                <span className="font-amiri text-2xl font-extrabold text-[#283618]">{nextPrayerSlot.timeFormatted}</span>
                <span className="text-[10px] text-[#606c38] block font-bold">بمقام {currentLocation.cityName.split(' ')[0]}</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-[#283618] font-medium leading-relaxed">
                ✨ <strong>فضیلت و روحانی خاصیت:</strong> {nextPrayerSlot.spiritualVirtueUrdu}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {nextPrayerSlot.recommendedAamal.map((amal, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-white/80 border border-[#606c38]/30 text-[11px] font-bold text-[#283618]"
                  >
                    {amal}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Full Day Prayer Schedule List */}
          <div className="rounded-3xl border-2 border-[#d4a373] bg-white p-6 shadow-lg">
            <h3 className="font-amiri text-xl font-bold text-[#5d4037] pb-3 border-b border-[#e7d8c9] flex items-center justify-between">
              <span>اوقاتِ پنجگانہ و ساعاتِ صلوٰۃ</span>
              <span className="text-xs text-[#8d6e63] font-normal">{now.toLocaleDateString('ur-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </h3>

            <div className="divide-y divide-[#e7d8c9] mt-3">
              {prayerTimes.map((slot) => {
                const isNext = slot.id === nextPrayerSlot.id;
                return (
                  <div
                    key={slot.id}
                    className={`py-3 px-3 rounded-2xl transition-all flex items-center justify-between ${
                      isNext
                        ? 'bg-[#faedcd] border border-[#d4a373] font-bold shadow-xs'
                        : 'hover:bg-[#fdfaf1]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`p-2 rounded-xl ${isNext ? 'bg-[#bc6c25] text-white' : 'bg-[#f2e8cf] text-[#5d4037]'}`}>
                        {slot.id === 'fajr' || slot.id === 'ishraq' ? (
                          <Sun className="h-4 w-4" />
                        ) : slot.id === 'maghrib' || slot.id === 'isha' || slot.id === 'tahajjud' ? (
                          <Moon className="h-4 w-4" />
                        ) : (
                          <Sun className="h-4 w-4" />
                        )}
                      </span>
                      <div>
                        <span className="font-amiri text-base text-[#5d4037] block">
                          {slot.nameUrdu}
                        </span>
                        <span className="text-[10px] text-[#8d6e63]">
                          {slot.planetaryHourAtTime}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-amiri text-lg font-bold text-[#5d4037]">
                        {slot.timeFormatted}
                      </span>
                      {isNext && (
                        <span className="block text-[10px] text-[#9d0208] font-bold">
                          اگلا وقت ⏱️
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Auspicious Spiritual Hours Matcher (اوقاتِ سعد برائے اعمالِ روحانیہ بمطابق کاش البرنی) */}
      <div className="rounded-3xl border-3 border-[#bc6c25] bg-gradient-to-br from-[#fdfaf1] via-[#fffbf2] to-[#f9f4e8] p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#d4a373]/40">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-gradient-to-tr from-[#bc6c25] to-[#d4a373] text-white shadow-md">
              <Sparkles className="h-7 w-7" />
            </span>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#bc6c25] text-white text-[11px] font-bold">
                مستند ساعت شناسی از کاش البرنی
              </span>
              <h2 className="font-amiri text-2xl sm:text-3xl font-extrabold text-[#5d4037] mt-1">
                اوقاتِ سعد و استجابت برائے مخصوص اعمالِ روحانیہ
              </h2>
            </div>
          </div>

          <span className="text-xs font-bold text-[#5d4037] bg-[#faedcd] border border-[#d4a373] px-3.5 py-1.5 rounded-xl">
            کوکبِ حاکم: {activeSpiritualWork.governingPlanetUrdu}
          </span>
        </div>

        {/* Objective Selector Tabs */}
        <div className="mt-6">
          <label className="block text-xs font-bold text-[#5d4037] mb-2.5">
            روحانی مقصد یا نیت کا انتخاب فرمائیں:
          </label>
          <div className="flex flex-wrap gap-2">
            {AUSPICIOUS_SPIRITUAL_WORKS.map((work) => (
              <button
                key={work.id}
                id={`work-tab-${work.id}`}
                onClick={() => setSelectedObjectiveId(work.id)}
                className={`rounded-2xl px-4 py-2.5 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  selectedObjectiveId === work.id
                    ? 'bg-[#5d4037] text-white border-[#5d4037] shadow-md scale-102'
                    : 'bg-white text-[#5d4037] border-[#d4a373] hover:bg-[#faedcd]'
                }`}
              >
                <span className="text-base">{work.icon}</span>
                <span>{work.targetCategoryUrdu}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Spiritual Work Detailed Dashboard */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side (7 cols): Auspicious Hours & Best Timings */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl bg-white p-5 border border-[#d4a373]/60 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-[#8d6e63] flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#bc6c25]" />
                <span>مبارک ترین ساعات (Auspicious Planetary Windows):</span>
              </h4>

              <div className="space-y-2">
                {activeSpiritualWork.auspiciousHoursUrdu.map((hourText, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#fdfaf1] border border-[#e7d8c9] flex items-center justify-between text-xs font-bold text-[#5d4037]"
                  >
                    <span className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{hourText}</span>
                    </span>
                    <span className="text-[10px] text-[#bc6c25] bg-[#faedcd] px-2 py-0.5 rounded-md">
                      سعدِ تام
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-[#faedcd] text-xs font-bold text-[#5d4037] flex items-center justify-between">
                <span>موزوں ترین وقتِ صلوٰۃ:</span>
                <span className="text-[#283618]">{activeSpiritualWork.bestPrayerTiming}</span>
              </div>
            </div>

            {/* Classical Jafr Guidance */}
            <div className="rounded-2xl bg-white p-5 border border-[#d4a373]/60 shadow-xs">
              <h4 className="text-xs font-bold text-[#8d6e63] mb-1.5 flex items-center gap-1.5">
                <Info className="h-4 w-4 text-[#bc6c25]" />
                <span>دستور و آدابِ کاش البرنی (کتاب مفتاح الجفر و قوانین طلسم):</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#5d4037] leading-relaxed font-medium">
                "{activeSpiritualWork.jafrGuidance}"
              </p>
            </div>
          </div>

          {/* Right Side (5 cols): Recommended Wazaif, Incense & Actions */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl bg-white p-5 border border-[#d4a373]/60 shadow-xs space-y-3">
              <h4 className="font-amiri text-lg font-bold text-[#5d4037] border-b border-[#e7d8c9] pb-2">
                اسمائے مبارکہ و آیاتِ مقصود
              </h4>

              <div className="p-3 rounded-xl bg-[#fdfaf1] border border-[#e7d8c9]">
                <span className="text-[10px] text-[#8d6e63] font-bold block mb-1">اسمِ اعظم / کلمات:</span>
                <span className="font-amiri text-lg font-extrabold text-[#bc6c25] block leading-snug">
                  {activeSpiritualWork.recommendedIsm}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#fdfaf1] border border-[#e7d8c9]">
                <span className="text-[10px] text-[#8d6e63] font-bold block mb-1">آیتِ مبارکہ:</span>
                <span className="font-amiri text-sm font-bold text-[#5d4037] block leading-relaxed">
                  {activeSpiritualWork.recommendedVerse}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#fdfaf1] border border-[#e7d8c9] text-xs">
                <span className="text-[10px] text-[#8d6e63] font-bold block mb-0.5">مخصوص بخور:</span>
                <span className="font-bold text-[#5d4037]">{activeSpiritualWork.primaryIncense}</span>
              </div>
            </div>

            {/* Quick Action Navigation */}
            <div className="space-y-2">
              {onSendToMatrixSuggester && (
                <button
                  onClick={() => onSendToMatrixSuggester(activeSpiritualWork.recommendedIsm)}
                  className="w-full py-3 rounded-xl bg-[#bc6c25] hover:bg-[#a65d1e] text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Layers className="h-4 w-4" />
                  <span>اس کے لیے ماتریسِ تکسیر تجویز کریں</span>
                </button>
              )}

              {onSendToTakseer && (
                <button
                  onClick={() => onSendToTakseer(activeSpiritualWork.recommendedIsm)}
                  className="w-full py-2.5 rounded-xl border-2 border-[#5d4037] bg-[#f2e8cf] hover:bg-[#faedcd] text-xs font-bold text-[#5d4037] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Flame className="h-4 w-4 text-[#bc6c25]" />
                  <span>تکسیرِ صدر و مؤخر میں لے جائیں</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
