import React, { useState, useMemo } from 'react';
import { calculatePlanetaryHoursForDay } from '../utils/jafrEngine';
import { calculateLunarPhaseAndSpiritualInfluence, getHijriDateDetails, HIJRI_MONTHS } from '../utils/lunarEngine';
import { PlanetarySaat, LunarPhaseInfo } from '../types';
import { 
  Clock, 
  Sun, 
  Moon, 
  Sparkles, 
  Flame, 
  CheckCircle, 
  Shield, 
  Compass, 
  Calendar, 
  AlertTriangle, 
  BookOpen, 
  Star,
  Info,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';

interface SaatPlanetaryClockProps {
  onNavigateToEclipse?: () => void;
}

export const SaatPlanetaryClock: React.FC<SaatPlanetaryClockProps> = ({ onNavigateToEclipse }) => {
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());
  
  // Hijri Date controls & overrides
  const initialHijri = useMemo(() => getHijriDateDetails(new Date()), []);
  const [hijriDay, setHijriDay] = useState<number>(initialHijri.hijriDay);
  const [hijriMonth, setHijriMonth] = useState<number>(initialHijri.hijriMonth);
  const [showCustomDateModal, setShowCustomDateModal] = useState<boolean>(false);

  const daysList = [
    { idx: 0, name: 'اتوار (یکشنبہ)', ruler: 'شمس (سورج)' },
    { idx: 1, name: 'پیر (دوشنبہ)', ruler: 'قمر (چاند)' },
    { idx: 2, name: 'منگل (سہ شنبہ)', ruler: 'مریخ' },
    { idx: 3, name: 'بدھ (چہار شنبہ)', ruler: 'عطارد' },
    { idx: 4, name: 'جمعرات (پنجشنبہ)', ruler: 'مشتری' },
    { idx: 5, name: 'جمعہ (آدینہ)', ruler: 'زہرہ' },
    { idx: 6, name: 'ہفتہ (شنبہ)', ruler: 'زحل' },
  ];

  const planetaryHours: PlanetarySaat[] = useMemo(() => {
    return calculatePlanetaryHoursForDay(selectedDay);
  }, [selectedDay]);

  const lunarData: LunarPhaseInfo = useMemo(() => {
    return calculateLunarPhaseAndSpiritualInfluence(hijriDay, hijriMonth);
  }, [hijriDay, hijriMonth]);

  const isFullOrWaxing = lunarData.hijriDay <= 15;
  const isMahq = lunarData.phaseCategory === 'nahs_mahq';

  return (
    <div className="space-y-8" dir="rtl">
      {/* Top Banner */}
      <div className="rounded-2xl border-2 border-[#d4a373] bg-[#f2e8cf] p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#bc6c25] text-white shadow-sm">
                <Clock className="h-5 w-5" />
              </span>
              <h2 className="font-amiri text-2xl font-bold text-[#5d4037]">
                علم الساعات، منازلِ قمر و اوقاتِ کواکب
              </h2>
            </div>
            <p className="mt-1 text-sm text-[#8d6e63] max-w-3xl font-medium leading-relaxed">
              کاش البرنی کی کتاب "قوانینِ طلسم، مفتاح الجفر و منازلِ قمر" کے مطابق چاند کی گردش (ہلال تا بدر و محاق)، 28 منازلِ فلکی اور روزانہ 24 گھنٹوں کے حاکم سیارگان کا جامع و مستند علمی نقشہ۔
            </p>
          </div>

          {/* Quick Info Badge & Eclipse Studio Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex items-center gap-2 bg-[#fdfaf1] border border-[#d4a373] px-4 py-2 rounded-xl text-xs font-bold text-[#5d4037]">
              <Calendar className="h-4 w-4 text-[#bc6c25]" />
              <span>تاریخِ ہجری: {lunarData.hijriDay} {lunarData.hijriMonthNameUrdu} {lunarData.hijriYear}ھ</span>
            </div>

            {onNavigateToEclipse && (
              <button
                id="btn-goto-eclipse-studio"
                onClick={onNavigateToEclipse}
                className="flex items-center justify-center gap-1.5 bg-[#bc6c25] hover:bg-[#a2591d] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <Sun className="h-4 w-4" />
                <span>رصدِ کواکب و گرہن (کسوف و خسوف)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* LUNAR PHASE & PLANETARY INFLUENCE WIDGET */}
      <div className="rounded-2xl border-2 border-[#bc6c25]/40 bg-gradient-to-br from-[#fefae0] via-[#faedcd] to-[#f4ebe1] p-6 shadow-md relative overflow-hidden">
        {/* Header with Title & Date Adjuster */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-[#d4a373]/50">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#5d4037] text-[#dda15e] shadow-md flex items-center justify-center">
              <Moon className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-amiri text-xl font-bold text-[#5d4037]">
                  کیفیتِ قمر و منازلِ فلکی (Lunar Influence Widget)
                </h3>
                <span className="rounded-full bg-[#bc6c25] px-2.5 py-0.5 text-[10px] font-bold text-white">
                  کاش البرنی ضابطہ
                </span>
              </div>
              <p className="text-xs text-[#7f5539] font-medium mt-0.5">
                تاریخِ ہجری اور چاند کے 28 منازل کی بنیاد پر آج کے مستحب اور ممنوع روحانی اعمال
              </p>
            </div>
          </div>

          {/* Hijri Day Quick Selector */}
          <div className="flex flex-wrap items-center gap-2 bg-[#ffffff]/80 backdrop-blur-sm p-2 rounded-xl border border-[#d4a373]">
            <span className="text-xs font-bold text-[#5d4037] px-1 flex items-center gap-1">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#bc6c25]" />
              ہجری تاریخ کا انتخاب:
            </span>
            <div className="flex items-center gap-1">
              <button
                id="btn-hijri-prev"
                onClick={() => setHijriDay((prev) => (prev > 1 ? prev - 1 : 30))}
                className="px-2 py-1 bg-[#f2e8cf] hover:bg-[#faedcd] text-[#5d4037] rounded-lg text-xs font-bold transition-all cursor-pointer"
                title="پچھلا ہجری دن"
              >
                -
              </button>
              <select
                id="select-hijri-day"
                value={hijriDay}
                onChange={(e) => setHijriDay(Number(e.target.value))}
                className="bg-[#fdfaf1] border border-[#d4a373] text-[#5d4037] font-bold text-xs rounded-lg px-2 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#bc6c25]"
              >
                {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    {d} تاریخ ({d <= 14 ? 'نصفِ اول - متزاید' : d <= 27 ? 'نصفِ ثانی - متناقص' : 'محاق'})
                  </option>
                ))}
              </select>
              <select
                id="select-hijri-month"
                value={hijriMonth}
                onChange={(e) => setHijriMonth(Number(e.target.value))}
                className="bg-[#fdfaf1] border border-[#d4a373] text-[#5d4037] font-bold text-xs rounded-lg px-2 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#bc6c25]"
              >
                {HIJRI_MONTHS.map((m) => (
                  <option key={m.num} value={m.num}>
                    {m.nameUrdu}
                  </option>
                ))}
              </select>
              <button
                id="btn-hijri-next"
                onClick={() => setHijriDay((prev) => (prev < 30 ? prev + 1 : 1))}
                className="px-2 py-1 bg-[#f2e8cf] hover:bg-[#faedcd] text-[#5d4037] rounded-lg text-xs font-bold transition-all cursor-pointer"
                title="اگلا ہجری دن"
              >
                +
              </button>
              <button
                id="btn-hijri-today"
                onClick={() => {
                  const today = getHijriDateDetails(new Date());
                  setHijriDay(today.hijriDay);
                  setHijriMonth(today.hijriMonth);
                }}
                className="px-2.5 py-1 bg-[#bc6c25] hover:bg-[#a2591d] text-white rounded-lg text-xs font-bold transition-all cursor-pointer mr-1 shadow-sm"
              >
                آج کی تاریخ
              </button>
            </div>
          </div>
        </div>

        {/* Core Lunar Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {/* Card 1: Lunar Phase & Illumination */}
          <div className="bg-[#ffffff] rounded-2xl p-4 border border-[#e7d8c9] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#8d6e63]">حالتِ چاند (Lunar Phase)</span>
                <span className="text-[11px] font-bold text-[#bc6c25]">{lunarData.phaseNameEnglish}</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                {/* Visual Moon Circle */}
                <div className="relative w-14 h-14 rounded-full bg-[#283618] flex items-center justify-center shadow-inner shrink-0 overflow-hidden border border-[#d4a373]">
                  <div 
                    className="absolute inset-0 bg-[#dda15e] transition-all duration-500 rounded-full"
                    style={{ 
                      opacity: Math.max(0.15, lunarData.moonIlluminationPercent / 100),
                      transform: `scale(${Math.max(0.4, lunarData.moonIlluminationPercent / 100)})` 
                    }}
                  />
                  <Moon className="relative z-10 h-7 w-7 text-[#fefae0]" />
                </div>
                <div>
                  <h4 className="font-amiri text-lg font-bold text-[#5d4037]">{lunarData.phaseNameUrdu}</h4>
                  <div className="text-xs font-medium text-[#7f5539] mt-0.5">
                    ضیاء و روشنی: <span className="font-bold text-[#bc6c25]">{lunarData.moonIlluminationPercent}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Pill */}
            <div className="mt-4 pt-3 border-t border-[#f2e8cf]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8d6e63] font-medium">روحانی تاثیر:</span>
                <span 
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    isMahq 
                      ? 'bg-rose-100 text-rose-800' 
                      : isFullOrWaxing 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {lunarData.spiritualPotencyUrdu}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Manzil Al-Qamar (28 Mansions) */}
          <div className="bg-[#ffffff] rounded-2xl p-4 border border-[#e7d8c9] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#8d6e63]">منزلِ قمر (فلکی قیام گاہ)</span>
                <span className="text-[10px] font-bold bg-[#faedcd] text-[#5d4037] px-2 py-0.5 rounded-full">
                  منزل نمبر {lunarData.manzilAlQamar.number} از 28
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <h4 className="font-amiri text-xl font-bold text-[#bc6c25]">
                    {lunarData.manzilAlQamar.nameUrdu}
                  </h4>
                  <span className="text-xs text-[#8d6e63] font-serif">
                    ({lunarData.manzilAlQamar.nameArabic})
                  </span>
                </div>
                <p className="text-xs text-[#5d4037] font-medium mt-1">
                  خاصیت و دلالت: <span className="font-bold">{lunarData.manzilAlQamar.meaningUrdu}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#f2e8cf] flex items-center justify-between text-xs">
              <span className="text-[#8d6e63] font-medium">عنصرِ حاکم:</span>
              <span className="font-bold text-[#5d4037] bg-[#fdfaf1] px-2 py-0.5 rounded-md border border-[#e7d8c9]">
                عنصر {lunarData.manzilAlQamar.rulingElementUrdu}
              </span>
            </div>
          </div>

          {/* Card 3: Best Planetary Hours & Auspicious Times */}
          <div className="bg-[#ffffff] rounded-2xl p-4 border border-[#e7d8c9] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#8d6e63]">بہترین وقت برائے عمل (Auspicious Saat)</span>
                <Sparkles className="h-4 w-4 text-[#bc6c25]" />
              </div>
              <div className="mt-2 text-xs font-bold text-[#283618] bg-[#dce4c9]/60 p-2.5 rounded-xl border border-[#ccd5ae]">
                {lunarData.auspiciousSaatOfDay}
              </div>
              <div className="mt-2.5 text-xs text-[#5d4037]">
                <span className="text-[#8d6e63] font-medium block">مستحب بخور (دھونی):</span>
                <span className="font-bold text-[#bc6c25] mt-0.5 block">{lunarData.recommendedIncense}</span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#f2e8cf] text-xs">
              <span className="text-[#8d6e63] font-medium">اسم اعظم: </span>
              <span className="font-bold text-[#5d4037] font-amiri text-sm">{lunarData.recommendedIsmAzam}</span>
            </div>
          </div>
        </div>

        {/* Kash Al-Barni Specific Directives & Do's / Don'ts for Today */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Kash Al-Barni Treatise Quote */}
          <div className="lg:col-span-12 bg-[#fdfaf1] border-2 border-dashed border-[#d4a373] p-4 rounded-2xl flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#bc6c25]/20 text-[#bc6c25] shrink-0 mt-0.5">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#bc6c25] uppercase tracking-wider block">
                قانونِ کاش البرنی برائے تاریخِ مذکور
              </span>
              <p className="text-xs md:text-sm text-[#5d4037] font-medium mt-1 leading-relaxed italic">
                {lunarData.kashAlBarniLunarRule}
              </p>
              <div className="mt-2 text-xs text-[#7f5539] bg-[#ffffff] p-2 rounded-lg border border-[#e7d8c9] font-amiri">
                <span className="font-bold text-[#bc6c25]">آیت مبارکہ برائے ورد: </span>
                <span>{lunarData.recommendedDuaVerse}</span>
              </div>
            </div>
          </div>

          {/* Recommended Spiritual Works (مستحب و موزوں اعمال) */}
          <div className="lg:col-span-6 bg-[#ffffff] rounded-2xl p-5 border-2 border-[#606c38]/40 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-[#e7d8c9]">
              <CheckCircle className="h-5 w-5 text-[#283618]" />
              <h4 className="font-amiri text-lg font-bold text-[#283618]">
                مستحب و کامیاب روحانی اعمال (موافقِ قمر)
              </h4>
            </div>
            <ul className="mt-3 space-y-2 text-xs text-[#2c1e14] font-medium">
              {(lunarData?.recommendedSpiritualWorks || lunarData?.recommendedWorks || []).map((work, wIdx) => (
                <li key={wIdx} className="flex items-start gap-2 bg-[#fdfaf1] p-2.5 rounded-xl border border-[#e7d8c9]">
                  <span className="w-5 h-5 rounded-full bg-[#dce4c9] text-[#283618] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {wIdx + 1}
                  </span>
                  <span className="leading-relaxed">{work}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Restricted Spiritual Works (ناپسندیدہ و احتیاط والے اعمال) */}
          <div className="lg:col-span-6 bg-[#ffffff] rounded-2xl p-5 border-2 border-[#9d0208]/40 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-[#e7d8c9]">
              <AlertTriangle className="h-5 w-5 text-[#9d0208]" />
              <h4 className="font-amiri text-lg font-bold text-[#9d0208]">
                ناموزوں اعمال و ممنوعہ اوقات (احتیاط و توقف)
              </h4>
            </div>
            <ul className="mt-3 space-y-2 text-xs text-[#2c1e14] font-medium">
              {(lunarData?.restrictedSpiritualWorks || lunarData?.restrictedWorks || []).map((work, wIdx) => (
                <li key={wIdx} className="flex items-start gap-2 bg-[#fff5f5] p-2.5 rounded-xl border border-[#fecaca]">
                  <span className="w-5 h-5 rounded-full bg-[#fae1dd] text-[#9d0208] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    !
                  </span>
                  <span className="leading-relaxed text-[#7f1d1d]">{work}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* PLANETARY HOURS SECTION HEADER */}
      <div className="pt-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-amiri text-xl font-bold text-[#5d4037] flex items-center gap-2">
              <Sun className="h-5 w-5 text-[#bc6c25]" />
              جدولِ ساعاتِ یومیہ (Planetary Hours of the Day)
            </h3>
            <p className="text-xs text-[#8d6e63] font-medium">
              اپنے مطلوبہ دن کا انتخاب کر کے 12 گھنٹوں کے حاکم سیارے اور اعمال کی مطابقت دیکھیں
            </p>
          </div>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-2 bg-[#fdfaf1] rounded-2xl border border-[#d4a373]">
          {daysList.map((d) => (
            <button
              key={d.idx}
              id={`day-select-${d.idx}`}
              onClick={() => setSelectedDay(d.idx)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer flex-1 min-w-[120px] text-center ${
                selectedDay === d.idx
                  ? 'bg-[#bc6c25] text-white shadow-md'
                  : 'bg-[#ffffff] text-[#5d4037] hover:bg-[#faedcd] border border-[#e7d8c9]'
              }`}
            >
              <span>{d.name}</span>
              <span className="block text-[10px] opacity-85 font-medium mt-0.5">{d.ruler}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Planetary Hours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {planetaryHours.map((saat) => {
          const isSaad = saat.nature.includes('saad');
          const isNahs = saat.nature.includes('nahs');

          return (
            <div
              key={saat.hourIndex}
              className={`rounded-2xl border-2 p-5 shadow-sm transition-all hover:scale-[1.01] ${
                isSaad
                  ? 'border-[#606c38] bg-[#ffffff]'
                  : isNahs
                  ? 'border-[#9d0208] bg-[#ffffff]'
                  : 'border-[#d4a373] bg-[#ffffff]'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#e7d8c9]">
                <span className="text-xs font-bold text-[#8d6e63]">{saat.hourName}</span>
                <span
                  className={`rounded-full px-3 py-0.5 text-[11px] font-bold ${
                    isSaad
                      ? 'bg-[#dce4c9] text-[#283618]'
                      : isNahs
                      ? 'bg-[#fae1dd] text-[#9d0208]'
                      : 'bg-[#faedcd] text-[#bc6c25]'
                  }`}
                >
                  {saat.natureUrdu}
                </span>
              </div>

              {/* Planet Title */}
              <div className="my-3">
                <span className="text-xs text-[#8d6e63] font-medium block">حاکم کوکب و ستارہ:</span>
                <h3 className="font-amiri text-xl font-bold text-[#5d4037]">{saat.planetUrdu}</h3>
              </div>

              {/* Incense */}
              <div className="text-xs bg-[#fdfaf1] p-2.5 rounded-xl border border-[#e7d8c9] mb-3">
                <span className="text-[#8d6e63] font-medium block mb-0.5">مخصوص بخور (دھونی):</span>
                <span className="font-bold text-[#bc6c25]">{saat.incense}</span>
              </div>

              {/* Suitable Actions */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#5d4037]">موزوں و برکت والے اعمال:</span>
                <ul className="text-xs text-[#2c1e14] space-y-1.5 font-medium">
                  {saat.suitableActions.map((act, aIdx) => (
                    <li key={aIdx} className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-[#bc6c25] shrink-0" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
