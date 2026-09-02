import React, { useState, useMemo } from 'react';
import { 
  HeartPulse, 
  Sparkles, 
  Copy, 
  Check, 
  Flame, 
  Mountain, 
  Wind, 
  Droplets, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  Activity, 
  Calendar, 
  Clock, 
  Compass, 
  BookOpen, 
  Layers, 
  ArrowRight, 
  RotateCcw, 
  Send, 
  CheckCheck,
  Printer,
  ChevronDown,
  Info,
  Stethoscope,
  Smile,
  Frown,
  Brain,
  Pill,
  Sun,
  Moon
} from 'lucide-react';
import { 
  sanitizeArabicJafrText, 
  ARABIC_NORMALIZATION_MAP,
  numberToArabicJafrLetters 
} from '../data/abjadArabiData';

// Standard Arabic Abjad values (Mashriqi)
const ARABIC_MASHRIQI_MAP: Record<string, number> = {
  'ا': 1, 'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'ہ': 5, 'و': 6, 'ز': 7, 'ح': 8, 'ط': 9,
  'ی': 10, 'ي': 10, 'ك': 20, 'ک': 20, 'ل': 30, 'م': 40, 'ن': 50, 'س': 60, 'ع': 70,
  'ف': 80, 'ص': 90, 'ق': 100, 'ر': 200, 'ش': 300, 'ت': 400, 'ث': 500, 'خ': 600,
  'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000
};

// Maghribi Arabic Abjad
const ARABIC_MAGHRIBI_MAP: Record<string, number> = {
  'ا': 1, 'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'ہ': 5, 'و': 6, 'ز': 7, 'ح': 8, 'ط': 9,
  'ی': 10, 'ي': 10, 'ك': 20, 'ک': 20, 'ل': 30, 'م': 40, 'ن': 50, 'ص': 60, 'ع': 70,
  'ف': 80, 'ض': 90, 'ق': 100, 'ر': 200, 'س': 300, 'ت': 400, 'ث': 500, 'خ': 600,
  'ذ': 700, 'ظ': 800, 'غ': 900, 'ش': 1000
};

// Indo-Pak Urdu/Persian Abjad (with distinct compound & Urdu letters)
const INDO_PAK_ABJAD_MAP: Record<string, { adad: number; baseArabic: string; note: string }> = {
  'ا': { adad: 1, baseArabic: 'الف', note: 'اصل حرف' },
  'آ': { adad: 1, baseArabic: 'الف', note: 'بحساب الف' },
  'أ': { adad: 1, baseArabic: 'الف', note: 'بحساب الف' },
  'إ': { adad: 1, baseArabic: 'الف', note: 'بحساب الف' },
  'ء': { adad: 1, baseArabic: 'الف', note: 'بحساب الف (ہمزہ مفرد)' },
  'ب': { adad: 2, baseArabic: 'بے', note: 'اصل حرف' },
  'پ': { adad: 2, baseArabic: 'بے', note: 'فارسی/اردو حرف (بحساب ب)' },
  'ت': { adad: 400, baseArabic: 'تے', note: 'اصل حرف' },
  'ٹ': { adad: 400, baseArabic: 'تے', note: 'اردو مفرسہ (بحساب ت)' },
  'ة': { adad: 400, baseArabic: 'تے', note: 'تائے مربوطہ (۴۰۰ بحساب ت یا ۵ بحساب ہ)' },
  'ۃ': { adad: 400, baseArabic: 'تے', note: 'تائے مربوطہ (۴۰۰)' },
  'ث': { adad: 500, baseArabic: 'ثے', note: 'اصل حرف' },
  'ج': { adad: 3, baseArabic: 'جیم', note: 'اصل حرف' },
  'چ': { adad: 3, baseArabic: 'جیم', note: 'فارسی/اردو حرف (بحساب ج)' },
  'ح': { adad: 8, baseArabic: 'حائے', note: 'اصل حرف' },
  'خ': { adad: 600, baseArabic: 'خائے', note: 'اصل حرف' },
  'د': { adad: 4, baseArabic: 'دال', note: 'اصل حرف' },
  'ڈ': { adad: 4, baseArabic: 'دال', note: 'اردو مفرسہ (بحساب د)' },
  'ذ': { adad: 700, baseArabic: 'ذال', note: 'اصل حرف' },
  'ر': { adad: 200, baseArabic: 'رے', note: 'اصل حرف' },
  'ڑ': { adad: 200, baseArabic: 'رے', note: 'اردو مفرسہ (بحساب ر)' },
  'ز': { adad: 7, baseArabic: 'زے', note: 'اصل حرف' },
  'ژ': { adad: 7, baseArabic: 'زے', note: 'فارسی حرف (بحساب ز)' },
  'س': { adad: 60, baseArabic: 'سین', note: 'اصل حرف' },
  'ش': { adad: 300, baseArabic: 'شین', note: 'اصل حرف' },
  'ص': { adad: 90, baseArabic: 'صاد', note: 'اصل حرف' },
  'ض': { adad: 800, baseArabic: 'ضاد', note: 'اصل حرف' },
  'ط': { adad: 9, baseArabic: 'طوئے', note: 'اصل حرف' },
  'ظ': { adad: 900, baseArabic: 'ظوئے', note: 'اصل حرف' },
  'ع': { adad: 70, baseArabic: 'عین', note: 'اصل حرف' },
  'غ': { adad: 1000, baseArabic: 'غین', note: 'اصل حرف' },
  'ف': { adad: 80, baseArabic: 'فے', note: 'اصل حرف' },
  'ق': { adad: 100, baseArabic: 'قاف', note: 'اصل حرف' },
  'ک': { adad: 20, baseArabic: 'کاف', note: 'اصل حرف' },
  'ك': { adad: 20, baseArabic: 'کاف', note: 'اصل حرف' },
  'گ': { adad: 20, baseArabic: 'کاف', note: 'فارسی/اردو حرف (بحساب ک)' },
  'ل': { adad: 30, baseArabic: 'لام', note: 'اصل حرف' },
  'م': { adad: 40, baseArabic: 'میم', note: 'اصل حرف' },
  'ن': { adad: 50, baseArabic: 'نون', note: 'اصل حرف' },
  'ں': { adad: 50, baseArabic: 'نون', note: 'نون غنہ (بحساب ن)' },
  'و': { adad: 6, baseArabic: 'واؤ', note: 'اصل حرف' },
  'ؤ': { adad: 6, baseArabic: 'واؤ', note: 'بحساب واؤ' },
  'ہ': { adad: 5, baseArabic: 'ہائے', note: 'اصل حرف' },
  'ه': { adad: 5, baseArabic: 'ہائے', note: 'اصل حرف' },
  'ھ': { adad: 5, baseArabic: 'ہائے', note: 'دو چشمی ہے (بحساب ہ)' },
  'ی': { adad: 10, baseArabic: 'یائے', note: 'اصل حرف' },
  'ي': { adad: 10, baseArabic: 'یائے', note: 'اصل حرف' },
  'ئ': { adad: 10, baseArabic: 'یائے', note: 'بحساب ی' },
  'ے': { adad: 10, baseArabic: 'یائے', note: 'بڑی ئے (بحساب ی)' }
};

interface AbjadDiagnosisStudioProps {
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
  onSendToIstikhara?: (text: string) => void;
}

export const AbjadDiagnosisStudio: React.FC<AbjadDiagnosisStudioProps> = ({
  onSendToNaqsh,
  onSendToTakseer,
  onSendToIstikhara
}) => {
  // Mode: Full Phrase or Patient Name + Mother Name
  const [inputMode, setInputMode] = useState<'name-mother' | 'full-phrase'>('name-mother');
  const [patientName, setPatientName] = useState<string>('محمد');
  const [motherName, setMotherName] = useState<string>('آمنہ');
  const [fullPhrase, setFullPhrase] = useState<string>('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ');
  const [selectedTaMarboota, setSelectedTaMarboota] = useState<'400' | '5'>('400'); // 400 (Taa) or 5 (Haa)

  // Active sub tab inside diagnosis
  const [activeDiagTab, setActiveDiagTab] = useState<'all' | 'nature-4' | 'illness-3' | 'planet-7' | 'zodiac-12' | 'outcome-6' | 'remedy'>('all');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Pre-set diagnosis sample queries
  const samplePresets = [
    { label: 'محمد بن آمنہ (شفائے کامل)', p: 'محمد', m: 'آمنہ', phrase: 'محمد آمنہ' },
    { label: 'احمد بن فاطمہ (سائلِ شفا)', p: 'احمد', m: 'فاطمہ', phrase: 'احمد فاطمہ' },
    { label: 'علی بن مریم (طلبِ عافیت)', p: 'علی', m: 'مریم', phrase: 'علی مریم' },
    { label: 'زید بن حوا (تشخیصِ سحر)', p: 'زید', m: 'حوا', phrase: 'زید حوا' },
    { label: 'یا شافی الامراض و عافنی', p: '', m: '', phrase: 'یا شافی الامراض و عافنی' },
    { label: 'آیۃ الشفاء الشریفة', p: '', m: '', phrase: 'وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ' }
  ];

  const handleApplyPreset = (p: string, m: string, phr: string) => {
    if (p && m) {
      setInputMode('name-mother');
      setPatientName(p);
      setMotherName(m);
    } else {
      setInputMode('full-phrase');
      setFullPhrase(phr);
    }
  };

  // Primary text to analyze
  const activeInputText = useMemo(() => {
    if (inputMode === 'name-mother') {
      return `${patientName.trim()} ${motherName.trim()}`.trim();
    }
    return fullPhrase.trim();
  }, [inputMode, patientName, motherName, fullPhrase]);

  // Calculations
  const analysis = useMemo(() => {
    const raw = activeInputText;
    const sanitized = sanitizeArabicJafrText(raw);
    const chars = Array.from(sanitized);

    let adadArabicMashriqi = 0;
    let adadArabicMaghribi = 0;
    let adadIndoPak = 0;

    const letterBreakdown: Array<{
      char: string;
      arabicMashriqi: number;
      arabicMaghribi: number;
      indoPak: number;
      note: string;
      isUrduSpecific: boolean;
    }> = [];

    chars.forEach((char) => {
      const norm = ARABIC_NORMALIZATION_MAP[char] || char;
      const mash = ARABIC_MASHRIQI_MAP[norm] || ARABIC_MASHRIQI_MAP[char] || 0;
      const magh = ARABIC_MAGHRIBI_MAP[norm] || ARABIC_MAGHRIBI_MAP[char] || 0;
      
      let pak = 0;
      let note = 'حرف معیاری';
      let isUrdu = false;

      if (INDO_PAK_ABJAD_MAP[char]) {
        pak = INDO_PAK_ABJAD_MAP[char].adad;
        note = INDO_PAK_ABJAD_MAP[char].note;
        if (['پ', 'ٹ', 'چ', 'ڈ', 'ڑ', 'ژ', 'گ', 'ں', 'ے', 'ھ'].includes(char)) {
          isUrdu = true;
        }
      } else if (INDO_PAK_ABJAD_MAP[norm]) {
        pak = INDO_PAK_ABJAD_MAP[norm].adad;
        note = INDO_PAK_ABJAD_MAP[norm].note;
      } else {
        pak = mash;
      }

      // Handle Taa Marboota preference
      if (char === 'ة' || char === 'ۃ') {
        if (selectedTaMarboota === '5') {
          pak = 5;
          note = 'تائے مربوطہ بحساب ہ (۵)';
        }
      }

      adadArabicMashriqi += mash;
      adadArabicMaghribi += magh;
      adadIndoPak += pak;

      letterBreakdown.push({
        char,
        arabicMashriqi: mash,
        arabicMaghribi: magh,
        indoPak: pak,
        note,
        isUrduSpecific: isUrdu
      });
    });

    const primaryTotal = adadIndoPak || adadArabicMashriqi || 1;

    // --- FORMULA 1: DIVISION BY 4 (عناصر و طبائع اربعہ) ---
    // Remainder 1: Fire, 2: Earth, 3: Air, 4/0: Water
    const rem4Raw = primaryTotal % 4;
    const rem4 = rem4Raw === 0 ? 4 : rem4Raw;

    const natureInfo = {
      1: {
        nature: 'آتشی طبع (غلبۂ صفراء و حرارت)',
        icon: 'flame',
        color: 'text-red-700 bg-red-50 border-red-300',
        badgeColor: 'bg-red-700 text-white',
        summary: 'غلبۂ صفراء، تپ، جلن، سوزش، ہائی بلڈ پریشر، نظرِ بد کی تپش یا ناری اثرات۔',
        symptoms: [
          'سر میں شدید درد، آنکھوں میں جلن و سرخی',
          'طبیعت میں غصہ، بے چینی اور پیاس کی شدت',
          'جسم میں گرمی کی لہریں، جلد پر خارش یا سوزش',
          'نظرِ بد کے باعث اچانک بخار اور کاموں میں رکاوٹ'
        ],
        spiritualCause: 'نظرِ بد (حاسدانہ نگاہ) یا ناری شیاطین کا اثر جو جسم میں حرارت اور بے سکونی پیدا کرتا ہے۔',
        medicalCause: 'صفراوی خلط کا غلبہ، جگر کی حدت یا سوزشی کیفیت۔'
      },
      2: {
        nature: 'خاکی طبع (غلبۂ سوداء و خشکی)',
        icon: 'mountain',
        color: 'text-amber-900 bg-amber-50 border-amber-300',
        badgeColor: 'bg-amber-900 text-white',
        summary: 'غلبۂ سوداء، ہڈیوں و جوڑوں کا درد، پرانا سحرِ مدفون، شدید بندش، اداسی و سستی۔',
        symptoms: [
          'جسم و ہڈیوں میں شدید بوجھ اور کھچاؤ',
          'تنہائی پسندی، مایوسی، اندیشے اور نیند میں کمی',
          'رزق اور صحت کے اسباب کا اچانک رک جانا',
          'سحرِ مدفون (زمین یا قبرستان میں دبائے گئے اثرات) کی علامات'
        ],
        spiritualCause: 'سحرِ مدفون یا مٹی پر کیا گیا کالا جادو اور خاکی ارواحِ خبیثہ کا حصار۔',
        medicalCause: 'سوداوی خلط کی زیادتی، خشکی، بدہضمی اور اعصابی کمزوری۔'
      },
      3: {
        nature: 'بادی طبع (غلبۂ ریاح و ہوائی اثرات)',
        icon: 'wind',
        color: 'text-yellow-800 bg-yellow-50 border-yellow-300',
        badgeColor: 'bg-yellow-800 text-white',
        summary: 'غلبۂ ریاح، خفقان، دل کی دھڑکن تیز ہونا، گیس، آسیبِ ہوائی اور غیر مستحکم حالت۔',
        symptoms: [
          'دل کی دھڑکن بے ترتیب ہونا، گھبراہٹ اور دم گھٹنا',
          'بدن میں گیس، ریاحی دردیں جو ایک جگہ سے دوسری جگہ منتقل ہوں',
          'وہمی خیالات، کانوں میں آوازیں یا سائے محسوس ہونا',
          'ہوائی جنات یا سحرِ معلق (درخت یا ہوا میں لٹکایا گیا تعویذ)'
        ],
        spiritualCause: 'سحرِ معلق یا ہوائی آسیب کا گذر جو انسان کے خیال اور دل کو لرزا دیتا ہے۔',
        medicalCause: 'ریاحی امراض، گیس، تبخیرِ معدہ اور خفقانِ قلب۔'
      },
      4: {
        nature: 'آبی طبع (غلبۂ بلغم و رطوبت)',
        icon: 'droplet',
        color: 'text-blue-900 bg-blue-50 border-blue-300',
        badgeColor: 'bg-blue-900 text-white',
        summary: 'غلبۂ بلغم، سستی، سحرِ ماکول و مشروب (کھلایا پلایا گیا سحر) یا سحرِ مائی۔',
        symptoms: [
          'معدہ میں گرانی، متلی، بھوک کا اڑ جانا یا بدہضمی',
          'جسم کا ہر وقت ٹھنڈا اور بھاری رہنا، گہری غنودگی',
          'سحرِ ماکول (کھلائے گئے جادو) کے باعث پیٹ اور ناف کے گرد اینٹھن',
          'سحرِ جاری (بہتے پانی میں بہایا گیا طلسم)'
        ],
        spiritualCause: 'سحرِ ماکول/مشروب جو خوراک کے ذریعے پیٹ میں داخل کیا گیا ہو۔',
        medicalCause: 'بلغمی غلبہ، گردوں یا مثانہ کی خرابی اور ہاضمے کی کمزوری۔'
      }
    }[rem4];

    // --- FORMULA 2: DIVISION BY 3 (اصلِ مرض: روحانی، جسمانی، یا نفسیاتی/وہمی) ---
    // Remainder 1: Spiritual, 2: Physical, 3/0: Psychological/Delusion
    const rem3Raw = primaryTotal % 3;
    const rem3 = rem3Raw === 0 ? 3 : rem3Raw;

    const illnessTypeInfo = {
      1: {
        type: 'مرضِ روحانی (Spiritual / Occult Disorder)',
        status: 'روحانی اثرات غالب ہیں',
        badgeColor: 'bg-purple-900 text-white',
        boxBg: 'bg-purple-50/80 border-purple-300',
        textColor: 'text-purple-950',
        icon: 'sparkles',
        diagnosisText: 'اس حساب کی رو سے بیماری کی جڑ ماورائی اور روحانی ہے (سحر، کالا جادو، آسیب، نظرِ بد یا ہمزاد کا بگاڑ)۔ ادویات سے وقتی یا نا مکمل فائدہ ہوتا ہے، اور میڈیکل رپورٹیں اکثر کلیئر آتی ہیں لیکن مریض بدستور صاحبِ فراش رہتا ہے۔',
        primaryAction: 'روحانی کاٹ، آیاتِ ابطالِ سحر، معوذتین کا دم، شفا کا نقش اور مخصوص صدقہ فوری لازم ہے۔'
      },
      2: {
        type: 'مرضِ جسمانی (Physical / Medical Condition)',
        status: 'طبی و حیاتیاتی عارضہ ہے',
        badgeColor: 'bg-emerald-800 text-white',
        boxBg: 'bg-emerald-50/80 border-emerald-300',
        textColor: 'text-emerald-950',
        icon: 'stethoscope',
        diagnosisText: 'اس حساب کے مطابق سائل کو کوئی سحر یا شیطانی اثر نہیں ہے، بلکہ یہ خالص جسمانی، عضویاتی، خلطی یا غذائی خرابی ہے۔ لہٰذا سائل کو چاہیے کہ مستند معالج یا ڈاکٹر سے رجوع کرے اور ادویات باقاعدگی سے استعمال کرے۔',
        primaryAction: 'طبی علاج اولین ترجیح ہے۔ ساتھ میں برکت و شفاء کے لیے سورۃ الفاتحہ اور اسمائے حسنیٰ کا دم کریں۔'
      },
      3: {
        type: 'مرضِ نفسیاتی و وہمی (Psychological / Stress / Waswas)',
        status: 'ذہنی دباؤ و شیطانی وسوسہ',
        badgeColor: 'bg-blue-800 text-white',
        boxBg: 'bg-blue-50/80 border-blue-300',
        textColor: 'text-blue-950',
        icon: 'brain',
        diagnosisText: 'اس حساب سے ظاہر ہوتا ہے کہ مرض کی حقیقت نہ تو کالا جادو ہے اور نہ ہی کوئی خطرناک جسمانی بیماری، بلکہ تفکرات، ذہنی دباؤ، خوف، وسوسہ اور وہم کی زیادتی ہے۔ مریض کو حوصلہ، ماحول کی تبدیلی اور ذکرِ الٰہی کی ضرورت ہے۔',
        primaryAction: 'تسکینِ قلب کے اذکار، سورۃ الانشراح، استعاذہ، مثبت صحبت اور تفکرات سے پرہیز کریں۔'
      }
    }[rem3];

    // --- FORMULA 3: DIVISION BY 7 (کواکبِ سبعہ، دن اور ساعات) ---
    // Remainder 1..7 (0 = 7)
    const rem7Raw = primaryTotal % 7;
    const rem7 = rem7Raw === 0 ? 7 : rem7Raw;

    const planetInfo = {
      1: {
        planet: 'الشمس (سورج)',
        day: 'اتوار (یکشنبہ)',
        saat: 'ساعتِ شمس (طلوعِ آفتاب کا اول وقت)',
        element: 'آتشی',
        sadaqah: 'سرخ گوشت، گندم یا سونے/تانبے کے سکے کا صدقہ',
        wazifa: 'يَا حَيُّ يَا قَيُّومُ يَا نُورُ يَا بَاسِطُ (۳۳۶ مرتبہ)'
      },
      2: {
        planet: 'القمر (چاند)',
        day: 'پیر (دوشنبہ)',
        saat: 'ساعتِ قمر (اول شب یا فجر کے بعد)',
        element: 'آبی',
        sadaqah: 'دودھ، چاول، چاندی یا سفید مٹھائی کا صدقہ',
        wazifa: 'يَا رَحْمَٰنُ يَا رَحِيمُ يَا سَلَامُ (۲۹۸ مرتبہ)'
      },
      3: {
        planet: 'المریخ (منگل)',
        day: 'منگل (سہ شنبہ)',
        saat: 'ساعتِ مریخ (قہر و دفاع)',
        element: 'ناری جلالی',
        sadaqah: 'سرخ مسور کی دال یا مرغ کا گوشت کا صدقہ',
        wazifa: 'يَا قَهَّارُ يَا جَبَّارُ يَا مُمِيتُ (۳۰۶ مرتبہ)'
      },
      4: {
        planet: 'العطارد (بدھ)',
        day: 'بدھ (چہار شنبہ)',
        saat: 'ساعتِ عطارد (عقل و کتابت)',
        element: 'ہوائی',
        sadaqah: 'سبز مونگ کی دال، پرندوں کو دانا یا قلم و کاپی',
        wazifa: 'يَا عَلِيمُ يَا حَكِيمُ يَا خَبِيرُ (۱۵۰ مرتبہ)'
      },
      5: {
        planet: 'المشتری (جمعرات)',
        day: 'جمعرات (پنجشنبہ)',
        saat: 'ساعتِ مشتری (سعد اکبر و برکت)',
        element: 'آتشی سعد',
        sadaqah: 'چنے کی دال، زرد شے یا میٹھے چاول کا صدقہ',
        wazifa: 'يَا وَهَّابُ يَا رَزَّاقُ يَا فَتَّاحُ (۳۰۸ مرتبہ)'
      },
      6: {
        planet: 'الزہرہ (جمعہ)',
        day: 'جمعہ (آدینہ)',
        saat: 'ساعتِ زہرہ (جمال و الفت)',
        element: 'مائی سعد',
        sadaqah: 'عطر، سفید شکر یا کپڑے کا صدقہ',
        wazifa: 'يَا لَطِيفُ يَا وَدُودُ يَا جَمِيلُ (۱۲۹ مرتبہ)'
      },
      7: {
        planet: 'زحل (ہفتہ)',
        day: 'ہفتہ (شنبہ)',
        saat: 'ساعتِ زحل (نحس اکبر و پرانے اثرات)',
        element: 'خاکی',
        sadaqah: 'کالی ماش کی دال، سرسوں کا تیل یا کالا کپڑا',
        wazifa: 'يَا مَانِعُ يَا دَافِعُ يَا حَفِيظُ (۱۶۱ مرتبہ)'
      }
    }[rem7];

    // --- FORMULA 4: DIVISION BY 12 (بروجِ اثناعشر و طالعِ مرض و اعضاء) ---
    // Remainder 1..12 (0 = 12)
    const rem12Raw = primaryTotal % 12;
    const rem12 = rem12Raw === 0 ? 12 : rem12Raw;

    const zodiacHouses = {
      1: { burj: 'برج حمل (Aries)', body: 'سر، چہرہ، آنکھیں و دماغ', desc: 'حرارت، سر کا درد، نیند کی کمی اور ذہنی تناؤ۔' },
      2: { burj: 'برج ثور (Taurus)', body: 'گلا، گردن، آواز و غدود', desc: 'حلق کے امراض، غدود کی سوزش اور ٹانسلز۔' },
      3: { burj: 'برج جوزاء (Gemini)', body: 'کندھے، بازو، پھیپھڑے و سانس', desc: 'سانس کی تنگی، بازوؤں میں درد اور اعصابی لرزہ۔' },
      4: { burj: 'برج سرطان (Cancer)', body: 'سینہ، معدہ، ہاضمہ و پسلیاں', desc: 'معدے کی جلن، الٹی، گیس اور پسلیوں کا درد۔' },
      5: { burj: 'برج اسد (Leo)', body: 'دل، ریڑھ کی ہڈی و پشت', desc: 'دل کی دھڑکن کی تیزی، پشت اور مہروں کا بوجھ۔' },
      6: { burj: 'برج سنبلہ (Virgo)', body: 'پیٹ، چھوٹی و بڑی آنتیں', desc: 'پیٹ کے مروڑ، قولنج اور ہاضمے کی خرابی۔' },
      7: { burj: 'برج میزان (Libra)', body: 'گردے، کمر کا نچلا حصہ و مثانہ', desc: 'گردوں کا درد، پیشاب میں جلن اور کمر کا کھچاؤ۔' },
      8: { burj: 'برج عقرب (Scorpio)', body: 'مثانہ، پوشیدہ اعضاء و مقعد', desc: 'پوشیدہ امراض، بواسیر اور مقعد کے مسائل۔' },
      9: { burj: 'برج قوس (Sagittarius)', body: 'رانیں، کولہے و عرق النساء', desc: 'رانوں کا کھچاؤ، عرق النساء اور چلنے میں دشواری۔' },
      10: { burj: 'برج جدی (Capricorn)', body: 'گھٹنے، ہڈیاں و جوڑ', desc: 'جوڑوں کا درد، یورک ایسڈ اور ہڈیوں کی خشکی۔' },
      11: { burj: 'برج دلو (Aquarius)', body: 'پنڈلیاں، ٹخنے و دورانِ خون', desc: 'ٹانگوں میں درد، پیروں کی سوجن اور اینٹھن۔' },
      12: { burj: 'برج حوت (Pisces)', body: 'پاؤں، تلوے، اعصاب و بلغم', desc: 'تلووں میں جلن، پاؤں کا سن ہونا اور نزلاتی رطوبت۔' }
    }[rem12];

    // --- FORMULA 5: DIVISION BY 6 (عاقبت و انجامِ مرض و مدتِ شفا) ---
    // Remainder 1..6 (0 = 6)
    const rem6Raw = primaryTotal % 6;
    const rem6 = rem6Raw === 0 ? 6 : rem6Raw;

    const outcomeInfo = {
      1: {
        outcome: 'شفائے عاجلہ و کاملہ (Quick & Complete Recovery)',
        statusBadge: 'جلد صحت یابی کی نوید ہے',
        badgeColor: 'bg-emerald-700 text-white',
        desc: 'مرض عارضی ہے، معمولی دعا، دوا اور صدقے سے مریض بہت جلد بسترِ علالت سے اٹھ کھڑا ہوگا اور عافیت پائے گا۔'
      },
      2: {
        outcome: 'شفاء بتدریج (Gradual Recovery with Care)',
        statusBadge: 'آہستہ آہستہ افاقہ ہوگا',
        badgeColor: 'bg-blue-700 text-white',
        desc: 'صحت یابی میں کچھ وقت لگے گا۔ پرہیز، ادویات کا تسلسل اور روزانہ سورۃ الفاتحہ کا دم لازمی جاری رکھیں۔'
      },
      3: {
        outcome: 'ردِ اثرات و کاٹ ضروری (Requires Active Spiritual Cleansing)',
        statusBadge: 'سحر/اثرات کی کاٹ فوری لازم',
        badgeColor: 'bg-red-800 text-white',
        desc: 'اگر فوری روحانی کاٹ اور آیاتِ ابطالِ سحر کا عمل نہ کیا گیا تو مرض کے طویل ہونے کا خدشہ ہے۔ سستی نہ کریں۔'
      },
      4: {
        outcome: 'علاجِ امتزاجی (Combined Medicine & Prayer)',
        statusBadge: 'دوا اور دعا کا امتزاج ناگزیر',
        badgeColor: 'bg-indigo-800 text-white',
        desc: 'صرف تعویذ یا صرف دوا کافی نہیں ہوگی؛ دونوں کو یکجا کرنا ہوگا تب جا کر مرض کی جڑ ختم ہوگی۔'
      },
      5: {
        outcome: 'محتاجِ صدقہ و استغفار (Relief Through Charity & Repentance)',
        statusBadge: 'صدقہ بلائیں ٹالے گا',
        badgeColor: 'bg-amber-800 text-white',
        desc: 'مریض کے نام پر بروقت صدقہ نکالیں اور کثرت سے `أَسْتَغْفِرُ اللَّهَ` پڑھیں، بندش اور بیماری کے گرہیں کھلیں گی۔'
      },
      6: {
        outcome: 'حفاظت، حصار و صبر (Patience & Strong Protection Needed)',
        statusBadge: 'مستقل حصار اور صبر درکار',
        badgeColor: 'bg-stone-800 text-white',
        desc: 'پرانا عارضہ ہے جس کے خاتمے کے لیے مستقل مزاجی سے سورۃ یٰسین و آیۃ الکرسی کا حصار اور حفاظت درکار ہے۔'
      }
    }[rem6];

    // Prescribed Healing Protocol (علاج و نسخۂ شفا)
    const remedy = {
      quranicVerses: [
        { title: 'آیاتِ شفا کی تلاوت', text: 'وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ ۞ وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ', count: 'روزانہ ۴۱ مرتبہ پانی پر دم کر کے پلائیں' },
        { title: 'آیاتِ ابطالِ سحر', text: 'قَالَ مُوسَىٰ مَا جِئْتُم بِهِ السِّحْرُ ۖ إِنَّ اللَّهَ سَيُبْطِلُهُ ۖ إِنَّ اللَّهَ لَا يُصْلِحُ عَمَلَ الْمُفْسِدِينَ', count: 'صبح و شام ۲۱ مرتبہ مع غسل' },
        { title: 'معوذتین و آیۃ الکرسی', text: 'سورۃ الفلق، سورۃ الناس اور آیۃ الکرسی الشریفہ', count: 'صبح، عصر اور سوتے وقت ۱۱، ۱۱ مرتبہ' }
      ],
      divineNameWazifa: `يَا شَافِيُ يَا كَافِيُ يَا مُعَافِيُ يَا حَفِيظُ يَا سَلَامُ (${primaryTotal} مرتبہ یا کم از کم ۱۱۱ مرتبہ بعد نمازِ فجر)`,
      naqshRecommendation: rem3 === 1 
        ? 'نقشِ مثلثِ شفا برائے ابطالِ سحر و آسیب، زعفران و عرقِ گلاب سے سفید چینی کی پلیٹ پر لکھ کر پلائیں اور بازو پر باندھیں۔'
        : rem3 === 2
        ? 'نقشِ ذوالکتابتِ شفا مع سورۃ الفاتحہ، پانی میں گھول کر مریض کو ۷ دن متواتر صبح نہار منہ پلائیں۔'
        : 'نقشِ تسکینِ قلب و سکونِ روح، ہرن کی جھلی یا سفید کاغذ پر مشک و زعفران سے لکھ کر گلے میں ڈالیں۔',
      recommendedSadaqah: planetInfo.sadaqah,
      bestOperationTime: `بروز ${planetInfo.day} بوقت ${planetInfo.saat}`,
      precautions: 'نمازِ پنجگانہ کی پابندی، باوضو رہنا، گانے بجانے و ناپاکی سے پرہیز، اور رات کو سوتے وقت چاروں قل پڑھ کر دم کرنا۔'
    };

    return {
      rawText: raw,
      sanitizedText: sanitized,
      totalChars: chars.length,
      adadArabicMashriqi,
      adadArabicMaghribi,
      adadIndoPak,
      primaryTotal,
      letterBreakdown,
      natureInfo,
      illnessTypeInfo,
      planetInfo,
      zodiacHouses,
      outcomeInfo,
      remedy
    };
  }, [activeInputText, selectedTaMarboota]);

  // Full Diagnostic Report Generator for Copy
  const fullDiagnosticReportText = useMemo(() => {
    let rep = `===============================================================\n`;
    rep += `📋 رپورٹِ تشخیصِ امراض و احوالِ سائل (جامع استخراجِ جفر و ابجد)\n`;
    rep += `===============================================================\n`;
    rep += `متن / نام مع والدہ: ${analysis.rawText}\n`;
    rep += `مجموعہ اعدادِ کل (پاک و ہند): ${analysis.adadIndoPak}\n`;
    rep += `مجموعہ اعدادِ عربی (مشرقی): ${analysis.adadArabicMashriqi} | (مغاربی): ${analysis.adadArabicMaghribi}\n`;
    rep += `---------------------------------------------------------------\n`;
    rep += `۱. تقسیم بر ۳ (تشخیصِ اصلِ مرض): ${analysis.illnessTypeInfo.type}\n`;
    rep += `   النتیجہ: ${analysis.illnessTypeInfo.status}\n`;
    rep += `   تفصیل: ${analysis.illnessTypeInfo.diagnosisText}\n\n`;
    rep += `۲. تقسیم بر ۴ (طبعی و عنصری مزاج): ${analysis.natureInfo.nature}\n`;
    rep += `   علامات: ${analysis.natureInfo.summary}\n`;
    rep += `   سبب: ${analysis.natureInfo.spiritualCause}\n\n`;
    rep += `۳. تقسیم بر ۷ (کوکب، دن اور ساعت): ${analysis.planetInfo.planet} (بروز ${analysis.planetInfo.day})\n`;
    rep += `   بہترین ساعتِ عمل: ${analysis.planetInfo.saat}\n`;
    rep += `   موزوں صدقہ: ${analysis.planetInfo.sadaqah}\n\n`;
    rep += `۴. تقسیم بر ۱۲ (برج و اعضائے مرض): ${analysis.zodiacHouses.burj}\n`;
    rep += `   متاثرہ اعضاء: ${analysis.zodiacHouses.body}\n`;
    rep += `   کیفیت: ${analysis.zodiacHouses.desc}\n\n`;
    rep += `۵. تقسیم بر ۶ (انجام و عاقبتِ مرض): ${analysis.outcomeInfo.outcome}\n`;
    rep += `   حکم: ${analysis.outcomeInfo.desc}\n`;
    rep += `---------------------------------------------------------------\n`;
    rep += `🌿 نسخۂ شفاء و روحانی علاج:\n`;
    rep += `• وظیفۂ اسماء: ${analysis.remedy.divineNameWazifa}\n`;
    rep += `• آیاتِ قرآنیہ: ${analysis.remedy.quranicVerses.map(v => `${v.title}: ${v.text} (${v.count})`).join('\n  ')}\n`;
    rep += `• تدبیرِ نقش: ${analysis.remedy.naqshRecommendation}\n`;
    rep += `• وقت و صدقہ: ${analysis.remedy.bestOperationTime} | صدقہ: ${analysis.remedy.recommendedSadaqah}\n`;
    rep += `• پرہیز و ہدایات: ${analysis.remedy.precautions}\n`;
    rep += `===============================================================\n`;
    return rep;
  }, [analysis]);

  return (
    <div className="space-y-6" dir="rtl">
      {/* Top Banner & Title */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-gradient-to-br from-[#fefae0] via-[#faedcd] to-[#f4ebe1] p-6 shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-[#9d0208] text-white shadow-sm ring-2 ring-red-300">
                <HeartPulse className="h-6 w-6 text-red-100 animate-pulse" />
              </span>
              <div>
                <h2 className="font-amiri text-2xl md:text-3xl font-bold text-[#5d4037]">
                  محاسبِ ابجد و تشخیصِ امراض (روحانی و جسمانی)
                </h2>
                <p className="text-xs md:text-sm text-[#bc6c25] font-bold mt-0.5">
                  حسابِ کلمات و نام مع والدہ مع موازنۂ ابجدِ عربی و پاک و ہند، اور تقسیم بر ۴، ۳، ۷، ۱۲، ۶ برائے تشخیصِ کامل و علاجِ شافی۔
                </p>
              </div>
            </div>
          </div>

          {/* Quick Copy Report & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCopy(fullDiagnosticReportText, 'full-report')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#bc6c25] hover:bg-[#a2591d] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="نسخ پوری تشخیصی رپورٹ مع علاج"
            >
              {copiedKey === 'full-report' ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
              <span>{copiedKey === 'full-report' ? 'تم نسخ التقرير!' : 'نسخ رپورٹِ تشخیص'}</span>
            </button>

            {onSendToNaqsh && (
              <button
                onClick={() => onSendToNaqsh(analysis.primaryTotal)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all cursor-pointer border border-amber-300"
                title="إرسال الأعداد إلى مولد النقوش"
              >
                <Layers className="h-4 w-4 text-amber-700" />
                <span>نقش برائے شفا ({analysis.primaryTotal})</span>
              </button>
            )}

            {onSendToIstikhara && (
              <button
                onClick={() => onSendToIstikhara(analysis.rawText)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-900 text-xs font-bold transition-all cursor-pointer border border-indigo-200"
              >
                <Compass className="h-4 w-4 text-indigo-700" />
                <span>استخارہ میں بھیجیں</span>
              </button>
            )}
          </div>
        </div>

        {/* Input Controls Card */}
        <div className="mt-5 rounded-2xl bg-white p-4 md:p-5 border border-[#d4a373] shadow-xs space-y-4">
          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d4a373]/30 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-700">طریقۂ ادخال:</span>
              <button
                onClick={() => setInputMode('name-mother')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  inputMode === 'name-mother'
                    ? 'bg-[#bc6c25] text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                👤 نامِ مریض مع والدہ (سائل کی تشخیص)
              </button>
              <button
                onClick={() => setInputMode('full-phrase')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  inputMode === 'full-phrase'
                    ? 'bg-[#bc6c25] text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                ✍️ جملہ، آیت یا مکمل کلمات
              </button>
            </div>

            {/* Taa Marboota Config */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-bold">تائے مربوطہ (ة/ۃ):</span>
              <button
                onClick={() => setSelectedTaMarboota('400')}
                className={`px-2 py-1 rounded-lg font-bold cursor-pointer ${
                  selectedTaMarboota === '400' ? 'bg-[#5d4037] text-white' : 'bg-gray-100 text-gray-700'
                }`}
                title="بحساب ت (۴۰۰)"
              >
                ۴۰۰ (ت)
              </button>
              <button
                onClick={() => setSelectedTaMarboota('5')}
                className={`px-2 py-1 rounded-lg font-bold cursor-pointer ${
                  selectedTaMarboota === '5' ? 'bg-[#5d4037] text-white' : 'bg-gray-100 text-gray-700'
                }`}
                title="بحساب ہ (۵)"
              >
                ۵ (ہ)
              </button>
            </div>
          </div>

          {/* Actual Inputs */}
          {inputMode === 'name-mother' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#5d4037] mb-1.5">
                  نامِ مریض / سائل (Patient Name):
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="مثلاً: محمد، احمد، فاطمہ..."
                  className="w-full rounded-xl border-2 border-[#d4a373] p-3 text-sm md:text-base font-amiri font-bold text-[#2c1e14] focus:outline-none focus:ring-2 focus:ring-[#bc6c25]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5d4037] mb-1.5">
                  نامِ والدہ (Mother's Name - اگر معلوم نہ ہو تو 'حوا' لکھیں):
                </label>
                <input
                  type="text"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  placeholder="مثلاً: آمنہ، خدیجہ، حوا..."
                  className="w-full rounded-xl border-2 border-[#d4a373] p-3 text-sm md:text-base font-amiri font-bold text-[#2c1e14] focus:outline-none focus:ring-2 focus:ring-[#bc6c25]"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-[#5d4037] mb-1.5">
                مکمل عبارت، کلمات یا سوال درج فرمائیں (Full Word / Phrase):
              </label>
              <textarea
                value={fullPhrase}
                onChange={(e) => setFullPhrase(e.target.value)}
                rows={2}
                placeholder="یہاں کوئی بھی اسم، آیت، دعا یا سائل کا سوال تحریر کریں..."
                className="w-full rounded-xl border-2 border-[#d4a373] p-3 text-sm md:text-base font-amiri font-bold text-[#2c1e14] focus:outline-none focus:ring-2 focus:ring-[#bc6c25]"
              />
            </div>
          )}

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-gray-500">نمونہ برائے ٹیسٹ:</span>
            {samplePresets.map((sp, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(sp.p, sp.m, sp.phrase)}
                className="px-2.5 py-1 rounded-lg bg-[#faedcd]/70 hover:bg-[#faedcd] text-[#5d4037] text-xs font-medium border border-[#d4a373]/40 cursor-pointer transition-all"
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Calculated Adad Comparison Badges */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-2xl bg-white border border-[#d4a373] p-3.5 text-center shadow-xs">
            <span className="text-[11px] text-gray-600 font-bold block">اعداد پاک و ہند (مع مفرسہ)</span>
            <span className="font-amiri text-2xl md:text-3xl font-bold text-[#bc6c25]">
              {analysis.adadIndoPak}
            </span>
            <span className="text-[10px] text-emerald-700 block font-medium mt-0.5">معیارِ اردو و فارسی</span>
          </div>

          <div className="rounded-2xl bg-white border border-[#d4a373] p-3.5 text-center shadow-xs">
            <span className="text-[11px] text-gray-600 font-bold block">اعداد عربی کبیر (مشرقی)</span>
            <span className="font-amiri text-2xl md:text-3xl font-bold text-[#5d4037]">
              {analysis.adadArabicMashriqi}
            </span>
            <span className="text-[10px] text-gray-500 block font-medium mt-0.5">أبجد هوز حطي</span>
          </div>

          <div className="rounded-2xl bg-white border border-[#d4a373] p-3.5 text-center shadow-xs">
            <span className="text-[11px] text-gray-600 font-bold block">اعداد عربی مغاربی (اندلسی)</span>
            <span className="font-amiri text-2xl md:text-3xl font-bold text-amber-900">
              {analysis.adadArabicMaghribi}
            </span>
            <span className="text-[10px] text-amber-700 block font-medium mt-0.5">صعفض قرست</span>
          </div>

          <div className="rounded-2xl bg-[#5d4037] text-white p-3.5 text-center shadow-xs">
            <span className="text-[11px] text-amber-200 font-bold block">تعدادِ حروف و کلمات</span>
            <span className="font-amiri text-2xl md:text-3xl font-bold text-amber-300">
              {analysis.totalChars} <span className="text-xs text-amber-100">حرف</span>
            </span>
            <span className="text-[10px] text-amber-200/80 block font-medium mt-0.5">مفرد حروفِ جفر</span>
          </div>
        </div>
      </div>

      {/* Diagnosis Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-[#d4a373]/50 pb-2">
        <button
          onClick={() => setActiveDiagTab('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDiagTab === 'all'
              ? 'bg-[#5d4037] text-white shadow-xs'
              : 'bg-white hover:bg-[#faedcd] text-[#5d4037] border border-[#d4a373]'
          }`}
        >
          <Activity className="h-4 w-4 text-amber-300" />
          <span>تمام نتائج و فارمولے (All Formulas)</span>
        </button>

        <button
          onClick={() => setActiveDiagTab('illness-3')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDiagTab === 'illness-3'
              ? 'bg-purple-900 text-white shadow-xs'
              : 'bg-purple-50 hover:bg-purple-100 text-purple-950 border border-purple-300'
          }`}
        >
          <Stethoscope className="h-4 w-4" />
          <span>۱. تقسیم بر ۳ (روحانی بمقابلہ جسمانی)</span>
        </button>

        <button
          onClick={() => setActiveDiagTab('nature-4')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDiagTab === 'nature-4'
              ? 'bg-red-800 text-white shadow-xs'
              : 'bg-red-50 hover:bg-red-100 text-red-950 border border-red-300'
          }`}
        >
          <Flame className="h-4 w-4" />
          <span>۲. تقسیم بر ۴ (طبعی و عنصری مزاج)</span>
        </button>

        <button
          onClick={() => setActiveDiagTab('planet-7')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDiagTab === 'planet-7'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300'
          }`}
        >
          <Sun className="h-4 w-4" />
          <span>۳. تقسیم بر ۷ (کواکب، دن و صدقہ)</span>
        </button>

        <button
          onClick={() => setActiveDiagTab('zodiac-12')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDiagTab === 'zodiac-12'
              ? 'bg-blue-800 text-white shadow-xs'
              : 'bg-blue-50 hover:bg-blue-100 text-blue-950 border border-blue-300'
          }`}
        >
          <Compass className="h-4 w-4" />
          <span>۴. تقسیم بر ۱۲ (برج و اعضائے مرض)</span>
        </button>

        <button
          onClick={() => setActiveDiagTab('outcome-6')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDiagTab === 'outcome-6'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>۵. تقسیم بر ۶ (عاقبت و انجامِ شفا)</span>
        </button>

        <button
          onClick={() => setActiveDiagTab('remedy')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDiagTab === 'remedy'
              ? 'bg-[#bc6c25] text-white shadow-xs'
              : 'bg-[#faedcd] hover:bg-[#faedcd]/80 text-[#5d4037] border border-[#d4a373]'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>🌿 نسخۂ علاج و نقوش</span>
        </button>
      </div>

      {/* =========================================================================
          DETAILED SECTION 1: PRIMARY ILLNESS NATURE (تقسیم بر ۳ - روحانی / جسمانی / نفسیاتی)
         ========================================================================= */}
      {(activeDiagTab === 'all' || activeDiagTab === 'illness-3') && (
        <div className={`rounded-3xl border-2 p-5 md:p-6 shadow-sm ${analysis.illnessTypeInfo.boxBg}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-purple-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-900 text-white shadow-xs">
                <Stethoscope className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-amiri text-xl font-bold text-purple-950">
                  الف) تقسیم بر ۳ (فارمولۂ تشخیصِ اصلِ مرض: روحانی بمقابلہ جسمانی)
                </h3>
                <span className="text-xs text-purple-800 font-medium">
                  قاعدہ: جملہ اعدادِ سائل ({analysis.primaryTotal}) کو ۳ سے تقسیم کرنے پر باقی: <strong>{analysis.primaryTotal % 3 === 0 ? 3 : analysis.primaryTotal % 3}</strong> حاصل ہوا۔
                </span>
              </div>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-bold ${analysis.illnessTypeInfo.badgeColor}`}>
              {analysis.illnessTypeInfo.status}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Verdict Card */}
            <div className="lg:col-span-2 space-y-3">
              <div className="p-4 rounded-2xl bg-white/90 border border-purple-200">
                <h4 className="font-bold text-base text-purple-950 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-700" />
                  <span>نتیجۂ تشخیص: {analysis.illnessTypeInfo.type}</span>
                </h4>
                <p className="mt-2 text-xs md:text-sm text-gray-800 leading-relaxed font-medium">
                  {analysis.illnessTypeInfo.diagnosisText}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-100/60 border border-purple-200 text-xs text-purple-950 font-bold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-purple-800 shrink-0" />
                <span>ہدایتِ عمل: {analysis.illnessTypeInfo.primaryAction}</span>
              </div>
            </div>

            {/* Quick Reference Table for Division by 3 */}
            <div className="rounded-2xl bg-white/95 p-3.5 border border-purple-200 text-xs space-y-2">
              <span className="font-bold text-purple-950 block border-b border-purple-100 pb-1">
                قانونِ اسقاط بر ۳:
              </span>
              <div className={`p-2 rounded-lg ${analysis.primaryTotal % 3 === 1 ? 'bg-purple-100 font-bold text-purple-950 ring-1 ring-purple-400' : 'text-gray-600'}`}>
                <strong>باقی ۱:</strong> مرضِ روحانی (سحر، جادو، آسیب، نظرِ بد)
              </div>
              <div className={`p-2 rounded-lg ${analysis.primaryTotal % 3 === 2 ? 'bg-purple-100 font-bold text-purple-950 ring-1 ring-purple-400' : 'text-gray-600'}`}>
                <strong>باقی ۲:</strong> مرضِ جسمانی (طبیعی، خلطی خرابی، محتاجِ دوا)
              </div>
              <div className={`p-2 rounded-lg ${analysis.primaryTotal % 3 === 0 ? 'bg-purple-100 font-bold text-purple-950 ring-1 ring-purple-400' : 'text-gray-600'}`}>
                <strong>باقی ۳ / ۰:</strong> مرضِ نفسیاتی (وہم، خوف، ذہنی تناؤ، وسوسہ)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DETAILED SECTION 2: ELEMENTAL & HUMORAL NATURE (تقسیم بر ۴ - عناصر و طبائع اربعہ)
         ========================================================================= */}
      {(activeDiagTab === 'all' || activeDiagTab === 'nature-4') && (
        <div className={`rounded-3xl border-2 p-5 md:p-6 shadow-sm ${analysis.natureInfo.color}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-current/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#5d4037] text-white shadow-xs">
                <Flame className="h-5 w-5 text-amber-300" />
              </span>
              <div>
                <h3 className="font-amiri text-xl font-bold text-[#5d4037]">
                  ب) تقسیم بر ۴ (فارمولۂ طبعی و عنصری مزاج: ناری، خاکی، بادی، مائی)
                </h3>
                <span className="text-xs opacity-80 font-medium">
                  قاعدہ: اعدادِ سائل ({analysis.primaryTotal}) کو ۴ سے تقسیم کرنے پر باقی: <strong>{analysis.primaryTotal % 4 === 0 ? 4 : analysis.primaryTotal % 4}</strong> حاصل ہوا۔
                </span>
              </div>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-bold ${analysis.natureInfo.badgeColor}`}>
              {analysis.natureInfo.nature}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-3">
              <div className="p-4 rounded-2xl bg-white/95 border border-current/20 space-y-2">
                <span className="font-bold text-sm text-[#5d4037] block">خلاصۂ طبعی کیفیت:</span>
                <p className="text-xs md:text-sm text-gray-800 font-medium">
                  {analysis.natureInfo.summary}
                </p>
                <div className="pt-2 border-t border-gray-100 text-xs text-gray-700">
                  <strong>علتِ روحانی:</strong> {analysis.natureInfo.spiritualCause}
                </div>
                <div className="text-xs text-gray-700">
                  <strong>علتِ جسمانی:</strong> {analysis.natureInfo.medicalCause}
                </div>
              </div>

              {/* Symptoms List */}
              <div className="p-4 rounded-2xl bg-white/90 border border-current/20">
                <span className="font-bold text-xs text-[#5d4037] block mb-2">علاماتِ طبعی و کیفیات:</span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-700">
                  {analysis.natureInfo.symptoms.map((sym, i) => (
                    <li key={i} className="flex items-start gap-1.5 bg-gray-50 p-2 rounded-lg">
                      <span className="text-[#bc6c25] font-bold">•</span>
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4 Elements Rule Table */}
            <div className="rounded-2xl bg-white/95 p-3.5 border border-current/20 text-xs space-y-2">
              <span className="font-bold text-[#5d4037] block border-b border-gray-100 pb-1">
                قانونِ عناصرِ اربعہ بر ۴:
              </span>
              <div className={`p-2 rounded-lg ${analysis.primaryTotal % 4 === 1 ? 'bg-red-100 font-bold text-red-950 ring-1 ring-red-400' : 'text-gray-600'}`}>
                <strong>باقی ۱:</strong> آتشی طبع (صفراء، حرارت، سحرِ ناری، نظرِ بد)
              </div>
              <div className={`p-2 rounded-lg ${analysis.primaryTotal % 4 === 2 ? 'bg-amber-100 font-bold text-amber-950 ring-1 ring-amber-400' : 'text-gray-600'}`}>
                <strong>باقی ۲:</strong> خاکی طبع (سوداء، خشکی، سحرِ مدفون، بندش)
              </div>
              <div className={`p-2 rounded-lg ${analysis.primaryTotal % 4 === 3 ? 'bg-yellow-100 font-bold text-yellow-950 ring-1 ring-yellow-400' : 'text-gray-600'}`}>
                <strong>باقی ۳:</strong> بادی طبع (ریاح، خفقان، آسیبِ ہوائی، سحرِ معلق)
              </div>
              <div className={`p-2 rounded-lg ${analysis.primaryTotal % 4 === 0 ? 'bg-blue-100 font-bold text-blue-950 ring-1 ring-blue-400' : 'text-gray-600'}`}>
                <strong>باقی ۴ / ۰:</strong> آبی طبع (بلغم، سحرِ ماکول/مشروب، سحرِ جاری)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DETAILED SECTION 3: PLANETS, DAY & SADAQAH (تقسیم بر ۷ - کواکبِ سبعہ و صدقہ)
         ========================================================================= */}
      {(activeDiagTab === 'all' || activeDiagTab === 'planet-7') && (
        <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50/50 p-5 md:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-amber-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-800 text-white shadow-xs">
                <Sun className="h-5 w-5 text-amber-200" />
              </span>
              <div>
                <h3 className="font-amiri text-xl font-bold text-amber-950">
                  ج) تقسیم بر ۷ (فارمولۂ کواکبِ سبعہ، دن، ساعتِ شفا و مخصوص صدقہ)
                </h3>
                <span className="text-xs text-amber-800 font-medium">
                  قاعدہ: اعدادِ سائل ({analysis.primaryTotal}) کو ۷ سے تقسیم کرنے پر باقی: <strong>{analysis.primaryTotal % 7 === 0 ? 7 : analysis.primaryTotal % 7}</strong> حاصل ہوا۔
                </span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-800 text-white">
              کوکب: {analysis.planetInfo.planet} | بروز: {analysis.planetInfo.day}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-2">
              <span className="text-xs text-gray-500 font-bold flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-700" />
                <span>بہترین ساعت و وقتِ عمل:</span>
              </span>
              <div className="font-bold text-amber-950 text-sm">
                {analysis.planetInfo.saat}
              </div>
              <p className="text-[11px] text-gray-600">
                اس ساعت میں تعویذ لکھنا، دم کرنا یا وظیفہ پڑھنا جلد اثر انداز ہوتا ہے۔
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-2">
              <span className="text-xs text-gray-500 font-bold flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-700" />
                <span>موزوں و مخصوص صدقہ:</span>
              </span>
              <div className="font-bold text-amber-950 text-sm">
                {analysis.planetInfo.sadaqah}
              </div>
              <p className="text-[11px] text-gray-600">
                یہ صدقہ مرض کی نحوست کو زائل کرنے کے لیے تیر بہدف ہے۔
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-2">
              <span className="text-xs text-gray-500 font-bold flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-amber-700" />
                <span>اسمائے حسنیٰ کا تکرار:</span>
              </span>
              <div className="font-bold text-amber-950 text-xs font-amiri leading-relaxed">
                {analysis.planetInfo.wazifa}
              </div>
              <p className="text-[11px] text-gray-600">
                روزانہ اول و آخر ۱۱ مرتبہ درود شریف کے ساتھ ورد فرمائیں۔
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DETAILED SECTION 4: 12 ZODIAC HOUSES & AFFECTED ORGANS (تقسیم بر ۱۲ - بروج و اعضاء)
         ========================================================================= */}
      {(activeDiagTab === 'all' || activeDiagTab === 'zodiac-12') && (
        <div className="rounded-3xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50/40 p-5 md:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-blue-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-800 text-white shadow-xs">
                <Compass className="h-5 w-5 text-blue-200" />
              </span>
              <div>
                <h3 className="font-amiri text-xl font-bold text-blue-950">
                  د) تقسیم بر ۱۲ (فارمولۂ بروجِ اثناعشر، طالعِ مرض و متاثرہ اعضاء)
                </h3>
                <span className="text-xs text-blue-800 font-medium">
                  قاعدہ: اعدادِ سائل ({analysis.primaryTotal}) کو ۱۲ سے تقسیم کرنے پر باقی: <strong>{analysis.primaryTotal % 12 === 0 ? 12 : analysis.primaryTotal % 12}</strong> حاصل ہوا۔
                </span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-800 text-white">
              {analysis.zodiacHouses.burj}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-2xs space-y-2">
              <span className="font-bold text-xs text-blue-950 block">متاثرہ اعضائے جسمانی (Body Organ Association):</span>
              <div className="font-amiri text-base font-bold text-[#bc6c25]">
                {analysis.zodiacHouses.body}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                {analysis.zodiacHouses.desc}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-2xs space-y-2">
              <span className="font-bold text-xs text-blue-950 block">تدبیرِ حفاظتِ عضو:</span>
              <p className="text-xs text-gray-700 leading-relaxed">
                ان اعضاء پر سورۃ الفاتحہ پڑھ کر سیدھے ہاتھ سے دم کریں اور روغنِ زیتون یا کلونجی پر دم کر کے مالش کریں۔ ٹھنڈی ہوا اور ناموافق غذا سے مکمل پرہیز رکھیں۔
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DETAILED SECTION 5: OUTCOME & PROGNOSIS (تقسیم بر ۶ - انجام و عاقبتِ مرض)
         ========================================================================= */}
      {(activeDiagTab === 'all' || activeDiagTab === 'outcome-6') && (
        <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50/40 p-5 md:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-emerald-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-800 text-white shadow-xs">
                <ShieldCheck className="h-5 w-5 text-emerald-200" />
              </span>
              <div>
                <h3 className="font-amiri text-xl font-bold text-emerald-950">
                  ہ) تقسیم بر ۶ (فارمولۂ انجامِ مرض، عاقبت و مدتِ شفا)
                </h3>
                <span className="text-xs text-emerald-800 font-medium">
                  قاعدہ: اعدادِ سائل ({analysis.primaryTotal}) کو ۶ سے تقسیم کرنے پر باقی: <strong>{analysis.primaryTotal % 6 === 0 ? 6 : analysis.primaryTotal % 6}</strong> حاصل ہوا۔
                </span>
              </div>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-bold ${analysis.outcomeInfo.badgeColor}`}>
              {analysis.outcomeInfo.statusBadge}
            </span>
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-2">
            <h4 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-700" />
              <span>نتیجۂ عاقبت: {analysis.outcomeInfo.outcome}</span>
            </h4>
            <p className="text-xs md:text-sm text-gray-800 leading-relaxed font-medium">
              {analysis.outcomeInfo.desc}
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          DETAILED SECTION 6: COMPREHENSIVE HEALING & PRESCRIPTION (نسخۂ علاج و شفا)
         ========================================================================= */}
      {(activeDiagTab === 'all' || activeDiagTab === 'remedy') && (
        <div className="rounded-3xl border-2 border-[#d4a373] bg-white p-5 md:p-6 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-[#d4a373]/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#bc6c25] text-white shadow-xs">
                <BookOpen className="h-5 w-5 text-amber-200" />
              </span>
              <div>
                <h3 className="font-amiri text-2xl font-bold text-[#5d4037]">
                  🌿 دستور العمل و نسخۂ علاجِ شافی (Prescribed Spiritual Remedy)
                </h3>
                <span className="text-xs text-gray-500 font-medium">
                  مریض کے اعداد اور تشخیصی نوعیت کے عین مطابق قرآنی آیات، اسمائے حسنیٰ، نقوش اور تدابیرِ شفا۔
                </span>
              </div>
            </div>

            <button
              onClick={() => handleCopy(
                `نسخۂ علاج:\nوظیفہ: ${analysis.remedy.divineNameWazifa}\nنقش: ${analysis.remedy.naqshRecommendation}\nصدقہ: ${analysis.remedy.recommendedSadaqah}\nوقت: ${analysis.remedy.bestOperationTime}`, 
                'remedy-copy'
              )}
              className="px-3 py-1.5 rounded-xl bg-[#faedcd] hover:bg-[#e7d8c9] text-[#5d4037] text-xs font-bold border border-[#d4a373] transition-all cursor-pointer flex items-center gap-1.5"
            >
              {copiedKey === 'remedy-copy' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>نسخ نسخۂ علاج</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Quranic Verses */}
            <div className="p-4 rounded-2xl bg-[#fefae0]/80 border border-[#d4a373]/60 space-y-3">
              <span className="font-bold text-xs text-[#5d4037] block flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-[#bc6c25]" />
                <span>۱. آیاتِ قرآنیہ و سورتیں برائے شفا و ابطال:</span>
              </span>
              <div className="space-y-2 text-xs">
                {analysis.remedy.quranicVerses.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white border border-[#d4a373]/40">
                    <div className="font-bold text-[#bc6c25] mb-0.5">{item.title}</div>
                    <div className="font-amiri text-sm font-bold text-gray-800 mb-1">{item.text}</div>
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                      طریقہ: {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Wazaif, Naqsh & Sadaqah */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-[#d4a373] shadow-2xs space-y-1.5">
                <span className="font-bold text-xs text-[#5d4037] block">۲. وظیفۂ اسماء الحسنیٰ:</span>
                <div className="font-amiri text-base font-bold text-[#bc6c25]">
                  {analysis.remedy.divineNameWazifa}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#d4a373] shadow-2xs space-y-1.5">
                <span className="font-bold text-xs text-[#5d4037] block">۳. تدبیرِ نقش و تعویذ:</span>
                <p className="text-xs text-gray-800 leading-relaxed font-medium">
                  {analysis.remedy.naqshRecommendation}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#d4a373] shadow-2xs space-y-1.5">
                <span className="font-bold text-xs text-[#5d4037] block">۴. وقت و صدقہ:</span>
                <div className="text-xs text-gray-700">
                  <strong>بہترین وقت:</strong> {analysis.remedy.bestOperationTime}
                </div>
                <div className="text-xs text-gray-700">
                  <strong>صدقہ:</strong> {analysis.remedy.recommendedSadaqah}
                </div>
              </div>
            </div>
          </div>

          {/* Precautions */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 flex items-start gap-2">
            <Info className="h-4 w-4 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <strong>پرہیز و حفاظتی ہدایات: </strong>
              {analysis.remedy.precautions}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DETAILED SECTION 7: LETTER-BY-LETTER BREAKDOWN (تفصیلِ حروف و اعداد)
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-white p-5 md:p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-[#d4a373]/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#5d4037] text-white shadow-xs">
              <Layers className="h-4 w-4 text-amber-300" />
            </span>
            <h4 className="font-bold text-sm text-[#5d4037]">
              جدولِ تفکیکِ حروف و موازنۂ اعداد (Letter-by-Letter Analysis)
            </h4>
          </div>
          <span className="text-xs text-gray-500">
            مجموعہ حروف: <strong>{analysis.totalChars}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs border-collapse">
            <thead>
              <tr className="bg-[#faedcd] text-[#5d4037] border-b border-[#d4a373]">
                <th className="p-2.5 font-bold text-center w-12">#</th>
                <th className="p-2.5 font-bold text-center w-16">الحرف</th>
                <th className="p-2.5 font-bold text-center bg-amber-100">اعداد پاک و ہند</th>
                <th className="p-2.5 font-bold text-center">عربی مشرقی</th>
                <th className="p-2.5 font-bold text-center">عربی مغاربی</th>
                <th className="p-2.5 font-bold">وضاحت و نوٹ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {analysis.letterBreakdown.map((item, idx) => (
                <tr key={idx} className="hover:bg-amber-50/50 transition-colors">
                  <td className="p-2.5 text-center text-gray-500 font-mono">{idx + 1}</td>
                  <td className="p-2.5 text-center font-amiri text-xl font-bold text-[#bc6c25]">
                    {item.char}
                  </td>
                  <td className="p-2.5 text-center font-mono font-bold text-sm text-[#5d4037] bg-amber-50">
                    {item.indoPak}
                  </td>
                  <td className="p-2.5 text-center font-mono text-gray-700">
                    {item.arabicMashriqi}
                  </td>
                  <td className="p-2.5 text-center font-mono text-gray-700">
                    {item.arabicMaghribi}
                  </td>
                  <td className="p-2.5 text-gray-600">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                      item.isUrduSpecific ? 'bg-amber-100 text-amber-900 font-bold' : 'bg-gray-100'
                    }`}>
                      {item.note}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#fefae0] font-bold text-xs border-t-2 border-[#d4a373] text-[#5d4037]">
                <td colSpan={2} className="p-3 text-center">المجموع الكلي:</td>
                <td className="p-3 text-center font-mono text-base text-[#bc6c25] bg-amber-100/80">
                  {analysis.adadIndoPak}
                </td>
                <td className="p-3 text-center font-mono text-base">
                  {analysis.adadArabicMashriqi}
                </td>
                <td className="p-3 text-center font-mono text-base">
                  {analysis.adadArabicMaghribi}
                </td>
                <td className="p-3 text-gray-600 text-[11px]">
                  (تم استخراج كافة النتائج وفق الضوابط الجفرية المعتمدة)
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
