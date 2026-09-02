import React, { useState, useMemo } from 'react';
import { generateTakseerAflatoon, calculateAbjad } from '../utils/jafrEngine';
import { TakseerResult, ElementType } from '../types';
import { TakseerGeometricVisualizer } from './TakseerGeometricVisualizer';
import { TakseerPrintModal } from './TakseerPrintModal';
import { TakseerAflatoonAppStudio } from './TakseerAflatoonAppStudio';
import { 
  Sparkles, 
  Flame, 
  Wind, 
  Droplets, 
  Mountain, 
  Copy, 
  Check, 
  RefreshCw, 
  BookOpen, 
  ShieldAlert, 
  Zap, 
  Heart, 
  Award,
  Layers,
  Network,
  Table,
  SplitSquareVertical,
  ChevronRight,
  Info,
  Printer,
  Smartphone,
  LayoutDashboard
} from 'lucide-react';

interface TakseerAflatoonStudioProps {
  initialTalib?: string;
  initialMatloob?: string;
}

type StudioViewTab = 'both' | 'visualizer' | 'table';

export const TakseerAflatoonStudio: React.FC<TakseerAflatoonStudioProps> = ({
  initialTalib = 'محمد',
  initialMatloob = 'فاطمہ',
}) => {
  const [activeAppMode, setActiveAppMode] = useState<'app' | 'research'>('app');
  const [talibInput, setTalibInput] = useState<string>(initialTalib);
  const [matloobInput, setMatloobInput] = useState<string>(initialMatloob);
  const [purposeTag, setPurposeTag] = useState<'mahabbat' | 'taskheer' | 'sulah' | 'shifa'>('mahabbat');
  const [copied, setCopied] = useState<boolean>(false);
  const [maxRounds, setMaxRounds] = useState<number>(20);
  const [studioView, setStudioView] = useState<StudioViewTab>('both');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  // Generate Plato's Elemental Interlacing Takseer
  const result: TakseerResult = useMemo(() => {
    return generateTakseerAflatoon(talibInput, matloobInput, maxRounds);
  }, [talibInput, matloobInput, maxRounds]);

  // Abjad calculations for individual names
  const talibAbjad = useMemo(() => calculateAbjad(talibInput), [talibInput]);
  const matloobAbjad = useMemo(() => calculateAbjad(matloobInput), [matloobInput]);

  const samplePairs = [
    { talib: 'محمد', matloob: 'فاطمہ', label: 'الفت و صلح زوجین' },
    { talib: 'علی', matloob: 'زینب', label: 'تسخیرِ قلوب' },
    { talib: 'یا ودود', matloob: 'یا رحیم', label: 'اسمائے خیر و محبت' },
    { talib: 'نصر من اللہ', matloob: 'فتح قریب', label: 'عظمت و وجاہت' },
    { talib: 'طالب بن حوا', matloob: 'مطلوبہ بنت حوا', label: 'جلبِ محبتِ قلبی' },
  ];

  const copyTakseerTable = () => {
    const textToCopy = result.steps
      .map(
        (s) =>
          `سطر ${s.stepNumber}: ${s.combined}  |  اسم افلاطونی: ${s.extractedName || ''}`
      )
      .join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getElementBadge = (el: ElementType) => {
    switch (el) {
      case 'fire':
        return { label: 'آتشی (آگ)', icon: Flame, color: 'bg-red-50 text-red-700 border-red-200' };
      case 'air':
        return { label: 'بادی (ہوا)', icon: Wind, color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'water':
        return { label: 'آبی (پانی)', icon: Droplets, color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'earth':
        return { label: 'خاکی (مٹی)', icon: Mountain, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Switcher Bar between Exact App Replica and Research Dashboard */}
      <div className="flex items-center justify-between flex-wrap gap-2 rounded-2xl bg-[#f2e8cf] p-2.5 border-2 border-[#d4a373]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveAppMode('app')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeAppMode === 'app'
                ? 'bg-[#1e40af] text-white shadow-md'
                : 'bg-white/80 text-[#5d4037] hover:bg-white'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>ایپ اسٹوڈیو موڈ (تصرفات حاصل کرنے کا علم - تکسیر افلاطون)</span>
          </button>

          <button
            onClick={() => setActiveAppMode('research')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeAppMode === 'research'
                ? 'bg-[#bc6c25] text-white shadow-md'
                : 'bg-white/80 text-[#5d4037] hover:bg-white'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>جامع تحقیقی و بصری ڈیش بورڈ</span>
          </button>
        </div>

        <span className="text-xs font-bold text-[#8d6e63] px-2 hidden md:inline">
          مستند قواعدِ کاش البرنی و افلاطون
        </span>
      </div>

      {activeAppMode === 'app' ? (
        <TakseerAflatoonAppStudio />
      ) : (
        <div className="space-y-6">
          {/* Top Banner Dedicated to Kash Al-Barny's Qawaneen Aflatoon */}
          <div className="rounded-2xl border-2 border-[#d4a373] bg-[#f2e8cf] p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#bc6c25] text-white shadow-sm">
                <Sparkles className="h-5 w-5" />
              </span>
              <h2 className="font-amiri text-2xl sm:text-3xl font-bold text-[#5d4037]">
                تکسیرِ افلاطون (قوانینِ افلاطون و امتزاجِ عناصر اربعہ)
              </h2>
            </div>
            <p className="mt-1 text-sm text-[#8d6e63] max-w-2xl font-medium">
              ماخوذ از تصنیفِ کاش البرنی <span className="font-bold text-[#bc6c25]">"قوانینِ افلاطون"</span> و <span className="font-bold text-[#bc6c25]">"قوانینِ طلسم"</span>۔ حکیم افلاطون کے قانون التوافق (Sympathy) اور عناصر اربعہ (آتش، ہوا، آب، خاک) کے باہمی اختلاط سے اسمائے تسخیر و الواحِ الفت برآمد کرنے کا اختصاصی نظام۔
            </p>
          </div>

          {/* Elemental Harmony Metric Card & Print */}
          <div className="flex items-center flex-wrap gap-2.5">
            <div className="rounded-xl border border-[#d4a373] bg-[#fdfaf1] px-3.5 py-2 text-center shadow-xs">
              <span className="text-[11px] text-[#8d6e63] font-medium block">توازنِ عناصرِ افلاطونی</span>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <Zap className="h-3.5 w-3.5 text-[#bc6c25]" />
                <span className="font-amiri text-xl font-bold text-[#bc6c25]">
                  {result.harmonyScore || 85}%
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-[#d4a373] bg-[#fdfaf1] px-3.5 py-2 text-center shadow-xs">
              <span className="text-[11px] text-[#8d6e63] font-medium block">حالتِ زمام و قفل</span>
              <span className={`font-amiri text-sm font-bold ${result.zamamaReached ? 'text-[#283618]' : 'text-[#bc6c25]'}`}>
                {result.zamamaReached ? 'قفل مکمل شد' : 'دورانِ امتزاج'}
              </span>
            </div>

            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center gap-2 rounded-xl border-2 border-[#bc6c25] bg-[#bc6c25] hover:bg-[#9c581e] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all cursor-pointer font-amiri"
              title="روایتی کاغذ اور حواشی پر پرنٹ کریں"
            >
              <Printer className="h-4 w-4" />
              <span>پرنٹ لوحِ قرطاس</span>
            </button>
          </div>
        </div>

        {/* Dual Input Form (طالب و مطلوب / اسمائے خیر) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#5d4037] mb-1.5 flex items-center justify-between">
              <span>نامِ طالب / کلمۂ اول (مثلاً: طالب مع والدہ):</span>
              <span className="text-[11px] text-[#8d6e63]">
                عدد: {talibAbjad.totalKabir} | عنصر: {talibAbjad.dominantElementUrdu}
              </span>
            </label>
            <input
              type="text"
              id="aflatoon-talib-input"
              value={talibInput}
              onChange={(e) => setTalibInput(e.target.value)}
              placeholder="مثلاً: محمد"
              className="w-full rounded-xl border-2 border-[#d4a373] bg-[#ffffff] px-4 py-2.5 text-lg text-[#2c1e14] placeholder-[#a89078] focus:border-[#bc6c25] focus:outline-none font-amiri shadow-inner"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#5d4037] mb-1.5 flex items-center justify-between">
              <span>نامِ مطلوب / کلمۂ ثانی (مثلاً: مطلوب مع والدہ):</span>
              <span className="text-[11px] text-[#8d6e63]">
                عدد: {matloobAbjad.totalKabir} | عنصر: {matloobAbjad.dominantElementUrdu}
              </span>
            </label>
            <input
              type="text"
              id="aflatoon-matloob-input"
              value={matloobInput}
              onChange={(e) => setMatloobInput(e.target.value)}
              placeholder="مثلاً: فاطمہ"
              className="w-full rounded-xl border-2 border-[#d4a373] bg-[#ffffff] px-4 py-2.5 text-lg text-[#2c1e14] placeholder-[#a89078] focus:border-[#bc6c25] focus:outline-none font-amiri shadow-inner"
            />
          </div>
        </div>

        {/* Quick Sample Pairs */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#8d6e63] font-bold">نمونہ جوڑے برائے تکسیرِ افلاطون:</span>
          {samplePairs.map((p, idx) => (
            <button
              key={idx}
              id={`aflatoon-sample-${idx}`}
              onClick={() => {
                setTalibInput(p.talib);
                setMatloobInput(p.matloob);
              }}
              className="rounded-full border border-[#d4a373] bg-[#fdfaf1] px-3 py-1 text-xs text-[#5d4037] font-medium hover:bg-[#bc6c25] hover:text-white transition-colors shadow-xs cursor-pointer"
            >
              {p.talib} + {p.matloob} ({p.label})
            </button>
          ))}
        </div>
      </div>

      {/* 4 Elements Breakdown Strip (عناصرِ اربعہ کا تجزیہ) */}
      <div className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-4 shadow-sm">
        <h4 className="text-xs font-bold text-[#5d4037] mb-3 flex items-center gap-1.5">
          <Layers className="h-4 w-4 text-[#bc6c25]" />
          <span>تقسیمِ حروف بر طبقۂ عناصرِ اربعہ (افلاطونی نظریۂ خلق):</span>
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { key: 'fire', label: 'آتشی حروف (آگ)', icon: Flame, color: 'text-red-700 bg-red-50 border-red-200' },
            { key: 'air', label: 'بادی حروف (ہوا)', icon: Wind, color: 'text-amber-700 bg-amber-50 border-amber-200' },
            { key: 'water', label: 'آبی حروف (پانی)', icon: Droplets, color: 'text-blue-700 bg-blue-50 border-blue-200' },
            { key: 'earth', label: 'خاکی حروف (مٹی)', icon: Mountain, color: 'text-emerald-800 bg-emerald-50 border-emerald-200' },
          ].map((el) => {
            const Icon = el.icon;
            const chars = result.elementalBreakdown?.[el.key as ElementType] || [];
            return (
              <div key={el.key} className={`rounded-xl border p-3 ${el.color}`}>
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="flex items-center gap-1">
                    <Icon className="h-3.5 w-3.5" />
                    <span>{el.label}</span>
                  </span>
                  <span className="text-[11px] font-sans">تعداد: {chars.length}</span>
                </div>
                <div className="font-amiri text-lg font-bold tracking-widest min-h-7">
                  {chars.length > 0 ? chars.join('  ') : <span className="text-xs opacity-50 font-sans">کوئی حرف نہیں</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* View Switcher Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[#e7d8c9]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#8d6e63]">طرزِ مشاہدہ:</span>
          <div className="flex items-center p-1 bg-[#f9f4e8] rounded-xl border border-[#d4a373]">
            <button
              onClick={() => setStudioView('both')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                studioView === 'both'
                  ? 'bg-[#bc6c25] text-white shadow-xs'
                  : 'text-[#5d4037] hover:bg-[#faedcd]'
              }`}
            >
              <SplitSquareVertical className="h-3.5 w-3.5" />
              <span>مشترکہ منظر</span>
            </button>
            <button
              onClick={() => setStudioView('visualizer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                studioView === 'visualizer'
                  ? 'bg-[#bc6c25] text-white shadow-xs'
                  : 'text-[#5d4037] hover:bg-[#faedcd]'
              }`}
            >
              <Network className="h-3.5 w-3.5" />
              <span>ہندسۂ افلاطون (D3 Graph)</span>
            </button>
            <button
              onClick={() => setStudioView('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                studioView === 'table'
                  ? 'bg-[#bc6c25] text-white shadow-xs'
                  : 'text-[#5d4037] hover:bg-[#faedcd]'
              }`}
            >
              <Table className="h-3.5 w-3.5" />
              <span>جدولِ تکسیر سطر بسطر</span>
            </button>
          </div>
        </div>

        <span className="text-xs text-[#8d6e63] font-medium">
          D3 بصری تقلیب و مساراتِ عناصرِ اربعہ
        </span>
      </div>

      {/* D3 Geometric Visualizer Section */}
      {(studioView === 'both' || studioView === 'visualizer') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
              <Network className="h-4 w-4 text-[#bc6c25]" />
              <span>دائرۂ افلاطونی و گردشِ انوارِ عناصر (D3 Geometric Mandala)</span>
            </h3>
            <span className="text-xs text-[#8d6e63] font-medium">
              حرکاتِ حروف، باہمی کشش و تقلیب
            </span>
          </div>

          <TakseerGeometricVisualizer
            takseerResult={result}
            selectedLetterHighlight={selectedLetter}
            onSelectLetter={setSelectedLetter}
          />
        </div>
      )}

      {/* Main Grid: Takseer Table & Extracted Talismanic Names */}
      {(studioView === 'both' || studioView === 'table') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 cols): Step-by-Step Table */}
          <div className="lg:col-span-2 rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#e7d8c9]">
              <div>
                <h3 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#bc6c25]" />
                  <span>جدولِ تکسیرِ افلاطون (امتزاج و تقلیبِ سطر بسطر)</span>
                </h3>
                <p className="text-xs text-[#8d6e63] mt-0.5 font-medium">
                  طریقہ: حروف کو طبائعِ اربعہ کی ترتیب سے باندھ کر افلاطونی حلزونی گردش دی گئی ہے۔
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="flex items-center gap-1.5 rounded-lg border border-[#bc6c25] bg-[#bc6c25] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#9c581e] cursor-pointer shadow-xs font-amiri"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>پرنٹ قرطاس</span>
                </button>
                <button
                  onClick={copyTakseerTable}
                  className="flex items-center gap-1.5 rounded-lg border border-[#d4a373] bg-[#faedcd] px-3 py-1.5 text-xs font-bold text-[#5d4037] hover:bg-[#f2e8cf] cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-[#bc6c25]" />}
                  <span>{copied ? 'نقل ہو گیا' : 'جدول نقل کریں'}</span>
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-[#e7d8c9] text-xs font-bold text-[#8d6e63] bg-[#f9f4e8]">
                    <th className="py-2.5 px-3">سطر #</th>
                    <th className="py-2.5 px-3">حروفِ امتزاجِ افلاطون</th>
                    <th className="py-2.5 px-3">اسم موکلِ افلاطونی</th>
                    <th className="py-2.5 px-3 text-center">کیفیت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7d8c9] font-amiri text-base">
                  {result.steps.map((step, idx) => {
                    const isFirst = idx === 0;
                    const isLast = idx === result.steps.length - 1;
                    return (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          isFirst
                            ? 'bg-[#faedcd] text-[#5d4037] font-bold'
                            : isLast && result.zamamaReached
                            ? 'bg-[#dce4c9] text-[#283618] font-bold'
                            : idx % 2 === 0
                            ? 'bg-[#fdfaf1] text-[#2c1e14]'
                            : 'bg-[#ffffff] text-[#2c1e14]'
                        }`}
                      >
                        <td className="py-2.5 px-3 text-xs text-[#8d6e63] font-sans font-bold">
                          {step.stepNumber}
                        </td>
                        <td className="py-2.5 px-3 tracking-widest text-lg font-bold font-amiri">
                          {step.letters.map((char, cIdx) => (
                            <span
                              key={cIdx}
                              onClick={() => setSelectedLetter(selectedLetter === char ? null : char)}
                              className={`inline-block mx-1 px-2 py-0.5 rounded-lg border cursor-pointer transition-transform hover:scale-110 ${
                                selectedLetter === char
                                  ? 'bg-[#bc6c25] text-white border-[#bc6c25] shadow-xs'
                                  : cIdx % 2 === 0
                                  ? 'bg-[#faedcd] border-[#d4a373] text-[#bc6c25]'
                                  : 'bg-[#fdfaf1] border-[#e7d8c9] text-[#5d4037]'
                              }`}
                            >
                              {char}
                            </span>
                          ))}
                        </td>
                        <td className="py-2.5 px-3 text-sm font-bold text-[#bc6c25]">
                          {step.extractedName}
                        </td>
                        <td className="py-2.5 px-3 text-center text-xs">
                          {isFirst ? (
                            <span className="rounded-lg bg-[#bc6c25] text-white px-2.5 py-0.5 font-sans font-bold shadow-xs">
                              امتزاجِ اساس
                            </span>
                          ) : isLast && result.zamamaReached ? (
                            <span className="rounded-lg bg-[#283618] text-white px-2.5 py-0.5 font-sans font-bold shadow-xs">
                              قفلِ افلاطون
                            </span>
                          ) : (
                            <span className="text-[#8d6e63] font-sans font-medium">گردشِ عناصر</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column (1 col): Plato's Talismanic Names, Seal & Book Rules */}
          <div className="space-y-6">
            {/* Extracted Divine Talismanic Words */}
            <div className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-5 shadow-sm">
              <h3 className="font-amiri text-lg font-bold text-[#5d4037] mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-[#bc6c25]" />
                <span>اسمائے افلاطونی و عزائمِ تسخیر</span>
              </h3>
              <p className="text-xs text-[#8d6e63] mb-4 leading-relaxed font-medium">
                کاش البرنی (قوانین افلاطون): جب چاروں عناصر آپس میں باہم مل جائیں تو ان سے استخراج ہونے والے اسماء تسخیرِ قلوب اور نفوذِ ارواح میں تیر بہدف ہیں۔
              </p>

              <div className="space-y-2">
                {result.extractedAzimat.slice(0, 6).map((name, nIdx) => (
                  <div
                    key={nIdx}
                    className="flex items-center justify-between rounded-xl border border-[#e7d8c9] bg-[#fdfaf1] px-3.5 py-2.5 shadow-xs"
                  >
                    <span className="text-xs text-[#8d6e63] font-bold">اسمِ نورانی #{nIdx + 1}:</span>
                    <span className="font-amiri text-lg font-bold text-[#bc6c25]">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Talismanic Seal Card */}
            <div className="rounded-2xl border-2 border-[#d4a373] bg-[#f9f4e8] p-5 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-amiri text-base font-bold text-[#5d4037] flex items-center gap-1.5">
                  <Heart className="h-4 w-4 text-red-600" />
                  <span>خاتمِ تسخیرِ افلاطون (قفلِ طلسمِ محبت)</span>
                </h4>
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="flex items-center gap-1 text-xs font-bold text-[#bc6c25] hover:underline cursor-pointer font-amiri"
                >
                  <Printer className="h-3 w-3" />
                  <span>پرنٹ لوح</span>
                </button>
              </div>
              <div className="p-3 bg-[#ffffff] rounded-xl border border-[#d4a373] font-amiri text-xl text-center text-[#bc6c25] font-bold tracking-wider shadow-inner">
                {result.talismanicSeal || '---'}
              </div>
              <p className="text-[11px] text-[#8d6e63] mt-2 leading-normal font-medium">
                یہ طلسمی مہر زعفران و عرق گلاب سے لکھ کر موم جامہ کر کے پاس رکھنے سے دو دلوں کے درمیان افلاطونی کشش و لازوال محبت پیدا ہوتی ہے۔
              </p>
            </div>

            {/* Kash Al-Barny Quote on Plato */}
            <div className="rounded-2xl border border-[#d4a373] bg-[#f2e8cf] p-4 text-xs text-[#5d4037] leading-relaxed font-medium">
              <div className="font-bold text-[#bc6c25] mb-1 flex items-center gap-1">
                <Info className="h-3.5 w-3.5" />
                <span>قانونِ افلاطون از کاش البرنی:</span>
              </div>
              "افلاطون کے نزدیک کائنات عناصر کے مقناطیسی اختلاط پر قائم ہے۔ جب تم حروف کو ان کے عناصر کی ترتیب سے جوڑتے ہو تو وہ روحانی تار بج اٹھتا ہے جس کی آواز ہر روح سنتی ہے۔"
            </div>
          </div>
        </div>
      )}
    </div>
  )}

      {/* Traditional Parchment Print & Manuscript Modal */}
      <TakseerPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        inputText={`${talibInput} + ${matloobInput}`}
        takseerResult={result}
      />
    </div>
  );
};

