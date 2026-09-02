export type ElementType = 'fire' | 'air' | 'water' | 'earth';

export interface LetterElementInfo {
  letter: string;
  name: string;
  abjadKabir: number;
  abjadSaghir: number;
  element: ElementType;
  elementUrdu: string;
  nature: string;
  planet: string;
  planetUrdu: string;
  metal: string;
  bodyPart: string;
}

export interface CalculationResult {
  text: string;
  cleanedText: string;
  totalKabir: number;
  totalSaghir: number;
  letterCount: number;
  letterBreakdown: {
    letter: string;
    kabir: number;
    element: ElementType;
    elementUrdu: string;
  }[];
  elementCounts: {
    fire: number;
    air: number;
    water: number;
    earth: number;
  };
  elementPercentages: {
    fire: number;
    air: number;
    water: number;
    earth: number;
  };
  dominantElement: ElementType;
  dominantElementUrdu: string;
  ulwiMuwakkil: string;
  sifliAwan: string;
  governingPlanet: string;
  governingPlanetUrdu: string;
  favorableDay: string;
  favorableSaat: string;
  incense: string;
  natureDescription: string;
}

export interface TakseerStep {
  stepNumber: number;
  letters: string[];
  combined: string;
  extractedName?: string;
}

export type TakseerType = 'sadr_muakhkhar' | 'aflatoon_elements' | 'kabeer_jumal';

export interface TakseerResult {
  originalText: string;
  takseerType?: TakseerType;
  takseerTypeNameUrdu?: string;
  letters: string[];
  steps: TakseerStep[];
  totalCycles: number;
  zamamaReached: boolean;
  extractedAzimat: string[];
  talismanicSeal: string;
  elementalBreakdown?: {
    fire: string[];
    air: string[];
    water: string[];
    earth: string[];
  };
  harmonyScore?: number;
  explanationNotes?: string[];
}

export type NaqshType = 'musallas' | 'murabba' | 'mukhammas' | 'musaddas' | 'musabba' | 'musamman';
export type ChalType = 'atishi' | 'badi' | 'aabi' | 'khaaki';
export type NaqshCategory = 'mahabbat' | 'adawat' | 'zaban_bandi' | 'shifa' | 'rizq_barakat' | 'hifazat_hisar' | 'aam';
export type NaqshMode = 'adadi_sadah' | 'harfi_abjad' | 'takseeri' | 'talismi_malayika';

export interface SavedNaqshItem {
  id: string;
  title: string;
  category: NaqshCategory;
  categoryUrdu: string;
  adad: number;
  inputText?: string;
  type: NaqshType;
  typeNameUrdu: string;
  chal: ChalType;
  chalNameUrdu: string;
  grid: number[][];
  dimension: number;
  notes?: string;
  createdAt: string;
}

export interface NaqshResult {
  dimension: number;
  type: NaqshType;
  chal: ChalType;
  chalNameUrdu: string;
  totalAdad: number;
  baseAdad: number;
  subtractionConstant: number;
  quotient: number;
  kasr: number;
  kasrPosition: number | null;
  grid: number[][];
  rowSums: number[];
  colSums: number[];
  diagSums: number[];
  isValid: boolean;
  chalOrderExplanation: string[];
}

export interface BookChapter {
  id: string;
  title: string;
  bookSource: string;
  category: 'tilism' | 'aflatoon' | 'jafr' | 'takseer' | 'aamal' | 'taskheer';
  summary: string;
  content: string[];
  keyRules: string[];
  kashAlBarnyQuote?: string;
}

export interface PlanetarySaat {
  hourIndex: number;
  hourName: string;
  timeRange: string;
  planet: string;
  planetUrdu: string;
  nature: 'saad_akbar' | 'saad_asghar' | 'nahs_akbar' | 'nahs_asghar' | 'mumtazij';
  natureUrdu: string;
  suitableActions: string[];
  incense: string;
  color: string;
}

export interface OperationProtocol {
  id: string;
  title: string;
  category: 'mahabbat' | 'adawat' | 'zaban_bandi' | 'taskheer_khalaiq' | 'taskheer_jinn';
  categoryUrdu: string;
  severity: 'safe' | 'caution' | 'warning';
  purpose: string;
  requiredSaat: string;
  suitableDay: string;
  incense: string;
  inkAndPaper: string;
  direction: string;
  preconditions: string[];
  steps: string[];
  azimatOrNaqsh: string;
  protectionMeasures: string[];
  kashAlBarnyReference: string;
}

export type IstikharaCategory = 'shadi' | 'karobar' | 'sharakat' | 'safar' | 'aam';

export interface IstikharaPersonInfo {
  name: string;
  motherName: string;
  abjadName: number;
  abjadMother: number;
  totalAbjad: number;
  dominantElement: ElementType;
  dominantElementUrdu: string;
  zodiacSign: string;
  zodiacPlanet: string;
  zodiacNumber: number;
}

export interface IstikharaMarriageResult {
  person1: IstikharaPersonInfo;
  person2: IstikharaPersonInfo;
  combinedTotal: number;
  remainder4: number;
  remainder7: number;
  remainder9: number;
  remainder12: number;
  elementalRelation: string;
  elementalCompatibilityPercent: number;
  ghalibMaghloob: {
    ghalib: string;
    maghloob: string;
    balanceStatus: string;
    description: string;
  };
  zodiacRelation: string;
  verdict: 'saad_mubarak' | 'muwafiq_ba_sadqa' | 'mutawassit' | 'nahs_ihtiyat';
  verdictUrdu: string;
  verdictScore: number;
  detailedAnalysis: string[];
  recommendedSadqa: string;
  recommendedZikr: string;
  auspiciousDays: string[];
  kashAlBarnyRule: string;
}

export interface IstikharaBusinessResult {
  person: IstikharaPersonInfo;
  businessName: string;
  businessAbjad: number;
  combinedTotal: number;
  remainder4: number; // 1: Fire, 2: Air, 3: Water, 4: Earth
  remainder7: number; // Planetary influence
  remainder3: number; // 1: Profit, 2: Average, 0: Loss/Tawaqquf
  profitPotentialUrdu: string;
  dominantPlanetUrdu: string;
  planetNatureUrdu: string;
  verdict: 'saad_mubarak' | 'muwafiq_ba_sadqa' | 'mutawassit' | 'nahs_ihtiyat';
  verdictUrdu: string;
  verdictScore: number;
  detailedAnalysis: string[];
  bestOpeningDay: string;
  bestOpeningSaat: string;
  recommendedSadqa: string;
  recommendedZikr: string;
  kashAlBarnyRule: string;
}

export interface IstikharaGeneralResult {
  person: IstikharaPersonInfo;
  queryTopic: string;
  topicAbjad: number;
  combinedTotal: number;
  remainder3: number;
  remainder7: number;
  verdict: 'khair_o_barakat' | 'tawaqquf_o_sabir' | 'ihtiyat_o_sadqa';
  verdictUrdu: string;
  guidanceText: string;
  recommendedAyah: string;
  recommendedZikr: string;
  recommendedSadqa: string;
  masnoonIstikharaGuide: {
    duaaArabic: string;
    duaaUrdu: string;
    method: string;
  };
}

export type TakseerPracticeCategory = 
  | 'sadr_muakhkhar' 
  | 'aflatoon' 
  | 'asmaul_husna' 
  | 'hisar_riyazat' 
  | 'qalb_meditation' 
  | 'chilla_amal';

export interface TakseerSession {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  title: string;
  category: TakseerPracticeCategory;
  categoryUrdu: string;
  count: number; // Recitation/cycle count (e.g. 100, 313, 1000)
  durationMinutes: number; // Duration in minutes
  focusScore?: number; // 1 to 5 rating
  associatedText?: string; // Root word/verse
  element?: ElementType;
  elementUrdu?: string;
  notes?: string;
  completedAt: string; // ISO String
}

export interface DayActivityData {
  dateStr: string; // YYYY-MM-DD
  dayShortUrdu: string; // e.g. "پیر", "منگل", etc.
  dayFullUrdu: string;
  formattedDate: string; // e.g. "28 اگست"
  sessionsCount: number;
  totalMinutes: number;
  totalRecitations: number;
  isToday: boolean;
  sessions: TakseerSession[];
}

export type MatrixObjective = 
  | 'universal'
  | 'rizq_wealth' 
  | 'love_harmony' 
  | 'victory_conquest' 
  | 'healing_health' 
  | 'protection_shield' 
  | 'honor_majesty';

export interface ChalCellStep {
  step: number;
  row: number;
  col: number;
  houseNumber: number;
  value: number | string;
  element: ElementType;
  elementUrdu: string;
  directionUrdu: string;
  description: string;
}

export interface TakseerMatrixSuggestion {
  id: string;
  title: string;
  subtitleUrdu: string;
  dimension: number; // 3, 4, 5, 6, 7, 8, etc.
  type: 'musallas' | 'murabba' | 'mukhammas' | 'musaddas' | 'musabba' | 'muthamman' | 'letter_sadr' | 'letter_aflatoon';
  matrixCategory: 'numerical_magic_square' | 'letter_takseer' | 'elemental_spiral';
  powerScore: number; // 0 - 100
  isSupremeMatch: boolean;
  matchRank: number;
  rationale: string;
  formulaEquation: string;
  quotient: number;
  kasr: number;
  kasrExplanation?: string;
  chalType: ChalType;
  chalNameUrdu: string;
  element: ElementType;
  elementUrdu: string;
  planet: string;
  planetUrdu: string;
  incense: string;
  favorableSaat: string;
  angelMuwakkil: string;
  servantAwan: string;
  grid: (number | string)[][];
  letterGrid?: string[][];
  chalSteps: ChalCellStep[];
  rowSums: number[];
  colSums: number[];
  diagSums: number[];
  targetIntents: string[];
  kashAlBarniRule: string;
  consecrationGuide: string;
}

export interface AbjadTakseerAnalysis {
  inputText: string;
  cleanedText: string;
  totalKabir: number;
  totalSaghir: number;
  letterCount: number;
  dominantElement: ElementType;
  dominantElementUrdu: string;
  governingPlanet: string;
  governingPlanetUrdu: string;
  supremeSuggestion: TakseerMatrixSuggestion;
  allSuggestions: TakseerMatrixSuggestion[];
  arithmeticProperties: {
    musallasQuotient: number;
    musallasKasr: number;
    murabbaQuotient: number;
    murabbaKasr: number;
    mukhammasQuotient: number;
    mukhammasKasr: number;
    musaddasQuotient: number;
    musaddasKasr: number;
    musabbaQuotient: number;
    musabbaKasr: number;
  };
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  cityName: string;
  countryName: string;
  source: 'gps' | 'preset' | 'manual';
}

export interface QiblaCalculationResult {
  qiblaBearingDeg: number;
  distanceKm: number;
  directionCardinalUrdu: string;
  sunAzimuthDeg?: number;
  sunElevationDeg?: number;
  isAlignedWithQibla: boolean;
}

export interface PrayerTimeSlot {
  id: 'fajr' | 'ishraq' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'tahajjud';
  nameUrdu: string;
  nameEnglish: string;
  timeFormatted: string;
  hours: number;
  minutes: number;
  spiritualVirtueUrdu: string;
  recommendedAamal: string[];
  planetaryHourAtTime: string;
  nature: 'saad_akbar' | 'saad_asghar' | 'muntadal' | 'special_spiritual';
}

export interface AuspiciousSpiritualHour {
  id: string;
  targetCategory: string;
  targetCategoryUrdu: string;
  icon: string;
  governingPlanet: string;
  governingPlanetUrdu: string;
  nature: string;
  primaryIncense: string;
  auspiciousHoursUrdu: string[];
  bestPrayerTiming: string;
  recommendedIsm: string;
  recommendedVerse: string;
  jafrGuidance: string;
  taksirRecommendation: string;
  powerRating: number; // 0 - 100
}

export type DreamCategory = 
  | 'spiritual_holy'
  | 'celestial_nature'
  | 'fauna_animals'
  | 'wealth_objects'
  | 'states_actions';

export type DreamSignalType = 
  | 'khair_azheem'
  | 'falah_o_barkat'
  | 'hifazat_o_shifa'
  | 'tanbih_o_ehtiyat'
  | 'khatra_o_dawa';

export interface DreamSymbolItem {
  id: string;
  nameUrdu: string;
  nameEnglish: string;
  category: DreamCategory;
  categoryUrdu: string;
  keywords: string[];
  signalType: DreamSignalType;
  signalUrdu: string;
  primaryInterpretation: string;
  istikharaImplication: string;
  spiritualPracticeContext: string;
  element: ElementType;
  elementUrdu: string;
  kashAlBarniReference: string;
  recommendedAction: string;
  istikharaVerdict: 'highly_favorable' | 'favorable' | 'neutral_delayed' | 'unfavorable_caution';
  iconEmoji: string;
}

export interface PatientDiagnosisResult {
  patientName: string;
  motherName: string;
  gender: 'male' | 'female';
  genderUrdu: string;
  selectedDiseaseId?: string;
  selectedDiseaseNameUrdu?: string;
  totalAdadPatient: number;
  totalAdadMother: number;
  combinedTotalAdad: number;
  tarahMod4Remainder: number; // 1: Atishi, 2: Badi, 3: Aabi, 4/0: Khaaki
  tarahMod7Remainder: number; // Mod 7 for Planetary Dominance & Asarat
  tarahMod12Remainder: number; // Mod 12 for Burj & Khidmat
  
  // Diagnosis details
  illnessNature: 'spiritual_sahar' | 'spiritual_nazar' | 'spiritual_jinn_asarat' | 'physical_temperament' | 'mixed_roohani_jismani';
  illnessNatureUrdu: string;
  temperamentMismatch: string;
  dominantElementUrdu: string;
  governingPlanetUrdu: string;
  burjUrdu: string;
  rootCauseUrdu: string;
  detailedAnalysisUrdu: string;

  // Full Temperament (مزاج) Breakdown
  temperamentProfile: {
    mizajUrdu: string; // دموی (گرم تر)، صفراوی (گرم خشک)، بلغمی (سرد تر)، سوداوی (سرد خشک)
    khiltGhalibUrdu: string; // غالب خلط
    affectedOrgansUrdu: string; // متاثرہ اعضاء (اعضاء رئیسہ)
    safePrinciplesUrdu: string; // بغیر کسی سائیڈ ایفیکٹ کے محفوظ علاج کے بنیادی اصول
  };

  // Occult / Sahar Investigation Specifics (کب سے، کس نے، جسمانی یا سحر فرق، کیفیت، وقت)
  saharDiagnosisDetails?: {
    saharTypeUrdu: string; // سحرِ مأکول (کھلایا پلایا)، مدفون (دفن)، معلق (ہوا میں لٹکایا)، یا ناری (جلایا گیا)
    timeOnsetDurationUrdu: string; // کب سے لگا ہے (مدت و تاریخ کی ابتدا)
    perpetratorProfileUrdu: string; // کرنے والا کون ہے (قریبی، دور کا، مرد، عورت، رشتہ دار یا حسد کرنے والا)
    perpetratorElementUrdu: string; // سائل کے ساتھ کرنے والے کی سمت و عنصر
    distinctionMethodUrdu: string; // سحر ہے یا جسمانی مرض (فرق کرنے کی جفری کسوٹی)
    saharLocationOrBurialUrdu: string; // سحر کا ممکنہ مقام یا پھینکنے کی جگہ
    evilEyeSeverityUrdu: string; // شدتِ اثر
  };

  // Prescriptions & Remedies
  spiritualCure: {
    wazifaUrdu: string;
    wazifaCount: number;
    tilaawatUrdu: string;
    incenseUrdu: string;
    sadqahUrdu: string;
    favorableHourUrdu: string;
    bestDaysUrdu: string;
  };

  // Tibb-e-Unani & Herbal Phytotherapy
  physicalHerbalCure: {
    herbalFormulaNameUrdu: string;
    herbsListUrdu: { name: string; quantity: string; benefits: string }[];
    preparationMethodUrdu: string;
    dietaryPrecautionsUrdu: string[];
    tibbEUnaniTemperamentNotes: string;
  };

  // Homeopathic System of Medicine (ہومیوپیتھک علاج)
  homeopathicCure: {
    formulaTitleUrdu: string;
    remedies: {
      name: string;
      potency: string;
      dosage: string;
      indicationUrdu: string;
    }[];
    generalInstructionsUrdu: string;
  };

  // Allopathic Clinical Guidelines & Modern Diagnostics (ایلوپیتھک طبی رہنمائی)
  allopathicGuidelines: {
    clinicalOverviewUrdu: string;
    recommendedLabTests: string[];
    standardMedicalCareUrdu: string;
    safetyPrecautionsUrdu: string;
  };

  // Disease Specific Protocol (خصوصی مرض جیسے ذیابیطس وغیرہ کا تفصیلی شافی علاج)
  diseaseSpecificProtocol?: {
    diseaseTitleUrdu: string;
    rohaniAmalUrdu: string;
    tibbNabawiUrdu: string;
    herbalSafeFormulaUrdu: string;
    dietaryDosUrdu: string[];
    dietaryDontsUrdu: string[];
    homeopathicSpecificUrdu: string;
    scientificMechanismUrdu: string;
  };

  recommendedNaqsh: {
    type: NaqshType;
    typeNameUrdu: string;
    chal: ChalType;
    chalNameUrdu: string;
    totalAdad: number;
    baseAdad: number;
    grid: number[][];
    writingInk: string;
    carryingMethodUrdu: string;
    consecrationAzimat: string;
  };

  kashAlBarniMedicalRule: string;
}

export interface DreamAnalysisResult {
  matchedSymbols: DreamSymbolItem[];
  overallVerdict: 'highly_favorable' | 'favorable' | 'neutral_delayed' | 'unfavorable_caution';
  verdictTitleUrdu: string;
  istikharaAdviceUrdu: string;
  timingSignificance: string;
  dominantElementUrdu: string;
  spiritualRemedy: {
    sadqah: string;
    wazifa: string;
    incense: string;
    quranicVerse: string;
  };
  jafrInsights: string;
}

export interface LunarPhaseInfo {
  hijriDay: number;
  hijriMonthNameUrdu: string;
  hijriMonthNumber: number;
  hijriYear: number;
  phaseNameEnglish: string;
  phaseNameUrdu: string;
  phaseCategory: 'waxing_crescent' | 'waxing_gibbous' | 'full_moon' | 'waning_gibbous' | 'waning_crescent' | 'new_moon' | 'nahs_mahq';
  moonIlluminationPercent: number; // 0 to 100
  spiritualPotency: 'supreme_saad' | 'high_saad' | 'neutral_medium' | 'nahs_restraint';
  spiritualPotencyUrdu: string;
  manzilAlQamar: {
    number: number;
    nameUrdu: string;
    nameArabic: string;
    meaningUrdu: string;
    rulingElementUrdu: string;
  };
  recommendedSpiritualWorks: string[];
  restrictedSpiritualWorks: string[];
  recommendedWorks?: string[];
  restrictedWorks?: string[];
  kashAlBarniLunarRule: string;
  auspiciousSaatOfDay: string;
  recommendedIncense: string;
  recommendedIsmAzam: string;
  recommendedIsm?: string;
  recommendedDuaVerse: string;
  recommendedVerse?: string;
}

export interface JafrSymbolPreset {
  id: string;
  nameUrdu: string;
  sequence: string;
  bookSource: string;
  category: 'miftah_jafr' | 'qawaneen_tilism' | 'qawaneen_aflatoon' | 'rumooz_takseer' | 'biruni_astronomy' | 'salimani_tilism';
  categoryUrdu: string;
  descriptionUrdu: string;
  esotericSecret: string;
  recommendedUse: string;
}

export interface JafrLetterDetail {
  letter: string;
  name: string;
  abjadKabir: number;
  abjadSaghir: number;
  abjadWasit: number;
  abjadAkbar: number;
  element: ElementType;
  elementUrdu: string;
  nature: string;
  planet: string;
  planetUrdu: string;
  lunarMansion: {
    number: number;
    name: string;
    degree: string;
    spiritualEffect: string;
  };
  nazeerah: string;
  nazeerahAbjad: number;
  oppositeElement: string;
  isNourani: boolean;
  isSowamat: boolean; // Undotted (بے نقط)
  pronunciationType: 'ملفوظی' | 'مسروری' | 'ملبوبی';
  muwakkil: string;
  awan: string;
  metal: string;
  color: string;
  incense: string;
  bodyPart: string;
}

export interface JafrSymbolismAnalysis {
  rawInput: string;
  cleanedLetters: string[];
  numericDigits: number[];
  inputMode: 'alphabetic' | 'numeric' | 'mixed';
  totalAbjadKabir: number;
  totalAbjadSaghir: number;
  totalAbjadWasit: number;
  totalAbjadAkbar: number;
  digitalRoot: number; // 1-9
  modulo12ZodiacNumber: number;
  zodiacSignNameUrdu: string;
  bastLafziSpelling: string;
  bastLafziTotal: number;
  bastHarfi: string[];
  bastAdadiLetters: string;
  nazeerahSequence: string;
  mirrorSequence: string;
  talismanicSecretWord: string;
  ulwiMuwakkil: string;
  sifliAwan: string;
  elementCounts: {
    fire: number;
    air: number;
    water: number;
    earth: number;
  };
  elementPercentages: {
    fire: number;
    air: number;
    water: number;
    earth: number;
  };
  dominantElement: ElementType;
  dominantElementUrdu: string;
  temperament: string;
  luminousRatio: {
    luminousCount: number;
    darkCount: number;
    luminousPercent: number;
  };
  silentRatio: {
    silentCount: number;
    dottedCount: number;
    silentPercent: number;
  };
  governingPlanet: string;
  governingPlanetUrdu: string;
  bestSaat: string;
  bestDay: string;
  bestIncense: string;
  recommendedInk: string;
  lettersDetailed: JafrLetterDetail[];
  kashAlBarnyBookCommentary: {
    miftahJafrContext: string;
    qawaneenTilismRule: string;
    aflatoonElementalHarmony: string;
    biruniAstronomicalNote: string;
    practicalApplicationUrdu: string;
    warningAndEthics: string;
  };
}




