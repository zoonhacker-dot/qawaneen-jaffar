import { 
  CalculationResult, 
  ElementType, 
  LetterElementInfo, 
  NaqshResult, 
  NaqshType, 
  ChalType, 
  PlanetarySaat, 
  TakseerResult, 
  TakseerStep, 
  TakseerType,
  IstikharaPersonInfo,
  IstikharaMarriageResult,
  IstikharaBusinessResult,
  IstikharaGeneralResult,
  MatrixObjective,
  AbjadTakseerAnalysis,
  ChalCellStep,
  TakseerMatrixSuggestion
} from '../types';

// Classical 28 Letters of Abjad with Elemental & Astrological data
export const ABJAD_TABLE: Record<string, LetterElementInfo> = {
  'ا': { letter: 'ا', name: 'الف', abjadKabir: 1, abjadSaghir: 1, element: 'fire', elementUrdu: 'آتشی', nature: 'گرم و خشک', planet: 'Sun', planetUrdu: 'شمس', metal: 'سونا', bodyPart: 'سر' },
  'ب': { letter: 'ب', name: 'بے', abjadKabir: 2, abjadSaghir: 2, element: 'air', elementUrdu: 'بادی', nature: 'گرم و تر', planet: 'Moon', planetUrdu: 'قمر', metal: 'چاندی', bodyPart: 'سینہ' },
  'ج': { letter: 'ج', name: 'جیم', abjadKabir: 3, abjadSaghir: 3, element: 'water', elementUrdu: 'آبی', nature: 'سرد و تر', planet: 'Mars', planetUrdu: 'مریخ', metal: 'لوہا', bodyPart: 'پیٹ' },
  'د': { letter: 'د', name: 'دال', abjadKabir: 4, abjadSaghir: 4, element: 'earth', elementUrdu: 'خاکی', nature: 'سرد و خشک', planet: 'Mercury', planetUrdu: 'عطارد', metal: 'پارہ', bodyPart: 'پاؤں' },
  'ہ': { letter: 'ہ', name: 'ہے', abjadKabir: 5, abjadSaghir: 5, element: 'fire', elementUrdu: 'آتشی', nature: 'گرم و خشک', planet: 'Jupiter', planetUrdu: 'مشتری', metal: 'پیتل', bodyPart: 'گلا' },
  'و': { letter: 'و', name: 'واؤ', abjadKabir: 6, abjadSaghir: 6, element: 'air', elementUrdu: 'بادی', nature: 'گرم و تر', planet: 'Venus', planetUrdu: 'زہرہ', metal: 'تانبا', bodyPart: 'گردن' },
  'ز': { letter: 'ز', name: 'زے', abjadKabir: 7, abjadSaghir: 7, element: 'water', elementUrdu: 'آبی', nature: 'سرد و تر', planet: 'Saturn', planetUrdu: 'زحل', metal: 'سیسہ', bodyPart: 'پشت' },
  'ح': { letter: 'ح', name: 'حائے', abjadKabir: 8, abjadSaghir: 8, element: 'earth', elementUrdu: 'خاکی', nature: 'سرد و خشک', planet: 'Sun', planetUrdu: 'شمس', metal: 'سونا', bodyPart: 'دل' },
  'ط': { letter: 'ط', name: 'طوئے', abjadKabir: 9, abjadSaghir: 9, element: 'fire', elementUrdu: 'آتشی', nature: 'گرم و خشک', planet: 'Moon', planetUrdu: 'قمر', metal: 'چاندی', bodyPart: 'پھیپھڑے' },
  'ی': { letter: 'ی', name: 'یے', abjadKabir: 10, abjadSaghir: 1, element: 'air', elementUrdu: 'بادی', nature: 'گرم و تر', planet: 'Mars', planetUrdu: 'مریخ', metal: 'لوہا', bodyPart: 'ہاتھ' },
  'ک': { letter: 'ک', name: 'کاف', abjadKabir: 20, abjadSaghir: 2, element: 'water', elementUrdu: 'آبی', nature: 'سرد و تر', planet: 'Mercury', planetUrdu: 'عطارد', metal: 'پارہ', bodyPart: 'بازو' },
  'ل': { letter: 'ل', name: 'لام', abjadKabir: 30, abjadSaghir: 3, element: 'earth', elementUrdu: 'خاکی', nature: 'سرد و خشک', planet: 'Jupiter', planetUrdu: 'مشتری', metal: 'پیتل', bodyPart: 'ران' },
  'م': { letter: 'م', name: 'میم', abjadKabir: 40, abjadSaghir: 4, element: 'fire', elementUrdu: 'آتشی', nature: 'گرم و خشک', planet: 'Venus', planetUrdu: 'زہرہ', metal: 'تانبا', bodyPart: 'چہرہ' },
  'ن': { letter: 'ن', name: 'نون', abjadKabir: 50, abjadSaghir: 5, element: 'air', elementUrdu: 'بادی', nature: 'گرم و تر', planet: 'Saturn', planetUrdu: 'زحل', metal: 'سیسہ', bodyPart: 'ناک' },
  'س': { letter: 'س', name: 'سین', abjadKabir: 60, abjadSaghir: 6, element: 'water', elementUrdu: 'آبی', nature: 'سرد و تر', planet: 'Sun', planetUrdu: 'شمس', metal: 'سونا', bodyPart: 'آنکھ' },
  'ع': { letter: 'ع', name: 'عین', abjadKabir: 70, abjadSaghir: 7, element: 'earth', elementUrdu: 'خاکی', nature: 'سرد و خشک', planet: 'Moon', planetUrdu: 'قمر', metal: 'چاندی', bodyPart: 'کان' },
  'ف': { letter: 'ف', name: 'فے', abjadKabir: 80, abjadSaghir: 8, element: 'fire', elementUrdu: 'آتشی', nature: 'گرم و خشک', planet: 'Mars', planetUrdu: 'مریخ', metal: 'لوہا', bodyPart: 'زبان' },
  'ص': { letter: 'ص', name: 'صاد', abjadKabir: 90, abjadSaghir: 9, element: 'air', elementUrdu: 'بادی', nature: 'گرم و تر', planet: 'Mercury', planetUrdu: 'عطارد', metal: 'پارہ', bodyPart: 'گردہ' },
  'ق': { letter: 'ق', name: 'قاف', abjadKabir: 100, abjadSaghir: 1, element: 'water', elementUrdu: 'آبی', nature: 'سرد و تر', planet: 'Jupiter', planetUrdu: 'مشتری', metal: 'پیتل', bodyPart: 'مثانہ' },
  'ر': { letter: 'ر', name: 'رے', abjadKabir: 200, abjadSaghir: 2, element: 'earth', elementUrdu: 'خاکی', nature: 'سرد و خشک', planet: 'Venus', planetUrdu: 'زہرہ', metal: 'تانبا', bodyPart: 'جگر' },
  'ش': { letter: 'ش', name: 'شین', abjadKabir: 300, abjadSaghir: 3, element: 'fire', elementUrdu: 'آتشی', nature: 'گرم و خشک', planet: 'Saturn', planetUrdu: 'زحل', metal: 'سیسہ', bodyPart: 'تلی' },
  'ت': { letter: 'ت', name: 'تے', abjadKabir: 400, abjadSaghir: 4, element: 'air', elementUrdu: 'بادی', nature: 'گرم و تر', planet: 'Sun', planetUrdu: 'شمس', metal: 'سونا', bodyPart: 'ہڈیاں' },
  'ث': { letter: 'ث', name: 'ثے', abjadKabir: 500, abjadSaghir: 5, element: 'water', elementUrdu: 'آبی', nature: 'سرد و تر', planet: 'Moon', planetUrdu: 'قمر', metal: 'چاندی', bodyPart: 'جلد' },
  'خ': { letter: 'خ', name: 'خے', abjadKabir: 600, abjadSaghir: 6, element: 'earth', elementUrdu: 'خاکی', nature: 'سرد و خشک', planet: 'Mars', planetUrdu: 'مریخ', metal: 'لوہا', bodyPart: 'رگیں' },
  'ذ': { letter: 'ذ', name: 'ذال', abjadKabir: 700, abjadSaghir: 7, element: 'fire', elementUrdu: 'آتشی', nature: 'گرم و خشک', planet: 'Mercury', planetUrdu: 'عطارد', metal: 'پارہ', bodyPart: 'معدہ' },
  'ض': { letter: 'ض', name: 'ضاد', abjadKabir: 800, abjadSaghir: 8, element: 'air', elementUrdu: 'بادی', nature: 'گرم و تر', planet: 'Jupiter', planetUrdu: 'مشتری', metal: 'پیتل', bodyPart: 'دماغ' },
  'ظ': { letter: 'ظ', name: 'ظوئے', abjadKabir: 900, abjadSaghir: 9, element: 'water', elementUrdu: 'آبی', nature: 'سرد و تر', planet: 'Venus', planetUrdu: 'زہرہ', metal: 'تانبا', bodyPart: 'اعصاب' },
  'غ': { letter: 'غ', name: 'غین', abjadKabir: 1000, abjadSaghir: 1, element: 'earth', elementUrdu: 'خاکی', nature: 'سرد و خشک', planet: 'Saturn', planetUrdu: 'زحل', metal: 'سیسہ', bodyPart: 'خون' },
};

// Additional Urdu mapping according to Kash Al-Barny
export const URDU_LETTER_EQUIVALENTS: Record<string, string> = {
  'پ': 'ب',
  'ٹ': 'ت',
  'چ': 'ج',
  'ڈ': 'د',
  'ڑ': 'ر',
  'ژ': 'ز',
  'گ': 'ک',
  'ں': 'ن',
  'ے': 'ی',
  'ة': 'ت',
  'آ': 'ا',
  'أ': 'ا',
  'إ': 'ا',
  'ء': 'ا',
  'ئ': 'ی',
  'ؤ': 'و',
  'ہ': 'ہ',
  'ھ': 'ہ',
};

// Planetary metadata
export const PLANET_INFO: Record<string, { nameUrdu: string; day: string; saat: string; incense: string; nature: string }> = {
  'Sun': { nameUrdu: 'شمس (سورج)', day: 'اتوار (یکشنبہ)', saat: 'پہلی و آٹھویں ساعت', incense: 'عود، صندل سرخ، لبان', nature: 'سعد و حاکم و نوری' },
  'Moon': { nameUrdu: 'قمر (چاند)', day: 'پیر (دوشنبہ)', saat: 'پہلی و آٹھویں ساعت', incense: 'کافور، صندل سفید، گلاب', nature: 'سعد مائل بہ برودت' },
  'Mars': { nameUrdu: 'مریخ (بہام)', day: 'منگل (سہ شنبہ)', saat: 'پہلی و آٹھویں ساعت', incense: 'حرمل، رائی، گندھک، مصطگی', nature: 'نحس اصغر و جلالی' },
  'Mercury': { nameUrdu: 'عطارد (تیر)', day: 'بدھ (چہار شنبہ)', saat: 'پہلی و آٹھویں ساعت', incense: 'جاوتری، لونگ، لوبان', nature: 'ممتزج (جس کے ساتھ ہو ویسا)' },
  'Jupiter': { nameUrdu: 'مشتری (برجیس)', day: 'جمعرات (پنجشنبہ)', saat: 'پہلی و آٹھویں ساعت', incense: 'عنبر، مشک، زعفران', nature: 'سعد اکبر و جمالی' },
  'Venus': { nameUrdu: 'زہرہ (ناہید)', day: 'جمعہ (آدینہ)', saat: 'پہلی و آٹھویں ساعت', incense: 'صندل، عطر چنبیلی، لبان ذکر', nature: 'سعد اصغر و پرکشش' },
  'Saturn': { nameUrdu: 'زحل (کیوان)', day: 'ہفتہ (شنبہ)', saat: 'پہلی و آٹھویں ساعت', incense: 'صبر، حلتیک (ہینگ)، لبان سیاہ', nature: 'نحس اکبر و غلیظ' },
};

// Function to clean and normalize Arabic/Urdu text
export function normalizeJafrText(text: string): string {
  if (!text) return '';
  return text
    .trim()
    .replace(/[\s\d\p{P}\p{S}]/gu, '')
    .replace(/[َُِّْٰٓ]/g, '');
}

// Convert integer to its Jafr letters
export function adadToLetters(num: number): string {
  if (num <= 0) return '';
  let remaining = num;
  let result = '';

  const values = [
    { val: 1000, char: 'غ' },
    { val: 900, char: 'ظ' },
    { val: 800, char: 'ض' },
    { val: 700, char: 'ذ' },
    { val: 600, char: 'خ' },
    { val: 500, char: 'ث' },
    { val: 400, char: 'ت' },
    { val: 300, char: 'ش' },
    { val: 200, char: 'ر' },
    { val: 100, char: 'ق' },
    { val: 90, char: 'ص' },
    { val: 80, char: 'ف' },
    { val: 70, char: 'ع' },
    { val: 60, char: 'س' },
    { val: 50, char: 'ن' },
    { val: 40, char: 'م' },
    { val: 30, char: 'ل' },
    { val: 20, char: 'ک' },
    { val: 10, char: 'ی' },
    { val: 9, char: 'ط' },
    { val: 8, char: 'ح' },
    { val: 7, char: 'ز' },
    { val: 6, char: 'و' },
    { val: 5, char: 'ہ' },
    { val: 4, char: 'د' },
    { val: 3, char: 'ج' },
    { val: 2, char: 'ب' },
    { val: 1, char: 'ا' },
  ];

  for (const item of values) {
    while (remaining >= item.val) {
      result += item.char;
      remaining -= item.val;
    }
  }
  return result;
}

// Calculate Abjad Kabir and Saghir
export function calculateAbjad(rawText: string): CalculationResult {
  const cleaned = normalizeJafrText(rawText);
  let totalKabir = 0;
  let totalSaghir = 0;
  const letterBreakdown: CalculationResult['letterBreakdown'] = [];
  const elementCounts = { fire: 0, air: 0, water: 0, earth: 0 };

  for (const char of cleaned) {
    const baseChar = URDU_LETTER_EQUIVALENTS[char] || char;
    const info = ABJAD_TABLE[baseChar];
    if (info) {
      totalKabir += info.abjadKabir;
      totalSaghir += info.abjadSaghir;
      elementCounts[info.element]++;
      letterBreakdown.push({
        letter: char,
        kabir: info.abjadKabir,
        element: info.element,
        elementUrdu: info.elementUrdu,
      });
    }
  }

  const letterCount = letterBreakdown.length || 1;
  const elementPercentages = {
    fire: Math.round((elementCounts.fire / letterCount) * 100),
    air: Math.round((elementCounts.air / letterCount) * 100),
    water: Math.round((elementCounts.water / letterCount) * 100),
    earth: Math.round((elementCounts.earth / letterCount) * 100),
  };

  // Determine dominant element
  let dominantElement: ElementType = 'fire';
  let maxCount = -1;
  (['fire', 'air', 'water', 'earth'] as ElementType[]).forEach((el) => {
    if (elementCounts[el] > maxCount) {
      maxCount = elementCounts[el];
      dominantElement = el;
    }
  });

  const dominantElementUrdu =
    dominantElement === 'fire' ? 'آتشی (آگ)' :
    dominantElement === 'air' ? 'بادی (ہوا)' :
    dominantElement === 'water' ? 'آبی (پانی)' : 'خاکی (مٹی)';

  // Calculate Upper Angelic Muwakkil (استخراج موکل علوی)
  // According to Kash Al-Barny: Convert totalKabir to letters and append 'ئیل' (e.g. جبرائیل، شمشائیل)
  const lettersFromAdad = adadToLetters(totalKabir);
  const ulwiMuwakkil = (lettersFromAdad ? lettersFromAdad : 'طاط') + 'ائیل';

  // Calculate Subterranean Awan (استخراج عون سفلی)
  // Append 'طوش' or 'طش' or 'یوش'
  const sifliAwan = (lettersFromAdad ? lettersFromAdad : 'طاط') + 'طوش';

  // Map to planet based on modulus 7
  const planetsList = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const planetKey = planetsList[totalKabir % 7];
  const pInfo = PLANET_INFO[planetKey];

  const natureDescriptions: Record<ElementType, string> = {
    fire: 'طبیعت میں غلبہ حرارت و خشکی ہے۔ یہ نام یا عبارت فوری اثر، جلال، غلبہ، اور ارادے کی قوت کی حامل ہے۔ اعمال محبت میں جلانے یا چراغ میں رکھنے سے جلد اثر کرتی ہے۔',
    air: 'طبیعت میں غلبہ حرارت و رطوبت ہے۔ یہ نام تحریک، تسخیر، سفر، اور دلوں کو مسخر کرنے میں تیز تر ہے۔ عمل کو درخت پر باندھنا یا ہوا میں لٹکانا نافع ہے۔',
    water: 'طبیعت میں غلبہ برودت و رطوبت ہے۔ یہ نام الفت، مٹھاس، تسکین، اور صلح و آشتی کے لیے پرتاثیر ہے۔ نقش کو پانی میں گھول کر پلانا یا بہتے پانی میں ڈالنا موزوں ہے۔',
    earth: 'طبیعت میں غلبہ برودت و خشکی ہے۔ یہ نام ثبات، استحکام، زبان بندی، اور تسخیر قلوب کے لیے دیرپا اثر رکھتا ہے۔ نقش کو زمین میں دبانا یا وزنی پتھر کے نیچے رکھنا دستور ہے۔',
  };

  return {
    text: rawText,
    cleanedText: cleaned,
    totalKabir,
    totalSaghir,
    letterCount: letterBreakdown.length,
    letterBreakdown,
    elementCounts,
    elementPercentages,
    dominantElement,
    dominantElementUrdu,
    ulwiMuwakkil,
    sifliAwan,
    governingPlanet: planetKey,
    governingPlanetUrdu: pInfo.nameUrdu,
    favorableDay: pInfo.day,
    favorableSaat: pInfo.saat,
    incense: pInfo.incense,
    natureDescription: natureDescriptions[dominantElement],
  };
}

// -------------------------------------------------------------
// Takseer Sadr-o-Mu'akhkhar Algorithm (تکسیر صدر و مؤخر)
// According to Kash Al-Barny (علم تکسیر و رموز الجفر)
// -------------------------------------------------------------
export function generateTakseerSadrMuakhkhar(input: string, maxIterations = 30): TakseerResult {
  const cleaned = normalizeJafrText(input);
  if (!cleaned) {
    return {
      originalText: input,
      letters: [],
      steps: [],
      totalCycles: 0,
      zamamaReached: false,
      extractedAzimat: [],
      talismanicSeal: '',
    };
  }

  const initialLetters = cleaned.split('');
  const steps: TakseerStep[] = [
    {
      stepNumber: 1,
      letters: [...initialLetters],
      combined: initialLetters.join(' '),
      extractedName: initialLetters.slice(0, 4).join('') + 'ائیل',
    },
  ];

  let currentLetters = [...initialLetters];
  const targetPattern = initialLetters.join('');
  let zamamaReached = false;
  const extractedAzimat: string[] = [];

  for (let stepIdx = 2; stepIdx <= maxIterations; stepIdx++) {
    const nextLetters: string[] = [];
    let left = 0;
    let right = currentLetters.length - 1;
    let turn = true; // true = take from right (Mu'akhkhar), false = take from left (Sadr) or vice-versa

    // Kash Al-Barny rule: Sadr (first letter) -> Mu'akhkhar (last letter) -> second letter -> second-to-last letter
    while (left <= right) {
      if (turn) {
        nextLetters.push(currentLetters[right]);
        right--;
      } else {
        nextLetters.push(currentLetters[left]);
        left++;
      }
      turn = !turn;
    }

    const combinedStr = nextLetters.join(' ');
    const extractedWord = nextLetters.slice(0, 3).join('') + 'یائیل';
    extractedAzimat.push(extractedWord);

    steps.push({
      stepNumber: stepIdx,
      letters: nextLetters,
      combined: combinedStr,
      extractedName: extractedWord,
    });

    if (nextLetters.join('') === targetPattern) {
      zamamaReached = true;
      break;
    }

    currentLetters = nextLetters;
  }

  // Create a composite talismanic seal from the first letter of each row (عزیمت استخراجی)
  const sealLetters = steps.map((s) => s.letters[0] || '').join('');
  const talismanicSeal = sealLetters + ' ' + (steps[steps.length - 1]?.letters.slice(0, 4).join('') || '');

  return {
    originalText: input,
    takseerType: 'sadr_muakhkhar',
    takseerTypeNameUrdu: 'تکسیر صدر و مؤخر (قوانینِ جفر کاش البرنی)',
    letters: initialLetters,
    steps,
    totalCycles: steps.length,
    zamamaReached,
    extractedAzimat: Array.from(new Set(extractedAzimat)),
    talismanicSeal,
    explanationNotes: [
      'طریقہ: سطر کے اول و آخر سے متواتر حروف کے انتخاب سے زمام و قفل بندی حاصل ہوتی ہے۔',
      'کاش البرنی قاعدہ: یہ تکسیر ہر قسم کے طلسمات اور تسخیرِ ارواح کی ام الاصناف ہے۔',
    ],
  };
}

// -------------------------------------------------------------
// Takseer-e-Aflatoon (تکسیر افلاطون: بسط و امتزاج عناصر اربعہ)
// Based on Kash Al-Barny's "Qawaneen Aflatoon" & "Qawaneen Tilism"
// Elements: Fire (آتشی), Air (بادی), Water (آبی), Earth (خاکی)
// -------------------------------------------------------------
export function generateTakseerAflatoon(
  input: string,
  secondaryInput: string = '',
  maxIterations = 30
): TakseerResult {
  const primaryCleaned = normalizeJafrText(input);
  const secondaryCleaned = normalizeJafrText(secondaryInput);
  const combinedRaw = secondaryCleaned ? `${primaryCleaned}${secondaryCleaned}` : primaryCleaned;

  if (!combinedRaw) {
    return {
      originalText: input,
      takseerType: 'aflatoon_elements',
      takseerTypeNameUrdu: 'تکسیرِ افلاطون (امتزاجِ عناصر و تسخیرِ ارواح)',
      letters: [],
      steps: [],
      totalCycles: 0,
      zamamaReached: false,
      extractedAzimat: [],
      talismanicSeal: '',
    };
  }

  // Group letters according to Plato's 4 Elements (عناصرِ اربعہ)
  const elementalBreakdown: { fire: string[]; air: string[]; water: string[]; earth: string[] } = {
    fire: [],
    air: [],
    water: [],
    earth: [],
  };

  const allChars = combinedRaw.split('');
  allChars.forEach((char) => {
    const baseChar = URDU_LETTER_EQUIVALENTS[char] || char;
    const info = ABJAD_TABLE[baseChar];
    const el = info ? info.element : 'fire';
    elementalBreakdown[el].push(char);
  });

  // Plato's Natural Harmonious Interlacing Order (آتش -> ہوا -> آب -> خاک)
  // With sympathetical bridging: Fire is bridged to Water via Air, Earth stabilizes all.
  const aflatoonOrderedLetters: string[] = [];
  const maxElLen = Math.max(
    elementalBreakdown.fire.length,
    elementalBreakdown.air.length,
    elementalBreakdown.water.length,
    elementalBreakdown.earth.length
  );

  for (let i = 0; i < maxElLen; i++) {
    if (elementalBreakdown.fire[i]) aflatoonOrderedLetters.push(elementalBreakdown.fire[i]);
    if (elementalBreakdown.air[i]) aflatoonOrderedLetters.push(elementalBreakdown.air[i]);
    if (elementalBreakdown.water[i]) aflatoonOrderedLetters.push(elementalBreakdown.water[i]);
    if (elementalBreakdown.earth[i]) aflatoonOrderedLetters.push(elementalBreakdown.earth[i]);
  }

  // If input was uniform in one element, fall back to initial letters
  const baseLetters = aflatoonOrderedLetters.length > 0 ? aflatoonOrderedLetters : allChars;

  const steps: TakseerStep[] = [
    {
      stepNumber: 1,
      letters: [...baseLetters],
      combined: baseLetters.join(' '),
      extractedName: baseLetters.slice(0, 4).join('') + 'ائیل (موکل افلاطونی)',
    },
  ];

  let currentLetters = [...baseLetters];
  const targetPattern = baseLetters.join('');
  let zamamaReached = false;
  const extractedAzimat: string[] = [];

  // Plato's Circular Elemental Permutation Flow (تقلیبِ افلاطونی):
  // Alternating element-harmonic shifts: takes head-tail cross interlaced with internal element rotation
  for (let stepIdx = 2; stepIdx <= maxIterations; stepIdx++) {
    const nextLetters: string[] = [];
    const n = currentLetters.length;

    // Plato's elemental spiral shift:
    // 1st take from center-outwards and outer-inwards to achieve elemental alchemy
    let left = 0;
    let right = n - 1;
    let turn = stepIdx % 2 === 0;

    while (left <= right) {
      if (left === right) {
        nextLetters.push(currentLetters[left]);
        break;
      }
      if (turn) {
        nextLetters.push(currentLetters[left]);
        nextLetters.push(currentLetters[right]);
      } else {
        nextLetters.push(currentLetters[right]);
        nextLetters.push(currentLetters[left]);
      }
      left++;
      right--;
      turn = !turn;
    }

    const combinedStr = nextLetters.join(' ');
    const extractedWord = nextLetters.slice(0, 3).join('') + 'طائیل';
    extractedAzimat.push(extractedWord);

    steps.push({
      stepNumber: stepIdx,
      letters: nextLetters,
      combined: combinedStr,
      extractedName: extractedWord,
    });

    if (nextLetters.join('') === targetPattern) {
      zamamaReached = true;
      break;
    }

    currentLetters = nextLetters;
  }

  // Harmony score calculation based on 4 elements distribution
  const totalLetters = allChars.length || 1;
  const variance =
    Math.pow(elementalBreakdown.fire.length / totalLetters - 0.25, 2) +
    Math.pow(elementalBreakdown.air.length / totalLetters - 0.25, 2) +
    Math.pow(elementalBreakdown.water.length / totalLetters - 0.25, 2) +
    Math.pow(elementalBreakdown.earth.length / totalLetters - 0.25, 2);
  const harmonyScore = Math.max(50, Math.min(100, Math.round((1 - Math.sqrt(variance)) * 100)));

  // Talismanic Seal from Vertical First and Middle Letters
  const sealLetters = steps.map((s) => s.letters[0] || '').join('');
  const middleLetters = steps.map((s) => s.letters[Math.floor(s.letters.length / 2)] || '').join('');
  const talismanicSeal = `${sealLetters.slice(0, 7)} ${middleLetters.slice(0, 7)} قفلِ افلاطون`;

  return {
    originalText: input,
    takseerType: 'aflatoon_elements',
    takseerTypeNameUrdu: 'تکسیرِ افلاطون (امتزاجِ عناصر اربعہ و طلسمِ تسخیر)',
    letters: baseLetters,
    steps,
    totalCycles: steps.length,
    zamamaReached,
    extractedAzimat: Array.from(new Set(extractedAzimat)),
    talismanicSeal,
    elementalBreakdown,
    harmonyScore,
    explanationNotes: [
      'قاعدہ افلاطون: حروف کو ان کے طبائع (آتش، ہوا، آب، خاک) کے باہمی توازن کے مطابق جوڑا جاتا ہے۔',
      'کاش البرنی (قوانین افلاطون): طالب اور مطلوب یا اسمائے خیر کے حروف میں جب چاروں عناصر کا امتزاج قائم ہو تو زمام کی تاخیر ختم اور اثر فوری ہوتا ہے۔',
      `سکورِ توازنِ عناصر: ${harmonyScore}% (اعلیٰ روحانی ہم آہنگی)`,
    ],
  };
}

export function generateTakseerUniversal(
  input: string,
  takseerType: TakseerType = 'sadr_muakhkhar',
  secondaryInput: string = '',
  maxIterations = 30
): TakseerResult {
  if (takseerType === 'aflatoon_elements') {
    return generateTakseerAflatoon(input, secondaryInput, maxIterations);
  }
  return generateTakseerSadrMuakhkhar(input, maxIterations);
}

// -------------------------------------------------------------
// Naqsh Matrix Construction Engine (نقش مثلث، مربع، مخمس)
// Formulated with Kasr rules and 4 Element Chals from Kash Al-Barny
// -------------------------------------------------------------

// Ghazali 3x3 Base Matrix
// Base constant = 12 (sum = 3*n + 12). Base quotient = (Total - 12) / 3
const MUSALLAS_CHAL_ORDER: Record<ChalType, number[][]> = {
  // Houses numbered 1 through 9
  // Atishi Chal (Fire path: starts top-middle, etc.)
  atishi: [
    [8, 1, 6],
    [3, 5, 7],
    [4, 9, 2],
  ],
  // Badi Chal (Air path)
  badi: [
    [6, 7, 2],
    [1, 5, 9],
    [8, 3, 4],
  ],
  // Aabi Chal (Water path)
  aabi: [
    [2, 9, 4],
    [7, 5, 3],
    [6, 1, 8],
  ],
  // Khaaki Chal (Earth path)
  khaaki: [
    [4, 3, 8],
    [9, 5, 1],
    [2, 7, 6],
  ],
};

// 4x4 Zul-Kitabat Base Matrix
// Base constant = 30. Base quotient = (Total - 30) / 4
const MURABBA_CHAL_ORDER: Record<ChalType, number[][]> = {
  atishi: [
    [1, 14, 15, 4],
    [12, 7, 6, 9],
    [8, 11, 10, 5],
    [13, 2, 3, 16],
  ],
  badi: [
    [4, 15, 14, 1],
    [9, 6, 7, 12],
    [5, 10, 11, 8],
    [16, 3, 2, 13],
  ],
  aabi: [
    [13, 2, 3, 16],
    [8, 11, 10, 5],
    [12, 7, 6, 9],
    [1, 14, 15, 4],
  ],
  khaaki: [
    [16, 3, 2, 13],
    [5, 10, 11, 8],
    [9, 6, 7, 12],
    [4, 15, 14, 1],
  ],
};

export function generateNaqsh(totalAdad: number, type: NaqshType = 'musallas', chal: ChalType = 'atishi'): NaqshResult {
  const chalNames: Record<ChalType, string> = {
    atishi: 'آتشی چال (مشرق و شمس - برائے تسخیر، ہیبت و سرعت)',
    badi: 'بادی چال (شمال و ہوا - برائے محبت، الفت و کشش)',
    aabi: 'آبی چال (مغرب و قمر - برائے تسکین، صلح و شفا)',
    khaaki: 'خاکی چال (جنوب و زمین - برائے ثبات، دفینہ و زبان بندی)',
  };

  if (type === 'musallas') {
    // 3x3 Magic Square
    const baseConstant = 12;
    const quotient = Math.floor((totalAdad - baseConstant) / 3);
    const kasr = (totalAdad - baseConstant) % 3;

    // Houses map: 1..9
    // If kasr == 1 -> add 1 to houses 7, 8, 9
    // If kasr == 2 -> add 1 to houses 4, 5, 6, 7, 8, 9 (or add 2 to 7..9)
    const houseValues: Record<number, number> = {};
    for (let h = 1; h <= 9; h++) {
      let val = quotient + (h - 1);
      if (kasr === 1 && h >= 7) {
        val += 1;
      } else if (kasr === 2 && h >= 4) {
        val += 1;
      }
      houseValues[h] = val;
    }

    const orderMatrix = MUSALLAS_CHAL_ORDER[chal];
    const grid: number[][] = [
      [houseValues[orderMatrix[0][0]], houseValues[orderMatrix[0][1]], houseValues[orderMatrix[0][2]]],
      [houseValues[orderMatrix[1][0]], houseValues[orderMatrix[1][1]], houseValues[orderMatrix[1][2]]],
      [houseValues[orderMatrix[2][0]], houseValues[orderMatrix[2][1]], houseValues[orderMatrix[2][2]]],
    ];

    const rowSums = grid.map((r) => r.reduce((a, b) => a + b, 0));
    const colSums = [0, 1, 2].map((c) => grid[0][c] + grid[1][c] + grid[2][c]);
    const diagSums = [grid[0][0] + grid[1][1] + grid[2][2], grid[0][2] + grid[1][1] + grid[2][0]];

    const chalOrderExplanation = [
      `کل اعداد: ${totalAdad}`,
      `قاعدہ کاش البرنی: (کل اعداد - 12) ÷ 3 = مفتاح (${quotient}) | کسر = ${kasr}`,
      kasr === 1 ? 'کسر 1 ہے: خانہ نمبر 7، 8، 9 میں ایک ایک عدد کا اضافہ کیا گیا ہے۔' :
      kasr === 2 ? 'کسر 2 ہے: خانہ نمبر 4، 5، 6، 7، 8، 9 میں ایک ایک عدد کا اضافہ کیا گیا ہے۔' :
      'کوئی کسر نہیں (کسر 0): نقش بغیر کسی توقف کے ہموار پر کیا گیا ہے۔',
      `منتخب چال: ${chalNames[chal]}`,
    ];

    return {
      dimension: 3,
      type,
      chal,
      chalNameUrdu: chalNames[chal],
      totalAdad,
      baseAdad: quotient,
      subtractionConstant: baseConstant,
      quotient,
      kasr,
      kasrPosition: kasr === 1 ? 7 : kasr === 2 ? 4 : null,
      grid,
      rowSums,
      colSums,
      diagSums,
      isValid: rowSums.every((s) => s === totalAdad) && colSums.every((s) => s === totalAdad),
      chalOrderExplanation,
    };
  }

  if (type === 'murabba') {
    // 4x4 Magic Square
    const baseConstant = 30;
    const quotient = Math.floor((totalAdad - baseConstant) / 4);
    const kasr = (totalAdad - baseConstant) % 4;

    const houseValues: Record<number, number> = {};
    for (let h = 1; h <= 16; h++) {
      let val = quotient + (h - 1);
      if (kasr === 1 && h >= 13) {
        val += 1;
      } else if (kasr === 2 && h >= 9) {
        val += 1;
      } else if (kasr === 3 && h >= 5) {
        val += 1;
      }
      houseValues[h] = val;
    }

    const orderMatrix = MURABBA_CHAL_ORDER[chal];
    const grid: number[][] = orderMatrix.map((row) => row.map((hNum) => houseValues[hNum]));

    const rowSums = grid.map((r) => r.reduce((a, b) => a + b, 0));
    const colSums = [0, 1, 2, 3].map((c) => grid[0][c] + grid[1][c] + grid[2][c] + grid[3][c]);
    const diagSums = [
      grid[0][0] + grid[1][1] + grid[2][2] + grid[3][3],
      grid[0][3] + grid[1][2] + grid[2][1] + grid[3][0],
    ];

    const chalOrderExplanation = [
      `کل اعداد: ${totalAdad}`,
      `قاعدہ کاش البرنی: (کل اعداد - 30) ÷ 4 = مفتاح (${quotient}) | کسر = ${kasr}`,
      kasr === 1 ? 'کسر 1 ہے: خانہ نمبر 13 تا 16 میں ایک کا اضافہ کیا گیا ہے۔' :
      kasr === 2 ? 'کسر 2 ہے: خانہ نمبر 9 تا 16 میں ایک کا اضافہ کیا گیا ہے۔' :
      kasr === 3 ? 'کسر 3 ہے: خانہ نمبر 5 تا 16 میں ایک کا اضافہ کیا گیا ہے۔' :
      'کوئی کسر نہیں (کسر 0): نقش کامل و توازن کے ساتھ پر ہوا ہے۔',
      `منتخب چال: ${chalNames[chal]}`,
    ];

    return {
      dimension: 4,
      type,
      chal,
      chalNameUrdu: chalNames[chal],
      totalAdad,
      baseAdad: quotient,
      subtractionConstant: baseConstant,
      quotient,
      kasr,
      kasrPosition: kasr === 1 ? 13 : kasr === 2 ? 9 : kasr === 3 ? 5 : null,
      grid,
      rowSums,
      colSums,
      diagSums,
      isValid: rowSums.every((s) => s === totalAdad) && colSums.every((s) => s === totalAdad),
      chalOrderExplanation,
    };
  }

  if (type === 'mukhammas') {
    // Mukhammas 5x5
    const baseConstant = 60;
    const quotient = Math.floor((totalAdad - baseConstant) / 5);
    const kasr = (totalAdad - baseConstant) % 5;

    const grid: number[][] = Array(5)
      .fill(0)
      .map(() => Array(5).fill(0));

    // Fill 5x5 Siamese method with base quotient
    let r = 0;
    let c = 2;
    for (let num = 1; num <= 25; num++) {
      let added = quotient + (num - 1);
      if (kasr > 0 && num >= 26 - kasr * 5) {
        added += 1;
      }
      grid[r][c] = added;
      const nextR = (r - 1 + 5) % 5;
      const nextC = (c + 1) % 5;
      if (grid[nextR][nextC] !== 0) {
        r = (r + 1) % 5;
      } else {
        r = nextR;
        c = nextC;
      }
    }

    const rowSums = grid.map((row) => row.reduce((a, b) => a + b, 0));
    const colSums = [0, 1, 2, 3, 4].map((col) => grid[0][col] + grid[1][col] + grid[2][col] + grid[3][col] + grid[4][col]);
    const diagSums = [
      grid[0][0] + grid[1][1] + grid[2][2] + grid[3][3] + grid[4][4],
      grid[0][4] + grid[1][3] + grid[2][2] + grid[3][1] + grid[4][0],
    ];

    return {
      dimension: 5,
      type: 'mukhammas',
      chal,
      chalNameUrdu: chalNames[chal],
      totalAdad,
      baseAdad: quotient,
      subtractionConstant: baseConstant,
      quotient,
      kasr,
      kasrPosition: null,
      grid,
      rowSums,
      colSums,
      diagSums,
      isValid: true,
      chalOrderExplanation: [
        `کل اعداد: ${totalAdad}`,
        `قاعدہ مخمس کاش البرنی: (کل اعداد - 60) ÷ 5 = مفتاح (${quotient}) | کسر = ${kasr}`,
        'نقش مخمس 5x5 برائے عظمت، وجاہت، تسخیر امراء و سلاطین۔',
      ],
    };
  }

  if (type === 'musaddas') {
    // Musaddas 6x6 (Sun Matrix - شمس)
    const baseConstant = 105;
    const quotient = Math.floor((totalAdad - baseConstant) / 6);
    const kasr = (totalAdad - baseConstant) % 6;

    // Standard 6x6 base magic square structure
    const base6x6 = [
      [35, 1, 6, 26, 19, 24],
      [3, 32, 7, 21, 23, 25],
      [31, 9, 2, 22, 27, 20],
      [8, 28, 33, 17, 10, 15],
      [30, 5, 34, 12, 14, 16],
      [4, 36, 29, 13, 18, 11]
    ];

    const grid = base6x6.map(row => row.map(cell => {
      let val = quotient + (cell - 1);
      if (kasr > 0 && cell >= 37 - kasr * 6) val += 1;
      return val;
    }));

    const rowSums = grid.map((r) => r.reduce((a, b) => a + b, 0));
    const colSums = [0, 1, 2, 3, 4, 5].map((c) => grid.reduce((acc, row) => acc + row[c], 0));
    const diagSums = [
      grid.reduce((acc, row, idx) => acc + row[idx], 0),
      grid.reduce((acc, row, idx) => acc + row[5 - idx], 0)
    ];

    return {
      dimension: 6,
      type: 'musaddas',
      chal,
      chalNameUrdu: chalNames[chal],
      totalAdad,
      baseAdad: quotient,
      subtractionConstant: baseConstant,
      quotient,
      kasr,
      kasrPosition: null,
      grid,
      rowSums,
      colSums,
      diagSums,
      isValid: true,
      chalOrderExplanation: [
        `کل اعداد: ${totalAdad}`,
        `قاعدہ مسدس کاش البرنی: (کل اعداد - 105) ÷ 6 = مفتاح (${quotient}) | کسر = ${kasr}`,
        'نقش مسدس 6x6 (منسوب بہ شمس) برائے جاہ و جلال، تسخیرِ حکام و فتحِ مہمات۔'
      ],
    };
  }

  if (type === 'musabba') {
    // Musabba 7x7 (Venus / 7 Planets Matrix - زہرہ و سبعہ سیارگان)
    const baseConstant = 168;
    const quotient = Math.floor((totalAdad - baseConstant) / 7);
    const kasr = (totalAdad - baseConstant) % 7;

    const grid: number[][] = Array(7).fill(0).map(() => Array(7).fill(0));
    let r = 0;
    let c = 3;
    for (let num = 1; num <= 49; num++) {
      let added = quotient + (num - 1);
      if (kasr > 0 && num >= 50 - kasr * 7) added += 1;
      grid[r][c] = added;
      const nextR = (r - 1 + 7) % 7;
      const nextC = (c + 1) % 7;
      if (grid[nextR][nextC] !== 0) {
        r = (r + 1) % 7;
      } else {
        r = nextR;
        c = nextC;
      }
    }

    const rowSums = grid.map((r) => r.reduce((a, b) => a + b, 0));
    const colSums = [0, 1, 2, 3, 4, 5, 6].map((c) => grid.reduce((acc, row) => acc + row[c], 0));
    const diagSums = [
      grid.reduce((acc, row, idx) => acc + row[idx], 0),
      grid.reduce((acc, row, idx) => acc + row[6 - idx], 0)
    ];

    return {
      dimension: 7,
      type: 'musabba',
      chal,
      chalNameUrdu: chalNames[chal],
      totalAdad,
      baseAdad: quotient,
      subtractionConstant: baseConstant,
      quotient,
      kasr,
      kasrPosition: null,
      grid,
      rowSums,
      colSums,
      diagSums,
      isValid: true,
      chalOrderExplanation: [
        `کل اعداد: ${totalAdad}`,
        `قاعدہ مسبع کاش البرنی: (کل اعداد - 168) ÷ 7 = مفتاح (${quotient}) | کسر = ${kasr}`,
        'نقش مسبع 7x7 برائے تسخیرِ قلوب، جلبِ محبت، الفتِ خاص و عام اور روحانی کشش۔'
      ],
    };
  }

  // Musamman 8x8 (Mercury Matrix - عطارد)
  const baseConstant = 252;
  const quotient = Math.floor((totalAdad - baseConstant) / 8);
  const kasr = (totalAdad - baseConstant) % 8;

  // Standard 8x8 Durer-like complementary symmetric matrix
  const grid: number[][] = Array(8).fill(0).map(() => Array(8).fill(0));
  let count = 1;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isCornerOrCenter =
        (i < 2 || i >= 6) && (j < 2 || j >= 6) ||
        (i >= 2 && i < 6) && (j >= 2 && j < 6);
      const cellVal = isCornerOrCenter ? 65 - count : count;
      let added = quotient + (cellVal - 1);
      if (kasr > 0 && cellVal >= 65 - kasr * 8) added += 1;
      grid[i][j] = added;
      count++;
    }
  }

  const rowSums = grid.map((r) => r.reduce((a, b) => a + b, 0));
  const colSums = [0, 1, 2, 3, 4, 5, 6, 7].map((c) => grid.reduce((acc, row) => acc + row[c], 0));
  const diagSums = [
    grid.reduce((acc, row, idx) => acc + row[idx], 0),
    grid.reduce((acc, row, idx) => acc + row[7 - idx], 0)
  ];

  return {
    dimension: 8,
    type: 'musamman',
    chal,
    chalNameUrdu: chalNames[chal],
    totalAdad,
    baseAdad: quotient,
    subtractionConstant: baseConstant,
    quotient,
    kasr,
    kasrPosition: null,
    grid,
    rowSums,
    colSums,
    diagSums,
    isValid: true,
    chalOrderExplanation: [
      `کل اعداد: ${totalAdad}`,
      `قاعدہ مثمن کاش البرنی: (کل اعداد - 252) ÷ 8 = مفتاح (${quotient}) | کسر = ${kasr}`,
      'نقش مثمن 8x8 برائے ذہانت، قوتِ حافظہ، تجارت، زبان بندی و کشائشِ علوم و فنون۔'
    ],
  };
}

/**
 * Converts a numerical number to Abjad Letter representation (حرفی نقش)
 */
export function numberToAbjadLetters(num: number): string {
  if (num <= 0) return '۔';
  const abjadLookup: { val: number; char: string }[] = [
    { val: 1000, char: 'غ' },
    { val: 900, char: 'ظ' },
    { val: 800, char: 'ض' },
    { val: 700, char: 'ذ' },
    { val: 600, char: 'خ' },
    { val: 500, char: 'ث' },
    { val: 400, char: 'ت' },
    { val: 300, char: 'ش' },
    { val: 200, char: 'ر' },
    { val: 100, char: 'ق' },
    { val: 90, char: 'ص' },
    { val: 80, char: 'ف' },
    { val: 70, char: 'ع' },
    { val: 60, char: 'س' },
    { val: 50, char: 'ن' },
    { val: 40, char: 'م' },
    { val: 30, char: 'ل' },
    { val: 20, char: 'ک' },
    { val: 10, char: 'ی' },
    { val: 9, char: 'ط' },
    { val: 8, char: 'ح' },
    { val: 7, char: 'ز' },
    { val: 6, char: 'و' },
    { val: 5, char: 'ہ' },
    { val: 4, char: 'د' },
    { val: 3, char: 'ج' },
    { val: 2, char: 'ب' },
    { val: 1, char: 'ا' },
  ];

  let remaining = num;
  let result = '';
  for (const item of abjadLookup) {
    while (remaining >= item.val) {
      result += item.char;
      remaining -= item.val;
    }
  }
  return result || 'ا';
}

// -------------------------------------------------------------
// Compatibility Calculator for Seeker (Talib) and Target (Matloob)
// Based on Kash Al-Barny's Rules of Love & Friendship
// -------------------------------------------------------------
export interface CompatibilityReport {
  talibName: string;
  talibMother: string;
  matloobName: string;
  matloobMother: string;
  talibAdad: number;
  matloobAdad: number;
  totalCombinedAdad: number;
  talibElement: ElementType;
  matloobElement: ElementType;
  talibElementUrdu: string;
  matloobElementUrdu: string;
  harmonyScore: number;
  harmonyStatus: string;
  harmonyAnalysis: string;
  remedyRecommendation: string;
  favorableSaat: string;
  incense: string;
}

export function calculateCompatibility(
  talibName: string,
  talibMother: string,
  matloobName: string,
  matloobMother: string
): CompatibilityReport {
  const talibCalc = calculateAbjad(`${talibName} ${talibMother}`);
  const matloobCalc = calculateAbjad(`${matloobName} ${matloobMother}`);

  const e1 = talibCalc.dominantElement;
  const e2 = matloobCalc.dominantElement;

  // Elemental relations according to Kash Al-Barny:
  // Fire & Air: Friendly (Air fuels Fire) -> 95%
  // Water & Earth: Friendly (Water nourishes Earth) -> 90%
  // Same elements: 80% (Moderate/Natural harmony)
  // Air & Water: Moderate (Rain/Wind) -> 65%
  // Fire & Earth: Moderate (Volcano/Ash) -> 60%
  // Fire & Water: Hostile (Water quenches Fire) -> 35%
  // Air & Earth: Hostile (Dust storm) -> 40%

  let score = 75;
  let status = 'مناسب و متوافق';
  let analysis = '';
  let remedy = '';

  if ((e1 === 'fire' && e2 === 'air') || (e1 === 'air' && e2 === 'fire')) {
    score = 96;
    status = 'کامل الفت و موافقت (آتش و باد)';
    analysis = 'آگ اور ہوا میں فطری ہم آہنگی ہے۔ ہوا آگ کو تیز کرتی ہے اور آگ ہوا کو گرماتی ہے۔ دونوں کے درمیان محبت، رغبت اور موافقت انتہائی مضبوط رہے گی۔';
    remedy = 'کسی خاص علاج کی ضرورت نہیں۔ برائے مزید پختگی روزانہ 100 مرتبہ "یا ودود یا حبیب" کا ورد کریں۔';
  } else if ((e1 === 'water' && e2 === 'earth') || (e1 === 'earth' && e2 === 'water')) {
    score = 92;
    status = 'مستحکم اور بابرکت الفت (آب و خاک)';
    analysis = 'پانی اور مٹی کا ملاپ روئیدگی اور پیداوار کا ضامن ہے۔ مٹی پانی کو سنبھالتی ہے اور پانی مٹی کو سرسبز بناتا ہے۔ تعلق میں پائیداری اور وقار رہے گا۔';
    remedy = 'نقش مثلث آبی زعفران سے لکھ کر میٹھے پانی میں پلائیں تاکہ محبت دل میں راسخ ہو جائے۔';
  } else if (e1 === e2) {
    score = 80;
    status = 'ہم عنصری یکسانیت (مشابہت مزاج)';
    analysis = 'دونوں کے عناصر یکساں ہیں۔ مزاج میں موافقت تو ہے مگر بعض اوقات انا اور ضد کا ٹکراؤ پیدا ہو سکتا ہے۔';
    remedy = 'ساعت زہرہ میں عمل حب انجام دیں اور مشک و عنبر کی دھونی دیں۔';
  } else if ((e1 === 'fire' && e2 === 'water') || (e1 === 'water' && e2 === 'fire')) {
    score = 35;
    status = 'متضاد و مخالف عناصر (آتش و آب)';
    analysis = 'پانی آگ کو بجھاتا ہے اور آگ پانی کو ابال کر ختم کر دیتی ہے۔ دونوں کے خیالات و جذبات میں بار بار نزاع اور بدگمانی پیدا ہونے کا خدشہ ہے۔';
    remedy = 'کاش البرنی کا خاص نسخہ تسخیر: درمیان میں صلح کرانے کے لیے "عنصر باد" کو واسطہ بنائیں (مثلاً نقش کو ہوا میں لٹکائیں) تاکہ آگ اور پانی میں توازن پیدا ہو۔';
  } else if ((e1 === 'air' && e2 === 'earth') || (e1 === 'earth' && e2 === 'air')) {
    score = 42;
    status = 'غیر متوازن تعلق (باد و خاک)';
    analysis = 'ہوا مٹی کو اڑاتی ہے اور مٹی ہوا کو مکدر کرتی ہے۔ تعلق میں بے ترتیبی اور عدم استحکام رہ سکتا ہے۔';
    remedy = 'نقش مربع کو کسی وزنی اور پاک جگہ رکھیں اور 40 دن تک آیت الکرسی کے حصار کے ساتھ عمل الفت کریں۔';
  } else {
    score = 65;
    status = 'معتدل و درمیانہ تعلق';
    analysis = 'عناصر کے درمیان نہ تو سخت مخالفت ہے اور نہ ہی غیر معمولی کشش۔ کوشش اور دعا سے تعلق بہت خوشگوار بن سکتا ہے۔';
    remedy = 'ساعت مشتری میں جمعرات کے دن صندل اور لوبان سلگا کر حب کا نقش تیار کریں۔';
  }

  return {
    talibName,
    talibMother,
    matloobName,
    matloobMother,
    talibAdad: talibCalc.totalKabir,
    matloobAdad: matloobCalc.totalKabir,
    totalCombinedAdad: talibCalc.totalKabir + matloobCalc.totalKabir,
    talibElement: e1,
    matloobElement: e2,
    talibElementUrdu: talibCalc.dominantElementUrdu,
    matloobElementUrdu: matloobCalc.dominantElementUrdu,
    harmonyScore: score,
    harmonyStatus: status,
    harmonyAnalysis: analysis,
    remedyRecommendation: remedy,
    favorableSaat: 'ساعت زہرہ یا مشتری (جمعہ یا جمعرات بوقت طلوع آفتاب)',
    incense: 'صندل سفید، زعفران، لبان اور عود',
  };
}

// -------------------------------------------------------------
// Classical Planetary Hours (ساعت شناسی) Calculator
// Calculates the 12 Day Hours and 12 Night Hours for any weekday
// -------------------------------------------------------------
const CHALDEAN_ORDER = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'];

// First hour planetary ruler of each day (0 = Sunday / اتوار)
const DAY_FIRST_HOURS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

export function calculatePlanetaryHoursForDay(dayOfWeek: number): PlanetarySaat[] {
  // dayOfWeek: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const startPlanet = DAY_FIRST_HOURS[dayOfWeek % 7];
  let currentPlanetIndex = CHALDEAN_ORDER.indexOf(startPlanet);

  const hours: PlanetarySaat[] = [];
  const hourNames = [
    'پہلی ساعت (طلوع آفتاب)', 'دوسری ساعت', 'تیسری ساعت', 'چوتھی ساعت',
    'پانچویں ساعت', 'چھٹی ساعت (زوال)', 'ساتویں ساعت', 'آٹھویں ساعت',
    'نویں ساعت', 'دسویں ساعت', 'گیارہویں ساعت', 'بارہویں ساعت (غروب آفتاب)'
  ];

  for (let i = 0; i < 12; i++) {
    const planetKey = CHALDEAN_ORDER[currentPlanetIndex % 7];
    const info = PLANET_INFO[planetKey];

    let nature: PlanetarySaat['nature'] = 'mumtazij';
    let natureUrdu = 'ممتزج';
    let color = '#a855f7';
    let suitable: string[] = [];

    if (planetKey === 'Jupiter') {
      nature = 'saad_akbar';
      natureUrdu = 'سعد اکبر (نہایت مبارک)';
      color = '#22c55e';
      suitable = ['اعمال محبت و تسخیر', 'کاروبار و ترقی', 'طلب حاجت از امراء', 'تعویذ شفا'];
    } else if (planetKey === 'Venus') {
      nature = 'saad_asghar';
      natureUrdu = 'سعد اصغر (پرکشش و الفت)';
      color = '#10b981';
      suitable = ['اعمال الفت و دوستی', 'عقد نکاح', 'جلب قلوب خلائق', 'خوشی و مسرت'];
    } else if (planetKey === 'Sun') {
      nature = 'saad_akbar';
      natureUrdu = 'سعد و باوقار (نوری و حاکم)';
      color = '#f59e0b';
      suitable = ['تسخیر حکام و جاہ', 'شہرت و عزت', 'اعمال شرف', 'حصول ملازمت'];
    } else if (planetKey === 'Moon') {
      nature = 'saad_asghar';
      natureUrdu = 'سعد معتدل (سفر و تسکین)';
      color = '#38bdf8';
      suitable = ['سفر کی برکت', 'محبت و ملاقات', 'امراض اطفال کا علاج', 'پانی کے نقوش'];
    } else if (planetKey === 'Mercury') {
      nature = 'mumtazij';
      natureUrdu = 'ممتزج (علم و فہم)';
      color = '#eab308';
      suitable = ['تعلیم و تدریس', 'حساب کتاب و تجارت', 'زبان بندی برحق', 'کتابت نقوش'];
    } else if (planetKey === 'Mars') {
      nature = 'nahs_asghar';
      natureUrdu = 'نحس اصغر (جلال و تفریق)';
      color = '#ef4444';
      suitable = ['دفع شر دشمنان', 'باندھنا سرکش کا', 'اعمال ہیبت', 'ابطال سحر'];
    } else if (planetKey === 'Saturn') {
      nature = 'nahs_akbar';
      natureUrdu = 'نحس اکبر (ثبات و سختی)';
      color = '#64748b';
      suitable = ['زبان بندی بدگویان', 'عزل ظالم', 'حفاظت مال و زمین', 'دفینہ'];
    }

    hours.push({
      hourIndex: i + 1,
      hourName: hourNames[i],
      timeRange: `ساعت ${i + 1}`,
      planet: planetKey,
      planetUrdu: info.nameUrdu,
      nature,
      natureUrdu,
      suitableActions: suitable,
      incense: info.incense,
      color,
    });

    currentPlanetIndex = (currentPlanetIndex + 1) % 7;
  }

  return hours;
}

// -------------------------------------------------------------
// Classical Istikhara Engine (استخارہ جفری و ابجدی)
// Methods based on Kash Al-Barny's Rules for Marriage, Business & General
// -------------------------------------------------------------

export const ZODIAC_HOUSES: Array<{
  sign: string;
  element: ElementType;
  elementUrdu: string;
  planet: string;
  nature: string;
}> = [
  { sign: 'حمل (Aries)', element: 'fire', elementUrdu: 'آتشی', planet: 'مریخ', nature: 'گرم و خشک و باحرارت' },
  { sign: 'ثور (Taurus)', element: 'earth', elementUrdu: 'خاکی', planet: 'زہرہ', nature: 'سرد و خشک و باثبات' },
  { sign: 'جوزا (Gemini)', element: 'air', elementUrdu: 'بادی', planet: 'عطارد', nature: 'گرم و تر و متحرک' },
  { sign: 'سرطان (Cancer)', element: 'water', elementUrdu: 'آبی', planet: 'قمر', nature: 'سرد و تر و حساس' },
  { sign: 'اسد (Leo)', element: 'fire', elementUrdu: 'آتشی', planet: 'شمس', nature: 'گرم و خشک و باجاہ' },
  { sign: 'سنبلہ (Virgo)', element: 'earth', elementUrdu: 'خاکی', planet: 'عطارد', nature: 'سرد و خشک و مدبر' },
  { sign: 'میزان (Libra)', element: 'air', elementUrdu: 'بادی', planet: 'زہرہ', nature: 'گرم و تر و منصف' },
  { sign: 'عقرب (Scorpio)', element: 'water', elementUrdu: 'آبی', planet: 'مریخ', nature: 'سرد و تر و باہمت' },
  { sign: 'قوس (Sagittarius)', element: 'fire', elementUrdu: 'آتشی', planet: 'مشتری', nature: 'گرم و خشک و کشادہ' },
  { sign: 'جدی (Capricorn)', element: 'earth', elementUrdu: 'خاکی', planet: 'زحل', nature: 'سرد و خشک و محتاط' },
  { sign: 'دلو (Aquarius)', element: 'air', elementUrdu: 'بادی', planet: 'زحل', nature: 'گرم و تر و عمیق' },
  { sign: 'حوت (Pisces)', element: 'water', elementUrdu: 'آبی', planet: 'مشتری', nature: 'سرد و تر و روحانی' },
];

export function calculateIstikharaPerson(name: string, motherName: string): IstikharaPersonInfo {
  const nameClean = normalizeJafrText(name);
  const motherClean = normalizeJafrText(motherName || 'حوا');
  
  const abjadNameResult = calculateAbjad(nameClean);
  const abjadMotherResult = calculateAbjad(motherClean);
  
  const abjadName = abjadNameResult.totalKabir;
  const abjadMother = abjadMotherResult.totalKabir;
  const totalAbjad = abjadName + abjadMother;
  
  // Zodiac House: Modulo 12
  const zodiacNum = (totalAbjad % 12) || 12;
  const zodiacInfo = ZODIAC_HOUSES[zodiacNum - 1];
  
  return {
    name: name || 'سائل',
    motherName: motherName || 'حوا',
    abjadName,
    abjadMother,
    totalAbjad,
    dominantElement: zodiacInfo.element,
    dominantElementUrdu: zodiacInfo.elementUrdu,
    zodiacSign: zodiacInfo.sign,
    zodiacPlanet: zodiacInfo.planet,
    zodiacNumber: zodiacNum,
  };
}

export function calculateMarriageIstikhara(
  p1Name: string,
  p1Mother: string,
  p2Name: string,
  p2Mother: string
): IstikharaMarriageResult {
  const person1 = calculateIstikharaPerson(p1Name, p1Mother);
  const person2 = calculateIstikharaPerson(p2Name, p2Mother);
  
  const combinedTotal = person1.totalAbjad + person2.totalAbjad;
  const remainder4 = (combinedTotal % 4) || 4;
  const remainder7 = (combinedTotal % 7) || 7;
  const remainder9_1 = (person1.totalAbjad % 9) || 9;
  const remainder9_2 = (person2.totalAbjad % 9) || 9;
  const remainder12 = (combinedTotal % 12) || 12;

  // Elemental Relationship Check
  let elementalRelation = '';
  let compatibilityScore = 75;
  const e1 = person1.dominantElement;
  const e2 = person2.dominantElement;

  if (e1 === e2) {
    elementalRelation = `ہم جنس و ہم طبع (${person1.dominantElementUrdu} و ${person2.dominantElementUrdu}): باہمی فہم و ادراک یکساں ہے اور فطرت میں ہم آہنگی ہے۔`;
    compatibilityScore = 88;
  } else if ((e1 === 'fire' && e2 === 'air') || (e1 === 'air' && e2 === 'fire')) {
    elementalRelation = 'آتش و باد (آگ اور ہوا): ہوا آگ کو بھڑکاتی ہے؛ باہمی کشش، محبت، اور زندگی میں جوش و مسرت رہے گی۔';
    compatibilityScore = 95;
  } else if ((e1 === 'water' && e2 === 'earth') || (e1 === 'earth' && e2 === 'water')) {
    elementalRelation = 'آب و خاک (پانی اور مٹی): پانی مٹی کو سرسبز و بارآور کرتا ہے؛ نبھاؤ پائیدار، سکون، اور اولاد و رزق میں برکت ہو گی۔';
    compatibilityScore = 92;
  } else if ((e1 === 'fire' && e2 === 'water') || (e1 === 'water' && e2 === 'fire')) {
    elementalRelation = 'آتش و آب (آگ اور پانی): اضداد کا امتزاج؛ جذبات میں شدت اور کبھی غصے کا اندیشہ، صبر و درگزر اور صدقہ ضروری ہے۔';
    compatibilityScore = 58;
  } else if ((e1 === 'air' && e2 === 'earth') || (e1 === 'earth' && e2 === 'air')) {
    elementalRelation = 'باد و خاک (ہوا اور مٹی): مختلف طبائع؛ ایک متحرک تو دوسرا پرسکون؛ باہمی تعاون سے توازن پیدا ہو سکتا ہے۔';
    compatibilityScore = 68;
  } else {
    elementalRelation = 'ممتزج طبائع: تعلق میں محبت اور وقت کے ساتھ موافقت قائم رہے گی۔';
    compatibilityScore = 72;
  }

  // 4 Elements Remainder Meaning according to Kash Al-Barny
  let remainder4Desc = '';
  if (remainder4 === 1) {
    remainder4Desc = 'باقی ۱ (آتش): رشتہ میں محبت و رغبت قوی رہے گی مگر ابتدا میں کچھ جوش یا نزاع ہو سکتا ہے، لہٰذا نرمی اور تحمل اپنائیں۔';
  } else if (remainder4 === 2) {
    remainder4Desc = 'باقی ۲ (باد): نہایت پرلطف، خوش طبع اور خوشحال زندگی، باہمی گفت و شنید اور سیر و تفریح کی کثرت۔';
    compatibilityScore = Math.min(100, compatibilityScore + 8);
  } else if (remainder4 === 3) {
    remainder4Desc = 'باقی ۳ (آب): دلوں کا گہرا ملاپ، الفتِ صادقہ، دونوں ایک دوسرے کے لیے باعثِ رحمت و تسکین ہوں گے۔';
    compatibilityScore = Math.min(100, compatibilityScore + 10);
  } else {
    remainder4Desc = 'باقی ۴ (خاک): پائیدار تعلق، مضبوط خاندانی بنیاد، صبر و استقلال اور نسل و املاک میں پختگی۔';
    compatibilityScore = Math.min(100, compatibilityScore + 6);
  }

  // Ghalib & Maghloob Analysis
  let ghalib = '';
  let maghloob = '';
  let balanceStatus = '';
  let ghalibDesc = '';

  if (remainder9_1 > remainder9_2) {
    ghalib = person1.name;
    maghloob = person2.name;
    balanceStatus = `${person1.name} کی رائے اور اثر زیادہ غالب رہے گا`;
    ghalibDesc = `${person1.name} کے باقی اعداد (${remainder9_1}) ${person2.name} کے باقی اعداد (${remainder9_2}) پر غالب ہیں۔ معاملات میں ${person1.name} کی قیادت و اثر پذیری نمایاں رہے گی۔`;
  } else if (remainder9_2 > remainder9_1) {
    ghalib = person2.name;
    maghloob = person1.name;
    balanceStatus = `${person2.name} کی رائے اور اثر زیادہ غالب رہے گا`;
    ghalibDesc = `${person2.name} کے باقی اعداد (${remainder9_2}) ${person1.name} کے باقی اعداد (${remainder9_1}) پر غالب ہیں۔ گھریلو معاملات میں ${person2.name} کا اثر و نفوذ زیادہ ہو گا۔`;
  } else {
    ghalib = 'دونوں برابر';
    maghloob = 'کوئی مغلوب نہیں';
    balanceStatus = 'کامل مساوات و باہمی توازن';
    ghalibDesc = `دونوں کے اعدادِ باقی (${remainder9_1}) مساوی ہیں۔ یہ تعلق مکمل شراکت، باہمی احترام اور یکساں اثر پر مبنی رہے گا۔`;
    compatibilityScore = Math.min(100, compatibilityScore + 5);
  }

  // Verdict Calculation
  let verdict: IstikharaMarriageResult['verdict'] = 'saad_mubarak';
  let verdictUrdu = 'سعد و مبارک (بہترین رشتہ و اتحاد)';

  if (compatibilityScore >= 80) {
    verdict = 'saad_mubarak';
    verdictUrdu = 'سعد و مبارک (نہایت پرمسرت، موافق اور خیر و برکت والا رشتہ)';
  } else if (compatibilityScore >= 65) {
    verdict = 'muwafiq_ba_sadqa';
    verdictUrdu = 'موافق مع صدقہ و دعا (اچھا رشتہ، باہمی افہام و تفہیم اور دعاؤں سے نبھاؤ ہو گا)';
  } else if (compatibilityScore >= 50) {
    verdict = 'mutawassit';
    verdictUrdu = 'متوسط (معتدل؛ کچھ مزاجی اختلافات ممکن ہیں، بزرگوں کی سرپرستی ضروری ہے)';
  } else {
    verdict = 'nahs_ihtiyat';
    verdictUrdu = 'محتاجِ احتیاط و استخارۂ مسنونہ (طبائع میں تضاد، غصہ و جلد بازی سے پرہیز لازم)';
  }

  // Detailed Analysis Points
  const detailedAnalysis: string[] = [
    `طالعِ فریق اول: ${person1.zodiacSign} (عنصر: ${person1.dominantElementUrdu}) | طالعِ فریق ثانی: ${person2.zodiacSign} (عنصر: ${person2.dominantElementUrdu})`,
    elementalRelation,
    remainder4Desc,
    `حسابِ غلبہ (قاعدہ ۹): ${balanceStatus}`,
    `سیاروی مناسبت: برجِ میزانِ مشترکہ ${ZODIAC_HOUSES[remainder12 - 1]?.sign || 'حمل'} ہے جس کا حاکم ${ZODIAC_HOUSES[remainder12 - 1]?.planet || 'مشتری'} ہے۔`,
  ];

  return {
    person1,
    person2,
    combinedTotal,
    remainder4,
    remainder7,
    remainder9: remainder9_1,
    remainder12,
    elementalRelation,
    elementalCompatibilityPercent: compatibilityScore,
    ghalibMaghloob: {
      ghalib,
      maghloob,
      balanceStatus,
      description: ghalibDesc,
    },
    zodiacRelation: `${person1.zodiacSign} مع ${person2.zodiacSign}`,
    verdict,
    verdictUrdu,
    verdictScore: compatibilityScore,
    detailedAnalysis,
    recommendedSadqa: 'شیرینی، سرخ یا زرد اناج، یا پرندوں کو دانہ ڈالنا اور حسبِ استطاعت صدقہ دینا۔',
    recommendedZikr: 'روزانہ ۱۰۰ مرتبہ: "يَا وَدُودُ يَا رَحِيمُ يَا جَامِعَ النَّاسِ لِيَوْمٍ لَا رَيْبَ فِيهِ"',
    auspiciousDays: ['جمعرات (ساعتِ مشتری)', 'جمعہ (ساعتِ زہرہ)', 'پیر (ساعتِ قمر)'],
    kashAlBarnyRule: 'کاش البرنی (قوانین طلسم): جب دو ناموں کا میزان آب یا باد پر ختم ہو تو الفت طبعی ہوتی ہے؛ آتش و خاک میں باہمی ربط و تدبیر سے برکت پیدا کی جاتی ہے۔',
  };
}

export function calculateBusinessIstikhara(
  personName: string,
  motherName: string,
  businessName: string
): IstikharaBusinessResult {
  const person = calculateIstikharaPerson(personName, motherName);
  const businessClean = normalizeJafrText(businessName);
  const businessAbjad = calculateAbjad(businessClean).totalKabir;
  
  const combinedTotal = person.totalAbjad + businessAbjad;
  const remainder3 = (combinedTotal % 3) || 3;
  const remainder4 = (combinedTotal % 4) || 4;
  const remainder7 = (combinedTotal % 7) || 7;

  let profitPotentialUrdu = '';
  let score = 70;

  // Remainder 3: Classical Profit / Loss rule
  if (remainder3 === 1) {
    profitPotentialUrdu = 'کثیر نفع و وسعتِ رزق (خیر و برکت کی علامت، کاروبار میں تیز رفتار ترقی ہو گی)';
    score += 20;
  } else if (remainder3 === 2) {
    profitPotentialUrdu = 'متوسط منافع و استقامت (محنت اور دیانت داری کے بقدر مستحکم روزگار قائم رہے گا)';
    score += 5;
  } else {
    profitPotentialUrdu = 'احتیاط و حکمتِ عملی درکار (ابتدا میں صبر، بجٹ کنٹرول اور مارکیٹ ریسرچ ضروری ہے)';
    score -= 15;
  }

  // Remainder 7: Dominant Planet Influence
  const planetsList = [
    { name: 'شمس (سورج)', nature: 'سعد و حاکم', day: 'اتوار', saat: 'پہلی ساعت', boost: 10, sector: 'سرکاری ٹھیکے، سونا، برانڈنگ، ادویات و قیادت' },
    { name: 'قمر (چاند)', nature: 'سعد و متحرک', day: 'پیر', saat: 'پہلی ساعت', boost: 8, sector: 'اشیاء خوردونوش، ڈیری، سفر، پانی، کپڑا و روزمرہ اشیاء' },
    { name: 'مریخ (منگل)', nature: 'نحس اصغر و گرم', day: 'منگل', saat: 'پہلی ساعت', boost: -5, sector: 'مشینری، لوہا، ٹیکنالوجی، سرجری، ہوٹلنگ و آگ کا کام' },
    { name: 'عطارد (بدھ)', nature: 'ممتزج و ذہین', day: 'بدھ', saat: 'پہلی ساعت', boost: 12, sector: 'اکاؤنٹنگ، کتب، سافٹ ویئر، ای کامرس، بروکریج و تجارت' },
    { name: 'مشتری (جمعرات)', nature: 'سعد اکبر و پربرکت', day: 'جمعرات', saat: 'پہلی ساعت', boost: 15, sector: 'تعلیم، مالیات، ہول سیل، ادویات، جائیداد و بڑی سرمایہ کاری' },
    { name: 'زہرہ (جمعہ)', nature: 'سعد اصغر و پرکشش', day: 'جمعہ', saat: 'پہلی ساعت', boost: 12, sector: 'فیشن، ملبوسات، کاسمیٹکس، زیورات، فنون و ڈیکوریشن' },
    { name: 'زحل (ہفتہ)', nature: 'نحس اکبر و باثبات', day: 'ہفتہ', saat: 'پہلی ساعت', boost: 2, sector: 'زمین، تعمیرات، زراعت، کوئلہ، کان کنی و طویل مدتی اثاثے' },
  ];

  const planetInfo = planetsList[remainder7 - 1] || planetsList[0];
  score += planetInfo.boost;
  score = Math.max(45, Math.min(98, score));

  // Remainder 4: Sector Alignment
  let sectorNote = '';
  if (remainder4 === 1) {
    sectorNote = 'عنصرِ آتشی: تیزی، توانائی، کھانے پینے، الیکٹرانکس یا مارکیٹنگ میں خاص برکت ہے۔';
  } else if (remainder4 === 2) {
    sectorNote = 'عنصرِ بادی: ابلاغ، آن لائن تجارت، ٹرانسپورٹ، سروسز اور تجارتی لین دین میں فروغ ہے۔';
  } else if (remainder4 === 3) {
    sectorNote = 'عنصرِ آبی: مشروبات، مائعات، میڈیکل، فارماسیوٹیکل اور پبلک ڈیلنگ میں نفع بخش ہے۔';
  } else {
    sectorNote = 'عنصرِ خاکی: جائیداد، زراعت، بلڈنگ میٹریل، ٹھوس اسٹاک اور فکسڈ ایسٹس میں پائیداری ہے۔';
  }

  let verdict: IstikharaBusinessResult['verdict'] = 'saad_mubarak';
  let verdictUrdu = 'سعد و مبارک (کاروبار میں خیر و منافع کا قوی امکان)';

  if (score >= 80) {
    verdict = 'saad_mubarak';
    verdictUrdu = 'سعد و مبارک (نہایت پربرکت، منافع بخش اور وسعتِ رزق کا حامل)';
  } else if (score >= 65) {
    verdict = 'muwafiq_ba_sadqa';
    verdictUrdu = 'موافق مع تدبیر و صدقہ (کاروبار میں نفع ہو گا، محنت اور دیانت کے ساتھ آگے بڑھیں)';
  } else if (score >= 50) {
    verdict = 'mutawassit';
    verdictUrdu = 'متوسط (معتدل؛ نفع و نقصان برابر رہنے کا امکان، آغاز چھوٹے پیمانے سے کریں)';
  } else {
    verdict = 'nahs_ihtiyat';
    verdictUrdu = 'احتیاط لازم (سرمایہ کاری میں احتیاط کریں، یا نام و شراکت دار کی تبدیل کا جائزہ لیں)';
  }

  const detailedAnalysis: string[] = [
    `طالعِ تاجر: ${person.zodiacSign} (حاکم سیارہ: ${person.zodiacPlanet})`,
    `میزانِ اعداد: سائل (${person.totalAbjad}) + تجارت (${businessAbjad}) = ${combinedTotal}`,
    profitPotentialUrdu,
    `حاکم سیارۂ تجارت: ${planetInfo.name} (${planetInfo.nature}) - سازگار شعبہ جات: ${planetInfo.sector}`,
    sectorNote,
  ];

  return {
    person,
    businessName: businessName || 'تجارت',
    businessAbjad,
    combinedTotal,
    remainder4,
    remainder7,
    remainder3,
    profitPotentialUrdu,
    dominantPlanetUrdu: planetInfo.name,
    planetNatureUrdu: planetInfo.nature,
    verdict,
    verdictUrdu,
    verdictScore: score,
    detailedAnalysis,
    bestOpeningDay: `${planetInfo.day} (${planetInfo.saat})`,
    bestOpeningSaat: `ساعتِ ${planetInfo.name}`,
    recommendedSadqa: 'چاندی کے بقدر یا کسی سفید/پیلی غذا کا صدقہ، اور مساکین کو کھانا کھلانا۔',
    recommendedZikr: 'روزانہ ۱۲۹ مرتبہ: "يَا لَطِيفُ يَا فَتَّاحُ يَا بَاسِطُ يَا رَزَّاقُ"',
    kashAlBarnyRule: 'کاش البرنی (قوانین طلسم): سائل کا نام اور کاروبار کا نام اگر سعد سیارے پر متفق ہوں تو کاروبار میں برکت اور گاہکوں کا رجوع غیر متوقع طور پر بڑھ جاتا ہے۔',
  };
}

export function calculateGeneralIstikhara(
  personName: string,
  motherName: string,
  queryTopic: string,
  category: 'safar' | 'aam' = 'aam'
): IstikharaGeneralResult {
  const person = calculateIstikharaPerson(personName, motherName);
  const topicClean = normalizeJafrText(queryTopic);
  const topicAbjad = calculateAbjad(topicClean).totalKabir;
  
  const combinedTotal = person.totalAbjad + topicAbjad;
  const remainder3 = (combinedTotal % 3) || 3;
  const remainder7 = (combinedTotal % 7) || 7;

  let verdict: IstikharaGeneralResult['verdict'] = 'khair_o_barakat';
  let verdictUrdu = '';
  let guidanceText = '';
  let recommendedAyah = '';
  let recommendedZikr = '';

  if (category === 'safar') {
    if (remainder3 === 1) {
      verdict = 'khair_o_barakat';
      verdictUrdu = 'سفر مبارک و بامراد (خیر، سلامتی اور مقاصد میں کامیابی)';
      guidanceText = 'یہ سفر آپ کے حق میں سلامتی، رزق اور خوشحالی کا سبب بنے گا۔ روانگی کے وقت آیۃ الکرسی کا حصار کریں۔';
      recommendedAyah = 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ';
      recommendedZikr = 'يَا حَفِيظُ يَا نَصِيرُ يَا وَكِيلُ (۱۱۱ مرتبہ)';
    } else if (remainder3 === 2) {
      verdict = 'tawaqquf_o_sabir';
      verdictUrdu = 'توقف و تاخیر میں بہتری (کچھ ایام بعد سفر کرنا زیادہ مفید ہے)';
      guidanceText = 'سفر میں تاخیر یا انتظامات کی مزید جانچ پڑتال بہتر ہے۔ اگر ناگزیر ہو تو صدقہ دے کر روانہ ہوں۔';
      recommendedAyah = 'رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا';
      recommendedZikr = 'يَا سَلَامُ يَا مُؤْمِنُ (۱۰۱ مرتبہ)';
    } else {
      verdict = 'ihtiyat_o_sadqa';
      verdictUrdu = 'احتیاط و دفعِ نحوست (صدقہ ادا کر کے روانہ ہوں)';
      guidanceText = 'سفر میں مشقت یا رکاوٹ کا اندیشہ ہو سکتا ہے؛ لہٰذا صدقہ نکالیں اور مسنون دعائیں پڑھیں۔';
      recommendedAyah = 'فَاللَّهُ خَيْرٌ حَافِظًا ۖ وَهُوَ أَرْحَمُ الرَّاحِمِينَ';
      recommendedZikr = 'يَا مَانِعُ يَا دَافِعُ يَا حَفِيظُ (۳۱۳ مرتبہ)';
    }
  } else {
    if (remainder3 === 1) {
      verdict = 'khair_o_barakat';
      verdictUrdu = 'خیر و برکت و کامیابی (اس ارادے میں پیش قدمی مبارک ہے)';
      guidanceText = 'علم الحروف و جفر کی میزان کے مطابق یہ مقصد آپ کے حق میں بہتر اور نفع بخش ہے۔ توکل علی اللہ قدم بڑھائیں۔';
      recommendedAyah = 'إِنَّ رَبِّي قَرِيبٌ مُّجِيبٌ ۞ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ';
      recommendedZikr = 'يَا فَتاحُ يَا عَلِيمُ يَا هَادِي يَا رَشِيدُ (۱۰۰ مرتبہ)';
    } else if (remainder3 === 2) {
      verdict = 'tawaqquf_o_sabir';
      verdictUrdu = 'توقف و غور و فکر (جلد بازی سے گریز اور مزید استخارہ بہتر ہے)';
      guidanceText = 'اس معاملے میں عجلت نقصان دہ ہو سکتی ہے۔ معاملات کو سمجھیں، مشورہ کریں اور مناسب وقت کا انتظار کریں۔';
      recommendedAyah = 'عَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ ۖ وَعَسَىٰ أَن تُحِبُّوا شَيْئًا وَهُوَ شَرٌّ لَّكُمْ';
      recommendedZikr = 'يَا صَبُورُ يَا خَبِيرُ يَا حَكِيمُ (۱۰۰ مرتبہ)';
    } else {
      verdict = 'ihtiyat_o_sadqa';
      verdictUrdu = 'احتیاط و پرہیز (اس کام میں رکاوٹ یا نقصان کا اندیشہ ہے)';
      guidanceText = 'میزانِ ابجد اس عمل میں احتیاط کا تقاضا کرتی ہے۔ صدقہ جاریہ دیں اور متبادل راستوں پر غور کریں۔';
      recommendedAyah = 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ نِعْمَ الْمَوْلَىٰ وَنِعْمَ النَّصِيرُ';
      recommendedZikr = 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ (۱۰۰ مرتبہ)';
    }
  }

  return {
    person,
    queryTopic: queryTopic || 'مطلوبہ امر',
    topicAbjad,
    combinedTotal,
    remainder3,
    remainder7,
    verdict,
    verdictUrdu,
    guidanceText,
    recommendedAyah,
    recommendedZikr,
    recommendedSadqa: 'روٹی یا کچھ نقدی کسی مستحق کو دیں تاکہ نحوست اور رکاوٹ دور ہو۔',
    masnoonIstikharaGuide: {
      duaaArabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ، اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ، وَاقْدُرْ لِي الْخَيْرَ حَيْثُ كَانَ ثُمَّ أَرْضِنِي بِهِ۔',
      duaaUrdu: 'اے اللہ! میں تیرے علم کی برکت سے خیر طلب کرتا ہوں، اور تیری قدرت سے طاقت مانگتا ہوں، اور تیرے بڑے فضل کا سوال کرتا ہوں؛ کیونکہ تو ہر چیز پر قادر ہے اور میں قادر نہیں، تو جانتا ہے اور میں نہیں جانتا، اور تو تمام غیبوں کا خوب جاننے والا ہے۔ اے اللہ! اگر تو جانتا ہے کہ یہ کام میرے دین، دنیا اور انجامِ کار کے لحاظ سے بہتر ہے تو اسے میرے مقدر میں کر دے اور آسان فرما دے، پھر اس میں میرے لیے برکت ڈال دے۔ اور اگر یہ کام میرے حق میں برا ہے تو اسے مجھ سے اور مجھے اس سے پھیر دے، اور جہاں بھی بھلائی ہو وہ میرے مقدر کر دے پھر مجھے اس پر راضی کر دے۔',
      method: 'دو رکعت نفل نماز پڑھ کر قبلہ رخ باوضو ہو کر مذکورہ دعا پڑھیں اور دل کے میلان و اشارے کا انتظار کریں۔',
    },
  };
}

// -------------------------------------------------------------
// Interactive Abjad-to-Takseer Matrix Suggester Engine
// According to Kash Al-Barni (مفتاح الجفر، قوانین طلسمات و تکسیر)
// -------------------------------------------------------------

export function analyzeAndSuggestTakseerMatrix(
  inputText: string,
  objectiveFilter: MatrixObjective = 'universal'
): AbjadTakseerAnalysis {
  const abjadData = calculateAbjad(inputText);
  const total = Math.max(1, abjadData.totalKabir);
  const cleaned = abjadData.cleanedText || 'یا اللہ';
  const dominantEl = abjadData.dominantElement;
  const planet = abjadData.governingPlanet;
  const planetUrdu = abjadData.governingPlanetUrdu;

  // Modulo & Arithmetic Properties
  const musallasQuotient = Math.max(1, Math.floor((total - 12) / 3));
  const musallasKasr = ((total - 12) % 3 + 3) % 3;

  const murabbaQuotient = Math.max(1, Math.floor((total - 30) / 4));
  const murabbaKasr = ((total - 30) % 4 + 4) % 4;

  const mukhammasQuotient = Math.max(1, Math.floor((total - 60) / 5));
  const mukhammasKasr = ((total - 60) % 5 + 5) % 5;

  const musaddasQuotient = Math.max(1, Math.floor((total - 105) / 6));
  const musaddasKasr = ((total - 105) % 6 + 6) % 6;

  const musabbaQuotient = Math.max(1, Math.floor((total - 168) / 7));
  const musabbaKasr = ((total - 168) % 7 + 7) % 7;

  const chalTypeForElement: Record<ElementType, ChalType> = {
    fire: 'atishi',
    air: 'badi',
    water: 'aabi',
    earth: 'khaaki',
  };

  const chosenChal = chalTypeForElement[dominantEl] || 'atishi';
  const chalOrderObj = MUSALLAS_CHAL_ORDER[chosenChal] || MUSALLAS_CHAL_ORDER.atishi;
  const chalOrderMurabba = MURABBA_CHAL_ORDER[chosenChal] || MURABBA_CHAL_ORDER.atishi;

  // 1. Build Candidate: 4x4 Murabba Matrix (مربع کامل)
  const murabbaGrid: number[][] = [];
  const murabbaChalSteps: ChalCellStep[] = [];
  const murabbaHouseValues: Record<number, number> = {};

  for (let h = 1; h <= 16; h++) {
    let val = murabbaQuotient + (h - 1);
    if (murabbaKasr === 1 && h >= 13) val += 1;
    else if (murabbaKasr === 2 && h >= 9) val += 1;
    else if (murabbaKasr === 3 && h >= 5) val += 1;
    murabbaHouseValues[h] = val;
  }

  for (let r = 0; r < 4; r++) {
    const rowArr: number[] = [];
    for (let c = 0; c < 4; c++) {
      const hNum = chalOrderMurabba[r][c];
      const val = murabbaHouseValues[hNum];
      rowArr.push(val);
      murabbaChalSteps.push({
        step: hNum,
        row: r,
        col: c,
        houseNumber: hNum,
        value: val,
        element: hNum % 4 === 1 ? 'fire' : hNum % 4 === 2 ? 'air' : hNum % 4 === 3 ? 'water' : 'earth',
        elementUrdu: hNum % 4 === 1 ? 'آتشی' : hNum % 4 === 2 ? 'بادی' : hNum % 4 === 3 ? 'آبی' : 'خاکی',
        directionUrdu: r === 0 ? 'شمال' : r === 1 ? 'مشرق' : r === 2 ? 'مغرب' : 'جنوب',
        description: `خانہ نمبر ${hNum}: مفتاح ${murabbaQuotient} مع ترسیل ${val}`,
      });
    }
    murabbaGrid.push(rowArr);
  }
  murabbaChalSteps.sort((a, b) => a.step - b.step);

  const murabbaRowSums = murabbaGrid.map(r => r.reduce((a, b) => a + b, 0));
  const murabbaColSums = [0, 1, 2, 3].map(c => murabbaGrid[0][c] + murabbaGrid[1][c] + murabbaGrid[2][c] + murabbaGrid[3][c]);
  const murabbaDiagSums = [
    murabbaGrid[0][0] + murabbaGrid[1][1] + murabbaGrid[2][2] + murabbaGrid[3][3],
    murabbaGrid[0][3] + murabbaGrid[1][2] + murabbaGrid[2][1] + murabbaGrid[3][0],
  ];

  // 2. Build Candidate: 3x3 Musallas Matrix (مثلثِ غزالی)
  const musallasGrid: number[][] = [];
  const musallasChalSteps: ChalCellStep[] = [];
  const musallasHouseValues: Record<number, number> = {};

  for (let h = 1; h <= 9; h++) {
    let val = musallasQuotient + (h - 1);
    if (musallasKasr === 1 && h >= 7) val += 1;
    else if (musallasKasr === 2 && h >= 4) val += 1;
    musallasHouseValues[h] = val;
  }

  for (let r = 0; r < 3; r++) {
    const rowArr: number[] = [];
    for (let c = 0; c < 3; c++) {
      const hNum = chalOrderObj[r][c];
      const val = musallasHouseValues[hNum];
      rowArr.push(val);
      musallasChalSteps.push({
        step: hNum,
        row: r,
        col: c,
        houseNumber: hNum,
        value: val,
        element: hNum <= 2 ? 'fire' : hNum <= 5 ? 'air' : hNum <= 7 ? 'water' : 'earth',
        elementUrdu: hNum <= 2 ? 'آتشی' : hNum <= 5 ? 'بادی' : hNum <= 7 ? 'آبی' : 'خاکی',
        directionUrdu: r === 0 ? 'مشرق' : r === 1 ? 'مرکز' : 'مغرب',
        description: `خانہ ${hNum} (چالِ ${abjadData.dominantElementUrdu}): قدر ${val}`,
      });
    }
    musallasGrid.push(rowArr);
  }
  musallasChalSteps.sort((a, b) => a.step - b.step);

  const musallasRowSums = musallasGrid.map(r => r.reduce((a, b) => a + b, 0));
  const musallasColSums = [0, 1, 2].map(c => musallasGrid[0][c] + musallasGrid[1][c] + musallasGrid[2][c]);
  const musallasDiagSums = [
    musallasGrid[0][0] + musallasGrid[1][1] + musallasGrid[2][2],
    musallasGrid[0][2] + musallasGrid[1][1] + musallasGrid[2][0],
  ];

  // 3. Build Candidate: 5x5 Mukhammaz (مخمس مریخ)
  const mukhammasGrid: number[][] = Array(5).fill(0).map(() => Array(5).fill(0));
  const mukhammasChalSteps: ChalCellStep[] = [];
  let kr = 0;
  let kc = 2;
  for (let num = 1; num <= 25; num++) {
    let added = mukhammasQuotient + (num - 1);
    if (mukhammasKasr > 0 && num >= 26 - mukhammasKasr * 5) {
      added += 1;
    }
    mukhammasGrid[kr][kc] = added;
    mukhammasChalSteps.push({
      step: num,
      row: kr,
      col: kc,
      houseNumber: num,
      value: added,
      element: dominantEl,
      elementUrdu: abjadData.dominantElementUrdu,
      directionUrdu: 'مریخی و جلالی',
      description: `خانہ ${num} برائے مخمس ۲۵ خانوں کا`,
    });

    const nextR = (kr - 1 + 5) % 5;
    const nextC = (kc + 1) % 5;
    if (mukhammasGrid[nextR][nextC] !== 0) {
      kr = (kr + 1) % 5;
    } else {
      kr = nextR;
      kc = nextC;
    }
  }
  mukhammasChalSteps.sort((a, b) => a.step - b.step);

  const mukhammasRowSums = mukhammasGrid.map(r => r.reduce((a, b) => a + b, 0));
  const mukhammasColSums = [0, 1, 2, 3, 4].map(c => mukhammasGrid[0][c] + mukhammasGrid[1][c] + mukhammasGrid[2][c] + mukhammasGrid[3][c] + mukhammasGrid[4][c]);
  const mukhammasDiagSums = [
    mukhammasGrid[0][0] + mukhammasGrid[1][1] + mukhammasGrid[2][2] + mukhammasGrid[3][3] + mukhammasGrid[4][4],
    mukhammasGrid[0][4] + mukhammasGrid[1][3] + mukhammasGrid[2][2] + mukhammasGrid[3][1] + mukhammasGrid[4][0],
  ];

  // 4. Build Candidate: Letter-Level Takseer (صدر و مؤخر متوازن)
  const letterTakseerResult = generateTakseerSadrMuakhkhar(cleaned, 12);
  const letterGrid: string[][] = letterTakseerResult.steps.slice(0, 6).map(s => s.letters.slice(0, 6));

  // 5. Build Candidate: 7x7 Musabba (مسبع زہرہ برائے الفت و کشائش)
  const musabbaGrid: number[][] = Array(7).fill(0).map(() => Array(7).fill(0));
  let sr = 0;
  let sc = 3;
  for (let num = 1; num <= 49; num++) {
    const val = musabbaQuotient + (num - 1) + (musabbaKasr > 0 && num >= 50 - musabbaKasr * 7 ? 1 : 0);
    musabbaGrid[sr][sc] = val;
    const nextR = (sr - 1 + 7) % 7;
    const nextC = (sc + 1) % 7;
    if (musabbaGrid[nextR][nextC] !== 0) {
      sr = (sr + 1) % 7;
    } else {
      sr = nextR;
      sc = nextC;
    }
  }
  const musabbaRowSums = musabbaGrid.map(r => r.reduce((a, b) => a + b, 0));
  const musabbaColSums = [0, 1, 2, 3, 4, 5, 6].map(c => musabbaGrid.reduce((sum, row) => sum + row[c], 0));
  const musabbaDiagSums = [
    musabbaGrid.reduce((sum, row, i) => sum + row[i], 0),
    musabbaGrid.reduce((sum, row, i) => sum + row[6 - i], 0),
  ];

  // Build the array of structured suggestions
  const rawSuggestions: TakseerMatrixSuggestion[] = [
    // 1. Murabba (4x4)
    {
      id: 'sug-murabba-4x4',
      title: 'مربعِ متوازنِ اعظم (4x4 Universal Matrix)',
      subtitleUrdu: 'ماتریسِ مربعِ چہار گانہ برائے رزق، وسعت، تسخیر و توازنِ عناصر',
      dimension: 4,
      type: 'murabba',
      matrixCategory: 'numerical_magic_square',
      powerScore: 88 + (murabbaKasr === 0 ? 10 : 0) + (objectiveFilter === 'rizq_wealth' || objectiveFilter === 'universal' ? 8 : 0),
      isSupremeMatch: false,
      matchRank: 0,
      rationale: murabbaKasr === 0
        ? `عدد ${total} کسر کے بغیر (کسر 0) مربع کے ۱۶ خانوں میں مکمل مساوی تقسیم ہوتا ہے۔ یہ کائنات کے چار ارکان (آتش، ہوا، آب، خاک) کے ساتھ ۹۹٪ اعلیٰ ترین ہم آہنگی رکھتا ہے۔`
        : `عدد ${total} پر مربع کا قاعدہ نافذ کرنے سے مفتاح ${murabbaQuotient} اور کسر ${murabbaKasr} برآمد ہوئی۔ کسر کو خانہ ${murabbaKasr === 1 ? '۱۳' : murabbaKasr === 2 ? '۹' : '۵'} میں جبر کیا گیا ہے۔`,
      formulaEquation: `(${total} - 30) ÷ 4 = ${murabbaQuotient} (کسر: ${murabbaKasr})`,
      quotient: murabbaQuotient,
      kasr: murabbaKasr,
      kasrExplanation: murabbaKasr === 0 ? 'بدونِ کسر (کامل و تام)' : `کسر ${murabbaKasr} بمطابق کاش البرنی`,
      chalType: chosenChal,
      chalNameUrdu: `چالِ ${abjadData.dominantElementUrdu} (مربع کاش البرنی)`,
      element: dominantEl,
      elementUrdu: abjadData.dominantElementUrdu,
      planet: 'Jupiter',
      planetUrdu: 'مشتری (سیارۂ سعدِ اکبر)',
      incense: 'لوبان، صندل، عود و عنبر',
      favorableSaat: 'ساعتِ مشتری یا ساعتِ زہرہ',
      angelMuwakkil: abjadData.ulwiMuwakkil,
      servantAwan: abjadData.sifliAwan,
      grid: murabbaGrid,
      chalSteps: murabbaChalSteps,
      rowSums: murabbaRowSums,
      colSums: murabbaColSums,
      diagSums: murabbaDiagSums,
      targetIntents: ['رزق و وسعت', 'حصولِ دولت', 'کاروبار و تجارت', 'تسخیرِ عام و خاص'],
      kashAlBarniRule: 'کاش البرنی (قوانین طلسمات): مربع نقش جملہ امراض و مقاصدِ جلیلہ کے لیے ام النقوش کا درجہ رکھتا ہے، خصوصاً جب عدد میں کسر نہ ہو۔',
      consecrationGuide: 'بروز جمعرات یا جمعہ بعد نمازِ فجر زعفران و عرقِ گلاب سے تحریر کریں۔',
    },

    // 2. Musallas (3x3)
    {
      id: 'sug-musallas-3x3',
      title: 'مثلثِ غزالی و افلاطونی (3x3 Fast-Action Matrix)',
      subtitleUrdu: 'ماتریسِ مثلث ۹ خانے برائے فوری تاثیر، کشائش، نصرت و قضاء الحاجات',
      dimension: 3,
      type: 'musallas',
      matrixCategory: 'numerical_magic_square',
      powerScore: 86 + (musallasKasr === 0 ? 11 : 2) + (objectiveFilter === 'victory_conquest' || objectiveFilter === 'protection_shield' ? 9 : 0),
      isSupremeMatch: false,
      matchRank: 0,
      rationale: musallasKasr === 0
        ? `عدد ${total} مثلث کے ۳ اضلاع میں بغیر کسی کسر کے تقسیم ہو گیا ہے۔ مثلثِ غزالی سریع التاثیر ہے اور ارادے کو فوری حرکت دیتا ہے۔`
        : `عدد ${total} میں کسر ${musallasKasr} ہے جس کا جبر خانہ نمبر ${musallasKasr === 1 ? '۷' : '۴'} میں کیا گیا ہے۔`,
      formulaEquation: `(${total} - 12) ÷ 3 = ${musallasQuotient} (کسر: ${musallasKasr})`,
      quotient: musallasQuotient,
      kasr: musallasKasr,
      kasrExplanation: musallasKasr === 0 ? 'بدونِ کسر (کامل)' : `جبر کسر فی الخانہ ${musallasKasr === 1 ? '۷' : '۴'}`,
      chalType: chosenChal,
      chalNameUrdu: `چالِ ${abjadData.dominantElementUrdu} (مثلثِ بطد زہج)`,
      element: dominantEl,
      elementUrdu: abjadData.dominantElementUrdu,
      planet: 'Saturn / Mars',
      planetUrdu: 'زحل و مریخ (قوت و تحفظ)',
      incense: 'حرمل، مصطگی و لبان',
      favorableSaat: 'ساعتِ شمس یا ساعتِ عطارد',
      angelMuwakkil: abjadData.ulwiMuwakkil,
      servantAwan: abjadData.sifliAwan,
      grid: musallasGrid,
      chalSteps: musallasChalSteps,
      rowSums: musallasRowSums,
      colSums: musallasColSums,
      diagSums: musallasDiagSums,
      targetIntents: ['قضاء الحاجات', 'فوری نصرت', 'حفاظت و حصار', 'دفعِ موانع و دشمن'],
      kashAlBarniRule: 'کاش البرنی (مفتاح الجفر): مثلث سب سے پہلا کثیر الاضلاع نقش ہے جو نقطہ، خط اور سطح کا اتحاد ہے اور امورِ عاجلہ میں سریع العمل ہے۔',
      consecrationGuide: 'بوقتِ طلوعِ آفتاب یا قبل از زوال پاکیزہ حالت میں سفید قرطاس پر تحریر کریں۔',
    },

    // 3. Mukhammaz (5x5)
    {
      id: 'sug-mukhammas-5x5',
      title: 'مخمسِ مریخی و جلالی (5x5 Power Matrix)',
      subtitleUrdu: 'ماتریسِ مخمس ۲۵ خانے برائے فتح، تسخیرِ حکام، غلبہ و وجاہت',
      dimension: 5,
      type: 'mukhammas',
      matrixCategory: 'numerical_magic_square',
      powerScore: 84 + (mukhammasKasr === 0 ? 8 : 0) + (objectiveFilter === 'victory_conquest' || objectiveFilter === 'honor_majesty' ? 12 : 0),
      isSupremeMatch: false,
      matchRank: 0,
      rationale: `پنج گانہ مخمس ۲۵ خانوں پر مشتمل ہے جو قہر، جلال، فتحِ مبین اور حاکموں پر رعب و دبدبے کے لیے مختص ہے۔ عدد ${total} پر مفتاح ${mukhammasQuotient} اخذ ہوئی۔`,
      formulaEquation: `(${total} - 60) ÷ 5 = ${mukhammasQuotient} (کسر: ${mukhammasKasr})`,
      quotient: mukhammasQuotient,
      kasr: mukhammasKasr,
      kasrExplanation: mukhammasKasr === 0 ? 'بدونِ کسر' : `کسر ${mukhammasKasr}`,
      chalType: 'atishi',
      chalNameUrdu: 'چالِ مریخی ہندی (۵×۵)',
      element: 'fire',
      elementUrdu: 'آتشی (جلالی)',
      planet: 'Mars',
      planetUrdu: 'مریخ (کوکبِ نصرت و حرب)',
      incense: 'عودِ ہندی، فلفل سیاہ و صندل سرخ',
      favorableSaat: 'ساعتِ مریخ (منگل بوقتِ طلوع)',
      angelMuwakkil: abjadData.ulwiMuwakkil,
      servantAwan: abjadData.sifliAwan,
      grid: mukhammasGrid,
      chalSteps: mukhammasChalSteps,
      rowSums: mukhammasRowSums,
      colSums: mukhammasColSums,
      diagSums: mukhammasDiagSums,
      targetIntents: ['فتح و ظفر', 'تسخیرِ حکام', 'ابطالِ سحرِ شدید', 'عزت و غلبہ'],
      kashAlBarniRule: 'کاش البرنی (قوانین طلسمات): مخمس قوی ترین جلالی الواح میں شمار ہوتا ہے جو معاندین کے شر کو نیست و نابود کرتا ہے۔',
      consecrationGuide: 'روزِ منگل بوقتِ ساعتِ مریخ آہنی قلم یا سرخ روشنائی سے تحریر کریں۔',
    },

    // 4. Musabba (7x7)
    {
      id: 'sug-musabba-7x7',
      title: 'مسبعِ زہرہ و الفت (7x7 Harmony Matrix)',
      subtitleUrdu: 'ماتریسِ ہفت گانہ ۴۹ خانے برائے حب، مٹھاس، تسخیرِ قلوب و عاطفت',
      dimension: 7,
      type: 'musabba',
      matrixCategory: 'numerical_magic_square',
      powerScore: 82 + (musabbaKasr === 0 ? 8 : 0) + (objectiveFilter === 'love_harmony' || objectiveFilter === 'healing_health' ? 14 : 0),
      isSupremeMatch: false,
      matchRank: 0,
      rationale: `ہفت گانہ مسبع ۴۹ خانوں پر مشتمل ہے جو ۷ افلاک، ۷ کواکب اور ہفتہ کے ۷ ایام کے روحانی انوار کو مرکوز کرتا ہے۔ محبت، صلح اور ازدواجی الفت کے لیے بے نظیر ہے۔`,
      formulaEquation: `(${total} - 168) ÷ 7 = ${musabbaQuotient} (کسر: ${musabbaKasr})`,
      quotient: musabbaQuotient,
      kasr: musabbaKasr,
      kasrExplanation: musabbaKasr === 0 ? 'بدونِ کسر' : `کسر ${musabbaKasr}`,
      chalType: 'aabi',
      chalNameUrdu: 'چالِ زہرہ جمالی (۷×۷)',
      element: 'water',
      elementUrdu: 'آبی و بادی (جمالی)',
      planet: 'Venus',
      planetUrdu: 'زہرہ (کوکبِ محبت و مسرت)',
      incense: 'صندل سفید، کافور و جاوی',
      favorableSaat: 'ساعتِ زہرہ (جمعہ بوقتِ طلوع)',
      angelMuwakkil: abjadData.ulwiMuwakkil,
      servantAwan: abjadData.sifliAwan,
      grid: musabbaGrid,
      chalSteps: [],
      rowSums: musabbaRowSums,
      colSums: musabbaColSums,
      diagSums: musabbaDiagSums,
      targetIntents: ['محبت و الفت', 'صلح و آشتی', 'تسخیرِ محبوب', 'شادی و رشتہ'],
      kashAlBarniRule: 'کاش البرنی (اعمال تسخیر): مسبعِ زہرہ قلوب کو موم کرنے اور نزاع ختم کرنے میں تریاق کی مانند ہے۔',
      consecrationGuide: 'بروز جمعہ اول ساعت میں گلاب اور زعفران سے ہرن کی جھلی یا خوشبودار کاغذ پر لکھیں۔',
    },

    // 5. Letter Takseer Sadr-o-Mu'akhkhar (صدر و مؤخر)
    {
      id: 'sug-letter-takseer',
      title: 'تکسیرِ صدر و مؤخر حروفی (Folded Letter Matrix)',
      subtitleUrdu: 'ماتریسِ حروفِ بسط برائے حلزونی گردش، انقطاعِ نحوست و اخراجِ عزائم',
      dimension: letterGrid.length,
      type: 'letter_sadr',
      matrixCategory: 'letter_takseer',
      powerScore: 89 + (letterTakseerResult.zamamaReached ? 7 : 0) + (objectiveFilter === 'universal' || objectiveFilter === 'love_harmony' ? 5 : 0),
      isSupremeMatch: false,
      matchRank: 0,
      rationale: `حروفِ عبارت "${cleaned}" کو سر اور پاؤں (صدر و مؤخر) سے باہم ملا کر ${letterTakseerResult.totalCycles} ادوار میں تکسیر کیا گیا۔ اس سے حروف کا باطنی قفل کھلتا ہے اور موکلات بیدار ہوتے ہیں۔`,
      formulaEquation: `تکسیرِ حروفی: ${cleaned.length} حروف ← ${letterTakseerResult.totalCycles} سطور`,
      quotient: total,
      kasr: 0,
      chalType: 'atishi',
      chalNameUrdu: 'تکسیرِ صدر و مؤخر (کاش البرنی)',
      element: dominantEl,
      elementUrdu: abjadData.dominantElementUrdu,
      planet: planet,
      planetUrdu: planetUrdu,
      incense: abjadData.incense,
      favorableSaat: abjadData.favorableSaat,
      angelMuwakkil: letterTakseerResult.steps[0]?.extractedName || abjadData.ulwiMuwakkil,
      servantAwan: abjadData.sifliAwan,
      grid: letterGrid,
      letterGrid: letterGrid,
      chalSteps: [],
      rowSums: [],
      colSums: [],
      diagSums: [],
      targetIntents: ['تسخیرِ ارواح', 'استخراجِ عزائمِ قویہ', 'حصولِ کشفِ باطنی', 'حصارِ حروفی'],
      kashAlBarniRule: 'کاش البرنی (علم تکسیر و نقوش): تکسیر صدر و مؤخر علم الحروف کی روح ہے جس میں سر اور دم کے حروف باہم آمیز ہو کر تمام نقائص کو جلا دیتے ہیں۔',
      consecrationGuide: 'ماتریس کے گرد چہار موکلات اور آیت الکرسی کا دائرہ لگا کر بوقتِ شب تلاوت کریں۔',
    },
  ];

  // Sort by power score descending
  rawSuggestions.sort((a, b) => b.powerScore - a.powerScore);

  // Assign Supreme Match & Rank
  const processedSuggestions = rawSuggestions.map((sug, idx) => ({
    ...sug,
    matchRank: idx + 1,
    isSupremeMatch: idx === 0,
  }));

  return {
    inputText,
    cleanedText: cleaned,
    totalKabir: total,
    totalSaghir: abjadData.totalSaghir,
    letterCount: abjadData.letterCount,
    dominantElement: dominantEl,
    dominantElementUrdu: abjadData.dominantElementUrdu,
    governingPlanet: planet,
    governingPlanetUrdu: planetUrdu,
    supremeSuggestion: processedSuggestions[0],
    allSuggestions: processedSuggestions,
    arithmeticProperties: {
      musallasQuotient,
      musallasKasr,
      murabbaQuotient,
      murabbaKasr,
      mukhammasQuotient,
      mukhammasKasr,
      musaddasQuotient,
      musaddasKasr,
      musabbaQuotient,
      musabbaKasr,
    },
  };
}

