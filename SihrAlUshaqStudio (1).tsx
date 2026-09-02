import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Heart, 
  Sparkles, 
  Flame, 
  Moon, 
  Award, 
  Copy, 
  Check, 
  Printer, 
  Share2, 
  Send, 
  Search, 
  Filter, 
  Layers, 
  Clock, 
  Compass, 
  CheckCircle, 
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Activity,
  Droplets,
  Sun,
  ShieldCheck,
  Zap,
  Volume2,
  Users,
  Feather,
  FlameKindling,
  Lock,
  Smile,
  RefreshCw
} from 'lucide-react';

export interface SihrUshaqAmalItem {
  id: string;
  titleUrdu: string;
  chapterArabic: string;
  chapterUrdu: string;
  category: 'rules_retreat' | 'halal_affection' | 'astrology_incense' | 'takseer_buni' | 'sacred_matrices' | 'azimat_quranic' | 'reconciliation_breaking';
  categoryUrdu: string;
  arabicDuaOrVerse: string;
  urduTranslation: string;
  abjadTotal: number;
  bestDayAndSaat: string;
  planetaryLord: string;
  incenseAndInk: string;
  element: 'آتشی' | 'بادی' | 'آبی' | 'خاکی';
  stepByStepMethod: string[];
  naqshType: string;
  dimension: number;
  naqshMatrix: (number | string)[][];
  placementRule: string;
  distantLoverRule: string;
  buniQuotesAndNotes: string;
  precautionRules: string[];
  targetDhikrCount: number;
}

interface SihrAlUshaqStudioProps {
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
}

export const SihrAlUshaqStudio: React.FC<SihrAlUshaqStudioProps> = ({
  onSendToNaqsh,
  onSendToTakseer
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAmal, setSelectedAmal] = useState<SihrUshaqAmalItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'talib_matloob_calculator' | 'takseer_merger' | 'rules_sharia' | 'live_tasbih'>('catalog');
  
  // Interactive Seeker (Talib) & Desired (Matloob) Abjad & Merger Calculator
  const [talibName, setTalibName] = useState<string>('احمد');
  const [talibMother, setTalibMother] = useState<string>('فاطمہ');
  const [matloobName, setMatloobName] = useState<string>('عائشہ');
  const [matloobMother, setMatloobMother] = useState<string>('مریم');
  const [selectedIntentPhrase, setSelectedIntentPhrase] = useState<string>('الفت و مودتِ شرعی و محبتِ فی اللہ');

  // Live Azimat / Tasbih Counter
  const [tasbihCount, setTasbihCount] = useState<number>(0);
  const [targetCount, setTargetCount] = useState<number>(313);

  // Abjad Map for live calculations
  const abjadMap: Record<string, number> = {
    'ا': 1, 'آ': 1, 'ب': 2, 'ج': 3, 'د': 4, 'ہ': 5, 'ه': 5, 'و': 6, 'ز': 7,
    'ح': 8, 'ط': 9, 'ی': 10, 'ي': 10, 'ے': 10, 'ک': 20, 'ك': 20, 'ل': 30,
    'م': 40, 'ن': 50, 'س': 60, 'ع': 70, 'ف': 80, 'ص': 90, 'ق': 100,
    'ر': 200, 'ش': 300, 'ت': 400, 'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800,
    'ظ': 900, 'غ': 1000, 'ء': 1, 'ئ': 10, 'ؤ': 6, 'ة': 5
  };

  const calculateAbjad = (text: string) => {
    let sum = 0;
    const clean = text.replace(/[^ء-يآ-ے]/g, '');
    for (const char of clean) {
      sum += abjadMap[char] || 0;
    }
    return sum;
  };

  const calculatedValues = useMemo(() => {
    const talibAdad = calculateAbjad(`${talibName} ${talibMother}`);
    const matloobAdad = calculateAbjad(`${matloobName} ${matloobMother}`);
    const intentAdad = calculateAbjad(selectedIntentPhrase);
    const wadoodAdad = 20; // یا ودود
    const jamiAdad = 114; // یا جامع
    const habibAdad = 78; // یا حبیب
    const totalCombined = talibAdad + matloobAdad + wadoodAdad + jamiAdad + intentAdad;

    // Mixed Letter String for Takseer
    const talibClean = (talibName + matloobName).replace(/[^ء-يآ-ے]/g, '');
    let interleaved = '';
    const maxLen = Math.max(talibName.length, matloobName.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < talibName.length) interleaved += talibName[i];
      if (i < matloobName.length) interleaved += matloobName[i];
    }
    const takseerSeed = interleaved + 'یاودودیاجامع';

    return {
      talibAdad,
      matloobAdad,
      intentAdad,
      totalCombined,
      takseerSeed,
      khadimName: 'عَطْفَيَائِيل',
      surahVerse: '﴿وَأَلَّفَ بَيْنَ قُلُوبِهِمْ ۚ لَوْ أَنفَقْتَ مَا فِي الْأَرْضِ جَمِيعًا مَّا أَلَّفْتَ بَيْنَ قُلُوبِهِمْ وَلَٰكِنَّ اللَّهَ أَلَّفَ بَيْنَهُمْ﴾'
    };
  }, [talibName, talibMother, matloobName, matloobMother, selectedIntentPhrase]);

  // Complete Catalog of Authentic Chapters & Amaliyat from "Sihr al-Ushaq wa Jannat al-Mushtaq" by Imam Al-Buni
  const catalog: SihrUshaqAmalItem[] = [
    // -------------------------------------------------------------
    // الباب الأول: في قواعد المحبة والخلوة واستخراج الأعوان
    // -------------------------------------------------------------
    {
      id: 'buni-qawaid-khalwat',
      titleUrdu: 'قواعدِ خلوت، استخراجِ موکلاتِ محبت و عزیمتِ ودودیہ',
      chapterArabic: 'الباب الأول: في قواعد المحبة والرياضة واستخراج الأملاك',
      chapterUrdu: 'باب اول: در قواعدِ جلب و محبت، شرائطِ طہارت و استخراجِ موکلات',
      category: 'rules_retreat',
      categoryUrdu: 'قواعدِ خلوت و موکلات',
      arabicDuaOrVerse: '﴿يَا وَدُودُ يَا رَؤُوفُ يَا ذَا الْعَرْشِ الْمَجِيدِ يَا مُبْدِئُ يَا مُعِيدُ أَسْأَلُكَ بِسِرِّ الْمَحَبَّةِ أَنْ تُسَخِّرَ لِي فُلَانَ ابْنَ فُلَانَةَ﴾',
      urduTranslation: 'اے بے انتہا محبت فرمانے والے، اے نہایت مہربان، اے عرشِ مجید کے مالک، اے اول پیدا کرنے والے اور دوبارہ لوٹانے والے، میں تجھ سے سرِّ محبت کے واسطے سوال کرتا ہوں کہ فلاں بن فلاں کے دل کو میرے لیے مسخر و مہربان فرما۔',
      abjadTotal: 1640,
      bestDayAndSaat: 'جمعہ کی صبح طلوعِ آفتاب کے وقت، ساعتِ زہرہ میں۔',
      planetaryLord: 'زہرہ (Venus)',
      incenseAndInk: 'زعفران، عرقِ گلاب و مشک سے سفید ہرن کی جھلی یا سفید کاغذ پر لکھیں، بخورِ عود و صندل سفید روشن کریں۔',
      element: 'آتشی',
      stepByStepMethod: [
        '۱. غسلِ طہارت کر کے سفید پاکیزہ لباس پہنیں اور خوشبو لگائیں۔',
        '۲. قبلہ رو بیٹھ کر اول و آخر ۱۱ بار درودِ ابراہیمی تلاوت کریں۔',
        '۳. طالب و مطلوب کے نام مع والدہ اور اسمِ "یا ودود" (۲۰) اور "یا جامع" (۱۱۴) کے اعداد جمع کر کے نقشِ مثلث مرتب کریں۔',
        '۴. اسمِ "یا ودود یا رؤوف" کا ۱۰۰۰ مرتبہ ورد کریں اور ہر ۱۰۰ بار پر عزیمت پڑھ کر نقش پر دم کریں۔',
        '۵. نقش کو خوشبو دار تیل میں چراغ کے اندر جلائیں یا بادی شاخ پر لٹکائیں۔'
      ],
      naqshType: 'مثلثِ ودود خالی البطن ۳×۳ (آتشی چال)',
      dimension: 3,
      naqshMatrix: [
        [548, 541, 551],
        [547, 'طالب و مطلوب', 549],
        [545, 550, 546]
      ],
      placementRule: 'چراغِ محبت میں زیتون یا چنبیلی کے تیل میں بتی بنا کر بوقتِ شب جلائیں یا موم جامہ کر کے پھل دار درخت کی مشرقی شاخ پر لٹکائیں۔',
      distantLoverRule: 'اگر مطلوب دوسرے شہر یا ملک میں ہو تو نصف شب کے وقت باوضو ہو کر آسمان کے ستاروں کی جانب رخ کر کے اسم "یا ودود" ۱۰۰۱ بار پڑھیں اور مطلوب کے دل کا تصور کر کے پھونکیں۔',
      buniQuotesAndNotes: 'امام احمد بن علی البونیؒ فرماتے ہیں: محبت کا اصل منبع اسمِ ودود کی تجلی ہے، جب تک دل میں ریا اور حرام کی نیت نہ ہو، یہ عمل لوہے کو بھی موم کر دیتا ہے۔',
      precautionRules: [
        'یہ عمل صرف جائز نکاح اور زوجین کی محبت کے لیے حلال ہے، ناجائز تعلق پر سخت وبال ہے۔',
        'عمل کے دوران گوشت، پیاز اور لہسن سے پرہیز (ترکِ حیوانی) مستحب ہے۔'
      ],
      targetDhikrCount: 1000
    },
    // -------------------------------------------------------------
    // الباب الثاني: في طلسمات الألفة وتأليف القلوب بين الزوجين
    // -------------------------------------------------------------
    {
      id: 'buni-ulfat-zawjain',
      titleUrdu: 'طلسمِ الفتِ کامل، صلحِ بین الزوجین و دفعِ نفرتِ خانگی',
      chapterArabic: 'الباب الثاني: في طلسمات الألفة وإصلاح ما فسد بين الزوجين',
      chapterUrdu: 'باب دوم: طلسمات و نقوشِ الفتِ حلال و تسخیرِ قلوبِ شرعیہ',
      category: 'halal_affection',
      categoryUrdu: 'الفتِ زوجین و تسخیر',
      arabicDuaOrVerse: '﴿وَأَلَّفَ بَيْنَ قُلُوبِهِمْ ۚ لَوْ أَنفَقْتَ مَا فِي الْأَرْضِ جَمِيعًا مَّا أَلَّفْتَ بَيْنَ قُلُوبِهِمْ وَلَٰكِنَّ اللَّهَ أَلَّفَ بَيْنَهُمْ ۚ إِنَّهُ عَزِيزٌ حَكِيمٌ﴾',
      urduTranslation: 'اور اس نے ان کے دلوں میں باہم الفت ڈال دی۔ اگر آپ زمین میں جو کچھ ہے سب خرچ کر دیتے تو بھی ان کے دلوں میں الفت نہ ڈال سکتے لیکن اللہ نے ان میں الفت پیدا کر دی، بے شک وہ زبردست حکمت والا ہے۔',
      abjadTotal: 2795,
      bestDayAndSaat: 'پیر یا جمعرات کی صبح، ساعتِ شمس یا مشتری۔',
      planetaryLord: 'مشتری (Jupiter)',
      incenseAndInk: 'زعفران و مشکِ خالص، بخورِ لبانِ ذکر و مستکی رومی۔',
      element: 'آبی',
      stepByStepMethod: [
        '۱. میاں بیوی کے درمیان الفت اور ناچاقی ختم کرنے کے لیے باوضو پاک صاف جگہ پر بیٹھیں۔',
        '۲. میٹھی چیز (جیسے شہد، مصری یا میٹھے شربت) پر سورۃ الانفال کی مذکورہ آیت ۶۳ بار دم کریں۔',
        '۳. زعفران و عرقِ گلاب سے نیچے دیا گیا مربعِ الفت تحریر کریں۔',
        '۴. نقش کو پانی میں گھول کر دونوں میاں بیوی کو پلائیں اور دوسرا نقش تعویذ بنا کر گھر کی مشرقی دیوار پر لگائیں۔',
        '۵. تین دن کے اندر دیرینہ عداوت و بدگمانی بے پناہ محبت میں تبدیل ہو جائے گی۔'
      ],
      naqshType: 'مربعِ الفت و موافقت ۴×۴ (آبی چال)',
      dimension: 4,
      naqshMatrix: [
        [700, 707, 706, 689],
        [705, 690, 699, 708],
        [691, 704, 709, 698],
        [711, 696, 693, 702]
      ],
      placementRule: 'نقش کو چینی کی پلیٹ پر لکھ کر میٹھے پانی سے دھو کر دونوں میاں بیوی کو پلائیں، اور چاندی کے خول میں لپیٹ کر دائیں بازو پر باندھیں۔',
      distantLoverRule: 'اگر شوہر یا بیوی ناراض ہو کر میکے یا پردیس چلی گئی ہو تو اس کے پہنے ہوئے کپڑے کے ٹکڑے پر یہ نقش لکھ کر شہد کی شیشی میں بند کر کے محفوظ رکھیں۔',
      buniQuotesAndNotes: 'شیخ بونیؒ فرماتے ہیں: جو شخص اس مربع کو ساعتِ مشتری میں لکھ کر میاں بیوی کو پلائے گا، ان کے درمیان تا دمِ حیات محبت و الفت قائم رہے گی اور کوئی فتنہ اثر نہ کرے گا۔',
      precautionRules: [
        'نیت خالصتاً اصلاحِ ذات البین اور حفظِ نکاح ہو۔',
        'ناپاک حالت میں نقش کو ہاتھ نہ لگائیں۔'
      ],
      targetDhikrCount: 313
    },
    // -------------------------------------------------------------
    // الباب الثالث: في ساعات الكواكب وبخورات المحبة
    // -------------------------------------------------------------
    {
      id: 'buni-saat-kawakib-bukhoor',
      titleUrdu: 'رصدِ ساعاتِ زہرہ، قمر و شمس اور ہفت گانہ بخوراتِ محبت',
      chapterArabic: 'الباب الثالث: في معرفة ساعات الكواكب وبخورات المحبة الجالبة',
      chapterUrdu: 'باب سوم: ساعاتِ کواکب و بخوراتِ مخصوصہ برائے جلب',
      category: 'astrology_incense',
      categoryUrdu: 'ساعات و بخوراتِ جلب',
      arabicDuaOrVerse: '﴿فَلَا أُقْسِمُ بِمَوَاقِعِ النُّجُومِ ۝ وَإِنَّهُ لَقَسَمٌ لَّوْ تَعْلَمُونَ عَظِيمٌ﴾ ﴿يَا نُورُ يَا هَادِي يَا بَدِيعَ السَّمَاوَاتِ وَالْأَرْضِ﴾',
      urduTranslation: 'پس میں قسم کھاتا ہوں تاروں کے گرنے کی جگہوں کی۔ اور اگر تم سمجھو تو یہ بہت بڑی قسم ہے۔ اے نور، اے ہدایت دینے والے، اے آسمانوں اور زمین کے بے مثال پیدا کرنے والے۔',
      abjadTotal: 1888,
      bestDayAndSaat: 'جمعہ کے دن پہلی ساعت (ساعتِ زہرہ) اور دسویں ساعت۔',
      planetaryLord: 'زہرہ و قمر (Venus & Moon)',
      incenseAndInk: 'بخورِ لادن، جاوی، صندلِ سرخ، مشک و عودِ قماری۔',
      element: 'بادی',
      stepByStepMethod: [
        '۱. جلب و محبت کے اعمال کے لیے قمری مہینے کے پہلے نصف (۱ تا ۱۴ تاریخ، بڑھتے ہوئے چاند) کا انتخاب کریں۔',
        '۲. دن کے اوقات میں ساعتِ زہرہ (جمعہ طلوعِ آفتاب) یا ساعتِ مشتری (جمعرات طلوعِ آفتاب) منتخب کریں۔',
        '۳. اگر رات کو عمل کرنا ہو تو پیر یا جمعہ کی شب ساعتِ قمر میں کریں۔',
        '۴. عمل کے وقت کمرے کو خوشبودار بخور (صندل، عود اور لوبان) سے معطر رکھیں۔',
        '۵. لکھتے وقت مشک و زعفران کی سیاہی اور قلمِ نے (بانس یا سرکنڈے کا قلم) استعمال کریں۔'
      ],
      naqshType: 'دائرۂ کواکب و افلاکِ سبعہ (بادی)',
      dimension: 3,
      naqshMatrix: [
        ['شمس', 'زہرہ', 'عطارد'],
        ['قمر', 'مرکزِ جلب', 'زحل'],
        ['مشتری', 'مریخ', 'راس']
      ],
      placementRule: 'ہوا میں اونچے مقام یا درخت کی بادی ٹہنی پر لٹکائیں تاکہ ہوا کے چلنے سے نقش حرکت کرے اور دل میں بے چینی پیدا ہو۔',
      distantLoverRule: 'رات کے وقت جب چاند مکمل روشن ہو، اس کی طرف دیکھ کر ۱۰۰ بار "یا قمر یا نور" پڑھیں اور مطلوب کے شہر کی سمت رخ کر کے پھونکیں۔',
      buniQuotesAndNotes: 'امام البونیؒ فرماتے ہیں: نجومی ساعات میں ساعتِ زہرہ کو تسخیرِ دل اور ساعتِ مشتری کو تسخیرِ ملوک و حکام کے لیے اللہ تعالیٰ نے مخصوص تاثر عطا فرمایا ہے۔',
      precautionRules: [
        'قمر در عقرب کے دنوں میں ہرگز محبت کا کوئی عمل نہ کیا جائے ورنہ عداوت پیدا ہو جائے گی۔',
        'غروبِ آفتاب کے فوراً بعد (ساعتِ زحل و مریخ) میں جلب کا عمل باطل ہو جاتا ہے۔'
      ],
      targetDhikrCount: 100
    },
    // -------------------------------------------------------------
    // الباب الرابع: في التكسيرات البونية وامتزاج الأسماء
    // -------------------------------------------------------------
    {
      id: 'buni-takseer-imtizaj',
      titleUrdu: 'تکسیرِ امتزاجِ اسماءِ طالب و مطلوب مع اسمائے حسنیٰ',
      chapterArabic: 'الباب الرابع: في التكسيرات الحرفية البونية وامتزاج أسماء الطالب والمطلوب',
      chapterUrdu: 'باب چہارم: تکسیراتِ بونیہ و امتزاجِ حروفِ محبت',
      category: 'takseer_buni',
      categoryUrdu: 'تکسیراتِ بونیہ',
      arabicDuaOrVerse: '﴿عَسَى اللَّهُ أَن يَجْعَلَ بَيْنَكُمْ وَبَيْنَ الَّذِينَ عَادَيْتُم مِّنْهُم مَّوَدَّةً ۚ وَاللَّهُ قَدِيرٌ ۚ وَاللَّهُ غَفُورٌ رَّحِيمٌ﴾',
      urduTranslation: 'امید ہے کہ اللہ تعالیٰ تمہارے اور ان لوگوں کے درمیان جن سے تم دشمنی رکھتے ہو محبت پیدا کر دے، اور اللہ بڑی قدرت والا ہے اور اللہ بخشنے والا مہربان ہے۔',
      abjadTotal: 3120,
      bestDayAndSaat: 'اتوار یا بدھ کی صبح بعد از نمازِ اشراق، ساعتِ شمس یا عطارد۔',
      planetaryLord: 'شمس (Sun)',
      incenseAndInk: 'زعفران، عرقِ کیوڑا اور مشک۔ بخورِ عنبر۔',
      element: 'آتشی',
      stepByStepMethod: [
        '۱. طالب کا نام مع والدہ اور مطلوب کا نام مع والدہ الگ الگ حروفِ مقطعات میں لکھیں۔',
        '۲. ان کے ساتھ اسمِ مبارک "و د و د" اور "ج ا م ع" کے حروف کو ایک ایک کر کے باہم خلط (امتزاج) کریں۔',
        '۳. تکسیرِ جمل کے ذریعے سطرِ اول سے زمام برآمد ہونے تک تکسیر چلائیں۔',
        '۴. ہر سطر کے پہلے اور آخری حرف سے موکل کا نام استخراج کریں (مثلاً: عَطْفَيَائِيل، حُبَّيَائِيل)۔',
        '۵. ان سطور کو سونے کی تختی یا سفید کاغذ پر لکھ کر پاس رکھیں اور روزانہ سطروں کے حروف کا ورد کریں۔'
      ],
      naqshType: 'مستطیلِ تکسیرِ بونیہ ۶×۶ (آتشی)',
      dimension: 6,
      naqshMatrix: [
        ['ا', 'ح', 'م', 'د', 'ف', 'ا'],
        ['ط', 'م', 'ہ', 'ع', 'ا', 'ئ'],
        ['ش', 'ہ', 'م', 'ر', 'ی', 'م'],
        ['و', 'د', 'و', 'د', 'ج', 'ا'],
        ['م', 'ع', 'ح', 'ب', 'ی', 'ب'],
        ['ل', 'ف', 'ت', 'م', 'و', 'د']
      ],
      placementRule: 'تکسیر کے خروج کو چاندی کے تعویذ میں موم جامہ کر کے اپنے گلے میں پہنیں یا دائیں بازو پر باندھیں۔',
      distantLoverRule: 'تکسیر سے حاصل ہونے والے موکلات کے ناموں کو رات بوقتِ تہجد ۱۲۱ بار پکاریں اور مطلوب کے گھر کی سمت دم کریں۔',
      buniQuotesAndNotes: 'امام البونیؒ فرماتے ہیں: علمِ تکسیر کا امتزاج وہ کیمیا ہے جو دو ارواح کو اس طرح پیوست کر دیتا ہے جیسے پانی میں دودھ مل جائے۔',
      precautionRules: [
        'تکسیر میں حروف کی غلطی نہ ہو، اگر ایک حرف چھوٹ گیا تو عمل باطل ہو جائے گا۔',
        'ناجائز عورت یا مرد پر عمل کرنے والے کا اپنا دماغ ماؤف ہو جاتا ہے۔'
      ],
      targetDhikrCount: 121
    },
    // -------------------------------------------------------------
    // الباب الخامس: في الألواح والوفوق المخمسة والمسدسة البونية
    // -------------------------------------------------------------
    {
      id: 'buni-alwah-mukhammas',
      titleUrdu: 'لوحِ مخمسِ اعظم و طلسمِ شمس و زہرہ برائے تسخیرِ عام و خاص',
      chapterArabic: 'الباب الخامس: في الألواح والوفوق المخمسة والمسدسة والتصريف بها',
      chapterUrdu: 'باب پنجم: الواحِ اعظم و نقوشِ مخمس و مسدسِ بونی',
      category: 'sacred_matrices',
      categoryUrdu: 'الواح و وفوقِ اعظم',
      arabicDuaOrVerse: '﴿وَأَلْقَيْتُ عَلَيْكَ مَحَبَّةً مِّنِّي وَلِتُصْنَعَ عَلَىٰ عَيْنِي﴾ ﴿يُحِبُّونَهُمْ كَحُبِّ اللَّهِ ۖ وَالَّذِينَ آمَنُوا أَشَدُّ حُبًّا لِّلَّهِ﴾',
      urduTranslation: 'اور میں نے اپنی طرف سے تم پر محبت ڈال دی تاکہ تمہاری پرورش میری آنکھوں کے سامنے ہو۔ وہ ان سے ایسی محبت رکھتے ہیں جیسی اللہ سے رکھنی چاہیے اور جو لوگ ایمان والے ہیں وہ اللہ سے سب سے زیادہ شدید محبت رکھتے ہیں۔',
      abjadTotal: 4215,
      bestDayAndSaat: 'جمعرات یا جمعہ، دوپہر ۱۲ بجے، ساعتِ شمس یا زہرہ۔',
      planetaryLord: 'شمس و زہرہ (Sun & Venus)',
      incenseAndInk: 'عنبر، زعفران و مشکِ سیاہ۔ بخورِ صندل و لبان۔',
      element: 'خاکی',
      stepByStepMethod: [
        '۱. تانبے یا چاندی کی تختی پر چاند کے ابتدائی ایام میں یہ مخمس کندہ کریں۔',
        '۲. مخمس کے چاروں کناروں پر چار مقرب فرشتوں (جبرائیل، میکائیل، اسرافیل، عزرائیل) کے نام لکھیں۔',
        '۳. درمیان کے خانے میں مطلوب مع والدہ اور طالب مع والدہ کے نام تحریر کریں۔',
        '۴. تختی پر ۲۱ دن متواتر سورۃ طہٰ کی آیتِ محبت ۱۱۱ بار پڑھ کر دم کریں۔',
        '۵. تختی کو اپنے پاس رکھیں، جو دیکھے گا مسخر و فریفتہ ہو گا۔'
      ],
      naqshType: 'مخمسِ اعظم بونی ۵×۵ (خاکی چال)',
      dimension: 5,
      naqshMatrix: [
        [843, 856, 834, 847, 835],
        [846, 836, 844, 855, 834],
        [854, 837, 843, 838, 843],
        [835, 845, 853, 836, 846],
        [837, 841, 851, 839, 847]
      ],
      placementRule: 'چاندی یا تانبے کی لوح بنا کر پاس رکھیں یا پاک مٹی کے نیچے مطلوب کے راستے میں دفن کریں۔',
      distantLoverRule: 'لوح کے روبرو بیٹھ کر روزانہ مغرب کے بعد آیتِ مبارکہ کا ورد کر کے مطلوب کی تصویر یا تصور پر دم کریں۔',
      buniQuotesAndNotes: 'امام البونیؒ فرماتے ہیں: لوحِ مخمسِ بونی انوارِ الٰہیہ کا وہ مخزن ہے جو دلوں کی سختی کو پگھلا کر مٹی کر دیتا ہے۔',
      precautionRules: [
        'لوح کو ناپاکی اور بے ادبی سے سختی کے ساتھ محفوظ رکھیں۔',
        'بیت الخلاء جاتے وقت گلے سے اتار کر پاک جگہ رکھیں۔'
      ],
      targetDhikrCount: 111
    },
    // -------------------------------------------------------------
    // الباب السادس: في العزائم السريانية والدعوات القرآنية
    // -------------------------------------------------------------
    {
      id: 'buni-azimat-suryani',
      titleUrdu: 'عزیمتِ سریانیہ و دعائے جلبِ سریع التاثیر (مجربِ بونی)',
      chapterArabic: 'الباب السادس: في العزائم السريانية والدعوات القرآنية المؤثرة',
      chapterUrdu: 'باب ششم: عزائم و ادعیہ سریانیہ و انوارِ قرآنیہ',
      category: 'azimat_quranic',
      categoryUrdu: 'عزائم و ادعیہ سریانیہ',
      arabicDuaOrVerse: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿أَجِبْ يَا رُوقْيَائِيلُ وَيَا جَبْرَائِيلُ بِحَقِّ طَهْطَهُوبٍ وَلَهْطَهُوبٍ وَبِحَقِّ الْعَزِيزِ الْغَفَّارِ أَلِّفْ وَاجْلِبْ قَلْبَ فُلَانَةَ إِلَى فُلَانٍ العَجَلَ السَّاعَةَ﴾',
      urduTranslation: 'اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔ اے روقیائیل اور اے جبرائیل! حق طہطہوب اور لہطہوب اور خدائے عزیز و غفار کے واسطے سے حاضر ہو اور فلاں بنت فلاں کے دل کو فلاں بن فلاں کی طرف الفت و محبت کے ساتھ کھینچ لا، جلدی اسی گھڑی۔',
      abjadTotal: 3450,
      bestDayAndSaat: 'منگل یا جمعہ کی نصف شب، ساعتِ مریخ یا زہرہ۔',
      planetaryLord: 'مریخ و زہرہ',
      incenseAndInk: 'صندلِ سرخ، حرمل (اسپند) و لوبان۔',
      element: 'آتشی',
      stepByStepMethod: [
        '۱. نصف شب کے وقت تنہائی کے کمرے میں چار زانو بیٹھیں۔',
        '۲. اپنے چاروں طرف حصارِ آیت الکرسی باندھیں۔',
        '۳. حرمل اور صندل کی دھونی کوئلوں پر ڈالیں۔',
        '۴. مذکورہ عزیمتِ سریانیہ کو ۴۱ بار جہر (بلند آواز) کے ساتھ تلاوت کریں۔',
        '۵. تلاوت کے دوران مطلوب کا چہرہ اور دل بالکل سامنے متصور رکھیں۔',
        '۶. تین راتوں میں مطلوب کے دل میں بے قراری اور شدید محبت پیدا ہو جائے گی۔'
      ],
      naqshType: 'طلسمِ حروفِ سریانیہ و آتشی مثلث',
      dimension: 3,
      naqshMatrix: [
        ['طَهْطَهُوب', 'لَهْطَهُوب', 'سَبُّوح'],
        ['قُدُّوس', 'حُبّ', 'عَزِيز'],
        ['غَفَّار', 'وَدُود', 'جَامِع']
      ],
      placementRule: 'سرخ کاغذ پر کالی سیاہی یا زعفران سے لکھ کر تیز حرارت (گرم راکھ یا چولہے کے پاس) دبائیں۔',
      distantLoverRule: 'عزیمت پڑھتے ہوئے مطلوب کے شہر کی سمت کھڑکی کھول کر تین بار تالی بجائیں اور "العجل الساعۃ" پکاریں۔',
      buniQuotesAndNotes: 'امام البونیؒ فرماتے ہیں: کلماتِ سریانیہ کی حرارت دلوں میں بجلی کی طرح سرایت کرتی ہے، لہٰذا اس کا استعمال صرف بحالتِ مجبوری و اصلاح کی جائے۔',
      precautionRules: [
        'حصار کے بغیر ہرگز یہ عزیمت نہ پڑھی جائے ورنہ رجعت کا خطرہ ہے۔',
        'خوف اور وہم کو دل میں جگہ نہ دیں۔'
      ],
      targetDhikrCount: 41
    },
    // -------------------------------------------------------------
    // الباب السابع: في إبطال سحر التفريق وحل المعقود وإصلاح النفوس
    // -------------------------------------------------------------
    {
      id: 'buni-ibtal-tafreeq',
      titleUrdu: 'ابطالِ سحرِ تفریق، کھولنا باندھے ہوئے کا اور صلحِ بین القلوب',
      chapterArabic: 'الباب السابع: في إبطال سحر التفريق والبغضاء وحل المعقود بين الأحباب',
      chapterUrdu: 'باب ہفتم: علاجِ تفریق، ابطالِ سحرِ عداوت و صلحِ حلال',
      category: 'reconciliation_breaking',
      categoryUrdu: 'ابطالِ تفریق و صلح',
      arabicDuaOrVerse: '﴿فَلَمَّا أَلْقَوْا قَالَ مُوسَىٰ مَا جِئْتُم بِهِ السِّحْرُ ۖ إِنَّ اللَّهَ سَيُبْطِلُهُ ۖ إِنَّ اللَّهَ لَا يُصْلِحُ عَمَلَ الْمُفْسِدِينَ ۝ وَيُحِقُّ اللَّهُ الْحَقَّ بِكَلِمَاتِهِ وَلَوْ كَرِهَ الْمُجْرِمُونَ﴾',
      urduTranslation: 'پس جب انہوں نے ڈالا تو موسیٰ نے فرمایا: جو کچھ تم لائے ہو جادو ہے، بے شک اللہ اسے ابھی باطل کر دے گا، اللہ فسادیوں کا کام سنورنے نہیں دیتا۔ اور اللہ اپنے کلمات سے حق کو سچ کر دکھاتا ہے اگرچہ مجرم ناپسند کریں۔',
      abjadTotal: 3890,
      bestDayAndSaat: 'بدھ یا اتوار کی صبح طلوعِ آفتاب کے بعد، ساعتِ شمس۔',
      planetaryLord: 'شمس و عطارد',
      incenseAndInk: 'عرقِ گلاب، زعفران و نمک۔ بخورِ حرمل و کافور۔',
      element: 'آبی',
      stepByStepMethod: [
        '۱. اگر کسی حاسد یا جادوگر نے میاں بیوی یا دو بھائیوں میں نفرت ڈال دی ہو تو یہ عمل تیر بہدف ہے۔',
        '۲. بارش کے پانی یا آبِ زمزم کے پیالے پر سورۃ یونس کی آیاتِ ابطالِ سحر ۷۰ بار پڑھ کر دم کریں۔',
        '۳. زیر نظر مربعِ ابطالِ سحر زعفران سے لکھ کر اس پانی میں گھولیں۔',
        '۴. متاثرہ فرد کو ۷ دن تک متواتر یہ پانی پلائیں اور تھوڑا سا پانی سر و چہرے پر چھڑکیں۔',
        '۵. تمام باندھا ہوا جادو، کالا سحر، نفرت کے تعویذات ریزہ ریزہ ہو کر باطل ہو جائیں گے اور محبت لوٹ آئے گی۔'
      ],
      naqshType: 'مربعِ ابطالِ تفریق و فتح ۴×۴ (آبی)',
      dimension: 4,
      naqshMatrix: [
        [972, 979, 978, 961],
        [977, 962, 971, 980],
        [963, 976, 981, 970],
        [983, 968, 965, 974]
      ],
      placementRule: 'پانی میں گھول کر پلائیں اور دوسرا نقش لکھ کر گھر کے صدر دروازے کے اوپر اندرونی جانب لٹکائیں۔',
      distantLoverRule: 'اگر مریض دور ہو تو اس کے نام اور تصویر پر آیاتِ ابطال پڑھ کر ۳ بار پھونکیں اور نقش بذریعہ ڈاک بھیج کر پینے کا حکم دیں۔',
      buniQuotesAndNotes: 'امام البونیؒ فرماتے ہیں: سحرِ تفریق شیطان کا سب سے بڑا ہتھیار ہے اور قرآن کی آیاتِ ابطال اس کا قطعی و ناقابلِ شکست تریاق ہیں۔',
      precautionRules: [
        'عمل کے بعد گھر میں باجماعت اذان دیں اور سورۃ البقرہ کی تلاوت چلائیں۔',
        'گھر میں کتوں، جانداروں کی تصویروں اور گانے بجانے سے مکمل پرہیز کریں۔'
      ],
      targetDhikrCount: 70
    }
  ];

  const filteredCatalog = useMemo(() => {
    return catalog.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery = !searchQuery.trim() || 
        item.titleUrdu.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.chapterUrdu.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.urduTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryUrdu.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [catalog, selectedCategory, searchQuery]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2b1022] via-[#4a1538] to-[#1a0815] p-6 sm:p-8 text-[#fae1dd] shadow-2xl border-2 border-[#ffb4a2]/40">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-[#e56b6f]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-[#b56576]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffb4a2]/20 border border-[#ffb4a2]/40 text-xs text-[#ffcad4] font-bold">
              <Sparkles className="h-3.5 w-3.5 text-[#ffb4a2]" />
              <span>مخطوطۂ نادرہ و جامع کتبِ بونیہ فی علوم المحبۃ والتسخیر</span>
            </div>
            <h1 className="font-amiri text-2xl sm:text-3xl md:text-4xl font-black text-[#ffffff] tracking-tight flex items-center gap-3">
              <Heart className="h-8 w-8 text-[#e56b6f] animate-pulse shrink-0 fill-[#e56b6f]/30" />
              <span>كتاب سحر العشاق وجنة المشتاق فى جلب الحبيب</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#ffcad4] leading-relaxed">
              تصنیفِ جلیل: <strong>حضرت الشیخ الإمام احمد بن علی البونی (رحمہ اللہ)</strong> | اردو ترجمہ، جامع ابواب، نقوش، تکسیرات، الواحِ سبعہ، عزائمِ سریانیہ اور شرعی ضوابطِ الفت و تسخیرِ قلوب
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setActiveSubTab('talib_matloob_calculator')}
              className="px-4 py-2 rounded-xl bg-[#e56b6f] hover:bg-[#b56576] text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer transform hover:scale-105"
            >
              <Users className="h-4 w-4" />
              <span>محاسبِ طالب و مطلوب</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-[#ffb4a2]/20 hover:bg-[#ffb4a2]/30 border border-[#ffb4a2]/40 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>پرنٹ / محفوظ</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="mt-6 pt-4 border-t border-[#ffb4a2]/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'catalog', label: 'تمام ابواب و عملیاتِ بونی', icon: BookOpen },
              { id: 'talib_matloob_calculator', label: 'محاسبِ امتزاجِ طالب و مطلوب', icon: Users },
              { id: 'takseer_merger', label: 'تکسیرِ بونیہ و استخراجِ اعوان', icon: Flame },
              { id: 'rules_sharia', label: 'شرعی حدود و اخلاقی ضوابط', icon: ShieldCheck },
              { id: 'live_tasbih', label: 'کاؤنٹر برائے عزائم و ورد', icon: Activity }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeSubTab === tab.id
                      ? 'bg-[#e56b6f] text-white shadow-md ring-2 ring-[#ffb4a2]/40'
                      : 'bg-[#3d162d]/80 text-[#ffcad4] hover:bg-[#521e3d] border border-[#ffb4a2]/20'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-[#ffcad4]/80 hidden lg:flex items-center gap-1 font-amiri">
            <span>کل ابواب: ۷ | اعمال: {catalog.length} | مکمل اردو شرح</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 1: CATALOG OF ALL CHAPTERS & OPERATIONS */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'catalog' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="p-4 rounded-2xl bg-white border border-[#ffb4a2]/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#b56576]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="تلاش کریں: الفت، زوجین، تکسیر، موکل، لوح..."
                className="w-full pr-10 pl-4 py-2 rounded-xl bg-[#fff5f5] border border-[#ffb4a2]/50 text-xs text-[#4a1538] placeholder-[#b56576]/60 focus:outline-none focus:ring-2 focus:ring-[#e56b6f]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <Filter className="h-4 w-4 text-[#b56576] shrink-0" />
              {[
                { id: 'all', label: 'تمام ابواب' },
                { id: 'rules_retreat', label: 'باب اول: قواعد و موکلات' },
                { id: 'halal_affection', label: 'باب دوم: الفتِ زوجین' },
                { id: 'astrology_incense', label: 'باب سوم: ساعات و بخور' },
                { id: 'takseer_buni', label: 'باب چہارم: تکسیراتِ بونی' },
                { id: 'sacred_matrices', label: 'باب پنجم: الواحِ مخمس' },
                { id: 'azimat_quranic', label: 'باب ششم: عزائم سریانیہ' },
                { id: 'reconciliation_breaking', label: 'باب ہفتم: ابطالِ تفریق' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#e56b6f] text-white shadow-sm'
                      : 'bg-[#fff0f3] text-[#6d1b46] hover:bg-[#ffe5ec]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Amaliyat */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCatalog.map(item => (
              <div
                key={item.id}
                className="rounded-2xl bg-white border border-[#ffb4a2]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-[#e56b6f]"
              >
                <div className="p-5 space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#ffe5ec] text-[#a01a58] border border-[#ffb4a2]/50">
                      {item.categoryUrdu}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#f8f9fa] text-[#6c757d] border border-gray-200">
                      طبع: {item.element} | عدد: {item.abjadTotal}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <span className="text-[11px] font-bold text-[#b56576] block mb-1 font-amiri">
                      {item.chapterUrdu}
                    </span>
                    <h3 className="font-amiri text-lg font-bold text-[#4a1538] group-hover:text-[#e56b6f] transition-colors leading-snug">
                      {item.titleUrdu}
                    </h3>
                  </div>

                  {/* Arabic Dua Preview Box */}
                  <div className="p-3 rounded-xl bg-[#fff5f5] border border-[#ffcad4] text-right space-y-1">
                    <p className="font-amiri font-bold text-xs text-[#590d22] line-clamp-2 leading-relaxed" dir="rtl">
                      {item.arabicDuaOrVerse}
                    </p>
                    <p className="text-[11px] text-[#800f2f] line-clamp-2 italic">
                      {item.urduTranslation}
                    </p>
                  </div>

                  {/* Timing & Incense Meta */}
                  <div className="space-y-1.5 text-xs text-[#590d22] bg-[#fff0f3]/50 p-2.5 rounded-xl border border-[#ffccd5]/40">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#e56b6f] shrink-0" />
                      <span className="font-bold">وقت و ساعت:</span>
                      <span className="text-[11px] text-gray-700 truncate">{item.bestDayAndSaat}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flame className="h-3.5 w-3.5 text-[#b56576] shrink-0" />
                      <span className="font-bold">بخور و سیاہی:</span>
                      <span className="text-[11px] text-gray-700 truncate">{item.incenseAndInk}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 bg-[#fff5f5] border-t border-[#ffccd5]/50 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedAmal(item)}
                    className="flex-1 py-2 rounded-xl bg-[#e56b6f] hover:bg-[#b56576] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>مکمل طریقہ و نقش دیکھیں</span>
                  </button>

                  {onSendToNaqsh && (
                    <button
                      onClick={() => onSendToNaqsh(item.abjadTotal)}
                      className="p-2 rounded-xl bg-white hover:bg-[#ffe5ec] border border-[#ffb4a2] text-[#e56b6f] hover:text-[#590d22] transition-colors cursor-pointer"
                      title="مولد النقوش میں عدد بھیجیں"
                    >
                      <Layers className="h-4 w-4" />
                    </button>
                  )}
                  {onSendToTakseer && (
                    <button
                      onClick={() => onSendToTakseer(item.titleUrdu)}
                      className="p-2 rounded-xl bg-white hover:bg-[#ffe5ec] border border-[#ffb4a2] text-[#b56576] hover:text-[#590d22] transition-colors cursor-pointer"
                      title="تکسیر اسٹوڈیو میں بھیجیں"
                    >
                      <Flame className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 2: INTERACTIVE SEEKER (TALIB) & DESIRED (MATLOOB) CALCULATOR */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'talib_matloob_calculator' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border-2 border-[#ffb4a2]/50 shadow-md space-y-6">
            <div className="flex items-center gap-3 border-b border-[#ffccd5] pb-4">
              <div className="p-3 rounded-2xl bg-[#ffe5ec] text-[#e56b6f]">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-amiri text-xl font-bold text-[#4a1538]">
                  محاسبِ اعداد و امتزاجِ اسماءِ طالب و مطلوب (قاعدۂ امام البونیؒ)
                </h3>
                <p className="text-xs text-[#800f2f]">
                  طالب اور مطلوب کے نام مع والدہ داخل کر کے خودکار ابجدی حساب، مناسب اسمائے حسنیٰ کا انتخاب اور مشترکہ نقش تیار کریں۔
                </p>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#4a1538] block">نامِ طالب (طالب کا نام):</label>
                <input
                  type="text"
                  value={talibName}
                  onChange={(e) => setTalibName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff5f5] border border-[#ffb4a2] text-sm text-[#4a1538] focus:outline-none focus:ring-2 focus:ring-[#e56b6f] font-bold"
                  placeholder="مثلاً: احمد"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#4a1538] block">والدۂ طالب (طالب کی والدہ):</label>
                <input
                  type="text"
                  value={talibMother}
                  onChange={(e) => setTalibMother(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff5f5] border border-[#ffb4a2] text-sm text-[#4a1538] focus:outline-none focus:ring-2 focus:ring-[#e56b6f] font-bold"
                  placeholder="مثلاً: فاطمہ"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#4a1538] block">نامِ مطلوب (جس سے الفت مقصود ہو):</label>
                <input
                  type="text"
                  value={matloobName}
                  onChange={(e) => setMatloobName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff5f5] border border-[#ffb4a2] text-sm text-[#4a1538] focus:outline-none focus:ring-2 focus:ring-[#e56b6f] font-bold"
                  placeholder="مثلاً: عائشہ"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#4a1538] block">والدۂ مطلوب (مطلوب کی والدہ):</label>
                <input
                  type="text"
                  value={matloobMother}
                  onChange={(e) => setMatloobMother(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff5f5] border border-[#ffb4a2] text-sm text-[#4a1538] focus:outline-none focus:ring-2 focus:ring-[#e56b6f] font-bold"
                  placeholder="مثلاً: مریم"
                />
              </div>
            </div>

            {/* Selection of Intent */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#4a1538] block">نیت و مقصدِ عمل (شرعی حلال مقصد):</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  'الفت و مودتِ شرعی و محبتِ فی اللہ',
                  'اصلاحِ ذات البین و رفعِ ناچاقیِ زوجین',
                  'تسخیرِ قلوب برائے رشۃ و عقدِ نکاح'
                ].map(phrase => (
                  <button
                    key={phrase}
                    onClick={() => setSelectedIntentPhrase(phrase)}
                    className={`p-3 rounded-xl text-xs font-bold text-right border transition-all cursor-pointer ${
                      selectedIntentPhrase === phrase
                        ? 'bg-[#ffe5ec] border-[#e56b6f] text-[#590d22] shadow-xs'
                        : 'bg-[#fff5f5] border-[#ffccd5] text-[#800f2f] hover:bg-[#fff0f3]'
                    }`}
                  >
                    {phrase}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#ffccd5]">
              <div className="p-4 rounded-2xl bg-[#fff0f3] border border-[#ffccd5] text-center space-y-1">
                <span className="text-xs font-bold text-[#800f2f]">مجموعہ عددِ طالب:</span>
                <p className="font-amiri text-2xl font-black text-[#590d22]">{calculatedValues.talibAdad}</p>
                <span className="text-[11px] text-[#a01a58]">{talibName} بن {talibMother}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#fff0f3] border border-[#ffccd5] text-center space-y-1">
                <span className="text-xs font-bold text-[#800f2f]">مجموعہ عددِ مطلوب:</span>
                <p className="font-amiri text-2xl font-black text-[#590d22]">{calculatedValues.matloobAdad}</p>
                <span className="text-[11px] text-[#a01a58]">{matloobName} بنت {matloobMother}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#ffe5ec] border border-[#e56b6f] text-center space-y-1 shadow-sm">
                <span className="text-xs font-bold text-[#590d22]">کل میزان مع اسمائے حسنیٰ:</span>
                <p className="font-amiri text-3xl font-black text-[#e56b6f]">{calculatedValues.totalCombined}</p>
                <span className="text-[11px] text-[#800f2f]">شامل: یا ودود (۲۰) + یا جامع (۱۱۴)</span>
              </div>
            </div>

            {/* Suggested Takseer & Direct Send */}
            <div className="p-5 rounded-2xl bg-[#2b1022] text-[#fae1dd] border border-[#ffb4a2]/40 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-amiri text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#ffb4a2]" />
                    <span>سطرِ امتزاج برائے تکسیرِ بونیہ:</span>
                  </h4>
                  <p className="text-xs text-[#ffcad4]">
                    یہ امتزاجی سطر طالب اور مطلوب کے حروف کو گوندھ کر تیار کی گئی ہے۔
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {onSendToTakseer && (
                    <button
                      onClick={() => onSendToTakseer(calculatedValues.takseerSeed)}
                      className="px-4 py-2 rounded-xl bg-[#e56b6f] hover:bg-[#b56576] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                    >
                      <Flame className="h-4 w-4" />
                      <span>تکسیر اسٹوڈیو میں بھیجیں</span>
                    </button>
                  )}
                  {onSendToNaqsh && (
                    <button
                      onClick={() => onSendToNaqsh(calculatedValues.totalCombined)}
                      className="px-4 py-2 rounded-xl bg-white hover:bg-[#ffcad4] text-[#4a1538] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                    >
                      <Layers className="h-4 w-4" />
                      <span>نقش جنریٹر میں بھیجیں</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#4a1538] border border-[#ffb4a2]/30 flex items-center justify-between">
                <span className="font-amiri text-lg tracking-widest text-[#ffcad4] font-bold">
                  {calculatedValues.takseerSeed}
                </span>
                <button
                  onClick={() => handleCopy(calculatedValues.takseerSeed, 'takseerSeed')}
                  className="px-3 py-1 rounded-lg bg-[#e56b6f]/30 hover:bg-[#e56b6f]/50 text-white text-xs flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === 'takseerSeed' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedId === 'takseerSeed' ? 'کاپی شدہ' : 'کاپی'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 3: TAKSEER MERGER & KASHF EXPLAINER */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'takseer_merger' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#ffb4a2]/50 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-[#ffccd5] pb-4">
              <div className="p-3 rounded-2xl bg-[#ffe5ec] text-[#e56b6f]">
                <Flame className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-amiri text-xl font-bold text-[#4a1538]">
                  اسرارِ تکسیراتِ بونیہ و استخراجِ اعوان و موکلاتِ محبت
                </h3>
                <p className="text-xs text-[#800f2f]">
                  کتاب سحر العشاق سے ماخوذ تکسیرِ جمل، تکسیرِ امتزاج اور سطرِ زمام سے موکل کے استخراج کا مستند بونی طریقہ کار۔
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 p-5 rounded-2xl bg-[#fff5f5] border border-[#ffccd5]">
                <h4 className="font-amiri text-base font-bold text-[#590d22] flex items-center gap-2">
                  <FlameKindling className="h-5 w-5 text-[#e56b6f]" />
                  <span>طریقۂ امتزاجِ حروف (حرفاً بحرف):</span>
                </h4>
                <p className="text-xs text-[#590d22] leading-relaxed">
                  امام البونیؒ فرماتے ہیں: سب سے پہلے طالب کا پہلا حرف لکھیں، پھر مطلوب کا پہلا حرف، پھر طالب کا دوسرا، پھر مطلوب کا دوسرا۔ اس کے بعد اسمِ مبارک "یا ودود" اور "یا جامع" کے حروف کو درمیان میں پیوست کریں۔
                </p>
                <div className="p-3 rounded-xl bg-white border border-[#ffccd5] font-amiri text-sm text-[#800f2f] text-center font-bold">
                  مثال: ا + ع + ح + ا + م + ئ + د + ش + ہ + و + د + ج + ا + م + ع
                </div>
                <p className="text-[11px] text-gray-600">
                  جب تکسیر مکمل ہو کر واپس سطرِ اول کی صورت اختیار کر لے تو اسے "زمام" کہتے ہیں، جو کہ عمل کی روح اور قبولیت کی علامت ہے۔
                </p>
              </div>

              <div className="space-y-4 p-5 rounded-2xl bg-[#fff5f5] border border-[#ffccd5]">
                <h4 className="font-amiri text-base font-bold text-[#590d22] flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#e56b6f]" />
                  <span>استخراجِ اسمائے موکلات و اعوان:</span>
                </h4>
                <p className="text-xs text-[#590d22] leading-relaxed">
                  سطرِ تکسیر کے پہلے حرف، درمیانی حرف اور آخری حرف کو لے کر اس کے آخر میں کلمۂ "يَائِيل" یا "طَيْش" کا اضافہ کیا جاتا ہے، جس سے اس عمل کا نوری موکل اور عون پیدا ہوتا ہے۔
                </p>
                <div className="p-3 rounded-xl bg-[#ffe5ec] border border-[#e56b6f] text-center space-y-1">
                  <span className="text-xs font-bold text-[#590d22]">موکلِ محبتِ بونی:</span>
                  <p className="font-amiri text-xl font-black text-[#e56b6f]">عَطْفَيَائِيل & حُبَّيَائِيل</p>
                  <span className="text-[11px] text-[#800f2f]">زجر: أَجِبْ يَا عَطْفَيَائِيلُ بِحَقِّ الْوَدُودِ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 4: SHARIA BOUNDARIES & ETHICAL RULES */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'rules_sharia' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border-2 border-red-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-red-100 pb-4">
              <div className="p-3 rounded-2xl bg-red-50 text-red-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-amiri text-xl font-bold text-red-900">
                  شرعی حدود، اخلاقی انتباہ اور کتبِ بونیہ کے محتاط ضوابط
                </h3>
                <p className="text-xs text-red-700">
                  امام احمد بن علی البونیؒ کا دو ٹوک فتویٰ اور سحر العشاق کے جائز و ناجائز مقاصد کا شرعی بیان
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                <h4 className="font-amiri text-base font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span>اعمالِ جائز و مستحب (حلال مقاصد):</span>
                </h4>
                <ul className="space-y-2 text-xs text-emerald-950 pr-4 list-disc">
                  <li>میاں اور بیوی کے درمیان محبت، الفت اور گھریلو ناچاقی کا خاتمہ۔</li>
                  <li>رشتہ اور نکاح کے لیے والدین اور فریقین کے دلوں میں باہمی موافقت پیدا کرنا۔</li>
                  <li>ناراض شوہر یا بیوی کو واپس گھر لانا اور طلاق سے بچانا۔</li>
                  <li>بھائیوں، بہنوں اور خونی رشتوں کے درمیان بغض و عناد ختم کرنا۔</li>
                  <li>سحرِ تفریق اور بندش کے اثرات کو قرآن و اسماء کے ذریعے جڑ سے ختم کرنا۔</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                <h4 className="font-amiri text-base font-bold text-rose-900 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-rose-600" />
                  <span>اعمالِ حرام و ممنوعہ (سخت گناہ و وبال):</span>
                </h4>
                <ul className="space-y-2 text-xs text-rose-950 pr-4 list-disc">
                  <li>کسی غیر محرم عورت یا مرد کو ناجائز شہوت یا زنا کی غرض سے مسخر کرنا۔</li>
                  <li>پہلے سے خوشحال میاں بیوی کے درمیان تفریق ڈال کر دوسرے کو اپنی طرف مائل کرنا۔</li>
                  <li>کسی کی مرضی کے خلاف ناجائز تسلط یا بلیک میلنگ کا ارادہ رکھنا۔</li>
                  <li>نجس اشیاء یا غیر شرعی سحری طریقوں کا استعمال کرنا۔</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs leading-relaxed">
              <strong>وصیتِ امام بونیؒ:</strong> "ہماری اس کتاب سے وہی شخص فائدہ اٹھا سکتا ہے جو متقی، پرہیزگار، نماز کا پابند اور خوفِ خدا رکھنے والا ہو۔ جو شخص اسے کسی مسلمان پر ظلم یا ناجائز ہوس کے لیے استعمال کرے گا، اللہ کا قہر اور اس کے فرشتوں کی لعنت اس پر ہو گی اور اس کا اپنا گھر برباد ہو جائے گا۔"
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 5: LIVE AZIMAT & TASBIH COUNTER */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'live_tasbih' && (
        <div className="p-6 rounded-3xl bg-white border border-[#ffb4a2]/50 shadow-sm space-y-6 text-center max-w-xl mx-auto">
          <div className="p-4 rounded-2xl bg-[#ffe5ec] text-[#e56b6f] inline-block">
            <Activity className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-amiri text-2xl font-bold text-[#4a1538]">
              شمار کنندۂ عزائم و ادعیۂ محبت (Live Dhikr Counter)
            </h3>
            <p className="text-xs text-[#800f2f] mt-1">
              اسمِ مبارک "یا ودود یا جامع" یا منتخب عزیمت کی تلاوت کے لیے خودکار کاؤنٹر
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#fff5f5] border-2 border-[#ffccd5] space-y-4">
            <div className="text-6xl font-black text-[#e56b6f] font-amiri tracking-wider">
              {tasbihCount} / <span className="text-2xl text-gray-400">{targetCount}</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#e56b6f] h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (tasbihCount / targetCount) * 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setTasbihCount(prev => prev + 1)}
                className="px-8 py-4 rounded-2xl bg-[#e56b6f] hover:bg-[#b56576] text-white text-lg font-bold shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                + شمار کریں (Tap)
              </button>
              <button
                onClick={() => setTasbihCount(0)}
                className="p-4 rounded-2xl bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 transition-colors cursor-pointer"
                title="ری سیٹ کریں"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            {[33, 41, 100, 313, 1000].map(cnt => (
              <button
                key={cnt}
                onClick={() => { setTargetCount(cnt); setTasbihCount(0); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                  targetCount === cnt
                    ? 'bg-[#e56b6f] text-white border-[#e56b6f]'
                    : 'bg-white text-[#4a1538] border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cnt} مرتبہ
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* DETAILED AMAL MODAL */}
      {/* ------------------------------------------------------------- */}
      {selectedAmal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#ffb4a2] shadow-2xl p-6 sm:p-8 space-y-6 text-[#2c1e14] relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedAmal(null)}
              className="absolute top-4 left-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="space-y-1 border-b border-[#ffccd5] pb-4">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ffe5ec] text-[#e56b6f]">
                {selectedAmal.chapterUrdu}
              </span>
              <h2 className="font-amiri text-2xl sm:text-3xl font-bold text-[#4a1538]">
                {selectedAmal.titleUrdu}
              </h2>
              <p className="text-xs text-[#800f2f] font-amiri">
                {selectedAmal.chapterArabic}
              </p>
            </div>

            {/* Arabic Box */}
            <div className="p-4 rounded-2xl bg-[#fff0f3] border border-[#ffccd5] space-y-2 text-right">
              <span className="text-xs font-bold text-[#b56576] block">آیتِ مبارکہ / دعا / عزیمت:</span>
              <p className="font-amiri font-bold text-base sm:text-lg text-[#590d22] leading-relaxed" dir="rtl">
                {selectedAmal.arabicDuaOrVerse}
              </p>
              <p className="text-xs text-[#800f2f] pt-2 border-t border-[#ffccd5]/60">
                <strong>ترجمہ:</strong> {selectedAmal.urduTranslation}
              </p>
            </div>

            {/* Metadata Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-gray-500 block">کل عدد:</span>
                <strong className="text-sm font-amiri text-[#4a1538]">{selectedAmal.abjadTotal}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-gray-500 block">عنصر و طبع:</span>
                <strong className="text-sm text-[#4a1538]">{selectedAmal.element}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-gray-500 block">سیارہ و ساعت:</span>
                <strong className="text-sm text-[#4a1538]">{selectedAmal.planetaryLord}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-gray-500 block">تعدادِ ورد:</span>
                <strong className="text-sm text-[#4a1538]">{selectedAmal.targetDhikrCount} بار</strong>
              </div>
            </div>

            {/* Step by step method */}
            <div className="space-y-3">
              <h4 className="font-amiri text-lg font-bold text-[#4a1538] flex items-center gap-2">
                <Feather className="h-5 w-5 text-[#e56b6f]" />
                <span>طریقۂ عمل و قواعدِ کتابت:</span>
              </h4>
              <div className="space-y-2">
                {selectedAmal.stepByStepMethod.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#fff5f5] border border-[#ffccd5] text-xs text-[#590d22] leading-relaxed">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Naqsh Visualizer */}
            <div className="space-y-3">
              <h4 className="font-amiri text-lg font-bold text-[#4a1538] flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#e56b6f]" />
                <span>نقش و لوحِ بونی ({selectedAmal.naqshType}):</span>
              </h4>
              <div className="p-4 rounded-2xl bg-[#2b1022] border border-[#ffb4a2]/40 flex justify-center">
                <div
                  className="grid gap-1 bg-[#ffb4a2] p-2 rounded-xl shadow-inner max-w-sm w-full"
                  style={{ gridTemplateColumns: `repeat(${selectedAmal.dimension}, minmax(0, 1fr))` }}
                >
                  {selectedAmal.naqshMatrix.map((row, rIdx) =>
                    row.map((cell, cIdx) => (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className="bg-[#fff5f5] aspect-square flex items-center justify-center p-1 rounded-lg text-center font-amiri font-bold text-xs sm:text-sm text-[#4a1538] border border-[#ffccd5]"
                      >
                        {cell}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Placement & Distant Rules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <strong className="text-amber-900 block font-bold">جگہ و طریقۂ استعمال:</strong>
                <p className="text-amber-800">{selectedAmal.placementRule}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1">
                <strong className="text-indigo-900 block font-bold">اگر مطلوب دور یا پردیس میں ہو:</strong>
                <p className="text-indigo-800">{selectedAmal.distantLoverRule}</p>
              </div>
            </div>

            {/* Quotes of Al-Buni */}
            <div className="p-4 rounded-2xl bg-[#fff0f3] border border-[#e56b6f] text-xs text-[#590d22] italic">
              <strong>ارشادِ امام بونیؒ:</strong> "{selectedAmal.buniQuotesAndNotes}"
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setSelectedAmal(null)}
                className="px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold cursor-pointer"
              >
                بند کریں
              </button>

              <div className="flex items-center gap-2">
                {onSendToNaqsh && (
                  <button
                    onClick={() => {
                      onSendToNaqsh(selectedAmal.abjadTotal);
                      setSelectedAmal(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#e56b6f] hover:bg-[#b56576] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Layers className="h-4 w-4" />
                    <span>نقش جنریٹر میں کھولیں</span>
                  </button>
                )}
                {onSendToTakseer && (
                  <button
                    onClick={() => {
                      onSendToTakseer(selectedAmal.titleUrdu);
                      setSelectedAmal(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#4a1538] hover:bg-[#2b1022] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Flame className="h-4 w-4" />
                    <span>تکسیر اسٹوڈیو میں کھولیں</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
