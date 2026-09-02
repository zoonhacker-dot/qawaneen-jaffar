// Comprehensive Ilm-ul-Ramal Diagnostic Data & Rule Engine
// Based on classical treatise on Geomancy (کشف الاسرار فی علم الرمل، شمس المعارف، عمدۃ الرمل)

export interface RamalFigureDef {
  id: string;
  nameUrdu: string;
  nameArabic: string;
  nameEnglish: string;
  pattern: [number, number, number, number]; // 1 = Single dot (فرد), 2 = Double dot (زوج)
  element: 'آتش' | 'باد' | 'آب' | 'خاک';
  elementEn: 'fire' | 'air' | 'water' | 'earth';
  nature: string;
  natureGrade: 'saad_strong' | 'saad_mild' | 'nahas_strong' | 'nahas_mild' | 'neutral';
  rulingPlanet: string;
  rulingZodiac: string;
  rulingZodiacUrdu: string;
  kabir: number;
  generalMeaning: string;
  speed: 'fast' | 'medium' | 'slow' | 'delayed';
  speedUrdu: string;
}

export const ALL_16_RAMAL_FIGURES: Record<string, RamalFigureDef> = {
  lihyan: {
    id: 'lihyan',
    nameUrdu: 'لحیان',
    nameArabic: 'اللِّحْيَان',
    nameEnglish: 'Caput Draconis / Lihyan',
    pattern: [1, 1, 1, 2],
    element: 'آتش',
    elementEn: 'fire',
    nature: 'سعد داخل',
    natureGrade: 'saad_strong',
    rulingPlanet: 'مشتری (سعدِ اکبر)',
    rulingZodiac: 'Sagittarius',
    rulingZodiacUrdu: 'برج قوس',
    kabir: 55,
    generalMeaning: 'علم، حکمت، حکومت، خیر و برکت، مراد برآری اور عظیم ترقی۔',
    speed: 'fast',
    speedUrdu: 'سریع و جلدی (چند دن سے چند ہفتے)'
  },
  qabd_dakhil: {
    id: 'qabd_dakhil',
    nameUrdu: 'قبض الداخل',
    nameArabic: 'قَبْضُ الدَّاخِل',
    nameEnglish: 'Acquisitio / Qabd Dakhil',
    pattern: [2, 1, 2, 1],
    element: 'خاک',
    elementEn: 'earth',
    nature: 'سعد داخل',
    natureGrade: 'saad_strong',
    rulingPlanet: 'مشتری / زحل',
    rulingZodiac: 'Pisces',
    rulingZodiacUrdu: 'برج حوت',
    kabir: 68,
    generalMeaning: 'حصولِ مال، امانت، ملازمت میں کامیابی، نفع بخش معاہدہ، پائیداری۔',
    speed: 'medium',
    speedUrdu: 'معتدل و پائیدار (۱ سے ۳ ماہ)'
  },
  qabd_kharij: {
    id: 'qabd_kharij',
    nameUrdu: 'قبض الخارج',
    nameArabic: 'قَبْضُ الْخَارِج',
    nameEnglish: 'Amissio / Qabd Kharij',
    pattern: [1, 2, 1, 2],
    element: 'باد',
    elementEn: 'air',
    nature: 'نحس خارج',
    natureGrade: 'nahas_strong',
    rulingPlanet: 'زہرہ / شمس',
    rulingZodiac: 'Taurus',
    rulingZodiacUrdu: 'برج ثور',
    kabir: 84,
    generalMeaning: 'اخراج، مال کا ضیاع، علیحدگی، ملازمت کا چھوٹنا، خرچ اور نقصان۔',
    speed: 'fast',
    speedUrdu: 'فوری نقصان یا تبدیلی'
  },
  jamaat: {
    id: 'jamaat',
    nameUrdu: 'جماعت',
    nameArabic: 'الْجَمَاعَة',
    nameEnglish: 'Populus / Jamaat',
    pattern: [2, 2, 2, 2],
    element: 'آب',
    elementEn: 'water',
    nature: 'سعد منقلب',
    natureGrade: 'saad_mild',
    rulingPlanet: 'قمر (چاند)',
    rulingZodiac: 'Cancer',
    rulingZodiacUrdu: 'برج سرطان',
    kabir: 115,
    generalMeaning: 'مجمع، رشتہ داری، شادی، سفر، صلح، عوامی پذیرائی اور میٹنگ۔',
    speed: 'fast',
    speedUrdu: 'بہت جلد (قمر کے دورانیے میں، ۲ سے ۴ ہفتے)'
  },
  farah: {
    id: 'farah',
    nameUrdu: 'بیاض (فرح)',
    nameArabic: 'الْبَيَاض / الْفَرَح',
    nameEnglish: 'Albus / Farah',
    pattern: [2, 2, 1, 2],
    element: 'آب',
    elementEn: 'water',
    nature: 'سعد ثابت',
    natureGrade: 'saad_strong',
    rulingPlanet: 'زہرہ (سعدِ اصغر)',
    rulingZodiac: 'Cancer / Taurus',
    rulingZodiacUrdu: 'برج ثور',
    kabir: 980,
    generalMeaning: 'شادی، خوشخبری، بیماری سے کامل شفا، سفید مال و دولت اور مسرت۔',
    speed: 'medium',
    speedUrdu: 'جلد و خوشگوار (۱ سے ۶ ہفتے)'
  },
  humrah: {
    id: 'humrah',
    nameUrdu: 'حمرہ',
    nameArabic: 'الْحُمْرَة',
    nameEnglish: 'Rubeus / Humrah',
    pattern: [1, 2, 2, 2],
    element: 'آتش',
    elementEn: 'fire',
    nature: 'نحس عارض',
    natureGrade: 'nahas_strong',
    rulingPlanet: 'مریخ (جلالی)',
    rulingZodiac: 'Scorpio',
    rulingZodiacUrdu: 'برج عقرب',
    kabir: 1800,
    generalMeaning: 'غصہ، خونریزی، لڑائی جھگڑا، سحر، بیماری کی شدت اور بندش۔',
    speed: 'fast',
    speedUrdu: 'فوری مخالفت یا تصادم'
  },
  ankees: {
    id: 'ankees',
    nameUrdu: 'انکیس',
    nameArabic: 'الْأَنْكِيس',
    nameEnglish: 'Tristitia / Ankees',
    pattern: [2, 2, 2, 1],
    element: 'خاک',
    elementEn: 'earth',
    nature: 'نحس ثابت',
    natureGrade: 'nahas_strong',
    rulingPlanet: 'زحل (نحسِ اکبر)',
    rulingZodiac: 'Aquarius',
    rulingZodiacUrdu: 'برج دلو',
    kabir: 3400,
    generalMeaning: 'غم، مایوسی، سخت رکاوٹ، طویل تاخیر، بندش اور بیماریاں۔',
    speed: 'delayed',
    speedUrdu: 'طویل تاخیر (۶ ماہ سے زائد یا زحل کے چکر میں)'
  },
  nasrat_dakhil: {
    id: 'nasrat_dakhil',
    nameUrdu: 'نصرۃ الداخل',
    nameArabic: 'نُصْرَةُ الدَّاخِل',
    nameEnglish: 'Fortuna Major / Nasrat Dakhil',
    pattern: [2, 2, 1, 1],
    element: 'آتش',
    elementEn: 'fire',
    nature: 'سعد داخل',
    natureGrade: 'saad_strong',
    rulingPlanet: 'شمس (سورج)',
    rulingZodiac: 'Leo',
    rulingZodiacUrdu: 'برج اسد',
    kabir: 740,
    generalMeaning: 'کامل فتح و نصرت، غلبہ، ملازمت میں تقرری، امتحان میں اول پوزیشن۔',
    speed: 'fast',
    speedUrdu: 'فوری و یقینی فتح (چند ایام میں)'
  },
  nasrat_kharij: {
    id: 'nasrat_kharij',
    nameUrdu: 'نصرۃ الخارج',
    nameArabic: 'نُصْرَةُ الْخَارِج',
    nameEnglish: 'Fortuna Minor / Nasrat Kharij',
    pattern: [1, 1, 2, 2],
    element: 'باد',
    elementEn: 'air',
    nature: 'سعد خارج',
    natureGrade: 'saad_mild',
    rulingPlanet: 'شمس / عطارد',
    rulingZodiac: 'Leo',
    rulingZodiacUrdu: 'برج اسد',
    kabir: 853,
    generalMeaning: 'بیرون ملک سفر میں کامیابی، ویزا کا حصول، مقدمہ سے رہائی، بیرونی فائدہ۔',
    speed: 'fast',
    speedUrdu: 'تیزی سے متحرک (۱ سے ۳ ہفتے)'
  },
  utbat_dakhil: {
    id: 'utbat_dakhil',
    nameUrdu: 'عتبۃ الداخل',
    nameArabic: 'عُتْبَةُ الدَّاخِل',
    nameEnglish: 'Puella / Utbat Dakhil',
    pattern: [2, 1, 1, 1],
    element: 'خاک',
    elementEn: 'earth',
    nature: 'سعد داخل',
    natureGrade: 'saad_strong',
    rulingPlanet: 'زہرہ',
    rulingZodiac: 'Libra',
    rulingZodiacUrdu: 'برج میزان',
    kabir: 477,
    generalMeaning: 'نئے رشتہ کی آمد، پسندیدہ شادی کا پیغام، دروازہ کھلنا، خیر و آسانی۔',
    speed: 'medium',
    speedUrdu: 'عنقریب (۲ سے ۶ ہفتے)'
  },
  utbat_kharij: {
    id: 'utbat_kharij',
    nameUrdu: 'عتبۃ الخارج',
    nameArabic: 'عُتْبَةُ الْخَارِج',
    nameEnglish: 'Puer / Utbat Kharij',
    pattern: [1, 1, 2, 1],
    element: 'آتش',
    elementEn: 'fire',
    nature: 'نحس خارج',
    natureGrade: 'nahas_mild',
    rulingPlanet: 'مریخ',
    rulingZodiac: 'Aries',
    rulingZodiacUrdu: 'برج حمل',
    kabir: 873,
    generalMeaning: 'رخصت، بے صبری کی وجہ سے نقصان، جھگڑا، نوکری چھوڑنا، دوری۔',
    speed: 'fast',
    speedUrdu: 'جلد واقع ہونے والا خطرہ'
  },
  naqi_al_khadd: {
    id: 'naqi_al_khadd',
    nameUrdu: 'نقی الخد',
    nameArabic: 'نَقِيُّ الْخَدّ',
    nameEnglish: 'Laetitia / Naqi Al-Khadd',
    pattern: [1, 2, 2, 1],
    element: 'آب',
    elementEn: 'water',
    nature: 'سعد ثابت',
    natureGrade: 'saad_strong',
    rulingPlanet: 'مشتری',
    rulingZodiac: 'Pisces',
    rulingZodiacUrdu: 'برج حوت',
    kabir: 760,
    generalMeaning: 'دل کی مراد پوری ہونا، پسند کی شادی، گمشدہ چیز کی بازیابی، پاکیزہ خوشی۔',
    speed: 'medium',
    speedUrdu: 'بافضلِ خداوندی (۳ سے ۵ ہفتے)'
  },
  uqla: {
    id: 'uqla',
    nameUrdu: 'عقلہ',
    nameArabic: 'الْعُقْلَة',
    nameEnglish: 'Carcer / Uqla',
    pattern: [2, 1, 2, 2],
    element: 'باد',
    elementEn: 'air',
    nature: 'ممتزج منقلب',
    natureGrade: 'neutral',
    rulingPlanet: 'زحل / عطارد',
    rulingZodiac: 'Capricorn',
    rulingZodiacUrdu: 'برج جدی',
    kabir: 205,
    generalMeaning: 'بندش، سحر، قید، رشتوں میں گرہ، سوچ و فکر اور الجھن کا عقدہ۔',
    speed: 'delayed',
    speedUrdu: 'جب تک بندش نہ کٹے رکا رہے گا'
  },
  ijtima: {
    id: 'ijtima',
    nameUrdu: 'اجتماع',
    nameArabic: 'الِاجْتِمَاع',
    nameEnglish: 'Conjunctio / Ijtima',
    pattern: [2, 1, 1, 2],
    element: 'خاک',
    elementEn: 'earth',
    nature: 'سعد ثابت',
    natureGrade: 'saad_strong',
    rulingPlanet: 'عطارد',
    rulingZodiac: 'Virgo',
    rulingZodiacUrdu: 'برج سنبلہ',
    kabir: 444,
    generalMeaning: 'دو فریقوں کا اتحاد، نکاح، شراکت داری میں غیر معمولی برکت، صلح۔',
    speed: 'medium',
    speedUrdu: 'پختہ و مستحکم (۱ سے ۲ ماہ)'
  },
  tareeq: {
    id: 'tareeq',
    nameUrdu: 'طریق',
    nameArabic: 'الطَّرِيق',
    nameEnglish: 'Via / Tareeq',
    pattern: [1, 1, 1, 1],
    element: 'باد',
    elementEn: 'air',
    nature: 'ممتزج منقلب',
    natureGrade: 'neutral',
    rulingPlanet: 'قمر',
    rulingZodiac: 'Leo / Cancer',
    rulingZodiacUrdu: 'برج اسد',
    kabir: 319,
    generalMeaning: 'راستہ کھلنا، سفر درپیش ہونا، حالات میں تغیر، کوشش سے نتیجہ ملنا۔',
    speed: 'fast',
    speedUrdu: 'سفری و متحرک (چند دن)'
  },
  kousaj: {
    id: 'kousaj',
    nameUrdu: 'کوسج',
    nameArabic: 'الْكَوْسَج / عتبہ المنقلب',
    nameEnglish: 'Cauda Draconis / Kousaj',
    pattern: [1, 2, 1, 1],
    element: 'آب',
    elementEn: 'water',
    nature: 'نحس منقلب',
    natureGrade: 'nahas_strong',
    rulingPlanet: 'مریخ / راس',
    rulingZodiac: 'Scorpio',
    rulingZodiacUrdu: 'برج عقرب',
    kabir: 99,
    generalMeaning: 'نقص، قلتِ برکت، سحر و آسیب کا اثر، بدنیتی اور دھوکہ کا اندیشہ۔',
    speed: 'delayed',
    speedUrdu: 'تاخیر اور خرابی'
  }
};

export const RAMAL_FIGURES_ARRAY = Object.values(ALL_16_RAMAL_FIGURES);

// The 16 Houses of Ramal (بیوتِ رمل)
export interface RamalHouseDef {
  houseNum: number;
  nameUrdu: string;
  nameArabic: string;
  domainUrdu: string;
  topicsUrdu: string[];
}

export const RAMAL_16_HOUSES: RamalHouseDef[] = [
  {
    houseNum: 1,
    nameUrdu: 'بیت النفس و الحیات (پہلا گھر)',
    nameArabic: 'بيت النفس والحياة',
    domainUrdu: 'سائل کا جسم، زندگی، صحت، ارادہ اور مجموعی کیفیت۔',
    topicsUrdu: ['سائل کی نیت', 'طبیعی صحت', 'عمر و زندگی', 'شخصیت']
  },
  {
    houseNum: 2,
    nameUrdu: 'بیت المال و الرزق (دوسرا گھر)',
    nameArabic: 'بيت المال والمعاش',
    domainUrdu: 'روپیہ پیسہ، آمدنی، روزگار، مالِ منقولہ اور مالی فائدہ و نقصان۔',
    topicsUrdu: ['مالی فائدہ', 'نقصان', 'روزگار کی برکت', 'قرض']
  },
  {
    houseNum: 3,
    nameUrdu: 'بیت الاخوات و الاسفار (تیسرا گھر)',
    nameArabic: 'بيت الإخوة والأسفار القريبة',
    domainUrdu: 'بھائی بہن، قریبی رشتہ دار، مختصر سفر اور قریبی خط و کتابت۔',
    topicsUrdu: ['بہن بھائی', 'قریبی سفر', 'پیغام رسانی', 'معاہدہ']
  },
  {
    houseNum: 4,
    nameUrdu: 'بیت الآباء و العاقبت (چوتھا گھر)',
    nameArabic: 'بيت الآباء والعاقبة',
    domainUrdu: 'والدین، آبائی جائیداد، مکان، دفینہ، زمین اور ہر کام کا انجام۔',
    topicsUrdu: ['مکان و جائیداد', 'گھریلو سکون', 'والد کی کیفیت', 'انجامِ کار']
  },
  {
    houseNum: 5,
    nameUrdu: 'بیت الاولاد و العشق (پانچواں گھر)',
    nameArabic: 'بيت الأولاد والعشق واللذة',
    domainUrdu: 'اولاد کی خوشی، حمل، پسند کی محبت، امتحانات، خوشخبری اور تفریح۔',
    topicsUrdu: ['پسند کی شادی', 'اولاد و امتحانات', 'حمل و ولادت', 'محبت کا انجام']
  },
  {
    houseNum: 6,
    nameUrdu: 'بیت الامراض و العبید (چھٹا گھر)',
    nameArabic: 'بيت الأمراض والهموم',
    domainUrdu: 'بیماری، تکلیف، نوکر چاکر، پریشانیاں، رکاوٹیں اور مشقت۔',
    topicsUrdu: ['بیماری کی شدت', 'صحت کی تاخیر', 'ملازمین کے مسائل', 'بندش کے اثرات']
  },
  {
    houseNum: 7,
    nameUrdu: 'بیت الزوج و الفراش (ساتواں گھر)',
    nameArabic: 'بيت الزوج والفراش والشراكة',
    domainUrdu: 'شادی، شریکِ حیات، رشتہ داری، ساجھے داری، شراکت اور مد مقابل۔',
    topicsUrdu: ['شادی کا ہونا یا نہ ہونا', 'رشتہ داریاں', 'شراکت داری', 'مخالفین']
  },
  {
    houseNum: 8,
    nameUrdu: 'بیت الموت و الخوف (آٹھواں گھر)',
    nameArabic: 'بيت الموت والخوف والميراث',
    domainUrdu: 'خوف، وراثت، گمشدہ چیز کا نقصان، موت، خطرہ اور خفیہ مخالفت۔',
    topicsUrdu: ['گمشدہ مال', 'خوف و وسوسہ', 'وراثت کے تنازعات', 'جادو و بد اثرات']
  },
  {
    houseNum: 9,
    nameUrdu: 'بیت الاسفار البعیدہ و الدین (نواں گھر)',
    nameArabic: 'بيت الأسفار البعيدة والعلم',
    domainUrdu: 'بیرون ملک سفر، ویزا، پاسپورٹ، اعلیٰ تعلیم، خواب اور روحانیت۔',
    topicsUrdu: ['بیرون ملک سفر', 'ویزا کی منظوری', 'اعلیٰ تعلیم و امتحانات', 'خواب کی سچائی']
  },
  {
    houseNum: 10,
    nameUrdu: 'بیت العز و السلطان (دسواں گھر)',
    nameArabic: 'بيت العز والجاه والوظيفة',
    domainUrdu: 'حکومت، نوکری و ملازمت، عہدہ و ترقی، افسران کا رویہ اور وقار۔',
    topicsUrdu: ['ملازمت ملنا', 'ترقی و پروموشن', 'سرکاری کام', 'افسران کی مہربانی']
  },
  {
    houseNum: 11,
    nameUrdu: 'بیت الرجاء و الامید (گیارھواں گھر)',
    nameArabic: 'بيت الرجاء والأصدقاء',
    domainUrdu: 'امیدیں، تمناؤں کا پورا ہونا، مخلص دوست، منافع اور کامیابی۔',
    topicsUrdu: ['امید برآری', 'دوستوں کی مدد', 'بڑا منافع', 'دلی آرزو']
  },
  {
    houseNum: 12,
    nameUrdu: 'بیت الاعداء و الحبس (بارھواں گھر)',
    nameArabic: 'بيت الأعداء والسجون والحسد',
    domainUrdu: 'خفیہ دشمن، حسد، قید و بندش، جادو، بندش اور ناگہانی مصیبت۔',
    topicsUrdu: ['گھر کی بندش', 'جادو و حسد', 'خفیہ دشمن', 'رکاوٹ کی جڑ']
  },
  {
    houseNum: 13,
    nameUrdu: 'شاہدِ اوّل / سائل (تیرھواں گھر)',
    nameArabic: 'الشاهد الأول للسائل',
    domainUrdu: 'سائل کی باطنی کیفیت اور سچائی کی گواہی۔',
    topicsUrdu: ['سائل کا اخلاص', 'حقیقی کیفیت']
  },
  {
    houseNum: 14,
    nameUrdu: 'شاہدِ دوم / مطلوب (چودھواں گھر)',
    nameArabic: 'الشاهد الثاني للمطلوب',
    domainUrdu: 'پوچھے گئے مسئلے کی بیرونی حقیقت اور ماحول کی گواہی۔',
    topicsUrdu: ['مطلوبہ امر کی فضا', 'محیط حالات']
  },
  {
    houseNum: 15,
    nameUrdu: 'قاضی الرمل / میزان (پندرھواں گھر)',
    nameArabic: 'قاضي الرمل والميزان',
    domainUrdu: 'حتمی فیصلہ، ہاں یا نہ کا قطعی حکم اور نتیجہ۔',
    topicsUrdu: ['حتمی فیصلہ', 'نتیجۂ قطعی']
  },
  {
    houseNum: 16,
    nameUrdu: 'عاقبت العواقب (سولھواں گھر)',
    nameArabic: 'عاقبة العواقب والخاتمة',
    domainUrdu: 'سب سے آخری انجام اور مستقبلِ بعید کے اثرات۔',
    topicsUrdu: ['دیرپا اثر', 'حتمی انجام']
  }
];

// The Primary 5 Signature Topics from the User's Image Poster
export interface PrimaryPosterTopic {
  id: string;
  badgeUrdu: string;
  titleUrdu: string;
  questionUrdu: string;
  timeQuestionUrdu: string;
  iconName: 'HeartHandshake' | 'Briefcase' | 'Thermometer' | 'Plane' | 'Heart';
  primaryHouseNum: number;
  secondaryHouseNum: number;
  timingRuleUrdu: string;
  possibleCausesUrdu: string[];
}

export const POSTER_PRIMARY_QUESTIONS: PrimaryPosterTopic[] = [
  {
    id: 'marriage_general',
    badgeUrdu: 'شادی و نکاح',
    titleUrdu: 'شادی ہوگی یا نہیں؟ کب تک ہوگی؟',
    questionUrdu: 'کیا میری شادی بخیر و عافیت طے پا جائے گی اور رکاوٹ دور ہوگی؟',
    timeQuestionUrdu: 'شادی کا رشتہ اور تقریب کس مدت میں پایہ تکمیل کو پہنچے گی؟',
    iconName: 'HeartHandshake',
    primaryHouseNum: 7, // بیت الزوج
    secondaryHouseNum: 15, // قاضی
    timingRuleUrdu: 'اگر شکل سعد داخل (لحیان، قبض الداخل) بیت ۷ یا ۱۱ میں آئے تو ۱ سے ۳ ماہ میں۔ اگر سعد خارج ہو تو ۶ سے ۹ ماہ، اگر نحس ہو تو بندش کے علاج کے بعد۔',
    possibleCausesUrdu: ['رشتوں کی بندش', 'نظربد و حسد', 'سیاروی ناموافقت', 'خاندانی اختلافات']
  },
  {
    id: 'job_employment',
    badgeUrdu: 'ملازمت و روزگار',
    titleUrdu: 'ملازمت ملے گی یا نہیں؟ ملازمت کب تک ملے گی؟',
    questionUrdu: 'کیا مجھے مطلوبہ نوکری، سرکاری یا پرائیویٹ ملازمت حاصل ہوگی؟',
    timeQuestionUrdu: 'ملازمت کی پیشکش اور جوائننگ لیٹر کب تک موصول ہوگا؟',
    iconName: 'Briefcase',
    primaryHouseNum: 10, // بیت العز
    secondaryHouseNum: 2, // بیت المال
    timingRuleUrdu: 'بیت ۱۰ یا ۲ میں نصرۃ الداخل، لحیان یا قبض الداخل کی موجودگی پر ۲ سے ۶ ہفتوں کے اندر سرکاری یا اعلیٰ ملازمت ملتی ہے۔',
    possibleCausesUrdu: ['قسمت کی سستی', 'کوشش میں صحیح سمت کی کمی', 'مقابلے کا سخت رجحان', 'دفتر میں سفارش یا رشوت کا گھیراؤ']
  },
  {
    id: 'health_disease',
    badgeUrdu: 'بیماری و صحت',
    titleUrdu: 'بیماری سے صحت ہوگی یا نہیں؟ کب تک صحت ہوگی؟',
    questionUrdu: 'کیا مریض کو موجودہ روگ، تکلیف یا دائمی بیماری سے مکمل شفا ملے گی؟',
    timeQuestionUrdu: 'صحت یابی اور نقاہت کے خاتمے میں کتنے دن یا مہینے لگیں گے؟',
    iconName: 'Thermometer',
    primaryHouseNum: 6, // بیت الامراض
    secondaryHouseNum: 1, // بیت الحیات
    timingRuleUrdu: 'بیت ۶ سے نحوست خارج ہو اور بیاض (فرح) یا نقی الخد نمودار ہو تو قمر کے دورانیے (۱۴ سے ۲۱ دن) میں کامل شفا ہوتی ہے۔',
    possibleCausesUrdu: ['طبیعی خلل و سردی گرمی کا فساد', 'اثراتِ جنات و سحر', 'شدید نظربد', 'دوا کی غیر موافقت']
  },
  {
    id: 'foreign_travel',
    badgeUrdu: 'بیرونِ ملک سفر',
    titleUrdu: 'بیرون ملک سفر ہوگا یا نہیں؟ کب تک بیرون ملک سفر ہوگا؟',
    questionUrdu: 'کیا میرا ویزا منظور ہوگا اور بیرون ملک روزگار یا تعلیم کے لیے روانگی ہوگی؟',
    timeQuestionUrdu: 'ویزا اور فلائٹ ٹکٹ کا حتمی عمل کس مدت میں مکمل ہوگا؟',
    iconName: 'Plane',
    primaryHouseNum: 9, // بیت الاسفار البعیدہ
    secondaryHouseNum: 3, // بیت الاسفار
    timingRuleUrdu: 'نصرۃ الخارج یا طریق کا بیت ۹ میں آنا بتاتا ہے کہ پردیس کا سفر طے شدہ ہے۔ وقت کا اندازہ ۴ سے ۸ ہفتوں کے اندر ہے۔',
    possibleCausesUrdu: ['دستاویزات میں خامی', 'سفارتخانے کی تاخیری پالیسی', 'حاسدین کی بد دعا', 'ستاروں کی وقتی پستی']
  },
  {
    id: 'love_marriage',
    badgeUrdu: 'پسند کی شادی',
    titleUrdu: 'پسند کی شادی ہوگی یا نہیں؟ کب تک ہوگی؟',
    questionUrdu: 'کیا من پسند شخص کے ساتھ نکاح اور والدین کی رضامندی حاصل ہو جائے گی؟',
    timeQuestionUrdu: 'دونوں خاندانوں کی باہمی رضامندی اور بات پکی ہونے میں کتنا وقت لگے گا؟',
    iconName: 'Heart',
    primaryHouseNum: 5, // بیت العشق
    secondaryHouseNum: 7, // بیت الزوج
    timingRuleUrdu: 'بیت ۵ اور ۷ میں اجتماع، بیاض یا عتبۃ الداخل آئے تو دونوں فریقین خوشی سے راضی ہوں گے۔ مدت ۲ سے ۵ ماہ ہے۔',
    possibleCausesUrdu: ['والدین کی انا و ضد', 'مالی برابری کا تفاوت', 'خفیہ مخالفین کی چغل خوری', 'باہمی غلط فہمیاں']
  }
];

// The 9 Secondary Specific Topics from the Poster Starry Area
export interface SecondaryPosterTopic {
  id: string;
  titleUrdu: string;
  houseNum: number;
  descUrdu: string;
}

export const POSTER_SECONDARY_TOPICS: SecondaryPosterTopic[] = [
  { id: 'sec_loss_profit', titleUrdu: 'نقصان یا فائدہ', houseNum: 2, descUrdu: 'معاملے میں مالی یا جانی نقصان کا اندیشہ ہے یا نفع حاصل ہوگا؟' },
  { id: 'sec_marriage_hurdles', titleUrdu: 'رشتوں میں رکاوٹ', houseNum: 7, descUrdu: 'رشتہ کیوں طے نہیں ہو پا رہا اور بات چل کر کیوں ٹوٹ جاتی ہے؟' },
  { id: 'sec_partnership', titleUrdu: 'شراکت داری', houseNum: 7, descUrdu: 'فلاں شخص سے شراکت اور پارٹنرشپ فائدہ مند ہوگی یا دھوکہ ہوگا؟' },
  { id: 'sec_job_decision', titleUrdu: 'ملازمت کا فیصلہ', houseNum: 10, descUrdu: 'موجودہ نوکری جاری رکھوں یا نئی جگہ تبدیل کروں؟' },
  { id: 'sec_children_exam', titleUrdu: 'اولاد کی صحت، امتحان', houseNum: 5, descUrdu: 'اولاد کے امتحانات میں شاندار کامیابی اور ان کے روشن مستقبل کی رہنمائی۔' },
  { id: 'sec_lost_item', titleUrdu: 'گمشدہ چیز کا پتہ', houseNum: 8, descUrdu: 'کھوئی ہوئی چیز واپس ملے گی یا چوری ہو گئی ہے اور کس سمت میں ہے؟' },
  { id: 'sec_business_growth', titleUrdu: 'کاروبار میں فائدہ', houseNum: 2, descUrdu: 'دکان یا فیکٹری کے کاروبار میں کس سمت ترقی اور گاہکوں کا رجوع ہوگا۔' },
  { id: 'sec_victory_court', titleUrdu: 'کامیابی میں کامیابی', houseNum: 15, descUrdu: 'مقدمہ، قانونی جنگ یا بڑے مقصد میں فتح کس کی ہوگی؟' },
  { id: 'sec_bandish_magic', titleUrdu: 'گھر کی بندش، جادو', houseNum: 12, descUrdu: 'گھر، دکان یا افراد پر سفلی جادو، سحر، بد اثرات یا جناتی بندش کی تشخیص۔' }
];

// Spiritual remedies generator based on verdict and nature
export function getRamalSpiritualRemedies(
  verdictGrade: 'saad_strong' | 'saad_mild' | 'nahas_strong' | 'nahas_mild' | 'neutral',
  topicId: string
) {
  if (verdictGrade === 'saad_strong' || verdictGrade === 'saad_mild') {
    return {
      wazifaUrdu: 'روزانہ بعد نمازِ فجر یا عشاء "يَا فَتَّاحُ يَا رَزَّاقُ يَا مُعْطِي" ۱۱۱ بار پڑھ کر دعا فرمائیں۔',
      sadqahUrdu: 'شکرانے کے طور پر حسبِ توفیق میٹھی روٹی، پرندوں کو دانہ یا سفید آٹے کی گولیاں پانی میں ڈالیں۔',
      naqshNameUrdu: 'نقشِ فتح و نصرت (مربع سعد)',
      gemstoneUrdu: 'عقیقِ یمنی یا فیروزہ نیشاپوری چاندی کی انگوٹھی میں دائیں ہاتھ میں پہنیں۔',
      adviceUrdu: 'حالات نہایت سازگار ہیں۔ اللہ کے فضل پر بھروسہ رکھ کر کوشش جاری رکھیں، کام بخیر و عافیت پایہ تکمیل کو پہنچے گا۔'
    };
  } else if (verdictGrade === 'nahas_strong' || verdictGrade === 'nahas_mild') {
    return {
      wazifaUrdu: 'روزانہ بعد نمازِ مغرب سورۃ الفلق، سورۃ الناس اور آیت الکرسی ۴۱ بار پڑھ کر پانی پر دم کر کے پئیں اور چہرے پر چھڑکیں۔ اسمِ اعظم "يَا كَافِي يَا شَافِي يَا دَافِعَ الْبَلَاءِ" ۱۰۰ بار ورد رکھیں۔',
      sadqahUrdu: 'صدقۂ سیاہ ماش (دال ماش)، کالا تل یا گوشت کا کچا ٹکڑا بدھ یا ہفتے کے دن نکال کر ویرانے میں ڈالیں۔',
      naqshNameUrdu: 'نقشِ ابطالِ سحر و کشائشِ بندش (مثلثِ جلالی)',
      gemstoneUrdu: 'درِ نجف یا سنگِ سلیمانی سیاہ حفاظتِ حصار کے لیے پاس رکھیں۔',
      adviceUrdu: 'اس وقت نحوست و رکاوٹ کا سامنا ہے۔ جلد بازی میں کوئی حتمی معاہدہ یا جھگڑا نہ کریں۔ پہلے روحانی بندش کو کاٹیں اور صدقہ کا اہتمام رکھیں۔'
    };
  } else {
    return {
      wazifaUrdu: 'روزانہ "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ" ۱۰۰ بار اور استغفار کی ایک تسبیح لازم رکھیں۔',
      sadqahUrdu: 'روٹی کے ٹکڑے پر روغن لگا کر کتوں یا پرندوں کو کھلائیں۔',
      naqshNameUrdu: 'نقشِ اعتدال و تائیدِ غیبی',
      gemstoneUrdu: 'زمرد یا زرد پکھراج استعمال کریں۔',
      adviceUrdu: 'معاملہ درمیانی حالت میں ہے۔ تھوڑا صبر اور استقامت درکار ہے۔ حکمتِ عملی کے ساتھ آگے بڑھیں۔'
    };
  }
}

// Generate the 16 full Zaicha houses from 4 Mothers (امہات)
export function generateFullZaicha16(
  m1: RamalFigureDef,
  m2: RamalFigureDef,
  m3: RamalFigureDef,
  m4: RamalFigureDef
): RamalFigureDef[] {
  // 1-4: The 4 Mothers (امہات)
  const mothers = [m1, m2, m3, m4];

  // Helper to find figure by pattern
  const findByPattern = (pattern: [number, number, number, number]): RamalFigureDef => {
    const key = pattern.join('-');
    for (const f of RAMAL_FIGURES_ARRAY) {
      if (f.pattern.join('-') === key) return f;
    }
    return ALL_16_RAMAL_FIGURES.lihyan;
  };

  // Helper to combine two figures by parity addition (ضربِ رمل / التولد)
  const combineFigures = (f1: RamalFigureDef, f2: RamalFigureDef): RamalFigureDef => {
    const row1 = (f1.pattern[0] + f2.pattern[0]) % 2 === 0 ? 2 : 1;
    const row2 = (f1.pattern[1] + f2.pattern[1]) % 2 === 0 ? 2 : 1;
    const row3 = (f1.pattern[2] + f2.pattern[2]) % 2 === 0 ? 2 : 1;
    const row4 = (f1.pattern[3] + f2.pattern[3]) % 2 === 0 ? 2 : 1;
    return findByPattern([row1, row2, row3, row4]);
  };

  // 5-8: The 4 Daughters (بنات) derived from horizontal rows of the 4 mothers
  // Daughter 1 = Fire row of 4 mothers
  const d1 = findByPattern([m1.pattern[0], m2.pattern[0], m3.pattern[0], m4.pattern[0]]);
  // Daughter 2 = Air row of 4 mothers
  const d2 = findByPattern([m1.pattern[1], m2.pattern[1], m3.pattern[1], m4.pattern[1]]);
  // Daughter 3 = Water row of 4 mothers
  const d3 = findByPattern([m1.pattern[2], m2.pattern[2], m3.pattern[2], m4.pattern[2]]);
  // Daughter 4 = Earth row of 4 mothers
  const d4 = findByPattern([m1.pattern[3], m2.pattern[3], m3.pattern[3], m4.pattern[3]]);

  // 9-12: The 4 Nephews / Offspring (حفیدات / متولدات)
  // House 9 = Mother 1 + Mother 2
  const h9 = combineFigures(m1, m2);
  // House 10 = Mother 3 + Mother 4
  const h10 = combineFigures(m3, m4);
  // House 11 = Daughter 1 + Daughter 2
  const h11 = combineFigures(d1, d2);
  // House 12 = Daughter 3 + Daughter 4
  const h12 = combineFigures(d3, d4);

  // 13-14: The 2 Witnesses (شواہد)
  // House 13 (سائل) = House 9 + House 10
  const h13 = combineFigures(h9, h10);
  // House 14 (مسئول عنہ) = House 11 + House 12
  const h14 = combineFigures(h11, h12);

  // 15: The Judge (قاضی الرمل / میزان) = House 13 + House 14
  const h15 = combineFigures(h13, h14);

  // 16: The Ultimate Outcome (عاقبت العواقب) = House 15 + House 1 (Mother 1)
  const h16 = combineFigures(h15, m1);

  return [m1, m2, m3, m4, d1, d2, d3, d4, h9, h10, h11, h12, h13, h14, h15, h16];
}
