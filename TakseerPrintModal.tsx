import React, { useState, useRef } from 'react';
import { TakseerResult } from '../types';
import { calculateAbjad, calculatePlanetaryHoursForDay } from '../utils/jafrEngine';
import { 
  Printer, 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  FileText, 
  Sliders, 
  Layers, 
  Feather, 
  BookOpen, 
  Flame, 
  Award, 
  Calendar,
  Compass,
  Download
} from 'lucide-react';

interface TakseerPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputText: string;
  takseerResult: TakseerResult;
}

type ParchmentTheme = 'golden' | 'ivory' | 'saffron' | 'silver';

export const TakseerPrintModal: React.FC<TakseerPrintModalProps> = ({
  isOpen,
  onClose,
  inputText,
  takseerResult,
}) => {
  const [theme, setTheme] = useState<ParchmentTheme>('golden');
  const [includeBismillah, setIncludeBismillah] = useState<boolean>(true);
  const [includeMetadata, setIncludeMetadata] = useState<boolean>(true);
  const [includeTable, setIncludeTable] = useState<boolean>(true);
  const [includeAzimat, setIncludeAzimat] = useState<boolean>(true);
  const [includeSeal, setIncludeSeal] = useState<boolean>(true);
  const [includeInstructions, setIncludeInstructions] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const abjadInfo = calculateAbjad(inputText);
  const now = new Date();
  const dayIndex = now.getDay();
  const dayHours = calculatePlanetaryHoursForDay(dayIndex);
  const currentHourIdx = Math.min(Math.floor((now.getHours() * 12) / 24), 11);
  const currentSaat = dayHours[currentHourIdx] || dayHours[0];

  const currentDate = now.toLocaleDateString('ur-PK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  const copyFullSheetText = () => {
    let sheetText = `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nلوحِ تکسیر صدر و مؤخر (قوانین کاش البرنی)\n`;
    sheetText += `کلمۂ اساس: ${inputText} | عددِ ابجد: ${abjadInfo.totalKabir}\n`;
    sheetText += `تعداد سطور: ${takseerResult.totalCycles} | حالتِ زمام: ${takseerResult.zamamaReached ? 'مکمل' : 'جاری'}\n\n`;
    sheetText += `=== جدولِ تکسیر ===\n`;
    takseerResult.steps.forEach((s) => {
      sheetText += `سطر ${s.stepNumber}: ${s.letters.join(' ')}  |  اسم عزیمت: ${s.extractedName}\n`;
    });
    sheetText += `\nخاتمِ طلسماتی: ${takseerResult.talismanicSeal}\n`;
    sheetText += `اسمائے استخراجی: ${takseerResult.extractedAzimat.join(' - ')}\n`;
    sheetText += `\nدستور العمل: باوضو قبلہ رخ زعفران و گلاب سے تحریر کریں۔`;

    navigator.clipboard.writeText(sheetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Theme Styles Dictionary
  const themeStyles = {
    golden: {
      bg: 'bg-[#fdf8eb]',
      borderColor: 'border-[#b68944]',
      headerBg: 'bg-[#f4e6c8]',
      accentColor: 'text-[#8c5717]',
      secondaryAccent: 'text-[#5d4037]',
      tableHeaderBg: 'bg-[#edd9b2]',
      tagBg: 'bg-[#f3e3be]',
      watermark: 'rgba(182, 137, 68, 0.04)',
      sealBg: 'bg-[#f8ede0]',
      outerFrame: 'border-[#9c6a2c]',
    },
    ivory: {
      bg: 'bg-[#faf7f2]',
      borderColor: 'border-[#6c584c]',
      headerBg: 'bg-[#ebe3d5]',
      accentColor: 'text-[#3d312a]',
      secondaryAccent: 'text-[#4a3b32]',
      tableHeaderBg: 'bg-[#e2d8c7]',
      tagBg: 'bg-[#e9e1d2]',
      watermark: 'rgba(108, 88, 76, 0.04)',
      sealBg: 'bg-[#f2ece1]',
      outerFrame: 'border-[#58473c]',
    },
    saffron: {
      bg: 'bg-[#fff9f0]',
      borderColor: 'border-[#c85a17]',
      headerBg: 'bg-[#fee4cb]',
      accentColor: 'text-[#a13b00]',
      secondaryAccent: 'text-[#6c2800]',
      tableHeaderBg: 'bg-[#fcd5b5]',
      tagBg: 'bg-[#fedec2]',
      watermark: 'rgba(200, 90, 23, 0.04)',
      sealBg: 'bg-[#ffeedd]',
      outerFrame: 'border-[#b54a0d]',
    },
    silver: {
      bg: 'bg-[#f4f6f8]',
      borderColor: 'border-[#52616b]',
      headerBg: 'bg-[#dde2e6]',
      accentColor: 'text-[#1e2a38]',
      secondaryAccent: 'text-[#334252]',
      tableHeaderBg: 'bg-[#cfd7dc]',
      tagBg: 'bg-[#d8e0e5]',
      watermark: 'rgba(82, 97, 107, 0.04)',
      sealBg: 'bg-[#eaf0f4]',
      outerFrame: 'border-[#3e4c56]',
    },
  }[theme];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#fdfaf1] rounded-2xl border-2 border-[#d4a373] shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top Action Header (Not printed) */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-[#d4a373] bg-[#f2e8cf]">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#bc6c25] text-white shadow-xs">
              <Printer className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-amiri text-xl font-bold text-[#5d4037]">
                روایتی قرطاس و لوحِ تکسیر پرنٹ اسٹوڈیو
              </h3>
              <p className="text-xs text-[#8d6e63] font-medium">
                تکسیرِ صدر و مؤخر کو روایتی کاغذ، حواشی اور مہرِ روحانی کے ساتھ پرنٹ اور محفوظ کریں
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              id="btn-trigger-print"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#bc6c25] hover:bg-[#9c581e] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer font-amiri"
            >
              <Printer className="h-4 w-4" />
              <span>براہِ راست پرنٹ (Ctrl+P)</span>
            </button>

            <button
              onClick={copyFullSheetText}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#d4a373] bg-[#faedcd] hover:bg-[#f9f4e8] text-xs font-bold text-[#5d4037] transition-all cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-[#bc6c25]" />}
              <span>{copied ? 'نقل ہو گیا' : 'متن نقل کریں'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-[#d4a373] bg-[#faedcd] hover:bg-[#f2e8cf] text-[#5d4037] transition-colors cursor-pointer"
              title="بند کریں"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Customization Toolbar (Not printed) */}
        <div className="no-print bg-[#faedcd] px-6 py-3 border-b border-[#d4a373] flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Paper Theme Chooser */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#5d4037]">طرزِ قرطاس (کاغذ):</span>
            <div className="flex items-center gap-1.5">
              {[
                { id: 'golden', label: 'قرطاسِ قدیم (طلائی)', color: '#b68944' },
                { id: 'ivory', label: 'قرطاسِ شاہی (عاجی)', color: '#6c584c' },
                { id: 'saffron', label: 'قرطاسِ زعفرانی (سرخ)', color: '#c85a17' },
                { id: 'silver', label: 'لوحِ نقرئی (سیمیں)', color: '#52616b' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as ParchmentTheme)}
                  className={`px-2.5 py-1 rounded-lg font-amiri font-bold transition-all cursor-pointer ${
                    theme === t.id
                      ? 'bg-[#bc6c25] text-white shadow-xs'
                      : 'bg-white text-[#5d4037] border border-[#d4a373] hover:bg-[#f9f4e8]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Sections */}
          <div className="flex items-center gap-3 flex-wrap">
            <label className="flex items-center gap-1.5 cursor-pointer text-[#5d4037] font-medium">
              <input
                type="checkbox"
                checked={includeBismillah}
                onChange={(e) => setIncludeBismillah(e.target.checked)}
                className="accent-[#bc6c25] rounded-xs"
              />
              <span>تسمیہ و طغریٰ</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-[#5d4037] font-medium">
              <input
                type="checkbox"
                checked={includeMetadata}
                onChange={(e) => setIncludeMetadata(e.target.checked)}
                className="accent-[#bc6c25] rounded-xs"
              />
              <span>کوائف و ساعت</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-[#5d4037] font-medium">
              <input
                type="checkbox"
                checked={includeTable}
                onChange={(e) => setIncludeTable(e.target.checked)}
                className="accent-[#bc6c25] rounded-xs"
              />
              <span>جدولِ تکسیر</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-[#5d4037] font-medium">
              <input
                type="checkbox"
                checked={includeSeal}
                onChange={(e) => setIncludeSeal(e.target.checked)}
                className="accent-[#bc6c25] rounded-xs"
              />
              <span>خاتمِ طلسماتی</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-[#5d4037] font-medium">
              <input
                type="checkbox"
                checked={includeInstructions}
                onChange={(e) => setIncludeInstructions(e.target.checked)}
                className="accent-[#bc6c25] rounded-xs"
              />
              <span>دستور العمل</span>
            </label>
          </div>
        </div>

        {/* Scrollable Preview Area with the Printable Parchment Sheet */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#8d6e63]/10 flex justify-center">
          {/* ========================================================================= */}
          {/* THE CLASSICAL PARCHMENT MANUSCRIPT SHEET (PRINTABLE) */}
          {/* ========================================================================= */}
          <div
            id="takseer-parchment-print-sheet"
            ref={printAreaRef}
            className={`w-full max-w-3xl ${themeStyles.bg} text-[#2c1e14] p-6 sm:p-10 rounded-xl shadow-2xl border-4 ${themeStyles.outerFrame} relative overflow-hidden transition-all`}
            style={{
              boxShadow: '0 10px 30px rgba(0,0,0,0.15), inset 0 0 40px rgba(182, 137, 68, 0.08)',
            }}
          >
            {/* Traditional Geometric Outer Border Pattern */}
            <div className={`absolute inset-2 border-2 ${themeStyles.borderColor} border-dashed pointer-events-none rounded-lg opacity-70`}></div>
            <div className={`absolute inset-3.5 border ${themeStyles.borderColor} pointer-events-none rounded-md opacity-50`}></div>

            {/* Corner Ornaments (Traditional Arabesque Flourishes) */}
            <div className={`absolute top-4 right-4 font-cinzel text-lg ${themeStyles.accentColor} opacity-70`}>۞</div>
            <div className={`absolute top-4 left-4 font-cinzel text-lg ${themeStyles.accentColor} opacity-70`}>۞</div>
            <div className={`absolute bottom-4 right-4 font-cinzel text-lg ${themeStyles.accentColor} opacity-70`}>۞</div>
            <div className={`absolute bottom-4 left-4 font-cinzel text-lg ${themeStyles.accentColor} opacity-70`}>۞</div>

            <div className="relative z-10 space-y-6">
              {/* 1. Bismillah & Calligraphic Headpiece */}
              {includeBismillah && (
                <div className="text-center space-y-1 pb-3 border-b-2 border-double border-current/30">
                  <div className="font-cinzel text-xs tracking-widest text-[#8d6e63]">
                    بِسْمِ اللَّهِ فَتَّاحِ الْقُلُوبِ وَمُنَوِّرِ الْغُيُوبِ
                  </div>
                  <h1 className={`font-amiri text-2xl sm:text-3xl font-bold ${themeStyles.accentColor} tracking-wide`}>
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </h1>
                  <p className="font-amiri text-xs sm:text-sm text-[#5d4037] font-medium">
                    وَقُل رَّبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ وَاجْعَل لِّي مِن لَّدُنكَ سُلْطَانًا نَّصِيرًا
                  </p>
                </div>
              )}

              {/* 2. Sheet Title & Kash Al-Barny Authentication Header */}
              <div className="text-center space-y-1">
                <div className="inline-block px-4 py-1 rounded-full border border-current/40 text-xs font-bold font-amiri tracking-wider bg-black/5">
                  لوحِ تکسیرِ صدر و مؤخر و طلسماتِ انوار
                </div>
                <h2 className={`font-amiri text-xl sm:text-2xl font-bold ${themeStyles.secondaryAccent}`}>
                  کلمۂ اساس: <span className={`${themeStyles.accentColor} underline decoration-double underline-offset-8`}>"{inputText}"</span>
                </h2>
                <p className="text-[11px] text-[#8d6e63] font-medium font-sans">
                  ماخوذ از: "رموز الجفر و قواعد طلسمات" — تصنیف: حکیم کاش البرنی
                </p>
              </div>

              {/* 3. Metadata Grid (Abjad, Planetary Hour, Element, Zamama) */}
              {includeMetadata && (
                <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-lg border ${themeStyles.borderColor} ${themeStyles.headerBg} text-xs font-amiri`}>
                  <div className="text-center p-1.5 border-l border-current/20">
                    <span className="text-[#8d6e63] block text-[10px] font-sans">عددِ ابجد (جمل کبیر)</span>
                    <span className="font-bold text-base text-[#5d4037]">{abjadInfo.totalKabir}</span>
                  </div>
                  <div className="text-center p-1.5 border-l border-current/20">
                    <span className="text-[#8d6e63] block text-[10px] font-sans">عنصرِ غالب</span>
                    <span className="font-bold text-sm text-[#5d4037]">{abjadInfo.dominantElementUrdu} ({abjadInfo.dominantElement})</span>
                  </div>
                  <div className="text-center p-1.5 border-l border-current/20">
                    <span className="text-[#8d6e63] block text-[10px] font-sans">تعدادِ دورے (سطور)</span>
                    <span className="font-bold text-base text-[#5d4037]">{takseerResult.totalCycles}</span>
                  </div>
                  <div className="text-center p-1.5">
                    <span className="text-[#8d6e63] block text-[10px] font-sans">حالتِ زمام</span>
                    <span className="font-bold text-xs text-[#283618]">
                      {takseerResult.zamamaReached ? 'قفل مکمل' : 'جاری'}
                    </span>
                  </div>
                </div>
              )}

              {/* 4. The Sadr-Muakhkhar Table (جدولِ تکسیر) */}
              {includeTable && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-current/20 pb-1 text-xs font-bold text-[#5d4037]">
                    <span className="flex items-center gap-1.5 font-amiri text-sm">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>جدولِ تکسیرِ حروف (سطر بسطر):</span>
                    </span>
                    <span className="text-[11px] text-[#8d6e63]">قاعدہ: تقدیمِ صدر و تاخیرِ مؤخر</span>
                  </div>

                  <div className="overflow-x-auto border-2 border-[#5d4037] rounded-lg shadow-xs">
                    <table className="w-full text-right border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className={`${themeStyles.tableHeaderBg} border-b-2 border-[#5d4037] text-xs font-bold font-amiri text-[#5d4037]`}>
                          <th className="py-2 px-2.5 text-center border-l border-[#5d4037] w-12">سطر</th>
                          <th className="py-2 px-3 border-l border-[#5d4037]">حروفِ تکسیر (بسطِ حرفی)</th>
                          <th className="py-2 px-3 border-l border-[#5d4037]">اسمِ موکل / عزیمت</th>
                          <th className="py-2 px-2.5 text-center w-20">کیفیت</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#5d4037]/30 font-amiri">
                        {takseerResult.steps.map((step, idx) => {
                          const isFirst = idx === 0;
                          const isLast = idx === takseerResult.steps.length - 1;
                          return (
                            <tr
                              key={idx}
                              className={`${
                                isFirst
                                  ? `${themeStyles.tagBg} font-bold text-[#5d4037]`
                                  : isLast && takseerResult.zamamaReached
                                  ? 'bg-[#dce4c9]/60 font-bold text-[#283618]'
                                  : idx % 2 === 0
                                  ? 'bg-black/[0.02]'
                                  : 'bg-transparent'
                              }`}
                            >
                              <td className="py-1.5 px-2 text-center border-l border-[#5d4037]/40 font-sans font-bold text-xs">
                                {step.stepNumber}
                              </td>
                              <td className="py-1.5 px-3 border-l border-[#5d4037]/40 tracking-widest text-base sm:text-lg font-bold">
                                {step.letters.join('  •  ')}
                              </td>
                              <td className="py-1.5 px-3 border-l border-[#5d4037]/40 text-xs sm:text-sm font-bold text-[#bc6c25]">
                                {step.extractedName}
                              </td>
                              <td className="py-1.5 px-2 text-center text-[11px] font-sans font-bold">
                                {isFirst ? (
                                  <span className="text-[#8c5717]">اساس</span>
                                ) : isLast && takseerResult.zamamaReached ? (
                                  <span className="text-[#283618]">زمام</span>
                                ) : (
                                  <span className="text-[#8d6e63]">گردش</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 5. Dual Section: Talismanic Vertical Seal & Extracted Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Vertical Seal Box */}
                {includeSeal && (
                  <div className={`p-4 rounded-xl border-2 border-[#5d4037] ${themeStyles.sealBg} space-y-2 text-center relative`}>
                    <div className="absolute top-2 right-2 text-xs font-cinzel opacity-40">★</div>
                    <div className="absolute top-2 left-2 text-xs font-cinzel opacity-40">★</div>
                    <span className="text-xs font-bold font-amiri text-[#5d4037] block">
                      خاتمِ طلسماتی (عمودی امتزاجِ حروف)
                    </span>
                    <div className="p-2.5 bg-white rounded-lg border border-[#5d4037]/50 font-amiri text-lg sm:text-xl font-bold tracking-widest text-[#8c5717] shadow-inner">
                      {takseerResult.talismanicSeal || '---'}
                    </div>
                    <p className="text-[10px] text-[#8d6e63] font-medium leading-tight">
                      اس کلمۂ طلسم کو نقرہ یا کاغذ پر لکھ کر پاس رکھنا تسخیرِ خلائق کا سبب ہے۔
                    </p>
                  </div>
                )}

                {/* Extracted Azimat */}
                {includeAzimat && (
                  <div className={`p-4 rounded-xl border border-current/30 ${themeStyles.tagBg} space-y-2`}>
                    <span className="text-xs font-bold font-amiri text-[#5d4037] block text-center border-b border-current/20 pb-1">
                      اسمائے عزائم و موکلانِ تکسیر
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs font-amiri">
                      {takseerResult.extractedAzimat.slice(0, 6).map((name, nIdx) => (
                        <div key={nIdx} className="bg-white/80 px-2 py-1 rounded border border-current/20 flex justify-between items-center">
                          <span className="text-[10px] text-[#8d6e63]">#{nIdx + 1}</span>
                          <span className="font-bold text-[#8c5717]">{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Traditional Instructions, Niyat & Seal Stamp */}
              {includeInstructions && (
                <div className="pt-3 border-t-2 border-double border-current/30 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#5d4037]">
                    <div>
                      <span className="font-bold font-amiri">دستور العمل و شرائطِ تحریر (کاش البرنی):</span>
                      <p className="text-[11px] text-[#8d6e63] mt-0.5 leading-relaxed">
                        باوضو قبلہ رخ ہو کر بیٹھیں۔ بخورِ لبان یا عود روشن کریں۔ سیاہیِ زعفران و عرقِ گلاب سے کاغذِ آہو یا سفید قرطاس پر بوقتِ سعد تحریر کریں۔
                      </p>
                    </div>

                    {/* Vintage Seal Stamp */}
                    <div className="shrink-0 text-center p-2 rounded-full border-2 border-dashed border-[#8c5717] w-20 h-20 flex flex-col items-center justify-center bg-black/5 self-center">
                      <span className="font-amiri text-[10px] font-bold text-[#8c5717] leading-none">مہرِ روحانی</span>
                      <span className="font-cinzel text-xs text-[#5d4037] my-0.5">قفلِ جفر</span>
                      <span className="text-[9px] text-[#8d6e63] font-sans">{currentDate.split(',')[0]}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-[#8d6e63] font-sans pt-2 border-t border-current/10">
                    <span>قوانین جفر و طلسمات کاش البرنی — AI Studio Edition</span>
                    <span>ساعتِ تحریر: {currentSaat ? `${currentSaat.hourName} (${currentSaat.planetUrdu})` : 'ساعتِ سعد'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar with Print & Close Buttons (Not printed) */}
        <div className="no-print bg-[#f2e8cf] px-6 py-3 border-t border-[#d4a373] flex items-center justify-between">
          <span className="text-xs text-[#8d6e63] font-medium hidden sm:inline">
            ٹپ: براؤزر کی پرنٹ ونڈو میں "Background Graphics" کو چیک رکھیں تاکہ قرطاس کے رنگ اور حواشی پرنٹ میں ظاہر ہوں۔
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#d4a373] bg-[#faedcd] hover:bg-[#f9f4e8] text-xs font-bold text-[#5d4037] cursor-pointer font-amiri"
            >
              بند کریں
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#bc6c25] hover:bg-[#9c581e] text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer font-amiri"
            >
              <Printer className="h-4 w-4" />
              <span>لوحِ تکسیر پرنٹ کریں</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
