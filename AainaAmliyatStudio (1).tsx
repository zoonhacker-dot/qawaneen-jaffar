import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Flame, 
  Moon, 
  Sun, 
  Compass, 
  Clock, 
  ShieldCheck, 
  Search, 
  Copy, 
  Check, 
  Printer, 
  Heart, 
  Users, 
  Eye, 
  Lock, 
  Award, 
  Zap, 
  Layers, 
  AlertTriangle,
  Send,
  HelpCircle,
  Activity,
  Bookmark,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AAINA_AMLIYAT_CATALOG, AainaAmalItem } from '../data/aainaAmliyatData';

interface AainaAmliyatStudioProps {
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
}

export const AainaAmliyatStudio: React.FC<AainaAmliyatStudioProps> = ({
  onSendToNaqsh,
  onSendToTakseer
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAmal, setSelectedAmal] = useState<AainaAmalItem>(AAINA_AMLIYAT_CATALOG[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDiagramExpanded, setIsDiagramExpanded] = useState<boolean>(true);

  // Categories list
  const categories = [
    { id: 'all', label: 'تمام ابواب و عملیات (مکمل کتاب)', icon: BookOpen },
    { id: 'mahabbat', label: 'اعمالِ محبت و تسخیرِ قلوب', icon: Heart },
    { id: 'taskheer_arwah', label: 'تسخیرِ ارواح و موکلات', icon: Sparkles },
    { id: 'kashf_ruya', label: 'کشف، رویا و استخارہ', icon: Eye },
    { id: 'shifa_sehr', label: 'شفاء الامراض و ازالۂ سحر', icon: Flame },
    { id: 'rizq_ghina', label: 'رزق، فتوحات و کاروبار', icon: Award },
    { id: 'galba_dushman', label: 'غلبہ، فتح و زبان بندی', icon: Lock },
    { id: 'hisaar_hifazat', label: 'حفاظت، حصار و صیانت', icon: ShieldCheck },
    { id: 'tilismat_nawadir', label: 'نوادر و طلسماتِ نایاب', icon: Zap }
  ];

  // Filtered Catalog
  const filteredAmals = useMemo(() => {
    return AAINA_AMLIYAT_CATALOG.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.titleUrdu.toLowerCase().includes(q);
        const matchesChapter = item.originChapter.toLowerCase().includes(q);
        const matchesCategory = item.categoryUrdu.toLowerCase().includes(q);
        const matchesAzimat = item.arabicAzimat.toLowerCase().includes(q);
        const matchesTrans = item.urduTranslation.toLowerCase().includes(q);
        const matchesNumber = item.amalNumber.toString().includes(q);
        return matchesTitle || matchesChapter || matchesCategory || matchesAzimat || matchesTrans || matchesNumber;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = (item: AainaAmalItem) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html dir="rtl" lang="ur">
        <head>
          <title>${item.titleUrdu} - آئینہ عملیات</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 25px; line-height: 1.6; color: #2c1e14; }
            .header { text-align: center; border-bottom: 2px solid #8d6e63; padding-bottom: 15px; margin-bottom: 20px; }
            .title { font-size: 20px; font-weight: bold; color: #5d4037; }
            .arabic { font-size: 22px; font-family: 'Traditional Arabic', serif; direction: rtl; text-align: center; background: #fdfaf1; padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #d4a373; }
            .section-title { font-weight: bold; color: #bc6c25; margin-top: 15px; margin-bottom: 5px; font-size: 15px; }
            .matrix-table { margin: 15px auto; border-collapse: collapse; text-align: center; }
            .matrix-table td { border: 2px solid #5d4037; width: 45px; height: 45px; font-size: 16px; font-weight: bold; }
            .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #8d6e63; border-top: 1px solid #ddd; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">آئینہ عملیات و طلسماتِ کاملہ</div>
            <div>${item.originChapter}</div>
          </div>
          <h2>${item.titleUrdu}</h2>
          <div class="arabic">${item.arabicAzimat}</div>
          <p><strong>اردو ترجمہ و مفہوم:</strong> ${item.urduTranslation}</p>
          <p><strong>ساعت و وقت:</strong> ${item.timingAndSaat.day} - ${item.timingAndSaat.planetSaat}</p>
          <p><strong>بخور و سیاہی:</strong> ${item.incenseAndInk.ink} | ${item.incenseAndInk.incense}</p>
          <p><strong>تعدادِ ورد:</strong> ${item.abjadCalculation.recommendedRecitations} بار | موکل: ${item.abjadCalculation.muwakkilName}</p>
          <div class="section-title">طریقہ کار و قواعد:</div>
          <ol>
            ${item.stepByStepProtocol.map(step => `<li>${step}</li>`).join('')}
          </ol>
          <p><strong>استعمال و جگہ:</strong> ${item.usageAndPlacement}</p>
          <div class="footer">طراحی شدہ برائے علمی و روحانی مقاصد - مفتاح الجفر</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-[#f2e8cf] p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2.5 rounded-2xl bg-[#bc6c25] text-white shadow-md">
                <BookOpen className="h-6 w-6" />
              </span>
              <h2 className="font-amiri text-2xl sm:text-3xl font-bold text-[#5d4037]">
                آئینہ عملیات و طلسماتِ کاملہ (Aaina Amliyat)
              </h2>
            </div>
            <p className="mt-2 text-sm text-[#8d6e63] max-w-3xl font-medium leading-relaxed">
              مستند کتبِ عملیات و طلسمات کا مکمل انسائیکلوپیڈیا: اعمالِ محبت، الفتِ زوجین، تسخیرِ ارواح و موکلات، کشفِ منامات، شفائے امراض، وسعتِ رزق، عقد اللسان، اور نادر طلسمی نقوش و دوائر۔
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3.5 py-1.5 rounded-full bg-[#faedcd] border border-[#d4a373] text-xs font-bold text-[#5d4037] flex items-center gap-1.5 shadow-sm">
              <Sparkles className="h-4 w-4 text-[#bc6c25]" />
              <span>مستند ابواب و نقوشِ کاملہ</span>
            </span>
          </div>
        </div>

        {/* Search & Categories */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <input
              type="text"
              id="aaina-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="آئینہ عملیات میں تلاش کریں (مثلاً: محبت، تسخیر، رزق، کشف، زبان بندی، شفا، سلیمان)..."
              className="w-full rounded-2xl border-2 border-[#d4a373] bg-[#ffffff] px-4 py-3 text-sm text-[#2c1e14] placeholder-[#a89078] focus:border-[#bc6c25] focus:outline-none shadow-inner"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#8d6e63]" />
          </div>

          {/* Category Chips Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-btn-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#bc6c25] text-white shadow-md'
                      : 'bg-[#ffffff] border border-[#d4a373] text-[#5d4037] hover:bg-[#faedcd]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Left List (1 col) + Right Detail View (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Operations List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-amiri text-base font-bold text-[#5d4037] flex items-center gap-1.5">
              <Bookmark className="h-4 w-4 text-[#bc6c25]" />
              <span>فہرستِ اعمال ({filteredAmals.length})</span>
            </h3>
            <span className="text-[11px] text-[#8d6e63]">کلک کر کے تفصیل دیکھیں</span>
          </div>

          <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
            {filteredAmals.map((amal) => {
              const isSelected = selectedAmal.id === amal.id;
              return (
                <button
                  key={amal.id}
                  id={`amal-item-${amal.id}`}
                  onClick={() => setSelectedAmal(amal)}
                  className={`w-full text-right p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#faedcd] border-2 border-[#bc6c25] text-[#5d4037] shadow-md font-bold'
                      : 'bg-[#ffffff] border-[#e7d8c9] text-[#5d4037] hover:bg-[#fdfaf1]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#bc6c25]/15 text-[10px] font-bold text-[#bc6c25]">
                      {amal.categoryUrdu}
                    </span>
                    <span className="text-[10px] font-bold text-[#8d6e63]">
                      عمل نمبر #{amal.amalNumber}
                    </span>
                  </div>
                  <h4 className="font-amiri text-base font-bold text-[#5d4037] line-clamp-1">
                    {amal.titleUrdu}
                  </h4>
                  <p className="text-[11px] text-[#8d6e63] line-clamp-2 mt-1 font-medium">
                    {amal.originChapter}
                  </p>
                </button>
              );
            })}

            {filteredAmals.length === 0 && (
              <div className="p-8 text-center bg-white rounded-2xl border border-[#d4a373] text-[#8d6e63]">
                <AlertTriangle className="h-8 w-8 text-[#dda15e] mx-auto mb-2" />
                <p className="font-bold text-sm">کوئی عمل دستیاب نہیں ملا</p>
                <p className="text-xs mt-1">تلاش کا لفظ تبدیل کر کے دوبارہ کوشش کریں۔</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Detailed Operation View & Diagram Studio */}
        <div className="lg:col-span-2 space-y-6">
          {selectedAmal ? (
            <div className="rounded-3xl border-2 border-[#d4a373] bg-[#ffffff] p-6 sm:p-8 shadow-lg space-y-6">
              {/* Header Title & Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#e7d8c9] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#bc6c25] text-white text-[11px] font-bold">
                      {selectedAmal.categoryUrdu}
                    </span>
                    <span className="text-xs text-[#8d6e63] font-bold">
                      {selectedAmal.originChapter}
                    </span>
                  </div>
                  <h3 className="font-amiri text-2xl font-bold text-[#5d4037] mt-1.5">
                    {selectedAmal.titleUrdu}
                  </h3>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleCopy(selectedAmal.arabicAzimat, `azimat-${selectedAmal.id}`)}
                    className="p-2 rounded-xl bg-[#faedcd] hover:bg-[#d4a373] text-[#5d4037] border border-[#d4a373] text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                    title="عزیمت کاپی کریں"
                  >
                    {copiedId === `azimat-${selectedAmal.id}` ? <Check className="h-4 w-4 text-green-700" /> : <Copy className="h-4 w-4" />}
                    <span className="hidden sm:inline">کاپی</span>
                  </button>

                  <button
                    onClick={() => handlePrint(selectedAmal)}
                    className="p-2 rounded-xl bg-[#5d4037] hover:bg-[#43281c] text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-sm"
                    title="پرنٹ کریں"
                  >
                    <Printer className="h-4 w-4" />
                    <span className="hidden sm:inline">پرنٹ</span>
                  </button>
                </div>
              </div>

              {/* Arabic Azimat & Pronunciation / Meaning */}
              <div className="p-5 rounded-2xl bg-[#fdfaf1] border-2 border-[#d4a373] space-y-3 shadow-inner">
                <div className="flex items-center justify-between text-xs text-[#bc6c25] font-bold">
                  <span>عزیمت و کلماتِ مبارکہ</span>
                  <span>عدد کل: {selectedAmal.abjadCalculation.verseAdad}</span>
                </div>
                <div className="font-amiri text-xl sm:text-2xl text-[#2c1e14] text-center leading-loose font-bold select-all">
                  {selectedAmal.arabicAzimat}
                </div>
                <div className="pt-2 border-t border-[#e7d8c9] space-y-1">
                  <p className="text-xs text-[#8d6e63]">
                    <strong className="text-[#5d4037]">تلفظ و اعراب: </strong>
                    {selectedAmal.urduPronunciation}
                  </p>
                  <p className="text-xs text-[#2c1e14]">
                    <strong className="text-[#5d4037]">اردو ترجمہ و مفہوم: </strong>
                    {selectedAmal.urduTranslation}
                  </p>
                </div>
              </div>

              {/* Visual Diagram / Talismanic Seal Visualizer */}
              <div className="rounded-2xl border-2 border-[#bc6c25] bg-[#faedcd]/40 p-5 space-y-4">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setIsDiagramExpanded(!isDiagramExpanded)}
                >
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-[#bc6c25] text-white">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <h4 className="font-amiri text-lg font-bold text-[#5d4037]">
                      {selectedAmal.diagramTitle}
                    </h4>
                  </div>
                  <button className="text-[#bc6c25] p-1">
                    {isDiagramExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                {isDiagramExpanded && (
                  <div className="pt-2 space-y-4">
                    {/* Render Circular Seal if available */}
                    {selectedAmal.diagramType === 'circular_seal' || selectedAmal.diagramType === 'tilism_khatim' || selectedAmal.diagramType === 'shamsi_qamari_seal' ? (
                      selectedAmal.circularSealData ? (
                        <div className="relative mx-auto max-w-sm p-6 rounded-full border-4 border-double border-[#bc6c25] bg-[#fffdfa] shadow-inner text-center space-y-3">
                          {/* Corner Angels */}
                          <div className="flex justify-between text-[10px] font-bold text-[#8d6e63] px-2">
                            <span>{selectedAmal.circularSealData.cornerAngels[0]}</span>
                            <span>{selectedAmal.circularSealData.cornerAngels[1]}</span>
                          </div>

                          {/* Outer Ring */}
                          <div className="border-2 border-dashed border-[#d4a373] rounded-full p-4 space-y-2">
                            <div className="text-[11px] font-amiri font-bold text-[#bc6c25]">
                              {selectedAmal.circularSealData.outerRing.join(' ٭ ')}
                            </div>

                            {/* Inner Ring */}
                            <div className="border-2 border-[#5d4037] rounded-full p-4 bg-[#fdfaf1]">
                              <div className="text-[10px] font-bold text-[#5d4037] mb-1">
                                {selectedAmal.circularSealData.innerRing.join(' • ')}
                              </div>
                              <div className="font-amiri text-base font-bold text-[#9d0208] border-t border-[#d4a373] pt-1">
                                {selectedAmal.circularSealData.centerWord}
                              </div>
                            </div>
                          </div>

                          {/* Bottom Corner Angels */}
                          <div className="flex justify-between text-[10px] font-bold text-[#8d6e63] px-2">
                            <span>{selectedAmal.circularSealData.cornerAngels[2]}</span>
                            <span>{selectedAmal.circularSealData.cornerAngels[3]}</span>
                          </div>
                        </div>
                      ) : null
                    ) : null}

                    {/* Render Matrix / Naqsh Grid if available */}
                    {selectedAmal.diagramMatrix && (
                      <div className="overflow-x-auto flex justify-center py-2">
                        <table className="border-collapse border-2 border-[#5d4037] bg-white text-center shadow-md">
                          <tbody>
                            {selectedAmal.diagramMatrix.map((row, rIdx) => (
                              <tr key={rIdx}>
                                {row.map((val, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className="border-2 border-[#5d4037] w-12 h-12 sm:w-14 sm:h-14 font-mono font-bold text-[#5d4037] text-sm sm:text-base hover:bg-[#faedcd] transition-all"
                                  >
                                    {val}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <p className="text-center text-xs text-[#8d6e63] font-medium">
                      نقش و دائرۂ مبارکہ آئینہ عملیات کی قدیم نسخہ جات کی روایات کے عین مطابق تیار کیا گیا ہے۔
                    </p>
                  </div>
                )}
              </div>

              {/* Protocol Grid: Hours, Incense, Abjad */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                {/* Hours & Saat */}
                <div className="p-4 rounded-2xl bg-[#fdfaf1] border border-[#d4a373] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#5d4037]">
                    <Clock className="h-4 w-4 text-[#bc6c25]" />
                    <span>ساعت و وقت</span>
                  </div>
                  <p><strong className="text-[#8d6e63]">دن: </strong>{selectedAmal.timingAndSaat.day}</p>
                  <p><strong className="text-[#8d6e63]">ساعت: </strong>{selectedAmal.timingAndSaat.planetSaat}</p>
                  <p><strong className="text-[#8d6e63]">سمت: </strong>{selectedAmal.timingAndSaat.direction}</p>
                </div>

                {/* Incense & Ink */}
                <div className="p-4 rounded-2xl bg-[#fdfaf1] border border-[#d4a373] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#5d4037]">
                    <Flame className="h-4 w-4 text-[#bc6c25]" />
                    <span>بخور و سیاہی</span>
                  </div>
                  <p><strong className="text-[#8d6e63]">سیاہی: </strong>{selectedAmal.incenseAndInk.ink}</p>
                  <p><strong className="text-[#8d6e63]">بخور: </strong>{selectedAmal.incenseAndInk.incense}</p>
                  <p><strong className="text-[#8d6e63]">کاغذ/تختی: </strong>{selectedAmal.incenseAndInk.writingSurface}</p>
                </div>

                {/* Recitation & Muwakkil */}
                <div className="p-4 rounded-2xl bg-[#fdfaf1] border border-[#d4a373] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#5d4037]">
                    <Award className="h-4 w-4 text-[#bc6c25]" />
                    <span>تعداد و موکلات</span>
                  </div>
                  <p><strong className="text-[#8d6e63]">تعدادِ ورد: </strong>{selectedAmal.abjadCalculation.recommendedRecitations} بار</p>
                  <p><strong className="text-[#8d6e63]">موکل علوی: </strong>{selectedAmal.abjadCalculation.muwakkilName}</p>
                  <p><strong className="text-[#8d6e63]">خادم سفلی: </strong>{selectedAmal.abjadCalculation.jinnKhadimName}</p>
                </div>
              </div>

              {/* Step by Step Execution Method */}
              <div className="space-y-2">
                <h4 className="font-amiri text-base font-bold text-[#5d4037] flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-[#bc6c25]" />
                  <span>طریقہ کار و مرحلہ وار شرائط</span>
                </h4>
                <div className="space-y-2">
                  {selectedAmal.stepByStepProtocol.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#fdfaf1] border border-[#e7d8c9] text-xs text-[#2c1e14] leading-relaxed">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage & Warnings */}
              <div className="p-4 rounded-2xl bg-[#faedcd]/40 border border-[#d4a373] space-y-2 text-xs">
                <p>
                  <strong className="text-[#5d4037]">استعمال و جگہ: </strong>
                  {selectedAmal.usageAndPlacement}
                </p>
                <p className="text-[#8d6e63]">
                  <strong className="text-[#5d4037]">ہدایت و تنبیہ مصنف: </strong>
                  {selectedAmal.authorNotesAndWarnings}
                </p>
              </div>

              {/* Interactive Transfer Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {onSendToNaqsh && (
                  <button
                    onClick={() => onSendToNaqsh(selectedAmal.abjadCalculation.verseAdad)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#bc6c25] hover:bg-[#9d531a] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>نقش جنریٹر میں بھیجیں (عدد: {selectedAmal.abjadCalculation.verseAdad})</span>
                  </button>
                )}

                {onSendToTakseer && (
                  <button
                    onClick={() => onSendToTakseer(selectedAmal.titleUrdu)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#5d4037] hover:bg-[#43281c] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <Flame className="h-4 w-4 text-[#ffd166]" />
                    <span>تکسیر اسٹوڈیو میں بھیجیں</span>
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
