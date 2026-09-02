import React, { useState, useMemo } from 'react';
import { generateTakseerSadrMuakhkhar } from '../utils/jafrEngine';
import { TakseerResult } from '../types';
import { TakseerGeometricVisualizer } from './TakseerGeometricVisualizer';
import { TakseerPrintModal } from './TakseerPrintModal';
import { Flame, Copy, Check, Info, Sparkles, RefreshCw, Award, Network, Table, SplitSquareVertical, Printer, FileText } from 'lucide-react';

interface TakseerStudioProps {
  initialText?: string;
}

type StudioViewTab = 'both' | 'visualizer' | 'table';

export const TakseerStudio: React.FC<TakseerStudioProps> = ({ initialText = 'یا ودود' }) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [copied, setCopied] = useState<boolean>(false);
  const [maxRounds, setMaxRounds] = useState<number>(20);
  const [studioView, setStudioView] = useState<StudioViewTab>('both');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  const result: TakseerResult = useMemo(() => {
    return generateTakseerSadrMuakhkhar(inputText, maxRounds);
  }, [inputText, maxRounds]);

  const sampleTakseerPhrases = [
    'یا ودود',
    'یا قہار',
    'نصر من اللہ',
    'علی بن فاطمہ',
    'سلام قولا',
    'حق مبین',
    'کہیعص',
  ];

  const copyTakseerTable = () => {
    const textToCopy = result.steps
      .map((s) => `سطر ${s.stepNumber}: ${s.combined}  |  اسم استخراجی: ${s.extractedName || ''}`)
      .join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border-2 border-[#d4a373] bg-[#f2e8cf] p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#bc6c25] text-white shadow-sm">
                <Flame className="h-5 w-5" />
              </span>
              <h2 className="font-amiri text-2xl font-bold text-[#5d4037]">
                علم تکسیر و طلسمات: تکسیر صدر و مؤخر
              </h2>
            </div>
            <p className="mt-1 text-sm text-[#8d6e63] max-w-2xl font-medium">
              کاش البرنی کی تصنیف "رموز الجفر و علم التکسیر" کے مطابق حروف کو صدر و مؤخر کے حسابی ضابطے سے الٹ پلٹ کر اسم اعظم اور الواحِ تسخیر تیار کرنے کا خودکار نظام۔
            </p>
          </div>

          {/* Status Badge & Print Trigger */}
          <div className="flex items-center flex-wrap gap-2.5">
            <div className="rounded-xl border border-[#d4a373] bg-[#fdfaf1] px-3.5 py-2 text-center shadow-xs">
              <span className="text-[11px] text-[#8d6e63] font-medium block">تعداد سطور (دورے)</span>
              <span className="font-amiri text-xl font-bold text-[#bc6c25]">{result.totalCycles}</span>
            </div>
            <div className="rounded-xl border border-[#d4a373] bg-[#fdfaf1] px-3.5 py-2 text-center shadow-xs">
              <span className="text-[11px] text-[#8d6e63] font-medium block">حالتِ زمام</span>
              <span className={`font-amiri text-sm font-bold ${result.zamamaReached ? 'text-[#283618]' : 'text-[#bc6c25]'}`}>
                {result.zamamaReached ? 'زمام مکمل (قفل بند)' : 'جاری'}
              </span>
            </div>

            <button
              onClick={() => setIsPrintModalOpen(true)}
              id="btn-open-takseer-print"
              className="flex items-center gap-2 rounded-xl border-2 border-[#bc6c25] bg-[#bc6c25] hover:bg-[#9c581e] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all cursor-pointer font-amiri"
              title="روایتی کاغذ اور حواشی پر پرنٹ کریں"
            >
              <Printer className="h-4 w-4" />
              <span>پرنٹ لوحِ قرطاس</span>
            </button>
          </div>
        </div>

        {/* Input Form */}
        <div className="mt-6">
          <label className="block text-xs font-bold text-[#5d4037] mb-2">
            وہ کلمہ، نام، یا آیت درج کریں جس کی تکسیر فرمانی ہے:
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              id="takseer-input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="مثلاً: یا ودود"
              className="w-full rounded-xl border-2 border-[#d4a373] bg-[#ffffff] px-4 py-3 text-lg text-[#2c1e14] placeholder-[#a89078] focus:border-[#bc6c25] focus:outline-none focus:ring-2 focus:ring-[#bc6c25]/20 font-amiri shadow-inner"
            />
            <button
              onClick={() => setInputText(sampleTakseerPhrases[Math.floor(Math.random() * sampleTakseerPhrases.length)])}
              className="whitespace-nowrap flex items-center gap-1.5 rounded-xl border border-[#d4a373] bg-[#fdfaf1] px-4 py-3 text-xs font-bold text-[#5d4037] hover:bg-[#faedcd] transition-colors cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5 text-[#bc6c25]" />
              <span>تبدیل نمونہ</span>
            </button>
          </div>

          {/* Quick Select Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#8d6e63] font-bold">کلمات برائے تکسیر:</span>
            {sampleTakseerPhrases.map((phrase, idx) => (
              <button
                key={idx}
                id={`takseer-sample-${idx}`}
                onClick={() => setInputText(phrase)}
                className="rounded-full border border-[#d4a373] bg-[#fdfaf1] px-3 py-1 text-xs text-[#5d4037] font-medium hover:bg-[#bc6c25] hover:text-white transition-colors shadow-xs cursor-pointer"
              >
                {phrase}
              </button>
            ))}
          </div>
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
              <span>مشترکہ منظر (دونوں)</span>
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
              <span>ہندسہ و شبکۂ D3</span>
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
          D3 پر مبنی روانی و حرکاتِ حروف (Node-Link Geometric Graph)
        </span>
      </div>

      {/* D3 Geometric Visualizer Section */}
      {(studioView === 'both' || studioView === 'visualizer') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
              <Network className="h-4 w-4 text-[#bc6c25]" />
              <span>بصری ہندسۂ تکسیر و مساراتِ انوار (D3 Geometric Permutation Flow)</span>
            </h3>
            <span className="text-xs text-[#8d6e63] font-medium">
              حرکاتِ حروف، دائرۂ تسخیر اور شبکۂ بسط
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
                  <span>جدولِ تکسیر صدر و مؤخر (سطر بسطر)</span>
                </h3>
                <p className="text-xs text-[#8d6e63] mt-0.5 font-medium">
                  طریقہ: سطرِ اول کے پہلے اور آخری حرف کو یکے بعد دیگرے جوڑ کر اگلی سطر کی بنیاد رکھی گئی۔
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
                    <th className="py-2.5 px-3">حروفِ تکسیر</th>
                    <th className="py-2.5 px-3">اسم موکل / عزیمت</th>
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
                            : idx % 2 === 0 ? 'bg-[#fdfaf1] text-[#2c1e14]' : 'bg-[#ffffff] text-[#2c1e14]'
                        }`}
                      >
                        <td className="py-2.5 px-3 text-xs text-[#8d6e63] font-sans font-bold">{step.stepNumber}</td>
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
                        <td className="py-2.5 px-3 text-sm font-bold text-[#bc6c25]">{step.extractedName}</td>
                        <td className="py-2.5 px-3 text-center text-xs">
                          {isFirst ? (
                            <span className="rounded-lg bg-[#bc6c25] text-white px-2.5 py-0.5 font-sans font-bold shadow-xs">اساس (اصل)</span>
                          ) : isLast && result.zamamaReached ? (
                            <span className="rounded-lg bg-[#283618] text-white px-2.5 py-0.5 font-sans font-bold shadow-xs">زمام (قفل)</span>
                          ) : (
                            <span className="text-[#8d6e63] font-sans font-medium">سطرِ گردش</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column (1 col): Extracted Azimat & Seal */}
          <div className="space-y-6">
            {/* Extracted Divine Talismanic Words */}
            <div className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-5 shadow-sm">
              <h3 className="font-amiri text-lg font-bold text-[#5d4037] mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-[#bc6c25]" />
                <span>اسمائے استخراجی و عزائم تکسیر</span>
              </h3>
              <p className="text-xs text-[#8d6e63] mb-4 leading-relaxed font-medium">
                کاش البرنی کے مطابق تکسیر کے ہر دورے سے حاصل ہونے والے یہ اسماء طلسماتی تاثیر کے حامل ہیں اور ان کا ورد عمل کو تیزی سے پایہ تکمیل تک پہنچاتا ہے۔
              </p>

              <div className="space-y-2">
                {result.extractedAzimat.slice(0, 6).map((name, nIdx) => (
                  <div
                    key={nIdx}
                    className="flex items-center justify-between rounded-xl border border-[#e7d8c9] bg-[#fdfaf1] px-3.5 py-2.5 shadow-xs"
                  >
                    <span className="text-xs text-[#8d6e63] font-bold">اسم #{nIdx + 1}:</span>
                    <span className="font-amiri text-lg font-bold text-[#bc6c25]">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Talismanic Seal Card */}
            <div className="rounded-2xl border-2 border-[#d4a373] bg-[#f9f4e8] p-5 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-amiri text-base font-bold text-[#5d4037]">
                  خاتمِ طلسماتی (عمودی حروفِ تکسیر)
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
                اس طلسمی عبارت کو چاندی کی تختی یا ہرن کی جھلی پر لکھ کر اپنے پاس رکھنے سے دشمنوں پر غلبہ اور دلوں میں رعب و ہیبت پیدا ہوتی ہے۔
              </p>
            </div>

            {/* Kash Al-Barny Rule Quote */}
            <div className="rounded-2xl border border-[#d4a373] bg-[#f2e8cf] p-4 text-xs text-[#5d4037] leading-relaxed font-medium">
              <div className="font-bold text-[#bc6c25] mb-1 flex items-center gap-1">
                <Info className="h-3.5 w-3.5" />
                <span>قاعدہ از رموز الجفر (کاش البرنی):</span>
              </div>
              "جب تکسیر کے حروف اپنے اصل مقام پر لوٹ آئیں تو سمجھ لیں کہ کائنات کے روحانی دائرے کا قفل بند ہو چکا ہے۔ اس وقت کا ورد لازوال اثر رکھتا ہے۔"
            </div>
          </div>
        </div>
      )}

      {/* Traditional Parchment Print & Manuscript Modal */}
      <TakseerPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        inputText={inputText}
        takseerResult={result}
      />
    </div>
  );
};

