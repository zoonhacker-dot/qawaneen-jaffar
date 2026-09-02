// -------------------------------------------------------------
// Traditional Dream Symbols & Interpretation Database
// According to Kash Al-Barni's Treatises (رموز الجفر، مفتاح الجفر، قوانین طلسم و اشاراتِ منامیہ)
// For Post-Istikhara and Post-Spiritual Practice (Wazaif / Takseer / Riyazat) Insights
// -------------------------------------------------------------

import { 
  DreamSymbolItem, 
  DreamCategory, 
  DreamAnalysisResult, 
  ElementType 
} from '../types';

export const DREAM_CATEGORIES: { id: DreamCategory; labelUrdu: string; icon: string }[] = [
  { id: 'spiritual_holy', labelUrdu: 'مقدس و نوری اشارات (انبیاء، کعبہ، کتب)', icon: '✨' },
  { id: 'celestial_nature', labelUrdu: 'اجرامِ فلکی و عناصر (شمس، قمر، باراں)', icon: '🌙' },
  { id: 'fauna_animals', labelUrdu: 'حیوانات و طیور (شیر، گھوڑا، کبوتر)', icon: '🦅' },
  { id: 'wealth_objects', labelUrdu: 'اشیاء، خزائن و لباس (سونا، کلید، چراغ)', icon: '🗝️' },
  { id: 'states_actions', labelUrdu: 'احوال و افعال (پرواز، تیراکی، گرنا)', icon: '🕊️' },
];

export const KASH_AL_BARNI_DREAM_DATABASE: DreamSymbolItem[] = [
  // 1. Holy & Spiritual (مقدس و نوری اشارات)
  {
    id: 'symbol-kaaba',
    nameUrdu: 'کعبۃ اللہ شریف / طواف و زیارت',
    nameEnglish: 'Holy Kaaba / Tawaf',
    category: 'spiritual_holy',
    categoryUrdu: 'مقدس و نوری اشارات',
    keywords: ['کعبہ', 'حرم', 'طواف', 'مکہ', 'حج', 'عمرہ', 'بیت اللہ', 'حجر اسود', 'kaaba', 'hajj'],
    signalType: 'khair_azheem',
    signalUrdu: 'بشارتِ کبریٰ و نصرتِ الٰہی',
    primaryInterpretation: 'حصولِ امن و امان، رفعِ درجات، استجابتِ کلی برائے دعائیں اور بلندیٔ مراتب۔',
    istikharaImplication: 'استخارے میں کعبہ دیکھنا اس بات کی حتمی دلیل ہے کہ مقصود میں بے پناہ برکت و خیر پوشیدہ ہے، بلا جھجھک اقدام فرمائیں۔',
    spiritualPracticeContext: 'وظیفہ و تکسیر کی قبولیت اور روحانی رجوع کی علامت ہے۔ ارواحِ طیبہ کی تائید حاصل ہے۔',
    element: 'water',
    elementUrdu: 'آبی (رحمت و صفائی)',
    kashAlBarniReference: 'کاش البرنی (مفتاح الجفر، باب اشاراتِ منامیہ): کعبہ دیکھنا تسخیرِ مہمات کی کامل دلیل ہے۔',
    recommendedAction: 'شکرانے کے دو نفل ادا کریں اور مساکین کو شیرینی کھلائیں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '🕋',
  },
  {
    id: 'symbol-quran',
    nameUrdu: 'قرآنِ مجید / تلاوت یا مصحف شریف',
    nameEnglish: 'Holy Quran / Recitation',
    category: 'spiritual_holy',
    categoryUrdu: 'مقدس و نوری اشارات',
    keywords: ['قرآن', 'تلاوت', 'مصحف', 'آیت', 'سورہ', 'قاری', 'quran', 'tilawat'],
    signalType: 'khair_azheem',
    signalUrdu: 'ہدایت، حکمت و فتحِ مبین',
    primaryInterpretation: 'علم و حکمت، فہم و فراست، حق پر استقامت اور معاملات میں انصاف و کامرانی۔',
    istikharaImplication: 'شادی یا کاروبار میں یہ معاملہ حق و دیانت داری پر مبنی ہوگا اور فریقین کے لیے باعثِ سعادت رہے گا۔',
    spiritualPracticeContext: 'نورِ باطن اور ذکر کے کلمات کا اثر پذیر ہونا۔ استقامت اختیار رکھیں۔',
    element: 'fire',
    elementUrdu: 'نوری و آتشی (جلال و حق)',
    kashAlBarniReference: 'کاش البرنی (رموز الجفر): قرآن دیکھنا کام میں غیبی فتح اور صداقت کی نشانی ہے۔',
    recommendedAction: 'روزانہ سورہ یٰسین یا سورہ فتح کی تلاوت کا اہتمام فرمائیں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '📖',
  },
  {
    id: 'symbol-adhan-namaz',
    nameUrdu: 'اذان سننا یا باجماعت نماز پڑھنا',
    nameEnglish: 'Adhan / Congregational Prayer',
    category: 'spiritual_holy',
    categoryUrdu: 'مقدس و نوری اشارات',
    keywords: ['اذان', 'نماز', 'سجدہ', 'مسجد', 'رکوع', 'امامت', 'صف', 'adhan', 'namaz', 'prayer'],
    signalType: 'falah_o_barkat',
    signalUrdu: 'نیک شگون و نجات از غم',
    primaryInterpretation: 'عزت و وجاہت، عہد کی پاسداری، خطرات سے پناہ اور کاموں کا وقت پر پایۂ تکمیل تک پہنچنا۔',
    istikharaImplication: 'کام کے اندر نظام، وقت کی پابندی اور کامیابی کا مژدہ ہے۔ رشتہ یا سفر نہایت بابرکت ثابت ہوگا۔',
    spiritualPracticeContext: 'موکلاتِ علوی کی جانب سے سلامتی اور تسخیر کی خوشخبری۔',
    element: 'air',
    elementUrdu: 'بادی (پیغام و نشرِ خیر)',
    kashAlBarniReference: 'کاش البرنی (قوانین طلسم): سجدہ یا نماز دیکھنا مقصد کے حل ہونے کا بلاواسطہ عندیہ ہے۔',
    recommendedAction: 'صلوٰۃ الحاجت کے چار رکعات ادا کریں اور درودِ ابراہیمی کا ورد رکھیں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '🕌',
  },
  {
    id: 'symbol-zamzam-water',
    nameUrdu: 'آبِ زمزم پینا یا پاکیزہ چشمہ',
    nameEnglish: 'Drinking Zamzam / Pure Spring',
    category: 'spiritual_holy',
    categoryUrdu: 'مقدس و نوری اشارات',
    keywords: ['زمزم', 'آب زمزم', 'پاک پانی', 'چشمہ', 'شربت', 'کوثر', 'نہر', 'zamzam', 'water'],
    signalType: 'hifazat_o_shifa',
    signalUrdu: 'شفائے امراض و پاکیزگیٔ رزق',
    primaryInterpretation: 'ہر ظاہری و باطنی بیماری سے نجات، حلال و کشادہ رزق، اور الجھے ہوئے معاملات کی صفائی۔',
    istikharaImplication: 'اگر بیماری یا پریشانی کی غرض سے استخارہ تھا تو یقینی شفا و کشائش ہوگی۔',
    spiritualPracticeContext: 'روحانی عمل کی تاثیر خون اور روح میں جاری ہو چکی ہے۔ عمل مکمل کریں۔',
    element: 'water',
    elementUrdu: 'آبی (حیات و شفا)',
    kashAlBarniReference: 'کاش البرنی (مفتاح الجفر): آبِ پاک پینا حاجت روائی اور فتنوں سے امان ہے۔',
    recommendedAction: 'صبح نہار منہ پانی پر سورہ فاتحہ دم کر کے پئیں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '💧',
  },
  {
    id: 'symbol-light-nur',
    nameUrdu: 'روشن نور، مشعل یا سفید چمک',
    nameEnglish: 'Radiant Light / Pure White Radiance',
    category: 'spiritual_holy',
    categoryUrdu: 'مقدس و نوری اشارات',
    keywords: ['نور', 'روشنی', 'اجالا', 'چمک', 'سفید روشنی', 'شعاع', 'nur', 'light', 'glow'],
    signalType: 'khair_azheem',
    signalUrdu: 'تنویرِ قلب و کشفِ حقائق',
    primaryInterpretation: 'تاریکیوں کا خاتمہ، شبہات کا دور ہونا، حق کا غالب آنا اور باطنی بصیرت کا بیدار ہونا۔',
    istikharaImplication: 'جس بات میں شکوک و شبہات تھے وہ یکسر ختم ہو جائیں گے اور حقیقت کھل کر سامنے آئے گی۔',
    spiritualPracticeContext: 'تکسیر کے اعداد میں نوری عناصر کا غلبہ، مقصد میں کامیابی نزدیک ہے۔',
    element: 'fire',
    elementUrdu: 'نوری (سعدِ اعظم)',
    kashAlBarniReference: 'کاش البرنی (رموز الجفر): نور دیکھنا اسرارِ غیب کے انکشاف کی علامت ہے۔',
    recommendedAction: 'اسمائے الٰہی "یا نور یا ہادی یا بصیر" کا 100 مرتبہ ورد فرمائیں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '✨',
  },

  // 2. Celestial & Nature (اجرامِ فلکی و عناصر)
  {
    id: 'symbol-full-moon',
    nameUrdu: 'ماہِ کامل (چودھویں کا چاند) یا ہلال',
    nameEnglish: 'Full Moon / Crescent',
    category: 'celestial_nature',
    categoryUrdu: 'اجرامِ فلکی و عناصر',
    keywords: ['چاند', 'ماہ کامل', 'ہلال', 'قمری', 'بدر', 'چودھویں کا چاند', 'moon', 'crescent'],
    signalType: 'falah_o_barkat',
    signalUrdu: 'حسن، عروج و تکمیلِ مراد',
    primaryInterpretation: 'حسین و باکردار شریکِ حیات، کاروبار کا عروج، اور منصوبے کا پایۂ تکمیل تک پہنچنا۔',
    istikharaImplication: 'شادی و محبت کے استخارے میں بے نظیر خیر و الفت ہے۔ شراکت میں دونوں فریق مطمئن رہیں گے۔',
    spiritualPracticeContext: 'عملِ تکسیر قمری سعد ساعت میں اپنا مکمل کمال ظاہر کر چکا ہے۔',
    element: 'water',
    elementUrdu: 'آبی (جمالی)',
    kashAlBarniReference: 'کاش البرنی (قوانین طلسم): ماہِ منور دیکھنا محبت، رشتہ اور وسعتِ رزق کی اعلیٰ نشانی ہے۔',
    recommendedAction: 'سفید چیز (مثلاً دودھ یا چاول) کا صدقہ نکالیں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '🌕',
  },
  {
    id: 'symbol-bright-sun',
    nameUrdu: 'چمکتا سورج یا طلوعِ آفتاب',
    nameEnglish: 'Radiant Sun / Sunrise',
    category: 'celestial_nature',
    categoryUrdu: 'اجرامِ فلکی و عناصر',
    keywords: ['سورج', 'آفتاب', 'طلوع', 'شمس', 'مہر', 'صبح کا سورج', 'sun', 'sunrise'],
    signalType: 'khair_azheem',
    signalUrdu: 'غلبہ، حاکمیت، شہرت و عزت',
    primaryInterpretation: 'حکومتی و قانونی امور میں فتح، بلند عہدہ، معاشرے میں وقار اور رکاوٹوں کا پگھل جانا۔',
    istikharaImplication: 'نوکری، الیکشن، قانونی تنازع یا تجارتی معاہدے میں فتحِ مبین کا اشارہ ہے۔',
    spiritualPracticeContext: 'ساعتِ شمس کی برکت، ریاضت میں قوتِ حاکمہ کا ظہور۔',
    element: 'fire',
    elementUrdu: 'آتشی (حاکم)',
    kashAlBarniReference: 'کاش البرنی (مفتاح الجفر): طلوعِ شمس خواب میں دیکھنا جملہ پریشانیوں کا زوال ہے۔',
    recommendedAction: 'طلوعِ آفتاب کے وقت پرندوں کو دانہ ڈالیں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '☀️',
  },
  {
    id: 'symbol-gentle-rain',
    nameUrdu: 'رحمت کی دھیمی بارش و سبزہ',
    nameEnglish: 'Gentle Blessed Rain / Greenery',
    category: 'celestial_nature',
    categoryUrdu: 'اجرامِ فلکی و عناصر',
    keywords: ['بارش', 'باراں', 'پھوار', 'ابر رحمت', 'سبزہ', 'باغ', 'rain', 'greenery', 'garden'],
    signalType: 'falah_o_barkat',
    signalUrdu: 'فراخیٔ رزق و دعاؤں کی قبولیت',
    primaryInterpretation: 'خشک سالی و تنگی کا خاتمہ، رزق میں غیر متوقع برکت اور دلوں کی کدورتوں کا دھل جانا۔',
    istikharaImplication: 'سودا یا رشتہ باعثِ خوشحالی ہوگا۔ تنگیٔ معاش سے نجات ملے گی۔',
    spiritualPracticeContext: 'وظیفے کا فیضان بارش کی طرح برسنے والا ہے، شکر بجا لائیں۔',
    element: 'water',
    elementUrdu: 'آبی (رحمت)',
    kashAlBarniReference: 'کاش البرنی (رموز الجفر): بارش بغیر طوفان کے دیکھنا عامۃ الناس کے لیے وسعت کا پیغام ہے۔',
    recommendedAction: 'غریب ضرورت مندوں کو کھانا کھلائیں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '🌧️',
  },
  {
    id: 'symbol-storm-darkclouds',
    nameUrdu: 'سیاہ طوفان، گرد آلود آندھی یا سیلاب',
    nameEnglish: 'Dark Storm / Gale / Violent Flood',
    category: 'celestial_nature',
    categoryUrdu: 'اجرامِ فلکی و عناصر',
    keywords: ['طوفان', 'سیلاب', 'آندھی', 'سیاہ بادل', 'گرد', 'زلزلہ', 'storm', 'flood', 'tornado'],
    signalType: 'khatra_o_dawa',
    signalUrdu: 'تنبیہِ فتنہ، آزمائش و احتیاط',
    primaryInterpretation: 'معاملات میں اضطراب، جلد بازی کی صورت میں نقصان، یا حاسدین کی سازش۔',
    istikharaImplication: 'استخارہ منفی ہے یا فی الحال اس کام کو مؤخر کرنے کا سخت اشارہ ہے۔ فوری اقدام سے گریز کریں۔',
    spiritualPracticeContext: 'وظیفے میں رجعت یا نیت میں خلل سے بچنے کے لیے حصار و صدقہ لازم ہے۔',
    element: 'air',
    elementUrdu: 'بادی و خاکی (اضطراب)',
    kashAlBarniReference: 'کاش البرنی (قوانین طلسم): سیاہ طوفان یا سیلاب دیکھنا کام میں رکاوٹ اور توقف کی دلیل ہے۔',
    recommendedAction: 'سرخ گوشت یا تیل کا صدقہ دیں اور آیت الکرسی 70 مرتبہ پڑھ کر دم کریں۔',
    istikharaVerdict: 'unfavorable_caution',
    iconEmoji: '🌪️',
  },
  {
    id: 'symbol-high-mountain',
    nameUrdu: 'بلند سرسبز پہاڑ پر چڑھنا',
    nameEnglish: 'Climbing a High Majestic Mountain',
    category: 'celestial_nature',
    categoryUrdu: 'اجرامِ فلکی و عناصر',
    keywords: ['پہاڑ', 'چوٹی', 'بلندی', 'کوہ', 'چڑھائی', 'mountain', 'climb', 'peak'],
    signalType: 'khair_azheem',
    signalUrdu: 'حصولِ مقصد مع محنت و استقامت',
    primaryInterpretation: 'بڑے مرتبے پر فائز ہونا، کسی طاقتور سرپرست کی تائید، اور سخت مہم میں کامیابی۔',
    istikharaImplication: 'کام میں محنت ضرور درکار ہوگی مگر انجام نہایت شاندار اور دائمی ہوگا۔',
    spiritualPracticeContext: 'ریاضت کے سخت مراحل کامیابی سے طے پا رہے ہیں۔ ہمت نہ ہاریں۔',
    element: 'earth',
    elementUrdu: 'خاکی (ثبات و بلندی)',
    kashAlBarniReference: 'کاش البرنی (مفتاح الجفر): پہاڑ کی چوٹی پر پہنچنا مراد برآری کی دلیل ہے۔',
    recommendedAction: 'اسمِ اعظم "یا علی یا عظیم" کا ورد کریں۔',
    istikharaVerdict: 'favorable',
    iconEmoji: '⛰️',
  },

  // 3. Fauna & Animals (حیوانات و طیور)
  {
    id: 'symbol-white-pigeon',
    nameUrdu: 'سفید کبوتر، فاختہ یا پرندے کا ہاتھ پر بیٹھنا',
    nameEnglish: 'White Pigeon / Dove / Bird in Hand',
    category: 'fauna_animals',
    categoryUrdu: 'حیوانات و طیور',
    keywords: ['کبوتر', 'فاختہ', 'سفید پرندہ', 'طوطا', 'چڑیا', 'پرندہ', 'dove', 'pigeon', 'bird'],
    signalType: 'falah_o_barkat',
    signalUrdu: 'پیغامِ مسرت، صلح و وفاداری',
    primaryInterpretation: 'خوشخبری، مسرت انگیز پیغام، مخلص دوست اور ازدواجی زندگی میں الفت و سکون۔',
    istikharaImplication: 'رشتہ انتہائی موزوں ہے، باہمی محبت اور وفاداری رہے گی۔ پردیس سے اچھی خبر آئے گی۔',
    spiritualPracticeContext: 'موکل کی تائید اور دل کو اطمینان کی دولت ملنا۔',
    element: 'air',
    elementUrdu: 'بادی (پیغام و الفت)',
    kashAlBarniReference: 'کاش البرنی (رموز الجفر): کبوتر دیکھنا خوشخبری اور صلح و امن کا پکا اشارہ ہے۔',
    recommendedAction: 'پرندوں کو باجرہ اور پانی ڈالیں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '🕊️',
  },
  {
    id: 'symbol-majestic-horse',
    nameUrdu: 'سفید یا عربی گھوڑا سواری کرنا',
    nameEnglish: 'Riding a Noble Arabian / White Horse',
    category: 'fauna_animals',
    categoryUrdu: 'حیوانات و طیور',
    keywords: ['گھوڑا', 'شہسواری', 'سمند', 'فرس', 'اصیل گھوڑا', 'horse', 'riding', 'steed'],
    signalType: 'khair_azheem',
    signalUrdu: 'عزت، شجاعت، سفرِ پرنفع و فتح',
    primaryInterpretation: 'مراد کا تیزی سے پورا ہونا، معزز بننا، سفر میں فراخی اور دشمن پر برتری۔',
    istikharaImplication: 'کاروبار یا سفر کے استخارے میں بے پناہ برکت اور تیز رفتار ترقی کی دلیل ہے۔',
    spiritualPracticeContext: 'عمل میں قوت اور ارادے کی پختگی کا ثبوت۔',
    element: 'fire',
    elementUrdu: 'آتشی (قوت و سرعت)',
    kashAlBarniReference: 'کاش البرنی (قوانین طلسم): گھوڑے کی سواری دیکھنا سرعتِ تاثیر اور غلبے کی دلیل ہے۔',
    recommendedAction: 'مساکین کو مالی مدد دیں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '🐎',
  },
  {
    id: 'symbol-roaring-lion',
    nameUrdu: 'مطیع شیر دیکھنا یا شیر پر قابو پانا',
    nameEnglish: 'Lion (Subdued or Controlled)',
    category: 'fauna_animals',
    categoryUrdu: 'حیوانات و طیور',
    keywords: ['شیر', 'ببر شیر', 'اسد', 'درندہ', 'lion', 'beast'],
    signalType: 'khair_azheem',
    signalUrdu: 'تسخیرِ حکام و فتح بر اعداء',
    primaryInterpretation: 'بڑے افسران یا حکام کی توجہ، سخت حریف پر غلبہ اور باوقار رعب و دبدبہ۔',
    istikharaImplication: 'اگر کسی مقابلے یا قانونی مسئلے میں ہیں تو فتح آپ کی ہوگی۔',
    spiritualPracticeContext: 'جلالی عمل کی کامیابی اور ہیبتِ روحانی۔',
    element: 'fire',
    elementUrdu: 'آتشی (جلالی)',
    kashAlBarniReference: 'کاش البرنی (مفتاح الجفر): شیر پر قابو پانا مخالفین کی زبان بندی کی دلیل ہے۔',
    recommendedAction: 'یا قوی یا عزیز کا 111 مرتبہ ورد کریں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '🦁',
  },
  {
    id: 'symbol-snake-scorpio',
    nameUrdu: 'سیاہ سانپ، بچھو یا ڈسنے کا خطرہ',
    nameEnglish: 'Black Snake / Scorpion / Sting',
    category: 'fauna_animals',
    categoryUrdu: 'حیوانات و طیور',
    keywords: ['سانپ', 'بچھو', 'مار', 'عقرب', 'ڈسنا', 'زہر', 'snake', 'scorpion', 'reptile'],
    signalType: 'khatra_o_dawa',
    signalUrdu: 'حاسد، منافق دشمن یا سحر کا خطرہ',
    primaryInterpretation: 'قریبی رشتے داروں یا ساتھیوں میں منافقت، نظرِ بد یا بدخواہ دشمن کی گھات۔',
    istikharaImplication: 'استخارہ منفی ہے، اس رشتے یا شراکت میں دھوکہ یا بعد میں تلخی کا سخت اندیشہ ہے۔',
    spiritualPracticeContext: 'حفاظتی حصار مضبوط کریں اور ریاضت کے دوران کسی پر ظاہر نہ کریں۔',
    element: 'earth',
    elementUrdu: 'خاکی و سمّی (نحس)',
    kashAlBarniReference: 'کاش البرنی (رموز الجفر): سانپ دیکھنا پوشیدہ دشمن کی علامت ہے، استخارہ ترک کا مشورہ دیتا ہے۔',
    recommendedAction: 'سیاہ ماش یا تیل کا صدقہ دیں اور منزل شریف پڑھ کر دم کریں۔',
    istikharaVerdict: 'unfavorable_caution',
    iconEmoji: '🐍',
  },
  {
    id: 'symbol-fresh-fish',
    nameUrdu: 'صاف پانی میں زندہ مچھلی پکڑنا',
    nameEnglish: 'Catching Fresh Fish in Clear Water',
    category: 'fauna_animals',
    categoryUrdu: 'حیوانات و طیور',
    keywords: ['مچھلی', 'حوت', 'شکار', 'مچھلیاں', 'سمندری شکار', 'fish', 'aquatic'],
    signalType: 'falah_o_barkat',
    signalUrdu: 'رزقِ حلال، وسعت و اولادِ صالح',
    primaryInterpretation: 'بغیر مشقت کے کثیر دولت ملنا، نفع بخش کاروبار، اور خوشحالی۔',
    istikharaImplication: 'تجارت اور روزگار کے لیے نہایت مبارک شگون ہے۔ سرمایہ کاری سودمند رہے گی۔',
    spiritualPracticeContext: 'تکسیرِ رزق کا عمل بارآور ہو رہا ہے۔',
    element: 'water',
    elementUrdu: 'آبی (رزق و برکت)',
    kashAlBarniReference: 'کاش البرنی (مفتاح الجفر): زندہ مچھلی دیکھنا غیبی رزق اور برکت کی نشانی ہے۔',
    recommendedAction: 'یا رزاق یا فتاح کا ورد رکھیں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '🐟',
  },

  // 4. Wealth, Objects & Attire (اشیاء، خزائن و لباس)
  {
    id: 'symbol-golden-key',
    nameUrdu: 'سونے یا چاندی کی چابی (کلید) پانا',
    nameEnglish: 'Golden / Silver Key (Finding Keys)',
    category: 'wealth_objects',
    categoryUrdu: 'اشیاء، خزائن و لباس',
    keywords: ['چابی', 'کلید', 'تالا کھولنا', 'خزانہ', 'مفتاح', 'key', 'lock', 'treasure'],
    signalType: 'khair_azheem',
    signalUrdu: 'کشادگیٔ امور و کشفِ مغلقات',
    primaryInterpretation: 'بند دروازوں کا کھلنا، برسوں پرانے مسئلے کا آسان حل اور مشکلات کا کافور ہونا۔',
    istikharaImplication: 'جس مشکل معاملے میں استخارہ کیا تھا، اس کا حل نکل آیا ہے، فوراً آگے بڑھیں۔',
    spiritualPracticeContext: 'علم الجفر اور اسمِ اعظم کے دروازے وا ہو رہے ہیں۔',
    element: 'earth',
    elementUrdu: 'خاکی و فلزی (ثبات)',
    kashAlBarniReference: 'کاش البرنی (مفتاح الجفر): مفتاح پانا بند کاموں کے کھلنے کا قطعی ثبوت ہے۔',
    recommendedAction: 'یا فتاح کا 489 مرتبہ بعد از نمازِ فجر ورد کریں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '🗝️',
  },
  {
    id: 'symbol-green-robe',
    nameUrdu: 'سبز یا سفید ریشمی لباس زیب تن کرنا',
    nameEnglish: 'Wearing Green or Pure White Silk Robe',
    category: 'wealth_objects',
    categoryUrdu: 'اشیاء، خزائن و لباس',
    keywords: ['سبز لباس', 'سفید کپڑے', 'ریشم', 'عمامہ', 'خلعت', 'چادر', 'robe', 'green dress', 'white clothes'],
    signalType: 'khair_azheem',
    signalUrdu: 'تقویٰ، سلامتی، عفت و شرف',
    primaryInterpretation: 'دین و دنیا کی بھلائی، نیک نامی، پاکیزہ رشتہ اور روحانی بلندی۔',
    istikharaImplication: 'شادی کے لیے بہترین رشتہ ہے، شریکِ حیات نیک طینت اور پرہیزگار ہوگا۔',
    spiritualPracticeContext: 'روحانی پاکیزگی اور وظائف کی کامل حفاظت۔',
    element: 'earth',
    elementUrdu: 'نباتی و خاکی (سعادت)',
    kashAlBarniReference: 'کاش البرنی (قوانین طلسم): سبز لباس اہل جنت کا لباس ہے، خیرِ محض ہے۔',
    recommendedAction: 'سفید کپڑے کا ہدیہ کسی مستحق کو دیں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '👘',
  },
  {
    id: 'symbol-shining-lamp',
    nameUrdu: 'روشن چراغ، قندیل یا شمع جلانا',
    nameEnglish: 'Burning Lamp / Lantern / Candle',
    category: 'wealth_objects',
    categoryUrdu: 'اشیاء، خزائن و لباس',
    keywords: ['چراغ', 'شمع', 'قندیل', 'لالٹین', 'روشنی جلانا', 'lamp', 'candle', 'lantern'],
    signalType: 'falah_o_barkat',
    signalUrdu: 'امید کی کرن، رہنمائی و خوشحالی',
    primaryInterpretation: 'بے یقینی کے دور کا خاتمہ، نسل میں وسعت، اور گھر میں مسرتوں کا آنا۔',
    istikharaImplication: 'اس کام سے آپ کے گھرانے اور کاروبار کو نئی زندگی اور روشنی ملے گی۔',
    spiritualPracticeContext: 'دل میں ذکر کا چراغ روشن ہونا۔',
    element: 'fire',
    elementUrdu: 'آتشی (ضیاء و حرارت)',
    kashAlBarniReference: 'کاش البرنی (رموز الجفر): چراغ دیکھنا نسل کی برکت اور علم کی روشنی ہے۔',
    recommendedAction: 'مسجد میں خوشبو یا روشنی کا انتظام کریں۔',
    istikharaVerdict: 'favorable',
    iconEmoji: '🪔',
  },
  {
    id: 'symbol-pure-milk-honey',
    nameUrdu: 'خالص دودھ یا شہد پینا / برتن بھرنا',
    nameEnglish: 'Drinking Pure Milk or Honey',
    category: 'wealth_objects',
    categoryUrdu: 'اشیاء، خزائن و لباس',
    keywords: ['دودھ', 'شہد', 'مٹھائی', 'حلوہ', 'شربت', 'milk', 'honey', 'sweets'],
    signalType: 'falah_o_barkat',
    signalUrdu: 'فطرتِ سلیمہ، مالِ کثیر و شیریں کلامی',
    primaryInterpretation: 'علم و دانائی، خالص حلال کمائی، شیریں زبانی اور تعلقات میں مٹھاس۔',
    istikharaImplication: 'شادی یا کاروبار میں الفت، پیار اور منافع دونوں حاصل ہوں گے۔',
    spiritualPracticeContext: 'عمل کے فیض سے باطن کی مٹھاس محسوس ہونا۔',
    element: 'water',
    elementUrdu: 'آبی و عنبری (شفا و لطف)',
    kashAlBarniReference: 'کاش البرنی (مفتاح الجفر): دودھ پینا علم اور دین کی سلامتی کی قطعی دلیل ہے۔',
    recommendedAction: 'بچوں کو دودھ یا میٹھی چیز کھلائیں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '🥛',
  },
  {
    id: 'symbol-broken-mirror-lock',
    nameUrdu: 'ٹوٹا ہوا آئینہ، ٹوٹا برتن یا زنگ آلود تالا',
    nameEnglish: 'Broken Mirror / Shattered Vessel / Rusted Lock',
    category: 'wealth_objects',
    categoryUrdu: 'اشیاء، خزائن و لباس',
    keywords: ['ٹوٹا آئینہ', 'شیشہ ٹوٹنا', 'برتن ٹوٹنا', 'زنگ', 'تالا بند', 'broken mirror', 'broken glass'],
    signalType: 'tanbih_o_ehtiyat',
    signalUrdu: 'شکستِ دل، رکاوٹ یا بدگمانی',
    primaryInterpretation: 'رشتوں میں غلط فہمیاں، منصوبے میں تاخیر یا اعتماد کو ٹھیس پہنچنا۔',
    istikharaImplication: 'معاملے میں جلدی نہ کریں، فریقِ ثانی کے پسِ پردہ ارادوں کی مزید چھان بین کریں۔',
    spiritualPracticeContext: 'ذہن میں وساوس اور عدمِ ارتکاز کی طرف اشارہ ہے۔ از سرِ نو نیت باندھیں۔',
    element: 'earth',
    elementUrdu: 'خاکی و منکسر (تنبیہ)',
    kashAlBarniReference: 'کاش البرنی (رموز الجفر): ٹوٹا آئینہ دیکھنا باہمی بدگمانی اور تاخیر کی دلیل ہے۔',
    recommendedAction: 'استغفار کی 3 تسبیحات پڑھیں اور صدقہ دیں۔',
    istikharaVerdict: 'neutral_delayed',
    iconEmoji: '🪞',
  },

  // 5. States, Actions & Transitions (احوال و افعال)
  {
    id: 'symbol-flying-in-sky',
    nameUrdu: 'آسمان میں پرواز کرنا یا تیرنا',
    nameEnglish: 'Flying Freely in the Sky',
    category: 'states_actions',
    categoryUrdu: 'احوال و افعال',
    keywords: ['پرواز', 'اڑنا', 'ہوا میں اڑنا', 'پر لگنا', 'فضائی پرواز', 'flying', 'fly', 'sky'],
    signalType: 'khair_azheem',
    signalUrdu: 'بلندیٔ مقاصد، سفرِ مبارک و آزادی',
    primaryInterpretation: 'بندشوں سے رہائی، غیر ملکی سفر کی کامیابی، اعلیٰ مقام کا حصول اور رنج سے نجات۔',
    istikharaImplication: 'سفر، ویزا، بیرونِ ملک ملازمت یا ترقی کے لیے بہترین اور سعد ترین علامت ہے۔',
    spiritualPracticeContext: 'روحانی لطائف کی بیداری اور ارواح کی پرواز۔',
    element: 'air',
    elementUrdu: 'بادی و لطیف (عروج)',
    kashAlBarniReference: 'کاش البرنی (قوانین طلسم): بلا خوف پرواز کرنا مقاصد کی جلد برآری کا غماز ہے۔',
    recommendedAction: 'اللہ کے حضور شکرانے کا سجدہ کریں اور دعائے سفر پڑھیں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '🦅',
  },
  {
    id: 'symbol-swimming-safely',
    nameUrdu: 'صاف شفاف سمندر یا دریا میں پار اترنا',
    nameEnglish: 'Swimming Across Clear Sea / Crossing River',
    category: 'states_actions',
    categoryUrdu: 'احوال و افعال',
    keywords: ['تیراکی', 'تیرنا', 'دریا پار کرنا', 'کشتی', 'پار اترنا', 'swimming', 'river cross', 'boat'],
    signalType: 'falah_o_barkat',
    signalUrdu: 'مشکلات سے بحفاظت نکل جانا',
    primaryInterpretation: 'بحران پر قابو پانا، قرضوں کی ادائیگی، اور آزمائش کے بعد ساحلِ مراد پر پہنچنا۔',
    istikharaImplication: 'ابتدائی دقتوں کے باوجود انجام بخیر ہوگا اور آپ کامیابی کے ساحل تک پہنچ جائیں گے۔',
    spiritualPracticeContext: 'تکسیر کے عمل نے آپ کو مشکلات سے نکال کر راہِ نجات دکھا دی ہے۔',
    element: 'water',
    elementUrdu: 'آبی (نجات و صفائی)',
    kashAlBarniReference: 'کاش البرنی (مفتاح الجفر): پانی سے بخیریت نکلنا فتح اور نجات کی پکی دلیل ہے۔',
    recommendedAction: 'یا سلام یا مومن کا ورد کریں۔',
    istikharaVerdict: 'favorable',
    iconEmoji: '🏊‍♂️',
  },
  {
    id: 'symbol-falling-from-height',
    nameUrdu: 'بلندی یا چھت سے نیچے گرنا',
    nameEnglish: 'Falling from Height / Stumbling',
    category: 'states_actions',
    categoryUrdu: 'احوال و افعال',
    keywords: ['گرنا', 'گر پڑنا', 'کھائی میں گرنا', 'پھسلنا', 'falling', 'fall', 'drop'],
    signalType: 'tanbih_o_ehtiyat',
    signalUrdu: 'تنزل، لغزش یا فیصلے پر نظرِ ثانی',
    primaryInterpretation: 'غفلت، غلط قدم اٹھانے کا خطرہ، یا کسی جھوٹے وعدے پر اندھا اعتماد کرنا۔',
    istikharaImplication: 'استخارہ سختی سے تنبیہ کرتا ہے کہ موجودہ صورت میں قدم آگے نہ بڑھائیں، نقصان ہوگا۔',
    spiritualPracticeContext: 'وظیفے میں ارتکاز کی کمی یا عجلت پسندی سے پرہیز کریں۔',
    element: 'earth',
    elementUrdu: 'خاکی و ہابط (تنبیہ)',
    kashAlBarniReference: 'کاش البرنی (رموز الجفر): بلندی سے گرنا منصوبے کے خسارے کا واضح انتباہ ہے۔',
    recommendedAction: 'فوری صدقہ دیں اور اپنے فیصلے کو ایک ہفتے کے لیے مؤخر فرمائیں۔',
    istikharaVerdict: 'unfavorable_caution',
    iconEmoji: '⚠️',
  },
  {
    id: 'symbol-weeping-tears-of-joy',
    nameUrdu: 'خواب میں خوشی کے آنسو رونا / سجدہ ریز ہونا',
    nameEnglish: 'Crying in Prayer / Tears of Joy / Prostration',
    category: 'states_actions',
    categoryUrdu: 'احوال و افعال',
    keywords: ['رونا', 'آنسو', 'گریا', 'خوشی کے آنسو', 'توبہ', 'crying', 'tears', 'weeping'],
    signalType: 'khair_azheem',
    signalUrdu: 'غموں کا خاتمہ، دلی سکون و قبولیت',
    primaryInterpretation: 'رنج و الم کا خوشی میں بدل جانا، دل کا بوجھ ہلکا ہونا اور دعاؤں کا مستجاب ہونا۔',
    istikharaImplication: 'تنگی اور بے چینی کے دن ختم ہونے والے ہیں، مراد پوری ہوگی۔',
    spiritualPracticeContext: 'توبہ کی قبولیت اور دل پر سکینت کا نزول۔',
    element: 'water',
    elementUrdu: 'آبی (تزکیہ و رحمت)',
    kashAlBarniReference: 'کاش البرنی (مفتاح الجفر): خواب میں رونا بیداری کی خوشی اور دعاؤں کے ثمر کا نام ہے۔',
    recommendedAction: 'درودِ پاک کثرت سے پڑھیں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '🤲',
  },
  {
    id: 'symbol-marriage-feast',
    nameUrdu: 'پروقار نکاح، دعوتِ ولیمہ یا تاج پہننا',
    nameEnglish: 'Solemnizing Marriage / Banquet / Wearing Crown',
    category: 'states_actions',
    categoryUrdu: 'احوال و افعال',
    keywords: ['نکاح', 'شادی', 'ولیمہ', 'تاج', 'دولہا', 'دلہن', 'دعوت', 'marriage', 'wedding', 'crown'],
    signalType: 'falah_o_barkat',
    signalUrdu: 'اتحاد، شراکت داری، اعزاز و شادمانی',
    primaryInterpretation: 'دو خاندانوں یا کاروباری افراد میں پرخلوص معاہدہ، وقار میں اضافہ اور مسرت۔',
    istikharaImplication: 'شادی، شراکت یا ملازمت کے لیے نہایت مبارک و موزوں استخارہ ہے۔',
    spiritualPracticeContext: 'موکلات اور کلمات کے مابین کامل ہم آہنگی۔',
    element: 'air',
    elementUrdu: 'بادی و نوری (اتحاد)',
    kashAlBarniReference: 'کاش البرنی (قوانین طلسم): نکاح و تاج دیکھنا دنیاوی و روحانی کامرانی کا غماز ہے۔',
    recommendedAction: 'اپنے عزیزوں کو دعوتِ طعام دیں یا مٹھائی تقسیم کریں۔',
    istikharaVerdict: 'highly_favorable',
    iconEmoji: '👑',
  },
];

/**
 * Intelligent Dream Analysis & Synthesis Engine
 * Synthesizes dream symbols, time of occurrence, and spiritual practice context.
 */
export function analyzeDream(
  selectedSymbolIds: string[],
  dreamTiming: 'sahar' | 'mid_night' | 'first_third' | 'day_nap',
  practiceContext: 'after_istikhara' | 'after_takseer' | 'during_chilla' | 'general_dream',
  dreamTextNarrative?: string
): DreamAnalysisResult {
  // Find matched symbols
  let matched = KASH_AL_BARNI_DREAM_DATABASE.filter((s) => selectedSymbolIds.includes(s.id));

  // If narrative text provided, also match keywords
  if (dreamTextNarrative && dreamTextNarrative.trim().length > 0) {
    const textLower = dreamTextNarrative.toLowerCase();
    const additionalMatches = KASH_AL_BARNI_DREAM_DATABASE.filter((s) => {
      if (selectedSymbolIds.includes(s.id)) return false;
      return s.keywords.some((k) => textLower.includes(k.toLowerCase())) ||
        textLower.includes(s.nameUrdu) ||
        textLower.includes(s.nameEnglish.toLowerCase());
    });
    matched = [...matched, ...additionalMatches];
  }

  // Fallback if no symbol selected
  if (matched.length === 0) {
    matched = [KASH_AL_BARNI_DREAM_DATABASE[0]];
  }

  // Calculate Verdict Scores
  let score = 0;
  matched.forEach((s) => {
    if (s.istikharaVerdict === 'highly_favorable') score += 3;
    else if (s.istikharaVerdict === 'favorable') score += 2;
    else if (s.istikharaVerdict === 'neutral_delayed') score += 0;
    else if (s.istikharaVerdict === 'unfavorable_caution') score -= 3;
  });

  // Timing Significance
  let timingSignificance = '';
  let timingWeight = 1;
  switch (dreamTiming) {
    case 'sahar':
      timingSignificance = 'وقتِ سحر (ثلثِ اخیر تا صبحِ صادق): کاش البرنی کے مطابق یہ وقتِ تجلیات ہے اور اس وقت کا دیکھا گیا خواب سب سے زیادہ صادق، یقینی اور سریع التاثیر ہوتا ہے۔';
      timingWeight = 1.3;
      break;
    case 'mid_night':
      timingSignificance = 'نصفِ شب (بوقتِ سکونِ قلوب): اس وقت کے اشارات پختہ ہوتے ہیں اور معاملات کے باطنی انجام کی نشاندہی کرتے ہیں۔';
      timingWeight = 1.1;
      break;
    case 'first_third':
      timingSignificance = 'ثلثِ اولِ شب: اس وقت کے خواب بعض اوقات دن بھر کی مصروفیات اور خیالات کا پرتو ہوتے ہیں، تاہم بنیادی اشارہ معتبر ہے۔';
      timingWeight = 0.9;
      break;
    case 'day_nap':
      timingSignificance = 'قیلولہ و بعد از فجر: یہ خواب تعبیر طلب ہوتا ہے اور جلد ظاہر ہونے والے دنیاوی واقعات سے متعلق ہوتا ہے۔';
      timingWeight = 0.8;
      break;
  }

  // Overall Verdict Determination
  let overallVerdict: 'highly_favorable' | 'favorable' | 'neutral_delayed' | 'unfavorable_caution' = 'favorable';
  let verdictTitleUrdu = '';
  let istikharaAdviceUrdu = '';

  if (score >= 3) {
    overallVerdict = 'highly_favorable';
    verdictTitleUrdu = 'بشارتِ کبریٰ و غیبی تائید (انتہائی مبارک و مثبت استخارہ)';
    istikharaAdviceUrdu = 'کاش البرنی کا فیصلہ: اس خواب میں صریح نصرت اور خیر کے اشارات موجود ہیں۔ جس مقصد، رشتے، کاروبار یا سفر کے لیے استخارہ و عمل کیا تھا، اس میں بلا تامل اور کامل اعتماد کے ساتھ آگے بڑھیں۔ رکاوٹیں خود بخود دور ہو جائیں گی۔';
  } else if (score > 0) {
    overallVerdict = 'favorable';
    verdictTitleUrdu = 'خیر و برکت و کامیابی (مثبت و پرامید اشارہ)';
    istikharaAdviceUrdu = 'کاش البرنی کا فیصلہ: خواب کا مفہوم نفع، الفت اور کامیابی پر دلالت کرتا ہے۔ معمولی صبر و استقامت سے کام لیں، انجام بخیر اور مقاصد پورے ہوں گے۔';
  } else if (score === 0) {
    overallVerdict = 'neutral_delayed';
    verdictTitleUrdu = 'توقف و تاخیر (صبر و مزید تفتیش کی ضرورت)';
    istikharaAdviceUrdu = 'کاش البرنی کا فیصلہ: خواب اشارہ کرتا ہے کہ وقت ابھی مکمل طور پر سازگار نہیں ہوا یا فریقِ ثانی کے کچھ معاملات تشنہ ہیں۔ فوری حتمی فیصلہ کرنے سے گریز فرمائیں اور چند دن انتظار کے بعد دوبارہ استخارہ کریں۔';
  } else {
    overallVerdict = 'unfavorable_caution';
    verdictTitleUrdu = 'تنبیہِ شدید و ممانعت (منفی استخارہ و احتیاطِ لازم)';
    istikharaAdviceUrdu = 'کاش البرنی کا فیصلہ: اس خواب میں خطرات، حاسدین کی سازش یا نقصان کے علامات ظاہر ہوئے ہیں۔ یہ استخارہ واضح طور پر اس کام سے رک جانے اور ہاتھ کھینچ لینے کی نصیحت کرتا ہے۔ فوری صدقہ دیں اور حصار باندھیں۔';
  }

  // Dominant Element
  const elementsCount: Record<ElementType, number> = { fire: 0, air: 0, water: 0, earth: 0 };
  matched.forEach((m) => {
    elementsCount[m.element] = (elementsCount[m.element] || 0) + 1;
  });
  let dominantEl: ElementType = 'water';
  let maxCount = -1;
  (Object.keys(elementsCount) as ElementType[]).forEach((el) => {
    if (elementsCount[el] > maxCount) {
      maxCount = elementsCount[el];
      dominantEl = el;
    }
  });

  const dominantElementMap: Record<ElementType, string> = {
    fire: 'آتشی (قوت، جلال، غلبہ و سرعت)',
    air: 'بادی (پیغامات، الفت، نشرِ خیر و تحریک)',
    water: 'آبی (رحمت، شفا، صفائی و برکت)',
    earth: 'خاکی (ثبات، استقامت، عمارت و مال)',
  };

  // Remedies & Spiritual Wazaif
  const spiritualRemedy = {
    sadqah:
      overallVerdict === 'unfavorable_caution'
        ? 'سرخ گوشت، تیل یا سیاہ ماش کا صدقہ بدھ یا ہفتہ کو نکالیں۔'
        : 'سفید اشیاء (دودھ، چاول یا شیرینی) مساکین میں تقسیم فرمائیں۔',
    wazifa:
      overallVerdict === 'unfavorable_caution'
        ? 'آیت الکرسی 70 مرتبہ + چہار قل روزانہ 11 مرتبہ مع درودِ تاج'
        : 'یا فتاح یا رزاق یا ودود (1001 مرتبہ بعد از نمازِ عشاء)',
    incense:
      overallVerdict === 'unfavorable_caution'
        ? 'حرمل (اسپند)، کلونجی و لوبان'
        : 'صندل سفید، عودِ ہندی، گلاب و عنبر',
    quranicVerse:
      overallVerdict === 'unfavorable_caution'
        ? 'فَاللَّهُ خَيْرٌ حَافِظًا وَهُوَ أَرْحَمُ الرَّاحِمِينَ'
        : 'إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا • نَصْرٌ مِّنَ اللَّهِ وَفَتْحٌ قَرِيبٌ',
  };

  const jafrInsights = `کاش البرنی فرماتے ہیں: "خواب روح کا آئینہ ہے جو عالمِ مثال کی صورتوں کو بصارت کی زبان میں منتقل کرتا ہے۔ استخارہ و ریاضت کے بعد دیکھے گئے نقوش و علامات انسان کے لیے غیبی رہنمائی کا روشن چراغ ہیں۔" اس خواب میں ${matched.map((m) => m.nameUrdu).join('، ')} کے اجتماع سے ظاہر ہے کہ اثرات ${dominantElementMap[dominantEl]} کی سمت میں رواں دواں ہیں۔`;

  return {
    matchedSymbols: matched,
    overallVerdict,
    verdictTitleUrdu,
    istikharaAdviceUrdu,
    timingSignificance,
    dominantElementUrdu: dominantElementMap[dominantEl],
    spiritualRemedy,
    jafrInsights,
  };
}
