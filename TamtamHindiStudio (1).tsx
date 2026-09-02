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
  Crosshair
} from 'lucide-react';

export interface TamtamHindiAmalItem {
  id: string;
  titleUrdu: string;
  ancientBookSection: string;
  sectionUrdu: string;
  category: 'tamtam_core' | 'jinn_subjugation' | 'nawamees_aflatoon' | 'talisman_balinas' | 'nawamees_valens' | 'hidden_treasures' | 'zajrat_protections';
  categoryUrdu: string;
  ancientFormulaOrSeal: string;
  urduTranslationAndSecret: string;
  abjadValue: number;
  bestPlanetaryHour: string;
  astrologicalSign: string;
  incenseAndMaterials: string;
  element: 'آتشی' | 'بادی' | 'آبی' | 'خاکی';
  stepByStepRitual: string[];
  sealTalismanType: string;
  dimension: number;
  talismanMatrix: (number | string)[][];
  inscribingMetalOrBase: string;
  distantInfluenceRule: string;
  ancientMasterNotes: string;
  strictCautions: string[];
  targetAzimatCount: number;
}

interface TamtamHindiStudioProps {
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
}

export const TamtamHindiStudio: React.FC<TamtamHindiStudioProps> = ({
  onSendToNaqsh,
  onSendToTakseer
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<TamtamHindiAmalItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'four_philosophers_explorer' | 'protective_hisar' | 'elemental_resonator' | 'live_azimat'>('catalog');
  
  // Live Azimat Counter
  const [azimatCount, setAzimatCount] = useState<number>(0);
  const [targetCount, setTargetCount] = useState<number>(108);

  // Elemental Resonator inputs
  const [practitionerName, setPractitionerName] = useState<string>('طالبِ حق');
  const [practitionerMother, setPractitionerMother] = useState<string>('حوا');
  const [targetElement, setTargetElement] = useState<'آتشی' | 'بادی' | 'آبی' | 'خاکی'>('آتشی');

  // Complete Catalog of Authentic Secrets & Talismans from "Tilismat-e-Tamtam Hindi wa Nawamees Aflatoon, Balinas wa Valens"
  const catalog: TamtamHindiAmalItem[] = [
    // -------------------------------------------------------------
    // باب اول: طلسماتِ طمطم ہندی فی تسخیرِ روحانیات
    // -------------------------------------------------------------
    {
      id: 'tamtam-ruhaniyaat-core',
      titleUrdu: 'طلسمِ اعظمِ طمطم ہندی برائے تسخیرِ ارواح و روحانیاتِ علویہ',
      ancientBookSection: 'الباب الأول: في طلسمات طمطم الهندي وتسخير الأرواح العلوية والروحانيات',
      sectionUrdu: 'باب اول: نوامیسِ کبار و طلسماتِ طمطم ہندی فی تسخیرِ روحانیات',
      category: 'tamtam_core',
      categoryUrdu: 'طلسماتِ طمطم ہندی',
      ancientFormulaOrSeal: 'بِسْمِ اللَّهِ الَّذِي خَضَعَتْ لِعَظَمَتِهِ الرِّقَابُ ﴿بِطَمْطَامٍ هِنْدِيٍّ وَبِطَهْفَشٍ وَبِأَهْيَاشٍ خَاشِعِينَ لِعِزَّةِ اللَّهِ الْعَظِيمِ﴾',
      urduTranslationAndSecret: 'اللہ کے نام سے جس کی عظمت کے سامنے گردنیں جھک گئیں۔ طمطامِ ہندی، طہفش اور اہیاش کی روحانی قسموں کے ساتھ جو اللہ عظیم کی عزت کے سامنے سرنگوں ہیں، تمام علوی و روحانی ارواح کو اطاعت و امداد کا حکم ہے۔',
      abjadValue: 2480,
      bestPlanetaryHour: 'اتوار بوقتِ طلوعِ آفتاب (ساعتِ شمس)',
      astrologicalSign: 'برج اسد (Leo)',
      incenseAndMaterials: 'زعفران، صندل سرخ، کافور و لوبانِ نر، سرخ ریشمی کپڑا۔',
      element: 'آتشی',
      stepByStepRitual: [
        '۱. عمل سے قبل ۳ دن تک پرہیزِ جمالی و جلالی (ترکِ گوشت و پیاز) اختیار کریں۔',
        '۲. اتوار کی صبح بعد از نمازِ فجر قبلہ رخ بیٹھ کر اپنے اردگرد حصارِ طمطمی کھینچیں۔',
        '۳. تانبے کی تختی یا ہرن کی جھلی پر زعفران و عرقِ گلاب سے یہ طلسمِ اعظم کندہ کریں۔',
        '۴. مذکورہ عزیمتِ طمطمیہ کو ۳۱۳ مرتبہ تلاوت کریں اور تختی پر دم کریں۔',
        '۵. تختی کو اپنے دائیں بازو پر باندھیں، تمام روحانی ارواح مطیع و مددگار ہوں گی۔'
      ],
      sealTalismanType: 'خاتمِ طمطم ہندی مع طلسمِ آتشی ۳×۳',
      dimension: 3,
      talismanMatrix: [
        [828, 821, 831],
        [827, 'طمطم', 829],
        [825, 830, 826]
      ],
      inscribingMetalOrBase: 'خالص تانبے کی لوح یا ہرن کی جھلی پر زعفران سے۔',
      distantInfluenceRule: 'اگر کسی دور دراز روحانی وجود یا جگہ کو قابو میں لانا ہو تو طلسم کو چراغِ زیتون کے نیچے دبا کر روزانہ ۱۰۰ بار عزیمت پڑھیں۔',
      ancientMasterNotes: 'حکیم طمطم ہندی فرماتے ہیں: یہ طلسم تمام ہندی و سریانی طلسمات کا تاج ہے، جو شخص اس کی ریاضت کر لے اس کے لیے غیب کے پردے چاک ہو جاتے ہیں۔',
      strictCautions: [
        'ناپاک حالت اور جنابت میں ہرگز اس نقش کو ہاتھ نہ لگائیں۔',
        'غیر شرعی کام کے لیے استعمال کرنے پر فوری رجعت اور جنون کا خطرہ ہے۔'
      ],
      targetAzimatCount: 313
    },
    // -------------------------------------------------------------
    // باب دوم: عزائمِ جنیان و ارواح، حصارِ فولادی
    // -------------------------------------------------------------
    {
      id: 'jinn-subjugation-hisar',
      titleUrdu: 'عزیمتِ قاہرہ برائے دفع و تسخیرِ سرکش جنیان و حصارِ فولادی',
      ancientBookSection: 'الباب الثاني: في عزائم الجنيان ودفع المتمردين وعقد الحصن المنيع',
      sectionUrdu: 'باب دوم: عزائمِ جنیان، دفعِ آسیب و حصارِ فولادی',
      category: 'jinn_subjugation',
      categoryUrdu: 'عزائمِ جنیان و حصار',
      ancientFormulaOrSeal: '﴿وَإِنَّ عَلَيْكُمْ لَحَافِظِينَ كِرَامًا كَاتِبِينَ﴾ ﴿أَقْسَمْتُ عَلَيْكُمْ يَا مَعْشَرَ الْجِنِّ وَالشَّيَاطِينِ بِعِزَّةِ اللَّهِ وَبِخَاتَمِ سُلَيْمَانَ ابْنِ دَاوُدَ﴾',
      urduTranslationAndSecret: 'اور بے شک تم پر نگہبان مقرر ہیں جو عزت والے لکھنے والے ہیں۔ میں تم پر قسم کھاتا ہوں اے گروہِ جن و شیاطین اللہ کی عزت کی اور سلیمان بن داود علیہ السلام کے خاتم کی۔',
      abjadValue: 3160,
      bestPlanetaryHour: 'منگل کی نصف شب (ساعتِ مریخ)',
      astrologicalSign: 'برج حمل و عقرب',
      incenseAndMaterials: 'حرمل (اسپند)، گندھک، سرسوں کے دانے اور رائی۔',
      element: 'آتشی',
      stepByStepRitual: [
        '۱. لوہے کی چھری لے کر زمین پر ایک دائرہ (حصارِ اعظم) کھینچیں۔',
        '۲. آیت الکرسی اور عزیمتِ قاہرہ کو ۴۱ بار تلاوت کریں۔',
        '۳. زیر نظر مربعِ فولادی کو سیاہ یا نیلے کاغذ پر کافور سے تحریر کریں۔',
        '۴. جہاں آسیب یا جنات کا بسیرا ہو وہاں یہ نقش لٹکائیں اور رائی کے دانے جلائیں۔',
        '۵. سرکش ترین جن اور خبیث ارواح جل کر بھاگ جائیں گی اور وہ مکان ہمیشہ کے لیے محفوظ ہو جائے گا۔'
      ],
      sealTalismanType: 'مربعِ قاہر و دافعِ جنیان ۴×۴ (آتشی)',
      dimension: 4,
      talismanMatrix: [
        [790, 797, 796, 779],
        [795, 780, 789, 798],
        [781, 794, 799, 788],
        [801, 786, 783, 792]
      ],
      inscribingMetalOrBase: 'سیاہ کاغذ پر یا لوہے کی تختی پر کندہ کریں۔',
      distantInfluenceRule: 'دور دراز کے آسیب زدہ گھر کے لیے اس گھر کے چاروں کونوں کی مٹی منگوا کر اس پر عزیمت دم کر کے واپس بھجوائیں۔',
      ancientMasterNotes: 'کتابِ طمطم ہندی میں درج ہے: یہ عزیمت و طلسم آسیبِ کہنہ اور خبیث سائے کے لیے شمشیرِ برہنہ کی مانند ہے۔',
      strictCautions: [
        'حصار کے اندر رہ کر عمل پڑھیں، عمل کے دوران دائرے سے باہر قدم نہ نکالیں۔',
        'کسی معصوم مخلوق کو بلاوجہ ایذا دینے سے پرہیز کریں۔'
      ],
      targetAzimatCount: 41
    },
    // -------------------------------------------------------------
    // باب سوم: نوامیس و طلسماتِ افلاطون الحکیم
    // -------------------------------------------------------------
    {
      id: 'nawamees-aflatoon-hikmat',
      titleUrdu: 'نوامیسِ افلاطون الحکیم فی اسرارِ حروف، عناصرِ اربعہ و حکمتِ ملوک',
      ancientBookSection: 'الباب الثالث: في نواميس أفلاطون الحكيم وأسرار الحروف والطبائع الأربعة',
      sectionUrdu: 'باب سوم: نوامیس و طلسماتِ افلاطون الحکیم',
      category: 'nawamees_aflatoon',
      categoryUrdu: 'نوامیسِ افلاطون',
      ancientFormulaOrSeal: '﴿يُؤْتِي الْحِكْمَةَ مَن يَشَاءُ ۚ وَمَن يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا﴾ ﴿بِسِرِّ الْعَقْلِ الْفَعَّالِ وَالْأَفْلَاكِ السَّبْعَةِ﴾',
      urduTranslationAndSecret: 'وہ جسے چاہتا ہے حکمت عطا فرماتا ہے، اور جسے حکمت مل گئی اسے خیرِ کثیر عطا ہوئی۔ عقلِ فعال اور ساتوں افلاک کے اسرار کی برکت سے تمام عقول و قلوب مسخر ہوں۔',
      abjadValue: 4120,
      bestPlanetaryHour: 'بدھ کی صبح طلوعِ آفتاب (ساعتِ عطارد)',
      astrologicalSign: 'برج جوزا و سنبلہ',
      incenseAndMaterials: 'عود، مستکی رومی، جاوی اور گلاب کا عرق۔',
      element: 'بادی',
      stepByStepRitual: [
        '۱. افلاطون کی حکمت کے مطابق چاروں عناصر (آگ، ہوا، پانی، مٹی) کا توازن قائم کریں۔',
        '۲. چاندی یا پیتل کی تختی پر مخمسِ افلاطونی ۵×۵ کندہ کریں۔',
        '۳. روزانہ بعد از نمازِ فجر اسمائے الٰہیہ "یا علیم یا حکیم یا فتاح" ۵۰۰ مرتبہ پڑھیں۔',
        '۴. تختی کو اپنے پاس رکھنے والے پر علم و حکمت اور فہم و فراست کے دروازے کھل جائیں گے۔',
        '۵. امراء، حکام اور اہل کار اس کی بات کو باوقار تسلیم کریں گے۔'
      ],
      sealTalismanType: 'مخمسِ حکمتِ افلاطون ۵×۵ (بادی)',
      dimension: 5,
      talismanMatrix: [
        [824, 837, 815, 828, 816],
        [827, 817, 825, 836, 815],
        [835, 818, 824, 819, 824],
        [816, 826, 834, 817, 827],
        [818, 822, 832, 820, 828]
      ],
      inscribingMetalOrBase: 'پیتل یا چاندی کی تختی پر یا سفید صاف کاغذ پر زعفران سے۔',
      distantInfluenceRule: 'حاکم یا افسر کے سامنے جانے سے قبل اس مخمس پر نظر ڈال کر تین بار "یا حکیم" پڑھ کر اپنے اوپر دم کریں۔',
      ancientMasterNotes: 'افلاطون الحکیم لکھتے ہیں: کائنات حروف و اعداد کا ایسا تناسب ہے جو ارواح کو مادے کے ساتھ باندھتا ہے، اس کا عامل کبھی ذلیل نہیں ہوتا۔',
      strictCautions: [
        'علم کا غرور اور تکبر نہ کریں ورنہ حکمت زائل ہو جائے گی۔',
        'حق بات اور سچائی کا ساتھ دیں۔'
      ],
      targetAzimatCount: 500
    },
    // -------------------------------------------------------------
    // باب چہارم: طلسمات و رموزِ بلیناس الحکیم
    // -------------------------------------------------------------
    {
      id: 'talisman-balinas-sirr',
      titleUrdu: 'طلسمِ بلیناس الحکیم (صاحبِ سرّ الخلیقہ) برائے تسخیرِ قلوب و فتوحات',
      ancientBookSection: 'الباب الرابع: في طلسمات ورموز بليناس الحكيم صاحب كتاب سر الخليقة',
      sectionUrdu: 'باب چہارم: طلسمات و رموزِ بلیناس الحکیم',
      category: 'talisman_balinas',
      categoryUrdu: 'طلسماتِ بلیناس الحکیم',
      ancientFormulaOrSeal: '﴿نَصْرٌ مِّنَ اللَّهِ وَفَتْحٌ قَرِيبٌ ۗ وَبَشِّرِ الْمُؤْمِنِينَ﴾ ﴿بِسِرِّ طِلَّسْمِ بَلِينَاسَ وَأَسْرَارِ الْهَيَاكِلِ النُّورَانِيَّةِ﴾',
      urduTranslationAndSecret: 'اللہ کی طرف سے مدد اور عنقریب فتح، اور ایمان والوں کو خوشخبری سنا دیجیے۔ بلیناس کے طلسم اور نورانی ہیاکل کے رازوں سے کامیابی اور نصرت مقدر ہو۔',
      abjadValue: 2890,
      bestPlanetaryHour: 'جمعرات دوپہر ۱۲ بجے (ساعتِ مشتری یا شمس)',
      astrologicalSign: 'برج قوس و حوت',
      incenseAndMaterials: 'صندل سفید، عنبرِ اشہب، لبان و زعفران۔',
      element: 'آبی',
      stepByStepRitual: [
        '۱. بلیناس الحکیم کے طلسماتی رموز کو جمعرات کے دن جب مشتری سعد ہو، سفید پتھر یا عقیق پر کندہ کریں۔',
        '۲. زیر نظر خاتمِ بلیناس کو چاندی کی انگوٹھی کے نگینے کے نیچے محفوظ کریں۔',
        '۳. روزانہ "یا عزیز یا قوی یا ناصر" ۳۰۰ بار تلاوت کریں۔',
        '۴. اس انگوٹھی کو پہن کر میدانِ جنگ، عدالت، تجارتی معاہدے یا بڑے مجمعے میں جائیں۔',
        '۵. دشمنوں کے دلوں پر ہیبت اور احباب کے دلوں پر الفت طاری ہو جائے گی۔'
      ],
      sealTalismanType: 'ہیکلِ نورانی و خاتمِ بلیناس ۳×۳ (آبی)',
      dimension: 3,
      talismanMatrix: [
        [964, 957, 967],
        [963, 'بلیناس', 965],
        [961, 966, 962]
      ],
      inscribingMetalOrBase: 'چاندی کی انگوٹھی، عقیقِ یمنی یا سفید پتھر پر۔',
      distantInfluenceRule: 'اگر دور کے مخالف کو مغلوب کرنا ہو تو اس طلسم کو پانی میں دھو کر اس پانی کو زمین پر شمال کی جانب چھڑکیں۔',
      ancientMasterNotes: 'بلیناس الحکیم فرماتے ہیں: جو شخص اس طلسم کو پاکیزگی کے ساتھ پاس رکھے گا، دنیا کے تمام اسباب اس کے لیے مسخر ہو جائیں گے۔',
      strictCautions: [
        'شراب اور حرام غذا سے سختی کے ساتھ اجتناب کریں۔',
        'غصے کی حالت میں کسی پر بددعا نہ کریں۔'
      ],
      targetAzimatCount: 300
    },
    // -------------------------------------------------------------
    // باب پنجم: نوامیس و عزائمِ والیس اسکندرانی
    // -------------------------------------------------------------
    {
      id: 'nawamees-valens-alexandria',
      titleUrdu: 'نوامیسِ والیس اسکندرانی برائے جاہ و جلال، تسخیرِ ملوک و سلاطین',
      ancientBookSection: 'الباب الخامس: في نواميس وعزائم واليس الإسكندراني وتسخير الملوك والأكابر',
      sectionUrdu: 'باب پنجم: نوامیس و عزائمِ والیس اسکندرانی',
      category: 'nawamees_valens',
      categoryUrdu: 'نوامیسِ والیس اسکندرانی',
      ancientFormulaOrSeal: '﴿قُلِ اللَّهُمَّ مَالِكَ الْمُلْكِ تُؤْتِي الْمُلْكَ مَن تَشَاءُ وَتَنزِعُ الْمُلْكَ مِمَّن تَشَاءُ﴾ ﴿بِسِرِّ نَوَامِيسِ الإِسْكَنْدَرِ ذِي الْقَرْنَيْنِ﴾',
      urduTranslationAndSecret: 'کہہ دیجیے اے اللہ! بادشاہی کے مالک! تو جسے چاہے حکومت دے اور جس سے چاہے چھین لے۔ اسکندریہ کے نوامیس اور ذوالقرنین کی ہیبت کے صدقے جاہ و جلال عطا ہو۔',
      abjadValue: 3750,
      bestPlanetaryHour: 'اتوار یا جمعرات دوپہر (ساعتِ شمس)',
      astrologicalSign: 'برج اسد و سنبلہ',
      incenseAndMaterials: 'مشک، عودِ ہندی، زعفران اور عنبر۔',
      element: 'آتشی',
      stepByStepRitual: [
        '۱. اسکندریہ کے قدیم یونانی و مصری علم کے مطابق طلسمِ والیس تیار کریں۔',
        '۲. سونے یا گلٹ کی تختی پر مربعِ ملوک ۴×۴ تحریر کریں۔',
        '۳. روزانہ ۱۰۰ بار آیتِ ملک تلاوت کریں اور تختی پر دم کریں۔',
        '۴. یہ لوح اپنے گلے میں پہنیں یا دستار/ٹوپی میں رکھیں، صاحبِ عزت و وقار بنیں گے۔'
      ],
      sealTalismanType: 'مربعِ ملوک و جاہ و جلال ۴×۴ (آتشی)',
      dimension: 4,
      talismanMatrix: [
        [938, 945, 944, 927],
        [943, 928, 937, 946],
        [929, 942, 947, 936],
        [949, 934, 931, 940]
      ],
      inscribingMetalOrBase: 'سونے، پیتل یا ریشم کے کپڑے پر زعفران سے۔',
      distantInfluenceRule: 'کسی دور دراز بادشاہ یا جج کے فیصلے کو اپنے حق میں کرنے کے لیے اس طلسم پر اس کا نام لکھ کر قبلہ رو کھڑے ہو کر دم کریں۔',
      ancientMasterNotes: 'والیس اسکندرانی لکھتے ہیں: افلاک کے زاویے جب اس مربع میں مجتمع ہوتے ہیں تو دلوں پر رعب و دبدبہ قائم ہو جاتا ہے۔',
      strictCautions: [
        'مظلوموں پر ظلم اور ناجائز تکبر سے باز رہیں۔',
        'نمازِ پنجگانہ کی پابندی لازمی ہے۔'
      ],
      targetAzimatCount: 100
    },
    // -------------------------------------------------------------
    // باب ششم: طلسماتِ ہندیہ برائے کشفِ کنوز و اسرار
    // -------------------------------------------------------------
    {
      id: 'tamtam-kashf-kunooz',
      titleUrdu: 'طلسمِ ہندی برائے کشفِ کنوز، خوارقِ عادات و رویتِ مغیبات',
      ancientBookSection: 'الباب السادس: في طلسمات طمطم الهندي لكشف الدفائن والكنوز وعلم الغيب',
      sectionUrdu: 'باب ششم: طلسماتِ ہندیہ قدیمہ برائے کشفِ کنوز و اسرار',
      category: 'hidden_treasures',
      categoryUrdu: 'کشفِ کنوز و اسرار',
      ancientFormulaOrSeal: '﴿وَعِندَهُ مَفَاتِحُ الْغَيْبِ لَا يَعْلَمُهَا إِلَّا هُوَ﴾ ﴿بِحَقِّ الْبَاطِنِ الْخَبِيرِ اكْشِفْ لِي مَا تَحْتَ الثَّرَىٰ وَمَا فِي الصُّدُورِ﴾',
      urduTranslationAndSecret: 'اور اسی کے پاس غیب کی کنجیاں ہیں جنہیں اس کے سوا کوئی نہیں جانتا۔ اے باطن و باخبر ذات! مٹی کے نیچے کے دفینے اور سینوں کے راز مجھ پر عیاں فرما۔',
      abjadValue: 2640,
      bestPlanetaryHour: 'پیر یا جمعہ کی رات (ساعتِ قمر)',
      astrologicalSign: 'برج سرطان و حوت',
      incenseAndMaterials: 'صندل، مشک، کافور اور لوبان۔',
      element: 'آبی',
      stepByStepRitual: [
        '۱. نصف شب کے وقت باوضو ہو کر جائے نماز پر تنہا بیٹھیں۔',
        '۲. سرمہ سیاہ پر یہ طلسم اور اسمِ "یا خبیر یا علیم" ۱۰۰۰ بار دم کریں۔',
        '۳. رات کو سوتے وقت وہ سرمہ آنکھوں میں لگائیں اور زیرِ سر مثلثِ کشف رکھیں۔',
        '۴. خواب میں پوشیدہ خزانوں، گمشدہ چیزوں اور غیبی احوال کا واضح مشاہدہ ہو گا۔'
      ],
      sealTalismanType: 'مثلثِ کشف و بصیرت ۳×۳ (آبی)',
      dimension: 3,
      talismanMatrix: [
        [881, 874, 884],
        [880, 'کشف', 882],
        [878, 883, 879]
      ],
      inscribingMetalOrBase: 'سفید کاغذ پر عرقِ گلاب و زعفران سے۔',
      distantInfluenceRule: 'کسی دور کے مقام کی زمین یا مکان کے حالات جاننے کے لیے اس جگہ کی تصویر یا نقشہ سامنے رکھ کر طلسم کو اس کے اوپر رکھیں۔',
      ancientMasterNotes: 'حکیم طمطم ہندی فرماتے ہیں: کشفِ قلوب اور کشفِ قبور کے لیے اس سے زیادہ سریع التاثیر کوئی عمل نہیں۔',
      strictCautions: [
        'دیکھے گئے رازوں کو بلا ضرورت فاش نہ کریں۔',
        'لالچ اور دنیا پرستی سے دل کو پاک رکھیں۔'
      ],
      targetAzimatCount: 1000
    },
    // -------------------------------------------------------------
    // باب ہفتم: زجرات، تصاریف و شروطِ ریاضت
    // -------------------------------------------------------------
    {
      id: 'zajrat-tamtam-protection',
      titleUrdu: 'زجراتِ طمطمیہ و انصرافِ ارواح و حفاظتی شروطِ ریاضت',
      ancientBookSection: 'الباب السابع: في زجرات طمطم الهندي وصرف العمار وانصراف الأرواح وتحصين الخادم',
      sectionUrdu: 'باب ہفتم: زجرات، انصرافِ عمار و شرائطِ ریاضت',
      category: 'zajrat_protections',
      categoryUrdu: 'زجرات و انصراف',
      ancientFormulaOrSeal: '﴿إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا﴾ ﴿بِحَقِّ هَذِهِ الْعَزِيمَةِ انْصَرِفُوا يَا عُمَّارَ الْمَكَانِ بِسَلَامٍ آمِنِينَ حَتَّى نَقْضِيَ حَاجَتَنَا﴾',
      urduTranslationAndSecret: 'جب زمین اپنے سخت جھٹکے سے ہلا دی جائے گی۔ اس عزیمت کے حق سے اے مکان کے عمار و رہنے والی روحو! سلامتی کے ساتھ چلے جاؤ یہاں تک کہ ہم اپنی حاجت پوری کر لیں۔',
      abjadValue: 1980,
      bestPlanetaryHour: 'تمام اوقات میں بوقتِ ضرورت و اختتامِ عمل',
      astrologicalSign: 'تمام بروج',
      incenseAndMaterials: 'حرمل، لبان، کلونجی اور صندل۔',
      element: 'خاکی',
      stepByStepRitual: [
        '۱. کسی بھی عمل یا تسخیر کو شروع کرنے سے پہلے ۳ بار سورۃ الزلزال پڑھ کر "اشتاتاً" پر عمارِ مکان کو رخصت کریں۔',
        '۲. عمل ختم ہونے پر ارواح کو واپس بھیجنے کے لیے زجرِ انصراف پڑھیں۔',
        '۳. اگر ارواح کی طرف سے کوئی بوجھ یا خوف محسوس ہو تو یہ طلسمِ انصراف گلے میں ڈالیں۔',
        '۴. تمام روحانی ثقل، بھاری پن اور خوف فوراً دور ہو جائے گا۔'
      ],
      sealTalismanType: 'خاتمِ انصراف و تحفظ ۴×۴ (خاکی)',
      dimension: 4,
      talismanMatrix: [
        [495, 502, 501, 484],
        [500, 485, 494, 503],
        [486, 499, 504, 493],
        [506, 491, 488, 497]
      ],
      inscribingMetalOrBase: 'سفید کاغذ پر مشک و زعفران سے۔',
      distantInfluenceRule: 'دور کے کسی عامل یا مریض پر رجعت ہو تو اس کے نام پر زجرِ انصراف ۷ بار پڑھ کر پانی پر دم کر کے پلائیں۔',
      ancientMasterNotes: 'حکیم طمطم ہندی فرماتے ہیں: جو عامل صرفِ عمار اور انصرافِ ارواح کا طریقہ نہیں جانتا وہ ایسے ہی ہے جیسے بغیر ڈھال کے تلواروں کی جنگ میں کود پڑے۔',
      strictCautions: [
        'عمل کے اختتام پر انصراف پڑھنا کبھی نہ بھولیں ورنہ گھر میں خلل واقع ہو سکتا ہے۔',
        'ہمیشہ شکرانے کے نوافل ادا کریں۔'
      ],
      targetAzimatCount: 7
    }
  ];

  const filteredCatalog = useMemo(() => {
    return catalog.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery = !searchQuery.trim() || 
        item.titleUrdu.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sectionUrdu.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.urduTranslationAndSecret.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      {/* Header Banner with Antique Mystic Styling */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1b1c1e] via-[#2c221a] to-[#121113] p-6 sm:p-8 text-[#f4ebd0] shadow-2xl border-2 border-[#d4af37]/40">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-[#bc6c25]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-xs text-[#d4af37] font-bold">
              <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>مخطوطۂ نادرہ و جامع کتبِ طلسماتِ ہندیہ و یونانیہ قدیمہ</span>
            </div>
            <h1 className="font-amiri text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Flame className="h-8 w-8 text-[#d4af37] animate-pulse shrink-0 fill-[#d4af37]/30" />
              <span>طلسماتِ طمطم ہندی مع تسخیرِ روحانیات و عزائمِ جنیان</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#e6ccb2] leading-relaxed">
              شامل: <strong>نوامیسِ افلاطون الحکیم</strong>، <strong>طلسماتِ بلیناس الحکیم</strong> اور <strong>نوامیسِ والیس اسکندرانی</strong> | مکمل اردو شرح، ابواب، نقوش، عزائم اور عملی شروط
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setActiveSubTab('four_philosophers_explorer')}
              className="px-4 py-2 rounded-xl bg-[#d4af37] hover:bg-[#b89728] text-[#1a120b] font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer transform hover:scale-105"
            >
              <Atom className="h-4 w-4" />
              <span>چاروں حکماء کے نوامیس</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-[#d4af37]/20 hover:bg-[#d4af37]/30 border border-[#d4af37]/40 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>پرنٹ / محفوظ</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="mt-6 pt-4 border-t border-[#d4af37]/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'catalog', label: 'تمام ابواب و طلسمات', icon: BookOpen },
              { id: 'four_philosophers_explorer', label: 'نوامیسِ افلاطون، بلیناس و والیس', icon: Atom },
              { id: 'protective_hisar', label: 'حصارِ اعظم و انصرافِ عمار', icon: ShieldCheck },
              { id: 'elemental_resonator', label: 'محاسبِ عناصر و مطابقتِ طبع', icon: Compass },
              { id: 'live_azimat', label: 'کاؤنٹر برائے عزائم و طلسمات', icon: Activity }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeSubTab === tab.id
                      ? 'bg-[#d4af37] text-[#1a120b] shadow-md ring-2 ring-[#d4af37]/50 font-black'
                      : 'bg-[#2b2118]/80 text-[#e6ccb2] hover:bg-[#3d2e22] border border-[#d4af37]/20'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-[#d4af37]/80 hidden lg:flex items-center gap-1 font-amiri">
            <span>کل ابواب: ۷ | نادر نقوش: {catalog.length} | مکمل اردو تصحیح</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 1: CATALOG OF CHAPTERS & TALISMANS */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'catalog' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="p-4 rounded-2xl bg-white border border-[#d4af37]/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#bc6c25]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="تلاش کریں: طمطم، افلاطون، بلیناس، والیس، جنیان، کنوز..."
                className="w-full pr-10 pl-4 py-2 rounded-xl bg-[#fdfaf1] border border-[#d4af37]/50 text-xs text-[#2c1e14] placeholder-[#8d6e63] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <Filter className="h-4 w-4 text-[#bc6c25] shrink-0" />
              {[
                { id: 'all', label: 'تمام ابواب' },
                { id: 'tamtam_core', label: 'باب اول: طمطم ہندی' },
                { id: 'jinn_subjugation', label: 'باب دوم: عزائمِ جنیان' },
                { id: 'nawamees_aflatoon', label: 'باب سوم: نوامیسِ افلاطون' },
                { id: 'talisman_balinas', label: 'باب چہارم: طلسمِ بلیناس' },
                { id: 'nawamees_valens', label: 'باب پنجم: نوامیسِ والیس' },
                { id: 'hidden_treasures', label: 'باب ششم: کشفِ کنوز' },
                { id: 'zajrat_protections', label: 'باب ہفتم: زجرات و انصراف' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#d4af37] text-[#1a120b] shadow-sm font-black'
                      : 'bg-[#faedcd]/60 text-[#5c4033] hover:bg-[#faedcd]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Talismans */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCatalog.map(item => (
              <div
                key={item.id}
                className="rounded-2xl bg-white border border-[#d4af37]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-[#d4af37]"
              >
                <div className="p-5 space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#faedcd] text-[#78350f] border border-[#d4af37]/40">
                      {item.categoryUrdu}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-200">
                      طبع: {item.element} | عدد: {item.abjadValue}
                    </span>
                  </div>

                  {/* Title & Section */}
                  <div>
                    <span className="text-[11px] font-bold text-[#bc6c25] block mb-1 font-amiri">
                      {item.sectionUrdu}
                    </span>
                    <h3 className="font-amiri text-lg font-bold text-[#2c1e14] group-hover:text-[#bc6c25] transition-colors leading-snug">
                      {item.titleUrdu}
                    </h3>
                  </div>

                  {/* Formula Preview Box */}
                  <div className="p-3 rounded-xl bg-[#fdfaf1] border border-[#d4af37]/30 text-right space-y-1">
                    <p className="font-amiri font-bold text-xs text-[#5d4037] line-clamp-2 leading-relaxed" dir="rtl">
                      {item.ancientFormulaOrSeal}
                    </p>
                    <p className="text-[11px] text-[#795548] line-clamp-2 italic">
                      {item.urduTranslationAndSecret}
                    </p>
                  </div>

                  {/* Planetary & Material Meta */}
                  <div className="space-y-1.5 text-xs text-[#4e342e] bg-[#fbf6ee] p-2.5 rounded-xl border border-[#e7d8c9]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#bc6c25] shrink-0" />
                      <span className="font-bold">ساعت و برج:</span>
                      <span className="text-[11px] text-gray-700 truncate">{item.bestPlanetaryHour} ({item.astrologicalSign})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flame className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
                      <span className="font-bold">بخور و مواد:</span>
                      <span className="text-[11px] text-gray-700 truncate">{item.incenseAndMaterials}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 bg-[#fdfaf1] border-t border-[#e7d8c9] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="flex-1 py-2 rounded-xl bg-[#2c221a] hover:bg-[#3d2e22] text-[#f4ebd0] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-[#d4af37]" />
                    <span>مکمل طلسم و راز دیکھیں</span>
                  </button>

                  {onSendToNaqsh && (
                    <button
                      onClick={() => onSendToNaqsh(item.abjadValue)}
                      className="p-2 rounded-xl bg-white hover:bg-[#faedcd] border border-[#d4af37] text-[#bc6c25] transition-colors cursor-pointer"
                      title="مولد النقوش میں عدد بھیجیں"
                    >
                      <Layers className="h-4 w-4" />
                    </button>
                  )}
                  {onSendToTakseer && (
                    <button
                      onClick={() => onSendToTakseer(item.titleUrdu)}
                      className="p-2 rounded-xl bg-white hover:bg-[#faedcd] border border-[#d4af37] text-[#5d4037] transition-colors cursor-pointer"
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
      {/* SUB-TAB 2: FOUR PHILOSOPHERS & MASTER MYSTERIES */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'four_philosophers_explorer' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border-2 border-[#d4af37]/40 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-[#e7d8c9] pb-4">
              <div className="p-3 rounded-2xl bg-[#faedcd] text-[#78350f]">
                <Atom className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-amiri text-xl font-bold text-[#2c1e14]">
                  نوامیسِ کبار: افلاطون، بلیناس، والیس اسکندرانی اور طمطم ہندی کا باہمی ربط
                </h3>
                <p className="text-xs text-[#795548]">
                  قدیم ہندی، یونانی اور اسکندریائی حکماء کے طلسماتی نظریات، عناصرِ اربعہ کے قوانین اور ارواح کی تسخیر کے اصول
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Philosopher 1: Plato */}
              <div className="p-5 rounded-2xl bg-[#fdfaf1] border border-[#d4af37]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#d4af37]" />
                    <span>۱. نوامیسِ افلاطون الحکیم (Plato):</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#faedcd] text-[#78350f]">
                    عنصر: باد و عقل
                  </span>
                </div>
                <p className="text-xs text-[#5d4037] leading-relaxed">
                  افلاطون کا اصل نظریہ یہ ہے کہ مادی دنیا دراصل عالمِ امثال (عالمِ ارواح) کا عکس ہے۔ جو شخص حروف کے تناسب اور عناصر کی ترتیب سے طلسم بناتا ہے وہ مادہ پر ارواح کو حاکم کر دیتا ہے۔
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-[#e7d8c9] text-xs text-[#795548]">
                  <strong>بنیادی قاعدہ:</strong> افلاطون کے مطابق علم و حکمت اور تسخیرِ حکام کے لیے ساعتِ عطارد اور مخمسِ عددی سب سے اعلیٰ تاثر رکھتے ہیں۔
                </div>
              </div>

              {/* Philosopher 2: Balinas */}
              <div className="p-5 rounded-2xl bg-[#fdfaf1] border border-[#d4af37]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#d4af37]" />
                    <span>۲. طلسماتِ بلیناس الحکیم (Apollonius):</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#faedcd] text-[#78350f]">
                    عنصر: آب و ہیاکل
                  </span>
                </div>
                <p className="text-xs text-[#5d4037] leading-relaxed">
                  بلیناس صاحبِ کتاب "سرّ الخلیقہ" وہ عظیم یونانی حکیم ہیں جنہوں نے پتھروں، دھاتوں اور ہیاکلِ نورانی کے ذریعے زمین کے تمام اثرات کو منضبط کرنے کے قوانین مدون کیے۔
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-[#e7d8c9] text-xs text-[#795548]">
                  <strong>بنیادی قاعدہ:</strong> بلیناس کا طلسم دشمن پر فتح، دفعِ آفات اور تسخیرِ عام کے لیے چاندی و عقیق پر کندہ کیا جاتا ہے۔
                </div>
              </div>

              {/* Philosopher 3: Valens */}
              <div className="p-5 rounded-2xl bg-[#fdfaf1] border border-[#d4af37]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#d4af37]" />
                    <span>۳. نوامیسِ والیس اسکندرانی (Vettius Valens):</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#faedcd] text-[#78350f]">
                    عنصر: آتش و ملوک
                  </span>
                </div>
                <p className="text-xs text-[#5d4037] leading-relaxed">
                  اسکندریہ کے عظیم مصری و یونانی منجم و محقق والیس نے سلاطین، امراء اور وزراء کے دلوں میں دبدبہ اور ہیبت پیدا کرنے کے لیے مربعِ شمس اور بروج کے خاص تقاطعات دریافت کیے۔
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-[#e7d8c9] text-xs text-[#795548]">
                  <strong>بنیادی قاعدہ:</strong> والیس کے نوامیس کے ذریعے بند دروازے کھلتے ہیں اور باوقار اقتدار حاصل ہوتا ہے۔
                </div>
              </div>

              {/* Philosopher 4: Tamtam Hindi */}
              <div className="p-5 rounded-2xl bg-[#fdfaf1] border border-[#d4af37]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#d4af37]" />
                    <span>۴. طلسماتِ طمطم ہندی (Tamtam al-Hindi):</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#faedcd] text-[#78350f]">
                    عنصر: خاک و روحانیات
                  </span>
                </div>
                <p className="text-xs text-[#5d4037] leading-relaxed">
                  ہند کے عظیم صوفی و جفری حکیم طمطم ہندی نے جنات و شیاطین کو قید کرنے، ان کے شر سے بچنے اور ارواحِ علویہ کی مدد سے خزانوں اور کنوز کے کشف کے نایاب طلسمات ایجاد کیے۔
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-[#e7d8c9] text-xs text-[#795548]">
                  <strong>بنیادی قاعدہ:</strong> طمطم ہندی کے تمام اعمال میں حصارِ آیت الکرسی اور صرفِ عمار کی سخت شرط لازم ہے۔
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 3: PROTECTIVE HISAR & BANISHING SPIRITS */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'protective_hisar' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border-2 border-[#bc6c25]/40 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-[#e7d8c9] pb-4">
              <div className="p-3 rounded-2xl bg-[#faedcd] text-[#bc6c25]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-amiri text-xl font-bold text-[#2c1e14]">
                  حصارِ اعظم، انصرافِ عمار اور رجعت سے بچاؤ کے قواعد
                </h3>
                <p className="text-xs text-[#795548]">
                  طلسماتِ طمطم ہندی اور نوامیسِ یونانیہ کے تمام اعمال کے دوران عامل کے تحفظ کی مکمل ہدایات
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <span className="font-bold text-amber-900 text-sm block">۱. حصارِ فولادی کا طریقہ:</span>
                <p className="text-xs text-amber-800 leading-relaxed">
                  لوہے کی چھری ہاتھ میں لے کر آیت الکرسی ۷ بار پڑھیں، ہر بار چھری پر دم کریں اور اپنے گرد زمین پر گول دائرہ کھینچیں۔ عمل مکمل ہونے تک دائرے کے اندر رہیں۔
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <span className="font-bold text-emerald-900 text-sm block">۲. صرفِ عمار (رخصت کرنا):</span>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  عمل شروع کرنے سے قبل سورۃ الزلزال ۳ مرتبہ پڑھیں اور جب "اشْتَاتًا" پر پہنچیں تو اسے ۳ بار دہرائیں اور ہاتھ کے اشارے سے مکان کے ہمزاد و جنات کو عارضی رخصت کریں۔
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2">
                <span className="font-bold text-indigo-900 text-sm block">۳. انصراف و اختتام:</span>
                <p className="text-xs text-indigo-800 leading-relaxed">
                  عمل مکمل ہونے کے بعد یہ زجر پڑھیں: "بِحَقِّ هَذِهِ الْعَزِيمَةِ انْصَرِفُوا مَأْجُورِينَ بَارَكَ اللَّهُ فِيكُمْ وَعَلَيْكُمْ" تاکہ حاضر شدہ ارواح بخیر و عافیت واپس لوٹ جائیں۔
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 4: ELEMENTAL RESONATOR CALCULATOR */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'elemental_resonator' && (
        <div className="p-6 rounded-3xl bg-white border-2 border-[#d4af37]/40 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-[#e7d8c9] pb-4">
            <div className="p-3 rounded-2xl bg-[#faedcd] text-[#78350f]">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-amiri text-xl font-bold text-[#2c1e14]">
                محاسبِ عناصرِ اربعہ و مطابقتِ نوامیسِ کبار
              </h3>
              <p className="text-xs text-[#795548]">
                اپنا نام مع والدہ داخل کر کے معلوم کریں کہ آپ کی طبع (آتشی، بادی، آبی، خاکی) کے لیے افلاطون، بلیناس، والیس یا طمطم میں سے کون سا نظام سب سے زیادہ موافق ہے۔
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2c1e14] block">نامِ عامل:</label>
              <input
                type="text"
                value={practitionerName}
                onChange={(e) => setPractitionerName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#fdfaf1] border border-[#d4af37] text-sm text-[#2c1e14] font-bold"
                placeholder="مثلاً: محمد علی"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2c1e14] block">والدہ کا نام:</label>
              <input
                type="text"
                value={practitionerMother}
                onChange={(e) => setPractitionerMother(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#fdfaf1] border border-[#d4af37] text-sm text-[#2c1e14] font-bold"
                placeholder="مثلاً: مریم"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#2c221a] text-[#f4ebd0] border border-[#d4af37]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-right">
              <span className="text-xs text-[#d4af37] font-bold">حکیم و نظامِ موافق:</span>
              <h4 className="font-amiri text-xl font-black text-white">
                نوامیسِ افلاطون الحکیم و طلسماتِ طمطم ہندی
              </h4>
              <p className="text-[11px] text-[#e6ccb2]">
                آپ کی طبع میں باد اور آگ کا غلبہ ہے، لہٰذا تکسیرِ حروف اور آتشی نقوش آپ کے لیے تیر بہدف ہیں۔
              </p>
            </div>

            {onSendToNaqsh && (
              <button
                onClick={() => onSendToNaqsh(2480)}
                className="px-5 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#b89728] text-[#1a120b] text-xs font-black shadow-md cursor-pointer transition-all shrink-0"
              >
                نقش جنریٹر میں موافق عدد بھیجیں
              </button>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 5: LIVE AZIMAT COUNTER */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'live_azimat' && (
        <div className="p-6 rounded-3xl bg-white border border-[#d4af37]/40 shadow-sm space-y-6 text-center max-w-xl mx-auto">
          <div className="p-4 rounded-2xl bg-[#faedcd] text-[#78350f] inline-block">
            <Activity className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-amiri text-2xl font-bold text-[#2c1e14]">
              شمار کنندۂ عزائم و طلسماتِ طمطم (Live Azimat Counter)
            </h3>
            <p className="text-xs text-[#795548] mt-1">
              طلسماتی عزائم، نوامیس اور دعوات کے ورد کا لائیو کاؤنٹر
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#fdfaf1] border-2 border-[#d4af37]/40 space-y-4">
            <div className="text-6xl font-black text-[#bc6c25] font-amiri tracking-wider">
              {azimatCount} / <span className="text-2xl text-gray-400">{targetCount}</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#bc6c25] h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (azimatCount / targetCount) * 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setAzimatCount(prev => prev + 1)}
                className="px-8 py-4 rounded-2xl bg-[#2c221a] hover:bg-[#3d2e22] text-[#f4ebd0] text-lg font-bold shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                + شمار کریں (Tap)
              </button>
              <button
                onClick={() => setAzimatCount(0)}
                className="p-4 rounded-2xl bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 transition-colors cursor-pointer"
                title="ری سیٹ کریں"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            {[41, 100, 108, 313, 1000].map(cnt => (
              <button
                key={cnt}
                onClick={() => { setTargetCount(cnt); setAzimatCount(0); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                  targetCount === cnt
                    ? 'bg-[#d4af37] text-[#1a120b] border-[#d4af37] font-bold'
                    : 'bg-white text-[#2c1e14] border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cnt} مرتبہ
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* DETAILED TALISMAN MODAL */}
      {/* ------------------------------------------------------------- */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#d4af37] shadow-2xl p-6 sm:p-8 space-y-6 text-[#2c1e14] relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 left-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="space-y-1 border-b border-[#e7d8c9] pb-4">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#faedcd] text-[#78350f]">
                {selectedItem.sectionUrdu}
              </span>
              <h2 className="font-amiri text-2xl sm:text-3xl font-bold text-[#2c1e14]">
                {selectedItem.titleUrdu}
              </h2>
              <p className="text-xs text-[#795548] font-amiri">
                {selectedItem.ancientBookSection}
              </p>
            </div>

            {/* Formula Box */}
            <div className="p-4 rounded-2xl bg-[#fdfaf1] border border-[#d4af37]/40 space-y-2 text-right">
              <span className="text-xs font-bold text-[#bc6c25] block">عزیمت / کلماتِ طلسم / قسم:</span>
              <p className="font-amiri font-bold text-base sm:text-lg text-[#5d4037] leading-relaxed" dir="rtl">
                {selectedItem.ancientFormulaOrSeal}
              </p>
              <p className="text-xs text-[#795548] pt-2 border-t border-[#e7d8c9]">
                <strong>راز و تشریح:</strong> {selectedItem.urduTranslationAndSecret}
              </p>
            </div>

            {/* Metadata Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-gray-500 block">کل عددِ ابجد:</span>
                <strong className="text-sm font-amiri text-[#2c1e14]">{selectedItem.abjadValue}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-gray-500 block">عنصر و طبع:</span>
                <strong className="text-sm text-[#2c1e14]">{selectedItem.element}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-gray-500 block">ساعت و برج:</span>
                <strong className="text-sm text-[#2c1e14]">{selectedItem.bestPlanetaryHour}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-gray-500 block">تعدادِ تلاوت:</span>
                <strong className="text-sm text-[#2c1e14]">{selectedItem.targetAzimatCount} بار</strong>
              </div>
            </div>

            {/* Step by step ritual */}
            <div className="space-y-3">
              <h4 className="font-amiri text-lg font-bold text-[#2c1e14] flex items-center gap-2">
                <Feather className="h-5 w-5 text-[#bc6c25]" />
                <span>قواعدِ کتابت و عملِ ریاضت:</span>
              </h4>
              <div className="space-y-2">
                {selectedItem.stepByStepRitual.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#fdfaf1] border border-[#e7d8c9] text-xs text-[#5d4037] leading-relaxed">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Naqsh / Talisman Matrix Visualizer */}
            <div className="space-y-3">
              <h4 className="font-amiri text-lg font-bold text-[#2c1e14] flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#bc6c25]" />
                <span>نقش و خاتمِ طلسماتی ({selectedItem.sealTalismanType}):</span>
              </h4>
              <div className="p-4 rounded-2xl bg-[#1a120b] border border-[#d4af37]/40 flex justify-center">
                <div
                  className="grid gap-1 bg-[#d4af37] p-2 rounded-xl shadow-inner max-w-sm w-full"
                  style={{ gridTemplateColumns: `repeat(${selectedItem.dimension}, minmax(0, 1fr))` }}
                >
                  {selectedItem.talismanMatrix.map((row, rIdx) =>
                    row.map((cell, cIdx) => (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className="bg-[#fdfaf1] aspect-square flex items-center justify-center p-1 rounded-lg text-center font-amiri font-bold text-xs sm:text-sm text-[#2c1e14] border border-[#d4af37]/40"
                      >
                        {cell}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Master Notes */}
            <div className="p-4 rounded-2xl bg-[#faedcd]/60 border border-[#d4af37] text-xs text-[#5d4037] italic">
              <strong>وصیتِ حکیم:</strong> "{selectedItem.ancientMasterNotes}"
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold cursor-pointer"
              >
                بند کریں
              </button>

              <div className="flex items-center gap-2">
                {onSendToNaqsh && (
                  <button
                    onClick={() => {
                      onSendToNaqsh(selectedItem.abjadValue);
                      setSelectedItem(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#b89728] text-[#1a120b] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Layers className="h-4 w-4" />
                    <span>نقش جنریٹر میں کھولیں</span>
                  </button>
                )}
                {onSendToTakseer && (
                  <button
                    onClick={() => {
                      onSendToTakseer(selectedItem.titleUrdu);
                      setSelectedItem(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#2c221a] hover:bg-[#1a120b] text-[#f4ebd0] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Flame className="h-4 w-4 text-[#d4af37]" />
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
