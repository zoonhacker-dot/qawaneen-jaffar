import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen, 
  Flame, 
  Sun, 
  Moon, 
  Clock, 
  Compass, 
  UserCheck, 
  Award, 
  Layers, 
  ShieldCheck, 
  Heart,
  ChevronDown,
  ChevronUp,
  Printer,
  FileText,
  Share2
} from 'lucide-react';
import { calculateAbjad } from '../utils/jafrEngine';

// Spiritual Harfi attributes for individual 28 Abjad letters
export const HARFI_SPIRITUAL_ATTRIBUTES: Record<string, { 
  name: string; 
  meaning: string; 
  muwakkil: string; 
  planet: string; 
  saat: string; 
  dhikr: string; 
  virtue: string;
  element: 'آتش' | 'خاک' | 'باد' | 'آب';
  elementBg: string;
}> = {
  'ا': { name: 'الف', meaning: 'وحدانیت، سرچشمۂ حیات، غلبۂ ارادہ', muwakkil: 'اسرافیل (یا اھطمائیل)', planet: 'شمس', saat: 'اتوار طلوع', dhikr: 'یا اللہ یا احد یا اول', virtue: 'تسخیرِ حکام و فتحِ مہمات', element: 'آتش', elementBg: 'bg-red-50 text-red-800 border-red-200' },
  'ب': { name: 'با', meaning: 'نقطۂ باطن، برکت، مظہرِ تخلیق', muwakkil: 'جبرائیل (یا بدوحائیل)', planet: 'قمر', saat: 'پیر طلوع', dhikr: 'یا باسط یا بر یا بدیع', virtue: 'وسعتِ رزق و برکتِ خانہ و اولاد', element: 'خاک', elementBg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  'ج': { name: 'جیم', meaning: 'جمال، جلالت، جامعیت و الفت', muwakkil: 'میکائیل (یا جمرائیل)', planet: 'مشتری', saat: 'جمعرات طلوع', dhikr: 'یا جلیل یا جامع یا جبار', virtue: 'الفتِ قلوب و اجتماعِ مقاصد', element: 'باد', elementBg: 'bg-amber-50 text-amber-800 border-amber-200' },
  'د': { name: 'دال', meaning: 'دوام، دلالتِ خیر، درجاتِ علیا', muwakkil: 'دردیائیل', planet: 'عطارد', saat: 'بدھ طلوع', dhikr: 'یا دائم یا دیان یا دلیل', virtue: 'ثباتِ قدم، شفا و تسکینِ امراض', element: 'آب', elementBg: 'bg-blue-50 text-blue-800 border-blue-200' },
  'ہ': { name: 'ہا', meaning: 'ہدایت، ہویتِ ذات، انوارِ باطن', muwakkil: 'ھورائیل', planet: 'زہرہ', saat: 'جمعہ طلوع', dhikr: 'یا ہادی یا ہو یا حنان', virtue: 'کشفِ قلوب و راحتِ باطن', element: 'آتش', elementBg: 'bg-red-50 text-red-800 border-red-200' },
  'و': { name: 'واو', meaning: 'وداد، وحدتِ ارواح، رابطۂ قلبی', muwakkil: 'وحیائیل', planet: 'زحل', saat: 'ہفتہ طلوع', dhikr: 'یا ودود یا وارث یا واحد', virtue: 'جلبِ محبت و تسخیرِ زوجین', element: 'خاک', elementBg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  'ز': { name: 'زا', meaning: 'زینت، زکوٰۃ، نورانی جلا', muwakkil: 'زمرائیل', planet: 'شمس', saat: 'اتوار زوال', dhikr: 'یا زکی یا ذوالجلال', virtue: 'عزت و جاہ و قبولیتِ عامہ', element: 'باد', elementBg: 'bg-amber-50 text-amber-800 border-amber-200' },
  'ح': { name: 'حا', meaning: 'حیات، حکمت، حفاظت و شفاء', muwakkil: 'حمائیل', planet: 'مشتری', saat: 'جمعرات چاشت', dhikr: 'یا حی یا حلیم یا حکیم', virtue: 'شفائے امراضِ لاعلاج و طہارت', element: 'آب', elementBg: 'bg-blue-50 text-blue-800 border-blue-200' },
  'ط': { name: 'طا', meaning: 'طہارت، طیب، طیرانِ روحانی', muwakkil: 'طمطمائیل', planet: 'مریخ', saat: 'منگل طلوع', dhikr: 'یا طاہر یا قدوس یا طیب', virtue: 'دفعِ سحر و شیاطین و آفات', element: 'آتش', elementBg: 'bg-red-50 text-red-800 border-red-200' },
  'ی': { name: 'یا', meaning: 'یقین، یدِ قدرت، یسر و آسانی', muwakkil: 'یدائیل', planet: 'زہرہ', saat: 'جمعہ بعد عصر', dhikr: 'یا قدیر یا یسیر یا قیوم', virtue: 'کامیابی و کشائشِ رزق', element: 'خاک', elementBg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  'ک': { name: 'کاف', meaning: 'کفایت، کرامت، کن فیکون', muwakkil: 'کلکائیل', planet: 'عطارد', saat: 'بدھ چاشت', dhikr: 'یا کافی یا کریم یا کبیر', virtue: 'کفایتِ مہمات و حاجات', element: 'باد', elementBg: 'bg-amber-50 text-amber-800 border-amber-200' },
  'ل': { name: 'لام', meaning: 'لطف، لسانِ صدق، لوحِ محفوظ', muwakkil: 'لوائیل', planet: 'قمر', saat: 'پیر چاشت', dhikr: 'یا لطیف یا لمیع یا علیم', virtue: 'لطفِ خفی و زبان بندی', element: 'آب', elementBg: 'bg-blue-50 text-blue-800 border-blue-200' },
  'م': { name: 'میم', meaning: 'ملک، مجد، مغفرت، مبداء', muwakkil: 'مہائیل', planet: 'زحل', saat: 'ہفتہ چاشت', dhikr: 'یا مالک یا مجید یا منان', virtue: 'وسعتِ حکومت و ہیبت', element: 'آتش', elementBg: 'bg-red-50 text-red-800 border-red-200' },
  'ن': { name: 'نون', meaning: 'نور، نصرت، نجات، نویدِ فتح', muwakkil: 'نوریائیل', planet: 'شمس', saat: 'اتوار عصر', dhikr: 'یا نور یا نافع یا نصیر', virtue: 'روشن ضمیری و نصرتِ غیبی', element: 'خاک', elementBg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  'س': { name: 'سین', meaning: 'سلام، سرور، تسخیر، ستر', muwakkil: 'سلسائیل', planet: 'مشتری', saat: 'جمعرات عصر', dhikr: 'یا سلام یا سمیع یا ستار', virtue: 'سلامتی از آفات و جلبِ خیر', element: 'باد', elementBg: 'bg-amber-50 text-amber-800 border-amber-200' },
  'ع': { name: 'عین', meaning: 'علم، عزت، عصمت، علو', muwakkil: 'عطائیل', planet: 'مریخ', saat: 'منگل چاشت', dhikr: 'یا علیم یا علی یا عظیم', virtue: 'کشفِ علوم و ہیبتِ ظاہری', element: 'آب', elementBg: 'bg-blue-50 text-blue-800 border-blue-200' },
  'ف': { name: 'فا', meaning: 'فتح، فضل، فردانیت، فرج', muwakkil: 'فرائیل', planet: 'زہرہ', saat: 'جمعہ بعد نماز', dhikr: 'یا فتاح یا فرد یا فاطر', virtue: 'فتحِ ابوابِ بستہ و کشائش', element: 'آتش', elementBg: 'bg-red-50 text-red-800 border-red-200' },
  'ص': { name: 'صاد', meaning: 'صبر، صدق، صمدیت، صفا', muwakkil: 'صمائیل', planet: 'عطارد', saat: 'بدھ عصر', dhikr: 'یا صبور یا صادق یا صمد', virtue: 'استقامت و تسکینِ اضطراب', element: 'خاک', elementBg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  'ق': { name: 'قاف', meaning: 'قدرت، قرب، قہر، قدوسیت', muwakkil: 'قندائیل', planet: 'قمر', saat: 'پیر بعد عصر', dhikr: 'یا قدیر یا قوی یا قہار', virtue: 'تسخیرِ اعادی و قوتِ باطنی', element: 'باد', elementBg: 'bg-amber-50 text-amber-800 border-amber-200' },
  'ر': { name: 'را', meaning: 'رحمت، رؤف، رفعت، رزق', muwakkil: 'روقیائیل', planet: 'زحل', saat: 'ہفتہ بعد عصر', dhikr: 'یا رحمن یا رحیم یا رؤف', virtue: 'جلبِ رحمت و شفقتِ خلائق', element: 'آب', elementBg: 'bg-blue-50 text-blue-800 border-blue-200' },
  'ش': { name: 'شین', meaning: 'شکر، شرف، شفاء، شہود', muwakkil: 'شمعائیل', planet: 'شمس', saat: 'اتوار قبل مغرب', dhikr: 'یا شکور یا شاہد یا شفیع', virtue: 'کثرتِ شکر و ترقیِ مراتب', element: 'آتش', elementBg: 'bg-red-50 text-red-800 border-red-200' },
  'ت': { name: 'تا', meaning: 'توبہ، تقویٰ، توکل، تائید', muwakkil: 'تنکائیل', planet: 'مشتری', saat: 'جمعرات مغرب', dhikr: 'یا تواب یا تام یا تکفل', virtue: 'قبولیتِ توبہ و توفیقِ عمل', element: 'خاک', elementBg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  'ث': { name: 'ثا', meaning: 'ثبات، ثواب، ثناء، ثروت', muwakkil: 'ثورائیل', planet: 'مریخ', saat: 'منگل بعد عصر', dhikr: 'یا ثابت یا ثاقب یا ثواب', virtue: 'استحکام و حصولِ ثروت', element: 'باد', elementBg: 'bg-amber-50 text-amber-800 border-amber-200' },
  'خ': { name: 'خا', meaning: 'خیر، خبیر، خوفِ خدا، خلود', muwakkil: 'خردائیل', planet: 'زہرہ', saat: 'جمعہ بعد مغرب', dhikr: 'یا خبیر یا خلاق یا خیر', virtue: 'اطلاع بر خفایا و کشفِ اسرار', element: 'باد', elementBg: 'bg-amber-50 text-amber-800 border-amber-200' },
  'ذ': { name: 'ذال', meaning: 'ذکر، ذکاوت، ذوالجلال', muwakkil: 'ذکیائیل', planet: 'عطارد', saat: 'بدھ بعد مغرب', dhikr: 'یا ذا الجلال یا ذا الطول', virtue: 'قوتِ حافظہ و نورِ عقل', element: 'آتش', elementBg: 'bg-red-50 text-red-800 border-red-200' },
  'ض': { name: 'ضاد', meaning: 'ضیاء، ضبط، ضمانت', muwakkil: 'ضغائیل', planet: 'قمر', saat: 'پیر بعد عشاء', dhikr: 'یا ضار یا نافع یا ضامن', virtue: 'روشن باطنی و غلبہ بر نفس', element: 'خاک', elementBg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  'ظ': { name: 'ظا', meaning: 'ظہور، ظفر، ظلِ الٰہی', muwakkil: 'ظہرائیل', planet: 'زحل', saat: 'ہفتہ بعد عشاء', dhikr: 'یا ظاہر یا ظافر یا عزیز', virtue: 'فتح و ظفر و کشفِ حقائق', element: 'خاک', elementBg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  'غ': { name: 'غین', meaning: 'غناء، غفران، غلبہ، غیرت', muwakkil: 'غوثائیل', planet: 'شمس', saat: 'اتوار بعد عشاء', dhikr: 'یا غنی یا غفور یا غیاث', virtue: 'بے نیازی و تونگریِ قلب', element: 'باد', elementBg: 'bg-amber-50 text-amber-800 border-amber-200' },
};

interface RozanaJaffriWerdStudioProps {
  onSendToTakseer?: (text: string) => void;
  onSendToTakseerAflatoon?: (text: string) => void;
  onSendToNaqsh?: (adad: number) => void;
}

export const RozanaJaffriWerdStudio: React.FC<RozanaJaffriWerdStudioProps> = ({
  onSendToTakseer,
  onSendToTakseerAflatoon,
  onSendToNaqsh,
}) => {
  const [inputText, setInputText] = useState<string>('محمد ساجد');
  const [selectedDay, setSelectedDay] = useState<string>(['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'][new Date().getDay()]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const cleanLetters = useMemo(() => {
    return (inputText || '').replace(/\s+/g, '').split('');
  }, [inputText]);

  const abjadResult = useMemo(() => {
    return calculateAbjad(inputText || '');
  }, [inputText]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Preset Auspicious Daily Prayers & Asma
  const dailyPresets = [
    { day: 'اتوار', planet: 'شمس', dhikr: 'یا اللہ یا حی یا قیوم', adad: 1030, focus: 'عزت، جاہ، تسخیرِ حکام و فتح' },
    { day: 'پیر', planet: 'قمر', dhikr: 'یا رحمن یا رحیم یا لطیف', adad: 658, focus: 'وسعتِ رزق، محبت، قلبی سکون' },
    { day: 'منگل', planet: 'مریخ', dhikr: 'یا قوی یا قادر یا عزیز یا جبار', adad: 648, focus: 'دفعِ اعداء، سحر، حفاظت و غلبہ' },
    { day: 'بدھ', planet: 'عطارد', dhikr: 'یا علیم یا خبیر یا حکیم یا ہادی', adad: 1114, focus: 'علم و حکمت، کشفِ اسرار و فصاحت' },
    { day: 'جمعرات', planet: 'مشتری', dhikr: 'یا فتاح یا رزاق یا غنی یا مغنی', adad: 2470, focus: 'کشادگیِ دولت، برکت و بلندیِ مراتب' },
    { day: 'جمعہ', planet: 'زہرہ', dhikr: 'یا ودود یا حبیب یا جامع یا نور', adad: 408, focus: 'عشق، محبت، الفتِ زوجین و قبولیت' },
    { day: 'ہفتہ', planet: 'زحل', dhikr: 'یا قدوس یا سلام یا مومن یا مہیمن', adad: 470, focus: 'حصارِ باطن، دفعِ شیاطین و ثبات' },
  ];

  return (
    <div className="space-y-6 font-urdu text-[#2c1e14]">
      {/* Top Banner Dedicated to Daily Jafr Wazifa & Harfi Breakdown */}
      <div className="rounded-2xl border-2 border-[#1e40af] bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#2563eb] text-white p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-6 w-6 text-amber-300" />
              <span className="rounded bg-white/20 px-2.5 py-0.5 text-xs font-bold text-amber-200 border border-white/30">
                مستند استخراجِ حروف و اعداد
              </span>
            </div>
            <h2 className="font-amiri text-2xl md:text-3xl font-bold tracking-tight">
              روزانہ کا جفری ورد، استخراجِ موکلات و تفکیکِ حروف
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-2xl leading-relaxed">
              کسی بھی نام یا مقصد کے حروف کی مفرد تفکیک، ان کے ملکوتی و حرفی موکلات، مناسب ساعت، مخصوص اذکار اور روزانہ کے وظائف کا مکمل استخراجی نظام۔
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onSendToTakseer?.(inputText)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-xs font-bold text-white transition-all cursor-pointer"
            >
              <Layers className="h-4 w-4" />
              <span>علمِ تکسیر میں بھیجیں</span>
            </button>
            <button
              onClick={() => onSendToTakseerAflatoon?.(inputText)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>تکسیرِ افلاطون</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Calculation & Input Card */}
      <div className="rounded-2xl border-2 border-[#d4a373] bg-[#faedcd]/40 p-5 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-bold text-[#5d4037]">
              نام، اسمِ اعظم یا مقصد درج کریں:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="مثلاً: محمد ساجد، یا ودود، یا فتاح..."
                className="flex-1 rounded-xl border-2 border-[#d4a373] bg-white px-4 py-3 text-lg font-amiri text-[#2c1e14] focus:outline-none focus:border-[#1e40af] shadow-inner"
              />
              <button
                onClick={() => setInputText('محمد ساجد')}
                className="px-4 py-2 rounded-xl bg-white border border-[#d4a373] text-xs font-bold text-[#7f5539] hover:bg-[#faedcd] transition-all cursor-pointer"
              >
                نمونہ نام
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#5d4037]">
              دن منتخب کریں (ساعت و ورد):
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full rounded-xl border-2 border-[#d4a373] bg-white px-3 py-3 text-sm font-bold text-[#2c1e14] focus:outline-none focus:border-[#1e40af]"
            >
              {dailyPresets.map((p) => (
                <option key={p.day} value={p.day}>
                  {p.day} (کوکب: {p.planet})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Calculation Stats Strip */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl bg-white p-3 border border-[#d4a373] text-center shadow-xs">
            <span className="text-[11px] font-bold text-gray-500">مجموعی اعدادِ ابجد کبیر</span>
            <div className="font-amiri text-2xl font-bold text-[#1e40af]">{abjadResult.totalKabir}</div>
          </div>
          <div className="rounded-xl bg-white p-3 border border-[#d4a373] text-center shadow-xs">
            <span className="text-[11px] font-bold text-gray-500">تعدادِ حروف</span>
            <div className="font-amiri text-2xl font-bold text-[#5d4037]">{cleanLetters.length}</div>
          </div>
          <div className="rounded-xl bg-white p-3 border border-[#d4a373] text-center shadow-xs">
            <span className="text-[11px] font-bold text-gray-500">موکلِ علوی</span>
            <div className="font-amiri text-base font-bold text-emerald-800">{abjadResult.ulwiMuwakkil}</div>
          </div>
          <div className="rounded-xl bg-white p-3 border border-[#d4a373] text-center shadow-xs">
            <span className="text-[11px] font-bold text-gray-500">موکلِ سفلی</span>
            <div className="font-amiri text-base font-bold text-red-800">{abjadResult.sifliAwan}</div>
          </div>
        </div>
      </div>

      {/* Individual Harf Breakdown Cards (حرف بحرف تفکیک مع خصوصیات) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-amiri text-xl font-bold text-[#5d4037] flex items-center gap-2">
            <Layers className="h-5 w-5 text-[#bc6c25]" />
            <span>حرف بحرف تفکیک، موکلات، مناسب ساعت و روحانی تاثیرات</span>
          </h3>
          <span className="text-xs text-gray-600 font-bold">
            کل حروف: {cleanLetters.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cleanLetters.map((char, idx) => {
            const info = HARFI_SPIRITUAL_ATTRIBUTES[char] || {
              name: char,
              meaning: 'علم و حکمت',
              muwakkil: 'اسرافیل',
              planet: 'شمس',
              saat: 'اتوار طلوع',
              dhikr: 'یا اللہ یا رحمن',
              virtue: 'حصولِ برکت و حفاظت',
              element: 'آتش',
              elementBg: 'bg-gray-50 text-gray-800 border-gray-200'
            };

            return (
              <div
                key={`${char}-${idx}`}
                className="rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="flex items-start justify-between border-b border-gray-100 pb-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-[#1e40af] to-[#3b82f6] text-2xl font-amiri font-bold text-white shadow-sm">
                      {char}
                    </div>
                    <div>
                      <h4 className="font-amiri text-lg font-bold text-[#1e3a8a]">
                        حرف {info.name} (عدد: {calculateAbjad(char).totalKabir})
                      </h4>
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${info.elementBg}`}>
                        عنصر: {info.element} • کوکب: {info.planet}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    #{idx + 1}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-gray-700 font-urdu leading-relaxed">
                  <div className="bg-blue-50/60 p-2 rounded-xl border border-blue-100">
                    <span className="font-bold text-[#1e40af]">موکلِ حرفی: </span>
                    <span className="font-amiri text-sm font-bold text-gray-900">{info.muwakkil}</span>
                  </div>

                  <div className="bg-amber-50/60 p-2 rounded-xl border border-amber-100">
                    <span className="font-bold text-amber-900">مبارک ساعت: </span>
                    <span>{info.saat}</span>
                  </div>

                  <div className="bg-emerald-50/60 p-2 rounded-xl border border-emerald-100">
                    <span className="font-bold text-emerald-900">مخصوص ذکر: </span>
                    <span className="font-amiri text-sm font-bold text-emerald-900">{info.dhikr}</span>
                  </div>

                  <div className="bg-purple-50/60 p-2 rounded-xl border border-purple-100">
                    <span className="font-bold text-purple-900">خاصیت و تاثیر: </span>
                    <span>{info.virtue}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(`${char}: موکل ${info.muwakkil} - ذکر: ${info.dhikr} (${info.virtue})`, `char-${idx}`)}
                  className="mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700 transition-colors"
                >
                  {copiedId === `char-${idx}` ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700">کاپی ہو گیا!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-gray-500" />
                      <span>تفصیل کاپی کریں</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Routine & Wazifa Generator */}
      <div className="rounded-2xl border-2 border-[#1e40af] bg-white p-6 shadow-md">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-amber-500" />
            <h3 className="font-amiri text-xl font-bold text-[#1e3a8a]">
              منتخب دن کا جفری معمول و ورد: {selectedDay}
            </h3>
          </div>
          <span className="text-xs font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
            روزانہ کے وظائف
          </span>
        </div>

        {(() => {
          const preset = dailyPresets.find((p) => p.day === selectedDay) || dailyPresets[0];
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 bg-[#eff6ff] p-4 rounded-2xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1e40af]">اسمائے حسنیٰ و ذکر:</span>
                  <span className="text-xs font-bold text-blue-700">تعداد: {preset.adad} مرتبہ</span>
                </div>
                <div className="text-center py-3 bg-white rounded-xl border border-blue-200 shadow-xs font-amiri text-2xl font-bold text-[#1e3a8a]">
                  {preset.dhikr}
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  <strong className="text-[#1e40af]">اہم مقصد و فضیلت: </strong>
                  {preset.focus}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-blue-200">
                  <span>حاکم کوکب: <strong>{preset.planet}</strong></span>
                  <span>افضل وقت: <strong>طلوعِ آفتاب و بعد نمازِ فجر</strong></span>
                </div>
              </div>

              <div className="space-y-3 bg-[#fefce8] p-4 rounded-2xl border border-amber-200">
                <h4 className="font-amiri text-lg font-bold text-amber-900 flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-amber-700" />
                  <span>طریقۂ عمل و حصارِ یومیہ</span>
                </h4>
                <ul className="text-xs text-gray-800 space-y-2 list-disc list-inside leading-relaxed font-urdu">
                  <li>اول و آخر 11 مرتبہ درود ابراہیمی پڑھیں۔</li>
                  <li>مطلوبہ اسم کا ورد اوپر دی گئی تعداد یا اپنے نام کے اعداد کے مطابق کریں۔</li>
                  <li>پڑھائی کے بعد چاروں قل اور آیۃ الکرسی پڑھ کر اپنے اوپر دم کریں اور حصار کھینچیں۔</li>
                  <li>اگر نقش بنانا ہو تو اسی دن کی سعد ساعت میں زعفران و عرقِ گلاب سے تحریر کریں۔</li>
                </ul>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onSendToNaqsh?.(preset.adad)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    <span>اس ذکر کا نقش بنائیں ({preset.adad})</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
