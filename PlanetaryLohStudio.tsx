import React, { useState, useMemo } from 'react';
import { 
  PLANETARY_LOH_DATABASE, 
  PlanetaryLohItem, 
  PLANETARY_SHARAF_DATABASE,
  PlanetarySharafItem,
  SEEKER_PURPOSE_PRESETS,
  SeekerPurposePreset,
  SAAD_NAHS_HOURS_GUIDE 
} from '../data/planetaryLohData';
import { calculateAbjad, adadToLetters } from '../utils/jafrEngine';
import { 
  Sun, 
  Moon, 
  Flame, 
  Sparkles, 
  Clock, 
  Shield, 
  Award, 
  Feather, 
  Printer, 
  Copy, 
  Check, 
  Info, 
  AlertTriangle, 
  Layers, 
  Compass, 
  Calendar,
  ChevronRight,
  ExternalLink,
  Zap,
  BookmarkCheck,
  User,
  Heart,
  BookOpen,
  DollarSign,
  Search,
  RefreshCw,
  Eye,
  Sliders
} from 'lucide-react';

interface PlanetaryLohStudioProps {
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
  onNavigateToSaat?: () => void;
}

export const PlanetaryLohStudio: React.FC<PlanetaryLohStudioProps> = ({
  onSendToNaqsh,
  onSendToTakseer,
  onNavigateToSaat
}) => {
  // Main Navigation Views
  const [activeView, setActiveView] = useState<'standard-loh' | 'sharaf-loh' | 'seeker-custom' | 'saad-nahs-guide'>('standard-loh');

  // Standard Loh State
  const [selectedPlanetKey, setSelectedPlanetKey] = useState<string>('sun');
  const [timingMode, setTimingMode] = useState<'all' | 'saad' | 'nahs'>('all');
  const [plateSide, setPlateSide] = useState<'front' | 'back'>('front');

  // Sharaf Loh State
  const [selectedSharafKey, setSelectedSharafKey] = useState<string>('moon'); // Moon default as requested
  const [sharafPlateSide, setSharafPlateSide] = useState<'front' | 'back'>('front');

  // Seeker Personalized Talisman State
  const [inquirerName, setInquirerName] = useState<string>('');
  const [motherName, setMotherName] = useState<string>('');
  const [purposeInput, setPurposeInput] = useState<string>('تسخیرِ قلوب و جلبِ محبت و کشش');
  const [selectedPurposePreset, setSelectedPurposePreset] = useState<string>('p-love');
  const [customPlanetChoice, setCustomPlanetChoice] = useState<string>('auto');
  const [customPlateSide, setCustomPlateSide] = useState<'front' | 'back'>('front');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Active Standard Planet Data
  const activePlanet: PlanetaryLohItem = useMemo(() => {
    return (
      PLANETARY_LOH_DATABASE.find((p) => p.planetKey === selectedPlanetKey) ||
      PLANETARY_LOH_DATABASE[0]
    );
  }, [selectedPlanetKey]);

  // Active Sharaf Planet Data
  const activeSharaf: PlanetarySharafItem = useMemo(() => {
    return (
      PLANETARY_SHARAF_DATABASE.find((p) => p.planetKey === selectedSharafKey) ||
      PLANETARY_SHARAF_DATABASE[0]
    );
  }, [selectedSharafKey]);

  // Abjad calculations for Seeker
  const inquirerAdad = useMemo(() => {
    return inquirerName.trim() ? calculateAbjad(inquirerName).totalKabir : 0;
  }, [inquirerName]);

  const motherAdad = useMemo(() => {
    return motherName.trim() ? calculateAbjad(motherName).totalKabir : 0;
  }, [motherName]);

  const purposeAdad = useMemo(() => {
    return purposeInput.trim() ? calculateAbjad(purposeInput).totalKabir : 0;
  }, [purposeInput]);

  // Matched Planet based on Seeker Intent or Selection
  const matchedPlanetKey = useMemo(() => {
    if (customPlanetChoice !== 'auto') return customPlanetChoice;
    const preset = SEEKER_PURPOSE_PRESETS.find(p => p.id === selectedPurposePreset);
    if (preset) return preset.recommendedPlanet;
    return 'moon';
  }, [customPlanetChoice, selectedPurposePreset]);

  const customPlanetData: PlanetaryLohItem = useMemo(() => {
    return (
      PLANETARY_LOH_DATABASE.find((p) => p.planetKey === matchedPlanetKey) ||
      PLANETARY_LOH_DATABASE[0]
    );
  }, [matchedPlanetKey]);

  // Total Adad for Seeker's Loh
  const totalCalculatedAdad = useMemo(() => {
    const baseNames = (inquirerAdad || 66) + (motherAdad || 15);
    const purpose = purposeAdad || customPlanetData.adadBase;
    return baseNames + purpose + customPlanetData.adadBase;
  }, [inquirerAdad, motherAdad, purposeAdad, customPlanetData.adadBase]);

  // Seeker Muwakkil Extraction
  const seekerMuwakkilUlwi = useMemo(() => {
    const letters = adadToLetters(totalCalculatedAdad) || 'طھط';
    return `${letters}ائیل`;
  }, [totalCalculatedAdad]);

  const seekerMuwakkilSifli = useMemo(() => {
    const letters = adadToLetters(inquirerAdad || 123) || 'کین';
    return `${letters}طوش`;
  }, [inquirerAdad]);

  // Seeker Custom Azimah
  const seekerPersonalizedAzimah = useMemo(() => {
    const seeker = inquirerName.trim() || 'طالبِ خیر';
    const mother = motherName.trim() || 'حوا';
    const purpose = purposeInput.trim() || 'حصولِ مقاصد و برکت';
    const asma = customPlanetData.divineNames.slice(0, 4).join(' ');
    
    return `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ، عَزَمْتُ عَلَيْكُمْ يَا مَلائِكَةَ اللَّهِ الرُّوحَانِيَّةِ وَالْأَرْوَاحِ الْفَلَكِيَّةِ، بِحَقِّ اسْمِ اللَّهِ الْأَعْظَمِ ${asma}، وَبِحَقِّ السَّيِّدِ ${seekerMuwakkilUlwi}، وَبِطَاعَةِ ${seekerMuwakkilSifli}، أَنْ تَجْلِبُوا الْخَيْرَ وَالْفَتْحَ لِحَامِلِ هَٰذِهِ اللَّوْحِ الْمُبَارَكَةِ (${seeker} بِنْتِ/بْنِ ${mother}) فِي ${purpose}، بِحَقِّ ${customPlanetData.quranicVerse}، الْعَجَلَ الْعَجَلَ السَّاعَةَ السَّاعَةَ بَارَكَ اللَّهُ فِيكُمْ وَعَلَيْكُمْ۔`;
  }, [inquirerName, motherName, purposeInput, customPlanetData, seekerMuwakkilUlwi, seekerMuwakkilSifli]);

  // Mathematical Wafq Grid Generator for Seeker (Dynamic calculation based on dimension)
  const customWafqGrid = useMemo(() => {
    const dim = customPlanetData.wafqDimensions;
    const total = totalCalculatedAdad;
    
    if (dim === 3) {
      // 3x3 Musallas (Saturn)
      const base = Math.max(1, Math.floor((total - 12) / 3));
      const kasr = (total - 12) % 3;
      return [
        [base + 3, base + 8 + (kasr === 2 ? 1 : 0), base + 1],
        [base + 2, base + 4, base + 6 + (kasr >= 1 ? 1 : 0)],
        [base + 7 + (kasr >= 1 ? 1 : 0), base + 0, base + 5]
      ];
    } else if (dim === 4) {
      // 4x4 Murabba (Jupiter)
      const base = Math.max(1, Math.floor((total - 30) / 4));
      const kasr = (total - 30) % 4;
      return [
        [base + 3, base + 13 + (kasr >= 1 ? 1 : 0), base + 14 + (kasr >= 2 ? 1 : 0), base + 0],
        [base + 8, base + 6, base + 5, base + 11 + (kasr >= 3 ? 1 : 0)],
        [base + 4, base + 10 + (kasr >= 3 ? 1 : 0), base + 9 + (kasr >= 2 ? 1 : 0), base + 7],
        [base + 15 + (kasr >= 1 ? 1 : 0), base + 1, base + 2, base + 12]
      ];
    } else {
      // Scaled classic grid for 5x5, 6x6, 7x7, 8x8
      const offset = Math.floor(total / (dim * dim));
      return customPlanetData.wafqDefaultGrid.map(row => 
        row.map(cell => cell + offset)
      );
    }
  }, [customPlanetData, totalCalculatedAdad]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleApplyPreset = (preset: SeekerPurposePreset) => {
    setSelectedPurposePreset(preset.id);
    setPurposeInput(preset.title);
    setCustomPlanetChoice(preset.recommendedPlanet);
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header Banner */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-gradient-to-r from-[#fefae0] via-[#faedcd] to-[#f4ebe1] p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2.5 rounded-2xl bg-[#bc6c25] text-white shadow-sm ring-2 ring-[#d4a373]">
                <Award className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-amiri text-2xl md:text-3xl font-bold text-[#5d4037]">
                  الواحِ کواکبِ سبعہ و شرفِ کواکب
                </h2>
                <span className="text-xs text-[#bc6c25] font-bold">
                  (قوانینِ کاش البرنی، شمس المعارف الکبریٰ، سر الاسرار و مفتاح الجفر)
                </span>
              </div>
            </div>
            <p className="mt-2 text-sm text-[#8d6e63] max-w-4xl leading-relaxed font-medium">
              شرفِ قمر، شرفِ عطارد اور ساتوں سیارگان کے سعد و نحس اعمال، نقوش، دھاتیں، بخورات، طریقۂ کتابت اور سائل کے نام و مقصد کے مطابق مخصوص لوح کی خودکار تیاری کا مستند جفری نظام۔
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {onNavigateToSaat && (
              <button
                id="btn-goto-saat-from-loh"
                onClick={onNavigateToSaat}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#d4a373] text-xs font-bold text-[#5d4037] hover:bg-[#faedcd] transition-all shadow-xs cursor-pointer"
              >
                <Clock className="h-4 w-4 text-[#bc6c25]" />
                <span>ساعت و کواکب شناسی</span>
              </button>
            )}
            <button
              id="btn-print-loh-plate"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#bc6c25] hover:bg-[#a2591d] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>لوح پرنٹ کریں</span>
            </button>
          </div>
        </div>

        {/* Studio Sub-Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-[#d4a373]/40 pt-4">
          <button
            onClick={() => setActiveView('standard-loh')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeView === 'standard-loh'
                ? 'bg-[#5d4037] text-white shadow-md'
                : 'bg-white/80 hover:bg-white text-[#5d4037] border border-[#d4a373]/60'
            }`}
          >
            <Sun className="h-4 w-4 text-amber-400" />
            <span>۱. عام الواحِ کواکبِ سبعہ (۷)</span>
          </button>

          <button
            onClick={() => setActiveView('sharaf-loh')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeView === 'sharaf-loh'
                ? 'bg-amber-700 text-white shadow-md ring-2 ring-amber-400/50'
                : 'bg-amber-100/70 hover:bg-amber-100 text-amber-900 border border-amber-300'
            }`}
          >
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span>۲. الواحِ شرفِ کواکب (شرف قمر و عطارد وغیرہ)</span>
          </button>

          <button
            onClick={() => setActiveView('seeker-custom')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeView === 'seeker-custom'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300'
            }`}
          >
            <Feather className="h-4 w-4 text-emerald-600" />
            <span>۳. سائل کے نام و مقصد کے مطابق مخصوص لوح</span>
          </button>

          <button
            onClick={() => setActiveView('saad-nahs-guide')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeView === 'saad-nahs-guide'
                ? 'bg-[#bc6c25] text-white shadow-md'
                : 'bg-white/80 hover:bg-white text-[#5d4037] border border-[#d4a373]/60'
            }`}
          >
            <Calendar className="h-4 w-4 text-[#bc6c25]" />
            <span>۴. اوقاتِ سعد و نحس و تقویمی جدول</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: STANDARD PLANETARY LOH (کواکبِ سبعہ کی الواح)
         ========================================================================= */}
      {activeView === 'standard-loh' && (
        <div className="space-y-6">
          {/* Planetary Ribbon Selection */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <label className="text-sm font-bold text-[#5d4037] flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-[#bc6c25]" />
                <span>سیارہ منتخب کریں جس کی لوح و مکمل طریقۂ کار درکار ہے:</span>
              </label>
              <div className="flex items-center gap-1 bg-[#f2e8cf] p-1 rounded-xl border border-[#d4a373] text-xs">
                <button
                  onClick={() => setTimingMode('all')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    timingMode === 'all'
                      ? 'bg-[#bc6c25] text-white shadow-xs'
                      : 'text-[#5d4037] hover:bg-white/50'
                  }`}
                >
                  تمام کواکب (۷)
                </button>
                <button
                  onClick={() => setTimingMode('saad')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    timingMode === 'saad'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  سعد الواح
                </button>
                <button
                  onClick={() => setTimingMode('nahs')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    timingMode === 'nahs'
                      ? 'bg-red-800 text-white shadow-xs'
                      : 'text-red-800 hover:bg-red-50'
                  }`}
                >
                  نحس/دفاعی الواح
                </button>
              </div>
            </div>

            {/* Planet Cards Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {PLANETARY_LOH_DATABASE.filter((item) => {
                if (timingMode === 'saad') return item.nature.startsWith('saad');
                if (timingMode === 'nahs') return item.nature.startsWith('nahs') || item.nature === 'mumtazij';
                return true;
              }).map((planet) => {
                const isSelected = selectedPlanetKey === planet.planetKey;
                return (
                  <button
                    key={planet.id}
                    id={`btn-select-loh-${planet.planetKey}`}
                    onClick={() => setSelectedPlanetKey(planet.planetKey)}
                    className={`p-3 rounded-2xl border-2 text-right transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[#bc6c25] bg-[#faedcd] ring-2 ring-[#bc6c25]/30 shadow-md scale-[1.02]'
                        : 'border-[#d4a373]/50 bg-white hover:bg-[#fefae0]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: planet.metalColor }}
                      />
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${planet.natureBadgeColor}`}>
                        {planet.governingDay.split(' ')[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-amiri text-base font-bold text-[#5d4037]">
                        {planet.planetNameUrdu.split(' ')[0]}
                      </h3>
                      <p className="text-[11px] text-[#8d6e63] font-medium line-clamp-1">
                        {planet.metal.split(' ')[0]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE PLANET MAIN CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (5 Cols on LG): Interactive Visual Metallic Plate (لوح کا تصویری و جفری خاکہ) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Visual Talismanic Plate Card */}
              <div className="rounded-3xl border-3 border-[#d4a373] bg-gradient-to-b from-[#2b1e16] to-[#1a120c] p-6 shadow-xl text-[#fefae0] relative overflow-hidden">
                {/* Ambient Metal Glow */}
                <div
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
                  style={{ backgroundColor: activePlanet.metalColor }}
                />

                {/* Front / Back Toggle */}
                <div className="flex items-center justify-between pb-4 border-b border-amber-900/50">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-xs font-bold text-amber-200">
                      {plateSide === 'front' ? 'لوح کا اگلا رخ (وفق و خاتم)' : 'لوح کا پچھلا رخ (عزیمت و موکلین)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-amber-800/40 text-xs">
                    <button
                      onClick={() => setPlateSide('front')}
                      className={`px-2.5 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                        plateSide === 'front' ? 'bg-[#bc6c25] text-white' : 'text-amber-300 hover:bg-white/10'
                      }`}
                    >
                      سامنے کا رخ
                    </button>
                    <button
                      onClick={() => setPlateSide('back')}
                      className={`px-2.5 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                        plateSide === 'back' ? 'bg-[#bc6c25] text-white' : 'text-amber-300 hover:bg-white/10'
                      }`}
                    >
                      پشتِ لوح
                    </button>
                  </div>
                </div>

                {/* Simulated Metallic Plate Display */}
                <div className="my-5 p-5 rounded-2xl border-4 bg-gradient-to-br transition-all duration-300 relative shadow-inner text-center font-amiri select-none"
                  style={{
                    borderColor: activePlanet.metalColor,
                    backgroundColor: activePlanet.metalColor === '#dc2626' ? '#fee2e2' :
                                     activePlanet.metalColor === '#94a3b8' ? '#f1f5f9' :
                                     activePlanet.metalColor === '#52525b' ? '#e4e4e7' :
                                     activePlanet.metalColor === '#10b981' ? '#d1fae5' :
                                     activePlanet.metalColor === '#f43f5e' ? '#ffe4e6' :
                                     activePlanet.metalColor === '#6366f1' ? '#e0e7ff' : '#fef3c7',
                    color: '#1a120c'
                  }}
                >
                  {/* Corner Traditional Talismanic Symbols */}
                  <div className="absolute top-2 right-3 text-xs font-bold opacity-70">ط ل س م</div>
                  <div className="absolute top-2 left-3 text-xs font-bold opacity-70">ق د و س</div>
                  <div className="absolute bottom-2 right-3 text-xs font-bold opacity-70">ع ل و ی</div>
                  <div className="absolute bottom-2 left-3 text-xs font-bold opacity-70">س ف ل ی</div>

                  {/* Plate Header */}
                  <div className="text-center mb-3">
                    <span className="text-xs font-bold tracking-widest text-[#5d4037] block">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </span>
                    <h4 className="text-lg font-bold text-[#2c1e14] mt-1 border-b border-black/20 pb-1">
                      {activePlanet.lohNameUrdu}
                    </h4>
                  </div>

                  {plateSide === 'front' ? (
                    /* Front Side: Wafq Grid & Divine Names */
                    <div className="space-y-3">
                      {/* Top Divine Names Bar */}
                      <div className="flex justify-around text-xs font-bold text-[#5d4037] bg-white/40 p-1.5 rounded-lg border border-black/10">
                        {activePlanet.divineNames.slice(0, 4).map((asma, i) => (
                          <span key={i}>{asma}</span>
                        ))}
                      </div>

                      {/* Wafq Matrix Display */}
                      <div className="inline-block mx-auto bg-white/80 p-2.5 rounded-xl border-2 border-black/30 shadow-md">
                        <div 
                          className="grid gap-1 text-center font-bold"
                          style={{
                            gridTemplateColumns: `repeat(${activePlanet.wafqDimensions}, minmax(0, 1fr))`
                          }}
                        >
                          {activePlanet.wafqDefaultGrid.map((row, rIdx) =>
                            row.map((cell, cIdx) => (
                              <div
                                key={`${rIdx}-${cIdx}`}
                                className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center border border-black/20 bg-amber-50/70 text-xs sm:text-sm font-bold text-[#2c1e14] shadow-2xs"
                              >
                                {cell}
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Bottom Talismanic Seal Info */}
                      <div className="text-[11px] font-bold text-[#5d4037] bg-white/50 p-2 rounded-lg border border-black/10 flex items-center justify-between">
                        <span>موکل علوی: {activePlanet.muwakkilUlwi}</span>
                        <span>خادم سفلی: {activePlanet.muwakkilSifli}</span>
                      </div>
                    </div>
                  ) : (
                    /* Back Side: Quranic Verse, Asma, and Inquirer Intent */
                    <div className="space-y-3 py-2">
                      <div className="p-3 bg-white/70 rounded-xl border border-black/20">
                        <span className="text-[11px] font-bold text-[#5d4037] block mb-1">
                          آیتِ فلکیہ و عزیمتِ لوح:
                        </span>
                        <p className="text-sm font-bold text-[#1a120c] leading-relaxed">
                          {activePlanet.quranicVerse}
                        </p>
                      </div>

                      <div className="p-3 bg-amber-100/70 rounded-xl border border-black/20 text-xs space-y-1 text-right font-urdu">
                        <div><strong>کوکب و طالع:</strong> {activePlanet.planetNameUrdu} ({activePlanet.natureUrdu})</div>
                        <div><strong>بیس عددِ لوح:</strong> <span className="font-mono font-bold">{activePlanet.adadBase}</span></div>
                        <div><strong>دھات و کندہ کاری:</strong> {activePlanet.metal}</div>
                      </div>

                      <div className="text-[10px] text-gray-700 italic">
                        کندہ کاری بر: {activePlanet.metal} | بخور: {activePlanet.incense.split('،')[0]}
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Actions Under Visual Plate */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {onSendToNaqsh && (
                    <button
                      id="btn-transfer-to-naqsh"
                      onClick={() => onSendToNaqsh(activePlanet.adadBase)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white p-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <Award className="h-3.5 w-3.5" />
                      <span>نقش جنریٹر میں کھولیں ({activePlanet.adadBase})</span>
                    </button>
                  )}
                  {onSendToTakseer && (
                    <button
                      id="btn-transfer-to-takseer"
                      onClick={() => onSendToTakseer(activePlanet.divineNames.join(' '))}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-[#5d4037] hover:bg-[#4a332a] text-white p-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <Flame className="h-3.5 w-3.5" />
                      <span>تکسیر اسٹوڈیو میں بھیجیں</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column (7 Cols on LG): Complete Astronomical, Preparation & Ritual Guide */}
            <div className="lg:col-span-7 space-y-6">
              {/* Planet Overview Card */}
              <div className="rounded-2xl border-2 border-[#d4a373] bg-white p-5 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#d4a373]/40">
                  <div>
                    <span className="text-xs text-[#bc6c25] font-bold block">{activePlanet.planetTitleUrdu}</span>
                    <h3 className="font-amiri text-2xl font-bold text-[#5d4037]">{activePlanet.lohNameUrdu}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${activePlanet.natureBadgeColor}`}>
                    {activePlanet.natureUrdu}
                  </span>
                </div>

                {/* Astrological Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#fdfaf1] border border-[#d4a373]/40">
                    <span className="text-gray-500 font-bold block text-[10px]">حاکم دن و رات:</span>
                    <span className="font-bold text-[#5d4037]">{activePlanet.governingDay}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#fdfaf1] border border-[#d4a373]/40">
                    <span className="text-gray-500 font-bold block text-[10px]">برج و شرف:</span>
                    <span className="font-bold text-[#5d4037]">{activePlanet.sharafDegree}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#fdfaf1] border border-[#d4a373]/40">
                    <span className="text-gray-500 font-bold block text-[10px]">دھات و پترہ:</span>
                    <span className="font-bold text-[#bc6c25]">{activePlanet.metal}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#fdfaf1] border border-[#d4a373]/40">
                    <span className="text-gray-500 font-bold block text-[10px]">عنصر و سمت:</span>
                    <span className="font-bold text-[#5d4037]">{activePlanet.elementUrdu} - {activePlanet.direction}</span>
                  </div>
                </div>

                {/* Purposes & Intentions */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-[#5d4037] flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>سعد مقاصد و فوائد (جلبِ منافع):</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activePlanet.saadPurposes.map((p, i) => (
                      <div key={i} className="flex items-start gap-1.5 p-2 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {activePlanet.nahsOrDefensivePurposes.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-red-800 flex items-center gap-1.5">
                      <Shield className="h-4 w-4 text-red-700" />
                      <span>نحس اوقات یا دفاعی استعمال (دفعِ شر و ابطال):</span>
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      {activePlanet.nahsOrDefensivePurposes.map((p, i) => (
                        <div key={i} className="flex items-start gap-1.5 p-2 rounded-xl bg-red-50/70 border border-red-200 text-red-950 font-medium">
                          <AlertTriangle className="h-3.5 w-3.5 text-red-600 mt-0.5 shrink-0" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Step-by-Step Preparation Protocol */}
              <div className="rounded-2xl border-2 border-[#d4a373] bg-[#fdfaf1] p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#d4a373]/40">
                  <h3 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
                    <Flame className="h-5 w-5 text-[#bc6c25]" />
                    <span>لوح بنانے کا مرحلہ وار طریقۂ عمل (Preparation Protocol)</span>
                  </h3>
                  <span className="text-xs text-[#8d6e63] font-bold">۴ بنیادی شرائط و مراحل</span>
                </div>

                <div className="space-y-3">
                  {activePlanet.preparationSteps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-3.5 rounded-2xl bg-white border border-[#d4a373]/50 shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#bc6c25] flex items-center gap-1.5">
                          <span className="h-5 w-5 rounded-full bg-[#bc6c25] text-white flex items-center justify-center text-[11px]">
                            {step.stepNumber}
                          </span>
                          <span>{step.title}</span>
                        </span>
                        <span className="text-[10px] text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-bold">
                          احتیاط: {step.precautions}
                        </span>
                      </div>
                      <p className="text-xs text-[#5d4037] font-medium leading-relaxed pr-6">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lawazmat, Bukhoor & Usage Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Lawazmat Card */}
                <div className="rounded-2xl border border-[#d4a373] bg-white p-4 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-[#5d4037] flex items-center gap-1.5 pb-2 border-b border-[#d4a373]/30">
                    <Sparkles className="h-4 w-4 text-[#bc6c25]" />
                    <span>لوازمات و بخوراتِ لوح</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    {activePlanet.lawazmat.map((cat, idx) => (
                      <div key={idx} className="p-2 rounded-xl bg-[#fdfaf1] border border-[#d4a373]/30">
                        <span className="font-bold text-[#bc6c25] block mb-1 text-[11px]">{cat.category}:</span>
                        <ul className="list-disc list-inside text-gray-700 space-y-0.5 font-medium">
                          {cat.items.map((it, i) => (
                            <li key={i}>{it}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Usage Methods Card */}
                <div className="rounded-2xl border border-[#d4a373] bg-white p-4 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-[#5d4037] flex items-center gap-1.5 pb-2 border-b border-[#d4a373]/30">
                    <BookmarkCheck className="h-4 w-4 text-emerald-700" />
                    <span>طریقۂ استعمال و احکام</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    {activePlanet.usageMethods.map((um, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-amber-50/50 border border-amber-200 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#5d4037]">{um.methodTitle}</span>
                          <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-md">
                            مدت: {um.duration}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-700 leading-relaxed font-medium">
                          {um.instructions}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kash Al-Barny Secrets */}
              <div className="rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-amber-50 to-orange-50 p-4 shadow-xs">
                <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-2">
                  <Zap className="h-4 w-4 text-amber-700" />
                  <span>کاش البرنی کے خاص رموز و ارشادات برائے الواحِ کواکب:</span>
                </h4>
                <div className="space-y-1.5 text-xs text-amber-950 font-medium">
                  {activePlanet.kashAlBarnySecrets.map((secret, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-bold">◈</span>
                      <span>{secret}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: SHARAF-E-KAWAKIB (الواحِ شرفِ کواکب - خصوصاً قمر و عطارد)
         ========================================================================= */}
      {activeView === 'sharaf-loh' && (
        <div className="space-y-6">
          {/* Sharaf Header Spotlight */}
          <div className="rounded-2xl border-2 border-amber-500 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-600/10 p-5 border-dashed">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-amber-500 text-white rounded-2xl shadow-sm">
                <Sparkles className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-amiri text-2xl font-bold text-amber-950">
                  انسائیکلوپیڈیا شرفِ کواکبِ سبعہ (خصوصاً شرفِ قمر و شرفِ عطارد)
                </h3>
                <p className="text-xs text-amber-900 font-medium mt-1">
                  علمِ نجوم و جفر کے مطابق جب کوکب اپنے اوج اور شرف کے درجات پر آتا ہے تو اس کے اثرات میں ہزار گنا قوت اور فوری قبولیت پیدا ہو جاتی ہے۔
                </p>
              </div>
            </div>
          </div>

          {/* Sharaf Planet Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {PLANETARY_SHARAF_DATABASE.map((sharaf) => {
              const isSelected = selectedSharafKey === sharaf.planetKey;
              const isSpecial = sharaf.planetKey === 'moon' || sharaf.planetKey === 'mercury';
              return (
                <button
                  key={sharaf.id}
                  onClick={() => setSelectedSharafKey(sharaf.planetKey)}
                  className={`p-3.5 rounded-2xl border-2 text-right transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'border-amber-600 bg-amber-100 ring-2 ring-amber-500/40 shadow-lg scale-105'
                      : 'border-[#d4a373]/50 bg-white hover:bg-amber-50/60'
                  }`}
                >
                  {isSpecial && (
                    <span className="absolute top-0 left-0 bg-amber-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-br-lg">
                      خاص
                    </span>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: sharaf.metalColor }} />
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md">
                      {sharaf.sharafDegree.split(' ')[0]}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-amiri text-base font-bold text-[#5d4037]">
                      {sharaf.planetNameUrdu.split(' ')[0]}
                    </h4>
                    <p className="text-[10px] text-amber-800 font-bold mt-0.5 line-clamp-1">
                      {sharaf.sharafZodiac}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Sharaf Interactive Plate & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sharaf Plate Left Visual */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl border-3 border-amber-500 bg-gradient-to-b from-[#2e1d0f] to-[#170e07] p-6 shadow-2xl text-amber-100 relative overflow-hidden">
                <div
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-40 pointer-events-none"
                  style={{ backgroundColor: activeSharaf.metalColor }}
                />

                {/* Sharaf Front/Back Toggle */}
                <div className="flex items-center justify-between pb-4 border-b border-amber-700/50">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 animate-pulse" />
                    <span className="text-xs font-bold text-yellow-300">
                      {sharafPlateSide === 'front' ? 'لوحِ شرف کا اگلا رخ (وفقِ شرف)' : 'لوحِ شرف کی پشت (عزیمت و منازل)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-amber-700/50 text-xs">
                    <button
                      onClick={() => setSharafPlateSide('front')}
                      className={`px-2.5 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                        sharafPlateSide === 'front' ? 'bg-amber-600 text-white' : 'text-amber-300 hover:bg-white/10'
                      }`}
                    >
                      سامنے کا رخ
                    </button>
                    <button
                      onClick={() => setSharafPlateSide('back')}
                      className={`px-2.5 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                        sharafPlateSide === 'back' ? 'bg-amber-600 text-white' : 'text-amber-300 hover:bg-white/10'
                      }`}
                    >
                      پشتِ لوح
                    </button>
                  </div>
                </div>

                {/* Metallic Sharaf Plate Display */}
                <div 
                  className="my-5 p-5 rounded-2xl border-4 bg-gradient-to-br transition-all duration-300 relative shadow-2xl text-center font-amiri select-none"
                  style={{
                    borderColor: activeSharaf.metalColor,
                    backgroundColor: activeSharaf.metalColor === '#dc2626' ? '#fee2e2' :
                                     activeSharaf.metalColor === '#94a3b8' ? '#f8fafc' :
                                     activeSharaf.metalColor === '#52525b' ? '#e4e4e7' :
                                     activeSharaf.metalColor === '#10b981' ? '#ecfdf5' :
                                     activeSharaf.metalColor === '#f43f5e' ? '#fff1f2' :
                                     activeSharaf.metalColor === '#6366f1' ? '#eef2ff' : '#fef9c3',
                    color: '#1a120c'
                  }}
                >
                  <div className="absolute top-2 right-3 text-xs font-bold opacity-80">ش ر ف</div>
                  <div className="absolute top-2 left-3 text-xs font-bold opacity-80">س ع د</div>
                  <div className="absolute bottom-2 right-3 text-xs font-bold opacity-80">ج ب ر و ت</div>
                  <div className="absolute bottom-2 left-3 text-xs font-bold opacity-80">م ل ک و ت</div>

                  <div className="text-center mb-3">
                    <span className="text-xs font-bold tracking-widest text-[#5d4037] block">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </span>
                    <h4 className="text-lg font-bold text-[#2c1e14] mt-1 border-b border-black/20 pb-1">
                      {activeSharaf.sharafTitleUrdu}
                    </h4>
                  </div>

                  {sharafPlateSide === 'front' ? (
                    <div className="space-y-3">
                      <div className="flex justify-around text-xs font-bold text-[#5d4037] bg-white/50 p-1.5 rounded-lg border border-black/10">
                        {activeSharaf.divineNames.slice(0, 4).map((asma, i) => (
                          <span key={i}>{asma}</span>
                        ))}
                      </div>

                      <div className="inline-block mx-auto bg-white/90 p-2.5 rounded-xl border-2 border-amber-900/30 shadow-md">
                        <div 
                          className="grid gap-1 text-center font-bold"
                          style={{
                            gridTemplateColumns: `repeat(${activeSharaf.wafqDimensions}, minmax(0, 1fr))`
                          }}
                        >
                          {activeSharaf.wafqGrid.map((row, rIdx) =>
                            row.map((cell, cIdx) => (
                              <div
                                key={`${rIdx}-${cIdx}`}
                                className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center border border-black/20 bg-amber-50/80 text-xs sm:text-sm font-bold text-[#2c1e14]"
                              >
                                {cell}
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="text-[11px] font-bold text-[#5d4037] bg-white/60 p-2 rounded-lg border border-black/10 flex items-center justify-between">
                        <span>موکلِ شرف: {activeSharaf.muwakkilUlwi}</span>
                        <span>خادمِ شرف: {activeSharaf.muwakkilSifli}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 py-2">
                      <div className="p-3 bg-white/80 rounded-xl border border-black/20">
                        <span className="text-[11px] font-bold text-[#5d4037] block mb-1">
                          آیتِ شرف و عزیمت:
                        </span>
                        <p className="text-sm font-bold text-[#1a120c] leading-relaxed">
                          {activeSharaf.quranicVerse}
                        </p>
                      </div>

                      <div className="p-3 bg-amber-100/80 rounded-xl border border-black/20 text-xs space-y-1 text-right">
                        <div><strong>برج و درجۂ شرف:</strong> {activeSharaf.sharafDegree}</div>
                        <div><strong>منزلِ فلکیہ:</strong> {activeSharaf.lunarMansion}</div>
                        <div><strong>دھاتِ مخصوصہ:</strong> {activeSharaf.metal}</div>
                        <div><strong>بخورِ شرف:</strong> {activeSharaf.incense}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Transfer Buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {onSendToNaqsh && (
                    <button
                      onClick={() => onSendToNaqsh(activeSharaf.adadBase)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white p-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <Award className="h-3.5 w-3.5" />
                      <span>نقش جنریٹر میں بھیجیں ({activeSharaf.adadBase})</span>
                    </button>
                  )}
                  {onSendToTakseer && (
                    <button
                      onClick={() => onSendToTakseer(activeSharaf.divineNames.join(' '))}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-white p-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <Flame className="h-3.5 w-3.5" />
                      <span>تکسیر میں استخراج کریں</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Sharaf Right Details Card */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-amber-200">
                  <div>
                    <span className="text-xs text-amber-800 font-bold block">مقامِ اوج و سعادت</span>
                    <h3 className="font-amiri text-2xl font-bold text-[#5d4037]">{activeSharaf.sharafTitleUrdu}</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    درجۂ شرف: {activeSharaf.sharafDegree}
                  </span>
                </div>

                {/* Timing & Astronomical Condition */}
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <Clock className="h-4 w-4 text-amber-700" />
                    <span>شرائطِ وقت و لمحۂ شرف:</span>
                  </div>
                  <p className="text-amber-950 font-medium leading-relaxed pr-6">
                    {activeSharaf.timingRule}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2 text-[11px] text-amber-900 font-bold border-t border-amber-200/60">
                    <span>منزلِ فلکی: {activeSharaf.lunarMansion}</span>
                    <span>ہبوط کا درجہ: {activeSharaf.hubootDegree}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#5d4037] flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>خاص فوائد و اثراتِ شرف:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activeSharaf.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preparation Steps */}
                <div className="space-y-2 pt-2 border-t border-amber-200">
                  <h4 className="text-xs font-bold text-[#5d4037] flex items-center gap-1.5">
                    <Flame className="h-4 w-4 text-amber-600" />
                    <span>طریقۂ تیاری و کتابتِ شرف:</span>
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {activeSharaf.preparationProtocol.map((proto, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-[#5d4037] font-medium">
                        <span className="h-5 w-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] shrink-0">
                          {idx + 1}
                        </span>
                        <span>{proto}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kash Al Barny Exaltation Note */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 border border-amber-300 text-xs text-amber-950 font-medium">
                  <div className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-amber-700" />
                    <span>کاش البرنی کا خاص تبصرہ برائے شرفِ کوکب:</span>
                  </div>
                  <p className="leading-relaxed">
                    {activeSharaf.kashAlBarnyNotes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: SEEKER PERSONALIZED TALISMAN GENERATOR (سائل کے نام و مقصد کی لوح)
         ========================================================================= */}
      {activeView === 'seeker-custom' && (
        <div className="space-y-6">
          {/* Seeker Introduction */}
          <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/80 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="p-3 bg-emerald-700 text-white rounded-2xl shadow-sm">
                  <Feather className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-amiri text-xl md:text-2xl font-bold text-emerald-950">
                    استخراجِ لوح برائے سائل و مقصدِ خاص
                  </h3>
                  <p className="text-xs text-emerald-800 font-medium mt-0.5">
                    سائل کا نام، والدہ کا نام اور نیت/مقصد درج کریں؛ سسٹم خودکار طور پر حسابی اوفاق، موکلین، عزیمت اور دھاتی لوح تیار کر دے گا۔
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Seeker Input Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl border-2 border-[#d4a373] bg-white p-5 shadow-sm space-y-4">
                <h4 className="font-amiri text-lg font-bold text-[#5d4037] pb-2 border-b border-[#d4a373]/40 flex items-center gap-2">
                  <User className="h-5 w-5 text-[#bc6c25]" />
                  <span>معلوماتِ سائل و نیت:</span>
                </h4>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-[#5d4037] block mb-1">نام سائل / طالب:</label>
                    <input
                      type="text"
                      value={inquirerName}
                      onChange={(e) => setInquirerName(e.target.value)}
                      placeholder="مثلاً: محمد احمد"
                      className="w-full p-2.5 rounded-xl border border-[#d4a373] bg-[#fdfaf1] focus:ring-2 focus:ring-[#bc6c25] outline-none font-bold text-sm"
                    />
                    <span className="text-[10px] text-gray-500 mt-0.5 block">
                      اعدادِ سائل: <strong className="text-[#bc6c25]">{inquirerAdad || 0}</strong>
                    </span>
                  </div>

                  <div>
                    <label className="font-bold text-[#5d4037] block mb-1">نام والدہ:</label>
                    <input
                      type="text"
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                      placeholder="مثلاً: فاطمہ بی بی"
                      className="w-full p-2.5 rounded-xl border border-[#d4a373] bg-[#fdfaf1] focus:ring-2 focus:ring-[#bc6c25] outline-none font-bold text-sm"
                    />
                    <span className="text-[10px] text-gray-500 mt-0.5 block">
                      اعدادِ والدہ: <strong className="text-[#bc6c25]">{motherAdad || 0}</strong>
                    </span>
                  </div>

                  <div>
                    <label className="font-bold text-[#5d4037] block mb-1">مخصوص مقصد یا نیت:</label>
                    <input
                      type="text"
                      value={purposeInput}
                      onChange={(e) => setPurposeInput(e.target.value)}
                      placeholder="مثلاً: ترقی ملازمت و وسعتِ رزق"
                      className="w-full p-2.5 rounded-xl border border-[#d4a373] bg-[#fdfaf1] focus:ring-2 focus:ring-[#bc6c25] outline-none font-medium text-xs"
                    />
                    <span className="text-[10px] text-gray-500 mt-0.5 block">
                      اعدادِ مقصد: <strong className="text-[#bc6c25]">{purposeAdad || 0}</strong>
                    </span>
                  </div>

                  {/* Purpose Presets Ribbon */}
                  <div className="pt-2 border-t border-[#d4a373]/30 space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-600 block">یا تیار مقاصد میں سے چنیں:</label>
                    <div className="flex flex-wrap gap-1.5">
                      {SEEKER_PURPOSE_PRESETS.map((pre) => (
                        <button
                          key={pre.id}
                          onClick={() => handleApplyPreset(pre)}
                          className={`text-[10px] px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                            selectedPurposePreset === pre.id
                              ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xs'
                              : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {pre.title.split(' ')[0]} {pre.title.split(' ')[1]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Manual Planet Override */}
                  <div className="pt-2 border-t border-[#d4a373]/30">
                    <label className="font-bold text-[#5d4037] block mb-1">سیارہ منتخب کریں یا خودکار چھوڑیں:</label>
                    <select
                      value={customPlanetChoice}
                      onChange={(e) => setCustomPlanetChoice(e.target.value)}
                      className="w-full p-2 rounded-xl border border-[#d4a373] bg-white text-xs font-bold text-[#5d4037] outline-none"
                    >
                      <option value="auto">خودکار تعین (حسبِ مقصد)</option>
                      <option value="sun">شمس (جاہ و حشمت، فتحِ حکام)</option>
                      <option value="moon">قمر (تسخیر، شفاء، الفت)</option>
                      <option value="mars">مریخ (شجاعت، دفعِ سحر و اعداء)</option>
                      <option value="mercury">عطارد (ذہانت، امتحانات، تجارت)</option>
                      <option value="jupiter">مشتری (دولت، وسعتِ رزق، غنا)</option>
                      <option value="venus">زہرہ (محبت، شادی، کشش)</option>
                      <option value="saturn">زحل (زبان بندی، حصار، قفل)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Seeker Calculations Summary */}
              <div className="rounded-2xl border-2 border-[#d4a373] bg-[#fdfaf1] p-4 shadow-sm space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-[#5d4037] pb-1 border-b border-[#d4a373]/40">
                  <span>مجموعہ اعدادِ کل:</span>
                  <span className="font-mono text-sm text-[#bc6c25]">{totalCalculatedAdad}</span>
                </div>
                <div className="flex items-center justify-between text-gray-700 font-medium">
                  <span>کوکبِ حاکم:</span>
                  <span className="font-bold text-[#5d4037]">{customPlanetData.planetNameUrdu}</span>
                </div>
                <div className="flex items-center justify-between text-gray-700 font-medium">
                  <span>موکلِ علوی:</span>
                  <span className="font-bold text-emerald-800 font-amiri text-sm">{seekerMuwakkilUlwi}</span>
                </div>
                <div className="flex items-center justify-between text-gray-700 font-medium">
                  <span>خادمِ سفلی:</span>
                  <span className="font-bold text-amber-800 font-amiri text-sm">{seekerMuwakkilSifli}</span>
                </div>
                <div className="flex items-center justify-between text-gray-700 font-medium">
                  <span>نوعیتِ وفق:</span>
                  <span className="font-bold text-[#bc6c25]">{customPlanetData.wafqType}</span>
                </div>
              </div>
            </div>

            {/* Seeker Plate & Generated Talisman */}
            <div className="lg:col-span-8 space-y-6">
              {/* Metallic Plate Render */}
              <div className="rounded-3xl border-3 border-[#d4a373] bg-gradient-to-b from-[#2b1e16] to-[#1a120c] p-6 shadow-xl text-[#fefae0]">
                {/* Plate Controls */}
                <div className="flex items-center justify-between pb-4 border-b border-amber-800/50">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-300">
                      لوحِ مخصوص برائے: {inquirerName || 'طالب'} بن/بنت {motherName || 'حوا'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-amber-800/40 text-xs">
                    <button
                      onClick={() => setCustomPlateSide('front')}
                      className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        customPlateSide === 'front' ? 'bg-emerald-700 text-white' : 'text-emerald-300 hover:bg-white/10'
                      }`}
                    >
                      روئے لوح (وفقِ حل شدہ)
                    </button>
                    <button
                      onClick={() => setCustomPlateSide('back')}
                      className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        customPlateSide === 'back' ? 'bg-emerald-700 text-white' : 'text-emerald-300 hover:bg-white/10'
                      }`}
                    >
                      پشتِ لوح (عزیمتِ سائل)
                    </button>
                  </div>
                </div>

                {/* Simulated Custom Metallic Plate */}
                <div 
                  className="my-5 p-5 rounded-2xl border-4 bg-gradient-to-br transition-all duration-300 relative shadow-inner text-center font-amiri select-none"
                  style={{
                    borderColor: customPlanetData.metalColor,
                    backgroundColor: customPlanetData.metalColor === '#dc2626' ? '#fee2e2' :
                                     customPlanetData.metalColor === '#94a3b8' ? '#f1f5f9' :
                                     customPlanetData.metalColor === '#52525b' ? '#e4e4e7' :
                                     customPlanetData.metalColor === '#10b981' ? '#d1fae5' :
                                     customPlanetData.metalColor === '#f43f5e' ? '#ffe4e6' :
                                     customPlanetData.metalColor === '#6366f1' ? '#e0e7ff' : '#fef3c7',
                    color: '#1a120c'
                  }}
                >
                  <div className="absolute top-2 right-3 text-xs font-bold opacity-70">ط ل س م</div>
                  <div className="absolute top-2 left-3 text-xs font-bold opacity-70">ق د و س</div>
                  <div className="absolute bottom-2 right-3 text-xs font-bold opacity-70">{seekerMuwakkilUlwi}</div>
                  <div className="absolute bottom-2 left-3 text-xs font-bold opacity-70">{seekerMuwakkilSifli}</div>

                  <div className="text-center mb-3">
                    <span className="text-xs font-bold tracking-widest text-[#5d4037] block">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </span>
                    <h4 className="text-lg font-bold text-[#2c1e14] mt-1 border-b border-black/20 pb-1">
                      لوحِ {customPlanetData.planetNameUrdu.split(' ')[0]} برائے {inquirerName || 'حاملِ لوح'}
                    </h4>
                  </div>

                  {customPlateSide === 'front' ? (
                    <div className="space-y-3">
                      <div className="flex justify-around text-xs font-bold text-[#5d4037] bg-white/50 p-1.5 rounded-lg border border-black/10">
                        {customPlanetData.divineNames.slice(0, 4).map((asma, i) => (
                          <span key={i}>{asma}</span>
                        ))}
                      </div>

                      {/* Solved Mathematical Grid */}
                      <div className="inline-block mx-auto bg-white/90 p-2.5 rounded-xl border-2 border-black/30 shadow-md">
                        <div 
                          className="grid gap-1 text-center font-bold"
                          style={{
                            gridTemplateColumns: `repeat(${customPlanetData.wafqDimensions}, minmax(0, 1fr))`
                          }}
                        >
                          {customWafqGrid.map((row, rIdx) =>
                            row.map((cell, cIdx) => (
                              <div
                                key={`${rIdx}-${cIdx}`}
                                className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center border border-black/20 bg-amber-50/70 text-xs sm:text-sm font-bold text-[#2c1e14]"
                              >
                                {cell}
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="text-[11px] font-bold text-[#5d4037] bg-white/60 p-2 rounded-lg border border-black/10 flex items-center justify-between">
                        <span>موکلِ علوی: {seekerMuwakkilUlwi}</span>
                        <span>خادمِ سفلی: {seekerMuwakkilSifli}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 py-2 text-right">
                      <div className="p-3 bg-white/80 rounded-xl border border-black/20 text-xs space-y-1.5">
                        <div className="font-bold text-[#5d4037]">عزیمتِ تسخیر و نفاذِ لوح:</div>
                        <p className="text-[11px] font-bold text-[#1a120c] leading-relaxed">
                          {seekerPersonalizedAzimah}
                        </p>
                      </div>

                      <div className="p-2.5 bg-amber-100/80 rounded-xl border border-black/20 text-xs space-y-1">
                        <div><strong>حاملِ لوح:</strong> {inquirerName || 'طالب'} بنت/بن {motherName || 'حوا'}</div>
                        <div><strong>مقصد:</strong> {purposeInput}</div>
                        <div><strong>کل اعدادِ مکتوب:</strong> <span className="font-mono font-bold">{totalCalculatedAdad}</span></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Seeker Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => handleCopy(seekerPersonalizedAzimah, 'custom-azimah')}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white p-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    {copiedKey === 'custom-azimah' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>عزیمت کاپی کریں</span>
                  </button>

                  {onSendToNaqsh && (
                    <button
                      onClick={() => onSendToNaqsh(totalCalculatedAdad)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-[#bc6c25] hover:bg-[#a2591d] text-white p-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <Award className="h-4 w-4" />
                      <span>نقش جنریٹر میں بھیجیں ({totalCalculatedAdad})</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Personalized Instructions for Seeker */}
              <div className="rounded-2xl border-2 border-emerald-300 bg-white p-5 shadow-sm space-y-3 text-xs">
                <h4 className="font-amiri text-base font-bold text-emerald-950 flex items-center gap-2 pb-2 border-b border-emerald-200">
                  <BookmarkCheck className="h-5 w-5 text-emerald-700" />
                  <span>سائل کے لیے لوح بنانے کی مخصوص شرائط و ہدایات:</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 font-medium">
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-900 block">۱. وقت و ساعت:</span>
                    <p>{customPlanetData.governingDay}، طلوعِ آفتاب کی پہلی ساعت میں۔</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-900 block">۲. دھات و قلم:</span>
                    <p>{customPlanetData.metal} یا سفید کاغذ پر زعفران و عرقِ گلاب سے۔</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-900 block">۳. بخوراتِ عمل:</span>
                    <p>{customPlanetData.incense}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-900 block">۴. ترویہ و تعدادِ ورد:</span>
                    <p>عزیمت کو روزانہ {totalCalculatedAdad % 1000 || 360} بار پڑھ کر لوح پر دم کریں۔</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 4: SAAD VS NAHS HOURS & OPERATIONAL TIMETABLE
         ========================================================================= */}
      {activeView === 'saad-nahs-guide' && (
        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-[#d4a373] bg-white p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#d4a373]/40">
              <div>
                <h3 className="font-amiri text-xl font-bold text-[#5d4037] flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#bc6c25]" />
                  <span>جدولِ اوقاتِ سعد و نحس برائے الواح و اعمالِ کواکب</span>
                </h3>
                <p className="text-xs text-[#8d6e63] font-medium mt-0.5">
                  کاش البرنی، شمس المعارف اور علم الساعات کے مطابق ہر سیارے کے موزوں اور ممنوعہ اوقات
                </p>
              </div>
              <span className="text-xs font-bold bg-[#faedcd] text-[#bc6c25] px-3 py-1 rounded-full border border-[#d4a373]">
                مستند تقویمی ضابطہ
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs border-collapse">
                <thead>
                  <tr className="bg-[#f2e8cf] text-[#5d4037] border-b border-[#d4a373]">
                    <th className="p-3 font-bold">کوکب / سیارہ</th>
                    <th className="p-3 font-bold text-emerald-800">اوقاتِ سعد (جلبِ خیر و فتح)</th>
                    <th className="p-3 font-bold text-red-800">اوقاتِ نحس (ممنوع یا دفعِ شر)</th>
                    <th className="p-3 font-bold">موزوں اعمال و لوح</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d4a373]/30">
                  {SAAD_NAHS_HOURS_GUIDE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#fdfaf1] transition-colors">
                      <td className="p-3 font-bold text-[#5d4037] font-amiri text-sm">{row.planet}</td>
                      <td className="p-3 text-emerald-950 font-medium bg-emerald-50/40">{row.saadTimes}</td>
                      <td className="p-3 text-red-950 font-medium bg-red-50/40">{row.nahsTimes}</td>
                      <td className="p-3 text-gray-700 font-medium">{row.actionRecommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Classical Warnings */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
              <h4 className="font-bold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 text-amber-700" />
                <span>قوانینِ احتیاط برائے اعمالِ سعد و نحس (از کاش البرنی):</span>
              </h4>
              <ul className="list-disc list-inside space-y-1 font-medium pr-2 text-gray-700">
                <li>قمر در عقرب کے ۲.۵ دن اور چاند کے تحت الشعاع ہونے کے دوران کوئی بھی سعد عمل یا لوح نہ بنائیں۔</li>
                <li>اعمالِ محبت، شفاء اور رزق ہمیشہ نوچندی ایام (چاند کی ۱ تا ۱۴ تاریخ) میں اور طلوعِ آفتاب کے فوراً بعد کی پہلی سعد ساعت میں کریں۔</li>
                <li>دفاعی اعمال، ابطالِ سحر اور زبان بندی کے اعمال منگل یا ہفتہ کے زوال و غروب کے وقت حصارِ کامل لگا کر کیے جائیں۔</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
