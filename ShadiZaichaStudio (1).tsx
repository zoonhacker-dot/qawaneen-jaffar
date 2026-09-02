import React, { useState, useMemo } from 'react';
import { 
  Heart, 
  Sparkles, 
  Flame, 
  Wind, 
  Droplets, 
  Mountain, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Printer, 
  Share2, 
  RefreshCw, 
  ChevronDown, 
  Search, 
  ShieldCheck, 
  BookOpen, 
  Compass, 
  Award,
  Layers
} from 'lucide-react';
import { calculateAbjad, normalizeJafrText } from '../utils/jafrEngine';
import { 
  ZODIAC_BURJ_LIST, 
  getZaichaMatch, 
  getElementalCompatibility, 
  ZAICHA_RULES_MAP,
  ZaichaMatchRule,
  ZodiacBurjInfo
} from '../data/shadiZaichaData';

interface ShadiZaichaStudioProps {
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
}

export const ShadiZaichaStudio: React.FC<ShadiZaichaStudioProps> = ({
  onSendToNaqsh,
  onSendToTakseer
}) => {
  // Input fields
  const [boyName, setBoyName] = useState<string>('علی');
  const [boyMotherName, setBoyMotherName] = useState<string>('سعدیہ');
  const [girlName, setGirlName] = useState<string>('حنا');
  const [girlMotherName, setGirlMotherName] = useState<string>('فرح');

  // Interactive Reference Table state
  const [selectedChartPair, setSelectedChartPair] = useState<{ r1: number; r2: number } | null>(null);
  const [tableFilter, setTableFilter] = useState<'all' | 'ok' | 'partially_ok' | 'not_ok'>('all');
  const [tableSearch, setTableSearch] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'calculator' | 'chart' | 'rules-guide'>('calculator');

  // Calculations
  const boyAnalysis = useMemo(() => {
    const nameRes = calculateAbjad(boyName);
    const motherRes = calculateAbjad(boyMotherName);
    const totalAdad = nameRes.totalKabir + motherRes.totalKabir;
    
    // Division by 12
    const quotient = Math.floor(totalAdad / 12);
    let remainder = totalAdad % 12;
    if (remainder === 0 && totalAdad > 0) remainder = 12;
    
    const burjInfo: ZodiacBurjInfo = ZODIAC_BURJ_LIST[remainder] || ZODIAC_BURJ_LIST[12];
    
    return {
      nameRes,
      motherRes,
      totalAdad,
      quotient,
      remainder,
      burjInfo
    };
  }, [boyName, boyMotherName]);

  const girlAnalysis = useMemo(() => {
    const nameRes = calculateAbjad(girlName);
    const motherRes = calculateAbjad(girlMotherName);
    const totalAdad = nameRes.totalKabir + motherRes.totalKabir;
    
    // Division by 12
    const quotient = Math.floor(totalAdad / 12);
    let remainder = totalAdad % 12;
    if (remainder === 0 && totalAdad > 0) remainder = 12;
    
    const burjInfo: ZodiacBurjInfo = ZODIAC_BURJ_LIST[remainder] || ZODIAC_BURJ_LIST[12];
    
    return {
      nameRes,
      motherRes,
      totalAdad,
      quotient,
      remainder,
      burjInfo
    };
  }, [girlName, girlMotherName]);

  // Overall Match Rule
  const matchResult: ZaichaMatchRule = useMemo(() => {
    if (boyAnalysis.totalAdad === 0 || girlAnalysis.totalAdad === 0) {
      return {
        r1: 0,
        r2: 0,
        status: 'ok',
        statusUrdu: 'درج کریں',
        statusColor: 'bg-stone-100 text-stone-700 border-stone-300',
        verdictTitleUrdu: 'براہِ کرم لڑکے اور لڑکی کے نام درج فرمائیں',
        verdictEnglish: 'Pending Input',
        detailUrdu: 'ناموں اور ماؤں کے نام درج کر کے حساب معلوم کریں۔'
      };
    }
    return getZaichaMatch(boyAnalysis.remainder, girlAnalysis.remainder);
  }, [boyAnalysis.remainder, girlAnalysis.remainder, boyAnalysis.totalAdad, girlAnalysis.totalAdad]);

  // Elemental Compatibility
  const elementalComp = useMemo(() => {
    return getElementalCompatibility(boyAnalysis.burjInfo.element, girlAnalysis.burjInfo.element);
  }, [boyAnalysis.burjInfo.element, girlAnalysis.burjInfo.element]);

  // Handle Preset Examples
  const loadExample1 = () => {
    // Example from the user's reference image
    setBoyName('علی');
    setBoyMotherName('سعدیہ');
    setGirlName('حنا');
    setGirlMotherName('فرح');
  };

  const loadExample2 = () => {
    setBoyName('محمد عثمان');
    setBoyMotherName('کلثوم');
    setGirlName('عائشہ');
    setGirlMotherName('خدیجہ');
  };

  const loadExample3 = () => {
    setBoyName('طارق');
    setBoyMotherName('نسیم');
    setGirlName('زینب');
    setGirlMotherName('پروین');
  };

  const handleClear = () => {
    setBoyName('');
    setBoyMotherName('');
    setGirlName('');
    setGirlMotherName('');
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper for Element Icon & Color
  const getElementBadge = (element: 'fire' | 'air' | 'water' | 'earth') => {
    switch (element) {
      case 'fire':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <Flame className="w-3.5 h-3.5 text-amber-600" /> آتشی (آگ)
          </span>
        );
      case 'air':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-900 border border-sky-300">
            <Wind className="w-3.5 h-3.5 text-sky-600" /> بادی (ہوا)
          </span>
        );
      case 'water':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
            <Droplets className="w-3.5 h-3.5 text-blue-600" /> آبی (پانی)
          </span>
        );
      case 'earth':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            <Mountain className="w-3.5 h-3.5 text-emerald-600" /> خاکی (مٹی)
          </span>
        );
    }
  };

  // Filtered Reference Table Pairs
  const filteredTableList = useMemo(() => {
    const list = Object.values(ZAICHA_RULES_MAP);
    return list.filter((item) => {
      if (tableFilter !== 'all' && item.status !== tableFilter) return false;
      if (tableSearch.trim()) {
        const query = tableSearch.toLowerCase().trim();
        const b1 = ZODIAC_BURJ_LIST[item.r1];
        const b2 = ZODIAC_BURJ_LIST[item.r2];
        const matchText = `${item.r1} ${item.r2} ${item.statusUrdu} ${item.verdictTitleUrdu} ${item.detailUrdu} ${b1?.nameUrdu} ${b2?.nameUrdu}`.toLowerCase();
        return matchText.includes(query);
      }
      return true;
    });
  }, [tableFilter, tableSearch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-[#2c1810] via-[#3d2314] to-[#1e1008] text-amber-50 p-6 md:p-8 shadow-xl border border-amber-900/40">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              حسابِ نکاح و شادی کا مستند زائچہ (Shadi Ka Zaicha)
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-amber-100 tracking-wide">
              حسابِ رشتہ و نکاح بر قاعدۂ ابجد و بروجِ دوازدہ گانہ
            </h1>
            <p className="text-amber-200/80 text-sm md:text-base max-w-2xl leading-relaxed">
              لڑکا، لڑکی اور ان کی ماؤں کے نام کے اعدادِ ابجد کبیر، ۱۲ پر تقسیم کے باقیات، عنصری امتزاج (آتش، باد، آب، خاک)، سیاروی اثرات، اور ۷۸ جوڑوں کے جدول کے تحت مکمل و مفصل تشریح۔
            </p>
          </div>

          {/* Action Quick Links */}
          <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-amber-500 text-stone-950 shadow-lg font-bold'
                  : 'bg-white/10 text-amber-100 hover:bg-white/20'
              }`}
            >
              حساب کار (Calculator)
            </button>
            <button
              onClick={() => setActiveTab('chart')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'chart'
                  ? 'bg-amber-500 text-stone-950 shadow-lg font-bold'
                  : 'bg-white/10 text-amber-100 hover:bg-white/20'
              }`}
            >
              مکمل ۷۸ جوڑوں کا جدول (Chart)
            </button>
            <button
              onClick={handlePrint}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 hover:text-white transition-all title='پرنٹ کریں'"
              title="پرنٹ کریں"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'calculator' ? (
        <>
          {/* Main Input Form */}
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md border border-amber-900/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-900/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                  ۱
                </span>
                <h2 className="text-lg font-bold text-[#2c1810]">
                  لڑکے اور لڑکی کے ناموں کا اندراج (Personal Data Entry)
                </h2>
              </div>

              {/* Presets */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-stone-500 font-medium">نمونہ مثالیں:</span>
                <button
                  onClick={loadExample1}
                  className="px-2.5 py-1 text-xs rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors font-medium"
                >
                  علی + سعدیہ & حنا + فرح (تصویر کی مثال)
                </button>
                <button
                  onClick={loadExample2}
                  className="px-2.5 py-1 text-xs rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200 transition-colors font-medium"
                >
                  عثمان & عائشہ
                </button>
                <button
                  onClick={handleClear}
                  className="p-1 text-xs rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                  title="خالی کریں"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 4 Input Boxes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Boy's Side */}
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-blue-900 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                    جانبِ لڑکا (Boy's Information)
                  </span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    مجموعہ اعداد: {boyAnalysis.totalAdad}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      لڑکے کا نام (Boy Name)
                    </label>
                    <input
                      type="text"
                      value={boyName}
                      onChange={(e) => setBoyName(e.target.value)}
                      placeholder="مثلاً: علی"
                      className="w-full px-3 py-2 text-base rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                    <span className="text-[11px] text-stone-500 mt-1 block">
                      اعداد: {boyAnalysis.nameRes.totalKabir}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      لڑکے کی والدہ کا نام (Mother Name)
                    </label>
                    <input
                      type="text"
                      value={boyMotherName}
                      onChange={(e) => setBoyMotherName(e.target.value)}
                      placeholder="مثلاً: سعدیہ"
                      className="w-full px-3 py-2 text-base rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                    <span className="text-[11px] text-stone-500 mt-1 block">
                      اعداد: {boyAnalysis.motherRes.totalKabir}
                    </span>
                  </div>
                </div>

                {/* Mathematical Division Breakdown Box */}
                <div className="p-3 rounded-lg bg-white border border-blue-100 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-stone-700">
                    <span>
                      {boyAnalysis.nameRes.totalKabir} + {boyAnalysis.motherRes.totalKabir} ={' '}
                      <strong className="text-blue-900">{boyAnalysis.totalAdad}</strong>
                    </span>
                    <span>
                      {boyAnalysis.totalAdad} ÷ 12 = {boyAnalysis.quotient} (خارج قسمت)
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-dashed border-stone-200">
                    <span className="text-stone-600">باقیہ (عددِ برج):</span>
                    <span className="font-bold text-base text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                      {boyAnalysis.remainder}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-stone-700 pt-1">
                    <span>برج و سیارہ:</span>
                    <span className="font-bold text-blue-900">
                      {boyAnalysis.burjInfo.nameUrdu} ({boyAnalysis.burjInfo.rulingPlanetUrdu})
                    </span>
                  </div>
                </div>
              </div>

              {/* Girl's Side */}
              <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-rose-900 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" />
                    جانبِ لڑکی (Girl's Information)
                  </span>
                  <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                    مجموعہ اعداد: {girlAnalysis.totalAdad}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      لڑکی کا نام (Girl Name)
                    </label>
                    <input
                      type="text"
                      value={girlName}
                      onChange={(e) => setGirlName(e.target.value)}
                      placeholder="مثلاً: حنا"
                      className="w-full px-3 py-2 text-base rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                    />
                    <span className="text-[11px] text-stone-500 mt-1 block">
                      اعداد: {girlAnalysis.nameRes.totalKabir}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      لڑکی کی والدہ کا نام (Mother Name)
                    </label>
                    <input
                      type="text"
                      value={girlMotherName}
                      onChange={(e) => setGirlMotherName(e.target.value)}
                      placeholder="مثلاً: فرح"
                      className="w-full px-3 py-2 text-base rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                    />
                    <span className="text-[11px] text-stone-500 mt-1 block">
                      اعداد: {girlAnalysis.motherRes.totalKabir}
                    </span>
                  </div>
                </div>

                {/* Mathematical Division Breakdown Box */}
                <div className="p-3 rounded-lg bg-white border border-rose-100 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-stone-700">
                    <span>
                      {girlAnalysis.nameRes.totalKabir} + {girlAnalysis.motherRes.totalKabir} ={' '}
                      <strong className="text-rose-900">{girlAnalysis.totalAdad}</strong>
                    </span>
                    <span>
                      {girlAnalysis.totalAdad} ÷ 12 = {girlAnalysis.quotient} (خارج قسمت)
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-dashed border-stone-200">
                    <span className="text-stone-600">باقیہ (عددِ برج):</span>
                    <span className="font-bold text-base text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                      {girlAnalysis.remainder}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-stone-700 pt-1">
                    <span>برج و سیارہ:</span>
                    <span className="font-bold text-rose-900">
                      {girlAnalysis.burjInfo.nameUrdu} ({girlAnalysis.burjInfo.rulingPlanetUrdu})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Graphical Result Presentation */}
          <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg border border-amber-900/10 space-y-8">
            {/* Primary Verdict Hero */}
            <div className={`p-6 rounded-2xl border-2 transition-all ${matchResult.statusColor} relative overflow-hidden`}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {matchResult.status === 'ok' ? (
                      <CheckCircle2 className="w-7 h-7 text-emerald-600 flex-shrink-0" />
                    ) : matchResult.status === 'not_ok' ? (
                      <XCircle className="w-7 h-7 text-rose-600 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-7 h-7 text-amber-600 flex-shrink-0" />
                    )}
                    <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/80 shadow-sm">
                      حکمِ قاعدہ: {matchResult.verdictEnglish}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold">
                    {matchResult.verdictTitleUrdu}
                  </h3>

                  <p className="text-sm md:text-base leading-relaxed max-w-3xl opacity-90">
                    {matchResult.detailUrdu}
                  </p>
                </div>

                {/* Score / Status Visual Pill */}
                <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/90 shadow-sm border border-black/5 min-w-[150px] text-center">
                  <span className="text-xs text-stone-500 font-medium">جوڑ نمبر جدول:</span>
                  <span className="text-2xl font-bold font-mono text-stone-800">
                    {boyAnalysis.remainder} × {girlAnalysis.remainder}
                  </span>
                  <span className="text-xs font-bold mt-1 text-stone-700">
                    {matchResult.statusUrdu}
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Pillars of Comprehensive Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pillar 1: Elements (عناصر) */}
              <div className="p-5 rounded-xl bg-amber-50/40 border border-amber-900/10 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-900/10 pb-2">
                  <h4 className="font-bold text-base text-[#2c1810] flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-700" />
                    عنصری تجزیہ و مطابقت (Elemental Harmony)
                  </h4>
                  <span className="text-xs text-stone-500">طبیعی اثرات</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                    <span className="text-stone-500 block mb-1">لڑکے کا عنصر:</span>
                    {getElementBadge(boyAnalysis.burjInfo.element)}
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                    <span className="text-stone-500 block mb-1">لڑکی کا عنصر:</span>
                    {getElementBadge(girlAnalysis.burjInfo.element)}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/80 border border-amber-200/70 text-xs space-y-1">
                  <strong className="text-amber-900 block font-bold">
                    {elementalComp.titleUrdu}
                  </strong>
                  <p className="text-stone-700 leading-relaxed">
                    {elementalComp.descUrdu}
                  </p>
                </div>
              </div>

              {/* Pillar 2: Zodiac & Planetary Synergy (سیاروی و بروجی اثرات) */}
              <div className="p-5 rounded-xl bg-purple-50/40 border border-purple-900/10 space-y-3">
                <div className="flex items-center justify-between border-b border-purple-900/10 pb-2">
                  <h4 className="font-bold text-base text-[#2c1810] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-700" />
                    سیاروی و بروجی تفاصیل (Planetary Alignment)
                  </h4>
                  <span className="text-xs text-stone-500">حاکم سیارے</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-stone-200 space-y-1">
                    <span className="text-stone-500 block">لڑکے کا برج:</span>
                    <strong className="text-stone-900 block text-sm">
                      {boyAnalysis.burjInfo.nameUrdu} ({boyAnalysis.burjInfo.nameEnglish})
                    </strong>
                    <span className="text-stone-600 block text-[11px]">
                      سیارہ: {boyAnalysis.burjInfo.rulingPlanetUrdu}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-stone-200 space-y-1">
                    <span className="text-stone-500 block">لڑکی کا برج:</span>
                    <strong className="text-stone-900 block text-sm">
                      {girlAnalysis.burjInfo.nameUrdu} ({girlAnalysis.burjInfo.nameEnglish})
                    </strong>
                    <span className="text-stone-600 block text-[11px]">
                      سیارہ: {girlAnalysis.burjInfo.rulingPlanetUrdu}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/80 border border-purple-200/70 text-xs space-y-1">
                  <strong className="text-purple-900 block font-bold">خصوصیاتِ فریقین:</strong>
                  <p className="text-stone-700 leading-relaxed">
                    <strong>لڑکا:</strong> {boyAnalysis.burjInfo.characteristicsUrdu}
                    <br />
                    <strong>لڑکی:</strong> {girlAnalysis.burjInfo.characteristicsUrdu}
                  </p>
                </div>
              </div>

              {/* Pillar 3: Temperament (طبیعی و نفسیاتی مزاج) */}
              <div className="p-5 rounded-xl bg-emerald-50/40 border border-emerald-900/10 space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-900/10 pb-2">
                  <h4 className="font-bold text-base text-[#2c1810] flex items-center gap-2">
                    <Compass className="w-4 h-4 text-emerald-700" />
                    نفسیاتی و طبعی مزاج (Temperament Analysis)
                  </h4>
                  <span className="text-xs text-stone-500">کیفیت</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                    <span className="text-stone-500 block">لڑکے کا مزاج:</span>
                    <strong className="text-emerald-900 text-sm">
                      {boyAnalysis.burjInfo.natureUrdu}
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                    <span className="text-stone-500 block">لڑکی کا مزاج:</span>
                    <strong className="text-emerald-900 text-sm">
                      {girlAnalysis.burjInfo.natureUrdu}
                    </strong>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/80 border border-emerald-200/70 text-xs space-y-1">
                  <strong className="text-emerald-900 block font-bold">
                    معاشرتی و ازدواجی رویہ:
                  </strong>
                  <p className="text-stone-700 leading-relaxed">
                    {boyAnalysis.burjInfo.natureUrdu === girlAnalysis.burjInfo.natureUrdu
                      ? 'دونوں فریقین ایک ہی کیفیت کے حامل ہیں، لہٰذا غصہ یا نرمی کے اوقات یکساں ہوں گے۔ ایک کو غصے کے وقت خاموش رہنا ہوگا۔'
                      : 'دونوں فریقین کے مزاج میں اعتدال اور توازن ہے۔ ایک فریق کی تیزی کو دوسرے فریق کی ٹھنڈک سنبھالے گی۔'}
                  </p>
                </div>
              </div>

              {/* Pillar 4: Spiritual Remedies & Asma (روحانی تدابیر و وظائف) */}
              <div className="p-5 rounded-xl bg-rose-50/40 border border-rose-900/10 space-y-3">
                <div className="flex items-center justify-between border-b border-rose-900/10 pb-2">
                  <h4 className="font-bold text-base text-[#2c1810] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-rose-700" />
                    روحانی تدابیر، صدقہ و اسما (Spiritual Remedies)
                  </h4>
                  <span className="text-xs text-stone-500">حفاظت و الفت</span>
                </div>

                <div className="p-3 rounded-lg bg-white/80 border border-rose-200/70 text-xs space-y-2">
                  <div>
                    <strong className="text-rose-900 block font-bold mb-1">وظیفہ و دعا:</strong>
                    <p className="text-stone-700 leading-relaxed">
                      {matchResult.remedyUrdu ||
                        'روزانہ بعد نمازِ عشاء سورۃ الفاتحہ اور سورۃ الاخلاص پڑھ کر باہمی الفت و سکون کی دعا فرمائیں۔'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-rose-100 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-stone-500">موافق پتھر: </span>
                      <strong className="text-stone-800">
                        {boyAnalysis.burjInfo.luckyStoneUrdu} / {girlAnalysis.burjInfo.luckyStoneUrdu}
                      </strong>
                    </div>
                    <div>
                      <span className="text-stone-500">موافق دن: </span>
                      <strong className="text-stone-800">
                        {boyAnalysis.burjInfo.luckyDayUrdu} و {girlAnalysis.burjInfo.luckyDayUrdu}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Quick Naqsh Action Button */}
                {onSendToNaqsh && (
                  <button
                    onClick={() => onSendToNaqsh(boyAnalysis.totalAdad + girlAnalysis.totalAdad)}
                    className="w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    مجموعی اعداد ({boyAnalysis.totalAdad + girlAnalysis.totalAdad}) کا نقشِ باہمی محبت بنائیں
                  </button>
                )}
              </div>
            </div>

            {/* Printable Detailed Report Footer */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
              <span>
                تاریخِ حساب: {new Date().toLocaleDateString('ur-PK', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span>
                بر بنیادِ کتبِ جفر و نجوم: کشف البرنی، شمس المعارف و مجرباتِ اکابر
              </span>
            </div>
          </div>
        </>
      ) : activeTab === 'chart' ? (
        /* Complete 78 Rules Reference Chart */
        <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-md border border-amber-900/10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-[#2c1810]">
                جدولِ کاملِ باہمی موافقت بروجِ دوازدہ گانہ (Complete 78 Marriage Compatibility Pairs)
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                ویڈیو اور تصویر کے مصدقہ فارمولے پر مبنی تمام ۷۸ جوڑوں کا جامع و مستند انسائیکلوپیڈیا۔
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  placeholder="تلاش کریں (مثلاً: 7 11 یا موافق)..."
                  className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              </div>

              <select
                value={tableFilter}
                onChange={(e) => setTableFilter(e.target.value as any)}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 bg-white text-stone-700 focus:outline-none"
              >
                <option value="all">تمام نتائج (All)</option>
                <option value="ok">صرف بہترین موافق (Ok)</option>
                <option value="partially_ok">جزوی موافق (Partially Ok)</option>
                <option value="not_ok">ناموافق (Not Ok)</option>
              </select>
            </div>
          </div>

          {/* Quick Matrix 12x12 Grid */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-stone-800">
              فوری میٹرکس کلک کار (Quick 12×12 Interactive Matrix)
            </h3>
            <p className="text-xs text-stone-500">
              کسی بھی خانے پر کلک کر کے دونوں باقیات کا تفصیلی حکم ملاحظہ فرمائیں۔
            </p>
            <div className="overflow-x-auto pb-2">
              <table className="w-full text-xs text-center border-collapse border border-stone-300 min-w-[600px]">
                <thead>
                  <tr className="bg-stone-100 font-bold text-stone-800">
                    <th className="border border-stone-300 p-2">باقیہ</th>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((col) => (
                      <th key={col} className="border border-stone-300 p-2">
                        {col}
                        <br />
                        <span className="text-[10px] font-normal text-stone-500">
                          {ZODIAC_BURJ_LIST[col]?.nameUrdu?.replace('برج ', '')}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((row) => (
                    <tr key={row}>
                      <td className="border border-stone-300 p-2 font-bold bg-stone-100 text-stone-800">
                        {row}
                        <br />
                        <span className="text-[10px] font-normal text-stone-500">
                          {ZODIAC_BURJ_LIST[row]?.nameUrdu?.replace('برج ', '')}
                        </span>
                      </td>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((col) => {
                        const rule = getZaichaMatch(row, col);
                        const isSelected =
                          selectedChartPair &&
                          ((selectedChartPair.r1 === row && selectedChartPair.r2 === col) ||
                            (selectedChartPair.r1 === col && selectedChartPair.r2 === row));

                        let bgClass = 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100';
                        if (rule.status === 'not_ok') {
                          bgClass = 'bg-rose-50 text-rose-800 hover:bg-rose-100';
                        } else if (rule.status === 'partially_ok') {
                          bgClass = 'bg-amber-50 text-amber-800 hover:bg-amber-100';
                        } else if (rule.status === 'conditional') {
                          bgClass = 'bg-blue-50 text-blue-800 hover:bg-blue-100';
                        }

                        return (
                          <td
                            key={col}
                            onClick={() => setSelectedChartPair({ r1: row, r2: col })}
                            className={`border border-stone-300 p-1.5 cursor-pointer transition-all ${bgClass} ${
                              isSelected ? 'ring-2 ring-amber-600 font-bold scale-105 z-10' : ''
                            }`}
                          >
                            <span className="block font-bold">
                              {rule.status === 'ok'
                                ? '✓'
                                : rule.status === 'not_ok'
                                ? '✕'
                                : rule.status === 'partially_ok'
                                ? '▲'
                                : '●'}
                            </span>
                            <span className="text-[9px] block leading-tight truncate">
                              {rule.verdictEnglish.split(' ')[0]}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Pair Detail Card */}
          {selectedChartPair && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  تفصیلِ جوڑ: عدد {selectedChartPair.r1} (
                  {ZODIAC_BURJ_LIST[selectedChartPair.r1]?.nameUrdu}) اور عدد {selectedChartPair.r2} (
                  {ZODIAC_BURJ_LIST[selectedChartPair.r2]?.nameUrdu})
                </h4>
                <button
                  onClick={() => setSelectedChartPair(null)}
                  className="text-xs text-stone-500 hover:text-stone-800"
                >
                  بند کریں ✕
                </button>
              </div>

              {(() => {
                const rule = getZaichaMatch(selectedChartPair.r1, selectedChartPair.r2);
                return (
                  <div className="space-y-1.5 text-xs text-stone-700">
                    <p>
                      <strong>حکمِ جدول:</strong>{' '}
                      <span className="font-bold text-amber-950">{rule.verdictTitleUrdu}</span> (
                      <span className="font-mono text-stone-600">{rule.verdictEnglish}</span>)
                    </p>
                    <p className="leading-relaxed">{rule.detailUrdu}</p>
                    {rule.remedyUrdu && (
                      <p className="text-emerald-900 bg-emerald-50/80 p-2 rounded border border-emerald-200">
                        <strong>تدبیر و تدارک:</strong> {rule.remedyUrdu}
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* Detailed List of Filtered Pairs */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-stone-800">
              فہرستِ جوڑ و مکمل وجوہات ({filteredTableList.length} جوڑے)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
              {filteredTableList.map((item, idx) => {
                const b1 = ZODIAC_BURJ_LIST[item.r1];
                const b2 = ZODIAC_BURJ_LIST[item.r2];
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-amber-400 transition-all space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-stone-100 font-mono font-bold text-stone-800 flex items-center justify-center">
                          {item.r1}
                        </span>
                        <span className="text-stone-400">×</span>
                        <span className="w-6 h-6 rounded-md bg-stone-100 font-mono font-bold text-stone-800 flex items-center justify-center">
                          {item.r2}
                        </span>
                        <span className="font-bold text-stone-900">
                          {b1?.nameUrdu} و {b2?.nameUrdu}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${item.statusColor}`}>
                        {item.verdictEnglish}
                      </span>
                    </div>

                    <h5 className="font-bold text-stone-900">{item.verdictTitleUrdu}</h5>
                    <p className="text-stone-600 leading-relaxed">{item.detailUrdu}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
