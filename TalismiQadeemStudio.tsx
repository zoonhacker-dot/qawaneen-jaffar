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
  CheckSquare,
  Navigation,
  Crosshair,
  Home,
  MapPin,
  Anchor,
  FlameKindling
} from 'lucide-react';

export interface VedicTalismiItem {
  id: string;
  category: 'distant_target' | 'jinn_churail_vedic' | 'shabar_vedic' | 'naqsh_tantra_rules' | 'taskheer_mohabbat' | 'dolat_karobar' | 'shifa_hifazat';
  title: string;
  type: 'تنتر (طلسماتی ترکیب و عمل)' | 'جنتر (لوح و نقشِ ہندسی)' | 'منتر (ہندی و سنسکرت کلمات مع ترجمہ)';
  element: 'آتشی' | 'بادی' | 'آبی' | 'خاکی';
  effectSpeed: 'فوری (۱ تا ۳ گھنٹے/یوم)' | 'سریع (۳ تا ۷ یوم)' | 'طے شدہ مدت (۱۱ تا ۲۱ یوم)';
  origin: 'ویدک و ہندی قدیم روایات' | 'شابر ناتھ روایات' | 'سلیمانی و تبت طلسمات' | 'ہند و پاک روایات';
  purpose: string;
  hindiScript: string;
  urduTransliteration: string;
  urduMeaning: string; // اردو ترجمہ و لغوی مفہوم
  requirements: string[]; // لوازمات، بخورات و اشیاء
  saatTime: string; // وقت، ساعات و سمت
  direction: string; // سمت
  targetDistanceRule: string; // اگر مطلوب دور ہو یا اس کا گھر دور ہو تو عمل کرنے کا مخصوص طریقہ
  naqshPlacementPlace: string; // جگہ و نقش کہاں اور کس طرح استعمال میں لانا ہے
  targetJinnType?: string; // متعلقہ جن، چڑیل، آسیب یا موکل
  method: string[]; // عمل کا تفصیلی طریقہ کار
  naqshType?: string;
  naqshMatrix?: (number | string)[][];
  targetRepetitions: number;
  shariaPermissibleRules: string[]; // شرعی اجازت، اخلاقی حدود و احتیاط
}

export const TalismiQadeemStudio: React.FC<{
  onSendToNaqsh?: (text: string, adad: number) => void;
}> = ({ onSendToNaqsh }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<VedicTalismiItem | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'distant_action_guide' | 'naqsh_usage_guide' | 'japa_counter' | 'sharia_ethics'>('catalog');

  // Live Japa Counter State
  const [japaCount, setJapaCount] = useState<number>(0);
  const [japaTarget, setJapaTarget] = useState<number>(108);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const items: VedicTalismiItem[] = [
    {
      id: 'tq-dist-1',
      category: 'distant_target',
      title: 'شابر منترِ بادی و ترسیلِ ارواح برائے مطلوبِ بعید (اگر مطلوب یا اس کا گھر دور ہو)',
      type: 'منتر (ہندی و سنسکرت کلمات مع ترجمہ)',
      element: 'بادی',
      effectSpeed: 'سریع (۳ تا ۷ یوم)',
      origin: 'ویدک و ہندی قدیم روایات',
      purpose: 'اگر مطلوب کسی دوسرے شہر یا ملک میں ہو یا اس کا گھر میلوں دور ہو، تو اس کے دل و دماغ میں مثبت رجوع پیدا کرنا۔',
      hindiScript: 'ॐ नमो महा पवन देवाय। सात समुद्र पार जा, अमूक (नाम) के चित्त को डोल, निशदिन मेरे विचार में बांध। सत्य नाम आदेश गुरु का।',
      urduTransliteration: 'اوٴم نمو مہا پَوَن دیوائے! سات سمندر پار جا، فلاں بن فلاں کے چِت کو ڈول، نِش دِن میرے وِچار میں باندھ۔ ستیہ نام آدیش گرو کا!',
      urduMeaning: '«بادِ اعظم اور لطیف ارواحِ فلکی کے نام سے شروع کرتا ہوں! ائے بادِ تیز رو! سات سمندر پار کا فاصلہ بھی طے کر کے مطلوب کے دل و دماغ کو متوجہ کر اور اس کے خیالات کو مثبت و پرخلوص رشتے کے لیے مائل کر۔ یہ برحق کلام اور استاد کا اٹل فرمان ہے!»',
      requirements: [
        'حرمل (اسپند)، صندل سفید اور لوبان کی دھونی',
        'مطلوب کا نام مع والدہ اور اس کی رہائش کا ملک/شہر کا تصور',
        'صاف سفید کاغذ یا ہرن کی جھلی (بھوج پتر)',
        'زعفران و عرقِ گلاب کی سیاہی'
      ],
      saatTime: 'جمعرات یا جمعہ کی شب بعد نمازِ عشاء (ساعتِ مشتری یا زہرہ)',
      direction: 'مطلوب کے شہر یا ملک کے جغرافیائی رخ (سمت) کی طرف منہ کر کے بیٹھنا',
      targetDistanceRule: 'چونکہ مطلوب دور ہے، اس لیے عمل میں بادی (ہوا) اور خاکی عناصر استعمال کیے جائیں گے۔ اس نقش کو بلند درخت یا چھت کی ایسی جگہ لٹکائیں جہاں ہوا کا گزر ہو، تاکہ ہوا کے ہر جھونکے کے ساتھ امواجِ خیال مطلوب کے دل پر وارد ہوں۔',
      naqshPlacementPlace: 'نقش کو لکھ کر موم جامہ کریں اور درخت کی سبز ٹہنی سے باندھ دیں، یا مطلوب کے راستے کی مٹی کے تصور پر دفن کریں۔ اگر نقش لکھنا ممکن نہ ہو تو روزانہ رات کو اس منتر کو ۱۰۸ مرتبہ پڑھ کر مطلوب کی سمت میں تین بار پھونک ماریں۔',
      method: [
        'سب سے پہلے باوضو ہو کر چاروں قل اور آیت الکرسی کا شرعی حصار قائم کریں۔',
        'منتر میں لفظ "اموک" کی جگہ مطلوب اور اس کی والدہ کا نام لگائیں (مثلاً: زید بن حوا)۔',
        'مطلوب کے مکان یا شہر کی سمت تصور کر کے ۱۰۸ مرتبہ تسبیح مکمل کریں۔',
        'تیار شدہ بادی نقش کو ہوا دار جگہ یا ہوا کے رخ پر باندھ دیں۔'
      ],
      targetRepetitions: 108,
      naqshType: 'مثلث بادی برائے تسخیرِ بعید',
      naqshMatrix: [
        [12, 1, 14],
        [13, 9, 5],
        [2, 17, 8]
      ],
      shariaPermissibleRules: [
        'یہ عمل صرف جائز و شرعی رشتوں (نکاح، میاں بیوی کی صلح، ناراض والدین یا سچے تعلق) کے لیے جائز ہے۔',
        'کسی کو ناحق تکلیف دینے یا ناجائز رشتے کے لیے پڑھنا سخت حرام اور گناہِ کبیرہ ہے۔',
        'حصار کے بغیر عمل نہ کیا جائے تاکہ رجعت کا اندیشہ نہ ہو۔'
      ]
    },
    {
      id: 'tq-dist-2',
      category: 'distant_target',
      title: 'تنترِ چراغِ آتشی برائے مطلوبِ دور دراز (سوختنِ اضطراب و بے چینی)',
      type: 'تنتر (طلسماتی ترکیب و عمل)',
      element: 'آتشی',
      effectSpeed: 'فوری (۱ تا ۳ گھنٹے/یوم)',
      origin: 'شابر ناتھ روایات',
      purpose: 'دور بیٹھے مطلوب کو بیدار کرنا اور اس کے دل میں محبت و مودت کی تڑپ پیدا کرنا۔',
      hindiScript: 'ॐ नमो आदेश कामरू कामाख्या देश। जो सोवे सो जागे, जो बैठे सो चले, अमूक का मन मेरे चरण में ढले। ॐ फट स्वाहा।',
      urduTransliteration: 'اوٴم نمو آدیش کامرو کاماکھیا دیش! جو سووے سو جاگے، جو بیٹھے سو چلے، فلاں بن فلاں کا من میرے چرن میں ڈھلے۔ اوٴم پھٹ سواہا!',
      urduMeaning: '«کامرو کے قدیم صوفی و روحانی مرکز کے فیض سے حکم کرتا ہوں! مطلوب اگر سو رہا ہو تو بیدار ہو، بیٹھا ہو تو اٹھ کھڑا ہو اور اس کے دل میں میرے لیے خلوص و چاہت کا جذبہ پیدا ہو جائے۔ یہ حکم فوری روبہ عمل ہو!»',
      requirements: [
        'مٹی کا نیا چراغ (دیا)',
        'چنبیلی یا سرسوں کا خالص تیل',
        'روئی کی نئی بتی جس پر زعفران لگایا گیا ہو',
        'مطلوب کی تصویر یا نام مع والدہ لکھا ہوا پرچہ'
      ],
      saatTime: 'نصف شب (ساعتِ مریخ یا شمس)',
      direction: 'مطلوب کے گھر کی جانب چراغ کا رخ (لو) کریں',
      targetDistanceRule: 'اگر مطلوب کا گھر ہزاروں میل دور ہو تو چراغ کی لو کو اس کے ملک یا شہر کی سمت میں سیدھا رکھا جاتا ہے۔ رات کی خاموشی میں نگاہ چراغ کی لو پر جما کر منتر کا ورد کریں۔',
      naqshPlacementPlace: 'نقشِ چراغ کو روئی میں لپیٹ کر فتیلہ (بتی) بنائیں اور چراغ میں جلا دیں۔ روزانہ نیا فتیلہ ۳ دن تک جلائیں۔ راکھ کو کسی پاک بہتے پانی یا گملے میں ڈالیں۔',
      method: [
        'وضو کے بعد ۲ رکعت نفل حاجت ادا کریں۔',
        'چراغ روشن کر کے اس کے سامنے بیٹھ جائیں۔',
        '۳۱۳ مرتبہ منتر پڑھیں اور ہر ۱۰۰ بار پر چراغ کی لو کی طرف پھونک ماریں۔',
        'یہ عمل مسلسل ۳ یا ۷ راتیں جاری رکھیں۔'
      ],
      targetRepetitions: 313,
      shariaPermissibleRules: [
        'میاں بیوی کے درمیان جدائی یا ناچاقی ختم کرنے کے لیے اکسیر ہے۔',
        'کسی کی گھریلو زندگی برباد کرنے کے لیے استعمال کرنا شرعاً قطعی باطل ہے۔'
      ]
    },
    {
      id: 'tq-jinn-1',
      category: 'jinn_churail_vedic',
      title: 'ویدک شابر منترِ تسخیرِ جنات و اخراجِ چڑیل و آسیبِ قدیم',
      type: 'منتر (ہندی و سنسکرت کلمات مع ترجمہ)',
      element: 'آتشی',
      effectSpeed: 'فوری (۱ تا ۳ گھنٹے/یوم)',
      origin: 'ویدک و ہندی قدیم روایات',
      purpose: 'پرانے اور ضدی جنات، چڑیل، ڈائن اور آسیب کو جلانا، دفع کرنا یا تابع بنانا۔',
      hindiScript: 'ॐ वज्र बाण, ईश्वर की आण। हनुमंत वीर, गरुड़ की धीर। जहां जाए जिन्न चुड़ैल, वहां भस्म करे मेरा तीर। ॐ ह्रीं क्लीं फट्।',
      urduTransliteration: 'اوٴم وجر بان، اِیشور کی آن! ہنومنت ویر، گرڑ کی دھیر۔ جہاں جائے جن، چڑیل، وہاں بھسم کرے میرا تیر۔ اوٴم ہریم کلیم پھٹ!',
      urduMeaning: '«اللہ قادرِ مطلق کی قدرت کا تیرِ فولادی روانہ کرتا ہوں! جیسے بجلیاں کفر و شر کو بھسم کرتی ہیں، ویسے ہی جہاں بھی کوئی سرکش جن، چڑیل یا بد روح چھپی ہو، میرا روحانی تیر اسے جلا کر خاکستر کر دے اور مریض کو خلاصی بخشے۔»',
      requirements: [
        'سرسوں کے دانے (رائی) اور نمکِ لاہوری',
        'لوہے کی چھری یا کڑا',
        'حرمل و لوبان کا تیز دھواں',
        'پانی کا پیالہ جس پر دم کیا جائے'
      ],
      saatTime: 'منگل یا ہفتہ کے دن بعد نمازِ مغرب (ساعتِ مریخ و زحل)',
      direction: 'مشرق یا شمال کی جانب',
      targetDistanceRule: 'اگر مریض یا متاثرہ گھر دور دراز علاقے میں ہو تو مریض کا پہنا ہوا کپڑا یا تصویر سامنے رکھ کر سرسوں کے دانوں پر دم کریں اور ڈاک کے ذریعے بھجوا کر اس کے گھر کے چاروں کونوں میں بکھیر دیں۔',
      naqshPlacementPlace: 'نقشِ اخراجِ جنات کو مریض کے گلے میں ڈالیں یا متاثرہ مکان کی چوکھٹ کے اوپر نصب کریں۔ ایک نقش پانی میں گھول کر گھر کی چاروں دیواروں پر چھڑکیں۔',
      method: [
        'سب سے پہلے ۳ مرتبہ سورۃ الفاتحہ، ۳ مرتبہ آیۃ الکرسی پڑھ کر اپنے اوپر دم کریں۔',
        'مریض کو سامنے بٹھائیں یا اس کے کپڑے کو سامنے رکھیں۔',
        '۴۱ مرتبہ یہ کلمات پڑھ کر رائی کے دانوں پر دم کریں اور انگاروں پر ڈالیں۔',
        'آسیب چند ہی لمحوں میں جل کر حاضر ہو جائے گا یا مریض کو چھوڑ کر بھاگ جائے گا۔'
      ],
      targetRepetitions: 41,
      shariaPermissibleRules: [
        'صرف مظلوم مریضوں کے علاج اور شیطانی اثرات دفع کرنے کی نیت سے کریں۔',
        'شرکیہ نیت ہرگز نہ رکھیں بلکہ تمام تاثیر اللہ تعالیٰ کے حکم کے تابع سمجھیں۔'
      ]
    },
    {
      id: 'tq-jinn-2',
      category: 'jinn_churail_vedic',
      title: 'تنترِ مسمارِ آہنی (کیل گاڑنا) برائے بندشِ شیاطین و آسیبِ مکان',
      type: 'تنتر (طلسماتی ترکیب و عمل)',
      element: 'خاکی',
      effectSpeed: 'سریع (۳ تا ۷ یوم)',
      origin: 'ویدک و ہندی قدیم روایات',
      purpose: 'کسی بھی خوفناک مکان، دکان یا زمین کو جنات، آسیب اور بد روحوں کے قبضے سے ہمیشہ کے لیے پاک و محفوظ کرنا۔',
      hindiScript: 'ॐ नमो धरती माता, गगन पिता। बांधूं चार खूंट, बांधूं अष्ट दिशा। जो आवे सो बंधे, जो लड़े सो गिरे। आदेश गुरु गोरखनाथ का।',
      urduTransliteration: 'اوٴم نمو دھرتی ماتا، گگن پتا! باندھوں چار کھونٹ، باندھوں اشٹ دِشا۔ جو آوے سو بندھے، جو لڑے سو گِرے۔ آدیش گرو گورکھ ناتھ کا!',
      urduMeaning: '«زمین و آسمان کے خالق کے نام سے! میں مکان کے چاروں کونوں اور آٹھوں سمتوں کو حصار میں باندھتا ہوں۔ جو شریر جن یا آسیب یہاں گھسے وہ زنجیروں میں جکڑ جائے اور جو مقابلہ کرے وہ تباہ ہو جائے۔ یہ روحانی استاد کا اٹل فرمان ہے!»',
      requirements: [
        '۴ عدد نئی لوہے کی کیلیں (۳ انچ لمبی)',
        'کالا دھاگہ',
        'سرسوں کا تیل اور سندور',
        'ہتھوڑی'
      ],
      saatTime: 'ہفتہ کی صبح طلوعِ آفتاب کے وقت (ساعتِ زحل)',
      direction: 'مکان کے چاروں کونے (شمال مشرق، شمال مغرب، جنوب مشرق، جنوب مغرب)',
      targetDistanceRule: 'اگر مکان کسی دوسرے شہر میں ہو تو کیلوں پر خود عمل مکمل کر کے پاک کپڑے میں لپیٹ کر بھیجیں اور وہاں کے رہائشی کو تاکید کریں کہ مقررہ کونوں میں زمین کے اندر ٹھونک دیں۔',
      naqshPlacementPlace: 'چاروں کیلوں پر ۲۱، ۲۱ مرتبہ پڑھ کر دم کریں اور مکان کے چاروں اندرونی کونوں میں زمین کے برابر گاڑ دیں۔',
      method: [
        'ہر کیل پر کالا دھاگہ لپیٹیں۔',
        'منتر کو ۲۱ بار پڑھ کر پہلی کیل پر دم کریں اور مشرقی کونے میں گاڑیں۔',
        'اسی طرح باقی تین کونوں میں کیلیں گاڑیں۔',
        'اس کے بعد مکان میں کبھی کوئی آسیب یا جن قدم نہیں رکھ سکے گا۔'
      ],
      targetRepetitions: 84,
      shariaPermissibleRules: [
        'مکان کو بد اثرات سے محفوظ کرنا جائز اور شرعاً مستحسن ہے۔',
        'کیلوں کو بذاتِ خود مؤثر نہ سمجھیں بلکہ اس میں اللہ کے نام کی تاثیر ہے۔'
      ]
    },
    {
      id: 'tq-jantra-1',
      category: 'naqsh_tantra_rules',
      title: 'جنترِ مہا لکشمی و کشائشِ رزقِ اعظم (نقشِ ہندسی نو خانہ)',
      type: 'جنتر (لوح و نقشِ ہندسی)',
      element: 'آبی',
      effectSpeed: 'طے شدہ مدت (۱۱ تا ۲۱ یوم)',
      origin: 'ویدک و ہندی قدیم روایات',
      purpose: 'غربت، تنگدستی، قرض اور کاروبار کی بندش کا خاتمہ اور دولت کی فراوانی۔',
      hindiScript: 'ॐ श्रीं ह्रीं क्लीं त्रिभुवन महालक्ष्म्यै अस्मांक दारिद्र्य नाशय प्रचुर धनं देहि देहि क्लीं ह्रीं श्रीं ॐ।',
      urduTransliteration: 'اوٴم شریم ہریم کلیم تری بھوون مہا لکشمیئے اسمانک دارِدرئے ناشئے پرچور دھنم دیہی دیہی کلیم ہریم شریم اوٴم!',
      urduMeaning: '«ائے کائنات کے خزانوں کے مالک پروردگار! ہماری غربت اور تنگدستی کو مٹا دے، اور ہمیں حلال، کثیر اور بابرکت رزق و دولت عطا فرما۔ تیرے مبارک اسماء کی برکت سے کشائش نصیب ہو!»',
      requirements: [
        'چاندی کا پترا یا زرد کاغذ',
        'زعفران، کستوری اور عرقِ گلاب',
        'عود و عنبر کی دھونی',
        'میٹھی کھیر یا حلوا برائے مساکین'
      ],
      saatTime: 'جمعرات کی صبح ساعتِ مشتری یا شمس میں',
      direction: 'شمال (North) کی جانب رخ کر کے لکھیں',
      targetDistanceRule: 'اگر کاروبار یا دکان دوسرے شہر میں ہو تو نقش یہاں تیار کر کے ڈاک سے بھیجیں، دکان دار اسے کیش باکس یا دکان کے مرکزی دروازے کے اوپر لٹکا دے۔',
      naqshPlacementPlace: 'نقش کو فریم کروا کر دکان کے گلے میں رکھیں یا دائیں بازو پر باندھیں۔ ایک نقش پانی میں گھول کر کاروبار کی جگہ پر چھڑکیں۔',
      method: [
        'باوضو ہو کر شمال رخ بیٹھیں۔',
        'زعفران سے ۳×۳ کا ہندسی نقش تیار کریں۔',
        'نقش پر منتر ۱۰۸ بار پڑھ کر دم کریں۔',
        'چاندی کے تعویذ میں بند کر کے پاس رکھیں۔'
      ],
      targetRepetitions: 108,
      naqshType: 'مربعِ سعد ۳×۳ برائے رزق',
      naqshMatrix: [
        [72, 11, 64],
        [19, 49, 79],
        [56, 87, 4]
      ],
      shariaPermissibleRules: [
        'رزقِ حلال کی طلب کے لیے یہ عمل بے مثل ہے۔',
        'حرام کاروبار یا جوئے وغیرہ کے لیے اس کا استعمال سخت گناہ ہے۔'
      ]
    },
    {
      id: 'tq-jantra-2',
      category: 'shabar_vedic',
      title: 'شابر منترِ تسخیرِ خلائق و ہیبتِ سلطانی (حاکم و افسر کو نرم کرنا)',
      type: 'منتر (ہندی و سنسکرت کلمات مع ترجمہ)',
      element: 'آتشی',
      effectSpeed: 'فوری (۱ تا ۳ گھنٹے/یوم)',
      origin: 'شابر ناتھ روایات',
      purpose: 'سخت گیر حاکم، جج، ظالم افسر یا دشمن کے سامنے سرخرو ہونا اور اس کے دل کو موم کرنا۔',
      hindiScript: 'ॐ नमो आदेश गुरु को। राजा मोहूं, परजा मोहूं, मोहूं सकल संसार। जो कोई मोहे देखन आवे, सो पग धोवे दास कहावे। ॐ स्वाहा।',
      urduTransliteration: 'اوٴم نمو آدیش گرو کو! راجہ موہوں، پرجا موہوں، موہوں سکل سنسار۔ جو کوئی موہے دیکھن آوے، سو پگ دھووے داس کہاوے۔ اوٴم سواہا!',
      urduMeaning: '«استاد کے مبارک فیض سے! حاکم کا دل نرم ہو، عوام کا دل متوجہ ہو، اور پورا معاشرہ میرے حق میں محبت سے پیش آئے۔ جو بھی مجھے غصے یا عداوت سے دیکھنے آئے وہ عاجز ہو کر انصاف اور نرمی پر مجبور ہو جائے!»',
      requirements: [
        'سرخ صندل کا پاؤڈر',
        'عطرِ گلاب یا حنا',
        'پیشانی پر لگانے کے لیے تلک کی تیاری'
      ],
      saatTime: 'صبح کے وقت بوقتِ شمس (طلوعِ آفتاب کے بعد)',
      direction: 'مشرق کی جانب',
      targetDistanceRule: 'اگر افسر یا حاکم دور رہتا ہو اور آپ نے فون پر یا آن لائن پیش ہونا ہو، تو اپنے سامنے اس کے نام کا پرچہ رکھ کر ۲۱ بار پڑھ کر پھونک ماریں، پھر فون پر بات کریں۔',
      naqshPlacementPlace: 'عطر پر ۲۱ بار دم کر کے اپنے کپڑوں اور پیشانی پر لگائیں۔ عدالت یا دفتر میں داخل ہوتے وقت دل ہی دل میں تین بار دہرائیں۔',
      method: [
        'وضو کر کے مشرق رخ بیٹھیں۔',
        '۲۱ مرتبہ منتر پڑھ کر عطر پر دم کریں۔',
        'وہ عطر لگا کر افسر یا حاکم کے سامنے جائیں۔',
        'انشاء اللہ حاکم انتہائی مہربان اور نرم ہو جائے گا۔'
      ],
      targetRepetitions: 21,
      shariaPermissibleRules: [
        'اپنا جائز حق حاصل کرنے اور ظلم سے بچنے کے لیے پڑھنا جائز ہے۔',
        'کسی کو ناحق نقصان پہنچانے یا رشوت خوری کے لیے استعمال کرنا ناجائز ہے۔'
      ]
    },
    {
      id: 'tq-tantra-loc-1',
      category: 'naqsh_tantra_rules',
      title: 'تنترِ دفینہ و نقشِ خاکی (مطلوب کے راستے، چوکھٹ یا قبرستان میں استعمال کا کلیہ)',
      type: 'تنتر (طلسماتی ترکیب و عمل)',
      element: 'خاکی',
      effectSpeed: 'سریع (۳ تا ۷ یوم)',
      origin: 'ویدک و ہندی قدیم روایات',
      purpose: 'نقش کو زمین میں دبانے، چوکھٹ تلے رکھنے یا پاک مٹی میں دفن کرنے کے قدیم و مستند اصول۔',
      hindiScript: 'ॐ भूम्यै नमः। जो दबावे सो पावे, जो रोपे सो फल लहावे। शुभ कार्य सिद्ध कुरु कुरु स्वाहा।',
      urduTransliteration: 'اوٴم بھومیئے نمہ! جو دباوے سو پاوے، جو روپے سو پھل لہاوے۔ شبھ کاریہ سدھ کرو کرو سواہا!',
      urduMeaning: '«زمین کی پاک مٹی اور عناصرِ ارضی کے نام سے! جو بیج بویا جائے وہی بارآور ہو اور جو نیک مقصد مٹی کے حوالے کیا جائے وہ پھل لائے۔ ہمارے تمام نیک و پاکیزہ مقاصد کو جلد پورا فرما!»',
      requirements: [
        'سفید کورے مٹی کے دو پیالے (سفالی برتن)',
        'کپور (کافور)، زعفران اور مشک',
        'سفید دھاگہ',
        'شہد کی چند بوندیں'
      ],
      saatTime: 'جمعہ کی شام بعد نمازِ عصر',
      direction: 'قبلہ رخ یا مطلوب کی سمت',
      targetDistanceRule: 'اگر مطلوب کا گھر دور ہو اور وہاں جا کر دفن کرنا ممکن نہ ہو، تو کسی پاک و شفاف نہر کے کنارے یا اپنے ہی گھر کے سایہ دار گملے میں دفن کریں، اثر فوراً پہنچے گا۔',
      naqshPlacementPlace: '۱) مطلوب کی چوکھٹ کے نیچے: اگر ممکن ہو تو دہلیز تلے دبائیں، ۲) راستے میں: جہاں سے مطلوب روز گزرتا ہو، ۳) قبرستان میں: صرف ردِ سحر اور علاج کے لیے پرانی قبر کے قریب، ۴) ہوا میں: اگر بادی ہو۔',
      method: [
        'نقشِ خاکی زعفران سے تحریر کریں۔',
        'نقش پر تھوڑا سا شہد اور کافور لگائیں۔',
        'دونوں مٹی کے پیالوں کے درمیان نقش رکھ کر سفید دھاگے سے باندھ دیں۔',
        'مطلوبہ جگہ پر کم از کم ایک فٹ گہرا گڑھا کھود کر دبا دیں۔'
      ],
      targetRepetitions: 41,
      shariaPermissibleRules: [
        'قبرستان میں صرف علاج اور ردِ جادو کے نقوش دفن کیے جا سکتے ہیں۔',
        'ناجائز تفریق یا دشمنی کے لیے دفن کرنا کفر و شیطانی فعل ہے جس سے سخت اجتناب لازم ہے۔'
      ]
    }
  ];

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.urduMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.urduTransliteration.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2c1e14] via-[#4a2c11] to-[#283618] p-6 sm:p-8 text-[#fefae0] shadow-2xl border-2 border-[#bc6c25]">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#dda15e_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bc6c25]/80 text-[#fefae0] text-xs font-bold border border-[#dda15e]/50">
              <Sparkles className="h-3.5 w-3.5 text-[#dda15e]" />
              <span>مستند قدیم انسائیکلوپیڈیا و شابر ویدک کتب</span>
            </div>
            
            <h2 className="font-amiri text-2xl sm:text-4xl font-bold tracking-wide text-[#faedcd]">
              طلسمِ قدیم: تنتر، جنتر و ویدک شابر منتر اسٹوڈیو
            </h2>
            
            <p className="text-sm text-[#dda15e] max-w-3xl leading-relaxed">
              ہند و پاک کی قدیم روایات کے ویدک و شابر منتر (مع اصل رسم الخط، اردو تلفظ، سلیس ترجمہ و لغوی مفہوم)، دور دراز مطلوب پر عمل کا طریقہ، نقوش کے مقاماتِ استعمال، جنات و چڑیل کے اعمال اور حدودِ شریعت۔
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="bg-[#1f150e]/90 border border-[#bc6c25] rounded-2xl p-3.5 text-center shadow-lg">
              <span className="text-[10px] text-[#dda15e] block font-bold">لائیو منتر کاؤنٹر</span>
              <span className="font-mono text-2xl font-bold text-white">{japaCount}</span>
              <span className="text-[10px] text-[#ccd5ae] block">ہدف: {japaTarget}</span>
            </div>
          </div>
        </div>

        {/* Sub Navigation Bar inside Talismi-e-Qadeem */}
        <div className="mt-6 pt-4 border-t border-[#bc6c25]/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('catalog')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'catalog'
                ? 'bg-[#bc6c25] text-white shadow-md'
                : 'bg-[#3d2b1f] text-[#faedcd] hover:bg-[#5d4037]'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 text-[#dda15e]" />
            <span>کتب و ذخیرۂ منترات و نقوش</span>
          </button>

          <button
            onClick={() => setActiveSubTab('distant_action_guide')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'distant_action_guide'
                ? 'bg-[#bc6c25] text-white shadow-md'
                : 'bg-[#3d2b1f] text-[#faedcd] hover:bg-[#5d4037]'
            }`}
          >
            <Navigation className="h-3.5 w-3.5 text-[#dda15e]" />
            <span>اگر مطلوب یا اس کا گھر دور ہو (طریقۂ عمل)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('naqsh_usage_guide')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'naqsh_usage_guide'
                ? 'bg-[#bc6c25] text-white shadow-md'
                : 'bg-[#3d2b1f] text-[#faedcd] hover:bg-[#5d4037]'
            }`}
          >
            <MapPin className="h-3.5 w-3.5 text-[#dda15e]" />
            <span>نقش کہاں اور کس طرح استعمال کریں (مقامات)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('japa_counter')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'japa_counter'
                ? 'bg-[#bc6c25] text-white shadow-md'
                : 'bg-[#3d2b1f] text-[#faedcd] hover:bg-[#5d4037]'
            }`}
          >
            <Zap className="h-3.5 w-3.5 text-[#dda15e]" />
            <span>ڈیجیٹل جاپ / منتر کاؤنٹر</span>
          </button>

          <button
            onClick={() => setActiveSubTab('sharia_ethics')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'sharia_ethics'
                ? 'bg-[#bc6c25] text-white shadow-md'
                : 'bg-[#3d2b1f] text-[#faedcd] hover:bg-[#5d4037]'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-[#dda15e]" />
            <span>شرعی رہنمائی و اخلاقی ضابطے</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: DISTANT TARGET SPECIAL GUIDE (اگر مطلوب یا اس کا گھر دور ہو) */}
      {activeSubTab === 'distant_action_guide' && (
        <div className="bg-white border-2 border-[#bc6c25] rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-[#d4a373] pb-4">
            <div className="h-10 w-10 rounded-2xl bg-[#bc6c25] text-white flex items-center justify-center shrink-0">
              <Navigation className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-amiri text-xl font-bold text-[#5d4037]">
                قاعدۂ تسخیرِ بعید: اگر مطلوب دور ہو یا اس کا مکان میلوں دور ہو
              </h3>
              <p className="text-xs text-[#8d6e63]">
                علامہ کاش البرنی اور قدیم ویدک کتب کے مطابق فاصلے کا روحانی علاج
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#fdfaf1] border border-[#d4a373] rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-[#bc6c25] font-bold text-sm">
                <Flame className="h-4 w-4" />
                <span>۱) طریقۂ امواجِ بادی (ہوا کا راستہ)</span>
              </div>
              <p className="text-xs text-[#5d4037] leading-relaxed">
                جب مطلوب دور ہو تو بادی نقوش یا فتیلہ استعمال کیا جاتا ہے۔ نقش کو اونچے درخت یا مکان کی چھت پر لٹکایا جاتا ہے تاکہ ہوا کی حرکت سے روحانی لہریں مطلوب کے دل پر وارد ہوں۔
              </p>
            </div>

            <div className="bg-[#fdfaf1] border border-[#d4a373] rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-[#bc6c25] font-bold text-sm">
                <Compass className="h-4 w-4" />
                <span>۲) تعیینِ سمت و ارسالِ خیال (Telepathy)</span>
              </div>
              <p className="text-xs text-[#5d4037] leading-relaxed">
                عمل پڑھتے وقت مطلوب کے شہر یا ملک کی جغرافیائی سمت رخ کریں۔ منتر ختم کر کے اسی سمت میں تین بار پھونک ماریں اور تصور کو پختہ رکھیں۔
              </p>
            </div>

            <div className="bg-[#fdfaf1] border border-[#d4a373] rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-[#bc6c25] font-bold text-sm">
                <Sun className="h-4 w-4" />
                <span>۳) چراغِ نصف شب (آتشی تاثر)</span>
              </div>
              <p className="text-xs text-[#5d4037] leading-relaxed">
                رات کی خاموشی میں دیے کی لو کو مطلوب کے مکان کی سمت کر کے منتر کا جاپ کریں، یہ دور بیٹھے مطلوب کے دل میں شدید بے چینی اور رجوع کا جذبہ پیدا کرتا ہے۔
              </p>
            </div>
          </div>

          {/* Detailed Instructions Table */}
          <div className="bg-[#fefae0] border border-[#bc6c25]/40 rounded-2xl p-4 space-y-3">
            <h4 className="font-amiri font-bold text-base text-[#5d4037] flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#283618]" />
              <span>مطلوبِ بعید کے لیے اہم شرائط:</span>
            </h4>
            <ul className="text-xs text-[#5d4037] space-y-2 list-disc list-inside">
              <li><strong>نام مع والدہ:</strong> مطلوب کا اصل نام اور اس کی والدہ کا نام معلوم ہونا لازمی ہے۔ اگر والدہ کا نام معلوم نہ ہو تو "حوا" لگایا جائے گا۔</li>
              <li><strong>تصور کی پختگی:</strong> عمل کے دوران مطلوب کے چہرے کا صاف و واضح تصور دل میں موجود ہونا چاہیے۔</li>
              <li><strong>ساعت کا انتخاب:</strong> صرف سعد ساعت (مشتری یا زہرہ) میں محبت و صلح کا عمل کریں، نحس ساعت میں ہرگز نہ کریں۔</li>
            </ul>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: NAQSH USAGE GUIDE (نقش کہاں اور کس طرح استعمال میں لانا ہے) */}
      {activeSubTab === 'naqsh_usage_guide' && (
        <div className="bg-white border-2 border-[#bc6c25] rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-[#d4a373] pb-4">
            <div className="h-10 w-10 rounded-2xl bg-[#283618] text-white flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5 text-[#dda15e]" />
            </div>
            <div>
              <h3 className="font-amiri text-xl font-bold text-[#5d4037]">
                نقوش کے مقاماتِ استعمال و تراکیبِ دفن (علمِ الواح و جنتر)
              </h3>
              <p className="text-xs text-[#8d6e63]">
                نقش کو کہاں رکھنا ہے، کہاں دفن کرنا ہے اور کس عنصر کے تحت عمل میں لانا ہے
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Atashi */}
            <div className="bg-[#fff5f5] border border-red-300 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
                <Flame className="h-4 w-4 text-red-700" />
                <span>نقشِ آتشی (آگ کا عمل)</span>
              </div>
              <p className="text-xs text-[#5d4037] leading-relaxed">
                <strong>کہاں استعمال کریں:</strong> چراغ میں جلا کر، چولہے کے نیچے گرم راکھ میں دبا کر، یا انگیٹھی تلے رکھ کر۔ فوری اثر اور تڑپ کے لیے۔
              </p>
            </div>

            {/* 2. Badi */}
            <div className="bg-[#f0f9ff] border border-blue-300 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <Compass className="h-4 w-4 text-blue-700" />
                <span>نقشِ بادی (ہوا کا عمل)</span>
              </div>
              <p className="text-xs text-[#5d4037] leading-relaxed">
                <strong>کہاں استعمال کریں:</strong> اونچے درخت کی ٹہنی پر، چھت کے کونے پر یا پنکھے کی پتی پر باندھیں تاکہ ہوا کے ساتھ حرکت کرے۔
              </p>
            </div>

            {/* 3. Aabi */}
            <div className="bg-[#f0fdf4] border border-green-300 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-green-900 font-bold text-sm">
                <Moon className="h-4 w-4 text-green-700" />
                <span>نقشِ آبی (پانی کا عمل)</span>
              </div>
              <p className="text-xs text-[#5d4037] leading-relaxed">
                <strong>کہاں استعمال کریں:</strong> صاف پانی میں گھول کر مریض یا مطلوب کو پلائیں، یا بہتی نہر/دریا کے کنارے پاک پانی میں بہائیں۔
              </p>
            </div>

            {/* 4. Khaki */}
            <div className="bg-[#fdfaf1] border border-[#d4a373] rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-[#5d4037] font-bold text-sm">
                <MapPin className="h-4 w-4 text-[#bc6c25]" />
                <span>نقشِ خاکی (مٹی کا عمل)</span>
              </div>
              <p className="text-xs text-[#5d4037] leading-relaxed">
                <strong>کہاں استعمال کریں:</strong> مطلوب کی دہلیز تلے، راستے میں جہاں سے وہ گزرے، گملے کی پاک مٹی میں، یا پرانی ویران جگہ پر۔
              </p>
            </div>

          </div>

          <div className="bg-[#f9f4e8] border border-[#d4a373] rounded-2xl p-4 space-y-2">
            <h4 className="font-amiri font-bold text-sm text-[#5d4037]">
              خصوصی احتیاط برائے نقوش:
            </h4>
            <p className="text-xs text-[#7f5539] leading-relaxed">
              نقش لکھتے وقت ہمیشہ باوضو رہیں، لکیریں سیدھی کھینچیں اور اعداد کو ان کی مقررہ چال (آتشی، بادی، آبی، خاکی) کے مطابق خانوں میں درج کریں۔ نقش پر تھوڑا سا عطر یا خوشبو لگانا اس کے موکلات کو متحرک کرتا ہے۔
            </p>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: JAPA COUNTER */}
      {activeSubTab === 'japa_counter' && (
        <div className="bg-white border-2 border-[#bc6c25] rounded-3xl p-6 shadow-xl space-y-6 max-w-2xl mx-auto text-center">
          <div className="h-14 w-14 mx-auto rounded-3xl bg-[#bc6c25] text-white flex items-center justify-center shadow-lg">
            <Zap className="h-7 w-7" />
          </div>

          <h3 className="font-amiri text-2xl font-bold text-[#5d4037]">
            ڈیجیٹل منتر و جفری اوراد کاؤنٹر
          </h3>

          <p className="text-xs text-[#8d6e63]">
            منتر کے دوران تسبیح کا تسلسل برقرار رکھنے کے لیے ڈیجیٹل کاؤنٹر استعمال کریں۔
          </p>

          <div className="bg-[#fdfaf1] border-2 border-[#d4a373] rounded-3xl p-8 space-y-4">
            <div className="text-6xl font-mono font-bold text-[#bc6c25]">
              {japaCount}
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs text-[#8d6e63]">ہدف:</span>
              <select
                value={japaTarget}
                onChange={(e) => setJapaTarget(Number(e.target.value))}
                className="bg-white border border-[#d4a373] rounded-xl px-3 py-1 text-xs font-bold text-[#5d4037]"
              >
                <option value={21}>۲۱ بار</option>
                <option value={41}>۴۱ بار</option>
                <option value={108}>۱۰۸ بار (ویدک مالا)</option>
                <option value={313}>۳۱۳ بار (اصحابِ بدر)</option>
                <option value={1000}>۱۰۰۰ بار</option>
              </select>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#faedcd] rounded-full h-3 overflow-hidden">
              <div 
                className="bg-[#bc6c25] h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (japaCount / japaTarget) * 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setJapaCount((prev) => prev + 1)}
                className="bg-gradient-to-r from-[#bc6c25] to-[#8c4a16] hover:from-[#a2591d] hover:to-[#743c10] text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all cursor-pointer transform hover:scale-105 active:scale-95"
              >
                ورد کریں (+۱)
              </button>

              <button
                onClick={() => setJapaCount(0)}
                className="bg-[#faedcd] hover:bg-[#dda15e] text-[#5d4037] px-4 py-4 rounded-2xl text-xs font-bold transition-all cursor-pointer"
                title="دوبارہ صفر کریں"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: SHARIA ETHICS */}
      {activeSubTab === 'sharia_ethics' && (
        <div className="bg-white border-2 border-[#283618] rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-green-200 pb-4">
            <div className="h-10 w-10 rounded-2xl bg-[#283618] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5 text-[#dda15e]" />
            </div>
            <div>
              <h3 className="font-amiri text-xl font-bold text-[#283618]">
                شرعی ضوابط و اخلاقی حدود برائے عملیات و منترات
              </h3>
              <p className="text-xs text-[#8d6e63]">
                شریعتِ اسلامی میں منترات و نقوش کے استعمال کی جائز و ناجائز صورتیں
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-[#5d4037] leading-relaxed">
            
            {/* Direct User Mandated Disclaimer */}
            <div className="bg-[#2c150e] border-2 border-red-500 rounded-2xl p-4 sm:p-5 text-[#fefae0] space-y-2 shadow-lg">
              <h4 className="font-amiri font-bold text-red-300 text-sm sm:text-base flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <span>انتباہ و عدمِ ذمہ داری کا شرعی اعلان:</span>
              </h4>
              <p className="font-amiri text-sm sm:text-base leading-relaxed text-[#faedcd] font-bold">
                اس ایپ میں موجود ہر قسم کے اعمال، نقوش، اوراد اور منترات کے نفع و نقصان یا اچھے اور برے استعمال کا ذمہ دار صاحبِ ایپ (بنانے والے) پر نہیں ہے۔ اچھے اور برے استعمال کا ذمہ دار عمل کرنے والا خود ہے اور وہ روزِ قیامت اللہ رب العزت کو خود جوابدہ ہے۔ صاحبِ ایپ پر اس کا کوئی گناہ نہیں ہے، اور نہ ہی کسی ناجائز مقصد کے لیے ان کی طرف سے اجازت ہے۔ البتہ صحیح، شرعی اور جائز مقاصد کے لیے اجازتِ عام ہے۔
              </p>
            </div>

            <div className="bg-[#f0fdf4] border border-green-300 rounded-2xl p-4 space-y-2">
              <h4 className="font-bold text-green-900 text-sm flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-700" />
                <span>جائز استعمال کی شرائط:</span>
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>کلمات میں کوئی صریح شرکیہ یا کفریہ عقیدہ شامل نہ ہو۔</li>
                <li>مقصد نیک اور حلال ہو (مثلاً: میاں بیوی کی صلح، سحر و آسیب کا علاج، رزقِ حلال، حفاظتِ جان و مال)۔</li>
                <li>مکمل یقین اللہ تعالیٰ کی ذات اور اس کے اذن پر ہو، کلمات کو مستقل بالذات مؤثر نہ مانا جائے۔</li>
              </ul>
            </div>

            <div className="bg-[#fef2f2] border border-red-300 rounded-2xl p-4 space-y-2">
              <h4 className="font-bold text-red-900 text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-700" />
                <span>سخت حرام و ناجائز صورتیں:</span>
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>کسی بے گناہ انسان کو نقصان پہنچانا یا ہلاک کرنا۔</li>
                <li>دو میاں بیوی یا رشتہ داروں کے درمیان بلاوجہ تفریق و جدائی ڈالنا۔</li>
                <li>ناجائز محبت یا فسق و فجور کے لیے تسخیر کے اعمال کرنا۔</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 0: MAIN CATALOG (LIST OF TALISMAT & MANTRAS) */}
      {activeSubTab === 'catalog' && (
        <div className="space-y-6">
          
          {/* Filters & Search */}
          <div className="bg-white border-2 border-[#d4a373] rounded-3xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="absolute right-3 top-3 h-4 w-4 text-[#bc6c25]" />
              <input
                type="text"
                placeholder="منتر، ترکیب یا مقصد تلاش کریں..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#fdfaf1] border border-[#d4a373] rounded-xl pr-9 pl-3 py-2 text-xs text-[#2c1e14] placeholder-[#8d6e63] focus:outline-none focus:ring-2 focus:ring-[#bc6c25]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-[#bc6c25] text-white'
                    : 'bg-[#faedcd] text-[#5d4037] hover:bg-[#dda15e]'
                }`}
              >
                تمام اعمال ({items.length})
              </button>
              
              <button
                onClick={() => setSelectedCategory('distant_target')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === 'distant_target'
                    ? 'bg-[#283618] text-white'
                    : 'bg-[#faedcd] text-[#5d4037] hover:bg-[#dda15e]'
                }`}
              >
                🎯 مطلوبِ بعید (دور کا گھر)
              </button>

              <button
                onClick={() => setSelectedCategory('jinn_churail_vedic')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === 'jinn_churail_vedic'
                    ? 'bg-red-800 text-white'
                    : 'bg-[#faedcd] text-[#5d4037] hover:bg-[#dda15e]'
                }`}
              >
                🔥 جن و چڑیل اخراج
              </button>

              <button
                onClick={() => setSelectedCategory('naqsh_tantra_rules')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === 'naqsh_tantra_rules'
                    ? 'bg-[#bc6c25] text-white'
                    : 'bg-[#faedcd] text-[#5d4037] hover:bg-[#dda15e]'
                }`}
              >
                📜 نقوش و مقاماتِ دفن
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border-2 border-[#bc6c25] rounded-3xl p-5 shadow-md hover:shadow-xl transition-all space-y-4 relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[11px] font-bold bg-[#faedcd] text-[#bc6c25] px-2.5 py-0.5 rounded-full border border-[#dda15e]/50">
                      {item.type}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-green-100 text-green-900 border border-green-300">
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

                  {/* HINDI SCRIPT, URDU TRANSLITERATION & URDU MEANING */}
                  <div className="bg-[#fdfaf1] border border-[#d4a373] rounded-2xl p-3.5 space-y-2.5">
                    
                    {/* Hindi Script */}
                    <div>
                      <span className="text-[10px] text-[#8d6e63] font-bold flex items-center gap-1">
                        <Languages className="h-3 w-3 text-[#bc6c25]" />
                        <span>اصل ہندی ویدک کلمات (Mantra Script):</span>
                      </span>
                      <p className="text-xs font-serif text-[#2c1e14] bg-white p-2 rounded-xl border border-[#faedcd] mt-1 select-all font-semibold" dir="ltr">
                        {item.hindiScript}
                      </p>
                    </div>

                    {/* Urdu Transliteration */}
                    <div>
                      <span className="text-[10px] text-[#bc6c25] font-bold">
                        اردو تلفظ و درست ادائیگی:
                      </span>
                      <p className="font-amiri text-base font-bold text-[#5d4037] bg-[#faedcd]/60 p-2 rounded-xl border border-[#d4a373] mt-1 leading-relaxed">
                        {item.urduTransliteration}
                      </p>
                    </div>

                    {/* Urdu Meaning */}
                    <div>
                      <span className="text-[10px] text-[#283618] font-bold">
                        مکمل اردو ترجمہ و لغوی مفہوم:
                      </span>
                      <p className="text-xs text-[#283618] bg-green-50/80 p-2 rounded-xl border border-green-200 mt-1 leading-relaxed italic">
                        {item.urduMeaning}
                      </p>
                    </div>

                  </div>

                  {/* DISTANT TARGET SPECIAL RULE & NAQSH PLACEMENT */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="bg-[#fefae0] border border-[#bc6c25]/30 rounded-xl p-2.5">
                      <span className="font-bold text-[#bc6c25] flex items-center gap-1 text-[11px]">
                        <Navigation className="h-3 w-3" />
                        <span>اگر مطلوب دور ہو تو طریقہ:</span>
                      </span>
                      <p className="text-[11px] text-[#5d4037] mt-1 leading-relaxed">
                        {item.targetDistanceRule}
                      </p>
                    </div>

                    <div className="bg-[#fefae0] border border-[#bc6c25]/30 rounded-xl p-2.5">
                      <span className="font-bold text-[#283618] flex items-center gap-1 text-[11px]">
                        <MapPin className="h-3 w-3" />
                        <span>نقش کا مقام و استعمال:</span>
                      </span>
                      <p className="text-[11px] text-[#5d4037] mt-1 leading-relaxed">
                        {item.naqshPlacementPlace}
                      </p>
                    </div>
                  </div>

                  {/* Requirements & Timing */}
                  <div className="flex flex-wrap gap-2 text-[11px] text-[#7f5539]">
                    <span className="bg-[#fdfaf1] px-2 py-1 rounded-lg border border-[#e7d8c9]">
                      ⏰ <strong>ساعت:</strong> {item.saatTime}
                    </span>
                    <span className="bg-[#fdfaf1] px-2 py-1 rounded-lg border border-[#e7d8c9]">
                      🧭 <strong>سمت:</strong> {item.direction}
                    </span>
                    <span className="bg-[#fdfaf1] px-2 py-1 rounded-lg border border-[#e7d8c9]">
                      🔢 <strong>تعداد ورد:</strong> {item.targetRepetitions} بار
                    </span>
                  </div>

                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-[#e7d8c9] flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopy(item.urduTransliteration, item.id)}
                    className="flex items-center gap-1 bg-[#faedcd] hover:bg-[#dda15e] text-[#5d4037] px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    {copiedText === item.id ? <Check className="h-3.5 w-3.5 text-green-700" /> : <Copy className="h-3.5 w-3.5 text-[#bc6c25]" />}
                    <span>{copiedText === item.id ? 'کاپی ہو گیا' : 'منتر کاپی کریں'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setJapaTarget(item.targetRepetitions);
                      setJapaCount(0);
                      setActiveSubTab('japa_counter');
                    }}
                    className="flex items-center gap-1 bg-[#bc6c25] hover:bg-[#a2591d] text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    <Zap className="h-3.5 w-3.5" />
                    <span>کاؤنٹر پر پڑھیں</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
