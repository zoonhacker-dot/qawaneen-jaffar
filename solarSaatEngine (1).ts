// -------------------------------------------------------------
// Solar Ephemeris & Classical Temporal Saat (الساعات الزمانیة) Engine
// Computes precise Sunrise, Sunset, Day/Night unequal hours,
// and Planetary rulers for any Geographic Location (Lat/Lng)
// -------------------------------------------------------------

export interface GeoLocation {
  name: string;
  nameUrdu: string;
  latitude: number;
  longitude: number;
  timezoneOffset: number; // in hours (e.g., +5 for PKT, +3 for AST, +3.5 for IRST)
  isCustom?: boolean;
}

export interface TemporalPlanetaryHour {
  hourIndex: number; // 1 to 24 (1-12 Day, 13-24 Night)
  period: 'day' | 'night';
  hourNameUrdu: string;
  startTime: Date;
  endTime: Date;
  startTimeFormatted: string;
  endTimeFormatted: string;
  durationMinutes: number;
  planet: 'Saturn' | 'Jupiter' | 'Mars' | 'Sun' | 'Venus' | 'Mercury' | 'Moon';
  planetUrdu: string;
  nature: 'saad_akbar' | 'saad_asghar' | 'mumtazij' | 'nahs_asghar' | 'nahs_akbar';
  natureUrdu: string;
  natureBadgeColor: string;
  color: string;
  elementUrdu: string;
  incense: string;
  recommendedOperations: string[];
  restrictedOperations: string[];
  angelMoakkal: string;
  isActiveNow: boolean;
  progressPercent: number; // 0-100 if active
}

export interface SolarLocationData {
  location: GeoLocation;
  date: Date;
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
  dayLengthMinutes: number;
  nightLengthMinutes: number;
  dayHourDurationMinutes: number;
  nightHourDurationMinutes: number;
  currentActiveHour: TemporalPlanetaryHour | null;
  dayHours: TemporalPlanetaryHour[];
  nightHours: TemporalPlanetaryHour[];
  allHours: TemporalPlanetaryHour[];
}

export const PRESET_LOCATIONS: GeoLocation[] = [
  { name: 'Makkah Al-Mukarramah', nameUrdu: 'مکہ مکرمہ (مرکز الارض و کعبۃ اللہ)', latitude: 21.4225, longitude: 39.8262, timezoneOffset: 3 },
  { name: 'Madinah Al-Munawwarah', nameUrdu: 'مدینہ منورہ (شہرِ رسول ﷺ)', latitude: 24.4672, longitude: 39.6111, timezoneOffset: 3 },
  { name: 'Turbat / Makran', nameUrdu: 'تربت و مکران (مولد حضرت سربازیؒ)', latitude: 26.0031, longitude: 63.0544, timezoneOffset: 5 },
  { name: 'Quetta', nameUrdu: 'کوئٹہ (بلوچستان)', latitude: 30.1798, longitude: 66.9750, timezoneOffset: 5 },
  { name: 'Karachi', nameUrdu: 'کراچی (سندھ)', latitude: 24.8607, longitude: 67.0011, timezoneOffset: 5 },
  { name: 'Lahore', nameUrdu: 'لاہور (پنجاب)', latitude: 31.5204, longitude: 74.3587, timezoneOffset: 5 },
  { name: 'Islamabad', nameUrdu: 'اسلام آباد / راولپنڈی', latitude: 33.6844, longitude: 73.0479, timezoneOffset: 5 },
  { name: 'Peshawar', nameUrdu: 'پشاور (خیبر پختونخوا)', latitude: 34.0151, longitude: 71.5249, timezoneOffset: 5 },
  { name: 'Zahedan', nameUrdu: 'زاہدان (سیستان و بلوچستان)', latitude: 29.4963, longitude: 60.8629, timezoneOffset: 3.5 },
  { name: 'Tehran', nameUrdu: 'تہران', latitude: 35.6892, longitude: 51.3890, timezoneOffset: 3.5 },
  { name: 'Kabul', nameUrdu: 'کابل (افغانستان)', latitude: 34.5553, longitude: 69.2075, timezoneOffset: 4.5 },
  { name: 'Delhi', nameUrdu: 'دہلی / نئی دہلی', latitude: 28.6139, longitude: 77.2090, timezoneOffset: 5.5 },
  { name: 'Dubai', nameUrdu: 'دبئی (متحدہ عرب امارات)', latitude: 25.2048, longitude: 55.2708, timezoneOffset: 4 },
  { name: 'London', nameUrdu: 'لندن (برطانیہ)', latitude: 51.5074, longitude: -0.1278, timezoneOffset: 0 },
  { name: 'New York', nameUrdu: 'نیویارک (امریکہ)', latitude: 40.7128, longitude: -74.0060, timezoneOffset: -5 },
];

const CHALDEAN_ORDER: Array<'Saturn' | 'Jupiter' | 'Mars' | 'Sun' | 'Venus' | 'Mercury' | 'Moon'> = [
  'Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'
];

// First hour planetary ruler of each day of week (0 = Sunday / اتوار)
const DAY_FIRST_HOURS: Array<'Saturn' | 'Jupiter' | 'Mars' | 'Sun' | 'Venus' | 'Mercury' | 'Moon'> = [
  'Sun',     // 0 = Sunday / اتوار (شمس)
  'Moon',    // 1 = Monday / پیر (قمر)
  'Mars',    // 2 = Tuesday / منگل (مریخ)
  'Mercury', // 3 = Wednesday / بدھ (عطارد)
  'Jupiter', // 4 = Thursday / جمعرات (مشتری)
  'Venus',   // 5 = Friday / جمعہ (زہرہ)
  'Saturn',  // 6 = Saturday / ہفتہ (زحل)
];

const PLANET_METADATA: Record<string, {
  nameUrdu: string;
  nature: 'saad_akbar' | 'saad_asghar' | 'mumtazij' | 'nahs_asghar' | 'nahs_akbar';
  natureUrdu: string;
  natureBadgeColor: string;
  color: string;
  elementUrdu: string;
  incense: string;
  recommendedOperations: string[];
  restrictedOperations: string[];
  angelMoakkal: string;
}> = {
  Jupiter: {
    nameUrdu: 'مشتری (برجیس / سعدِ اکبر)',
    nature: 'saad_akbar',
    natureUrdu: 'سعدِ اکبر (نہایت مبارک و با برکت)',
    natureBadgeColor: 'bg-emerald-600 text-white border-emerald-400',
    color: '#059669',
    elementUrdu: 'آتشی و نوری',
    incense: 'صندل زرد، کافور، لبان اور عنبر',
    recommendedOperations: ['کتابتِ نقوشِ رزق و برکت', 'تعویذِ وسعتِ کاروبار', 'حصولِ جاہ و منصب', 'طلبِ شفاء از امراضِ مزمنہ', 'عقدِ تجارت و شراکت'],
    restrictedOperations: ['اعمالِ تفریق و جدائی', 'اعمالِ غضب و تسلیط', 'کتابتِ نقوشِ عداوت'],
    angelMoakkal: 'حضرت روفیائیل علیہ السلام',
  },
  Venus: {
    nameUrdu: 'زہرہ (ناہید / سعدِ اصغر)',
    nature: 'saad_asghar',
    natureUrdu: 'سعدِ اصغر (پرکشش، محبت و الفت)',
    natureBadgeColor: 'bg-teal-600 text-white border-teal-400',
    color: '#0d9488',
    elementUrdu: 'آبی و لطیف',
    incense: 'صندل سفید، مشک، عود اور گلاب',
    recommendedOperations: ['اعمالِ الفت و محبت بین الزوجین', 'عقدِ نکاح و پیغامِ رشتہ', 'جلبِ قلوب و تسخیرِ خلائق', 'خوشی و رفعِ رنجش', 'پہننا نیا لباس و زیور'],
    restrictedOperations: ['اعمالِ عداوت و کینہ', 'سفر برائے جنگ و منازعہ', 'کتابتِ نقوشِ بغض'],
    angelMoakkal: 'حضرت عنیائیل علیہ السلام',
  },
  Sun: {
    nameUrdu: 'شمس (مہر / سلطانِ فلک)',
    nature: 'saad_akbar',
    natureUrdu: 'سعدِ باوقار (ہیبت، عزت و شرف)',
    natureBadgeColor: 'bg-amber-600 text-white border-amber-400',
    color: '#d97706',
    elementUrdu: 'آتشی و شاہی',
    incense: 'عودِ ہندی، زعفران اور صندل سرخ',
    recommendedOperations: ['ملاقات با امراء و حکام', 'تسخیرِ قلوبِ اعیان و افسران', 'حصولِ ترقی و ملازمت', 'شرفِ شمس و طلسماتِ فتح', 'کتابتِ نقوشِ ہیبت و شرف'],
    restrictedOperations: ['اعمالِ ذلت و خواری', 'چھپ کر کیے جانے والے منفی افعال'],
    angelMoakkal: 'حضرت میکائیل علیہ السلام',
  },
  Moon: {
    nameUrdu: 'قمر (ماہتاب / سریع السیر)',
    nature: 'saad_asghar',
    natureUrdu: 'سعدِ معتدل (تسکین و سفر)',
    natureBadgeColor: 'bg-sky-600 text-white border-sky-400',
    color: '#0284c7',
    elementUrdu: 'آبی و سرد',
    incense: 'لوبان، کافور اور صندل سفید',
    recommendedOperations: ['آغازِ سفرِ مبارک', 'پانی پر دم کرنے والے نقوش', 'علاجِ امراضِ اطفال و چشم', 'تسکینِ غضب و صلح', 'کتابتِ الواحِ برکت'],
    restrictedOperations: ['بڑے پائیدار معاہدے (جب قمر تحت الشعاع یا در عقرب ہو)'],
    angelMoakkal: 'حضرت جبرائیل علیہ السلام',
  },
  Mercury: {
    nameUrdu: 'عطارد (تیر / کاتبِ فلک)',
    nature: 'mumtazij',
    natureUrdu: 'ممتزج (علم، عقل و تجارت)',
    natureBadgeColor: 'bg-indigo-600 text-white border-indigo-400',
    color: '#4f46e5',
    elementUrdu: 'بادی و متحرک',
    incense: 'مستکی رومی، جاوی اور قسط',
    recommendedOperations: ['تعلیم، تدریس و حفظِ قرآن', 'کتابتِ نقوش و الواحِ ریاضی', 'حساب کتاب و تجارتی معاہدات', 'تحریرِ کتب و خطاطی', 'علاجِ امراضِ اعصاب و نطق'],
    restrictedOperations: ['اعمال جس میں مستقل ٹھہراؤ چاہیے (جب عطارد راجع ہو)'],
    angelMoakkal: 'حضرت میکائیل / سمسمائیل',
  },
  Mars: {
    nameUrdu: 'مریخ (بہرام / جلالی و ناری)',
    nature: 'nahs_asghar',
    natureUrdu: 'نحسِ اصغر (جلالی، دافعِ شر و قاطع)',
    natureBadgeColor: 'bg-rose-700 text-white border-rose-500',
    color: '#be123c',
    elementUrdu: 'آتشی و تند',
    incense: 'حرمل، گوگل اور مر مکی',
    recommendedOperations: ['ابطالِ سحر و جادوئے قوی', 'اخراجِ جنات و شیاطین', 'دفعِ شرِ اعداء و ظالمین', 'حصارِ فولادی برائے مکان', 'باندھنا سرکش و شریر کا'],
    restrictedOperations: ['اعمالِ محبت و الفت', 'عقدِ نکاح', 'آغازِ دوستی و شراکت', 'شروع کرنا نئے اچھے کام'],
    angelMoakkal: 'حضرت سمسمائیل علیہ السلام',
  },
  Saturn: {
    nameUrdu: 'زحل (کیوان / ثقیل و باثبات)',
    nature: 'nahs_akbar',
    natureUrdu: 'نحسِ اکبر (سخت، ثبات و بندش)',
    natureBadgeColor: 'bg-slate-700 text-white border-slate-500',
    color: '#334155',
    elementUrdu: 'خاکی و گراں',
    incense: 'لوبان سیاہ، برگِ حنا اور حلتيت (ہینگ)',
    recommendedOperations: ['زبان بندیِ بدگویان و حاسدین', 'دفعِ موذی جانور و چور', 'حفاظتِ زمین، مکان و دفینہ', 'عزلِ ظالم از منصب', 'نقوشِ ثبات و قیام'],
    restrictedOperations: ['شادی و نکاح', 'سفرِ خوشی', 'خریداریِ سامانِ زینت', 'علاجِ مریض و شفا کے اعمال'],
    angelMoakkal: 'حضرت کفیائیل علیہ السلام',
  },
};

/**
 * Astronomical Solar calculation for Sunrise, Sunset, and Solar Noon.
 * Based on NOAA Solar Calculator Equations.
 */
function calculateSunTimes(date: Date, latitude: number, longitude: number, timezoneOffset: number): {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
} {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Julian Day
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const julianDay = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  const julianCentury = (julianDay - 2451545.0) / 36525.0;

  // Geom Mean Long Sun (deg)
  let geomMeanLongSun = (280.46646 + julianCentury * (36000.76983 + julianCentury * 0.0003032)) % 360;
  if (geomMeanLongSun < 0) geomMeanLongSun += 360;

  // Geom Mean Anom Sun (deg)
  const geomMeanAnomSun = 357.52911 + julianCentury * (35999.05029 - 0.0001537 * julianCentury);

  // Sun Eq of Ctr
  const sunEqCtr = Math.sin(geomMeanAnomSun * rad) * (1.914602 - julianCentury * (0.004817 + 0.000014 * julianCentury)) +
                   Math.sin(2 * geomMeanAnomSun * rad) * (0.019993 - 0.000101 * julianCentury) +
                   Math.sin(3 * geomMeanAnomSun * rad) * 0.000289;

  // Sun True Long (deg)
  const sunTrueLong = geomMeanLongSun + sunEqCtr;

  // Sun App Long (deg)
  const sunAppLong = sunTrueLong - 0.00569 - 0.00478 * Math.sin((125.04 - 1934.136 * julianCentury) * rad);

  // Mean Obliq Ecliptic (deg)
  const meanObliqEcliptic = 23 + (26 + ((21.448 - julianCentury * (46.815 + julianCentury * (0.00059 - julianCentury * 0.001813)))) / 60) / 60;
  const obliqCorr = meanObliqEcliptic + 0.00256 * Math.cos((125.04 - 1934.136 * julianCentury) * rad);

  // Sun Declin (deg)
  const sunDeclin = Math.asin(Math.sin(obliqCorr * rad) * Math.sin(sunAppLong * rad)) * deg;

  // Equation of Time (minutes)
  const varY = Math.tan((obliqCorr / 2) * rad) * Math.tan((obliqCorr / 2) * rad);
  const eqOfTime = 4 * deg * (varY * Math.sin(2 * geomMeanLongSun * rad) - 
                              2 * 0.016708634 * Math.sin(geomMeanAnomSun * rad) + 
                              4 * 0.016708634 * varY * Math.sin(geomMeanAnomSun * rad) * Math.cos(2 * geomMeanLongSun * rad) - 
                              0.5 * varY * varY * Math.sin(4 * geomMeanLongSun * rad) - 
                              1.25 * 0.016708634 * 0.016708634 * Math.sin(2 * geomMeanAnomSun * rad));

  // Hour Angle for Sunrise / Sunset (Zenith = 90.833 deg standard refraction)
  const zenith = 90.833;
  const cosHourAngle = (Math.cos(zenith * rad) - (Math.sin(latitude * rad) * Math.sin(sunDeclin * rad))) / 
                       (Math.cos(latitude * rad) * Math.cos(sunDeclin * rad));

  // Clamp to valid range for extreme latitudes
  const clampedCos = Math.max(-1, Math.min(1, cosHourAngle));
  const hourAngle = Math.acos(clampedCos) * deg;

  // Solar Noon in UTC minutes from midnight
  const solarNoonUTCMin = 720 - 4 * longitude - eqOfTime;

  // Sunrise and Sunset in UTC minutes
  const sunriseUTCMin = solarNoonUTCMin - hourAngle * 4;
  const sunsetUTCMin = solarNoonUTCMin + hourAngle * 4;

  // Convert to local Date objects
  const createDateFromUTCMin = (baseDate: Date, minUTC: number, tzOffset: number): Date => {
    const localMin = minUTC + tzOffset * 60;
    const res = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 0, 0, 0, 0);
    res.setMinutes(Math.round(localMin));
    return res;
  };

  const sunrise = createDateFromUTCMin(date, sunriseUTCMin, timezoneOffset);
  const sunset = createDateFromUTCMin(date, sunsetUTCMin, timezoneOffset);
  const solarNoon = createDateFromUTCMin(date, solarNoonUTCMin, timezoneOffset);

  return { sunrise, sunset, solarNoon };
}

/**
 * Formats time in 12-hour format with AM/PM in Urdu
 */
export function formatTimeUrdu(d: Date): string {
  let hours = d.getHours();
  const minutes = d.getMinutes();
  const period = hours >= 12 ? 'شام / رات' : 'صبح';
  hours = hours % 12 || 12;
  const minStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours}:${minStr} ${period}`;
}

/**
 * Calculates all 24 Temporal Planetary Hours (12 Day + 12 Night) for a given Date and Location
 */
export function calculateLocationSolarSaat(
  date: Date = new Date(),
  location: GeoLocation = PRESET_LOCATIONS[0]
): SolarLocationData {
  const { sunrise, sunset, solarNoon } = calculateSunTimes(date, location.latitude, location.longitude, location.timezoneOffset);

  // Calculate Next Day's Sunrise for Night Hours division
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);
  const nextSun = calculateSunTimes(nextDate, location.latitude, location.longitude, location.timezoneOffset);
  const nextSunrise = nextSun.sunrise;

  const dayLengthMs = sunset.getTime() - sunrise.getTime();
  const nightLengthMs = nextSunrise.getTime() - sunset.getTime();

  const dayHourDurationMs = dayLengthMs / 12;
  const nightHourDurationMs = nightLengthMs / 12;

  const dayLengthMinutes = Math.round(dayLengthMs / 60000);
  const nightLengthMinutes = Math.round(nightLengthMs / 60000);
  const dayHourDurationMinutes = Math.round((dayHourDurationMs / 60000) * 10) / 10;
  const nightHourDurationMinutes = Math.round((nightHourDurationMs / 60000) * 10) / 10;

  const dayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const dayStartPlanet = DAY_FIRST_HOURS[dayOfWeek % 7];
  let chaldeanIdx = CHALDEAN_ORDER.indexOf(dayStartPlanet);

  const nowTime = new Date().getTime();
  const dayHours: TemporalPlanetaryHour[] = [];
  const nightHours: TemporalPlanetaryHour[] = [];
  const allHours: TemporalPlanetaryHour[] = [];

  const dayHourNamesUrdu = [
    'ساعت اول (بوقتِ طلوع آفتاب)',
    'ساعت دوم',
    'ساعت سوم',
    'ساعت چہارم',
    'ساعت پنجم',
    'ساعت ششم (نصف النہار / زوال)',
    'ساعت ہفتم',
    'ساعت ہشتم',
    'ساعت نہم',
    'ساعت دہم',
    'ساعت یازدہم (قبلِ غروب)',
    'ساعت دوازدہم (بوقتِ غروب آفتاب)',
  ];

  const nightHourNamesUrdu = [
    'ساعت اول شب (بعد از غروب)',
    'ساعت دوم شب',
    'ساعت سوم شب',
    'ساعت چہارم شب',
    'ساعت پنجم شب',
    'ساعت ششم شب (نصف اللیل / تہجد)',
    'ساعت ہفتم شب',
    'ساعت ہشتم شب',
    'ساعت نہم شب',
    'ساعت دہم شب (سحر اول)',
    'ساعت یازدہم شب (سحر دوم)',
    'ساعت دوازدہم شب (قبل از فجر و طلوع)',
  ];

  // 12 Diurnal Hours (ساعاتِ نہار)
  for (let i = 0; i < 12; i++) {
    const planetKey = CHALDEAN_ORDER[chaldeanIdx % 7];
    const meta = PLANET_METADATA[planetKey];
    const startTime = new Date(sunrise.getTime() + i * dayHourDurationMs);
    const endTime = new Date(sunrise.getTime() + (i + 1) * dayHourDurationMs);

    const isActive = nowTime >= startTime.getTime() && nowTime < endTime.getTime();
    let progressPercent = 0;
    if (isActive) {
      progressPercent = Math.min(100, Math.max(0, Math.round(((nowTime - startTime.getTime()) / (endTime.getTime() - startTime.getTime())) * 100)));
    }

    const item: TemporalPlanetaryHour = {
      hourIndex: i + 1,
      period: 'day',
      hourNameUrdu: dayHourNamesUrdu[i],
      startTime,
      endTime,
      startTimeFormatted: formatTimeUrdu(startTime),
      endTimeFormatted: formatTimeUrdu(endTime),
      durationMinutes: dayHourDurationMinutes,
      planet: planetKey,
      planetUrdu: meta.nameUrdu,
      nature: meta.nature,
      natureUrdu: meta.natureUrdu,
      natureBadgeColor: meta.natureBadgeColor,
      color: meta.color,
      elementUrdu: meta.elementUrdu,
      incense: meta.incense,
      recommendedOperations: meta.recommendedOperations,
      restrictedOperations: meta.restrictedOperations,
      angelMoakkal: meta.angelMoakkal,
      isActiveNow: isActive,
      progressPercent,
    };

    dayHours.push(item);
    allHours.push(item);
    chaldeanIdx = (chaldeanIdx + 1) % 7;
  }

  // 12 Nocturnal Hours (ساعاتِ لیل)
  for (let i = 0; i < 12; i++) {
    const planetKey = CHALDEAN_ORDER[chaldeanIdx % 7];
    const meta = PLANET_METADATA[planetKey];
    const startTime = new Date(sunset.getTime() + i * nightHourDurationMs);
    const endTime = new Date(sunset.getTime() + (i + 1) * nightHourDurationMs);

    const isActive = nowTime >= startTime.getTime() && nowTime < endTime.getTime();
    let progressPercent = 0;
    if (isActive) {
      progressPercent = Math.min(100, Math.max(0, Math.round(((nowTime - startTime.getTime()) / (endTime.getTime() - startTime.getTime())) * 100)));
    }

    const item: TemporalPlanetaryHour = {
      hourIndex: i + 13,
      period: 'night',
      hourNameUrdu: nightHourNamesUrdu[i],
      startTime,
      endTime,
      startTimeFormatted: formatTimeUrdu(startTime),
      endTimeFormatted: formatTimeUrdu(endTime),
      durationMinutes: nightHourDurationMinutes,
      planet: planetKey,
      planetUrdu: meta.nameUrdu,
      nature: meta.nature,
      natureUrdu: meta.natureUrdu,
      natureBadgeColor: meta.natureBadgeColor,
      color: meta.color,
      elementUrdu: meta.elementUrdu,
      incense: meta.incense,
      recommendedOperations: meta.recommendedOperations,
      restrictedOperations: meta.restrictedOperations,
      angelMoakkal: meta.angelMoakkal,
      isActiveNow: isActive,
      progressPercent,
    };

    nightHours.push(item);
    allHours.push(item);
    chaldeanIdx = (chaldeanIdx + 1) % 7;
  }

  const currentActiveHour = allHours.find(h => h.isActiveNow) || null;

  return {
    location,
    date,
    sunrise,
    sunset,
    solarNoon,
    dayLengthMinutes,
    nightLengthMinutes,
    dayHourDurationMinutes,
    nightHourDurationMinutes,
    currentActiveHour,
    dayHours,
    nightHours,
    allHours,
  };
}
