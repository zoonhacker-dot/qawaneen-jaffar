export interface ZaichaMatchRule {
  r1: number;
  r2: number;
  status: 'ok' | 'not_ok' | 'partially_ok' | 'conditional';
  statusUrdu: string;
  statusColor: string; // Tailwind class
  verdictTitleUrdu: string;
  verdictEnglish: string;
  detailUrdu: string;
  remedyUrdu?: string;
}

export interface ZodiacBurjInfo {
  num: number;
  nameUrdu: string;
  nameArabic: string;
  nameEnglish: string;
  element: 'fire' | 'air' | 'water' | 'earth';
  elementUrdu: string;
  natureUrdu: string;
  rulingPlanet: string;
  rulingPlanetUrdu: string;
  characteristicsUrdu: string;
  luckyStoneUrdu: string;
  luckyColorUrdu: string;
  luckyDayUrdu: string;
}

export const ZODIAC_BURJ_LIST: Record<number, ZodiacBurjInfo> = {
  1: {
    num: 1,
    nameUrdu: 'برج حمل',
    nameArabic: 'الحمل',
    nameEnglish: 'Aries',
    element: 'fire',
    elementUrdu: 'آتشی (آگ)',
    natureUrdu: 'گرم و خشک',
    rulingPlanet: 'Mars',
    rulingPlanetUrdu: 'مریخ (جلالی و پرجوش)',
    characteristicsUrdu: 'قائدانہ صلاحیت، بے باک، خوددار، غصیلہ لیکن دل کا صاف اور پرجوش۔',
    luckyStoneUrdu: 'مرجان (یاقوتِ احمر)',
    luckyColorUrdu: 'سرخ و گلابی',
    luckyDayUrdu: 'منگل'
  },
  2: {
    num: 2,
    nameUrdu: 'برج ثور',
    nameArabic: 'الثور',
    nameEnglish: 'Taurus',
    element: 'earth',
    elementUrdu: 'خاکی (مٹی)',
    natureUrdu: 'سرد و خشک',
    rulingPlanet: 'Venus',
    rulingPlanetUrdu: 'زہرہ (جمالی و پرکشش)',
    characteristicsUrdu: 'صابر، مستقل مزاج، وفادار، محنتی اور گھریلو سکون کو پسند کرنے والا۔',
    luckyStoneUrdu: 'زمرد (ہیرا)',
    luckyColorUrdu: 'سبز و فیروزی',
    luckyDayUrdu: 'جمعہ'
  },
  3: {
    num: 3,
    nameUrdu: 'برج جوزا',
    nameArabic: 'الجوزاء',
    nameEnglish: 'Gemini',
    element: 'air',
    elementUrdu: 'بادی (ہوا)',
    natureUrdu: 'گرم و تر',
    rulingPlanet: 'Mercury',
    rulingPlanetUrdu: 'عطارد (ذہین و متحرک)',
    characteristicsUrdu: 'حاضر جواب، گفتگو کا ماہر، دوست نواز، متجسس اور تیزی سے بدلتی سوچ والا۔',
    luckyStoneUrdu: 'عقیق (پکھراج)',
    luckyColorUrdu: 'ہلکا نیلا و زرد',
    luckyDayUrdu: 'بدھ'
  },
  4: {
    num: 4,
    nameUrdu: 'برج سرطان',
    nameArabic: 'السرطان',
    nameEnglish: 'Cancer',
    element: 'water',
    elementUrdu: 'آبی (پانی)',
    natureUrdu: 'سرد و تر',
    rulingPlanet: 'Moon',
    rulingPlanetUrdu: 'قمر (رحمدل و جذباتی)',
    characteristicsUrdu: 'حساس، مونس و غمخوار، خاندان سے گہری وابستگی اور سخاوت شعار۔',
    luckyStoneUrdu: 'موتی (چاندی)',
    luckyColorUrdu: 'سفید و موتیارنگ',
    luckyDayUrdu: 'پیر'
  },
  5: {
    num: 5,
    nameUrdu: 'برج اسد',
    nameArabic: 'الأسد',
    nameEnglish: 'Leo',
    element: 'fire',
    elementUrdu: 'آتشی (آگ)',
    natureUrdu: 'گرم و خشک',
    rulingPlanet: 'Sun',
    rulingPlanetUrdu: 'شمس (حاکم و پروقار)',
    characteristicsUrdu: 'عالی ہمت، فیاض، خوددار، رعب دار اور تعریف پسند۔',
    luckyStoneUrdu: 'یاقوت (سونا)',
    luckyColorUrdu: 'سنہری و نارنجی',
    luckyDayUrdu: 'اتوار'
  },
  6: {
    num: 6,
    nameUrdu: 'برج سنبلہ',
    nameArabic: 'السنبلة',
    nameEnglish: 'Virgo',
    element: 'earth',
    elementUrdu: 'خاکی (مٹی)',
    natureUrdu: 'سرد و خشک',
    rulingPlanet: 'Mercury',
    rulingPlanetUrdu: 'عطارد (منظم و باریک بین)',
    characteristicsUrdu: 'سلیقہ شعار، مخلص، کفایت شعار، تجزیاتی سوچ اور تنقیدی نگاہ والا۔',
    luckyStoneUrdu: 'فیروزہ (زمرد)',
    luckyColorUrdu: 'گہرا سبز و زیتونی',
    luckyDayUrdu: 'بدھ'
  },
  7: {
    num: 7,
    nameUrdu: 'برج میزان',
    nameArabic: 'الميزان',
    nameEnglish: 'Libra',
    element: 'air',
    elementUrdu: 'بادی (ہوا)',
    natureUrdu: 'گرم و تر',
    rulingPlanet: 'Venus',
    rulingPlanetUrdu: 'زہرہ (منصف و صلح جو)',
    characteristicsUrdu: 'انصاف پسند، شیریں کلام، حسن پرست، صلح جو اور نزاکت پسند۔',
    luckyStoneUrdu: 'الماس (ہیرا و اوپل)',
    luckyColorUrdu: 'آسمانی و گلابی',
    luckyDayUrdu: 'جمعہ'
  },
  8: {
    num: 8,
    nameUrdu: 'برج عقرب',
    nameArabic: 'العقرب',
    nameEnglish: 'Scorpio',
    element: 'water',
    elementUrdu: 'آبی (پانی)',
    natureUrdu: 'سرد و تر',
    rulingPlanet: 'Mars',
    rulingPlanetUrdu: 'مریخ (پراسرار و غیرت مند)',
    characteristicsUrdu: 'پختہ عزم، رازدار، غیرت مند، شدید محبت اور گہری نفرت رکھنے والا۔',
    luckyStoneUrdu: 'یاقوتِ زرد (مرجان)',
    luckyColorUrdu: 'سرخ و گہرا کتھئی',
    luckyDayUrdu: 'منگل'
  },
  9: {
    num: 9,
    nameUrdu: 'برج قوس',
    nameArabic: 'القوس',
    nameEnglish: 'Sagittarius',
    element: 'fire',
    elementUrdu: 'آتشی (آگ)',
    natureUrdu: 'گرم و خشک',
    rulingPlanet: 'Jupiter',
    rulingPlanetUrdu: 'مشتری (مبارک و فیاض)',
    characteristicsUrdu: 'خوش اخلاق، دیانتدار، سچائی کا متلاشی، آزاد پسند اور مہم جو۔',
    luckyStoneUrdu: 'پکھراج (نیلم)',
    luckyColorUrdu: 'پیلا و بنفشی',
    luckyDayUrdu: 'جمعرات'
  },
  10: {
    num: 10,
    nameUrdu: 'برج جدی',
    nameArabic: 'الجدي',
    nameEnglish: 'Capricorn',
    element: 'earth',
    elementUrdu: 'خاکی (مٹی)',
    natureUrdu: 'سرد و خشک',
    rulingPlanet: 'Saturn',
    rulingPlanetUrdu: 'زحل (سنجیدہ و صابر)',
    characteristicsUrdu: 'دور اندیش، کفایت شعار، سنجیدہ، بلند حوصلہ اور فرائض کا پابند۔',
    luckyStoneUrdu: 'نیلم (لاجورد)',
    luckyColorUrdu: 'سیاہ و سرمئی',
    luckyDayUrdu: 'ہفتہ'
  },
  11: {
    num: 11,
    nameUrdu: 'برج دلو',
    nameArabic: 'الدلو',
    nameEnglish: 'Aquarius',
    element: 'air',
    elementUrdu: 'بادی (ہوا)',
    natureUrdu: 'گرم و تر',
    rulingPlanet: 'Saturn',
    rulingPlanetUrdu: 'زحل (اصلاح پسند و ہمدرد)',
    characteristicsUrdu: 'ہمدردِ انسانیت، دور اندیش، جدید سوچ، مخلص اور دوستوں کا قدردان۔',
    luckyStoneUrdu: 'نیلم (یاقوتِ کبود)',
    luckyColorUrdu: 'نیلا و جامنی',
    luckyDayUrdu: 'ہفتہ'
  },
  12: {
    num: 12,
    nameUrdu: 'برج حوت',
    nameArabic: 'الحوت',
    nameEnglish: 'Pisces',
    element: 'water',
    elementUrdu: 'آبی (پانی)',
    natureUrdu: 'سرد و تر',
    rulingPlanet: 'Jupiter',
    rulingPlanetUrdu: 'مشتری (روحانی و پرخلوص)',
    characteristicsUrdu: 'فیاض، رحم دل، روحانی رجحان، صلح پسند اور مخلص قربانی دینے والا۔',
    luckyStoneUrdu: 'مرجان و پکھراج',
    luckyColorUrdu: 'سمندری سبز و زرد',
    luckyDayUrdu: 'جمعرات'
  }
};

// Complete Authentic 78 Unique Pairs from the Video Chart
export const ZAICHA_RULES_MAP: Record<string, ZaichaMatchRule> = {
  // 1
  '1-1': {
    r1: 1, r2: 1,
    status: 'partially_ok',
    statusUrdu: 'جزوی موافق (کبھی نرم کبھی گرم)',
    statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
    verdictTitleUrdu: 'دونوں آتشی برج - انا اور غصے پر قابو پانا لازمی ہے',
    verdictEnglish: 'Partially ok',
    detailUrdu: 'دونوں افراد کا عنصر آتشی ہے۔ دونوں میں خودداری، قیادت کی خواہش اور تیز مزاجی پائی جاتی ہے۔ اگر دونوں فریق صبر اور درگزر سے کام لیں تو نباہ ممکن ہے، ورنہ معمولی بات پر تکرار کا خدشہ رہتا ہے۔',
    remedyUrdu: 'روزانہ بعد نمازِ مغرب "یَا حَلِیمُ یَا وَدُودُ" ۱۰۰ بار پڑھ کر میٹھی چیز پر دم کر کے باہم تناول فرمائیں۔'
  },
  '1-2': {
    r1: 1, r2: 2,
    status: 'conditional',
    statusUrdu: 'موافق بشرطِ وقتی دوری کا صبر',
    statusColor: 'bg-blue-100 text-blue-900 border-blue-300',
    verdictTitleUrdu: 'موافق ہے لیکن وقتی علیحدگی یا سفری دوری کا امکان رہتا ہے',
    verdictEnglish: 'Ok but temporary separation is possible',
    detailUrdu: 'آگ اور مٹی کا ملاپ ہے۔ بنیادی طور پر رشتہ اچھا اور پائیدار رہے گا، البتہ ملازمت، سفر یا وقتی ناچاقی کے باعث وقتی طور پر دوری واقع ہو سکتی ہے جو بعد میں صلح پر منتج ہوگی۔',
    remedyUrdu: 'ہر جمعرات کو شیرینی پر سورۃ الانفال آیت ۶۳ پڑھ کر دم کریں اور صدقہ نکالیں۔'
  },
  '1-3': {
    r1: 1, r2: 3,
    status: 'not_ok',
    statusUrdu: 'ناموافق (عدمِ مطابقت)',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'یہ رشتہ سازگار نہیں ہے',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'حمل اور جوزا میں باہمی تناؤ، شکوک اور مسلسل سرد جنگ کا خطرہ رہتا ہے۔ فکری ہم آہنگی کم اور غلط فہمیاں زیادہ جنم لیتی ہیں۔',
    remedyUrdu: 'اگر رشتہ طے ہو چکا ہو تو روزانہ آیت الکرسی اور معوذتین کا حصار لازم رکھیں۔'
  },
  '1-4': {
    r1: 1, r2: 4,
    status: 'not_ok',
    statusUrdu: 'سخت ناموافق (آگ اور پانی کا تضاد)',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - شدید عنصری مخالفت',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'حمل آتشی اور سرطان آبی ہے۔ پانی آگ کو بجھا دیتا ہے اور آگ پانی کو ابال دیتی ہے۔ باہمی زندگی میں ذہنی دباؤ اور بے سکونی کا قوی احتمال ہے۔',
    remedyUrdu: 'استخارۂ مسنونہ دوبارہ کریں اور جلد بازی سے گریز فرمائیں۔'
  },
  '1-5': {
    r1: 1, r2: 5,
    status: 'not_ok',
    statusUrdu: 'ناموافق (دو آتشیں حاکم)',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - حاکمیت کی کشمکش',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'حمل اور اسد دونوں شعلہ بار ہیں۔ دونوں کے اندر ایک دوسرے پر حاوی ہونے کی کشمکش رہتی ہے جس کی وجہ سے گھریلو فضا بدمزہ ہو سکتی ہے۔',
    remedyUrdu: 'روزانہ صدقۂ سرخ گوشت یا گندم نکالیں۔'
  },
  '1-6': {
    r1: 1, r2: 6,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - مزاجی تضاد',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'حمل کی جلد بازی اور سنبلہ کی حد سے زیادہ باریک بینی اور نکتہ چینی رشتہ میں دراڑ پیدا کر سکتی ہے۔',
    remedyUrdu: 'صبر، تحمل اور زیادہ سے زیادہ استغفار کی پابندی کریں۔'
  },
  '1-7': {
    r1: 1, r2: 7,
    status: 'partially_ok',
    statusUrdu: 'جزوی موافق (کوشش سے نباہ)',
    statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
    verdictTitleUrdu: 'جزوی موافق - باہمی افہام و تفہیم کی ضرورت',
    verdictEnglish: 'Partially ok',
    detailUrdu: 'آگ اور ہوا کا تعلق ہے۔ میزان صلح جو ہے جبکہ حمل تیز طرار ہے۔ اگر میزان کی نرمی کو قدر کی نگاہ سے دیکھا جائے تو رشتہ بخوبی چل سکتا ہے۔',
    remedyUrdu: 'اسمائے الٰہیہ "یَا جَامِعُ یَا وَدُودُ" کا روزانہ ۱۱۱ بار ورد رکھیں۔'
  },
  '1-8': {
    r1: 1, r2: 8,
    status: 'conditional',
    statusUrdu: 'موافق بشرطِ صبر بر سفر و دوری',
    statusColor: 'bg-blue-100 text-blue-900 border-blue-300',
    verdictTitleUrdu: 'موافق مگر وقتی دوری کا سامنا ہو سکتا ہے',
    verdictEnglish: 'Ok but temporary separation is possible',
    detailUrdu: 'دونوں کے حاکم سیارے مریخ ہیں، جس سے باہمی کشش گہری ہے لیکن عارضی ناراضگی یا روزگار کی خاطر علیحدگی کے مواقع آ سکتے ہیں۔',
    remedyUrdu: 'گھر میں سورۃ البقرہ کی تلاوت باقاعدگی سے جاری رکھیں۔'
  },
  '1-9': {
    r1: 1, r2: 9,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - بے ترتیبی اور بے صبری',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'دونوں افراد کا آزادانہ رویہ اور ایک دوسرے کی پابندی قبول نہ کرنا مستقبل میں فاصلے بڑھا سکتا ہے۔',
    remedyUrdu: 'باہمی بزرگوں کی نگرانی اور دعاؤں کا اہتمام رکھیں۔'
  },
  '1-10': {
    r1: 1, r2: 10,
    status: 'ok',
    statusUrdu: 'بہترین موافق (کامیاب رشتہ)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'موافق و کامیاب رشتہ - پائیدار ازدواجی زندگی',
    verdictEnglish: 'Ok',
    detailUrdu: 'حمل کا جوش اور جدی کی سنجیدگی ایک دوسرے کی کمی پوری کرتے ہیں۔ مالی استحکام اور گھر کی تعمیر و ترقی کے لیے یہ رشتہ نہایت مبارک ثابت ہوگا۔',
    remedyUrdu: 'اللہ کا شکر ادا کریں اور نماز کی پابندی رکھیں۔'
  },
  '1-11': {
    r1: 1, r2: 11,
    status: 'conditional',
    statusUrdu: '۵ سال بعد جزوی موافقت',
    statusColor: 'bg-purple-100 text-purple-900 border-purple-300',
    verdictTitleUrdu: 'شادی کے ۵ سال بعد بہتری اور جزوی مطابقت آئے گی',
    verdictEnglish: 'Partially ok, after five years of marriage',
    detailUrdu: 'ابتدائی چند سال صبر آزما ہو سکتے ہیں کیونکہ دونوں کی سوچ میں نمایاں فرق ہوگا۔ لیکن ۵ سال گزرنے اور اولاد ہونے کے بعد زندگی میں سکون اور مطابقت قائم ہو جائے گی۔',
    remedyUrdu: 'ابتدائی ایام میں صبر کریں اور غصے کے وقت خاموشی اختیار کریں۔'
  },
  '1-12': {
    r1: 1, r2: 12,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - جذباتی عدم مطابقت',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'حوت نہایت نازک اور حساس ہے جبکہ حمل کی کھری اور تیز باتیں حوت کے دل کو زخمی کر سکتی ہیں۔ رشتہ تلخ ہونے کا خطرہ ہے۔',
    remedyUrdu: 'اگر نکاح ناگزیر ہو تو نرم کلامی اور شکر گزاری کو شعار بنائیں۔'
  },

  // 2
  '2-2': {
    r1: 2, r2: 2,
    status: 'ok',
    statusUrdu: 'انتہائی موافق (ہم مزاج)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - سکون اور پائیداری کا گہوارہ',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں خاکی اور زہرہ کے زیرِ اثر ہیں۔ محبت، سلیقہ، کفایت شعاری اور گھریلو وفاداری میں کامل ہم آہنگی ہوگی۔',
    remedyUrdu: 'ماشاءاللہ لا قوۃ الا باللہ کا کثرت سے ورد کریں۔'
  },
  '2-3': {
    r1: 2, r2: 3,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - مستقل مزاجی بمقابلہ بے چینی',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'ثور کا ٹھہراؤ اور جوزا کی بے چینی باہم تصادم پیدا کرتی ہے۔ سوچ اور ترجیحات کا بڑا تفاوت ہے۔',
    remedyUrdu: 'استخارہ دوبارہ کریں اور صدقہ نکالیں۔'
  },
  '2-4': {
    r1: 2, r2: 4,
    status: 'ok',
    statusUrdu: 'بہترین موافق (مٹی اور پانی کا ملاپ)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - برکت، محبت اور افزائشِ نسل',
    verdictEnglish: 'Ok',
    detailUrdu: 'پانی مٹی کو سرسبز کرتا ہے۔ ثور اور سرطان کا جوڑ انتہائی پرسکون، وفادارانہ اور مالی و نسلی برکتوں سے معمور ثابت ہوتا ہے۔',
    remedyUrdu: 'شکرانہ کے نفل ادا کریں اور باہم محبت و مروت سے رہیں۔'
  },
  '2-5': {
    r1: 2, r2: 5,
    status: 'not_ok',
    statusUrdu: 'اکثر ناموافق، کبھی کبھار جزوی',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'اکثر ناموافق - شاذ و نادر جزوی موافقت',
    verdictEnglish: 'Not ok Mostly, Partially ok sometimes',
    detailUrdu: 'ثور کی ضد اور اسد کا رعب باہمی سرد جنگ کا سبب بنتے ہیں۔ مالی معاملات میں بھی اختلاف رائے پیدا ہوتا ہے۔',
    remedyUrdu: 'ایک دوسرے کی عزت اور رائے کو اہمیت دینا فرض سمجھیں۔'
  },
  '2-6': {
    r1: 2, r2: 6,
    status: 'ok',
    statusUrdu: 'بہترین موافق (خاکی جوڑ)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - عقلمندی اور سلیقہ مندی',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں خاکی ہیں، گھر کی خوشحالی، اولاد کی تربیت اور عملی زندگی میں مثالی رفاقت نبھائیں گے۔',
    remedyUrdu: 'گھر میں درودِ پاک کی کثرت رکھیں۔'
  },
  '2-7': {
    r1: 2, r2: 7,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - مالی و گھریلو اختلافات',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'اگرچہ دونوں زہرہ کے زیرِ اثر ہیں لیکن ثور کفایت شعار اور میزان پرتعیش خرچ پسند ہے۔ اس لیے مالی کھینچ تان کا اندیشہ رہتا ہے۔',
    remedyUrdu: 'خرچ اور اخراجات پر پیشگی مشاورت کا ضابطہ بنائیں۔'
  },
  '2-8': {
    r1: 2, r2: 8,
    status: 'ok',
    statusUrdu: 'بہترین موافق',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - گہری وابستگی اور تحفظ',
    verdictEnglish: 'Ok',
    detailUrdu: 'ثور اور عقرب ایک دوسرے کے متمم ہیں۔ وفاداری اور جذباتی گہرائی رشتہ کو لازوال بناتی ہے۔',
    remedyUrdu: 'اللہ تعالیٰ کا شکر بجا لائیں۔'
  },
  '2-9': {
    r1: 2, r2: 9,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - مزاج کا زمین و آسمان کا فرق',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'ثور گھر میں رہنا پسند کرتا ہے جبکہ قوس سفر اور باہر کی دنیا کا دلدادہ ہے۔ باہمی وقت گزارنے میں مشکلات آئیں گی۔',
    remedyUrdu: 'استخارہ دوبارہ کریں اور جلد بازی نہ کریں۔'
  },
  '2-10': {
    r1: 2, r2: 10,
    status: 'partially_ok',
    statusUrdu: 'جزوی موافق (عملی رشتہ)',
    statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
    verdictTitleUrdu: 'جزوی موافق - پرسکون مگر رسمی رشتہ',
    verdictEnglish: 'Partially ok',
    detailUrdu: 'دونوں خاکی ہیں، عملی اور مالی لحاظ سے رشتہ مضبوط ہوگا لیکن رومانی اور جذباتی گرمجوشی کی کمی محسوس ہو سکتی ہے۔',
    remedyUrdu: 'باہمی محبت کے اظہار اور خوش کلامی کی عادت ڈالیں۔'
  },
  '2-11': {
    r1: 2, r2: 11,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - روایتی بمقابلہ جدید سوچ',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'ثور روایات کا پابند ہے جبکہ دلو باغی اور جدت پسند۔ دونوں کی دنیا بالکل الگ ہے۔',
    remedyUrdu: 'روزانہ صدقہ دیں۔'
  },
  '2-12': {
    r1: 2, r2: 12,
    status: 'ok',
    statusUrdu: 'بہترین موافق (مٹی اور مصفا پانی)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - محبت، خیر اور الفت',
    verdictEnglish: 'Ok',
    detailUrdu: 'ثور کا سہارا حوت کے جذباتی سکون کا ضامن بنتا ہے۔ نہایت مبارک اور آرام دہ ازدواجی تعلق ہوگا۔',
    remedyUrdu: 'دعائے خیر کریں۔'
  },

  // 3
  '3-3': {
    r1: 3, r2: 3,
    status: 'conditional',
    statusUrdu: 'موافق مع تکرار و نوک جھونک',
    statusColor: 'bg-blue-100 text-blue-900 border-blue-300',
    verdictTitleUrdu: 'موافق ہے لیکن باہمی نوک جھونک اور تکرار رہے گی',
    verdictEnglish: 'Ok with quarrels',
    detailUrdu: 'دونوں بادی اور تیز زبان ہیں۔ گفتگو، ہنسی مذاق اور ذہانت میں خوب بنے گی لیکن بحث و مباحثے کے دوران چھوٹی بات بڑھ سکتی ہے۔',
    remedyUrdu: 'بحث کے وقت ایک فریق کا خاموش رہنا اور درود شریف پڑھنا لازمی ہے۔'
  },
  '3-4': {
    r1: 3, r2: 4,
    status: 'ok',
    statusUrdu: 'موافق و مناسب',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'موافق - ذہنی اور جذباتی توازن',
    verdictEnglish: 'Ok',
    detailUrdu: 'سرطان کی محبت جوزا کی بے چینی کو دور کرے گی۔ رشتہ اچھے انداز سے پروان چڑھے گا۔',
    remedyUrdu: 'خیر و برکت کی دعا کریں۔'
  },
  '3-5': {
    r1: 3, r2: 5,
    status: 'partially_ok',
    statusUrdu: 'جزوی موافق',
    statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
    verdictTitleUrdu: 'جزوی موافق - دلچسپ مگر صبر طلب',
    verdictEnglish: 'Partially ok',
    detailUrdu: 'ہوا اور آگ کا میل ہے۔ زندگی پررونق ہوگی لیکن اسد کے غرور کو ٹھیس لگنے پر جوزا کی تیز زبانی بگاڑ پیدا کر سکتی ہے۔',
    remedyUrdu: 'ایک دوسرے کا اکرام کریں۔'
  },
  '3-6': {
    r1: 3, r2: 6,
    status: 'conditional',
    statusUrdu: 'اولاد کے بعد موافقت',
    statusColor: 'bg-purple-100 text-purple-900 border-purple-300',
    verdictTitleUrdu: 'صرف اولاد پیدا ہونے کے بعد مکمل موافقت قائم ہوگی',
    verdictEnglish: 'Ok after having children only',
    detailUrdu: 'دونوں کا حاکم عطارد ہے۔ ابتدائی ایام میں تنقید اور شکوے رہیں گے لیکن اولاد کی پیدائش کے بعد دونوں ایک مقصد پر متفق ہو جائیں گے۔',
    remedyUrdu: 'حصولِ اولاد صالحہ کے لیے سورۃ الانبیاء آیت ۸۹ پڑھیں۔'
  },
  '3-7': {
    r1: 3, r2: 7,
    status: 'ok',
    statusUrdu: 'بہترین موافق (دونوں بادی)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - کامل ذہنی اور قلبی ہم آہنگی',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں بادی اور گفتگو پسند ہیں۔ معاشرتی زندگی میں یہ جوڑا ہر دلعزیز اور خوش و خرم رہے گا۔',
    remedyUrdu: 'ماشاءاللہ کا ورد جاری رکھیں۔'
  },
  '3-8': {
    r1: 3, r2: 8,
    status: 'conditional',
    statusUrdu: 'موافق مع وقتی دوری',
    statusColor: 'bg-blue-100 text-blue-900 border-blue-300',
    verdictTitleUrdu: 'موافق لیکن وقتی عارضی دوری کا سامنا ہوگا',
    verdictEnglish: 'Ok but temporary separation is possible',
    detailUrdu: 'عقرب کا تجسس اور جوزا کی چلبلی طبیعت میں کشش ہوگی لیکن بدگمانی سے بچنا شرط ہے۔ وقتی جدائی کے بعد محبت دوبالا ہوگی۔',
    remedyUrdu: 'شکوک و شبہات سے پرہیز کریں۔'
  },
  '3-9': {
    r1: 3, r2: 9,
    status: 'ok',
    statusUrdu: 'بہترین موافق (ہوا اور آگ)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - مسرت، تفریح اور برکت',
    verdictEnglish: 'Ok',
    detailUrdu: 'جوزا اور قوس مد مقابل اور مکمل جوڑ ہیں۔ دونوں مل کر زندگی کے سفر سے بھرپور لطف اندوز ہوں گے۔',
    remedyUrdu: 'الحمد للہ علیٰ کل حال کا ورد کریں۔'
  },
  '3-10': {
    r1: 3, r2: 10,
    status: 'ok',
    statusUrdu: 'موافق و مفید',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'موافق - ایک دوسرے کے معاون',
    verdictEnglish: 'Ok',
    detailUrdu: 'جدی کی حکمت جوزا کو استحکام بخشے گی۔ عملی زندگی میں کامیابی ملے گی۔',
    remedyUrdu: 'نماز و تلاوت کی پابندی رکھیں۔'
  },
  '3-11': {
    r1: 3, r2: 11,
    status: 'ok',
    statusUrdu: 'بہترین موافق (بادی رفاقت)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - مخلص دوست اور شاندار جوڑی',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں وسیع النظر اور روشن خیال ہیں۔ باہمی احترام اور محبت ہمیشہ برقرار رہے گی۔',
    remedyUrdu: 'شکر ادا کریں۔'
  },
  '3-12': {
    r1: 3, r2: 12,
    status: 'conditional',
    statusUrdu: 'موافق بشرطِ قابو بر زبان',
    statusColor: 'bg-blue-100 text-blue-900 border-blue-300',
    verdictTitleUrdu: 'موافق ہے بشرطیکہ اپنی زبان اور طعن و تشنیع پر قابو رکھیں',
    verdictEnglish: 'Ok (control your tong)',
    detailUrdu: 'جوزا کی طنزیہ گفتگو حوت کے حساس دل کو چھلنی کر سکتی ہے۔ اگر میٹھی زبان اور اخلاق کا دامن تھامے رکھیں تو یہ رشتہ کامیاب رہے گا۔',
    remedyUrdu: 'سیدھی اور نرم گفتگو کا عہد کریں اور یا حلیم کا ورد کریں۔'
  },

  // 4
  '4-4': {
    r1: 4, r2: 4,
    status: 'ok',
    statusUrdu: 'بہترین موافق (دونوں آبی)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - گہری محبت اور مہر و مروت',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں سرطان اور قمر کے زیرِ اثر ہیں۔ گھریلو زندگی اور بچوں کی پرورش میں یکجان دو قالب ثابت ہوں گے۔',
    remedyUrdu: 'خیر و برکت کی دعا کریں۔'
  },
  '4-5': {
    r1: 4, r2: 5,
    status: 'not_ok',
    statusUrdu: 'سخت ناموافق (پانی اور آگ)',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - شدید عنصری کشمکش',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'سرطان کی خاموش اداسی اور اسد کا بلند آہنگ رعب ایک دوسرے سے متصادم رہتے ہیں۔ رشتہ بوجھ بن سکتا ہے۔',
    remedyUrdu: 'استخارہ دوبارہ کریں اور صدقہ نکالیں۔'
  },
  '4-6': {
    r1: 4, r2: 6,
    status: 'ok',
    statusUrdu: 'بہترین موافق (پانی اور مٹی)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - امن و سلامتی کا مسکن',
    verdictEnglish: 'Ok',
    detailUrdu: 'سرطان کا جذبہ اور سنبلہ کا سلیقہ ایک پرامن اور خوشحال گھرانے کی بنیاد رکھیں گے۔',
    remedyUrdu: 'اللہ کا شکر ادا کریں۔'
  },
  '4-7': {
    r1: 4, r2: 7,
    status: 'ok',
    statusUrdu: 'موافق و پرکشش',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'موافق - خوبصورتی اور سکون',
    verdictEnglish: 'Ok',
    detailUrdu: 'قمر اور زہرہ کا ملاپ حسن، محبت اور گھریلو وقار میں اضافہ کرتا ہے۔',
    remedyUrdu: 'دعائے خیر کریں۔'
  },
  '4-8': {
    r1: 4, r2: 8,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - جذبات کی شدت اور حسد کا خطرہ',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'شدید جذبات کے باعث شکوک اور بدگمانیاں پیدا ہو سکتی ہیں جو گھریلو امن کو نقصان پہنچا سکتی ہیں۔',
    remedyUrdu: 'معوذتین روزانہ پڑھیں۔'
  },
  '4-9': {
    r1: 4, r2: 9,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - پانی اور آگ کی ناموافقت',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'سرطان کی گھریلو پابندی اور قوس کا لاابالی پن باہم تنازعات کھڑے کر سکتا ہے۔',
    remedyUrdu: 'صدقہ نکالیں۔'
  },
  '4-10': {
    r1: 4, r2: 10,
    status: 'partially_ok',
    statusUrdu: 'جزوی موافق',
    statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
    verdictTitleUrdu: 'جزوی موافق - محنت اور بردباری سے نباہ',
    verdictEnglish: 'Partially ok',
    detailUrdu: 'جدی کی خشکی اور سرطان کی حساسیت میں توازن لانے کے لیے باہمی برداشت ضروری ہے۔',
    remedyUrdu: 'یا ودود کا ورد کریں۔'
  },
  '4-11': {
    r1: 4, r2: 11,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - بے رخی اور جذباتی سرد مہری',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'سرطان گرمجوش محبت چاہتا ہے جبکہ دلو غیر جذباتی اور دور دور رہتا ہے۔ نباہ مشکل ہوگا۔',
    remedyUrdu: 'استخارہ کریں۔'
  },
  '4-12': {
    r1: 4, r2: 12,
    status: 'conditional',
    statusUrdu: 'کچھ وقت بعد جزوی موافقت',
    statusColor: 'bg-purple-100 text-purple-900 border-purple-300',
    verdictTitleUrdu: 'شادی کے کچھ عرصہ بعد جزوی موافقت پیدا ہوگی',
    verdictEnglish: 'Partially ok after some time',
    detailUrdu: 'دونوں آبی ہیں، باہمی خوابوں کی دنیا سے نکل کر جب عملی حقیقت کا سامنا کریں گے تو وقت کے ساتھ مفاہمت ہو جائے گی۔',
    remedyUrdu: 'عملی تدابیر اور استغفار جاری رکھیں۔'
  },

  // 5
  '5-5': {
    r1: 5, r2: 5,
    status: 'ok',
    statusUrdu: 'بہترین موافق (دونوں اسد)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - شاہانہ رفاقت اور وقار',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں شمس کے زیرِ اثر ہیں۔ عالی ہمت اور سخاوت میں یکساں ہوں گے۔ باہمی احترام قائم رکھیں تو مثالی جوڑا ہوگا۔',
    remedyUrdu: 'شکر ادا کریں۔'
  },
  '5-6': {
    r1: 5, r2: 6,
    status: 'partially_ok',
    statusUrdu: 'جزوی موافق',
    statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
    verdictTitleUrdu: 'جزوی موافق - احتیاط اور نرمی درکار ہے',
    verdictEnglish: 'Partially ok',
    detailUrdu: 'اسد کا بڑا دل اور سنبلہ کا احتساب باہم چل سکتا ہے اگر سنبلہ عیب جوئی سے پرہیز کرے۔',
    remedyUrdu: 'یا حلیم کا ورد کریں۔'
  },
  '5-7': {
    r1: 5, r2: 7,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - خود پسندی اور مقابلے کی فضا',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'دونوں توجہ کا مرکز بننا چاہتے ہیں جس سے باہمی حسد پیدا ہو سکتا ہے۔',
    remedyUrdu: 'صدقہ نکالیں۔'
  },
  '5-8': {
    r1: 5, r2: 8,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - آگ اور پانی کا سخت ٹکراؤ',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'اسد کا کھلم کھلا انداز اور عقرب کا پراسرار پن بد اعتمادی کو جنم دے گا۔',
    remedyUrdu: 'استخارہ مسنونہ کریں۔'
  },
  '5-9': {
    r1: 5, r2: 9,
    status: 'ok',
    statusUrdu: 'بہترین موافق (شمس اور مشتری)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - دولت، خوشحالی اور پرمسرت زندگی',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں آتشی اور سعد اکبر کے فیض یافتہ ہیں۔ خوش طبعی اور کامیابی ان کے قدم چومے گی۔',
    remedyUrdu: 'الحمد للہ پڑھیں۔'
  },
  '5-10': {
    r1: 5, r2: 10,
    status: 'partially_ok',
    statusUrdu: 'جزوی موافق',
    statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
    verdictTitleUrdu: 'جزوی موافق - صبر اور سمجھوتہ ضروری ہے',
    verdictEnglish: 'Partially ok',
    detailUrdu: 'اسد شان و شوکت چاہتا ہے جبکہ جدی سادگی۔ اگر میانہ روی اختیار کریں تو نباہ ہوگا۔',
    remedyUrdu: 'درود شریف پڑھیں۔'
  },
  '5-11': {
    r1: 5, r2: 11,
    status: 'ok',
    statusUrdu: 'بہترین موافق',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - محبت اور باہمی تعاون',
    verdictEnglish: 'Ok',
    detailUrdu: 'اسد اور دلو ایک دوسرے کی کشش سے مسحور رہیں گے۔ خوب نبھے گی۔',
    remedyUrdu: 'شکرانہ ادا کریں۔'
  },
  '5-12': {
    r1: 5, r2: 12,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - شعلہ اور دریا کا تصادم',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'حوت اسد کے دباؤ کو برداشت نہیں کر پائے گا۔ فاصلے بڑھیں گے۔',
    remedyUrdu: 'صدقہ دیں۔'
  },

  // 6
  '6-6': {
    r1: 6, r2: 6,
    status: 'ok',
    statusUrdu: 'بہترین موافق (دونوں سنبلہ)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - بااصول اور پاکیزہ زندگی',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں منظم، محنتی اور سلیقہ مند ہیں۔ مالی استحکام اور پرسکون گھریلو زندگی نصیب ہوگی۔',
    remedyUrdu: 'اللہ کا شکر ادا کریں۔'
  },
  '6-7': {
    r1: 6, r2: 7,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - تنقید بمقابلہ بے فکری',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'سنبلہ کا عیب نکالنا میزان کی نازک طبیعت کو ناگوار گزرے گا۔ اختلافات رہیں گے۔',
    remedyUrdu: 'استخارہ کریں۔'
  },
  '6-8': {
    r1: 6, r2: 8,
    status: 'ok',
    statusUrdu: 'بہترین موافق (مٹی اور پانی)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - وفاداری اور راز داری',
    verdictEnglish: 'Ok',
    detailUrdu: 'سنبلہ کی عملی ذہانت اور عقرب کی گہری محبت ایک مضبوط قلعہ تعمیر کریں گی۔',
    remedyUrdu: 'دعائے خیر کریں۔'
  },
  '6-9': {
    r1: 6, r2: 9,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - تفصیلی سوچ بمقابلہ لاپرواہی',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'قوس کا کھلے ہاتھ خرچ کرنا سنبلہ کے اصولوں کے خلاف ہوگا، تکرار رہے گی۔',
    remedyUrdu: 'صدقہ نکالیں۔'
  },
  '6-10': {
    r1: 6, r2: 10,
    status: 'conditional',
    statusUrdu: 'شادی کے کچھ عرصہ بعد موافق',
    statusColor: 'bg-purple-100 text-purple-900 border-purple-300',
    verdictTitleUrdu: 'شادی کے کچھ وقت بعد عمدہ موافقت قائم ہوگی',
    verdictEnglish: 'Ok after some time of marriage',
    detailUrdu: 'دونوں خاکی ہیں، شروع میں رسمیت رہے گی مگر وقت کے ساتھ ساتھ باہمی قدر اور محبت کی جڑیں گہری ہو جائیں گی۔',
    remedyUrdu: 'صبر اور میٹھی زبان کی عادت ڈالیں۔'
  },
  '6-11': {
    r1: 6, r2: 11,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - عملی بمقابلہ خیالی دنیا',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'دلو کی اڑان اور سنبلہ کا زمینی حقائق پر اصرار تناؤ کا سبب بنے گا۔',
    remedyUrdu: 'استخارہ کریں۔'
  },
  '6-12': {
    r1: 6, r2: 12,
    status: 'ok',
    statusUrdu: 'بہترین موافق (مٹی اور پانی)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - متمم اور معاون جوڑی',
    verdictEnglish: 'Ok',
    detailUrdu: 'سنبلہ حوت کو عملی سہارا دے گا اور حوت سنبلہ کی زندگی میں محبت کی چاشنی گھولے گا۔',
    remedyUrdu: 'شکرانہ ادا کریں۔'
  },

  // 7
  '7-7': {
    r1: 7, r2: 7,
    status: 'ok',
    statusUrdu: 'بہترین موافق (دونوں میزان)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - امن، صلح اور نزاکت',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں زہرہ کے زیرِ اثر اور بادی ہیں۔ گھر میں خوبصورتی، محبت اور سلیقہ مندی رہے گی۔',
    remedyUrdu: 'الحمد للہ پڑھیں۔'
  },
  '7-8': {
    r1: 7, r2: 8,
    status: 'partially_ok',
    statusUrdu: 'جزوی موافق',
    statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
    verdictTitleUrdu: 'جزوی موافق - بدگمانی سے بچاؤ ضروری ہے',
    verdictEnglish: 'Partially ok',
    detailUrdu: 'میزان کی ملنساری عقرب کے اندر شک پیدا کر سکتی ہے۔ اگر سچائی اور صفائی رکھی جائے تو نباہ ہو جائے گا۔',
    remedyUrdu: 'یا حفیظ کا ورد رکھیں۔'
  },
  '7-9': {
    r1: 7, r2: 9,
    status: 'partially_ok',
    statusUrdu: 'جزوی موافق',
    statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
    verdictTitleUrdu: 'جزوی موافق - خوش گوار مگر مالی نظم و ضبط لازم ہے',
    verdictEnglish: 'Partially ok',
    detailUrdu: 'ہوا اور آگ کا رشتہ ہے۔ دونوں خوش مزاج ہیں لیکن غیر سنجیدگی سے گھر کے معاملات متاثر ہو سکتے ہیں۔',
    remedyUrdu: 'مشاورت سے کام لیں۔'
  },
  '7-10': {
    r1: 7, r2: 10,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - رومان بمقابلہ سختی',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'میزان نرمی اور ناز نخرے پسند کرتا ہے جبکہ جدی سخت گیر اور خشک مزاج ہے۔ مطابقت دشوار ہے۔',
    remedyUrdu: 'صدقہ نکالیں۔'
  },
  '7-11': {
    r1: 7, r2: 11,
    status: 'ok',
    statusUrdu: 'بہترین موافق (مثالی رشتہ)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - مکمل فکری ہم آہنگی اور سکون',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں بادی اور زہرہ و زحل کے اعتدال پر ہیں۔ جیسے مثال میں علی اور حنا کا جوڑ ۷ اور ۱۱ تھا۔ یہ رشتہ محبت اور باہمی عزت سے سرشار رہے گا۔',
    remedyUrdu: 'ماشاءاللہ لا حول ولا قوۃ الا باللہ کا ورد کریں۔'
  },
  '7-12': {
    r1: 7, r2: 12,
    status: 'partially_ok',
    statusUrdu: 'جزوی موافق',
    statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
    verdictTitleUrdu: 'جزوی موافق - رومانوی مگر عملی طور پر محتاط رہیں',
    verdictEnglish: 'Partially ok',
    detailUrdu: 'دونوں امن پسند ہیں لیکن فیصلے کرنے میں ہچکچاہٹ کی وجہ سے الجھنیں آ سکتی ہیں۔',
    remedyUrdu: 'یا وکیل کا ورد کریں۔'
  },

  // 8
  '8-8': {
    r1: 8, r2: 8,
    status: 'ok',
    statusUrdu: 'بہترین موافق (دونوں عقرب)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - وفاداری اور بے پناہ خلوص',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں آبی اور مریخی ہیں۔ غیرت، وفا اور ایثار میں بے مثال ہوں گے۔ ایک دوسرے کے محافظ بنیں گے۔',
    remedyUrdu: 'شکر ادا کریں۔'
  },
  '8-9': {
    r1: 8, r2: 9,
    status: 'conditional',
    statusUrdu: 'موافق مگر اولاد سے مسائل کا خطرہ',
    statusColor: 'bg-orange-100 text-orange-900 border-orange-300',
    verdictTitleUrdu: 'نکاح موافق ہے مگر اولاد کے حوالے سے شدید مسائل و پریشانی کا اندیشہ ہے',
    verdictEnglish: 'Marriage Ok, but extreme problems due to children',
    detailUrdu: 'میاں بیوی میں محبت رہے گی لیکن اولاد کی تربیت، بیماری یا اولاد کی وجہ سے گھریلو پریشانیاں پیش آ سکتی ہیں جن پر صبر کرنا ہوگا۔',
    remedyUrdu: 'حصولِ اولاد اور ان کی حفاظت کے لیے روزانہ سورۃ الصافات کی تلاوت اور صدقہ کا اہتمام رکھیں۔'
  },
  '8-10': {
    r1: 8, r2: 10,
    status: 'ok',
    statusUrdu: 'بہترین موافق (پانی اور مٹی)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - چٹان کی طرح مضبوط رشتہ',
    verdictEnglish: 'Ok',
    detailUrdu: 'عقرب کا جذبہ اور جدی کا پختہ عزم مل کر ایک باوقار اور پرسکون خاندان تشکیل دیں گے۔',
    remedyUrdu: 'شکرانہ پڑھیں۔'
  },
  '8-11': {
    r1: 8, r2: 11,
    status: 'partially_ok',
    statusUrdu: 'جزوی موافق',
    statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
    verdictTitleUrdu: 'جزوی موافق - بد اعتمادی سے اجتناب ضروری ہے',
    verdictEnglish: 'Partially ok',
    detailUrdu: 'عقرب کی شدت اور دلو کا آزادی پسند رویہ کبھی کبھار کشمکش لاتا ہے۔ اگر حدود طے ہوں تو نباہ ممکن ہے۔',
    remedyUrdu: 'یا سلام کا ورد رکھیں۔'
  },
  '8-12': {
    r1: 8, r2: 12,
    status: 'ok',
    statusUrdu: 'بہترین موافق (دونوں آبی)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - دلی سکون اور بے پایاں الفت',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں آبی برج ہیں، ایک دوسرے کی بات بن کہے سمجھ لیں گے۔ رشتہ نہایت پرسکون رہے گا۔',
    remedyUrdu: 'الحمد للہ پڑھیں۔'
  },

  // 9
  '9-9': {
    r1: 9, r2: 9,
    status: 'ok',
    statusUrdu: 'بہترین موافق (دونوں قوس)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - فیاضی، سچائی اور شادمانی',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں مشتری کے زیرِ اثر اور آتشی ہیں۔ خوش مزاج، مہم جو اور سخاوت کے پیکر ثابت ہوں گے۔',
    remedyUrdu: 'شکر ادا کریں۔'
  },
  '9-10': {
    r1: 9, r2: 10,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - بے فکری بمقابلہ سنجیدگی',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'قوس کے خطرات مول لینے کی عادت جدی کے لیے ناقابلِ قبول ہوگی۔ نباہ میں رکاوٹیں آئیں گی۔',
    remedyUrdu: 'استخارہ کریں۔'
  },
  '9-11': {
    r1: 9, r2: 11,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - عدم ثبات اور بے ترتیبی',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'گھریلو ذمہ داریوں کو سنبھالنے میں دونوں غفلت برت سکتے ہیں جس سے مالی و ازدواجی خلل پڑے گا۔',
    remedyUrdu: 'صدقہ نکالیں۔'
  },
  '9-12': {
    r1: 9, r2: 12,
    status: 'not_ok',
    statusUrdu: 'ناموافق (آگ اور پانی)',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - عنصری اور مزاجی تصادم',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'قوس کا بے باک انداز حوت کو رنجیدہ کر سکتا ہے۔ گہری الفت پیدا ہونا مشکل ہے۔',
    remedyUrdu: 'استخارہ کریں۔'
  },

  // 10
  '10-10': {
    r1: 10, r2: 10,
    status: 'ok',
    statusUrdu: 'بہترین موافق (دونوں جدی)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - پائیداری اور خاندانی وقار',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں زحل کے زیرِ اثر اور خاکی ہیں۔ صبر، استقامت اور محنت سے مثالی خاندان قائم کریں گے۔',
    remedyUrdu: 'الحمد للہ پڑھیں۔'
  },
  '10-11': {
    r1: 10, r2: 11,
    status: 'ok',
    statusUrdu: 'بہترین موافق (دونوں زحلی)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - باہمی ہمدردی اور وفا',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں زحل کے حاکمیت میں ہیں۔ ایک دوسرے کے مقاصد میں معاون بن کر خوشحالی لائیں گے۔',
    remedyUrdu: 'شکر ادا کریں۔'
  },
  '10-12': {
    r1: 10, r2: 12,
    status: 'ok',
    statusUrdu: 'بہترین موافق (مٹی اور پانی)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - تحفظ اور محبت کا سنگم',
    verdictEnglish: 'Ok',
    detailUrdu: 'جدی کا مضبوط سہارا حوت کے خوابوں کو سچ کرے گا۔ پرامن زندگی بسر ہوگی۔',
    remedyUrdu: 'دعائے خیر کریں۔'
  },

  // 11
  '11-11': {
    r1: 11, r2: 11,
    status: 'ok',
    statusUrdu: 'بہترین موافق (دونوں دلو)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - مخلصانہ دوستی اور روحانی وابستگی',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں بادی اور زحل کے زیرِ اثر ہیں۔ بلند افکار اور پرسکون رشتہ ہوگا۔',
    remedyUrdu: 'شکرانہ ادا کریں۔'
  },
  '11-12': {
    r1: 11, r2: 12,
    status: 'not_ok',
    statusUrdu: 'ناموافق',
    statusColor: 'bg-rose-100 text-rose-900 border-rose-300',
    verdictTitleUrdu: 'ناموافق - ہوا اور پانی کی بے ربطی',
    verdictEnglish: 'Not Ok',
    detailUrdu: 'دلو کا منطقی اور بے نیاز رویہ حوت کی جذباتی پیاس نہ بجھا سکے گا، دل شکستگی کا اندیشہ ہے۔',
    remedyUrdu: 'استخارہ کریں۔'
  },

  // 12
  '12-12': {
    r1: 12, r2: 12,
    status: 'ok',
    statusUrdu: 'بہترین موافق (دونوں حوت)',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'بہترین موافق - پرخلوص محبت اور روحانی سکون',
    verdictEnglish: 'Ok',
    detailUrdu: 'دونوں مشتری کے فیض یافتہ اور آبی ہیں۔ بے لوث قربانی اور گہری چاہت سے گھر کو جنت بنائیں گے۔',
    remedyUrdu: 'ماشاءاللہ پڑھ کر شکر ادا کریں۔'
  }
};

// Helper to look up rule regardless of order
export function getZaichaMatch(r1: number, r2: number): ZaichaMatchRule {
  const norm1 = r1 === 0 ? 12 : r1;
  const norm2 = r2 === 0 ? 12 : r2;
  const min = Math.min(norm1, norm2);
  const max = Math.max(norm1, norm2);
  const key = `${min}-${max}`;
  
  if (ZAICHA_RULES_MAP[key]) {
    return ZAICHA_RULES_MAP[key];
  }
  
  // Fallback default
  return {
    r1: min,
    r2: max,
    status: 'ok',
    statusUrdu: 'موافق',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    verdictTitleUrdu: 'موافق رشتہ',
    verdictEnglish: 'Ok',
    detailUrdu: 'طریقۂ جفریہ کے تحت رشتہ میں مناسبت پائی جاتی ہے۔',
    remedyUrdu: 'نماز و تلاوت اور دعائے خیر کا اہتمام رکھیں۔'
  };
}

// Elemental Compatibility Details
export function getElementalCompatibility(el1: 'fire' | 'air' | 'water' | 'earth', el2: 'fire' | 'air' | 'water' | 'earth'): {
  status: 'excellent' | 'good' | 'neutral' | 'bad';
  titleUrdu: string;
  descUrdu: string;
} {
  if ((el1 === 'fire' && el2 === 'water') || (el1 === 'water' && el2 === 'fire')) {
    return {
      status: 'bad',
      titleUrdu: 'آگ اور پانی (شدید متضاد و دشمن عناصر)',
      descUrdu: 'پانی آگ کو گل کر دیتا ہے اور آگ پانی کو ابال کر بخارات بنا دیتی ہے۔ دونوں کے درمیان مسلسل ضد اور تناؤ پیدا ہونے کا قوی اندیشہ ہے۔'
    };
  }
  if ((el1 === 'fire' && el2 === 'earth') || (el1 === 'earth' && el2 === 'fire')) {
    return {
      status: 'neutral',
      titleUrdu: 'آگ اور مٹی (نیم سازگار عنصر)',
      descUrdu: 'آگ مٹی کو گرم کرتی ہے لیکن زیادہ تپش سے مٹی بنجر ہو سکتی ہے۔ صبر اور اعتدال سے نباہ ممکن ہے۔'
    };
  }
  if ((el1 === 'fire' && el2 === 'air') || (el1 === 'air' && el2 === 'fire')) {
    return {
      status: 'excellent',
      titleUrdu: 'آگ اور ہوا (نہایت تقویت بخش و موافق)',
      descUrdu: 'ہوا آگ کو بھڑکاتی اور زندگی بخشتی ہے۔ دونوں فریقین ایک دوسرے کی حوصلہ افزائی کریں گے اور زندگی پررونق رہے گی۔'
    };
  }
  if ((el1 === 'water' && el2 === 'earth') || (el1 === 'earth' && el2 === 'water')) {
    return {
      status: 'excellent',
      titleUrdu: 'پانی اور مٹی (زرخیز و انتہائی مبارک)',
      descUrdu: 'پانی مٹی کو سیراب کر کے گل و گلزار بناتا ہے۔ یہ جوڑ محبت، افزائشِ نسل، رزق اور گھریلو خوشحالی کے لیے بے حد مبارک ہے۔'
    };
  }
  if ((el1 === 'water' && el2 === 'air') || (el1 === 'air' && el2 === 'water')) {
    return {
      status: 'good',
      titleUrdu: 'پانی اور ہوا (سازگار و معتدل)',
      descUrdu: 'ہوا پانی پر لہریں پیدا کرتی ہے۔ رشتہ میں تازگی اور گفتگو رہے گی، بشرطیکہ جذبات کو مجروح نہ کیا جائے۔'
    };
  }
  if ((el1 === 'air' && el2 === 'earth') || (el1 === 'earth' && el2 === 'air')) {
    return {
      status: 'neutral',
      titleUrdu: 'ہوا اور مٹی (متضاد فکری سوچ)',
      descUrdu: 'ہوا گرد اڑاتی ہے اور مٹی ٹھہراؤ چاہتی ہے۔ ایک فریق روایتی اور دوسرا آزاد خیال ہوگا جس کے لیے باہمی سمجھوتہ لازم ہے۔'
    };
  }
  if (el1 === el2) {
    return {
      status: 'excellent',
      titleUrdu: `ہم عنصر (${el1 === 'fire' ? 'دونوں آتشی' : el1 === 'water' ? 'دونوں آبی' : el1 === 'air' ? 'دونوں بادی' : 'دونوں خاکی'})`,
      descUrdu: 'دونوں افراد کی باطنی ساخت ایک جیسی ہے۔ سوچ، جذبات اور فطری ترجیحات میں یکسانیت پائی جاتی ہے۔'
    };
  }

  return {
    status: 'good',
    titleUrdu: 'معتدل عنصری موافقت',
    descUrdu: 'عنصری اثرات میں باہمی مناسبت پائی جاتی ہے۔'
  };
}
