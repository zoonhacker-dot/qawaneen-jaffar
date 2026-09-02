import React, { useState } from 'react';
import { 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Compass, 
  Moon, 
  Sun, 
  Copy, 
  Check, 
  Layers, 
  Zap, 
  Heart, 
  Shield, 
  DollarSign, 
  Eye, 
  Feather, 
  Send,
  HelpCircle,
  FileText,
  Volume2,
  RotateCcw,
  Languages,
  Award,
  Filter,
  Search,
  CheckSquare
} from 'lucide-react';

export interface TantraMantraItem {
  id: string;
  category: 'jinn_churail' | 'shabar_mantras' | 'talismi_tantra' | 'yantra_jantra' | 'mohabbat_taskheer' | 'rizq_dolat' | 'shifa_hifazat';
  title: string;
  type: 'تنتر (طلسماتی ترکیب و عمل)' | 'جنتر (لوح و نقشِ ہندسی)' | 'منتر (ہندی و سنسکرت کلمات مع ترجمہ)';
  element: 'آتشی' | 'بادی' | 'آبی' | 'خاکی';
  effectSpeed: 'فوری (۱ تا ۳ گھنٹے/یوم)' | 'سریع (۳ تا ۷ یوم)' | 'طے شدہ مدت (۱۱ تا ۲۱ یوم)';
  origin: 'ہند و پاک روایات' | 'قدیم سلیمانی و عبرانی' | 'شابر ناتھ روایات' | 'عرب و عجم طلسمات';
  purpose: string;
  hindiScript: string;
  urduTransliteration: string;
  urduMeaning: string; // اردو ترجمہ و لغوی مفہوم
  requirements: string[]; // لوازمات، بخورات و بھوگ
  saatTime: string; // وقت، ساعات و جہات
  direction: string; // سمت
  targetJinnType: string; // متعلقہ جن، چڑیل، آسیب یا موکل
  method: string[]; // عمل کرنے کا مکمل طریقہ
  naqshPlacementPlace: string; // نقش کہاں اور کس طرح استعمال میں لانا ہے (دفن، جلانا، لٹکانا، پلانا)
  distantTargetRule: string; // دور کے مطلوب یا مریض پر عمل کا طریقہ
  naqshType: string;
  naqshMatrix: (number | string)[][];
  targetRepetitions: number;
  warnings: string[];
}

export const TantraJantraMantraStudio: React.FC<{
  onSendToNaqsh?: (text: string, adad: number) => void;
}> = ({ onSendToNaqsh }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<TantraMantraItem | null>(null);
  const [detailedModalItem, setDetailedModalItem] = useState<TantraMantraItem | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'japa_counter' | 'placement_guide' | 'jinn_guide' | 'hisar_rules'>('catalog');

  // Interactive Live Japa Counter State
  const [japaCount, setJapaCount] = useState<number>(0);
  const [japaTarget, setJapaTarget] = useState<number>(108);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const items: TantraMantraItem[] = [
    {
      id: 'tjm-jinn-1',
      category: 'jinn_churail',
      title: 'شابر منترِ شاہِ پریان و تسخیرِ جنات و چڑیل (حاضری و احضارِ فوری)',
      type: 'منتر (ہندی و سنسکرت کلمات مع ترجمہ)',
      element: 'آتشی',
      effectSpeed: 'فوری (۱ تا ۳ گھنٹے/یوم)',
      origin: 'ہند و پاک روایات',
      purpose: 'سرکش جنات، چڑیل اور خبیث ارواح کو تابع و مسخر کرنا یا ان کی فوری حاضری لینا برائے کشفِ احوال۔',
      hindiScript: 'ॐ नमो आदेश गुरु को। काली घाटे काली मां, जहां बैठे जिन्नात का पहरा। आन पड़े तो जिन्न चले, चड़ैल भागे, भूत थरथराए। आदेश आदेश आदेश।',
      urduTransliteration: 'اوٴم نمو آدیش گرو کو! کالی گھاٹ کالی ماں، جہاں بیٹھے جنات کا پہرہ۔ آن پڑے تو جن چلے، چڑیل بھاگے، بھوت تھرتھرائے۔ آدیش، آدیش، آدیش!',
      urduMeaning: '«استاد کے حکم سے ابتدا کرتا ہوں! اس پرشکوہ روحانی مقام کی قسم جہاں ناری و طلسماتی ارواح کا پہرہ ہے۔ جب میرا روحانی حکم صادر ہو تو جن سرنگوں ہو کر حاضر ہو، خبیث چڑیل خوف سے فرار ہو اور بد روحیں تھرتھرا کر ماتحت ہو جائیں۔ یہ میرا اور مرشد کا اٹل حکم ہے!»',
      targetJinnType: 'سرکش جنات، چڑیل، خبیث آسیب و موکلاتِ سفلی',
      requirements: [
        'کالا تل، حرمل (اسپند) اور لوبان کا مشترکہ بخور',
        'مٹی کا نیا چراغ مع سرسوں کا تیل',
        'لال کپڑے کا لباس اور مصلے کا انتظام',
        'نذر و نیاز: ۳ عدد لونگ اور گڑ کی میٹھی روٹی'
      ],
      saatTime: 'رات کے آخری پہر (ساعتِ زحل یا مریخ)، قمری مہینے کی چودہویں یا اندھیری راتوں میں۔',
      direction: 'جنوب یا مغرب کی جانب رخ کر کے بیٹھیں',
      method: [
        '۱. طہارت و حصار: پہلے غسل کر کے باوضو ہوں اور مصلے کے گرد چھری سے آیت الکرسی کا پختہ حصار کھینچیں۔',
        '۲. چراغ و بخور: سامنے سرسوں کے تیل کا مٹی کا نیا دیا روشن کریں، اس میں ۳ عدد لونگ ڈالیں اور حرمل و لوبان کا بخور دہکتے کوئلوں پر ڈالیں۔',
        '۳. باقاعدہ پڑھائی: منترِ مذکور کو ۱۰۸ مرتبہ باآوازِ بلند تلاوت کریں اور ہر ۱۰ بار کے بعد چراغ کی لو پر پھونک ماریں۔',
        '۴. حاضری کی علامات: جب ہوا میں سنسناہٹ، تیز خوشبو یا پرچھائیں نظر آئے تو خوفزدہ نہ ہوں اور نہ حصار توڑیں۔',
        '۵. قول و قرار: حاضر ہونے پر کلام کریں اور ہمیشہ خیر و جائز خدمت کے لیے عہد و پیمان لیں، پھر رخصت کریں۔'
      ],
      naqshPlacementPlace: 'نقشِ تسخیرِ جنات کو لال کپڑے میں موم جامہ کر کے گلے میں پہنیں یا متاثرہ کمرے کی مشرقی دیوار پر چراغ کے اوپر لگائیں۔ اگر آسیب کا دفع مقصود ہو تو نقش پانی میں گھول کر مریض کو پلائیں۔',
      distantTargetRule: 'اگر مطلوبہ مریض یا آسیب زدہ جگہ دوسرے شہر یا ملک میں ہو تو مریض کی پہنی ہوئی قمیض یا تصویر سامنے رکھ کر چراغ کی لو اس کی سمت موڑیں اور ۱۰۸ بار پڑھ کر تصویر پر دم کریں۔',
      naqshType: 'مثلثِ تسخیرِ جنات و چڑیل ۳×۳',
      naqshMatrix: [
        ['ط', 'س', 'م'],
        ['ج', 'ن', 'ح'],
        ['۱۱۰', '۹۲', '۷۸۶']
      ],
      targetRepetitions: 108,
      warnings: [
        'بغیر پختہ حصار کے یہ عمل ہرگز نہ کریں، ورنہ رجعت یا خوف کا غلبہ ہو سکتا ہے۔',
        'حاضری کے وقت دل میں استقامت اور خوفِ خدا رکھیں۔'
      ]
    },
    {
      id: 'tjm-jinn-2',
      category: 'jinn_churail',
      title: 'طلسمِ مسلط کردنِ جن و چڑیل بر ظالم و ردِ فتنہ (سزا و استمبھن)',
      type: 'تنتر (طلسماتی ترکیب و عمل)',
      element: 'آتشی',
      effectSpeed: 'فوری (۱ تا ۳ گھنٹے/یوم)',
      origin: 'ہند و پاک روایات',
      purpose: 'ظالم، بد دیانت اور دشمنِ جاں کو اس کے کیے کی سزا دلوانا اور جناتی و چڑیلی اثرات اس کے شر پر مسلط کر کے مظلوم کی گلو خلاصی کروانا۔',
      hindiScript: 'ॐ क्लीं क्लीं भैरवाय नमः। अमुकस्य बुद्धिं स्तम्भय स्तम्भय, भूत-प्रेत-डाकिनीं प्रेरय प्रेरय, फट् स्वाहा।',
      urduTransliteration: 'اوٴم کلِیم کلِیم بھیرَوائے نمہ! اَمُکَسیَہ (نامِ ظالم مع والدہ) بُدھِم اِستمبھئے اِستمبھئے، بھوت پریت ڈاکِنی پْریرئے پْریرئے، پھٹ سواہا!',
      urduMeaning: '«قہر و جلال کی طاقت سے! فلاں ظالم (نام مع والدہ) کی تمام شیطانی عقل و چالوں کو مفلوج و مسدود کر دے، اور اس کے اپنے سیاہ اعمال و خبیث جنات و چڑیلیں اسی کے اوپر مسلط کر دے تاکہ وہ عبرت کا نشان بنے اور مظلوم کو امن ملے۔ پھٹ سواہا (فوری حکم نافذ ہو)!»',
      targetJinnType: 'ڈاکنی، چڑیل، ناری جنات و مسلط شدہ شیاطین',
      requirements: [
        'کوئلہ، رائی، نمک اور لال مرچ کا تند بخور',
        'پرانے قبرستان یا ویرانے کی مٹی',
        'سیاہ کپڑے پر سیاہ سیاہی سے نقش',
        'لیموں جس پر دشمن کا نام مع والدہ لکھا ہو'
      ],
      saatTime: 'منگل کی شب، ساعتِ مریخ، بوقتِ نصف شب (۱۲ تا ۲ بجے)۔',
      direction: 'جنوب کی سمت رخ',
      method: [
        '۱. سیاہ کپڑے پر نقشِ مسلط لکھ کر اس کے درمیان میں لیموں پر دشمن کا نام کاٹ کر رکھیں۔',
        '۲. منترِ مذکور کو ۳۱۳ مرتبہ تند و غضبناک لہجے میں پڑھ کر لال مرچوں اور رائی پر دم کریں اور دہکتے کوئلوں پر ڈالیں۔',
        '۳. پڑھائی مکمل ہوتے ہی لیموں اور نقش کو سیاہ دھاگے سے کس کر باندھیں۔',
        '۴. اس کو دفن کرنے کے لیے مقررہ مقام پر لے جائیں اور پیچھے مڑ کر نہ دیکھیں۔',
        '۵. جب ظالم اپنے ظلم سے باز آ جائے تو نقش نکال کر دریا یا نہر کے رواں پانی میں بہا دیں۔'
      ],
      naqshPlacementPlace: 'نقش کو پرانے قبرستان کی کچی زمین میں، یا کسی بھاری وزنی سیاہ پتھر کے نیچے، یا دہکتی ہوئی گرم راکھ تلے دبائیں۔ جوں جوں نقش پر گرمی یا بوجھ پڑے گا، ظالم کی نیندیں حرام اور بد روحیں اس پر مسلط رہیں گی۔',
      distantTargetRule: 'اگر ظالم میلوں دور کسی دوسرے ملک میں ہو تو نصف شب کو اس کے شہر کے جغرافیائی رخ پر منہ کر کے کھڑے ہوں، زمین پر اس کا نام لکھیں اور نقش کو تیز مٹی کے تیل کے دیے پر رکھ کر گرم کریں۔',
      naqshType: 'مربع قہرِ مریخی برائے مسلط ۴×۴',
      naqshMatrix: [
        ['ق', 'ہ', 'ر', '۹'],
        ['ن', 'ا', 'ر', '۴'],
        ['ح', 'ر', 'ق', '۷'],
        ['د', 'ف', 'ع', '۱']
      ],
      targetRepetitions: 313,
      warnings: [
        'ناحق یا ذاتی مفاد کے لیے کرنا سخت حرام اور تباہ کن رجعت کا باعث بن سکتا ہے۔',
        'صرف ظالم اور بدترین فتنہ پرور کے سدِ باب کے لیے استعمال کی اجازت ہے۔'
      ]
    },
    {
      id: 'tjm-jinn-3',
      category: 'jinn_churail',
      title: 'صمصامِ شابر برائے فوری سوختن و بھگانا چڑیل، آسیب و خبیث جن',
      type: 'منتر (ہندی و سنسکرت کلمات مع ترجمہ)',
      element: 'آتشی',
      effectSpeed: 'فوری (۱ تا ۳ گھنٹے/یوم)',
      origin: 'شابر ناتھ روایات',
      purpose: 'گھر میں لگی ہوئی چڑیل، آسیب زدہ مریض، پرانی چمٹی ہوئی بد روحوں اور جنات کو فوری جلا کر خاکستر کرنا اور گھر پاک کرنا۔',
      hindiScript: 'ॐ नमो आदेश गुरु को। बाण चलाऊं वीर का, छूटे लोहे की कील। जहां लगे भूत-प्रेत-चड़ैल का साया, जल भस्म हो जाए गोरख का ताया। आदेश आदेश।',
      urduTransliteration: 'اوٴم نمو آدیش گرو کو! باݨ چلاوٴں وِیر کا، چھُوٹے لوہے کی کیل۔ جہاں لگے بھوت، پریت، چڑیل کا سایا، جل بھسم ہو جائے گورکھ کا تایا۔ آدیش، آدیش!',
      urduMeaning: '«مرشدِ کامل کے حکم سے روحانی تیر اور لوہے کی میخ کی مانند قاطع ہتھیار چلاتا ہوں! جہاں کہیں بھی بھوت، پریت، چڑیل یا خبیث جن کا ناپاک سایہ ہو، وہ اس نورانی و جلالی وار سے جل کر خاکستر (بھسم) ہو جائے اور مریض کو فوری نجات ملے۔»',
      targetJinnType: 'پریشان کن چڑیل، خبیث آسیب، پرانا سایہ و بد روح',
      requirements: [
        'حرمل (اسپند)، کلونجی اور صندلِ سرخ کا بخور',
        'ایک پیالہ پینے کا پاک پانی اور تھوڑا نمک',
        'لوہے کی نئی کیل یا چاقو',
        'سفید دھاگہ جس پر ۷ گرہیں لگائی جائیں'
      ],
      saatTime: 'کسی بھی وقت بوقتِ ضرورت یا بعد از نمازِ مغرب و عشاء۔',
      direction: 'مریض کے سامنے قبلہ رو ہو کر',
      method: [
        '۱. مریض کو سامنے بٹھا کر اس کے سر پر دایاں ہاتھ رکھیں اور سامنے نمک ملے پانی کا پیالہ رکھیں۔',
        '۲. منترِ مذکور کو ۴۱ بار بلند اور پر اثر آواز سے تلاوت کریں اور ہر بار مریض کے چہرے اور پانی پر پھونک ماریں۔',
        '۳. لوہے کی ۴ عدد نئی کیلوں پر ۲۱ بار دم کریں۔',
        '۴. مریض کو دم کیا ہوا پانی ۷ گھونٹ پلائیں اور باقی پانی سے چہرے پر چھینٹے ماریں۔',
        '۵. ۳ دن متواتر حرمل اور کلونجی کا دھواں گھر میں دیں۔ چڑیل و آسیب جل کر مکان چھوڑ دیں گے۔'
      ],
      naqshPlacementPlace: 'دم کی ہوئی لوہے کی کیلیں مکان کے چاروں کونوں میں یا مرکزی دروازے کی چوکھٹ کے نیچے ٹھونکیں۔ نقشِ صمصام کو پاک کاغذ پر لکھ کر مریض کے گلے میں ڈالیں اور دوسرا نقش گھر کی چھت پر لٹکائیں۔',
      distantTargetRule: 'اگر مریض دور ہو تو اس کا پہنا ہوا نا دھلا کپڑا منگوائیں، اس کپڑے پر نقش لکھ کر منتر پڑھیں اور کپڑے کو پانی میں بھگو کر پانی دور بھیج دیں یا مریض کی تصویر پر ۴۱ بار دم کر کے پھونک ماریں۔',
      naqshType: 'نقشِ صمصامِ قاطع ۳×۳ (خالی الوسط)',
      naqshMatrix: [
        [12, 1, 14],
        [13, 'حصار', 11],
        [8, 15, 10]
      ],
      targetRepetitions: 41,
      warnings: [
        'عمل کے دوران مریض چیخ و پکار کر سکتا ہے، ہرگز ڈریں نہیں بلکہ اعتماد سے دم جاری رکھیں۔'
      ]
    },
    {
      id: 'tjm-mohabbat-1',
      category: 'mohabbat_taskheer',
      title: 'موہنی منترِ تسخیرِ خلائق، مہرِ سکندری و تالیفِ قلوب (ہند و پاک)',
      type: 'منتر (ہندی و سنسکرت کلمات مع ترجمہ)',
      element: 'بادی',
      effectSpeed: 'سریع (۳ تا ۷ یوم)',
      origin: 'ہند و پاک روایات',
      purpose: 'تسخیرِ قلوب، حاکم و افسران کی مہربانی، عزت و وجاہت اور میاں بیوی میں لازوال محبت پیدا کرنا۔',
      hindiScript: 'ॐ मोहिनी महामोहिनी, अमृत की धार। जिसको देखूं वो हो जाए निसार। सब जग मोहे, राजा मोहे, परजा मोहे। आदेश आदेश।',
      urduTransliteration: 'اوٴم موہنی مہا موہنی، اَمرِت کی دھار! جِس کو دیکھوں وہ ہو جائے نثار۔ سب جگ موہے، راجہ موہے، پرجا موہے۔ آدیش، آدیش!',
      urduMeaning: '«اے جاذبیت و دلی کشش کی سرچشمہ طاقت! تجھ سے محبت و کشش کا امرت بہتا ہے۔ میں جس کی طرف بھی محبت و خیر سے نگاہ ڈالوں وہ مائل و مہربان ہو جائے۔ تمام جہان، حاکم اور عوام سب میرے لیے نرم دل اور خیر خواہ بن جائیں۔»',
      targetJinnType: 'موکلاتِ زہرہ و قمر (تالیف و الفت)',
      requirements: [
        'عنبر، مشک اور گلاب کا عطر',
        'چنبیلی اور موتیے کے تازہ پھول',
        'شیرینی (مٹھائی یا مصری) جس پر دم کیا جائے',
        'سفید ریشمی رومال'
      ],
      saatTime: 'جمعہ کی صبح بوقتِ طلوعِ آفتاب (ساعتِ زہرہ) یا چودھویں کی رات۔',
      direction: 'مشرق یا شمال کی جانب',
      method: [
        '۱. سفید لباس پہن کر خوشبو اور عطر کا معطر ماحول بنا کر باوضو قبلہ رو بیٹھیں۔',
        '۲. سامنے مٹھائی اور عطر کی کھلی شیشی رکھیں۔',
        '۳. موہنی منتر کو ۱۰۸ مرتبہ دل کی پوری توجہ اور محبت کے تصور کے ساتھ تلاوت کریں۔',
        '۴. ہر ۱۰ بار کے بعد شیرینی اور عطر پر دم کریں۔',
        '۵. عطر اپنے کپڑوں پر لگائیں اور شیرینی مطلوب کو کھلائیں، یا کسی مجلس میں جاتے ہوئے عطر لگا کر جائیں۔'
      ],
      naqshPlacementPlace: 'نقشِ موہنی کو زعفران و عرقِ گلاب سے سفید ہرن کی جھلی یا سفید کاغذ پر لکھیں۔ اسے چاندی کے تعویذ میں ڈال کر اپنے دائیں بازو پر باندھیں یا گلے میں لٹکائیں۔ دوسرا نقش کسی پھلدار درخت کی اونچی شاخ پر لٹکائیں تاکہ ہوا سے ہلے۔',
      distantTargetRule: 'دور کے مطلوب کے لیے: نقش کو ہوا دار درخت پر لٹکائیں (بادی قاعدہ)۔ جب ہوا سے نقش جھولے گا تو دور دراز بیٹھے مطلوب کے دل میں بے چینی اور کشش بیدار ہوگی۔ پڑھائی کے بعد مطلوب کے شہر کے رخ پر ۳ پھونکیں ماریں۔',
      naqshType: 'مربعِ موہنی الفت ۴×۴',
      naqshMatrix: [
        ['ودود', 'حب', 'قمر', 'زہرہ'],
        ['عشق', 'مہر', 'نور', '۱۱۰'],
        ['دل', 'جان', 'راغب', '۷۸۶'],
        ['۹۲', 'فتح', 'نصر', 'کرم']
      ],
      targetRepetitions: 108,
      warnings: [
        'ناجائز، زنا یا دھوکہ دہی کے ارادے سے پڑھنا گناہِ کبیرہ اور بے برکتی لاتا ہے۔',
        'صرف جائز مقاصد اور صلح و آشتی کے لیے استعمال کریں۔'
      ]
    },
    {
      id: 'tjm-rizq-1',
      category: 'rizq_dolat',
      title: 'کنک دھارا و طلسمِ دولتِ ابدی (رزقِ غیبی و کشائشِ خزائن)',
      type: 'منتر (ہندی و سنسکرت کلمات مع ترجمہ)',
      element: 'آبی',
      effectSpeed: 'سریع (۳ تا ۷ یوم)',
      origin: 'قدیم سلیمانی و عبرانی',
      purpose: 'بندشِ رزق کا خاتمہ، فتوحاتِ غیبی، لاٹری و کاروبار میں بے تحاشہ برکت اور قرض سے فوری نجات۔',
      hindiScript: 'ॐ श्रीं ह्रीं क्लीं त्रिभुवन महालक्ष्म्यै अस्माकं दारिद्र्यं नाशय नाशय प्रचुरं धनं देहि देहि क्लीं ह्रीं श्रीं ॐ।',
      urduTransliteration: 'اوٴم شْرِیم ہْرِیم کْلِیم تْرِی بھُوَن مہا لکشمی اَسماکم دارِیدرْیَم ناشئے ناشئے، پْرَچُورَم دَھنَم دیہی دیہی، کْلِیم ہْرِیم شْرِیم اوٴم!',
      urduMeaning: '«تینوں جہانوں میں وسعت و رزق کے سرچشمے کے واسطے! ہماری غربت، تنگدستی اور مالی رکاوٹوں کو جڑ سے کاٹ دے اور ہمیں بے حساب پاکیزہ فراخیِ رزق، غیبی برکت اور دولتِ کثیرہ عطا فرما۔»',
      targetJinnType: 'موکلاتِ مشتری و شمس (ارواحِ برکت و فراخی)',
      requirements: [
        'صندل، زعفران اور عود کا بخور',
        'تانبے یا چاندی کی پتری (یا پیلا کاغذ)',
        'زعفران اور عرقِ گلاب کی سیاہی',
        'صدقہ شیرینی و طعام برائے مستحقین'
      ],
      saatTime: 'جمعرات یا اتوار کی صبح پہلی ساعت (ساعتِ مشتری یا شمس)۔',
      direction: 'شمال مشرق کی جانب',
      method: [
        '۱. پاک صاف لباس پہن کر زعفران و عرقِ گلاب سے زرد کاغذ یا تانبے کی پتری پر نقش تحریر کریں۔',
        '۲. صندل اور عود کا بخور سلگائیں۔',
        '۳. مذکورہ کلمات کو ۱۰۸ مرتبہ باقاعدگی سے تلاوت کر کے نقش اور اپنی تجوری یا بٹوے پر دم کریں۔',
        '۴. اس کے بعد روزانہ صبح ۱۱ بار اس منتر کا ورد اپنا معمول بنائیں۔',
        '۵. پہلے ہفتے ہی سے غیبی رزق اور آمدنی کے نئے راستے کھلنا شروع ہو جائیں گے۔'
      ],
      naqshPlacementPlace: 'نقش کو ریشمی زرد کپڑے میں لپیٹ کر دکان کے کیش کاؤنٹر، تجوری یا اپنے بٹوے میں حفاظت سے رکھیں۔ ایک نقش کو صاف پانی میں گھول کر دکان یا مکان کے چاروں کونوں میں چھڑکیں۔',
      distantTargetRule: 'اگر کاروبار یا جائیداد دوسرے شہر میں ہو تو نقش یہاں تیار کر کے ڈاک سے بھیجیں اور وہاں کے مینیجر یا مالک کو کہیں کہ دکان کے داخلی دروازے کے عین اوپر فریم کروا کر لگا دے۔',
      naqshType: 'مخمسِ غنا و ثروت ۵×۵',
      naqshMatrix: [
        [17, 24, 1, 8, 15],
        [23, 5, 7, 14, 16],
        [4, 6, 13, 20, 22],
        [10, 12, 19, 21, 3],
        [11, 18, 25, 2, 9]
      ],
      targetRepetitions: 108,
      warnings: [
        'دولت آنے پر غریبوں اور مسکینوں کا حق ادا کرنا لازمی ہے۔'
      ]
    },
    {
      id: 'tjm-shifa-1',
      category: 'shifa_hifazat',
      title: 'شابر منترِ الٹنت وید برائے دافعِ سحر، کالا جادو و نظرِ بد (پلٹوار)',
      type: 'منتر (ہندی و سنسکرت کلمات مع ترجمہ)',
      element: 'آتشی',
      effectSpeed: 'فوری (۱ تا ۳ گھنٹے/یوم)',
      origin: 'شابر ناتھ روایات',
      purpose: 'کسی بھی جادوگر کا کالا جادو، سفلی وار اور نظرِ بد فوراً جادوگر کی طرف واپس پلٹانا اور مریض کو محفوظ کرنا۔',
      hindiScript: 'उलटंत वेद, पलटंत काया। जिसने किया उसी पर धाया। जादू टोना भूत पिचास, भस्म कर दे गोरखनाथ की आस।',
      urduTransliteration: 'اُلٹَنت وید، پَلٹَنت کایا! جِس نے کیا اُسی پر دھایا۔ جادو، ٹونا، بھوت، پِچاس، بھسم کر دے گورکھ ناتھ کی آس!',
      urduMeaning: '«الٹ جائے سحر کا اثر اور پلٹ جائے کایا! جس دشمن یا ساحر نے یہ وار کیا ہو وہ اسی کے اوپر جا گرے۔ کالا جادو، ٹونا، اور بد روحیں سب اس روحانی قہر سے راکھ ہو جائیں اور متاثرہ شخص بالکل پاک و محفوظ ہو جائے۔»',
      targetJinnType: 'سفلی شیاطین، خبیث جادو اور مسلط کردہ پریت',
      requirements: [
        'حرمل، رائی اور نمک کا مرکب',
        'سر سے پاؤں تک ۷ بار اتارا کرنے کے لیے روٹی کا ٹکڑا',
        'سرسوں کے تیل کا چراغ'
      ],
      saatTime: 'غروبِ آفتاب کے فوراً بعد یا منگل/ہفتہ کی شام۔',
      direction: 'مغرب کی سمت',
      method: [
        '۱. مریض کے سر سے پاؤں تک گھڑی کی مخالف سمت میں ۷ بار رائی اور نمک کا اتارا کریں۔',
        '۲. منتر کو ۲۱ مرتبہ تلاوت کر کے اس نمک و رائی پر دم کریں اور دہکتے کوئلوں پر ڈال دیں۔',
        '۳. دھواں مریض کو دیں، اگر جادو یا نظر ہوگی تو دھواں بدبودار ہوگا اور مریض فوراً ہلکا پھلکا محسوس کرے گا۔',
        '۴. نقشِ ردِ سحر تیار کر کے بازو پر باندھیں۔',
        '۵. جادوگر کا سارا سفلی وار خود اسی کے جسم و دماغ پر واپس پلٹ جائے گا۔'
      ],
      naqshPlacementPlace: 'نقشِ ردِ سحر کو لکھ کر سیاہ کپڑے میں سی کر مریض کے بازو یا گلے میں ڈالیں۔ ایک نقش کو سرسوں کے تیل کے چراغ میں جلائیں تاکہ سحر کا اثر جڑ سے جل جائے۔',
      distantTargetRule: 'اگر مریض دور ہو تو مریض کے ناخنوں کے تراشے یا تصویر پر ۲۱ بار منتر پڑھ کر نمک پر دم کریں اور نمک کو مریض کے گھر کے آنگن میں چھڑکوا دیں۔',
      naqshType: 'مثلثِ ردِ سحر ۳×۳',
      naqshMatrix: [
        [8, 1, 6],
        [3, 5, 7],
        [4, 9, 2]
      ],
      targetRepetitions: 21,
      warnings: [
        'عمل کے بعد ہاتھ اچھی طرح دھوئیں اور صدقہ ضرور دیں۔'
      ]
    },
    {
      id: 'tjm-yantra-1',
      category: 'yantra_jantra',
      title: 'خاتمِ سلیمانی و لوحِ اعظمِ تسخیرِ جنات و ارواح',
      type: 'جنتر (لوح و نقشِ ہندسی)',
      element: 'خاکی',
      effectSpeed: 'طے شدہ مدت (۱۱ تا ۲۱ یوم)',
      origin: 'قدیم سلیمانی و عبرانی',
      purpose: 'تمام ارواح، جنات، شیاطین، وحوش و طیور پر رعب و دبدبہ اور ہر مجلس میں حاکمانہ غلبہ۔',
      hindiScript: 'ॐ सुलेमान दाऊद पुत्राय नमः। सकल जिन्नात व देव वशीकरणाय स्वाहा।',
      urduTransliteration: 'اوٴم سلیمان داوٴد پُترائے نمہ! سَکَل جنات و دیو وشیکرَݨائے سواہا!',
      urduMeaning: '«سیدنا داؤد علیہ السلام کے فرزند حضرت سلیمان علیہ السلام کے اسمِ اعظم اور خاتم کی قسم! تمام جنات، دیو اور سرکش ارواح مسخر و مطیع ہوں۔»',
      targetJinnType: 'عام و خاص جنات، دیو، عفریت و ہمزاد',
      requirements: [
        'خالص چاندی یا تانبے کی چوڑی لوح',
        'کھودنے کا فولادی قلم (مخمس کی کندہ کاری)',
        'لوبان، عود اور صندل کی دھونی',
        'روزہ و پرہیزِ جلالی و جمالی ۷ یوم'
      ],
      saatTime: 'شرفِ شمس (۱۹ درجے برجِ حمل) یا شرفِ مشتری۔',
      direction: 'قبلہ رو',
      method: [
        '۱. شرف کے مبارک وقت میں باوضو ہو کر پاک لباس میں بیٹھیں۔',
        '۲. چاندی کی لوح پر فولادی قلم سے شش گوشہ ستارہ اور اعداد کندہ کریں۔',
        '۳. لوح کے چاروں طرف چاروں مقرب فرشتوں کے نام اور آیت الکرسی تحریر کریں۔',
        '۴. کلماتِ مذکورہ کو ۱۱۰ بار پڑھ کر لوح پر دم کریں اور صندل و عود کا بخور دیں۔',
        '۵. لوح کو چمڑے یا چاندی کے خول میں محفوظ کر کے پہنیں۔'
      ],
      naqshPlacementPlace: 'لوح کو گلے میں ڈالیں یا دائیں بازو پر باندھیں۔ مکان کی حفاظت کے لیے اسے مکان کے صدر دروازے کی اندرونی چوکھٹ پر کیل سے نصب کیا جاتا ہے۔',
      distantTargetRule: 'دور دراز کے علاقے میں موجود مکان یا زمین کے لیے لوح کو محفوظ ڈبے میں پیک کر کے زمین کے عین وسط میں دفن کروا دیا جائے۔',
      naqshType: 'شش گوشہ تارا و خاتمِ سلیمانی',
      naqshMatrix: [
        ['جبرائیل', 'میکائیل', 'اسرافیل'],
        ['عزرائیل', 'خاتم', 'سلیمان'],
        ['۷۸۶', '۹۲', '۱۱۰']
      ],
      targetRepetitions: 110,
      warnings: [
        'ناپاکی اور حالتِ جنابت میں لوح کو چھونے سے گریز کریں۔'
      ]
    }
  ];

  // Filtering Logic
  const filteredItems = items.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type.includes(selectedType);
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.urduTransliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetJinnType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2c1e14] via-[#3a2215] to-[#283618] p-6 sm:p-8 text-[#fefae0] shadow-2xl border-2 border-[#bc6c25]">
        <div className="absolute inset-0 bg-[radial-gradient(#dda15e_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bc6c25] text-white text-xs font-bold shadow-xs">
                <Flame className="h-3.5 w-3.5 text-[#dda15e]" />
                <span>قدیم و مستند ہند و پاک طلسمات</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#283618] text-green-200 text-xs font-bold border border-green-500/40">
                <Languages className="h-3.5 w-3.5 text-[#dda15e]" />
                <span>ہندی منتر مع اردو تلفظ و مفہوم</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#7f1d1d] text-red-200 text-xs font-bold border border-red-500/40">
                <Zap className="h-3.5 w-3.5 text-yellow-300" />
                <span>جن و چڑیل حاضری، تسخیر و دفع</span>
              </span>
            </div>

            <h2 className="font-amiri text-2xl sm:text-4xl font-bold text-[#faedcd] leading-tight">
              تنتر، جنتر و منتر طلسماتی اسٹوڈیو (ہند و پاک قدیم خزائن)
            </h2>
            <p className="text-xs sm:text-sm text-[#d4a373] mt-1.5 max-w-3xl leading-relaxed">
              شابر ناتھ اور ہند و پاک کی مستند قدیم روایات: ہندی و سنسکرت کلمات مع اردو تلفظ، مکمل لفظی ترجمہ و تشریح، بخورات، اوقات و ساعات، اور جنات و چڑیل کو مسلط یا دفع کرنے والے سریع الاثر اعمال۔
            </p>
          </div>

          {/* Quick Sub-Navigation Buttons */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={() => setActiveSubTab('catalog')}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSubTab === 'catalog'
                  ? 'bg-[#bc6c25] text-white shadow-lg ring-2 ring-[#dda15e]'
                  : 'bg-[#1f150e] hover:bg-[#2c1e14] text-[#d4a373] border border-[#bc6c25]/50'
              }`}
            >
              <BookOpen className="h-4 w-4 text-[#dda15e]" />
              <span>کیٹلاگ اعمال</span>
            </button>

            <button
              onClick={() => setActiveSubTab('japa_counter')}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSubTab === 'japa_counter'
                  ? 'bg-[#283618] text-white shadow-lg ring-2 ring-green-400'
                  : 'bg-[#1f150e] hover:bg-[#2c1e14] text-[#d4a373] border border-[#bc6c25]/50'
              }`}
            >
              <RotateCcw className="h-4 w-4 text-green-300" />
              <span>لائیو منتر کاؤنٹر</span>
            </button>

            <button
              onClick={() => setActiveSubTab('jinn_guide')}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSubTab === 'jinn_guide'
                  ? 'bg-[#7f1d1d] text-white shadow-lg ring-2 ring-red-400'
                  : 'bg-[#1f150e] hover:bg-[#2c1e14] text-[#d4a373] border border-[#bc6c25]/50'
              }`}
            >
              <Zap className="h-4 w-4 text-yellow-300" />
              <span>رہنمائے جنات و چڑیل</span>
            </button>

            <button
              onClick={() => setActiveSubTab('hisar_rules')}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSubTab === 'hisar_rules'
                  ? 'bg-[#bc6c25] text-white shadow-lg ring-2 ring-[#dda15e]'
                  : 'bg-[#1f150e] hover:bg-[#2c1e14] text-[#d4a373] border border-[#bc6c25]/50'
              }`}
            >
              <ShieldCheck className="h-4 w-4 text-[#dda15e]" />
              <span>حصار و شرعی اصول</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: CATALOG OF ANCIENT TANTRAS, MANTRAS & YANTRAS */}
      {activeSubTab === 'catalog' && (
        <div className="space-y-6">
          
          {/* Filter Bar & Search */}
          <div className="bg-[#fefae0] border-2 border-[#bc6c25] rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              
              {/* Search Box */}
              <div className="relative flex-1 w-full">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-[#8d6e63]" />
                <input
                  type="text"
                  placeholder="منتر، جنتر، جنات، چڑیل، محبت یا تسخیر تلاش کریں..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-9 py-2 rounded-xl bg-white border border-[#d4a373] text-xs text-[#5d4037] focus:outline-none focus:ring-2 focus:ring-[#bc6c25]"
                />
              </div>

              {/* Category Dropdown */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="h-4 w-4 text-[#bc6c25] shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-[#d4a373] text-xs text-[#5d4037] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bc6c25] w-full md:w-auto cursor-pointer"
                >
                  <option value="all">تمام زمرہ جات (All Categories)</option>
                  <option value="jinn_churail">🔥 جن و چڑیل (تسخیر، حاضری، مسلط و دفع)</option>
                  <option value="mohabbat_taskheer">❤️ محبت، موہنی و تسخیرِ قلوب</option>
                  <option value="rizq_dolat">💰 رزقِ غیبی، دولت و کنک دھارا</option>
                  <option value="shifa_hifazat">🛡️ شفا، سحر کا توڑ و الٹنت وید</option>
                  <option value="yantra_jantra">🔯 سلیمانی جنتر و الواحِ نقوش</option>
                </select>
              </div>
            </div>

            {/* Category Quick Tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-[#bc6c25] text-white'
                    : 'bg-[#faedcd] text-[#5d4037] hover:bg-[#dda15e]'
                }`}
              >
                سب دکھائیں ({items.length})
              </button>
              <button
                onClick={() => setSelectedCategory('jinn_churail')}
                className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === 'jinn_churail'
                    ? 'bg-red-800 text-white'
                    : 'bg-[#faedcd] text-[#5d4037] hover:bg-[#dda15e]'
                }`}
              >
                🔥 جن و چڑیل کے اعمال
              </button>
              <button
                onClick={() => setSelectedCategory('mohabbat_taskheer')}
                className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === 'mohabbat_taskheer'
                    ? 'bg-[#bc6c25] text-white'
                    : 'bg-[#faedcd] text-[#5d4037] hover:bg-[#dda15e]'
                }`}
              >
                ❤️ موہنی و تسخیر
              </button>
              <button
                onClick={() => setSelectedCategory('rizq_dolat')}
                className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === 'rizq_dolat'
                    ? 'bg-green-800 text-white'
                    : 'bg-[#faedcd] text-[#5d4037] hover:bg-[#dda15e]'
                }`}
              >
                💰 دولت و کشائش
              </button>
              <button
                onClick={() => setSelectedCategory('shifa_hifazat')}
                className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === 'shifa_hifazat'
                    ? 'bg-[#283618] text-white'
                    : 'bg-[#faedcd] text-[#5d4037] hover:bg-[#dda15e]'
                }`}
              >
                🛡️ ردِ سحر و شفا
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#ffffff] border-2 border-[#bc6c25] rounded-3xl p-5 shadow-md hover:shadow-xl transition-all space-y-4 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-3">
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[11px] font-bold bg-[#faedcd] text-[#bc6c25] px-2.5 py-0.5 rounded-full border border-[#dda15e]/50">
                      {item.type}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      item.category === 'jinn_churail'
                        ? 'bg-red-100 text-red-900 border border-red-300'
                        : 'bg-green-100 text-green-900 border border-green-300'
                    }`}>
                      {item.effectSpeed}
                    </span>
                  </div>

                  {/* Title & Purpose */}
                  <div>
                    <h3 className="font-amiri text-xl font-bold text-[#5d4037] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#7f5539] mt-1 leading-relaxed">
                      {item.purpose}
                    </p>
                  </div>

                  {/* HINDI MANTRA & URDU MEANING CARD */}
                  <div className="bg-[#fdfaf1] border border-[#d4a373] rounded-2xl p-3.5 space-y-2.5">
                    
                    {/* Hindi Script */}
                    <div>
                      <span className="text-[10px] text-[#8d6e63] font-bold flex items-center gap-1">
                        <Languages className="h-3 w-3 text-[#bc6c25]" />
                        <span>اصل ہندی کلمات (Mantra Script):</span>
                      </span>
                      <p className="text-xs font-serif text-[#2c1e14] bg-white p-2 rounded-xl border border-[#faedcd] mt-1 select-all font-semibold" dir="ltr">
                        {item.hindiScript}
                      </p>
                    </div>

                    {/* Urdu Pronunciation / Transliteration */}
                    <div>
                      <span className="text-[10px] text-[#bc6c25] font-bold">
                        اردو تلفظ و ادائیگی:
                      </span>
                      <p className="font-amiri text-base font-bold text-[#5d4037] bg-[#faedcd]/60 p-2 rounded-xl border border-[#d4a373] mt-1 leading-relaxed">
                        {item.urduTransliteration}
                      </p>
                    </div>

                    {/* Urdu Meaning & Translation (User Requested Explicitly) */}
                    <div className="bg-[#e9d8a6]/40 border border-[#dda15e] p-2.5 rounded-xl text-xs text-[#432818]">
                      <span className="font-bold text-[#bc6c25] block mb-0.5 text-[11px]">
                        📖 اردو میں مکمل ترجمہ و لغوی مفہوم:
                      </span>
                      <p className="leading-relaxed text-[11px] font-medium">
                        {item.urduMeaning}
                      </p>
                    </div>
                  </div>

                  {/* Requirements & Timing Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="bg-[#f9f4e8] p-2.5 rounded-xl border border-[#e7d8c9] space-y-1">
                      <span className="font-bold text-[#bc6c25] flex items-center gap-1 text-[11px]">
                        <Flame className="h-3.5 w-3.5" />
                        <span>بخورات و لوازمات:</span>
                      </span>
                      <ul className="text-[11px] text-[#5d4037] list-disc list-inside space-y-0.5">
                        {item.requirements.slice(0, 2).map((req, i) => (
                          <li key={i} className="truncate">{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#f9f4e8] p-2.5 rounded-xl border border-[#e7d8c9] space-y-1">
                      <span className="font-bold text-[#283618] flex items-center gap-1 text-[11px]">
                        <Clock className="h-3.5 w-3.5" />
                        <span>وقت و سمت:</span>
                      </span>
                      <p className="text-[10px] text-[#5d4037] leading-tight">
                        {item.saatTime}
                      </p>
                      <p className="text-[10px] text-[#8d6e63] font-bold">
                        سمت: {item.direction}
                      </p>
                    </div>
                  </div>

                  {/* Mini Matrix / Yantra Preview */}
                  {item.naqshMatrix && (
                    <div className="bg-[#2c1e14] p-3 rounded-2xl text-center text-[#fefae0] space-y-1.5">
                      <span className="text-[10px] text-[#dda15e] font-bold block">
                        نقش / جنتر: {item.naqshType}
                      </span>
                      <div className="flex items-center justify-center gap-1">
                        {item.naqshMatrix.map((row, rIdx) => (
                          <div key={rIdx} className="flex flex-col gap-1">
                            {row.map((cell, cIdx) => (
                              <span
                                key={cIdx}
                                className="w-8 h-8 rounded-lg bg-[#3d2b1f] border border-[#bc6c25] text-xs font-mono font-bold flex items-center justify-center text-[#dda15e]"
                              >
                                {cell}
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-[#e7d8c9] flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopy(item.urduTransliteration, item.id)}
                    className="flex items-center gap-1 text-xs text-[#5d4037] hover:text-[#2c1e14] bg-[#faedcd] hover:bg-[#dda15e] px-3 py-1.5 rounded-xl transition-all cursor-pointer font-bold"
                  >
                    {copiedText === item.id ? <Check className="h-3.5 w-3.5 text-green-700" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedText === item.id ? 'کاپی شد!' : 'منتر کاپی'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setJapaTarget(item.targetRepetitions || 108);
                      setActiveSubTab('japa_counter');
                    }}
                    className="flex items-center gap-1.5 bg-[#283618] hover:bg-[#1b2610] text-white text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5 text-[#dda15e]" />
                    <span>تسبیح و کاؤنٹر میں پڑھیں</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: INTERACTIVE LIVE MANTRA JAPA COUNTER (تسبیح و ورد کاؤنٹر) */}
      {activeSubTab === 'japa_counter' && (
        <div className="bg-[#fefae0] border-2 border-[#bc6c25] rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#d4a373] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#283618] text-white">
                <RotateCcw className="h-6 w-6 text-green-300" />
              </div>
              <div>
                <h3 className="font-amiri text-2xl font-bold text-[#5d4037]">
                  لائیو منتر و عزیمت تسبیح کاؤنٹر (Mantra Japa Counter)
                </h3>
                <p className="text-xs text-[#8d6e63]">
                  تعدادِ ورد کو مکمل درستگی اور توجہ کے ساتھ مکمل کرنے کا ڈیجیٹل نظام
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#5d4037] font-bold">ہدفِ تعداد:</span>
              <select
                value={japaTarget}
                onChange={(e) => setJapaTarget(Number(e.target.value))}
                className="bg-white border border-[#bc6c25] text-xs font-bold text-[#5d4037] px-3 py-1.5 rounded-xl"
              >
                <option value={21}>۲۱ بار</option>
                <option value={41}>۴۱ بار</option>
                <option value={108}>۱۰۸ بار (مالا روایتی)</option>
                <option value={313}>۳۱۳ بار (سریع التاثیر)</option>
                <option value={1000}>۱۰۰۰ بار (کامل تسخیر)</option>
              </select>
            </div>
          </div>

          {/* Active Mantra Box */}
          {selectedItem ? (
            <div className="bg-white border border-[#d4a373] p-4 rounded-2xl space-y-2 text-right">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#bc6c25] bg-[#faedcd] px-2.5 py-0.5 rounded-full">
                  منتخب کردہ منتر: {selectedItem.title}
                </span>
                <span className="text-xs text-[#283618] font-bold">
                  عنصر: {selectedItem.element}
                </span>
              </div>
              <p className="font-amiri text-lg font-bold text-[#5d4037] leading-relaxed">
                {selectedItem.urduTransliteration}
              </p>
              <p className="text-xs text-[#8d6e63]">
                ترجمہ: {selectedItem.urduMeaning}
              </p>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-300 p-3 rounded-2xl text-xs text-amber-900 flex items-center justify-between">
              <span>کیٹلاگ سے کوئی بھی منتر منتخب کر کے یہاں لائیو کاؤنٹنگ شروع کر سکتے ہیں۔</span>
              <button
                onClick={() => setSelectedItem(items[0])}
                className="bg-[#bc6c25] text-white px-3 py-1 rounded-xl text-xs font-bold cursor-pointer"
              >
                پہلا منتر لوڈ کریں
              </button>
            </div>
          )}

          {/* Interactive Counter Circle */}
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <button
              onClick={() => {
                if (japaCount < japaTarget) {
                  setJapaCount(prev => prev + 1);
                }
              }}
              className="group relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-[#283618] via-[#3d2b1f] to-[#bc6c25] text-white shadow-2xl flex flex-col items-center justify-center cursor-pointer transition-all transform active:scale-95 border-4 border-[#dda15e] ring-8 ring-[#dda15e]/20"
            >
              <span className="text-xs text-[#dda15e] font-bold uppercase tracking-wider">
                کلک کریں (Tap)
              </span>
              <span className="font-mono text-5xl sm:text-6xl font-bold text-white my-1">
                {japaCount}
              </span>
              <span className="text-xs text-[#faedcd] font-mono">
                از {japaTarget} بار
              </span>

              {/* Progress Ring */}
              <div
                className="absolute inset-0 rounded-full border-4 border-green-400 pointer-events-none transition-all duration-300"
                style={{
                  clipPath: `inset(0 0 ${100 - (japaCount / japaTarget) * 100}% 0)`
                }}
              />
            </button>

            {/* Percentage Completed */}
            <div className="text-xs text-[#5d4037] font-bold flex items-center gap-2">
              <span>تکمیل:</span>
              <span className="bg-[#faedcd] px-2.5 py-0.5 rounded-full text-[#bc6c25] font-mono">
                {Math.round((japaCount / japaTarget) * 100)}%
              </span>
              {japaCount >= japaTarget && (
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>تعداد مکمل ہو گئی! عمل مکمل ہے۔</span>
                </span>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setJapaCount(0)}
                className="flex items-center gap-1 text-xs text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>ری سیٹ (0 پر لائیں)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: JINN & CHURAIL HAQEEQAT GUIDE (رہنمائے جنات و چڑیل) */}
      {activeSubTab === 'jinn_guide' && (
        <div className="bg-[#ffffff] border-2 border-[#bc6c25] rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-[#d4a373] pb-4">
            <div className="p-3 rounded-2xl bg-red-900 text-white">
              <Zap className="h-6 w-6 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-amiri text-2xl font-bold text-[#5d4037]">
                حقائق و قواعدِ تسخیر، حاضری و دفعِ جنات و چڑیل
              </h3>
              <p className="text-xs text-[#8d6e63]">
                ہند و پاک اور سلیمانی علوم کے مطابق ناری مخلوقات کے اسرار، علامات اور ردِ فتنہ
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#fdfaf1] border border-[#d4a373] p-4 rounded-2xl space-y-2">
              <h4 className="font-amiri text-lg font-bold text-red-900 flex items-center gap-1.5">
                <Flame className="h-4 w-4" />
                <span>۱. چڑیل و خبیث آسیب کی علامات و مزاج</span>
              </h4>
              <p className="text-xs text-[#5d4037] leading-relaxed">
                چڑیل اور خبیث آسیب زیادہ تر بادی اور آتشی عنصر سے تعلق رکھتے ہیں۔ ویران مقامات، پرانے درخت، کوڑا کرکٹ اور ناپاکی ان کا مسکن ہوتی ہے۔ ان کے غلبے کی علامات میں مریض کا بدبو محسوس کرنا، نیند میں دبائو (کابوس)، بلاوجہ خوف اور جسم پر نیلے نشانات شامل ہیں۔
              </p>
            </div>

            <div className="bg-[#fdfaf1] border border-[#d4a373] p-4 rounded-2xl space-y-2">
              <h4 className="font-amiri text-lg font-bold text-[#283618] flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span>۲. حاضری و تسخیر کے بنیادی شرائط</span>
              </h4>
              <p className="text-xs text-[#5d4037] leading-relaxed">
                کسی بھی جن یا چڑیل کو تابع کرنے سے پہلے عامل کا باطنی و ظاہری حصار پختہ ہونا لازم ہے۔ عمل کے دوران نگاہیں چراغ پر مرکوز رکھی جائیں اور کسی بھی ہیبت ناک شکل یا ڈراؤنی آواز سے خوفزدہ ہو کر حصار سے باہر نہ نکلا جائے۔
              </p>
            </div>

            <div className="bg-[#fdfaf1] border border-[#d4a373] p-4 rounded-2xl space-y-2">
              <h4 className="font-amiri text-lg font-bold text-[#bc6c25] flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>۳. مخصوص بخورات و اوقات</span>
              </h4>
              <p className="text-xs text-[#5d4037] leading-relaxed">
                جنات و چڑیل کے دفع اور تسخیر کے لیے حرمل (اسپند)، لوبان، کالا تل، کلونجی اور صندلِ سرخ کے بخورات کو ترجیح دی جاتی ہے۔ ساعتِ مریخ اور ساعتِ زحل (رات کے آخری پہر) میں ناری اعمال کا اثر برق رفتار ہوتا ہے۔
              </p>
            </div>

            <div className="bg-[#fdfaf1] border border-[#d4a373] p-4 rounded-2xl space-y-2">
              <h4 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span>۴. شرعی انتباہ اور حفاظتِ جان</span>
              </h4>
              <p className="text-xs text-[#5d4037] leading-relaxed">
                ناحق کسی بے گناہ پر جنات یا چڑیل مسلط کرنا سخت حرام اور دنیا و آخرت میں عذاب کا سبب ہے۔ ان اعمال کی اجازت صرف ظالم کے شر کو روکنے اور سحر زدہ مریضوں کو شفا دینے کے لیے ہے۔
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: HISAR & SHARIAH RULES */}
      {activeSubTab === 'hisar_rules' && (
        <div className="bg-[#ffffff] border-2 border-[#283618] rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex items-center gap-3 border-b border-[#d4a373] pb-4">
            <div className="p-3 rounded-2xl bg-[#283618] text-white">
              <ShieldCheck className="h-6 w-6 text-green-300" />
            </div>
            <div>
              <h3 className="font-amiri text-2xl font-bold text-[#283618]">
                حصارِ اعظم اور رجعت سے حفاظت کا قانون
              </h3>
              <p className="text-xs text-[#8d6e63]">
                عملیات میں کامیابی کا راز پختہ حصار اور شرعی حدود کی پاسداری میں ہے
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-[#5d4037] leading-relaxed">
            <div className="p-4 bg-[#f9f4e8] rounded-2xl border border-[#d4a373]">
              <h4 className="font-amiri text-base font-bold text-[#bc6c25] mb-1">
                طریقۂ حصارِ فولادی (Iron Fortress Hisar):
              </h4>
              <p>
                عمل شروع کرنے سے پہلے ۳ مرتبہ آیت الکرسی، ۴ قل اور سورۃ الفاتحہ پڑھ کر اپنے دونوں ہاتھوں پر دم کریں اور پورے جسم پر پھیریں۔ پھر شہادت کی انگلی یا لوہے کی چھری سے اپنے بیٹھنے کے مصلے کے گرد زمین پر دائرہ کھینچیں اور تصور کریں کہ آپ ایک ناقابلِ تسخیر قلعے میں محفوظ ہو چکے ہیں۔
              </p>
            </div>

            <div className="p-4 bg-[#dce4c9] rounded-2xl border border-[#606c38] text-[#283618]">
              <h4 className="font-amiri text-base font-bold mb-1">
                رجعت سے بچاؤ کی تدابیر:
              </h4>
              <p>
                اگر عمل کے دوران سر میں درد، بے چینی یا خوف کا غلبہ ہونے لگے تو فوری طور پر تلاوتِ قرآنِ پاک کریں، کثرت سے استغفار پڑھیں اور حسبِ توفیق صدقہ دیں۔ کسی بھی عمل کو بیچ میں ادھورا نہ چھوڑیں۔
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
