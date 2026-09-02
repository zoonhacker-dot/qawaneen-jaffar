// -------------------------------------------------------------
// Lunar Phase & Hijri Planetary Influence Calculator
// Formulated according to Kash Al-Barni's Treatises
// (قوانین طلسم، مفتاح الجفر، منازل القمر و احکام کواکب)
// -------------------------------------------------------------

import { LunarPhaseInfo } from '../types';

export const HIJRI_MONTHS = [
  { num: 1, nameUrdu: 'محرم الحرام', nature: 'حرمت و برکت' },
  { num: 2, nameUrdu: 'صفر المظفر', nature: 'احتیاط و صدقات' },
  { num: 3, nameUrdu: 'ربیع الاول', nature: 'سعدِ اکبر و ولادتِ انوار' },
  { num: 4, nameUrdu: 'ربیع الثانی', nature: 'برکت و فیوضاتِ غوثیہ' },
  { num: 5, nameUrdu: 'جمادی الاولیٰ', nature: 'ثبات و استقامت' },
  { num: 6, nameUrdu: 'جمادی الاخریٰ', nature: 'تسخیر و فتح' },
  { num: 7, nameUrdu: 'رجب المرجب', nature: 'شہر اللہ و اجابتِ دعا' },
  { num: 8, nameUrdu: 'شعبان المعظم', nature: 'انوار و تقسیمِ ارزاق' },
  { num: 9, nameUrdu: 'رمضان المبارک', nature: 'سید الشہور و نزولِ قرآن' },
  { num: 10, nameUrdu: 'شوال المکرم', nature: 'عید و مسرت' },
  { num: 11, nameUrdu: 'ذو القعدۃ الحرام', nature: 'حرمت و سکینت' },
  { num: 12, nameUrdu: 'ذو الحجۃ الحرام', nature: 'حج و ایامِ معلومات' },
];

// 28 Classical Lunar Mansions (منازل القمر) according to Kash Al-Barni
export const LUNAR_MANSIONS = [
  { number: 1, nameArabic: 'الشرطان', nameUrdu: 'الشرطان (دو سینگ)', meaningUrdu: 'سرعت، ابتدا اور تجدیدِ نیت', rulingElementUrdu: 'آتشی' },
  { number: 2, nameArabic: 'البطين', nameUrdu: 'البطین (پیٹ)', meaningUrdu: 'دفینہ، راز داری اور حصولِ مال', rulingElementUrdu: 'خاکی' },
  { number: 3, nameArabic: 'الثريا', nameUrdu: 'الثریا (پروین)', meaningUrdu: 'سعدِ اعظم، محبت، رونق اور شفا', rulingElementUrdu: 'بادی' },
  { number: 4, nameArabic: 'الدبران', nameUrdu: 'الدبران (پیچھے آنے والا)', meaningUrdu: 'ہیبت، تسخیرِ شجاعان اور جلال', rulingElementUrdu: 'آتشی' },
  { number: 5, nameArabic: 'الهقعة', nameUrdu: 'الهقعہ (سفید داغ)', meaningUrdu: 'حصولِ علم، سفرِ مبارک اور کشائش', rulingElementUrdu: 'بادی' },
  { number: 6, nameArabic: 'الهنعة', nameUrdu: 'الهنعہ (خمیدہ گردن)', meaningUrdu: 'الفت، صلح اور تسخیرِ قلوب', rulingElementUrdu: 'آبی' },
  { number: 7, nameArabic: 'الذراع', nameUrdu: 'الذراع (بازو)', meaningUrdu: 'نصرت، غلبہ اور فتحِ مقدمات', rulingElementUrdu: 'آتشی' },
  { number: 8, nameArabic: 'النثرة', nameUrdu: 'النثرہ (ناک کا پُھلاؤ)', meaningUrdu: 'امن و امان، صحت اور شفا', rulingElementUrdu: 'آبی' },
  { number: 9, nameArabic: 'الطرف', nameUrdu: 'الطرف (چشمِ شیر)', meaningUrdu: 'دفعِ حاسدین اور زبان بندی', rulingElementUrdu: 'آتشی' },
  { number: 10, nameArabic: 'الجبهة', nameUrdu: 'الجبهہ (پیشانی)', meaningUrdu: 'عزت، وجاہت اور قربِ حکام', rulingElementUrdu: 'آتشی' },
  { number: 11, nameArabic: 'الزبرة', nameUrdu: 'الزبرہ (شیر کے شانے)', meaningUrdu: 'قوت، ہمت اور بندشِ اعداء', rulingElementUrdu: 'خاکی' },
  { number: 12, nameArabic: 'الصرفة', nameUrdu: 'الصرفہ (تبدیلی)', meaningUrdu: 'تغییرِ احوال اور خاتمۂ نحوست', rulingElementUrdu: 'بادی' },
  { number: 13, nameArabic: 'العواء', nameUrdu: 'العواء (پکارنے والا)', meaningUrdu: 'تجارت، سوداگری اور نفع', rulingElementUrdu: 'خاکی' },
  { number: 14, nameArabic: 'السماك', nameUrdu: 'السماک الاعزل (بلند ستارہ)', meaningUrdu: 'دولت، ازدواج اور رشتۂ مبارک', rulingElementUrdu: 'بادی' },
  { number: 15, nameArabic: 'الغفر', nameUrdu: 'الغفر (پوشیدگی)', meaningUrdu: 'حفاظت، اخفائے اسرار اور حصار', rulingElementUrdu: 'آبی' },
  { number: 16, nameArabic: 'الزبانا', nameUrdu: 'الزبانی (ترازو کے پلڑے)', meaningUrdu: 'انصاف، توازن اور صلح', rulingElementUrdu: 'بادی' },
  { number: 17, nameArabic: 'الإكليل', nameUrdu: 'الاکلیل (تاجِ شاہی)', meaningUrdu: 'بلندیٔ مراتب، جاہ و منصب', rulingElementUrdu: 'آبی' },
  { number: 18, nameArabic: 'القلب', nameUrdu: 'القلب (قلب العقرب)', meaningUrdu: 'رعب، دبدبہ اور دفعِ فتنہ', rulingElementUrdu: 'آتشی' },
  { number: 19, nameArabic: 'الشولة', nameUrdu: 'الشولہ (بچھو کا ڈنک)', meaningUrdu: 'ابطالِ سحر اور علاجِ سموم', rulingElementUrdu: 'آتشی' },
  { number: 20, nameArabic: 'النعائم', nameUrdu: 'النعائم (شتر مرغ)', meaningUrdu: 'فراخیٔ رزق، مویشی و زراعت', rulingElementUrdu: 'آتشی' },
  { number: 21, nameArabic: 'البلدة', nameUrdu: 'البلدہ (خالی میدان)', meaningUrdu: 'تعمیرِ مکان، سکونت اور ثبات', rulingElementUrdu: 'خاکی' },
  { number: 22, nameArabic: 'سعد الذابح', nameUrdu: 'سعد الذابح (سعدِ قربانی)', meaningUrdu: 'شفا از امراضِ حادہ اور نجات', rulingElementUrdu: 'خاکی' },
  { number: 23, nameArabic: 'سعد بلع', nameUrdu: 'سعد بلع (سعدِ جذب)', meaningUrdu: 'جذبِ قلوب اور ادویات کی تاثیر', rulingElementUrdu: 'بادی' },
  { number: 24, nameArabic: 'سعد السعود', nameUrdu: 'سعد السعود (سعادتوں کا سردار)', meaningUrdu: 'سعدِ اکبر، نکاح، خیرِ محض اور ترقی', rulingElementUrdu: 'بادی' },
  { number: 25, nameArabic: 'سعد الأخبية', nameUrdu: 'سعد الاخبیہ (پوشیدہ خیمے)', meaningUrdu: 'کشفِ رموز، اخراجِ دفائن اور اسرار', rulingElementUrdu: 'آبی' },
  { number: 26, nameArabic: 'فرغ الدلو المقدم', nameUrdu: 'المقدم (پہلا ڈول)', meaningUrdu: 'محبت، الفت اور بارشِ رحمت', rulingElementUrdu: 'آتشی' },
  { number: 27, nameArabic: 'فرغ الدلو المؤخر', nameUrdu: 'المؤخر (دوسرا ڈول)', meaningUrdu: 'کامیابی، استحکام اور وسعتِ معاش', rulingElementUrdu: 'آبی' },
  { number: 28, nameArabic: 'الرشاء', nameUrdu: 'الرشاء / بطن الحوت (مچھلی کا پیٹ)', meaningUrdu: 'وفورِ نعمت، صلح و اختتامِ بخیر', rulingElementUrdu: 'آبی' },
];

/**
 * Approximate Hijri Date conversion from Gregorian date.
 * Uses Kuwaiti algorithm variant with high precision for lunar phase mapping.
 */
export function getHijriDateDetails(date: Date = new Date()): {
  hijriDay: number;
  hijriMonth: number;
  hijriYear: number;
  hijriMonthNameUrdu: string;
} {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let m = month + 1;
  let y = year;
  if (m < 3) {
    y -= 1;
    m += 12;
  }

  let a = Math.floor(y / 100);
  let b = 2 - a + Math.floor(a / 4);
  if (y < 1583) b = 0;
  if (y === 1582) {
    if (m > 10) b = -10;
    if (m === 10) {
      b = 0;
      if (day > 4) b = -10;
    }
  }

  const jd =
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    b -
    1524;

  const z = jd - 1948440 + 10632;
  const n = Math.floor((z - 1) / 10631);
  const z1 = z - 10631 * n + 354;
  const j =
    Math.floor((10985 - z1) / 5316) * Math.floor((50 * z1) / 17719) +
    Math.floor(z1 / 5670) * Math.floor((43 * z1) / 15238);
  const z2 =
    z1 -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  const mH = Math.floor((24 * z2) / 709);
  const dH = z2 - Math.floor((709 * mH) / 24);
  const yH = 30 * n + j - 30;

  const hijriMonthIdx = Math.max(1, Math.min(12, mH));
  const hijriDayVal = Math.max(1, Math.min(30, dH));

  return {
    hijriDay: hijriDayVal,
    hijriMonth: hijriMonthIdx,
    hijriYear: yH,
    hijriMonthNameUrdu: HIJRI_MONTHS[hijriMonthIdx - 1]?.nameUrdu || 'محرم الحرام',
  };
}

/**
 * Calculates Moon Illumination, Spiritual Potency, and Kash Al-Barni's Work Rules
 */
export function calculateLunarPhaseAndSpiritualInfluence(
  overrideHijriDay?: number,
  overrideHijriMonth?: number,
  baseDate: Date = new Date()
): LunarPhaseInfo {
  const currentHijri = getHijriDateDetails(baseDate);
  const hijriDay = overrideHijriDay !== undefined ? overrideHijriDay : currentHijri.hijriDay;
  const hijriMonth = overrideHijriMonth !== undefined ? overrideHijriMonth : currentHijri.hijriMonth;
  const hijriYear = currentHijri.hijriYear;

  // Determine Lunar Phase & Illumination Percentage
  let phaseNameUrdu = '';
  let phaseNameEnglish = '';
  let phaseCategory: LunarPhaseInfo['phaseCategory'] = 'waxing_crescent';
  let moonIlluminationPercent = 0;
  let spiritualPotency: LunarPhaseInfo['spiritualPotency'] = 'high_saad';
  let spiritualPotencyUrdu = '';

  if (hijriDay === 1 || hijriDay === 2) {
    phaseNameUrdu = 'ہلالِ نو (رویتِ ہلال و آغازِ ماہ)';
    phaseNameEnglish = 'New Crescent Moon';
    phaseCategory = 'waxing_crescent';
    moonIlluminationPercent = Math.round((hijriDay / 14) * 50);
    spiritualPotency = 'high_saad';
    spiritualPotencyUrdu = 'سعد و تجدیدِ عزم (ابتداءِ اعمالِ خیر)';
  } else if (hijriDay >= 3 && hijriDay <= 7) {
    phaseNameUrdu = 'تربیعِ اول (ہلالِ متزاید)';
    phaseNameEnglish = 'Waxing Crescent';
    phaseCategory = 'waxing_crescent';
    moonIlluminationPercent = Math.round((hijriDay / 14) * 50);
    spiritualPotency = 'high_saad';
    spiritualPotencyUrdu = 'سعدِ قوی برائے ترقی و وسعت';
  } else if (hijriDay >= 8 && hijriDay <= 12) {
    phaseNameUrdu = 'احدبِ متزاید (قوتِ قمر)';
    phaseNameEnglish = 'Waxing Gibbous';
    phaseCategory = 'waxing_gibbous';
    moonIlluminationPercent = Math.round(50 + ((hijriDay - 7) / 7) * 45);
    spiritualPotency = 'supreme_saad';
    spiritualPotencyUrdu = 'سعدِ اکبر و کمالِ رغبت';
  } else if (hijriDay >= 13 && hijriDay <= 15) {
    phaseNameUrdu = 'ماہِ کامل / بدرِ منور (ایامِ بیض)';
    phaseNameEnglish = 'Full Moon (Ayyam al-Beed)';
    phaseCategory = 'full_moon';
    moonIlluminationPercent = 100;
    spiritualPotency = 'supreme_saad';
    spiritualPotencyUrdu = 'سعدِ اعظم (اوجِ کمالِ روحانی و تسخیر)';
  } else if (hijriDay >= 16 && hijriDay <= 21) {
    phaseNameUrdu = 'احدبِ متناقص (نزولِ نور)';
    phaseNameEnglish = 'Waning Gibbous';
    phaseCategory = 'waning_gibbous';
    moonIlluminationPercent = Math.round(100 - ((hijriDay - 15) / 6) * 45);
    spiritualPotency = 'neutral_medium';
    spiritualPotencyUrdu = 'معتدل برائے تسکین و شفا';
  } else if (hijriDay >= 22 && hijriDay <= 27) {
    phaseNameUrdu = 'تربیعِ ثانی و ہلالِ متناقص';
    phaseNameEnglish = 'Waning Crescent';
    phaseCategory = 'waning_crescent';
    moonIlluminationPercent = Math.round(50 - ((hijriDay - 21) / 7) * 45);
    spiritualPotency = 'neutral_medium';
    spiritualPotencyUrdu = 'موزوں برائے دفعِ بلایات و سحر';
  } else {
    phaseNameUrdu = 'محاق و تحت الشعاع (اختتامِ ماہ)';
    phaseNameEnglish = 'Dark Moon (Mahq / Under the Rays)';
    phaseCategory = 'nahs_mahq';
    moonIlluminationPercent = 2;
    spiritualPotency = 'nahs_restraint';
    spiritualPotencyUrdu = 'توقف و احتیاط (نحسِ محاق)';
  }

  // Determine Lunar Mansion (28 mansions cycle)
  const mansionIndex = ((hijriDay - 1) % 28);
  const manzil = LUNAR_MANSIONS[mansionIndex] || LUNAR_MANSIONS[0];

  // Kash Al-Barni's Work Recommendations based on Hijri Date & Moon State
  let recommendedWorks: string[] = [];
  let restrictedWorks: string[] = [];
  let kashAlBarniLunarRule = '';
  let auspiciousSaat = '';
  let recommendedIncense = '';
  let recommendedIsm = '';
  let recommendedVerse = '';

  if (hijriDay >= 1 && hijriDay <= 14) {
    // Waxing Moon (نورِ متزاید)
    recommendedWorks = [
      'کتابتِ نقوشِ محبت، الفت، نکاح و عقد',
      'اعمالِ وسعتِ رزق، تجارت، دکان و ملازمت',
      'لوحِ تسخیرِ قلوب و جلبِ خلائق',
      'تکسیرِ اسمائے حسنیٰ برائے شفا و فراخی',
      'عہد نامہ و نئے معاہدات کی ابتدا',
    ];
    restrictedWorks = [
      'اعمالِ تفریق، عدادت و بغض',
      'حصارِ جلالی برائے ہلاکت',
      'دفنِ نقوش برائے زبان بندیِ شدید',
    ];
    kashAlBarniLunarRule =
      'کاش البرنی (قوانین طلسم): "جب چاند ہلال سے بدر کی جانب بڑھ رہا ہو تو عالمِ سفلی میں قوتِ نمو اور کشش اپنے عروج پر ہوتی ہے۔ پس اس نصفِ اول میں تمام اعمالِ خیر، محبت، فراخیٔ رزق اور ترقی کے نقوش لکھے جائیں تو فی الفور موثر ہوتے ہیں۔"';
    auspiciousSaat = 'ساعتِ مشتری و ساعتِ زہرہ (بوقتِ طلوعِ آفتاب و بعد ظہر)';
    recommendedIncense = 'صندل سفید، زعفران، عودِ ہندی، لوبانِ نر';
    recommendedIsm = 'یا فتاح یا رزاق یا ودود یا لطیف';
    recommendedVerse = 'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ ۚ لَوْ أَنفَقْتَ مَا فِي الْأَرْضِ جَمِيعًا مَّا أَلَّفْتَ بَيْنَ قُلُوبِهِمْ';
  } else if (hijriDay >= 15 && hijriDay <= 27) {
    // Waning Moon (نورِ متناقص)
    recommendedWorks = [
      'ابطالِ سحر، دفعِ نظرِ بد و جنات',
      'علاجِ امراضِ مزمنہ و جلاوتِ خون',
      'زبان بندیِ بدخواہان و حاسدین',
      'اعمالِ خلاصی از قید و قرض',
      'حصارِ عظیم برائے جان و مال',
    ];
    restrictedWorks = [
      'اعمالِ عقدِ نکاح و شادی کی تاریخ طے کرنا',
      'نئے کاروبار کی افتتاح یا دکان ڈالنا',
      'سوداگروں کے ساتھ شراکت داری کا آغاز',
    ];
    kashAlBarniLunarRule =
      'کاش البرنی (مفتاح الجفر): "جب چاند گھٹنے لگے تو امراض، برائیوں، سحر اور نقائص کو زائل کرنے کا وقت ہوتا ہے۔ جو نقش امراض کے خاتمے یا دشمن کی بد زبانی بند کرنے کے لیے لکھا جائے وہ اس دور میں تیر بہدف ثابت ہوتا ہے۔"';
    auspiciousSaat = 'ساعتِ مریخ و ساعتِ زحل (بوقتِ غروب یا ثلثِ اخیرِ شب)';
    recommendedIncense = 'حرمل (اسپند)، کلونجی، رائی، گندھک، مصطگی';
    recommendedIsm = 'یا مانع یا ضار یا قہار یا سلام';
    recommendedVerse = 'فَوَقَعَ الْحَقُّ وَبَطَلَ مَا كَانُوا يَعْمَلُونَ • قُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ';
  } else {
    // Days 28, 29, 30: Dark Moon (تحت الشعاع و محاق)
    recommendedWorks = [
      'کثرتِ استغفار و توبۂ نصوح',
      'صدقہ برائے ردِ بلایات و حوادث',
      'تلاوتِ کلام پاک و درودِ تاج',
      'تنہائی، ریاضت و محاسبۂ نفس',
    ];
    restrictedWorks = [
      'ہر قسم کے نقوش و طلسمات کی کتابت',
      'عقدِ نکاح و رخصتی',
      'سفر کی ابتدا یا بڑی سرمایہ کاری',
    ];
    kashAlBarniLunarRule =
      'کاش البرنی (رموز الجفر): "محاق اور تحت الشعاع کے ایام میں چاند سورج کی شعاعوں میں پوشیدہ ہوتا ہے جس سے فلکی نحوست کا شائبہ رہتا ہے۔ ان دنوں میں قلم نہ اٹھائیں، صرف صدقہ و استغفار پر اکتفا کریں۔"';
    auspiciousSaat = 'صرف نمازِ پنجگانہ کے بعد کے اوقات';
    recommendedIncense = 'صرف لوبان و عود برائے تلاوت';
    recommendedIsm = 'یا غفور یا رحیم یا حلیم یا ستار';
    recommendedVerse = 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ';
  }

  return {
    hijriDay,
    hijriMonthNameUrdu: HIJRI_MONTHS[hijriMonth - 1]?.nameUrdu || 'محرم الحرام',
    hijriMonthNumber: hijriMonth,
    hijriYear,
    phaseNameEnglish,
    phaseNameUrdu,
    phaseCategory,
    moonIlluminationPercent,
    spiritualPotency,
    spiritualPotencyUrdu,
    manzilAlQamar: {
      number: manzil.number,
      nameUrdu: manzil.nameUrdu,
      nameArabic: manzil.nameArabic,
      meaningUrdu: manzil.meaningUrdu,
      rulingElementUrdu: manzil.rulingElementUrdu,
    },
    recommendedSpiritualWorks: recommendedWorks,
    restrictedSpiritualWorks: restrictedWorks,
    recommendedWorks,
    restrictedWorks,
    kashAlBarniLunarRule,
    auspiciousSaatOfDay: auspiciousSaat,
    recommendedIncense,
    recommendedIsmAzam: recommendedIsm,
    recommendedIsm,
    recommendedDuaVerse: recommendedVerse,
    recommendedVerse,
  };
}
