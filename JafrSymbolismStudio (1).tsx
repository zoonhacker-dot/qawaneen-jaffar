import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  Layers, 
  Flame, 
  Compass, 
  ShieldCheck, 
  Award, 
  RefreshCw, 
  Printer, 
  ArrowRight, 
  Check, 
  Copy, 
  Info, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  Sun, 
  Moon, 
  Atom, 
  Feather,
  Filter,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { KASH_AL_BARNY_SYMBOL_PRESETS, JAFR_28_LETTERS_DATA } from '../data/jafrSymbolismData';
import { analyzeJafrSymbolism } from '../utils/jafrSymbolismEngine';
import { JafrSymbolPreset, JafrLetterDetail } from '../types';

interface Props {
  onSendToNaqsh?: (adad: number, title?: string) => void;
  onSendToTakseer?: (text: string) => void;
}

export const JafrSymbolismStudio: React.FC<Props> = ({ onSendToNaqsh, onSendToTakseer }) => {
  const [inputText, setInputText] = useState<string>('ا ح ر س ص ط ع ق ک ل م ن ہ ی');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSubTab, setActiveSubTab] = useState<'analyzer' | 'table-explorer' | 'book-codex'>('analyzer');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [expandedLetter, setExpandedLetter] = useState<string | null>(null);
  const [tableElementFilter, setTableElementFilter] = useState<string>('all');
  const [tableTypeFilter, setTableTypeFilter] = useState<string>('all');
  const [tableSearchQuery, setTableSearchQuery] = useState<string>('');

  // Analyze the current sequence
  const analysis = useMemo(() => {
    return analyzeJafrSymbolism(inputText);
  }, [inputText]);

  // Filter presets
  const filteredPresets = useMemo(() => {
    if (selectedCategory === 'all') return KASH_AL_BARNY_SYMBOL_PRESETS;
    return KASH_AL_BARNY_SYMBOL_PRESETS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  // Filter the full 28 letters table for table-explorer
  const filteredLettersTable = useMemo(() => {
    return Object.values(JAFR_28_LETTERS_DATA).filter((item: JafrLetterDetail) => {
      if (tableElementFilter !== 'all' && item.element !== tableElementFilter) return false;
      if (tableTypeFilter === 'nourani' && !item.isNourani) return false;
      if (tableTypeFilter === 'zulmani' && item.isNourani) return false;
      if (tableTypeFilter === 'sowamat' && !item.isSowamat) return false;
      if (tableTypeFilter === 'natiqa' && item.isSowamat) return false;
      if (tableSearchQuery) {
        const q = tableSearchQuery.trim().toLowerCase();
        const matchLetter = item.letter.includes(q);
        const matchName = item.name.includes(q);
        const matchAbjad = item.abjadKabir.toString() === q;
        const matchPlanet = item.planetUrdu.includes(q) || item.planet.toLowerCase().includes(q);
        const matchMansion = item.lunarMansion.name.includes(q);
        return matchLetter || matchName || matchAbjad || matchPlanet || matchMansion;
      }
      return true;
    });
  }, [tableElementFilter, tableTypeFilter, tableSearchQuery]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePresetSelect = (preset: JafrSymbolPreset) => {
    setInputText(preset.sequence);
    setActiveSubTab('analyzer');
  };

  const handleQuickInsert = (char: string) => {
    setInputText(prev => prev ? `${prev} ${char}` : char);
  };

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-[#2c1e14] via-[#3d2b1f] to-[#1e130c] p-6 sm:p-8 text-[#f4ede2] shadow-xl border border-[#d4a373]/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4a373]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4a373]/20 border border-[#d4a373]/40 text-[#f3d5b5] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
              <span>تحقیقِ رموز و اشاراتِ جفر • کتبِ کاش البرنی و ابو ریحان البیرونی</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#fefae0]">
              تحقیقِ رموز و اشاراتِ جفر (Jafr Symbolism Research)
            </h1>
            <p className="text-sm sm:text-base text-[#e9edc9] max-w-3xl leading-relaxed">
              کاش البرنی کی تصانیف (مفتاح الجفر، قوانینِ طلسم، قوانینِ افلاطون، رموز التکسیر) اور ابو ریحان البیرونی کے فلکی اصولوں سے ماخوذ رمزیہ حروف و اعداد کا خودکار تجزیہ، ابجد و عناصر، ۲۸ منازلِ قمر، نظائر اور ملائکہ و موکلین کے تقابلی جداول۔
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d4a373]/20 hover:bg-[#d4a373]/30 border border-[#d4a373]/50 text-[#fefae0] text-xs font-medium transition-all"
              title="پرنٹ ریسرچ دستاویز"
            >
              <Printer className="w-4 h-4" />
              <span>پرنٹ دستاویز</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[#d4a373]/30 pt-4">
          <button
            onClick={() => setActiveSubTab('analyzer')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeSubTab === 'analyzer'
                ? 'bg-[#d4a373] text-[#2c1e14] shadow-md'
                : 'bg-black/20 text-[#e9edc9] hover:bg-black/40'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>محاسب و تقابلِ رمزیات (Sequence Analyzer)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('book-codex')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeSubTab === 'book-codex'
                ? 'bg-[#d4a373] text-[#2c1e14] shadow-md'
                : 'bg-black/20 text-[#e9edc9] hover:bg-black/40'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>فہرستِ طلسمات و رموزِ کتب (Presets Codex)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('table-explorer')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeSubTab === 'table-explorer'
                ? 'bg-[#d4a373] text-[#2c1e14] shadow-md'
                : 'bg-black/20 text-[#e9edc9] hover:bg-black/40'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>جامع جدولِ ۲۸ حروف و منازل (Jafr Table Explorer)</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeSubTab === 'analyzer' && (
        <div className="space-y-6">
          {/* Input & Quick Presets Bar */}
          <div className="bg-[#fffdfa] rounded-2xl p-6 border-2 border-[#d4a373]/30 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-sm font-bold text-[#2c1e14] flex items-center gap-2">
                <Feather className="w-4 h-4 text-[#bc6c25]" />
                <span>حروف، اعداد یا رمزیہ سلسلہ درج کریں (Alphanumeric Sequence Input):</span>
              </label>
              <div className="flex items-center gap-2 text-xs text-[#606c38]">
                <span className="px-2 py-0.5 rounded bg-[#faedcd] border border-[#d4a373]/30">
                  حالت: {analysis.inputMode === 'numeric' ? 'صرف اعداد' : analysis.inputMode === 'mixed' ? 'مخلوط حروف و اعداد' : 'خالص حروف'}
                </span>
                <span>تعدادِ حروف: {analysis.cleanedLetters.length}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="مثلاً: ا ح ر س ص ط ع ق ک ل م ن ہ ی یا بدوح یا ۱۱۰ یا کعسلہون..."
                  className="w-full text-lg sm:text-xl font-medium px-4 py-3.5 rounded-xl border-2 border-[#d4a373]/50 focus:border-[#bc6c25] focus:ring-2 focus:ring-[#bc6c25]/20 bg-white text-[#2c1e14] placeholder:text-gray-400 text-right outline-none transition-all shadow-inner"
                  dir="rtl"
                />
                {inputText && (
                  <button
                    onClick={() => setInputText('')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-md"
                  >
                    صاف کریں
                  </button>
                )}
              </div>
              <button
                onClick={() => setInputText('ا ح ر س ص ط ع ق ک ل م ن ہ ی')}
                className="px-4 py-3 bg-[#faedcd] hover:bg-[#d4a373]/30 border border-[#d4a373] text-[#2c1e14] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>ڈیفالٹ سیٹ کریں</span>
              </button>
            </div>

            {/* Quick Keyboard Helpers */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100">
              <span className="text-xs font-semibold text-gray-500 ml-2">فوری انتخاب:</span>
              {[
                { label: 'حروفِ نورانی', val: 'ا ح ر س ص ط ع ق ک ل م ن ہ ی' },
                { label: 'حروفِ ظلمانی', val: 'ب ت ث ج خ د ذ ز ش ض ظ غ ف و' },
                { label: 'طلسمِ بدوح', val: 'ب د و ح' },
                { label: 'طلسمِ اجهزط', val: 'ا ج ہ ز ط' },
                { label: 'ایقغ (آتشی)', val: 'ا ہ ط م ف ش ذ' },
                { label: 'حروفِ صوامت', val: 'ا ح د ر س ص ط ع ک ل م ہ و' },
                { label: 'طلسمِ کعسلہون', val: 'ک ع س ل ہ و ن' },
                { label: 'سبعہ شواذ', val: 'ف ج ش ث ظ خ ز' },
                { label: 'اسم ۱۱۰', val: '۱۱۰' },
                { label: 'اسم ۷۸۶', val: '۷۸۶' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(item.val)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-[#fefae0] hover:bg-[#faedcd] border border-[#d4a373]/40 text-[#2c1e14] font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Primary High-Impact Metric Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {/* Card 1: Abjad Kabir */}
            <div className="bg-[#fffdfa] rounded-xl p-4 border border-[#d4a373]/30 shadow-sm flex flex-col justify-between hover:border-[#bc6c25] transition-all">
              <div className="text-xs text-gray-500 font-semibold flex items-center justify-between">
                <span>ابجد کبیر (مجموعہ)</span>
                <Sparkles className="w-3.5 h-3.5 text-[#bc6c25]" />
              </div>
              <div className="my-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#2c1e14]">
                  {analysis.totalAbjadKabir}
                </span>
              </div>
              <div className="text-[11px] text-[#606c38] font-medium">
                جذرِ اصغر: {analysis.digitalRoot} (Digital Root)
              </div>
            </div>

            {/* Card 2: Abjad Saghir & Wasit */}
            <div className="bg-[#fffdfa] rounded-xl p-4 border border-[#d4a373]/30 shadow-sm flex flex-col justify-between hover:border-[#bc6c25] transition-all">
              <div className="text-xs text-gray-500 font-semibold flex items-center justify-between">
                <span>ابجد صغیر و وسیط</span>
                <Atom className="w-3.5 h-3.5 text-[#283618]" />
              </div>
              <div className="my-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#2c1e14]">{analysis.totalAbjadSaghir}</span>
                <span className="text-xs text-gray-400 font-medium">/ وسیط: {analysis.totalAbjadWasit}</span>
              </div>
              <div className="text-[11px] text-gray-600">
                ابجد اکبر: {analysis.totalAbjadAkbar}
              </div>
            </div>

            {/* Card 3: Dominant Element */}
            <div className="bg-[#fffdfa] rounded-xl p-4 border border-[#d4a373]/30 shadow-sm flex flex-col justify-between hover:border-[#bc6c25] transition-all">
              <div className="text-xs text-gray-500 font-semibold flex items-center justify-between">
                <span>عنصرِ غالب و مزاج</span>
                <Flame className="w-3.5 h-3.5 text-red-500" />
              </div>
              <div className="my-2">
                <span className="text-lg font-bold text-[#bc6c25]">
                  {analysis.dominantElementUrdu.split(' ')[0]}
                </span>
              </div>
              <div className="text-[11px] text-gray-600">
                غلبہ: {analysis.elementPercentages[analysis.dominantElement]}%
              </div>
            </div>

            {/* Card 4: Celestial Angel */}
            <div className="bg-[#fffdfa] rounded-xl p-4 border border-[#d4a373]/30 shadow-sm flex flex-col justify-between hover:border-[#bc6c25] transition-all">
              <div className="text-xs text-gray-500 font-semibold flex items-center justify-between">
                <span>موکلِ علوی (فرشتہ)</span>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div className="my-2 truncate">
                <span className="text-base font-bold text-[#2c1e14]">
                  {analysis.ulwiMuwakkil}
                </span>
              </div>
              <div className="text-[11px] text-gray-600 truncate">
                خادم: {analysis.sifliAwan}
              </div>
            </div>

            {/* Card 5: Talismanic Word */}
            <div className="bg-[#fffdfa] rounded-xl p-4 border border-[#d4a373]/30 shadow-sm flex flex-col justify-between hover:border-[#bc6c25] transition-all">
              <div className="text-xs text-gray-500 font-semibold flex items-center justify-between">
                <span>اسمِ طلسماتی (صدر و مؤخر)</span>
                <Award className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <div className="my-2 truncate">
                <span className="text-base font-bold text-[#bc6c25] tracking-wider">
                  {analysis.talismanicSecretWord}
                </span>
              </div>
              <div className="text-[11px] text-gray-600 truncate">
                رمزِ ترکیب و قفل
              </div>
            </div>

            {/* Card 6: Planet & Zodiac */}
            <div className="bg-[#fffdfa] rounded-xl p-4 border border-[#d4a373]/30 shadow-sm flex flex-col justify-between hover:border-[#bc6c25] transition-all">
              <div className="text-xs text-gray-500 font-semibold flex items-center justify-between">
                <span>کوکب و طالعِ عمل</span>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="my-2 truncate">
                <span className="text-base font-bold text-[#2c1e14]">
                  {analysis.governingPlanetUrdu.split(' ')[0]}
                </span>
              </div>
              <div className="text-[11px] text-[#606c38] truncate">
                {analysis.zodiacSignNameUrdu.split(' ')[0]} {analysis.zodiacSignNameUrdu.split(' ')[1]}
              </div>
            </div>
          </div>

          {/* Detailed Letter-by-Letter Cross-Reference Matrix */}
          <div className="bg-[#fffdfa] rounded-2xl border border-[#d4a373]/40 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 bg-[#faedcd]/60 border-b border-[#d4a373]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#2c1e14] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#bc6c25]" />
                  <span>جدولِ تقابلِ حروف و اسرارِ ۲۸ منازل (Letter-by-Letter Esoteric Matrix)</span>
                </h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  ہر حرف پر کلک کر کے اس کی باطنی تفصیل، ۲۸ منازلِ قمر، درجہ، دھات، اور علوی موکل کا مشاہدہ کریں۔
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(analysis.cleanedLetters.join(' '), 'letters')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-[#d4a373]/40 text-xs font-semibold text-[#2c1e14] hover:bg-[#fefae0]"
                >
                  {copiedKey === 'letters' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>حروف کاپی کریں</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#fefae0] text-[#2c1e14] border-b border-[#d4a373]/30 font-bold">
                    <th className="p-3 text-center w-12">#</th>
                    <th className="p-3 text-center">حرف</th>
                    <th className="p-3 text-center">نام</th>
                    <th className="p-3 text-center">ابجد کبیر</th>
                    <th className="p-3 text-center">عنصر و مزاج</th>
                    <th className="p-3 text-center">کوکبِ حاکم</th>
                    <th className="p-3 text-center">منزلِ قمر (Lunar Mansion)</th>
                    <th className="p-3 text-center">نظیرہ (Opposite)</th>
                    <th className="p-3 text-center">نوعیت (نورانی/صوامت)</th>
                    <th className="p-3 text-center">تفصیل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {analysis.lettersDetailed.map((item, idx) => {
                    const isExpanded = expandedLetter === `${item.letter}-${idx}`;
                    return (
                      <React.Fragment key={`${item.letter}-${idx}`}>
                        <tr className="hover:bg-[#fdfaf5] transition-colors">
                          <td className="p-3 text-center font-bold text-gray-400">{idx + 1}</td>
                          <td className="p-3 text-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#faedcd] border border-[#d4a373]/40 text-lg font-bold text-[#2c1e14]">
                              {item.letter}
                            </span>
                          </td>
                          <td className="p-3 text-center font-bold text-[#2c1e14]">{item.name}</td>
                          <td className="p-3 text-center font-extrabold text-[#bc6c25]">{item.abjadKabir}</td>
                          <td className="p-3 text-center">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                              item.element === 'fire' ? 'bg-red-50 text-red-700 border border-red-200' :
                              item.element === 'air' ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' :
                              item.element === 'water' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                              'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}>
                              {item.elementUrdu.split(' ')[0]}
                            </span>
                          </td>
                          <td className="p-3 text-center font-medium text-gray-700">{item.planetUrdu.split(' ')[0]}</td>
                          <td className="p-3 text-center text-gray-700 font-medium">{item.lunarMansion.name}</td>
                          <td className="p-3 text-center font-bold text-gray-600">
                            {item.nazeerah} <span className="text-[10px] text-gray-400">({item.nazeerahAbjad})</span>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${item.isNourani ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                {item.isNourani ? 'نورانی' : 'ظلمانی'}
                              </span>
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${item.isSowamat ? 'bg-indigo-100 text-indigo-800' : 'bg-orange-100 text-orange-800'}`}>
                                {item.isSowamat ? 'صوامت' : 'ناطقہ'}
                              </span>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => setExpandedLetter(isExpanded ? null : `${item.letter}-${idx}`)}
                              className="p-1 rounded-md hover:bg-gray-100 text-gray-600 transition-colors"
                              title="مزید تفصیلات"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </td>
                        </tr>

                        {isExpanded && (
                          <tr className="bg-[#fefae0]/70 border-b border-[#d4a373]/30">
                            <td colSpan={10} className="p-4 sm:p-5">
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                                <div className="space-y-1 bg-white p-3 rounded-xl border border-[#d4a373]/30">
                                  <div className="font-bold text-[#2c1e14] flex items-center gap-1.5">
                                    <Moon className="w-3.5 h-3.5 text-blue-600" />
                                    <span>منزلِ قمر و درجات:</span>
                                  </div>
                                  <div className="text-gray-700 font-semibold">{item.lunarMansion.name} ({item.lunarMansion.degree})</div>
                                  <div className="text-gray-600 text-[11px]">{item.lunarMansion.spiritualEffect}</div>
                                </div>

                                <div className="space-y-1 bg-white p-3 rounded-xl border border-[#d4a373]/30">
                                  <div className="font-bold text-[#2c1e14] flex items-center gap-1.5">
                                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                                    <span>موکل و خادم:</span>
                                  </div>
                                  <div className="text-gray-700">موکل علوی: <span className="font-bold text-[#bc6c25]">{item.muwakkil}</span></div>
                                  <div className="text-gray-600 text-[11px]">خادم سفلی: {item.awan}</div>
                                </div>

                                <div className="space-y-1 bg-white p-3 rounded-xl border border-[#d4a373]/30">
                                  <div className="font-bold text-[#2c1e14] flex items-center gap-1.5">
                                    <Sun className="w-3.5 h-3.5 text-amber-600" />
                                    <span>دھات، رنگ و بخور:</span>
                                  </div>
                                  <div className="text-gray-700">دھات: {item.metal}</div>
                                  <div className="text-gray-600 text-[11px]">بخور: {item.incense}</div>
                                </div>

                                <div className="space-y-1 bg-white p-3 rounded-xl border border-[#d4a373]/30">
                                  <div className="font-bold text-[#2c1e14] flex items-center gap-1.5">
                                    <Info className="w-3.5 h-3.5 text-purple-600" />
                                    <span>عضوِ انسانی و تلفظ:</span>
                                  </div>
                                  <div className="text-gray-700">عضو: {item.bodyPart}</div>
                                  <div className="text-gray-600 text-[11px]">تلفظ: {item.pronunciationType} | ضد: {item.oppositeElement}</div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Elemental Harmony, Nazeerah & Shadows Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Elemental Breakdown & Thermal Nature */}
            <div className="bg-[#fffdfa] rounded-2xl p-5 sm:p-6 border border-[#d4a373]/40 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-[#2c1e14] flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-500" />
                  <span>توازنِ عناصرِ اربعہ (قوانینِ افلاطون کاش البرنی)</span>
                </h3>
                <span className="text-xs font-semibold text-[#bc6c25]">
                  حاکم: {analysis.dominantElementUrdu.split(' ')[0]}
                </span>
              </div>

              {/* Elemental Progress Bars */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-gray-700">
                    <span className="text-red-700 flex items-center gap-1">🔥 آتشی (Fire) - حرارت و سوزش</span>
                    <span>{analysis.elementCounts.fire} حروف ({analysis.elementPercentages.fire}%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full" style={{ width: `${analysis.elementPercentages.fire}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-gray-700">
                    <span className="text-yellow-700 flex items-center gap-1">💨 بادی (Air) - حرکت و الفت</span>
                    <span>{analysis.elementCounts.air} حروف ({analysis.elementPercentages.air}%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full" style={{ width: `${analysis.elementPercentages.air}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-gray-700">
                    <span className="text-blue-700 flex items-center gap-1">💧 آبی (Water) - برکت و شفاء</span>
                    <span>{analysis.elementCounts.water} حروف ({analysis.elementPercentages.water}%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: `${analysis.elementPercentages.water}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-gray-700">
                    <span className="text-amber-800 flex items-center gap-1">🌍 خاکی (Earth) - ثبات و قرار</span>
                    <span>{analysis.elementCounts.earth} حروف ({analysis.elementPercentages.earth}%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-700 to-yellow-800 rounded-full" style={{ width: `${analysis.elementPercentages.earth}%` }} />
                  </div>
                </div>
              </div>

              {/* Temperament Note */}
              <div className="p-3.5 bg-[#fefae0] rounded-xl border border-[#d4a373]/30 text-xs text-[#2c1e14] leading-relaxed">
                <span className="font-bold text-[#bc6c25]">مزاج کی تحقیق: </span>
                {analysis.temperament}
              </div>

              {/* Luminous & Silent Ratios */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-[11px] text-gray-500 font-semibold">حروفِ نورانی بمقابلہ ظلمانی</div>
                  <div className="text-sm font-bold text-gray-800 mt-1">
                    {analysis.luminousRatio.luminousPercent}% نورانی / {100 - analysis.luminousRatio.luminousPercent}% ظلمانی
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-[11px] text-gray-500 font-semibold">حروفِ صوامت (بے نقط حصار)</div>
                  <div className="text-sm font-bold text-gray-800 mt-1">
                    {analysis.silentRatio.silentPercent}% صوامت / {100 - analysis.silentRatio.silentPercent}% منقوطہ
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Nazeerah, Shadow & Bast Operations */}
            <div className="bg-[#fffdfa] rounded-2xl p-5 sm:p-6 border border-[#d4a373]/40 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-[#2c1e14] flex items-center gap-2">
                  <Atom className="w-4 h-4 text-[#bc6c25]" />
                  <span>نظائر، بسط و اشتقاقاتِ طلسم (Shadow & Extensions)</span>
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                {/* Nazeerah Sequence */}
                <div className="p-3 bg-[#fdfaf5] rounded-xl border border-[#d4a373]/30 space-y-1">
                  <div className="font-bold text-gray-700 flex items-center justify-between">
                    <span>سلسلۂ نظائر (دائرة الابجد معکوسہ):</span>
                    <button
                      onClick={() => handleCopy(analysis.nazeerahSequence, 'nazeerah')}
                      className="text-[10px] text-[#bc6c25] hover:underline font-semibold"
                    >
                      {copiedKey === 'nazeerah' ? 'کاپی ہو گیا' : 'کاپی'}
                    </button>
                  </div>
                  <div className="text-sm font-bold text-[#bc6c25] tracking-wider" dir="rtl">
                    {analysis.nazeerahSequence}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    کاش البرنی: نظیرہ وہ باطنی سایہ ہے جو طلسم کے اثر کو مطلوب کے لاشعور میں جذب کرتا ہے۔
                  </div>
                </div>

                {/* Mirror Sequence */}
                <div className="p-3 bg-[#fdfaf5] rounded-xl border border-[#d4a373]/30 space-y-1">
                  <div className="font-bold text-gray-700 flex items-center justify-between">
                    <span>سلسلۂ معکوس (قلب و رجعت):</span>
                    <button
                      onClick={() => handleCopy(analysis.mirrorSequence, 'mirror')}
                      className="text-[10px] text-[#bc6c25] hover:underline font-semibold"
                    >
                      {copiedKey === 'mirror' ? 'کاپی ہو گیا' : 'کاپی'}
                    </button>
                  </div>
                  <div className="text-sm font-bold text-[#2c1e14] tracking-wider" dir="rtl">
                    {analysis.mirrorSequence}
                  </div>
                </div>

                {/* Bast Lafzi */}
                <div className="p-3 bg-[#fdfaf5] rounded-xl border border-[#d4a373]/30 space-y-1">
                  <div className="font-bold text-gray-700 flex items-center justify-between">
                    <span>بسطِ لفظی و تلفظ (Spelling Expansion):</span>
                    <span className="text-[11px] font-bold text-[#bc6c25]">مجموعہ: {analysis.bastLafziTotal}</span>
                  </div>
                  <div className="text-xs font-semibold text-gray-800" dir="rtl">
                    {analysis.bastLafziSpelling}
                  </div>
                </div>

                {/* Bast Adadi to Letters */}
                <div className="p-3 bg-[#fdfaf5] rounded-xl border border-[#d4a373]/30 space-y-1">
                  <div className="font-bold text-gray-700 flex items-center justify-between">
                    <span>بسطِ عددی کے حروف (Number Spelled in Letters):</span>
                  </div>
                  <div className="text-sm font-bold text-[#606c38] tracking-widest" dir="rtl">
                    {analysis.bastAdadiLetters}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scholarly Codex Commentary from Kaash Al-Biruni's Books */}
          <div className="bg-gradient-to-br from-[#2c1e14] to-[#3d2b1f] rounded-2xl p-6 text-[#f4ede2] border border-[#d4a373]/40 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#d4a373]/30 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#d4a373]" />
                <h3 className="text-lg font-bold text-[#fefae0]">
                  تحقیق و استناد از کتبِ کاش البرنی و البیرونی (Scholarly Codex Synthesis)
                </h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-[#d4a373]/20 border border-[#d4a373]/40 text-[#f3d5b5]">
                قوانینِ جفر و طلسم
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-white/5 p-4 rounded-xl border border-[#d4a373]/20 space-y-2">
                <div className="font-bold text-[#f3d5b5] flex items-center gap-1.5 text-sm">
                  <Sparkles className="w-4 h-4 text-[#d4a373]" />
                  <span>مفتاح الجفر (استخراجِ ملائکہ و موکلین):</span>
                </div>
                <p className="text-[#e9edc9] leading-relaxed">
                  {analysis.kashAlBarnyBookCommentary.miftahJafrContext}
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-[#d4a373]/20 space-y-2">
                <div className="font-bold text-[#f3d5b5] flex items-center gap-1.5 text-sm">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>قوانینِ افلاطون (قانونِ تاثیر و جذب):</span>
                </div>
                <p className="text-[#e9edc9] leading-relaxed">
                  {analysis.kashAlBarnyBookCommentary.aflatoonElementalHarmony}
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-[#d4a373]/20 space-y-2">
                <div className="font-bold text-[#f3d5b5] flex items-center gap-1.5 text-sm">
                  <Award className="w-4 h-4 text-[#d4a373]" />
                  <span>قوانینِ طلسم (ساعت، بخور اور ترکیبِ نقش):</span>
                </div>
                <p className="text-[#e9edc9] leading-relaxed">
                  {analysis.kashAlBarnyBookCommentary.qawaneenTilismRule}
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-[#d4a373]/20 space-y-2">
                <div className="font-bold text-[#f3d5b5] flex items-center gap-1.5 text-sm">
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <span>کتاب التفهیم للبیرونی (منازلِ فلکیہ و کواکب):</span>
                </div>
                <p className="text-[#e9edc9] leading-relaxed">
                  {analysis.kashAlBarnyBookCommentary.biruniAstronomicalNote}
                </p>
              </div>
            </div>

            {/* Practical Application Instructions Bar */}
            <div className="p-4 bg-[#d4a373]/15 rounded-xl border border-[#d4a373]/40 space-y-2">
              <div className="font-bold text-[#fefae0] flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>دستورِ عمل و شرائطِ تحریر (Practical Protocol):</span>
              </div>
              <p className="text-xs sm:text-sm text-[#f3d5b5] leading-relaxed">
                {analysis.kashAlBarnyBookCommentary.practicalApplicationUrdu}
              </p>
              <p className="text-[11px] text-[#dda15e] italic border-t border-[#d4a373]/20 pt-2 mt-2">
                ⚠️ {analysis.kashAlBarnyBookCommentary.warningAndEthics}
              </p>
            </div>
          </div>

          {/* Direct Workflow Integration Action Bar */}
          <div className="bg-[#fffdfa] rounded-2xl p-6 border-2 border-[#d4a373]/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-[#2c1e14]">
                اگلا مرحلہ: نقش یا تکسیر اسٹوڈیو میں برآمد کریں
              </h4>
              <p className="text-xs text-gray-600 mt-0.5">
                اس سلسلہ کے حاصل شدہ ابجد ({analysis.totalAbjadKabir}) کا نقش تیار کریں یا تکسیر کے ذریعے مکمل لوح بنائیں
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {onSendToNaqsh && (
                <button
                  onClick={() => onSendToNaqsh(analysis.totalAbjadKabir, `تحقیقِ جفر: ${analysis.cleanedLetters.slice(0, 4).join('')}`)}
                  className="px-5 py-2.5 rounded-xl bg-[#bc6c25] hover:bg-[#a35c1f] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>مولد النقوش میں بھیجیں (عدد: {analysis.totalAbjadKabir})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {onSendToTakseer && (
                <button
                  onClick={() => onSendToTakseer(analysis.cleanedLetters.join(''))}
                  className="px-5 py-2.5 rounded-xl bg-[#283618] hover:bg-[#1f2a13] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
                >
                  <Atom className="w-4 h-4" />
                  <span>تکسیر اسٹوڈیو میں بھیجیں</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Book Codex & Presets Catalog Tab */}
      {activeSubTab === 'book-codex' && (
        <div className="space-y-6">
          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2 pb-2">
            {[
              { id: 'all', label: 'تمام کتب و رموز' },
              { id: 'miftah_jafr', label: 'مفتاح الجفر (کاش البرنی)' },
              { id: 'qawaneen_tilism', label: 'قوانینِ طلسم (کاش البرنی)' },
              { id: 'qawaneen_aflatoon', label: 'قوانینِ افلاطون (عناصر)' },
              { id: 'rumooz_takseer', label: 'رموز التکسیر و الواح' },
              { id: 'biruni_astronomy', label: 'علم الفلک و البیرونی' },
              { id: 'salimani_tilism', label: 'طلسماتِ سلیمانی' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#bc6c25] text-white shadow-md'
                    : 'bg-[#fffdfa] text-[#2c1e14] border border-[#d4a373]/40 hover:bg-[#faedcd]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Presets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPresets.map(preset => (
              <div
                key={preset.id}
                className="bg-[#fffdfa] rounded-2xl p-5 border border-[#d4a373]/40 shadow-sm hover:border-[#bc6c25] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#faedcd] text-[#2c1e14] border border-[#d4a373]/30">
                      {preset.bookSource}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{preset.categoryUrdu}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#2c1e14]">
                    {preset.nameUrdu}
                  </h3>

                  {/* The Cipher Sequence Box */}
                  <div className="p-3 bg-[#fefae0] rounded-xl border border-[#d4a373]/30 text-center font-bold text-lg text-[#bc6c25] tracking-widest" dir="rtl">
                    {preset.sequence}
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {preset.descriptionUrdu}
                  </p>

                  <div className="p-2.5 bg-gray-50 rounded-lg text-[11px] text-gray-700 border border-gray-100">
                    <span className="font-bold text-[#2c1e14]">سرّ مخفی: </span>
                    {preset.esotericSecret}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-gray-500 truncate max-w-[200px]">
                    کاربرد: {preset.recommendedUse}
                  </span>
                  <button
                    onClick={() => handlePresetSelect(preset)}
                    className="px-4 py-1.5 rounded-lg bg-[#bc6c25] hover:bg-[#a35c1f] text-white text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <span>تحقیق و تجزیہ کریں</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 28 Jafr Letters Comprehensive Table Explorer Tab */}
      {activeSubTab === 'table-explorer' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-[#fffdfa] rounded-2xl p-5 border border-[#d4a373]/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={tableSearchQuery}
                onChange={(e) => setTableSearchQuery(e.target.value)}
                placeholder="تلاش کریں (حرف، عدد، کوکب یا منزل)..."
                className="w-full text-xs sm:text-sm px-3.5 py-2 pl-9 rounded-xl border border-[#d4a373]/50 focus:border-[#bc6c25] bg-white text-right outline-none"
                dir="rtl"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
              <span className="text-xs font-bold text-gray-600 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>عنصر:</span>
              </span>
              {[
                { id: 'all', label: 'تمام' },
                { id: 'fire', label: 'آتشی' },
                { id: 'air', label: 'بادی' },
                { id: 'water', label: 'آبی' },
                { id: 'earth', label: 'خاکی' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setTableElementFilter(item.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    tableElementFilter === item.id
                      ? 'bg-[#bc6c25] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <span className="text-xs font-bold text-gray-600 mr-2">نوعیت:</span>
              {[
                { id: 'all', label: 'تمام' },
                { id: 'nourani', label: 'نورانی' },
                { id: 'zulmani', label: 'ظلمانی' },
                { id: 'sowamat', label: 'صوامت (بے نقط)' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setTableTypeFilter(item.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    tableTypeFilter === item.id
                      ? 'bg-[#283618] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Full 28 Letters Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredLettersTable.map((item) => (
              <div
                key={item.letter}
                className="bg-[#fffdfa] rounded-2xl p-4 border border-[#d4a373]/30 shadow-sm hover:border-[#bc6c25] hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-9 h-9 rounded-xl bg-[#faedcd] border border-[#d4a373]/50 flex items-center justify-center text-xl font-extrabold text-[#2c1e14]">
                      {item.letter}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-[#2c1e14]">{item.name}</div>
                      <div className="text-[10px] text-gray-500">ابجد: {item.abjadKabir} | صغیر: {item.abjadSaghir}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.element === 'fire' ? 'bg-red-50 text-red-700' :
                    item.element === 'air' ? 'bg-yellow-50 text-yellow-800' :
                    item.element === 'water' ? 'bg-blue-50 text-blue-700' :
                    'bg-amber-50 text-amber-800'
                  }`}>
                    {item.elementUrdu.split(' ')[0]}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-gray-700 pt-2 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-500">کوکب و دھات:</span>
                    <span className="font-semibold">{item.planetUrdu.split(' ')[0]} ({item.metal.split(' ')[0]})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">منزلِ قمر:</span>
                    <span className="font-semibold truncate max-w-[140px]">{item.lunarMansion.name.split(' ')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">نظیرہ (Opposite):</span>
                    <span className="font-bold text-[#bc6c25]">{item.nazeerah}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">موکل علوی:</span>
                    <span className="font-semibold text-green-700 truncate max-w-[130px]">{item.muwakkil.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex gap-1">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${item.isNourani ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      {item.isNourani ? 'نورانی' : 'ظلمانی'}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${item.isSowamat ? 'bg-indigo-100 text-indigo-800' : 'bg-orange-100 text-orange-800'}`}>
                      {item.isSowamat ? 'صوامت' : 'ناطقہ'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleQuickInsert(item.letter);
                      setActiveSubTab('analyzer');
                    }}
                    className="text-[11px] font-bold text-[#bc6c25] hover:underline flex items-center gap-0.5"
                  >
                    <span>تجزیہ میں شامل کریں</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
