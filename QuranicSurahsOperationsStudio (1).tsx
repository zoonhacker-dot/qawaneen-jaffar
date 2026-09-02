import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Heart, 
  Lock, 
  Scale, 
  Briefcase, 
  Home, 
  Eye, 
  Award, 
  FileText, 
  CheckCircle2, 
  Copy, 
  Printer, 
  Share2, 
  Send, 
  AlertTriangle, 
  Compass, 
  Info,
  Clock,
  Feather,
  Layers,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Zap,
  Activity,
  HeartPulse
} from 'lucide-react';
import { QURANIC_OPERATIONS, QuranicOperation } from '../data/quranicOperationsData';
import { calculateAbjad } from '../utils/jafrEngine';

interface QuranicSurahsOperationsStudioProps {
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
  onSendToTakseerAflatoon?: (text: string) => void;
  onSendToIstikhara?: (text: string) => void;
}

export const QuranicSurahsOperationsStudio: React.FC<QuranicSurahsOperationsStudioProps> = ({
  onSendToNaqsh,
  onSendToTakseer,
  onSendToTakseerAflatoon,
  onSendToIstikhara
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedChal, setSelectedChal] = useState<string>('all');
  const [selectedOperation, setSelectedOperation] = useState<QuranicOperation>(QURANIC_OPERATIONS[0]);
  
  // Custom Names addition for personalized Naqsh
  const [includeCustomNames, setIncludeCustomNames] = useState<boolean>(false);
  const [talibName, setTalibName] = useState<string>('');
  const [talibMother, setTalibMother] = useState<string>('');
  const [matloobName, setMatloobName] = useState<string>('');
  const [matloobMother, setMatloobMother] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabSubView, setActiveTabSubView] = useState<'details' | 'liveNaqsh' | 'instructions' | 'rules'>('details');
  const [naqshViewMode, setNaqshViewMode] = useState<'adadi' | 'harfi'>('adadi');

  // Categories list
  const categories = [
    { id: 'all', label: 'تمام قرآنی اعمال و سورتیں', icon: BookOpen, count: QURANIC_OPERATIONS.length },
    { id: 'mahabbat_taskheer', label: 'محبت، تسخیر و بات منوانا', icon: Heart, count: QURANIC_OPERATIONS.filter(o => o.category === 'mahabbat_taskheer').length },
    { id: 'adawat_halakat', label: 'عداوت، تفریق و دفعِ ظالم', icon: Flame, count: QURANIC_OPERATIONS.filter(o => o.category === 'adawat_halakat').length },
    { id: 'zaban_bandi', label: 'زبان بندی و عقد اللسان', icon: Lock, count: QURANIC_OPERATIONS.filter(o => o.category === 'zaban_bandi').length },
    { id: 'muqadama_fatah', label: 'مقدمات، کورٹ و فتوحات', icon: Scale, count: QURANIC_OPERATIONS.filter(o => o.category === 'muqadama_fatah').length },
    { id: 'shifa_amraz', label: 'شفاء الامراض و سحر کشائی', icon: HeartPulse, count: QURANIC_OPERATIONS.filter(o => o.category === 'shifa_amraz').length },
    { id: 'shadi_bandish', label: 'شادی کی بندش لگانا / توڑنا', icon: Sparkles, count: QURANIC_OPERATIONS.filter(o => o.category === 'shadi_bandish').length },
    { id: 'rizq_karobar', label: 'کاروبار، دکان و وسعتِ رزق', icon: Briefcase, count: QURANIC_OPERATIONS.filter(o => o.category === 'rizq_karobar').length },
    { id: 'ghar_sakoon_jinnat', label: 'گھر کا سکون و دفعِ جنات', icon: Home, count: QURANIC_OPERATIONS.filter(o => o.category === 'ghar_sakoon_jinnat').length },
    { id: 'nas_nas_bandish', label: 'نس نس کی بندش کھولنا / بند کرنا', icon: Activity, count: QURANIC_OPERATIONS.filter(o => o.category === 'nas_nas_bandish').length },
    { id: 'istikhara_kashf', label: 'استخارۂ کشفی و تعبیرِ خواب', icon: Eye, count: QURANIC_OPERATIONS.filter(o => o.category === 'istikhara_kashf').length },
    { id: 'khufya_talismi_naqsh', label: 'خفیہ نقوش و طلسمی الواح', icon: Feather, count: QURANIC_OPERATIONS.filter(o => o.category === 'khufya_talismi_naqsh').length },
    { id: 'hazirat_jalali_jamali', label: 'حاضرات و جلالی/جمالی قواعد', icon: ShieldCheck, count: QURANIC_OPERATIONS.filter(o => o.category === 'hazirat_jalali_jamali').length },
  ];

  // Filter operations based on query and category
  const filteredOperations = useMemo(() => {
    return QURANIC_OPERATIONS.filter(op => {
      const matchCategory = selectedCategory === 'all' || op.category === selectedCategory;
      const matchChal = selectedChal === 'all' || op.chalType === selectedChal;
      const query = searchQuery.trim().toLowerCase();
      const matchSearch = !query || 
        op.surahNameUrdu.toLowerCase().includes(query) ||
        op.surahNameArabic.toLowerCase().includes(query) ||
        op.title.toLowerCase().includes(query) ||
        op.categoryUrdu.toLowerCase().includes(query) ||
        op.arabicText.toLowerCase().includes(query) ||
        op.methodDescription.toLowerCase().includes(query) ||
        op.secretNotes.toLowerCase().includes(query);

      return matchCategory && matchChal && matchSearch;
    });
  }, [searchQuery, selectedCategory, selectedChal]);

  // Calculate dynamic custom total adad
  const customNamesAdad = useMemo(() => {
    if (!includeCustomNames) return 0;
    const talibSum = calculateAbjad(talibName).totalKabir + calculateAbjad(talibMother).totalKabir;
    const matloobSum = calculateAbjad(matloobName).totalKabir + calculateAbjad(matloobMother).totalKabir;
    return talibSum + matloobSum;
  }, [includeCustomNames, talibName, talibMother, matloobName, matloobMother]);

  const effectiveTotalAdad = (selectedOperation?.adad || 0) + customNamesAdad;

  // Simple math helper to fill Musallas 3x3 Naqsh
  const musallasGrid = useMemo(() => {
    const total = effectiveTotalAdad;
    // Formula for 3x3: (Total - 12) / 3
    const baseVal = Math.max(1, Math.floor((total - 12) / 3));
    const remainder = (total - 12) % 3;

    // Houses 1 to 9 filling
    // If remainder == 1, add 1 to house 7
    // If remainder == 2, add 1 to house 4
    const getHouseVal = (houseNum: number) => {
      let val = baseVal + (houseNum - 1);
      if (remainder === 1 && houseNum >= 7) val += 1;
      if (remainder === 2 && houseNum >= 4) val += 1;
      return val;
    };

    // Standard Atishi/Ghazali 3x3 House Placement:
    // [House 4, House 9, House 2]
    // [House 3, House 5, House 7]
    // [House 8, House 1, House 6]
    return [
      [getHouseVal(4), getHouseVal(9), getHouseVal(2)],
      [getHouseVal(3), getHouseVal(5), getHouseVal(7)],
      [getHouseVal(8), getHouseVal(1), getHouseVal(6)]
    ];
  }, [effectiveTotalAdad]);

  // Simple math helper to fill Murabba 4x4 Naqsh
  const murabbaGrid = useMemo(() => {
    const total = effectiveTotalAdad;
    // Formula for 4x4: (Total - 30) / 4
    const baseVal = Math.max(1, Math.floor((total - 30) / 4));
    const remainder = (total - 30) % 4;

    const getHouseVal = (houseNum: number) => {
      let val = baseVal + (houseNum - 1);
      if (remainder === 1 && houseNum >= 13) val += 1;
      if (remainder === 2 && houseNum >= 9) val += 1;
      if (remainder === 3 && houseNum >= 5) val += 1;
      return val;
    };

    // Standard 4x4 House Layout:
    // [House 1, House 14, House 15, House 4]
    // [House 12, House 7, House 6, House 9]
    // [House 8, House 11, House 10, House 5]
    // [House 13, House 2, House 3, House 16]
    return [
      [getHouseVal(1), getHouseVal(14), getHouseVal(15), getHouseVal(4)],
      [getHouseVal(12), getHouseVal(7), getHouseVal(6), getHouseVal(9)],
      [getHouseVal(8), getHouseVal(11), getHouseVal(10), getHouseVal(5)],
      [getHouseVal(13), getHouseVal(2), getHouseVal(3), getHouseVal(16)]
    ];
  }, [effectiveTotalAdad]);

  // Convert numbers to Arabic Haroof for Harfi Naqsh representation
  const numberToHarfi = (num: number) => {
    const abjadMap: [number, string][] = [
      [1000, 'غ'], [900, 'ظ'], [800, 'ض'], [700, 'ذ'], [600, 'خ'],
      [500, 'ث'], [400, 'ت'], [300, 'ش'], [200, 'ر'], [100, 'ق'],
      [90, 'ص'], [80, 'ف'], [70, 'ع'], [60, 'س'], [50, 'ن'],
      [40, 'م'], [30, 'ل'], [20, 'ک'], [10, 'ی'],
      [9, 'ط'], [8, 'ح'], [7, 'ز'], [6, 'و'], [5, 'ہ'],
      [4, 'د'], [3, 'ج'], [2, 'ب'], [1, 'ا']
    ];
    let remaining = num;
    let result = '';
    for (const [val, char] of abjadMap) {
      while (remaining >= val) {
        result += char;
        remaining -= val;
      }
    }
    return result || 'ا';
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#bc6c25]/30 bg-gradient-to-br from-[#fbf8f1] via-[#faedcd]/40 to-[#fdfaf1] p-6 md:p-10 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bc6c25]/10 border border-[#bc6c25]/30 text-xs font-bold text-[#bc6c25]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>محیطِ اعظم: جامع انسائیکلوپیڈیا و مولدِ نقوشِ قرآنی</span>
            </div>
            <h1 className="font-amiri text-2xl md:text-4xl font-bold text-[#2c1e14] leading-tight">
              قرآنی سورتوں اور آیات کے نقوش و عملیات برائے جملہ مقاصد
            </h1>
            <p className="text-sm md:text-base text-[#5d4037] leading-relaxed">
              ہر سورت و آیت کا الگ الگ مجرب نقش، طلسمی الواح، اعدادِ ابجد، عنصری چالیں (آتشی، بادی، آبی، خاکی)، ساعات و بخورات، اور جملہ مقاصد (محبت، عداوت، زبان بندی، مقدمات، شفاء، شادی و نس نس کی بندش) کے قطعی اعمال۔
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap gap-2 shrink-0">
            <div className="p-3 rounded-2xl bg-white/80 border border-[#d4a373]/40 text-center shadow-xs">
              <span className="block text-2xl font-bold font-amiri text-[#bc6c25]">{QURANIC_OPERATIONS.length}</span>
              <span className="text-[11px] text-[#7f5539]">مکمل اعمال و نقوش</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/80 border border-[#d4a373]/40 text-center shadow-xs">
              <span className="block text-2xl font-bold font-amiri text-[#283618]">۱۲</span>
              <span className="text-[11px] text-[#7f5539]">اہم مقاصد و زمرہ جات</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/80 border border-[#d4a373]/40 text-center shadow-xs">
              <span className="block text-2xl font-bold font-amiri text-[#606c38]">۴</span>
              <span className="text-[11px] text-[#7f5539]">عناصری چالیں</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Selection Filter Pills */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#7f5539] uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#bc6c25]" />
            <span>انتخابِ مقصد و زمرہ (Select Intention / Category):</span>
          </label>
          <span className="text-xs text-[#8d6e63]">
            نمایاں نتائج: <strong className="text-[#bc6c25]">{filteredOperations.length}</strong> عمل
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#d4a373]">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all shrink-0 cursor-pointer shadow-2xs ${
                  isSelected
                    ? 'bg-[#bc6c25] text-white shadow-sm ring-2 ring-[#bc6c25]/30 scale-[1.02]'
                    : 'bg-white/90 text-[#5d4037] border border-[#d4a373]/40 hover:bg-[#faedcd]/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#bc6c25]'}`} />
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#faedcd] text-[#7f5539]'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Element Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7f5539]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="قرآنی سورت، آیت، کلمہ یا مقصد تلاش کریں (مثلاً: الفاتحہ، یٰس، محبت، زبان بندی، شفاء، مقدمہ، شادی، جنات، رزق)..."
            className="w-full pl-4 pr-11 py-3 rounded-2xl bg-white border border-[#d4a373]/50 focus:border-[#bc6c25] focus:ring-2 focus:ring-[#bc6c25]/20 text-sm text-[#2c1e14] placeholder-[#a89078] outline-none shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#8d6e63] hover:text-[#2c1e14]"
            >
              صاف کریں
            </button>
          )}
        </div>

        <div>
          <select
            value={selectedChal}
            onChange={(e) => setSelectedChal(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white border border-[#d4a373]/50 focus:border-[#bc6c25] focus:ring-2 focus:ring-[#bc6c25]/20 text-sm text-[#2c1e14] outline-none shadow-2xs cursor-pointer"
          >
            <option value="all">تمام عناصری چالیں (All Element Chals)</option>
            <option value="atishi">🔥 آتشی چال (مشرق - تسخیر، غلبہ و ہلاکت)</option>
            <option value="badi">💨 بادی چال (شمال - محبت، رشتہ و فتوحات)</option>
            <option value="aabi">💧 آبی چال (مغرب - شفاء، سکون و رزق)</option>
            <option value="khaaki">🌍 خاکی چال (جنوب - زبان بندی و حصار)</option>
          </select>
        </div>
      </div>

      {/* Main Studio Content Area: Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side (Desktop 4 Cols): Operations List Index */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-[#5d4037] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#bc6c25]" />
              <span>فہرستِ اعمال و نقوش ({filteredOperations.length}):</span>
            </h3>
          </div>

          <div className="max-h-[680px] overflow-y-auto space-y-2.5 pr-1 scrollbar-thin scrollbar-thumb-[#d4a373]">
            {filteredOperations.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-white/70 border border-dashed border-[#d4a373] text-sm text-[#8d6e63]">
                کوئی عمل دستیاب نہیں۔ براہ کرم تلاش کے الفاظ یا فلٹر تبدیل کریں۔
              </div>
            ) : (
              filteredOperations.map((op) => {
                const isSelected = selectedOperation?.id === op.id;
                return (
                  <div
                    key={op.id}
                    onClick={() => setSelectedOperation(op)}
                    className={`p-4 rounded-2xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#faedcd] border-[#bc6c25] shadow-md ring-1 ring-[#bc6c25]'
                        : 'bg-white/85 border-[#d4a373]/40 hover:bg-[#faedcd]/40 hover:border-[#bc6c25]/50 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-amiri font-bold text-base text-[#2c1e14]">
                            {op.surahNameUrdu}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#bc6c25]/10 text-[#bc6c25] font-bold">
                            {op.ayahRange}
                          </span>
                          {op.isJalali ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-bold">
                              جلالی
                            </span>
                          ) : (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-bold">
                              جمالی
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5d4037] font-medium line-clamp-2 leading-relaxed">
                          {op.title}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-[#d4a373]/30 flex items-center justify-between text-[11px] text-[#8d6e63]">
                      <span className="flex items-center gap-1 font-mono font-bold text-[#bc6c25]">
                        عدد: {op.adad.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        {op.naqshTypeUrdu} • {op.chalUrdu}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side (Desktop 8 Cols): Detailed Operation & Live Naqsh Engine */}
        <div className="lg:col-span-8 space-y-6">
          {selectedOperation && (
            <div className="rounded-3xl border-2 border-[#bc6c25]/40 bg-white/95 p-6 md:p-8 shadow-md space-y-6">
              
              {/* Header of Active Operation */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-5 border-[#d4a373]/30">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#bc6c25] text-white">
                      {selectedOperation.categoryUrdu}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#faedcd] text-[#7f5539] border border-[#d4a373]">
                      {selectedOperation.surahNameUrdu} ({selectedOperation.ayahRange})
                    </span>
                    {selectedOperation.sourceBook && (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#d4a373]/20 text-[#5d4037] border border-[#d4a373]">
                        کتاب: {selectedOperation.sourceBook}
                      </span>
                    )}
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#ccd5ae] text-[#283618]">
                      ساعت: {selectedOperation.saat}
                    </span>
                  </div>
                  <h2 className="font-amiri text-xl md:text-2xl font-bold text-[#2c1e14]">
                    {selectedOperation.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handlePrint}
                    className="p-2.5 rounded-xl border border-[#d4a373] text-[#7f5539] hover:bg-[#faedcd] transition-all cursor-pointer"
                    title="پرنٹ یا PDF محفوظ کریں"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCopyText(selectedOperation.arabicText, 'arabic-text')}
                    className="p-2.5 rounded-xl border border-[#d4a373] text-[#7f5539] hover:bg-[#faedcd] transition-all cursor-pointer"
                    title="عربی عبارت کاپی کریں"
                  >
                    {copiedId === 'arabic-text' ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Arabic Ayah Text Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#faedcd]/40 to-[#fdfaf1] border border-[#d4a373] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#7f5539]">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#bc6c25]" />
                    <span>متنِ قرآنی مع اعراب و اعداد:</span>
                  </span>
                  <span className="font-mono text-sm text-[#bc6c25] font-bold">
                    ابجد کبیر: {selectedOperation.adad.toLocaleString()}
                  </span>
                </div>
                <p className="font-amiri text-lg md:text-xl text-[#2c1e14] leading-loose text-center py-2 dir-rtl">
                  {selectedOperation.arabicText}
                </p>
              </div>

              {/* Sub-view Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-[#d4a373]/40 pb-2">
                <button
                  onClick={() => setActiveTabSubView('details')}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                    activeTabSubView === 'details'
                      ? 'bg-[#bc6c25] text-white shadow-xs'
                      : 'text-[#7f5539] hover:bg-[#faedcd]/50'
                  }`}
                >
                  طریقۂ عمل و بخورات
                </button>
                <button
                  onClick={() => setActiveTabSubView('liveNaqsh')}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTabSubView === 'liveNaqsh'
                      ? 'bg-[#bc6c25] text-white shadow-xs'
                      : 'text-[#7f5539] hover:bg-[#faedcd]/50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>حسابی نقش و الواح</span>
                </button>
                <button
                  onClick={() => setActiveTabSubView('instructions')}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                    activeTabSubView === 'instructions'
                      ? 'bg-[#bc6c25] text-white shadow-xs'
                      : 'text-[#7f5539] hover:bg-[#faedcd]/50'
                  }`}
                >
                  حصار و قواعدِ پرہیز
                </button>
                <button
                  onClick={() => setActiveTabSubView('rules')}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                    activeTabSubView === 'rules'
                      ? 'bg-[#bc6c25] text-white shadow-xs'
                      : 'text-[#7f5539] hover:bg-[#faedcd]/50'
                  }`}
                >
                  خفیہ رموز و اسرار
                </button>
              </div>

              {/* SUBVIEW 1: DETAILS & METHOD */}
              {activeTabSubView === 'details' && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Technical Specifications Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-[#faedcd]/30 border border-[#d4a373]/40">
                      <span className="block text-[11px] text-[#8d6e63]">ہیئتِ نقش:</span>
                      <strong className="text-xs text-[#2c1e14]">{selectedOperation.naqshTypeUrdu}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-[#faedcd]/30 border border-[#d4a373]/40">
                      <span className="block text-[11px] text-[#8d6e63]">عنصری چال:</span>
                      <strong className="text-xs text-[#2c1e14]">{selectedOperation.chalUrdu}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-[#faedcd]/30 border border-[#d4a373]/40">
                      <span className="block text-[11px] text-[#8d6e63]">حاکم سیارہ:</span>
                      <strong className="text-xs text-[#2c1e14]">{selectedOperation.planetUrdu}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-[#faedcd]/30 border border-[#d4a373]/40">
                      <span className="block text-[11px] text-[#8d6e63]">تعدادِ ورد / نصاب:</span>
                      <strong className="text-xs text-[#2c1e14]">{selectedOperation.wazifaCount}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-[#faedcd]/30 border border-[#d4a373]/40">
                      <span className="block text-[11px] text-[#8d6e63]">مدتِ چلہ / عمل:</span>
                      <strong className="text-xs text-[#2c1e14]">{selectedOperation.durationDays} یوم</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-[#faedcd]/30 border border-[#d4a373]/40">
                      <span className="block text-[11px] text-[#8d6e63]">روشنائی و کاغذ:</span>
                      <strong className="text-xs text-[#2c1e14]">{selectedOperation.ink}</strong>
                    </div>
                    <div className="col-span-2 p-3 rounded-xl bg-[#faedcd]/30 border border-[#d4a373]/40">
                      <span className="block text-[11px] text-[#8d6e63]">موافق بخور:</span>
                      <strong className="text-xs text-[#2c1e14]">{selectedOperation.incense}</strong>
                    </div>
                  </div>

                  {/* Method of Operation */}
                  <div className="p-5 rounded-2xl bg-white border-2 border-[#d4a373]/40 space-y-3">
                    <h4 className="text-sm font-bold text-[#5d4037] flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#bc6c25]" />
                      <span>طریقۂ عمل و استعمال (Application Protocol):</span>
                    </h4>
                    <p className="text-sm text-[#2c1e14] leading-relaxed whitespace-pre-line font-medium">
                      {selectedOperation.methodDescription}
                    </p>
                  </div>

                  {/* Personalized Names Addition Section */}
                  <div className="p-5 rounded-2xl bg-[#faedcd]/20 border border-[#bc6c25]/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="includeNamesCheck"
                          checked={includeCustomNames}
                          onChange={(e) => setIncludeCustomNames(e.target.checked)}
                          className="w-4 h-4 text-[#bc6c25] rounded focus:ring-[#bc6c25] cursor-pointer"
                        />
                        <label htmlFor="includeNamesCheck" className="text-sm font-bold text-[#2c1e14] cursor-pointer">
                          طالب و مطلوب کے ناموں کا حسابی اضافہ کریں (Personalize Naqsh with Names)
                        </label>
                      </div>
                      {includeCustomNames && (
                        <span className="text-xs font-mono font-bold text-[#bc6c25] px-2 py-0.5 rounded bg-white border border-[#d4a373]">
                          اضافی اعداد: +{customNamesAdad}
                        </span>
                      )}
                    </div>

                    {includeCustomNames && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                        <div>
                          <label className="block text-[11px] text-[#7f5539] mb-1">نامِ طالب:</label>
                          <input
                            type="text"
                            value={talibName}
                            onChange={(e) => setTalibName(e.target.value)}
                            placeholder="مثلاً: محمد علی"
                            className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#d4a373]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#7f5539] mb-1">والدہ طالب:</label>
                          <input
                            type="text"
                            value={talibMother}
                            onChange={(e) => setTalibMother(e.target.value)}
                            placeholder="مثلاً: حوا"
                            className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#d4a373]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#7f5539] mb-1">نامِ مطلوب / مقصد:</label>
                          <input
                            type="text"
                            value={matloobName}
                            onChange={(e) => setMatloobName(e.target.value)}
                            placeholder="مثلاً: فاطمہ"
                            className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#d4a373]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#7f5539] mb-1">والدہ مطلوب:</label>
                          <input
                            type="text"
                            value={matloobMother}
                            onChange={(e) => setMatloobMother(e.target.value)}
                            placeholder="مثلاً: مریم"
                            className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#d4a373]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SUBVIEW 2: LIVE NAQSH GRID */}
              {activeTabSubView === 'liveNaqsh' && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Naqsh Header Info */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-[#faedcd]/40 border border-[#d4a373]">
                    <div>
                      <span className="text-xs text-[#7f5539]">مجموعی میزانِ عدد:</span>
                      <h3 className="font-mono text-xl font-bold text-[#bc6c25]">
                        {effectiveTotalAdad.toLocaleString()}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#7f5539]">نمائش:</span>
                      <div className="flex rounded-xl bg-white border border-[#d4a373] p-0.5">
                        <button
                          onClick={() => setNaqshViewMode('adadi')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            naqshViewMode === 'adadi' ? 'bg-[#bc6c25] text-white' : 'text-[#7f5539]'
                          }`}
                        >
                          عددی
                        </button>
                        <button
                          onClick={() => setNaqshViewMode('harfi')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            naqshViewMode === 'harfi' ? 'bg-[#bc6c25] text-white' : 'text-[#7f5539]'
                          }`}
                        >
                          حرفی (طلسمی)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Visual Naqsh Canvas Frame */}
                  <div className="max-w-md mx-auto p-6 rounded-3xl bg-[#fdfaf1] border-4 border-[#bc6c25] shadow-lg text-center space-y-4">
                    <div className="font-amiri text-sm font-bold text-[#bc6c25] tracking-wide">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ (۷۸۶)
                    </div>

                    {/* Naqsh Table */}
                    {selectedOperation.naqshType === 'musallas' ? (
                      <div className="grid grid-cols-3 gap-1 border-2 border-[#bc6c25] bg-[#bc6c25] p-1 rounded-xl">
                        {musallasGrid.map((row, rIdx) =>
                          row.map((cellVal, cIdx) => (
                            <div
                              key={`${rIdx}-${cIdx}`}
                              className="aspect-square flex items-center justify-center bg-white p-2 rounded text-center shadow-xs font-amiri font-bold text-base md:text-lg text-[#2c1e14]"
                            >
                              {naqshViewMode === 'adadi' ? cellVal.toLocaleString() : numberToHarfi(cellVal)}
                            </div>
                          ))
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-1 border-2 border-[#bc6c25] bg-[#bc6c25] p-1 rounded-xl">
                        {murabbaGrid.map((row, rIdx) =>
                          row.map((cellVal, cIdx) => (
                            <div
                              key={`${rIdx}-${cIdx}`}
                              className="aspect-square flex items-center justify-center bg-white p-1 rounded text-center shadow-xs font-amiri font-bold text-xs md:text-sm text-[#2c1e14]"
                            >
                              {naqshViewMode === 'adadi' ? cellVal.toLocaleString() : numberToHarfi(cellVal)}
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-[#7f5539] pt-2 border-t border-[#d4a373]/30">
                      <span>عنصر: {selectedOperation.chalUrdu}</span>
                      <span>موکل: {selectedOperation.planetUrdu}</span>
                      <span>ساعت: {selectedOperation.saat.split('(')[0]}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBVIEW 3: INSTRUCTIONS & HISAR */}
              {activeTabSubView === 'instructions' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-3">
                    <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-700" />
                      <span>قواعدِ حصار و طریقۂ حفاظت (Hisar & Shielding):</span>
                    </h4>
                    <p className="text-sm text-amber-900 leading-relaxed font-medium">
                      {selectedOperation.hisarFormula}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-red-50/80 border border-red-200 space-y-3">
                    <h4 className="text-sm font-bold text-red-900 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-700" />
                      <span>شرائطِ پرہیز و احتیاط (Precautions & Fasting Rules):</span>
                    </h4>
                    <p className="text-sm text-red-900 leading-relaxed font-medium">
                      {selectedOperation.parhaizConditions}
                    </p>
                  </div>
                </div>
              )}

              {/* SUBVIEW 4: SECRET NOTES */}
              {activeTabSubView === 'rules' && (
                <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-3 animate-fade-in">
                  <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                    <Feather className="w-4 h-4 text-blue-700" />
                    <span>خفیہ رموز و اکابرین کا تجربہ (Secret Esoteric Insights):</span>
                  </h4>
                  <p className="text-sm text-blue-900 leading-relaxed font-medium">
                    {selectedOperation.secretNotes}
                  </p>
                </div>
              )}

              {/* Cross-Studio Dispatch Action Bar */}
              <div className="p-4 rounded-2xl bg-[#faedcd]/40 border border-[#d4a373] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-[#7f5539] flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#bc6c25]" />
                  <span>براہِ راست دیگر اسٹوڈیوز میں بھیجیں:</span>
                </span>

                <div className="flex flex-wrap gap-2">
                  {onSendToNaqsh && (
                    <button
                      onClick={() => onSendToNaqsh(effectiveTotalAdad)}
                      className="px-3.5 py-2 rounded-xl bg-[#bc6c25] hover:bg-[#a2581f] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>مولد النقوش (Naqsh Studio)</span>
                    </button>
                  )}

                  {onSendToTakseer && (
                    <button
                      onClick={() => onSendToTakseer(selectedOperation.arabicText.slice(0, 40))}
                      className="px-3.5 py-2 rounded-xl bg-[#283618] hover:bg-[#344420] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>تکسیرِ جفر (Takseer)</span>
                    </button>
                  )}

                  {onSendToTakseerAflatoon && (
                    <button
                      onClick={() => onSendToTakseerAflatoon(selectedOperation.arabicText.slice(0, 30))}
                      className="px-3.5 py-2 rounded-xl bg-[#606c38] hover:bg-[#4f5a2e] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>تکسیرِ افلاطون</span>
                    </button>
                  )}

                  {onSendToIstikhara && (
                    <button
                      onClick={() => onSendToIstikhara(selectedOperation.title)}
                      className="px-3.5 py-2 rounded-xl bg-[#5d4037] hover:bg-[#4e342e] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>استخارہ و کشف</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
