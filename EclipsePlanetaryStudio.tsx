import React, { useState, useMemo, useEffect } from 'react';
import { 
  PLANETS_PROFILES, 
  ECLIPSE_OPERATIONS, 
  PlanetAstroProfile, 
  EclipseOperationProfile 
} from '../data/eclipsePlanetaryData';
import { calculatePlanetaryHoursForDay, calculateAbjad } from '../utils/jafrEngine';
import { getHijriDateDetails, calculateLunarPhaseAndSpiritualInfluence } from '../utils/lunarEngine';
import { 
  Sun, 
  Moon, 
  Sparkles, 
  Flame, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Heart, 
  Users, 
  Lock, 
  Compass, 
  Download, 
  Copy, 
  Check, 
  BookOpen, 
  Zap, 
  Clock, 
  Activity, 
  Layers, 
  Radio, 
  ExternalLink,
  ChevronRight,
  Droplets,
  Wind,
  Mountain
} from 'lucide-react';

interface EclipsePlanetaryStudioProps {
  onSendToTakseer?: (text: string) => void;
  onSendToNaqsh?: (adad: number) => void;
}

export const EclipsePlanetaryStudio: React.FC<EclipsePlanetaryStudioProps> = ({
  onSendToTakseer,
  onSendToNaqsh
}) => {
  // Navigation sub-tabs
  const [subTab, setSubTab] = useState<'realtime_astro' | 'planet_directory' | 'eclipse_aamal' | 'eclipse_calculator' | 'download_center'>('realtime_astro');
  
  // Real-time planetary status calculation
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedAzimat, setCopiedAzimat] = useState<string | null>(null);

  // Selected planet in directory
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>('shams');
  
  // Eclipse operations filters
  const [eclipseFilter, setEclipseFilter] = useState<'all' | 'solar' | 'lunar'>('all');
  const [eclipseCategoryFilter, setEclipseCategoryFilter] = useState<string>('all');

  // Interactive Eclipse & Aflatoon Talisman Generator
  const [calcTalib, setCalcTalib] = useState<string>('محمد علی');
  const [calcMatloob, setCalcMatloob] = useState<string>('زینب');
  const [calcIntent, setCalcIntent] = useState<'mahabbat' | 'tafreeq_zalim' | 'zaban_bandi' | 'shifa'>('mahabbat');
  const [calcEclipseType, setCalcEclipseType] = useState<'solar' | 'lunar'>('solar');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  const hijriDetails = useMemo(() => getHijriDateDetails(currentTime), [currentTime]);
  const lunarDetails = useMemo(() => calculateLunarPhaseAndSpiritualInfluence(hijriDetails.hijriDay, hijriDetails.hijriMonth, currentTime), [hijriDetails, currentTime]);

  // Current active planetary hour
  const currentDayIdx = currentTime.getDay();
  const planetaryHours = useMemo(() => calculatePlanetaryHoursForDay(currentDayIdx), [currentDayIdx]);
  const currentHour = currentTime.getHours();
  const currentSaatIdx = Math.min(Math.max(0, Math.floor((currentHour >= 6 && currentHour < 18 ? currentHour - 6 : (currentHour + 6) % 12))), 11);
  const activeSaat = planetaryHours[currentSaatIdx] || planetaryHours[0];

  // Qamar Dar Aqrab status estimation (approximate traditional rules)
  // Moon in Scorpio roughly around Hijri days 20-22 or based on lunar zodiac calculation
  const isQamarDarAqrab = useMemo(() => {
    // When Hijri day is 20, 21, or 22, Moon transits through Burj Aqrab in classical astrological tables
    return hijriDetails.hijriDay >= 20 && hijriDetails.hijriDay <= 22;
  }, [hijriDetails.hijriDay]);

  const filteredEclipseOps = useMemo(() => {
    return ECLIPSE_OPERATIONS.filter((op) => {
      const matchType = eclipseFilter === 'all' || op.eclipseType === eclipseFilter;
      const matchCat = eclipseCategoryFilter === 'all' || op.category === eclipseCategoryFilter;
      return matchType && matchCat;
    });
  }, [eclipseFilter, eclipseCategoryFilter]);

  const selectedPlanet = useMemo(() => {
    return PLANETS_PROFILES.find((p) => p.id === selectedPlanetId) || PLANETS_PROFILES[0];
  }, [selectedPlanetId]);

  // Interactive Generator Result Calculation
  const interactiveGeneratorResult = useMemo(() => {
    const talibAdad = calculateAbjad(calcTalib).totalKabir;
    const matloobAdad = calculateAbjad(calcMatloob).totalKabir;
    const totalAdad = talibAdad + matloobAdad;

    // Build letters
    const cleanTalib = calcTalib.replace(/\s+/g, '');
    const cleanMatloob = calcMatloob.replace(/\s+/g, '');
    
    // Takseer letters interleaving (مزج حروف)
    let mixedLetters = '';
    const maxLen = Math.max(cleanTalib.length, cleanMatloob.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < cleanTalib.length) mixedLetters += cleanTalib[i] + ' ';
      if (i < cleanMatloob.length) mixedLetters += cleanMatloob[i] + ' ';
    }

    let ismAzam = '';
    let moakkilAlwi = '';
    let awnSufli = '';
    let ink = '';
    let metal = '';
    let disposal = '';

    if (calcIntent === 'mahabbat') {
      ismAzam = 'یا ودود یا بدوح یا حبیب یا جامع';
      moakkilAlwi = 'جبرائیل و دردائیل';
      awnSufli = 'ابیض و شمعون';
      ink = 'زعفران، مشک و عرقِ گلاب مع قلمِ انار';
      metal = calcEclipseType === 'solar' ? 'سونے کی پتری یا برنجِ زرد' : 'خالص چاندی کی لوح یا سفید ریشم';
      disposal = 'موم جامہ کر کے پھل دار درخت پر ہوا میں لٹکائیں یا چراغِ محبت میں روشن کریں۔';
    } else if (calcIntent === 'tafreeq_zalim') {
      ismAzam = 'یا قہار یا مذل یا منتقم یا شدید البطش';
      moakkilAlwi = 'عزرائیل و صمصائیل';
      awnSufli = 'ابامحرز احمر و زوبعہ';
      ink = 'سیاہیِ کحل مع آبِ سرکہ و پیاز';
      metal = 'سیسے کی لوح (Lead Sheet) یا نیلا کاغذ';
      disposal = 'لوہے کی کیل سے ویران قبرستان یا کچرے کے ڈھیر میں دفنائیں۔';
    } else if (calcIntent === 'zaban_bandi') {
      ismAzam = 'یا مانع یا صامت یا حفیظ';
      moakkilAlwi = 'میکائیل و حلمائیل';
      awnSufli = 'میمون ابانوخ';
      ink = 'کوئلے کا سفوف مع آبِ لیموں';
      metal = 'پیتل کی تختی یا سیسہ';
      disposal = 'بھاری سیاہ پتھر کے نیچے کسی چشمے یا ویرانے میں دبائیں۔';
    } else {
      ismAzam = 'یا شافی یا کافی یا معافی یا سلام';
      moakkilAlwi = 'اسرافیل و تنکفیل';
      awnSufli = 'برقان و دہنش';
      ink = 'زعفران و آبِ زمزم';
      metal = 'چاندی یا ہرن کی جھلی';
      disposal = 'چاندی کے خول میں گلے میں پہنیں اور روزانہ دھو کر پلائیں۔';
    }

    return {
      talibAdad,
      matloobAdad,
      totalAdad,
      mixedLetters: mixedLetters.trim(),
      ismAzam,
      moakkilAlwi,
      awnSufli,
      ink,
      metal,
      disposal,
    };
  }, [calcTalib, calcMatloob, calcIntent, calcEclipseType]);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAzimat(id);
    setTimeout(() => setCopiedAzimat(null), 2000);
  };

  const handleCopyDownloadLink = () => {
    const fullUrl = `${window.location.origin}/api/download-zip`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Top Banner */}
      <div className="rounded-2xl border-2 border-[#bc6c25] bg-gradient-to-r from-[#2c1e14] via-[#3d2b1f] to-[#2c1e14] p-6 text-[#fefae0] shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#bc6c25] text-white shadow-sm">
                <Sun className="h-6 w-6 animate-spin-slow" />
              </span>
              <h2 className="font-amiri text-2xl md:text-3xl font-bold text-[#dda15e]">
                رصدِ کواکب، سعد و نحس، قمر در عقرب و اعمالِ کسوف و خسوف
              </h2>
            </div>
            <p className="mt-2 text-xs md:text-sm text-[#fefae0]/85 max-w-3xl font-medium leading-relaxed">
              کاش البرنی کی امہات الکتب (قوانین طلسم، قوانین افلاطون، رموز الجفر، و مفتاح الجفر) سے ماخوذ ستاروں کی لائیو پوزیشن، سعد و نحس، قمر در عقرب کی نشاندہی، ہر ستارے کے مخصوص اعمال اور سورج و چاند گرہن کے وقت محبت، ہلاکتِ ظالم، تفریق و زبان بندی کے مکمل جفری نقوش و تکسیرات۔
            </p>
          </div>

          {/* Live Saat Quick Badge */}
          <div className="bg-[#bc6c25]/30 border border-[#dda15e]/40 p-3 rounded-2xl backdrop-blur-md shrink-0 flex flex-col items-end">
            <div className="flex items-center gap-2 text-xs text-[#dda15e] font-bold">
              <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span>موجودہ نافذ ساعت:</span>
            </div>
            <span className="font-amiri text-lg font-bold text-white mt-0.5">
              {activeSaat.planetUrdu} ({activeSaat.natureUrdu})
            </span>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-[#bc6c25]/40">
          <button
            id="subtab-btn-realtime"
            onClick={() => setSubTab('realtime_astro')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold transition-all cursor-pointer ${
              subTab === 'realtime_astro'
                ? 'bg-[#bc6c25] text-white shadow-md'
                : 'bg-[#ffffff]/10 text-[#fefae0] hover:bg-[#ffffff]/20 border border-[#dda15e]/30'
            }`}
          >
            <Activity className="h-4 w-4" />
            <span>ستاروں کی لائیو پوزیشن و قمر در عقرب</span>
          </button>

          <button
            id="subtab-btn-planet-dir"
            onClick={() => setSubTab('planet_directory')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold transition-all cursor-pointer ${
              subTab === 'planet_directory'
                ? 'bg-[#bc6c25] text-white shadow-md'
                : 'bg-[#ffffff]/10 text-[#fefae0] hover:bg-[#ffffff]/20 border border-[#dda15e]/30'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>ہر ستارے کے مخصوص اعمال (شمس تا زحل)</span>
          </button>

          <button
            id="subtab-btn-eclipse-aamal"
            onClick={() => setSubTab('eclipse_aamal')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold transition-all cursor-pointer ${
              subTab === 'eclipse_aamal'
                ? 'bg-[#bc6c25] text-white shadow-md'
                : 'bg-[#ffffff]/10 text-[#fefae0] hover:bg-[#ffffff]/20 border border-[#dda15e]/30'
            }`}
          >
            <Zap className="h-4 w-4" />
            <span>سورج و چاند گرہن کے اعمال و نقوش</span>
          </button>

          <button
            id="subtab-btn-eclipse-calc"
            onClick={() => setSubTab('eclipse_calculator')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold transition-all cursor-pointer ${
              subTab === 'eclipse_calculator'
                ? 'bg-[#bc6c25] text-white shadow-md'
                : 'bg-[#ffffff]/10 text-[#fefae0] hover:bg-[#ffffff]/20 border border-[#dda15e]/30'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>مولدِ طلسم و تکسیرِ گرہن</span>
          </button>

          <button
            id="subtab-btn-download"
            onClick={() => setSubTab('download_center')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold transition-all cursor-pointer ${
              subTab === 'download_center'
                ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-400'
                : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900 border border-emerald-500/40'
            }`}
          >
            <Download className="h-4 w-4 text-emerald-400" />
            <span>ڈاؤن لوڈ سورس کوڈ و ایکسٹرنل لنک</span>
          </button>
        </div>
      </div>

      {/* ----------------- SUBTAB 1: REAL-TIME ASTRO & QAMAR DAR AQRAB ----------------- */}
      {subTab === 'realtime_astro' && (
        <div className="space-y-6">
          {/* Qamar Dar Aqrab Alert Banner */}
          <div
            id="qamar-dar-aqrab-banner"
            className={`rounded-2xl border-2 p-5 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              isQamarDarAqrab
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : 'bg-emerald-50 border-emerald-300 text-emerald-950'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-3 rounded-2xl shrink-0 mt-0.5 ${
                  isQamarDarAqrab ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                {isQamarDarAqrab ? <AlertTriangle className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-amiri text-xl font-bold">
                    {isQamarDarAqrab
                      ? 'انتباہ: قمر در عقرب جاری ہے (Moon in Scorpio Alert)'
                      : 'قمر در عقرب نہیں ہے (قمر محفوظ و سعد بروج میں ہے)'}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isQamarDarAqrab ? 'bg-rose-200 text-rose-900' : 'bg-emerald-200 text-emerald-900'
                    }`}
                  >
                    تاریخِ ہجری: {hijriDetails.hijriDay} {hijriDetails.hijriMonthNameUrdu}
                  </span>
                </div>
                <p className="text-xs md:text-sm mt-1.5 font-medium leading-relaxed">
                  {isQamarDarAqrab
                    ? 'کاش البرنی (قوانین طلسم): "قمر در عقرب کے دوران نکاح، نیا سفر، دکان کا افتتاح اور اعمالِ محبت سخت ممنوع ہیں۔ البتہ یہ وقت ہلاکتِ ظالم، تفریقِ اعداء اور زبان بندی کے لیے بے حد قوی ہوتا ہے۔"'
                    : 'چاند اس وقت سعد بروج میں گردش کر رہا ہے۔ تمام اعمالِ محبت، وسعتِ رزق، عقدِ نکاح اور نوکری و دکان کے نقوش کے لیے وقت نہایت مبارک اور تیر بہدف ہے۔'}
                </p>
              </div>
            </div>

            <div className="bg-white/80 p-3 rounded-xl border border-current/20 shrink-0 text-xs font-bold">
              <span>حالتِ چاند: </span>
              <span className="font-amiri text-sm">{lunarDetails.phaseNameUrdu}</span>
            </div>
          </div>

          {/* 7 Planets Real-Time Live Status Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-amiri text-xl font-bold text-[#5d4037] flex items-center gap-2">
                <Compass className="h-5 w-5 text-[#bc6c25]" />
                موجودہ پوزیشنِ سبعہ سیارگان (7 Planets Astrological State & Natures)
              </h3>
              <span className="text-xs text-[#8d6e63] font-medium">بروج، شرف، ہبوط و سعد/نحس</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {PLANETS_PROFILES.map((planet) => {
                const isCurrentRuler = activeSaat.planetUrdu.includes(planet.nameArabic);
                return (
                  <div
                    key={planet.id}
                    className={`rounded-2xl border-2 p-4 shadow-sm bg-white flex flex-col justify-between transition-all hover:shadow-md ${
                      isCurrentRuler ? 'border-[#bc6c25] ring-2 ring-[#bc6c25]/30' : 'border-[#e7d8c9]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-[#f2e8cf]">
                        <span className="font-amiri text-lg font-bold text-[#5d4037]">{planet.nameUrdu}</span>
                        {isCurrentRuler && (
                          <span className="bg-[#bc6c25] text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                            حاکمِ ساعت
                          </span>
                        )}
                      </div>

                      {/* Nature Pill */}
                      <div className="mt-2.5 flex items-center gap-1.5">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
                            planet.natureCategory.includes('saad')
                              ? 'bg-emerald-100 text-emerald-800'
                              : planet.natureCategory.includes('nahs')
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {planet.statusUrdu}
                        </span>
                      </div>

                      {/* Attributes */}
                      <div className="mt-3 space-y-1.5 text-xs text-[#5d4037]">
                        <div className="flex justify-between">
                          <span className="text-[#8d6e63]">عنصر و طبع:</span>
                          <span className="font-bold">{planet.elementUrdu}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8d6e63]">مقرر دن:</span>
                          <span className="font-bold">{planet.rulingDayUrdu}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8d6e63]">برجِ شرف:</span>
                          <span className="font-bold text-[#283618]">{planet.sharafBurjUrdu}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8d6e63]">برجِ ہبوط:</span>
                          <span className="font-bold text-[#9d0208]">{planet.hubootBurjUrdu}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8d6e63]">دھات:</span>
                          <span className="font-bold text-[#bc6c25]">{planet.metalUrdu}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedPlanetId(planet.id);
                        setSubTab('planet_directory');
                      }}
                      className="mt-4 w-full py-2 bg-[#fdfaf1] hover:bg-[#faedcd] border border-[#d4a373] text-[#5d4037] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>مخصوص اعمال و نقوش دیکھیں</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ----------------- SUBTAB 2: PLANETARY DIRECTORY ----------------- */}
      {subTab === 'planet_directory' && (
        <div className="space-y-6">
          {/* Planet Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-2 bg-[#fdfaf1] rounded-2xl border border-[#d4a373]">
            {PLANETS_PROFILES.map((p) => (
              <button
                key={p.id}
                id={`btn-planet-tab-${p.id}`}
                onClick={() => setSelectedPlanetId(p.id)}
                className={`rounded-xl px-4 py-2 text-xs md:text-sm font-bold transition-all cursor-pointer flex-1 min-w-[110px] text-center ${
                  selectedPlanetId === p.id
                    ? 'bg-[#bc6c25] text-white shadow-md'
                    : 'bg-white text-[#5d4037] hover:bg-[#faedcd] border border-[#e7d8c9]'
                }`}
              >
                {p.nameUrdu.split('(')[0].trim()}
              </button>
            ))}
          </div>

          {/* Planet Detail View */}
          <div className="rounded-2xl border-2 border-[#d4a373] bg-white p-6 shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#e7d8c9]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-amiri text-2xl font-bold text-[#5d4037]">{selectedPlanet.nameUrdu}</h3>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      selectedPlanet.natureCategory.includes('saad')
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedPlanet.natureCategory.includes('nahs')
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {selectedPlanet.statusUrdu}
                  </span>
                </div>
                <p className="text-xs text-[#8d6e63] font-medium mt-1">{selectedPlanet.primaryAttributes}</p>
              </div>

              {/* Day & Metal */}
              <div className="bg-[#fdfaf1] p-3 rounded-xl border border-[#d4a373] text-xs font-bold text-[#5d4037] space-y-1">
                <div>حاکم دن: <span className="text-[#bc6c25]">{selectedPlanet.rulingDayUrdu}</span></div>
                <div>منسوب دھات: <span className="text-[#283618]">{selectedPlanet.metalUrdu}</span></div>
              </div>
            </div>

            {/* Quick Specs Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
              <div className="bg-[#fdfaf1] p-3 rounded-xl border border-[#e7d8c9]">
                <span className="text-[11px] text-[#8d6e63] block">بخور (دھونی):</span>
                <span className="text-xs font-bold text-[#5d4037] mt-0.5 block">{selectedPlanet.incenseUrdu}</span>
              </div>
              <div className="bg-[#fdfaf1] p-3 rounded-xl border border-[#e7d8c9]">
                <span className="text-[11px] text-[#8d6e63] block">سیاہی و قلم:</span>
                <span className="text-xs font-bold text-[#5d4037] mt-0.5 block">{selectedPlanet.inkUrdu}</span>
              </div>
              <div className="bg-[#fdfaf1] p-3 rounded-xl border border-[#e7d8c9]">
                <span className="text-[11px] text-[#8d6e63] block">موزوں سمت:</span>
                <span className="text-xs font-bold text-[#5d4037] mt-0.5 block">{selectedPlanet.directionUrdu}</span>
              </div>
              <div className="bg-[#fdfaf1] p-3 rounded-xl border border-[#e7d8c9]">
                <span className="text-[11px] text-[#8d6e63] block">منسوب رنگ:</span>
                <span className="text-xs font-bold text-[#5d4037] mt-0.5 block">{selectedPlanet.colorUrdu}</span>
              </div>
            </div>

            {/* Kash Al Barny Treatise Rule */}
            <div className="bg-[#fdfaf1] border-2 border-dashed border-[#d4a373] p-4 rounded-2xl mb-6">
              <span className="text-[11px] font-bold text-[#bc6c25] uppercase tracking-wider block">
                قانونِ کاش البرنی برائے {selectedPlanet.nameUrdu.split('(')[0]}
              </span>
              <p className="text-xs md:text-sm text-[#5d4037] font-medium mt-1 leading-relaxed italic">
                {selectedPlanet.kashAlBarniRule}
              </p>
            </div>

            {/* Best Operations List */}
            <h4 className="font-amiri text-lg font-bold text-[#5d4037] mb-3">
              مخصوص اعمال و نقوش برائے {selectedPlanet.nameUrdu.split('(')[0]}
            </h4>

            <div className="space-y-4">
              {selectedPlanet.bestAamalList.map((amal, aIdx) => (
                <div
                  key={aIdx}
                  className="rounded-xl border border-[#e7d8c9] p-4 bg-[#fdfaf1] hover:bg-white transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-amiri text-base font-bold text-[#5d4037] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#bc6c25] text-white text-xs flex items-center justify-center font-bold">
                        {aIdx + 1}
                      </span>
                      <span>{amal.title}</span>
                    </h5>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        amal.type === 'khair' || amal.type === 'taskheer'
                          ? 'bg-emerald-100 text-emerald-800'
                          : amal.type === 'shifa'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {amal.type === 'khair'
                        ? 'عملِ خیر'
                        : amal.type === 'taskheer'
                        ? 'تسخیر'
                        : amal.type === 'shifa'
                        ? 'شفا'
                        : 'قہر و دفعِ ظالم'}
                    </span>
                  </div>

                  <p className="text-xs text-[#7f5539] font-medium mt-1">{amal.description}</p>

                  <div className="mt-3 bg-white p-3 rounded-lg border border-[#e7d8c9] text-xs text-[#2c1e14] leading-relaxed">
                    <span className="font-bold text-[#bc6c25]">طریقۂ کار و نقش: </span>
                    <span>{amal.protocol}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ----------------- SUBTAB 3: ECLIPSE AAMAL (سورج و چاند گرہن) ----------------- */}
      {subTab === 'eclipse_aamal' && (
        <div className="space-y-6">
          {/* Header & Filter Controls */}
          <div className="rounded-2xl border-2 border-[#bc6c25] bg-[#fdfaf1] p-6 shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="font-amiri text-2xl font-bold text-[#5d4037] flex items-center gap-2">
                  <Zap className="h-6 w-6 text-[#bc6c25]" />
                  دستور العملِ کسوف و خسوف (Solar & Lunar Eclipse Master Treatises)
                </h3>
                <p className="text-xs text-[#8d6e63] font-medium mt-1">
                  کاش البرنی (قوانین طلسم و رموز الجفر) کے مطابق گرہن کے لمحات میں کائنات کی تمام روحانی و فلکی قوتیں نقطۂ انجماد پر ہوتی ہیں۔ اس وقت کے لکھے گئے نقوشِ محبت، تفریق، ہلاکتِ ظالم اور زبان بندی سال بھر کے نقوش سے ہزار گنا زیادہ پر تاثیر ہوتے ہیں۔
                </p>
              </div>

              {/* Quick Jump to Interactive Calculator */}
              <button
                onClick={() => setSubTab('eclipse_calculator')}
                className="bg-[#bc6c25] hover:bg-[#a2591d] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Layers className="h-4 w-4" />
                <span>گرہن کا اپنا طلسم بنائیں</span>
              </button>
            </div>

            {/* Filter Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-[#e7d8c9]">
              {/* Type Filter */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#d4a373]">
                <button
                  onClick={() => setEclipseFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    eclipseFilter === 'all' ? 'bg-[#bc6c25] text-white' : 'text-[#5d4037]'
                  }`}
                >
                  تمام گرہن
                </button>
                <button
                  onClick={() => setEclipseFilter('solar')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    eclipseFilter === 'solar' ? 'bg-[#bc6c25] text-white' : 'text-[#5d4037]'
                  }`}
                >
                  سورج گرہن (کسوف)
                </button>
                <button
                  onClick={() => setEclipseFilter('lunar')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    eclipseFilter === 'lunar' ? 'bg-[#bc6c25] text-white' : 'text-[#5d4037]'
                  }`}
                >
                  چاند گرہن (خسوف)
                </button>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-1">
                {[
                  { id: 'all', label: 'تمام مقاصد' },
                  { id: 'mahabbat_taskheer', label: 'محبت و الفت' },
                  { id: 'dushmani_halakat', label: 'ہلاکت و دفعِ ظالم' },
                  { id: 'judai_tafreeq', label: 'جدائی و تفریقِ ناجائز' },
                  { id: 'shifa_hifazat', label: 'شفا و اکسیرِ اعظم' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setEclipseCategoryFilter(c.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      eclipseCategoryFilter === c.id
                        ? 'bg-[#5d4037] text-white'
                        : 'bg-white text-[#5d4037] hover:bg-[#faedcd] border border-[#e7d8c9]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Operations List */}
          <div className="space-y-6">
            {filteredEclipseOps.map((op) => (
              <div
                key={op.id}
                className="rounded-2xl border-2 border-[#d4a373] bg-white p-6 shadow-md transition-all hover:shadow-lg"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-4 border-b border-[#e7d8c9]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`p-1.5 rounded-lg text-white ${
                          op.eclipseType === 'solar' ? 'bg-amber-600' : 'bg-indigo-600'
                        }`}
                      >
                        {op.eclipseType === 'solar' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      </span>
                      <h4 className="font-amiri text-xl font-bold text-[#5d4037]">{op.titleUrdu}</h4>
                    </div>
                    <p className="text-xs text-[#7f5539] font-medium mt-1">مقصد: {op.purposeUrdu}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        op.category === 'mahabbat_taskheer'
                          ? 'bg-emerald-100 text-emerald-800'
                          : op.category === 'shifa_hifazat'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {op.categoryUrdu}
                    </span>
                    <span className="text-xs bg-[#faedcd] text-[#5d4037] px-2.5 py-1 rounded-full font-bold">
                      {op.eclipseNameUrdu}
                    </span>
                  </div>
                </div>

                {/* Grid Specs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
                  <div className="bg-[#fdfaf1] p-3 rounded-xl border border-[#e7d8c9]">
                    <span className="text-[11px] text-[#8d6e63] font-bold block">وقتِ کتابت:</span>
                    <span className="text-xs font-bold text-[#5d4037] mt-0.5 block">{op.timingRuleUrdu}</span>
                  </div>
                  <div className="bg-[#fdfaf1] p-3 rounded-xl border border-[#e7d8c9]">
                    <span className="text-[11px] text-[#8d6e63] font-bold block">دھات یا کاغذ:</span>
                    <span className="text-xs font-bold text-[#5d4037] mt-0.5 block">{op.metalOrPaperUrdu}</span>
                  </div>
                  <div className="bg-[#fdfaf1] p-3 rounded-xl border border-[#e7d8c9]">
                    <span className="text-[11px] text-[#8d6e63] font-bold block">سیاہی و قلم:</span>
                    <span className="text-xs font-bold text-[#5d4037] mt-0.5 block">{op.inkAndPenUrdu}</span>
                  </div>
                  <div className="bg-[#fdfaf1] p-3 rounded-xl border border-[#e7d8c9]">
                    <span className="text-[11px] text-[#8d6e63] font-bold block">بخور (دھونی):</span>
                    <span className="text-xs font-bold text-[#5d4037] mt-0.5 block">{op.incenseUrdu}</span>
                  </div>
                </div>

                {/* Takseer Formula & Azimat */}
                <div className="space-y-3 bg-[#fdfaf1] p-4 rounded-xl border border-[#e7d8c9]">
                  <div>
                    <span className="text-xs font-bold text-[#bc6c25] block">ضابطۂ تکسیرِ افلاطون و جفر:</span>
                    <p className="text-xs text-[#2c1e14] font-medium mt-0.5 leading-relaxed">
                      {op.takseerAflatoonFormulaUrdu}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#5d4037]">عزیمتِ تسلیط و ورد:</span>
                      <button
                        onClick={() => handleCopyText(op.azimatUrdu, op.id)}
                        className="text-xs text-[#bc6c25] hover:text-[#5d4037] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        {copiedAzimat === op.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedAzimat === op.id ? 'کاپی ہو گئی' : 'عزیمت کاپی کریں'}</span>
                      </button>
                    </div>
                    <p className="text-xs md:text-sm text-[#283618] bg-white p-2.5 rounded-lg border border-[#e7d8c9] font-amiri font-bold mt-1 leading-loose" dir="rtl">
                      {op.azimatUrdu}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#bc6c25] block">طریقۂ استعمال و تلفی (Disposal):</span>
                    <p className="text-xs text-[#2c1e14] font-medium mt-0.5 leading-relaxed">
                      {op.disposalMethodUrdu}
                    </p>
                  </div>
                </div>

                {/* Warning & Kash Al-Barni Quote */}
                <div className="mt-4 flex flex-col md:flex-row items-start justify-between gap-3 pt-3 border-t border-[#f2e8cf] text-xs">
                  <div className="flex items-center gap-1.5 text-rose-900 font-medium">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-rose-700" />
                    <span>{op.warningAndConditionsUrdu}</span>
                  </div>
                  <div className="text-[#8d6e63] italic text-left" dir="rtl">
                    {op.kashAlBarniQuoteUrdu}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- SUBTAB 4: INTERACTIVE ECLIPSE TALISMAN GENERATOR ----------------- */}
      {subTab === 'eclipse_calculator' && (
        <div className="rounded-2xl border-2 border-[#d4a373] bg-white p-6 shadow-md space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#bc6c25] text-white shadow-sm">
                <Layers className="h-5 w-5" />
              </span>
              <h3 className="font-amiri text-2xl font-bold text-[#5d4037]">
                مولدِ طلسمِ کسوف و خسوف مع تکسیرِ افلاطون
              </h3>
            </div>
            <p className="text-xs text-[#8d6e63] font-medium mt-1">
              طالب و مطلوب کے نام درج کریں اور گرہن کے وقت کا مخصوص طلسم، تکسیرِ حروف، موکلات اور استعمال کا طریقہ خودکار حاصل کریں۔
            </p>
          </div>

          {/* Inputs Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#fdfaf1] p-4 rounded-2xl border border-[#e7d8c9]">
            <div>
              <label className="block text-xs font-bold text-[#5d4037] mb-1">نام طالب / مظلوم مع والدہ:</label>
              <input
                type="text"
                id="input-calc-talib"
                value={calcTalib}
                onChange={(e) => setCalcTalib(e.target.value)}
                className="w-full bg-white border border-[#d4a373] rounded-xl px-3 py-2 text-xs font-bold text-[#5d4037] focus:outline-none focus:ring-2 focus:ring-[#bc6c25]"
                placeholder="مثلاً: محمد علی ولد فاطمہ"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5d4037] mb-1">نام مطلوب / ظالم مع والدہ:</label>
              <input
                type="text"
                id="input-calc-matloob"
                value={calcMatloob}
                onChange={(e) => setCalcMatloob(e.target.value)}
                className="w-full bg-white border border-[#d4a373] rounded-xl px-3 py-2 text-xs font-bold text-[#5d4037] focus:outline-none focus:ring-2 focus:ring-[#bc6c25]"
                placeholder="مثلاً: زینب بنت مریم"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5d4037] mb-1">مقصدِ عمل:</label>
              <select
                id="select-calc-intent"
                value={calcIntent}
                onChange={(e) => setCalcIntent(e.target.value as any)}
                className="w-full bg-white border border-[#d4a373] rounded-xl px-3 py-2 text-xs font-bold text-[#5d4037] focus:outline-none focus:ring-2 focus:ring-[#bc6c25] cursor-pointer"
              >
                <option value="mahabbat">محبت، الفت و تسخیرِ قلوب</option>
                <option value="tafreeq_zalim">تفریق، عزلِ ظالم و ہلاکتِ عدو</option>
                <option value="zaban_bandi">زبان بندیِ حاسدین و مخالفین</option>
                <option value="shifa">شفا از سحر و امراضِ لاعلاج</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5d4037] mb-1">نوعیتِ گرہن:</label>
              <select
                id="select-calc-eclipse-type"
                value={calcEclipseType}
                onChange={(e) => setCalcEclipseType(e.target.value as any)}
                className="w-full bg-white border border-[#d4a373] rounded-xl px-3 py-2 text-xs font-bold text-[#5d4037] focus:outline-none focus:ring-2 focus:ring-[#bc6c25] cursor-pointer"
              >
                <option value="solar">سورج گرہن (کسوفِ شمس)</option>
                <option value="lunar">چاند گرہن (خسوفِ قمر)</option>
              </select>
            </div>
          </div>

          {/* Generated Result Card */}
          <div className="rounded-2xl border-2 border-[#bc6c25] bg-gradient-to-br from-[#fdfaf1] to-[#faedcd] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#d4a373]">
              <h4 className="font-amiri text-xl font-bold text-[#5d4037]">
                نقشۂ طلسم و استخراجِ جفر برائے {calcEclipseType === 'solar' ? 'سورج گرہن' : 'چاند گرہن'}
              </h4>
              <div className="text-xs font-bold bg-[#bc6c25] text-white px-3 py-1 rounded-full">
                مجموعہ اعداد: {interactiveGeneratorResult.totalAdad}
              </div>
            </div>

            {/* Matrix & Letters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-[#e7d8c9]">
                <span className="text-xs font-bold text-[#8d6e63] block">مزجِ حروف (تکسیرِ افلاطون):</span>
                <div className="mt-2 text-sm font-mono font-bold text-[#bc6c25] bg-[#fdfaf1] p-3 rounded-lg border border-[#d4a373] tracking-widest text-center">
                  {interactiveGeneratorResult.mixedLetters}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#e7d8c9]">
                <span className="text-xs font-bold text-[#8d6e63] block">اسمائے الٰہی برائے ورد:</span>
                <div className="mt-2 text-sm font-amiri font-bold text-[#283618] bg-[#fdfaf1] p-3 rounded-lg border border-[#d4a373] text-center">
                  {interactiveGeneratorResult.ismAzam}
                </div>
              </div>
            </div>

            {/* Spiritual Guardians (موکلات و اعوان) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-[#e7d8c9]">
                <span className="text-[#8d6e63] block">موکل علوی:</span>
                <span className="font-bold text-[#5d4037] font-amiri text-sm">{interactiveGeneratorResult.moakkilAlwi}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#e7d8c9]">
                <span className="text-[#8d6e63] block">عون سفلی:</span>
                <span className="font-bold text-[#9d0208] font-amiri text-sm">{interactiveGeneratorResult.awnSufli}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#e7d8c9]">
                <span className="text-[#8d6e63] block">موزوں دھات/تختی:</span>
                <span className="font-bold text-[#283618]">{interactiveGeneratorResult.metal}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#e7d8c9]">
                <span className="text-[#8d6e63] block">سیاہی:</span>
                <span className="font-bold text-[#bc6c25]">{interactiveGeneratorResult.ink}</span>
              </div>
            </div>

            {/* Disposal Protocol */}
            <div className="bg-white p-4 rounded-xl border border-[#e7d8c9] text-xs">
              <span className="font-bold text-[#bc6c25] block mb-1">طریقۂ استعمال و تلفی (Disposal Protocol):</span>
              <p className="text-[#2c1e14] font-medium leading-relaxed">
                {interactiveGeneratorResult.disposal}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- SUBTAB 5: DOWNLOAD CENTER & EXTERNAL LINK ----------------- */}
      {subTab === 'download_center' && (
        <div className="rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#1b4332] p-6 text-[#fefae0] shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-500 text-white shadow-sm">
                  <Download className="h-6 w-6" />
                </span>
                <h3 className="font-amiri text-2xl md:text-3xl font-bold text-white">
                  ڈاؤن لوڈ سورس کوڈ و مکمل پراجیکٹ زپ فائل (Download Source Code ZIP)
                </h3>
              </div>
              <p className="text-xs md:text-sm text-emerald-100/90 font-medium mt-2 max-w-3xl leading-relaxed">
                اس مکمل جفری و فلکیاتی سافٹ ویئر کے تمام سورس کوڈ، کتب کے ذخیرے، ریاضیاتی رولز، سروس ورکر آف لائن انجن اور مکمل ری ایکٹ پیکیج کو ایک زپ فائل میں ڈاؤن لوڈ کریں۔
              </p>
            </div>

            {/* One-Click Download Button */}
            <a
              id="btn-direct-zip-download"
              href="/api/download-zip"
              download="kashif-ul-jafr-complete-source.zip"
              className="bg-amber-500 hover:bg-amber-600 text-stone-900 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all shadow-lg shrink-0 flex items-center gap-2 cursor-pointer font-amiri"
            >
              <Download className="h-5 w-5" />
              <span>فوری زپ فائل ڈاؤن لوڈ کریں</span>
            </a>
          </div>

          {/* External Link & URL Box */}
          <div className="bg-black/30 border border-emerald-400/30 p-5 rounded-2xl backdrop-blur-md space-y-3">
            <span className="text-xs font-bold text-emerald-300 block">
              براہِ راست ایکسٹرنل ڈاؤن لوڈ لنک (Direct External Download Link URL):
            </span>
            
            <div className="flex items-center gap-2 bg-black/40 p-2.5 rounded-xl border border-emerald-500/40">
              <input
                type="text"
                readOnly
                value={typeof window !== 'undefined' ? `${window.location.origin}/api/download-zip` : '/api/download-zip'}
                className="w-full bg-transparent text-emerald-200 text-xs font-mono select-all focus:outline-none"
              />
              <button
                id="btn-copy-ext-link"
                onClick={handleCopyDownloadLink}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                {copiedLink ? <Check className="h-4 w-4 text-amber-300" /> : <Copy className="h-4 w-4" />}
                <span>{copiedLink ? 'لنک کاپی ہو گیا!' : 'لنک کاپی کریں'}</span>
              </button>
            </div>

            <p className="text-[11px] text-emerald-200/80 font-medium">
              یہ لنک آپ کسی بھی ڈاؤن لوڈ مینیجر (IDM)، براؤزر، یا کرل (`curl -O`) کمانڈ میں پیسٹ کر کے براہِ راست ڈاؤن لوڈ کر سکتے ہیں۔
            </p>
          </div>

          {/* Instructions for offline running */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white/10 p-4 rounded-xl border border-white/10">
              <span className="font-bold text-amber-300 block mb-1">۱. زپ ان زپ کریں</span>
              <p className="text-white/80">ڈاؤن لوڈ شدہ زپ فائل کو اپنے کمپیوٹر یا موبائل پر Extract کریں۔</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/10">
              <span className="font-bold text-amber-300 block mb-1">۲. ڈیپنڈینسیز انسٹال کریں</span>
              <p className="text-white/80">ٹرمینل میں `npm install` رن کریں تاکہ تمام ضروری لائبریریز آ جائیں۔</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/10">
              <span className="font-bold text-amber-300 block mb-1">۳. مکمل آف لائن چلائیں</span>
              <p className="text-white/80">`npm run dev` لکھیں اور ایپ آپ کے لوکل سسٹم پر بغیر انٹرنیٹ کے کھل جائے گی۔</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
