import React, { useState, useMemo } from 'react';
import { calculateAbjad, ABJAD_TABLE } from '../utils/jafrEngine';
import { CalculationResult, ElementType } from '../types';
import { Sparkles, Compass, Flame, Wind, Droplets, Mountain, ArrowLeft, Copy, Check, Info, HelpCircle, Layers } from 'lucide-react';

interface AbjadCalculatorProps {
  onSendToTakseer?: (text: string) => void;
  onSendToTakseerAflatoon?: (text: string) => void;
  onSendToNaqsh?: (adad: number) => void;
  onSendToIstikhara?: (text: string) => void;
  onSendToMatrixSuggester?: (text: string) => void;
}

export const AbjadCalculator: React.FC<AbjadCalculatorProps> = ({ 
  onSendToTakseer, 
  onSendToTakseerAflatoon,
  onSendToNaqsh,
  onSendToIstikhara,
  onSendToMatrixSuggester
}) => {
  const [inputText, setInputText] = useState<string>('یا ودود یا حبیب');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const result: CalculationResult = useMemo(() => {
    return calculateAbjad(inputText);
  }, [inputText]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const samplePhrases = [
    'بسم اللہ الرحمن الرحیم',
    'یا ودود یا حبیب',
    'یا قہار یا جبار یا منتقم',
    'نصر من اللہ وفتح قریب',
    'کہیعص حمعسق',
    'سلام قولا من رب رحیم',
    'فَسَيَكْفِيكَهُمُ اللَّهُ',
  ];

  const getElementColor = (el: ElementType) => {
    switch (el) {
      case 'fire':
        return 'text-[#9d0208] bg-[#fae1dd] border-[#f4a261]';
      case 'air':
        return 'text-[#854d0e] bg-[#faedcd] border-[#d4a373]';
      case 'water':
        return 'text-[#1d3557] bg-[#e0fbfc] border-[#90e0ef]';
      case 'earth':
        return 'text-[#283618] bg-[#dce4c9] border-[#606c38]';
    }
  };

  const getElementIcon = (el: ElementType) => {
    switch (el) {
      case 'fire':
        return <Flame className="h-4 w-4 text-[#9d0208]" />;
      case 'air':
        return <Wind className="h-4 w-4 text-[#854d0e]" />;
      case 'water':
        return <Droplets className="h-4 w-4 text-[#1d3557]" />;
      case 'earth':
        return <Mountain className="h-4 w-4 text-[#283618]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border-2 border-[#d4a373] bg-[#f2e8cf] p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#bc6c25]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#bc6c25] text-white shadow-sm">
                <Sparkles className="h-5 w-5" />
              </span>
              <h2 className="font-amiri text-2xl font-bold text-[#5d4037]">
                محاسب ابجد، عناصر و استخراج موکلات
              </h2>
            </div>
            <p className="mt-1 text-sm text-[#8d6e63] max-w-2xl font-medium">
              کاش البرنی کی کتاب "مفتاح الجفر" کے عین مطابق ابجد کبیر، ابجد صغیر، عناصر اربعہ کا تناسب، موکل علوی و عون سفلی اور ساعاتی خواص کا فوری حسابی استخراج۔
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-[#d4a373] bg-[#fdfaf1] px-4 py-2 text-center shadow-sm">
              <span className="text-xs text-[#8d6e63] font-medium block">اعداد ابجد کبیر</span>
              <span className="font-amiri text-2xl font-bold text-[#bc6c25]">{result.totalKabir}</span>
            </div>
            <div className="rounded-xl border border-[#d4a373] bg-[#fdfaf1] px-4 py-2 text-center shadow-sm">
              <span className="text-xs text-[#8d6e63] font-medium block">اعداد ابجد صغیر</span>
              <span className="font-amiri text-2xl font-bold text-[#5d4037]">{result.totalSaghir}</span>
            </div>
          </div>
        </div>

        {/* Input Box */}
        <div className="mt-6">
          <label className="block text-xs font-bold text-[#5d4037] mb-2">
            نام، اسمِ الٰہی، آیت یا عبارت درج فرمائیں (مثلاً: طالب و مطلوب کا نام مع والدہ):
          </label>
          <div className="relative">
            <input
              type="text"
              id="jafr-input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="یہاں عبارت تحریر کریں..."
              className="w-full rounded-xl border-2 border-[#d4a373] bg-[#ffffff] px-4 py-3 text-lg text-[#2c1e14] placeholder-[#a89078] focus:border-[#bc6c25] focus:outline-none focus:ring-2 focus:ring-[#bc6c25]/20 font-amiri shadow-inner"
            />
            {inputText && (
              <button
                onClick={() => setInputText('')}
                className="absolute left-3 top-3.5 text-xs text-[#5d4037] hover:text-[#2c1e14] bg-[#e7d8c9] hover:bg-[#d4a373] px-2.5 py-1 rounded-lg font-medium"
              >
                صاف کریں
              </button>
            )}
          </div>

          {/* Sample Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#8d6e63] font-bold">نمونہ کلمات:</span>
            {samplePhrases.map((phrase, idx) => (
              <button
                key={idx}
                id={`sample-phrase-${idx}`}
                onClick={() => setInputText(phrase)}
                className="rounded-full border border-[#d4a373] bg-[#fdfaf1] px-3 py-1 text-xs text-[#5d4037] font-medium hover:bg-[#bc6c25] hover:text-white transition-colors shadow-xs"
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col (2 cols wide): Letters Breakdown & Elements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Letter by Letter Breakdown Table */}
          <div className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
                <Info className="h-4 w-4 text-[#bc6c25]" />
                <span>تفصیل حروف و اعداد (بسط حرفی)</span>
              </h3>
              <span className="text-xs text-[#5d4037] font-bold bg-[#faedcd] border border-[#d4a373] px-2.5 py-1 rounded-full">
                کل حروف: {result.letterCount}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {result.letterBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border min-w-[56px] transition-transform hover:scale-105 shadow-xs ${getElementColor(
                    item.element
                  )}`}
                >
                  <span className="font-amiri text-xl font-bold">{item.letter}</span>
                  <span className="text-xs font-bold mt-0.5">{item.kabir}</span>
                  <span className="text-[10px] font-medium opacity-80 mt-0.5">{item.elementUrdu}</span>
                </div>
              ))}
            </div>

            {/* Elements Percentage Meter */}
            <div className="mt-6 pt-5 border-t border-[#e7d8c9]">
              <h4 className="text-xs font-bold text-[#5d4037] mb-3">
                تناسب عناصر اربعہ (Fire, Air, Water, Earth Balance):
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Fire */}
                <div className="rounded-xl border border-[#f4a261] bg-[#fae1dd] p-3">
                  <div className="flex items-center justify-between text-xs text-[#9d0208] font-bold mb-1">
                    <span className="flex items-center gap-1">
                      <Flame className="h-3.5 w-3.5" /> آتشی (آگ)
                    </span>
                    <span>{result.elementPercentages.fire}%</span>
                  </div>
                  <div className="w-full bg-white/80 rounded-full h-2 overflow-hidden border border-[#f4a261]/50">
                    <div
                      className="bg-[#9d0208] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${result.elementPercentages.fire}%` }}
                    />
                  </div>
                </div>

                {/* Air */}
                <div className="rounded-xl border border-[#d4a373] bg-[#faedcd] p-3">
                  <div className="flex items-center justify-between text-xs text-[#854d0e] font-bold mb-1">
                    <span className="flex items-center gap-1">
                      <Wind className="h-3.5 w-3.5" /> بادی (ہوا)
                    </span>
                    <span>{result.elementPercentages.air}%</span>
                  </div>
                  <div className="w-full bg-white/80 rounded-full h-2 overflow-hidden border border-[#d4a373]/50">
                    <div
                      className="bg-[#bc6c25] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${result.elementPercentages.air}%` }}
                    />
                  </div>
                </div>

                {/* Water */}
                <div className="rounded-xl border border-[#90e0ef] bg-[#e0fbfc] p-3">
                  <div className="flex items-center justify-between text-xs text-[#1d3557] font-bold mb-1">
                    <span className="flex items-center gap-1">
                      <Droplets className="h-3.5 w-3.5" /> آبی (پانی)
                    </span>
                    <span>{result.elementPercentages.water}%</span>
                  </div>
                  <div className="w-full bg-white/80 rounded-full h-2 overflow-hidden border border-[#90e0ef]/50">
                    <div
                      className="bg-[#1d3557] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${result.elementPercentages.water}%` }}
                    />
                  </div>
                </div>

                {/* Earth */}
                <div className="rounded-xl border border-[#606c38] bg-[#dce4c9] p-3">
                  <div className="flex items-center justify-between text-xs text-[#283618] font-bold mb-1">
                    <span className="flex items-center gap-1">
                      <Mountain className="h-3.5 w-3.5" /> خاکی (مٹی)
                    </span>
                    <span>{result.elementPercentages.earth}%</span>
                  </div>
                  <div className="w-full bg-white/80 rounded-full h-2 overflow-hidden border border-[#606c38]/50">
                    <div
                      className="bg-[#283618] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${result.elementPercentages.earth}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dominant Element & Practical Rules Card */}
          <div className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-5 shadow-sm">
            <h3 className="font-amiri text-lg font-bold text-[#5d4037] mb-3 flex items-center gap-2">
              {getElementIcon(result.dominantElement)}
              <span>قوانینِ کاش البرنی برائے عنصرِ غالب: {result.dominantElementUrdu}</span>
            </h3>
            <p className="text-sm text-[#2c1e14] leading-relaxed bg-[#fdfaf1] p-4 rounded-xl border border-[#e7d8c9]">
              {result.natureDescription}
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#f9f4e8] p-3 rounded-xl border border-[#e7d8c9]">
                <span className="text-[#8d6e63] font-medium block mb-1">حاکم سیارہ و کوکب:</span>
                <span className="font-bold text-[#bc6c25] text-sm">{result.governingPlanetUrdu}</span>
              </div>
              <div className="bg-[#f9f4e8] p-3 rounded-xl border border-[#e7d8c9]">
                <span className="text-[#8d6e63] font-medium block mb-1">مبارک دن و ساعت:</span>
                <span className="font-bold text-[#bc6c25] text-sm">{result.favorableDay} - {result.favorableSaat}</span>
              </div>
              <div className="bg-[#f9f4e8] p-3 rounded-xl border border-[#e7d8c9]">
                <span className="text-[#8d6e63] font-medium block mb-1">مخصوص بخور (خوشبو):</span>
                <span className="font-bold text-[#bc6c25] text-sm">{result.incense}</span>
              </div>
              <div className="bg-[#f9f4e8] p-3 rounded-xl border border-[#e7d8c9]">
                <span className="text-[#8d6e63] font-medium block mb-1">سمت و رخ برائے عمل:</span>
                <span className="font-bold text-[#5d4037] text-sm">
                  {result.dominantElement === 'fire' ? 'مشرق (سورج کی سمت)' :
                   result.dominantElement === 'air' ? 'شمال (ہوا کی سمت)' :
                   result.dominantElement === 'water' ? 'مغرب (پانی کی سمت)' : 'جنوب (مٹی و قبلہ)'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Extracted Muwakkilat & Action Buttons */}
        <div className="space-y-6">
          {/* Muwakkil & Awan Card */}
          <div className="rounded-2xl border-2 border-[#d4a373] bg-[#f9f4e8] p-5 shadow-md">
            <h3 className="font-amiri text-lg font-bold text-[#5d4037] mb-4 pb-2 border-b border-[#d4a373]">
              استخراج موکلات (مفتاح الجفر)
            </h3>

            {/* Upper Angelic Muwakkil */}
            <div className="bg-[#ffffff] p-4 rounded-xl border border-[#d4a373] mb-4 relative shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#8d6e63] mb-1">
                <span className="font-bold text-[#bc6c25]">موکل علوی (روحانی / فرشتہ):</span>
                <button
                  onClick={() => copyToClipboard(result.ulwiMuwakkil, 'ulwi')}
                  className="text-[#8d6e63] hover:text-[#bc6c25]"
                >
                  {copiedKey === 'ulwi' ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <div className="font-amiri text-3xl font-bold text-[#5d4037]">
                {result.ulwiMuwakkil}
              </div>
              <p className="text-[11px] text-[#8d6e63] mt-2">
                قاعدہ: کل اعداد کو حروف بنا کر آخر میں لاحقہ "ائیل" لگایا گیا۔ برائے اعمال خیر، شفا، اور نوری حفاظت۔
              </p>
            </div>

            {/* Subterranean Awan */}
            <div className="bg-[#ffffff] p-4 rounded-xl border border-[#d4a373] mb-4 relative shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#8d6e63] mb-1">
                <span className="font-bold text-[#9d0208]">عون سفلی (خادم ارضی / جن):</span>
                <button
                  onClick={() => copyToClipboard(result.sifliAwan, 'sifli')}
                  className="text-[#8d6e63] hover:text-[#9d0208]"
                >
                  {copiedKey === 'sifli' ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <div className="font-amiri text-3xl font-bold text-[#9d0208]">
                {result.sifliAwan}
              </div>
              <p className="text-[11px] text-[#8d6e63] mt-2">
                قاعدہ: کل اعداد کے حروف پر لاحقہ "طوش" لگایا گیا۔ تسخیر و اثر پذیری کے لیے بطور خادم عمل مستعمل ہے۔
              </p>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="space-y-2 pt-2">
              {onSendToMatrixSuggester && (
                <button
                  id="btn-send-to-matrix-suggester"
                  onClick={() => onSendToMatrixSuggester(inputText)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#5d4037] hover:bg-[#43281c] px-4 py-3 text-sm font-bold text-[#fdfaf1] shadow-md transition-all font-amiri text-base cursor-pointer border border-[#d4a373]"
                >
                  <Layers className="h-4 w-4 text-[#d4a373]" />
                  <span>طاقتور ترین ماتریسِ تکسیر استخراج کریں</span>
                </button>
              )}

              {onSendToNaqsh && (
                <button
                  id="btn-send-to-naqsh"
                  onClick={() => onSendToNaqsh(result.totalKabir)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#bc6c25] hover:bg-[#a65d1e] px-4 py-3 text-sm font-bold text-white shadow-md transition-all font-amiri text-base cursor-pointer"
                >
                  <Compass className="h-4 w-4" />
                  <span>اس عدد ({result.totalKabir}) کا نقش تیار کریں</span>
                </button>
              )}

              {onSendToTakseer && (
                <button
                  id="btn-send-to-takseer"
                  onClick={() => onSendToTakseer(inputText)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-[#d4a373] bg-[#faedcd] hover:bg-[#f2e8cf] px-4 py-2 text-xs sm:text-sm font-bold text-[#5d4037] transition-all font-amiri cursor-pointer"
                >
                  <Flame className="h-4 w-4 text-[#bc6c25]" />
                  <span>تکسیر صدر و مؤخر میں بھیجیں</span>
                </button>
              )}

              {onSendToTakseerAflatoon && (
                <button
                  id="btn-send-to-aflatoon"
                  onClick={() => onSendToTakseerAflatoon(inputText)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-[#283618] bg-[#dce4c9] hover:bg-[#ccd5ae] px-4 py-2 text-xs sm:text-sm font-bold text-[#283618] transition-all font-amiri cursor-pointer shadow-xs"
                >
                  <Sparkles className="h-4 w-4 text-[#283618]" />
                  <span>تکسیرِ افلاطون (امتزاجِ عناصر) میں بھیجیں</span>
                </button>
              )}

              {onSendToIstikhara && (
                <button
                  id="btn-send-to-istikhara"
                  onClick={() => onSendToIstikhara(inputText)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-[#bc6c25] bg-[#faedcd] hover:bg-[#f2e8cf] px-4 py-2 text-xs sm:text-sm font-bold text-[#5d4037] transition-all font-amiri cursor-pointer shadow-xs"
                >
                  <HelpCircle className="h-4 w-4 text-[#bc6c25]" />
                  <span>استخارۂ جفری (شادی / کاروبار) میں لے جائیں</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
