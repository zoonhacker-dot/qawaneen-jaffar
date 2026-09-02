// -------------------------------------------------------------
// Qibla Direction, Astronomical Prayer Times & Auspicious Saat Engine
// According to Islamic Great-Circle Trigonometry and Kash Al-Barni's Jafr Guidelines
// -------------------------------------------------------------

import { 
  LocationCoordinates, 
  QiblaCalculationResult, 
  PrayerTimeSlot, 
  AuspiciousSpiritualHour 
} from '../types';

export const KAABA_LAT = 21.4225241;
export const KAABA_LNG = 39.8261818;

export const PRESET_CITIES: LocationCoordinates[] = [
  { cityName: 'کراچی (Karachi)', countryName: 'پاکستان', latitude: 24.8607, longitude: 67.0011, source: 'preset' },
  { cityName: 'لاہور (Lahore)', countryName: 'پاکستان', latitude: 31.5204, longitude: 74.3587, source: 'preset' },
  { cityName: 'اسلام آباد (Islamabad)', countryName: 'پاکستان', latitude: 33.6844, longitude: 73.0479, source: 'preset' },
  { cityName: 'کوئٹہ (Quetta)', countryName: 'پاکستان', latitude: 30.1798, longitude: 66.9750, source: 'preset' },
  { cityName: 'پشاور (Peshawar)', countryName: 'پاکستان', latitude: 34.0151, longitude: 71.5249, source: 'preset' },
  { cityName: 'گوادر (Gwadar)', countryName: 'پاکستان', latitude: 25.1264, longitude: 62.3225, source: 'preset' },
  { cityName: 'ملتان (Multan)', countryName: 'پاکستان', latitude: 30.1575, longitude: 71.5249, source: 'preset' },
  { cityName: 'فیصل آباد (Faisalabad)', countryName: 'پاکستان', latitude: 31.4504, longitude: 73.1350, source: 'preset' },
  { cityName: 'مکہ مکرمہ (Makkah)', countryName: 'سعودی عرب', latitude: 21.4225, longitude: 39.8262, source: 'preset' },
  { cityName: 'مدینہ منورہ (Medina)', countryName: 'سعودی عرب', latitude: 24.4672, longitude: 39.6024, source: 'preset' },
  { cityName: 'ریاض (Riyadh)', countryName: 'سعودی عرب', latitude: 24.7136, longitude: 46.6753, source: 'preset' },
  { cityName: 'دبئی (Dubai)', countryName: 'متحدہ عرب امارات', latitude: 25.2048, longitude: 55.2708, source: 'preset' },
  { cityName: 'دہلی (Delhi)', countryName: 'بھارت', latitude: 28.6139, longitude: 77.2090, source: 'preset' },
  { cityName: 'ممبئی (Mumbai)', countryName: 'بھارت', latitude: 19.0760, longitude: 72.8777, source: 'preset' },
  { cityName: 'حیدرآباد (Hyderabad)', countryName: 'بھارت', latitude: 17.3850, longitude: 78.4867, source: 'preset' },
  { cityName: 'کابل (Kabul)', countryName: 'افغانستان', latitude: 34.5553, longitude: 69.2075, source: 'preset' },
  { cityName: 'تہران (Tehran)', countryName: 'ایران', latitude: 35.6892, longitude: 51.3890, source: 'preset' },
  { cityName: 'بغداد (Baghdad)', countryName: 'عراق', latitude: 33.3152, longitude: 44.3661, source: 'preset' },
  { cityName: 'قاہرہ (Cairo)', countryName: 'مصر', latitude: 30.0444, longitude: 31.2357, source: 'preset' },
  { cityName: 'استنبول (Istanbul)', countryName: 'ترکی', latitude: 41.0082, longitude: 28.9784, source: 'preset' },
  { cityName: 'لندن (London)', countryName: 'برطانیہ', latitude: 51.5074, longitude: -0.1278, source: 'preset' },
  { cityName: 'نیویارک (New York)', countryName: 'امریکا', latitude: 40.7128, longitude: -74.0060, source: 'preset' },
  { cityName: 'ٹورنٹو (Toronto)', countryName: 'کینیڈا', latitude: 43.6532, longitude: -79.3832, source: 'preset' },
];

/**
 * Calculates Great-Circle Qibla direction from any point on Earth towards the Kaaba
 */
export function calculateQiblaDirection(userLat: number, userLng: number): QiblaCalculationResult {
  const phi1 = (userLat * Math.PI) / 180;
  const lambda1 = (userLng * Math.PI) / 180;
  const phi2 = (KAABA_LAT * Math.PI) / 180;
  const lambda2 = (KAABA_LNG * Math.PI) / 180;
  const dLambda = lambda2 - lambda1;

  const y = Math.sin(dLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLambda);

  let bearingRad = Math.atan2(y, x);
  let bearingDeg = (bearingRad * 180) / Math.PI;
  bearingDeg = (bearingDeg + 360) % 360;

  // Haversine Distance (km)
  const R = 6371; // Earth's radius in km
  const dPhi = phi2 - phi1;
  const a =
    Math.sin(dPhi / 2) * Math.sin(dPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) * Math.sin(dLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = Math.round(R * c);

  // Cardinal Direction in Urdu
  let directionCardinalUrdu = 'مکہ مکرمہ کی سمت';
  if (bearingDeg >= 337.5 || bearingDeg < 22.5) directionCardinalUrdu = 'عین شمال (North)';
  else if (bearingDeg >= 22.5 && bearingDeg < 67.5) directionCardinalUrdu = 'شمال مشرق (North-East)';
  else if (bearingDeg >= 67.5 && bearingDeg < 112.5) directionCardinalUrdu = 'عین مشرق (East)';
  else if (bearingDeg >= 112.5 && bearingDeg < 157.5) directionCardinalUrdu = 'جنوب مشرق (South-East)';
  else if (bearingDeg >= 157.5 && bearingDeg < 202.5) directionCardinalUrdu = 'عین جنوب (South)';
  else if (bearingDeg >= 202.5 && bearingDeg < 247.5) directionCardinalUrdu = 'جنوب مغرب (South-West)';
  else if (bearingDeg >= 247.5 && bearingDeg < 292.5) directionCardinalUrdu = 'عین مغرب (West)';
  else if (bearingDeg >= 292.5 && bearingDeg < 337.5) directionCardinalUrdu = 'شمال مغرب (North-West)';

  return {
    qiblaBearingDeg: Math.round(bearingDeg * 10) / 10,
    distanceKm,
    directionCardinalUrdu,
    isAlignedWithQibla: false,
  };
}

/**
 * Calculates Astronomical Prayer Times for a given day and location
 */
export function calculatePrayerTimes(
  lat: number,
  lng: number,
  date: Date = new Date(),
  timezoneOffsetHours?: number
): PrayerTimeSlot[] {
  const tz = timezoneOffsetHours !== undefined ? timezoneOffsetHours : -date.getTimezoneOffset() / 60;
  
  // Day of year
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime() + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Solar declination approx
  const declination = 23.45 * Math.sin(((360 / 365) * (dayOfYear - 81) * Math.PI) / 180);
  const decRad = (declination * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;

  // Equation of time approx (minutes)
  const b = ((360 / 365) * (dayOfYear - 81) * Math.PI) / 180;
  const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);

  // Solar noon in local hours
  const solarNoon = 12 + (tz * 15 - lng) / 15 - eot / 60;

  // Hour angle for sun zenith angle alpha
  const calcHourAngle = (alphaDeg: number): number => {
    const alphaRad = (alphaDeg * Math.PI) / 180;
    const cosH = (Math.cos(alphaRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
    if (cosH > 1) return 0;
    if (cosH < -1) return 180;
    return (Math.acos(cosH) * 180) / Math.PI;
  };

  // Sunrise/sunset angle (90.833 degrees for refraction)
  const haSunrise = calcHourAngle(90.833) / 15;
  // Fajr angle (18 degrees below horizon -> zenith 108 deg)
  const haFajr = calcHourAngle(108) / 15;
  // Isha angle (18 degrees below horizon -> zenith 108 deg)
  const haIsha = calcHourAngle(108) / 15;

  // Asr angle (Shadow = object + noon shadow)
  const noonShadow = Math.tan(Math.abs(latRad - decRad));
  const asrAltRad = Math.atan(1 / (1 + noonShadow)); // Standard 1x shadow
  const asrZenithDeg = 90 - (asrAltRad * 180) / Math.PI;
  const haAsr = calcHourAngle(asrZenithDeg) / 15;

  const fajrDec = (solarNoon - haFajr + 24) % 24;
  const sunriseDec = (solarNoon - haSunrise + 24) % 24;
  const ishraqDec = (sunriseDec + 0.33) % 24; // 20 mins after sunrise
  const dhuhrDec = (solarNoon + 0.05) % 24;
  const asrDec = (solarNoon + haAsr) % 24;
  const maghribDec = (solarNoon + haSunrise) % 24;
  const ishaDec = (solarNoon + haIsha) % 24;
  const tahajjudDec = (maghribDec + (24 + fajrDec - maghribDec) * 0.7) % 24; // Last third of night

  const formatHours = (decHours: number): { formatted: string; h: number; m: number } => {
    const totalMinutes = Math.round(decHours * 60);
    const h = Math.floor(totalMinutes / 60) % 24;
    const m = totalMinutes % 60;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const formatted = `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
    return { formatted, h, m };
  };

  const fajrTime = formatHours(fajrDec);
  const ishraqTime = formatHours(ishraqDec);
  const dhuhrTime = formatHours(dhuhrDec);
  const asrTime = formatHours(asrDec);
  const maghribTime = formatHours(maghribDec);
  const ishaTime = formatHours(ishaDec);
  const tahajjudTime = formatHours(tahajjudDec);

  return [
    {
      id: 'fajr',
      nameUrdu: 'نمازِ فجر (صبحِ صادق)',
      nameEnglish: 'Fajr',
      timeFormatted: fajrTime.formatted,
      hours: fajrTime.h,
      minutes: fajrTime.m,
      spiritualVirtueUrdu: 'وقتِ تجلیاتِ رحمانی، کشائشِ رزق اور تنویرِ قلب',
      recommendedAamal: ['تلاوتِ سورہ یٰسین', 'ورد یا فتاح یا رزاق (308 مرتبہ)', 'تکسیرِ اسمائے حسنیٰ'],
      planetaryHourAtTime: 'ساعتِ شمس یا زہرہ (سعد)',
      nature: 'saad_akbar',
    },
    {
      id: 'ishraq',
      nameUrdu: 'نمازِ اشراق و چاشت (طلوعِ آفتاب)',
      nameEnglish: 'Ishraq & Chasht',
      timeFormatted: ishraqTime.formatted,
      hours: ishraqTime.h,
      minutes: ishraqTime.m,
      spiritualVirtueUrdu: 'دفعِ فقر، شفا و نورانیت، اور کتابتِ نقوشِ سعد اکبر',
      recommendedAamal: ['تحریرِ نقوشِ رزق و مشتری', 'دعائے وسعت و برکت', 'استخراجِ طلسماتِ جفر'],
      planetaryHourAtTime: 'ساعتِ مشتری (سعدِ اعظم)',
      nature: 'saad_akbar',
    },
    {
      id: 'dhuhr',
      nameUrdu: 'نمازِ ظہر (زوالِ آفتاب)',
      nameEnglish: 'Dhuhr',
      timeFormatted: dhuhrTime.formatted,
      hours: dhuhrTime.h,
      minutes: dhuhrTime.m,
      spiritualVirtueUrdu: 'ابوابِ سماء کا کھلنا، استجابتِ دعا اور غلبۂ انوار',
      recommendedAamal: ['تلاوتِ سورہ واقعہ', 'ورد یا غنی یا مغنی (1100 مرتبہ)', 'اعمالِ تسخیرِ خلائق'],
      planetaryHourAtTime: 'ساعتِ شمس یا عطارد',
      nature: 'muntadal',
    },
    {
      id: 'asr',
      nameUrdu: 'نمازِ عصر (سایۂ دوم)',
      nameEnglish: 'Asr',
      timeFormatted: asrTime.formatted,
      hours: asrTime.h,
      minutes: asrTime.m,
      spiritualVirtueUrdu: 'قوتِ جلالی و دفاع، حصارِ اعظم اور ردِ سحر',
      recommendedAamal: ['آیت الکرسی (70 مرتبہ)', 'حصارِ سیفی', 'اعمالِ زبان بندی و فتحِ اعداء'],
      planetaryHourAtTime: 'ساعتِ مریخ یا زحل (جلالی)',
      nature: 'special_spiritual',
    },
    {
      id: 'maghrib',
      nameUrdu: 'نمازِ مغرب (غروبِ آفتاب)',
      nameEnglish: 'Maghrib',
      timeFormatted: maghribTime.formatted,
      hours: maghribTime.h,
      minutes: maghribTime.m,
      spiritualVirtueUrdu: 'انتقالِ لیل و نہار، حب و الفت اور حفاظتِ اہل و عیال',
      recommendedAamal: ['تلاوتِ سورہ ملک', 'ورد یا ودود یا لطیف (1001 مرتبہ)', 'دھونی صندل و لبان'],
      planetaryHourAtTime: 'ساعتِ زہرہ یا قمر',
      nature: 'saad_asghar',
    },
    {
      id: 'isha',
      nameUrdu: 'نمازِ عشاء (شفقِ احمر)',
      nameEnglish: 'Isha',
      timeFormatted: ishaTime.formatted,
      hours: ishaTime.h,
      minutes: ishaTime.m,
      spiritualVirtueUrdu: 'سکونِ قلوب، حفاظت از وساوس و شیاطین، ختمِ خواجگان',
      recommendedAamal: ['تلاوتِ سورہ سجدہ و ملک', 'استغفار و درودِ تاج', 'نقشِ سلامتی و حصار'],
      planetaryHourAtTime: 'ساعتِ عطارد یا زحل',
      nature: 'muntadal',
    },
    {
      id: 'tahajjud',
      nameUrdu: 'نمازِ تہجد و سحر (ثلثِ اخیر)',
      nameEnglish: 'Tahajjud & Sahar',
      timeFormatted: tahajjudTime.formatted,
      hours: tahajjudTime.h,
      minutes: tahajjudTime.m,
      spiritualVirtueUrdu: 'اعلیٰ ترین مقامِ قرب، کشفِ باطنی، استجابتِ کلی اور تسخیرِ ارواح',
      recommendedAamal: ['مناجات و استغفارِ سحر', 'ریاضتِ تکسیرِ افلاطونی', 'ذکرِ اسمِ اعظم خفی'],
      planetaryHourAtTime: 'ساعتِ نوریہ و تجلیاتِ رحمانی',
      nature: 'saad_akbar',
    },
  ];
}

/**
 * Auspicious Spiritual Hours for Specific Spiritual Works (کاش البرنی)
 */
export const AUSPICIOUS_SPIRITUAL_WORKS: AuspiciousSpiritualHour[] = [
  {
    id: 'work-rizq',
    targetCategory: 'rizq_wealth',
    targetCategoryUrdu: 'رزق، وسعتِ کاروبار، فراخی و دولت',
    icon: '💰',
    governingPlanet: 'Jupiter',
    governingPlanetUrdu: 'مشتری (سیارۂ سعدِ اکبر)',
    nature: 'سعدِ اکبر (مبارک ترین)',
    primaryIncense: 'لوبان، صندل سفید، عودِ ہندی و عنبر',
    auspiciousHoursUrdu: [
      'بروز جمعرات: ساعتِ اول (طلوعِ آفتاب تا 1 گھنٹہ بعد)',
      'بروز جمعرات: ساعتِ ہشتم (بعد نمازِ ظہر)',
      'بروز اتوار: ساعتِ اول (ساعتِ شمس)',
      'روزانہ بعد نمازِ فجر تا طلوعِ آفتاب',
    ],
    bestPrayerTiming: 'بعد از نمازِ فجر و بعد از نمازِ اشراق',
    recommendedIsm: 'یا رزاق، یا وہاب، یا فتاح، یا غنی یا مغنی',
    recommendedVerse: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ',
    jafrGuidance: 'کاش البرنی: نقوشِ رزق و وسعت ہمیشہ ساعتِ مشتری یا ساعتِ شمس میں خوشبودار زعفران اور عرقِ گلاب سے لکھ کر شمال کی جانب رخ کر کے رکھیں۔',
    taksirRecommendation: 'مربعِ متوازن ۴×۴ یا تکسیرِ حروفِ بسط',
    powerRating: 98,
  },
  {
    id: 'work-love',
    targetCategory: 'love_harmony',
    targetCategoryUrdu: 'محبت، الفت، تسخیرِ قلوب و ازدواجی اتفاق',
    icon: '❤️',
    governingPlanet: 'Venus',
    governingPlanetUrdu: 'زہرہ (کوکبِ محبت و مسرت)',
    nature: 'سعدِ اصغر و جمالی',
    primaryIncense: 'صندل، مشک، کافور و جاوی',
    auspiciousHoursUrdu: [
      'بروز جمعہ: ساعتِ اول (طلوعِ آفتاب کے فوراً بعد)',
      'بروز جمعہ: ساعتِ ہشتم (بعد از نمازِ عصر)',
      'بروز دوشنبہ (پیر): ساعتِ اول (ساعتِ قمر)',
      'روزانہ بعد نمازِ مغرب',
    ],
    bestPrayerTiming: 'نمازِ مغرب کے متصل بعد یا نمازِ جمعہ سے قبل',
    recommendedIsm: 'یا ودود، یا حبیب، یا رؤوف، یا رحیم، یا جامع',
    recommendedVerse: 'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ لَوْ أَنفَقْتَ مَا فِي الْأَرْضِ جَمِيعًا مَّا أَلَّفْتَ بَيْنَ قُلُوبِهِمْ',
    jafrGuidance: 'کاش البرنی: اعمالِ محبت و صلح میں منہ مشرق یا قبلہ رخ رکھیں اور شیرینی یا پھولوں پر دم کر کے استعمال کریں۔',
    taksirRecommendation: 'مسبعِ زہرہ ۷×۷ یا تکسیرِ صدر و مؤخر متوازن',
    powerRating: 95,
  },
  {
    id: 'work-victory',
    targetCategory: 'victory_conquest',
    targetCategoryUrdu: 'فتح، نصرت، غلبہ بر دشمن و زبان بندی',
    icon: '⚔️',
    governingPlanet: 'Mars',
    governingPlanetUrdu: 'مریخ (کوکبِ حرب و شجاعت)',
    nature: 'جلالی و قاہرہ',
    primaryIncense: 'فلفل سیاہ، مصطگی، حرمل و عودِ صلیب',
    auspiciousHoursUrdu: [
      'بروز منگل: ساعتِ اول (طلوعِ آفتاب کے متصل)',
      'بروز منگل: ساعتِ پنجم (قبل از زوال)',
      'بروز ہفتہ: ساعتِ اول (ساعتِ زحل برائے زبان بندی)',
      'روزانہ بعد نمازِ عصر تا غروب',
    ],
    bestPrayerTiming: 'بعد از نمازِ عصر اور ثلثِ اخیرِ شب',
    recommendedIsm: 'یا قہار، یا جبار، یا شدید البطش، یا مذل',
    recommendedVerse: 'إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا • نَصْرٌ مِّنَ اللَّهِ وَفَتْحٌ قَرِيبٌ',
    jafrGuidance: 'کاش البرنی: اعمالِ جلالی و دفاعی میں قبلہ رخ ہو کر باوضو حصار باندھ لیں اور سرخ یا کالی روشنائی کا استعمال کریں۔',
    taksirRecommendation: 'مخمسِ مریخ ۵×۵ یا مثلثِ حرب',
    powerRating: 92,
  },
  {
    id: 'work-healing',
    targetCategory: 'healing_health',
    targetCategoryUrdu: 'شفائے امراض، تسکینِ درد و تندرستی',
    icon: '🌿',
    governingPlanet: 'Sun',
    governingPlanetUrdu: 'شمس (منبعِ حیات و حرارت)',
    nature: 'سعدِ اعظم و نورانی',
    primaryIncense: 'صندل سفید، گلاب، عود و لوبان',
    auspiciousHoursUrdu: [
      'بروز اتوار: ساعتِ اول (طلوعِ آفتاب)',
      'بروز جمعرات: ساعتِ اول (مشتری)',
      'روزانہ بوقتِ نمازِ اشراق تا چاشت',
      'روزانہ بوقتِ سحر',
    ],
    bestPrayerTiming: 'بوقتِ طلوعِ آفتاب و بعد نمازِ اشراق',
    recommendedIsm: 'یا شافی، یا کافی، یا معافی، یا سلام، یا حی یا قیوم',
    recommendedVerse: 'وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ',
    jafrGuidance: 'کاش البرنی: آیاتِ شفا و نقوشِ صحت کو چینی کی پلیٹ پر زعفران سے لکھ کر آبِ زمزم یا عرقِ گلاب سے دھو کر مریض کو پلائیں۔',
    taksirRecommendation: 'مثلثِ حیات ۳×۳ یا مربعِ شفا ۴×۴',
    powerRating: 96,
  },
  {
    id: 'work-protection',
    targetCategory: 'protection_shield',
    targetCategoryUrdu: 'حصارِ اعظم، حفاظتِ جان و مال، دفعِ سحر و شیاطین',
    icon: '🛡️',
    governingPlanet: 'Saturn',
    governingPlanetUrdu: 'زحل (سیارۂ استقامت و حصار)',
    nature: 'ثقیل و حارث',
    primaryIncense: 'حرمل (اسپند)، کلونجی، لوبان و مصطگی',
    auspiciousHoursUrdu: [
      'بروز ہفتہ: ساعتِ اول (طلوعِ آفتاب)',
      'روزانہ بوقتِ اذانِ مغرب و غروبِ شمس',
      'روزانہ قبل از خواب (بعد از عشاء)',
      'بوقتِ تہجد',
    ],
    bestPrayerTiming: 'بعد از نمازِ مغرب و نمازِ عشاء',
    recommendedIsm: 'یا حفیظ، یا رقیب، یا مانع، یا سلام، یا متین',
    recommendedVerse: 'فَاللَّهُ خَيْرٌ حَافِظًا وَهُوَ أَرْحَمُ الرَّاحِمِينَ • وَحِفْظًا مِّن كُلِّ شَيْطَانٍ مَّارِدٍ',
    jafrGuidance: 'کاش البرنی: حصار باندھنے سے قبل چہار قل اور آیت الکرسی پڑھ کر اپنے چاروں طرف دم کا دائرہ کھینچیں۔',
    taksirRecommendation: 'مثلثِ حصار ۳×۳ مع آیاتِ حرس',
    powerRating: 97,
  },
  {
    id: 'work-kashf',
    targetCategory: 'kashf_insight',
    targetCategoryUrdu: 'کشفِ باطنی، ریاضتِ جفر، خواب کی سچائی و تنویرِ عقل',
    icon: '👁️',
    governingPlanet: 'Mercury',
    governingPlanetUrdu: 'عطارد (سیارۂ عقل و قلم)',
    nature: 'ممزوج و نوری',
    primaryIncense: 'عود، مشک، لوبانِ نر و عنبر',
    auspiciousHoursUrdu: [
      'بروز بدھ: ساعتِ اول (طلوعِ آفتاب)',
      'بروز دوشنبہ (پیر): ساعتِ قمر',
      'روزانہ بوقتِ ثلثِ اخیرِ شب (تہجد تا سحر)',
      'بعد از نمازِ تہجد',
    ],
    bestPrayerTiming: 'ثلثِ اخیرِ شب (ساعتِ سحر)',
    recommendedIsm: 'یا علیم، یا خبیر، یا نور، یا ہادی، یا فتاح',
    recommendedVerse: 'فَكَشَفْنَا عَنكَ غِطَاءَكَ فَبَصَرُكَ الْيَوْمَ حَدِيدٌ',
    jafrGuidance: 'کاش البرنی: کشفِ باطنی کے لیے تنہائی، خوشبودار ماحول، سفید لباس اور قبلہ رخ بیٹھ کر تکسیرِ افلاطونی کی ریاضت کریں۔',
    taksirRecommendation: 'تکسیرِ افلاطون (عناصرِ اربعہ) و تکسیرِ در تکسیر',
    powerRating: 99,
  },
];
