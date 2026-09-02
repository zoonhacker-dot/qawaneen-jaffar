import React, { useState, useMemo } from 'react';
import { 
  PURPOSE_CATEGORIES, 
  JAFR_INDEXED_OPERATIONS, 
  IndexedOperation 
} from '../data/jafrOperationsIndexData';
import { 
  Layers, 
  Flame, 
  Heart, 
  Lock, 
  Users, 
  Sparkles, 
  HeartPulse, 
  ShieldAlert, 
  Coins, 
  Eye, 
  ShieldCheck, 
  Search, 
  Filter, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  AlertTriangle, 
  Zap, 
  ExternalLink, 
  Copy, 
  Check, 
  Compass, 
  Droplets, 
  Wind, 
  Mountain,
  ChevronDown,
  ChevronUp,
  Shield,
  Printer,
  Gem
} from 'lucide-react';

interface JafrOperationsIndexProps {
  onNavigateTab: (tabId: string) => void;
  onSendToNaqsh: (adad: number) => void;
  onSendToTakseer: (text: string) => void;
}

export const JafrOperationsIndex: React.FC<JafrOperationsIndexProps> = ({
  onNavigateTab,
  onSendToNaqsh,
  onSendToTakseer,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedSpeed, setSelectedSpeed] = useState<string>('all');
  const [expandedOperationId, setExpandedOperationId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeModalOp, setActiveModalOp] = useState<IndexedOperation | null>(null);

  // Category Icon Resolver
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return Flame;
      case 'Gem': return Gem;
      case 'Heart': return Heart;
      case 'Lock': return Lock;
      case 'Users': return Users;
      case 'Sparkles': return Sparkles;
      case 'HeartPulse': return HeartPulse;
      case 'ShieldAlert': return ShieldAlert;
      case 'Coins': return Coins;
      case 'Eye': return Eye;
      case 'ShieldCheck': return ShieldCheck;
      default: return Layers;
    }
  };

  // Element Icon Resolver
  const getElementIcon = (element: string) => {
    switch (element) {
      case 'fire': return Flame;
      case 'air': return Wind;
      case 'water': return Droplets;
      case 'earth': return Mountain;
      default: return Sparkles;
    }
  };

  // Filter Operations
  const filteredOperations = useMemo(() => {
    return JAFR_INDEXED_OPERATIONS.filter((op) => {
      // Category filter
      if (selectedCategory !== 'all' && op.purposeCategory !== selectedCategory) {
        return false;
      }
      // Severity filter
      if (selectedSeverity !== 'all' && op.severity !== selectedSeverity) {
        return false;
      }
      // Speed filter
      if (selectedSpeed !== 'all' && op.speed !== selectedSpeed) {
        return false;
      }
      // Search Query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = op.urduTitle.toLowerCase().includes(query) || op.title.toLowerCase().includes(query);
        const matchSource = op.sourceBook.toLowerCase().includes(query) || op.author.toLowerCase().includes(query);
        const matchSummary = op.summary.toLowerCase().includes(query);
        const matchIncense = op.incense.toLowerCase().includes(query);
        const matchAzimat = op.azimatOrFormula.toLowerCase().includes(query);
        const matchCategory = op.purposeCategoryUrdu.toLowerCase().includes(query);
        return matchTitle || matchSource || matchSummary || matchIncense || matchAzimat || matchCategory;
      }
      return true;
    });
  }, [selectedCategory, selectedSeverity, selectedSpeed, searchQuery]);

  // One-Night / High-Voltage Operations Count
  const oneNightOperations = useMemo(() => {
    return JAFR_INDEXED_OPERATIONS.filter(op => op.purposeCategory === 'dafa_dushman_halakat' || op.speed === 'one_night');
  }, []);

  const handleCopyFormula = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePrintProtocol = (op: IndexedOperation) => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header & Overview Banner */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#d4a373] bg-gradient-to-br from-[#f2e8cf] via-[#faedcd] to-[#e7d8c9] p-6 md:p-8 shadow-lg">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#bc6c25]/15 border border-[#bc6c25]/30 text-[#bc6c25] text-xs font-bold shadow-sm">
              <Compass className="h-3.5 w-3.5" />
              <span>جامع اشاریہ و فہرس العملیات بالجفر</span>
            </div>
            <h1 className="font-amiri text-3xl md:text-4xl font-bold text-[#43281c] leading-tight">
              فہرستِ مقاصد و عملیاتِ جفر (Jafr Operations Index)
            </h1>
            <p className="text-sm md:text-base text-[#6f4e37] font-medium leading-relaxed">
              تمام دستیاب علوم، کتبِ قدیمہ (کاش البرنی، ابن سینا، امام البونیؒ، طمطم ہندی، مولانا سربازیؒ) کے مجرب عملیات کی موضوع وار درجہ بندی، شرائط، اوقات اور متعلقہ اسٹوڈیوز تک فوری رسائی۔
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap lg:flex-col items-center sm:items-end gap-2.5 shrink-0">
            <div className="flex items-center gap-2 bg-[#ffffff]/80 backdrop-blur-sm border border-[#d4a373] px-4 py-2 rounded-2xl shadow-sm text-xs font-bold text-[#5d4037]">
              <Layers className="h-4 w-4 text-[#bc6c25]" />
              <span>کل درج شدہ اعمال: {JAFR_INDEXED_OPERATIONS.length} مجربات</span>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('dafa_dushman_halakat');
                const el = document.getElementById('dafa-dushman-special-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 bg-[#9d0208] hover:bg-[#780000] text-white px-4 py-2 rounded-2xl shadow-md text-xs font-bold transition-all cursor-pointer"
            >
              <Flame className="h-4 w-4 animate-pulse text-[#ffb703]" />
              <span>عملیاتِ شبِ واحد (دفعِ دشمن): {oneNightOperations.length} اعمال</span>
            </button>
          </div>
        </div>
      </div>

      {/* SPECIAL SPOTLIGHT BANNER: 1-Night Operations Against Tyrants (ایک رات میں دشمن کو دفع اور ہلاک کرنے کے جگری طلسمات) */}
      <div 
        id="dafa-dushman-special-section" 
        className="relative overflow-hidden rounded-3xl border-2 border-[#d00000] bg-gradient-to-br from-[#2c0003] via-[#4a0006] to-[#1a0002] p-6 md:p-8 text-white shadow-xl"
      >
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#d00000]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-[#ffb703]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#9d0208]/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#9d0208] text-[#ffb703] shadow-md ring-2 ring-[#ffb703]/40">
                <Flame className="h-7 w-7 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#d00000] text-white text-[11px] font-bold tracking-wide uppercase">
                    فوری تاثیر و شبِ واحد
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffb703]/20 text-[#ffb703] border border-[#ffb703]/40 text-[11px] font-bold">
                    شدید جلالی و قہریہ
                  </span>
                </div>
                <h2 className="font-amiri text-2xl md:text-3xl font-bold text-[#ffccd5] mt-1">
                  ایک رات میں دشمن کو دفع کرنے اور ہلاک کرنے کے جگری طلسماتی عملیات
                </h2>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('hisar')}
              className="flex items-center gap-2 bg-[#ffffff]/10 hover:bg-[#ffffff]/20 border border-[#ffccd5]/40 text-[#ffccd5] px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4 text-[#80ed99]" />
              <span>پہلے فولادی حصار باندھیں (لازمی شرط)</span>
            </button>
          </div>

          {/* Description & Ethical Conditions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3 text-sm text-[#ffccd5]/90 leading-relaxed font-urdu">
              <p>
                کتبِ قدیمہ (<span className="text-[#ffb703] font-bold">طلسماتِ طمطم ہندی، مجرباتِ ابن سینا، اور قوانینِ طلسم کاش البرنی</span>) میں ظالم کے فتنہ و فساد کو فی الفور جڑ سے اکھاڑنے اور مظلوم کی داد رسی کے لیے ایسے قاطع عملیات درج ہیں جن کی تاثیر چند گھنٹوں یا شبِ واحد (ایک رات) میں ظاہر ہوتی ہے۔
              </p>
              
              <div className="rounded-2xl bg-[#000000]/40 border border-[#d00000]/60 p-4 space-y-2">
                <div className="flex items-center gap-2 text-[#ffb703] font-bold text-xs">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-[#ffb703]" />
                  <span>سخت ترین شرعی، قانونی و اخلاقی انتباہ (رجعتِ کبیرہ کا خطرہ):</span>
                </div>
                <ul className="list-disc list-inside text-xs text-[#ffccd5] space-y-1 pr-1 font-medium">
                  <li>یہ عملیات صرف اور صرف اس وقت جائز ہیں جب ستمگر کی زیادتی جان، مال، آبرو یا دین کے لیے سنگین خطرہ بن چکی ہو اور تمام قانونی و اخلاقی راہیں مسدود ہوں۔</li>
                  <li>کسی بے گناہ، معمولی رنجش یا ذاتی حسد و لالچ کے تحت کرنے پر یہ قہر <strong className="text-[#ff4d6d]">خود عامل اور اس کے خاندان کو جلا کر راکھ</strong> کر دیتا ہے۔</li>
                  <li>عمل سے قبل صدقہ سیاہ بکرا یا سیاہ مرغ دینا اور فولادی حصار قائم کرنا فرض ہے۔</li>
                </ul>
              </div>
            </div>

            {/* Quick 1-Click Dispatch to 1-Night Studios */}
            <div className="rounded-2xl bg-[#9d0208]/30 border border-[#ffb703]/30 p-4 space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="font-amiri text-base font-bold text-[#ffb703] mb-1">
                  براہِ راست اسٹوڈیوز تک رسائی
                </h4>
                <p className="text-[11px] text-[#ffccd5]/80">
                  کسی بھی قاطع عمل کو متعلقہ جفری اسٹوڈیو میں لوڈ کر کے اعداد و تکسیر حاصل کریں:
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => onNavigateTab('tamtam-hindi')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#d00000] hover:bg-[#ba181b] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Flame className="h-3.5 w-3.5 text-[#ffb703]" />
                    <span>طلسماتِ طمطم ہندی اسٹوڈیو</span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </button>

                <button
                  onClick={() => onNavigateTab('mujarrabat-ibn-sina')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#370617] hover:bg-[#540b0e] border border-[#ffb703]/30 text-[#ffccd5] text-xs font-bold transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-[#ffb703]" />
                    <span>مجرباتِ ابن سینا (ناموسِ پنجم)</span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </button>

                <button
                  onClick={() => {
                    onSendToNaqsh(940);
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#000000]/60 hover:bg-[#000000]/80 border border-[#ff4d6d]/40 text-[#ffccd5] text-xs font-bold transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5 text-[#80ed99]" />
                    <span>نقشِ قہر (عدد ۹۴۰ - یا قہار) بنائیں</span>
                  </span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH, FILTER & PURPOSE SELECTOR */}
      <div className="space-y-4">
        {/* Search & Secondary Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#fdfaf1] p-4 rounded-2xl border border-[#d4a373] shadow-sm">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8d6e63]" />
            <input
              id="input-operations-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="تلاش کریں: عمل کا نام، کتاب، بخور، مقصد، آیت، یا مصنف..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-[#d4a373] bg-[#ffffff] text-sm text-[#43281c] placeholder-[#a89078] focus:outline-none focus:ring-2 focus:ring-[#bc6c25] font-urdu"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#8d6e63] hover:text-[#43281c]"
              >
                صاف کریں
              </button>
            )}
          </div>

          {/* Severity Filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-[#5d4037] shrink-0">شدت و نوعیت:</label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#d4a373] bg-[#ffffff] text-xs font-bold text-[#5d4037] focus:outline-none focus:ring-2 focus:ring-[#bc6c25] font-urdu cursor-pointer"
            >
              <option value="all">تمام درجات</option>
              <option value="safe">خیر و جمالی (محفوظ)</option>
              <option value="caution">محتاط (ریاضت و چلہ)</option>
              <option value="warning">جلالی و قہریہ</option>
              <option value="critical_qahr">شدید قہر (خطرناک)</option>
            </select>
          </div>

          {/* Speed Filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-[#5d4037] shrink-0">مدتِ تاثیر:</label>
            <select
              value={selectedSpeed}
              onChange={(e) => setSelectedSpeed(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#d4a373] bg-[#ffffff] text-xs font-bold text-[#5d4037] focus:outline-none focus:ring-2 focus:ring-[#bc6c25] font-urdu cursor-pointer"
            >
              <option value="all">تمام مدات</option>
              <option value="one_night">ایک رات (شبِ واحد)</option>
              <option value="instant">فوری (بوقتِ ضرورت)</option>
              <option value="three_days">۳ دن تا ۷ دن</option>
              <option value="seven_days">پائیدار / چلہ</option>
            </select>
          </div>
        </div>

        {/* Purpose Category Grid Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {PURPOSE_CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.iconName);
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? JAFR_INDEXED_OPERATIONS.length 
              : JAFR_INDEXED_OPERATIONS.filter(o => o.purposeCategory === cat.id).length;

            return (
              <button
                key={cat.id}
                id={`btn-purpose-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-2xl border transition-all text-right flex flex-col justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? `${cat.bgColorClass} ${cat.borderColorClass} ring-2 ring-[#bc6c25] shadow-md`
                    : 'bg-[#ffffff] border-[#e7d8c9] hover:bg-[#faedcd]/50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`p-1.5 rounded-xl ${isSelected ? 'bg-white shadow-sm' : 'bg-[#f4ebe1]'}`}>
                    <Icon className={`h-4 w-4 ${cat.colorClass}`} />
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f2e8cf] text-[#5d4037] border border-[#d4a373]/40">
                    {count}
                  </span>
                </div>
                <div>
                  <h3 className={`font-amiri text-xs md:text-sm font-bold line-clamp-1 ${isSelected ? 'text-[#43281c]' : 'text-[#5d4037]'}`}>
                    {cat.titleUrdu}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* OPERATIONS LIST & CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#d4a373]/40 pb-2">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-[#bc6c25]" />
            <h2 className="font-amiri text-xl font-bold text-[#43281c]">
              نتائجِ تلاش ({filteredOperations.length} عملیات دستیاب ہیں)
            </h2>
          </div>
          {searchQuery && (
            <span className="text-xs text-[#8d6e63] font-medium">
              تلاش برائے: &quot;{searchQuery}&quot;
            </span>
          )}
        </div>

        {filteredOperations.length === 0 ? (
          <div className="text-center py-16 bg-[#ffffff] rounded-3xl border border-dashed border-[#d4a373] p-8 space-y-3">
            <BookOpen className="h-10 w-10 text-[#d4a373] mx-auto opacity-70" />
            <h3 className="font-amiri text-lg font-bold text-[#5d4037]">
              کوئی عمل تلاش کے معیار پر پورا نہیں اترا
            </h3>
            <p className="text-xs text-[#8d6e63]">
              براہ کرم سرچ کے الفاظ تبدیل کریں یا &quot;تمام مقاصد&quot; پر کلک کریں۔
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSeverity('all');
                setSelectedSpeed('all');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-[#bc6c25] text-white text-xs font-bold cursor-pointer"
            >
              تمام فلٹرز ختم کریں
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOperations.map((op) => {
              const isExpanded = expandedOperationId === op.id;
              const ElementIcon = getElementIcon(op.element);

              const isQahr = op.severity === 'critical_qahr' || op.severity === 'warning';

              return (
                <div
                  key={op.id}
                  id={`op-card-${op.id}`}
                  className={`rounded-3xl border-2 transition-all overflow-hidden flex flex-col justify-between ${
                    isQahr
                      ? 'border-[#ff4d6d]/40 bg-gradient-to-b from-[#fff5f5] to-[#ffffff] shadow-md hover:shadow-lg'
                      : 'border-[#d4a373] bg-[#ffffff] shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Card Top Header */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {/* Badge */}
                          {op.badge && (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#bc6c25] text-white text-[10px] font-bold shadow-xs">
                              {op.badge}
                            </span>
                          )}
                          {/* Speed */}
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            op.speed === 'one_night'
                              ? 'bg-[#d00000] text-white border-[#9d0208]'
                              : 'bg-[#faedcd] text-[#5d4037] border-[#d4a373]'
                          }`}>
                            ⚡ {op.speedUrdu}
                          </span>
                          {/* Severity */}
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            op.severity === 'critical_qahr'
                              ? 'bg-[#9d0208] text-white'
                              : op.severity === 'warning'
                              ? 'bg-[#e76f51] text-white'
                              : op.severity === 'caution'
                              ? 'bg-[#e9c46a] text-[#43281c]'
                              : 'bg-[#2a9d8f] text-white'
                          }`}>
                            {op.severityUrdu}
                          </span>
                        </div>

                        <h3 className="font-amiri text-xl font-bold text-[#43281c] leading-snug pt-1">
                          {op.urduTitle}
                        </h3>
                        <p className="text-xs text-[#8d6e63] font-sans font-medium">
                          {op.title}
                        </p>
                      </div>

                      {/* Studio Target Icon */}
                      <button
                        onClick={() => onNavigateTab(op.targetStudio)}
                        title={`کھولیں: ${op.targetStudioNameUrdu}`}
                        className="p-2.5 rounded-2xl bg-[#f2e8cf] hover:bg-[#bc6c25] hover:text-white text-[#5d4037] transition-all shrink-0 border border-[#d4a373]/60 shadow-xs cursor-pointer group"
                      >
                        <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>

                    {/* Book Source & Author */}
                    <div className="flex items-center gap-2 text-xs font-bold text-[#bc6c25] bg-[#faedcd]/40 px-3 py-1.5 rounded-xl border border-[#d4a373]/30">
                      <BookOpen className="h-3.5 w-3.5 shrink-0" />
                      <span>{op.sourceBook} — {op.author}</span>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-[#5d4037] font-medium leading-relaxed font-urdu">
                      {op.summary}
                    </p>

                    {/* Parameter Tags Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-[#f2e8cf] text-[11px]">
                      <div className="flex items-center gap-1.5 text-[#5d4037]">
                        <Clock className="h-3.5 w-3.5 text-[#bc6c25] shrink-0" />
                        <span className="truncate">{op.requiredSaat}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[#5d4037]">
                        <ElementIcon className="h-3.5 w-3.5 text-[#bc6c25] shrink-0" />
                        <span>عنصر: {op.elementUrdu}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[#5d4037]">
                        <Sparkles className="h-3.5 w-3.5 text-[#bc6c25] shrink-0" />
                        <span className="truncate">بخور: {op.incense}</span>
                      </div>
                    </div>

                    {/* Expanded Detail Accordion */}
                    {isExpanded && (
                      <div className="space-y-4 pt-4 border-t border-[#e7d8c9] animate-fadeIn">
                        {/* Preconditions */}
                        <div className="rounded-2xl bg-[#fdfaf1] p-3.5 border border-[#d4a373]/60 space-y-1.5">
                          <h4 className="font-amiri text-xs font-bold text-[#5d4037] flex items-center gap-1.5">
                            <Shield className="h-3.5 w-3.5 text-[#bc6c25]" />
                            <span>شرائط و لوازماتِ عمل:</span>
                          </h4>
                          <ul className="list-disc list-inside text-xs text-[#6f4e37] space-y-1 pr-1 font-urdu">
                            {op.preconditions.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Steps */}
                        <div className="rounded-2xl bg-[#ffffff] p-3.5 border border-[#d4a373]/60 space-y-2">
                          <h4 className="font-amiri text-xs font-bold text-[#5d4037] flex items-center gap-1.5">
                            <Zap className="h-3.5 w-3.5 text-[#bc6c25]" />
                            <span>ترتیب و طریقہ کار:</span>
                          </h4>
                          <ol className="list-decimal list-inside text-xs text-[#43281c] space-y-1.5 pr-1 font-urdu leading-relaxed">
                            {op.steps.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>

                        {/* Azimat / Formula Box */}
                        <div className="rounded-2xl bg-[#faedcd] p-3.5 border border-[#bc6c25]/40 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-amiri text-xs font-bold text-[#5d4037]">عزیمت / دعا / ورد:</span>
                            <button
                              onClick={() => handleCopyFormula(op.id, op.azimatOrFormula)}
                              className="flex items-center gap-1 text-[11px] font-bold text-[#bc6c25] hover:text-[#8b4513] cursor-pointer"
                            >
                              {copiedId === op.id ? (
                                <>
                                  <Check className="h-3 w-3 text-green-600" />
                                  <span>کاپی ہو گیا</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3" />
                                  <span>عزیمت کاپی کریں</span>
                                </>
                              )}
                            </button>
                          </div>
                          <p className="text-xs font-amiri font-bold text-[#43281c] bg-white/80 p-2.5 rounded-xl border border-[#d4a373]/40 leading-loose text-center">
                            {op.azimatOrFormula}
                          </p>
                        </div>

                        {/* Warning & Rebound notice if any */}
                        {op.warningsAndReboundNotice && (
                          <div className="rounded-2xl bg-[#ffe5d9] p-3 border border-[#d00000]/40 flex items-start gap-2 text-xs text-[#9d0208] font-urdu">
                            <AlertTriangle className="h-4 w-4 shrink-0 text-[#d00000] mt-0.5" />
                            <span>{op.warningsAndReboundNotice}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-4 bg-[#fdfaf1] border-t border-[#e7d8c9] flex flex-wrap items-center justify-between gap-2">
                    {/* Toggle Accordion */}
                    <button
                      onClick={() => setExpandedOperationId(isExpanded ? null : op.id)}
                      className="flex items-center gap-1 text-xs font-bold text-[#bc6c25] hover:text-[#8b4513] transition-all cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          <span>مختصر تفصیل</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          <span>مکمل طریقہ و عزیمت دیکھیں</span>
                        </>
                      )}
                    </button>

                    {/* Action Hub Buttons */}
                    <div className="flex items-center gap-1.5">
                      {/* Send to Naqsh */}
                      <button
                        onClick={() => onSendToNaqsh(op.defaultAdad)}
                        title={`اعداد (${op.defaultAdad}) کو مولد النقوش میں لوڈ کریں`}
                        className="px-2.5 py-1.5 rounded-xl bg-[#ffffff] hover:bg-[#faedcd] border border-[#d4a373] text-[11px] font-bold text-[#5d4037] transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                      >
                        <Zap className="h-3 w-3 text-[#bc6c25]" />
                        <span>نقش ({op.defaultAdad})</span>
                      </button>

                      {/* Send to Takseer */}
                      <button
                        onClick={() => onSendToTakseer(op.defaultText)}
                        title="تکسیر اسٹوڈیو میں منتقل کریں"
                        className="px-2.5 py-1.5 rounded-xl bg-[#ffffff] hover:bg-[#faedcd] border border-[#d4a373] text-[11px] font-bold text-[#5d4037] transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                      >
                        <Flame className="h-3 w-3 text-[#e76f51]" />
                        <span>تکسیر</span>
                      </button>

                      {/* Navigate to Studio */}
                      <button
                        onClick={() => onNavigateTab(op.targetStudio)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ${
                          isQahr
                            ? 'bg-[#9d0208] hover:bg-[#780000]'
                            : 'bg-[#bc6c25] hover:bg-[#9c581e]'
                        }`}
                      >
                        <span>اسٹوڈیو کھولیں</span>
                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Codex Reference Guide */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-[#f2e8cf] p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#bc6c25] text-white shadow-sm">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-amiri text-2xl font-bold text-[#43281c]">
              حکیمانہ قواعد و اصطلاحاتِ جفر و طلسمات
            </h3>
            <p className="text-xs text-[#8d6e63]">
              کاش البرنی، امام البونیؒ اور ابو ریحان البیرونی کی کتب سے چند زریں رہنما اصول:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#5d4037] font-urdu leading-relaxed">
          <div className="p-4 rounded-2xl bg-[#ffffff] border border-[#d4a373]/60 space-y-1">
            <h4 className="font-amiri font-bold text-sm text-[#bc6c25]">قانونِ وقت و ساعت (سعد و نحس):</h4>
            <p>اعمالِ خیر و محبت ہمیشہ شرفِ زہرہ یا مشتری اور طلوع آفتاب کے بعد پہلی ساعت میں کیے جائیں۔ اعمالِ قہر و دفاع مریخ یا زحل میں مخصوص شرائط کے ساتھ ہوں۔</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#ffffff] border border-[#d4a373]/60 space-y-1">
            <h4 className="font-amiri font-bold text-sm text-[#bc6c25]">قانونِ بخورات و ارواح:</h4>
            <p>ہر عنصر کا مخصوص بخور جلانا روحانی مقناطیس کا کام کرتا ہے۔ بخور کے بغیر طلسم ایسا ہے جیسے بغیر ایندھن کے چراغ۔</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#ffffff] border border-[#d4a373]/60 space-y-1">
            <h4 className="font-amiri font-bold text-sm text-[#bc6c25]">قانونِ حصارِ خودی:</h4>
            <p>کسی بھی جفری یا طلسماتی عمل سے پہلے اور بعد میں حصارِ آیت الکرسی اور معوذتین کا ورد عامل کو تمام شیطانی و زمینی رجعتوں سے محفوظ رکھتا ہے۔</p>
          </div>
        </div>
      </div>
    </div>
  );
};
