import React, { useState, useMemo } from 'react';
import { 
  KASH_AL_BARNI_DREAM_DATABASE, 
  DREAM_CATEGORIES, 
  analyzeDream 
} from '../utils/dreamDatabase';
import { 
  DreamSymbolItem, 
  DreamCategory, 
  DreamAnalysisResult 
} from '../types';
import { 
  Moon, 
  Sparkles, 
  Search, 
  Clock, 
  Check, 
  Flame, 
  ShieldAlert, 
  Award, 
  BookOpen, 
  Copy, 
  Info, 
  Compass, 
  Filter, 
  Layers, 
  HeartHandshake, 
  Wind, 
  Droplets, 
  Mountain,
  ChevronRight,
  RefreshCw,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DreamInterpretationStudioProps {
  onSendToMatrixSuggester?: (text: string) => void;
  onSendToTakseer?: (text: string) => void;
}

export const DreamInterpretationStudio: React.FC<DreamInterpretationStudioProps> = ({
  onSendToMatrixSuggester,
  onSendToTakseer,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<DreamCategory | 'all'>('all');
  const [selectedSymbolIds, setSelectedSymbolIds] = useState<string[]>([
    'symbol-kaaba',
    'symbol-white-pigeon',
  ]);
  const [dreamTiming, setDreamTiming] = useState<'sahar' | 'mid_night' | 'first_third' | 'day_nap'>('sahar');
  const [practiceContext, setPracticeContext] = useState<
    'after_istikhara' | 'after_takseer' | 'during_chilla' | 'general_dream'
  >('after_istikhara');
  const [dreamNarrative, setDreamNarrative] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Filtered symbols by search query and category
  const filteredSymbols = useMemo(() => {
    return KASH_AL_BARNI_DREAM_DATABASE.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchCat) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        item.nameUrdu.toLowerCase().includes(q) ||
        item.nameEnglish.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q)) ||
        item.primaryInterpretation.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  // Dream Analysis Result
  const analysis: DreamAnalysisResult = useMemo(() => {
    return analyzeDream(selectedSymbolIds, dreamTiming, practiceContext, dreamNarrative);
  }, [selectedSymbolIds, dreamTiming, practiceContext, dreamNarrative]);

  // Toggle Symbol Selection
  const toggleSymbol = (id: string) => {
    setSelectedSymbolIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Quick Dream Presets
  const dreamPresets = [
    {
      label: 'خوابِ استخارۂ شادی و رشتہ (الفت و برکت)',
      symbols: ['symbol-white-pigeon', 'symbol-pure-milk-honey', 'symbol-green-robe'],
      timing: 'sahar' as const,
      context: 'after_istikhara' as const,
      narrative: 'میں نے خواب میں سفید پرندہ دیکھا جو میرے کندھے پر بیٹھا اور مجھے میٹھا دودھ دیا گیا۔',
    },
    {
      label: 'خوابِ استخارۂ کاروبار و دولت (فتحِ مبین)',
      symbols: ['symbol-golden-key', 'symbol-bright-sun', 'symbol-fresh-fish'],
      timing: 'sahar' as const,
      context: 'after_istikhara' as const,
      narrative: 'خواب میں ایک سونے کی چابی ملی جس سے بڑا مقفل دروازہ کھل گیا اور سورج طلوع ہوا۔',
    },
    {
      label: 'خواب بعد از تکسیر و ریاضت (کشف و نصرت)',
      symbols: ['symbol-kaaba', 'symbol-quran', 'symbol-light-nur'],
      timing: 'sahar' as const,
      context: 'after_takseer' as const,
      narrative: 'عمل کی رات کعبۃ اللہ شریف کا طواف کرتے دیکھا اور چاروں طرف سفید نور تھا۔',
    },
    {
      label: 'خوابِ تنبیہ و خطرہ (روکنے کا اشارہ)',
      symbols: ['symbol-snake-scorpio', 'symbol-storm-darkclouds', 'symbol-falling-from-height'],
      timing: 'mid_night' as const,
      context: 'after_istikhara' as const,
      narrative: 'سیاہ آندھی آئی اور راستے میں سانپ دکھائی دیا جس پر میں بلندی سے پھسل گیا۔',
    },
  ];

  const applyPreset = (preset: typeof dreamPresets[0]) => {
    setSelectedSymbolIds(preset.symbols);
    setDreamTiming(preset.timing);
    setPracticeContext(preset.context);
    setDreamNarrative(preset.narrative);
  };

  const copyAnalysisReport = () => {
    const text = `=== تعبیر الرؤیا و اشاراتِ منامیہ (کاش البرنی) ===\nحکمِ استخارہ: ${analysis.verdictTitleUrdu}\nنصیحتِ کاش البرنی: ${analysis.istikharaAdviceUrdu}\nغالب عنصر: ${analysis.dominantElementUrdu}\nوقتِ خواب کی اہمیت: ${analysis.timingSignificance}\n\nعلاج و تدابیر:\n- صدقہ: ${analysis.spiritualRemedy.sadqah}\n- وظیفہ: ${analysis.spiritualRemedy.wazifa}\n- بخور: ${analysis.spiritualRemedy.incense}\n- آیت: ${analysis.spiritualRemedy.quranicVerse}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl border-2 border-[#bc6c25] bg-gradient-to-br from-[#fdfaf1] via-[#f7ede2] to-[#faedcd] p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5d4037] text-white text-xs font-bold shadow-sm mb-3">
              <Moon className="h-3.5 w-3.5 text-[#d4a373]" />
              <span>تعبیر الرؤیا و اشاراتِ منامیہ بعد از استخارہ و تکسیر</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">کاش البرنی ایڈیشن</span>
            </div>
            <h2 className="font-amiri text-3xl sm:text-4xl font-extrabold text-[#5d4037] leading-tight">
              علم التعبیر و محاسبِ اشاراتِ خواب برائے استخارہ و عملیات
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#8d6e63] font-medium max-w-3xl leading-relaxed">
              کاش البرنی کی تصانیف (<strong className="text-[#5d4037]">رموز الجفر، مفتاح الجفر اور قوانین طلسمات</strong>) کے باطنی اصولوں کے تحت استخارہ، وظیفہ یا ریاضت کے بعد دیکھے گئے خوابوں، علامات اور نقوشِ منامیہ کا جامع تجزیہ اور مستند حکم۔
            </p>
          </div>

          <div className="rounded-2xl border-2 border-[#d4a373] bg-white p-4 text-center shadow-md shrink-0">
            <span className="text-[11px] font-bold text-[#8d6e63] block">منتخب علاماتِ خواب</span>
            <span className="font-amiri text-3xl font-extrabold text-[#bc6c25] block">
              {analysis.matchedSymbols.length}
            </span>
            <span className="text-[10px] text-[#5d4037] font-bold">علامت زیرِ تجزیہ</span>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="mt-6 pt-5 border-t border-[#d4a373]/50">
          <label className="text-xs font-bold text-[#5d4037] block mb-2">
            فوری نمونہ جاتی خواب (Quick Testing Presets):
          </label>
          <div className="flex flex-wrap gap-2">
            {dreamPresets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(p)}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-[#d4a373] text-xs font-bold text-[#5d4037] hover:bg-[#faedcd] transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer font-amiri"
              >
                <Sparkles className="h-3 w-3 text-[#bc6c25]" />
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 cols): Controls, Context & Symbol Picker */}
        <div className="lg:col-span-5 space-y-6">
          {/* Timing & Spiritual Context Settings */}
          <div className="rounded-3xl border-2 border-[#d4a373] bg-white p-6 shadow-md space-y-4">
            <h3 className="font-amiri text-xl font-bold text-[#5d4037] flex items-center gap-2 border-b border-[#e7d8c9] pb-3">
              <Clock className="h-5 w-5 text-[#bc6c25]" />
              <span>وقتِ خواب و پس منظرِ روحانی</span>
            </h3>

            {/* Timing of Dream */}
            <div>
              <label className="block text-xs font-bold text-[#5d4037] mb-1.5">
                خواب کس وقت دیکھا گیا؟ (Timing of Dream):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'sahar', label: 'بوقتِ سحر (صبحِ صادق)', desc: 'صادق ترین و سریع التاثیر' },
                  { id: 'mid_night', label: 'نصفِ شب (بوقتِ سکون)', desc: 'پختہ اشاراتِ باطنی' },
                  { id: 'first_third', label: 'ثلثِ اولِ شب', desc: 'معتدل اشارہ' },
                  { id: 'day_nap', label: 'قیلولہ / دن کا خواب', desc: 'دنیاوی تعبیر' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setDreamTiming(t.id as any)}
                    className={`p-2.5 rounded-xl text-right transition-all border text-xs cursor-pointer ${
                      dreamTiming === t.id
                        ? 'bg-[#5d4037] text-white border-[#5d4037] shadow-sm font-bold'
                        : 'bg-[#fdfaf1] text-[#5d4037] border-[#d4a373] hover:bg-[#faedcd]'
                    }`}
                  >
                    <div className="font-amiri font-bold text-xs">{t.label}</div>
                    <div className={`text-[9px] ${dreamTiming === t.id ? 'text-[#faedcd]' : 'text-[#8d6e63]'}`}>
                      {t.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Spiritual Practice Context */}
            <div>
              <label className="block text-xs font-bold text-[#5d4037] mb-1.5">
                کس عمل یا مقصد کے بعد خواب دیکھا گیا؟ (Spiritual Context):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'after_istikhara', label: 'نمازِ استخارہ کے بعد' },
                  { id: 'after_takseer', label: 'عملِ تکسیر و طلسم کے بعد' },
                  { id: 'during_chilla', label: 'دورانِ چلہ و ریاضتِ جفر' },
                  { id: 'general_dream', label: 'عام خواب برائے تعبیر' },
                ].map((ctx) => (
                  <button
                    key={ctx.id}
                    onClick={() => setPracticeContext(ctx.id as any)}
                    className={`p-2.5 rounded-xl text-center transition-all border text-xs font-bold font-amiri cursor-pointer ${
                      practiceContext === ctx.id
                        ? 'bg-[#bc6c25] text-white border-[#bc6c25] shadow-sm'
                        : 'bg-[#fdfaf1] text-[#5d4037] border-[#d4a373] hover:bg-[#faedcd]'
                    }`}
                  >
                    {ctx.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Narrative Text Area */}
            <div>
              <label className="block text-xs font-bold text-[#5d4037] mb-1">
                اپنے خواب کی روداد یا تفصیل تحریر فرمائیں (اختیاری):
              </label>
              <textarea
                value={dreamNarrative}
                onChange={(e) => setDreamNarrative(e.target.value)}
                rows={2}
                placeholder="مثلاً: میں نے دیکھا کہ سفید کبوتر میرے ہاتھ پر بیٹھا اور سبز باغ میں روشنی تھی..."
                className="w-full rounded-xl border border-[#d4a373] bg-[#fdfaf1] p-3 text-xs sm:text-sm font-amiri text-[#5d4037] focus:border-[#bc6c25] focus:outline-none shadow-inner resize-none"
              />
              <span className="text-[10px] text-[#8d6e63] block mt-0.5">
                💡 نظام خودکار طور پر آپ کی تحریر سے کلیدی الفاظ پہچان کر تعبیر نکالے گا۔
              </span>
            </div>
          </div>

          {/* Dream Symbols Database Selector */}
          <div className="rounded-3xl border-2 border-[#d4a373] bg-white p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-[#e7d8c9] pb-3">
              <h3 className="font-amiri text-xl font-bold text-[#5d4037] flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#bc6c25]" />
                <span>دائرۃ المعارف علاماتِ خواب (Symbols Database)</span>
              </h3>
              <span className="text-xs text-[#8d6e63] font-bold">
                {filteredSymbols.length} دستیاب
              </span>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="علامت تلاش کریں (مثلاً کعبہ، سانپ، چابی، پرواز)..."
                className="w-full rounded-xl border-2 border-[#d4a373] bg-[#fdfaf1] pr-10 pl-4 py-2.5 text-xs sm:text-sm font-amiri text-[#5d4037] focus:border-[#bc6c25] focus:outline-none"
              />
              <Search className="absolute right-3.5 top-3 h-4 w-4 text-[#8d6e63]" />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-colors cursor-pointer border ${
                  selectedCategory === 'all'
                    ? 'bg-[#5d4037] text-white border-[#5d4037]'
                    : 'bg-[#fdfaf1] text-[#5d4037] border-[#d4a373] hover:bg-[#faedcd]'
                }`}
              >
                تمام اقسام
              </button>
              {DREAM_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-colors cursor-pointer border flex items-center gap-1 ${
                    selectedCategory === cat.id
                      ? 'bg-[#bc6c25] text-white border-[#bc6c25]'
                      : 'bg-[#fdfaf1] text-[#5d4037] border-[#d4a373] hover:bg-[#faedcd]'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.labelUrdu.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Symbols Selectable Grid */}
            <div className="max-h-72 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {filteredSymbols.map((symbol) => {
                const isSelected = selectedSymbolIds.includes(symbol.id);
                return (
                  <div
                    key={symbol.id}
                    onClick={() => toggleSymbol(symbol.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#faedcd] border-2 border-[#bc6c25] shadow-xs'
                        : 'bg-[#fdfaf1] border-[#e7d8c9] hover:bg-[#f9f4e8]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{symbol.iconEmoji}</span>
                      <div>
                        <span className="font-amiri font-bold text-sm text-[#5d4037] block">
                          {symbol.nameUrdu}
                        </span>
                        <span className="text-[10px] text-[#8d6e63]">
                          {symbol.signalUrdu} • {symbol.elementUrdu.split(' ')[0]}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'bg-[#bc6c25] border-[#bc6c25] text-white'
                          : 'border-[#d4a373] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Full Dream Synthesis & Kashe Al-Biruni Verdict */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Verdict Card */}
          <div
            className={`rounded-3xl border-3 p-6 sm:p-8 shadow-xl relative overflow-hidden transition-all ${
              analysis.overallVerdict === 'highly_favorable'
                ? 'border-emerald-600 bg-gradient-to-br from-[#f0fdf4] via-[#f7fbe9] to-[#fdfaf1]'
                : analysis.overallVerdict === 'favorable'
                ? 'border-[#bc6c25] bg-gradient-to-br from-[#fdfaf1] via-[#fffbf2] to-[#faedcd]'
                : analysis.overallVerdict === 'neutral_delayed'
                ? 'border-amber-600 bg-gradient-to-br from-[#fffbeb] via-[#fdfaf1] to-[#fef3c7]'
                : 'border-red-600 bg-gradient-to-br from-[#fef2f2] via-[#fff5f5] to-[#fdfaf1]'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#d4a373]/30 pb-4 mb-4">
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-xs inline-block mb-1.5 ${
                    analysis.overallVerdict === 'highly_favorable'
                      ? 'bg-emerald-700 text-white'
                      : analysis.overallVerdict === 'favorable'
                      ? 'bg-[#bc6c25] text-white'
                      : analysis.overallVerdict === 'neutral_delayed'
                      ? 'bg-amber-600 text-white'
                      : 'bg-red-700 text-white'
                  }`}
                >
                  حکمِ قطعی استخارہ و تعبیرِ خواب
                </span>
                <h3 className="font-amiri text-2xl sm:text-3xl font-extrabold text-[#5d4037]">
                  {analysis.verdictTitleUrdu}
                </h3>
              </div>

              <button
                onClick={copyAnalysisReport}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#d4a373] text-xs font-bold text-[#5d4037] hover:bg-[#faedcd] transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-[#8d6e63]" />}
                <span>{copied ? 'کاپی ہو گیا' : 'تعبیر کاپی کریں'}</span>
              </button>
            </div>

            {/* Verdict Guidance Paragraph */}
            <p className="text-sm sm:text-base text-[#5d4037] font-medium leading-relaxed mb-4">
              {analysis.istikharaAdviceUrdu}
            </p>

            {/* Timing & Element Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white/80 border border-[#d4a373]/40">
                <span className="text-[10px] text-[#8d6e63] font-bold block mb-0.5">غالب عنصرِ خواب:</span>
                <span className="font-amiri text-sm font-bold text-[#5d4037]">
                  {analysis.dominantElementUrdu}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 border border-[#d4a373]/40">
                <span className="text-[10px] text-[#8d6e63] font-bold block mb-0.5">وقت کی اہمیت:</span>
                <span className="font-amiri text-xs font-bold text-[#5d4037] line-clamp-2">
                  {analysis.timingSignificance}
                </span>
              </div>
            </div>
          </div>

          {/* Matched Symbols Detailed Breakdown */}
          <div className="rounded-3xl border-2 border-[#d4a373] bg-white p-6 shadow-md space-y-4">
            <h4 className="font-amiri text-xl font-bold text-[#5d4037] border-b border-[#e7d8c9] pb-3 flex items-center justify-between">
              <span>تفصیلاتِ علاماتِ منامیہ (Symbol Breakdown)</span>
              <span className="text-xs text-[#8d6e63] font-normal">کتبِ کاش البرنی کی روشنی میں</span>
            </h4>

            <div className="space-y-3">
              {analysis.matchedSymbols.map((sym) => (
                <div
                  key={sym.id}
                  className="p-4 rounded-2xl bg-[#fdfaf1] border border-[#e7d8c9] space-y-2 hover:border-[#bc6c25] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{sym.iconEmoji}</span>
                      <div>
                        <h5 className="font-amiri text-base font-bold text-[#5d4037]">
                          {sym.nameUrdu}
                        </h5>
                        <span className="text-[11px] text-[#8d6e63] font-medium">
                          {sym.nameEnglish} • {sym.categoryUrdu}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        sym.istikharaVerdict === 'highly_favorable' || sym.istikharaVerdict === 'favorable'
                          ? 'bg-emerald-100 text-emerald-800'
                          : sym.istikharaVerdict === 'neutral_delayed'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {sym.signalUrdu}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5d4037] font-medium leading-relaxed">
                    🌟 <strong>تعبیر و اشارہ:</strong> {sym.primaryInterpretation}
                  </p>

                  <div className="p-2.5 rounded-xl bg-[#faedcd]/60 text-xs text-[#5d4037] font-medium space-y-1">
                    <div>
                      <strong>دلالت بر استخارہ:</strong> {sym.istikharaImplication}
                    </div>
                    <div className="text-[11px] text-[#8d6e63]">
                      📜 <em>{sym.kashAlBarniReference}</em>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spiritual Remedies & Practical Advice (تدابیر و وظائفِ کاش البرنی) */}
          <div className="rounded-3xl border-2 border-[#bc6c25] bg-[#fdfaf1] p-6 shadow-lg space-y-4">
            <h4 className="font-amiri text-xl font-bold text-[#5d4037] border-b border-[#d4a373]/50 pb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#bc6c25]" />
              <span>تدابیر، صدقہ و وظائفِ کاش البرنی بعد از خواب</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-[#e7d8c9] space-y-1">
                <span className="text-[10px] text-[#8d6e63] font-bold block">مستحب صدقہ (Alms/Charity):</span>
                <span className="font-bold text-[#5d4037] leading-snug block">
                  {analysis.spiritualRemedy.sadqah}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#e7d8c9] space-y-1">
                <span className="text-[10px] text-[#8d6e63] font-bold block">مخصوص بخور (Incense):</span>
                <span className="font-bold text-[#5d4037] leading-snug block">
                  {analysis.spiritualRemedy.incense}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#e7d8c9] space-y-1">
                <span className="text-[10px] text-[#8d6e63] font-bold block">موافق ورد و وظیفہ:</span>
                <span className="font-amiri text-sm font-extrabold text-[#bc6c25] leading-snug block">
                  {analysis.spiritualRemedy.wazifa}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#e7d8c9] space-y-1">
                <span className="text-[10px] text-[#8d6e63] font-bold block">آیتِ مبارکہ برائے تلاوت:</span>
                <span className="font-amiri text-xs font-bold text-[#5d4037] leading-relaxed block">
                  {analysis.spiritualRemedy.quranicVerse}
                </span>
              </div>
            </div>

            {/* Quick Link to Matrix Suggester or Takseer */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              {onSendToMatrixSuggester && (
                <button
                  onClick={() => onSendToMatrixSuggester('یا فتاح یا رزاق یا ودود')}
                  className="flex-1 py-3 rounded-xl bg-[#bc6c25] hover:bg-[#a65d1e] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Layers className="h-4 w-4" />
                  <span>اس کے لیے ماتریسِ تکسیر تجویز کریں</span>
                </button>
              )}

              {onSendToTakseer && (
                <button
                  onClick={() => onSendToTakseer('یا فتاح یا ودود')}
                  className="flex-1 py-3 rounded-xl border border-[#5d4037] bg-white hover:bg-[#faedcd] text-[#5d4037] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
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
