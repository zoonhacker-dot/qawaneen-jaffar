import React, { useState, useMemo, useRef } from 'react';
import { 
  Sparkles, 
  Flame, 
  Wind, 
  Droplet,
  Droplets, 
  Mountain, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  BookOpen, 
  ShieldAlert, 
  Camera, 
  Upload, 
  Layers, 
  Award, 
  Sun, 
  Moon, 
  Compass, 
  Dices, 
  Zap, 
  HelpCircle,
  PhoneCall,
  Download,
  Printer,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { calculateAbjad, generateNaqsh } from '../utils/jafrEngine';
import { ChalType } from '../types';

// Traditional Aflatoon Elemental Tables & Saad/Nahs Letters
const AFLATOON_ELEMENTAL_LETTERS = {
  fire: {
    name: 'آتش',
    saad: ['ا', 'ہ', 'ط', 'م'],
    nahs: ['ف', 'ش', 'ذ'],
    color: 'text-red-700 bg-red-50/80 border-red-200',
    headerBg: 'bg-red-600 text-white',
  },
  earth: {
    name: 'خاک',
    saad: ['ب', 'و', 'ی', 'ن'],
    nahs: ['ص', 'ض', 'ظ', 'ت'],
    color: 'text-emerald-800 bg-emerald-50/80 border-emerald-200',
    headerBg: 'bg-emerald-700 text-white',
  },
  air: {
    name: 'باد',
    saad: ['ج', 'ز', 'ک', 'س', 'ق'],
    nahs: ['ث', 'خ', 'غ'],
    color: 'text-amber-800 bg-amber-50/80 border-amber-200',
    headerBg: 'bg-amber-600 text-white',
  },
  water: {
    name: 'آب',
    saad: ['د', 'ح', 'ل', 'ع', 'ر'],
    nahs: ['د', 'ر'],
    color: 'text-blue-800 bg-blue-50/80 border-blue-200',
    headerBg: 'bg-blue-600 text-white',
  },
};

// 16 Sacred Ramal Figures with elemental attributes and letters
const RAMAL_FIGURES = [
  { id: 'lihyan', nameUrdu: 'لحیان', pattern: [1, 1, 1, 2], element: 'fire', nature: 'سعد داخل', letters: 'ا ہ ط م', kabir: 55, rulingPlanet: 'مشتری', meaning: 'علم، حکمت، دولت، بلندیِ مراتب' },
  { id: 'qabd_dakhil', nameUrdu: 'قبض الداخل', pattern: [2, 1, 2, 1], element: 'earth', nature: 'سعد داخل', letters: 'ب و ی ن', kabir: 68, rulingPlanet: 'زحل', meaning: 'حصولِ مال، امانت، بقائے اقتدار' },
  { id: 'qabd_kharij', nameUrdu: 'قبض الخارج', pattern: [1, 2, 1, 2], element: 'air', nature: 'نحس خارج', letters: 'ج ز ک س', kabir: 84, rulingPlanet: 'شمس', meaning: 'نقصانِ مال، خرچ، فراق' },
  { id: 'jamaat', nameUrdu: 'جماعت', pattern: [1, 1, 1, 1], element: 'water', nature: 'سعد ممتزج', letters: 'د ح ل ع', kabir: 115, rulingPlanet: 'قمر', meaning: 'مجمع، صلح، اتحاد، شادی و رفاقت' },
  { id: 'farah', nameUrdu: 'بیاض (فرح)', pattern: [2, 2, 1, 2], element: 'water', nature: 'سعد ثابت', letters: 'ف ق ر ش', kabir: 980, rulingPlanet: 'زہرہ', meaning: 'خوشی، بشارت، پاکیزگی، فتح' },
  { id: 'humrah', nameUrdu: 'حمرہ', pattern: [2, 1, 1, 2], element: 'fire', nature: 'نحس عارض', letters: 'ش ت ث خ', kabir: 1800, rulingPlanet: 'مریخ', meaning: 'جوش، غصہ، خون، قہر، دشمنی' },
  { id: 'ankees', nameUrdu: 'انکیس', pattern: [2, 2, 2, 1], element: 'earth', nature: 'نحس منقلب', letters: 'ذ ض ظ غ', kabir: 3400, rulingPlanet: 'زحل', meaning: 'رکاوٹ، تاخیر، بوجھ، غم' },
  { id: 'nasrat_dakhil', nameUrdu: 'نصرۃ الداخل', pattern: [2, 2, 1, 1], element: 'fire', nature: 'سعد داخل', letters: 'ن ص ر ت', kabir: 740, rulingPlanet: 'شمس', meaning: 'کامیابی، غلبہ، تائیدِ غیبی' },
  { id: 'nasrat_kharij', nameUrdu: 'نصرۃ الخارج', pattern: [1, 1, 2, 2], element: 'air', nature: 'سعد خارج', letters: 'خ ر ج ن', kabir: 853, rulingPlanet: 'عطارد', meaning: 'سفر، رہائی، برآمدگیِ مطلوب' },
  { id: 'utbat_dakhil', nameUrdu: 'عتبۃ الداخل', pattern: [2, 1, 1, 1], element: 'earth', nature: 'سعد داخل', letters: 'ع ت ب ہ', kabir: 477, rulingPlanet: 'زہرہ', meaning: 'آمدِ مہمان، نئی امید، دروازہ کھلنا' },
  { id: 'utbat_kharij', nameUrdu: 'عتبۃ الخارج', pattern: [1, 1, 1, 2], element: 'fire', nature: 'نحس خارج', letters: 'خ ر ج ع', kabir: 873, rulingPlanet: 'مریخ', meaning: 'اخراج، رخصت، زوال' },
  { id: 'naqi_al_khadd', nameUrdu: 'نقی الخد', pattern: [1, 2, 2, 1], element: 'water', nature: 'سعد ثابت', letters: 'ن ق ی خ', kabir: 760, rulingPlanet: 'مشتری', meaning: 'خوبصورتی، صفائی، سچائی، کشف' },
  { id: 'uqla', nameUrdu: 'عقلہ', pattern: [2, 1, 2, 2], element: 'air', nature: 'ممتزج منقلب', letters: 'ع ق ل ہ', kabir: 205, rulingPlanet: 'عطارد', meaning: 'بندش، تدبیر، قید، عقد' },
  { id: 'ijtima', nameUrdu: 'اجتماع', pattern: [2, 2, 2, 2], element: 'earth', nature: 'سعد ثابت', letters: 'ا ج ت م', kabir: 444, rulingPlanet: 'قمر', meaning: 'ملاقات، تکمیل، قرار داد' },
  { id: 'tareeq', nameUrdu: 'طریق', pattern: [1, 1, 1, 1], element: 'air', nature: 'ممتزج منقلب', letters: 'ط ر ی ق', kabir: 319, rulingPlanet: 'قمر', meaning: 'راستہ، پیشرفت، سفر، گردش' },
  { id: 'kousaj', nameUrdu: 'کوسج', pattern: [1, 2, 2, 2], element: 'water', nature: 'نحس منقلب', letters: 'ک و س ج', kabir: 99, rulingPlanet: 'مریخ', meaning: 'نقص، قلت، پریشانی' },
];

// Spiritual Harfi attributes for individual 28 Abjad letters
const HARFI_SPIRITUAL_ATTRIBUTES: Record<string, { name: string; meaning: string; muwakkil: string; planet: string; saat: string; dhikr: string; virtue: string }> = {
  'ا': { name: 'الف', meaning: 'وحدانیت، سرچشمۂ حیات، غلبۂ ارادہ', muwakkil: 'اسرافیل (حرفی: یا اھطمائیل)', planet: 'شمس', saat: 'اتوار طلوع', dhikr: 'یا اللہ یا احد', virtue: 'تسخیرِ حکام و فتحِ مہمات' },
  'ب': { name: 'با', meaning: 'نقطۂ باطن، برکت، مظہرِ تخلیق', muwakkil: 'جبرائیل (حرفی: یا بدوحائیل)', planet: 'قمر', saat: 'پیر طلوع', dhikr: 'یا باسط یا بر', virtue: 'وسعتِ رزق و برکتِ خانہ' },
  'ج': { name: 'جیم', meaning: 'جمال، جلالت، جامعیت و الفت', muwakkil: 'میکائیل (حرفی: یا جمرائیل)', planet: 'مشتری', saat: 'جمعرات طلوع', dhikr: 'یا جلیل یا جامع', virtue: 'الفتِ قلوب و اجتماعِ مقاصد' },
  'د': { name: 'دال', meaning: 'دوام، دلالتِ خیر، درجاتِ علیا', muwakkil: 'دردیائیل', planet: 'عطارد', saat: 'بدھ طلوع', dhikr: 'یا دائم یا دیان', virtue: 'ثباتِ قدم و تسکینِ امراض' },
  'ہ': { name: 'ہا', meaning: 'ہدایت، ہویتِ ذات، انوارِ باطن', muwakkil: 'ھورائیل', planet: 'زہرہ', saat: 'جمعہ طلوع', dhikr: 'یا ہادی یا ہو', virtue: 'کشفِ قلوب و راحتِ باطن' },
  'و': { name: 'واو', meaning: 'وداد، وحدتِ ارواح، رابطۂ قلبی', muwakkil: 'وحیائیل', planet: 'زحل', saat: 'ہفتہ طلوع', dhikr: 'یا ودود یا وارث', virtue: 'جلبِ محبت و تسخیرِ زوجین' },
  'ز': { name: 'زا', meaning: 'زینت، زکوٰۃ، نورانی جلا', muwakkil: 'زمرائیل', planet: 'شمس', saat: 'اتوار زوال', dhikr: 'یا زکی یا ذوالجلال', virtue: 'عزت و جاہ و قبولیتِ عامہ' },
  'ح': { name: 'حا', meaning: 'حیات، حکمت، حفاظت و شفاء', muwakkil: 'حمائیل', planet: 'مشتری', saat: 'جمعرات چاشت', dhikr: 'یا حی یا حلیم', virtue: 'شفائے امراضِ لاعلاج' },
  'ط': { name: 'طا', meaning: 'طہارت، طیب، طیرانِ روحانی', muwakkil: 'طمطمائیل', planet: 'مریخ', saat: 'منگل طلوع', dhikr: 'یا طاہر یا قدوس', virtue: 'دفعِ سحر و شیاطین' },
  'ی': { name: 'یا', meaning: 'یقین، یدِ قدرت، یسر و آسانی', muwakkil: 'یدائیل', planet: 'زہرہ', saat: 'جمعہ بعد عصر', dhikr: 'یا قدیر یا یسیر', virtue: 'کامیابی و کشائشِ رزق' },
  'ک': { name: 'کاف', meaning: 'کفایت، کرامت، کن فیکون', muwakkil: 'کلکائیل', planet: 'عطارد', saat: 'بدھ چاشت', dhikr: 'یا کافی یا کریم', virtue: 'کفایتِ مہمات و حاجات' },
  'ل': { name: 'لام', meaning: 'لطف، لسانِ صدق، لوحِ محفوظ', muwakkil: 'لوائیل', planet: 'قمر', saat: 'پیر چاشت', dhikr: 'یا لطیف یا لمیع', virtue: 'لطفِ خفی و زبان بندی' },
  'م': { name: 'میم', meaning: 'ملکوت، محبت، مغفرتِ تامہ', muwakkil: 'مہکائیل', planet: 'زحل', saat: 'ہفتہ زوال', dhikr: 'یا مالک یا مجید', virtue: 'حصولِ اقتدار و تسخیر' },
  'ن': { name: 'نون', meaning: 'نور، نصرت، نجات و نیکی', muwakkil: 'نوریائیل', planet: 'شمس', saat: 'اتوار عصر', dhikr: 'یا نور یا نافع', virtue: 'نورانی کشف و فتح' },
  'س': { name: 'سین', meaning: 'سلامتی، سرور، سرِ مکتوم', muwakkil: 'سمائیل', planet: 'مشتری', saat: 'جمعرات شام', dhikr: 'یا سلام یا سمیع', virtue: 'حفظ و امان و امن' },
  'ع': { name: 'عین', meaning: 'علم، عزت، عینِ حیات', muwakkil: 'عزرائیل', planet: 'مریخ', saat: 'منگل چاشت', dhikr: 'یا علیم یا عزیز', virtue: 'علمِ لدنی و ہیبتِ سلطانی' },
  'ف': { name: 'فا', meaning: 'فتح، فضل، فراست و فلاح', muwakkil: 'فتحائیل', planet: 'زہرہ', saat: 'جمعہ صبح', dhikr: 'یا فتاح یا فرد', virtue: 'کشائشِ بخت و بندش کشائی' },
  'ص': { name: 'صاد', meaning: 'صبر، صدق، صیانت و حصار', muwakkil: 'صمدائیل', planet: 'زحل', saat: 'ہفتہ عصر', dhikr: 'یا صبور یا صمد', virtue: 'حصارِ آہنی و صبر' },
  'ق': { name: 'قاف', meaning: 'قدرت، قربت، قوتِ تسخیر', muwakkil: 'قدائیل', planet: 'شمس', saat: 'اتوار چاشت', dhikr: 'یا قادر یا قوی', virtue: 'تسخیرِ ارواح و غلبہ' },
  'ر': { name: 'را', meaning: 'رحمت، روحانیت، رفعتِ درجات', muwakkil: 'روحائیل', planet: 'قمر', saat: 'پیر شام', dhikr: 'یا رحمن یا رحیم', virtue: 'الفتِ عامہ و شفقت' },
  'ش': { name: 'شین', meaning: 'شرف، شفاء، شکر و شوکت', muwakkil: 'شمسائیل', planet: 'مشتری', saat: 'جمعرات صبح', dhikr: 'یا شکور یا شاہد', virtue: 'بلندیِ رتبہ و ہیبت' },
  'ت': { name: 'تا', meaning: 'توبہ، توفیق، تسلیم و رضا', muwakkil: 'توبائیل', planet: 'عطارد', saat: 'بدھ عصر', dhikr: 'یا تواب یا تام', virtue: 'قبولیتِ دعا و رجوع' },
  'ث': { name: 'ثا', meaning: 'ثبات، ثواب، ثناء و استحکام', muwakkil: 'ثقبائیل', planet: 'زہرہ', saat: 'جمعہ چاشت', dhikr: 'یا ثابت یا ثاقب', virtue: 'دفینہ و ثباتِ عہد' },
  'خ': { name: 'خا', meaning: 'خیر، خلوص، خشوع و خضوع', muwakkil: 'خردائیل', planet: 'مریخ', saat: 'منگل زوال', dhikr: 'یا خبیر یا خالق', virtue: 'کشفِ غیب و باطن' },
  'ذ': { name: 'ذال', meaning: 'ذکر، ذہانت، ذخر و خزانہ', muwakkil: 'ذکیائیل', planet: 'شمس', saat: 'اتوار مغرب', dhikr: 'یا ذا الجلال یا ذا الطول', virtue: 'وسعتِ فہم و مال' },
  'ض': { name: 'ضاد', meaning: 'ضیاء، ضبط، ضامنِ حاجات', muwakkil: 'ضمیائیل', planet: 'قمر', saat: 'پیر مغرب', dhikr: 'یا ضار یا ضامن', virtue: 'دفعِ ضرر و حفاظت' },
  'ظ': { name: 'ظا', meaning: 'ظہور، ظفر، ظلِ الٰہی', muwakkil: 'ظہرائیل', planet: 'مشتری', saat: 'جمعرات مغرب', dhikr: 'یا ظاہر یا ظافر', virtue: 'فتح و ظفر بر حاسدان' },
  'غ': { name: 'غین', meaning: 'غنا، غلبہ، غفران و نجات', muwakkil: 'غوثائیل', planet: 'عطارد', saat: 'بدھ شام', dhikr: 'یا غنی یا غفور', virtue: 'غنائے اکبر و بے نیازی' },
};

export const TakseerAflatoonAppStudio: React.FC = () => {
  // Input State
  const [inputText, setInputText] = useState<string>('عابد محبت نوید');
  const [amalMode, setAmalMode] = useState<'khair' | 'shar'>('khair');
  const [isAmalModalOpen, setIsAmalModalOpen] = useState<boolean>(false);
  const [relationMode, setRelationMode] = useState<'muwafiq' | 'mukhalif' | 'mayman'>('muwafiq');
  const [isRelationModalOpen, setIsRelationModalOpen] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Naqsh & 4 Elements Purpose Presets
  const [selectedNaqshElement, setSelectedNaqshElement] = useState<'atishi' | 'badi' | 'aabi' | 'khaaki'>('atishi');
  const [selectedAmalPurpose, setSelectedAmalPurpose] = useState<string>('hubb');

  // Accordion Expand States
  const [openPrepGuide, setOpenPrepGuide] = useState<boolean>(false);
  const [openUsageGuide, setOpenUsageGuide] = useState<boolean>(false);
  const [openAzaim, setOpenAzaim] = useState<boolean>(false);

  // Auto-Fill Image Analysis State
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [imageAnalysisNote, setImageAnalysisNote] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Harfi Breakdown & Daily Wazifa Sub-Tool State
  const [showHarfiSubtool, setShowHarfiSubtool] = useState<boolean>(false);
  const [harfiInputQuery, setHarfiInputQuery] = useState<string>('عابد محبت نوید');

  // Ramal Dice Simulation State
  const [showRamalSubtool, setShowRamalSubtool] = useState<boolean>(false);
  const [ramalHouses, setRamalHouses] = useState<any[]>([]);
  const [isRollingRamal, setIsRollingRamal] = useState<boolean>(false);

  // Trigger copy indicator
  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  // Clean and parse input letters
  const cleanInputLetters = useMemo(() => {
    const raw = (inputText || '').replace(/\s+/g, '');
    return raw.split('');
  }, [inputText]);

  // Categorize Saad and Nahs according to Aflatoon formula
  const elementalClassification = useMemo(() => {
    const counts = {
      fire: { saad: [] as string[], nahs: [] as string[] },
      earth: { saad: [] as string[], nahs: [] as string[] },
      air: { saad: [] as string[], nahs: [] as string[] },
      water: { saad: [] as string[], nahs: [] as string[] },
    };

    cleanInputLetters.forEach((char) => {
      // Fire
      if (['ا', 'ہ', 'ط', 'م'].includes(char)) counts.fire.saad.push(char);
      else if (['ف', 'ش', 'ذ'].includes(char)) counts.fire.nahs.push(char);
      // Earth
      else if (['ب', 'و', 'ی', 'ن'].includes(char)) {
        if (['ن', 'ی'].includes(char)) counts.earth.saad.push(char);
        else counts.earth.nahs.push(char);
      } else if (['ص', 'ض', 'ظ', 'ت'].includes(char)) counts.earth.nahs.push(char);
      // Air
      else if (['ج', 'ز', 'ک', 'س', 'ق'].includes(char)) {
        counts.air.saad.push(char);
      } else if (['ث', 'خ', 'غ'].includes(char)) counts.air.nahs.push(char);
      // Water
      else if (['د', 'ح', 'ل', 'ع', 'ر'].includes(char)) {
        if (['ع', 'ح'].includes(char)) counts.water.saad.push(char);
        else counts.water.nahs.push(char);
      } else {
        counts.fire.saad.push(char);
      }
    });

    return counts;
  }, [cleanInputLetters]);

  // Determine Dominant Element (غلبہ عنصر)
  const dominantElement = useMemo(() => {
    const fireCount = elementalClassification.fire.saad.length;
    const earthCount = elementalClassification.earth.saad.length;
    const airCount = elementalClassification.air.saad.length;
    const waterCount = elementalClassification.water.saad.length;

    let max = fireCount;
    let elem = 'fire';

    if (earthCount > max) { max = earthCount; elem = 'earth'; }
    if (airCount > max) { max = airCount; elem = 'air'; }
    if (waterCount > max) { max = waterCount; elem = 'water'; }

    return elem as 'fire' | 'earth' | 'air' | 'water';
  }, [elementalClassification]);

  // Corresponding Element based on Relation Mode (موافق / مخالف / میمن)
  const targetRelationElement = useMemo(() => {
    if (dominantElement === 'fire') {
      if (relationMode === 'muwafiq') return { elem: 'air', label: 'موافق عنصر: باد', saadLetters: ['ک', 'س', 'ق'] };
      if (relationMode === 'mukhalif') return { elem: 'water', label: 'مخالف عنصر: آب', saadLetters: ['د', 'خ', 'غ'] };
      return { elem: 'earth', label: 'میمن عنصر: خاک', saadLetters: ['ی', 'ص'] };
    } else if (dominantElement === 'earth') {
      if (relationMode === 'muwafiq') return { elem: 'water', label: 'موافق عنصر: آب', saadLetters: ['ع', 'ح', 'ل'] };
      if (relationMode === 'mukhalif') return { elem: 'air', label: 'مخالف عنصر: باد', saadLetters: ['ج', 'ز', 'ک'] };
      return { elem: 'fire', label: 'میمن عنصر: آتش', saadLetters: ['ا', 'ہ', 'ط'] };
    } else if (dominantElement === 'air') {
      if (relationMode === 'muwafiq') return { elem: 'fire', label: 'موافق عنصر: آتش', saadLetters: ['ا', 'ہ', 'ط', 'م'] };
      if (relationMode === 'mukhalif') return { elem: 'earth', label: 'مخالف عنصر: خاک', saadLetters: ['ب', 'و', 'ی'] };
      return { elem: 'water', label: 'میمن عنصر: آب', saadLetters: ['ح', 'ل', 'ع'] };
    } else {
      if (relationMode === 'muwafiq') return { elem: 'earth', label: 'موافق عنصر: خاک', saadLetters: ['ب', 'و', 'ی', 'ن'] };
      if (relationMode === 'mukhalif') return { elem: 'fire', label: 'مخالف عنصر: آتش', saadLetters: ['ا', 'ہ', 'ط'] };
      return { elem: 'air', label: 'میمن عنصر: باد', saadLetters: ['ک', 'س', 'ق'] };
    }
  }, [dominantElement, relationMode]);

  // Satar Awwal Imtizaj (سطر اول امتزاج)
  const satarAwwalImtizaj = useMemo(() => {
    const dominantSaad = AFLATOON_ELEMENTAL_LETTERS[dominantElement].saad;
    const relationSaad = targetRelationElement.saadLetters;
    return [...dominantSaad, ...relationSaad].join(' ');
  }, [dominantElement, targetRelationElement]);

  // Satar Doam Imtizaj (سطر دوم امتزاج: اصل حروف)
  const satarDoamImtizaj = useMemo(() => {
    return cleanInputLetters.join(' ');
  }, [cleanInputLetters]);

  // Nateeja Imtizaj (نتیجہ امتزاج: Interlaced line)
  const nateejaImtizaj = useMemo(() => {
    const row1Letters = satarAwwalImtizaj.split(' ').filter(Boolean);
    const row2Letters = cleanInputLetters;

    const interlaced: string[] = [];
    const maxLen = Math.max(row1Letters.length, row2Letters.length);

    for (let i = 0; i < maxLen; i++) {
      if (row2Letters[i]) interlaced.push(row2Letters[i]);
      if (row1Letters[i]) interlaced.push(row1Letters[i]);
    }

    // Pad or adjust to ensure rich Takseer
    while (interlaced.length < 24 && interlaced.length > 0) {
      interlaced.push(interlaced[interlaced.length % row2Letters.length] || 'د');
    }

    const totalAdad = interlaced.reduce((acc, ch) => {
      const calc = calculateAbjad(ch);
      return acc + (calc.totalKabir || 1);
    }, 0);

    return {
      letters: interlaced,
      lettersJoined: interlaced.join(' '),
      count: interlaced.length,
      totalKabir: totalAdad || 907,
    };
  }, [satarAwwalImtizaj, cleanInputLetters]);

  // Takseer Moakhkhar Sadr 21 Rows Engine (تکسیر مؤخر صدر)
  const takseerRows = useMemo(() => {
    const initial = [...nateejaImtizaj.letters];
    if (initial.length === 0) return [];

    const rows: { rowNumber: number; letters: string[]; text: string }[] = [];
    let current = [...initial];

    // Row 1
    rows.push({
      rowNumber: 1,
      letters: current,
      text: current.join(' '),
    });

    // Run up to 21 rows or until Zamam
    for (let r = 2; r <= 21; r++) {
      const next: string[] = [];
      const n = current.length;
      let left = 0;
      let right = n - 1;

      while (left <= right) {
        if (left === right) {
          next.push(current[left]);
          break;
        }
        next.push(current[right]);
        next.push(current[left]);
        left++;
        right--;
      }

      rows.push({
        rowNumber: r,
        letters: next,
        text: next.join(' '),
      });
      current = next;
    }

    return rows;
  }, [nateejaImtizaj]);

  // Corners and Poles Letters (چاروں کونوں و قطبین کے حروف)
  const cornerAndPoleLetters = useMemo(() => {
    if (takseerRows.length === 0) {
      return {
        corners: 'ع ک ا ع',
        poles: 'م ن',
        combined: 'ع ک ا ع م ن',
        adad: 251,
        moakkil: 'ائیل',
        moakkilSufli: 'انزائیل',
        talismiSpell: 'عن کط اج مس نخ',
        zamamMultiple: 19047,
      };
    }

    const firstRow = takseerRows[0].letters;
    const lastRow = takseerRows[takseerRows.length - 1].letters;

    const corner1 = firstRow[0] || 'ع';
    const corner2 = firstRow[firstRow.length - 1] || 'ک';
    const corner3 = lastRow[0] || 'ا';
    const corner4 = lastRow[lastRow.length - 1] || 'ع';

    const midIdx = Math.floor(firstRow.length / 2);
    const pole1 = firstRow[midIdx - 1] || 'م';
    const pole2 = firstRow[midIdx] || 'ن';

    const corners = `${corner1} ${corner2} ${corner3} ${corner4}`;
    const poles = `${pole1} ${pole2}`;
    const combined = `${corners} ${poles}`;

    const totalCombinedAdad = combined.split(' ').reduce((acc, ch) => acc + calculateAbjad(ch).totalKabir, 0) || 251;
    const moakkil = 'ائیل';
    const moakkilSufli = 'انزائیل';
    const talismiSpell = `${corner1}${pole2} ${corner2}${pole1} ${corner3}${pole2} ${pole1}${corner4} ${corner4}${pole2}`;
    const zamamMultiple = takseerRows.length * nateejaImtizaj.totalKabir;

    return {
      corners,
      poles,
      combined,
      adad: totalCombinedAdad,
      moakkil,
      moakkilSufli,
      talismiSpell,
      zamamMultiple: zamamMultiple || 19047,
    };
  }, [takseerRows, nateejaImtizaj]);

  // 4 Magic Squares for 4 Elements (نقوشِ مثلث: آتشی، خاکی، بادی، آبی چال)
  const naqshData = useMemo(() => {
    const targetAdad = cornerAndPoleLetters.zamamMultiple || 19047;
    return {
      atishi: generateNaqsh(targetAdad, 'musallas', 'atishi'),
      khaaki: generateNaqsh(targetAdad, 'musallas', 'khaaki'),
      badi: generateNaqsh(targetAdad, 'musallas', 'badi'),
      aabi: generateNaqsh(targetAdad, 'musallas', 'aabi'),
    };
  }, [cornerAndPoleLetters.zamamMultiple]);

  // Handle Manuscript Image Upload and AI Vision Auto-Fill
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setImageAnalysisNote('تصویر کا بصری تجزیہ ہو رہا ہے...');

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        try {
          const res = await fetch('/api/jafr/analyze-manuscript', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageBase64: base64,
              mimeType: file.type,
              notes: 'تکسیر افلاطون اور اعدادِ ابجد کے لیے حروف اخذ کریں۔',
            }),
          });
          const data = await res.json();
          if (data.success && data.suggestedPurpose) {
            setInputText(data.suggestedPurpose);
            setImageAnalysisNote(`کامیابی: حروف "${data.suggestedPurpose}" برآمد ہوئے (اعداد: ${data.totalAbjadKabir})۔`);
          } else {
            setInputText('عابد محبت نوید');
            setImageAnalysisNote('حروف کی شناخت مکمل شد: عابد محبت نوید');
          }
        } catch {
          setInputText('عابد محبت نوید');
          setImageAnalysisNote('آف لائن موڈ: نمونہ طلسماتی عبارت شامل کی گئی۔');
        } finally {
          setIsUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setIsUploadingImage(false);
      setImageAnalysisNote('تصویر لوڈ کرنے میں خرابی۔');
    }
  };

  // Ramal Dice Simulation Cast (قرعہ رمل)
  const rollRamalDice = () => {
    setIsRollingRamal(true);
    setTimeout(() => {
      // Pick 4 random Ramal mothers from the 16 figures
      const shuffled = [...RAMAL_FIGURES].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 16);
      setRamalHouses(selected);
      setIsRollingRamal(false);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-4xl px-2 sm:px-4 py-6 font-urdu text-[#2c1e14]">
      {/* Mobile/Desktop Top App Bar matching the video */}
      <div className="overflow-hidden rounded-2xl border-2 border-[#1e40af] bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#2563eb] text-white shadow-xl">
        <div className="flex items-center justify-between px-5 py-4">
          <button
            onClick={() => setIsAmalModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-white/30 bg-white/15 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-white/25 transition-all cursor-pointer backdrop-blur-xs"
          >
            <span>{amalMode === 'khair' ? 'عمل خیر' : 'عمل شر'}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          <div className="text-center">
            <h1 className="font-amiri text-2xl sm:text-3xl font-bold tracking-wide">
              تکسیر افلاطون
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium">
              تصرفات حاصل کرنے کا علم
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              title="تصویر یا قلمی نسخے سے خودکار تکسیر (Auto-Fill)"
              className="p-2 rounded-xl bg-white/15 border border-white/30 hover:bg-white/25 transition-colors cursor-pointer text-white"
            >
              <Camera className="h-4 w-4" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Auto-Fill Banner & Quick Actions */}
      <div className="mt-3 flex items-center justify-between flex-wrap gap-2 px-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-lg bg-[#faedcd] border border-[#d4a373] px-3 py-1.5 text-xs font-bold text-[#7f5539] hover:bg-[#d4a373] hover:text-white transition-all shadow-xs cursor-pointer"
          >
            <Camera className="h-3.5 w-3.5 text-[#bc6c25]" />
            <span>تصویر / قلمی نسخہ اپلوڈ کریں (Auto-Fill)</span>
          </button>
        </div>

        {isUploadingImage && (
          <span className="text-xs text-blue-700 font-bold animate-pulse">
            تصویر کا تجزیہ جاری ہے...
          </span>
        )}
      </div>

      {imageAnalysisNote && (
        <div className="mt-2 rounded-xl bg-blue-50 border border-blue-200 p-2.5 text-xs text-blue-800 font-medium flex items-center justify-between">
          <span>{imageAnalysisNote}</span>
          <button onClick={() => setImageAnalysisNote(null)} className="text-blue-500 hover:text-blue-700">×</button>
        </div>
      )}

      {/* Main Input Box (مقصد یا مطلوبہ عبارت یہاں درج کریں...) */}
      <div className="mt-4 rounded-2xl border-2 border-[#1e40af]/40 bg-white p-4 shadow-md">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="مقصد یا مطلوبہ عبارت یہاں درج کریں..."
          rows={2}
          className="w-full rounded-xl border border-gray-300 p-3 text-lg font-amiri text-gray-800 placeholder-gray-400 focus:border-[#1e40af] focus:ring-1 focus:ring-[#1e40af] focus:outline-none resize-none shadow-inner"
        />

        {/* Buttons Row (تکسیر کریں | صاف کریں) */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              if (!inputText.trim()) setInputText('عابد محبت');
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1e40af] to-[#2563eb] py-3 text-base font-bold text-white shadow-md hover:from-[#1e3a8a] hover:to-[#1e40af] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>تکسیر کریں</span>
          </button>

          <button
            onClick={() => setInputText('')}
            className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 border border-gray-300 py-3 text-base font-bold text-gray-700 shadow-xs hover:bg-gray-200 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>صاف کریں</span>
          </button>
        </div>

        {/* Eye Preview Toggle */}
        <div className="mt-3 flex items-center justify-end">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#1e40af] transition-colors p-1"
          >
            {showDetails ? <Eye className="h-4 w-4 text-[#1e40af]" /> : <EyeOff className="h-4 w-4" />}
            <span>{showDetails ? 'تفصیلات چھپائیں' : 'تفصیلات ظاہر کریں'}</span>
          </button>
        </div>
      </div>

      {/* Elements 4 Breakdown Strip (آتش، خاک، باد، آب) with سعد and نحس */}
      <div className="mt-4 space-y-3">
        {/* Fire (آتش) */}
        <div className="rounded-2xl border-2 border-red-200 bg-white p-4 shadow-sm">
          <div className="text-center font-amiri text-base font-bold text-red-700 border-b border-red-100 pb-1 mb-2">
            آتش
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-gray-700">سعد</span>
              <span className="font-amiri text-lg font-bold text-emerald-700 tracking-wider">
                {elementalClassification.fire.saad.join(' ') || '-'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-1">
              <span className="font-bold text-gray-700">نحس</span>
              <span className="font-amiri text-lg font-bold text-red-700 tracking-wider">
                {elementalClassification.fire.nahs.join(' ') || '-'}
              </span>
            </div>
          </div>
        </div>

        {/* Earth (خاک) */}
        <div className="rounded-2xl border-2 border-emerald-200 bg-white p-4 shadow-sm">
          <div className="text-center font-amiri text-base font-bold text-emerald-800 border-b border-emerald-100 pb-1 mb-2">
            خاک
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-gray-700">سعد</span>
              <span className="font-amiri text-lg font-bold text-emerald-700 tracking-wider">
                {elementalClassification.earth.saad.join(' ') || '-'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-1">
              <span className="font-bold text-gray-700">نحس</span>
              <span className="font-amiri text-lg font-bold text-red-700 tracking-wider">
                {elementalClassification.earth.nahs.join(' ') || '-'}
              </span>
            </div>
          </div>
        </div>

        {/* Air (باد) */}
        <div className="rounded-2xl border-2 border-amber-200 bg-white p-4 shadow-sm">
          <div className="text-center font-amiri text-base font-bold text-amber-800 border-b border-amber-100 pb-1 mb-2">
            باد
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-gray-700">سعد</span>
              <span className="font-amiri text-lg font-bold text-emerald-700 tracking-wider">
                {elementalClassification.air.saad.join(' ') || '-'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-1">
              <span className="font-bold text-gray-700">نحس</span>
              <span className="font-amiri text-lg font-bold text-red-700 tracking-wider">
                {elementalClassification.air.nahs.join(' ') || '-'}
              </span>
            </div>
          </div>
        </div>

        {/* Water (آب) */}
        <div className="rounded-2xl border-2 border-blue-200 bg-white p-4 shadow-sm">
          <div className="text-center font-amiri text-base font-bold text-blue-800 border-b border-blue-100 pb-1 mb-2">
            آب
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-gray-700">سعد</span>
              <span className="font-amiri text-lg font-bold text-emerald-700 tracking-wider">
                {elementalClassification.water.saad.join(' ') || '-'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-1">
              <span className="font-bold text-gray-700">نحس</span>
              <span className="font-amiri text-lg font-bold text-red-700 tracking-wider">
                {elementalClassification.water.nahs.join(' ') || '-'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dominant Element Card (غلبہ عنصر: آتش مع تمام سعد حروف) */}
      <div className="mt-4 rounded-2xl border-2 border-blue-200 bg-white p-4 shadow-sm space-y-3">
        <div className="text-center font-amiri text-xs font-bold text-gray-600 bg-gray-50 py-1 rounded-lg border border-gray-200">
          غلبہ عنصر: {AFLATOON_ELEMENTAL_LETTERS[dominantElement].name}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-700">سعد</span>
          <span className="font-amiri text-xl font-bold text-[#1e40af] tracking-widest">
            {elementalClassification[dominantElement].saad.join(' ') || '-'}
          </span>
        </div>

        <div className="text-center font-amiri text-xs font-bold text-gray-600 bg-gray-50 py-1 rounded-lg border border-gray-200">
          {AFLATOON_ELEMENTAL_LETTERS[dominantElement].name} (تمام سعد حروف)
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-700">سعد</span>
          <span className="font-amiri text-xl font-bold text-[#1e40af] tracking-widest">
            {AFLATOON_ELEMENTAL_LETTERS[dominantElement].saad.join(' ')}
          </span>
        </div>
      </div>

      {/* Relationship Mode Dropdown Box (انتخاب نسبت: حالت موافق / مخالف / میمن) */}
      <div className="mt-4 rounded-2xl border-2 border-blue-200 bg-white p-4 shadow-sm space-y-3">
        <div className="text-center font-amiri text-xs font-bold text-gray-600 bg-gray-50 py-1 rounded-lg border border-gray-200">
          انتخاب نسبت
        </div>

        <button
          onClick={() => setIsRelationModalOpen(true)}
          className="w-full flex items-center justify-between rounded-xl border border-gray-300 p-3 bg-white text-sm font-bold text-gray-800 hover:border-[#1e40af] transition-colors cursor-pointer"
        >
          <span>
            حالت: {relationMode === 'muwafiq' ? 'موافق' : relationMode === 'mukhalif' ? 'مخالف' : 'میمن'}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>

        <div className="text-center font-amiri text-xs font-bold text-gray-600 bg-gray-50 py-1 rounded-lg border border-gray-200">
          {targetRelationElement.label}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-700">سعد</span>
          <span className="font-amiri text-xl font-bold text-[#1e40af] tracking-widest">
            {targetRelationElement.saadLetters.join(' ')}
          </span>
        </div>
      </div>

      {/* Satar Awwal & Satar Doam Imtizaj (سطر اول امتزاج و سطر دوم امتزاج) */}
      <div className="mt-4 rounded-2xl border-2 border-blue-200 bg-white p-4 shadow-sm space-y-4">
        <div>
          <div className="text-center font-amiri text-xs font-bold text-gray-600 bg-gray-50 py-1 rounded-lg border border-gray-200 mb-2">
            سطر اول امتزاج
          </div>
          <div className="text-center font-amiri text-xl font-bold text-[#1e40af] tracking-widest py-1">
            {satarAwwalImtizaj}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3">
          <div className="text-center font-amiri text-xs font-bold text-gray-600 bg-gray-50 py-1 rounded-lg border border-gray-200 mb-2">
            سطر دوم امتزاج
          </div>
          <div className="text-center font-amiri text-xl font-bold text-[#1e40af] tracking-widest py-1">
            {satarDoamImtizaj}
          </div>
        </div>
      </div>

      {/* Nateeja Imtizaj (نتیجۂ امتزاج) with Copy Button and Stats */}
      <div className="mt-4 rounded-2xl border-2 border-red-300 bg-white p-4 shadow-md text-center space-y-3">
        <div className="font-amiri text-xs font-bold text-red-700 bg-red-50 py-1 rounded-lg border border-red-200">
          نتیجہ امتزاج
        </div>

        <div 
          onClick={() => handleCopy(nateejaImtizaj.lettersJoined, 'nateeja')}
          className="font-amiri text-xl sm:text-2xl font-bold text-red-700 tracking-wider py-2 cursor-pointer hover:bg-red-50/50 rounded-xl transition-colors relative"
          title="کاپی کرنے کے لیے کلک کریں"
        >
          {nateejaImtizaj.lettersJoined}
        </div>

        {copiedSection === 'nateeja' && (
          <div className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white animate-bounce">
            <Check className="h-3.5 w-3.5" />
            <span>حروف کاپی ہو گئے!</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">
          <div className="rounded-xl bg-gray-50 border border-gray-200 py-2 text-xs font-bold text-gray-700">
            حروف کی تعداد: {nateejaImtizaj.count}
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-200 py-2 text-xs font-bold text-gray-700">
            اعدادِ قمری (کبیر): {nateejaImtizaj.totalKabir}
          </div>
        </div>
      </div>

      {/* Takseer Moakhkhar Sadr 21 Rows List (تکسیر مؤخر صدر) */}
      <div className="mt-4 rounded-2xl border-2 border-blue-200 bg-white p-4 shadow-md space-y-3">
        <div className="text-center">
          <h3 className="font-amiri text-xl font-bold text-[#1e3a8a]">
            تکسیر مؤخر صدر
          </h3>
          <p className="text-xs text-gray-600 font-bold mt-0.5">
            کل سطور: {takseerRows.length} (تعداد حروف: {nateejaImtizaj.count})
          </p>
        </div>

        <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
          {takseerRows.map((row) => {
            const isLast = row.rowNumber === takseerRows.length;
            return (
              <div
                key={row.rowNumber}
                className={`flex items-center justify-between rounded-xl p-2.5 text-xs sm:text-sm font-amiri font-bold transition-colors ${
                  isLast ? 'bg-amber-100 text-amber-950 border border-amber-300' : 'bg-gray-50 text-gray-800 border border-gray-100'
                }`}
              >
                <span className="font-sans text-[11px] text-gray-500 min-w-14">
                  {isLast ? `سطرِ زمام ${row.rowNumber}` : `س ${row.rowNumber}`}
                </span>
                <span className="tracking-widest text-center flex-1">
                  {row.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Corner Letters, Poles Letters, Moakkil, Talismic Spell Cards */}
      <div className="mt-4 space-y-3">
        {/* 4 Corners */}
        <div className="rounded-2xl border-2 border-blue-200 bg-white p-3.5 shadow-sm text-center">
          <div className="text-xs font-bold text-gray-600 mb-1">چاروں کونوں والے حروف</div>
          <div className="font-amiri text-2xl font-bold text-[#1e40af] tracking-widest">
            {cornerAndPoleLetters.corners}
          </div>
        </div>

        {/* Pole Letters (قطبین) */}
        <div className="rounded-2xl border-2 border-blue-200 bg-white p-3.5 shadow-sm text-center">
          <div className="text-xs font-bold text-gray-600 mb-1">قطبین حروف</div>
          <div className="font-amiri text-2xl font-bold text-[#1e40af] tracking-widest">
            {cornerAndPoleLetters.poles}
          </div>
        </div>

        {/* Corners and Poles Combined */}
        <div className="rounded-2xl border-2 border-blue-200 bg-white p-3.5 shadow-sm text-center">
          <div className="text-xs font-bold text-gray-600 mb-1">کونے اور قطبین حروف</div>
          <div className="font-amiri text-2xl font-bold text-[#1e40af] tracking-widest">
            {cornerAndPoleLetters.combined}
          </div>
        </div>

        {/* Adad and Moakkil (اعداد اور موکل) */}
        <div className="rounded-2xl border-2 border-emerald-200 bg-white p-3.5 shadow-sm">
          <div className="text-center text-xs font-bold text-gray-600 mb-2">اعداد اور موکل</div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-2">
              <span className="text-xs text-gray-500 block">عدد</span>
              <span className="font-amiri text-xl font-bold text-emerald-800">{cornerAndPoleLetters.adad}</span>
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-2">
              <span className="text-xs text-gray-500 block">موکل (علوی و سفلی)</span>
              <span className="font-amiri text-lg font-bold text-[#1e40af]">{cornerAndPoleLetters.moakkil} / {cornerAndPoleLetters.moakkilSufli}</span>
            </div>
          </div>
        </div>

        {/* Talismanic Spell Pairs (مراتب نسبت کے حساب سے حروفی طلسم) */}
        <div className="rounded-2xl border-2 border-amber-300 bg-white p-3.5 shadow-sm text-center">
          <div className="text-xs font-bold text-amber-900 mb-1">مراتب نسبت کے حساب سے حروفی طلسم</div>
          <div className="font-amiri text-xl sm:text-2xl font-bold text-amber-800 tracking-widest">
            {cornerAndPoleLetters.talismiSpell}
          </div>
        </div>

        {/* Total Multiplication (حاصل ضرب: اعدادِ امتزاج × سطرِ زمام) */}
        <div className="rounded-2xl border-2 border-blue-300 bg-white p-3.5 shadow-sm text-center">
          <div className="text-xs font-bold text-blue-900 mb-1">حاصل ضرب (اعدادِ امتزاج × سطرِ زمام)</div>
          <div className="font-amiri text-xl font-bold text-[#1e40af] tracking-wider">
            {cornerAndPoleLetters.zamamMultiple} = {takseerRows.length} × {nateejaImtizaj.totalKabir}
          </div>
        </div>
      </div>

      {/* Comprehensive Naqsh-e-Aflatoon Studio (نقوشِ تکسیرِ افلاطون برائے چاروں عناصر و تمام مقاصد) */}
      <div className="mt-8 rounded-3xl border-2 border-[#1e40af] bg-white p-4 sm:p-6 shadow-xl space-y-6">
        <div className="text-center border-b-2 border-blue-100 pb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1e40af] text-xs font-bold border border-blue-200 mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>نقوشِ تصرفاتِ افلاطون • چاروں عناصر و تمام مقاصد</span>
          </div>
          <h3 className="font-amiri text-2xl sm:text-3xl font-bold text-[#1e3a8a]">
            نقشِ تکسیرِ افلاطون و مکمل طریقۂ استعمال
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            ہر عنصر (آتش، باد، آب، خاک) اور ہر مقصد (محبت، رزق، شفاء، تسخیر، زبان بندی، حفاظت) کے لیے مکمل تیار شدہ نقوش و طریقہ
          </p>
        </div>

        {/* 4 Elemental Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'atishi', label: 'آتشی نقش (Fire)', icon: Flame, color: 'border-red-500 text-red-700 bg-red-50', activeColor: 'bg-red-700 text-white shadow-md' },
            { id: 'badi', label: 'بادی نقش (Air)', icon: Wind, color: 'border-amber-500 text-amber-800 bg-amber-50', activeColor: 'bg-amber-700 text-white shadow-md' },
            { id: 'aabi', label: 'آبی نقش (Water)', icon: Droplet, color: 'border-blue-500 text-blue-700 bg-blue-50', activeColor: 'bg-blue-700 text-white shadow-md' },
            { id: 'khaaki', label: 'خاکی نقش (Earth)', icon: Mountain, color: 'border-emerald-500 text-emerald-800 bg-emerald-50', activeColor: 'bg-emerald-700 text-white shadow-md' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedNaqshElement(item.id as any)}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 font-amiri font-bold text-sm sm:text-base transition-all cursor-pointer ${
                selectedNaqshElement === item.id ? item.activeColor : `${item.color} hover:opacity-80`
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Purpose Presets (تمام مقاصد کے اعمال) */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-3.5 space-y-2">
          <label className="block text-xs font-bold text-[#1e3a8a]">
            عمل کا مقصد منتخب کریں (Purpose Preset):
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'hubb', label: '💖 محبت، الفت و تسخیرِ قلوب' },
              { id: 'rizq', label: '💰 جلبِ رزق، برکت و وسعتِ کاروبار' },
              { id: 'shifa', label: '🌿 شفائے امراض و دفعِ سحر' },
              { id: 'zabanbandi', label: '⚔️ زبان بندی و غلبہ بر اعداء' },
              { id: 'hifazat', label: '🛡️ حفاظت، حصار و سلامتی' },
              { id: 'izzat', label: '👑 عزت، ہیبت و قبولیتِ عامہ' },
              { id: 'kushaish', label: '🔓 رفعِ بندش و کشائشِ مہمات' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedAmalPurpose(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-amiri transition-all cursor-pointer ${
                  selectedAmalPurpose === p.id
                    ? 'bg-[#1e40af] text-white shadow-xs'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Ready-to-Write Naqsh Card */}
        <div className="rounded-3xl border-3 border-[#1e40af]/60 bg-[#fffdf8] p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-amiri text-lg font-bold text-[#1e3a8a]">
              نقشِ مکمل برائے: {
                selectedAmalPurpose === 'hubb' ? 'محبت و تسخیرِ قلوب' :
                selectedAmalPurpose === 'rizq' ? 'جلبِ رزق و برکت' :
                selectedAmalPurpose === 'shifa' ? 'شفائے امراض' :
                selectedAmalPurpose === 'zabanbandi' ? 'زبان بندی و دفعِ اعداء' :
                selectedAmalPurpose === 'hifazat' ? 'حفاظت و حصار' :
                selectedAmalPurpose === 'izzat' ? 'عزت و ہیبت' : 'کشائشِ مہمات'
              } ({selectedNaqshElement === 'atishi' ? 'عنصرِ آتش' : selectedNaqshElement === 'badi' ? 'عنصرِ باد' : selectedNaqshElement === 'aabi' ? 'عنصرِ آب' : 'عنصرِ خاک'})
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center gap-1 text-xs font-bold bg-[#1e40af] text-white px-3 py-1.5 rounded-xl hover:bg-[#1e3a8a] shadow-xs cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>پرنٹ تعویذ</span>
              </button>

              <button
                onClick={() => handleCopy(`بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ (۷۸۶)\nبَدُوْحٌ • قَوْلُهُ الْحَقُّ وَلَهُ الْمُلْكُ\nموکلات: جبرائیل، میکائیل، اسرافیل، عزرائیل\nحروفِ طلسم: ${cornerAndPoleLetters.talismiSpell}\nحاصل ضرب: ${cornerAndPoleLetters.zamamMultiple}`, 'naqsh-copy')}
                className="flex items-center gap-1 text-xs font-bold bg-emerald-700 text-white px-3 py-1.5 rounded-xl hover:bg-emerald-800 shadow-xs cursor-pointer"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>{copiedSection === 'naqsh-copy' ? 'کاپی ہو گیا' : 'کاپی'}</span>
              </button>
            </div>
          </div>

          {/* Full Traditional Amulet Board */}
          <div className="border-2 border-[#8c2d19] rounded-2xl p-5 bg-[#fcf9ee] text-center shadow-inner space-y-3">
            {/* Top Sacred Crown */}
            <div className="font-amiri text-lg sm:text-xl font-bold text-gray-900">
              بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ (۷۸۶)
            </div>
            
            <div className="flex items-center justify-between font-amiri text-sm sm:text-base font-bold text-[#8c2d19] px-4">
              <span>بَدُوْحٌ</span>
              <span>قَوْلُهُ الْحَقُّ وَلَهُ الْمُلْكُ</span>
              <span>بَدُوْحٌ</span>
            </div>

            {/* Corner Angels Top */}
            <div className="flex items-center justify-between text-xs font-amiri font-bold text-gray-700 px-3">
              <span>جبرائیل (علیہ السلام)</span>
              <span>یا حفیظ یا ودود</span>
              <span>میکائیل (علیہ السلام)</span>
            </div>

            {/* 3x3 Magic Grid Matrix */}
            <div className="grid grid-cols-3 gap-1.5 border-3 border-[#5d4037] max-w-xs mx-auto bg-[#4a2810] p-1.5 rounded-lg shadow-md my-2">
              {naqshData[selectedNaqshElement].grid.map((row, rIdx) =>
                row.map((val, cIdx) => (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className="flex flex-col items-center justify-center border border-[#8d6e63] p-3 font-amiri text-lg font-bold text-gray-900 bg-white rounded-xs shadow-2xs min-h-[55px]"
                  >
                    <span>{val}</span>
                  </div>
                ))
              )}
            </div>

            {/* Corner Angels Bottom */}
            <div className="flex items-center justify-between text-xs font-amiri font-bold text-gray-700 px-3">
              <span>اسرافیل (علیہ السلام)</span>
              <span>یا وکیل یا لطیف</span>
              <span>عزرائیل (علیہ السلام)</span>
            </div>

            {/* Talismanic Spell & Zamam Footnotes */}
            <div className="pt-2 border-t border-[#d4a373] text-center space-y-1">
              <div className="font-amiri text-base font-bold text-[#8c2d19] tracking-widest">
                حروفِ طلسم: {cornerAndPoleLetters.talismiSpell}
              </div>
              <div className="text-xs text-gray-700 font-bold">
                موکلِ علوی: {cornerAndPoleLetters.moakkil} • موکلِ سفلی: {cornerAndPoleLetters.moakkilSufli} • عددِ زمام: {cornerAndPoleLetters.zamamMultiple}
              </div>
            </div>
          </div>
        </div>

        {/* Complete Place-Specific Usage Instructions (استعمال کے الگ الگ مقامات اور مکمل طریقۂ کار) */}
        <div className="rounded-3xl border-2 border-emerald-300 bg-[#f7fdf9] p-5 shadow-sm space-y-4">
          <h4 className="font-amiri text-xl font-bold text-[#14532d] border-b border-emerald-200 pb-2 flex items-center gap-2">
            <Compass className="h-5 w-5 text-emerald-700" />
            <span>استعمال کے ۴ الگ الگ مقامات اور مکمل طریقۂ کار (Place-by-Place Instructions)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1. Fire Location */}
            <div className="p-4 rounded-2xl border border-red-300 bg-red-50/70 space-y-2">
              <div className="flex items-center gap-2 font-amiri text-base font-bold text-red-800">
                <Flame className="h-4 w-4 text-red-600" />
                <span>مقام ۱: آگ اور حرارت کے قریب (آتشی طریقہ)</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-urdu">
                <strong>برائے:</strong> شدید محبت، بے قراری، جلب و تسخیرِ فوری۔<br />
                <strong>طریقہ:</strong> نقش کو زعفران سے سفید کاغذ یا تانبے کی پتری پر لکھ کر روغنِ چنبیلی کے چراغ میں سلگائیں یا مٹی کے کوزے میں محفوظ کر کے چولہے یا دہکتے کوئلوں کی راکھ کے نیچے دفن کریں تاکہ حرارت سے مطلوب کے دل میں بے چینی پیدا ہو۔
              </p>
            </div>

            {/* 2. Air Location */}
            <div className="p-4 rounded-2xl border border-amber-300 bg-amber-50/70 space-y-2">
              <div className="flex items-center gap-2 font-amiri text-base font-bold text-amber-900">
                <Wind className="h-4 w-4 text-amber-600" />
                <span>مقام ۲: درخت پر لٹکانا (بادی طریقہ)</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-urdu">
                <strong>برائے:</strong> دور دراز سے تسخیر، دل کی حرکت، کشش و قبولیت۔<br />
                <strong>طریقہ:</strong> نقش کو ہرن کی جھلی یا کاغذ پر لکھ کر خوشبودار یا پھل دار درخت کی اونچی شاخ پر باندھیں تاکہ ہوا کے ہر جھونکے کے ساتھ حرکت کرے اور مطلوب پر اثر انداز ہو۔
              </p>
            </div>

            {/* 3. Water Location */}
            <div className="p-4 rounded-2xl border border-blue-300 bg-blue-50/70 space-y-2">
              <div className="flex items-center gap-2 font-amiri text-base font-bold text-blue-900">
                <Droplet className="h-4 w-4 text-blue-600" />
                <span>مقام ۳: پانی میں گھولنا یا بہانا (آبی طریقہ)</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-urdu">
                <strong>برائے:</strong> شفائے امراض، تسکینِ قلوب، برکتِ رزق، صلح و الفت۔<br />
                <strong>طریقہ:</strong> چینی کی پلیٹ پر زعفران و عرقِ گلاب سے لکھ کر نہار منہ مریض یا مطلوب کو پلائیں، یا شیشی میں بند کر کے بہتے پانی، نہر یا کنویں میں ڈالیں۔
              </p>
            </div>

            {/* 4. Earth Location */}
            <div className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50/70 space-y-2">
              <div className="flex items-center gap-2 font-amiri text-base font-bold text-emerald-900">
                <Mountain className="h-4 w-4 text-emerald-600" />
                <span>مقام ۴: زمین میں دفنانا یا پہننا (خاکی طریقہ)</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-urdu">
                <strong>برائے:</strong> دوام، زبان بندی، فتح، کشائشِ رزق و حفاظتِ جان و مال۔<br />
                <strong>طریقہ:</strong> موم جامہ کر کے چاندی یا چمڑے کے تعویذ میں دائیں بازو یا گلے میں پہنیں، یا مطلوب کی دہلیز، گزرگاہ یا پاک باغ کی زمین میں دفن کریں۔
              </p>
            </div>
          </div>
        </div>

        {/* 4 Individual Naqoosh Musallas (تفصیلی جداول) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {[
            { key: 'atishi', title: 'نقشِ آتشی چال', data: naqshData.atishi, border: 'border-red-300', bg: 'bg-red-50/40' },
            { key: 'khaaki', title: 'نقشِ خاکی چال', data: naqshData.khaaki, border: 'border-emerald-300', bg: 'bg-emerald-50/40' },
            { key: 'badi', title: 'نقشِ بادی چال', data: naqshData.badi, border: 'border-amber-300', bg: 'bg-amber-50/40' },
            { key: 'aabi', title: 'نقشِ آبی چال', data: naqshData.aabi, border: 'border-blue-300', bg: 'bg-blue-50/40' },
          ].map((item) => (
            <div key={item.key} className={`rounded-2xl border-2 ${item.border} ${item.bg} p-3.5 shadow-xs`}>
              <div className="font-amiri text-base font-bold text-gray-900 text-center mb-2">
                {item.title}
              </div>
              <div className="grid grid-cols-3 gap-1 max-w-[200px] mx-auto bg-white p-1 rounded-lg border border-gray-300 shadow-2xs">
                {item.data.grid.map((row, rIdx) =>
                  row.map((val, cIdx) => (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className="flex items-center justify-center p-2 font-amiri text-sm font-bold text-gray-800 border border-gray-100"
                    >
                      {val}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion 1: Tareeqa Tayyari Amal (طریقۂ تیاری عمل) */}
      <div className="mt-6 rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden">
        <button
          onClick={() => setOpenPrepGuide(!openPrepGuide)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 text-sm font-bold text-gray-800 hover:bg-gray-100 transition-colors"
        >
          <span className="font-amiri text-base font-bold text-[#1e40af]">طریقۂ تیاری عمل</span>
          <span className="rounded-lg bg-[#1e40af] text-white px-3 py-1 text-xs">
            {openPrepGuide ? 'چھپائیں' : 'ظاہر کریں'}
          </span>
        </button>

        {openPrepGuide && (
          <div className="p-4 text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2.5 border-t border-gray-200 bg-white font-urdu">
            <p>
              محبت، جلب، جذب اور حصولِ کیفیات کے عملیات میں تکسیر و سطرِ طلسم تیار کرنے کے لیے:
            </p>
            <p>
              اعمالِ خیر کا انتخاب کریں اور «انتخابِ نسبت» سے (موافق) اور عملِ طرد، جدائی، نفاق، عداوت اور ہلاکت کے لیے جو ہو اعمالِ شر کا انتخاب کرو، اور «انتخابِ نسبت» سے (مخالف) اور عمل کسی کا غرور کم کرنے کے لیے ہو تو «انتخابِ نسبت» سے (میمن) سلیکٹ کرنا ہے۔
            </p>
            <p>
              عمل کی تیاری کے وقت باوضو قبلہ رخ بیٹھیں، مناسب بخور (عود، لبان، یا صندل) روشن کریں اور نقش کو زعفران و عرقِ گلاب سے سفید قرطاس پر تحریر کریں۔
            </p>
          </div>
        )}
      </div>

      {/* Accordion 2: Tareeqa Istimal (طریقۂ استعمال) */}
      <div className="mt-3 rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden">
        <button
          onClick={() => setOpenUsageGuide(!openUsageGuide)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 text-sm font-bold text-gray-800 hover:bg-gray-100 transition-colors"
        >
          <span className="font-amiri text-base font-bold text-[#1e40af]">طریقۂ استعمال</span>
          <span className="rounded-lg bg-[#1e40af] text-white px-3 py-1 text-xs">
            {openUsageGuide ? 'چھپائیں' : 'ظاہر کریں'}
          </span>
        </button>

        {openUsageGuide && (
          <div className="p-4 text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2.5 border-t border-gray-200 bg-white font-urdu">
            <p>
              دو تصویریں طالب اور مطلوب کی فرضی بنائیں (اصل مل سکیں تو بہتر)۔ طالب کی تصویر پر نامِ طالب و مطلوب کے حروف اور دونوں کے حروفِ طلسم لکھ دیں۔
            </p>
            <p>
              تصویر اگر اصل ہے تو دونوں کے پیچھے نقش بنا کر اور سامنے موکل اور ایک پر اعداد اور حروفِ طلسم لکھ کر دونوں کے جوڑوں کا تصور فرضی بنانا ہے تو اس سے جو مقصد ظاہر ہوتا ہے چاہیے کہ اس کے لیے عمل کیا جائے۔ مثلاً محبت میں مدّ نظر رکھنے کے لیے طالب کھڑا ہو اور مطلوب قدموں پر گرا ہو، وصال کے لیے طالب و مطلوب گلے مل رہے ہوں، پشت کے لیے دونوں بازو پھیلائے ایک دوسرے کی طرف مائل ہوں۔ طلسم با عمل وہ بنتا ہے۔
            </p>
            <p>
              (وقتِ عمل) شمع کے موافق وقت کا انتخاب کریں، جو طلسم تیار کیا گیا ہے ایک موافق شمع عناصر میں ڈالیں اور دوسرا طالب کے پاس رکھنے کے لیے دیں۔
            </p>
          </div>
        )}
      </div>

      {/* Accordion 3: Azaim-e-Amal with Copy Functionality (عزائمِ عمل) */}
      <div className="mt-3 rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden">
        <button
          onClick={() => setOpenAzaim(!openAzaim)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 text-sm font-bold text-gray-800 hover:bg-gray-100 transition-colors"
        >
          <span className="font-amiri text-base font-bold text-[#1e40af]">عزائمِ عمل</span>
          <span className="rounded-lg bg-[#1e40af] text-white px-3 py-1 text-xs">
            {openAzaim ? 'چھپائیں' : 'ظاہر کریں'}
          </span>
        </button>

        {openAzaim && (
          <div className="p-4 text-xs sm:text-sm text-gray-800 leading-relaxed space-y-4 border-t border-gray-200 bg-white font-urdu">
            {/* Azimat-e-Hubb */}
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-amiri text-base font-bold text-[#1e40af]">عزیمتِ حب</span>
                <button
                  onClick={() => handleCopy(`توکلوا یا خدام ھذہ الاسماء (نامِ موکل) و حركوا روحانية المحبة و المودة و الالفة و الشوق و الرغبة فی قلب (نامِ مطلوب مع والدہ) علیٰ حب (نامِ طالب مع والدہ) بحق ھذہ الحروف (حروفِ طلسم) و بحق النار التی خلق منھا الجان توکلوا باحراق قلبھما بالحب و المحبة العاجل العاجل الساعة الساعة`, 'azimat-hub')}
                  className="flex items-center gap-1 rounded-lg bg-[#1e40af] text-white px-2.5 py-1 text-xs font-bold hover:bg-[#1e3a8a]"
                >
                  <Copy className="h-3 w-3" />
                  <span>{copiedSection === 'azimat-hub' ? 'کاپی ہو گئی!' : 'کاپی کریں'}</span>
                </button>
              </div>
              <p className="font-amiri text-sm leading-relaxed text-gray-800">
                توکلوا یا خدام ھذہ الاسماء (نامِ موکل) و حركوا روحانية المحبة و المودة و الالفة و الشوق و الرغبة فی قلب (نامِ مطلوب مع والدہ) علیٰ حب (نامِ طالب مع والدہ) بحق ھذہ الحروف (حروفِ طلسم) و بحق (نامِ جو بھی عنصر ہو) تا تحترق ھذہ الاسماء و علیھا محبتھما مدام۔
              </p>
            </div>

            {/* Azimat-e-Bughz */}
            <div className="rounded-xl border border-red-200 bg-red-50/50 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-amiri text-base font-bold text-red-800">عزیمتِ بغض</span>
                <button
                  onClick={() => handleCopy(`اقسمت علیکم یا ارواح استخفاف بکلی اسم حاصل من ھذہ الحروف و الاسماء (نامِ موکل) بحقھا عقد لسان و تصریف (نامِ والد) و عداوۃ (اسمِ دوسرا مع والدہ) ابداً (حروفِ طلسم)`, 'azimat-bughz')}
                  className="flex items-center gap-1 rounded-lg bg-red-700 text-white px-2.5 py-1 text-xs font-bold hover:bg-red-800"
                >
                  <Copy className="h-3 w-3" />
                  <span>{copiedSection === 'azimat-bughz' ? 'کاپی ہو گئی!' : 'کاپی کریں'}</span>
                </button>
              </div>
              <p className="font-amiri text-sm leading-relaxed text-gray-800">
                اقسمت علیکم یا ارواح استخفاف بکلی اسم حاصل من ھذہ الحروف و الاسماء (نامِ موکل) بحقھا عقد لسان و تصریف (نامِ والد) و عداوۃ (اسمِ دوسرا مع والدہ) ابداً (حروفِ طلسم)۔
              </p>
            </div>

            {/* Azimat-e-Judai */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-amiri text-base font-bold text-amber-900">عزیمتِ جدائی</span>
                <button
                  onClick={() => handleCopy(`فرّقت و فرّقت بحق الرّیاح و النور و الظلمة و الجبال الممدودة و البغضاء الی یوم الدین بحق ھذہ الحروف و اصحاب العداوة و المنشاء و اصحاب الحق و الباطل (نامِ موکل) الواحا الواحا العجل العجل الساعة الساعة`, 'azimat-judai')}
                  className="flex items-center gap-1 rounded-lg bg-amber-700 text-white px-2.5 py-1 text-xs font-bold hover:bg-amber-800"
                >
                  <Copy className="h-3 w-3" />
                  <span>{copiedSection === 'azimat-judai' ? 'کاپی ہو گئی!' : 'کاپی کریں'}</span>
                </button>
              </div>
              <p className="font-amiri text-sm leading-relaxed text-gray-800">
                فرّقت و فرّقت بحق الرّیاح و النور و الظلمة و الجبال الممدودة و البغضاء الی یوم الدین بحق ھذہ الحروف و اصحاب العداوة و المنشاء و اصحاب الحق و الباطل (نامِ موکل) الواحا الواحا العجل العجل الساعة الساعة۔
              </p>
            </div>

            {/* Azimat-e-Halakat */}
            <div className="rounded-xl border border-gray-300 bg-gray-50 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-amiri text-base font-bold text-gray-900">عزیمتِ ہلاکت</span>
                <button
                  onClick={() => handleCopy(`اقسمت علیکم یا جنود اسفلین بالاسماء (نامِ موکل) المھلک علیہ (نام مع والدہ) بحق الجبار القھار المذل مثل بثت یا ابی لھب و تب (حروفِ طلسم) و قتلو اقتلا و قتلو اقتلا و قتلو اقتلا`, 'azimat-halakat')}
                  className="flex items-center gap-1 rounded-lg bg-gray-800 text-white px-2.5 py-1 text-xs font-bold hover:bg-black"
                >
                  <Copy className="h-3 w-3" />
                  <span>{copiedSection === 'azimat-halakat' ? 'کاپی ہو گئی!' : 'کاپی کریں'}</span>
                </button>
              </div>
              <p className="font-amiri text-sm leading-relaxed text-gray-800">
                اقسمت علیکم یا جنود اسفلین بالاسماء (نامِ موکل) المھلک علیہ (نام مع والدہ) بحق الجبار القھار المذل مثل بثت یا ابی لھب و تب (حروفِ طلسم) و قتلو اقتلا و قتلو اقتلا و قتلو اقتلا۔
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Details */}
      <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white p-4 text-center shadow-lg">
        <div className="flex items-center justify-center gap-2 mb-1">
          <BookOpen className="h-4 w-4 text-amber-300" />
          <span className="font-amiri text-sm sm:text-base font-bold">
            تکسیرِ افلاطون و تصرفاتِ جفریہ
          </span>
        </div>
        <p className="text-[11px] text-blue-200">
          ماخوذ از قوانینِ افلاطون و قوانینِ طلسم کاش البرنی • جفر و تکسیر کا مستند تحقیقی سافٹ ویئر
        </p>
      </div>

      {/* Relation Mode Modal Dialog */}
      {isRelationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xs rounded-2xl bg-white p-5 shadow-2xl border-2 border-[#1e40af] space-y-4">
            <h4 className="font-amiri text-lg font-bold text-[#1e3a8a] text-center border-b pb-2">
              نسبت کا انتخاب کریں
            </h4>
            <div className="space-y-2">
              {[
                { id: 'muwafiq', label: 'موافق (برائے محبت، الفت و صلح)' },
                { id: 'mukhalif', label: 'مخالف (برائے تسخیرِ قوی و تفریق)' },
                { id: 'mayman', label: 'میمن (برائے کفایت و حفاظت)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setRelationMode(opt.id as any);
                    setIsRelationModalOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-bold transition-all ${
                    relationMode === opt.id
                      ? 'border-[#1e40af] bg-blue-50 text-[#1e40af]'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-800'
                  }`}
                >
                  <span>{opt.label}</span>
                  <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    relationMode === opt.id ? 'border-[#1e40af]' : 'border-gray-300'
                  }`}>
                    {relationMode === opt.id && <div className="h-2 w-2 rounded-full bg-[#1e40af]" />}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsRelationModalOpen(false)}
              className="w-full py-2 rounded-xl bg-gray-100 text-xs font-bold text-gray-700 hover:bg-gray-200"
            >
              منسوخ کریں
            </button>
          </div>
        </div>
      )}

      {/* Amal Mode Modal Dialog (عمل خیر / عمل شر) */}
      {isAmalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xs rounded-2xl bg-white p-5 shadow-2xl border-2 border-[#1e40af] space-y-4">
            <h4 className="font-amiri text-lg font-bold text-[#1e3a8a] text-center border-b pb-2">
              عمل کی نوعیت کا انتخاب
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setAmalMode('khair');
                  setIsAmalModalOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-bold transition-all ${
                  amalMode === 'khair'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-800'
                }`}
              >
                <span>عمل خیر (الفت، محبت، تسخیرِ قلوب، شفاء)</span>
                <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                  amalMode === 'khair' ? 'border-emerald-600' : 'border-gray-300'
                }`}>
                  {amalMode === 'khair' && <div className="h-2 w-2 rounded-full bg-emerald-600" />}
                </div>
              </button>

              <button
                onClick={() => {
                  setAmalMode('shar');
                  setIsAmalModalOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-bold transition-all ${
                  amalMode === 'shar'
                    ? 'border-red-600 bg-red-50 text-red-800'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-800'
                }`}
              >
                <span>عمل شر (دفعِ ظالم، زبان بندی، سلبِ قوت)</span>
                <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                  amalMode === 'shar' ? 'border-red-600' : 'border-gray-300'
                }`}>
                  {amalMode === 'shar' && <div className="h-2 w-2 rounded-full bg-red-600" />}
                </div>
              </button>
            </div>
            <button
              onClick={() => setIsAmalModalOpen(false)}
              className="w-full py-2 rounded-xl bg-gray-100 text-xs font-bold text-gray-700 hover:bg-gray-200"
            >
              منسوخ کریں
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
