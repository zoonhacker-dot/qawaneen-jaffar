import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateNaqsh, calculateAbjad, numberToAbjadLetters, generateTakseerSadrMuakhkhar } from '../utils/jafrEngine';
import { ChalType, NaqshResult, NaqshType, NaqshCategory, NaqshMode, SavedNaqshItem } from '../types';
import { 
  Compass, 
  Sparkles, 
  Printer, 
  Copy, 
  Check, 
  Info, 
  Shield, 
  Bookmark, 
  BookmarkCheck, 
  Heart, 
  Flame, 
  Lock, 
  Filter, 
  Trash2, 
  Eye, 
  Layers, 
  AlertTriangle,
  Search,
  BookOpen,
  RotateCcw,
  Feather,
  CheckCircle2,
  Moon,
  Sun,
  Clock,
  Zap,
  Users,
  Award,
  ShieldAlert,
  Sliders,
  Scissors
} from 'lucide-react';

interface NaqshGeneratorProps {
  initialAdad?: number;
}

interface CategoryPreset {
  id: string;
  title: string;
  category: NaqshCategory;
  adad: number;
  name: string;
  type: NaqshType;
  chal: ChalType;
  mode: NaqshMode;
  description: string;
  saat: string;
  incense: string;
  ink: string;
  method: string;
}

const CATEGORY_PRESETS: CategoryPreset[] = [
  // 1. محبت و الفت (Love & Harmony)
  {
    id: 'p-mah-1',
    title: 'حبِ شدید و الفتِ مطلوب (یا ودود یا حبیب)',
    category: 'mahabbat',
    adad: 663,
    name: 'یا ودود یا حبیب',
    type: 'musallas',
    chal: 'badi',
    mode: 'talismi_malayika',
    description: 'تسخیرِ قلوب، صلحِ زوجین اور محبتِ مخلصانہ پیدا کرنے کے لیے جامع مجرب نقش۔',
    saat: 'ساعتِ زہرہ (جمعہ بوقتِ طلوعِ آفتاب)',
    incense: 'صندل، عود، لوبان',
    ink: 'زعفران و عرقِ گلاب',
    method: 'نقش لکھ کر ہوا میں کسی اونچے یا پھلدار درخت پر لٹکائیں تاکہ ہوا سے حرکت کرے اور مطلوب بے قرار ہو۔',
  },
  {
    id: 'p-mah-2',
    title: 'عقدِ محبت و الفتِ خاص (یا رحیم یا رؤوف)',
    category: 'mahabbat',
    adad: 545,
    name: 'یا رحیم یا رؤوف',
    type: 'murabba',
    chal: 'aabi',
    mode: 'adadi_sadah',
    description: 'ناراضگی دور کرنے، دل نرم کرنے اور محبت کے قیام کے لیے پرتاثیر۔',
    saat: 'ساعتِ مشتری (جمعرات بوقتِ فجر)',
    incense: 'لوبان اور مشک',
    ink: 'زعفران',
    method: 'نقش کو عرقِ گلاب میں دھو کر میٹھے شربت میں گھول کر مطلوب کو پلائیں۔',
  },
  {
    id: 'p-mah-3',
    title: 'تسخیرِ عام و خلائق (یا عزیز یا لطیف)',
    category: 'mahabbat',
    adad: 223,
    name: 'یا عزیز یا لطیف',
    type: 'mukhammas',
    chal: 'badi',
    mode: 'harfi_abjad',
    description: 'ہر خاص و عام کے دل میں عزت، وقار، محبت اور محبوبیت حاصل کرنے کے لیے۔',
    saat: 'ساعتِ شمس (اتوار بوقتِ اشراق)',
    incense: 'عود اور عنبر',
    ink: 'زعفران و مشک',
    method: 'دائیں بازو پر باندھیں یا گلے میں تعویذ بنا کر پہنیں۔',
  },

  // 2. شفاء الامراض و دفعِ بلایات (Healing & Cure)
  {
    id: 'p-shifa-1',
    title: 'جامع شفائے امراض و دفعِ درد (یا شافی یا کافی)',
    category: 'shifa',
    adad: 508,
    name: 'یا شافی یا کافی',
    type: 'musallas',
    chal: 'aabi',
    mode: 'talismi_malayika',
    description: 'ہر قسم کے جسمانی و روحانی امراض، بخار اور مزمن تکالیف کے شافی علاج کے لیے۔',
    saat: 'ساعتِ قمر (پیر بوقتِ فجر) یا ساعتِ مشتری',
    incense: 'لوبان اور مصطگی رومی',
    ink: 'زعفران اور آبِ زمزم',
    method: 'چینی کی پلیٹ پر لکھ کر نہار منہ 7 یا 21 دن تک مریض کو پلائیں اور ایک نقش گلے میں ڈالیں۔',
  },
  {
    id: 'p-shifa-2',
    title: 'دفعِ سحر، نظرِ بد و آسیب (آیۃ الکرسی شریف)',
    category: 'shifa',
    adad: 5923,
    name: 'آیۃ الکرسی',
    type: 'murabba',
    chal: 'aabi',
    mode: 'talismi_malayika',
    description: 'جادو، سحر، نظرِ بد، خبیث اثرات اور ام الصبیان کے کامل قلع قمع کے لیے اعظم نقوش میں سے ہے۔',
    saat: 'ساعتِ شمس یا قمر',
    incense: 'حرمل، گوگل اور لوبان',
    ink: 'زعفران و عرقِ گلاب',
    method: 'گلے میں لٹکائیں اور پانی پر دم کر کے گھر کے چاروں کونوں پر چھڑکیں۔',
  },

  // 3. عداوت، تفریق و ہلاکتِ ظالم (Enmity & Separation of Oppressors)
  {
    id: 'p-ad-1',
    title: 'تفریقِ باطل و دفعِ ظالم (یا قہار یا جبار)',
    category: 'adawat',
    adad: 512,
    name: 'یا قہار یا جبار',
    type: 'musallas',
    chal: 'atishi',
    mode: 'adadi_sadah',
    description: 'دو برے لوگوں میں تفریق یا ظالم کے شر سے حفاظت و جدائی کے لیے (صرف جائز و شرعی مقصد)۔',
    saat: 'ساعتِ مریخ (منگل بوقتِ زوال)',
    incense: 'حرمل اور رائی',
    ink: 'سیاہ روشنائی یا نیل',
    method: 'نقش لکھ کر سرخ انگاروں پر ڈال کر جلائیں یا پرانے کھنڈر کی مٹی میں دبائیں۔',
  },
  {
    id: 'p-ad-2',
    title: 'دفعِ اشرار و ہلاکتِ ستم گر (یا مذل یا ممیت)',
    category: 'adawat',
    adad: 1260,
    name: 'یا مذل یا ممیت',
    type: 'murabba',
    chal: 'khaaki',
    mode: 'talismi_malayika',
    description: 'سرکش ظالموں، ڈاکوؤں اور موذی دشمنوں کے شر کو نیچا دکھانے اور ان کے فتنوں کو کچلنے کے لیے۔',
    saat: 'ساعتِ زحل (ہفتہ بعد از عصر)',
    incense: 'گوگل اور صمغ حنظل',
    ink: 'سیاہ سیاہی',
    method: 'نقش کو وزنی کالے پتھر کے نیچے دفن کریں یا دریا کے سرد کنارے مٹی میں دبائیں۔',
  },

  // 4. زبان بندی و عقد اللسان (Tongue Binding)
  {
    id: 'p-zb-1',
    title: 'عقد اللسان و زبان بندیِ بدخواہاں (صم بکم عمی)',
    category: 'zaban_bandi',
    adad: 332,
    name: 'صم بکم عمی فہم لا یرجعون',
    type: 'musallas',
    chal: 'khaaki',
    mode: 'talismi_malayika',
    description: 'حاسدین، بدزبانوں، مخالفین اور عدالت میں سچی گواہی کو موڑنے والوں کی زبان بند کرنے کے لیے۔',
    saat: 'ساعتِ عطارد (بدھ بوقتِ صبح) یا زحل',
    incense: 'رائی اور صندل سیاہ',
    ink: 'سرمہ یا سیاہ سیاہی',
    method: 'نقش کو تانبے کے پترے یا کاغذ پر لکھ کر وزنی پتھر کے نیچے دبائیں۔',
  },
  {
    id: 'p-zb-2',
    title: 'قفلِ دہنِ اعداء (الیوم نختم علی افواہم)',
    category: 'zaban_bandi',
    adad: 2148,
    name: 'الیوم نختم علی افواہم وتکلمنا ایدیہم',
    type: 'murabba',
    chal: 'khaaki',
    mode: 'adadi_sadah',
    description: 'شمنوں کے جھوٹے الزامات اور غیبت کو ہمیشہ کے لیے تالا لگانے کا مجرب عمل۔',
    saat: 'ساعتِ زحل (ہفتہ بوقتِ غروب)',
    incense: 'حرمل اور لوبان',
    ink: 'سیاہ روشنائی',
    method: 'نقش کو موڑ کر کالی ڈوری سے باندھ کر اندھیری جگہ پر وزنی شے کے نیچے رکھیں۔',
  },

  // 5. رزق، برکت و کشائشِ تجارت (Wealth & Victory)
  {
    id: 'p-rz-1',
    title: 'وسعتِ رزق و برکتِ دکان (یا فتاح یا رزاق)',
    category: 'rizq_barakat',
    adad: 797,
    name: 'یا فتاح یا رزاق یا باسط یا غنی',
    type: 'murabba',
    chal: 'atishi',
    mode: 'talismi_malayika',
    description: 'دکان و کاروبار میں گاہکوں کا ہجوم، بندشِ رزق کا خاتمہ اور فتوحاتِ غیبیہ کے لیے۔',
    saat: 'ساعتِ مشتری (جمعرات بعد از نمازِ فجر)',
    incense: 'عود قماری اور لوبانِ ذکر',
    ink: 'زعفران و مشک',
    method: 'دکان یا مکان کے صدر دروازے کے اوپر یا تبرک کے طور پر تالے/صندوقچے میں رکھیں۔',
  },

  // 6. حصار و حفاظتِ امان (Protection & Spiritual Shield)
  {
    id: 'p-hf-1',
    title: 'حصارِ اعظم و امانِ کلی (فاللہ خیر حافظا)',
    category: 'hifazat_hisar',
    adad: 1563,
    name: 'فاللہ خیر حافظا وہو ارحم الراحمین',
    type: 'mukhammas',
    chal: 'badi',
    mode: 'talismi_malayika',
    description: 'حادثات، اچانک آفات، چوری، حاسدین کی شرارتوں اور دشمنوں کی سازشوں سے فولادی قلعہ۔',
    saat: 'ساعتِ شمس یا مشتری',
    incense: 'لوبان اور عنبر',
    ink: 'زعفران و عرقِ گلاب',
    method: 'اپنے پاس رکھیں یا گھر کی چاروں دیواروں پر لٹکائیں۔',
  },
];

export const NaqshGenerator: React.FC<NaqshGeneratorProps> = ({ initialAdad = 786 }) => {
  // Main Navigation Tabs
  const [activeMainTab, setActiveMainTab] = useState<'generator' | 'chal_guide' | 'usage_manual' | 'presets_library' | 'saved_library'>('generator');

  // Input Modality
  const [inputMode, setInputMode] = useState<'name' | 'adad' | 'taleb_matloob'>('name');
  const [nameInput, setNameInput] = useState<string>('یا ودود یا حبیب');
  const [numberInput, setNumberInput] = useState<number>(initialAdad || 786);

  // Taleb & Matloob Input State
  const [talibName, setTalibName] = useState<string>('زید');
  const [talibMother, setTalibMother] = useState<string>('حوا');
  const [matloobName, setMatloobName] = useState<string>('ہند');
  const [matloobMother, setMatloobMother] = useState<string>('مریم');
  const [selectedPurposePreset, setSelectedPurposePreset] = useState<number>(663); // default love

  // Generator Config
  const [naqshType, setNaqshType] = useState<NaqshType>('musallas');
  const [chal, setChal] = useState<ChalType>('badi');
  const [naqshMode, setNaqshMode] = useState<NaqshMode>('talismi_malayika');
  const [activeCategoryTag, setActiveCategoryTag] = useState<NaqshCategory>('mahabbat');

  // Meditative Inking Canvas State
  const [animationOrder, setAnimationOrder] = useState<'chal' | 'matrix'>('chal');
  const [animationSpeed, setAnimationSpeed] = useState<'meditative' | 'normal' | 'fast'>('normal');
  const [showHouseNumbers, setShowHouseNumbers] = useState<boolean>(true);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Saved Naqoosh State (LocalStorage)
  const [savedNaqoosh, setSavedNaqoosh] = useState<SavedNaqshItem[]>(() => {
    try {
      const stored = localStorage.getItem('kashif_saved_naqoosh_v2');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [
      {
        id: 'saved-default-1',
        title: 'لوحِ حب و الفت (یا ودود یا حبیب)',
        category: 'mahabbat',
        categoryUrdu: 'محبت و الفت',
        adad: 663,
        inputText: 'یا ودود یا حبیب',
        type: 'musallas',
        typeNameUrdu: 'مثلث (3x3)',
        chal: 'badi',
        chalNameUrdu: 'بادی چال (شمال و ہوا)',
        grid: [[222, 227, 214], [215, 221, 227], [226, 215, 222]],
        dimension: 3,
        notes: 'برائے الفت و تسخیرِ قلوب۔ ساعتِ زہرہ میں زعفران سے لکھا جائے اور درخت پر لٹکایا جائے۔',
        createdAt: '2026-08-30',
      },
    ];
  });

  // Modal & Alerts
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [saveTitle, setSaveTitle] = useState<string>('');
  const [saveNotes, setSaveNotes] = useState<string>('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Presets & Filter states
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<NaqshCategory | 'all'>('all');
  const [savedSearchQuery, setSavedSearchQuery] = useState<string>('');
  const [savedCategoryFilter, setSavedCategoryFilter] = useState<NaqshCategory | 'all'>('all');

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('kashif_saved_naqoosh_v2', JSON.stringify(savedNaqoosh));
    } catch {
      // ignore
    }
  }, [savedNaqoosh]);

  // Derived Abjad & Spiritual properties
  const abjadDetails = useMemo(() => {
    if (inputMode === 'name') {
      return calculateAbjad(nameInput || 'یا اللہ');
    }
    if (inputMode === 'taleb_matloob') {
      const tAdad = calculateAbjad(talibName).totalKabir;
      const tmAdad = calculateAbjad(talibMother).totalKabir;
      const mAdad = calculateAbjad(matloobName).totalKabir;
      const mmAdad = calculateAbjad(matloobMother).totalKabir;
      const totalCombined = tAdad + tmAdad + mAdad + mmAdad + selectedPurposePreset;
      return calculateAbjad(`${talibName} ${matloobName}`);
    }
    return calculateAbjad(numberInput.toString());
  }, [inputMode, nameInput, numberInput, talibName, talibMother, matloobName, matloobMother, selectedPurposePreset]);

  // Active Effective Adad
  const activeAdad = useMemo(() => {
    if (inputMode === 'name') {
      return abjadDetails.totalKabir || 786;
    }
    if (inputMode === 'taleb_matloob') {
      const tAdad = calculateAbjad(talibName).totalKabir;
      const tmAdad = calculateAbjad(talibMother).totalKabir;
      const mAdad = calculateAbjad(matloobName).totalKabir;
      const mmAdad = calculateAbjad(matloobMother).totalKabir;
      return tAdad + tmAdad + mAdad + mmAdad + selectedPurposePreset;
    }
    return Math.max(1, numberInput || 786);
  }, [inputMode, nameInput, numberInput, abjadDetails, talibName, talibMother, matloobName, matloobMother, selectedPurposePreset]);

  // Takseer Sadr-o-Muakhkhar for Takseeri Naqsh Mode
  const takseerDetails = useMemo(() => {
    const textToTakseer = inputMode === 'name' ? nameInput : inputMode === 'taleb_matloob' ? `${talibName} ${matloobName}` : 'بسم اللہ الرحمن الرحیم';
    return generateTakseerSadrMuakhkhar(textToTakseer || 'اللہ');
  }, [inputMode, nameInput, talibName, matloobName]);

  // Generate Naqsh Result
  const naqshResult: NaqshResult = useMemo(() => {
    return generateNaqsh(activeAdad, naqshType, chal);
  }, [activeAdad, naqshType, chal]);

  // Restart drawing animation on parameter change
  useEffect(() => {
    replayAnimation();
  }, [activeAdad, naqshType, chal, naqshMode]);

  const replayAnimation = () => {
    setIsDrawing(true);
    setAnimationKey((prev) => prev + 1);
    const totalCells = naqshResult.dimension * naqshResult.dimension;
    const stepTime = animationSpeed === 'meditative' ? 160 : animationSpeed === 'normal' ? 80 : 30;
    const duration = totalCells * stepTime + 500;
    setTimeout(() => {
      setIsDrawing(false);
    }, duration);
  };

  // Helper for House Numbers in Musallas and Murabba
  const getHouseNumber = (r: number, c: number, type: NaqshType, chalType: ChalType): number => {
    const MUSALLAS_CHAL_ORDER_MAP: Record<ChalType, number[][]> = {
      atishi: [
        [8, 1, 6],
        [3, 5, 7],
        [4, 9, 2],
      ],
      badi: [
        [6, 7, 2],
        [1, 5, 9],
        [8, 3, 4],
      ],
      aabi: [
        [2, 9, 4],
        [7, 5, 3],
        [6, 1, 8],
      ],
      khaaki: [
        [4, 3, 8],
        [9, 5, 1],
        [2, 7, 6],
      ],
    };

    const MURABBA_CHAL_ORDER_MAP: Record<ChalType, number[][]> = {
      atishi: [
        [1, 14, 15, 4],
        [12, 7, 6, 9],
        [8, 11, 10, 5],
        [13, 2, 3, 16],
      ],
      badi: [
        [4, 15, 14, 1],
        [9, 6, 7, 12],
        [5, 10, 11, 8],
        [16, 3, 2, 13],
      ],
      aabi: [
        [13, 2, 3, 16],
        [8, 11, 10, 5],
        [12, 7, 6, 9],
        [1, 14, 15, 4],
      ],
      khaaki: [
        [16, 3, 2, 13],
        [5, 10, 11, 8],
        [9, 6, 7, 12],
        [4, 15, 14, 1],
      ],
    };

    if (type === 'musallas' && MUSALLAS_CHAL_ORDER_MAP[chalType]) {
      return MUSALLAS_CHAL_ORDER_MAP[chalType][r]?.[c] || r * 3 + c + 1;
    }
    if (type === 'murabba' && MURABBA_CHAL_ORDER_MAP[chalType]) {
      return MURABBA_CHAL_ORDER_MAP[chalType][r]?.[c] || r * 4 + c + 1;
    }
    return r * naqshResult.dimension + c + 1;
  };

  // Convert Cell value to display representation based on NaqshMode
  const renderCellValue = (cellVal: number, rIdx: number, cIdx: number) => {
    if (naqshMode === 'adadi_sadah' || naqshMode === 'talismi_malayika') {
      return cellVal;
    }
    if (naqshMode === 'harfi_abjad') {
      return numberToAbjadLetters(cellVal);
    }
    if (naqshMode === 'takseeri') {
      // Extract from takseer matrix if available
      const letters = takseerDetails.letters;
      if (letters.length > 0) {
        const stepIdx = rIdx % Math.max(1, takseerDetails.steps.length);
        const stepLetters = takseerDetails.steps[stepIdx]?.letters || letters;
        const char = stepLetters[cIdx % stepLetters.length] || numberToAbjadLetters(cellVal);
        return char;
      }
      return numberToAbjadLetters(cellVal);
    }
    return cellVal;
  };

  // Copy Naqsh to Clipboard
  const copyGrid = () => {
    const text = naqshResult.grid.map((row) => row.join('\t')).join('\n');
    navigator.clipboard.writeText(
      `نقش: ${naqshType} | چال: ${chal} | کل عدد: ${activeAdad}\n\n${text}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Print Naqsh
  const handlePrint = () => {
    window.print();
  };

  // Load Preset
  const loadPreset = (preset: CategoryPreset) => {
    setInputMode('name');
    setNameInput(preset.name);
    setNaqshType(preset.type);
    setChal(preset.chal);
    setNaqshMode(preset.mode);
    setActiveCategoryTag(preset.category);
    setActiveMainTab('generator');
  };

  // Load Saved Naqsh
  const loadSavedNaqsh = (item: SavedNaqshItem) => {
    if (item.inputText) {
      setInputMode('name');
      setNameInput(item.inputText);
    } else {
      setInputMode('adad');
      setNumberInput(item.adad);
    }
    setNaqshType(item.type);
    setChal(item.chal);
    setActiveCategoryTag(item.category);
    setActiveMainTab('generator');
  };

  // Save Naqsh
  const handleSaveNaqsh = (e: React.FormEvent) => {
    e.preventDefault();
    const catNames: Record<NaqshCategory, string> = {
      mahabbat: 'محبت و الفت',
      adawat: 'عداوت و دفاع',
      zaban_bandi: 'زبان بندی',
      shifa: 'شفاء الامراض',
      rizq_barakat: 'رزق و برکت',
      hifazat_hisar: 'حفاظت و حصار',
      aam: 'عام / جملہ مقاصد',
    };

    const typeNames: Record<NaqshType, string> = {
      musallas: 'مثلث (3x3)',
      murabba: 'مربع (4x4)',
      mukhammas: 'مخمس (5x5)',
      musaddas: 'مسدس (6x6)',
      musabba: 'مسبع (7x7)',
      musamman: 'مثمن (8x8)',
    };

    const chalNames: Record<ChalType, string> = {
      atishi: 'آتشی چال',
      badi: 'بادی چال',
      aabi: 'آبی چال',
      khaaki: 'خاکی چال',
    };

    const newItem: SavedNaqshItem = {
      id: `naqsh-${Date.now()}`,
      title: saveTitle.trim() || (inputMode === 'name' ? nameInput : `نقش عدد ${activeAdad}`),
      category: activeCategoryTag,
      categoryUrdu: catNames[activeCategoryTag] || 'عام',
      adad: activeAdad,
      inputText: inputMode === 'name' ? nameInput : inputMode === 'taleb_matloob' ? `${talibName} بن ${talibMother} و ${matloobName} بنت ${matloobMother}` : undefined,
      type: naqshType,
      typeNameUrdu: typeNames[naqshType],
      chal: chal,
      chalNameUrdu: chalNames[chal],
      grid: naqshResult.grid,
      dimension: naqshResult.dimension,
      notes: saveNotes.trim() || undefined,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setSavedNaqoosh([newItem, ...savedNaqoosh]);
    setSaveModalOpen(false);
    setSaveNotes('');
    setSaveSuccessMsg('نقش کامیابی کے ساتھ آپ کے ذخیرۂ نقوش میں محفوظ کر دیا گیا!');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Delete saved naqsh
  const handleDeleteSaved = (id: string) => {
    setSavedNaqoosh(savedNaqoosh.filter((item) => item.id !== id));
  };

  // Filter presets
  const filteredPresets = useMemo(() => {
    if (selectedCategoryFilter === 'all') return CATEGORY_PRESETS;
    return CATEGORY_PRESETS.filter((p) => p.category === selectedCategoryFilter);
  }, [selectedCategoryFilter]);

  // Filter saved naqoosh
  const filteredSavedItems = useMemo(() => {
    return savedNaqoosh.filter((item) => {
      const matchCat = savedCategoryFilter === 'all' || item.category === savedCategoryFilter;
      const matchSearch =
        !savedSearchQuery.trim() ||
        item.title.toLowerCase().includes(savedSearchQuery.toLowerCase()) ||
        (item.inputText && item.inputText.toLowerCase().includes(savedSearchQuery.toLowerCase())) ||
        item.adad.toString().includes(savedSearchQuery);
      return matchCat && matchSearch;
    });
  }, [savedNaqoosh, savedCategoryFilter, savedSearchQuery]);

  const getCategoryBadge = (cat: NaqshCategory) => {
    switch (cat) {
      case 'mahabbat':
        return {
          label: 'محبت و الفت',
          color: 'bg-[#faedcd] text-[#bc6c25] border-[#d4a373]',
          icon: <Heart className="h-3.5 w-3.5 fill-[#bc6c25]" />,
        };
      case 'adawat':
        return {
          label: 'عداوت و دفاع',
          color: 'bg-[#fae1dd] text-[#9d0208] border-[#9d0208]',
          icon: <Flame className="h-3.5 w-3.5 text-[#9d0208]" />,
        };
      case 'zaban_bandi':
        return {
          label: 'زبان بندی',
          color: 'bg-[#dce4c9] text-[#283618] border-[#606c38]',
          icon: <Lock className="h-3.5 w-3.5 text-[#283618]" />,
        };
      case 'shifa':
        return {
          label: 'شفاء الامراض',
          color: 'bg-[#e0f2fe] text-[#0369a1] border-[#7dd3fc]',
          icon: <Sparkles className="h-3.5 w-3.5 text-[#0369a1]" />,
        };
      case 'rizq_barakat':
        return {
          label: 'رزق و برکت',
          color: 'bg-[#fef08a] text-[#854d0e] border-[#facc15]',
          icon: <Award className="h-3.5 w-3.5 text-[#854d0e]" />,
        };
      case 'hifazat_hisar':
        return {
          label: 'حفاظت و حصار',
          color: 'bg-[#e2e8f0] text-[#334155] border-[#94a3b8]',
          icon: <Shield className="h-3.5 w-3.5 text-[#334155]" />,
        };
      default:
        return {
          label: 'عام / جملہ مقاصد',
          color: 'bg-[#fdfaf1] text-[#5d4037] border-[#d4a373]',
          icon: <Bookmark className="h-3.5 w-3.5 text-[#5d4037]" />,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Navigation Tabs */}
      <div className="rounded-2xl border-2 border-[#d4a373] bg-[#f2e8cf] p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#bc6c25] text-white shadow-sm">
                <Compass className="h-5 w-5" />
              </span>
              <h2 className="font-amiri text-2xl font-bold text-[#5d4037]">
                جامع مولد النقوش، الواحِ طلسمات و تکسیر (Universal Naqsh Studio)
              </h2>
            </div>
            <p className="mt-1 text-sm text-[#8d6e63] max-w-3xl font-medium">
              قرآنی آیات، اسمائے حسنیٰ، کلمات و اعداد سے ہر قسم کے نقوش (سادہ عددی، حرفی، تکسیری و طلسمی مع ملائکۂ اربعہ) تیار کرنے اور محبت، شفاء، عداوت، زبان بندی و کشائش کے قواعد پر عمل کرنے کا مکمل نظام۔
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setSaveTitle(inputMode === 'name' ? nameInput : `نقش عدد ${activeAdad}`);
                setSaveModalOpen(true);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-[#283618] hover:bg-[#384628] px-4 py-2 text-xs font-bold text-white transition-all cursor-pointer shadow-sm"
            >
              <BookmarkCheck className="h-4 w-4" />
              <span>نقش محفوظ کریں</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl border border-[#d4a373] bg-[#fdfaf1] px-3.5 py-2 text-xs font-bold text-[#5d4037] hover:bg-[#faedcd] transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="h-4 w-4 text-[#bc6c25]" />
              <span>پرنٹ / PDF</span>
            </button>
            <button
              onClick={copyGrid}
              className="flex items-center gap-1.5 rounded-xl bg-[#bc6c25] hover:bg-[#a65d1e] px-3.5 py-2 text-xs font-bold text-white transition-all cursor-pointer shadow-sm"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-200" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'نقل ہو گیا' : 'نقش نقل کریں'}</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {saveSuccessMsg && (
          <div className="mt-4 p-3 rounded-xl bg-[#dce4c9] border border-[#606c38] text-xs font-bold text-[#283618] flex items-center gap-2">
            <Check className="h-4 w-4 text-[#283618]" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Main Studio Navigation Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-[#e7d8c9]">
          {[
            { id: 'generator', label: 'مولد و مصممِ نقوش (Live Generator)', icon: <Sparkles className="h-4 w-4" /> },
            { id: 'chal_guide', label: 'جدولِ چال و مراحلِ کتابت (Chal Order & Steps)', icon: <Sliders className="h-4 w-4" /> },
            { id: 'usage_manual', label: 'قواعدِ استعمال برائے جملہ مقاصد (Application Guide)', icon: <BookOpen className="h-4 w-4" /> },
            { id: 'presets_library', label: 'مستند پری سیٹس و اعمال (Master Presets)', icon: <Award className="h-4 w-4" /> },
            { id: 'saved_library', label: `ذخیرۂ نقوشِ محفوظہ (${savedNaqoosh.length})`, icon: <BookmarkCheck className="h-4 w-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMainTab(tab.id as typeof activeMainTab)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeMainTab === tab.id
                  ? 'bg-[#bc6c25] text-white shadow-md'
                  : 'bg-[#fdfaf1] border border-[#d4a373] text-[#5d4037] hover:bg-[#faedcd]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: LIVE GENERATOR & CANVAS */}
      {activeMainTab === 'generator' && (
        <div className="space-y-6">
          {/* Configuration Grid */}
          <div className="rounded-2xl border-2 border-[#d4a373] bg-[#ffffff] p-5 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#e7d8c9]">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-[#bc6c25]" />
                <h3 className="font-amiri text-lg font-bold text-[#5d4037]">
                  ترتیباتِ نقش و انتخابِ طریقۂ عمل
                </h3>
              </div>

              {/* Mode Badges */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#f9f4e8] rounded-xl border border-[#d4a373]">
                {[
                  { id: 'talismi_malayika', label: 'طلسمی لوح مع ملائکہ', icon: <Shield className="h-3.5 w-3.5" /> },
                  { id: 'adadi_sadah', label: 'سادہ عددی نقش', icon: <Layers className="h-3.5 w-3.5" /> },
                  { id: 'harfi_abjad', label: 'حرفی نقش (ابجد)', icon: <Feather className="h-3.5 w-3.5" /> },
                  { id: 'takseeri', label: 'تکسیری نقش (صدر و مؤخر)', icon: <Zap className="h-3.5 w-3.5" /> },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setNaqshMode(m.id as NaqshMode)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      naqshMode === m.id
                        ? 'bg-[#bc6c25] text-white shadow-xs'
                        : 'text-[#5d4037] hover:bg-[#faedcd]'
                    }`}
                  >
                    {m.icon}
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Selection Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1. Input Modality */}
              <div className="space-y-2 md:col-span-3">
                <div className="flex flex-wrap items-center justify-between text-xs text-[#5d4037] font-bold">
                  <span>طریقۂ اندراج (Input Modality):</span>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="input-mode"
                        checked={inputMode === 'name'}
                        onChange={() => setInputMode('name')}
                        className="accent-[#bc6c25]"
                      />
                      <span>قرآنی آیات / اسمائے حسنیٰ / کلمات</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="input-mode"
                        checked={inputMode === 'taleb_matloob'}
                        onChange={() => setInputMode('taleb_matloob')}
                        className="accent-[#bc6c25]"
                      />
                      <span>طالب و مطلوب مع والدہ و مقصد</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="input-mode"
                        checked={inputMode === 'adad'}
                        onChange={() => setInputMode('adad')}
                        className="accent-[#bc6c25]"
                      />
                      <span>براہِ راست عدد</span>
                    </label>
                  </div>
                </div>

                {/* Input Fields based on modality */}
                {inputMode === 'name' && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      id="naqsh-name-input"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="قرآنی آیت، اسمائے حسنیٰ یا مطلوبہ عبارت درج کریں..."
                      className="w-full rounded-xl border-2 border-[#d4a373] bg-[#ffffff] px-4 py-2.5 text-base text-[#2c1e14] placeholder-[#a89078] focus:border-[#bc6c25] focus:outline-none font-amiri shadow-inner"
                    />
                    {/* Quick Quranic Presets Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="text-[#8d6e63] font-bold">فوری انتخاب:</span>
                      {[
                        { label: 'بسم اللہ (786)', val: 'بسم اللہ الرحمن الرحیم' },
                        { label: 'یا ودود یا حبیب (663)', val: 'یا ودود یا حبیب' },
                        { label: 'یا شافی یا کافی (508)', val: 'یا شافی یا کافی' },
                        { label: 'یا قہار یا جبار (512)', val: 'یا قہار یا جبار' },
                        { label: 'صم بکم عمی (332)', val: 'صم بکم عمی فہم لا یرجعون' },
                        { label: 'یا فتاح یا رزاق (797)', val: 'یا فتاح یا رزاق یا باسط یا غنی' },
                        { label: 'فاللہ خیر حافظا (1563)', val: 'فاللہ خیر حافظا وہو ارحم الراحمین' },
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setNameInput(item.val)}
                          className="px-2.5 py-1 rounded-lg bg-[#fdfaf1] border border-[#d4a373] text-[#5d4037] hover:bg-[#faedcd] font-amiri font-bold text-[11px] cursor-pointer"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {inputMode === 'taleb_matloob' && (
                  <div className="p-4 rounded-xl bg-[#fdfaf1] border border-[#d4a373] space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#5d4037] mb-1">نام طالب (Seeker):</label>
                        <input
                          type="text"
                          value={talibName}
                          onChange={(e) => setTalibName(e.target.value)}
                          placeholder="مثلاً: زید"
                          className="w-full rounded-lg border border-[#d4a373] px-3 py-1.5 text-xs text-[#2c1e14] bg-white font-amiri font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#5d4037] mb-1">والدہ طالب:</label>
                        <input
                          type="text"
                          value={talibMother}
                          onChange={(e) => setTalibMother(e.target.value)}
                          placeholder="مثلاً: حوا"
                          className="w-full rounded-lg border border-[#d4a373] px-3 py-1.5 text-xs text-[#2c1e14] bg-white font-amiri font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#5d4037] mb-1">نام مطلوب (Target):</label>
                        <input
                          type="text"
                          value={matloobName}
                          onChange={(e) => setMatloobName(e.target.value)}
                          placeholder="مثلاً: ہند"
                          className="w-full rounded-lg border border-[#d4a373] px-3 py-1.5 text-xs text-[#2c1e14] bg-white font-amiri font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#5d4037] mb-1">والدہ مطلوب:</label>
                        <input
                          type="text"
                          value={matloobMother}
                          onChange={(e) => setMatloobMother(e.target.value)}
                          placeholder="مثلاً: مریم"
                          className="w-full rounded-lg border border-[#d4a373] px-3 py-1.5 text-xs text-[#2c1e14] bg-white font-amiri font-bold"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#e7d8c9]">
                      <span className="text-xs font-bold text-[#5d4037]">انتخابِ مقصد (Purpose Constant):</span>
                      <select
                        value={selectedPurposePreset}
                        onChange={(e) => setSelectedPurposePreset(Number(e.target.value))}
                        className="rounded-lg border border-[#d4a373] bg-white px-3 py-1 text-xs text-[#5d4037] font-bold"
                      >
                        <option value={663}>محبت، الفت و تسخیر (+663 یا ودود یا حبیب)</option>
                        <option value={508}>شفاء الامراض و صحت (+508 یا شافی یا کافی)</option>
                        <option value={512}>تفریق و عداوتِ ظالم (+512 یا قہار یا جبار)</option>
                        <option value={332}>زبان بندی و عقد اللسان (+332 صم بکم عمی)</option>
                        <option value={797}>رزق و کشائشِ تجارت (+797 یا فتاح یا رزاق)</option>
                        <option value={1563}>حفاظت و حصار (+1563 فاللہ خیر حافظا)</option>
                      </select>
                    </div>
                  </div>
                )}

                {inputMode === 'adad' && (
                  <input
                    type="number"
                    id="naqsh-number-input"
                    value={numberInput}
                    onChange={(e) => setNumberInput(parseInt(e.target.value) || 0)}
                    placeholder="مطلوبہ عدد درج کریں (مثلاً: 786)"
                    className="w-full rounded-xl border-2 border-[#d4a373] bg-[#ffffff] px-4 py-2.5 text-base text-[#2c1e14] placeholder-[#a89078] focus:border-[#bc6c25] focus:outline-none shadow-inner"
                  />
                )}
              </div>

              {/* 2. Naqsh Matrix Dimensions (3x3 to 8x8) */}
              <div className="space-y-2 md:col-span-2">
                <span className="block text-xs font-bold text-[#5d4037]">ابعاد و قسمِ نقش (Matrix Dimension):</span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[
                    { id: 'musallas', label: 'مثلث (3x3)', sub: '9 خانے' },
                    { id: 'murabba', label: 'مربع (4x4)', sub: '16 خانے' },
                    { id: 'mukhammas', label: 'مخمس (5x5)', sub: '25 خانے' },
                    { id: 'musaddas', label: 'مسدس (6x6)', sub: '36 خانے' },
                    { id: 'musabba', label: 'مسبع (7x7)', sub: '49 خانے' },
                    { id: 'musamman', label: 'مثمن (8x8)', sub: '64 خانے' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setNaqshType(t.id as NaqshType)}
                      className={`rounded-xl p-2 text-center transition-all cursor-pointer ${
                        naqshType === t.id
                          ? 'bg-[#bc6c25] text-white shadow-md'
                          : 'bg-[#fdfaf1] border border-[#d4a373] text-[#5d4037] hover:bg-[#faedcd]'
                      }`}
                    >
                      <div className="text-xs font-bold">{t.label}</div>
                      <div className="text-[10px] opacity-80">{t.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Chal Selection */}
              <div className="space-y-2">
                <span className="block text-xs font-bold text-[#5d4037]">عنصری چال (کاش البرنی):</span>
                <select
                  id="naqsh-chal-select"
                  value={chal}
                  onChange={(e) => setChal(e.target.value as ChalType)}
                  className="w-full rounded-xl border-2 border-[#d4a373] bg-[#ffffff] px-3.5 py-2.5 text-xs text-[#5d4037] font-semibold focus:border-[#bc6c25] focus:outline-none shadow-inner cursor-pointer"
                >
                  <option value="atishi">آتشی چال (مشرق - تسخیر، سرعت و عداوتِ ظالم)</option>
                  <option value="badi">بادی چال (شمال - محبت، الفت، کشش و قلبی بے قراری)</option>
                  <option value="aabi">آبی چال (مغرب - تسکین، شفا، صلح و فراخی)</option>
                  <option value="khaaki">خاکی چال (جنوب - زبان بندی، دفینہ و ثبات)</option>
                </select>
              </div>
            </div>

            {/* Spiritual & Astrological Summary Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 p-3 bg-[#fdfaf1] rounded-xl border border-[#e7d8c9] text-[11px] text-[#5d4037]">
              <div><strong>کل عدد (کبیر):</strong> <span className="font-bold text-[#bc6c25]">{activeAdad}</span></div>
              <div><strong>عنصرِ غالب:</strong> {abjadDetails.dominantElementUrdu}</div>
              <div><strong>حاکم کوکب:</strong> {abjadDetails.governingPlanetUrdu}</div>
              <div><strong>موافق ساعت:</strong> {abjadDetails.favorableSaat}</div>
              <div><strong>موکل علوی:</strong> {abjadDetails.ulwiMuwakkil}</div>
              <div><strong>عون سفلی:</strong> {abjadDetails.sifliAwan}</div>
            </div>
          </div>

          {/* MAIN NAQSH VISUAL CANVAS & TALISMANIC SHIELD */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column (2 cols): Rendered Sacred Magic Square / Talisman */}
            <div className="lg:col-span-2 rounded-2xl border-2 border-[#d4a373] bg-[#ffffff] p-6 shadow-md relative">
              
              {/* Meditative Inking Control Toolbar */}
              <div className="mb-4 pb-3 border-b border-[#e7d8c9] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-[#faedcd] text-[#bc6c25]">
                    <Feather className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#5d4037]">کتابتِ نقش و روانیِ انوار (Meditative Drawing)</h4>
                    <p className="text-[11px] text-[#8d6e63]">ترتیبِ خانہ و چال کے مطابق تدریجی انکشاف</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Order Mode Toggle */}
                  <div className="flex items-center p-0.5 bg-[#f9f4e8] rounded-lg border border-[#d4a373] text-[11px]">
                    <button
                      type="button"
                      onClick={() => setAnimationOrder('chal')}
                      className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                        animationOrder === 'chal'
                          ? 'bg-[#bc6c25] text-white shadow-xs'
                          : 'text-[#5d4037] hover:bg-[#faedcd]'
                      }`}
                    >
                      ترتیبِ چال (خانہ وار)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAnimationOrder('matrix')}
                      className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                        animationOrder === 'matrix'
                          ? 'bg-[#bc6c25] text-white shadow-xs'
                          : 'text-[#5d4037] hover:bg-[#faedcd]'
                      }`}
                    >
                      سطر بسطر
                    </button>
                  </div>

                  {/* Speed Mode Toggle */}
                  <div className="flex items-center p-0.5 bg-[#f9f4e8] rounded-lg border border-[#d4a373] text-[11px]">
                    {[
                      { id: 'meditative', label: 'پرسکون' },
                      { id: 'normal', label: 'معتدل' },
                      { id: 'fast', label: 'تیز' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setAnimationSpeed(s.id as 'meditative' | 'normal' | 'fast')}
                        className={`px-2 py-1 rounded-md font-bold transition-all cursor-pointer ${
                          animationSpeed === s.id
                            ? 'bg-[#bc6c25] text-white shadow-xs'
                            : 'text-[#5d4037] hover:bg-[#faedcd]'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  {/* Toggle House Numbers */}
                  <button
                    type="button"
                    onClick={() => setShowHouseNumbers(!showHouseNumbers)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-colors cursor-pointer ${
                      showHouseNumbers
                        ? 'bg-[#faedcd] border-[#bc6c25] text-[#5d4037]'
                        : 'bg-[#fdfaf1] border-[#d4a373] text-[#8d6e63]'
                    }`}
                  >
                    نمبرِ خانہ: {showHouseNumbers ? 'روشن' : 'مخفی'}
                  </button>

                  {/* Replay Inking Button */}
                  <button
                    type="button"
                    onClick={replayAnimation}
                    disabled={isDrawing}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#283618] hover:bg-[#384628] disabled:opacity-50 text-white text-[11px] font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <RotateCcw className={`h-3.5 w-3.5 ${isDrawing ? 'animate-spin' : ''}`} />
                    <span>دوبارہ کتابت</span>
                  </button>
                </div>
              </div>

              {/* Talismanic Parchment Container */}
              <div className={`p-6 rounded-2xl border-4 border-double ${naqshMode === 'talismi_malayika' ? 'border-[#b08968] bg-[#fbf7ee] shadow-xl' : 'border-[#d4a373] bg-[#ffffff]'}`}>
                
                {/* Top Border Azimat for Talismanic Mode */}
                {naqshMode === 'talismi_malayika' && (
                  <div className="text-center font-amiri text-sm font-bold text-[#854d0e] mb-3 border-b border-[#e7d8c9] pb-2">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • وَإِن يَكَادُ الَّذِينَ كَفَرُوا لَيُزْلِقُونَكَ بِأَبْصَارِهِمْ
                  </div>
                )}

                {/* Top Angels Seals */}
                <div className="flex items-center justify-between text-sm sm:text-base font-bold text-[#bc6c25] py-2 border-y border-[#e7d8c9] font-amiri">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-[#bc6c25]" />
                    <span>یا جبرائیل علیہ السلام</span>
                  </span>
                  <span className="text-xs text-[#8d6e63] font-bold">
                    موکل علوی: {abjadDetails.ulwiMuwakkil}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>یا میکائیل علیہ السلام</span>
                    <Sparkles className="h-4 w-4 text-[#bc6c25]" />
                  </span>
                </div>

                {/* Center Sacred Grid with Sequential Meditative Entry Animations */}
                <div className="my-8 flex justify-center items-center">
                  <div className="inline-block p-4 rounded-2xl bg-[#fdfaf1] border-2 border-[#d4a373] shadow-md">
                    <div
                      className="grid gap-2 text-center"
                      style={{
                        gridTemplateColumns: `repeat(${naqshResult.dimension}, minmax(0, 1fr))`,
                      }}
                    >
                      {naqshResult.grid.map((row, rIdx) =>
                        row.map((cellVal, cIdx) => {
                          const houseNum = getHouseNumber(rIdx, cIdx, naqshType, chal);
                          const sequenceIndex =
                            animationOrder === 'chal'
                              ? houseNum - 1
                              : rIdx * naqshResult.dimension + cIdx;
                          const stepDelay =
                            animationSpeed === 'meditative'
                              ? 0.16
                              : animationSpeed === 'normal'
                              ? 0.08
                              : 0.03;
                          const cellDelay = Math.max(0, sequenceIndex * stepDelay);
                          const displayVal = renderCellValue(cellVal, rIdx, cIdx);

                          return (
                            <motion.div
                              key={`${animationKey}-${rIdx}-${cIdx}`}
                              initial={{
                                opacity: 0,
                                scale: 0.76,
                                filter: 'blur(4px)',
                                y: 8,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                filter: 'blur(0px)',
                                y: 0,
                              }}
                              transition={{
                                duration: 0.48,
                                ease: [0.22, 1, 0.36, 1],
                                delay: cellDelay,
                              }}
                              className={`group relative flex items-center justify-center rounded-xl border-2 border-[#d4a373] bg-[#ffffff] p-2 shadow-xs transition-all hover:scale-105 hover:border-[#bc6c25] hover:shadow-md cursor-default select-none ${
                                naqshResult.dimension <= 3
                                  ? 'h-16 w-16 sm:h-20 sm:w-20'
                                  : naqshResult.dimension <= 5
                                  ? 'h-12 w-12 sm:h-16 sm:w-16'
                                  : 'h-10 w-10 sm:h-12 sm:w-12'
                              }`}
                            >
                              {/* House Number Badge */}
                              {showHouseNumbers && (
                                <span className="absolute top-1 right-1 text-[9px] font-sans font-bold text-[#a89078] group-hover:text-[#bc6c25] transition-colors leading-none">
                                  #{houseNum}
                                </span>
                              )}

                              {/* Animated Sacred Value */}
                              <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.3,
                                  ease: 'easeOut',
                                  delay: cellDelay + 0.06,
                                }}
                                className={`font-amiri font-bold text-[#5d4037] group-hover:text-[#bc6c25] transition-colors ${
                                  naqshResult.dimension <= 3
                                    ? 'text-xl sm:text-2xl'
                                    : naqshResult.dimension <= 5
                                    ? 'text-base sm:text-lg'
                                    : 'text-xs sm:text-sm'
                                }`}
                              >
                                {displayVal}
                              </motion.span>
                            </motion.div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>

                {/* Lower Corner Angelic Seals */}
                <div className="flex items-center justify-between text-sm sm:text-base font-bold text-[#bc6c25] pt-3 border-t border-[#e7d8c9] font-amiri">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-[#bc6c25]" />
                    <span>یا اسرافیل علیہ السلام</span>
                  </span>
                  <span className="text-xs text-[#8d6e63] font-bold">
                    عون سفلی: {abjadDetails.sifliAwan}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>یا عزرائیل علیہ السلام</span>
                    <Sparkles className="h-4 w-4 text-[#bc6c25]" />
                  </span>
                </div>

                {/* Bottom Border Azimat for Talismanic Mode */}
                {naqshMode === 'talismi_malayika' && (
                  <div className="text-center font-amiri text-sm font-bold text-[#854d0e] mt-3 border-t border-[#e7d8c9] pt-2">
                    فَاللَّهُ خَيْرٌ حَافِظًا وَهُوَ أَرْحَمُ الرَّاحِمِينَ • نَصْرٌ مِّنَ اللَّهِ وَفَتْحٌ قَرِيبٌ
                  </div>
                )}
              </div>

              {/* Row & Column Verification Sums */}
              <div className="mt-6 p-4 rounded-xl bg-[#dce4c9] border border-[#606c38]">
                <div className="flex items-center justify-between text-xs text-[#283618] mb-2">
                  <span className="flex items-center gap-1 font-bold">
                    <Shield className="h-4 w-4" /> میزان و صحتِ نقش (Mathematical Harmony):
                  </span>
                  <span className="rounded-lg bg-[#283618] text-white px-2.5 py-0.5 font-bold shadow-xs">
                    مجموعہ = {activeAdad}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] text-[#283618] font-medium">
                  <span>مجموعہ سطور: {naqshResult.rowSums.slice(0, 4).join(' | ')}</span>
                  <span>•</span>
                  <span>مجموعہ ستون: {naqshResult.colSums.slice(0, 4).join(' | ')}</span>
                </div>
              </div>
            </div>

            {/* Right Column (1 col): Kash Al-Barny Calculations & Quick Method */}
            <div className="space-y-6">
              {/* Rules and Kasr Details */}
              <div className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-5 shadow-sm space-y-3">
                <h3 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
                  <Info className="h-4 w-4 text-[#bc6c25]" />
                  <span>قاعدہ و حسابی تخریج (کاش البرنی)</span>
                </h3>

                <div className="space-y-2 text-xs text-[#2c1e14]">
                  {naqshResult.chalOrderExplanation.map((exp, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#fdfaf1] border border-[#e7d8c9] font-medium leading-relaxed">
                      {exp}
                    </div>
                  ))}
                </div>
              </div>

              {/* Writing Ritual & Instructions */}
              <div className="rounded-2xl border-2 border-[#d4a373] bg-[#f9f4e8] p-5 shadow-md space-y-3">
                <h4 className="font-amiri text-base font-bold text-[#5d4037] flex items-center gap-2">
                  <Award className="h-4 w-4 text-[#bc6c25]" />
                  <span>طریقہ کتابت و عمل (قوانین طلسم)</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#5d4037] list-disc list-inside leading-relaxed font-medium">
                  <li>نقش لکھنے سے قبل باوضو ہو کر جائے نماز پر قبلہ رخ تشریف رکھیں۔</li>
                  <li>اعمالِ محبت کے لیے بادی یا آبی چال اور عرقِ گلاب و زعفران استعمال کریں۔</li>
                  <li>اعمالِ زبان بندی کے لیے خاکی چال اور وزنی پتھر تلے دفن کرنا لازم ہے۔</li>
                  <li>اعمالِ عداوت و دفاع صرف ظالم و فتنہ پرداز کے خلاف جائز ہیں؛ ناحق کرنے پر رجعت ہوگی۔</li>
                </ul>
                <div className="pt-2 border-t border-[#d4a373]">
                  <button
                    onClick={() => setActiveMainTab('usage_manual')}
                    className="w-full text-center py-2 px-3 rounded-lg bg-[#faedcd] hover:bg-[#bc6c25] hover:text-white text-[#5d4037] text-xs font-bold transition-colors cursor-pointer"
                  >
                    تمام مقاصد کی تفصیلی کتابِ ہدایات کھولیں →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CHAL ORDER & WRITING STEPS SIMULATION */}
      {activeMainTab === 'chal_guide' && (
        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-[#d4a373] bg-[#ffffff] p-6 shadow-sm space-y-5">
            <div>
              <h3 className="font-amiri text-2xl font-bold text-[#5d4037]">
                جدولِ چال اور پر کرنے کی مرحلہ وار ترتیب (Step-by-Step Filling Table)
              </h3>
              <p className="text-xs text-[#8d6e63] font-medium mt-1">
                کاش البرنی کی مستند کتب کے مطابق نقش پر کرنے کی مخصوص چال، خانے کا نمبر، اس میں لکھا جانے والا عدد، اور کسر کا مقام۔
              </p>
            </div>

            {/* Chal Info Banner */}
            <div className="p-4 rounded-xl bg-[#faedcd] border border-[#d4a373] text-xs text-[#5d4037] leading-relaxed">
              <strong>قانونِ چال:</strong> نقش کو ہمیشہ خانہ نمبر ۱ سے شروع کر کے ترتیب وار آخری خانے تک پر کیا جاتا ہے۔ جہاں کسر واقع ہو، وہاں مقررہ خانے میں ایک عدد کا اضافہ کر دیا جاتا ہے تاکہ چاروں طرف کا میزان برابر رہے۔
            </div>

            {/* Table of Steps */}
            <div className="overflow-x-auto rounded-xl border border-[#e7d8c9]">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#f2e8cf] text-[#5d4037] font-bold border-b border-[#d4a373]">
                  <tr>
                    <th className="p-3">مرحلہ (Step)</th>
                    <th className="p-3">خانہ نمبر (House)</th>
                    <th className="p-3">درج ہونے والا عدد (Value)</th>
                    <th className="p-3">حرفی بدل (Abjad Letter)</th>
                    <th className="p-3">حالتِ کسر (Kasr Adjustment)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7d8c9] text-[#2c1e14]">
                  {Array.from({ length: naqshResult.dimension * naqshResult.dimension }).map((_, idx) => {
                    const house = idx + 1;
                    let val = naqshResult.quotient + idx;
                    let hasKasrBump = false;

                    if (naqshType === 'musallas') {
                      if (naqshResult.kasr === 1 && house >= 7) {
                        val += 1;
                        hasKasrBump = true;
                      } else if (naqshResult.kasr === 2 && house >= 4) {
                        val += 1;
                        hasKasrBump = true;
                      }
                    } else if (naqshType === 'murabba') {
                      if (naqshResult.kasr === 1 && house >= 13) {
                        val += 1;
                        hasKasrBump = true;
                      } else if (naqshResult.kasr === 2 && house >= 9) {
                        val += 1;
                        hasKasrBump = true;
                      } else if (naqshResult.kasr === 3 && house >= 5) {
                        val += 1;
                        hasKasrBump = true;
                      }
                    }

                    return (
                      <tr key={idx} className={hasKasrBump ? 'bg-[#fef9c3]' : 'hover:bg-[#fdfaf1]'}>
                        <td className="p-3 font-bold text-[#bc6c25]">قدم {idx + 1}</td>
                        <td className="p-3 font-bold">خانہ #{house}</td>
                        <td className="p-3 font-amiri font-bold text-sm text-[#5d4037]">{val}</td>
                        <td className="p-3 font-amiri font-bold text-sm text-[#bc6c25]">{numberToAbjadLetters(val)}</td>
                        <td className="p-3 text-[11px]">
                          {hasKasrBump ? (
                            <span className="px-2 py-0.5 rounded bg-[#fde047] text-[#854d0e] font-bold">
                              +1 اضافہ برائے تلافیِ کسر
                            </span>
                          ) : (
                            <span className="text-[#8d6e63]">معمول کی چال</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: USAGE MANUAL FOR ALL PURPOSES */}
      {activeMainTab === 'usage_manual' && (
        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-[#d4a373] bg-[#ffffff] p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-amiri text-2xl font-bold text-[#5d4037]">
                جامع کتابِ قواعدِ استعمال برائے جملہ مقاصد و عملیات
              </h3>
              <p className="text-xs text-[#8d6e63] font-medium mt-1">
                محبت، شفاء، عداوت، زبان بندی، رزق اور حفاظت کے لیے نقوش کے استعمال کے ۵ بنیادی طریقے (پینا، پہننا، دفن کرنا، لٹکانا، جلانا)۔
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. محبت و الفت */}
              <div className="p-5 rounded-2xl border-2 border-[#d4a373] bg-[#fdfaf1] space-y-3">
                <div className="flex items-center gap-2 text-[#bc6c25]">
                  <Heart className="h-5 w-5 fill-[#bc6c25]" />
                  <h4 className="font-amiri text-lg font-bold">۱. اعمالِ محبت، الفت و تسخیرِ قلوب</h4>
                </div>
                <p className="text-xs text-[#5d4037] leading-relaxed">
                  میاں بیوی کی ناچاقی ختم کرنے، گھریلو امن، اور مطلوب کے دل میں محبت پیدا کرنے کے لیے۔
                </p>
                <div className="space-y-1.5 text-xs text-[#2c1e14] bg-white p-3 rounded-xl border border-[#e7d8c9]">
                  <div><strong>موافق چال:</strong> بادی (ہوا) یا آبی (پانی)</div>
                  <div><strong>روشنائی:</strong> زعفران، عرقِ گلاب اور مشک</div>
                  <div><strong>بخور:</strong> صندل سفید، عود، لوبان</div>
                  <div><strong>ساعت:</strong> جمعہ بوقتِ طلوعِ آفتاب (ساعتِ زہرہ)</div>
                  <div><strong>طریقہ استعمال:</strong> نقش کو ہوا میں کسی اونچے درخت پر لٹکائیں تاکہ ہوا کی جنبش سے مطلوب بے قرار ہو، یا شربت میں گھول کر پلائیں۔</div>
                </div>
              </div>

              {/* 2. شفاء الامراض */}
              <div className="p-5 rounded-2xl border-2 border-[#7dd3fc] bg-[#f0f9ff] space-y-3">
                <div className="flex items-center gap-2 text-[#0369a1]">
                  <Sparkles className="h-5 w-5" />
                  <h4 className="font-amiri text-lg font-bold">۲. اعمالِ شفائے امراض و دفعِ سحر و نظر</h4>
                </div>
                <p className="text-xs text-[#0369a1] leading-relaxed">
                  جسمانی بیماریوں، پرانے بخار، نظرِ بد اور سحری اثرات کو جڑ سے ختم کرنے کے لیے۔
                </p>
                <div className="space-y-1.5 text-xs text-[#0c4a6e] bg-white p-3 rounded-xl border border-[#bae6fd]">
                  <div><strong>موافق چال:</strong> آبی چال (مغرب و قمر)</div>
                  <div><strong>روشنائی:</strong> زعفران اور آبِ زمزم</div>
                  <div><strong>بخور:</strong> لوبان اور مصطگی رومی</div>
                  <div><strong>ساعت:</strong> پیر یا جمعرات بوقتِ فجر</div>
                  <div><strong>طریقہ استعمال:</strong> سفید چینی کی پلیٹ پر لکھ کر نہار منہ ۲۱ دن تک پینا، اور ایک نقش موم جامہ کر کے گلے میں پہننا۔</div>
                </div>
              </div>

              {/* 3. عداوت و ہلاکتِ ظالم */}
              <div className="p-5 rounded-2xl border-2 border-[#fca5a5] bg-[#fff1f2] space-y-3">
                <div className="flex items-center gap-2 text-[#991b1b]">
                  <Flame className="h-5 w-5" />
                  <h4 className="font-amiri text-lg font-bold">۳. اعمالِ عداوت، تفریقِ باطل و دفعِ ظالم</h4>
                </div>
                <p className="text-xs text-[#991b1b] leading-relaxed">
                  شرپسندوں کی محفلوں کو توڑنے، ظالم کے فتنوں کو کچلنے اور ناجائز قابضین کو دفع کرنے کے لیے۔
                </p>
                <div className="space-y-1.5 text-xs text-[#7f1d1d] bg-white p-3 rounded-xl border border-[#fecdd3]">
                  <div><strong>موافق چال:</strong> آتشی (آگ) یا خاکی (مٹی)</div>
                  <div><strong>روشنائی:</strong> سیاہ روشنائی، نیل یا زنگار</div>
                  <div><strong>بخور:</strong> حرمل، رائی، گوگل اور صمغ حنظل</div>
                  <div><strong>ساعت:</strong> منگل بوقتِ زوال (ساعتِ مریخ) یا ہفتہ بعد از عصر</div>
                  <div><strong>طریقہ استعمال:</strong> سرخ انگاروں پر جلا دیں یا پرانے ویران کھنڈر کی مٹی میں وزنی پتھر کے نیچے دفن کریں۔ (صرف جائز و شرعی حق کے لیے)۔</div>
                </div>
              </div>

              {/* 4. زبان بندی و عقد اللسان */}
              <div className="p-5 rounded-2xl border-2 border-[#606c38] bg-[#f4f6ed] space-y-3">
                <div className="flex items-center gap-2 text-[#283618]">
                  <Lock className="h-5 w-5" />
                  <h4 className="font-amiri text-lg font-bold">۴. اعمالِ زبان بندی و عقد اللسان</h4>
                </div>
                <p className="text-xs text-[#283618] leading-relaxed">
                  مخالفین، حاسدین اور جھوٹے گواہوں کی بدگوئی اور غیبت کو ہمیشہ کے لیے تالا لگانے کے لیے۔
                </p>
                <div className="space-y-1.5 text-xs text-[#283618] bg-white p-3 rounded-xl border border-[#dce4c9]">
                  <div><strong>موافق چال:</strong> خاکی چال (جنوب و زمین)</div>
                  <div><strong>روشنائی:</strong> سرمہ یا سیاہ روشنائی</div>
                  <div><strong>بخور:</strong> رائی اور صندل سیاہ</div>
                  <div><strong>ساعت:</strong> بدھ یا ہفتہ بوقتِ غروب</div>
                  <div><strong>طریقہ استعمال:</strong> نقش کو تانبے کے پترے یا موٹے کاغذ پر لکھ کر وزنی کالے پتھر کے نیچے دبانا یا ندی کے کنارے سرد مٹی میں دفن کرنا۔</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PRESETS LIBRARY */}
      {activeMainTab === 'presets_library' && (
        <div className="rounded-2xl border-2 border-[#d4a373] bg-[#f9f4e8] p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#e7d8c9]">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#bc6c25]" />
              <h3 className="font-amiri text-lg font-bold text-[#5d4037]">
                فہرستِ مستند نقوش بلحاظِ زمرہ جات (Category Presets)
              </h3>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#ffffff] rounded-xl border border-[#e7d8c9] shadow-inner">
              {[
                { id: 'all', label: 'تمام زمرہ جات' },
                { id: 'mahabbat', label: 'محبت و الفت' },
                { id: 'shifa', label: 'شفاء الامراض' },
                { id: 'adawat', label: 'عداوت و دفاع' },
                { id: 'zaban_bandi', label: 'زبان بندی' },
                { id: 'rizq_barakat', label: 'رزق و برکت' },
                { id: 'hifazat_hisar', label: 'حفاظت و حصار' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryFilter(cat.id as NaqshCategory | 'all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategoryFilter === cat.id
                      ? 'bg-[#bc6c25] text-white shadow-xs'
                      : 'text-[#5d4037] hover:bg-[#faedcd]'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Presets Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {filteredPresets.map((preset) => {
              const badge = getCategoryBadge(preset.category);
              return (
                <div
                  key={preset.id}
                  className="p-4 rounded-xl border border-[#e7d8c9] bg-[#ffffff] shadow-xs flex flex-col justify-between hover:border-[#bc6c25] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${badge.color}`}>
                        {badge.icon}
                        {badge.label}
                      </span>
                      <span className="text-xs font-bold text-[#8d6e63]">عدد: {preset.adad}</span>
                    </div>

                    <h4 className="font-amiri text-base font-bold text-[#5d4037] mb-1">
                      {preset.title}
                    </h4>
                    <p className="text-xs text-[#8d6e63] font-medium leading-relaxed mb-3">
                      {preset.description}
                    </p>

                    <div className="text-[11px] text-[#5d4037] space-y-1 bg-[#fdfaf1] p-2.5 rounded-lg border border-[#e7d8c9] mb-3">
                      <div><strong>ساعت:</strong> {preset.saat}</div>
                      <div><strong>بخور:</strong> {preset.incense}</div>
                      <div><strong>طریقہ:</strong> {preset.method}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => loadPreset(preset)}
                    className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-[#faedcd] hover:bg-[#bc6c25] hover:text-white text-[#5d4037] px-3 py-2 text-xs font-bold border border-[#d4a373] transition-all cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>یہ نقش جنریٹر میں لوڈ کریں</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: SAVED NAQOOSH LIBRARY */}
      {activeMainTab === 'saved_library' && (
        <div className="rounded-2xl border-2 border-[#d4a373] bg-[#ffffff] p-6 shadow-md space-y-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#e7d8c9]">
            <div className="flex items-center gap-2">
              <BookmarkCheck className="h-5 w-5 text-[#bc6c25]" />
              <div>
                <h3 className="font-amiri text-xl font-bold text-[#5d4037]">
                  ذخیرۂ نقوشِ محفوظہ (Saved Naqoosh Library)
                </h3>
                <p className="text-xs text-[#8d6e63] font-medium">
                  آپ کے محفوظ کردہ تمام نقوش بلحاظِ زمرہ جات۔
                </p>
              </div>
            </div>

            {/* Library Search & Filter */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-60">
                <input
                  type="text"
                  value={savedSearchQuery}
                  onChange={(e) => setSavedSearchQuery(e.target.value)}
                  placeholder="محفوظ نقوش میں تلاش..."
                  className="w-full rounded-xl border border-[#d4a373] bg-[#fdfaf1] px-3 py-1.5 text-xs text-[#2c1e14] placeholder-[#a89078] focus:border-[#bc6c25] focus:outline-none"
                />
                <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-[#8d6e63]" />
              </div>

              {/* Category Filter for Library */}
              <div className="flex items-center gap-1 p-1 bg-[#f9f4e8] rounded-xl border border-[#d4a373]">
                {[
                  { id: 'all', label: 'تمام' },
                  { id: 'mahabbat', label: 'محبت' },
                  { id: 'shifa', label: 'شفاء' },
                  { id: 'adawat', label: 'عداوت' },
                  { id: 'zaban_bandi', label: 'زبان بندی' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSavedCategoryFilter(c.id as NaqshCategory | 'all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      savedCategoryFilter === c.id
                        ? 'bg-[#bc6c25] text-white shadow-xs'
                        : 'text-[#5d4037] hover:bg-[#faedcd]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Saved Cards Grid */}
          {filteredSavedItems.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-[#e7d8c9] rounded-2xl p-6 bg-[#fdfaf1]">
              <Bookmark className="h-8 w-8 text-[#a89078] mx-auto mb-2" />
              <p className="text-sm font-bold text-[#5d4037]">اس زمرے میں کوئی محفوظ نقش موجود نہیں۔</p>
              <p className="text-xs text-[#8d6e63] mt-1">
                اوپر دیے گئے بٹن "نقش محفوظ کریں" پر کلک کر کے اپنا نیا نقش اس زمرے میں محفوظ فرمائیں۔
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSavedItems.map((item) => {
                const badge = getCategoryBadge(item.category);
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border-2 border-[#d4a373] bg-[#fdfaf1] p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${badge.color}`}>
                          {badge.icon}
                          {badge.label}
                        </span>
                        <span className="text-[11px] text-[#8d6e63] font-medium">{item.createdAt}</span>
                      </div>

                      <h4 className="font-amiri text-lg font-bold text-[#5d4037] mb-1">
                        {item.title}
                      </h4>

                      {item.inputText && (
                        <p className="text-xs font-amiri font-bold text-[#bc6c25] mb-2">
                          عبارت: "{item.inputText}"
                        </p>
                      )}

                      <div className="grid grid-cols-3 gap-1 text-[11px] text-[#5d4037] bg-[#ffffff] p-2 rounded-lg border border-[#e7d8c9] mb-3">
                        <div><strong>عدد:</strong> {item.adad}</div>
                        <div><strong>قسم:</strong> {item.typeNameUrdu}</div>
                        <div><strong>چال:</strong> {item.chalNameUrdu}</div>
                      </div>

                      {/* Mini Grid Preview */}
                      <div className="my-2 p-2 bg-[#ffffff] rounded-lg border border-[#e7d8c9] overflow-x-auto">
                        <div
                          className="grid gap-1 text-center"
                          style={{
                            gridTemplateColumns: `repeat(${item.dimension}, minmax(0, 1fr))`,
                          }}
                        >
                          {item.grid.map((row, rI) =>
                            row.map((val, cI) => (
                              <div
                                key={`${rI}-${cI}`}
                                className="h-7 flex items-center justify-center bg-[#fdfaf1] border border-[#d4a373] rounded text-xs font-bold text-[#5d4037] font-amiri"
                              >
                                {val}
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {item.notes && (
                        <p className="text-xs text-[#8d6e63] italic mt-2 line-clamp-2">
                          نوٹ: {item.notes}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-[#e7d8c9]">
                      <button
                        onClick={() => loadSavedNaqsh(item)}
                        className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-[#bc6c25] hover:bg-[#a65d1e] text-white px-3 py-1.5 text-xs font-bold shadow-xs cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>جنریٹر میں کھولیں</span>
                      </button>

                      <button
                        onClick={() => handleDeleteSaved(item.id)}
                        className="p-1.5 rounded-lg border border-[#fae1dd] bg-[#ffffff] text-[#9d0208] hover:bg-[#fae1dd] cursor-pointer"
                        title="حذف کریں"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SAVE NAQSH MODAL */}
      {saveModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="rounded-2xl border-2 border-[#d4a373] bg-[#ffffff] p-6 max-w-lg w-full shadow-2xl space-y-4 text-right">
            <div className="flex items-center justify-between pb-3 border-b border-[#e7d8c9]">
              <h3 className="font-amiri text-xl font-bold text-[#5d4037] flex items-center gap-2">
                <BookmarkCheck className="h-5 w-5 text-[#bc6c25]" />
                <span>نقش محفوظ کریں (Save Naqsh)</span>
              </h3>
              <button
                onClick={() => setSaveModalOpen(false)}
                className="text-[#8d6e63] hover:text-[#2c1e14] font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNaqsh} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#5d4037] mb-1">
                  زمرہ منتخب فرمائیں (Category):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'mahabbat', label: 'محبت و الفت', icon: <Heart className="h-3.5 w-3.5" /> },
                    { id: 'shifa', label: 'شفاء الامراض', icon: <Sparkles className="h-3.5 w-3.5" /> },
                    { id: 'adawat', label: 'عداوت و دفاع', icon: <Flame className="h-3.5 w-3.5" /> },
                    { id: 'zaban_bandi', label: 'زبان بندی', icon: <Lock className="h-3.5 w-3.5" /> },
                    { id: 'rizq_barakat', label: 'رزق و برکت', icon: <Award className="h-3.5 w-3.5" /> },
                    { id: 'hifazat_hisar', label: 'حفاظت و حصار', icon: <Shield className="h-3.5 w-3.5" /> },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setActiveCategoryTag(cat.id as NaqshCategory)}
                      className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${
                        activeCategoryTag === cat.id
                          ? 'border-[#bc6c25] bg-[#faedcd] text-[#5d4037] shadow-xs'
                          : 'border-[#e7d8c9] bg-[#ffffff] text-[#8d6e63] hover:bg-[#fdfaf1]'
                      }`}
                    >
                      {cat.icon}
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5d4037] mb-1">
                  عنوان / مقصدِ نقش:
                </label>
                <input
                  type="text"
                  required
                  value={saveTitle}
                  onChange={(e) => setSaveTitle(e.target.value)}
                  placeholder="مثلاً: لوحِ محبت برائے فلاں بن فلاں..."
                  className="w-full rounded-xl border-2 border-[#d4a373] bg-[#ffffff] px-3.5 py-2 text-sm text-[#2c1e14] placeholder-[#a89078] focus:border-[#bc6c25] focus:outline-none font-amiri font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5d4037] mb-1">
                  خصوصی نوٹس / طریقہ استعمال (اختیاری):
                </label>
                <textarea
                  rows={3}
                  value={saveNotes}
                  onChange={(e) => setSaveNotes(e.target.value)}
                  placeholder="ساعت، بخور، سیاہی یا دفن/لٹکانے کی ہدایات درج کریں..."
                  className="w-full rounded-xl border-2 border-[#d4a373] bg-[#ffffff] px-3.5 py-2 text-xs text-[#2c1e14] placeholder-[#a89078] focus:border-[#bc6c25] focus:outline-none font-medium"
                />
              </div>

              <div className="p-3 bg-[#fdfaf1] rounded-xl border border-[#e7d8c9] text-xs text-[#5d4037] space-y-1 font-medium">
                <div><strong>کل عدد:</strong> {activeAdad}</div>
                <div><strong>قسمِ نقش:</strong> {naqshType}</div>
                <div><strong>عنصری چال:</strong> {chal}</div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e7d8c9]">
                <button
                  type="button"
                  onClick={() => setSaveModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#d4a373] bg-[#fdfaf1] text-xs font-bold text-[#5d4037] hover:bg-[#faedcd] cursor-pointer"
                >
                  منسوخ کریں
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#bc6c25] hover:bg-[#a65d1e] text-xs font-bold text-white shadow-sm cursor-pointer"
                >
                  محفوظ کریں
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
