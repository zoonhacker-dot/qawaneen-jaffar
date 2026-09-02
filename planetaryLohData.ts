export interface PlanetaryLohItem {
  id: string;
  planetKey: 'sun' | 'moon' | 'mars' | 'mercury' | 'jupiter' | 'venus' | 'saturn';
  planetNameUrdu: string;
  planetTitleUrdu: string;
  lohNameUrdu: string;
  englishName: string;
  nature: 'saad_akbar' | 'saad_asghar' | 'nahs_akbar' | 'nahs_asghar' | 'mumtazij';
  natureUrdu: string;
  natureBadgeColor: string;
  
  // Astronomical & Astrological Attributes
  governingDay: string;
  governingNight: string;
  zodiacRulership: string;
  sharafDegree: string;
  hubootDegree: string;
  element: 'fire' | 'air' | 'water' | 'earth';
  elementUrdu: string;
  metal: string;
  metalColor: string;
  plateVisualBg: string;
  plateBorder: string;
  textColor: string;
  inkType: string;
  incense: string; // بخور
  direction: string; // سمت
  color: string;
  
  // Spiritual & Divine Entities
  divineNames: string[]; // اسمائے الٰہیہ
  muwakkilUlwi: string; // فرشتہ / موکل علوی
  muwakkilSifli: string; // خادم سفلی
  quranicVerse: string;
  quranicSurah: string;
  adadBase: number;
  
  // Wafq & Geometry
  wafqType: string; // مثلاً مربع (4x4)، مسدس (6x6)، مخمس (5x5) وغیرہ
  wafqDimensions: number; // 3 to 9
  wafqDefaultGrid: number[][];
  
  // Loh Purpose & Intentions
  saadPurposes: string[];
  nahsOrDefensivePurposes: string[];
  
  // Step-by-Step Preparation Protocol
  preparationSteps: {
    stepNumber: number;
    title: string;
    description: string;
    precautions: string;
  }[];
  
  // Lawazmat (Requisites)
  lawazmat: {
    category: string;
    items: string[];
  }[];
  
  // Usage Methods (طریقۂ استعمال)
  usageMethods: {
    methodTitle: string;
    targetEffect: string;
    instructions: string;
    duration: string;
  }[];
  
  // Special Warnings & Kash Al-Barny Rules
  kashAlBarnySecrets: string[];
}

export const PLANETARY_LOH_DATABASE: PlanetaryLohItem[] = [
  // 1. شمس (لوحِ شمسِ معظم)
  {
    id: 'loh-shams',
    planetKey: 'sun',
    planetNameUrdu: 'شمس (سورج)',
    planetTitleUrdu: 'نیّرِ اعظم و سلطانِ فلک',
    lohNameUrdu: 'لوحِ شمسِ معظم (لوحِ جاہ و حشمت و تسخیرِ حکام)',
    englishName: 'Talismanic Plate of The Sun (Sol)',
    nature: 'saad_akbar',
    natureUrdu: 'سعدِ اکبر (مطلق مبارک و حاکم)',
    natureBadgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    governingDay: 'اتوار (یکشنبہ)',
    governingNight: 'جمعرات کی رات',
    zodiacRulership: 'برج اسد (Leo)',
    sharafDegree: '۱۹ درجہ برج حمل (Aries 19°)',
    hubootDegree: '۱۹ درجہ برج میزان (Libra 19°)',
    element: 'fire',
    elementUrdu: 'آتش (ناری)',
    metal: 'خالص سونا (Gold) یا پیتلِ زرد',
    metalColor: '#f59e0b',
    plateVisualBg: 'from-amber-100 via-amber-200 to-yellow-300 text-amber-950 shadow-amber-500/30',
    plateBorder: 'border-amber-500',
    textColor: 'text-amber-950',
    inkType: 'زعفران، عرقِ گلاب و مشکِ خالص (یا فولادی قلم بر پترۂ طلا)',
    incense: 'عودِ ہندی، صندلِ سرخ، کندر و زعفران',
    direction: 'مشرق (سورج نکلنے کی سمت)',
    color: 'سنہری، زرد چمکدار',
    divineNames: ['یا اللہ', 'یا نور', 'یا باسط', 'یا فرد', 'یا رافع', 'یا عزیز'],
    muwakkilUlwi: 'حضرت روقیائیل علیہ السلام',
    muwakkilSifli: 'الملک المذہب (ابو عبد اللہ)',
    quranicVerse: '﴿اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ مَثَلُ نُورِهِ كَمِشْكَاةٍ فِيهَا مِصْبَاحٌ﴾',
    quranicSurah: 'سورۃ الشمس و سورۃ النور',
    adadBase: 669,
    wafqType: 'وفقِ مسدس (6x6) شمس یا مربعِ ذوالکتابۃ',
    wafqDimensions: 6,
    wafqDefaultGrid: [
      [6, 32, 3, 34, 35, 1],
      [7, 11, 27, 28, 8, 30],
      [19, 14, 16, 15, 23, 24],
      [18, 20, 22, 21, 17, 13],
      [25, 29, 10, 9, 26, 12],
      [36, 5, 33, 4, 2, 31]
    ],
    saadPurposes: [
      'حصولِ عزت، جاہ و منصبِ عالی اور اعلیٰ افسران کے دلوں میں بے پناہ رعب و وقعت۔',
      'تسخیرِ قلوبِ خلائق، قبولیتِ عامہ اور شہرت و وقار۔',
      'امتحانات، انٹرویو اور حکومتی و عدالتی معاملات میں فتح و نصرت۔',
      'دفعِ نحوست، کاروبار میں تیز رفتار ترقی اور مالی برکت۔'
    ],
    nahsOrDefensivePurposes: [
      'اگر شمس پر زحل کی نظر ہو تو لوحِ شمس کا حفاظتی طلسم ظالم حاکم کے ظلم سے نجات اور قید و بند سے خلاصی کے لیے اکسیر ہے۔'
    ],
    preparationSteps: [
      {
        stepNumber: 1,
        title: 'انتخابِ وقت و ساعت',
        description: 'اتوار کے روز طلوعِ آفتاب کے بعد پہلی ساعت (ساعتِ شمس) میں یا ۱۹ درجہ برجِ حمل (شرفِ شمس) کے مبارک وقت کا انتخاب کریں۔',
        precautions: 'قمر در عقرب یا تحت الشعاع نہ ہو۔'
      },
      {
        stepNumber: 2,
        title: 'طہارت، لباس و رجال الغیب',
        description: 'غسل کر کے پاکیزہ زرد یا سفید لباس پہنیں، خوشبو (عود یا صندل) لگائیں اور رجال الغیب کو اپنی پشت پر رکھ کر قبلہ رو بیٹھیں۔',
        precautions: 'عمل کے دوران مکمل سکوت اور یکسوئی لازم ہے۔'
      },
      {
        stepNumber: 3,
        title: 'کتابت و کندہ کاری',
        description: 'سونے یا پیتل کی مربع تختی پر چاروں طرف خاتمِ شمس اور درمیان میں وفقِ مسدس کندہ کریں یا زعفران سے ہرن کی جھلی پر لکھیں۔',
        precautions: 'نقش کی چال کا مکمل لحاظ رکھیں (خانہ ۱ سے خانہ ۳۶ تک تسلسل سے بھریں)۔'
      },
      {
        stepNumber: 4,
        title: 'عزیمت و ترویہ',
        description: 'لوح کو عود و لبان کی دھونی دیں اور سورۃ الشمس ۴۱ مرتبہ یا اسمِ "یا نور یا عزیز" ۶۶۹ مرتبہ پڑھ کر دم کریں۔',
        precautions: 'لوح کو زمین پر نہ رکھیں بلکہ ریشمی زرد کپڑے پر رکھیں۔'
      }
    ],
    lawazmat: [
      {
        category: 'دھات و پترہ',
        items: ['خالص سونے کا پترہ (Gold Sheet) یا پیتل کا پالش شدہ مربع ٹکڑا', 'فولادی پرکار یا تیز کندہ کاری کا اوزار']
      },
      {
        category: 'بخورات و عطر',
        items: ['خالص عودِ ہندی', 'صندلِ سرخ کا برادہ', 'زعفران کی لکڑیاں', 'کندر (لوبان)']
      },
      {
        category: 'شرائطِ عامل',
        items: ['باوضو ہونا', 'ترکِ حیواناتِ جلالی و جمالی (کم از کم ایک دن قبل)', 'حصنِ حصین یا آیۃ الکرسی کا حصار']
      }
    ],
    usageMethods: [
      {
        methodTitle: 'گلے میں پہننا (حرزی طریقہ)',
        targetEffect: 'ہر دلعزیزی، رعب، جاہ و جلال اور حفاظتِ حاسدین۔',
        instructions: 'لوح کو زرد ریشمی کپڑے یا چمڑے کے غلاف میں سی کر گلے میں یا دائیں بازو پر باندھیں۔',
        duration: 'ہمیشہ ساتھ رکھیں، غسل خانے جاتے وقت ادب ملحوظ رکھیں۔'
      },
      {
        methodTitle: 'مکان یا دفتر میں آویزاں کرنا',
        targetEffect: 'کاروبار کی وسعت اور رزق و حکومت میں برکت۔',
        instructions: 'دفتر کی مشرقی دیوار پر قبلہ کی سمت میں فریم کروا کر لگائیں۔',
        duration: 'دائمی برکت۔'
      }
    ],
    kashAlBarnySecrets: [
      'کاش البرنی فرماتے ہیں کہ شمس کی لوح جب شرف کے وقت میں کندہ کی جائے تو حامل پر کبھی فقر و ذلت مسلط نہیں ہوتی۔',
      'لوح کے چاروں گوشوں پر اسمائے موکلین روقیائیل، متیائیل، جریائیل و صلصائیل لکھنا اثر کو دو چند کر دیتا ہے۔'
    ]
  },

  // 2. قمر (لوحِ قمرِ منیر)
  {
    id: 'loh-qamar',
    planetKey: 'moon',
    planetNameUrdu: 'قمر (چاند)',
    planetTitleUrdu: 'کوکبِ سریع السیر و واسطۂ فیوضات',
    lohNameUrdu: 'لوحِ قمرِ منیر (لوحِ محبت، شفاء و تسخیرِ ارواح)',
    englishName: 'Talismanic Plate of The Moon (Luna)',
    nature: 'saad_asghar',
    natureUrdu: 'سعدِ منور (موافق و سریع التاثیر)',
    natureBadgeColor: 'bg-slate-100 text-slate-900 border-slate-300',
    governingDay: 'پیر (دوشنبہ)',
    governingNight: 'جمعہ کی رات',
    zodiacRulership: 'برج سرطان (Cancer)',
    sharafDegree: '۳ درجہ برج ثور (Taurus 3°)',
    hubootDegree: '۳ درجہ برج عقرب (Scorpio 3°)',
    element: 'water',
    elementUrdu: 'آب (آبی و رطوبت)',
    metal: 'خالص چاندی (Fine Silver) یا سفید رانگا',
    metalColor: '#94a3b8',
    plateVisualBg: 'from-slate-100 via-gray-200 to-sky-200 text-slate-900 shadow-sky-400/30',
    plateBorder: 'border-slate-400',
    textColor: 'text-slate-950',
    inkType: 'عرقِ گلاب، کافور اور سفید صندل (یا چاندی کی تختی پر کندہ کاری)',
    incense: 'لبانِ نر، کافور، صندلِ سفید و مستگی رومی',
    direction: 'مغرب و شمال (سمتِ رطوبت)',
    color: 'سفید براق، چاندی نما',
    divineNames: ['یا رحمن', 'یا رحیم', 'یا سلام', 'یا لطیف', 'یا مجیب', 'یا قدوس'],
    muwakkilUlwi: 'حضرت جبرائیل علیہ السلام (یا جبرائیل فلکی)',
    muwakkilSifli: 'الملک ابا الحارث (ابیض)',
    quranicVerse: '﴿وَالْقَمَرَ قَدَّرْنَاهُ مَنَازِلَ حَتَّى عَادَ كَالْعُرْجُونِ الْقَدِيمِ﴾',
    quranicSurah: 'سورۃ یٰسین و سورۃ القمر',
    adadBase: 360,
    wafqType: 'وفقِ مسبع (7x7) یا مثمنِ قمری',
    wafqDimensions: 7,
    wafqDefaultGrid: [
      [22, 47, 16, 41, 10, 35, 4],
      [5, 23, 48, 17, 42, 11, 29],
      [30, 6, 24, 49, 18, 36, 12],
      [13, 31, 7, 25, 43, 19, 37],
      [38, 14, 32, 1, 26, 44, 20],
      [21, 39, 8, 33, 2, 27, 45],
      [46, 15, 40, 9, 34, 3, 28]
    ],
    saadPurposes: [
      'تسخیرِ قلوب، جلبِ محبتِ صادقہ اور زوجین کے درمیان شیر و شکر الفت۔',
      'امراضِ دماغیہ، مالیخولیا، نسیان اور تیز بخار و گرم امراض کی تسکین و شفا۔',
      'خوف، وہم، ڈراؤنے خواب اور بچوں کے سوکھا پن (ام الصبیان) کا خاتمہ۔',
      'سفرِ بحری و بری میں سلامتی اور ہر موڑ پر آسانی۔'
    ],
    nahsOrDefensivePurposes: [
      'محاقِ قمر (آخری چاند کی راتوں) میں تیار کی گئی لوحِ قمر سے دشمنوں کے شر کو ٹھنڈا کرنے اور بدطینت لوگوں کے دل کو قابو کرنے کا کام لیا جاتا ہے۔'
    ],
    preparationSteps: [
      {
        stepNumber: 1,
        title: 'ساعتِ قمر کا تعین',
        description: 'پیر کے دن طلوعِ آفتاب کے بعد پہلی ساعت یا چاشت کے وقت جب چاند ہلال سے بدر کی طرف بڑھ رہا ہو (نوچندی پیر)۔',
        precautions: 'قمر در عقرب کے ۲ اعشاریہ ۵ دن میں قطعی نہ بنائیں۔'
      },
      {
        stepNumber: 2,
        title: 'چاندی کی تختی پر تحریر',
        description: 'خالص چاندی کے پترے پر ایک طرف وفقِ مسبع اور پشت پر خاتمِ قمر اور ۲۸ منازل کے حروف مع اسمائے سبعہ کندہ کریں۔',
        precautions: 'لوح بناتے وقت میٹھی چیز (جیسے دودھ یا سفید مٹھائی) پاس رکھیں۔'
      },
      {
        stepNumber: 3,
        title: 'دم و تلاوت',
        description: 'سورۃ القمر ۱۱ بار اور اسمِ "یا سلام یا لطیف" ۳۶۰ بار پڑھ کر لوح پر دم کریں۔',
        precautions: 'کافور اور صندلِ سفید کی دھونی مسلسل جاری رہے۔'
      }
    ],
    lawazmat: [
      {
        category: 'دھات و سامان',
        items: ['خالص چاندی کی گول یا چوکور تختی', 'عرقِ گلاب سے دھلی ہوئی روئی']
      },
      {
        category: 'بخورات',
        items: ['کافورِ خالص', 'صندلِ سفید کا برادہ', 'لبانِ ذکر']
      }
    ],
    usageMethods: [
      {
        methodTitle: 'گلے میں پہننا',
        targetEffect: 'خوف و اضطراب کا خاتمہ اور حسن و کشش کا فروغ۔',
        instructions: 'سفید دھاگے یا چاندی کی چین میں پرو کر گلے میں ڈالیں۔',
        duration: 'ہمیشہ مفید۔'
      },
      {
        methodTitle: 'پانی میں دھو کر پینا',
        targetEffect: 'شفائے امراضِ باطنی و دماغی تقویت۔',
        instructions: 'چاندی کی لوح کو بارش کے پانی یا عرقِ گلاب میں دھو کر ۴۱ دن نہار منہ مریض کو پلائیں۔',
        duration: '۴۱ روز۔'
      }
    ],
    kashAlBarnySecrets: [
      'کاش البرنی لکھتے ہیں کہ قمر جب منزلِ ثریا یا منزلِ زبرہ میں ہو تو اس کی لوح مسرت و خوشحالی کا طوفان برپا کر دیتی ہے۔'
    ]
  },

  // 3. مریخ (لوحِ مریخ و قہر / دفعِ اعداء)
  {
    id: 'loh-mars',
    planetKey: 'mars',
    planetNameUrdu: 'مریخ (جلادِ فلک / بہرام)',
    planetTitleUrdu: 'کوکبِ شجاعت، قہر، دبدبہ و دافعِ شیاطین',
    lohNameUrdu: 'لوحِ مریخ و قہر (لوحِ ابطالِ سحر، دفعِ دشمنان و فتحِ اعداء)',
    englishName: 'Talismanic Plate of Mars',
    nature: 'nahs_asghar',
    natureUrdu: 'نحسِ اصغر (قاہر، ناری و دفاعی)',
    natureBadgeColor: 'bg-red-100 text-red-900 border-red-300',
    governingDay: 'منگل (سہ شنبہ)',
    governingNight: 'ہفتہ کی رات',
    zodiacRulership: 'برج حمل و عقرب (Aries & Scorpio)',
    sharafDegree: '۲۸ درجہ برج جدی (Capricorn 28°)',
    hubootDegree: '۲۸ درجہ برج سرطان (Cancer 28°)',
    element: 'fire',
    elementUrdu: 'آتش (ناری شدید و خشک)',
    metal: 'خالص فولاد و لوہا (Iron/Steel) یا سرخ تانبا',
    metalColor: '#dc2626',
    plateVisualBg: 'from-red-100 via-rose-200 to-red-300 text-red-950 shadow-red-500/30',
    plateBorder: 'border-red-600',
    textColor: 'text-red-950',
    inkType: 'سرخ سیاہی، شنگرف، سرکہ اور عرقِ زعفران (یا لوہے پر گرم لوہے سے نقش)',
    incense: 'حرمل (اسپند)، رائی، سرخ مرچ، صندلِ سرخ اور لبانِ کوہی',
    direction: 'جنوب و مشرق (سمتِ نار)',
    color: 'سرخ تند، آگ جیسا لہو رنگ',
    divineNames: ['یا قہار', 'یا جبار', 'یا منتقم', 'یا مذل', 'یا قابض', 'یا قوی'],
    muwakkilUlwi: 'حضرت سمسمائیل علیہ السلام',
    muwakkilSifli: 'الملک الاحمر (ابا محرز)',
    quranicVerse: '﴿وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ إِنَّ الْبَاطِلَ كَانَ زَهُوقًا﴾',
    quranicSurah: 'سورۃ الفیل، سورۃ البروج و آیاتِ قہریہ',
    adadBase: 306,
    wafqType: 'وفقِ مخمس (5x5) مریخی یا مثلثِ آتش',
    wafqDimensions: 5,
    wafqDefaultGrid: [
      [11, 24, 7, 20, 3],
      [4, 12, 25, 8, 16],
      [17, 5, 13, 21, 9],
      [10, 18, 1, 14, 22],
      [23, 6, 19, 2, 15]
    ],
    saadPurposes: [
      'شجاعت، بہادری، فوج و پولیس اور خطرناک مہمات میں فتح۔',
      'حاسدین و دشمنوں کے حملوں کا منہ توڑ دفاع اور باطل سحر کا فوری الٹاؤ۔',
      'خوفِ اعداء کا خاتمہ اور دبدبہ و ہیبت کا قیام۔'
    ],
    nahsOrDefensivePurposes: [
      'سخت ترین سحرِ سفلی، جادو، نظرِ بد اور ظالم بدخواہوں کی زبان بندی کے لیے منگل کی پہلی ساعت میں بنائی جانے والی قاہر لوح۔'
    ],
    preparationSteps: [
      {
        stepNumber: 1,
        title: 'ساعتِ مریخ کا انتخاب',
        description: 'منگل کے دن طلوعِ آفتاب کے بعد پہلی ساعت یا زوال کے وقت ساعتِ مریخ۔',
        precautions: 'عمل کے دوران نگاہیں جھکی رہیں اور دل میں غصے کے بجائے عزمِ حق ہو۔'
      },
      {
        stepNumber: 2,
        title: 'لوہے کی تختی پر کندہ کاری',
        description: 'لوہے یا تانبے کی تختی پر وفقِ مخمس اور اس کے گرد آیت ﴿إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا﴾ اور اسمائے قہریہ کندہ کریں۔',
        precautions: 'حصارِ اعظم کا لگانا فرض ہے ورنہ رجعت کا اندیشہ رہتا ہے۔'
      },
      {
        stepNumber: 3,
        title: 'عزیمت و بخور',
        description: 'حرمل اور رائی کی دھونی دیتے ہوئے اسم "یا قہار یا جبار" ۳۰۶ مرتبہ یا سورۃ الفیل ۴۱ مرتبہ پڑھیں۔',
        precautions: 'بچے یا حاملہ خواتین کے سامنے یہ عمل نہ کریں۔'
      }
    ],
    lawazmat: [
      {
        category: 'دھات',
        items: ['لوہے یا فولاد کا کڑا/پترہ', 'سرخ کپڑا یا چمڑا']
      },
      {
        category: 'بخورات',
        items: ['حرمل (اسپند)', 'سرخ صندل', 'گوگل']
      }
    ],
    usageMethods: [
      {
        methodTitle: 'بازو پر باندھنا',
        targetEffect: 'دشمنوں پر فتح، مقدمات میں کامیابی اور ہیبت۔',
        instructions: 'سرخ چمڑے میں محفوظ کر کے دائیں بازو پر باندھیں۔',
        duration: 'حسبِ ضرورت۔'
      },
      {
        methodTitle: 'مکان میں دفن کرنا یا لٹکانا',
        targetEffect: 'جادو اور شیاطین کا فوری اخراج و ابطال۔',
        instructions: 'گھر کے چاروں کونوں میں یا مرکزی چوکھٹ کے اوپر لٹکائیں۔',
        duration: 'دائمی حصار۔'
      }
    ],
    kashAlBarnySecrets: [
      'کاش البرنی تنبیہ کرتے ہیں کہ لوحِ مریخ کا غلط اور ناجائز استعمال عامل کو ہلاکت میں ڈال سکتا ہے، اسے صرف حق اور اپنے دفاع کے لیے استعمال کریں۔'
    ]
  },

  // 4. عطارد (لوحِ عطارد و ذکاء / تجارت و علم)
  {
    id: 'loh-mercury',
    planetKey: 'mercury',
    planetNameUrdu: 'عطارد (دبیرِ فلک / کاتبِ سماء)',
    planetTitleUrdu: 'کوکبِ عقل، قلم، حساب، تجارت و فصاحت',
    lohNameUrdu: 'لوحِ عطارد و ذکاء (لوحِ حکمت، ذہانت، کامیابیِ امتحانات و تجارت)',
    englishName: 'Talismanic Plate of Mercury (Hermes)',
    nature: 'mumtazij',
    natureUrdu: 'ممتزج (جس کے ساتھ ملے ویسا رنگ پکڑے)',
    natureBadgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    governingDay: 'بدھ (چہار شنبہ)',
    governingNight: 'اتوار کی رات',
    zodiacRulership: 'برج جوزا و سنبلہ (Gemini & Virgo)',
    sharafDegree: '۱۵ درجہ برج سنبلہ (Virgo 15°)',
    hubootDegree: '۱۵ درجہ برج حوت (Pisces 15°)',
    element: 'air',
    elementUrdu: 'باد (ہوائی و متغیر)',
    metal: 'رانگا، کانسی (Bronze/Brass) یا شیشہ و پارہ',
    metalColor: '#10b981',
    plateVisualBg: 'from-emerald-100 via-teal-200 to-green-200 text-emerald-950 shadow-emerald-500/30',
    plateBorder: 'border-emerald-500',
    textColor: 'text-emerald-950',
    inkType: 'سبز سیاہی، زعفران اور عرقِ نیلوفر',
    incense: 'جاوی، مستگی، صندلِ زرد، الائچی اور صمغِ عربی',
    direction: 'شمال (سمتِ ہوا)',
    color: 'سبز، فیروزی و گندمی',
    divineNames: ['یا علیم', 'یا حکیم', 'یا خبیر', 'یا مبین', 'یا ہادی', 'یا فتاح'],
    muwakkilUlwi: 'حضرت میکائیل علیہ السلام (یا میکائیل فلکی)',
    muwakkilSifli: 'الملک برقان (ابا العجائب)',
    quranicVerse: '﴿ن وَالْقَلَمِ وَمَا يَسْطُرُونَ﴾ ﴿عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ﴾',
    quranicSurah: 'سورۃ القلم و سورۃ الرحمٰن',
    adadBase: 460,
    wafqType: 'وفقِ مثمن (8x8) عطاردی یا مسدسِ ہوائی',
    wafqDimensions: 8,
    wafqDefaultGrid: [
      [1, 63, 62, 4, 5, 59, 58, 8],
      [56, 10, 11, 53, 52, 14, 15, 49],
      [48, 18, 19, 45, 44, 22, 23, 41],
      [25, 39, 38, 28, 29, 35, 34, 32],
      [33, 31, 30, 36, 37, 27, 26, 40],
      [24, 42, 43, 21, 20, 46, 47, 17],
      [16, 50, 51, 13, 12, 54, 55, 9],
      [57, 7, 6, 60, 61, 3, 2, 64]
    ],
    saadPurposes: [
      'ذہانت، غیر معمولی حافظہ، فہم و فراست اور کتب بینی کا شوق۔',
      'امتحانات، انٹرویوز، مباحثے اور وکالت میں غیر معمولی فصاحت و کامیابی۔',
      'تجارت، آن لائن بزنس، حساب کتاب اور خرید و فروخت میں زبردست منافع۔',
      'لکنت، ہکلانے کی بیماری اور زبان کی گرہ کھولنے کا روحانی علاج۔'
    ],
    nahsOrDefensivePurposes: [
      'جب عطارد پر مریخ یا زحل کی نحوست ہو تو دشمنوں کی چالاکیوں اور سازشوں کے توڑ کے لیے اس لوح کا تدارکی طلسم استعمال ہوتا ہے۔'
    ],
    preparationSteps: [
      {
        stepNumber: 1,
        title: 'وقتِ عطارد',
        description: 'بدھ کی صبح طلوعِ آفتاب کے بعد پہلی ساعت۔ جب عطارد مستقیم اور سعد ہو۔',
        precautions: 'عطارد رجعت (Retrograde) کی حالت میں نہ ہو۔'
      },
      {
        stepNumber: 2,
        title: 'کانسی یا کاغذ پر تحریر',
        description: 'کانسی کی تختی یا ہرن کی جھلی پر سبز روشنائی سے وفقِ مثمن اور چاروں طرف حروفِ تہجی کندہ کریں۔',
        precautions: 'حروف کے دائرے بالکل کھلے اور واضح ہوں۔'
      },
      {
        stepNumber: 3,
        title: 'ورد و بخور',
        description: 'جاوی اور الائچی کی دھونی دیتے ہوئے اسمِ "یا علیم یا حکیم" ۴۶۰ بار پڑھ کر دم کریں۔',
        precautions: 'بچے خود بھی لوح پر ہاتھ رکھ کر ایک بار سورۃ القلم تلاوت کریں۔'
      }
    ],
    lawazmat: [
      {
        category: 'دھات و روشنائی',
        items: ['کانسی کی تختی یا سفید کاغذ', 'سبز اور زعفرانی سیاہی']
      },
      {
        category: 'بخورات',
        items: ['جاوی خالص', 'مستگی رومی', 'چھوٹی الائچی']
      }
    ],
    usageMethods: [
      {
        methodTitle: 'طالب علم کے گلے میں پہننا',
        targetEffect: 'حافظہ کی تیزی اور امتحانات میں اول پوزیشن۔',
        instructions: 'سبز غلاف میں سی کر گلے میں ڈالیں یا بستے میں رکھیں۔',
        duration: 'تعلیمی دورانیہ۔'
      },
      {
        methodTitle: 'دکان یا تجارتی گلے میں رکھنا',
        targetEffect: 'گاہکوں کی کثرت اور تجارت میں روز افزوں برکت۔',
        instructions: 'کیش باکس یا دکان کی مرکزی تجوری میں محفوظ رکھیں۔',
        duration: 'دائمی برکت۔'
      }
    ],
    kashAlBarnySecrets: [
      'کاش البرنی کے مطابق عطارد کی لوح پر سورۃ العلق کی پہلی پانچ آیات لکھنے سے بند ذہن ایسا کھلتا ہے کہ حکمت کے چشمے جاری ہو جاتے ہیں۔'
    ]
  },

  // 5. مشتری (لوحِ مشتری و ثروت / قاضیِ فلک)
  {
    id: 'loh-jupiter',
    planetKey: 'jupiter',
    planetNameUrdu: 'مشتری (برجیس / سعدِ اکبر)',
    planetTitleUrdu: 'کوکبِ سعادت، دولت، دین، جلالت و وسعتِ رزق',
    lohNameUrdu: 'لوحِ مشتری و ثروت (لوحِ غنائے کامل، کشائشِ رزق و برکتِ دارین)',
    englishName: 'Talismanic Plate of Jupiter (Jove)',
    nature: 'saad_akbar',
    natureUrdu: 'سعدِ اکبر (مطلق خیر، برکت و وسعت)',
    natureBadgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    governingDay: 'جمعرات (پنجشنبہ)',
    governingNight: 'پیر کی رات',
    zodiacRulership: 'برج قوس و حوت (Sagittarius & Pisces)',
    sharafDegree: '۱۵ درجہ برج سرطان (Cancer 15°)',
    hubootDegree: '۱۵ درجہ برج جدی (Capricorn 15°)',
    element: 'air',
    elementUrdu: 'باد (ہوائی گرم و تر)',
    metal: 'پیتلِ خالص، قلعی دار تانبا یا سفید سونا',
    metalColor: '#6366f1',
    plateVisualBg: 'from-indigo-100 via-blue-200 to-amber-200 text-indigo-950 shadow-indigo-500/30',
    plateBorder: 'border-indigo-500',
    textColor: 'text-indigo-950',
    inkType: 'زعفران، عرقِ گلاب، مشک اور عنبرِ اشہب',
    incense: 'عود، زعفران، صندلِ سفید، مستگی اور لبانِ ذکر',
    direction: 'مشرق و شمال (سمتِ فضل)',
    color: 'نیلا، آسمانی، ارغوانی و سنہری',
    divineNames: ['یا رزاق', 'یا فتاح', 'یا غنی', 'یا مغنی', 'یا وہاب', 'یا کریم'],
    muwakkilUlwi: 'حضرت صرفیائیل علیہ السلام',
    muwakkilSifli: 'الملک شمہورش (قاضی الجن)',
    quranicVerse: '﴿إِنَّ اللَّهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ﴾ ﴿وَتَرْزُقُ مَن تَشَاءُ بِغَيْرِ حِسَابٍ﴾',
    quranicSurah: 'سورۃ الواقعہ، سورۃ الذاریات و سورۃ المزمل',
    adadBase: 1060,
    wafqType: 'وفقِ مربع (4x4) مشتری یا متسع (9x9)',
    wafqDimensions: 4,
    wafqDefaultGrid: [
      [4, 14, 15, 1],
      [9, 7, 6, 12],
      [5, 11, 10, 8],
      [16, 2, 3, 13]
    ],
    saadPurposes: [
      'حصولِ دولت، بے پایاں رزق، فقر و تنگدستی کا کلی خاتمہ۔',
      'قرضوں سے مکمل نجات اور غیبی اسباب کی فراہمی۔',
      'روحانی مدارج کی بلندی، تقویٰ اور دل میں نورِ معرفت کا حصول۔',
      'بزرگانِ دین اور اہل اللہ کی نظرِ عنایت اور قبولیت۔'
    ],
    nahsOrDefensivePurposes: [
      'غربت کی نحوست اور معاشی بندشوں کو جڑ سے اکھاڑ پھینکنے کے لیے اکسیر ہے۔'
    ],
    preparationSteps: [
      {
        stepNumber: 1,
        title: 'ساعتِ مشتری',
        description: 'جمعرات کے روز طلوعِ آفتاب کے بعد پہلی ساعت (ساعتِ مشتری) یا چاشت کا وقت جب چاند بڑھ رہا ہو۔',
        precautions: 'قبلہ رو ہو کر باوضو خوشبو دار کمرے میں بیٹھیں۔'
      },
      {
        stepNumber: 2,
        title: 'پیتل یا کاغذ پر وفق سازی',
        description: 'پیتل کی تختی پر وفقِ مربع مشتری (مفتاح ۳۴) یا زعفران سے سفید ریشم پر لکھیں۔',
        precautions: 'خانہ اول میں عدد ۴ سے شروع کر کے ترتیب برقرار رکھیں۔'
      },
      {
        stepNumber: 3,
        title: 'تلاوت و عزیمت',
        description: 'سورۃ الواقعہ ۳ مرتبہ اور اسمِ "یا رزاق یا وہاب یا غنی" ۱۰۶۰ مرتبہ پڑھ کر دم کریں۔',
        precautions: 'عود اور زعفران کی دھونی مسلسل دی جائے۔'
      }
    ],
    lawazmat: [
      {
        category: 'دھات',
        items: ['پالش شدہ پیتل کی مربع تختی', 'نیلا یا سنہری ریشمی کپڑا']
      },
      {
        category: 'بخورات',
        items: ['خالص عود', 'عنبر', 'زعفران کی دھونی']
      }
    ],
    usageMethods: [
      {
        methodTitle: 'بٹوے یا تجوری میں رکھنا',
        targetEffect: 'مال و زر میں برکت اور کبھی جیب خالی نہ ہونا۔',
        instructions: 'لوح کو بٹوے کے اندر یا دکان کے گلے میں پیسوں کے اوپر رکھیں۔',
        duration: 'دائمی۔'
      },
      {
        methodTitle: 'گلے میں پہننا',
        targetEffect: 'وقار، رزق کی کشادگی اور ہر محفل میں تعظیم۔',
        instructions: 'سنہری غلاف میں گلے میں پہنیں۔',
        duration: 'مستقل۔'
      }
    ],
    kashAlBarnySecrets: [
      'کاش البرنی نے کتاب "مفتاح الجفر" میں فرمایا کہ لوحِ مشتری جیسا معاشی تیر بہدف عمل تمام عملیاتِ رزق کا سردار ہے۔'
    ]
  },

  // 6. زہرہ (لوحِ زہرہ و الفت / ناہید)
  {
    id: 'loh-venus',
    planetKey: 'venus',
    planetNameUrdu: 'زہرہ (ناہید / مطربۂ فلک)',
    planetTitleUrdu: 'کوکبِ حسن، الفت، محبت، شادی، نغمہ و دلکشی',
    lohNameUrdu: 'لوحِ زہرہ و الفت (لوحِ جذبِ قلوب، موافقتِ زوجین و رشتۂ مسرت)',
    englishName: 'Talismanic Plate of Venus (Aphrodite)',
    nature: 'saad_asghar',
    natureUrdu: 'سعدِ لطیف (جاذب و مسرت بخش)',
    natureBadgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    governingDay: 'جمعہ (آدینہ)',
    governingNight: 'منگل کی رات',
    zodiacRulership: 'برج ثور و میزان (Taurus & Libra)',
    sharafDegree: '۲۷ درجہ برج حوت (Pisces 27°)',
    hubootDegree: '۲۷ درجہ برج سنبلہ (Virgo 27°)',
    element: 'earth',
    elementUrdu: 'خاک (تر و سرد مائل بہ لطافت)',
    metal: 'سرخ تانبا (Pure Copper) یا پیتلِ سرخ',
    metalColor: '#f43f5e',
    plateVisualBg: 'from-rose-100 via-pink-200 to-rose-300 text-rose-950 shadow-rose-500/30',
    plateBorder: 'border-rose-400',
    textColor: 'text-rose-950',
    inkType: 'عرقِ گلاب، زعفران، صندلِ سرخ اور مشک',
    incense: 'مستگی، عود، لبان، خشک گلاب کے پھول اور عنبر',
    direction: 'مغرب (سمتِ عشق و کشش)',
    color: 'گلابی، سرخِ گلاب، فیروزی و چمکدار سفید',
    divineNames: ['یا ودود', 'یا حبیب', 'یا رؤوف', 'یا لطیف', 'یا جامع', 'یا مجیب'],
    muwakkilUlwi: 'حضرت عنیائیل علیہ السلام',
    muwakkilSifli: 'الملک زوبعۃ (ابا حسن)',
    quranicVerse: '﴿وَأَلْقَيْتُ عَلَيْكَ مَحَبَّةً مِّنِّي وَلِتُصْنَعَ عَلَىٰ عَيْنِي﴾ ﴿يُحِبُّونَهُمْ كَحُبِّ اللَّهِ﴾',
    quranicSurah: 'سورۃ یوسف، سورۃ الروم و سورۃ النور',
    adadBase: 1240,
    wafqType: 'وفقِ مسدس (6x6) زہرہ یا مثلثِ ودود',
    wafqDimensions: 6,
    wafqDefaultGrid: [
      [35, 1, 6, 26, 19, 24],
      [3, 32, 7, 21, 23, 25],
      [31, 9, 2, 22, 27, 20],
      [8, 28, 33, 17, 10, 15],
      [30, 5, 34, 12, 14, 16],
      [4, 36, 29, 13, 18, 11]
    ],
    saadPurposes: [
      'شادی میں رکاوٹوں کا فوری خاتمہ، نیک و پسندیدہ رشتے کا حصول۔',
      'میاں بیوی کے درمیان لازوال محبت، ناچاقی و طلاق کے خطرات کا تدارک۔',
      'چہرے پر غیر معمولی نورانیت، حسن، جاذبیت اور ہر دلعزیزی۔',
      'گھریلو جھگڑوں اور نفرتوں کا خاتمہ اور محبت کا قیام۔'
    ],
    nahsOrDefensivePurposes: [
      'جدائی اور نفرت ڈالنے والے سفلی سحر کا توڑ کرنے کے لیے زہرہ کا طلسم قاطع کی مانند کام کرتا ہے۔'
    ],
    preparationSteps: [
      {
        stepNumber: 1,
        title: 'ساعتِ زہرہ',
        description: 'جمعہ کے دن طلوعِ آفتاب کے بعد پہلی ساعت۔ نوچندی جمعہ کا انتخاب افضل ہے۔',
        precautions: 'پاک صاف خوشبو دار سرخ یا سفید لباس زیب تن کریں۔'
      },
      {
        stepNumber: 2,
        title: 'تانبے کی لوح پر تحریر',
        description: 'تانبے کی تختی پر وفقِ مسدس اور دونوں طرف طالب و مطلوب کے نام مع والدہ اور اسمِ "یا ودود" کندہ کریں۔',
        precautions: 'حروف کو درست نقطوں کے ساتھ لکھیں۔'
      },
      {
        stepNumber: 3,
        title: 'عزیمت و ترویہ',
        description: 'گلاب کے پھولوں اور لوبان کی دھونی دیتے ہوئے اسم "یا ودود یا حبیب" ۱۰۰۱ مرتبہ پڑھ کر دم کریں۔',
        precautions: 'لوح پر عطرِ گلاب کا ہلکا مسح کریں۔'
      }
    ],
    lawazmat: [
      {
        category: 'دھات',
        items: ['خالص تانبے کی چوکور یا دل کی شکل کی تختی', 'گلابی یا سرخ ریشم']
      },
      {
        category: 'بخورات',
        items: ['مستگی رومی', 'سوکھے دیسی گلاب کی پتیاں', 'عودِ خام']
      }
    ],
    usageMethods: [
      {
        methodTitle: 'گلے میں پہننا',
        targetEffect: 'رشتہ داری، شادی کی رکاوٹ کا خاتمہ اور کشش۔',
        instructions: 'گلابی کپڑے میں لپیٹ کر گلے میں ڈالیں۔',
        duration: 'شادی و مراد برآری تک۔'
      },
      {
        methodTitle: 'شربت یا پانی میں پلا دینا',
        targetEffect: 'میاں بیوی میں ناچاقی دور کر کے دائمی الفت پیدا کرنا۔',
        instructions: 'لوح کو میٹھے شربت میں چند منٹ رکھیں اور دونوں فریق پی لیں۔',
        duration: '۳ تا ۷ روز۔'
      }
    ],
    kashAlBarnySecrets: [
      'کاش البرنی فرماتے ہیں کہ لوحِ زہرہ پر آیت ﴿عَسَى اللَّهُ أَن يَجْعَلَ بَيْنَكُمْ وَبَيْنَ الَّذِينَ عَادَيْتُم مِّنْهُم مَّوَدَّةً﴾ لکھنا پتھر دل کو بھی موم کر دیتا ہے۔'
    ]
  },

  // 7. زحل (لوحِ زحل و ہیبت / قفلِ اعداء و حصار)
  {
    id: 'loh-saturn',
    planetKey: 'saturn',
    planetNameUrdu: 'زحل (شیخِ فلک / کیوان)',
    planetTitleUrdu: 'کوکبِ بقا، صبر، زمین، کہنگی، زبان بندی و حصارِ آہنی',
    lohNameUrdu: 'لوحِ زحل و ہیبت (لوحِ زبان بندی، قفلِ اعداء، حصارِ شدید و دفعِ آسیب)',
    englishName: 'Talismanic Plate of Saturn (Kronos)',
    nature: 'nahs_akbar',
    natureUrdu: 'نحسِ اکبر (سرد و خشک، ثقیل و قاہر)',
    natureBadgeColor: 'bg-zinc-200 text-zinc-900 border-zinc-400',
    governingDay: 'ہفتہ (شنبہ)',
    governingNight: 'بدھ کی رات',
    zodiacRulership: 'برج جدی و دلو (Capricorn & Aquarius)',
    sharafDegree: '۲۱ درجہ برج میزان (Libra 21°)',
    hubootDegree: '۲۱ درجہ برج حمل (Aries 21°)',
    element: 'earth',
    elementUrdu: 'خاک (سرد و خشک شدید)',
    metal: 'سیسہ (Lead Sheet) یا کالا پتھر / لوہا',
    metalColor: '#52525b',
    plateVisualBg: 'from-zinc-200 via-stone-300 to-gray-400 text-zinc-950 shadow-zinc-600/30',
    plateBorder: 'border-zinc-700',
    textColor: 'text-zinc-950',
    inkType: 'کالی سیاہی، زنگار، نیلا تھوتھا اور سرکہ (یا سیسے کی تختی پر کندہ کاری)',
    incense: 'حب الغار، میعہ سائلہ، لبانِ حبشی، چمڑے کی دھونی اور حرمل',
    direction: 'جنوب و مغرب (سمتِ کہنگی)',
    color: 'سیاہ، گہرا سرمئی و پختہ مٹیالا',
    divineNames: ['یا مانع', 'یا صبور', 'یا قابض', 'یا ممیت', 'یا عظیم', 'یا قدوس'],
    muwakkilUlwi: 'حضرت کسفیائیل علیہ السلام',
    muwakkilSifli: 'الملک میمون (ابا نوخ)',
    quranicVerse: '﴿وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ﴾',
    quranicSurah: 'سورۃ الہمزۃ، سورۃ الزلزال و آیاتِ صوامت',
    adadBase: 778,
    wafqType: 'وفقِ مثلث (3x3) زحلی یا خاتمِ بطد زہج',
    wafqDimensions: 3,
    wafqDefaultGrid: [
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6]
    ],
    saadPurposes: [
      'جائیداد، زرعی اراضی، عمارت اور پرانے خاندانی تنازعات میں استحکام و فتح۔',
      'صبر، استقامت، عزمِ صمیم اور طویل عمر کی حفاظت۔',
      'دائمی و خطرناک امراضِ کہنہ سے حفاظت۔'
    ],
    nahsOrDefensivePurposes: [
      'بدخواہوں اور حاسدوں کی زبان بندی، جھوٹے مقدمات کا قفل اور ظالمین کے منہ بند کرنا۔',
      'خبیث جنات، شیاطین اور کالا جادو کے اثرات کو ہمیشہ کے لیے زمین دوز کرنا۔'
    ],
    preparationSteps: [
      {
        stepNumber: 1,
        title: 'ساعتِ زحل',
        description: 'ہفتہ کے دن طلوعِ آفتاب کے بعد پہلی ساعت یا غروبِ آفتاب کے وقت ساعتِ زحل۔',
        precautions: 'حصارِ بدنی لگانا انتہائی ضروری ہے۔ باطل مقاصد کے لیے بنانا سخت گناہ ہے۔'
      },
      {
        stepNumber: 2,
        title: 'سیسے کی لوح پر کندہ کاری',
        description: 'سیسے کے پترے پر وفقِ مثلث بطد زہج اور چاروں طرف حروفِ صوامت (ا، ح، د، ر، س، ص، ط، ع، ق، ل، م، و، ہ) لکھیں۔',
        precautions: 'حروف بے نقط ہوں اور دائرے بند نہ ہوں۔'
      },
      {
        stepNumber: 3,
        title: 'عزیمت و قفل',
        description: 'حب الغار اور لبان کی دھونی دیتے ہوئے اسمِ "یا مانع یا صبور" ۷۷۸ مرتبہ اور سورۃ یٰسین کی آیتِ سد ۴۱ مرتبہ پڑھیں۔',
        precautions: 'لوح کو سیاہ کپڑے میں لپیٹیں۔'
      }
    ],
    lawazmat: [
      {
        category: 'دھات',
        items: ['خالص سیسے کا وزنی پترہ (Lead Sheet)', 'سیاہ کپڑا یا چمڑا']
      },
      {
        category: 'بخورات',
        items: ['حب الغار', 'میعہ سائلہ', 'حرمل']
      }
    ],
    usageMethods: [
      {
        methodTitle: 'زمین میں دفن کرنا (قفل و زبان بندی)',
        targetEffect: 'دشمنوں کی زبان بندی اور سحر کا دفن۔',
        instructions: 'لوح کو موم جامہ کر کے کسی پرانے درخت کے نیچے یا ویران جگہ مٹی میں دفنائیں۔',
        duration: 'جب تک دفن رہے گی اثر قائم رہے گا۔'
      },
      {
        methodTitle: 'مکان کی بنیاد میں رکھنا',
        targetEffect: 'مکان کی چوروں، آفات اور شیاطین سے مستقل حفاظت۔',
        instructions: 'مکان کے جنوبی کونے کی دیوار یا بنیاد میں چنوا دیں۔',
        duration: 'دائمی حصار۔'
      }
    ],
    kashAlBarnySecrets: [
      'کاش البرنی فرماتے ہیں کہ زحل کا مثلث تمام اوفاق کی ماں ہے۔ اگر اس کے اعداد ۳۶۰ کا نقش سیسے پر بنایا جائے تو کوئی طاقتور سے طاقتور جادوگر بھی اسے توڑ نہیں سکتا۔'
    ]
  }
];

// Saad vs Nahs Comprehensive Timings Matrix
export const SAAD_NAHS_HOURS_GUIDE = [
  {
    planet: 'شمس',
    saadTimes: 'اتوار ۱، ۸ بجے دن، جمعرات ۴ بجے دن، پیر ۶ بجے دن',
    nahsTimes: 'منگل و ہفتہ کے زوال کا وقت',
    actionRecommendation: 'عزت، منصب، تسخیرِ حکام، ملازمت کے انٹرویو اور امتحانات کے اعمال۔'
  },
  {
    planet: 'قمر',
    saadTimes: 'پیر ۱، ۸ بجے دن، جمعہ ۴ بجے دن، اتوار ۵ بجے دن',
    nahsTimes: 'قمر در عقرب، محاق (آخری دو راتیں)',
    actionRecommendation: 'محبت، تسخیرِ عامہ، شفا، بحری سفر اور مسرت کے کام۔'
  },
  {
    planet: 'مریخ',
    saadTimes: 'منگل ۱، ۸ بجے دن (برائے شجاعت و فتح)',
    nahsTimes: 'منگل زوال و غروب کا وقت (شدید نحس برائے عام کام، لیکن قاطع برائے دفعِ سحر)',
    actionRecommendation: 'دفعِ اعداء، ابطالِ جادو، دشمنوں پر غلبہ اور باطل کا خاتمہ۔'
  },
  {
    planet: 'عطارد',
    saadTimes: 'بدھ ۱، ۸ بجے دن (جب مستقیم ہو)',
    nahsTimes: 'بدھ جب عطارد رجعت (Retrograde) یا تحت الشعاع ہو',
    actionRecommendation: 'ذہانت، پڑھائی، امتحانات، تجارت، کاروبار اور خط و کتابت۔'
  },
  {
    planet: 'مشتری',
    saadTimes: 'جمعرات ۱، ۸ بجے دن، اتوار ۴ بجے دن',
    nahsTimes: 'جمعرات ہبوط کے اوقات',
    actionRecommendation: 'دولت، رزقِ وسیع، فقر کا خاتمہ، قرض سے خلاصی اور روحانی بلندی۔'
  },
  {
    planet: 'زہرہ',
    saadTimes: 'جمعہ ۱، ۸ بجے دن، بدھ ۴ بجے دن',
    nahsTimes: 'جمعہ غروبِ آفتاب کے بعد کا زوال',
    actionRecommendation: 'عشق، محبت، نکاح، رشتہ، موافقتِ زوجین اور حسن و کشش۔'
  },
  {
    planet: 'زحل',
    saadTimes: 'ہفتہ ۱، ۸ بجے دن (برائے جائیداد، تعمیر و صبر)',
    nahsTimes: 'ہفتہ کی درمیانی ساعتیں (شدید ثقیل)',
    actionRecommendation: 'زبان بندی، حصارِ شدید، قفلِ اعداء، دفعِ آسیب اور سحر کی بندش۔'
  }
];

// Sharaf (Exaltation) Planetary Talismans Database
export interface PlanetarySharafItem {
  id: string;
  planetKey: 'sun' | 'moon' | 'mars' | 'mercury' | 'jupiter' | 'venus' | 'saturn';
  planetNameUrdu: string;
  sharafTitleUrdu: string;
  sharafZodiac: string;
  sharafDegree: string;
  hubootZodiac: string;
  hubootDegree: string;
  lunarMansion: string;
  timingRule: string;
  metal: string;
  metalColor: string;
  incense: string;
  divineNames: string[];
  muwakkilUlwi: string;
  muwakkilSifli: string;
  quranicVerse: string;
  adadBase: number;
  wafqType: string;
  wafqDimensions: number;
  wafqGrid: number[][];
  benefits: string[];
  preparationProtocol: string[];
  kashAlBarnyNotes: string;
}

export const PLANETARY_SHARAF_DATABASE: PlanetarySharafItem[] = [
  // 1. شرفِ قمر (Exaltation of Moon)
  {
    id: 'sharaf-qamar',
    planetKey: 'moon',
    planetNameUrdu: 'قمر (چاند)',
    sharafTitleUrdu: 'لوحِ شرفِ قمرِ اعظم (اکسیرِ تسخیرِ قلوب، الفت، قبولیت و شفائے امراض)',
    sharafZodiac: 'برج ثور (Taurus)',
    sharafDegree: '۳ درجہ برج ثور (۳° Taurus)',
    hubootZodiac: 'برج عقرب (Scorpio)',
    hubootDegree: '۳ درجہ برج عقرب (۳° Scorpio)',
    lunarMansion: 'منزلِ ثریا و بطین',
    timingRule: 'جب قمر برج ثور کے ۳ درجے پر داخل ہو (یا نوچندی پیر کی ساعتِ اول جب چاند روشن اور بڑھ رہا ہو)۔',
    metal: 'خالص چاندی (Fine Silver) کا ہموار پترہ یا سفید رانگا',
    metalColor: '#94a3b8',
    incense: 'کافور، صندلِ سفید، عطرِ گلاب، مستگی رومی و لبانِ نر',
    divineNames: ['یا رحمن', 'یا رحیم', 'یا سلام', 'یا لطیف', 'یا مجیب', 'یا قدوس', 'یا نور'],
    muwakkilUlwi: 'حضرت جبرائیل فلکی علیہ السلام',
    muwakkilSifli: 'الملک ابا الحارث الابیض',
    quranicVerse: '﴿وَالْقَمَرَ قَدَّرْنَاهُ مَنَازِلَ حَتَّىٰ عَادَ كَالْعُرْجُونِ الْقَدِيمِ﴾ ﴿يُحِبُّونَهُمْ كَحُبِّ اللَّهِ﴾',
    adadBase: 360,
    wafqType: 'وفقِ مسبع (7x7) شرفِ قمر مع ۲۸ منازل',
    wafqDimensions: 7,
    wafqGrid: [
      [22, 47, 16, 41, 10, 35, 4],
      [5, 23, 48, 17, 42, 11, 29],
      [30, 6, 24, 49, 18, 36, 12],
      [13, 31, 7, 25, 43, 19, 37],
      [38, 14, 32, 1, 26, 44, 20],
      [21, 39, 8, 33, 2, 27, 45],
      [46, 15, 40, 9, 34, 3, 28]
    ],
    benefits: [
      'تسخیرِ خلائق، جلبِ قلوب اور ہر شخص کی نگاہ میں محبوب و محترم ہونا۔',
      'امراضِ باطنی، نسیان، خوف، وہم اور شدید ذہنی پریشانیوں کا فوری علاج۔',
      'سفر میں حفاظت، پانی کے خطرات سے امان اور ہر مہم میں کامیابی۔',
      'چہرے کی رونق، خوبصورتی اور روحانی کشش میں غیر معمولی اضافہ۔'
    ],
    preparationProtocol: [
      'نوچندی پیر کی صبح طلوعِ آفتاب کے فوراً بعد غسل کر کے سفید لباس پہنیں۔',
      'چاندی کی تختی پر کافور اور عرقِ گلاب چھڑک کر کندہ کاری شروع کریں۔',
      'لوح کے ایک طرف ۷×۷ وفق اور دوسری طرف آیتِ محبت و اسمائے سبعہ کندہ کریں۔',
      'تکمیل پر سورۃ القمر ۱۱ بار اور اسمِ یا لطیف یا سلام ۱۰۰۱ بار پڑھ کر دم کریں۔'
    ],
    kashAlBarnyNotes: 'کاش البرنی فرماتے ہیں کہ شرفِ قمر کے لمحات سال میں کواکب کے سعد ترین اوقات میں شمار ہوتے ہیں۔ اگر اس وقت چاندی کی لوح تیار کر لی جائے تو حامل تمام عمر محتاجی اور بے قدری سے محفوظ رہتا ہے۔'
  },

  // 2. شرفِ عطارد (Exaltation of Mercury)
  {
    id: 'sharaf-mercury',
    planetKey: 'mercury',
    planetNameUrdu: 'عطارد (کاتبِ فلک / دبیرِ سماء)',
    sharafTitleUrdu: 'لوحِ شرفِ عطاردِ ذکاء (اکسیرِ حکمت، فصاحت، کامیابیِ امتحانات، عقل و وسعتِ تجارت)',
    sharafZodiac: 'برج سنبلہ (Virgo)',
    sharafDegree: '۱۵ درجہ برج سنبلہ (۱۵° Virgo)',
    hubootZodiac: 'برج حوت (Pisces)',
    hubootDegree: '۱۵ درجہ برج حوت (۱۵° Pisces)',
    lunarMansion: 'منزلِ عواء و صرفہ',
    timingRule: 'جب عطارد سنبلہ کے ۱۵ درجے پر مقیم ہو (بدھ کے دن پہلی ساعتِ عطارد میں جب وہ مستقیم ہو)۔',
    metal: 'کانسی (Bronze Sheet)، پیتلِ زرد یا شیشہ و پارہ دار پترہ',
    metalColor: '#10b981',
    incense: 'جاوی، مستگی رومی، چھوٹی الائچی، صندلِ زرد و صمغِ عربی',
    divineNames: ['یا علیم', 'یا حکیم', 'یا خبیر', 'یا فتاح', 'یا مبین', 'یا ہادی', 'یا رشید'],
    muwakkilUlwi: 'حضرت میکائیل فلکی علیہ السلام',
    muwakkilSifli: 'الملک برقان (ابا العجائب)',
    quranicVerse: '﴿ن ۚ وَالْقَلَمِ وَمَا يَسْطُرُونَ﴾ ﴿اقْرَأْ وَرَبُّكَ الْأَكْرَمُ الَّذِي عَلَّمَ بِالْقَلَمِ﴾',
    adadBase: 460,
    wafqType: 'وفقِ مثمن (8x8) شرفِ عطارد',
    wafqDimensions: 8,
    wafqGrid: [
      [1, 63, 62, 4, 5, 59, 58, 8],
      [56, 10, 11, 53, 52, 14, 15, 49],
      [48, 18, 19, 45, 44, 22, 23, 41],
      [25, 39, 38, 28, 29, 35, 34, 32],
      [33, 31, 30, 36, 37, 27, 26, 40],
      [24, 42, 43, 21, 20, 46, 47, 17],
      [16, 50, 51, 13, 12, 54, 55, 9],
      [57, 7, 6, 60, 61, 3, 2, 64]
    ],
    benefits: [
      'ذہانت، تیز حافظہ، ادراکِ مسائل اور کتابیں زبانی یاد ہو جانے کی صلاحیت۔',
      'امتحانات، انٹرویوز، مناظرے اور عدالتی دلائل میں مکمل فتح و فصاحت۔',
      'تجارت، آن لائن کاروبار، حساب و کتاب اور شراکت داری میں غیر معمولی ترقی۔',
      'زبان کی لکنت، ہکلانے اور دماغی کمزوری کا حتمی روحانی علاج۔'
    ],
    preparationProtocol: [
      'بدھ کے دن طلوعِ آفتاب کے بعد پہلی ساعت میں سبز لباس پہن کر قبلہ رخ بیٹھیں۔',
      'کانسی یا پالش شدہ تختی پر سبز سیاہی یا فولادی قلم سے ۸×۸ کا نقش تحریر کریں۔',
      'جاوی اور الائچی کی دھونی دیتے ہوئے اسمِ "یا علیم یا حکیم" ۴۶۰ مرتبہ پڑھیں۔',
      'لوح کو سبز ریشم میں لپیٹ کر پاس رکھیں یا تعلیمی بستے/کیش باکس میں رکھیں۔'
    ],
    kashAlBarnyNotes: 'کاش البرنی کتاب "مفتاح الجفر" میں تحریر کرتے ہیں کہ شرفِ عطارد کے وقت تیار کردہ لوح طالب علموں اور تاجروں کے لیے اکسیرِ اعظم ہے؛ جس کے پاس یہ لوح ہو اس کا ذہن کبھی معطل نہیں ہوتا۔'
  },

  // 3. شرفِ شمس (Exaltation of Sun)
  {
    id: 'sharaf-shams',
    planetKey: 'sun',
    planetNameUrdu: 'شمس (نیّرِ اعظم)',
    sharafTitleUrdu: 'لوحِ شرفِ شمسِ معظم (سلطانِ الواح و تسخیرِ ملوک و جاہ و حشمت)',
    sharafZodiac: 'برج حمل (Aries)',
    sharafDegree: '۱۹ درجہ برج حمل (۱۹° Aries)',
    hubootZodiac: 'برج میزان (Libra)',
    hubootDegree: '۱۹ درجہ برج میزان (۱۹° Libra)',
    lunarMansion: 'منزلِ بطین و شرطین',
    timingRule: 'سال میں ایک بار جب سورج ۱۹ درجہ برج حمل پر آتا ہے (عموماً ۸ تا ۱۲ اپریل کی مخصوص ساعتِ شمس)۔',
    metal: 'خالص سونا (Gold Sheet) یا سنہری پیتل',
    metalColor: '#f59e0b',
    incense: 'خالص عودِ ہندی، صندلِ سرخ، زعفران و کندر',
    divineNames: ['یا اللہ', 'یا نور', 'یا باسط', 'یا فرد', 'یا رافع', 'یا عزیز'],
    muwakkilUlwi: 'حضرت روقیائیل علیہ السلام',
    muwakkilSifli: 'الملک المذہب',
    quranicVerse: '﴿اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ مَثَلُ نُورِهِ كَمِشْكَاةٍ فِيهَا مِصْبَاحٌ﴾',
    adadBase: 669,
    wafqType: 'وفقِ مسدس (6x6) شرفِ شمس',
    wafqDimensions: 6,
    wafqGrid: [
      [6, 32, 3, 34, 35, 1],
      [7, 11, 27, 28, 8, 30],
      [19, 14, 16, 15, 23, 24],
      [18, 20, 22, 21, 17, 13],
      [25, 29, 10, 9, 26, 12],
      [36, 5, 33, 4, 2, 31]
    ],
    benefits: [
      'حکومت، وزارت، افسرانِ بالا اور عدلیہ میں بے پناہ رعب و وقعت۔',
      'حاسدین کی آنکھیں خیرہ ہونا اور دشمنوں کے دلوں میں ہیبت پیدا ہونا۔',
      'دائمی معاشی خود کفالت اور عزت و وقار کی بلندی۔'
    ],
    preparationProtocol: [
      '۱۹ درجہ حمل کے دوران طلوعِ آفتاب پر سونے کے پترے پر مسدس شمس کندہ کریں۔',
      'زعفران اور عرقِ گلاب سے ترویہ کریں اور سورۃ الشمس ۴۱ بار تلاوت کریں۔',
      'زرد ریشمی غلاف میں بازو پر باندھیں۔'
    ],
    kashAlBarnyNotes: 'شرفِ شمس کی لوح تمام الواح کی بادشاہ مانی جاتی ہے اور اس کا اثر سالہا سال قائم رہتا ہے۔'
  },

  // 4. شرفِ زہرہ (Exaltation of Venus)
  {
    id: 'sharaf-venus',
    planetKey: 'venus',
    planetNameUrdu: 'زہرہ (ناہید / مطربۂ فلک)',
    sharafTitleUrdu: 'لوحِ شرفِ زہرہ و الفت (اکسیرِ الفت، حسن، نکاح و موافقتِ قلوب)',
    sharafZodiac: 'برج حوت (Pisces)',
    sharafDegree: '۲۷ درجہ برج حوت (۲۷° Pisces)',
    hubootZodiac: 'برج سنبلہ (Virgo)',
    hubootDegree: '۲۷ درجہ برج سنبلہ (۲۷° Virgo)',
    lunarMansion: 'منزلِ فرغ مؤخر و بطن الحوت',
    timingRule: 'جب زہرہ برج حوت کے ۲۷ درجے پر پہنچے (جمعہ کی پہلی ساعت میں)۔',
    metal: 'خالص تانبا (Pure Red Copper Sheet)',
    metalColor: '#f43f5e',
    incense: 'عطرِ گلاب، خشک گلاب، مستگی، عود و عنبر',
    divineNames: ['یا ودود', 'یا حبیب', 'یا رؤوف', 'یا لطیف', 'یا جامع', 'یا مجیب'],
    muwakkilUlwi: 'حضرت عنیائیل علیہ السلام',
    muwakkilSifli: 'الملک زوبعۃ',
    quranicVerse: '﴿وَأَلْقَيْتُ عَلَيْكَ مَحَبَّةً مِّنِّي وَلِتُصْنَعَ عَلَىٰ عَيْنِي﴾',
    adadBase: 1240,
    wafqType: 'وفقِ مسدس (6x6) شرفِ زہرہ',
    wafqDimensions: 6,
    wafqGrid: [
      [35, 1, 6, 26, 19, 24],
      [3, 32, 7, 21, 23, 25],
      [31, 9, 2, 22, 27, 20],
      [8, 28, 33, 17, 10, 15],
      [30, 5, 34, 12, 14, 16],
      [4, 36, 29, 13, 18, 11]
    ],
    benefits: [
      'شادی میں بندشوں کا حتمی توڑ اور من پسند رشتہ۔',
      'میاں بیوی میں محبتِ لازوال اور نفرتوں کا خاتمہ۔',
      'چہرے کا حسن و جمال اور پرکشش جاذبیت۔'
    ],
    preparationProtocol: [
      'نوچندی جمعہ کی پہلی ساعت میں تانبے پر وفقِ مسدس کندہ کریں۔',
      'گلاب کے عطر سے مسح کریں اور اسمِ یا ودود ۱۰۰۱ بار پڑھ کر دم کریں۔'
    ],
    kashAlBarnyNotes: 'شرفِ زہرہ کی لوح دلوں کو ایسے کھینچتی ہے جیسے مقناطیس لوہے کو کھینچتا ہے۔'
  },

  // 5. شرفِ مشتری (Exaltation of Jupiter)
  {
    id: 'sharaf-jupiter',
    planetKey: 'jupiter',
    planetNameUrdu: 'مشتری (برجیس / سعدِ اکبر)',
    sharafTitleUrdu: 'لوحِ شرفِ مشتری و غنا (اکسیرِ دولت، وسعتِ رزق، نجات از قرض و روحانی فیض)',
    sharafZodiac: 'برج سرطان (Cancer)',
    sharafDegree: '۱۵ درجہ برج سرطان (۱۵° Cancer)',
    hubootZodiac: 'برج جدی (Capricorn)',
    hubootDegree: '۱۵ درجہ برج جدی (۱۵° Capricorn)',
    lunarMansion: 'منزلِ نثرہ و طرف',
    timingRule: 'جب مشتری برج سرطان کے ۱۵ درجے پر ہو (جمعرات کی پہلی ساعتِ مشتری)۔',
    metal: 'پالش شدہ پیتل یا قلعی دار تانبا',
    metalColor: '#6366f1',
    incense: 'خالص عود، مشک، زعفران و لبانِ ذکر',
    divineNames: ['یا رزاق', 'یا فتاح', 'یا غنی', 'یا مغنی', 'یا وہاب', 'یا کریم'],
    muwakkilUlwi: 'حضرت صرفیائیل علیہ السلام',
    muwakkilSifli: 'الملک شمہورش',
    quranicVerse: '﴿إِنَّ اللَّهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ﴾',
    adadBase: 1060,
    wafqType: 'وفقِ مربع (4x4) شرفِ مشتری',
    wafqDimensions: 4,
    wafqGrid: [
      [4, 14, 15, 1],
      [9, 7, 6, 12],
      [5, 11, 10, 8],
      [16, 2, 3, 13]
    ],
    benefits: [
      'دولت و زر میں بے پناہ برکت اور فقر کا کلی خاتمہ۔',
      'بھاری قرضوں سے غیبی نجات اور مالی وسعت۔',
      'روحانی مدارج اور تقویٰ و علم کا حصول۔'
    ],
    preparationProtocol: [
      'جمعرات کی پہلی ساعت میں پیتل کی تختی پر مربع مشتری کندہ کریں۔',
      'زعفران کی دھونی دیں اور سورۃ الواقعہ ۳ بار تلاوت کر کے دم کریں۔'
    ],
    kashAlBarnyNotes: 'مشتری کا شرف فقر و ناداری کو جڑ سے مٹا دیتا ہے اور کاروبار میں غیبی فتح لاتا ہے۔'
  },

  // 6. شرفِ مریخ (Exaltation of Mars)
  {
    id: 'sharaf-mars',
    planetKey: 'mars',
    planetNameUrdu: 'مریخ (جلادِ فلک)',
    sharafTitleUrdu: 'لوحِ شرفِ مریخ و قہر (شجاعت، غلبہ بر اعداء، ابطالِ سحر و فتحِ مبین)',
    sharafZodiac: 'برج جدی (Capricorn)',
    sharafDegree: '۲۸ درجہ برج جدی (۲۸° Capricorn)',
    hubootZodiac: 'برج سرطان (Cancer)',
    hubootDegree: '۲۸ درجہ برج سرطان (۲۸° Cancer)',
    lunarMansion: 'منزلِ سعد الذابح',
    timingRule: 'جب مریخ جدی کے ۲۸ درجے پر ہو (منگل کی پہلی ساعت)۔',
    metal: 'فولاد و لوہا (Steel/Iron Sheet)',
    metalColor: '#dc2626',
    incense: 'حرمل (اسپند)، رائی، سرخ صندل، گوگل',
    divineNames: ['یا قہار', 'یا جبار', 'یا منتقم', 'یا مذل', 'یا قوی'],
    muwakkilUlwi: 'حضرت سمسمائیل علیہ السلام',
    muwakkilSifli: 'الملک الاحمر',
    quranicVerse: '﴿وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ إِنَّ الْبَاطِلَ كَانَ زَهُوقًا﴾',
    adadBase: 306,
    wafqType: 'وفقِ مخمس (5x5) شرفِ مریخ',
    wafqDimensions: 5,
    wafqGrid: [
      [11, 24, 7, 20, 3],
      [4, 12, 25, 8, 16],
      [17, 5, 13, 21, 9],
      [10, 18, 1, 14, 22],
      [23, 6, 19, 2, 15]
    ],
    benefits: [
      'دشمنوں کے شر کا منہ توڑ دفاع اور باطل کا خاتمہ۔',
      'خوف کا خاتمہ اور شجاعت و دبدبہ کا قیام۔',
      'کالے جادو اور سحرِ سفلی کا فوری الٹاؤ۔'
    ],
    preparationProtocol: [
      'منگل کی پہلی ساعت میں لوہے پر مخمس مریخ کندہ کریں۔',
      'حرمل کی دھونی دیتے ہوئے اسمِ یا قہار ۳۰۶ بار پڑھیں۔'
    ],
    kashAlBarnyNotes: 'مریخ کے شرف کی لوح کو صرف حق کے دفاع کے لیے استعمال کیا جائے۔'
  },

  // 7. شرفِ زحل (Exaltation of Saturn)
  {
    id: 'sharaf-saturn',
    planetKey: 'saturn',
    planetNameUrdu: 'زحل (شیخِ فلک / کیوان)',
    sharafTitleUrdu: 'لوحِ شرفِ زحل و بقا (زبان بندی، قفلِ اعداء، حصارِ اعظم و فتحِ اراضی)',
    sharafZodiac: 'برج میزان (Libra)',
    sharafDegree: '۲۱ درجہ برج میزان (۲۱° Libra)',
    hubootZodiac: 'برج حمل (Aries)',
    hubootDegree: '۲۱ درجہ برج حمل (۲۱° Aries)',
    lunarMansion: 'منزلِ غفر و زبانا',
    timingRule: 'جب زحل برج میزان کے ۲۱ درجے پر مقیم ہو (ہفتہ کی پہلی ساعت)۔',
    metal: 'سیسہ (Pure Lead Sheet)',
    metalColor: '#52525b',
    incense: 'حب الغار، میعہ سائلہ، لبانِ حبشی و حرمل',
    divineNames: ['یا مانع', 'یا صبور', 'یا قابض', 'یا ممیت', 'یا عظیم'],
    muwakkilUlwi: 'حضرت کسفیائیل علیہ السلام',
    muwakkilSifli: 'الملک میمون',
    quranicVerse: '﴿وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ﴾',
    adadBase: 778,
    wafqType: 'وفقِ مثلث (3x3) شرفِ زحل',
    wafqDimensions: 3,
    wafqGrid: [
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6]
    ],
    benefits: [
      'بدخواہوں کی مکمل زبان بندی اور جھوٹے مقدمات کا قفل۔',
      'مکان اور جائیداد کی دائمی حفاظت اور جنات کا اخراج۔',
      'صبر، استقامت اور پرانے مسائل کا حل۔'
    ],
    preparationProtocol: [
      'ہفتہ کی پہلی ساعت میں سیسے پر مثلثِ بطد زہج کندہ کریں۔',
      'حب الغار کی دھونی دیتے ہوئے اسمِ یا مانع یا صبور ۷۷۸ بار پڑھیں۔'
    ],
    kashAlBarnyNotes: 'شرفِ زحل کا مثلث تمام حصاروں کا باپ ہے جس کے سامنے کوئی باطل نہیں ٹکتا۔'
  }
];

// Presets for Seeker Objectives (مقاصدِ سائل)
export interface SeekerPurposePreset {
  id: string;
  title: string;
  category: 'saad' | 'nahs';
  recommendedPlanet: 'sun' | 'moon' | 'mars' | 'mercury' | 'jupiter' | 'venus' | 'saturn';
  recommendedPlanetUrdu: string;
  adad: number;
  asma: string[];
  verse: string;
  targetEffect: string;
}

export const SEEKER_PURPOSE_PRESETS: SeekerPurposePreset[] = [
  {
    id: 'p-love',
    title: 'تسخیرِ قلوب و جلبِ محبتِ زوجین',
    category: 'saad',
    recommendedPlanet: 'venus',
    recommendedPlanetUrdu: 'زہرہ (ناہید)',
    adad: 1240,
    asma: ['یا ودود', 'یا حبیب', 'یا جامع', 'یا لطیف'],
    verse: '﴿وَأَلْقَيْتُ عَلَيْكَ مَحَبَّةً مِّنِّي وَلِتُصْنَعَ عَلَىٰ عَيْنِي﴾',
    targetEffect: 'دلوں کو مسخر کرنا، پسندیدہ رشتہ اور میاں بیوی میں لازوال محبت کا قیام۔'
  },
  {
    id: 'p-wealth',
    title: 'وسعتِ رزق، غنائے کامل و برکتِ تجارت',
    category: 'saad',
    recommendedPlanet: 'jupiter',
    recommendedPlanetUrdu: 'مشتری (برجیس)',
    adad: 1060,
    asma: ['یا رزاق', 'یا فتاح', 'یا غنی', 'یا وہاب'],
    verse: '﴿إِنَّ اللَّهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ﴾',
    targetEffect: 'مال و زر کی وسعت، فقر کا خاتمہ اور کاروبار میں بے پناہ برکت۔'
  },
  {
    id: 'p-intellect',
    title: 'کامیابیِ امتحانات، ذہانت، فصاحت و حافظہ',
    category: 'saad',
    recommendedPlanet: 'mercury',
    recommendedPlanetUrdu: 'عطارد (دبیرِ فلک)',
    adad: 460,
    asma: ['یا علیم', 'یا حکیم', 'یا خبیر', 'یا مبین'],
    verse: '﴿ن ۚ وَالْقَلَمِ وَمَا يَسْطُرُونَ﴾',
    targetEffect: 'تیز حافظہ، امتحانات و انٹرویوز میں اول پوزیشن اور فصاحتِ کلام۔'
  },
  {
    id: 'p-authority',
    title: 'حصولِ عزت، جاہ و منصب و تسخیرِ حکام',
    category: 'saad',
    recommendedPlanet: 'sun',
    recommendedPlanetUrdu: 'شمس (نیّرِ اعظم)',
    adad: 669,
    asma: ['یا نور', 'یا باسط', 'یا رافع', 'یا عزیز'],
    verse: '﴿اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ﴾',
    targetEffect: 'اعلیٰ مناصب، حکام کے دلوں میں رعب اور شہرت و قبولیتِ عامہ۔'
  },
  {
    id: 'p-healing',
    title: 'شفائے امراض، سکونِ قلب و دفعِ خوف',
    category: 'saad',
    recommendedPlanet: 'moon',
    recommendedPlanetUrdu: 'قمر (چاند)',
    adad: 360,
    asma: ['یا سلام', 'یا شافی', 'یا لطیف', 'یا قدوس'],
    verse: '﴿وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ﴾',
    targetEffect: 'امراضِ باطنی و ظاہری سے نجات، سکونِ قلب اور خوف و وسوسوں کا خاتمہ۔'
  },
  {
    id: 'p-defense',
    title: 'ابطالِ سحر، دفعِ دشمنان و حفاظتِ اعداء',
    category: 'nahs',
    recommendedPlanet: 'mars',
    recommendedPlanetUrdu: 'مریخ (جلادِ فلک)',
    adad: 306,
    asma: ['یا قہار', 'یا جبار', 'یا منتقم', 'یا قوی'],
    verse: '﴿وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ إِنَّ الْبَاطِلَ كَانَ زَهُوقًا﴾',
    targetEffect: 'کالے جادو کا الٹاؤ، حاسدین و دشمنوں کے حملوں کا منہ توڑ دفاع۔'
  },
  {
    id: 'p-binding',
    title: 'زبان بندیِ بدخواہان، قفلِ اعداء و حصارِ آہنی',
    category: 'nahs',
    recommendedPlanet: 'saturn',
    recommendedPlanetUrdu: 'زحل (شیخِ فلک)',
    adad: 778,
    asma: ['یا مانع', 'یا صبور', 'یا قابض', 'یا عظیم'],
    verse: '﴿وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ﴾',
    targetEffect: 'جھوٹے مقدمات کا قفل، حاسدوں کے منہ بند اور مکان کی دائمی حفاظت۔'
  }
];

