import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Sparkles, 
  Flame, 
  Moon, 
  Sun, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Copy, 
  Check, 
  Printer, 
  Layers, 
  BookOpen, 
  Activity, 
  UserCheck, 
  Zap, 
  Search,
  Lock,
  Compass,
  Play,
  Pause,
  RotateCcw,
  Send,
  HelpCircle
} from 'lucide-react';
import { HAMZAD_OPERATIONS_CATALOG, HamzadOperation } from '../data/hamzadOperationsData';

interface MokamalHamzadStudioProps {
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
}

export const MokamalHamzadStudio: React.FC<MokamalHamzadStudioProps> = ({
  onSendToNaqsh,
  onSendToTakseer
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('one_night');
  const [selectedAmal, setSelectedAmal] = useState<HamzadOperation>(HAMZAD_OPERATIONS_CATALOG[4]); // default to 1-night
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Safety Checklist interactive state
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    hisarBanded: false,
    taharatClean: false,
    khilwatReady: false,
    parheezDone: false,
    fearControlled: false
  });

  // Interactive Live Focus / Chilla Timer
  const [timerSeconds, setTimerSeconds] = useState<number>(1800); // 30 mins default
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [recitationCounter, setRecitationCounter] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = (op: HamzadOperation) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html dir="rtl" lang="ur">
        <head>
          <title>${op.title} - تسخیرِ ہمزاد</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 25px; line-height: 1.6; color: #2c1e14; }
            .header { text-align: center; border-bottom: 2px solid #8d6e63; padding-bottom: 15px; margin-bottom: 20px; }
            .title { font-size: 20px; font-weight: bold; color: #5d4037; }
            .arabic { font-size: 22px; font-family: 'Traditional Arabic', serif; direction: rtl; text-align: center; background: #fdfaf1; padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #d4a373; }
            .section-title { font-weight: bold; color: #bc6c25; margin-top: 15px; margin-bottom: 5px; font-size: 15px; }
            .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #8d6e63; border-top: 1px solid #ddd; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">تسخیر و حاضراتِ ہمزاد (مستند عملیات)</div>
            <div>${op.categoryUrdu} | مدت: ${op.duration}</div>
          </div>
          <h2>${op.title}</h2>
          <div class="arabic">${op.azimatArabic}</div>
          <p><strong>تلفظ و پڑھائی:</strong> ${op.urduPronunciation}</p>
          <p><strong>تعدادِ ورد:</strong> ${op.dailyRecitationCount} بار روزانہ | <strong>پرہیز:</strong> ${op.parheezType}</p>
          <p><strong>حفاظتی حصار:</strong> ${op.requiredHisaar}</p>
          <div class="section-title">طریقہ کار و مرحلہ وار شرائط:</div>
          <ol>
            ${op.stepByStepProtocol.map(step => `<li>${step}</li>`).join('')}
          </ol>
          <div class="section-title">علاماتِ حاضری و ظہور:</div>
          <ul>
            ${op.manifestationSigns.map(sign => `<li>${sign}</li>`).join('')}
          </ul>
          <div class="section-title">کام لینے کا طریقہ:</div>
          <ul>
            ${op.workDelegationRules.map(rule => `<li>${rule}</li>`).join('')}
          </ul>
          <p><strong>کلمۂ انصراف (رخصت):</strong> ${op.dismissalFormula}</p>
          <p><strong>کلمۂ طلب (بلانا):</strong> ${op.callFormula}</p>
          <div class="footer">طراحی شدہ برائے علمی و روحانی مقاصد - مفتاح الجفر</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const navCategories = [
    { id: 'one_night', label: 'ایک رات والا ۱۰۰٪ بے خطا عمل', icon: Zap, color: 'text-[#9d0208]' },
    { id: 'home_safe', label: 'گھر پر کیے جانے والے مستند اعمال', icon: ShieldCheck, color: 'text-[#2a9d8f]' },
    { id: 'work_delegation', label: 'ہمزاد سے ۱۰۰٪ کام لینے کے طریقے', icon: Activity, color: 'text-[#bc6c25]' },
    { id: 'short_duration_3_7', label: '۳ تا ۷ روزہ سریع التاثیر اعمال', icon: Moon, color: 'text-[#5d4037]' },
    { id: 'full_chilla_21_40', label: '۲۱ تا ۴۰ روزہ کامل چلہ جات', icon: Flame, color: 'text-[#e76f51]' },
    { id: 'safety_hisar', label: 'حفاظتی حصار و شرائطِ سلامتی', icon: Lock, color: 'text-[#1d3557]' }
  ];

  const filteredAmals = HAMZAD_OPERATIONS_CATALOG.filter(op => {
    if (activeCategory !== 'all' && op.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        op.title.toLowerCase().includes(q) ||
        op.categoryUrdu.toLowerCase().includes(q) ||
        op.azimatArabic.toLowerCase().includes(q) ||
        op.urduPronunciation.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-[#f2e8cf] p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2.5 rounded-2xl bg-[#5d4037] text-white shadow-md">
                <Eye className="h-6 w-6" />
              </span>
              <h2 className="font-amiri text-2xl sm:text-3xl font-bold text-[#5d4037]">
                تسخیر و حاضراتِ ہمزاد (Mokamal Hamzad Studio)
              </h2>
            </div>
            <p className="mt-2 text-sm text-[#8d6e63] max-w-3xl font-medium leading-relaxed">
              ہمزاد کی کامل حقیقت، حفاظتی حصار، گھر پر کیے جانے والے مستند و بے ضرر اعمال (آئینہ، شمع، سایہ)، ایک رات والا سو فیصد بے خطا عمل، ۳ تا ۴۰ روزہ چلہ جات اور ہمزاد سے کام لینے کا مکمل اور محفوظ طریقہ۔
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="px-3 py-1 rounded-full bg-[#faedcd] border border-[#d4a373] text-xs font-bold text-[#5d4037] flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-[#2a9d8f]" />
              <span>۱۰۰٪ مستند و محفوظ قواعد</span>
            </span>
          </div>
        </div>

        {/* Categories Chips */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {navCategories.map(cat => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`hamzad-cat-${cat.id}`}
                onClick={() => {
                  setActiveCategory(cat.id);
                  const firstMatch = HAMZAD_OPERATIONS_CATALOG.find(o => o.category === cat.id);
                  if (firstMatch) setSelectedAmal(firstMatch);
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#5d4037] text-white shadow-md'
                    : 'bg-white border border-[#d4a373] text-[#5d4037] hover:bg-[#faedcd]'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Operations Selector + Detailed Studio View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List of items */}
        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-[#d4a373] bg-white p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-amiri text-base font-bold text-[#5d4037] flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-[#bc6c25]" />
                <span>فہرست اعمالِ ہمزاد ({filteredAmals.length})</span>
              </h3>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredAmals.map(op => {
                const isSelected = selectedAmal.id === op.id;
                return (
                  <button
                    key={op.id}
                    id={`hamzad-item-${op.id}`}
                    onClick={() => setSelectedAmal(op)}
                    className={`w-full text-right p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#faedcd] border-2 border-[#bc6c25] text-[#5d4037] shadow-md font-bold'
                        : 'bg-white border-[#e7d8c9] text-[#5d4037] hover:bg-[#fdfaf1]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-[#bc6c25]/15 text-[10px] font-bold text-[#bc6c25]">
                        {op.duration}
                      </span>
                      <span className="text-[10px] text-[#8d6e63]">#{op.amalNumber}</span>
                    </div>
                    <h4 className="font-amiri text-sm font-bold text-[#5d4037] line-clamp-2">
                      {op.title}
                    </h4>
                    <p className="text-[11px] text-[#8d6e63] mt-1 line-clamp-1">{op.parheezType}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Pre-Amal Safety Checklist */}
          <div className="rounded-2xl border-2 border-[#bc6c25] bg-[#fffdfa] p-5 shadow-sm space-y-3">
            <h4 className="font-amiri text-base font-bold text-[#5d4037] flex items-center gap-1.5">
              <ShieldCheck className="h-5 w-5 text-[#2a9d8f]" />
              <span>حفاظتی چیک لسٹ (عمل سے پہلے تصدیق کریں)</span>
            </h4>
            <p className="text-[11px] text-[#8d6e63]">
              کسی بھی عمل کو شروع کرنے سے پہلے ان ۵ شرائط پر ٹک کریں تاکہ رجعت اور خوف کا کوئی خطرہ نہ رہے۔
            </p>

            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.hisarBanded}
                  onChange={(e) => setChecklist({ ...checklist, hisarBanded: e.target.checked })}
                  className="rounded text-[#bc6c25] focus:ring-[#bc6c25]"
                />
                <span className={checklist.hisarBanded ? 'line-through text-[#8d6e63]' : 'text-[#2c1e14] font-medium'}>
                  ۱. آیت الکرسی سے لوہے کی چھری سے ۳ دائروں کا حصار کھینچ لیا ہے۔
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.taharatClean}
                  onChange={(e) => setChecklist({ ...checklist, taharatClean: e.target.checked })}
                  className="rounded text-[#bc6c25] focus:ring-[#bc6c25]"
                />
                <span className={checklist.taharatClean ? 'line-through text-[#8d6e63]' : 'text-[#2c1e14] font-medium'}>
                  ۲. بدن، لباس اور کمرہ مکمل پاک و صاف اور معطر ہے۔
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.khilwatReady}
                  onChange={(e) => setChecklist({ ...checklist, khilwatReady: e.target.checked })}
                  className="rounded text-[#bc6c25] focus:ring-[#bc6c25]"
                />
                <span className={checklist.khilwatReady ? 'line-through text-[#8d6e63]' : 'text-[#2c1e14] font-medium'}>
                  ۳. تنہائی یقینی ہے، دورانِ عمل کوئی دوسرا انسان دخل نہیں دے گا۔
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.parheezDone}
                  onChange={(e) => setChecklist({ ...checklist, parheezDone: e.target.checked })}
                  className="rounded text-[#bc6c25] focus:ring-[#bc6c25]"
                />
                <span className={checklist.parheezDone ? 'line-through text-[#8d6e63]' : 'text-[#2c1e14] font-medium'}>
                  ۴. گوشت، پیاز، لہسن اور بدبو دار اشیاء سے پرہیز کیا گیا ہے۔
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.fearControlled}
                  onChange={(e) => setChecklist({ ...checklist, fearControlled: e.target.checked })}
                  className="rounded text-[#bc6c25] focus:ring-[#bc6c25]"
                />
                <span className={checklist.fearControlled ? 'line-through text-[#8d6e63]' : 'text-[#2c1e14] font-medium'}>
                  ۵. دل میں کامل یقین ہے کہ انسان اشرف المخلوقات اور غالب ہے۔
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Operation Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedAmal && (
            <div className="rounded-3xl border-2 border-[#d4a373] bg-white p-6 sm:p-8 shadow-lg space-y-6">
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#e7d8c9] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#5d4037] text-white text-[11px] font-bold">
                      {selectedAmal.categoryUrdu}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#2a9d8f]/20 text-[#2a9d8f] text-[11px] font-bold">
                      {selectedAmal.difficulty}
                    </span>
                  </div>
                  <h3 className="font-amiri text-2xl font-bold text-[#5d4037] mt-1.5">
                    {selectedAmal.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleCopy(selectedAmal.azimatArabic, `hamzad-${selectedAmal.id}`)}
                    className="p-2 rounded-xl bg-[#faedcd] hover:bg-[#d4a373] text-[#5d4037] border border-[#d4a373] text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="عزیمت کاپی کریں"
                  >
                    {copiedId === `hamzad-${selectedAmal.id}` ? <Check className="h-4 w-4 text-green-700" /> : <Copy className="h-4 w-4" />}
                    <span>کاپی</span>
                  </button>

                  <button
                    onClick={() => handlePrint(selectedAmal)}
                    className="p-2 rounded-xl bg-[#5d4037] hover:bg-[#43281c] text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-sm"
                    title="پرنٹ کریں"
                  >
                    <Printer className="h-4 w-4" />
                    <span>پرنٹ</span>
                  </button>
                </div>
              </div>

              {/* Azimat Box */}
              <div className="p-5 rounded-2xl bg-[#fdfaf1] border-2 border-[#d4a373] space-y-3 shadow-inner">
                <div className="flex items-center justify-between text-xs text-[#bc6c25] font-bold">
                  <span>عزیمت و کلماتِ تسخیرِ ہمزاد</span>
                  <span>تعدادِ ورد: {selectedAmal.dailyRecitationCount} بار</span>
                </div>
                <div className="font-amiri text-xl sm:text-2xl text-[#2c1e14] text-center leading-loose font-bold select-all">
                  {selectedAmal.azimatArabic}
                </div>
                <p className="text-xs text-[#8d6e63] pt-2 border-t border-[#e7d8c9]">
                  <strong className="text-[#5d4037]">تلفظ و اعراب: </strong>
                  {selectedAmal.urduPronunciation}
                </p>
              </div>

              {/* Key Parameters: Time, Incense, Parheez, Hisar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#fdfaf1] border border-[#d4a373] space-y-1.5">
                  <p><strong className="text-[#5d4037]">مدتِ عمل: </strong>{selectedAmal.duration}</p>
                  <p><strong className="text-[#5d4037]">وقت و مقام: </strong>{selectedAmal.bestTimeAndPlace}</p>
                  <p><strong className="text-[#5d4037]">حفاظتی حصار: </strong>{selectedAmal.requiredHisaar}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#fdfaf1] border border-[#d4a373] space-y-1.5">
                  <p><strong className="text-[#5d4037]">پرہیز: </strong>{selectedAmal.parheezType}</p>
                  <p><strong className="text-[#5d4037]">لوازمات و بخور: </strong>{selectedAmal.incenseAndItems.join('، ')}</p>
                </div>
              </div>

              {/* Step By Step Protocol */}
              <div className="space-y-2">
                <h4 className="font-amiri text-base font-bold text-[#5d4037] flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-[#bc6c25]" />
                  <span>طریقہ کار و مرحلہ وار ہدایات</span>
                </h4>
                <div className="space-y-2">
                  {selectedAmal.stepByStepProtocol.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#fdfaf1] border border-[#e7d8c9] text-xs text-[#2c1e14] leading-relaxed">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Manifestation Signs & Delegation Rules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Manifestation Signs */}
                <div className="p-4 rounded-2xl bg-[#faedcd]/40 border border-[#d4a373] space-y-2">
                  <h5 className="font-amiri text-sm font-bold text-[#5d4037] flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-[#bc6c25]" />
                    <span>علاماتِ حاضری و ظہور</span>
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-[#2c1e14]">
                    {selectedAmal.manifestationSigns.map((sign, idx) => (
                      <li key={idx}>{sign}</li>
                    ))}
                  </ul>
                </div>

                {/* Delegation Rules */}
                <div className="p-4 rounded-2xl bg-[#faedcd]/40 border border-[#d4a373] space-y-2">
                  <h5 className="font-amiri text-sm font-bold text-[#5d4037] flex items-center gap-1">
                    <Activity className="h-4 w-4 text-[#2a9d8f]" />
                    <span>کام لینے کے قواعد و معاہدہ</span>
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-[#2c1e14]">
                    {selectedAmal.workDelegationRules.map((rule, idx) => (
                      <li key={idx}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Call & Dismissal Formulas */}
              <div className="p-4 rounded-2xl bg-[#5d4037] text-[#faedcd] space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row justify-between gap-2 border-b border-[#8d6e63] pb-2">
                  <div>
                    <span className="text-[#dda15e] font-bold block mb-1">کلمۂ انصراف (ہمزاد کو رخصت کرنا):</span>
                    <span className="font-amiri text-sm text-white font-bold">{selectedAmal.dismissalFormula}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[#dda15e] font-bold block mb-1">کلمۂ طلب (آئندہ بلانے کا طریقہ):</span>
                  <span className="font-amiri text-sm text-white font-bold">{selectedAmal.callFormula}</span>
                </div>
              </div>

              {/* Interactive Chilla Focus Timer & Dhikr Counter */}
              <div className="p-5 rounded-2xl border-2 border-[#bc6c25] bg-[#fffdfa] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#bc6c25]" />
                    <h4 className="font-amiri text-base font-bold text-[#5d4037]">
                      ریاضت و مراقبہ ٹائمر مع لائیو کاؤنٹر
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold bg-[#faedcd] text-[#5d4037] px-3 py-1 rounded-lg">
                    {formatTimer(timerSeconds)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isTimerRunning
                          ? 'bg-[#e76f51] text-white'
                          : 'bg-[#2a9d8f] text-white'
                      }`}
                    >
                      {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      <span>{isTimerRunning ? 'وقفہ (Pause)' : 'ٹائمر شروع کریں'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsTimerRunning(false);
                        setTimerSeconds(1800);
                      }}
                      className="p-2 rounded-xl border border-[#d4a373] text-[#5d4037] hover:bg-[#faedcd] text-xs cursor-pointer"
                      title="ری سیٹ"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Recitation Counter */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8d6e63]">پڑھائی کاؤنٹر:</span>
                    <span className="font-mono font-bold text-lg text-[#5d4037] bg-[#faedcd] px-3 py-1 rounded-lg">
                      {recitationCounter} / {selectedAmal.dailyRecitationCount}
                    </span>
                    <button
                      onClick={() => setRecitationCounter(prev => prev + 1)}
                      className="px-4 py-1.5 rounded-xl bg-[#bc6c25] hover:bg-[#9d531a] text-white text-xs font-bold cursor-pointer"
                    >
                      +۱ شمار
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Transfer Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {onSendToTakseer && (
                  <button
                    onClick={() => onSendToTakseer(selectedAmal.title)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#5d4037] hover:bg-[#43281c] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <Flame className="h-4 w-4 text-[#ffd166]" />
                    <span>تکسیر اسٹوڈیو میں استخراج کریں</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
