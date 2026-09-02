// Complete Encyclopedic Data for Shams al-Ma'arif al-Kubra (شمس المعارف الكبرى ولطائف العوارف)
// Authored by Imam Abu al-Abbas Ahmad ibn Ali al-Buni (الشيخ أحمد بن علي البوني رحمه الله - ت 622هـ)

export interface ShamsChapter {
  chapterNumber: number;
  arabicTitle: string;
  urduTitle: string;
  category:
    | 'letters_abjad'
    | 'planetary_hours'
    | 'quran_secrets'
    | 'divine_names'
    | 'invocations_azimat'
    | 'wafq_talismans'
    | 'practical_operations'
    | 'sawaqit_fatiha'
    | 'birhatiyah'
    | 'jaljalutiyah'
    | 'dafeen_earth'
    | 'aqd_lisan'
    | 'dafa_dushman_qahr'
    | 'mahabbat_tasjeer'
    | 'shifa_ibtalsihr'
    | 'kashf_asrar';
  categoryUrdu: string;
  coreConceptUrdu: string;
  keyOperationsCount: number;
  mainSecretsUrdu: string[];
  sampleArabicText: string;
  sampleUrduTranslation: string;
}

export interface ShamsOperation {
  id: string;
  titleArabic: string;
  titleUrdu: string;
  chapterNumber: number;
  chapterNameUrdu: string;
  category:
    | 'jaljalutiyah'
    | 'birhatiyah'
    | 'sawaqit_fatiha'
    | 'seals_solomon'
    | 'dafeen_earth'
    | 'mahabbat_tasjeer'
    | 'dafa_dushman_qahr'
    | 'shifa_ibtalsihr'
    | 'kashf_asrar'
    | 'rizq_fath'
    | 'aqd_lisan'
    | 'invocations_azimat'
    | 'wafq_talismans';
  categoryUrdu: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  elementUrdu: string;
  suitableDay: string;
  suitableSaat: string;
  incenseUrdu: string;
  inkAndMedium: string;
  directionUrdu: string;
  defaultAdad: number;
  defaultText: string;
  arabicWafqOrTalismanText: string;
  urduTranslation: string;
  methodologySteps: string[];
  azimatArabic: string;
  azimatUrdu: string;
  chillaConditions: string[];
  spiritualProtection: string;
  secretNotesUrdu: string;
  isSecretOrRare: boolean;
  wafqType: string;
}

export interface BirhatiyahName {
  index: number;
  nameArabic: string;
  nameUrdu: string;
  meaningUrdu: string;
  abjadValue: number;
  rulingPlanetUrdu: string;
  rulingAngelUrdu: string;
  specialPropertiesUrdu: string;
  azimatUsageUrdu: string;
}

export interface JaljalutiahBayt {
  baytNumber: number;
  arabicPoem: string;
  urduPoeticTranslation: string;
  divineNameKey: string;
  abjadNumericValue: number;
  specificBenefitUrdu: string;
  talismanicSealUrdu: string;
  wafqSize: string;
}

export interface SawaqitFatihaLetter {
  letter: string;
  letterName: string;
  divineName: string;
  divineNameUrdu: string;
  adad: number;
  celestialRuler: string;
  planetaryRuler: string;
  day: string;
  dayUrdu: string;
  elementUrdu: string;
  incense: string;
  specialPurpose: string;
  wafqPattern: string;
}

export interface SolomonSealKey {
  symbolName: string;
  symbolArabic: string;
  urduMeaning: string;
  planet: string;
  day: string;
  divineAttribute: string;
  secretBenefit: string;
}

// ----------------------------------------------------
// 1. ALL 40 CHAPTERS OF SHAMS AL-MA'ARIF AL-KUBRA
// ----------------------------------------------------
export const SHAMS_40_CHAPTERS: ShamsChapter[] = [
  {
    chapterNumber: 1,
    arabicTitle: 'في الحروف المعجمة وما يترتب فيها من الأسرار والأنوار',
    urduTitle: 'باب اول: حروفِ تہجی، ان کے مخفی انوار، طبائعِ اربعہ اور منازل کے اسرار',
    category: 'letters_abjad',
    categoryUrdu: 'حروف و ابجد کے اسرار',
    coreConceptUrdu: '۲۸ حروفِ تہجی کے ناری، بادی، آبی اور خاکی مزاج، ان کے موکلینِ علوی و سفلی اور اعداد کے انوار کی تحقیق۔',
    keyOperationsCount: 14,
    mainSecretsUrdu: [
      'حروفِ نورانیہ (۱۴ حروف) بمقابلہ حروفِ ظلمانیہ (۱۴ حروف) کی تاثیرات۔',
      'حروفِ ملفوظی، مسروری اور ملبوسی کی تکسیر سے انوار کا کشف۔',
      'عناصرِ اربعہ میں حروف کی تقسیم اور سائل و مطلوب کے حروف کا تقابل۔'
    ],
    sampleArabicText: 'اعلم أن الحروف أمة من الأمم، لها أرواح وأجساد وأعوان، وسر الحرف في عدده، ونوره في تصريفه.',
    sampleUrduTranslation: 'جان لو کہ حروف اللہ تعالیٰ کی مخلوقات میں سے ایک امت ہیں، جن کی روحیں، اجسام اور مددگار موکلین ہیں، حرف کا راز اس کے عدد میں اور اس کا نور اس کے تصرف میں ہے۔'
  },
  {
    chapterNumber: 2,
    arabicTitle: 'في الكسر والبسط وترتيب الأعمال في الأوقات والساعات',
    urduTitle: 'باب دوم: علمِ کسر و بسط، تکسیرِ حروف اور اوقات و ساعات کی ترتیب',
    category: 'planetary_hours',
    categoryUrdu: 'تکسیر، بسط اور ساعات',
    coreConceptUrdu: 'حروف کو پھیلانے (بسطِ عددی، بسطِ حرفی، بسطِ ملفوظی) اور کواکب کی شرف و ہبوط کی ساعات میں اعمال ترتیب دینے کے اصول۔',
    keyOperationsCount: 18,
    mainSecretsUrdu: [
      'سطرِ زمام کے ذریعے اعمال کی کامیابی کا استخراج۔',
      'ساعتِ شمس، زہرہ، مشتری، عطارد، مریخ، قمر اور زحل کے جلالی و جمالی اعمال۔',
      'کواکب کے سعد و نحس اوقات میں بخورات کا انتخاب۔'
    ],
    sampleArabicText: 'والبسط أصل العلوم الغامضة، وبه تخرج الأسماء الخفية وتتولد القوى الروحانية.',
    sampleUrduTranslation: 'اور بسط تمام پوشیدہ علوم کی بنیاد ہے، اسی کے ذریعے مخفی اسماء ظاہر ہوتے ہیں اور روحانی قوتیں جنم لیتی ہیں۔'
  },
  {
    chapterNumber: 3,
    arabicTitle: 'في أحكام منازل القمر الثمانية والعشرين الفلكيات',
    urduTitle: 'باب سوم: قمر کی ۲۸ فلکی منازل، ان کے خواص، بخورات اور طلسمات',
    category: 'planetary_hours',
    categoryUrdu: 'منازلِ قمر',
    coreConceptUrdu: 'شرطین سے لے کر رشاء تک چاند کی اٹھائیس منازل میں سے ہر منزل کا طلسم، اس کے ملائکہ، عنصر اور مناسب وقت۔',
    keyOperationsCount: 28,
    mainSecretsUrdu: [
      'منزلِ بطین و ثریا میں جلبِ خیرات و رزق۔',
      'منزلِ اکلیل و قلب میں دفعِ اعداء و عقد اللسان۔',
      'منزلِ سعد الذابح میں فتحِ کنوز و کشائشِ کار۔'
    ],
    sampleArabicText: 'منزل الشرطين أول المنازل، فلكها ناري، وطالعها الحمل، وفيها يكتب طلسم الغلبة والظفر.',
    sampleUrduTranslation: 'منزل شرطین پہلی منزل ہے، اس کا فلک ناری اور طالع برج حمل ہے، اس میں غلبہ اور فتح کا طلسم لکھا جاتا ہے۔'
  },
  {
    chapterNumber: 4,
    arabicTitle: 'في أحكام البروج الاثني عشر ومالها من الإشارات والارتباطات',
    urduTitle: 'باب چہارم: بارہ بروج، ان کے درجات، طبائع اور سیاروی مناسبتیں',
    category: 'planetary_hours',
    categoryUrdu: 'بروج و کواکب',
    coreConceptUrdu: 'بروجِ اثنا عشر (حمل تا حوت) کے اربابِ مثلثات، درجاتِ شرف، اور رجال الغیب کے رُخ کا تعین۔',
    keyOperationsCount: 16,
    mainSecretsUrdu: [
      'بروجِ ناریہ (حمل، اسد، قوس) میں محبت و جلالی تسخیر۔',
      'بروجِ ترابیہ (ثور، سنبلہ، جدی) میں تثبیتِ دولت، عمارات اور استخراجِ دفائن۔',
      'بروجِ ہوائیہ (جوزا، میزان، دلو) میں الفت، زبان بندی اور خطابت۔',
      'بروجِ مائیہ (سرطان، عقرب، حوت) میں شفا، محبت اور امراض کا ازالہ۔'
    ],
    sampleArabicText: 'والبروج مظاهر التجليات الكونية، فمن عرف طبائعها سخر له سر الزمان.',
    sampleUrduTranslation: 'اور بروج کائناتی تجلیات کے مظاہر ہیں، جس نے ان کے مزاج کو پہچان لیا اس کے لیے وقت کے اسرار مسخر ہو گئے۔'
  },
  {
    chapterNumber: 5,
    arabicTitle: 'في أسرار البسملة وما لها من الخواص والبركات الخفيات',
    urduTitle: 'باب پنجم: اسرارِ بسم اللہ الرحمن الرحیم اور اس کے پوشیدہ خواص و نقوش',
    category: 'quran_secrets',
    categoryUrdu: 'قرآنی اسرار و آیات',
    coreConceptUrdu: 'بسم اللہ کے ۱۹ حروف، عدد ۷۸۶ کے خواص، وفقِ مربع اور خاتمِ بسملہ برائے ہر حاجت و ہیبت۔',
    keyOperationsCount: 22,
    mainSecretsUrdu: [
      'بسم اللہ کا وفقِ مخمس خاکی برائے رزق و بے نیازی۔',
      'عدد ۷۸۶ کا نقشِ مربع ناری برائے تسخیرِ قلوب۔',
      'بسم اللہ شریف کی ۴۱ روزہ ریاضت اور کشفِ قلوب۔'
    ],
    sampleArabicText: 'البسملة مفتاح كل كنز، وفي حروفها التسعة عشر سر الزمان والملائكة التسعة عشر.',
    sampleUrduTranslation: 'بسم اللہ ہر خزانے کی چابی ہے، اور اس کے انیس حروف میں زمانے کا راز اور انیس فرشتوں کی قوت پنہاں ہے۔'
  },
  {
    chapterNumber: 6,
    arabicTitle: 'في الخلوة والرياضة وأرباب الاعتكاف المفضيات لبلوغ المقاصد',
    urduTitle: 'باب ششم: شرائطِ خلوت، ریاضت، ترکِ حیوانی اور اذنِ روحانی',
    category: 'practical_operations',
    categoryUrdu: 'خلوت و ریاضت',
    coreConceptUrdu: 'چلہ کشی کے قواعد، جلالی و جمالی پرہیز، بخورات کا استعمال، اور باطنی آنکھ کھولنے کے شرائط۔',
    keyOperationsCount: 12,
    mainSecretsUrdu: [
      'ترکِ حیوانات و مشتقاتِ حیوانی (دودھ، گوشت، انڈے، چمڑا)۔',
      'تہجد اور فجر کے وقت مخصوص اذکار کی ضربیں۔',
      'خلوت میں رجعت و وہم سے بچنے کا فولادی حصار۔'
    ],
    sampleArabicText: 'من لم يصف باطنه بالرياضة لم تفتح له أبواب الملكوت ولم تجبه الأرواح.',
    sampleUrduTranslation: 'جس نے ریاضت کے ذریعے اپنے باطن کو صاف نہ کیا، اس پر ملکوت کے دروازے نہیں کھلتے اور نہ ہی ارواح اس کی پکار کا جواب دیتی ہیں۔'
  },
  {
    chapterNumber: 7,
    arabicTitle: 'في الأسماء التي كان عيسى عليه السلام يحيي بها الموتى',
    urduTitle: 'باب ہفتم: وہ اسماء جن سے حضرت عیسیٰؑ مردوں کو زندہ اور اندھوں کو بینا فرماتے تھے',
    category: 'divine_names',
    categoryUrdu: 'اسمائے الٰہیہ و اسرارِ انبیاء',
    coreConceptUrdu: 'یا حی یا قیوم یا قدیم یا دائم یا فرد یا وتر کے عبرانی و سریانی اسرار اور احیائے قلوب و شفا۔',
    keyOperationsCount: 10,
    mainSecretsUrdu: [
      'اسمِ حی و قیوم کا طلسمِ اعظم برائے شفا امراضِ لاعلاج۔',
      'سریانی اسماء (آهیا شراهیا أدوناي أصباؤت آل شداي) کے نقوش۔',
      'مریض پر دم کرنے کی عزیمتِ عیسوی۔'
    ],
    sampleArabicText: 'وهي الأسماء السريانية الكريمة التي نطق بها روح الله عيسى بن مريم عليه السلام فقام الميت بإذن الله.',
    sampleUrduTranslation: 'اور یہ وہ مکرم سریانی اسماء ہیں جن کے ساتھ روح اللہ عیسیٰ بن مریمؑ نے کلام فرمایا تو مردہ اللہ کے حکم سے جی اٹھا۔'
  },
  {
    chapterNumber: 8,
    arabicTitle: 'في التوافيق الأربعة وما لها من الفصول والدائرات',
    urduTitle: 'باب ہشتم: چاروں بنیادی توافیق (مثلث، مربع، مخمس، مسدس) اور ان کے دائرے',
    category: 'wafq_talismans',
    categoryUrdu: 'اوفاق و الواح',
    coreConceptUrdu: 'نقش ۳×۳ (مثلث)، ۴×۴ (مربع)، ۵×۵ (مخمس)، اور ۶×۶ (مسدس) کی درستیِ چال، کسر کا علاج اور موکلین کا استخراج۔',
    keyOperationsCount: 25,
    mainSecretsUrdu: [
      'مثلثِ غَزّالی و بطد زہج واح کے باطنی ضوابط۔',
      'مربعِ ذوالکتابت اور مفتاح و مغلاق کے اعداد۔',
      'مخمسِ سلیمانی برائے دولت و غلبہ۔'
    ],
    sampleArabicText: 'التوافيق موازين العدل الروحاني، فكل بيت يقابل بيتاً بالسر والعدد.',
    sampleUrduTranslation: 'اوفاق روحانی عدل کے ترازو ہیں، ہر خانہ دوسرے خانے کے مقابلے میں راز اور عدد کے اعتبار سے برابر توازن رکھتا ہے۔'
  },
  {
    chapterNumber: 9,
    arabicTitle: 'في خواص أوائل السور والآيات البينات',
    urduTitle: 'باب نہم: قرآنی سورتوں کے اوائل (حروفِ مقطعات الم، الر، طسم، حم، یس، ق) کے خواص',
    category: 'quran_secrets',
    categoryUrdu: 'حروفِ مقطعات',
    coreConceptUrdu: '۱۴ حروفِ مقطعات کے طلسمات اور ان کی تکسیر سے تیار ہونے والے شاندار نقوش۔',
    keyOperationsCount: 19,
    mainSecretsUrdu: [
      'کہیعص اور حمعسق کے امتزاج کا وفقِ اعظم برائے کشف و ہیبت۔',
      'الم نشرح اور الم تر کیف کی تکسیر برائے کشائشِ رزق و فتح۔',
      'طس اور یس کے موکلین کی تسخیر۔'
    ],
    sampleArabicText: 'فواتح السور سر القرآن العظيم، ففيها الاسم الأعظم مفرقاً في الآفاق.',
    sampleUrduTranslation: 'سورتوں کے اوائل قرآنِ عظیم کے مخفی راز ہیں، انہی کے اندر اسمِ اعظم کائنات کے افق پر پھیلا ہوا ہے۔'
  },
  {
    chapterNumber: 10,
    arabicTitle: 'في أسرار الفاتحة وما لها من الخواص والفضل',
    urduTitle: 'باب دہم: ام الکتاب سورۃ الفاتحہ کے اسرار، نقوش، اور ۷ گنا روحانی فوائد',
    category: 'quran_secrets',
    categoryUrdu: 'قرآنی اسرار و آیات',
    coreConceptUrdu: 'سورہ فاتحہ کے ۷ آیات، اس کے خادمین (روقیائیل، جبرائیل، سمسمائیل، میکائیل، صرفیائیل، عنیائیل، کسفیائیل) کے ساتھ نقوش۔',
    keyOperationsCount: 21,
    mainSecretsUrdu: [
      'فاتحہ شریفہ کا نقشِ مسبع (۷×۷) برائے حصولِ ہر مراد۔',
      'شفا کے لیے پانی پر دم کرنے کا خاص طلسم۔',
      'دشمن کے شر سے نجات کے لیے سورہ فاتحہ مع اسمائے قہریہ۔'
    ],
    sampleArabicText: 'الفاتحة هي السبع المثاني والقرآن العظيم، فما من داء إلا وفيها دواؤه وبرهانه.',
    sampleUrduTranslation: 'سورہ فاتحہ سبع مثانی اور قرآن عظیم ہے، کوئی ایسی بیماری نہیں جس کی شفا اور دلیل اس میں موجود نہ ہو۔'
  },
  {
    chapterNumber: 11,
    arabicTitle: 'في الاختراعات والأنوار المتولدة',
    urduTitle: 'باب یازدہم: ایجاداتِ روحانیہ، اختراعات اور استخراجِ انوار',
    category: 'practical_operations',
    categoryUrdu: 'استخراجِ انوار',
    coreConceptUrdu: 'سائل کے مقصد کے مطابق خودکار طریقے سے نئے طلسمات و الواح اختراع کرنے کے الہامی اصول۔',
    keyOperationsCount: 15,
    mainSecretsUrdu: [
      'نامِ سائل و نامِ مطلوب سے سطرِ امتزاج بنانا۔',
      'ملائکہ علوی و ارضی کے اسماء استخراج کرنا (ائیل اور طوش کے لاحقے)۔'
    ],
    sampleArabicText: 'والاختراع هو توليد اسم من اسم، وروح من روح، بقدرة القادر المتعال.',
    sampleUrduTranslation: 'اور اختراع یہ ہے کہ ایک نام سے دوسرا نام اور ایک روح سے دوسری روح کو اللہ تعالیٰ کی قدرت سے برآمد کیا جائے۔'
  },
  {
    chapterNumber: 12,
    arabicTitle: 'في اسم الله الأعظم وما له من التصريفات',
    urduTitle: 'باب دوازدہم: اسمِ اعظم کے ۷ اقوال، اس کی ہیئت، نقوش اور تسخیرِ کائنات',
    category: 'divine_names',
    categoryUrdu: 'اسمِ اعظم کے تصریفات',
    coreConceptUrdu: 'وہ اسم جس کے پکارنے پر دعائیں فوراً مستجاب ہوتی ہیں اور پہاڑ ہل جاتے ہیں، اس کے ۷ حروف و اشکال۔',
    keyOperationsCount: 14,
    mainSecretsUrdu: [
      'اسمِ اعظم کا خاتمِ سباعی مع اشکالِ سلیمانی۔',
      'اسم اللہ الأعظم کا نقشِ معطم برائے فوری حلِ مشکلات۔',
      'نصف شب کی دعا برائے کشفِ غیوب۔'
    ],
    sampleArabicText: 'اسم الله الأعظم هو النور الجامع الذي به قامت السماوات والأرض.',
    sampleUrduTranslation: 'اسم اللہ الاعظم وہ جامع نور ہے جس کی برکت سے آسمان و زمین قائم ہیں۔'
  },
  {
    chapterNumber: 13,
    arabicTitle: 'في سواقط الفاتحة (ف ج ش ث ظ خ ز) وما لها من الأوفاق',
    urduTitle: 'باب سیزدہم: سواقطِ فاتحہ (ف ج ش ث ظ خ ز)، ان کے ۷ کواکب اور ۷ موکلین کے اوفاق',
    category: 'sawaqit_fatiha',
    categoryUrdu: 'سواقطِ فاتحہ',
    coreConceptUrdu: 'وہ ۷ حروف جو سورہ فاتحہ میں نہیں آئے (فرد، جبار، شکور، ثابت، ظہیر، خبیر، زکی) اور ان کے سات ملوک۔',
    keyOperationsCount: 20,
    mainSecretsUrdu: [
      'حرف ف (فرد) برائے سورج و اتوار۔',
      'حرف ج (جبار) برائے چاند و پیر۔',
      'حرف ش (شکور) برائے مریخ و منگل۔',
      'حرف ث (ثابت) برائے عطارد و بدھ۔',
      'حرف ظ (ظہیر) برائے مشتری و جمعرات۔',
      'حرف خ (خبیر) برائے زہرہ و جمعہ۔',
      'حرف ز (زکی) برائے زحل و ہفتہ۔'
    ],
    sampleArabicText: 'سواقط الفاتحة سبعة أحرف، في كل حرف منها اسم جليل وملك كريم وحاكم من ملوك الجان.',
    sampleUrduTranslation: 'سواقط فاتحہ سات حروف ہیں، ان میں سے ہر حرف میں ایک جلیل القدر الٰہی اسم، ایک معزز فرشتہ اور جنات کا ایک بادشاہ موکل ہے۔'
  },
  {
    chapterNumber: 14,
    arabicTitle: 'في الرياضات والأنوار وما يتلوها من الأذكار',
    urduTitle: 'باب چہاردہم: ریاضاتِ انوار اور بعد از نماز پڑھے جانے والے ورد و حرز',
    category: 'practical_operations',
    categoryUrdu: 'اذکار و احراز',
    coreConceptUrdu: 'روحانی قوت اور تحفظ کے لیے مسنون و ماثور اذکار کا طریقہ۔',
    keyOperationsCount: 16,
    mainSecretsUrdu: ['حرزِ امیر المومنین علیؑ۔', 'دعا السیفی الصغیر۔', 'حزب البحر للشاذلی مع اوفاق البونی۔'],
    sampleArabicText: 'الذكر غذاء الروح وسلاح العارف، به تنكشف الحجب وتسطع الأنوار.',
    sampleUrduTranslation: 'ذکر روح کی غذا اور عارف کا ہتھیار ہے، اس سے پردے اٹھتے ہیں اور انوار چمکتے ہیں۔'
  },
  {
    chapterNumber: 15,
    arabicTitle: 'في التوكيلات والدعوات المستجابة',
    urduTitle: 'باب پانزدہم: توکیلات، عزائمِ اجابت اور استحضارِ ارواحِ طیبہ',
    category: 'invocations_azimat',
    categoryUrdu: 'توکیلات و عزائم',
    coreConceptUrdu: 'ہر عمل کے اختتام پر موکلین کو کام سپرد کرنے (توکیل) کی مستند عبارات۔',
    keyOperationsCount: 18,
    mainSecretsUrdu: ['توکیلِ جلالی برائے قہرِ دشمن۔', 'توکیلِ جمالی برائے الفت و صلح۔', 'توکیلِ کشف برائے رویا و استخارہ۔'],
    sampleArabicText: 'توكلوا يا خدام هذه الأسماء الشريفة بقضاء حاجتي وهي كذا وكذا بارك الله فيكم وعليكم.',
    sampleUrduTranslation: 'اے ان پاک اسماء کے خادمو! میری فلاں حاجت پوری کرنے کے موکل بن جاؤ، اللہ تم پر برکت فرمائے۔'
  },
  {
    chapterNumber: 16,
    arabicTitle: 'في أسماء الله الحسنى وأوفاقها التسعة والتسعين',
    urduTitle: 'باب شانزدہم: اسمائے حسنیٰ کے ۹۹ اوفاق اور ان کی مخصوص تاثیرات',
    category: 'divine_names',
    categoryUrdu: 'اسمائے حسنیٰ کے اوفاق',
    coreConceptUrdu: 'اللہ کے ننانوے ناموں میں سے ہر نام کا انفرادی وفق، عدد اور ریاضت۔',
    keyOperationsCount: 99,
    mainSecretsUrdu: [
      'یا اللہ (عدد ۶۶) کا مربع کامل۔',
      'یا لطیف (عدد ۱۲۹) کا وفقِ مخمس برائے کشائش۔',
      'یا وہاب (عدد ۱۴) کا مثلث سریع التاثیر۔',
      'یا رزاق (عدد ۳۰۸) کا مسبع برائے وسعتِ رزق۔'
    ],
    sampleArabicText: 'ولله الأسماء الحسنى فادعوه بها، فلكل اسم سر وعالم وفلك يخصه.',
    sampleUrduTranslation: 'اور اللہ کے لیے بہترین نام ہیں پس تم ان کے ذریعے اسے پکارو، ہر نام کا ایک راز، ایک جہان اور ایک خاص فلک ہے۔'
  },
  {
    chapterNumber: 17,
    arabicTitle: 'في خواص كاف ها يا عين صاد وحاميم عين سين قاف',
    urduTitle: 'باب ہفدہم: کہیعص اور حمعسق کے مخفی طلسمات، عقد اللسان اور تسخیرِ امراء',
    category: 'quran_secrets',
    categoryUrdu: 'کہیعص و حمعسق',
    coreConceptUrdu: 'ان دو عظیم مقطعات کے ۱۰ حروف کی باہمی تکسیر، انگلیوں پر بندش اور تسخیرِ حکام۔',
    keyOperationsCount: 14,
    mainSecretsUrdu: [
      'دس انگلیوں پر حروف بند کرنا اور ظالم حاکم کے سامنے کھولنا۔',
      'کہیعص کا لوحِ چاندی برائے عزت و دبدبہ۔',
      'حمعسق کا طلسم برائے تحفظ از شیاطین۔'
    ],
    sampleArabicText: 'كـهيعص كفايتنا، وحـمعسق حمايتنا، فسيكفيكهم الله وهو السميع العليم.',
    sampleUrduTranslation: 'کہیعص ہماری کفایت ہے اور حمعسق ہماری حفاظت ہے، پس اللہ ان کے مقابلے میں آپ کے لیے کافی ہے اور وہ خوب سننے جاننے والا ہے۔'
  },
  {
    chapterNumber: 18,
    arabicTitle: 'في خواص آية الكرسي وبركاتها وخدامها الروحانيين',
    urduTitle: 'باب ہژدہم: آیت الکرسی کے خواص، برکات، خادمِ معظم السید کندیاس اور حصارِ کبیر',
    category: 'quran_secrets',
    categoryUrdu: 'آیت الکرسی و خدام',
    coreConceptUrdu: 'آیت الکرسی کے ۵۰ کلمات، ۱۷۰ یا ۳۱۳ بار تلاوت، خادم سید کندیاس کی دعوت اور ناقابلِ تسخیر قلعہ۔',
    keyOperationsCount: 16,
    mainSecretsUrdu: [
      'دعوتِ السید کندیاس خادمِ آیت الکرسی۔',
      'آیت الکرسی کا وفقِ مئینی برائے جملہ مہمات۔',
      'دفن شدہ اموال و جان کی حفاظت کا مہر بند حصار۔'
    ],
    sampleArabicText: 'آية الكرسي سيدة آي القرآن، وخادمها السيد كندياس لا يعصي أمر من أخلص لله.',
    sampleUrduTranslation: 'آیت الکرسی قرآن کی آیات کی سردار ہے، اور اس کا خادم سید کندیاس اس شخص کے حکم کی نافرمانی نہیں کرتا جو اللہ کے لیے مخلص ہو۔'
  },
  {
    chapterNumber: 19,
    arabicTitle: 'في خواص بعض الأوفاق والطلسمات النافعة المجربة',
    urduTitle: 'باب نوزدہم: کثیر الفوائد مجرب اوفاق، طلسمات اور الواحِ نادرہ',
    category: 'wafq_talismans',
    categoryUrdu: 'مجرب طلسمات',
    coreConceptUrdu: 'قدیم ائمہ و صوفیاء کے وہ طلسمات جو سینہ بہ سینہ چلے آ رہے ہیں۔',
    keyOperationsCount: 24,
    mainSecretsUrdu: ['لوحِ عطارد برائے فہم و ذہانت۔', 'لوحِ شمس برائے جاہ و اقتدار۔', 'لوحِ زہرہ برائے مسرت و انس۔'],
    sampleArabicText: 'هذه أوفاق جربتها الحكماء فما وجدوا فيها خلفاً ولا نقصاً إذا روعيت شروطها.',
    sampleUrduTranslation: 'یہ وہ اوفاق ہیں جنہیں حکماء نے آزمایا ہے، پس اگر ان کی شرائط پوری کی جائیں تو ان میں کبھی خطا یا کمی نہیں پائی گئی۔'
  },
  {
    chapterNumber: 20,
    arabicTitle: 'في سورة يس وما لها من الدعوات المستجابات والأسرار',
    urduTitle: 'باب بیستم: سورۃ یٰس شریف کی دعوت، مبینوں کے نقوش اور دفعِ آفات',
    category: 'quran_secrets',
    categoryUrdu: 'سورہ یٰس شریف',
    coreConceptUrdu: 'قلبِ قرآن سورہ یٰس کے ۷ مبین، ہر مبین پر مخصوص دعا، اور دشمن کے خاتمے و حاجات کی فراہمی۔',
    keyOperationsCount: 17,
    mainSecretsUrdu: [
      'یس شریف کی چالیس روزہ دعوت۔',
      'سات مبینوں کا نقشِ معطر برائے عقد اللسان و صلح۔',
      'آیت سلام قولا من رب رحیم کا ۱۲ ہزار بار ورد۔'
    ],
    sampleArabicText: 'يس قلب القرآن، ومن قرأها على حاجة بنية خالصة قضاها الله له في حينه.',
    sampleUrduTranslation: 'سورہ یس قرآن کا دل ہے، اور جس نے خالص نیت کے ساتھ کسی حاجت پر اسے پڑھا اللہ نے اسی وقت اس کی حاجت پوری فرما دی۔'
  },
  {
    chapterNumber: 21,
    arabicTitle: 'في خواص أسماء القمر وسرها وسائر تصاريفها',
    urduTitle: 'باب بیست و یکم: اسمائے قمر (لیاخیم، لیالغو، لیافور، لیاروث، لیاروغ، لیاروش، لیاشلش)',
    category: 'planetary_hours',
    categoryUrdu: 'اسمائے قمر',
    coreConceptUrdu: 'چاند کے ۷ سریانی نام، ان کے نقوش، ہر دن کا نام اور مسخر کرنے کے طریقے',
    keyOperationsCount: 14,
    mainSecretsUrdu: [
      'اسمائے سبعہ قمر کا لوحِ نقرہ (چاندی کی تختی)۔',
      'پانی پر لکھ کر پلانا برائے شفائے کامل۔',
      'چور کی شناخت اور گمشدہ چیز کا سراغ۔'
    ],
    sampleArabicText: 'أسماء القمر السريانية السبعة لها سلطان عظيم على سائر الأرواح المائية والهوائية.',
    sampleUrduTranslation: 'چاند کے سات سریانی اسماء تمام آبی اور ہوائی ارواح پر عظیم غلبہ و حکومت رکھتے ہیں۔'
  },
  {
    chapterNumber: 22,
    arabicTitle: 'في تصريف الأسماء البرهتية الشريفة (العهد القديم)',
    urduTitle: 'باب بیست و دوم: اسمائے برہتیہ کبریٰ (البرہتیۃ، کریر، تتلیہ، طوران، مزجل، بزجل...) اور قسمِ عظیم',
    category: 'birhatiyah',
    categoryUrdu: 'اسمائے برہتیہ کبریٰ',
    coreConceptUrdu: 'سلیمان علیہ السلام کا عہدِ قدیم، ۲۸ برہتی نام، ان کا زجر، قسم، اور ہر اسم کی تسخیر و تاثیر۔',
    keyOperationsCount: 28,
    mainSecretsUrdu: [
      'برہتیہ کی ۲۱ روزہ خلوت اور تاجِ برہتیہ کا نزول۔',
      'قسمِ برہتیہ برائے احضارِ جنات و ارواح۔',
      'عقد اللسان، جلبِ قلوب اور اخراجِ دفائن میں برہتیہ کا استعمال۔'
    ],
    sampleArabicText: 'البرهتية هي العهد القديم والقسم العظيم الذي تخضع له الملوك السبعة والجن والإنس.',
    sampleUrduTranslation: 'برہتیہ وہ قدیم عہد اور عظیم قسم ہے جس کے سامنے ساتوں ملوک، جنات اور انسان سر جھکاتے ہیں۔'
  },
  {
    chapterNumber: 23,
    arabicTitle: 'في خواص الجلجلوتية الكبرى والصغرى وأبياتها الستين',
    urduTitle: 'باب بیست و سوم: قصیدہ جلجلوتیہ کبریٰ (بدأت ببسم الله روحي به اهتدت...) اور ۶۰ ابیات کے طلسمات',
    category: 'jaljalutiyah',
    categoryUrdu: 'قصیدہ جلجلوتیہ کبریٰ',
    coreConceptUrdu: 'حضرت علی بن ابی طالب کرم اللہ وجہہ الکریم سے منسوب سریانی قصیدہ، ہر شعر کا وفق، خاتم اور خادم۔',
    keyOperationsCount: 60,
    mainSecretsUrdu: [
      'بِآهٍ أَيَاهٍ نَمُوهٍ أَصَالِيَا و نَجِّنِي مِنَ الشِّدَادِ۔',
      'بِطَهْطَهْلُوبٍ و سَبْسَبٍ و هَيْطَلٍ کے طلسمات۔',
      'جلجلوتیہ کے ہر شعر کا وفقِ مربع اور علاجِ امراض۔'
    ],
    sampleArabicText: 'الجلجلوتية كنز الأسرار وذخيرة الأبرار، من داوم على أبياتها نال المراتب العلية.',
    sampleUrduTranslation: 'جلجلوتیہ اسرار کا خزانہ اور نیک بندوں کا سرمایہ ہے، جس نے اس کے اشعار پر مداومت کی اس نے بلند مراتب پا لیے۔'
  },
  {
    chapterNumber: 24,
    arabicTitle: 'في خواص سورة الواقعة والاستغناء بها عن الناس',
    urduTitle: 'باب بیست و چہارم: سورۃ الواقعہ کی زکوٰۃ، طلسمات اور فقر و تنگی کا خاتمہ',
    category: 'quran_secrets',
    categoryUrdu: 'سورہ واقعہ و غناء',
    coreConceptUrdu: 'مغرب کے بعد سورہ واقعہ کی تلاوت، عدد ۷۰۸ کا وفق اور چاندی کی لوح پر زر و مال کا عمل۔',
    keyOperationsCount: 15,
    mainSecretsUrdu: [
      'سورہ واقعہ کا ۴۱ روزہ چلہ برائے دولتِ بے حساب۔',
      'دعائے واقعہ شریف مع اسماء یا کریم یا وہاب۔',
      'دکان و کاروبار میں برکت کا لوحِ واقعہ۔'
    ],
    sampleArabicText: 'من قرأ الواقعة كل ليلة لم تصبه فاقة أبداً، وفي وفقها سر الغنى السريع.',
    sampleUrduTranslation: 'جس نے ہر رات سورہ واقعہ پڑھی اسے کبھی فاقہ نہ پہنچے گا، اور اس کے وفق میں فوری دولت کا راز ہے۔'
  },
  {
    chapterNumber: 25,
    arabicTitle: 'في خواص سورة الملك والنجاة من عذاب القبر والمخاوف',
    urduTitle: 'باب بیست و پنجم: سورۃ الملک، اس کے ۳۰ آیات اور خوف و دشمن سے امان',
    category: 'quran_secrets',
    categoryUrdu: 'سورہ ملک و امان',
    coreConceptUrdu: 'تبرک الذی بیدہ الملک کا نقشِ مثلث اور خوف و حزن سے خلاصی۔',
    keyOperationsCount: 12,
    mainSecretsUrdu: ['قید و بند سے رہائی کا نقش۔', 'ظالم کے شر سے حفاظت۔'],
    sampleArabicText: 'سورة الملك هي المنجية والواقية من كل شر وعذاب.',
    sampleUrduTranslation: 'سورہ ملک ہر شر اور عذاب سے نجات دینے والی اور بچانے والی سورت ہے۔'
  },
  {
    chapterNumber: 26,
    arabicTitle: 'في قضاء الحوائج ونيل الرغائب في أسرع وقت',
    urduTitle: 'باب بیست و ششم: قضاءِ حوائج، حاجات کی فوری تکمیل اور عقدِ مراد',
    category: 'practical_operations',
    categoryUrdu: 'قضاءِ حوائج',
    coreConceptUrdu: 'ایک دن اور ایک رات میں اہم ترین مقاصد کو پورا کرنے کے جفری نسخے۔',
    keyOperationsCount: 22,
    mainSecretsUrdu: ['دعا السریع الاجابۃ۔', 'نقشِ کن فیکون برائے ناممکن کام۔'],
    sampleArabicText: 'إذا ضاقت بك الحيل فعليك بهذا الباب فإنه ترياق الحاجات.',
    sampleUrduTranslation: 'جب تمام تدبیریں تنگ ہو جائیں تو اس باب کی طرف رجوع کرو کیونکہ یہ حاجات کا تریاق ہے۔'
  },
  {
    chapterNumber: 27,
    arabicTitle: 'في جلب الأرزاق واستخراج الدفائن والكنوز وخبايا الأرض',
    urduTitle: 'باب بیست و ہفتم: جلبِ ارزاق، شقِ ارض، اور زمین سے پوشیدہ خزائن و دفائن کو کھینچنا',
    category: 'dafeen_earth',
    categoryUrdu: 'استخراجِ دفائن و کنوز',
    coreConceptUrdu: 'زمین میں دبے ہوئے سونے، چاندی، تانبے اور آثارِ قدیمہ کو اوپر لانے اور طلسمی پہرے توڑنے کا طریقہ۔',
    keyOperationsCount: 18,
    mainSecretsUrdu: [
      'طلسمِ شق الارض مع آیت: وَأَلْقَتْ مَا فِيهَا وَتَخَلَّتْ۔',
      'کورا پیالہ مٹی پر عدد ۱۱۹۶ کا ترابی نقش اور الٹا رکھنا۔',
      'دفینہ کے سانپوں اور موانع کو ہٹانے کی عزیمت۔'
    ],
    sampleArabicText: 'هذا الباب يخرج الخبيئات من ظلمات الأرض إلى نور النهار بقدرة العزيز الغفار.',
    sampleUrduTranslation: 'یہ باب زمین کی تاریکیوں سے چھپی ہوئی اشیاء کو دن کی روشنی میں نکال لاتا ہے زبردست بخشنے والے رب کی قدرت سے۔'
  },
  {
    chapterNumber: 28,
    arabicTitle: 'في عقد الألسن والوجاهة والقبول بين الناس والملوك',
    urduTitle: 'باب بیست و ہشتم: عقد اللسان (زبان بندی)، رعب و وجاہت اور حاکموں میں تسخیر',
    category: 'aqd_lisan',
    categoryUrdu: 'عقد اللسان و رعب',
    coreConceptUrdu: 'دشمنوں، حاسدوں اور ججوں کی زبانیں باندھنا اور ہر مجلس میں معزز و محترم بننا۔',
    keyOperationsCount: 16,
    mainSecretsUrdu: [
      'صم بکم عمی فہم لا یرجعون کا طلسمِ قفل۔',
      'دشمن کے نام کا تکسیر سے دھاگے میں گرہ لگانا۔'
    ],
    sampleArabicText: 'عقدت لسان كل ناطق بسوء بحق هذا الطلسم الجليل الأثر.',
    sampleUrduTranslation: 'میں نے ہر برائی بولنے والی زبان کو اس جلیل الاثر طلسم کے ذریعے باندھ دیا۔'
  },
  {
    chapterNumber: 29,
    arabicTitle: 'في دفع الشدائد والملمات وقهر الأعداء والظلمة',
    urduTitle: 'باب بیست و نہم: دفعِ شدائد، قہرِ اعداء، ہلاکتِ ظالم اور مظلوم کی دادرسی',
    category: 'dafa_dushman_qahr',
    categoryUrdu: 'قہرِ اعداء و دفعِ ظلم',
    coreConceptUrdu: 'سرکش، ظالم اور فاسق دشمنوں کو تباہ و برباد کرنے کے قاہرانہ و جلالی نقوش۔',
    keyOperationsCount: 20,
    mainSecretsUrdu: [
      'اسمائے قہریہ یا قہار یا جبار یا منتقم کا لوحِ آہن برائے ہلاکت۔',
      'ساعتِ مریخ میں ناری خاک پر سطرِ تفریق۔',
      'تخمِ حنظل بر حروفِ صوامت۔'
    ],
    sampleArabicText: 'ولا تستعمل هذا الباب إلا لمستحق للظلم والعدوان مخافة الإثم والرجعة.',
    sampleUrduTranslation: 'اور اس باب کو صرف اسی پر استعمال کرو جو ظلم و زیادتی کا مستحق ہو تاکہ گناہ اور الٹ وار سے بچے رہو۔'
  },
  {
    chapterNumber: 30,
    arabicTitle: 'في المحبة والمودة والعطف بين المتباغضين والزوجين',
    urduTitle: 'باب سی ام: محبت، الفت، جلبِ قلوب، صلحِ زوجین اور تسخیرِ خاص',
    category: 'mahabbat_tasjeer',
    categoryUrdu: 'محبت و الفت',
    coreConceptUrdu: 'ناراض میاں بیوی میں بیقرار کر دینے والی محبت پیدا کرنا اور قلوب کو اپنی طرف مائل کرنا۔',
    keyOperationsCount: 25,
    mainSecretsUrdu: [
      'آیتِ ودود و حنان و منان کا شمع پر عمل۔',
      'سیب یا میٹھی چیز پر دم کر کے کھلانا۔',
      'نقشِ حبِ صادق بر پوستِ ہرن مع مشک و زعفران۔'
    ],
    sampleArabicText: 'يجلب القلوب ويزرع المحبة الصافية بين الزوجين بغير معصية.',
    sampleUrduTranslation: 'یہ دلوں کو کھینچ لاتا ہے اور میاں بیوی کے درمیان بغیر کسی گناہ کے پاکیزہ محبت بو دیتا ہے۔'
  },
  {
    chapterNumber: 31,
    arabicTitle: 'في تفريق الظالمين وإبطال كيد الساحرين المعتدين',
    urduTitle: 'باب سی و یکم: بدکاروں میں تفریق، اور جادوگروں کے فریب کو باطل کرنا',
    category: 'dafa_dushman_qahr',
    categoryUrdu: 'تفریق و ابطالِ سحر',
    coreConceptUrdu: 'ناجائز تعلقات اور حرام میل ملاپ کو فوری ختم کرنا اور مفسدوں کی ٹولی کو توڑنا۔',
    keyOperationsCount: 15,
    mainSecretsUrdu: ['تفریقِ ظالمین بر پارہ و نمک۔', 'آیت و القینا بینہم العداوۃ و البغضاء۔'],
    sampleArabicText: 'يفرق بين أهل الفساد كما فرق الله بين الحق والباطل.',
    sampleUrduTranslation: 'یہ اہل فساد کے درمیان ایسی جدائی ڈال دیتا ہے جیسے اللہ نے حق اور باطل کے درمیان فرق کیا ہے۔'
  },
  {
    chapterNumber: 32,
    arabicTitle: 'في علاج الصرع والأرياح والمس الشيطاني وإخراج العوارض',
    urduTitle: 'باب سی و دوم: علاجِ صرع (مرگی)، آسیبی ہوائیں، مسِ شیطانی اور جنات کو جلانا',
    category: 'shifa_ibtalsihr',
    categoryUrdu: 'علاجِ آسیب و جنات',
    coreConceptUrdu: 'مریض پر سوار خبیث جن کو حاضر کر کے قید کرنا یا آیاتِ حرق سے جلا کر راکھ کرنا۔',
    keyOperationsCount: 22,
    mainSecretsUrdu: [
      'عزیمتِ احراقِ جنات و شیاطین۔',
      'مریض کے کان میں اذان و آیاتِ صرع۔',
      'پینے اور نہانے کا طلسمِ شفا۔'
    ],
    sampleArabicText: 'يحرق المارد المتمرد ويطهر الجسد من كل ريح خبيثة ومس شيطاني.',
    sampleUrduTranslation: 'یہ سرکش جن کو جلا دیتا ہے اور جسم کو ہر گندی ہوا اور شیطانی اثر سے پاک کر دیتا ہے۔'
  },
  {
    chapterNumber: 33,
    arabicTitle: 'في حل المعقود والمسحور وفك القيود الشيطانية',
    urduTitle: 'باب سی و سوم: بندشِ نکاح، بندشِ رزق اور سحرِ مدفون و ماکول کا کاٹ',
    category: 'shifa_ibtalsihr',
    categoryUrdu: 'حلِ معقود و فکِ سحر',
    coreConceptUrdu: 'ہر قسم کے باندھے ہوئے مرد و عورت کو کھولنا اور پرانے جادو کی گانٹھوں کو توڑنا۔',
    keyOperationsCount: 20,
    mainSecretsUrdu: [
      'سورہ فلق و ناس کے ساتھ تالے پر دم کرنا اور کھولنا۔',
      'زعفران سے لکھ کر غسل کرنے کا لوحِ فکِ سحر۔'
    ],
    sampleArabicText: 'يفك كل عقدة سحرية مهما كانت قديمة أو محكمة الصنع.',
    sampleUrduTranslation: 'یہ ہر سحری گرہ کو کھول دیتا ہے خواہ وہ کتنی ہی پرانی یا مضبوطی سے بنائی گئی ہو۔'
  },
  {
    chapterNumber: 34,
    arabicTitle: 'في الرؤيا الصالحة والكشف المنامي والاستخارة اليقينية',
    urduTitle: 'باب سی و چہارم: خواب میں کشفِ غیب، استخارۂ قطعیہ اور چور و سارق کی شناخت',
    category: 'kashf_asrar',
    categoryUrdu: 'کشف و استخارہ',
    coreConceptUrdu: 'رات کو سوتے وقت سچی رہنمائی حاصل کرنا اور غیب کی خبریں خواب میں دیکھنا۔',
    keyOperationsCount: 14,
    mainSecretsUrdu: ['نقشِ کشفِ منامی زیرِ سرہانہ۔', 'اسم یا علیم یا خبیر کا سوتے وقت ذکر۔'],
    sampleArabicText: 'يرى في منامه ما خفي عنه كأنه يراه في وضح النهار.',
    sampleUrduTranslation: 'وہ اپنے خواب میں چھپی ہوئی چیز اس طرح دیکھ لیتا ہے جیسے دن کی روشنی میں دیکھ رہا ہو۔'
  },
  {
    chapterNumber: 35,
    arabicTitle: 'في طرد الهوام والحشرات والحيوانات المؤذية من البيوت والمزارع',
    urduTitle: 'باب سی و پنجم: سانپ، بچھو، چوہے، کیڑے اور موذی جانوروں کو گھروں اور کھیتوں سے بھگانا',
    category: 'practical_operations',
    categoryUrdu: 'دفعِ موذی جانور',
    coreConceptUrdu: 'گھر کے چاروں کونوں میں دفن کرنے کے طلسمات جن سے زہریلے جانور بھاگ جاتے ہیں۔',
    keyOperationsCount: 10,
    mainSecretsUrdu: ['طلسمِ طردِ ہوام بر پترہ مٹی۔'],
    sampleArabicText: 'تهرب منه الحشرات والهوام ولا تقرب هذا المكان أبداً.',
    sampleUrduTranslation: 'اس سے حشرات اور زہریلے جانور بھاگ جاتے ہیں اور اس جگہ کے قریب کبھی نہیں آتے۔'
  },
  {
    chapterNumber: 36,
    arabicTitle: 'في حفظ المسافر والأموال من اللصوص وقطاع الطرق',
    urduTitle: 'باب سی و ششم: حفاظتِ مسافر، گاڑی، قافلہ اور چوروں و ڈاکوؤں سے امان',
    category: 'practical_operations',
    categoryUrdu: 'حفاظتِ مسافر و اموال',
    coreConceptUrdu: 'سفر کے دوران حادثات اور چوری سے محفوظ رہنے کا فولادی نقش۔',
    keyOperationsCount: 12,
    mainSecretsUrdu: ['آیت فالله خیر حافظا کا لوحِ مسافر۔'],
    sampleArabicText: 'يحفظ المسافر وماله في بر وبحر بإذن الحفيظ العليم.',
    sampleUrduTranslation: 'یہ مسافر اور اس کے مال کو خشکی اور تری میں اللہ حفیظ و علیم کے حکم سے محفوظ رکھتا ہے۔'
  },
  {
    chapterNumber: 37,
    arabicTitle: 'في خاتم الغزالي والمثلث الخالي الوسط وأسراره العجيبة',
    urduTitle: 'باب سی و ہفتم: خاتمِ غزالی، مثلث خالی الوسط، اور اس کے ۷ عجائبات',
    category: 'wafq_talismans',
    categoryUrdu: 'خاتمِ غزالی و خالی الوسط',
    coreConceptUrdu: 'وہ ۳×۳ کا نقش جس کا درمیانی خانہ خالی رکھا جاتا ہے اور اس میں مطلوبہ نام یا مقصد درج ہوتا ہے۔',
    keyOperationsCount: 18,
    mainSecretsUrdu: [
      'مثلث خالی الوسط کی چال اور کسر کا حساب۔',
      'وسط میں اسمِ سائل و مطلوب لکھنا۔'
    ],
    sampleArabicText: 'المثلث الخالي الوسط هو قطب الأوفاق وسر تصريف الخواص.',
    sampleUrduTranslation: 'مثلث خالی الوسط اوفاق کا قطب اور خواص کے تصرف کا سب سے بڑا راز ہے۔'
  },
  {
    chapterNumber: 38,
    arabicTitle: 'في الأسماء التي كتبت على عصا موسى وتاج سليمان عليهما السلام',
    urduTitle: 'باب سی و ہشتم: وہ اسماء جو عصائے موسیٰؑ اور تاجِ سلیمانؑ پر کندہ تھے',
    category: 'divine_names',
    categoryUrdu: 'اسماءِ انبیاء و الواح',
    coreConceptUrdu: 'عصائے موسیٰ کے ۱۲ معجزاتی کلمات اور حضرت سلیمانؑ کے تاج کا نقش برائے تسخیرِ جن و انس۔',
    keyOperationsCount: 14,
    mainSecretsUrdu: [
      'نقشِ عصائے موسیٰ برائے فتحِ ابواب و دریا کا شق ہونا۔',
      'خاتمِ تاجِ سلیمانی برائے مسخرِ خلق۔'
    ],
    sampleArabicText: 'هذه الأسماء التي فلق بها موسى البحر وخضعت بها لسليمان الشياطين والرياح.',
    sampleUrduTranslation: 'یہ وہ اسماء ہیں جن کے ذریعے موسیٰؑ نے سمندر کو چیرا اور سلیمانؑ کے سامنے شیاطین اور ہوائیں مسخر ہوئیں۔'
  },
  {
    chapterNumber: 39,
    arabicTitle: 'في خواص الحروف الصامتة والحروف النورانية وطبائعها',
    urduTitle: 'باب سی و نہم: ۱۳ حروفِ صوامت (بے نقط) اور ۱۴ حروفِ نورانیہ کی طلسماتی تاثیر',
    category: 'letters_abjad',
    categoryUrdu: 'حروفِ صوامت و نورانیہ',
    coreConceptUrdu: 'حروفِ صوامت (ا ح د ر س ص ط ع ک ل م ہ و) سے دشمن کی زبان بندی اور سحر کا خاتمہ۔',
    keyOperationsCount: 16,
    mainSecretsUrdu: [
      'حروفِ صوامت کا طلسمِ سکوت۔',
      'حروفِ نورانیہ کا لوحِ انوار و بصیرت۔'
    ],
    sampleArabicText: 'الصوامت تقطع الألسن وتخرس العدو، والنورانيات تفيض بالبركات والفتوح.',
    sampleUrduTranslation: 'بے نقط حروف زبانوں کو کاٹتے اور دشمن کو گونگا کرتے ہیں، جبکہ نورانی حروف برکتوں اور فتوحات کو بہاتے ہیں۔'
  },
  {
    chapterNumber: 40,
    arabicTitle: 'في جامع الدعوات والختام وشروط العمل والإذن الروحاني التام',
    urduTitle: 'باب چہلم: جامع الدعوات، اختتامی وصایا، اجازتِ عاملیت اور سندِ بونیہ',
    category: 'practical_operations',
    categoryUrdu: 'جامع الدعوات و اذنِ روحانی',
    coreConceptUrdu: 'کتاب کی آخری جامع دعائیں، شکرانہ، زکوٰۃ، اور عملیات میں مستقل اذنِ روحانی حاصل کرنے کا طریقہ۔',
    keyOperationsCount: 20,
    mainSecretsUrdu: [
      'دعائے شمس المعارف الکبریٰ الختامیہ۔',
      'شکرانے کا نفل اور صدقۂ واجبہ۔',
      'علم کی حفاظت اور نااہلوں سے چھپانے کی سخت وصیت۔'
    ],
    sampleArabicText: 'هذا خاتم الكتاب وكنز الأسرار، فاحفظه عن السفهاء والجهال وكن من الشاكرين.',
    sampleUrduTranslation: 'یہ کتاب کا اختتام اور تمام اسرار کا خزانہ ہے، پس اسے بیوقوفوں اور جاہلوں سے چھپائے رکھو اور شکر گزار بندوں میں سے بن جاؤ۔'
  }
];

// ----------------------------------------------------
// 2. THE 28 ANCIENT BIRHATIYAH NAMES (الأسماء البرهتية الكبرى)
// ----------------------------------------------------
export const SHAMS_BIRHATIYAH_NAMES: BirhatiyahName[] = [
  { index: 1, nameArabic: 'بَرْهَتِيةٍ', nameUrdu: 'برہتیہ', meaningUrdu: 'قدوس یا سبوح (پاک اور مقدس ذات)', abjadValue: 662, rulingPlanetUrdu: 'شمس (سورج)', rulingAngelUrdu: 'جبرائیلؑ و روقیائیل', specialPropertiesUrdu: 'تسخیرِ قلوب، وسعتِ رزق، اور ہر عمل کی بنیاد۔', azimatUsageUrdu: 'روزانہ ۶۶۲ بار پڑھنے سے کشفِ قلوب اور تمام ارواح مطیع ہو جاتی ہیں۔' },
  { index: 2, nameArabic: 'كَرِيرٍ', nameUrdu: 'کریر', meaningUrdu: 'یا اللہ کل شئی (اے ہر چیز کے معبود)', abjadValue: 430, rulingPlanetUrdu: 'قمر (چاند)', rulingAngelUrdu: 'جبرائیلؑ', specialPropertiesUrdu: 'دشمن کی زبان بندی، محبتِ مائل، اور بینائی کی تیزی۔', azimatUsageUrdu: 'چاندی کے پترے پر ۴۳۰ عدد کا نقش لکھ کر پاس رکھنے سے ہر شخص محبت کرے گا۔' },
  { index: 3, nameArabic: 'تَتْلِيهٍ', nameUrdu: 'تتلیہ', meaningUrdu: 'القدوس القادر یا سبوح قدوس', abjadValue: 845, rulingPlanetUrdu: 'مریخ', rulingAngelUrdu: 'سمسمائیل', specialPropertiesUrdu: 'قہرِ اعداء، جلبِ رزق، اور تفریقِ اہل فساد۔', azimatUsageUrdu: 'تتلیہ کا ورد کرنے سے دشمنوں کے دلوں پر ہیبت طاری ہو جاتی ہے۔' },
  { index: 4, nameArabic: 'طَوْرَانٍ', nameUrdu: 'طوران', meaningUrdu: 'یا حی یا محیی (اے زندہ اور زندگی بخشنے والے)', abjadValue: 266, rulingPlanetUrdu: 'عطارد', rulingAngelUrdu: 'میکائیلؑ', specialPropertiesUrdu: 'قید و بند سے رہائی، جادو کا مکمل خاتمہ اور امراض سے شفا۔', azimatUsageUrdu: 'مریض پر ۲۶۶ بار دم کرنے سے ہر قسم کی شیطانی بندش ٹوٹ جاتی ہے۔' },
  { index: 5, nameArabic: 'مَزْجَلٍ', nameUrdu: 'مزجل', meaningUrdu: 'یا قیوم یا قائم (اے قائم بالذات)', abjadValue: 80, rulingPlanetUrdu: 'مشتری', rulingAngelUrdu: 'صرفیائیل', specialPropertiesUrdu: 'بانجھ پن کا علاج، اولاد کا حصول اور کشائشِ کاروبار۔', azimatUsageUrdu: 'زعفران سے لکھ کر حاملہ عورت کو پلانے سے حمل محفوظ رہتا ہے۔' },
  { index: 6, nameArabic: 'بَزْجَلٍ', nameUrdu: 'بزجل', meaningUrdu: 'یا ودود یا واحد (اے یکتا اور محبت فرمانے والے)', abjadValue: 42, rulingPlanetUrdu: 'زہرہ', rulingAngelUrdu: 'عنیائیل', specialPropertiesUrdu: 'عشق و محبت، صلحِ زوجین اور دلوں کو گرویدہ بنانا۔', azimatUsageUrdu: 'سرخ ریشم پر لکھ کر چراغ میں جلانے سے مطلوب بے قرار ہو کر حاضر ہوتا ہے۔' },
  { index: 7, nameArabic: 'تَرْقَبٍ', nameUrdu: 'ترقب', meaningUrdu: 'یا سلام یا حلیم (اے سلامتی اور بردباری والے)', abjadValue: 702, rulingPlanetUrdu: 'زحل', rulingAngelUrdu: 'کسفیائیل', specialPropertiesUrdu: 'دولت، حفاظتِ مال، اور چوروں و ڈاکوؤں سے امان۔', azimatUsageUrdu: 'دکان کی چوکھٹ پر لگانے سے تجارت میں دن دگنی ترقی ہوتی ہے۔' },
  { index: 8, nameArabic: 'بَرْهَشٍ', nameUrdu: 'برہش', meaningUrdu: 'یا مقتدر یا قوی (اے غالب اور زبردست قوت والے)', abjadValue: 507, rulingPlanetUrdu: 'شمس', rulingAngelUrdu: 'روقیائیل', specialPropertiesUrdu: 'دردِ سر، شقیقہ اور امراضِ جسمانی سے نجات۔', azimatUsageUrdu: 'مریض کی پیشانی پر ہاتھ رکھ کر ۱۱ بار پڑھنے سے سر کا درد فوراً غائب ہو جاتا ہے۔' },
  { index: 9, nameArabic: 'غَلْمَشٍ', nameUrdu: 'غلمش', meaningUrdu: 'یا حمید یا مجید (اے تعریف کے لائق اور بزرگی والے)', abjadValue: 1370, rulingPlanetUrdu: 'قمر', rulingAngelUrdu: 'جبرائیلؑ', specialPropertiesUrdu: 'جنات کو بھگانا، آسیب زدہ مکان کی صفائی۔', azimatUsageUrdu: 'مکان کے چاروں کونوں پر غلمش لکھ کر چھڑکنے سے جنات و شیاطین فرار ہو جاتے ہیں۔' },
  { index: 10, nameArabic: 'خُوطِيرٍ', nameUrdu: 'خوطیر', meaningUrdu: 'یا قوی یا متین (اے پختہ اور توانا ذات)', abjadValue: 825, rulingPlanetUrdu: 'مریخ', rulingAngelUrdu: 'سمسمائیل', specialPropertiesUrdu: 'دشمن پر ہیبت، ہلاکتِ ظالم اور میدانِ جنگ میں فتح۔', azimatUsageUrdu: 'آہنی پترے پر کندہ کر کے بازو پر باندھنے سے کوئی مغلوب نہیں کر سکتا۔' },
  { index: 11, nameArabic: 'خُوطِيرٍ (خنتير)', nameUrdu: 'خنتیر', meaningUrdu: 'یا علیم یا خبیر (اے سب کچھ جاننے والے)', abjadValue: 1260, rulingPlanetUrdu: 'عطارد', rulingAngelUrdu: 'میکائیلؑ', specialPropertiesUrdu: 'استخارہ، خواب میں غیبی رہنمائی اور حکمت کا نزول۔', azimatUsageUrdu: 'رات کو سوتے وقت ۷۰ بار پڑھ کر سونے سے مطلوبہ بات خواب میں عیاں ہوتی ہے۔' },
  { index: 12, nameArabic: 'بَرْهَيُولا', nameUrdu: 'برہیولا', meaningUrdu: 'سبحان اللہ یا کافِی (پاک ہے اللہ اور وہ کافی ہے)', abjadValue: 254, rulingPlanetUrdu: 'مشتری', rulingAngelUrdu: 'صرفیائیل', specialPropertiesUrdu: 'کشفِ باطن، روحانی آنکھ کھلنا اور قلوب کے خیالات جاننا۔', azimatUsageUrdu: 'خلوت میں روزانہ ۵۰۰ بار پڑھنے سے باطنی نور عطا ہوتا ہے۔' },
  { index: 13, nameArabic: 'بَشْكَيْلَخٍ', nameUrdu: 'بشکیلخ', meaningUrdu: 'یا رحمن یا رحیم (اے نہایت رحم فرمانے والے)', abjadValue: 962, rulingPlanetUrdu: 'زہرہ', rulingAngelUrdu: 'عنیائیل', specialPropertiesUrdu: 'غم و اندوہ سے نجات اور سخت ترین مشکل کا حل۔', azimatUsageUrdu: 'پریشانی کے وقت بشکیلخ کا ورد کرنے سے سکینت قلب پر نازل ہوتی ہے۔' },
  { index: 14, nameArabic: 'قَزْمَزٍ', nameUrdu: 'قزمز', meaningUrdu: 'یا مہیمن یا حسیب (اے نگہبان اور حساب لینے والے)', abjadValue: 154, rulingPlanetUrdu: 'زحل', rulingAngelUrdu: 'کسفیائیل', specialPropertiesUrdu: 'خزانہ و دفائن کا انکشاف اور زیرِ زمین دولت کو کھینچنا۔', azimatUsageUrdu: 'دفینہ کے مقام پر پڑھنے سے موانع و طلسمات باطل ہو جاتے ہیں۔' },
  { index: 15, nameArabic: 'أَنْغَلَلِيطٍ', nameUrdu: 'انغللیط', meaningUrdu: 'یا عظیم یا حکیم (اے بزرگی والے اور حکمت والے)', abjadValue: 1180, rulingPlanetUrdu: 'شمس', rulingAngelUrdu: 'روقیائیل', specialPropertiesUrdu: 'آگ بجھانا، غصہ ٹھنڈا کرنا اور ظالم کے قہر سے امان۔', azimatUsageUrdu: 'غصہ ور حاکم کے سامنے جاتے وقت ۷ بار پڑھ کر دم کریں۔' },
  { index: 16, nameArabic: 'قَبَرَاتٍ', nameUrdu: 'قبرات', meaningUrdu: 'یا عزیز یا منتقم (اے غالب اور بدلہ لینے والے)', abjadValue: 703, rulingPlanetUrdu: 'مریخ', rulingAngelUrdu: 'سمسمائیل', specialPropertiesUrdu: 'وبائی امراض کا خاتمہ اور حاسدوں کی شر انگیزی سے نجات۔', azimatUsageUrdu: 'پانی پر دم کر کے گھر میں چھڑکیں، ہر قسم کی نحوست دور ہوگی۔' },
  { index: 17, nameArabic: 'غَياهَا', nameUrdu: 'غیاہا', meaningUrdu: 'یا کریم یا قاضی الحاجات (اے کرم والے اور حاجات روا کرنے والے)', abjadValue: 1017, rulingPlanetUrdu: 'قمر', rulingAngelUrdu: 'جبرائیلؑ', specialPropertiesUrdu: 'قرض کی ادائیگی اور غیب سے روزی کا انتظام۔', azimatUsageUrdu: 'ہر نماز کے بعد ۱۰۱ بار پڑھنے سے غیبی ذرائع سے قرض ادا ہوتا ہے۔' },
  { index: 18, nameArabic: 'كَيْدَهُولا', nameUrdu: 'کیدہولا', meaningUrdu: 'القادر ہو اللہ (اللہ ہی سب پر قدرت رکھنے والا ہے)', abjadValue: 105, rulingPlanetUrdu: 'عطارد', rulingAngelUrdu: 'میکائیلؑ', specialPropertiesUrdu: 'سحر و کالا جادو توڑنا اور مفسدوں کی چالیں الٹنا۔', azimatUsageUrdu: 'کیدھولا کے نقش کو پانی میں گھول کر پینے سے کالا جادو فوراً کٹ جاتا ہے۔' },
  { index: 19, nameArabic: 'شَمْخَاهِرٍ', nameUrdu: 'شمخاہر', meaningUrdu: 'تعالیت یا علی یا عظیم (تو بلند و برتر ہے اے بزرگی والے)', abjadValue: 1146, rulingPlanetUrdu: 'مشتری', rulingAngelUrdu: 'صرفیائیل', specialPropertiesUrdu: 'موذی جانوروں (سانپ، بچھو) کو بھگانا اور ان کے زہر سے حفاظت۔', azimatUsageUrdu: 'گھر کے دروازے پر لکھنے سے زہریلا جانور اندر داخل نہیں ہوتا۔' },
  { index: 20, nameArabic: 'شَمْخَاهِيرٍ', nameUrdu: 'شمخاہیر', meaningUrdu: 'یا قدوس یا برہان (اے پاک اور روشن دلیل والے)', abjadValue: 1156, rulingPlanetUrdu: 'زہرہ', rulingAngelUrdu: 'عنیائیل', specialPropertiesUrdu: 'چور اور بھاگے ہوئے شخص کو واپس لانا۔', azimatUsageUrdu: 'دھاگے میں ۲۱ گرہیں لگا کر شمخاہیر پڑھیں، مفرور بے قرار ہو کر لوٹ آئے گا۔' },
  { index: 21, nameArabic: 'شَمْهَاهِيرٍ', nameUrdu: 'شمھاہیر', meaningUrdu: 'یا عزیز یا جبار (اے غالب اور زبردست)', abjadValue: 561, rulingPlanetUrdu: 'زحل', rulingAngelUrdu: 'کسفیائیل', specialPropertiesUrdu: 'دشمن کو ذلیل کرنا اور ظالم کے شر سے خود کو بچانا۔', azimatUsageUrdu: 'شمعِ سیاہ پر لکھ کر جلانے سے ظالم مغلوب ہوتا ہے۔' },
  { index: 22, nameArabic: 'بَكَهْطَهُونِيَّةٍ', nameUrdu: 'بکہطہونیہ', meaningUrdu: 'یا دائم یا فرد (اے ہمیشہ رہنے والے یکتا)', abjadValue: 112, rulingPlanetUrdu: 'شمس', rulingAngelUrdu: 'روقیائیل', specialPropertiesUrdu: 'فاقہ اور تنگیِ معاش کا ازالہ، بے پناہ رزق۔', azimatUsageUrdu: 'صبح کی نماز کے بعد ۱۱۴ بار پڑھنے سے کبھی فاقہ نہیں ہوتا۔' },
  { index: 23, nameArabic: 'بَشَارِشٍ', nameUrdu: 'بشارش', meaningUrdu: 'یا قادر علی کل شئی (اے ہر چیز پر قدرت رکھنے والے)', abjadValue: 803, rulingPlanetUrdu: 'قمر', rulingAngelUrdu: 'جبرائیلؑ', specialPropertiesUrdu: 'پیاس کی شدت ختم کرنا اور دریا پار کرنے میں آسانی۔', azimatUsageUrdu: 'سفر پر جاتے وقت اپنے پاس رکھنے سے سفر میں آسانی ہوتی ہے۔' },
  { index: 24, nameArabic: 'طُونَشٍ', nameUrdu: 'طونش', meaningUrdu: 'یا شکور یا بصیر (اے قدردان اور خوب دیکھنے والے)', abjadValue: 365, rulingPlanetUrdu: 'مریخ', rulingAngelUrdu: 'سمسمائیل', specialPropertiesUrdu: 'بچوں کے رونے اور ڈرنے کا علاج (ام الصبیان)۔', azimatUsageUrdu: 'بچے کے گلے میں تعویذ بنا کر ڈالنے سے بچہ پرسکون نیند سوتا ہے۔' },
  { index: 25, nameArabic: 'شَمْخَابَارُوخٍ', nameUrdu: 'شمخاباروخ', meaningUrdu: 'سبحان القائم الدائم (پاک ہے وہ جو ہمیشہ قائم ہے)', abjadValue: 1750, rulingPlanetUrdu: 'عطارد', rulingAngelUrdu: 'میکائیلؑ', specialPropertiesUrdu: 'قید سے رہائی اور عدالت میں بریت۔', azimatUsageUrdu: 'عدالت جانے سے قبل شمخاباروخ کا ورد کرنے سے جج مہربان ہو جاتا ہے۔' }
];

// ----------------------------------------------------
// 3. KEY OPERATIONAL RITUALS (عملیات و نقوشِ شمس المعارف)
// ----------------------------------------------------
export const SHAMS_KEY_OPERATIONS: ShamsOperation[] = [
  {
    id: 'shams-op-shaq-al-ard',
    titleArabic: 'طلسم شق الأرض واستخراج الكنوز والدفائن فی الحین',
    titleUrdu: 'طلسمِ شق الارض و جذبِ دفائن از باطنِ زمین (شمس المعارف الکبریٰ)',
    chapterNumber: 27,
    chapterNameUrdu: 'باب بیست و ہفتم: استخراجِ دفائن و کنوز',
    category: 'dafeen_earth',
    categoryUrdu: 'استخراجِ دفائن و کنوز',
    element: 'earth',
    elementUrdu: 'خاکی و ترابی',
    suitableDay: 'جمعرات یا شبِ جمعہ',
    suitableSaat: 'ساعتِ مشتری یا نصف شب بوقتِ شرف',
    incenseUrdu: 'لوبانِ ذکر، سندروس، کافور، جاوا',
    inkAndMedium: 'زعفران و مشک بر کورا مٹی کا پیالہ یا پترہ تانبہ',
    directionUrdu: 'قبلہ رخ روبہ موضعِ دفینہ',
    defaultAdad: 1196,
    defaultText: 'وَأَلْقَتْ مَا فِيهَا وَتَخَلَّتْ یا باسط یا فتاح یا مخرج الکنز',
    arabicWafqOrTalismanText: 'ط ش ق ۱۱۹۶ اخرج الکنز والجوہر بحق فتاح ۱ ۱ ۱ هـ هـ هـ ۹ ۹ ۹',
    urduTranslation: 'زمین اپنے اندر چھپا ہوا بوجھ اگل دے اور اللہ باسط و فتاح کے حکم سے خالی ہو جائے۔',
    methodologySteps: [
      '۱. مشتبہ یا معین مقامِ دفینہ پر چاروں کونوں پر ۴ آہنی میخیں گاڑ کر آیت الکرسی کا فولادی مندل بنائیں۔',
      '۲. کورا مٹی کے پیالے یا تانبے کی تختی پر عدد ۱۱۹۶ کا ترابی مربع نقش زعفران و عرق گلاب سے لکھیں۔',
      '۳. نقش کے وسط میں آیت "وَأَلْقَتْ مَا فِيهَا وَتَخَلَّتْ" اور چاروں اطراف اسماء "یا ظاہر یا باطن یا فتاح یا مخرج" لکھیں۔',
      '۴. پیالے کو زمین پر الٹا رکھیں اور لوبان و سندروس کی دھونی دیتے ہوئے عزیمتِ شق الارض ۳۱۳ بار یا ضربِ واحد سے تلاوت کریں۔',
      '۵. زمین میں ارتعاش پیدا ہوگا اور مدفون خزانہ کھنچ کر سطح پر نمودار ہو جائے گا۔'
    ],
    azimatArabic: 'بِسْمِ اللَّهِ الَّذِي شَقَّ الْأَرْضَ بِقُدْرَتِهِ، وَأَخْرَجَ أَثْقَالَهَا بِإِرَادَتِهِ، يَا مَعْشَرَ الْأَرْوَاحِ الْأَرْضِيَّةِ وَالْمُوَكِّلِينَ بِهَذَا الدَّفِينِ، أَخْرِجُوا مَا تَحْتَ أَقْدَامِكُمْ بِحَقِّ: وَأَلْقَتْ مَا فِيهَا وَتَخَلَّتْ وَأَذِنَتْ لِرَبِّهَا وَحُقَّتْ، السَّاعَةَ السَّاعَةَ الْعَجَلَ الْعَجَلَ.',
    azimatUrdu: 'اس اللہ کے نام سے جس نے اپنی قدرت سے زمین کو چیرا اور اپنے ارادے سے اس کے بوجھ باہر نکالے، اے زمینی ارواح اور اس دفینے کے موکلین! جو کچھ تمہارے قدموں کے نیچے ہے اسے زمین کے اوپر نکال لاؤ بحق سورہ انشقاق، ابھی اسی گھڑی جلدی کرو۔',
    chillaConditions: [
      'حاصل شدہ مال میں سے شرعی ۲۰ فیصد (خمس) فقراء میں تقسیم کرنے کا پختہ عہد۔',
      'عمل کے دوران پیچھے مڑ کر یا خوفزدہ ہو کر مندل سے باہر نہ نکلنا۔'
    ],
    spiritualProtection: 'سینے پر لوحِ خاتم سلیمانی اور زبان پر "یا حفیظ یا سلام" کا مسلسل ورد۔',
    secretNotesUrdu: 'قدیم دفائن پر اکثر ارواح و ناگ مسلط ہوتے ہیں، یہ عمل ان کے طلسم کو فوراً توڑ دیتا ہے۔',
    isSecretOrRare: true,
    wafqType: 'مربع ترابی (۴×۴)'
  },
  {
    id: 'shams-op-kandiyas-kursi',
    titleArabic: 'دعوة السيد كندياس خادم آية الكرسي لقضاء الحوائج',
    titleUrdu: 'دعوت و تسخیرِ السید کندیاس خادمِ معظم آیت الکرسی (شمس المعارف)',
    chapterNumber: 18,
    chapterNameUrdu: 'باب ہژدہم: آیت الکرسی و خدام',
    category: 'invocations_azimat',
    categoryUrdu: 'دعوت و عزیمتِ آیت الکرسی',
    element: 'fire',
    elementUrdu: 'ناری و علوی',
    suitableDay: 'جمعرات یا شبِ جمعہ',
    suitableSaat: 'ساعتِ مشتری یا نصف شب',
    incenseUrdu: 'عود قماری، لوبانِ نر، جاوا، عنبر',
    inkAndMedium: 'زعفران و مشک بر رقعہ سفید',
    directionUrdu: 'قبلہ رخ',
    defaultAdad: 313,
    defaultText: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
    arabicWafqOrTalismanText: 'أجب يا كندياس بحق لا إله إلا هو الحي القيوم وبحق طه ويا سين',
    urduTranslation: 'اے سید کندیاس! اللہ کے اس اسمِ حی و قیوم کے واسطے سے میری پکار پر لبیک کہو۔',
    methodologySteps: [
      '۱. باوضو، پاک لباس اور خوشبو لگا کر قبلہ رخ تنہائی میں بیٹھیں۔',
      '۲. آیت الکرسی کو ۳۱۳ بار تلاوت کریں، ہر ۱۰۰ بار کے بعد ایک مرتبہ قسمِ سید کندیاس پڑھیں۔',
      '۳. عمل کے دوران کمرے میں عود و لوبان کا بخور روشن رکھیں۔',
      '۴. تیسرے دن یا عمل کے اختتام پر روحانی سکینت اور نورانی اشارہ ملے گا اور حاجت غیب سے پوری ہوگی۔'
    ],
    azimatArabic: 'أَقْسَمْتُ عَلَيْكَ أَيُّهَا السَّيِّدُ كَنْدِيَاسُ، أَجِبْ بِحَقِّ اللَّهِ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ، وَبِحَقِّ مَنْ خَلَقَكَ وَسَوَّاكَ، أَنْ تُعِينَنِي عَلَى قَضَاءِ حَاجَتِي هَذِهِ بِحَقِّ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ، بَارَكَ اللَّهُ فِيكَ وَعَلَيْكَ.',
    azimatUrdu: 'میں تجھ پر قسم دیتا ہوں اے سید کندیاس! اللہ کے اسم حی و قیوم کے واسطے سے حاضر ہو جا اور جس نے تجھے پیدا کیا اس کے حق کے صدقے میری اس حاجت کے پورا کرنے میں میری مدد کر، اللہ تجھ پر برکت نازل فرمائے۔',
    chillaConditions: ['نمازِ پنجگانہ کی پابندی، جھوٹ اور لایعنی باتوں سے مکمل پرہیز۔'],
    spiritualProtection: 'آیت الکرسی کا ۷ بار پڑھ کر اپنے اوپر اور چاروں طرف دم کرنا۔',
    secretNotesUrdu: 'سید کندیاس ملائکہ مقربین کے ماتحت سب سے شریف اور طاقتور موکل ہیں جو صرف خیر کے کاموں میں مدد کرتے ہیں۔',
    isSecretOrRare: true,
    wafqType: 'مربع ناری (۴×۴)'
  },
  {
    id: 'shams-op-khatam-ghazali-khali',
    titleArabic: 'سر خاتم الغزالي المثلث الخالي الوسط لكل حاجة',
    titleUrdu: 'خاتمِ غزالی و مثلث خالی الوسط برائے تسخیر، عقدِ مراد و غلبہ (شمس المعارف)',
    chapterNumber: 37,
    chapterNameUrdu: 'باب سی و ہفتم: خاتمِ غزالی و خالی الوسط',
    category: 'wafq_talismans',
    categoryUrdu: 'مثلث خالی الوسط',
    element: 'air',
    elementUrdu: 'ہوائی و جمالی',
    suitableDay: 'جمعہ یا جمعرات',
    suitableSaat: 'ساعتِ زہرہ یا مشتری',
    incenseUrdu: 'صندل سفید، مستکی، عود',
    inkAndMedium: 'زعفران، عرق گلاب و مشک بر کاغذ زریں',
    directionUrdu: 'مشرق / قبلہ رخ',
    defaultAdad: 786,
    defaultText: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
    arabicWafqOrTalismanText: 'ب ط د ز هـ ج و ا ح - والقلب خالٍ للاسم والمطلوب',
    urduTranslation: 'بطد زہج واح کا مقدس دائرہ اور درمیان میں سائل و مطلوب کا نام۔',
    methodologySteps: [
      '۱. مطلوبہ مقصد یا اسمائے الٰہیہ کے اعداد نکالیں۔',
      '۲. ۳×۳ کا جدول بنائیں، لیکن اس کا درمیانی ۵واں خانہ بالکل خالی چھوڑ دیں۔',
      '۳. باقی آٹھ خانوں کو مخصوص قاعدہ بطد زہج واح کے مطابق پُر کریں۔',
      '۴. درمیانی خالی خانے میں سائل کا نام اور مطلوبہ مقصد یا اسمِ الٰہی تحریر کریں۔',
      '۵. بخور دے کر تعویذ کو بازو پر باندھیں یا گلے میں پہنیں۔'
    ],
    azimatArabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ بِسِرِّ هَذَا الْوَفْقِ الْمُبَارَكِ وَبِمَا حَوَاهُ مِنْ سِرِّ الْخَلْوَةِ وَالْوَسَطِ أَنْ تُسَخِّرَ لِي فُلَانَ بْنَ فُلَانَةَ أَوْ تَقْضِيَ حَاجَتِي كَذَا وَكَذَا.',
    azimatUrdu: 'اے اللہ! میں تجھ سے اس مبارک وفق کے راز اور اس کے درمیانی خالی خانے کے باطنی سر کے صدقے مانگتا ہوں کہ میری فلاں حاجت پوری فرما دے یا فلاں کے دل کو میرے لیے مسخر فرما دے۔',
    chillaConditions: ['پاکیزگی اور خلوصِ نیت۔'],
    spiritualProtection: 'حصارِ چار قل۔',
    secretNotesUrdu: 'خالی الوسط نقش کی خاصیت یہ ہے کہ اس میں رکھی جانے والی ہر حاجت پر کائنات کے تمام اطراف سے روحانی قوتیں متوجہ ہو جاتی ہیں۔',
    isSecretOrRare: false,
    wafqType: 'مثلث خالی الوسط (۳×۳)'
  },
  {
    id: 'shams-op-sawaqit-fatiha-full',
    titleArabic: 'تصريف سواقط الفاتحة السبعة لقهر الظالمين وجلب المنافع',
    titleUrdu: 'طلسمِ سواقطِ فاتحہ سبعہ (ف ج ش ث ظ خ ز) و ملوکِ سبعہ (شمس المعارف)',
    chapterNumber: 13,
    chapterNameUrdu: 'باب سیزدہم: سواقطِ فاتحہ',
    category: 'sawaqit_fatiha',
    categoryUrdu: 'سواقطِ فاتحہ کے اوفاق',
    element: 'fire',
    elementUrdu: 'مرکب از عناصرِ سبعہ',
    suitableDay: 'ہفتے کے تمام ایام (حسب الحرف)',
    suitableSaat: 'ساعتِ سیارہ متعلقہ',
    incenseUrdu: 'لوبان، عنبر، صندل، مصطگی، حلتیک (حسب الحرف)',
    inkAndMedium: 'زعفران و مشک یا سیاہی طلسم بر پترہ سیارہ',
    directionUrdu: 'حسبِ جہتِ کواکب',
    defaultAdad: 2439,
    defaultText: 'فَرْدٌ جَبَّارٌ شَكُورٌ ثَابِتٌ ظَهِيرٌ خَبِيرٌ زَكِيٌّ',
    arabicWafqOrTalismanText: 'ف ج ش ث ظ خ ز - أسماء الملوك السبعة والروحانية العلوية',
    urduTranslation: 'سات الٰہی صفات اور سات کائناتی ملوک کے ذریعے ہر مہم کی فتح۔',
    methodologySteps: [
      '۱. جس مقصد کا ارادہ ہو اس کا متعلقہ حرفِ ساقط منتخب کریں (مثلاً غلبہ کے لیے ف، محبت کے لیے ج، قہر کے لیے ش، ثبات کے لیے ث، رعب کے لیے ظ، علم کے لیے خ، پاکیزگی کے لیے ز)۔',
      '۲. اس حرف کے مطابق ۷×۷ کا مسبع یا متعلقہ وفق تیار کریں۔',
      '۳. موکلِ علوی و سفلی کا نام نقش کے گرد لکھ کر بخور دیں۔',
      '۴. متعلقہ اسمِ الٰہی کو اس کے اعداد کے مطابق ورد کریں۔'
    ],
    azimatArabic: 'بِحَقِّ فَرْدٍ جَبَّارٍ شَكُورٍ ثَابِتٍ ظَهِيرٍ خَبِيرٍ زَكِيٍّ، وَبِحَقِّ مَلَائِكَةِ السَّمَاوَاتِ السَّبْعِ وَمُلُوكِ الْأَرْضِ السَّبْعَةِ، أَجِيبُوا وَافْعَلُوا كَذَا وَكَذَا.',
    azimatUrdu: 'فرد، جبار، شکور، ثابت، ظہیر، خبیر، زکی کے واسطے سے، اور ساتوں آسمانوں کے فرشتوں اور ساتوں زمینی ملوک کے حق سے، حاضر ہو جاؤ اور میرا یہ کام انجام دو۔',
    chillaConditions: ['ہر حرف کا مخصوص دن اور ساعت ملحوظ رکھنا۔'],
    spiritualProtection: 'آیت الکرسی کا حصار۔',
    secretNotesUrdu: 'سواقط فاتحہ بونی کے نزدیک تمام روحانی طلسمات کی کنجی ہیں جن سے ساتوں دن اور سیارے قابو میں آتے ہیں۔',
    isSecretOrRare: true,
    wafqType: 'مسبع سباعی (۷×۷)'
  },
  {
    id: 'shams-op-ibtal-sihr-daryan',
    titleArabic: 'وفق الإبطال العظيم وفك كل سحر معقود ودفين',
    titleUrdu: 'لوحِ ابطالِ اعظم و فکِ سحرِ مدفون و ماکول و مشروب (شمس المعارف)',
    chapterNumber: 33,
    chapterNameUrdu: 'باب سی و سوم: حلِ معقود و فکِ سحر',
    category: 'shifa_ibtalsihr',
    categoryUrdu: 'ابطالِ سحر و فکِ طلسمات',
    element: 'water',
    elementUrdu: 'آبی و نوری',
    suitableDay: 'پیر یا بدھ بوقتِ طلوعِ شمس',
    suitableSaat: 'ساعتِ قمر یا عطارد',
    incenseUrdu: 'حرمل (اسپند)، لوبان، کلونجی، نمکِ بحری',
    inkAndMedium: 'زعفران و عرق گلاب بر چینی کی پلیٹ یا کاغذ',
    directionUrdu: 'مشرق / قبلہ رخ',
    defaultAdad: 1394,
    defaultText: 'قَالَ مُوسَىٰ مَا جِئْتُم بِهِ السِّحْرُ إِنَّ اللَّهَ سَيُبْطِلُهُ',
    arabicWafqOrTalismanText: 'بطل السحر بحق قال موسى ما جئتم به السحر إن الله سيبطله',
    urduTranslation: 'موسیٰؑ نے فرمایا جو کچھ تم لائے ہو جادو ہے، بے شک اللہ اسے ابھی باطل کر دے گا۔',
    methodologySteps: [
      '۱. چینی کے پاک برتن پر زعفران و عرق گلاب سے یہ آیت اور عدد ۱۳۹۴ کا مربع نقش لکھیں۔',
      '۲. نقش کے گرد معوذتین (سورہ فلق و ناس) دائرے کی شکل میں تحریر کریں۔',
      '۳. پانی سے دھو کر سحر زدہ مریض کو ۷ دن تک پلائیں اور اس پانی سے نہلائیں۔',
      '۴. گھر کے چاروں کونوں پر یہی پانی چھڑکیں اور حرمل و لوبان کی دھونی دیں۔'
    ],
    azimatArabic: 'وَأَوْحَيْنَا إِلَىٰ مُوسَىٰ أَنْ أَلْقِ عَصَاكَ ۖ فَإِذَا هِيَ تَلْقَفُ مَا يَأْفِكُونَ، فَوَقَعَ الْحَقُّ وَبَطَلَ مَا كَانُوا يَعْمَلُونَ، فغُلِبُوا هُنَالِكَ وَانقَلَبُوا صَاغِرِينَ.',
    azimatUrdu: 'اور ہم نے موسیٰؑ کی طرف وحی کی کہ اپنا عصا ڈال دیجیے، پس اچانک وہ ان کے جھوٹے فریب کو نگلنے لگا، پس حق ثابت ہو گیا اور جو کچھ وہ کر رہے تھے سب باطل ہو گیا، پس وہ وہیں مغلوب ہو گئے اور ذلیل ہو کر پلٹے۔',
    chillaConditions: ['غسل کے پانی کو نالی یا ناپاک جگہ میں گرنے نہ دیں بلکہ مٹی یا پودوں میں ڈالیں۔'],
    spiritualProtection: 'گھر میں سورہ بقرہ کی باقاعدہ تلاوت۔',
    secretNotesUrdu: 'کتنا ہی پرانا سحر، دفن شدہ تعویذ یا قبرستان میں دبایا گیا کالا جادو ہو، اس عمل سے فوراً جل کر راکھ ہو جاتا ہے۔',
    isSecretOrRare: false,
    wafqType: 'مربع مائی (۴×۴)'
  },
  {
    id: 'shams-op-jaljalutiah-bayt-1',
    titleArabic: 'سر البيت الأول من الجلجلوتية الكبرى لافتتاح المغلقات',
    titleUrdu: 'بیتِ اول جلجلوتیہ (بدأت ببسم الله روحي به اهتدت) برائے کشائشِ امور (شمس المعارف)',
    chapterNumber: 23,
    chapterNameUrdu: 'باب بیست و سوم: قصیدہ جلجلوتیہ کبریٰ',
    category: 'jaljalutiyah',
    categoryUrdu: 'جلجلوتیہ کبریٰ',
    element: 'fire',
    elementUrdu: 'نوری و ناری',
    suitableDay: 'اتوار بوقتِ صبح صادق',
    suitableSaat: 'ساعتِ شمس',
    incenseUrdu: 'عود، لوبان، صندل سرخ',
    inkAndMedium: 'زعفران بر رقعہ سفید',
    directionUrdu: 'مشرق / قبلہ رخ',
    defaultAdad: 1422,
    defaultText: 'بَدَأْتُ بِبِسْمِ اللَّهِ رُوحِي بِهِ اهْتَدَتْ إِلَى كَشْفِ أَسْرَارٍ بِبَاطِنِهِ انْطَوَتْ',
    arabicWafqOrTalismanText: 'يا حي يا قيوم يا بديع السموات والارض اهتدت روحي بنورك',
    urduTranslation: 'میں نے اللہ کے نام سے آغاز کیا جس سے میری روح نے ان چھپے ہوئے اسرار کے کشف کی طرف رہنمائی پائی جو اس کے باطن میں سموئے ہوئے تھے۔',
    methodologySteps: [
      '۱. اتوار کے دن طلوعِ آفتاب کے وقت وضو کر کے بیٹھیں اور یہ بیت ۷۰ بار تلاوت کریں۔',
      '۲. اس کا مثلث نقش زعفران سے لکھ کر اپنے سر کے عمامے یا ٹوپی میں رکھیں۔',
      '۳. باطنی بصیرت، ذہانت، اور ہر بند راستے کے کھلنے کا مشاہدہ کریں۔'
    ],
    azimatArabic: 'اللَّهُمَّ بِحَقِّ هَذَا الْبَيْتِ الشَّرِيفِ وَمَا فِيهِ مِنَ الِاهْتِدَاءِ وَالْأَنْوَارِ، افْتَحْ لِي أَبْوَابَ الْفَهْمِ وَالْحِكْمَةِ وَسَخِّرْ لِي أَرْوَاحَ الْعُلُومِ.',
    azimatUrdu: 'اے اللہ! اس پاک شعر کے حق سے اور اس میں موجود رہنمائی اور انوار کے صدقے، مجھ پر فہم و حکمت کے دروازے کھول دے اور علوم کی ارواح کو میرے لیے مسخر فرما دے۔',
    chillaConditions: ['ہر نماز کے بعد اس بیت کو ۷ بار پڑھنا۔'],
    spiritualProtection: 'آیت الکرسی کا حصار۔',
    secretNotesUrdu: 'جلجلوتیہ کا یہ پہلا شعر تمام علومِ باطنیہ کا دروازہ ہے۔',
    isSecretOrRare: false,
    wafqType: 'مثلث ناری (۳×۳)'
  },
  {
    id: 'shams-op-kashf-manami-al-buni',
    titleArabic: 'الكشف المنامي اليقيني ورؤية الغائبات في ليلة واحدة',
    titleUrdu: 'کشفِ منامیِ قطعی و رویتِ غائبات در خواب فی لیلۃ واحدۃ (شمس المعارف)',
    chapterNumber: 34,
    chapterNameUrdu: 'باب سی و چہارم: کشفِ منامی و استخارہ',
    category: 'kashf_asrar',
    categoryUrdu: 'کشفِ منامی و استخارہ',
    element: 'air',
    elementUrdu: 'ہوائی و روحی',
    suitableDay: 'شبِ جمعرات یا شبِ جمعہ',
    suitableSaat: 'بوقتِ خواب (نصف شب)',
    incenseUrdu: 'عود قماری، کافور، مصطگی',
    inkAndMedium: 'زعفران و عرق گلاب بر ہتھیلی یا کاغذ سفید',
    directionUrdu: 'قبلہ رخ روبہ دائیں کروٹ',
    defaultAdad: 924,
    defaultText: 'أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ اللَّطِيفُ الْخَبِيرُ یا علیم یا خبیر یا مبین',
    arabicWafqOrTalismanText: 'ک ش ف ۹۲۴ ارنی فی منامی ما ہو خیر بحق لطیف خبیر',
    urduTranslation: 'کیا وہ نہیں جانے گا جس نے پیدا کیا جبکہ وہ نہایت باریک بین اور باخبر ہے؟ اے علیم و خبیر خواب میں مجھے دکھا دے۔',
    methodologySteps: [
      '۱. رات کو باوضو ہو کر بستر پر بیٹھیں اور اپنے دائیں ہاتھ کی ہتھیلی پر یا سفید کاغذ پر یہ طلسم لکھیں۔',
      '۲. سورہ والشمس، واللیل، والتین اور الاخلاص ایک ایک بار پڑھیں۔',
      '۳. پھر اسم "یا علیم یا خبیر یا مبین" کا ورد ۱۰۰ بار کریں اور یہ دعا پڑھیں۔',
      '۴. کسی سے بات کیے بغیر دائیں کروٹ قبلہ رخ ہو کر ہتھیلی یا کاغذ کو رخسار کے نیچے رکھ کر سو جائیں۔',
      '۵. خواب میں فرشتہ یا بزرگ آ کر مطلوبہ حقیقت، چور کا پتہ یا مستقبل کی خبر بالکل واضح بتا دے گا۔'
    ],
    azimatArabic: 'اللَّهُمَّ يَا عَالِمَ السِّرِّ وَالْخَفِيَّاتِ، أَرِنِي فِي مَنَامِي اللَّيْلَةَ حَقِيقَةَ كَذَا وَكَذَا بَيَانًا لَا لَبْسَ فِيهِ، بِحَقِّ اسْمِكَ اللَّطِيفِ الْخَبِيرِ.',
    azimatUrdu: 'اے پوشیدہ باتوں اور رازوں کو جاننے والے اللہ! مجھے آج رات خواب میں فلاں بات کی ایسی حقیقت دکھا دے جس میں کوئی شک و شبہ نہ رہے، تیرے لطیف اور خبیر نام کے صدقے۔',
    chillaConditions: ['سوتے وقت تک باوضو رہنا اور دنیاوی گفتگو بالکل نہ کرنا۔'],
    spiritualProtection: 'آیت الکرسی کا حصار۔',
    secretNotesUrdu: 'اس عمل میں خطا کا امکان نہیں ہے بشرطیکہ پیٹ خالی ہو اور نیت خالص ہو۔',
    isSecretOrRare: false,
    wafqType: 'مثلث ہوائی (۳×۳)'
  },
  {
    id: 'shams-op-qahr-zalim-buni',
    titleArabic: 'سيف الظفر وقهر الجبارين ودفع كيد المعتدين في ليلة',
    titleUrdu: 'سیف الظفر، قہرِ جبارین و ہلاکتِ ستمگاران در یک شب (شمس المعارف)',
    chapterNumber: 29,
    chapterNameUrdu: 'باب بیست و نہم: قہرِ اعداء و دفعِ ظلم',
    category: 'dafa_dushman_qahr',
    categoryUrdu: 'قہرِ اعداء و ہلاکتِ ظالم',
    element: 'fire',
    elementUrdu: 'ناری و جلالی شدید',
    suitableDay: 'منگل یا شبِ چہارشنبہ',
    suitableSaat: 'ساعتِ مریخ (آخری گھڑی)',
    incenseUrdu: 'حلتیک (ہینگ)، گوگرد (گندھک)، تخمِ حنظل، کستور',
    inkAndMedium: 'روشنائی سیاہ بر پترہ لوہا یا شمعِ سیاہ',
    directionUrdu: 'مغرب و روبہ مسکنِ ظالم',
    defaultAdad: 940,
    defaultText: 'يَا قَهَّارُ يَا جَبَّارُ يَا مُنْتَقِمُ يَا مُذِلُّ يَا مُمِيتُ',
    arabicWafqOrTalismanText: 'ق هـ ر ۹۴۰ خذ فلانا بن فلانة أخذ عزيز مقتدر ۱ ۱ ۱ ۹ ۹ ۹',
    urduTranslation: 'اے قہار و جبار! فلاں بن فلاں ظالم کو زبردست قدرت والے کی طرح اپنی گرفت میں لے لے۔',
    methodologySteps: [
      '۱. صرف اس وقت جب ظالم کی طرف سے جان یا عزت پر شدید حملہ ہو اور شرعی مجبوری ہو۔',
      '۲. منگل کی رات ساعتِ مریخ میں تنہائی میں سیاہ شمع روشن کریں اور لوہے کی تختی پر یہ نقش کندہ کریں۔',
      '۳. ہینگ اور گندھک کی دھونی دیتے ہوئے اسمائے قہریہ ۳۱۳ بار پڑھیں اور شمع پر پھونکیں۔',
      '۴. تختی کو بھڑکتی آگ کے نیچے دبا دیں، ظالم پر فوری قہر نازل ہوگا اور اس کا ظلم ختم ہو جائے گا۔'
    ],
    azimatArabic: 'أَخَذْتُكَ يَا فُلَانُ بِسَيْفِ الْقَهْرِ، وَرَمَيْتُكَ بِسِهَامِ الْغَضَبِ، بِحَقِّ اسْمِ اللَّهِ الْقَهَّارِ الْجَبَّارِ الْمُنْتَقِمِ، فَقُطِعَ دَابِرُ الْقَوْمِ الَّذِينَ ظَلَمُوا وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ.',
    azimatUrdu: 'میں نے تجھے اے فلاں قہر کی تلوار سے پکڑ لیا، اور غضب کے تیروں سے تجھ پر حملہ کیا، اللہ کے قہار، جبار اور منتقم نام کے واسطے سے، پس ظالموں کی جڑ کاٹ دی گئی اور تمام تعریفیں اللہ رب العالمین کے لیے ہیں۔',
    chillaConditions: [
      'ناحق کسی پر ہرگز استعمال نہ کریں ورنہ عامل پر شدید ترین رجعت و بربادی آئے گی۔',
      'عمل سے پہلے صدقہ سیاہ (گوشت یا دال ماش) نکالیں۔'
    ],
    spiritualProtection: 'آہنی فولادی حصار و السیفی الصغیر۔',
    secretNotesUrdu: 'یہ شمس المعارف کے سب سے خوفناک جلالی ابواب میں سے ہے۔',
    isSecretOrRare: true,
    wafqType: 'مربع ناری جلالی (۴×۴)'
  }
];

// ----------------------------------------------------
// 4. THE 7 SEALS OF SOLOMON (خواتم سلیمان السبعۃ)
// ----------------------------------------------------
export const SHAMS_SOLOMON_SEALS: SolomonSealKey[] = [
  {
    symbolName: 'النجمة الخماسية (خاتم الخمسة)',
    symbolArabic: '★ (الخاتم الأول)',
    urduMeaning: 'ستارہ پنج گوشہ - نورِ ازل اور تاجِ سلیمانؑ کا پہلا مہر بند راز۔',
    planet: 'شمس (سورج)',
    day: 'اتوار',
    divineAttribute: 'یا اللہ یا فرد یا نور',
    secretBenefit: 'عزت، وجاہت، بادشاہوں میں قبولیت اور دلوں میں رعب پیدا کرنا۔'
  },
  {
    symbolName: 'الصليب المتساوي والخطوط الثلاثة',
    symbolArabic: '||| (الخطوط الثلاثة)',
    urduMeaning: 'تین کھڑی لکیریں اور ان پر چھتری - عناصرِ ثلاثہ اور فلکِ ثانی کا اقتدار۔',
    planet: 'قمر (چاند)',
    day: 'پیر',
    divineAttribute: 'یا رحمن یا رحیم یا حنان',
    secretBenefit: 'تسخیرِ خلائق، خوف سے امان اور روحانی سکون۔'
  },
  {
    symbolName: 'الميم الطميس المبتورة',
    symbolArabic: 'م (الميم المبتورة)',
    urduMeaning: 'میمِ طمیس مخرومہ - غیب کا پردہ اور ارواح کو مقید کرنے کا بندھن۔',
    planet: 'مریخ',
    day: 'منگل',
    divineAttribute: 'یا قہار یا جبار یا قادر',
    secretBenefit: 'دشمنوں کی ہلاکت، سحر کا ابطال اور جادوگروں کا منہ کالا کرنا۔'
  },
  {
    symbolName: 'السلم ذو الدرجات',
    symbolArabic: '☲ (السلم)',
    urduMeaning: 'سیڑھی کے چار زینے - آسمانی علوم اور ملکوت کی طرف عروج کا زینہ۔',
    planet: 'عطارد',
    day: 'بدھ',
    divineAttribute: 'یا علیم یا خبیر یا حکیم',
    secretBenefit: 'فہم و حکمت، ریاضی، جفر اور باطنی زبانوں کا کشف۔'
  },
  {
    symbolName: 'الأربعة أصابع والأشكال المتشابكة',
    symbolArabic: '٤ (الأصابع الأربعة)',
    urduMeaning: 'چار انگلیاں اور زاویے - جہاتِ اربعہ اور کائنات کے چار ارکان کا کنٹرول۔',
    planet: 'مشتری',
    day: 'جمعرات',
    divineAttribute: 'یا قدوس یا وہاب یا باسط',
    secretBenefit: 'دولت، حکومت، عمارات کی برکت اور زمین سے دفائن نکالنا۔'
  },
  {
    symbolName: 'الهاء المشقوقة',
    symbolArabic: 'هـ (الهاء المشقوقة)',
    urduMeaning: 'ہائے شق شدہ - روح کا جسم میں داخل ہونا اور باطنی حیات۔',
    planet: 'زہرہ',
    day: 'جمعہ',
    divineAttribute: 'یا ودود یا لطیف یا جامع',
    secretBenefit: 'عشق، محبت، صلح اور تسخیرِ خاص۔'
  },
  {
    symbolName: 'الواو المعقوفة المقوسة',
    symbolArabic: 'و (الواو المقلوبة)',
    urduMeaning: 'واؤ معکوسہ مقوسہ - دائرہ کا اختتام اور کائناتی حصارِ آہنی۔',
    planet: 'زحل',
    day: 'ہفتہ',
    divineAttribute: 'یا سلام یا مومن یا مہیمن',
    secretBenefit: 'ناقابلِ تسخیر قلعہ، حاسدوں کی زبان بندی اور عمر کی درازی۔'
  }
];

// ----------------------------------------------------
// 5. SAWAQIT AL-FATIHA 7 LETTERS TABLE
// ----------------------------------------------------
export const SHAMS_SAWAQIT_FATIHA_LETTERS: SawaqitFatihaLetter[] = [
  {
    letter: 'ف',
    letterName: 'فاء',
    divineName: 'فَرْدٌ',
    divineNameUrdu: 'یا فرد (اے یکتا و بے مثل)',
    adad: 284,
    celestialRuler: 'روقیائیل علیہ السلام',
    planetaryRuler: 'المذهب (ملکِ ارضی)',
    day: 'Sunday',
    dayUrdu: 'اتوار (شمس)',
    elementUrdu: 'ناری',
    incense: 'لوبانِ ذکر و سندروس',
    specialPurpose: 'شرف، ہیبت، وجاہت اور حاکموں پر غلبہ پانا۔',
    wafqPattern: 'مثلث ناری بر ورقِ طلا یا تانبہ'
  },
  {
    letter: 'ج',
    letterName: 'جيم',
    divineName: 'جَبَّارٌ',
    divineNameUrdu: 'یا جبار (اے زبردست اور دستگیری فرمانے والے)',
    adad: 206,
    celestialRuler: 'جبرائیل علیہ السلام',
    planetaryRuler: 'مرة الأبيض',
    day: 'Monday',
    dayUrdu: 'پیر (قمر)',
    elementUrdu: 'مائی',
    incense: 'مستکی و کافور',
    specialPurpose: 'دلوں کی الفت، محبت، صلح اور تسخیرِ خلق۔',
    wafqPattern: 'مربع مائی بر ورقِ نقرہ (چاندی)'
  },
  {
    letter: 'ش',
    letterName: 'شين',
    divineName: 'شَكُورٌ',
    divineNameUrdu: 'یا شکور (اے قدردان اور جزا دینے والے)',
    adad: 526,
    celestialRuler: 'سمسمائیل علیہ السلام',
    planetaryRuler: 'الأحمر',
    day: 'Tuesday',
    dayUrdu: 'منگل (مریخ)',
    elementUrdu: 'ناری جلالی',
    incense: 'حلتیک و گوگرد',
    specialPurpose: 'قہرِ اعداء، ہلاکتِ ظالم اور سحر کی کاٹ۔',
    wafqPattern: 'مخمس ناری بر لوحِ آہن (لوہا)'
  },
  {
    letter: 'ث',
    letterName: 'ثاء',
    divineName: 'ثَابِتٌ',
    divineNameUrdu: 'یا ثابت (اے ہمیشہ قائم رہنے والے)',
    adad: 903,
    celestialRuler: 'میکائیل علیہ السلام',
    planetaryRuler: 'برقان',
    day: 'Wednesday',
    dayUrdu: 'بدھ (عطارد)',
    elementUrdu: 'ہوائی',
    incense: 'جاوتری و عود',
    specialPurpose: 'ثباتِ عقل، ذہانت، حفظِ قرآن اور کشفِ علوم۔',
    wafqPattern: 'مسدس ہوائی بر کاغذ زریں'
  },
  {
    letter: 'ظ',
    letterName: 'ظاء',
    divineName: 'ظَهِيرٌ',
    divineNameUrdu: 'یا ظہیر (اے مددگار اور پشت پناہ)',
    adad: 1115,
    celestialRuler: 'صرفیائیل علیہ السلام',
    planetaryRuler: 'شمهورش',
    day: 'Thursday',
    dayUrdu: 'جمعرات (مشتری)',
    elementUrdu: 'ترابی خاکی',
    incense: 'سندروس و عود قماری',
    specialPurpose: 'دولت، کشائشِ رزق، اور زمین سے دفائن کا استخراج۔',
    wafqPattern: 'مسبع ترابی بر پترہ پیتل یا تانبہ'
  },
  {
    letter: 'خ',
    letterName: 'خاء',
    divineName: 'خَبِيرٌ',
    divineNameUrdu: 'یا خبیر (اے باخبر اور پوشیدہ جاننے والے)',
    adad: 812,
    celestialRuler: 'عنیائیل علیہ السلام',
    planetaryRuler: 'زوبعة',
    day: 'Friday',
    dayUrdu: 'جمعہ (زہرہ)',
    elementUrdu: 'مائی ہوائی',
    incense: 'صندل سفید و کافور',
    specialPurpose: 'کشفِ منامی، استخارہ اور محبوب کو مائل کرنا۔',
    wafqPattern: 'مثمن جمالی بر پوستِ ہرن'
  },
  {
    letter: 'ز',
    letterName: 'زاء',
    divineName: 'زَكِيٌّ',
    divineNameUrdu: 'یا زکی (اے پاکیزہ اور گناہوں سے پاک کرنے والے)',
    adad: 37,
    celestialRuler: 'کسفیائیل علیہ السلام',
    planetaryRuler: 'ميمون أبانوخ',
    day: 'Saturday',
    dayUrdu: 'ہفتہ (زحل)',
    elementUrdu: 'ترابی ارضی',
    incense: 'مقل ازرق و لبان',
    specialPurpose: 'زبان بندی، دشمن کے شر سے فولادی قلعہ اور عمر کی برکت۔',
    wafqPattern: 'متسع زحلی بر پترہ رصاص (سیسہ)'
  }
];
