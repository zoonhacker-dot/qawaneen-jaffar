import { ElementType, JafrLetterDetail, JafrSymbolismAnalysis } from '../types';
import { JAFR_28_LETTERS_DATA, ZODIAC_SIGNS_URDU } from '../data/jafrSymbolismData';
import { adadToLetters, URDU_LETTER_EQUIVALENTS } from './jafrEngine';

// Normalize any Arabic/Urdu or mixed string
export function cleanAndExtractLetters(input: string): { letters: string[]; numbers: number[]; rawClean: string } {
  if (!input) return { letters: [], numbers: [], rawClean: '' };

  const rawClean = input.trim();
  const letters: string[] = [];
  const numbers: number[] = [];

  // Match arabic/persian/urdu digits & english digits
  const digitMap: Record<string, number> = {
    '۰': 0, '۱': 1, '۲': 2, '۳': 3, '۴': 4, '۵': 5, '۶': 6, '۷': 7, '۸': 8, '۹': 9,
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9
  };

  for (const char of rawClean) {
    if (digitMap[char] !== undefined) {
      numbers.push(digitMap[char]);
    } else {
      let normalized = URDU_LETTER_EQUIVALENTS[char] || char;
      // Filter only standard 28 Arabic letters
      if (JAFR_28_LETTERS_DATA[normalized]) {
        letters.push(normalized);
      }
    }
  }

  return { letters, numbers, rawClean };
}

// Generate the Ulwi Angel from an Abjad value or letter sequence
export function deriveUlwiMuwakkil(letters: string[], totalKabir: number): string {
  if (letters.length === 0 && totalKabir === 0) return 'روقیائیل ؑ';
  
  if (letters.length > 0 && letters.length <= 5) {
    const root = letters.join('');
    return `${root}ائیل ؑ`;
  }
  
  const letterRep = adadToLetters(totalKabir);
  if (letterRep) {
    return `${letterRep}طائیل ؑ`;
  }
  
  return 'اسرافیل ؑ';
}

// Generate Sifli Awan
export function deriveSifliAwan(letters: string[], totalKabir: number): string {
  if (letters.length === 0 && totalKabir === 0) return 'المذہب';
  
  if (letters.length > 0 && letters.length <= 4) {
    const root = letters.join('');
    return `${root}طوش`;
  }
  
  const letterRep = adadToLetters(totalKabir);
  if (letterRep) {
    return `${letterRep}یوش`;
  }
  
  return 'شمهورش';
}

// Generate Talismanic Secret Word via Sadr-o-Muakhkhar head-tail combination
export function generateTalismanicWord(letters: string[]): string {
  if (letters.length === 0) return 'کعسلہون';
  if (letters.length === 1) return `${letters[0]}طلمس`;
  
  let left = 0;
  let right = letters.length - 1;
  let result = '';
  
  while (left <= right) {
    if (left === right) {
      result += letters[left];
      break;
    }
    result += letters[left];
    result += letters[right];
    left++;
    right--;
  }
  
  return result;
}

// Compute Digital Root (1-9)
export function calculateDigitalRoot(num: number): number {
  if (num === 0) return 0;
  return ((num - 1) % 9) + 1;
}

// Main Jafr Symbolism Analysis Engine
export function analyzeJafrSymbolism(input: string): JafrSymbolismAnalysis {
  const { letters, numbers, rawClean } = cleanAndExtractLetters(input);
  
  // If user entered only digits, convert the number into letters via Jafr rule
  let workingLetters = [...letters];
  let inputMode: 'alphabetic' | 'numeric' | 'mixed' = 'alphabetic';
  
  if (letters.length === 0 && numbers.length > 0) {
    inputMode = 'numeric';
    const numVal = parseInt(numbers.join(''), 10);
    const converted = adadToLetters(numVal);
    for (const char of converted) {
      if (JAFR_28_LETTERS_DATA[char]) {
        workingLetters.push(char);
      }
    }
  } else if (letters.length > 0 && numbers.length > 0) {
    inputMode = 'mixed';
  }

  // Fallback if completely empty
  if (workingLetters.length === 0) {
    workingLetters = ['ا', 'ل', 'ف'];
  }

  const detailedLetters: JafrLetterDetail[] = [];
  let totalKabir = 0;
  let totalSaghir = 0;
  let totalWasit = 0;
  let totalAkbar = 0;

  const elementCounts = { fire: 0, air: 0, water: 0, earth: 0 };
  let luminousCount = 0;
  let silentCount = 0;

  let bastLafziSpellingArr: string[] = [];
  let bastLafziTotal = 0;

  const nazeerahArr: string[] = [];

  for (const letter of workingLetters) {
    const data = JAFR_28_LETTERS_DATA[letter];
    if (data) {
      detailedLetters.push(data);
      totalKabir += data.abjadKabir;
      totalSaghir += data.abjadSaghir;
      totalWasit += data.abjadWasit;
      totalAkbar += data.abjadAkbar;

      elementCounts[data.element]++;
      if (data.isNourani) luminousCount++;
      if (data.isSowamat) silentCount++;

      bastLafziSpellingArr.push(data.name);
      
      // Calculate spelling abjad
      for (const char of data.name) {
        const norm = URDU_LETTER_EQUIVALENTS[char] || char;
        if (JAFR_28_LETTERS_DATA[norm]) {
          bastLafziTotal += JAFR_28_LETTERS_DATA[norm].abjadKabir;
        }
      }

      nazeerahArr.push(data.nazeerah);
    }
  }

  // Add numbers to totalKabir if mixed
  if (inputMode === 'mixed' && numbers.length > 0) {
    const numSum = numbers.reduce((acc, curr) => acc + curr, 0);
    totalKabir += numSum;
  }

  const totalLettersCount = workingLetters.length;
  const elementPercentages = {
    fire: Math.round((elementCounts.fire / (totalLettersCount || 1)) * 100),
    air: Math.round((elementCounts.air / (totalLettersCount || 1)) * 100),
    water: Math.round((elementCounts.water / (totalLettersCount || 1)) * 100),
    earth: Math.round((elementCounts.earth / (totalLettersCount || 1)) * 100),
  };

  // Find dominant element
  let dominantElement: ElementType = 'fire';
  let maxCount = -1;
  const elementsArr: ElementType[] = ['fire', 'air', 'water', 'earth'];
  for (const el of elementsArr) {
    if (elementCounts[el] > maxCount) {
      maxCount = elementCounts[el];
      dominantElement = el;
    }
  }

  const dominantUrduMap: Record<ElementType, string> = {
    fire: 'آتشی (گرم و خشک - شعلہ زن و غالب)',
    air: 'بادی (گرم و تر - لطیف، متحرک و الفت انگیز)',
    water: 'آبی (سرد و تر - سیال، نرم و پر برکت)',
    earth: 'خاکی (سرد و خشک - ثابت، پروقار و پائیدار)',
  };

  const temperamentMap: Record<ElementType, string> = {
    fire: 'مزاج صفراوی (گرم و خشک): مائل بہ غلبہ، سرعتِ تاثیر، شجاعت اور دل میں سوزش و بے قراری پیدا کرنے والا۔',
    air: 'مزاج دموی (گرم و تر): مائل بہ محبت، الفت، انبساطِ خاطر، مقناطیسی کشش اور قلبی وسعت۔',
    water: 'مزاج بلغمی (سرد و تر): مائل بہ تسکین، برکت، شفاء، ٹھنڈک اور غصے کو زائل کرنے والا۔',
    earth: 'مزاج سوداوی (سرد و خشک): مائل بہ قرار، عقد اللسان، حفاظتِ خزائن اور مضبوطیِ بنیاد۔',
  };

  // Planetary alignment based on dominant element or first letter
  const firstLetter = detailedLetters[0] || JAFR_28_LETTERS_DATA['ا'];
  const governingPlanet = firstLetter.planet;
  const governingPlanetUrdu = firstLetter.planetUrdu;

  const saatMap: Record<string, { bestSaat: string; bestDay: string; bestIncense: string; recommendedInk: string }> = {
    'Sun': {
      bestSaat: 'ساعتِ شمس (طلوع آفتاب کے بعد پہلی ساعت برائے اعمالِ عزت و تسخیر)',
      bestDay: 'اتوار (یکشنبہ)',
      bestIncense: 'عودِ ہندی، صندلِ سرخ، لبانِ نر اور زعفران۔',
      recommendedInk: 'زعفران خالص مع عرقِ گلاب و مشک۔'
    },
    'Moon': {
      bestSaat: 'ساعتِ قمر (شب کے اول حصے یا پیر کے روز پہلی ساعت)',
      bestDay: 'پیر (دوشنبہ)',
      bestIncense: 'کافور، صندل سفید اور عرقِ گلاب۔',
      recommendedInk: 'عرق گلاب اور چاندی کا ورق ملا محلول۔'
    },
    'Mars': {
      bestSaat: 'ساعتِ مریخ (منگل کی دوپہر یا پہلی ساعت برائے دفاع و ہیبت)',
      bestDay: 'منگل (سہ شنبہ)',
      bestIncense: 'حرمل (اسپند)، رائی، مصطگی اور گندھک۔',
      recommendedInk: 'سرخ روشنائی یا زعفران تند۔'
    },
    'Mercury': {
      bestSaat: 'ساعتِ عطارد (بدھ کے دن پہلی یا آٹھویں ساعت)',
      bestDay: 'بدھ (چہار شنبہ)',
      bestIncense: 'جاوتری، لونگ، لوبان اور دارچینی۔',
      recommendedInk: 'سبز رنگ یا عرق گلاب میں لکھی روشنائی۔'
    },
    'Jupiter': {
      bestSaat: 'ساعتِ مشتری (جمعرات کو طلوع آفتاب کے بعد پہلی ساعت - سعد اکبر)',
      bestDay: 'جمعرات (پنجشنبہ)',
      bestIncense: 'عنبر، مشکِ نافہ، زعفران اور لبان ذکر۔',
      recommendedInk: 'خالص زعفران و مشکِ اصلی۔'
    },
    'Venus': {
      bestSaat: 'ساعتِ زہرہ (جمعہ کی صبح طلوع آفتاب - سعد اصغر برائے الفت و کشش)',
      bestDay: 'جمعہ (آدینہ)',
      bestIncense: 'عطر چنبیلی، صندل سفید، مستکی اور لبان۔',
      recommendedInk: 'عرق گلاب و زعفرانِ شیریں بر ورقِ غزال۔'
    },
    'Saturn': {
      bestSaat: 'ساعتِ زحل (ہفتہ کی صبح برائے حفاظتِ مدفون و عقد)',
      bestDay: 'ہفتہ (شنبہ)',
      bestIncense: 'صبر، حلتیک (ہینگ) اور لبانِ سیاہ۔',
      recommendedInk: 'کالی روشنائی یا سرمئی سیاہی۔'
    }
  };

  const planetRules = saatMap[governingPlanet] || saatMap['Sun'];

  const digitalRoot = calculateDigitalRoot(totalKabir);
  const modulo12 = ((totalKabir - 1) % 12);
  const zodiacSignNameUrdu = ZODIAC_SIGNS_URDU[modulo12] || ZODIAC_SIGNS_URDU[0];

  const mirrorSequence = [...workingLetters].reverse().join(' ');
  const nazeerahSequence = nazeerahArr.join(' ');
  const talismanicSecretWord = generateTalismanicWord(workingLetters);
  const ulwiMuwakkil = deriveUlwiMuwakkil(workingLetters, totalKabir);
  const sifliAwan = deriveSifliAwan(workingLetters, totalKabir);

  const luminousPercent = Math.round((luminousCount / totalLettersCount) * 100);
  const silentPercent = Math.round((silentCount / totalLettersCount) * 100);

  // Synthesize rich commentary from Kaash Al-Biruni's books
  const miftahJafrContext = `کاش البرنی کی تصنیف 'مفتاح الجفر' کے مطابق، اس سلسلہ کے کل اعداد ابجد کبیر (${totalKabir}) عالمِ ارواح میں خاص نورانی ارتعاش رکھتے ہیں۔ اس سلسلے سے برآمد ہونے والا موکل علوی '${ulwiMuwakkil}' اس اسم کے باطنی خزانے کا نگران ہے، جبکہ عون سفلی '${sifliAwan}' مادی اور ارضی دنیا میں تاثیر کو جاری کرنے کا خادم ہے۔`;

  const qawaneenTilismRule = `کتاب 'قوانینِ طلسم' کے باب التوافق کے مطابق، اگر اس سلسلے کا نقش تیار کیا جائے تو اس کی لوح کے چاروں کونوں پر اسمِ طلسماتی '${talismanicSecretWord}' اور نظائر سلسلہ '${nazeerahSequence}' لکھا جائے تاکہ طلسم میں باطنی کشش اور ظاہری حصار بیک وقت قائم ہو جائے۔`;

  const aflatoonElementalHarmony = `حکیم افلاطون کے قانون التوافق و التنافر کی رو سے اس مجموعہ میں ${elementPercentages.fire}% آگ، ${elementPercentages.air}% ہوا، ${elementPercentages.water}% پانی اور ${elementPercentages.earth}% مٹی ہے۔ چونکہ غالب عنصر '${dominantUrduMap[dominantElement]}' ہے، لہٰذا اس عمل کی تاثیر گرمی، حرکت اور دلی رغبت پیدا کرنے میں بے مثال رہے گی۔`;

  const biruniAstronomicalNote = `ابو ریحان البیرونی کی کتاب 'التفهیم' اور 'آثار الباقیہ' کی فلکی تقویم کے مطابق یہ مجموعہ برج '${zodiacSignNameUrdu}' سے براہِ راست مطابقت رکھتا ہے، اور منزلِ قمر '${detailedLetters[0]?.lunarMansion?.name || 'الشرطین'}' کے زیر سایہ سعد ترین نتائج فراہم کرتا ہے۔`;

  const practicalApplicationUrdu = `یہ سلسلہ مبارکہ ${planetRules.bestDay} کے روز ${planetRules.bestSaat} میں ${planetRules.recommendedInk} کے ساتھ لکھا جائے، اور عمل کے وقت ${planetRules.bestIncense} کا بخور روشن کیا جائے۔`;

  const warningAndEthics = `کاش البرنی فرماتے ہیں: علم الجفر الٰہی رازوں کی امانت ہے۔ کسی بھی عمل کو کسی پر ناحق تسلط، ناجائز تفریق یا غیر شرعی مقاصد کے لیے استعمال کرنا سخت گناہ اور رجعت کا باعث بنتا ہے۔ ہمیشہ جائز و خیر کے مقاصد میں کام لائیں۔`;

  return {
    rawInput: rawClean,
    cleanedLetters: workingLetters,
    numericDigits: numbers,
    inputMode,
    totalAbjadKabir: totalKabir,
    totalAbjadSaghir: totalSaghir,
    totalAbjadWasit: totalWasit,
    totalAbjadAkbar: totalAkbar,
    digitalRoot,
    modulo12ZodiacNumber: modulo12 + 1,
    zodiacSignNameUrdu,
    bastLafziSpelling: bastLafziSpellingArr.join(' - '),
    bastLafziTotal,
    bastHarfi: workingLetters,
    bastAdadiLetters: adadToLetters(totalKabir),
    nazeerahSequence,
    mirrorSequence,
    talismanicSecretWord,
    ulwiMuwakkil,
    sifliAwan,
    elementCounts,
    elementPercentages,
    dominantElement,
    dominantElementUrdu: dominantUrduMap[dominantElement],
    temperament: temperamentMap[dominantElement],
    luminousRatio: {
      luminousCount,
      darkCount: totalLettersCount - luminousCount,
      luminousPercent
    },
    silentRatio: {
      silentCount,
      dottedCount: totalLettersCount - silentCount,
      silentPercent
    },
    governingPlanet,
    governingPlanetUrdu,
    bestSaat: planetRules.bestSaat,
    bestDay: planetRules.bestDay,
    bestIncense: planetRules.bestIncense,
    recommendedInk: planetRules.recommendedInk,
    lettersDetailed: detailedLetters,
    kashAlBarnyBookCommentary: {
      miftahJafrContext,
      qawaneenTilismRule,
      aflatoonElementalHarmony,
      biruniAstronomicalNote,
      practicalApplicationUrdu,
      warningAndEthics
    }
  };
}
