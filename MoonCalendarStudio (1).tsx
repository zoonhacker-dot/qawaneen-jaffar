import React, { useState, useMemo, useEffect } from 'react';
import { 
  Moon, 
  Sun, 
  Calendar as CalendarIcon, 
  Sparkles, 
  Compass, 
  Clock, 
  ShieldAlert, 
  ShieldCheck, 
  Layers, 
  BookOpen, 
  Award, 
  Check, 
  Copy, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  AlertTriangle, 
  Droplets, 
  Flame, 
  Wind, 
  Mountain,
  Send,
  Zap,
  Activity,
  Printer
} from 'lucide-react';
import { 
  HIJRI_MONTHS, 
  LUNAR_MANSIONS, 
  getHijriDateDetails, 
  calculateLunarPhaseAndSpiritualInfluence 
} from '../utils/lunarEngine';
import { LocationMoonSaatTracker } from './LocationMoonSaatTracker';

interface MoonCalendarStudioProps {
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
}

export const MoonCalendarStudio: React.FC<MoonCalendarStudioProps> = ({
  onSendToNaqsh,
  onSendToTakseer
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [manualHijriDay, setManualHijriDay] = useState<number | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'location_saat_tracker' | 'realtime_moon' | 'mansions_28' | 'qamar_aqrab' | 'monthly_calendar' | 'ayyam_beed'>('location_saat_tracker');
  const [selectedMansionNum, setSelectedMansionNum] = useState<number>(1);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Real-time calculation based on selectedDate or manual overrides
  const lunarDetails = useMemo(() => {
    return calculateLunarPhaseAndSpiritualInfluence(
      manualHijriDay || undefined,
      undefined,
      selectedDate
    );
  }, [selectedDate, manualHijriDay]);

  const hijriCurrent = useMemo(() => {
    return getHijriDateDetails(selectedDate);
  }, [selectedDate]);

  // Handle previous / next day
  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d);
    setManualHijriDay(null);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d);
    setManualHijriDay(null);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
    setManualHijriDay(null);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Generate 30 days of the current Hijri Month for the monthly calendar grid
  const monthlyHijriDays = useMemo(() => {
    const list = [];
    for (let day = 1; day <= 30; day++) {
      const info = calculateLunarPhaseAndSpiritualInfluence(day, hijriCurrent.hijriMonth, selectedDate);
      list.push({
        day,
        info,
        isAyyamBeed: day === 13 || day === 14 || day === 15,
        isQamarDarAqrabEstimate: day === 18 || day === 19 || day === 20, // Traditional lunar mansion transit window
        isToday: day === (manualHijriDay || hijriCurrent.hijriDay)
      });
    }
    return list;
  }, [hijriCurrent, selectedDate, manualHijriDay]);

  // Selected mansion profile
  const selectedMansion = useMemo(() => {
    return LUNAR_MANSIONS.find(m => m.number === selectedMansionNum) || LUNAR_MANSIONS[0];
  }, [selectedMansionNum]);

  // Determine Qamar Dar Aqrab status
  const isQamarDarAqrab = useMemo(() => {
    const curDay = manualHijriDay || hijriCurrent.hijriDay;
    // Mansion 17 (الاکلیل), 18 (القلب / قلب العقرب), 19 (الشولة) represent the Scorpio Constellation
    return curDay === 17 || curDay === 18 || curDay === 19;
  }, [manualHijriDay, hijriCurrent]);

  return (
    <div className="space-y-8" dir="rtl">
      {/* Top Banner: Moon Calendar Studio Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121826] via-[#1a2333] to-[#0d1117] p-6 sm:p-8 text-white border-2 border-[#70a9a1] shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-[#70a9a1]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-[#bc6c25]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#70a9a1]/20 border border-[#70a9a1] text-[#cbe5e2] text-xs font-bold">
              <Moon className="h-4 w-4 text-[#70a9a1] animate-pulse" />
              <span>تقویمِ قمری، منازلِ قمر (۲۸ منزل) و احکامِ کواکب</span>
            </div>

            <h1 className="font-amiri text-2xl sm:text-3xl lg:text-4xl font-bold text-[#fefae0] leading-relaxed">
              تقویمِ قمری و احکامِ منازلِ قمر
              <span className="block text-lg sm:text-xl text-[#70a9a1] font-normal mt-1 font-amiri">
                رصدِ حالاتِ قمر، ایامِ بیض، قمر در عقرب و تعیینِ ساعاتِ کتابتِ نقوش
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-[#cbd5e1] max-w-3xl leading-relaxed">
              مطابق با قوانینِ مسلّمۂ <strong>کاش البرنی (قوانین طلسم و مفتاح الجفر)</strong> و <strong>حضرت مولانا محمد عمر سربازی رحمہ اللہ</strong>۔ 
              اعمالِ خیر، شفاء، وسعتِ رزق اور تسخیر کے نقوش کے لیے قمر کے نور میں اضافہ (نصفِ اول) اور امراض و سحر کے دفع کے لیے نصفِ ثانی و نزولِ نور کا مکمل سائنسی و روحانی حساب۔
            </p>
          </div>

          {/* Realtime Moon Phase Visual Badge */}
          <div className="shrink-0 flex flex-col items-center justify-center p-5 rounded-2xl bg-[#0b101b]/80 border-2 border-[#70a9a1]/60 shadow-xl text-center min-w-[200px]">
            <div className="relative h-16 w-16 mb-2 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#70a9a1] to-[#fefae0] opacity-30 blur-sm" />
              <div className="relative h-14 w-14 rounded-full bg-[#1a2333] border-2 border-[#70a9a1] flex items-center justify-center overflow-hidden shadow-inner">
                {/* Visual Representation of moon phase */}
                <div 
                  className="h-full bg-gradient-to-l from-[#fefae0] to-[#70a9a1] transition-all duration-500"
                  style={{ width: `${lunarDetails.moonIlluminationPercent}%` }}
                />
              </div>
            </div>
            <span className="font-mono text-sm text-[#fefae0] font-bold">
              ضیاء: {lunarDetails.moonIlluminationPercent}٪
            </span>
            <span className="font-amiri text-xs text-[#70a9a1] font-bold mt-0.5">
              {lunarDetails.hijriDateFormatted}
            </span>
            <span className="text-[10px] text-[#94a3b8] mt-0.5">
              منزل: {lunarDetails.lunarMansionNameUrdu}
            </span>
          </div>
        </div>

        {/* Studio Sub-Navigation */}
        <div className="mt-6 pt-4 border-t border-[#70a9a1]/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'location_saat_tracker', label: 'رصدِ قمر و ساعاتِ مکانی (GPS)', icon: Compass },
              { id: 'realtime_moon', label: 'رصدِ قمر و احکامِ یوم', icon: Moon },
              { id: 'monthly_calendar', label: 'ماہانہ قمری کلینڈر', icon: CalendarIcon },
              { id: 'mansions_28', label: '۲۸ منازلِ قمر و عزائم', icon: Layers },
              { id: 'qamar_aqrab', label: 'قمر در عقرب و نحوسات', icon: ShieldAlert },
              { id: 'ayyam_beed', label: 'ایامِ بیض (۱۳، ۱۴، ۱۵)', icon: Sparkles },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeSubTab === tab.id
                      ? 'bg-[#70a9a1] text-[#0f172a] shadow-lg font-extrabold ring-2 ring-[#70a9a1]/50'
                      : 'bg-[#1e293b] text-[#cbd5e1] hover:bg-[#334155] border border-[#70a9a1]/30'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevDay}
              className="p-2 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-[#cbd5e1] border border-[#70a9a1]/30"
              title="پچھلا دن"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={handleToday}
              className="px-3 py-1.5 rounded-lg bg-[#70a9a1]/20 hover:bg-[#70a9a1]/30 text-[#cbe5e2] text-xs font-bold border border-[#70a9a1]/50"
            >
              آج کا دن
            </button>
            <button
              onClick={handleNextDay}
              className="p-2 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-[#cbd5e1] border border-[#70a9a1]/30"
              title="اگلا دن"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 0: Interactive Location-based Moon Phase & Auspicious Saa't Tracking Widget */}
      {activeSubTab === 'location_saat_tracker' && (
        <LocationMoonSaatTracker
          onSendToNaqsh={onSendToNaqsh}
          onSendToTakseer={onSendToTakseer}
        />
      )}

      {/* SUB-TAB 1: Realtime Moon Status & Daily Work Rules */}
      {activeSubTab === 'realtime_moon' && (
        <div className="space-y-6">
          {/* Main Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Moon Phase & Visual Details */}
            <div className="p-6 rounded-2xl bg-[#fffef8] border-2 border-[#70a9a1] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#70a9a1]/20 text-[#0f172a] border border-[#70a9a1]">
                  حالتِ قمر (Phase)
                </span>
                <span className="text-xs font-mono text-[#64748b]">
                  {selectedDate.toLocaleDateString('ur-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>

              <div className="text-center py-3">
                <h3 className="font-amiri text-2xl font-bold text-[#1e293b]">
                  {lunarDetails.phaseNameUrdu}
                </h3>
                <p className="text-xs text-[#64748b] font-medium mt-1">
                  {lunarDetails.phaseNameEnglish}
                </p>
              </div>

              {/* Progress Bar of Illumination */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-[#334155]">
                  <span>نور و درخشندگی:</span>
                  <span className="font-mono">{lunarDetails.moonIlluminationPercent}٪</span>
                </div>
                <div className="w-full bg-[#e2e8f0] h-3 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="bg-gradient-to-l from-[#70a9a1] to-[#334155] h-full rounded-full transition-all duration-300"
                    style={{ width: `${lunarDetails.moonIlluminationPercent}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-[#cbd5e1] text-xs text-[#334155] space-y-1">
                <p><strong>روحانی قوت:</strong> {lunarDetails.spiritualPotencyUrdu}</p>
                <p><strong>تاریخِ ہجری:</strong> {lunarDetails.hijriDateFormatted}</p>
              </div>
            </div>

            {/* Card 2: Lunar Mansion (منزلِ قمر) */}
            <div className="p-6 rounded-2xl bg-[#fffef8] border-2 border-[#bc6c25] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#faedcd] text-[#bc6c25] border border-[#dda15e]">
                  منزلِ قمر (Lunar Mansion)
                </span>
                <span className="text-xs font-mono text-[#8d6e63]">
                  منزل نمبر: {lunarDetails.lunarMansionNumber} از ۲۸
                </span>
              </div>

              <div className="text-center py-3">
                <h3 className="font-amiri text-2xl font-bold text-[#bc6c25]">
                  {lunarDetails.lunarMansionNameArabic}
                </h3>
                <p className="text-xs text-[#5d4037] font-medium mt-1">
                  {lunarDetails.lunarMansionNameUrdu}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#fdfaf1] border border-[#dda15e] text-xs text-[#5d4037] space-y-1.5">
                <p><strong>مفہوم و تاثیر:</strong> {lunarDetails.lunarMansionMeaningUrdu}</p>
                <p><strong>عنصری حاکمیت:</strong> {lunarDetails.lunarMansionElementUrdu}</p>
              </div>

              <div className="text-center">
                <button
                  onClick={() => {
                    setSelectedMansionNum(lunarDetails.lunarMansionNumber);
                    setActiveSubTab('mansions_28');
                  }}
                  className="text-xs text-[#bc6c25] font-bold hover:underline"
                >
                  اس منزل کے تفصیلی نقوش و عزائم دیکھیں ←
                </button>
              </div>
            </div>

            {/* Card 3: Spiritual Saat & Incense Recommendations */}
            <div className="p-6 rounded-2xl bg-[#fffef8] border-2 border-[#606c38] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#ccd5ae] text-[#283618] border border-[#606c38]">
                  ہدایاتِ کتابت و بخور
                </span>
                <Clock className="h-4 w-4 text-[#606c38]" />
              </div>

              <div className="space-y-2 text-xs text-[#283618]">
                <div>
                  <strong>سعد ساعات:</strong>
                  <p className="p-2 rounded-lg bg-[#f4f7eb] border border-[#ccd5ae] mt-1 text-[#334155]">
                    {lunarDetails.auspiciousSaat}
                  </p>
                </div>

                <div>
                  <strong>موافق بخور و خوشبو:</strong>
                  <p className="p-2 rounded-lg bg-[#f4f7eb] border border-[#ccd5ae] mt-1 text-[#334155]">
                    {lunarDetails.recommendedIncense}
                  </p>
                </div>

                <div>
                  <strong>اسمِ اعظم برائے ورد:</strong>
                  <p className="p-2 rounded-lg bg-[#f4f7eb] border border-[#ccd5ae] mt-1 font-amiri font-bold text-sm text-[#283618]">
                    {lunarDetails.recommendedIsmAzam || lunarDetails.recommendedIsm || 'یا فتاح یا رزاق'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Permitted vs Restricted Operations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Permitted Works */}
            <div className="p-5 rounded-2xl bg-[#f4f7eb] border-2 border-[#606c38] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#283618] font-amiri text-lg font-bold">
                <ShieldCheck className="h-5 w-5 text-green-700" />
                <span>اعمالِ مجازہ و سعد (آج کے لیے موزوں اعمال)</span>
              </div>
              <ul className="space-y-2">
                {(lunarDetails.recommendedSpiritualWorks || lunarDetails.recommendedWorks || []).map((work, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#283618]">
                    <Check className="h-4 w-4 text-green-700 shrink-0 mt-0.5" />
                    <span>{work}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Restricted Works */}
            <div className="p-5 rounded-2xl bg-[#fdf2f2] border-2 border-[#e76f51] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#9a3412] font-amiri text-lg font-bold">
                <ShieldAlert className="h-5 w-5 text-red-700" />
                <span>اعمالِ ممنوعہ و محتاط (جن سے گریز لازم ہے)</span>
              </div>
              <ul className="space-y-2">
                {(lunarDetails.restrictedSpiritualWorks || lunarDetails.restrictedWorks || []).map((work, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#9a3412]">
                    <AlertTriangle className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
                    <span>{work}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Classical Treatise Quotation Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#2c1e14] to-[#3d2b1f] text-white border-2 border-[#dda15e] shadow-md space-y-3">
            <div className="flex items-center gap-2 text-[#dda15e]">
              <BookOpen className="h-5 w-5" />
              <span className="font-amiri font-bold text-base">قاعدۂ قمر از کاش البرنی و مولانا محمد عمر سربازیؒ</span>
            </div>
            <p className="text-xs sm:text-sm text-[#faedcd] leading-relaxed font-amiri">
              "{lunarDetails.kashAlBarniLunarRule}"
            </p>
            <div className="flex items-center justify-between text-xs text-[#dda15e] pt-2 border-t border-[#dda15e]/30">
              <span>آیتِ مبارکہ برائے ورد: <strong>{lunarDetails.recommendedDuaVerse || lunarDetails.recommendedVerse}</strong></span>
              <button
                onClick={() => handleCopy(lunarDetails.recommendedDuaVerse || lunarDetails.recommendedVerse || '', 'verse')}
                className="px-3 py-1 rounded bg-[#dda15e]/20 hover:bg-[#dda15e]/40 text-[#faedcd] transition-all cursor-pointer"
              >
                {copiedText === 'verse' ? 'کاپی ہو گئی' : 'آیت کاپی کریں'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Monthly Lunar Calendar Grid (30 Days) */}
      {activeSubTab === 'monthly_calendar' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#fffef8] border-2 border-[#70a9a1] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="font-amiri text-xl font-bold text-[#1e293b]">
                ماہنامہ تقویمِ قمر: {hijriCurrent.hijriMonthNameUrdu} ({hijriCurrent.hijriYear} ھ)
              </h2>
              <p className="text-xs text-[#64748b]">
                ہر قمری تاریخ پر کلک کر کے اس دن کا مکمل روحانی زائچہ، ضیاءِ قمر اور مناسب اعمال دیکھیں۔
              </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-[#e0f2fe] text-[#0369a1] font-bold border border-[#bae6fd]">
                نصفِ اول (نورِ متزاید - اعمالِ خیر)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#fef3c7] text-[#92400e] font-bold border border-[#fde68a]">
                ایامِ بیض (۱۳، ۱۴، ۱۵)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#fee2e2] text-[#991b1b] font-bold border border-[#fecaca]">
                قمر در عقرب / محاق
              </span>
            </div>
          </div>

          {/* 30 Days Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {monthlyHijriDays.map((item) => (
              <button
                key={item.day}
                onClick={() => {
                  setManualHijriDay(item.day);
                  setActiveSubTab('realtime_moon');
                }}
                className={`p-3 rounded-2xl text-right transition-all flex flex-col justify-between h-36 border-2 cursor-pointer relative overflow-hidden group hover:scale-[1.02] ${
                  item.isToday
                    ? 'bg-[#1e293b] text-white border-[#70a9a1] shadow-lg ring-2 ring-[#70a9a1]'
                    : item.isAyyamBeed
                    ? 'bg-[#fffbeb] text-[#78350f] border-[#f59e0b]'
                    : item.day > 15
                    ? 'bg-[#f8fafc] text-[#334155] border-[#cbd5e1]'
                    : 'bg-[#f0fdfa] text-[#134e4a] border-[#99f6e4]'
                }`}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-lg font-bold">
                    {item.day}
                  </span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-black/10">
                    {item.info.moonIlluminationPercent}٪
                  </span>
                </div>

                {/* Phase Short Name */}
                <div className="space-y-0.5 my-auto">
                  <p className="font-amiri text-xs font-bold truncate">
                    {item.info.phaseNameUrdu.split('(')[0]}
                  </p>
                  <p className="text-[10px] opacity-80 truncate">
                    منزل: {item.info.lunarMansionNameArabic}
                  </p>
                </div>

                {/* Badge for Special Days */}
                <div className="w-full text-center">
                  {item.isAyyamBeed ? (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#f59e0b] text-white block truncate">
                      ایامِ بیض (سعدِ اعظم)
                    </span>
                  ) : item.day >= 28 ? (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#ef4444] text-white block truncate">
                      محاق (احتیاط)
                    </span>
                  ) : item.day <= 14 ? (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#0d9488] text-white block truncate">
                      اعمالِ خیر و رزق
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#64748b] text-white block truncate">
                      دفعِ سحر و امراض
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: 28 Classical Lunar Mansions (منازل القمر) */}
      {activeSubTab === 'mansions_28' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#fffef8] border-2 border-[#70a9a1] shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-amiri text-xl font-bold text-[#1e293b]">
                دائرۂ ۲۸ منازلِ قمر مع عناصر و خواص
              </h2>
              <p className="text-xs text-[#64748b]">
                ہر منزل قمر کے فلکی مدار کا ایک برجوی حصہ ہے جس کے مخصوص موکلات، اسمائے حسنیٰ اور نقوش ہوتے ہیں۔
              </p>
            </div>

            {/* Quick Mansion Selector */}
            <select
              value={selectedMansionNum}
              onChange={(e) => setSelectedMansionNum(Number(e.target.value))}
              className="px-3 py-2 rounded-xl border border-[#70a9a1] bg-[#f0fdfa] text-xs sm:text-sm text-[#0f172a] font-bold focus:outline-none"
            >
              {LUNAR_MANSIONS.map(m => (
                <option key={m.number} value={m.number}>
                  {m.number}. {m.nameArabic} - {m.nameUrdu} ({m.rulingElementUrdu})
                </option>
              ))}
            </select>
          </div>

          {/* Selected Mansion Detailed Profile Card */}
          <div className="p-6 rounded-3xl bg-[#fffef8] border-2 border-[#70a9a1] shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#cbd5e1]">
              <div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#70a9a1]/20 text-[#0f172a] border border-[#70a9a1]">
                  منزل نمبر {selectedMansion.number} از ۲۸
                </span>
                <h3 className="font-amiri text-2xl sm:text-3xl font-bold text-[#1e293b] mt-2">
                  {selectedMansion.nameArabic} — {selectedMansion.nameUrdu}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-[#faedcd] text-[#bc6c25] font-bold text-xs border border-[#dda15e]">
                  عنصر: {selectedMansion.rulingElementUrdu}
                </span>
                {onSendToNaqsh && (
                  <button
                    onClick={() => onSendToNaqsh(selectedMansion.number * 786)}
                    className="px-3 py-1.5 rounded-xl bg-[#bc6c25] hover:bg-[#a2581d] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>نقش جنریٹر میں بھیجیں</span>
                  </button>
                )}
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#f0fdfa] border border-[#99f6e4] space-y-1">
                  <span className="text-xs font-bold text-[#0d9488]">روحانی تاثر و مفہوم:</span>
                  <p className="text-sm font-amiri text-[#134e4a] leading-relaxed">
                    {selectedMansion.meaningUrdu}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#fffbeb] border border-[#fde68a] space-y-1">
                  <span className="text-xs font-bold text-[#b45309]">مناسب اعمال و نقوش:</span>
                  <p className="text-xs text-[#78350f] leading-relaxed">
                    جب قمر منزلِ {selectedMansion.nameArabic} میں ہو تو اس عنصر ({selectedMansion.rulingElementUrdu}) کے مطابق نقوش لکھنا سریع التاثیر ہوتا ہے۔
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#cbd5e1] space-y-2">
                  <span className="text-xs font-bold text-[#334155]">تمام ۲۸ منازل کی فوری فہرست:</span>
                  <div className="grid grid-cols-4 gap-1.5 max-h-48 overflow-y-auto p-1">
                    {LUNAR_MANSIONS.map(m => (
                      <button
                        key={m.number}
                        onClick={() => setSelectedMansionNum(m.number)}
                        className={`p-1.5 rounded-lg text-center text-xs font-bold transition-all ${
                          m.number === selectedMansionNum
                            ? 'bg-[#70a9a1] text-[#0f172a] shadow-xs'
                            : 'bg-white hover:bg-[#e2e8f0] text-[#475569] border border-[#e2e8f0]'
                        }`}
                      >
                        {m.number}. {m.nameArabic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Qamar Dar Aqrab (قمر در عقرب) Alert & Guide */}
      {activeSubTab === 'qamar_aqrab' && (
        <div className="space-y-6">
          {/* Main Warning & Status */}
          <div className={`p-6 rounded-3xl border-2 shadow-lg space-y-4 ${
            isQamarDarAqrab 
              ? 'bg-gradient-to-br from-[#450a0a] to-[#7f1d1d] text-white border-red-500' 
              : 'bg-[#fffef8] border-[#22c55e] text-[#1e293b]'
          }`}>
            <div className="flex items-center gap-3">
              <ShieldAlert className={`h-8 w-8 ${isQamarDarAqrab ? 'text-red-300 animate-bounce' : 'text-green-600'}`} />
              <div>
                <h3 className="font-amiri text-2xl font-bold">
                  {isQamarDarAqrab ? 'انتباہ: قمر در عقرب کا دورانیہ فعال ہے!' : 'بحمد اللہ: قمر در عقرب کی نحوست نہیں ہے'}
                </h3>
                <p className="text-xs opacity-90">
                  {isQamarDarAqrab 
                    ? 'اس وقت قمر برجِ عقرب کے درجات میں سے گزر رہا ہے، خیر کے کاموں سے اجتناب کریں۔'
                    : 'قمر مبارک و سعد بروج میں سفر کر رہا ہے، اعمالِ خیر و کتابتِ نقوش جائز ہیں۔'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/20 border border-white/20 text-xs sm:text-sm leading-relaxed space-y-2">
              <p><strong>قمر در عقرب کیا ہے؟</strong> علمِ نجوم و جفر کے مطابق جب چاند برجِ عقرب میں داخل ہوتا ہے (جو کہ ہر ماہ تقریباً ۵۴ تا ۶۰ گھنٹے رہتا ہے)، تو اس دوران انسان کے باطن پر نحس اثرات غالب ہوتے ہیں۔</p>
              <p><strong>اکابر کا اجماع:</strong> حضرت مولانا محمد عمر سربازی رحمہ اللہ اور کاش البرنی دونوں متفق ہیں کہ اس دوران شادی، نکاح، کاروبار کا افتتاح، نیا سفر، اور محبت کے نقوش لکھنا سخت نامبارک اور بے برکت ہوتا ہے۔</p>
            </div>
          </div>

          {/* Rules & Exceptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-[#fffef8] border-2 border-[#ef4444] shadow-xs space-y-3">
              <h4 className="font-amiri text-lg font-bold text-[#b91c1c] flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>قمر در عقرب میں قطعی ممنوعہ امور:</span>
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#450a0a]">
                <li>• عقدِ نکاح، رشتہ طے کرنا اور شادی کی تاریخ مقرر کرنا۔</li>
                <li>• نئے مکان کی بنیاد رکھنا یا نئی دکان کا افتتاح۔</li>
                <li>• نقوشِ محبت، الفت، اور کشائشِ رزق تحریر کرنا۔</li>
                <li>• اہم تجارتی معاہدات اور دور دراز کا سفر شروع کرنا۔</li>
                <li>• آپریشن یا اہم طبی سرجری کی ابتدا (سوائے ایمرجنسی)۔</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#fffef8] border-2 border-[#16a34a] shadow-xs space-y-3">
              <h4 className="font-amiri text-lg font-bold text-[#15803d] flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <span>قمر در عقرب میں مستحب اور جائز امور:</span>
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#14532d]">
                <li>• کثرت سے استغفار، درود شریف اور صدقہ نکالنا۔</li>
                <li>• سحر، جادو، اور شیطانی اثرات کے توڑ کے جلالی نقوش لکھنا۔</li>
                <li>• دشمنوں کے شر سے بچاؤ کے لیے آیت الکرسی کا پختہ حصار کھینچنا۔</li>
                <li>• پرانے امراض کے خاتمے اور علاج کے لیے ادویات کا استعمال۔</li>
                <li>• اعتکاف اور گوشہ نشینی میں ذکر و تلاوت۔</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: Ayyam-ul-Beed (ایامِ بیض - 13, 14, 15) */}
      {activeSubTab === 'ayyam_beed' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#0f172a] text-white border-2 border-[#f59e0b] shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-[#fbbf24] animate-spin" />
              <div>
                <h3 className="font-amiri text-2xl font-bold text-[#fef3c7]">
                  فضیلت و احکامِ ایامِ بیض (۱۳، ۱۴، ۱۵ قمری تاریخیں)
                </h3>
                <p className="text-xs text-[#cbd5e1]">
                  چاند کی چودھویں، پندرہویں اور تیرہویں راتیں جب چاندنی اپنے شباب پر ہوتی ہے۔
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#faedcd] leading-relaxed font-amiri">
              حدیثِ شریف میں رسول اللہ ﷺ نے ہر ماہ ایامِ بیض (۱۳، ۱۴، ۱۵) کے روزے رکھنے کی خاص تاکید فرمائی ہے۔ 
              علمِ جفر و نقوش کے تمام اکابر کے نزدیک یہ تین دن <strong>سعدِ اعظم</strong> شمار ہوتے ہیں۔ 
              ان دنوں میں لکھی گئی الواح، شفا کے نقوش، اور رزق و تسخیر کے اعمال تیر بہدف اثر رکھتے ہیں۔
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/10 border border-[#fbbf24]/40 text-center">
                <span className="text-xs text-[#fbbf24] font-bold">۱۳ قمری:</span>
                <p className="text-xs text-white font-amiri mt-1">آغازِ بدر و حصولِ برکت و شفا</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-[#fbbf24]/40 text-center">
                <span className="text-xs text-[#fbbf24] font-bold">۱۴ قمری:</span>
                <p className="text-xs text-white font-amiri mt-1">اوجِ کمالِ نور و کتابتِ لوحِ معظم</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-[#fbbf24]/40 text-center">
                <span className="text-xs text-[#fbbf24] font-bold">۱۵ قمری:</span>
                <p className="text-xs text-white font-amiri mt-1">تکمیلِ عمل و تقسیمِ فیوضاتِ غیبی</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
