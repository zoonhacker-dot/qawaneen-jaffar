import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
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
  Lock,
  Atom,
  Shield,
  Feather,
  RefreshCw,
  Anchor,
  FlameKindling,
  Crosshair,
  Heart,
  Eye,
  TestTube2,
  Wind
} from 'lucide-react';

export interface IbnSinaAmalItem {
  id: string;
  titleUrdu: string;
  scienceBranch: 'kimiya' | 'limiya' | 'heemiya' | 'seemiya' | 'reemiya';
  scienceBranchUrdu: string;
  bookChapterUrdu: string;
  ancientFormulaOrAzimat: string;
  urduExplanationAndSecret: string;
  abjadTotal: number;
  planetaryAssociation: string;
  bestPlanetaryHour: string;
  element: 'آتشی' | 'بادی' | 'آبی' | 'خاکی';
  incenseAndOils: string;
  stepByStepRitual: string[];
  talismanType: string;
  dimension: number;
  talismanMatrix: (number | string)[][];
  inscribingMedium: string;
  distantInfluenceMethod: string;
  ibnSinaSecretAdvice: string;
  strictPrecautions: string[];
  targetAzimatCount: number;
}

interface MujarrabatIbnSinaStudioProps {
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
}

export const MujarrabatIbnSinaStudio: React.FC<MujarrabatIbnSinaStudioProps> = ({
  onSendToNaqsh,
  onSendToTakseer
}) => {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAmal, setSelectedAmal] = useState<IbnSinaAmalItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'five_sciences_explorer' | 'planetary_plates_7' | 'talisman_breaker' | 'live_azimat'>('catalog');
  
  // Live Azimat Counter
  const [azimatCount, setAzimatCount] = useState<number>(0);
  const [targetCount, setTargetCount] = useState<number>(100);

  // Five Sciences Calculator
  const [personName, setPersonName] = useState<string>('حسین');
  const [motherName, setMotherName] = useState<string>('زینب');
  const [selectedIntentType, setSelectedIntentType] = useState<string>('محبت و تسخیرِ قلوب');

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

  const fiveSciencesAnalysis = useMemo(() => {
    const total = calculateAbjad(`${personName} ${motherName}`);
    const rem4 = total % 4;
    const elements: Array<'آتشی' | 'بادی' | 'آبی' | 'خاکی'> = ['آتشی', 'بادی', 'آبی', 'خاکی'];
    const dominantElement = elements[rem4];
    
    // Recommended Science based on Abjad
    const sciences = [
      { name: 'علمِ لیمیا (طلسمات و تسخیرات)', desc: 'تسخیرِ کواکب و ارواحِ فلکی برائے جلبِ منافع' },
      { name: 'علمِ ہیمیا (احضارات و مسحور)', desc: 'احضاراتِ ارواح و تسخیرِ جنات و عجائب' },
      { name: 'علمِ سیمیا (حروف و طلسماتِ اعجاب)', desc: 'علمِ حروف، تکسیر و طلسماتِ بصری و قلبی' },
      { name: 'علمِ کيمیا (اکسیر و تقلیبِ طبائع)', desc: 'کیمیاگری و تبدیلِ مزاج و باطل کردن سحر' }
    ];
    const recommendedSci = sciences[total % 4];

    return {
      total,
      dominantElement,
      recommendedSci,
      angelicRuler: 'عَطْفَيَائِيل',
      planet: ['شمس', 'قمر', 'مریخ', 'عطارد', 'مشتری', 'زہرہ', 'زحل'][total % 7]
    };
  }, [personName, motherName]);

  // Complete Catalog of Authentic Operations & Talismans from "Majmu'ah-e Kamil Uloom-e Gharibah Mujarrabat-e Ibn Sina"
  const catalog: IbnSinaAmalItem[] = [
    // -------------------------------------------------------------
    // ۱. علمِ سیمیا: طلسماتِ حروف، اشکال و دعای مہر و محبت
    // -------------------------------------------------------------
    {
      id: 'ibnsina-seemiya-mehr-mohabbat',
      titleUrdu: 'دعائے مہر و محبتِ قاطع و طلسمِ تسخیرِ قلوب (علمِ سیمیا)',
      scienceBranch: 'seemiya',
      scienceBranchUrdu: 'علمِ سيميا (طلسماتِ حروف و قلوب)',
      bookChapterUrdu: 'فصل اول: در دعای مہر و محبت، عقد القلوب و تسخیرِ خلائق',
      ancientFormulaOrAzimat: '﴿يَا وَدُودُ يَا رَؤُوفُ يَا ذَا الْعَرْشِ الْمَجِيدِ﴾ ﴿سَخِّرْ لِي قُلُوبَ بَنِي آدَمَ وَبَنَاتِ حَوَّاءَ بِحَقِّ هَذِهِ الطَّلَاسِمِ وَالْأَسْمَاءِ الْعِظَامِ﴾',
      urduExplanationAndSecret: 'علمِ سیمیا کے مطابق انسان کے قلب پر حروف کے انوار کا گہرا عکس پڑتا ہے۔ یہ طلسم دو دلوں کے درمیان کی الفت کو مقناطیس کی طرح جوڑ دیتا ہے۔',
      abjadTotal: 1840,
      bestPlanetaryHour: 'جمعہ کے دن بوقتِ طلوعِ آفتاب (ساعتِ زہرہ)',
      planetaryAssociation: 'زہرہ (Venus)',
      element: 'آتشی',
      incenseAndOils: 'زعفران، عرقِ گلاب، مشکِ خالص، بخورِ صندلِ سفید و عود۔',
      stepByStepRitual: [
        '۱. جمعہ کے دن بوقتِ فجر طہارتِ کاملہ کے بعد سفید یا گلابی ریشمی کپڑے پر یہ طلسم تحریر کریں۔',
        '۲. لکھنے میں زعفران اور عرقِ گلاب کی روشنائی استعمال کریں۔',
        '۳. طلسم کے نیچے طالب و مطلوب کا نام مع والدہ تحریر کریں۔',
        '۴. اسمِ "یا ودود" کا ۱۰۰۱ بار ورد کریں اور طلسم پر دم کریں۔',
        '۵. نقش کو چنبیلی کے تیل میں چراغ کی بتی بنا کر بوقتِ شب جلائیں یا موم جامہ کر کے پاس رکھیں۔'
      ],
      talismanType: 'مثلثِ مہر و محبت ۳×۳ (آتشی چال)',
      dimension: 3,
      talismanMatrix: [
        [614, 607, 617],
        [613, 'مہر و محبت', 615],
        [611, 616, 612]
      ],
      inscribingMedium: 'سفید کاغذ یا ریشمی کپڑے پر زعفران و مشک سے۔',
      distantInfluenceMethod: 'اگر مطلوب دور دراز ہو تو روزانہ رات کو مطلوب کے گھر کی سمت رخ کر کے اسم "یا ودود یا حبیب" ۳۱۳ بار پڑھ کر پھونکیں۔',
      ibnSinaSecretAdvice: 'شیخ الرئیس ابن سینا فرماتے ہیں: محبت کے حروف کو جب آتشی چال سے پر کیا جائے تو ان کی گرمی مطلوب کے خون میں گردش کرنے لگتی ہے۔',
      strictPrecautions: [
        'یہ عمل صرف جائز و شرعی محبت (زوجین و صلح) کے لیے حلال ہے۔',
        'ناجائز مقصد کے لیے استعمال کرنے پر دل کے امراض لاحق ہونے کا اندیشہ ہے۔'
      ],
      targetAzimatCount: 1001
    },

    // -------------------------------------------------------------
    // ۲. علمِ ہیمیا: احضاراتِ جن و تسخیرِ ارواحِ طیبہ
    // -------------------------------------------------------------
    {
      id: 'ibnsina-heemiya-ihzarat-jinn',
      titleUrdu: 'احضاراتِ ارواح و تسخیرِ جنیان و کشفِ امورِ خفیہ (علمِ ہیمیا)',
      scienceBranch: 'heemiya',
      scienceBranchUrdu: 'علمِ ہيميا (احضارات و تسخیرِ جن)',
      bookChapterUrdu: 'فصل دوم: در احضاراتِ ارواح، تسخیرِ جن و کشفِ حقائقِ مکتومہ',
      ancientFormulaOrAzimat: '﴿بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ﴾ ﴿أَقْسَمْتُ عَلَيْكُمْ يَا مَعْشَرَ الرُّوحَانِيَّةِ بِالْأَسْمَاءِ الْعِبْرَانِيَّةِ وَالسُّرْيَانِيَّةِ أَنْ تُجِيبُوا وَتَحْضُرُوا طَائِعِينَ﴾',
      urduExplanationAndSecret: 'علمِ ہیمیا کے قواعد کے تحت ارواحِ علویہ اور موکلین کو ریاضت اور مخصوص بخورات کے ذریعے مسخر کر کے غیبی معاملات میں نصرت حاصل کی جاتی ہے۔',
      abjadTotal: 3260,
      bestPlanetaryHour: 'پیر یا جمعرات کی نصف شب (ساعتِ قمر یا مشتری)',
      planetaryAssociation: 'قمر و مشتری (Moon & Jupiter)',
      element: 'بادی',
      incenseAndOils: 'لوبانِ نر، لادن، صندل سرخ اور حرمل (اسپند)۔',
      stepByStepRitual: [
        '۱. تنہائی کے پاک کمرے میں ۴ زانو بیٹھ کر چاروں طرف حصارِ آیت الکرسی کھینچیں۔',
        '۲. بخورِ لوبان کوئلوں پر ڈالیں تاکہ کمرہ معطر ہو جائے۔',
        '۳. لوحِ احضارِ ابن سینا کو سامنے رکھیں اور ۷۰ بار عزیمتِ احضار پڑھیں۔',
        '۴. پڑھائی کے دوران دل میں کسی قسم کا خوف نہ لائیں۔',
        '۵. موکل حاضر ہو کر سلام کرے گا اور جو بھی جائز سوال یا کام سونپیں گے پورا کرے گا۔'
      ],
      talismanType: 'مربعِ احضار و تسخیر ۴×۴ (بادی)',
      dimension: 4,
      talismanMatrix: [
        [815, 822, 821, 804],
        [820, 805, 814, 823],
        [806, 819, 824, 813],
        [826, 811, 808, 817]
      ],
      inscribingMedium: 'چاندی کی تختی پر کندہ کریں یا سفید کاغذ پر کافور سے لکھیں۔',
      distantInfluenceMethod: 'کسی دور کے مقام سے سچائی معلوم کرنے کے لیے موکل کو اس جگہ روانہ کرنے کی نیت سے عزیمت ۳ بار پڑھیں۔',
      ibnSinaSecretAdvice: 'ابن سیناؒ فرماتے ہیں: ارواح کا تعلق لطافت سے ہے، جب تک عامل کا باطن کثافتِ گناہ اور شک سے پاک نہ ہو، احضار ممکن نہیں۔',
      strictPrecautions: [
        'حصار کے بغیر ہرگز احضار کا عمل نہ کریں۔',
        'عمل کے اختتام پر انصراف کی دعا پڑھ کر موکل کو رخصت کرنا لازمی ہے۔'
      ],
      targetAzimatCount: 70
    },

    // -------------------------------------------------------------
    // ۳. علمِ لیمیا: تسخیراتِ کواکب و الواحِ سبعہ فلکی
    // -------------------------------------------------------------
    {
      id: 'ibnsina-limiya-taskheer-kawakib',
      titleUrdu: 'تسخیراتِ کواکبِ سبعہ و لوحِ شمس و مشتری برائے جاہ و جلال (علمِ لیمیا)',
      scienceBranch: 'limiya',
      scienceBranchUrdu: 'علمِ ليميا (تسخیراتِ کواکب و طلسمات)',
      bookChapterUrdu: 'فصل سوم: در تسخیراتِ کواکب و الواحِ فلکیہ برائے ہیبت و فتح',
      ancientFormulaOrAzimat: '﴿الشَّمْسُ وَالْقَمَرُ بِحُسْبَانٍ﴾ ﴿يَا مَالِكَ الْمُلْكِ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ سَخِّرْ لِي نُفُوسَ الْعَالَمِ كُلِّهِ﴾',
      urduExplanationAndSecret: 'علمِ لیمیا افلاک کے روحانی قویٰ کو مخصوص دھاتوں اور اوقات میں منضبط کرنے کا نام ہے۔ اس لوح سے حامل کے لیے عزت، جاہ، دبدبہ اور فتوحات مقدر ہوتی ہیں۔',
      abjadTotal: 4190,
      bestPlanetaryHour: 'اتوار بوقتِ دوپہر (ساعتِ شمس)',
      planetaryAssociation: 'شمس (Sun)',
      element: 'آتشی',
      incenseAndOils: 'مشک، عنبر، زعفران اور عودِ قماری۔',
      stepByStepRitual: [
        '۱. سونے یا پیتل کی تختی پر بوقتِ شرفِ شمس یہ مخمسِ فلکی کندہ کریں۔',
        '۲. تختی کے چاروں کونوں پر موکلینِ فلکی (روقیائیل، جبرائیل، سمسمائیل، میکائیل) کے نام لکھیں۔',
        '۳. روزانہ بعد از نمازِ فجر ۱۰۰ بار آیتِ ملک تلاوت کر کے لوح پر دم کریں۔',
        '۴. لوح کو سرخ ریشم میں لپیٹ کر اپنے پاس رکھیں یا دستار میں محفوظ کریں۔',
        '۵. جس حاکم، قاضی، افسر یا مجمعے میں جائیں گے، سب پر رعب و ہیبت طاری ہو گی۔'
      ],
      talismanType: 'مخمسِ اعظمِ شمس و ملوک ۵×۵ (آتشی)',
      dimension: 5,
      talismanMatrix: [
        [838, 851, 829, 842, 830],
        [841, 831, 839, 850, 829],
        [849, 832, 838, 833, 838],
        [830, 840, 848, 831, 841],
        [832, 836, 846, 834, 842]
      ],
      inscribingMedium: 'خالص سونے، پیتل یا ریشمی کپڑے پر زعفران سے۔',
      distantInfluenceMethod: 'کسی دور کے بادشاہ یا افسر کے فیصلے کو تبدیل کرنے کے لیے اس لوح پر اس کا نام رکھ کر آیتِ کرسی پڑھیں۔',
      ibnSinaSecretAdvice: 'شیخ ابن سیناؒ فرماتے ہیں: شمس فلک کا بادشاہ ہے، جو شخص اس کے روحانی مرکز سے ربط پیدا کر لے وہ جہاں جائے گا غالب رہے گا۔',
      strictPrecautions: [
        'غرور، تکبر اور مظلوم پر ستم سے باز رہیں۔',
        'حالتِ ناپاکی میں لوح کو ہاتھ نہ لگائیں۔'
      ],
      targetAzimatCount: 100
    },

    // -------------------------------------------------------------
    // ۴. باطل کردن طلسمات: ابطالِ سحر، دفعِ جادو و چشم زخم
    // -------------------------------------------------------------
    {
      id: 'ibnsina-batil-kardan-tilismat',
      titleUrdu: 'باطل کردن طلسمات، ابطالِ جادو و سحرِ سیاہ و دفعِ نظرِ بد',
      scienceBranch: 'kimiya',
      scienceBranchUrdu: 'علمِ کيميا و علاجِ ارواح',
      bookChapterUrdu: 'فصل چہارم: در باطل کردن طلسمات، گشایشِ بخت و دفعِ سحرِ مدفون و معقود',
      ancientFormulaOrAzimat: '﴿مَا جِئْتُم بِهِ السِّحْرُ ۖ إِنَّ اللَّهَ سَيُبْطِلُهُ ۖ إِنَّ اللَّهَ لَا يُصْلِحُ عَمَلَ الْمُفْسِدِينَ﴾ ﴿بَطَلَ السِّحْرُ وَانْحَلَّ الْعَقْدُ بِعِزَّةِ اللَّهِ الْقَهَّارِ﴾',
      urduExplanationAndSecret: 'دفن شدہ طلسمات، گنڈوں، ناخن و بالوں پر کیے گئے کالے جادو اور بندشوں کو توڑنے کے لیے ابن سینا کا یہ طریقہ اکسیرِ اعظم کا حکم رکھتا ہے۔',
      abjadTotal: 2980,
      bestPlanetaryHour: 'بدھ یا اتوار کی صبح (ساعتِ شمس یا عطارد)',
      planetaryAssociation: 'شمس و عطارد (Sun & Mercury)',
      element: 'آبی',
      incenseAndOils: 'حرمل (اسپند)، کلونجی، نمکِ طعام اور کافور۔',
      stepByStepRitual: [
        '۱. آبِ باراں یا صاف کنوئیں کے پانی کے برتن پر آیاتِ ابطالِ سحر ۷۰ مرتبہ پڑھیں۔',
        '۲. زعفران اور عرقِ گلاب سے یہ مربعِ ابطالِ سحر تحریر کریں۔',
        '۳. نقش کو اس پانی میں گھولیں اور سحر زدہ مریض کو ۷ دن متواتر نہار منہ پلائیں۔',
        '۴. تھوڑا سا پانی گھر کے چاروں کونوں میں چھڑکیں۔',
        '۵. تمام خبیث بندشیں، سحرِ تفریق، بیماری اور نحوست فوراً باطل ہو جائیں گی۔'
      ],
      talismanType: 'مربعِ ابطالِ طلسمات ۴×۴ (آبی)',
      dimension: 4,
      talismanMatrix: [
        [745, 752, 751, 734],
        [750, 735, 744, 753],
        [736, 749, 754, 743],
        [756, 741, 738, 747]
      ],
      inscribingMedium: 'چینی کی پلیٹ یا سفید کاغذ پر زعفران سے۔',
      distantInfluenceMethod: 'اگر مریض دور ہو تو اس کے پہنے ہوئے کپڑے کے ٹکڑے پر یہ نقش بنا کر پانی میں گھول کر پلوانے کی ہدایت کریں۔',
      ibnSinaSecretAdvice: 'ابن سینا فرماتے ہیں: جس طرح زہر کا تریاق مادہ ہوتا ہے اسی طرح سحر کی تاریکی کا تریاق نورانی آیات اور پانی کا لطیف عنصر ہے۔',
      strictPrecautions: [
        'دم شدہ پانی کو بیت الخلاء یا نالی میں نہ گرنے دیں۔',
        'گھر میں تصاویر اور ناپاکی سے مکمل پرہیز کریں۔'
      ],
      targetAzimatCount: 70
    },

    // -------------------------------------------------------------
    // ۵. علمِ ریمیا: خوارقِ عادات، چشم بندی و اسرارِ بصری
    // -------------------------------------------------------------
    {
      id: 'ibnsina-reemiya-chashmbandi',
      titleUrdu: 'طلسمِ چشم بندی، خوارقِ عادات و حفاظت از نظرِ دشمنان (علمِ ریمیا)',
      scienceBranch: 'reemiya',
      scienceBranchUrdu: 'علمِ ريميا (اسرارِ بصری و خوارق)',
      bookChapterUrdu: 'فصل پنجم: در طلسماتِ اعجاب، چشم بندی و اختفائے از اعداء',
      ancientFormulaOrAzimat: '﴿وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ﴾ ﴿صُمٌّ بُكْمٌ عُمْيٌ فَهُمْ لَا يَرْجِعُونَ﴾',
      urduExplanationAndSecret: 'علمِ ریمیا انسان کی قوتِ باصرہ اور خیالی تموجات کو منضبط کرتا ہے جس سے دشمن کی نظریں اندھی ہو جاتی ہیں اور وہ شر سے محفوظ رہتا ہے۔',
      abjadTotal: 2150,
      bestPlanetaryHour: 'ہفتہ کی شام (ساعتِ زحل)',
      planetaryAssociation: 'زحل (Saturn)',
      element: 'خاکی',
      incenseAndOils: 'کلونجی، رائی، حرمل اور لوبان۔',
      stepByStepRitual: [
        '۱. دشمنوں یا ظالموں کی نظروں سے بچنے کے لیے نیلے یا کالے کاغذ پر یہ طلسم لکھیں۔',
        '۲. سورۃ یٰسین کی مذکورہ آیتِ سدّ ۱۰۱ بار پڑھ کر نقش پر دم کریں۔',
        '۳. نقش کو دائیں بازو پر باندھیں یا جب خطرے کی جگہ سے گزریں تو مٹھی میں بند رکھیں۔',
        '۴. دشمن کی آنکھیں آپ کو دیکھنے سے قاصر رہیں گی اور کوئی نقصان نہیں پہنچا سکیں گی۔'
      ],
      talismanType: 'خاتمِ حجاب و اختفاء ۳×۳ (خاکی)',
      dimension: 3,
      talismanMatrix: [
        [717, 710, 720],
        [716, 'حجاب', 718],
        [714, 719, 715]
      ],
      inscribingMedium: 'کالے یا نیلے کاغذ پر کافور و کالی سیاہی سے۔',
      distantInfluenceMethod: 'اگر کسی ظالم حاکم یا دشمن کو اپنی طرف سے اندھا و بے خبر کرنا ہو تو اس کا نام لکھ کر نقش کو وزنی پتھر کے نیچے دبائیں۔',
      ibnSinaSecretAdvice: 'ابن سینا فرماتے ہیں: یہ طلسم دراصل حاسدوں کی شعاعِ بصری کو موڑ دیتا ہے، لہٰذا اس کا استعمال صرف جان و مال کی حفاظت کے لیے کریں۔',
      strictPrecautions: [
        'چوری یا غیر شرعی چھپنے کے لیے ہرگز استعمال نہ کریں۔',
        'نمازِ فجر و مغرب کے بعد حصار ضرور پڑھیں۔'
      ],
      targetAzimatCount: 101
    },

    // -------------------------------------------------------------
    // ۶. علمِ کیمیا: اکسیرِ شفا، تبدیلِ امراض و قوتِ حیات
    // -------------------------------------------------------------
    {
      id: 'ibnsina-kimiya-shifa-amraz',
      titleUrdu: 'اکسیرِ شفا، علاجِ امراضِ مزمنہ و تقویتِ روح و بدن (علمِ کیمیا)',
      scienceBranch: 'kimiya',
      scienceBranchUrdu: 'علمِ کيميا (اکسیرِ شفا و حیات)',
      bookChapterUrdu: 'فصل ششم: در اکسیرِ اعظم، علاجِ امراضِ صعبہ و تقویتِ حرارتِ غریزیہ',
      ancientFormulaOrAzimat: '﴿وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ﴾ ﴿يَا شَافِي يَا كَافِي يَا مُعَافِي يَا حَيُّ يَا قَيُّومُ بِحَقِّ الْأَكْسِيرِ الشَّافِي﴾',
      urduExplanationAndSecret: 'ابن سینا کی طب اور علمِ کیمیا کا باہمی امتزاج جو انسانی جسم کے خلطوں (بلغم، سودا، صفرا، خون) کو متوازن کر کے لاعلاج امراض کا خاتمہ کرتا ہے۔',
      abjadTotal: 3420,
      bestPlanetaryHour: 'جمعرات کی صبح طلوعِ آفتاب (ساعتِ مشتری)',
      planetaryAssociation: 'مشتری (Jupiter)',
      element: 'آبی',
      incenseAndOils: 'روغنِ زیتون، شہدِ خالص، عرقِ گلاب اور زعفران۔',
      stepByStepRitual: [
        '۱. خالص شہد اور روغنِ زیتون کے برتن پر آیاتِ شفا ۴۱ بار تلاوت کریں۔',
        '۲. چاندی کی تختی یا سفید چینی کی پلیٹ پر یہ مسدسِ شفا تحریر کریں۔',
        '۳. نقش کو عرقِ گلاب سے دھو کر مریض کو نہار منہ اور بوقتِ شب پلائیں۔',
        '۴. مٹی اور جسمانی فاسد مادے زائل ہو کر صحتِ کاملہ عود کر آئے گی۔'
      ],
      talismanType: 'مسدسِ شفاء الامراض ۶×۶ (آبی)',
      dimension: 6,
      talismanMatrix: [
        [570, 577, 576, 559, 568, 575],
        [565, 560, 569, 578, 563, 566],
        [561, 564, 579, 568, 571, 562],
        [579, 568, 565, 574, 567, 570],
        [574, 563, 572, 561, 578, 569],
        [562, 571, 564, 573, 560, 577]
      ],
      inscribingMedium: 'چینی کی پلیٹ یا چاندی کی تختی پر زعفران سے۔',
      distantInfluenceMethod: 'دور دراز کے مریض کے لیے اس کی والدہ کا نام اور تاریخِ پیدائش سامنے رکھ کر روزانہ ۱۰۰ بار اسم "یا شافی" پڑھ کر تصور پر دم کریں۔',
      ibnSinaSecretAdvice: 'شیخ الرئیس ابن سیناؒ فرماتے ہیں: روح کی شفا جسم کی شفا کا مقدمہ ہے، جب تک دل پروردگار کے ذکر سے منور نہ ہو ادویات بے اثر رہتی ہیں۔',
      strictPrecautions: [
        'حرام غذا اور ناپاک دوا سے سختی سے بچیں۔',
        'مریض کو ہمیشہ امید اور دعا کی تلقین کریں۔'
      ],
      targetAzimatCount: 41
    },

    // -------------------------------------------------------------
    // ۷. کشفِ کنوز، خواب میں غیب جاننا و تسخیرِ ارواحِ ارضی
    // -------------------------------------------------------------
    {
      id: 'ibnsina-kashf-kunooz-khwab',
      titleUrdu: 'کشفِ کنوز و دفائن و مشاہدۂ امورِ مکتومہ در خواب',
      scienceBranch: 'heemiya',
      scienceBranchUrdu: 'علمِ ہيميا (کشفِ غیب و منامات)',
      bookChapterUrdu: 'فصل ہفتم: در کشفِ دفائن و کنوزِ زمین و رویتِ حقائق در خواب',
      ancientFormulaOrAzimat: '﴿عَالِمُ الْغَيْبِ فَلَا يُظْهِرُ عَلَىٰ غَيْبِهِ أَحَدًا ۝ إِلَّا مَنِ ارْتَضَىٰ مِن رَّسُولٍ﴾ ﴿يَا نُورُ يَا بَاطِنُ يَا خَبِيرُ أَخْبِرْنِي فِي مَنَامِي عَنْ كَذَا وَكَذَا﴾',
      urduExplanationAndSecret: 'خواب کے ذریعے پوشیدہ خزانوں، گمشدہ اشخاص اور مستقبل کے احوال جاننے کا ابن سینا کا مستند و مجرب طلسماتی طریقہ۔',
      abjadTotal: 2770,
      bestPlanetaryHour: 'جمعہ یا پیر کی رات قبل از خواب (ساعتِ قمر)',
      planetaryAssociation: 'قمر (Moon)',
      element: 'آبی',
      incenseAndOils: 'صندل، کافور، مشک اور عرقِ بید مشک۔',
      stepByStepRitual: [
        '۱. باوضو ہو کر پاک بستر پر قبلہ رو لیٹیں۔',
        '۲. سفید کاغذ پر زعفران سے مثلثِ کشف لکھ کر اپنے تکیے کے نیچے رکھیں۔',
        '۳. اسمِ "یا علیم یا خبیر یا مبین" کا ۱۰۰۰ بار ورد کریں یہاں تک کہ نیند آ جائے۔',
        '۴. خواب میں موکل سفید لباس میں آ کر مطلوبہ راز اور سوال کا واضح جواب دے گا۔'
      ],
      talismanType: 'مثلثِ کشفِ منامات ۳×۳ (آبی)',
      dimension: 3,
      talismanMatrix: [
        [924, 917, 927],
        [923, 'کشفِ خواب', 925],
        [921, 926, 922]
      ],
      inscribingMedium: 'سفید کاغذ پر زعفران و عرقِ گلاب سے۔',
      distantInfluenceMethod: 'کسی دور کے مکان میں دفینہ معلوم کرنے کے لیے اس زمین کی تصویر یا خاک اپنے پاس رکھ کر عمل کریں۔',
      ibnSinaSecretAdvice: 'ابن سینا فرماتے ہیں: خواب میں باطنی حواس بیدار ہوتے ہیں، جو شخص شام کا کھانا کم کھائے اور ذکر پر سوئے اسے حقائق بے نقاب نظر آتے ہیں۔',
      strictPrecautions: [
        'خواب میں دیکھے گئے رازوں کو کسی لالچی شخص کے سامنے فاش نہ کریں۔',
        'ناپاک بستر پر ہرگز عمل نہ کریں۔'
      ],
      targetAzimatCount: 1000
    }
  ];

  const filteredCatalog = useMemo(() => {
    return catalog.filter(item => {
      const matchBranch = selectedBranch === 'all' || item.scienceBranch === selectedBranch;
      const matchQuery = !searchQuery.trim() || 
        item.titleUrdu.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bookChapterUrdu.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.urduExplanationAndSecret.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.scienceBranchUrdu.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBranch && matchQuery;
    });
  }, [catalog, selectedBranch, searchQuery]);

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
      {/* Header Banner - Antique Gold & Dark Emerald Styling */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2018] via-[#16382a] to-[#081510] p-6 sm:p-8 text-[#e8f5e9] shadow-2xl border-2 border-[#52b788]/40">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-[#52b788]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#52b788]/20 border border-[#52b788]/40 text-xs text-[#95d5b2] font-bold">
              <Sparkles className="h-3.5 w-3.5 text-[#52b788]" />
              <span>مجموعۂ کامل علومِ غریبہ و نوامیسِ فلکیہ</span>
            </div>
            <h1 className="font-amiri text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Atom className="h-8 w-8 text-[#52b788] animate-pulse shrink-0 fill-[#52b788]/30" />
              <span>مجموعہ کامل علوم غریبہ مجربات ابن سینا</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#b7e4c7] leading-relaxed">
              تصنیفِ جلیل: <strong>شیخ الرئیس ابو علی الحسین بن علی ابن سینا (رحمہ اللہ)</strong> | در علمِ <strong>کيمیا، سیمیا، ریمیا، لیمیا و ہیمیا (کلہ سر)</strong>، طلسماتِ مجربہ، احضاراتِ جن، تسخیراتِ کواکب، دعائے مہر و محبت اور باطل کردن طلسمات
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setActiveSubTab('five_sciences_explorer')}
              className="px-4 py-2 rounded-xl bg-[#52b788] hover:bg-[#40916c] text-[#081510] font-black text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer transform hover:scale-105"
            >
              <TestTube2 className="h-4 w-4" />
              <span>محاسبِ علومِ خمسہ (کلہ سر)</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-[#52b788]/20 hover:bg-[#52b788]/30 border border-[#52b788]/40 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>پرنٹ / محفوظ</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="mt-6 pt-4 border-t border-[#52b788]/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'catalog', label: 'تمام ابواب و طلسماتِ ابن سینا', icon: BookOpen },
              { id: 'five_sciences_explorer', label: 'علومِ خمسہ (کيمیا، سیمیا، ریمیا، لیمیا، ہیمیا)', icon: TestTube2 },
              { id: 'planetary_plates_7', label: 'الواحِ سبعہ کواکب و تسخیرات', icon: Sun },
              { id: 'talisman_breaker', label: 'ابطالِ طلسمات و سحرِ سیاہ', icon: ShieldCheck },
              { id: 'live_azimat', label: 'کاؤنٹر برائے عزائم و ورد', icon: Activity }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeSubTab === tab.id
                      ? 'bg-[#52b788] text-[#081510] shadow-md ring-2 ring-[#52b788]/50 font-black'
                      : 'bg-[#1b4332]/80 text-[#d8f3dc] hover:bg-[#2d6a4f] border border-[#52b788]/20'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-[#95d5b2]/90 hidden lg:flex items-center gap-1 font-amiri">
            <span>کل فصول: ۷ | نادر طلسمات: {catalog.length} | متن و تصحیح کامل</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 1: CATALOG OF ALL CHAPTERS & TALISMANS */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'catalog' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="p-4 rounded-2xl bg-white border border-[#52b788]/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#40916c]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="تلاش کریں: مہر و محبت، احضارات، باطل کردن، سیمیا، اکسیر..."
                className="w-full pr-10 pl-4 py-2 rounded-xl bg-[#f4fbf7] border border-[#52b788]/50 text-xs text-[#081510] placeholder-[#74c69d] focus:outline-none focus:ring-2 focus:ring-[#52b788]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <Filter className="h-4 w-4 text-[#40916c] shrink-0" />
              {[
                { id: 'all', label: 'تمام علوم و فصول' },
                { id: 'seemiya', label: 'علمِ سیمیا (محبت و حروف)' },
                { id: 'heemiya', label: 'علمِ ہیمیا (احضارات و کشف)' },
                { id: 'limiya', label: 'علمِ لیمیا (تسخیراتِ کواکب)' },
                { id: 'kimiya', label: 'علمِ کیمیا (ابطال و شفا)' },
                { id: 'reemiya', label: 'علمِ ریمیا (چشم بندی و خوارق)' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedBranch(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedBranch === cat.id
                      ? 'bg-[#52b788] text-[#081510] shadow-sm font-black'
                      : 'bg-[#e8f5e9] text-[#1b4332] hover:bg-[#d8f3dc]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Ibn Sina Amaliyat */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCatalog.map(item => (
              <div
                key={item.id}
                className="rounded-2xl bg-white border border-[#52b788]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-[#52b788]"
              >
                <div className="p-5 space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#d8f3dc] text-[#1b4332] border border-[#52b788]/40">
                      {item.scienceBranchUrdu}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-200">
                      طبع: {item.element} | عدد: {item.abjadTotal}
                    </span>
                  </div>

                  {/* Title & Section */}
                  <div>
                    <span className="text-[11px] font-bold text-[#40916c] block mb-1 font-amiri">
                      {item.bookChapterUrdu}
                    </span>
                    <h3 className="font-amiri text-lg font-bold text-[#081510] group-hover:text-[#2d6a4f] transition-colors leading-snug">
                      {item.titleUrdu}
                    </h3>
                  </div>

                  {/* Formula Preview Box */}
                  <div className="p-3 rounded-xl bg-[#f4fbf7] border border-[#52b788]/30 text-right space-y-1">
                    <p className="font-amiri font-bold text-xs text-[#1b4332] line-clamp-2 leading-relaxed" dir="rtl">
                      {item.ancientFormulaOrAzimat}
                    </p>
                    <p className="text-[11px] text-[#40916c] line-clamp-2 italic">
                      {item.urduExplanationAndSecret}
                    </p>
                  </div>

                  {/* Planetary & Material Meta */}
                  <div className="space-y-1.5 text-xs text-[#1b4332] bg-[#e8f5e9]/60 p-2.5 rounded-xl border border-[#b7e4c7]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#40916c] shrink-0" />
                      <span className="font-bold">ساعت و سیارہ:</span>
                      <span className="text-[11px] text-gray-700 truncate">{item.bestPlanetaryHour}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flame className="h-3.5 w-3.5 text-[#52b788] shrink-0" />
                      <span className="font-bold">بخور و سیاہی:</span>
                      <span className="text-[11px] text-gray-700 truncate">{item.incenseAndOils}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 bg-[#f4fbf7] border-t border-[#d8f3dc] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedAmal(item)}
                    className="flex-1 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-[#d8f3dc] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-[#52b788]" />
                    <span>مکمل طریقہ و طلسم دیکھیں</span>
                  </button>

                  {onSendToNaqsh && (
                    <button
                      onClick={() => onSendToNaqsh(item.abjadTotal)}
                      className="p-2 rounded-xl bg-white hover:bg-[#d8f3dc] border border-[#52b788] text-[#2d6a4f] transition-colors cursor-pointer"
                      title="مولد النقوش میں عدد بھیجیں"
                    >
                      <Layers className="h-4 w-4" />
                    </button>
                  )}
                  {onSendToTakseer && (
                    <button
                      onClick={() => onSendToTakseer(item.titleUrdu)}
                      className="p-2 rounded-xl bg-white hover:bg-[#d8f3dc] border border-[#52b788] text-[#1b4332] transition-colors cursor-pointer"
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
      {/* SUB-TAB 2: FIVE SCIENCES (KULLUH SIRR) CALCULATOR */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'five_sciences_explorer' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border-2 border-[#52b788]/40 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-[#d8f3dc] pb-4">
              <div className="p-3 rounded-2xl bg-[#d8f3dc] text-[#1b4332]">
                <TestTube2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-amiri text-xl font-bold text-[#081510]">
                  محاسبِ علومِ خمسہ خفيہ (کيمیا، لیمیا، ہیمیا، سیمیا، ریمیا - کلہ سر)
                </h3>
                <p className="text-xs text-[#2d6a4f]">
                  ابن سینا کے جفری فارمولے کے مطابق نام مع والدہ داخل کر کے اپنا حاکم عنصر، سیارہ، موکل اور موزوں ترین علم معلوم کریں۔
                </p>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#081510] block">نامِ سائل / طالب:</label>
                <input
                  type="text"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4fbf7] border border-[#52b788] text-sm text-[#081510] focus:outline-none focus:ring-2 focus:ring-[#52b788] font-bold"
                  placeholder="مثلاً: حسین"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#081510] block">والدہ کا نام:</label>
                <input
                  type="text"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4fbf7] border border-[#52b788] text-sm text-[#081510] focus:outline-none focus:ring-2 focus:ring-[#52b788] font-bold"
                  placeholder="مثلاً: زینب"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#081510] block">مقصد و حاجت کا شعبہ:</label>
                <select
                  value={selectedIntentType}
                  onChange={(e) => setSelectedIntentType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4fbf7] border border-[#52b788] text-sm text-[#081510] focus:outline-none focus:ring-2 focus:ring-[#52b788] font-bold"
                >
                  <option value="محبت و تسخیرِ قلوب">محبت و تسخیرِ قلوب (علمِ سیمیا)</option>
                  <option value="احضارات و کشفِ غیب">احضارات و کشفِ غیب (علمِ ہیمیا)</option>
                  <option value="تسخیرِ کواکب و امراء">تسخیرِ کواکب و امراء (علمِ لیمیا)</option>
                  <option value="ابطالِ سحر و شفا">ابطالِ سحر و شفا (علمِ کیمیا)</option>
                  <option value="چشم بندی و حفاظت">چشم بندی و حفاظت (علمِ ریمیا)</option>
                </select>
              </div>
            </div>

            {/* Analysis Results Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#f4fbf7] to-[#e8f5e9] border border-[#52b788]/50 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white border border-[#b7e4c7]">
                  <span className="text-[11px] text-gray-600 block">مجموعی ابجدی عدد:</span>
                  <span className="font-amiri font-black text-xl text-[#1b4332]">{fiveSciencesAnalysis.total}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#b7e4c7]">
                  <span className="text-[11px] text-gray-600 block">حاکم عنصر / طبع:</span>
                  <span className="font-amiri font-black text-lg text-[#2d6a4f]">{fiveSciencesAnalysis.dominantElement}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#b7e4c7]">
                  <span className="text-[11px] text-gray-600 block">منسوب فلکی سیارہ:</span>
                  <span className="font-amiri font-black text-lg text-[#40916c]">{fiveSciencesAnalysis.planet}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#b7e4c7]">
                  <span className="text-[11px] text-gray-600 block">موکلِ علوی:</span>
                  <span className="font-amiri font-black text-lg text-[#1b4332]">{fiveSciencesAnalysis.angelicRuler}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#52b788]/40 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1b4332]">
                  <Award className="h-4 w-4 text-[#52b788]" />
                  <span>ابن سینا کی جانب سے سائل کے لیے موزوں ترین علم:</span>
                </div>
                <p className="text-xs text-[#2d6a4f] leading-relaxed">
                  <strong>{fiveSciencesAnalysis.recommendedSci.name}</strong> — {fiveSciencesAnalysis.recommendedSci.desc}۔
                </p>
              </div>

              {onSendToNaqsh && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => onSendToNaqsh(fiveSciencesAnalysis.total)}
                    className="px-4 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Layers className="h-4 w-4" />
                    <span>سائل کا عدد ({fiveSciencesAnalysis.total}) مولد النقوش میں بھیجیں</span>
                  </button>
                </div>
              )}
            </div>

            {/* The 5 Sciences Explanation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
              {[
                { letter: 'ک', name: 'علمِ کیمیا (Kimiya)', desc: 'اکسیرِ شفا، تبدیلِ مزاج و باطل کردن سحر' },
                { letter: 'ل', name: 'علمِ لیمیا (Limiya)', desc: 'تسخیراتِ کواکب و الواحِ فلکیہ و طلسمات' },
                { letter: 'ہ', name: 'علمِ ہیمیا (Heemiya)', desc: 'احضاراتِ جن و ارواح و کشفِ غیب در خواب' },
                { letter: 'س', name: 'علمِ سیمیا (Seemiya)', desc: 'طلسماتِ حروف، اعداد و دعای مہر و محبت' },
                { letter: 'ر', name: 'علمِ ریمیا (Reemiya)', desc: 'چشم بندی، اختفائے از اعداء و خوارقِ عادات' }
              ].map((sci, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#f4fbf7] border border-[#b7e4c7] space-y-1">
                  <div className="flex items-center gap-1.5 font-amiri font-bold text-sm text-[#1b4332]">
                    <span className="w-5 h-5 rounded-full bg-[#52b788] text-white flex items-center justify-center text-xs font-black">{sci.letter}</span>
                    <span>{sci.name}</span>
                  </div>
                  <p className="text-[11px] text-gray-700">{sci.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 3: THE 7 PLANETARY PLATES (ALWAH-E SABA) */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'planetary_plates_7' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border-2 border-[#52b788]/40 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-[#d8f3dc] pb-4">
              <div className="p-3 rounded-2xl bg-[#d8f3dc] text-[#1b4332]">
                <Sun className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-amiri text-xl font-bold text-[#081510]">
                  الواحِ سبعہ کواکب و تسخیراتِ فلکیہ (دستورِ ابن سینا)
                </h3>
                <p className="text-xs text-[#2d6a4f]">
                  ساتوں سیاروں کے مخصوص مربع و مثلث نقوش، دھاتیں، بخورات اور تسخیرِ ارواح کے فارمولے
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'لوحِ زحل (Saturn)', metal: 'سیسہ (Lead)', day: 'ہفتہ', hours: 'اول ساعت', effect: 'حفاظت از دشمن، تسخیرِ اراضی و وقار', color: 'bg-stone-50 border-stone-300 text-stone-800' },
                { name: 'لوحِ مشتری (Jupiter)', metal: 'قلعی / چاندی (Tin)', day: 'جمعرات', hours: 'اول ساعت', effect: 'رزق، جاہ، عزت، حاکمیت و علم', color: 'bg-sky-50 border-sky-300 text-sky-900' },
                { name: 'لوحِ مریخ (Mars)', metal: 'لوہا (Iron)', day: 'منگل', hours: 'اول ساعت', effect: 'دفعِ اعداء، غلبہ بر ظالم و شجاعت', color: 'bg-rose-50 border-rose-300 text-rose-900' },
                { name: 'لوحِ شمس (Sun)', metal: 'خالص سونا / پیتل (Gold)', day: 'اتوار', hours: 'دوپہر ۱۲ بجے', effect: 'ہیبت، قبولیتِ عامہ و تسخیرِ ملوک', color: 'bg-amber-50 border-amber-300 text-amber-900' },
                { name: 'لوحِ زہرہ (Venus)', metal: 'تانبا (Copper)', day: 'جمعہ', hours: 'صبح طلوع', effect: 'محبت، الفتِ زوجین، عقد و تسخیر', color: 'bg-emerald-50 border-emerald-300 text-emerald-900' },
                { name: 'لوحِ عطارد (Mercury)', metal: 'سیماب / پیتل (Mercury)', day: 'بدھ', hours: 'صبح فجر', effect: 'علم، حکمت، تجارت و فصاحت', color: 'bg-indigo-50 border-indigo-300 text-indigo-900' },
                { name: 'لوحِ قمر (Moon)', metal: 'خالص چاندی (Silver)', day: 'پیر', hours: 'شب کی پہلی ساعت', effect: 'کشفِ غیب، تسکین و برکتِ عامہ', color: 'bg-teal-50 border-teal-300 text-teal-900' }
              ].map((p, i) => (
                <div key={i} className={`p-4 rounded-2xl border ${p.color} space-y-2`}>
                  <div className="flex items-center justify-between font-amiri font-bold text-base">
                    <span>{p.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-white/70 border border-current font-sans">{p.day}</span>
                  </div>
                  <div className="text-xs space-y-1">
                    <div><strong>دھات:</strong> {p.metal} | <strong>وقت:</strong> {p.hours}</div>
                    <div><strong>تاثیر:</strong> {p.effect}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 4: ANTI-TALISMAN BREAKER */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'talisman_breaker' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border-2 border-[#52b788]/40 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-[#d8f3dc] pb-4">
              <div className="p-3 rounded-2xl bg-[#d8f3dc] text-[#1b4332]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-amiri text-xl font-bold text-[#081510]">
                  دستورِ باطل کردن طلسمات و ابطالِ سحرِ مدفون و معقود (ابن سینا)
                </h3>
                <p className="text-xs text-[#2d6a4f]">
                  کسی بھی پرانے طلسم، جادو کے گنڈے، پتلے، دفن شدہ تعویذات اور جناتی اثرات کو باطل کرنے کا قطعی طریقہ
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <span className="font-bold text-amber-900 text-sm block">۱. سحرِ مدفون (زمین میں دبایا گیا):</span>
                <p className="text-xs text-amber-800 leading-relaxed">
                  اگر کسی گھر یا دکان میں جادو کا تعویذ دفن ہو تو آیاتِ ابطال ۷۰ بار پانی پر پڑھ کر اس پانی میں تھوڑا نمک ملائیں اور اس جگہ پر چھڑکیں۔ طلسم کی تاثیر فوراً جل کر راکھ ہو جائے گی۔
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <span className="font-bold text-rose-900 text-sm block">۲. سحرِ معقود (گرہوں والا گنڈا):</span>
                <p className="text-xs text-rose-800 leading-relaxed">
                  اگر بالوں یا دھاگوں پر گرہیں لگا کر جادو کیا گیا ہو تو معوذتین (سورۃ الفلق و الناس) پڑھتے ہوئے ہر گرہ پر دم کر کے اسے کھولیں اور پھر آگ میں جلا دیں۔
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <span className="font-bold text-emerald-900 text-sm block">۳. سحرِ ماکول و مشروب (کھلایا پلایا):</span>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  زعفران سے مربعِ ابطال لکھ کر پانی میں گھولیں اور اس میں کلونجی کا تیل ملا کر مریض کو ۳ دن تک پلائیں، معدے اور خون سے تمام زہر خارج ہو جائے گا۔
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 5: LIVE AZIMAT & TASBIH COUNTER */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'live_azimat' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border-2 border-[#52b788]/40 shadow-sm max-w-xl mx-auto text-center space-y-6">
            <div className="space-y-1">
              <h3 className="font-amiri text-2xl font-bold text-[#081510]">
                کاؤنٹر برائے عزائم و ختوماتِ ابن سینا
              </h3>
              <p className="text-xs text-[#2d6a4f]">
                اعمال و نقوش کی تلاوت کے دوران اعداد کا درست شمار رکھیں
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c2018] to-[#16382a] text-[#e8f5e9] shadow-inner space-y-4">
              <div className="font-amiri text-5xl font-black text-[#52b788] tracking-wider">
                {azimatCount} / {targetCount}
              </div>

              <div className="w-full bg-[#1b4332] rounded-full h-3 overflow-hidden border border-[#52b788]/40">
                <div 
                  className="bg-[#52b788] h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (azimatCount / targetCount) * 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setAzimatCount(prev => prev + 1)}
                  className="px-8 py-3 rounded-2xl bg-[#52b788] hover:bg-[#40916c] text-[#081510] font-black text-lg shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  + ۱ ورد کریں
                </button>
                <button
                  onClick={() => setAzimatCount(0)}
                  className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="دوبارہ صفر کریں"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              {[41, 70, 100, 313, 1001].map(cnt => (
                <button
                  key={cnt}
                  onClick={() => { setTargetCount(cnt); setAzimatCount(0); }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    targetCount === cnt
                      ? 'bg-[#1b4332] text-white'
                      : 'bg-[#e8f5e9] text-[#1b4332] hover:bg-[#d8f3dc]'
                  }`}
                >
                  {cnt} بار
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* DETAILED AMAL MODAL DIALOG */}
      {/* ------------------------------------------------------------- */}
      {selectedAmal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#52b788] shadow-2xl space-y-6 p-6 sm:p-8 animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#d8f3dc] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#d8f3dc] text-[#1b4332]">
                    {selectedAmal.scienceBranchUrdu}
                  </span>
                  <span className="text-xs text-gray-500 font-bold">
                    طبع: {selectedAmal.element} | عدد: {selectedAmal.abjadTotal}
                  </span>
                </div>
                <h2 className="font-amiri text-2xl font-black text-[#081510]">
                  {selectedAmal.titleUrdu}
                </h2>
                <p className="text-xs text-[#40916c] font-bold mt-0.5">
                  {selectedAmal.bookChapterUrdu}
                </p>
              </div>

              <button
                onClick={() => setSelectedAmal(null)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Arabic Formula / Azimat Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#f4fbf7] to-[#e8f5e9] border border-[#52b788]/40 text-right space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1b4332]">متنِ عزیمت و طلسمِ قدیم:</span>
                <button
                  onClick={() => handleCopy(selectedAmal.ancientFormulaOrAzimat, 'modal-formula')}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#52b788]/40 text-xs text-[#1b4332] font-bold hover:bg-[#d8f3dc] flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === 'modal-formula' ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedId === 'modal-formula' ? 'کاپی ہو گئی' : 'عزیمت کاپی'}</span>
                </button>
              </div>
              <p className="font-amiri text-base sm:text-lg font-bold text-[#081510] leading-relaxed" dir="rtl">
                {selectedAmal.ancientFormulaOrAzimat}
              </p>
              <p className="text-xs text-[#2d6a4f] pt-1 border-t border-[#b7e4c7]">
                <strong>اردو ترجمہ و مفہوم:</strong> {selectedAmal.urduExplanationAndSecret}
              </p>
            </div>

            {/* Talisman Matrix Display */}
            <div className="p-5 rounded-2xl bg-[#0c2018] text-white border-2 border-[#52b788] text-center space-y-4">
              <div className="flex items-center justify-between text-xs text-[#95d5b2]">
                <span className="font-bold">{selectedAmal.talismanType}</span>
                <span>کاغذ / دھات: {selectedAmal.inscribingMedium}</span>
              </div>

              {/* Grid */}
              <div className="inline-block p-3 rounded-xl bg-black/40 border border-[#52b788]/40">
                <div 
                  className="grid gap-1 sm:gap-2"
                  style={{ gridTemplateColumns: `repeat(${selectedAmal.dimension}, minmax(0, 1fr))` }}
                >
                  {selectedAmal.talismanMatrix.map((row, rIdx) => (
                    row.map((cell, cIdx) => (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-[#16382a] border border-[#52b788]/60 flex items-center justify-center font-amiri font-bold text-sm sm:text-base text-[#d8f3dc] shadow-sm"
                      >
                        {cell}
                      </div>
                    ))
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-[#b7e4c7]">
                <strong>قاعدۂ تسخیرِ بعید:</strong> {selectedAmal.distantInfluenceMethod}
              </div>
            </div>

            {/* Step-by-Step Method */}
            <div className="space-y-2">
              <h4 className="font-amiri text-lg font-bold text-[#081510] flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#52b788]" />
                <span>طریقۂ کار و ریاضت (مرحلہ وار):</span>
              </h4>
              <div className="space-y-1.5 bg-[#f4fbf7] p-4 rounded-2xl border border-[#b7e4c7]">
                {selectedAmal.stepByStepRitual.map((step, idx) => (
                  <p key={idx} className="text-xs text-[#081510] leading-relaxed">
                    {step}
                  </p>
                ))}
              </div>
            </div>

            {/* Ibn Sina Secret Advice */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <strong className="block font-bold">نصیحتِ شیخ الرئیس ابن سیناؒ:</strong>
              <p className="leading-relaxed">"{selectedAmal.ibnSinaSecretAdvice}"</p>
            </div>

            {/* Strict Precautions */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-900 space-y-1">
              <strong className="block font-bold flex items-center gap-1.5 text-red-800">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span>شرائط و احتیاطی تدابیر (لازمی):</span>
              </strong>
              <ul className="list-disc pr-4 space-y-0.5">
                {selectedAmal.strictPrecautions.map((prec, pIdx) => (
                  <li key={pIdx}>{prec}</li>
                ))}
              </ul>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#d8f3dc]">
              <div className="flex items-center gap-2">
                {onSendToNaqsh && (
                  <button
                    onClick={() => {
                      onSendToNaqsh(selectedAmal.abjadTotal);
                      setSelectedAmal(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#52b788] hover:bg-[#40916c] text-[#081510] font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Layers className="h-4 w-4" />
                    <span>مولد النقوش میں بھیجیں</span>
                  </button>
                )}
                {onSendToTakseer && (
                  <button
                    onClick={() => {
                      onSendToTakseer(selectedAmal.titleUrdu);
                      setSelectedAmal(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Flame className="h-4 w-4" />
                    <span>تکسیر اسٹوڈیو میں کھولیں</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setSelectedAmal(null)}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs transition-colors cursor-pointer"
              >
                بند کریں
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
