import React, { useState, useMemo } from 'react';
import {
  SHAMS_40_CHAPTERS,
  SHAMS_BIRHATIYAH_NAMES,
  SHAMS_KEY_OPERATIONS,
  SHAMS_SOLOMON_SEALS,
  SHAMS_SAWAQIT_FATIHA_LETTERS,
  ShamsChapter,
  ShamsOperation,
  BirhatiyahName
} from '../data/shamsAlMaarifData';
import {
  BookOpen,
  Sparkles,
  Search,
  Award,
  Flame,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Compass,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  Feather,
  Gem,
  Info,
  Clock,
  Layers,
  Printer
} from 'lucide-react';

interface ShamsAlMaarifStudioProps {
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
  onNavigateToHisar?: () => void;
}

export const ShamsAlMaarifStudio: React.FC<ShamsAlMaarifStudioProps> = ({
  onSendToNaqsh,
  onSendToTakseer,
  onNavigateToHisar
}) => {
  const [activeTab, setActiveTab] = useState<
    'chapters' | 'operations' | 'birhatiyah' | 'jaljalutiyah' | 'sawaqit' | 'solomon' | 'chilla'
  >('chapters');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapterCategory, setSelectedChapterCategory] = useState<string>('all');
  const [selectedOperationCategory, setSelectedOperationCategory] = useState<string>('all');
  const [expandedChapter, setExpandedChapter] = useState<number | null>(1);
  const [expandedOperation, setExpandedOperation] = useState<string | null>('shams-op-shaq-al-ard');
  const [selectedBirhatiyaIndex, setSelectedBirhatiyaIndex] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Filter Chapters
  const filteredChapters = useMemo(() => {
    return SHAMS_40_CHAPTERS.filter((chap) => {
      const matchesCategory =
        selectedChapterCategory === 'all' || chap.category === selectedChapterCategory;
      const matchesSearch =
        searchQuery === '' ||
        chap.urduTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chap.arabicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chap.coreConceptUrdu.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chap.chapterNumber.toString() === searchQuery.trim();
      return matchesCategory && matchesSearch;
    });
  }, [selectedChapterCategory, searchQuery]);

  // Filter Operations
  const filteredOperations = useMemo(() => {
    return SHAMS_KEY_OPERATIONS.filter((op) => {
      const matchesCategory =
        selectedOperationCategory === 'all' || op.category === selectedOperationCategory;
      const matchesSearch =
        searchQuery === '' ||
        op.titleUrdu.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.titleArabic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.azimatArabic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.urduTranslation.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedOperationCategory, searchQuery]);

  // Selected Birhatiya Details
  const selectedBirhatiya = useMemo(() => {
    return (
      SHAMS_BIRHATIYAH_NAMES.find((b) => b.index === selectedBirhatiyaIndex) ||
      SHAMS_BIRHATIYAH_NAMES[0]
    );
  }, [selectedBirhatiyaIndex]);

  return (
    <div className="space-y-6">
      {/* 🌟 HERO & ATMOSPHERIC BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#081c15] text-white p-6 sm:p-8 shadow-2xl border-2 border-[#d4af37]">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-[#d4af37]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-[#52b788]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#ffeaa7] text-xs font-semibold">
              <Sun className="h-3.5 w-3.5 text-[#ffd166]" />
              <span>مخطوطۂ قدیم و تاجُ کتبِ روحانیات و جفر</span>
            </div>

            <h1 className="font-amiri text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-[#ffd166] drop-shadow-md">
              شمسُ المعارفِ الكبرىٰ ولطائفُ العوارف
            </h1>
            <p className="font-amiri text-lg sm:text-xl text-[#d8f3dc] font-semibold">
              تالیف: الشیخ الإمام القطب ابو العباس احمد بن علی البونیؒ (المتوفی ۶۲۲ھ)
            </p>
            <p className="text-xs sm:text-sm text-[#e9ecef]/90 leading-relaxed pt-1">
              کتاب کے مکمل **۴۰ ابواب**، **۲۸ اسمائے برہتیہ کبریٰ (عہدِ قدیم)**، **قصیدہ جلجلوتیہ کبریٰ**، **سواقطِ فاتحہ سبعہ**، **خواتمِ سلیمان** اور **استخراجِ دفائن و شق الارض** کے تمام مخفی عربی متون مع مکمل سلیس اردو ترجمہ، نقوش و عملیات۔
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
            <div className="bg-[#081c15]/60 backdrop-blur-md p-3 rounded-2xl border border-[#d4af37]/30 text-center">
              <div className="text-2xl font-bold text-[#ffd166] font-mono">40</div>
              <div className="text-[11px] text-[#d8f3dc]">کامل ابواب و فصول</div>
            </div>
            <div className="bg-[#081c15]/60 backdrop-blur-md p-3 rounded-2xl border border-[#d4af37]/30 text-center">
              <div className="text-2xl font-bold text-[#ffd166] font-mono">28</div>
              <div className="text-[11px] text-[#d8f3dc]">اسمائے برہتیہ کبریٰ</div>
            </div>
            <div className="bg-[#081c15]/60 backdrop-blur-md p-3 rounded-2xl border border-[#d4af37]/30 text-center">
              <div className="text-2xl font-bold text-[#ffd166] font-mono">60</div>
              <div className="text-[11px] text-[#d8f3dc]">ابیاتِ جلجلوتیہ</div>
            </div>
            <div className="bg-[#081c15]/60 backdrop-blur-md p-3 rounded-2xl border border-[#d4af37]/30 text-center">
              <div className="text-2xl font-bold text-[#ffd166] font-mono">7</div>
              <div className="text-[11px] text-[#d8f3dc]">سواقط و خواتمِ سلیمان</div>
            </div>
          </div>
        </div>

        {/* Studio Sub-Navigation */}
        <div className="relative z-10 mt-6 pt-5 border-t border-[#d4af37]/30 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('chapters')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'chapters'
                ? 'bg-[#d4af37] text-[#1b4332] shadow-lg scale-105'
                : 'bg-[#081c15]/50 text-white hover:bg-[#081c15]/80'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>۴۰ ابوابِ شمس المعارف (Chapters)</span>
          </button>

          <button
            onClick={() => setActiveTab('operations')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'operations'
                ? 'bg-[#d4af37] text-[#1b4332] shadow-lg scale-105'
                : 'bg-[#081c15]/50 text-white hover:bg-[#081c15]/80'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>عملیات و نقوشِ بونی (Key Operations)</span>
          </button>

          <button
            onClick={() => setActiveTab('birhatiyah')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'birhatiyah'
                ? 'bg-[#d4af37] text-[#1b4332] shadow-lg scale-105'
                : 'bg-[#081c15]/50 text-white hover:bg-[#081c15]/80'
            }`}
          >
            <Flame className="h-4 w-4" />
            <span>الأسماء البرهتية الكبرى (28 Names)</span>
          </button>

          <button
            onClick={() => setActiveTab('jaljalutiyah')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'jaljalutiyah'
                ? 'bg-[#d4af37] text-[#1b4332] shadow-lg scale-105'
                : 'bg-[#081c15]/50 text-white hover:bg-[#081c15]/80'
            }`}
          >
            <Feather className="h-4 w-4" />
            <span>قصیدہ جلجلوتیہ کبریٰ (Jaljalutiah)</span>
          </button>

          <button
            onClick={() => setActiveTab('sawaqit')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'sawaqit'
                ? 'bg-[#d4af37] text-[#1b4332] shadow-lg scale-105'
                : 'bg-[#081c15]/50 text-white hover:bg-[#081c15]/80'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>سواقط الفاتحة السبعة (7 Letters)</span>
          </button>

          <button
            onClick={() => setActiveTab('solomon')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'solomon'
                ? 'bg-[#d4af37] text-[#1b4332] shadow-lg scale-105'
                : 'bg-[#081c15]/50 text-white hover:bg-[#081c15]/80'
            }`}
          >
            <Award className="h-4 w-4" />
            <span>خواتم سلیمان السبعۃ (Solomon Seals)</span>
          </button>

          <button
            onClick={() => setActiveTab('chilla')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'chilla'
                ? 'bg-[#d4af37] text-[#1b4332] shadow-lg scale-105'
                : 'bg-[#081c15]/50 text-white hover:bg-[#081c15]/80'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>شرائطِ خلوت و حصارِ بونی (Rules)</span>
          </button>
        </div>
      </div>

      {/* 🔍 UNIVERSAL SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#fdfbf7] p-4 rounded-2xl border border-[#d4af37]/40 shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8d6e63]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابواب، عزائم، اسمائے برہتیہ، نقوش یا آیات میں تلاش کریں..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-[#d4af37]/40 bg-white text-xs text-[#2c1e14] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
            >
              صاف کریں
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-[#5d4037]">
          <span className="font-semibold">تعدادِ نتائج:</span>
          <span className="bg-[#2d6a4f] text-white px-2.5 py-0.5 rounded-full font-mono text-[11px]">
            {activeTab === 'chapters'
              ? filteredChapters.length
              : activeTab === 'operations'
              ? filteredOperations.length
              : activeTab === 'birhatiyah'
              ? SHAMS_BIRHATIYAH_NAMES.length
              : 'مکمل'}
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. TAB: 40 COMPLETE CHAPTERS OF SHAMS AL-MA'ARIF */}
      {/* ========================================================= */}
      {activeTab === 'chapters' && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            {[
              { id: 'all', label: 'تمام ۴۰ ابواب' },
              { id: 'letters_abjad', label: 'حروف و ابجد' },
              { id: 'planetary_hours', label: 'کواکب، بروج و ساعات' },
              { id: 'quran_secrets', label: 'قرآنی اسرار و سورتیں' },
              { id: 'divine_names', label: 'اسمائے الٰہیہ و اسمِ اعظم' },
              { id: 'sawaqit_fatiha', label: 'سواقطِ فاتحہ' },
              { id: 'birhatiyah', label: 'برہتیہ کبریٰ' },
              { id: 'jaljalutiyah', label: 'جلجلوتیہ' },
              { id: 'wafq_talismans', label: 'اوفاق و الواح' },
              { id: 'practical_operations', label: 'عملیات و خلوت' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedChapterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedChapterCategory === cat.id
                    ? 'bg-[#1b4332] text-white shadow-md'
                    : 'bg-[#f4efe6] text-[#5d4037] hover:bg-[#e9decb]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Chapters Accordion List */}
          <div className="grid grid-cols-1 gap-3">
            {filteredChapters.map((chap) => {
              const isExpanded = expandedChapter === chap.chapterNumber;
              return (
                <div
                  key={chap.chapterNumber}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'border-[#2d6a4f] bg-white shadow-md'
                      : 'border-[#e0d6c3] bg-[#fdfcf9] hover:border-[#2d6a4f]/50'
                  }`}
                >
                  {/* Chapter Header Card */}
                  <div
                    onClick={() => setExpandedChapter(isExpanded ? null : chap.chapterNumber)}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-[#ffd166] flex items-center justify-center font-amiri font-bold text-base sm:text-lg shadow-inner shrink-0">
                        {chap.chapterNumber}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-bold text-[#2d6a4f] bg-[#e8f5e9] px-2 py-0.5 rounded-md">
                            {chap.categoryUrdu}
                          </span>
                          <span className="text-[11px] text-[#8d6e63]">
                            {chap.keyOperationsCount} کلیدی اعمال و نقوش
                          </span>
                        </div>
                        <h3 className="font-amiri text-base sm:text-lg font-bold text-[#2c1e14] mt-0.5">
                          {chap.urduTitle}
                        </h3>
                        <p className="font-amiri text-xs text-[#6c757d] italic dir-rtl">
                          {chap.arabicTitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-[#2d6a4f] hidden sm:inline">
                        {isExpanded ? 'تفصیل چھپائیں' : 'تفصیل دیکھیں'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-[#2d6a4f]" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Chapter Expanded Body */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-6 sm:pb-6 border-t border-[#f0eae1] pt-4 space-y-4 bg-gradient-to-b from-white to-[#fcfaf6]">
                      {/* Core Concept */}
                      <div className="bg-[#f4efe6]/60 p-4 rounded-xl border border-[#d4af37]/30">
                        <h4 className="text-xs font-bold text-[#1b4332] flex items-center gap-1.5 mb-1.5">
                          <Info className="h-4 w-4 text-[#d4af37]" />
                          <span>خلاصۂ باب و مرکزی موضوع:</span>
                        </h4>
                        <p className="text-xs sm:text-sm text-[#495057] leading-relaxed">
                          {chap.coreConceptUrdu}
                        </p>
                      </div>

                      {/* Main Secrets */}
                      <div>
                        <h4 className="text-xs font-bold text-[#1b4332] mb-2 flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
                          <span>اس باب کے اہم ترین مخفی اسرار و طلسمات:</span>
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2c1e14]">
                          {chap.mainSecretsUrdu.map((sec, i) => (
                            <li
                              key={i}
                              className="bg-white p-2.5 rounded-lg border border-[#e2d9cc] flex items-start gap-2 shadow-xs"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                              <span>{sec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Classical Arabic Quote & Urdu Translation */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                        <div className="bg-[#1b4332] text-white p-4 rounded-xl border border-[#d4af37]/40 space-y-2">
                          <div className="flex items-center justify-between text-[11px] text-[#ffd166]">
                            <span className="font-bold">عربی اصل عبارتِ مخطوطہ:</span>
                            <button
                              onClick={() =>
                                handleCopy(chap.sampleArabicText, `ar-${chap.chapterNumber}`)
                              }
                              className="flex items-center gap-1 text-[10px] hover:text-white transition-colors"
                            >
                              {copiedId === `ar-${chap.chapterNumber}` ? (
                                <Check className="h-3 w-3 text-green-400" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                              <span>کاپی</span>
                            </button>
                          </div>
                          <p className="font-amiri text-sm sm:text-base leading-relaxed text-[#f8f9fa] dir-rtl">
                            «{chap.sampleArabicText}»
                          </p>
                        </div>

                        <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#dee2e6] space-y-2">
                          <div className="text-[11px] font-bold text-[#495057]">
                            اردو سلیس ترجمہ و مفہوم:
                          </div>
                          <p className="text-xs sm:text-sm leading-relaxed text-[#212529]">
                            {chap.sampleUrduTranslation}
                          </p>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-[#f0eae1]">
                        {onSendToTakseer && (
                          <button
                            onClick={() => onSendToTakseer(chap.urduTitle)}
                            className="flex items-center gap-1 bg-[#5d4037] hover:bg-[#43281c] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                          >
                            <Flame className="h-3.5 w-3.5 text-[#ffd166]" />
                            <span>تکسیر اسٹوڈیو میں بھیجیں</span>
                          </button>
                        )}
                        <button
                          onClick={() => setActiveTab('operations')}
                          className="flex items-center gap-1 bg-[#1b4332] hover:bg-[#2d6a4f] text-[#ffd166] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <span>اس باب کے عملیات دیکھیں</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. TAB: KEY OPERATIONS & TALISMANS (عملیات و نقوش) */}
      {/* ========================================================= */}
      {activeTab === 'operations' && (
        <div className="space-y-4">
          {/* Operation Categories Filter */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            {[
              { id: 'all', label: 'تمام مجرب عملیات' },
              { id: 'dafeen_earth', label: 'استخراجِ دفائن و شق الارض' },
              { id: 'invocations_azimat', label: 'دعوتِ سید کندیاس' },
              { id: 'wafq_talismans', label: 'خاتمِ غزالی و خالی الوسط' },
              { id: 'sawaqit_fatiha', label: 'سواقطِ فاتحہ' },
              { id: 'shifa_ibtalsihr', label: 'ابطالِ سحر و فکِ طلسم' },
              { id: 'jaljalutiyah', label: 'جلجلوتیہ' },
              { id: 'kashf_asrar', label: 'کشفِ منامی و استخارہ' },
              { id: 'dafa_dushman_qahr', label: 'قہرِ اعداء و ہلاکتِ ظالم' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedOperationCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedOperationCategory === cat.id
                    ? 'bg-[#1b4332] text-white shadow-md'
                    : 'bg-[#f4efe6] text-[#5d4037] hover:bg-[#e9decb]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Operations List */}
          <div className="grid grid-cols-1 gap-4">
            {filteredOperations.map((op) => {
              const isExpanded = expandedOperation === op.id;
              return (
                <div
                  key={op.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'border-[#d4af37] bg-white shadow-lg ring-1 ring-[#d4af37]/50'
                      : 'border-[#e0d6c3] bg-[#fdfcf9] hover:border-[#d4af37]'
                  }`}
                >
                  {/* Operation Header */}
                  <div
                    onClick={() => setExpandedOperation(isExpanded ? null : op.id)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold text-[#1b4332] bg-[#d8f3dc] px-2.5 py-0.5 rounded-md">
                          {op.chapterNameUrdu}
                        </span>
                        <span className="text-[11px] font-semibold text-[#856404] bg-[#fff3cd] px-2 py-0.5 rounded-md">
                          نوعیت وفق: {op.wafqType}
                        </span>
                        {op.isSecretOrRare && (
                          <span className="text-[10px] font-bold text-[#721c24] bg-[#f8d7da] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <ShieldAlert className="h-3 w-3" />
                            <span>مخفی و نایاب</span>
                          </span>
                        )}
                      </div>

                      <h3 className="font-amiri text-lg sm:text-xl font-bold text-[#2c1e14]">
                        {op.titleUrdu}
                      </h3>
                      <p className="font-amiri text-xs sm:text-sm text-[#2d6a4f] italic font-semibold dir-rtl">
                        {op.titleArabic}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-[#1b4332] hidden sm:inline">
                        {isExpanded ? 'طریقہ بند کریں' : 'مکمل طریقہ و عزیمت'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-[#1b4332]" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Operation Expanded Body */}
                  {isExpanded && (
                    <div className="px-4 pb-6 sm:px-6 sm:pb-6 border-t border-[#f0eae1] pt-4 space-y-5 bg-gradient-to-b from-white to-[#fcfaf6]">
                      {/* Operational Prerequisites Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                        <div className="bg-[#f8f9fa] p-2.5 rounded-xl border border-[#dee2e6]">
                          <span className="text-[10px] text-gray-500 font-bold block">
                            ساعت و دن:
                          </span>
                          <span className="font-semibold text-[#2c1e14]">
                            {op.suitableDay} - {op.suitableSaat}
                          </span>
                        </div>
                        <div className="bg-[#f8f9fa] p-2.5 rounded-xl border border-[#dee2e6]">
                          <span className="text-[10px] text-gray-500 font-bold block">
                            بخور (دھونی):
                          </span>
                          <span className="font-semibold text-[#2c1e14]">{op.incenseUrdu}</span>
                        </div>
                        <div className="bg-[#f8f9fa] p-2.5 rounded-xl border border-[#dee2e6]">
                          <span className="text-[10px] text-gray-500 font-bold block">
                            روشنائی و تختی:
                          </span>
                          <span className="font-semibold text-[#2c1e14]">{op.inkAndMedium}</span>
                        </div>
                        <div className="bg-[#f8f9fa] p-2.5 rounded-xl border border-[#dee2e6]">
                          <span className="text-[10px] text-gray-500 font-bold block">
                            مجموعی عددِ طلسم:
                          </span>
                          <span className="font-bold text-[#1b4332] font-mono text-sm">
                            {op.defaultAdad}
                          </span>
                        </div>
                      </div>

                      {/* Step-by-Step Methodology */}
                      <div>
                        <h4 className="text-xs font-bold text-[#1b4332] mb-2 flex items-center gap-1.5">
                          <Compass className="h-4 w-4 text-[#d4af37]" />
                          <span>ترتیبِ عمل، نقوش اور مرحلہ وار طریقۂ کار:</span>
                        </h4>
                        <div className="space-y-1.5 text-xs text-[#2c1e14]">
                          {op.methodologySteps.map((step, idx) => (
                            <div
                              key={idx}
                              className="bg-white p-3 rounded-xl border border-[#e2d9cc] leading-relaxed shadow-2xs"
                            >
                              {step}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Arabic Azimat & Urdu Translation Box */}
                      <div className="space-y-3">
                        <div className="bg-gradient-to-br from-[#1b4332] to-[#081c15] text-white p-4 sm:p-5 rounded-2xl border-2 border-[#d4af37] space-y-2">
                          <div className="flex items-center justify-between text-xs text-[#ffd166]">
                            <span className="font-bold flex items-center gap-1.5">
                              <Sparkles className="h-4 w-4" />
                              <span>عزیمت و قسمِ بونی (عربی متن):</span>
                            </span>
                            <button
                              onClick={() => handleCopy(op.azimatArabic, `az-${op.id}`)}
                              className="flex items-center gap-1 text-[11px] bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition-colors"
                            >
                              {copiedId === `az-${op.id}` ? (
                                <Check className="h-3.5 w-3.5 text-green-400" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                              <span>عزیمت کاپی کریں</span>
                            </button>
                          </div>
                          <p className="font-amiri text-base sm:text-lg leading-loose text-[#f8f9fa] dir-rtl pt-1">
                            {op.azimatArabic}
                          </p>
                        </div>

                        <div className="bg-[#fffdf7] p-4 rounded-xl border border-[#d4af37]/40">
                          <span className="text-[11px] font-bold text-[#856404] block mb-1">
                            سلیس اردو ترجمہ و مفہومِ عزیمت:
                          </span>
                          <p className="text-xs sm:text-sm text-[#495057] leading-relaxed">
                            {op.azimatUrdu}
                          </p>
                        </div>
                      </div>

                      {/* Protections & Warnings */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-[#e8f5e9] p-3.5 rounded-xl border border-[#c8e6c9] space-y-1">
                          <span className="font-bold text-[#2e7d32] flex items-center gap-1">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <span>لازمی حفاظتی حصار و پرہیز:</span>
                          </span>
                          <p className="text-[#1b5e20]">{op.spiritualProtection}</p>
                        </div>

                        <div className="bg-[#fff3e0] p-3.5 rounded-xl border border-[#ffe0b2] space-y-1">
                          <span className="font-bold text-[#e65100] flex items-center gap-1">
                            <Info className="h-3.5 w-3.5" />
                            <span>مخفی باطنی نکتہ (Secret Note):</span>
                          </span>
                          <p className="text-[#bf360c]">{op.secretNotesUrdu}</p>
                        </div>
                      </div>

                      {/* Interactive Dispatch Buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#f0eae1]">
                        <div className="text-[11px] text-[#6c757d]">
                          عدد برائے نقش: <b className="font-mono text-[#1b4332]">{op.defaultAdad}</b>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {onSendToNaqsh && (
                            <button
                              onClick={() => onSendToNaqsh(op.defaultAdad)}
                              className="flex items-center gap-1.5 bg-[#bc6c25] hover:bg-[#a2591d] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                            >
                              <Award className="h-4 w-4 text-[#ffd166]" />
                              <span>اس عدد ({op.defaultAdad}) کا نقش بنائیں</span>
                            </button>
                          )}

                          {onSendToTakseer && (
                            <button
                              onClick={() => onSendToTakseer(op.defaultText)}
                              className="flex items-center gap-1.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                            >
                              <Flame className="h-4 w-4 text-[#ffd166]" />
                              <span>عبارت کی تکسیر کریں</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. TAB: 28 ANCIENT BIRHATIYAH NAMES (الأسماء البرهتية) */}
      {/* ========================================================= */}
      {activeTab === 'birhatiyah' && (
        <div className="space-y-6">
          <div className="bg-[#fdfbf7] p-5 rounded-2xl border-2 border-[#d4af37]/50 shadow-sm space-y-2">
            <h3 className="font-amiri text-xl font-bold text-[#1b4332] flex items-center gap-2">
              <Flame className="h-5 w-5 text-[#bc6c25]" />
              <span>الأسماء البرهتية الكبرى (العهد القديم لسليمان عليه السلام)</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#495057] leading-relaxed">
              شمس المعارف الکبریٰ کا باب بیست و دوم اس عہدِ قدیم کے ۲۸ سریانی اسماء پر مشتمل ہے جن پر
              تمام کائناتی ملوک، جنات، ارواح اور فلکی قوتیں اطاعت کرتی ہیں۔ ذیل میں ہر اسم پر کلک کر
              کے اس کے مکمل خواص، اعداد اور استخراجِ عزیمت کا مشاہدہ کریں۔
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left/Top: 28 Names Grid */}
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {SHAMS_BIRHATIYAH_NAMES.map((item) => {
                const isSelected = selectedBirhatiyaIndex === item.index;
                return (
                  <button
                    key={item.index}
                    onClick={() => setSelectedBirhatiyaIndex(item.index)}
                    className={`p-3 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-white border-[#d4af37] shadow-lg scale-105 ring-2 ring-[#d4af37]'
                        : 'bg-white text-[#2c1e14] border-[#e2d9cc] hover:border-[#2d6a4f]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                          isSelected ? 'bg-white/20 text-[#ffd166]' : 'bg-[#f4efe6] text-[#5d4037]'
                        }`}
                      >
                        #{item.index}
                      </span>
                      <span
                        className={`text-[10px] font-mono ${
                          isSelected ? 'text-[#ffd166]' : 'text-gray-400'
                        }`}
                      >
                        {item.abjadValue}
                      </span>
                    </div>

                    <div className="font-amiri text-lg font-bold py-1">{item.nameArabic}</div>
                    <div
                      className={`text-[11px] truncate ${
                        isSelected ? 'text-[#d8f3dc]' : 'text-[#6c757d]'
                      }`}
                    >
                      {item.nameUrdu}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Selected Birhatiya Detail Card */}
            <div className="bg-white rounded-3xl border-2 border-[#d4af37] p-5 sm:p-6 shadow-xl space-y-4 h-fit">
              <div className="flex items-center justify-between border-b border-[#f0eae1] pb-3">
                <div>
                  <span className="text-[11px] font-bold text-[#1b4332] bg-[#d8f3dc] px-2 py-0.5 rounded-md">
                    اسم البرهتية #{selectedBirhatiya.index}
                  </span>
                  <h3 className="font-amiri text-2xl font-bold text-[#1b4332] mt-1">
                    {selectedBirhatiya.nameArabic} ({selectedBirhatiya.nameUrdu})
                  </h3>
                </div>
                <div className="text-center bg-[#fdfbf7] p-2 rounded-xl border border-[#d4af37]/40">
                  <span className="text-[10px] text-gray-500 block">عددِ ابجد:</span>
                  <span className="font-mono text-lg font-bold text-[#bc6c25]">
                    {selectedBirhatiya.abjadValue}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-[#f8f9fa] p-3 rounded-xl border border-[#dee2e6]">
                  <span className="text-gray-500 font-bold block mb-0.5">
                    عبرانی / سریانی معنی:
                  </span>
                  <span className="font-semibold text-[#2c1e14]">
                    {selectedBirhatiya.meaningUrdu}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#f8f9fa] p-2.5 rounded-xl border border-[#dee2e6]">
                    <span className="text-gray-500 font-bold block text-[10px]">حاکم سیارہ:</span>
                    <span className="font-semibold text-[#2c1e14]">
                      {selectedBirhatiya.rulingPlanetUrdu}
                    </span>
                  </div>
                  <div className="bg-[#f8f9fa] p-2.5 rounded-xl border border-[#dee2e6]">
                    <span className="text-gray-500 font-bold block text-[10px]">موکلِ علوی:</span>
                    <span className="font-semibold text-[#2c1e14]">
                      {selectedBirhatiya.rulingAngelUrdu}
                    </span>
                  </div>
                </div>

                <div className="bg-[#e8f5e9] p-3 rounded-xl border border-[#c8e6c9]">
                  <span className="font-bold text-[#2e7d32] block mb-0.5">
                    خصوصی روحانی تاثیرات:
                  </span>
                  <p className="text-[#1b5e20] leading-relaxed">
                    {selectedBirhatiya.specialPropertiesUrdu}
                  </p>
                </div>

                <div className="bg-[#fff3e0] p-3 rounded-xl border border-[#ffe0b2]">
                  <span className="font-bold text-[#e65100] block mb-0.5">
                    طریقۂ استعمال و ریاضت:
                  </span>
                  <p className="text-[#bf360c] leading-relaxed">
                    {selectedBirhatiya.azimatUsageUrdu}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#f0eae1] flex flex-col gap-2">
                {onSendToNaqsh && (
                  <button
                    onClick={() => onSendToNaqsh(selectedBirhatiya.abjadValue)}
                    className="w-full py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-[#ffd166] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Award className="h-4 w-4" />
                    <span>اس اسم ({selectedBirhatiya.abjadValue}) کا نقش بنائیں</span>
                  </button>
                )}
                {onSendToTakseer && (
                  <button
                    onClick={() => onSendToTakseer(selectedBirhatiya.nameArabic)}
                    className="w-full py-2 rounded-xl bg-[#5d4037] hover:bg-[#43281c] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Flame className="h-3.5 w-3.5 text-[#ffd166]" />
                    <span>اسم کی تکسیر اسٹوڈیو میں بھیجیں</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. TAB: JALJALUTIYAH KUBRA (قصیدہ جلجلوتیہ کبریٰ) */}
      {/* ========================================================= */}
      {activeTab === 'jaljalutiyah' && (
        <div className="space-y-6">
          <div className="bg-[#fdfbf7] p-5 rounded-2xl border-2 border-[#d4af37]/50 shadow-sm space-y-2">
            <h3 className="font-amiri text-xl font-bold text-[#1b4332] flex items-center gap-2">
              <Feather className="h-5 w-5 text-[#bc6c25]" />
              <span>القصيدة الجلجلوتية الكبرى (منسوب به حضرت امیر المومنین علیؑ)</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#495057] leading-relaxed">
              شمس المعارف الکبریٰ کا باب بیست و سوم قصیدہ جلجلوتیہ کے ۶۰ اشعار اور ان کے طلسمات و
              خواتم پر مشتمل ہے۔ اس کے ہر شعر میں اسمائے اعظم، سریانی کلمات اور مخصوص خواص موجود
              ہیں۔
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                num: 1,
                poem: 'بَدَأْتُ بِبِسْمِ اللَّهِ رُوحِي بِهِ اهْتَدَتْ ۞ إِلَى كَشْفِ أَسْرَارٍ بِبَاطِنِهِ انْطَوَتْ',
                urdu: 'میں نے اللہ کے نام سے آغاز کیا جس سے میری روح نے ان پوشیدہ اسرار کے کشف کی طرف رہنمائی پائی۔',
                name: 'یا بدیع یا ھادی',
                adad: 1422,
                benefit: 'کشفِ قلوب، فہم و حکمت، اور ہر بند راستے کا کھلنا۔'
              },
              {
                num: 2,
                poem: 'وَصَلَّيْتُ فِي الثَّانِي عَلَى خَيْرِ خَلْقِهِ ۞ مُحَمَّدٍ مَنْ زَاحَ الضَّلَالَةَ وَالْغَلَتْ',
                urdu: 'اور دوسرے نمبر پر میں نے اللہ کی بہترین مخلوق محمد ﷺ پر درود بھیجا جنہوں نے گمراہی اور غلطی کو مٹا دیا۔',
                name: 'اللہم صل علی محمد',
                adad: 894,
                benefit: 'حصولِ برکت، مغفرت، اور ارواحِ مقدسہ کی زیارت۔'
              },
              {
                num: 3,
                poem: 'أَحَاطَتْ بِنَا الْأَنْوَارُ مِنْ كُلِّ جَانِبٍ ۞ وَهَيْبَةُ مَوْلَانَا الْعَظِيمِ بِنَا عَلَتْ',
                urdu: 'ہمیں ہر طرف سے انوار نے گھیر لیا اور ہمارے عظیم مولا کی ہیبت ہم پر بلند ہو گئی۔',
                name: 'یا نور یا عظیم',
                adad: 1150,
                benefit: 'دشمنوں کے دلوں میں ہیبت، رعب و دبدبہ اور تسخیرِ حکام۔'
              },
              {
                num: 4,
                poem: 'بِآهٍ أَيَاهٍ نَمُوهٍ أَصَالِيَا ۞ وَنَجِّنِي مِنْ كُلِّ هَوْلٍ وَشِدَّةٍ',
                urdu: 'سریانی اسمائے اعظم کے واسطے سے مجھے ہر قسم کے خوف اور مصیبت سے نجات عطا فرما۔',
                name: 'یا اللہ یا منجی',
                adad: 638,
                benefit: 'سخت ترین بلاؤں، وبائی امراض اور قید و بند سے فوری نجات۔'
              },
              {
                num: 5,
                poem: 'بِطَهْطَهْلُوبٍ مَعْ سَبْسَبٍ هَيْطَلٍ مَعًا ۞ بِأَسْمَائِكَ الْحُسْنَى أَجِبْ لِي دَعْوَتِي',
                urdu: 'سریانی کلمات طہطہلوب اور سبسب اور ہیطل کے صدقے، اپنے بہترین ناموں کے واسطے میری دعا قبول فرما۔',
                name: 'یا مجیب الدعوات',
                adad: 1785,
                benefit: 'فوری اجابتِ دعا اور ناممکن ترین کاموں کا غیب سے بن جانا۔'
              },
              {
                num: 6,
                poem: 'وَأَخْرِسْ بِهَا يَا ذَا الْجَلَالِ عَدُوَّنَا ۞ وَكُفَّ أَيَادِي الظَّالِمِينَ بِمَا حَوَتْ',
                urdu: 'اور اے جلال والے ان کے ذریعے ہمارے دشمن کو گونگا کر دے اور ظالموں کے ہاتھوں کو روک دے۔',
                name: 'یا قہار یا مذل',
                adad: 1044,
                benefit: 'عقد اللسان، ظالموں کے ہاتھ پاؤں بندھ جانا اور مقدمات میں فتح۔'
              }
            ].map((bayt) => (
              <div
                key={bayt.num}
                className="bg-white rounded-2xl border border-[#e0d6c3] p-5 shadow-sm hover:border-[#2d6a4f] space-y-3"
              >
                <div className="flex items-center justify-between border-b border-[#f0eae1] pb-2">
                  <span className="text-xs font-bold text-[#1b4332] bg-[#d8f3dc] px-2.5 py-0.5 rounded-md">
                    بیتِ جلجلوتیہ #{bayt.num}
                  </span>
                  <span className="text-xs font-mono text-[#bc6c25] font-bold">
                    عدد: {bayt.adad}
                  </span>
                </div>

                <div className="bg-[#1b4332] text-white p-3.5 rounded-xl text-center space-y-1">
                  <p className="font-amiri text-base sm:text-lg font-bold leading-loose text-[#ffd166] dir-rtl">
                    {bayt.poem}
                  </p>
                </div>

                <p className="text-xs text-[#495057] leading-relaxed italic">{bayt.urdu}</p>

                <div className="bg-[#f8f9fa] p-2.5 rounded-xl border border-[#dee2e6] text-xs">
                  <span className="font-bold text-[#2c1e14] block">خواص و تاثیر:</span>
                  <span className="text-[#6c757d]">{bayt.benefit}</span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  {onSendToNaqsh && (
                    <button
                      onClick={() => onSendToNaqsh(bayt.adad)}
                      className="text-[11px] font-bold text-[#1b4332] hover:text-[#2d6a4f] flex items-center gap-1 cursor-pointer"
                    >
                      <Award className="h-3.5 w-3.5" />
                      <span>نقش بنائیں ({bayt.adad})</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. TAB: SAWAQIT AL-FATIHA 7 LETTERS (سواقط الفاتحة) */}
      {/* ========================================================= */}
      {activeTab === 'sawaqit' && (
        <div className="space-y-6">
          <div className="bg-[#fdfbf7] p-5 rounded-2xl border-2 border-[#d4af37]/50 shadow-sm space-y-2">
            <h3 className="font-amiri text-xl font-bold text-[#1b4332] flex items-center gap-2">
              <Compass className="h-5 w-5 text-[#bc6c25]" />
              <span>سواقطُ الفاتحةِ السبعة (ف ج ش ث ظ خ ز) وأوفاقها السباعية</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#495057] leading-relaxed">
              شمس المعارف الکبریٰ کا باب سیزدہم ان سات حروف پر مشتمل ہے جو سورہ فاتحہ میں نہیں آئے۔
              امام البونیؒ کے مطابق ان سات حروف میں سات اسمائے الٰہیہ، سات فرشتے، سات کواکب اور
              ساتوں دنوں کے زمینی ملوک پوشیدہ ہیں۔
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SHAMS_SAWAQIT_FATIHA_LETTERS.map((item) => (
              <div
                key={item.letter}
                className="bg-white rounded-2xl border-2 border-[#e2d9cc] p-4 shadow-sm hover:border-[#1b4332] space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#f0eae1] pb-2">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-[#ffd166] font-amiri text-2xl font-bold flex items-center justify-center shadow-inner">
                      {item.letter}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block font-mono">عدد:</span>
                      <span className="font-mono text-base font-bold text-[#bc6c25]">
                        {item.adad}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 text-xs">
                    <div>
                      <span className="font-bold text-[#1b4332] text-sm block">
                        {item.divineName} ({item.divineNameUrdu})
                      </span>
                    </div>

                    <div className="bg-[#f8f9fa] p-2 rounded-lg space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-gray-500">یوم و سیارہ:</span>
                        <span className="font-semibold text-[#2c1e14]">{item.dayUrdu}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-gray-500">موکلِ علوی:</span>
                        <span className="font-semibold text-[#2c1e14]">{item.celestialRuler}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-gray-500">ملکِ ارضی:</span>
                        <span className="font-semibold text-[#2c1e14]">{item.planetaryRuler}</span>
                      </div>
                    </div>

                    <div className="bg-[#e8f5e9] p-2 rounded-lg text-[#1b5e20] text-[11px] leading-relaxed">
                      <b>مقصد:</b> {item.specialPurpose}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#f0eae1]">
                  {onSendToNaqsh && (
                    <button
                      onClick={() => onSendToNaqsh(item.adad)}
                      className="w-full py-1.5 rounded-lg bg-[#1b4332] hover:bg-[#2d6a4f] text-[#ffd166] text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Award className="h-3.5 w-3.5" />
                      <span>نقش بنائیں ({item.adad})</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. TAB: 7 HOLY SEALS OF SOLOMON (خواتم سلیمان السبعۃ) */}
      {/* ========================================================= */}
      {activeTab === 'solomon' && (
        <div className="space-y-6">
          <div className="bg-[#fdfbf7] p-5 rounded-2xl border-2 border-[#d4af37]/50 shadow-sm space-y-2">
            <h3 className="font-amiri text-xl font-bold text-[#1b4332] flex items-center gap-2">
              <Award className="h-5 w-5 text-[#bc6c25]" />
              <span>خواتمُ سليمانَ السبعة وأشكالُ الاسمِ الأعظم (Seals of Solomon)</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#495057] leading-relaxed">
              شمس المعارف الکبریٰ کا باب سی و ہشتم اور دوازدہم ان سات مقدس علامات پر مشتمل ہے جو حضرت
              سلیمانؑ کی انگوٹھی اور اسمِ اعظم کے طلسم پر مشتمل ہیں۔ یہ تمام علامات کائنات کے ساتوں
              عناصر اور سیاروں کا مہر بند کنٹرول رکھتی ہیں۔
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHAMS_SOLOMON_SEALS.map((seal, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border-2 border-[#e2d9cc] p-5 shadow-sm hover:border-[#d4af37] space-y-3"
              >
                <div className="flex items-center justify-between border-b border-[#f0eae1] pb-2">
                  <span className="text-xs font-bold text-[#1b4332] bg-[#d8f3dc] px-2 py-0.5 rounded-md">
                    مہر #{i + 1}
                  </span>
                  <span className="text-xs font-semibold text-[#bc6c25]">
                    {seal.day} ({seal.planet})
                  </span>
                </div>

                <div className="bg-gradient-to-br from-[#1b4332] to-[#081c15] text-[#ffd166] p-4 rounded-xl text-center">
                  <div className="font-amiri text-2xl font-bold">{seal.symbolArabic}</div>
                  <div className="text-xs text-[#d8f3dc] mt-1">{seal.symbolName}</div>
                </div>

                <div className="space-y-2 text-xs">
                  <p className="text-[#495057] leading-relaxed">{seal.urduMeaning}</p>
                  <div className="bg-[#f8f9fa] p-2.5 rounded-lg border border-[#dee2e6]">
                    <span className="font-bold text-[#1b4332] block text-[11px]">اسمِ منسوب:</span>
                    <span className="font-semibold text-[#2c1e14]">{seal.divineAttribute}</span>
                  </div>
                  <div className="bg-[#e8f5e9] p-2.5 rounded-lg border border-[#c8e6c9]">
                    <span className="font-bold text-[#2e7d32] block text-[11px]">
                      باطنی تاثیر و فائدہ:
                    </span>
                    <span className="text-[#1b5e20]">{seal.secretBenefit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. TAB: CHILLA RULES & SPIRITUAL CONDITIONS (شرائط و حصار) */}
      {/* ========================================================= */}
      {activeTab === 'chilla' && (
        <div className="space-y-6">
          <div className="bg-[#fdfbf7] p-5 rounded-2xl border-2 border-[#d4af37]/50 shadow-sm space-y-2">
            <h3 className="font-amiri text-xl font-bold text-[#1b4332] flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#2e7d32]" />
              <span>قوانين الخلوة والرياضة وحصن البوني المانع من الرجعة</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#495057] leading-relaxed">
              شمس المعارف الکبریٰ کے مطابق کسی بھی عمل، ریاضت یا طلسم کی کامیابی کے لیے درج ذیل شرائط
              کا پورا ہونا لازمی ہے، ورنہ عمل بے اثر رہتا ہے یا عامل پر رجعت واقع ہو سکتی ہے۔
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#e0d6c3] shadow-sm space-y-3">
              <h4 className="font-bold text-[#1b4332] text-sm flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#d4af37]" />
                <span>۱. پرہیزِ جلالی و جمالی (Dietary Restrictions):</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#495057]">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                  <span>
                    <b>ترکِ حیوانی:</b> گوشت، مچھلی، انڈے، دودھ، مکھن، پنیر اور چمڑے کی اشیاء سے
                    مکمل پرہیز۔
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                  <span>
                    <b>بدبودار اشیاء سے پرہیز:</b> کچا پیاز، لہسن، ہینگ (سوائے جلالی اعمال)، اور
                    تمباکو نوشی سے مکمل اجتناب۔
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                  <span>
                    <b>حلال غذا:</b> جو کی روٹی، زیتون کا تیل، کشمش، بادام اور خشک میوہ جات پر
                    اکتفاء۔
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#e0d6c3] shadow-sm space-y-3">
              <h4 className="font-bold text-[#1b4332] text-sm flex items-center gap-2">
                <Compass className="h-4 w-4 text-[#d4af37]" />
                <span>۲. شرائطِ مکان و لباس (Environment & Attire):</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#495057]">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                  <span>
                    <b>خلوتِ پاک:</b> کمرہ بالکل تنہا، تاریک یا مدہم روشنی والا، اور تصاویر و کتوں
                    سے پاک ہو۔
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                  <span>
                    <b>لباسِ ابیض:</b> سفید، بے سلا یا پاکیزہ سوتی لباس مع عطرِ عود یا صندل۔
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                  <span>
                    <b>صرف العمار:</b> عمل شروع کرنے سے پہلے سورہ زلزال ۳ بار پڑھ کر مقام کے جنات کو
                    رخصت کرنا۔
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#e0d6c3] shadow-sm space-y-3">
              <h4 className="font-bold text-[#1b4332] text-sm flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-[#bc6c25]" />
                <span>۳. حصارِ فولادی (Spiritual Protective Fortress):</span>
              </h4>
              <p className="text-xs text-[#495057] leading-relaxed">
                کسی بھی جلالی عمل یا طلسم کے وقت چھری یا لوہے کی کیل سے اپنے گرد گول دائرہ بنائیں اور
                آیت الکرسی ۷ بار اور معوذتین پڑھ کر اپنے اوپر اور دائرے پر دم کریں۔ جب تک عمل مکمل نہ
                ہو، دائرے سے باہر قدم نہ نکالیں۔
              </p>
              {onNavigateToHisar && (
                <button
                  onClick={onNavigateToHisar}
                  className="w-full py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-[#ffd166] text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Shield className="h-4 w-4" />
                  <span>حصارِ اعظم و پرہیز اسٹوڈیو کھولیں</span>
                </button>
              )}
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#e0d6c3] shadow-sm space-y-3">
              <h4 className="font-bold text-[#1b4332] text-sm flex items-center gap-2">
                <Award className="h-4 w-4 text-[#d4af37]" />
                <span>۴. زکوٰۃ و شکرانہ (Zakat & Charity):</span>
              </h4>
              <p className="text-xs text-[#495057] leading-relaxed">
                ہر عمل کی تکمیل پر غریبوں اور مساکین کو میٹھی چیز یا کھانا کھلانا لازمی ہے تاکہ
                روحانی قوت میں برکت رہے اور اللہ تعالیٰ کا شکر ادا ہو۔
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
