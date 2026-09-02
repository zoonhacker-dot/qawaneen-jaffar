// --------------------------------------------------------------------------
// Comprehensive Planetary, Real-Time Astrological, & Eclipse (Kusoof/Khusoof)
// Operations Database according to Kash Al-Barni's Treatises:
// (قوانین طلسم، قوانین افلاطون، مفتاح الجفر، رموز الجفر، منازل القمر، احکام النجوم)
// --------------------------------------------------------------------------

export interface PlanetAstroProfile {
  id: string;
  nameUrdu: string;
  nameArabic: string;
  nameEnglish: string;
  statusUrdu: string; // سعد اکبر، سعد اصغر، نحس اکبر، نحس اصغر، ممتزج
  natureCategory: 'saad_akbar' | 'saad_asghar' | 'nahs_akbar' | 'nahs_asghar' | 'mumtazij';
  rulingDayUrdu: string;
  rulingHourUrdu: string;
  rulingZodiacUrdu: string; // بروج
  sharafBurjUrdu: string; // برجِ شرف
  hubootBurjUrdu: string; // برجِ ہبوط
  elementUrdu: string; // آتش، باد، آب، خاک
  metalUrdu: string; // سونا، چاندی، تانبا، لوہا، سیسہ، قلعی، پارہ
  incenseUrdu: string; // بخور
  inkUrdu: string; // زعفران، مشک، کالی سیاہی، زنگار
  directionUrdu: string; // سمت
  colorUrdu: string;
  primaryAttributes: string;
  bestAamalList: {
    title: string;
    type: 'khair' | 'shar' | 'shifa' | 'taskheer';
    description: string;
    protocol: string;
  }[];
  kashAlBarniRule: string;
}

export interface EclipseOperationProfile {
  id: string;
  eclipseType: 'solar' | 'lunar';
  eclipseNameUrdu: string;
  category: 'mahabbat_taskheer' | 'dushmani_halakat' | 'zaban_bandi' | 'judai_tafreeq' | 'shifa_hifazat';
  categoryUrdu: string;
  titleUrdu: string;
  purposeUrdu: string;
  timingRuleUrdu: string;
  metalOrPaperUrdu: string;
  inkAndPenUrdu: string;
  incenseUrdu: string;
  takseerAflatoonFormulaUrdu: string;
  azimatUrdu: string;
  disposalMethodUrdu: string; // جلانا، دفنانا، ہوا میں لٹکانا، پانی میں بہانا
  warningAndConditionsUrdu: string;
  kashAlBarniQuoteUrdu: string;
}

export const PLANETS_PROFILES: PlanetAstroProfile[] = [
  {
    id: 'shams',
    nameUrdu: 'شمس (سورج / Sun)',
    nameArabic: 'الشمس',
    nameEnglish: 'Sun',
    statusUrdu: 'سعدِ اکبر (پادشاہِ کواکب و منبعِ حیات)',
    natureCategory: 'saad_akbar',
    rulingDayUrdu: 'اتوار (یکشنبہ)',
    rulingHourUrdu: 'پہلی، آٹھویں اور پندرہویں ساعت',
    rulingZodiacUrdu: 'برج اسد (شیر)',
    sharafBurjUrdu: 'برج حمل (۱۹ درجہ)',
    hubootBurjUrdu: 'برج میزان (۱۹ درجہ)',
    elementUrdu: 'آتشی (گرم و خشک)',
    metalUrdu: 'خالص سونا (Gold) یا برنجِ زرد',
    incenseUrdu: 'صندل سرخ، عود، لوبانِ نر، مصطگی',
    inkUrdu: 'زعفران و عرقِ گلاب',
    directionUrdu: 'مشرق (East)',
    colorUrdu: 'سنہرا، زعفرانی و زرد',
    primaryAttributes: 'عزت، وجاہت، تسخیرِ حکام و امراء، رعب و دبدبہ، حیات اور امراضِ قلبی کی شفا۔',
    bestAamalList: [
      {
        title: 'تسخیرِ حکام، امراء و افسرانِ بالا',
        type: 'taskheer',
        description: 'شاہان اور با اختیار لوگوں کے دل میں ہیبت اور الفت پیدا کرنا۔',
        protocol: 'شمس کی پہلی ساعت میں سونے کی تختی یا ہرن کی جھلی پر سورۃ الفاتحہ اور اسمائے جلال کا نقشِ شمس زعفران سے تحریر کریں۔',
      },
      {
        title: 'لوحِ شمس برائے حصولِ عزت، جاہ و منصب',
        type: 'khair',
        description: 'معاشرے میں تکریم، ترقیِ ملازمت اور فتوحات کا حصول۔',
        protocol: 'شرفِ شمس کے وقت مربع ذوالکتابت یا مثلث آتشی کندہ کر کے دائیں بازو پر باندھیں۔',
      },
      {
        title: 'شفا از امراضِ قلب، سر اور بصارت',
        type: 'shifa',
        description: 'نظر کی کمزوری اور دل کی دھڑکن کے توازن کے لیے۔',
        protocol: 'چینی کی پلیٹ پر زعفران سے "یا نور یا بصیر" ۴۳۶ مرتبہ لکھ کر طلوعِ آفتاب پر پانی سے دھو کر پلائیں۔',
      },
    ],
    kashAlBarniRule: 'کاش البرنی (قوانین طلسم): "شمس فلکِ چہارم کا سلطان ہے، جب شمس اپنے شرف (حمل) میں ہو یا اس کی ساعت میں عمل کیا جائے تو تمام خلائق کے قلوب میں تسخیر اور رعب پیدا ہوتا ہے۔"',
  },
  {
    id: 'qamar',
    nameUrdu: 'قمر (چاند / Moon)',
    nameArabic: 'القمر',
    nameEnglish: 'Moon',
    statusUrdu: 'سعدِ اصغر (واسطۂ فیض و سریع السیر)',
    natureCategory: 'saad_asghar',
    rulingDayUrdu: 'پیر (دوشنبہ)',
    rulingHourUrdu: 'پہلی اور آٹھویں ساعت',
    rulingZodiacUrdu: 'برج سرطان (کیکڑا)',
    sharafBurjUrdu: 'برج ثور (۳ درجہ)',
    hubootBurjUrdu: 'برج عقرب (۳ درجہ - نحوستِ قمر در عقرب)',
    elementUrdu: 'آبی (سرد و تر)',
    metalUrdu: 'خالص چاندی (Silver)',
    incenseUrdu: 'صندل سفید، کافور، لبانِ ذکر',
    inkUrdu: 'عرقِ بید مشک و زعفرانِ رقیق',
    directionUrdu: 'شمال مغرب (North-West)',
    colorUrdu: 'سفید، نقرئی و موتی جیسا',
    primaryAttributes: 'سفر، جذب و الفت، امراضِ مائیہ کی شفا، حاملہ کی حفاظت، باطنی کشف اور خواب بندی۔',
    bestAamalList: [
      {
        title: 'محبت و الفتِ دائمی (نصفِ اولِ ماہ میں)',
        type: 'khair',
        description: 'میاں بیوی یا رشتہ داروں میں دائمی اتفاق اور پیار پیدا کرنا۔',
        protocol: 'چاند کے متزاید ایام میں چاندی کی انگوٹھی کے نگینے کے نیچے نقشِ قمر کندہ کریں۔',
      },
      {
        title: 'امراضِ نفسیاتی، وسوسے اور بے خوابی کا علاج',
        type: 'shifa',
        description: 'دماغی پریشانی اور برے خوابوں کی بندش۔',
        protocol: 'آبی چال سے مثلثِ شفا لکھ کر سوتے وقت سرہانے رکھیں۔',
      },
      {
        title: 'سفرِ بحری و بری میں سلامتی و برکت',
        type: 'khair',
        description: 'حادثات، ڈاکوؤں اور موسمی خطرات سے حفاظت۔',
        protocol: 'اسم مبارک "یا حفیظ یا سلام" ۲۸ منازل کے اعداد سمیت لکھ کر ہمراہ رکھیں۔',
      },
    ],
    kashAlBarniRule: 'کاش البرنی (مفتاح الجفر): "قمر تمام سیاروں کے انوار کو زمین پر منتقل کرتا ہے۔ جب قمر ثور میں ہو تو اعمالِ خیر کا تیر کبھی خطا نہیں جاتا، اور جب عقرب میں ہو تو نکاح و اعمالِ خیر قطعی ممنوع ہیں۔"',
  },
  {
    id: 'mirrikh',
    nameUrdu: 'مریخ (Mars)',
    nameArabic: 'المريخ',
    nameEnglish: 'Mars',
    statusUrdu: 'نحسِ اصغر (جلادِ فلک، قہر، شجاعت و حرب)',
    natureCategory: 'nahs_asghar',
    rulingDayUrdu: 'منگل (سہ شنبہ)',
    rulingHourUrdu: 'پہلی اور آٹھویں ساعت (بعد طلوع)',
    rulingZodiacUrdu: 'برج حمل و برج عقرب',
    sharafBurjUrdu: 'برج جدی (۲۸ درجہ)',
    hubootBurjUrdu: 'برج سرطان (۲۸ درجہ)',
    elementUrdu: 'آتشی (نہایت گرم و خشک)',
    metalUrdu: 'تانبا (Copper) یا فولاد/لوہا',
    incenseUrdu: 'حرمل (اسپند)، کالی مرچ، گندھک، رائی، حلتین (ہینگ)',
    inkUrdu: 'سیاہیِ کحل مع آبِ پیاز یا زنگار',
    directionUrdu: 'جنوب (South)',
    colorUrdu: 'سرخِ تند (Crimson Red)',
    primaryAttributes: 'دفعِ اعداء، فتحِ جنگ، قہر بر ظالمین، تفریقِ ظالمین، جراحت اور حفاظتِ سرحدات۔',
    bestAamalList: [
      {
        title: 'قہر بر اعداء و ہلاکتِ ظالمِ جابر',
        type: 'shar',
        description: 'اس ظالم دشمن کے شر سے نجات جس کا ظلم حد سے بڑھ گیا ہو (فقط برحق شرعی شرط کے ساتھ)۔',
        protocol: 'منگل کے دن ساعتِ مریخ میں لوہے کی کیل پر یا تانبے کی پتری پر تکسیرِ قہار لکھ کر آگ کی حدت کے قریب دبائیں۔',
      },
      {
        title: 'ابطالِ سحرِ ناری و دفعِ جناتِ سرکش',
        type: 'shifa',
        description: 'سخت ترین جادو اور آسیبی تپش کو جلا کر راکھ کرنا۔',
        protocol: 'سورۃ البروج اور آیاتِ حرق کا نقش تانبے پر لکھ کر حرمل کی دھونی دیں۔',
      },
      {
        title: 'زبان بندیِ مدعیان و حاسدین در عدالت',
        type: 'taskheer',
        description: 'جھوٹے گواہوں اور حاسدین کی زبانیں بند کرنا۔',
        protocol: 'سیسے کی لوح پر حروفِ صامتہ مریخی تکسیر سے لکھ کر ویران مقام میں دفنائیں۔',
      },
    ],
    kashAlBarniRule: 'کاش البرنی (رموز الجفر): "مریخ قہر الٰہی کا مظہر ہے، اس کے اعمال میں پرہیزِ جلالی، صدقۂ سرخ جانور اور حصارِ اعظم کے بغیر ہاتھ ڈالنا عامل کو خود ہلاکت میں ڈال دیتا ہے۔"',
  },
  {
    id: 'utarid',
    nameUrdu: 'عطارد (Mercury)',
    nameArabic: 'عطارد',
    nameEnglish: 'Mercury',
    statusUrdu: 'ممتزج (کاتبِ فلک، عقل، فہم، حساب و تحریر)',
    natureCategory: 'mumtazij',
    rulingDayUrdu: 'بدھ (چہار شنبہ)',
    rulingHourUrdu: 'پہلی اور آٹھویں ساعت',
    rulingZodiacUrdu: 'برج جوزا و برج سنبلہ',
    sharafBurjUrdu: 'برج سنبلہ (۱۵ درجہ)',
    hubootBurjUrdu: 'برج حوت (۱۵ درجہ)',
    elementUrdu: 'بادی (معتدل و سریع التحول)',
    metalUrdu: 'پارہ (Mercury) یا پیتل (Brass)',
    incenseUrdu: 'مستکی، قرنفل (لونگ)، جاوتری، عودِ خام',
    inkUrdu: 'سیاہیِ سیاہ مع عرقِ گلاب',
    directionUrdu: 'شمال (North)',
    colorUrdu: 'سبز، فیروزی و چمکدار زرد',
    primaryAttributes: 'تیزیِ عقل، وسعتِ حافظہ، تجارت، زبان بندی، تحریر، کتابت، اور دفائن کی تلاش۔',
    bestAamalList: [
      {
        title: 'تیزیِ فہم، امتحان میں کامیابی و قوتِ حافظہ',
        type: 'khair',
        description: 'طلباء اور محققین کے لیے وسعتِ ذہن و یادداشت۔',
        protocol: 'بدھ کی صبح طلوعِ شمس پر ہرن کی جھلی پر "یا علیم یا حکیم" کا مخمس بادی لکھ کر گلے میں ڈالیں۔',
      },
      {
        title: 'زبان بندی و صلحِ کلی در مقدمات',
        type: 'taskheer',
        description: 'مخالفین کے منہ پر مہر لگانا تاکہ سچ کے خلاف نہ بول سکیں۔',
        protocol: 'حروفِ صامتہ کا مثلث پیتل کی تختی پر لکھ کر بھاری پتھر کے نیچے رکھیں۔',
      },
      {
        title: 'رونقِ تجارت، دکان و برکتِ قلم',
        type: 'khair',
        description: 'حساب کتاب میں منافع اور بکری میں غیر معمولی اضافہ۔',
        protocol: 'اسم "یا باسط یا وہاب" دکان کے داخلی دروازے پر چسپاں کریں۔',
      },
    ],
    kashAlBarniRule: 'کاش البرنی (قوانین افلاطون): "عطارد جس سیارے کے ساتھ مل جائے اس کی طبع اختیار کر لیتا ہے۔ سعد کے ساتھ سعدِ اکبر اور نحس کے ساتھ نحسِ قوی بن جاتا ہے۔"',
  },
  {
    id: 'mushtari',
    nameUrdu: 'مشتری (Jupiter)',
    nameArabic: 'المشتري',
    nameEnglish: 'Jupiter',
    statusUrdu: 'سعدِ اکبر (قاضیٔ فلک، برکت، ثروت و عدالت)',
    natureCategory: 'saad_akbar',
    rulingDayUrdu: 'جمعرات (پنجشنبہ)',
    rulingHourUrdu: 'پہلی اور آٹھویں ساعت',
    rulingZodiacUrdu: 'برج قوس و برج حوت',
    sharafBurjUrdu: 'برج سرطان (۱۵ درجہ)',
    hubootBurjUrdu: 'برج جدی (۱۵ درجہ)',
    elementUrdu: 'بادی و گرم و تر (مبارک ترین طبع)',
    metalUrdu: 'قلعی (Tin) یا خالص سفید سونا',
    incenseUrdu: 'زعفران، صندل سفید، مشکِ خالص، عنبر',
    inkUrdu: 'زعفران و مشک حل شدہ در عرقِ گلاب',
    directionUrdu: 'شمال مشرق (North-East)',
    colorUrdu: 'آسمانی نیلا، بنفشی و سفید',
    primaryAttributes: 'وسعتِ رزقِ بے حساب، فتوحات، فضلِ الٰہی، عہدہ، منصب، قاضی و حکام کی نظر میں عزت۔',
    bestAamalList: [
      {
        title: 'لوحِ مشتری برائے ثروت و غنائے کامل',
        type: 'khair',
        description: 'فقر و افلاس کے خاتمے اور خزانوں کے دروازے کھلنے کے لیے۔',
        protocol: 'شرفِ مشتری یا جمعرات کی پہلی ساعت میں قلعی کی تختی پر مسدس یا مسبع زعفران سے لکھیں۔',
      },
      {
        title: 'کامیابی در عدالت و بریت از الزامات',
        type: 'taskheer',
        description: 'جج اور وکیلوں پر حق کی فتح کے لیے۔',
        protocol: 'اسم "یا عدل یا حق یا فتاح" چاندی کے پترے پر لکھ کر دائیں جیب میں رکھیں۔',
      },
      {
        title: 'تسخیرِ قلوبِ مشائخ و بزرگانِ دین',
        type: 'taskheer',
        description: 'علمِ باطن اور روحانی فیض کے حصول کے لیے۔',
        protocol: 'تکسیرِ اسم "یا لطیف یا خبیر" بعد نمازِ تہجد ۴۰ دن ورد کریں۔',
      },
    ],
    kashAlBarniRule: 'کاش البرنی (مفتاح الجفر): "مشتری کا نقش جس کے پاس ہو وہ کبھی محتاج نہیں ہوتا اور رزق کے اسباب غیب سے بنتے ہیں۔"',
  },
  {
    id: 'zuhrah',
    nameUrdu: 'زہرہ (Venus)',
    nameArabic: 'الزهرة',
    nameEnglish: 'Venus',
    statusUrdu: 'سعدِ اصغر (مطربۂ فلک، الفت، حسن، نکاح و جمال)',
    natureCategory: 'saad_asghar',
    rulingDayUrdu: 'جمعہ (آدینہ)',
    rulingHourUrdu: 'پہلی اور آٹھویں ساعت',
    rulingZodiacUrdu: 'برج ثور و برج میزان',
    sharafBurjUrdu: 'برج حوت (۲۷ درجہ)',
    hubootBurjUrdu: 'برج سنبلہ (۲۷ درجہ)',
    elementUrdu: 'آبی (سرد و تر)',
    metalUrdu: 'خالص تانبا (Copper) یا کانسی',
    incenseUrdu: 'صندل سرخ، گلاب، عود، مصطگی، شکرِ سرخ',
    inkUrdu: 'عرقِ گلاب و زعفران',
    directionUrdu: 'مغرب (West)',
    colorUrdu: 'سبزِ زمردی، گلابی و سفید',
    primaryAttributes: 'عشق، محبت، الفتِ زوجین، تسخیرِ خاص، حسن و جاذبیت، اور شادی کے بندھن۔',
    bestAamalList: [
      {
        title: 'طلسمِ زہرہ برائے تسخیر و محبتِ شدید',
        type: 'khair',
        description: 'مطلوب کے دل میں بے پناہ محبت و کشش پیدا کرنا۔',
        protocol: 'جمعہ کی پہلی ساعت میں تانبے کی پتری پر تکسیرِ ودود لکھ کر صندل کی دھونی دیں اور بازو پر باندھیں۔',
      },
      {
        title: 'عقدِ نکاح و رشتہ میں حائل بندش کا خاتمہ',
        type: 'shifa',
        description: 'شادی کے رشتے آنے اور پسند کی شادی میں کامیابی۔',
        protocol: 'سورۃ طہٰ کی آیات کا نقشِ زہرہ زعفران سے لکھ کر پانی میں گھول کر نہائیں۔',
      },
      {
        title: 'حسن و جاذبیت اور محبوب الخلائق بننا',
        type: 'taskheer',
        description: 'ہر دیکھنے والا عزت اور الفت سے پیش آئے۔',
        protocol: 'چاندی کے نگینے پر نقشِ مخمس کندہ کر کے جمعہ کے دن پہنیں۔',
      },
    ],
    kashAlBarniRule: 'کاش البرنی (قوانین طلسم): "محبت کا جو نقش ساعتِ زہرہ میں لکھا جائے، اگر طالب و مطلوب کے عناصر میں موافقت ہو تو پتھر دل بھی موم ہو جاتا ہے۔"',
  },
  {
    id: 'zuhal',
    nameUrdu: 'زحل (Saturn)',
    nameArabic: 'زحل',
    nameEnglish: 'Saturn',
    statusUrdu: 'نحسِ اکبر (پیرِ فلک، جمود، صبر، بندش و فنا)',
    natureCategory: 'nahs_akbar',
    rulingDayUrdu: 'ہفتہ (شنبہ)',
    rulingHourUrdu: 'پہلی اور آٹھویں ساعت (بعد طلوع)',
    rulingZodiacUrdu: 'برج جدی و برج دلو',
    sharafBurjUrdu: 'برج میزان (۲۱ درجہ)',
    hubootBurjUrdu: 'برج حمل (۲۱ درجہ)',
    elementUrdu: 'خاکی (سرد و نہایت خشک)',
    metalUrdu: 'سیسہ (Lead) یا خام لوہا',
    incenseUrdu: 'رائی، اسپند، لوبانِ اسود، گندھک، ہڈی کا سفوف',
    inkUrdu: 'سیاہیِ کحل مع آبِ سرکہ',
    directionUrdu: 'جنوب مغرب (South-West)',
    colorUrdu: 'سیاہ (Jet Black)، نیلا گہرا و سرمئی',
    primaryAttributes: 'بندشِ اعداء، تفریقِ ظالمین، امراضِ مزمنہ، قلع و قمع، طویل المیعاد ریاضات اور دفائن۔',
    bestAamalList: [
      {
        title: 'تفریق و عزلِ ظالم و غاصب',
        type: 'shar',
        description: 'دو بد کردار یا ظالم لوگوں کی باہمی عداوت اور تفریق (شرعی جواز کے ساتھ)۔',
        protocol: 'ہفتہ کے دن ساعتِ زحل میں سیسے کی تختی پر حروفِ مفرقہ لکھ کر پرانے کھنڈر یا قبرستان میں دفنائیں۔',
      },
      {
        title: 'بندشِ سحرِ سفلی و حاسدین',
        type: 'shifa',
        description: 'دشمن کے ہر وار اور سحر کو پلٹانا۔',
        protocol: 'آیت الکرسی کا معکوس نقش سیسے پر لکھ کر گھر کے دروازے کے نیچے دفن کریں۔',
      },
      {
        title: 'کشفِ دفائن و استخراجِ کنوز',
        type: 'khair',
        description: 'زمین میں چھپے خزانوں اور رازوں کی کھوج۔',
        protocol: 'نقشِ زحل مثلث خاکی چال سے رائی کی دھونی کے ساتھ عمل کریں۔',
      },
    ],
    kashAlBarniRule: 'کاش البرنی (رموز الجفر): "زحل کا وار نہایت سست لیکن قطعی اور ناقابلِ شکست ہوتا ہے۔ اس کے اعمال میں انتہائی احتیاط، حصار اور رجعت سے بچاؤ لازم ہے۔"',
  },
];

export const ECLIPSE_OPERATIONS: EclipseOperationProfile[] = [
  {
    id: 'solar-mahabbat-taskheer',
    eclipseType: 'solar',
    eclipseNameUrdu: 'سورج گرہن (کسوفِ شمس)',
    category: 'mahabbat_taskheer',
    categoryUrdu: 'اعمالِ محبت، الفت و تسخیرِ شاہی',
    titleUrdu: 'لوحِ تسخیرِ شمسِ کبیر در کسوف (دائمی محبت و جذبِ قلوب)',
    purposeUrdu: 'مطلوب کے دل میں سورج کی حدت کی مانند ایسی تڑپ اور محبت پیدا کرنا جو تا عمر ختم نہ ہو۔',
    timingRuleUrdu: 'سورج گرہن کے آغاز سے لے کر گرہن کے نصف (وسطِ کسوف) تک کا لمحہ۔',
    metalOrPaperUrdu: 'سونے کی پتری، برنجِ زرد (Brass) یا ہرن کی جھلی',
    inkAndPenUrdu: 'زعفران، مشک، عرقِ گلاب اور آبِ نیسان مع قلمِ انار',
    incenseUrdu: 'صندل سرخ، عودِ ہندی، لوبانِ نر اور مشکِ خالص',
    takseerAflatoonFormulaUrdu: 'طالب مع والدہ + مطلوب مع والدہ + یا ودود یا بدوح یا حبیب کے حروف کی تکسیرِ ممتزجہ آتشی',
    azimatUrdu: 'عَزَمْتُ عَلَيْكُمْ يَا مَلَائِكَةَ الشَّمْسِ وَرُوحَانِيَّتَهَا أَنْ تَجْلِبُوا وَتَسْخَرُوا قَلْبَ (فلاں بن فلاں) إِلَى مَحَبَّةِ (فلاں بن فلاں) بِحَقِّ سُورَةِ الشَّمْسِ وَوَهَّاجِهَا',
    disposalMethodUrdu: 'نقش کو تیار کر کے دھونی دیں اور موم جامہ کر کے موم بتی یا چراغِ کنجد کے قریب اس طرح رکھیں کہ ہلکی حرارت پہنچتی رہے۔',
    warningAndConditionsUrdu: 'صرف جائز رشتوں اور نکاح کے لیے جائز ہے۔ قبل از عمل باوضو ہو کر ۱۱ مرتبہ آیت الکرسی کا حصار باندھنا لازمی ہے۔',
    kashAlBarniQuoteUrdu: 'کاش البرنی: "سورج گرہن کے وقت فلکی شعاعیں جب نقطۂ اتصال پر آتی ہیں تو جو نقشِ محبت اس وقت لکھا جائے وہ روح میں پیوست ہو جاتا ہے۔"',
  },
  {
    id: 'solar-dushmani-halakat',
    eclipseType: 'solar',
    eclipseNameUrdu: 'سورج گرہن (کسوفِ شمس)',
    category: 'dushmani_halakat',
    categoryUrdu: 'اعمالِ قہر، ہلاکتِ ظالم و دفعِ اعداء',
    titleUrdu: 'طلسمِ قہرِ مریخ و شمس در کسوف (عزلِ ظالم و ہلاکتِ عدو)',
    purposeUrdu: 'ایسے جابر، کافر یا ظالم دشمن کا غرور خاک میں ملانا جس کے شر سے مظلوموں کی جان و مال محفوظ نہ ہو۔',
    timingRuleUrdu: 'کسوف کے عین عروج کے وقت (جب سورج پر مکمل تاریکی چھا جائے)۔',
    metalOrPaperUrdu: 'سیسے کی لوح (Lead Sheet) یا نیلا کاغذ',
    inkAndPenUrdu: 'سیاہیِ کحل (کاجل) مع آبِ سرکہ اور پیاز کا پانی مع لوہے کی نوک دار کیل',
    incenseUrdu: 'حرمل (اسپند)، گندھک، رائی، حلتین (ہینگ) اور پیاز کے چھلکے',
    takseerAflatoonFormulaUrdu: 'نامِ ظالم مع والدہ + یا قہار یا مذل یا منتقم + حروفِ صامتہ (ناری و خاکی) کی تکسیرِ معکوس',
    azimatUrdu: 'أَقْسَمْتُ عَلَيْكُمْ يَا خُدَّامَ سَاعَةِ الْكُسُوفِ وَالْغَضَبِ أَنْ تُسَلِّطُوا الْعَذَابَ وَالْهَلَاكَ عَلَى (ظالم بن فلاں) كَمَا أُهْلِكَتْ عَادٌ وَثَمُودُ بِحَقِّ الْقَاهِرِ فَوْقَ عِبَادِهِ',
    disposalMethodUrdu: 'نقش کو لوہے کی زنگ آلود کیل کے ساتھ کسی پرانی غیر آباد قبر یا کچرے کے ڈھیر میں دفن کیا جائے یا آگ میں جلایا جائے۔',
    warningAndConditionsUrdu: 'سخت ترین شرعی انتباہ: اگر دشمن واقعی ظالم نہ ہوا تو یہ رجعت پلٹ کر عامل کو ہلاک کر دیتی ہے۔ بغیر اجازتِ شیخ قطعی نہ کریں۔',
    kashAlBarniQuoteUrdu: 'کاش البرنی (رموز الجفر): "کسوف کے تاریک لمحے میں لکھی گئی تکسیرِ قہر شمشیرِ برہنہ کی مانند کاٹ کرتی ہے۔"',
  },
  {
    id: 'lunar-mahabbat-hub',
    eclipseType: 'lunar',
    eclipseNameUrdu: 'چاند گرہن (خسوفِ قمر)',
    category: 'mahabbat_taskheer',
    categoryUrdu: 'اعمالِ الفت، صلح و تسخیرِ قلوب',
    titleUrdu: 'لوحِ خسوفِ قمر برائے الفتِ زوجین و محبتِ مسخر',
    purposeUrdu: 'ناراض بیوی یا شوہر کو واپس لانا اور دل سے ہر قسم کی نفرت مٹا کر بے پناہ پیار پیدا کرنا۔',
    timingRuleUrdu: 'چاند گرہن کے ابتدائی ۳۰ منٹ میں جب چاند پر سرخی مائل سایہ پڑنا شروع ہو۔',
    metalOrPaperUrdu: 'خالص چاندی کی تختی یا سفید ریشمی کپڑا',
    inkAndPenUrdu: 'زعفران، عرقِ کیوڑا اور مشک',
    incenseUrdu: 'صندل سفید، لوبان، جاوتری اور شکر',
    takseerAflatoonFormulaUrdu: 'اسمائے الٰہی (یا جامع یا ودود یا رحیم) مع اسمائے طالب و مطلوب حروفِ مفردہ کے ساتھ تکسیرِ آبی',
    azimatUrdu: 'يَا أَيُّهَا الْمَلَائِكَةُ السَّائِحُونَ فِي فَلَكِ الْقَمَرِ احْرِقُوا قَلْبَ (مطلوب) بِمَحَبَّةِ وَطَاعَةِ (طالب) بِحَقِّ اللَّطِيفِ الْخَبِيرِ',
    disposalMethodUrdu: 'نقش کو میٹھے شربت یا دودھ میں دھو کر مطلوب کو پلائیں یا ہوا میں کسی پھل دار درخت پر باندھیں۔',
    warningAndConditionsUrdu: 'سفید لباس پہنیں اور قبلہ رخ بیٹھ کر درودِ پاک کی کثرت کے ساتھ لکھیں۔',
    kashAlBarniQuoteUrdu: 'کاش البرنی: "چاند گرہن کے وقت قمر کا جذب اپنے انتہائی نقطے پر ہوتا ہے، اس وقت کی الفت پتھر پر لکیر بن جاتی ہے۔"',
  },
  {
    id: 'lunar-zaban-bandi-judai',
    eclipseType: 'lunar',
    eclipseNameUrdu: 'چاند گرہن (خسوفِ قمر)',
    category: 'judai_tafreeq',
    categoryUrdu: 'اعمالِ تفریقِ ناجائز، زبان بندی و جدائی',
    titleUrdu: 'طلسمِ تفریقِ فساق و زبان بندیِ بدگویاں در خسوف',
    purposeUrdu: 'ناجائز اور غیر شرعی تعلقات میں ایسی دائمی نفرت اور تفریق پیدا کرنا کہ وہ ہمیشہ کے لیے جدا ہو جائیں۔',
    timingRuleUrdu: 'خسوفِ کامل کے وقت (جب چاند مکمل طور پر گرہن کی تاریکی میں چھپ جائے)۔',
    metalOrPaperUrdu: 'سیسے کی لوح یا کالی سیاہی والا کھردرا کاغذ',
    inkAndPenUrdu: 'کوئلے کی سیاہی مع آبِ لیموں اور زنگار',
    incenseUrdu: 'رائی، کلونجی، دھتورے کے بیج اور گندھک',
    takseerAflatoonFormulaUrdu: 'نامِ فریقِ اول مع والدہ + نامِ فریقِ دوم مع والدہ + آیاتِ تفریق (وَأَلْقَيْنَا بَيْنَهُمُ الْعَدَاوَةَ وَالْبَغْضَاءَ) کی تکسیرِ خاکی و بادی',
    azimatUrdu: 'فَرَّقْتُ بَيْنَ (فلاں) وَ (فلاں) كَمَا فَرَّقْتَ بَيْنَ السَّمَاءِ وَالْأَرْضِ وَبَيْنَ النُّورِ وَالظُّلْمَةِ بِحَقِّ قَوْلِكَ الْحَقِّ',
    disposalMethodUrdu: 'ایک تعویذ کو بہتے ہوئے گندے نالے میں ڈالیں اور دوسرے کو کانٹے دار جھاڑی یا دو راستوں کے سنگم (چوراہے) پر دبائیں۔',
    warningAndConditionsUrdu: 'خبردار: اگر یہ عمل کسی میاں بیوی یا جائز رشتے پر کیا گیا تو کرنے والا دنیا و آخرت میں ملعون اور برباد ہو جائے گا۔ صرف ناجائز حرام کاری کو توڑنے کے لیے ہے۔',
    kashAlBarniQuoteUrdu: 'کاش البرنی (قوانین طلسم): "خسوف کے وقت ناجائز الفت پر تفریق کا تازیانہ چلانا عین انصاف اور ردِ فتنہ ہے۔"',
  },
  {
    id: 'solar-shifa-hifazat',
    eclipseType: 'solar',
    eclipseNameUrdu: 'سورج گرہن (کسوفِ شمس)',
    category: 'shifa_hifazat',
    categoryUrdu: 'اعمالِ شفا، اکسیرِ اعظم و حصارِ حیات',
    titleUrdu: 'لوحِ اکسیرِ اعظم برائے دفعِ سحرِ اسود و شفا از امراضِ لاعلاج',
    purposeUrdu: 'پرانے سے پرانے جادو، سحرِ سفلی، کینسر، امراضِ خبیثہ اور بد اثرات کا جڑ سے خاتمہ۔',
    timingRuleUrdu: 'سورج گرہن ختم ہوتے وقت (انجلاءِ کسوف - جب سورج کی پہلی کرن گرہن سے باہر نکلے)۔',
    metalOrPaperUrdu: 'چاندی اور سونے کی ملی جلی تختی (لوحِ ہفت جوش) یا سفید کاغذ',
    inkAndPenUrdu: 'زعفران، عرقِ گلاب، آبِ زمزم اور مشک',
    incenseUrdu: 'عود، لوبان، صندل سفید اور عنبر',
    takseerAflatoonFormulaUrdu: 'آیاتِ شفا (وَيَشْفِ صُدُورَ قَوْمٍ مُّؤْمِنِينَ...) + اسمِ اعظم یا شافی یا کافی یا معافی کی تکسیرِ نوری',
    azimatUrdu: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ اشْفِ أَنْتَ الشَّافِي لَا شِفَاءَ إِلَّا شِفَاؤُكَ شِفَاءً لَا يُغَادِرُ سَقَمًا',
    disposalMethodUrdu: 'اس نقش کو چاندی کے تعویذ میں ڈال کر مریض کے گلے میں ڈالیں اور روزانہ اس کا دھویا ہوا پانی مریض کو پلائیں۔',
    warningAndConditionsUrdu: 'گرہن کے بعد دو رکعت نمازِ کسوف پڑھ کر سائل کے لیے دعا کریں۔ صدقۂ زرد غلہ دینا لازم ہے۔',
    kashAlBarniQuoteUrdu: 'کاش البرنی (مفتاح الجفر): "انجلاءِ کسوف کا وقت شفا کی نئی روح پھونکنے کا وقت ہے، جو نقش اس وقت لکھا جائے وہ حیاتِ نو بخشتا ہے۔"',
  },
];
