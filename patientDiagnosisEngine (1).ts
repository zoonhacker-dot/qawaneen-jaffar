// -------------------------------------------------------------
// Kashif-ul-Maraz: Comprehensive Jafr, Tibb-e-Nabawi ﷺ, Tibb-e-Unani,
// Homeopathy, and Holistic Diagnosis Engine
// Rules according to Kash Al-Barni's Treatises:
// (مفتاح الجفر، رموز الجفر، مجرباتِ کاش البرنی، و قوانینِ علاج)
// -------------------------------------------------------------

import { PatientDiagnosisResult, ChalType, NaqshType } from '../types';
import { calculateAbjad, generateNaqsh } from './jafrEngine';

export interface SymptomOption {
  id: string;
  labelUrdu: string;
  category: 'physical' | 'spiritual' | 'mental';
  elementBias: 'fire' | 'air' | 'water' | 'earth';
}

export interface DiseaseOption {
  id: string;
  labelUrdu: string;
  categoryUrdu: string;
  categoryKey: 'all' | 'heart_circulatory' | 'chest_respiratory' | 'liver_digestive' | 'brain_mental' | 'joints_bones' | 'eyes_ears' | 'face_beauty' | 'male_health' | 'female_health' | 'cancer_chronic';
  descriptionUrdu: string;
}

export const CHRONIC_DISEASES: DiseaseOption[] = [
  {
    id: 'general_auto',
    labelUrdu: 'عمومی علامات و جفری تشخیص (طبعی و مزاجی تفریق)',
    categoryUrdu: 'عمومی',
    categoryKey: 'all',
    descriptionUrdu: 'منتخب علامات اور مریض کے نام و والدہ کے جفری اعداد کی بنیاد پر خودکار تشخیص'
  },
  // 1. دل و دورانِ خون
  {
    id: 'heart_cardiovascular',
    labelUrdu: 'امراضِ قلب، اختلاج، انجائنا، دل کی کمزوری و شریانوں کی تنگی (Heart & Cardiovascular)',
    categoryUrdu: 'قلبی و دورانی',
    categoryKey: 'heart_circulatory',
    descriptionUrdu: 'دل کی دھڑکن تیز ہونا (خفقان)، سینے میں بوجھ، شریانوں کا جمود اور قلبی عضلات کی بحالی کا شافی علاج'
  },
  {
    id: 'hypertension',
    labelUrdu: 'فشار الدم القوی / ہائی بلڈ پریشر (Hypertension & Vascular Heat)',
    categoryUrdu: 'قلبی و دورانی',
    categoryKey: 'heart_circulatory',
    descriptionUrdu: 'خون کی تپش، شریانوں کا تناؤ، سر چکرانا، غصہ اور بلڈ پریشر کے اتار چڑھاؤ کا قدرتی حل'
  },

  // 2. گھٹنے، جوڑ، ہڈیاں و عضلات
  {
    id: 'knee_arthritis_gout',
    labelUrdu: 'دردِ زانو، گھٹنوں کی رطوبت ختم ہونا، گٹھیا، یورک ایسڈ و عرق النساء (Knee Osteoarthritis & Gout)',
    categoryUrdu: 'جوڑ و ہڈیاں',
    categoryKey: 'joints_bones',
    descriptionUrdu: 'گھٹنوں میں کڑکڑاہٹ، لیسدار رطوبت (Synovial Fluid) کی خشکی، مہروں کا درد اور یورک ایسڈ کا تریاق'
  },

  // 3. سینہ، نزلہ، زکام، کھانسی و دمہ
  {
    id: 'chest_asthma_cough_flu',
    labelUrdu: 'امراضِ سینہ، دمہ، نزلہ، زکام، پرانی کھانسی و بلغم (Asthma, Flu, Cough & Bronchitis)',
    categoryUrdu: 'سینہ و تنفس',
    categoryKey: 'chest_respiratory',
    descriptionUrdu: 'سانس کی تنگی، الرجی، سینے کی جکڑن، خشک و بلغمی کھانسی اور پھیپھڑوں کی صفائی کا اکسیر نسخہ'
  },
  {
    id: 'tonsils_throat_glands',
    labelUrdu: 'ٹونسلز، ورمِ حلق، گلے کی سوزش، درد و غدود (Tonsillitis, Sore Throat & Pharyngitis)',
    categoryUrdu: 'سینہ و تنفس',
    categoryKey: 'chest_respiratory',
    descriptionUrdu: 'نگلنے میں تکلیف، گلے کے غدود کا بڑھنا، آواز بیٹھنا اور گلے کے انفیکشن کا فوری علاج'
  },

  // 4. جگر و یرقان (کالا و پیلا یرقان)
  {
    id: 'liver_jaundice_hepatitis',
    labelUrdu: 'امراضِ جگر، یرقان (پیلا یرقان) و کالا یرقان ہیپاٹائٹس A, B, C (Liver, Jaundice & Hepatitis)',
    categoryUrdu: 'جگر و ہاضمہ',
    categoryKey: 'liver_digestive',
    descriptionUrdu: 'جگر کی سستی و چربی (Fatty Liver)، خون کی کمی، آنکھوں و پیشاب کا پیلا پن اور ہیپاٹائٹس وائرس کا تریاق'
  },
  {
    id: 'liver_digestive_gerd',
    labelUrdu: 'معدے کی تیزابیت، جلن، السر، تبخیر و بدہضمی (GERD, Stomach Heat & Gastritis)',
    categoryUrdu: 'جگر و ہاضمہ',
    categoryKey: 'liver_digestive',
    descriptionUrdu: 'کھٹے ڈکار، سینے کی جلن، ریاحی اپھارہ، قبض اور معدے کے زخموں کا قدرتی شفا بخش علاج'
  },

  // 5. نفسیاتی، دماغی کمزوری، چڑچڑا پن، وسوسے و وہم
  {
    id: 'brain_psychology_irritability',
    labelUrdu: 'دماغی کمزوری، چڑچڑا پن، بے خوابی، وہم، وسوسے، انزائٹی و ڈپریشن (Mental Weakness & Anxiety)',
    categoryUrdu: 'دماغ و نفسیات',
    categoryKey: 'brain_mental',
    descriptionUrdu: 'یادداشت کی کمزوری، غصہ و چڑچڑاہٹ، دل کی گھبراہٹ، شیطانی وسوسے (OCD) اور نیند نہ آنے کا شافی علاج'
  },

  // 6. آنکھوں کی بیماریاں و کمزوریٔ نظر
  {
    id: 'eye_diseases_vision',
    labelUrdu: 'امراضِ چشم، کمزوریٔ نظر، دھندلا پن، موتیا، آنکھوں کی جلن و سرخی (Eye Diseases & Vision)',
    categoryUrdu: 'آنکھ و کان',
    categoryKey: 'eyes_ears',
    descriptionUrdu: 'نظر کی کمزوری (عینک کا نمبر گھٹانا)، موتیابند کے ابتدائی آثار، آنکھوں سے پانی بہنا اور جلن کا اکسیر علاج'
  },

  // 7. بہرہ پن و کان کے امراض
  {
    id: 'ear_hearing_tinnitus',
    labelUrdu: 'بہرہ پن، کان میں درد، پیپ بہنا اور کانوں میں سائیں سائیں/آوازیں (Hearing Loss & Tinnitus)',
    categoryUrdu: 'آنکھ و کان',
    categoryKey: 'eyes_ears',
    descriptionUrdu: 'کان کے پردے کی سوزش، سماعت کی کمزوری، کان میں ہوا یا گھنٹیاں بجنے کی آوازیں (Tinnitus) کا علاج'
  },

  // 8. کینسر، رسولیاں، سلعہ و گلٹیاں
  {
    id: 'cancer_tumors_cysts',
    labelUrdu: 'کینسر، رسولیاں، سلعہ، جسمانی گلٹیاں و فاسد مواد کا خاتمہ (Cancer Support, Tumors & Cysts)',
    categoryUrdu: 'کینسر و مزمنہ',
    categoryKey: 'cancer_chronic',
    descriptionUrdu: 'جسم کے کسی بھی حصے میں رسولی، گلٹی، سسٹ، کینسر سیلز کی روک تھام اور امیونٹی بڑھانے کا ہولیسٹک علاج'
  },
  {
    id: 'diabetes',
    labelUrdu: 'مرضِ ذیابیطس / شوگر (Diabetes Mellitus Type 1 & 2)',
    categoryUrdu: 'کینسر و مزمنہ',
    categoryKey: 'cancer_chronic',
    descriptionUrdu: 'لبلبے (Pancreas) کی سستی، انسولین کی قدرتی بحالی، خون میں شوگر کا اعتدال اور پاؤں کی جلن کا خاتمہ'
  },
  {
    id: 'kidney_urinary',
    labelUrdu: 'امراضِ گردہ و مثانہ، پتھری، سوزش و جلن (Renal Calculus & Urinary Health)',
    categoryUrdu: 'کینسر و مزمنہ',
    categoryKey: 'cancer_chronic',
    descriptionUrdu: 'گردوں سے ریت و پتھری کا اخراج، پیشاب کی جلن، رکاوٹ اور کریٹینائن کے اعتدال کا علاج'
  },
  {
    id: 'piles_hemorrhoids',
    labelUrdu: 'بواسیر (خونی و بادی)، مسے، جلن و دردِ مقعد (Hemorrhoids / Piles)',
    categoryUrdu: 'کینسر و مزمنہ',
    categoryKey: 'cancer_chronic',
    descriptionUrdu: 'بواسیر کے مسوں کو خشک کرنا، خون بند کرنا، جلن اور پرانی قبض کا جڑ سے خاتمہ'
  },

  // 9. چہرہ، جلد، جھریاں، فائن لائنز، ڈھلکی جلد و ہونٹ
  {
    id: 'face_complexion_wrinkles_aging',
    labelUrdu: 'چہرے کی رنگت، فائن لائنز، جھریاں، ڈھلکی جلد، چھائیاں و اینٹی ایجنگ (Facial Glow, Wrinkles & Melasma)',
    categoryUrdu: 'جلد، چہرہ و ہونٹ',
    categoryKey: 'face_beauty',
    descriptionUrdu: 'چہرے کا کالا پن دور کر کے قدرتی نکھار، ڈھلکی جلد کو ٹائٹ کرنا، چھائیاں، کیل مہاسے اور جھریاں مٹانے کا تریاق'
  },
  {
    id: 'lips_care_pink_slimming',
    labelUrdu: 'کالے ہونٹ، سیاہی دور کرنا، ہونٹ گلابی بنانا، موٹے ہونٹوں کو پتلا و متناسب کرنا (Lip Care & Lightening)',
    categoryUrdu: 'جلد، چہرہ و ہونٹ',
    categoryKey: 'face_beauty',
    descriptionUrdu: 'ہونٹوں کی سیاہی/سگریٹ کے اثرات کا خاتمہ، قدرتی گلابی پن، اور موٹے یا سوجے ہونٹوں کا قدرتی خاکہ متوازن کرنا'
  },

  // 10. امراضِ مردانہ، قوتِ باہ و تولید
  {
    id: 'male_vitality_timing_stamina',
    labelUrdu: 'مردانہ کمزوری، سرعتِ انزال (ٹائمنگ)، انتشار، ضعفِ باہ، عضو کی لمبائی و موٹائی کے لیے دورانِ خون (Male Vitality)',
    categoryUrdu: 'امراضِ مردانہ',
    categoryKey: 'male_health',
    descriptionUrdu: 'اعصابی و پٹھوں کی کمزوری، ٹائمنگ کی کمی، مادہ منویہ کے نقائص اور دورانِ خون کی قدرتی تحریک'
  },

  // 11. امراضِ نسواں و زنانہ پوشیدہ مسائل
  {
    id: 'female_hormonal_pcos_leucorrhoea',
    labelUrdu: 'امراضِ نسواں، لکوریہ، پی سی او ایس، ہارمونز کا بگاڑ، ماہواری کا خلل و بانجھ پن (Female Health & PCOS)',
    categoryUrdu: 'امراضِ نسواں',
    categoryKey: 'female_health',
    descriptionUrdu: 'رحم کی سوزش، رسولیاں، نسوانی کمزوری، چہرے پر غیر ضروری بال اور ہارمونل توازن کی مکمل شفا'
  }
];

export const COMMON_SYMPTOMS: SymptomOption[] = [
  { id: 'headache_heaviness', labelUrdu: 'سر میں شدید بوجھ، کنپٹیوں میں درد یا چکر آنا', category: 'physical', elementBias: 'fire' },
  { id: 'sleep_paralysis_nightmares', labelUrdu: 'ڈراؤنے خواب، نیند میں گرنا، چھاتی پر بوجھ (کابوس/بے خوابی)', category: 'spiritual', elementBias: 'water' },
  { id: 'unexplained_palpitation', labelUrdu: 'بے سبب خوف، دل کی دھڑکن تیز ہونا، اختلاج و گھبراہٹ', category: 'mental', elementBias: 'air' },
  { id: 'body_joint_aches', labelUrdu: 'گھٹنوں، کمر و جوڑوں میں مستقل درد، کڑکڑاہٹ و سستی', category: 'physical', elementBias: 'earth' },
  { id: 'stomach_digestive_heat', labelUrdu: 'معدے میں جلن، تیزابیت، کھٹے ڈکار، قبض یا تبخیرِ معدہ', category: 'physical', elementBias: 'fire' },
  { id: 'chest_cough_asthma_sign', labelUrdu: 'سانس کی تنگی، سینے میں سیٹی کی آواز، گلے میں خراش یا پرانی کھانسی', category: 'physical', elementBias: 'water' },
  { id: 'eye_strain_vision_blur', labelUrdu: 'آنکھوں کے آگے اندھیرا، دھندلا پن، نظر کی کمزوری، سرخی یا جلن', category: 'physical', elementBias: 'fire' },
  { id: 'ear_tinnitus_hearing', labelUrdu: 'کانوں میں سائیں سائیں کی آوازیں، بھاری پن یا سننے میں دقت', category: 'physical', elementBias: 'air' },
  { id: 'liver_jaundice_yellowish', labelUrdu: 'چہرے و آنکھوں کی زردی، منہ کا کڑوا ذائقہ، جگر کی سستی و تھکاوٹ', category: 'physical', elementBias: 'fire' },
  { id: 'facial_pigmentation_wrinkles', labelUrdu: 'چہرے پر چھائیاں، جھریاں، فائن لائنز، ڈھلکی جلد یا ہونٹوں کی سیاہی', category: 'physical', elementBias: 'earth' },
  { id: 'male_weakness_stamina', labelUrdu: 'اعصابی نقاہت، سرعتِ انزال، کمر درد، قوتِ باہ و ٹائمنگ میں کمی', category: 'physical', elementBias: 'fire' },
  { id: 'female_irregular_periods', labelUrdu: 'ماہواری کی بے قاعدگی، لکوریہ، کمر میں درد یا ہارمونز کا خلل', category: 'physical', elementBias: 'water' },
  { id: 'cancer_tumor_swelling', labelUrdu: 'جسم میں کوئی سخت گلٹی، رسولی، ورم یا غدود کا پھول جانا', category: 'physical', elementBias: 'earth' },
  { id: 'excessive_thirst_urination', labelUrdu: 'کثرتِ پیاس، بار بار پیشاب کی حاجت اور منہ کا خشک رہنا (ذیابیطس علامت)', category: 'physical', elementBias: 'fire' },
  { id: 'burning_feet_numbness', labelUrdu: 'پاؤں کے تلووں میں جلن، سوئیاں چبھنا یا اعصابی بے حسی (Neuropathy)', category: 'physical', elementBias: 'earth' },
  { id: 'sudden_domestic_discord', labelUrdu: 'گھر میں بلاوجہ نااتفاقی، کاموں میں مسلسل بندش و چڑچڑاہٹ', category: 'spiritual', elementBias: 'earth' },
  { id: 'frequent_illness_no_lab_results', labelUrdu: 'تمام میڈیکل رپورٹس نارمل ہونے کے باوجود مریض کا مسلسل بیمار رہنا', category: 'spiritual', elementBias: 'water' }
];

export const BURJ_PROPERTIES = [
  { burj: 'حمل (Aries)', element: 'آتشی', planet: 'مریخ', nature: 'گرم و خشک', temperament: 'صفراوی' },
  { burj: 'ثور (Taurus)', element: 'خاکی', planet: 'زہرہ', nature: 'سرد و خشک', temperament: 'سوداوی' },
  { burj: 'جوزا (Gemini)', element: 'بادی', planet: 'عطارد', nature: 'گرم و تر', temperament: 'دموی' },
  { burj: 'سرطان (Cancer)', element: 'آبی', planet: 'قمر', nature: 'سرد و تر', temperament: 'بلغمی' },
  { burj: 'اسد (Leo)', element: 'آتشی', planet: 'شمس', nature: 'گرم و خشک', temperament: 'صفراوی' },
  { burj: 'سنبلہ (Virgo)', element: 'خاکی', planet: 'عطارد', nature: 'سرد و خشک', temperament: 'سوداوی' },
  { burj: 'میزان (Libra)', element: 'بادی', planet: 'زہرہ', nature: 'گرم و تر', temperament: 'دموی' },
  { burj: 'عقرب (Scorpio)', element: 'آبی', planet: 'مریخ', nature: 'سرد و تر', temperament: 'بلغمی' },
  { burj: 'قوس (Sagittarius)', element: 'آتشی', planet: 'مشتری', nature: 'گرم و خشک', temperament: 'صفراوی' },
  { burj: 'جدی (Capricorn)', element: 'خاکی', planet: 'زحل', nature: 'سرد و خشک', temperament: 'سوداوی' },
  { burj: 'دلو (Aquarius)', element: 'بادی', planet: 'زحل', nature: 'گرم و تر', temperament: 'دموی' },
  { burj: 'حوت (Pisces)', element: 'آبی', planet: 'مشتری', nature: 'سرد و تر', temperament: 'بلغمی' },
];

export function diagnosePatientJafrAndTibb(
  patientName: string,
  motherName: string,
  selectedSymptoms: string[] = [],
  gender: 'male' | 'female' = 'male',
  selectedDiseaseId: string = 'diabetes'
): PatientDiagnosisResult {
  const cleanPatient = patientName.trim() || (gender === 'male' ? 'محمد علی' : 'فاطمہ زہرا');
  const cleanMother = motherName.trim() || 'حوا';

  const patientAbjad = calculateAbjad(cleanPatient);
  const motherAbjad = calculateAbjad(cleanMother);

  const totalAdadPatient = patientAbjad.totalKabir;
  const totalAdadMother = motherAbjad.totalKabir;
  const combinedTotalAdad = totalAdadPatient + totalAdadMother;

  // Kash Al-Barni Tarah Methods
  let rem4 = combinedTotalAdad % 4;
  if (rem4 === 0) rem4 = 4;

  let rem7 = combinedTotalAdad % 7;
  if (rem7 === 0) rem7 = 7;

  let rem12 = combinedTotalAdad % 12;
  if (rem12 === 0) rem12 = 12;

  const burjObj = BURJ_PROPERTIES[rem12 - 1] || BURJ_PROPERTIES[0];

  // Count spiritual vs physical flags in selected symptoms
  const selectedObj = COMMON_SYMPTOMS.filter((s) => selectedSymptoms.includes(s.id));
  const spiritualCount = selectedObj.filter((s) => s.category === 'spiritual').length;
  const physicalCount = selectedObj.filter((s) => s.category === 'physical').length;

  // Determine Nature of Illness (روحانی، جسمانی یا مرکب)
  let illnessNature: PatientDiagnosisResult['illnessNature'] = 'mixed_roohani_jismani';
  let illnessNatureUrdu = '';
  let rootCauseUrdu = '';
  let detailedAnalysisUrdu = '';
  let chalType: ChalType = 'atishi';
  let chalNameUrdu = 'آتشی چال';

  // Occult/Sahar Indicators
  let saharTypeUrdu = 'سحرِ معلق و ہوائی (بندشِ دماغ و رزق و اعصاب)';
  let perpetratorProfileUrdu = gender === 'male' ? 'قریبی ملنے جلنے والا حاسد رشتہ دار یا کاروباری حریف' : 'قریبی حاسد عورت یا سسرالی رشتے دار';
  let perpetratorElementUrdu = 'مشرقی یا جنوبی سمت، آتشی و خاکی طبع حاسد';
  let distinctionMethodUrdu = 'جفری کسوٹی: سورۃ الفاتحہ و فلق پڑھنے پر کنپٹیوں میں اینٹھن اور ریڑھ کی ہڈی میں ٹھنڈک سحر کی علامت ہے۔ ادویات کا بے اثر ہونا واضح دلیل ہے۔';
  let saharLocationOrBurialUrdu = 'درخت پر باندھا گیا یا گھر کے راستے / چوکھٹ پر چھڑکا گیا پانی';
  let evilEyeSeverityUrdu = 'درمیانی تا شدید';

  // Duration derivation according to Jafr Tarah
  const onsetCycle = (combinedTotalAdad % 9) + 1;
  const unitChoice = onsetCycle > 5 ? 'سال' : 'ماہ';
  const calculatedDuration = `${onsetCycle} ${unitChoice} قبل سے اس عارضے کے آثار بتدریج نمودار ہونا شروع ہوئے`;

  // Perpetrator classification
  const kinshipRem = combinedTotalAdad % 6;
  if (kinshipRem === 1) {
    perpetratorProfileUrdu = gender === 'male' ? 'قریبی ملنے جلنے والا گندمی رنگت کا شخص جو حسد رکھتا ہے' : 'قریبی خاندان یا رشتہ داری کی گندمی رنگت والی عورت جس کے دل میں حسد ہے';
    perpetratorElementUrdu = 'مشرقی سمت، آتشی مزاج';
  } else if (kinshipRem === 2) {
    perpetratorProfileUrdu = 'کاروباری حریف یا پرانا آشنا جو ترقی اور خوشحالی دیکھ کر بغض رکھتا ہے';
    perpetratorElementUrdu = 'شمالی سمت، بادی مزاج';
  } else if (kinshipRem === 3) {
    perpetratorProfileUrdu = 'سسرالی یا ننھیالی قریبی رشتہ دار، جس کی نیت تفریق یا بندش ڈالنا ہے';
    perpetratorElementUrdu = 'مغربی سمت، آبی مزاج';
  } else if (kinshipRem === 4) {
    perpetratorProfileUrdu = 'ہمسایہ یا قریبی ملنے جلنے والا پرانا دوست جو بظاہر خیرخواہ مگر پسِ پردہ حاسد ہے';
    perpetratorElementUrdu = 'جنوبی سمت، خاکی مزاج';
  } else if (kinshipRem === 5) {
    perpetratorProfileUrdu = 'حسد کی آگ میں جلا ہوا ایسا شخص جس نے کسی سفلی عامل سے عمل کروایا ہے';
    perpetratorElementUrdu = 'جنوب مشرقی سمت';
  } else {
    perpetratorProfileUrdu = 'شدید حاسدین کی ایک سے زائد نگاہیں (چشمِ زخم و عملیاتِ حسد)';
    perpetratorElementUrdu = 'چاروں اطراف سے نظرِ بد کا حصار';
  }

  // Type of Sahar based on remainder 4
  if (rem4 === 1) {
    saharTypeUrdu = 'سحرِ ناری و جلالی (چراغ یا آگ میں جلایا گیا عمل یا تپش والے مقام پر رکھا گیا تعویذ)';
    saharLocationOrBurialUrdu = 'حرارت کے مقام (تنور، چولہے کے قریب) یا آگ کے سامنے تپایا گیا طلسم';
  } else if (rem4 === 2) {
    saharTypeUrdu = 'سحرِ معلق و ہوائی (درخت کی اونچی شاخ یا ہوا کے رخ پر لٹکایا گیا تعویذ)';
    saharLocationOrBurialUrdu = 'پھل دار یا کانٹے دار درخت پر ہوا میں معلق ہے جس کے ہلنے سے مریض پر تپش اور گھبراہٹ طاری ہوتی ہے';
  } else if (rem4 === 3) {
    saharTypeUrdu = 'سحرِ مأکول و مشروب (کھانے یا میٹھی چیز میں ملا کر پلایا گیا یا بہتے پانی میں بہایا گیا)';
    saharLocationOrBurialUrdu = 'مریض کے پیٹ اور آنتوں میں جمی ہوئی سحری رطوبت یا کنویں/ندی میں ڈالا گیا پُتلا';
  } else {
    saharTypeUrdu = 'سحرِ مدفون و ارضی (قبرستان، پرانے کھنڈر یا مکان کی دہلیز میں دفن کیا گیا سحر)';
    saharLocationOrBurialUrdu = 'مکان کے مرکزی دروازے کے نیچے یا پرانی قبر میں دفن شدہ ہڈی/لوح';
  }

  if (rem7 === 1) {
    if (spiritualCount > 1) {
      illnessNature = 'spiritual_nazar';
      illnessNatureUrdu = 'نظرِ بد و چشمِ حاسدین (چشمِ زخم کا اثر)';
      rootCauseUrdu = 'حسد، چشمِ بد اور حاسدین کی نگاہِ فاسدہ کی وجہ سے ہالۂ نور (Aura) میں نقب اور تپش۔';
      detailedAnalysisUrdu = 'کاش البرنی فرماتے ہیں: جب طرح 7 میں باقی 1 بچے تو مرض شمس کے اثر سے ہوتا ہے۔ مریض پر سر کا بوجھ، دل کی وحشت اور سستی چھاتی ہے، یہ علامتِ چشمِ زخم ہے۔';
      distinctionMethodUrdu = 'حتمی فرق: میڈیکل رپورٹس کلیئر ہیں مگر سر پر آگ جیسا بوجھ اور جمائیاں کثرت سے آتی ہیں، جو نظرِ بد کی حتمی دلیل ہے۔';
    } else {
      illnessNature = 'physical_temperament';
      illnessNatureUrdu = 'جسمانی عارضہ: صفراوی تپش و فشارِ خون (غلبۂ حرارت)';
      rootCauseUrdu = 'جسم میں صفرا کی زیادتی، خون میں گرمی اور لبلبہ و اعصاب کی خشکی۔';
      detailedAnalysisUrdu = 'طرحِ شمسی دلالت کرتی ہے کہ جسم میں صفراوی غلبہ ہے۔ جگر و معدہ میں گرمی بڑھ جانے سے طبیعت سست اور چڑچڑاہٹ کا شکار ہے۔';
      distinctionMethodUrdu = 'حتمی فرق: یہ سحر نہیں بلکہ خالص جسمانی صفراوی مرض ہے۔ ٹھنڈی غذا و شربتِ صندل و کاسنی سے افاقہ ہو جاتا ہے۔';
    }
    chalType = 'atishi';
    chalNameUrdu = 'آتشی چال';
  } else if (rem7 === 2) {
    if (spiritualCount >= 1) {
      illnessNature = 'spiritual_jinn_asarat';
      illnessNatureUrdu = 'آسیبی اثرات و نظرِ جنات (خللِ قمری)';
      rootCauseUrdu = 'پانی یا ندی کنارے، ویران جگہ یا ایامِ محاق میں آسیب کی ہوائی لہر لگنے کا خلل۔';
      detailedAnalysisUrdu = 'قوانینِ طلسم کے مطابق قمر کے تحت باقی بچنے والے اعداد آبی و بلغمی خلل اور سفلی لہروں کی طرف اشارہ کرتے ہیں، بالخصوص خوابوں میں پانی یا اونچائی سے گرنا۔';
      distinctionMethodUrdu = 'حتمی فرق: رات کو خواب میں گندے پانی، سانپ یا اونچائی سے گرنا دکھائی دیتا ہے، جو آسیبی لہر کی یقینی علامت ہے۔';
    } else {
      illnessNature = 'physical_temperament';
      illnessNatureUrdu = 'جسمانی عارضہ: بلغمی غلبہ، رطوبت و سردی (سرد و تر)';
      rootCauseUrdu = 'معدے اور اعصاب میں رطوباتِ فاسدہ کا اجتماع، قوتِ مدافعت میں کمی اور لبلبے کا سست پڑ جانا۔';
      detailedAnalysisUrdu = 'مریض کے مزاج میں رطوبت اور بلغم حد سے زیادہ ہے۔ طبیعت میں جمود، سستی اور ہاضمہ کند ہے۔';
      distinctionMethodUrdu = 'حتمی فرق: جسمانی بلغم اور سردی کا غلبہ ہے۔ گرم جوشاندہ اور ورزش سے طبیعت بحال ہوتی ہے۔';
    }
    chalType = 'aabi';
    chalNameUrdu = 'آبی چال';
  } else if (rem7 === 3) {
    illnessNature = spiritualCount > 0 ? 'spiritual_sahar' : 'physical_temperament';
    illnessNatureUrdu = spiritualCount > 0 ? 'سحرِ آتشی و ارضی (بندش و جلالی سحر)' : 'جسمانی سوزش و صفراوی بخار';
    rootCauseUrdu = spiritualCount > 0
      ? 'کسی دشمن یا بدخواہ کی جانب سے جلالی سحر یا حسد کی بنا پر صحت و کار و بار کی بندش۔'
      : 'خون میں حدت، عضلاتی کھچاؤ اور جلدی جلن یا سوزشِ جگر۔';
    detailedAnalysisUrdu = 'مریخ کے اعداد جلال اور شدت کو ظاہر کرتے ہیں۔ مریض کو پیاس کی شدت، طبیعت میں بے چینی اور غصہ یا اچانک درد کے دورے محسوس ہوتے ہیں۔';
    distinctionMethodUrdu = spiritualCount > 0
      ? 'حتمی فرق: اذان سنتے وقت طبیعت میں بے چینی، نماز میں وسوسے اور جسم میں سوئیاں چبھنا سحرِ قوی کی قطعی دلیل ہے۔'
      : 'حتمی فرق: جگر و خون کی سوزش ہے۔ عرقِ مکو و کاسنی سے جسم کی گرمی دور ہو جائے گی۔';
    chalType = 'atishi';
    chalNameUrdu = 'آتشی چال';
  } else if (rem7 === 4) {
    illnessNature = 'mixed_roohani_jismani';
    illnessNatureUrdu = 'مرکب عارضہ: بادی خلل، وہم و اختلاجِ قلب (اعصابی و روحانی)';
    rootCauseUrdu = 'دماغی اعصاب پر گیسوں (تبخیر) کا دباؤ مع نظرِ بد، جس سے وسوسے اور بے چینی جنم لیتی ہے۔';
    detailedAnalysisUrdu = 'عطارد کا تعلق اعصاب اور عقل سے ہے۔ بادی تحریک کی وجہ سے مریض کو مسلسل وسوسے، بے خوابی اور معدے میں ریاحی گیس کا غلبہ رہتا ہے۔';
    distinctionMethodUrdu = 'حتمی فرق: مرض ۵۰٪ تبخیرِ معدہ (گیس) اور ۵۰٪ حاسدانہ اثرات کا مرکب ہے۔ اسطخودوس اور تلاوتِ معوذتین دونوں ضروری ہیں۔';
    chalType = 'badi';
    chalNameUrdu = 'بادی چال';
  } else if (rem7 === 5) {
    illnessNature = 'physical_temperament';
    illnessNatureUrdu = 'جسمانی عارضہ: دموی غلبہ، فشارِ دم و ضعفِ ہضم';
    rootCauseUrdu = 'جگر کی سستی، خون کا دباؤ یا ضرورت سے زیادہ غذائی بد پرہیزی۔';
    detailedAnalysisUrdu = 'مشتری کا سعد اثر بتاتا ہے کہ کوئی خطرناک جادو نہیں بلکہ جسمانی طور پر جگر و ہضم کے اعتدال کی ضرورت ہے جو دوا و غذا سے فورا ٹھیک ہو جائے گا۔';
    distinctionMethodUrdu = 'حتمی فرق: کسی قسم کا کوئی سحر یا جادو نہیں ہے۔ فقط دورانِ خون اور جگر کی اصلاح کی ضرورت ہے۔';
    chalType = 'badi';
    chalNameUrdu = 'بادی چال';
  } else if (rem7 === 6) {
    illnessNature = spiritualCount > 0 ? 'spiritual_nazar' : 'physical_temperament';
    illnessNatureUrdu = spiritualCount > 0 ? 'نظرِ حسد برائے خوبصورتی و صحت' : 'گردہ، مثانہ و رطوبتی ضعف';
    rootCauseUrdu = 'مریض کی جاذبیت، رزق یا خوشحالی پر قریبی لوگوں کی حاسدانہ نگاہ یا جسمانی طور پر گردوں کی گرمی۔';
    detailedAnalysisUrdu = 'زہرہ کے سعد عدد میں اگر بیماری ظاہر ہو تو وہ زیادہ تر حسد یا رطوبتی اعضا (گردے و مثانہ) کی سستی سے ہوتی ہے۔';
    distinctionMethodUrdu = 'حتمی فرق: بندش و سحر نہیں ہے بلکہ حسن، مال یا کامیابی پر سخت نظرِ بد لگی ہے۔ نمک یا لیموں کا صدقہ شفا دے گا۔';
    chalType = 'aabi';
    chalNameUrdu = 'آبی چال';
  } else {
    illnessNature = 'spiritual_sahar';
    illnessNatureUrdu = 'سحرِ سفلِ قدیم و سوداوی جمود (سخت بندش و امراضِ مزمنہ)';
    rootCauseUrdu = 'سوداوی خشکی، خوف، پرانی بندش اور اعصاب پر منفی توانائیوں کا تسلط۔';
    detailedAnalysisUrdu = 'کاش البرنی (رموز الجفر): جب باقی 7 بچے تو یہ زحل کی نحوست یا پرانے سوداوی عارضے کی دلیل ہے۔ مریض تنہائی پسند ہوتا ہے، جسم ٹوٹتا ہے اور ادویات اثر نہیں کرتیں۔ فوری روحانی حصار اور سودا کا اخراج لازم ہے۔';
    distinctionMethodUrdu = 'حتمی فرق: یہ پرانا سحرِ سفلی اور بندش ہے جس نے جسم کے اندر سوداوی مادے کو جما دیا ہے۔ دوائیں وقتی اثر دیتی ہیں مگر مستقل شفا آیاتِ ابطالِ سحر اور نقشِ شفا سے ہی ممکن ہے۔';
    chalType = 'khaaki';
    chalNameUrdu = 'خاکی چال';
  }

  // Temperament Breakdown Profile
  let mizajUrdu = burjObj.temperament + ' (' + burjObj.nature + ')';
  let khiltGhalibUrdu = burjObj.temperament === 'صفراوی' ? 'خلطِ صفرا (گرمی و خشکی)' : burjObj.temperament === 'بلغمی' ? 'خلطِ بلغم (سردی و تری)' : burjObj.temperament === 'دموی' ? 'خلطِ دم (گرمی و تری)' : 'خلطِ سودا (سردی و خشکی)';
  let affectedOrgansUrdu = burjObj.temperament === 'صفراوی' ? 'جگر، لبلبہ، پتے اور عضلات' : burjObj.temperament === 'بلغمی' ? 'پھیپھڑے، معدہ، اعصاب اور دماغ' : burjObj.temperament === 'دموی' ? 'دل، شریانیں، اور دماغی عروق' : 'تلی (Spleen)، بڑی آنت اور ہڈیاں';
  let safePrinciplesUrdu = 'قانونِ مفرد اعضاء و طبِ یونانی کا سنہری اصول: "العلاج بالضد" یعنی خلطی مزاج کی مخالف کیفیت والی معتدل، قدرتی جڑی بوٹیوں سے علاج جو اعضاء پر کوئی بوجھ ڈالے بغیر اصل سبب کو جڑ سے ختم کریں۔';

  // Spiritual Prescription Base
  let wazifaUrdu = 'یا شافی یا کافی یا سلام یا معافی';
  let wazifaCount = 111;
  let tilaawatUrdu = 'سورۃ الفاتحہ 7 بار، آیۃ الکرسی 7 بار، اور چاروں قل 7، 7 بار صبح و شام پڑھ کر پانی پر دم کر کے پلائیں۔';
  let incenseUrdu = 'لوبانِ نر اور ہرمل (اسپند)';
  let sadqahUrdu = 'گوشت یا سرخ ماش کی دال بحسابِ اعدادِ اسم مریض';
  let favorableHourUrdu = 'ساعتِ شمس یا ساعتِ مشتری بوقتِ اشراق';
  let bestDaysUrdu = 'جمعرات یا اتوار';

  if (illnessNature === 'spiritual_sahar') {
    wazifaUrdu = 'یا قہار یا جبار یا مذل یا مانع (مع آیتِ سحر: فَلَمَّا أَلْقَوْا قَالَ مُوسَىٰ مَا جِئْتُم بِهِ السِّحْرُ ۖ إِنَّ اللَّهَ سَيُبْطِلُهُ)';
    wazifaCount = 313;
    tilaawatUrdu = 'سورۃ البقرہ کی آخری دو آیات 11 بار، سورۃ یونس (آیات 81-82) 41 بار، اور سورۃ الفلق و الناس 21 بار۔';
    incenseUrdu = 'حرمل (اسپند)، کلونجی، گندھک اور لوبان';
    sadqahUrdu = 'سیاہ مرغ یا بکری کا کلیجہ مع صدقۂ نقدی بروز منگل/ہفتہ بوقتِ غروب';
    favorableHourUrdu = 'ساعتِ مریخ یا ساعتِ زحل (برائے ابطالِ سحر)';
    bestDaysUrdu = 'منگل یا ہفتہ';
  } else if (illnessNature === 'spiritual_nazar') {
    wazifaUrdu = 'یا حفیظ یا سلام یا لطیف یا واسع';
    wazifaCount = 1000;
    tilaawatUrdu = 'سورۃ القلم کی آخری دو آیات (وَإِن يَكَادُ الَّذِينَ كَفَرُوا...) 11 بار، اور سورۃ الفلق و الناس۔';
    incenseUrdu = 'صندل سفید، کافور اور عود';
    sadqahUrdu = '7 عدد سبز لیموں اور انڈے مسکین کو دینا';
    favorableHourUrdu = 'ساعتِ زہرہ یا شمس';
    bestDaysUrdu = 'جمعہ یا اتوار';
  } else if (illnessNature === 'spiritual_jinn_asarat') {
    wazifaUrdu = 'یا علی یا عظیم یا عزیز یا منیع (مع اذانِ پنجگانہ 7 بار)';
    wazifaCount = 41;
    tilaawatUrdu = 'آیت الکرسی 70 بار اور سورۃ الصافات (ابتدائی 10 آیات) 21 بار روزانہ مغرب کے بعد۔';
    incenseUrdu = 'اسپند (حرمل) اور رائی کے دانے';
    sadqahUrdu = 'میٹھی روٹی یا نان پر تیل لگا کر پرندوں کو ڈالنا';
    favorableHourUrdu = 'ساعتِ قمر بعد از نمازِ فجر';
    bestDaysUrdu = 'پیر شریف';
  }

  // Physical & Herbal Prescription Base
  let herbalFormulaNameUrdu = 'معجونِ اعتدال و جوشاندۂ شفاء';
  let herbsListUrdu: { name: string; quantity: string; benefits: string }[] = [];
  let preparationMethodUrdu = '';
  let dietaryPrecautionsUrdu: string[] = [];
  let tibbNotes = '';

  if (rem4 === 1 || chalType === 'atishi') {
    herbalFormulaNameUrdu = 'شربتِ صندل و بنفشہ مع جوشاندۂ تخمِ کاسنی (برائے تپش و صفرا)';
    herbsListUrdu = [
      { name: 'تخمِ کاسنی (Cichorium intybus)', quantity: '5 گرام', benefits: 'جگر کی گرمی اور صفراوی تپش کو زائل کرتا ہے' },
      { name: 'گلِ نیلوفر (Nymphaea alba)', quantity: '3 گرام', benefits: 'دل و دماغ کو فرحت اور ٹھنڈک بخشتا ہے' },
      { name: 'گلِ بنفشہ (Viola odorata)', quantity: '5 گرام', benefits: 'اعصابی تناؤ اور سر درد میں فوری سکون دیتا ہے' },
      { name: 'عناب (Jujube)', quantity: '7 دانے', benefits: 'خون کی صفائی اور سوزش کا قدرتی تریاق' },
      { name: 'عرقِ گلاب اصلی (Rose Water)', quantity: '2 چمچ', benefits: 'طبیعت کو مقوی اور معدے کی جلن ختم کرتا ہے' },
    ];
    preparationMethodUrdu = 'تمام جڑی بوٹیاں رات کو 1 گلاس پانی میں بھگو دیں، صبح ہلکا جوش دے کر چھان لیں اور ایک چمچ خالص شہد یا شربتِ صندل ملا کر نہار منہ نوش فرمائیں۔';
    dietaryPrecautionsUrdu = [
      'سرخ مرچ، تیز مصالحہ جات اور تلی ہوئی اشیاء سے مکمل پرہیز کریں۔',
      'کھیرے، تربوز، لسی اور کدو کا زیادہ استعمال کریں۔',
      'دھوپ اور شدید گرمی سے بچیں اور ٹھنڈے پانی سے وضو کریں۔',
    ];
    tibbNotes = 'مریض کا مزاج صفراوی ہے۔ قانونِ طب یونانی کے مطابق "العلاج بالضد" یعنی گرمی کا علاج سرد و تر جڑی بوٹیوں سے کیا جائے گا۔';
  } else if (rem4 === 2 || chalType === 'badi') {
    herbalFormulaNameUrdu = 'سفوفِ بادی و جوشاندۂ بادیان مع اسطخودوس (برائے اعصاب و ریاح)';
    herbsListUrdu = [
      { name: 'اسطخودوس (Lavandula stoechas)', quantity: '5 گرام', benefits: 'دماغ کا جھاڑو، وہم، وسوسے اور دردِ سر کا خاتمہ' },
      { name: 'سونف / بادیان (Fennel Seeds)', quantity: '5 گرام', benefits: 'تبخیرِ معدہ، گیس اور ریاحی درد دور کرتا ہے' },
      { name: 'چھوٹی الائچی (Green Cardamom)', quantity: '3 دانے', benefits: 'دل کو طاقت بخشتی ہے اور متلی روکتی ہے' },
      { name: 'زنجبیل / ادرک خشک (Ginger)', quantity: '2 گرام', benefits: 'ہاضمہ درست کر کے بادی کا اثر زائل کرتی ہے' },
      { name: 'پودینہ خشک (Dry Mint)', quantity: '3 گرام', benefits: 'آنتوں کو سکون اور ریاحی اپھارہ ختم کرتا ہے' },
    ];
    preparationMethodUrdu = 'تمام اجزاء کو 2 کپ پانی میں پکا کر ایک کپ قہوہ تیار کریں۔ بعد از غذا صبح و شام پئیں۔';
    dietaryPrecautionsUrdu = [
      'گوبھی، چاول، دال ماش اور کولڈ ڈرنکس سے سخت پرہیز کریں۔',
      'گرم دودھ میں دارچینی ڈال کر پیئیں اور چہل قدمی معمول بنائیں۔',
    ];
    tibbNotes = 'مریض پر بادی و اعصابی غلبہ ہے۔ اسطخودوس اور سونف کا قہوہ دماغی اعصاب اور معدے کے ریاح کو مکمل شفا بخشتا ہے۔';
  } else if (rem4 === 3 || chalType === 'aabi') {
    herbalFormulaNameUrdu = 'جوشاندۂ ملٹھی مع دارچینی و لونگ (برائے بلغمی سردی و قوتِ مدافعت)';
    herbsListUrdu = [
      { name: 'اصل السوس / ملٹھی (Licorice Root)', quantity: '4 گرام', benefits: 'سینے اور معدے سے بلغم کو خارج کرتی ہے' },
      { name: 'دارچینی (Cinnamon)', quantity: '2 گرام', benefits: 'جسم کے دورانِ خون اور حرارتِ غریزی کو بیدار کرتی ہے' },
      { name: 'لونگ (Cloves)', quantity: '3 عدد', benefits: 'معدے اور اعصاب کو طاقت اور ٹھنڈک سے نجات دیتی ہے' },
      { name: 'زعفران اصلی (Saffron)', quantity: '1 چٹکی', benefits: 'روحانی قوت اور دل کی کمزوری کا عظیم ٹانک' },
      { name: 'شہد خالص (Pure Honey)', quantity: '1 چمچ', benefits: 'تمام امراضِ باردہ کے لیے قدرتی شفا' },
    ];
    preparationMethodUrdu = 'ملٹھی اور دارچینی کا قہوہ تیار کر کے نیم گرم حالت میں شہد اور زعفران ملا کر روزانہ رات کو سونے سے قبل استعمال کریں۔';
    dietaryPrecautionsUrdu = [
      'ٹھنڈے مشروبات، آئس کریم، چکنائی اور دہی سے رات کے وقت پرہیز کریں۔',
      'گرم پانی کا استعمال کریں اور زیتون کے تیل سے جسم کی مالش کریں۔',
    ];
    tibbNotes = 'مریض کا مزاج بلغمی سرد ہے۔ حرارت پیدا کرنے والی ادویہ سے بلغم پگھل کر جسم ہلکا اور توانا ہو جائے گا۔';
  } else {
    herbalFormulaNameUrdu = 'اطریفلِ شاہترہ مع جوشاندۂ افتیمون (برائے اخراجِ سودا و فاسد مواد)';
    herbsListUrdu = [
      { name: 'افتیمون ولایتی (Cuscuta epithymum)', quantity: '4 گرام', benefits: 'دماغ اور خون سے سوداوی زہریلے مادے خارج کرتا ہے' },
      { name: 'شاہترہ (Fumaria parviflora)', quantity: '5 گرام', benefits: 'خون صاف کر کے الرجی اور خشکی ختم کرتا ہے' },
      { name: 'سناء مکی (Senna Leaves)', quantity: '2 گرام', benefits: 'آنتوں سے فاسد مواد کا مکمل اخراج' },
      { name: 'گلِ سرخ (Dried Rose Petals)', quantity: '4 گرام', benefits: 'معدے کی اصلاح اور قبض کشا' },
      { name: 'مغزِ بادام (Almonds)', quantity: '5 عدد', benefits: 'دماغ کو تر اور خشکی کو زائل کرتے ہیں' },
    ];
    preparationMethodUrdu = 'افتیمون اور شاہترہ کو جوش دے کر قہوہ بنائیں اور روزانہ رات کو 5 گرام اطریفلِ شاہترہ کے ساتھ لیں۔';
    dietaryPrecautionsUrdu = [
      'بینگن، بڑا گوشت (بیف)، کھٹی چیزیں اور باسی کھانے سے مکمل پرہیز رکھیں۔',
      'بادام کا روغن نیم گرم دودھ میں ملا کر پیئیں اور سر پر روغنِ کدو لگائیں۔',
    ];
    tibbNotes = 'سوداوی خشکی کے مریض کے لیے افتیمون اور شاہترہ اکسیر کا درجہ رکھتے ہیں، جو پرانے سودا اور فاسد بخارات کو جڑ سے نکال دیتے ہیں۔';
  }

  // Base Homeopathy
  let homeopathicCure = {
    formulaTitleUrdu: 'ہومیوپیتھک متوازن مرکب (بحسابِ مزاج و علامات)',
    remedies: [
      { name: 'Nux Vomica', potency: '30C', dosage: '5 قطرے رات کو سوتے وقت 1 گھونٹ پانی میں', indicationUrdu: 'معدے کی خرابی، تیزابیت، سستی، غصہ اور ادویات کے سائیڈ ایفیکٹس ختم کرنے کے لیے' },
      { name: 'Arsenicum Album', potency: '30C', dosage: '5 قطرے صبح نہار منہ', indicationUrdu: 'بے چینی، نقاہت، خوف، وسوسے اور جسمانی سوزش کا قدرتی ہومیوپیتھک تریاق' },
      { name: 'Ignatia Amara', potency: '200C', dosage: 'ہفتے میں ایک بار 5 قطرے', indicationUrdu: 'صدمہ، نظرِ بد کے بعد کا کھچاؤ، دل کی گھبراہٹ اور گلے میں گولہ سا اٹکنا' },
      { name: 'Calcarea Phosphorica', potency: '6X (Biochemic)', dosage: '4 گولیاں دن میں 3 بار چوس کر', indicationUrdu: 'اعصاب اور ہڈیوں کی عمومی کمزوری، توانائی کی بحالی اور جذبِ خوراک کی بہتری' }
    ],
    generalInstructionsUrdu: 'ہومیوپیتھک ادویات کو ہمیشہ صاف منہ میں ڈالیں، کچے پیاز، لہسن اور تیز خوشبوؤں سے 15 منٹ کا وقفہ رکھیں، اور شیشے کے ڈراپر کی مدد سے نیم گرم پانی میں لیں۔'
  };

  // Base Allopathic
  let allopathicGuidelines = {
    clinicalOverviewUrdu: 'ایلوپیتھک میڈیکل سائنس کے مطابق مریض کی بنیادی علامات کا تعلق اینڈوکرائن، اعصابی نظام یا ہاضمے کے ہارمونل توازن سے ہو سکتا ہے۔',
    recommendedLabTests: [
      'سی بی سی (Complete Blood Count - CBC)',
      'سیرم الیکٹرولائٹس و رینل فنکشن ٹیسٹ (RFTs / Serum Creatinine)',
      'لیور فنکشن ٹیسٹ (LFTs / SGPT, Alk Phosphatase)',
      'فاسٹنگ بلڈ شوگر و HbA1c (گلوکوز میٹابولزم کا 3 ماہی جائزہ)',
      'تھائرائیڈ پروفائل (TSH, Free T4)'
    ],
    standardMedicalCareUrdu: 'اگر علامات شدید یا ایمرجنسی نوعیت کی ہوں تو فوری طور پر قریبی مستند معالج سے رجوع کریں۔ ایلوپیتھک ادویات اگر پہلے سے چل رہی ہوں تو انہیں معالج کے مشورے کے بغیر یکدم بند نہ کریں۔',
    safetyPrecautionsUrdu: 'بلڈ پریشر اور شوگر کی ریگولر مانیٹرنگ، پانی کا وافر استعمال (کم از کم 8 سے 10 گلاس)، اور روزانہ 30 منٹ ہلکی چہل قدمی۔'
  };

  // -------------------------------------------------------------
  // Comprehensive Protocols for All 13+ Disease Categories
  // -------------------------------------------------------------
  let diseaseSpecificProtocol: PatientDiagnosisResult['diseaseSpecificProtocol'] | undefined = undefined;

  const foundDisease = CHRONIC_DISEASES.find(d => d.id === selectedDiseaseId) || CHRONIC_DISEASES[0];
  const diseaseTitleUrdu = foundDisease.labelUrdu;

  if (selectedDiseaseId === 'heart_cardiovascular') {
    diseaseSpecificProtocol = {
      diseaseTitleUrdu: 'امراضِ قلب، اختلاج، انجائنا، شریانوں کی تنگی و کمزوریٔ قلب کا مکمل پروٹوکول (Cardiovascular & Heart Protocol)',
      rohaniAmalUrdu: 'سورۃ الرعد آیت 28: «الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ» 101 بار روزانہ دل پر سیدھا ہاتھ رکھ کر پڑھیں۔ ساتھ میں اسمِ الٰہی «يَا قَوِيُّ يَا حَيُّ يَا قَيُّومُ» 111 بار صبح و شام ورد کریں۔',
      tibbNabawiUrdu: 'فرمانِ نبوی ﷺ: "عجوہ کھجور دل کے امراض کے لیے شفا ہے۔" روزانہ صبح نہار منہ 7 عدد عجوہ کھجوریں گٹھلی سمیت پیس کر دودھ کے ساتھ لیں (تلبینہ کا استعمال دل کے غم اور کمزوری کو زائل کرتا ہے)۔',
      herbalSafeFormulaUrdu: '100% محفوظ اکسیرِ قلب نسخہ: پوست ہلیلہ سیاہ 50 گرام + ارجن کی چھال (Terminalia arjuna) 50 گرام + گاؤزبان 30 گرام + کشنیز خشک (دھنیا) 30 گرام + زعفران 3 گرام + چھوٹی الائچی 20 گرام۔ باریک پیس کر سفوف بنائیں۔ 3 گرام صبح و شام عرقِ گلاب یا نیم گرم پانی کے ساتھ لیں۔ یہ شریانوں کے پلاک (Plaque) کو صاف کرتا ہے اور دل کے پٹھوں کو نئی قوت دیتا ہے۔',
      dietaryDosUrdu: [
        'خالص انار کا تازہ رس (شریانوں کی قدرتی لچک بڑھاتا ہے)۔',
        'لہسن کا ایک جوہ صبح نہار منہ نگلنا۔',
        'زیتون کا خالص تیل کھانوں میں استعمال کریں۔',
        'سیب اور بہی (Quince) کا مربہ دل کو طاقت دیتا ہے۔'
      ],
      dietaryDontsUrdu: [
        'گھی، ڈالڈا، تلی ہوئی بازاری اشیاء اور بیکری پراڈکٹس۔',
        'نمک کی زیادتی، تیز چائے اور سگریٹ نوشی سے مکمل پرہیز۔',
        'شدید غصہ، رات دیر تک جاگنا اور بھاری کھانا کھا کر فوری سونا۔'
      ],
      homeopathicSpecificUrdu: '1. Crataegus Oxyacantha Q (مدر ٹنکچر) - 10 قطرے آدھے کپ پانی میں دن میں 3 بار (دل کا قدرتی ٹانک، شریانیں کشادہ کرتا ہے)۔ 2. Cactus Grandiflorus 30 - اگر سینے پر لوہے کے شکنجے جیسا دباؤ ہو۔ 3. Digitalis 30 - دل کی سست دھڑکن یا اکھڑتی سانس کے لیے۔ 4. Kali Phos 6X - اعصابی کمزوری اور دل کی گھبراہٹ کا تریاق۔',
      scientificMechanismUrdu: 'ارجن کی چھال میں موجود Coenzyme Q10 نما اجزاء اور Flavonoids کورونری شریانوں کے اندر خون کی روانی کو 40 فیصد تیز کرتے ہیں اور اینڈوتھیلیم (Endothelium) کی سوزش ختم کرتے ہیں۔'
    };
  } else if (selectedDiseaseId === 'knee_arthritis_gout') {
    diseaseSpecificProtocol = {
      diseaseTitleUrdu: 'دردِ زانو (گھٹنے کا درد)، یورک ایسڈ، عرق النساء و مہروں کی سوزش (Knee Arthritis & Joint Pain)',
      rohaniAmalUrdu: 'سورۃ الفاتحہ 7 بار اور سورۃ القریش 21 بار زیتون کے تیل پر دم کر کے روزانہ صبح و شام گھٹنوں اور جوڑوں پر نیچے سے اوپر کی جانب مساج کریں۔ اسمِ اعظم «يَا قَوِيُّ يَا مَتِينُ يَا شَافِي» 313 بار روزانہ ورد کریں۔',
      tibbNabawiUrdu: 'سنتِ نبوی ﷺ: روغنِ زیتون اور روغنِ کلونجی ہموزن ملا کر نیم گرم مالش کرنا اور نہار منہ 3 عدد انجیر کھانا جوڑوں کے درد اور یورک ایسڈ کو جسم سے نکال باہر کرتا ہے۔',
      herbalSafeFormulaUrdu: 'شاہی تریاقِ مفاصل: سرنجانِ شیریں 50 گرام + اسگندھ ناگوری (Withania somnifera) 50 گرام + گوند کیکر 30 گرام + سونٹھ (خشک ادرک) 30 گرام + ہلدی خالص 30 گرام + میتھی دانہ 25 گرام۔ سفوف بنائیں۔ آدھا چمچ صبح و شام نیم گرم دودھ کے ساتھ لیں۔ یہ گھٹنوں کی لیسدار رطوبت (Synovial Fluid) کو دوبارہ پیدا کرتا ہے اور کارٹلیج کی رگڑ روکتا ہے۔',
      dietaryDosUrdu: [
        'ہلدی اور دارچینی ملا نیم گرم دودھ رات کو سوتے وقت۔',
        'اخروٹ، تل سفید، اور زیتون کا باقاعدہ استعمال۔',
        'دھوپ میں صبح 20 منٹ بیٹھنا (وٹامن ڈی 3 کی قدرتی پیداوار)۔',
        'پانی کم از کم 10 سے 12 گلاس روزانہ پینا۔'
      ],
      dietaryDontsUrdu: [
        'بڑا گوشت (بیف)، دال ماش، چاول، ٹھنڈا پانی اور کھٹی لسی۔',
        'پالک، ٹماٹر اور چکنائی والی غذائیں (یورک ایسڈ بڑھانے والی اشیاء)۔',
        'سرد ہوا کے سامنے براہِ راست گھٹنوں کو ننگا رکھنا۔'
      ],
      homeopathicSpecificUrdu: '1. Rhus Tox 200 - صبح اٹھنے پر جوڑوں کا کھچاؤ جو حرکت کے بعد بہتر ہو۔ 2. Bryonia Alba 30 - حرکت کرنے سے گھٹنے میں شدید چبھن والا درد ہو۔ 3. Colchicum Autumnale Q - یورک ایسڈ اور پاؤں کے انگوٹھے و گھٹنے کی سوجن۔ 4. Calcarea Fluorica 6X - جوڑوں کی ہڈیوں کی کڑکڑاہٹ اور سختی کے لیے 4 گولیاں دن میں 3 بار۔',
      scientificMechanismUrdu: 'سرنجان میں موجود قدرتی Colchicine مرکبات جسم میں Leukocyte Migration اور سوزش پیدا کرنے والے Cytokines کو بلاک کرتے ہیں جس سے جوڑوں کا ورم گھنٹوں میں کم ہوتا ہے۔'
    };
  } else if (selectedDiseaseId === 'chest_asthma_cough_flu') {
    diseaseSpecificProtocol = {
      diseaseTitleUrdu: 'امراضِ سینہ، دمہ، نزلہ، زکام، الرجی، پرانی کھانسی و بلغم (Asthma, Cough & Bronchitis Protocol)',
      rohaniAmalUrdu: 'سورۃ الانشراح (أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ) 41 بار روزانہ پانی پر دم کر کے پیئیں اور سینے پر ہاتھ رکھ کر پھونکیں۔ اسمِ الٰہی «يَا بَاسِطُ يَا شَافِي يَا مُعَافِي» 111 بار صبح و شام۔',
      tibbNabawiUrdu: 'قسطِ بحری (Costus) اور کلونجی کا قسط کا سفوف شہد میں ملا کر چاٹنا اور کلونجی کے تیل کے 2 قطرے ناک میں ڈالنا اور بھاپ لینا دمہ اور پرانے نزلے کو جڑ سے اکھاڑتا ہے (صحیح بخاری)۔',
      herbalSafeFormulaUrdu: 'اکسیرِ دمہ و ضیق النفس: اصل السوس (ملٹھی) 40 گرام + گلِ بنفشہ 30 گرام + لسوڑیاں 30 گرام + عناب 30 گرام + سوم کلپ (Ephedra gerardiana) 20 گرام + کشتہ عقیق 5 گرام۔ تمام جڑی بوٹیوں کو موٹا کوٹ کر جوشاندہ بنائیں۔ ایک چمچ کو ڈیڑھ کپ پانی میں پکا کر ایک کپ رہ جانے پر 1 چمچ شہد ملا کر صبح و شام گرما گرم نوش فرمائیں۔ سانس کی نالیاں فوراً کھل جاتی ہیں۔',
      dietaryDosUrdu: [
        'نیم گرم پانی، ادرک و دارچینی کا قہوہ مع شہد۔',
        'مغز بادام 7 عدد مع 3 عدد کالی مرچ نہار منہ۔',
        'بکرے کے گوشت کا پتلا شوربہ مع کالی مرچ و دیسی گھی۔',
        'روزانہ سینے پر تل کے تیل یا کلونجی کے تیل کی نیم گرم مالش۔'
      ],
      dietaryDontsUrdu: [
        'ٹھنڈا پانی، آئس کریم، کولڈ ڈرنکس، دہی اور چاول۔',
        'گرد و غبار، تیز پرفیوم، دھوئیں اور نمی والی جگہوں سے بچاؤ۔',
        'چکنائی اور گھی میں تلی ہوئی مرغن غذائیں۔'
      ],
      homeopathicSpecificUrdu: '1. Arsenicum Album 30 - رات کو 12 سے 2 بجے کے درمیان دم گھٹنا اور بے چینی۔ 2. Ipecac 30 - سینے میں بلغم کی کھرکھراہٹ اور کھانسی کے ساتھ قے کا احساس۔ 3. Blatta Orientalis Q - دمہ اور الرجی کا سب سے موثر مدر ٹنکچر (10 قطرے دن میں 3 بار)۔ 4. Antim Tart 30 - بوڑھوں اور کمزوروں کے سینے سے بلغم نہ نکلنے کا تریاق۔',
      scientificMechanismUrdu: 'ملٹھی میں موجود Glycyrrhizin برونکائی کے ریسیپٹرز کو ریلیکس کرتا ہے اور ماسٹ سیلز (Mast Cells) سے ہسٹامائن کے اخراج کو روک کر الرجی اور اینٹھن کو ختم کرتا ہے۔'
    };
  } else if (selectedDiseaseId === 'tonsils_throat_glands') {
    diseaseSpecificProtocol = {
      diseaseTitleUrdu: 'ٹونسلز، ورمِ حلق، گلے کی سوزش، درد و غدود (Tonsillitis & Glandular Swelling)',
      rohaniAmalUrdu: 'سورۃ الکوثر 41 بار نیم گرم نمک والے پانی پر دم کر کے صبح و شام غرارے کریں۔ اسمِ الٰہی «يَا قُدُّوسُ يَا سَلَامُ يَا شَافِي» 100 بار ورد کریں۔',
      tibbNabawiUrdu: 'فرمانِ نبوی ﷺ: "اپنی اولاد کے گلے کی سوزش (عذرہ) کا علاج قسطِ ہندی کی دھونی یا نسوار کے ذریعے کرو، گلے کو انگلی سے دبانے کی اذیت نہ دو" (صحیح بخاری)۔',
      herbalSafeFormulaUrdu: 'سفوفِ اکابر برائے حلق: شہتوت کا شربت اصلی (2 چمچ) + خولنجان (پان کی جڑ) 20 گرام + پوست انار خشک 30 گرام + کباب چینی 20 گرام + پھٹکری بریاں (Frittered Alum) 10 گرام۔ پھٹکری اور جڑی بوٹیوں کا باریک سفوف بنا کر شہد میں ملا کر گلے کے اندر لیپ کریں اور 10 منٹ بعد نیم گرم پانی سے غرارے کریں۔ ٹونسلز 3 دن میں سکڑ جاتے ہیں۔',
      dietaryDosUrdu: [
        'شربتِ توت سیاہ (Mulberry Syrup) دن میں 3 بار۔',
        'نیم گرم نمکین پانی سے باقاعدہ غرارے۔',
        'سوپ، کھچڑی اور نرم غذائیں جو گلے کو نہ چبھیں۔'
      ],
      dietaryDontsUrdu: [
        'ٹھنڈا پانی، تیز مصالحے دار پکوڑے، سموسے اور کھٹائی۔',
        'سخت غذائیں اور خشک اشیاء جو نگلنے میں خراش پیدا کریں۔'
      ],
      homeopathicSpecificUrdu: '1. Belladonna 30 - گلے میں شدید سرخی، سوجن اور تپش۔ 2. Phytolacca Decandra 200 - ٹونسلز میں درد جو نگلتے وقت کانوں تک جائے (انتہائی مجرب)۔ 3. Baryta Carbonica 30 - بچوں میں بار بار ٹونسلز بڑھ جانے کا مستقل علاج۔ 4. Merc Sol 30 - اگر ٹونسلز پر پیپ کے سفید دھبے ہوں۔',
      scientificMechanismUrdu: 'پوسٹ انار میں موجود Tannins اور Phytolacca کے فعال اجزاء گلینڈولر ٹشو کی عروقی وسعت کو کم کر کے وائرس و بیکٹیریا کی کالونیوں کو تباہ کرتے ہیں۔'
    };
  } else if (selectedDiseaseId === 'liver_jaundice_hepatitis') {
    diseaseSpecificProtocol = {
      diseaseTitleUrdu: 'امراضِ جگر، یرقان (پیلا یرقان) و کالا یرقان ہیپاٹائٹس A, B, C (Liver, Jaundice & Hepatitis)',
      rohaniAmalUrdu: 'سورۃ النحل آیات 68-69 (یَخْرُجُ مِن بُطُونِهَا شَرَابٌ...) 41 بار اور سورۃ الفاتحہ 21 بار عرقِ مکو و کاسنی پر دم کر کے روزانہ نہار منہ اور عصر کے وقت پیئیں۔ اسمِ الٰہی «يَا حَيُّ يَا قَيُّومُ يَا بَارِئُ» 313 بار۔',
      tibbNabawiUrdu: 'اونٹنی کا دودھ اور پیشاب (طبی تحقیق کے مطابق ہیپاٹائٹس و جگر کے سڑاؤ کا تریاق) یا خالص شہد کا پانی نہار منہ پینا جگر کے تمام سدوں کو کھولتا ہے۔',
      herbalSafeFormulaUrdu: 'اکسیرِ جگر و یرقان: تخمِ کاسنی 50 گرام + ریوند خطائی 30 گرام + تخمِ مکو 40 گرام + نوشادر ٹھیکری 20 گرام + گلِ غافث 30 گرام + سنڈھ 20 گرام۔ باریک پیس کر سفوف بنائیں۔ 1 گرام صبح و شام عرقِ کاسنی یا شربتِ بزوری کے ساتھ لیں۔ یہ جگر کے انزائمز (SGPT, SGOT, Bilirubin) کو 7 دن کے اندر نارمل کرتا ہے اور وائرل لوڈ کو ختم کرتا ہے۔',
      dietaryDosUrdu: [
        'گنے کا تازہ بغیر برف کا رس مع لیموں و ادرک۔',
        'مولی کا پانی، گاجر کا جوس اور کدو کا سالن۔',
        'مربہ آملہ اور مربہ ہڑڑ نہار منہ۔',
        'مونگ کی دال، ساگودانہ اور انگور کا استعمال۔'
      ],
      dietaryDontsUrdu: [
        'تیل، گھی، تلی ہوئی تمام اشیاء، انڈے اور بیف سے مکمل اجتناب۔',
        'سرخ مرچ، بازار کے بازاری مصالحے اور پیکٹ والے کھانے۔',
        'شدید محنت اور دھوپ میں پھرنے سے گریز (مکمل آرام لازم ہے)۔'
      ],
      homeopathicSpecificUrdu: '1. Chelidonium Majus Q - جگر کا عظیم ترین تریاق، 10 قطرے دن میں 3 بار (یرقان، جگر کا درد جو دائیں کندھے تک جائے)۔ 2. Carduus Marianus Q - فیٹی لیور اور ہیپاٹائٹس بی و سی کا محافظ۔ 3. Phosphorus 30 - جگر کے خلیات کی توڑ پھوڑ اور کالا یرقان۔ 4. Natrum Sulph 6X - 4 گولیاں دن میں 3 بار صفراوی بخار کے لیے۔',
      scientificMechanismUrdu: 'Carduus marianus میں موجود Silymarin جگر کے ہیپاٹوسائٹس (Hepatocytes) کی بیرونی جھلی کو مضبوط بناتا ہے جس سے وائرس اور زہریلے مادے خلیے کے اندر داخل نہیں ہو سکتے۔'
    };
  } else if (selectedDiseaseId === 'brain_psychology_irritability') {
    diseaseSpecificProtocol = {
      diseaseTitleUrdu: 'دماغی کمزوری، چڑچڑا پن، بے خوابی، وہم، وسوسے، انزائٹی و ڈپریشن (Brain Weakness, Anxiety & Irritability)',
      rohaniAmalUrdu: 'سورۃ الناس 100 بار اور سورۃ طٰہٰ کی آیت «رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي» 111 بار پڑھ کر سر اور سینے پر دم کریں۔ رات کو سوتے وقت «يَا قُدُّوسُ يَا سَلَامُ يَا مُؤْمِنُ» 100 بار ورد کریں۔ وسوسے اور ڈپریشن فوراً ختم ہو جائے گا۔',
      tibbNabawiUrdu: 'فرمانِ نبوی ﷺ: "تلبینہ کھاؤ، یہ مریض کے دل کو سکون بخشتا ہے اور اس کے غم اور اداسی کو سمیٹ کر لے جاتا ہے" (صحیح بخاری)۔ جو کے دلیے کو دودھ اور شہد کے ساتھ ہفتے میں 3 بار کھائیں۔',
      herbalSafeFormulaUrdu: 'شاہی خمیرہ گاؤزبان مع مصلحِ دماغ: اسطخودوس (Lavandula stoechas - دماغ کا جھاڑو) 50 گرام + براہم بوٹی (Centella asiatica) 40 گرام + مغز بادام شیریں 50 گرام + کشنیز خشک 30 گرام + صندل سفید 20 گرام + زعفران اصلی 3 گرام۔ باریک پیس کر خالص شہد میں معجون بنائیں۔ 5 گرام صبح نہار منہ اور رات سوتے وقت نیم گرم دودھ کے ساتھ لیں۔ دماغ کمپیوٹر کی طرح تیز، حافظہ قوی، غصہ اور چڑچڑاہٹ کافور ہو جاتی ہے۔',
      dietaryDosUrdu: [
        'بادام، اخروٹ اور چاروں مغز کا باقاعدہ استعمال۔',
        'سر پر روغنِ کدو یا روغنِ بادام سے رات کو ہلکی مالش۔',
        'سیب کا جوس، دودھ اور کیلا (قدرتی Serotonin بوسٹرز)۔',
        'روزانہ صبح 20 منٹ گہرے سانس لینے کی مشق (Deep Breathing)۔'
      ],
      dietaryDontsUrdu: [
        'چائے اور کافی کا بکثرت استعمال، انرجی ڈرنکس اور سگریٹ۔',
        'رات دیر تک موبائل اسکرین دیکھنا اور منفی سوچوں میں رہنا۔',
        'خشک باسی غذائیں، بڑا گوشت اور زیادہ تیز مصالحے۔'
      ],
      homeopathicSpecificUrdu: '1. Kali Phos 6X - دماغی تھکاوٹ، چڑچڑاہٹ اور حافظے کی کمزوری کا سب سے بڑا نمک (4 گولیاں دن میں 3 بار)۔ 2. Anacardium Orientale 30 - حافظے کی کمزوری، امتحان کا خوف اور دو رخی کیفیت۔ 3. Ignatia 200 - اچانک غم، صدمہ، مایوسی اور بلاوجہ رونے کا دل چاہنا۔ 4. Coffea Cruda 30 - خیالات کے ہجوم کی وجہ سے نیند نہ آنا۔',
      scientificMechanismUrdu: 'براہمی بوٹی میں موجود Bacosides دماغ کے اندر نیورو ٹرانسمیٹر GABA کے اخراج کو بڑھاتے ہیں جس سے کورٹیسول (اسٹریس ہارمون) کی سطح کم ہوتی ہے اور نیورونز کی بحالی تیز ہوتی ہے۔'
    };
  } else if (selectedDiseaseId === 'eye_diseases_vision') {
    diseaseSpecificProtocol = {
      diseaseTitleUrdu: 'امراضِ چشم، کمزوریٔ نظر، عینک کا نمبر، موتیا، آنکھوں کی جلن و سرخی (Eye Diseases & Vision Protocol)',
      rohaniAmalUrdu: 'سورۃ ق آیت 22: «فَكَشَفْنَا عَنكَ غِطَاءَكَ فَبَصَرُكَ الْيَوْمَ حَدِيدٌ» ہر نماز کے بعد 7 بار شہادت کی دونوں انگلیوں پر دم کر کے آنکھوں پر پھیریں۔ اسمِ الٰہی «يَا نُورُ يَا بَصِيرُ» 100 بار روزانہ ورد کریں۔',
      tibbNabawiUrdu: 'فرمانِ نبوی ﷺ: "اثمد (سرمہ) کا استعمال کیا کرو، یہ نظر کو تیز کرتا ہے اور پلکوں کے بال اگاتا ہے"۔ رات کو سوتے وقت دائیں آنکھ میں 3 اور بائیں میں 2 سلائی اثمد سرمہ لگائیں۔ آبِ زمزم کو نظر کی تیزی کی نیت سے آنکھوں میں ڈالیں۔',
      herbalSafeFormulaUrdu: 'سفوفِ مقویٔ بصر (عینک توڑ نسخہ): سونف مصفیٰ 100 گرام + مغز بادام شیریں 100 گرام + کوزہ مصری 100 گرام + سفید مرچ (دکھنی مرچ) 25 گرام + کشتہ عقیق 5 گرام۔ باریک پیس کر روزانہ 1 چمچ رات کو نیم گرم دودھ کے ساتھ لیں۔ ساتھ میں خالص عرقِ گلاب میں شہد کا ایک قطرہ ملا کر ہفتے میں دو بار آنکھوں میں ڈالیں۔ نظر کی کمزوری اور دھندلا پن دور ہو جاتا ہے۔',
      dietaryDosUrdu: [
        'گاجر، پالک، کدو، اور پپیتے کا وافر استعمال (وٹامن اے سے بھرپور)۔',
        'مچھلی اور دیسی انڈے کی زردی۔',
        'صبح کے وقت ہری گھاس پر ننگے پاؤں چہل قدمی کرنا۔'
      ],
      dietaryDontsUrdu: [
        'اندھیرے میں موبائل اسکرین دیکھنا۔',
        'دھوئیں اور گرد و غبار میں بغیر عینک کے جانا۔',
        'آنکھوں کو سختی سے ملنا یا گرم پانی سے براہِ راست دھونا۔'
      ],
      homeopathicSpecificUrdu: '1. Cineraria Maritima Succus Eye Drops - جرمن شوئبے کے آئی ڈراپس (موتیابند اور دھندلا پن دور کرنے کے لیے 2 قطرے صبح شام)۔ 2. Ruta Graveolens 30 - موبائل و کمپیوٹر کے استعمال سے آنکھوں کے پٹھوں کا کھچاؤ۔ 3. Euphrasia 30 - آنکھوں سے تیز جلن والا پانی بہنا اور سرخی۔ 4. Calcarea Fluorica 6X - لینز کی شفافیت بحال کرنے کے لیے۔',
      scientificMechanismUrdu: 'سونف میں موجود Trans-anethole اور بادام کا وٹامن ای ریٹینا (Retina) کے خلیات کی آکسیڈیٹیو ڈی جنریشن کو روک کر میکولر پگمنٹ ڈینسٹی کو بڑھاتے ہیں۔'
    };
  } else if (selectedDiseaseId === 'ear_hearing_tinnitus') {
    diseaseSpecificProtocol = {
      diseaseTitleUrdu: 'بہرہ پن، کان میں درد، پیپ بہنا اور کانوں میں سائیں سائیں/آوازیں (Hearing Loss & Tinnitus Protocol)',
      rohaniAmalUrdu: 'سورۃ الحشر کی آخری 3 آیات «هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ...» 7 بار پڑھ کر کان میں ہلکا دم کریں اور اسمِ اعظم «يَا سَمِيعُ يَا عَلِيمُ يَا شَافِي» 180 بار روزانہ ورد کریں۔',
      tibbNabawiUrdu: 'روغنِ زیتون خالص میں لہسن کا ایک جوہ جلا کر اس نیم گرم تیل کے 2 قطرے کان میں ٹپکانا پرانے بہرے پن، کان کے درد اور میل کو نکالنے کے لیے اکسیر ہے۔',
      herbalSafeFormulaUrdu: 'روغنِ سماعت و تریاقِ طنین: روغنِ بادام تلخ 30 ملی لیٹر + روغنِ سرسوں 30 ملی لیٹر + کلونجی 10 گرام + لہسن 10 گرام + کافور 2 گرام۔ دھیمی آنچ پر پکائیں جب لہسن کالا ہو جائے تو چھان کر شیشی میں محفوظ کریں۔ رات کو 2 قطرے نیم گرم کر کے کان میں ڈال کر روئی رکھیں۔ کان کا بہنا، پردے کی سوجن اور کانوں میں گھنٹیاں بجنا (Tinnitus) بند ہو جاتا ہے۔',
      dietaryDosUrdu: [
        'اخروٹ، مچھلی اور زنک والی غذائیں (کدو کے بیج)۔',
        'کان کو ہمیشہ خشک اور صاف رکھیں۔',
        'نہاتے وقت کان میں پانی جانے سے بچاؤ۔'
      ],
      dietaryDontsUrdu: [
        'کان میں ماچس کی تیلی، چابی یا سخت تنکا مارنا۔',
        'ہینڈ فری پر اونچی آواز میں موسیقی یا آوازیں سننا۔',
        'ٹھنڈے پانی میں نہانا اور کان کو کھلی ہوا میں رکھنا۔'
      ],
      homeopathicSpecificUrdu: '1. Chininum Sulphuricum 30 - کانوں میں مسلسل سیٹی، سائیں سائیں اور جھینگر جیسی آوازیں آنا۔ 2. Pulsatilla 30 - کان سے زرد پیپ بہنا اور کان بند ہونا۔ 3. Chenopodium 6 - اعصابی کمزوری کے باعث سماعت میں کمی۔ 4. Verbascum Thapsus (Mullein Oil) - کان کے ڈراپس برائے فوری تسکینِ درد۔',
      scientificMechanismUrdu: 'لہسن میں موجود Allicin اور بادام تلخ کا تیل کان کے اندرونی اعصاب (Auditory Nerve) میں خون کی مائیکرو سرکولیشن کو بحال کر کے کوکلیا (Cochlea) کے ہیئر سیلز کو دوبارہ فعال کرتے ہیں۔'
    };
  } else if (selectedDiseaseId === 'cancer_tumors_cysts') {
    diseaseSpecificProtocol = {
      diseaseTitleUrdu: 'کینسر، رسولیاں، سلعہ، غدود اور فاسد گلٹیاں (Cancer Holistic Support & Tumor Dissolution)',
      rohaniAmalUrdu: 'سورۃ الحشر (آیات 21-24) «لَوْ أَنزَلْنَا هَٰذَا الْقُرْآنَ عَلَىٰ جَبَلٍ لَّرَأَيْتَهُ خَاشِعًا مُّتَصَدِّعًا مِّنْ خَشْيَةِ اللَّهِ...» 41 بار روزانہ پانی پر دم کر کے پیئیں اور رسولی والی جگہ پر ہاتھ رکھ کر دم کریں۔ اسمِ اعظم «يَا مُمِيتُ يَا قَہَّارُ يَا سَلَامُ يَا شَافِي» 313 بار ورد کریں۔ تمام فاسد گلٹیاں تحلیل ہو جائیں گی۔',
      tibbNabawiUrdu: 'سنتِ نبوی ﷺ: روزانہ صبح نہار منہ کلونجی کا خالص تیل (1 چمچ) گرم پانی میں شہد ملا کر پینا۔ سناء مکی کا قہوہ ہفتے میں ایک بار پینا تاکہ جسم سے تمام زہریلے کارسینوجنز نکل جائیں۔',
      herbalSafeFormulaUrdu: 'شاہی تریاقِ سلعہ و رسولی: ہلدی دیسی (Curcumin) 50 گرام + کچور (Curcuma zedoaria) 40 گرام + گوند صمغ عربی 30 گرام + کچنار کی چھال (Bauhinia variegata) 50 گرام + کلونجی 30 گرام + مصبر اصلی 20 گرام۔ باریک پیس کر سفوف بنائیں۔ 2 گرام صبح، دوپہر، شام کھانے کے بعد عرقِ مکو کے ساتھ لیں۔ یہ جسم کے اندر غیر طبعی خلیات (Cysts / Fibroids / Tumors) کی خون کی سپلائی روک کر انہیں بتدریج تحلیل کر دیتا ہے۔',
      dietaryDosUrdu: [
        'گریپ فروٹ، انار، بیریز اور چقندر کا تازہ رس۔',
        'بروکلی، بند گوبھی، لہسن اور ادرک کا وافر استعمال۔',
        'الکلائن پانی (لیموں اور پودینہ ملا پانی) پیئیں۔',
        'ہر کھانے سے پہلے تازہ سلاد بغیر نمک کے کھائیں۔'
      ],
      dietaryDontsUrdu: [
        'سفید چینی اور تمام میٹھی اشیاء (کینسر سیلز کی بنیادی خوراک گلوکوز ہے، چینی فوراً بند کریں)۔',
        'ریفائنڈ تیل، پراسیسڈ گوشت اور ڈبہ پیک غذائیں۔',
        'مائیکرو ویو اوون کا کھانا اور پلاسٹک کے برتنوں میں گرم کھانا کھانا۔'
      ],
      homeopathicSpecificUrdu: '1. Carcinosinum 200 - کینسر کی روک تھام اور خاندانی رجحان کے لیے مہینے میں 1 خوراک۔ 2. Conium Maculatum 200 - پتھر کی طرح سخت رسولیاں اور چھاتی کی گلٹیاں (ہفتے میں 2 بار)۔ 3. Thuja Occidentalis 200 - تمام غیر طبعی گوشت اور سسٹس کو ختم کرنے کا عظیم پولیکریسٹ۔ 4. Hydrastis Canadensis Q - 10 قطرے معدے و انتڑیوں کے زخموں اور کینسر کے لیے۔',
      scientificMechanismUrdu: 'کچنار کی چھال میں موجود Bauhinione اور ہلدی کا Curcumin کینسر خلیات میں Apoptosis (طبعی موت) کا عمل شروع کر دیتے ہیں اور Angiogenesis (رسولی کی نئی رگیں بننے کا عمل) کو روک دیتے ہیں۔'
    };
  } else if (selectedDiseaseId === 'face_complexion_wrinkles_aging') {
    diseaseSpecificProtocol = {
      diseaseTitleUrdu: 'چہرے کی رنگت، فائن لائنز، جھریاں، ڈھلکی جلد، چھائیاں و اینٹی ایجنگ (Facial Complexion, Anti-Wrinkle & Skin Tightening)',
      rohaniAmalUrdu: 'سورۃ یوسف آیت 4 «إِذْ قَالَ يُوسُفُ لِأَبِيهِ يَا أَبَتِ إِنِّي رَأَيْتُ أَحَدَ عَشَرَ كَوْكَبًا...» 11 بار اور اسمِ الٰہی «يَا جَمِيلُ يَا نُورُ يَا مُصَوِّرُ» 100 بار پڑھ کر دونوں ہاتھوں پر پھونک کر چہرے پر ملیں۔ چہرہ چودہویں کے چاند کی طرح روشن اور پُرکشش ہو جائے گا۔',
      tibbNabawiUrdu: 'زیتون کے تیل سے چہرے کی مالش اور روغنِ بادام کو رات کو سوتے وقت لگانا سنتِ نبوی ﷺ کے مطابق جلد کو جوان اور تروتازہ رکھتا ہے۔',
      herbalSafeFormulaUrdu: 'شاہی ابٹن و اینٹی ایجنگ ماسک: حسنِ یوسف بوٹی 30 گرام + صندل سفید 30 گرام + زعفران 2 گرام + مغز بادام 30 گرام + جو کا آٹا 50 گرام + ہلدی دیسی 10 گرام + خشک گلاب کی پتیاں 20 گرام۔ باریک پیس کر پاؤڈر بنائیں۔ ایک چمچ لے کر دودھ یا عرقِ گلاب میں پیسٹ بنا کر چہرے پر 20 منٹ لگائیں اور نیم گرم پانی سے دھو لیں۔ ساتھ میں پینے کے لیے: شاہترہ 5 گرام + چرائتہ 3 گرام کا قہوہ جو خون صاف کر کے چہرے کی چھائیاں اور جھریاں جڑ سے مٹا دیتا ہے۔',
      dietaryDosUrdu: [
        'روزانہ 10 سے 12 گلاس پانی (ہائیڈریشن سے جھریاں ختم ہوتی ہیں)۔',
        'وٹامن سی سے بھرپور پھل (مالٹا، لیموں، امرود، اسٹرابیری)۔',
        'رات کو سوتے وقت 1 گلاس دودھ میں 1 چٹکی زعفران اور بادام۔',
        'چہرے کا اوپر کی سمت (Upward Facial Massage) مساج۔'
      ],
      dietaryDontsUrdu: [
        'سخت کیمیکل والی بلیچ اور اسٹیرائیڈ کریموں کا استعمال (یہ جلد کو پتلا اور ڈھلکا دیتی ہیں)۔',
        'دھوپ میں بغیر سن بلاک کے نکلنا۔',
        'چہرے کو بار بار نوچنا یا رگڑ کر دھونا۔'
      ],
      homeopathicSpecificUrdu: '1. Berberis Aquifolium Q - چہرے کے نکھار، چھائیوں اور رنگت صاف کرنے کا بے مثال مدر ٹنکچر (10 قطرے پئیں اور چہرے پر بھی لگائیں)۔ 2. Sepia 200 - خواتین میں ہارمونز کی خرابی کی وجہ سے چہرے پر کالی چھائیاں (ہفتے میں 1 بار)۔ 3. Sarsaparilla 30 - ڈھلکی ہوئی اور جھریوں والی جلد کا تریاق۔ 4. Silicea 6X - جلد میں قدرتی کولیجن (Collagen) بڑھانے کے لیے۔',
      scientificMechanismUrdu: 'حسن یوسف اور زعفران میں موجود Carotenoids اور فینولک ایسڈز جلد کے Fibroblasts کو تحریک دے کر Collagen اور Elastin کی قدرتی پیداوار 60% بڑھاتے ہیں جس سے فائن لائنز اور جھریاں ہموار ہو جاتی ہیں۔'
    };
  } else if (selectedDiseaseId === 'lips_care_pink_slimming') {
    diseaseSpecificProtocol = {
      diseaseTitleUrdu: 'کالے ہونٹ، سیاہی دور کرنا، ہونٹ گلابی بنانا، موٹے ہونٹوں کو پتلا و متناسب کرنا (Lip Care & Lightening Protocol)',
      rohaniAmalUrdu: 'سورۃ الرحمن کی آیت «فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ» 21 بار اور اسمِ الٰہی «يَا لَطِيفُ يَا بَدِيعُ يَا جَمِيلُ» 111 بار پڑھ کر اپنے ہونٹوں پر انگلی سے پھیریں۔ ہونٹوں پر قدرتی سرخی اور ملاحت آئے گی۔',
      tibbNabawiUrdu: 'خالص شہد اور دیسی موم (Beeswax) کا ہونٹوں پر لیپ کرنا ہونٹوں کی خشکی، سیاہی اور سوجن کو ختم کرتا ہے۔',
      herbalSafeFormulaUrdu: 'اکسیرِ لبِ گلاب و متناسب خاکہ: چقندر کا خشک پاؤڈر 10 گرام + تازہ گلاب کی پتیاں 20 گرام + گلیسرین اصلی 20 ملی لیٹر + روغنِ بادام شیریں 10 ملی لیٹر + لیموں کا رس 5 قطرے + تھوڑا سا خالص شہد۔ ملا کر بام بنا لیں۔ رات کو سونے سے قبل ہونٹوں پر ہلکا مساج کر کے لگا رہنے دیں۔ یہ ہونٹوں کی مردہ سیاہ جلد (Dead Skin) کو ہٹا کر نیچے سے گلابی، نرم و ملائم جلد نکالتا ہے۔ موٹے یا سوجے ہوئے ہونٹوں کے لیے: پھٹکری اور عرقِ گلاب کا روزانہ 5 منٹ کا لیپ ہونٹوں کے غیر طبعی پھلاؤ کو سمیٹ کر پتلا اور متناسب بناتا ہے۔',
      dietaryDosUrdu: [
        'انار کا جوس، چقندر کا سلاد اور وافر مقدار میں پانی پیئیں۔',
        'ناف میں رات کو سرسوں یا بادام کا تیل 2 قطرے ڈالیں (ہونٹ کبھی نہیں پھٹتے اور گلابی رہتے ہیں)۔',
        'ہونٹوں کو نرم برش سے ہلکا سا ایکسفولیئٹ کریں۔'
      ],
      dietaryDontsUrdu: [
        'سگریٹ نوشی اور تمباکو نوشی (ہونٹوں کی سیاہی کی سب سے بڑی وجہ)۔',
        'ہونٹوں پر بار بار زبان پھیرنا یا ہونٹوں کی کھال دانتوں سے چبانا۔',
        'سستی غیر معیاری میٹ لپ اسٹک کا کثرت سے استعمال۔'
      ],
      homeopathicSpecificUrdu: '1. Nitric Acid 30 - ہونٹوں کے کونوں کے کٹنے اور سیاہی کے لیے۔ 2. Natrum Mur 30 - ہونٹوں کی خشکی، کالا پن اور دھوپ سے جلن۔ 3. Graphites 30 - موٹے اور پھٹے ہوئے ہونٹوں کے خدوخال کو متوازن کرنے کے لیے۔ 4. Arum Triphyllum 30 - ہونٹوں کی سوجن اور چھیلنے کی عادت کے لیے۔',
      scientificMechanismUrdu: 'چقندر میں موجود Betalains اور لیموں کا Citric Acid ہونٹوں میں جمع شدہ Melanin پگمنٹ کو توڑتے ہیں، جبکہ گلیسرین ٹرانس ایپی ڈرمل واٹر لاس (TEWL) کو روک کر ہونٹوں کی جلد کو گلابی بناتی ہے۔'
    };
  } else if (selectedDiseaseId === 'male_vitality_timing_stamina') {
    diseaseSpecificProtocol = {
      diseaseTitleUrdu: 'مردانہ کمزوری، سرعتِ انزال (ٹائمنگ)، انتشار، ضعفِ باہ، عضو کی لمبائی و موٹائی کے لیے دورانِ خون (Male Vitality Protocol)',
      rohaniAmalUrdu: 'سورۃ الطارق کی آیات (فَلْيَنظُرِ الْإِنسَانُ مِمَّ خُلِقَ... إِنَّهُ عَلَىٰ رَجْعِهِ لَقَادِرٌ) 21 بار اور اسمِ الٰہی «يَا قَوِيُّ يَا قَادِرُ يَا مَتِينُ يَا مُقْتَدِرُ» 313 بار روزانہ پڑھ کر بادام کے دودھ پر دم کر کے پیئیں۔ مردانہ طاقت، ٹائمنگ اور اعصاب میں فولادی سختی پیدا ہوگی۔',
      tibbNabawiUrdu: 'فرمانِ نبوی ﷺ: "جبرائیل علیہ السلام نے مجھے ہریسہ (گندم، گوشت اور گھی کا حلیم) کھانے کا مشورہ دیا جس سے مردانہ قوت اور پشت کی مضبوطی حاصل ہوتی ہے"۔ نہار منہ 1 چمچ شہد میں 7 دانے کلونجی کھانا منی کو گاڑھا کرتا ہے۔',
      herbalSafeFormulaUrdu: 'شاہی مغلظ و مقویٔ اعصاب: تلمکھانہ 40 گرام + ثعلب مصری 50 گرام + ثعلب پنجہ 50 گرام + موصلی سفید انڈیا 50 گرام + بہمن سفید 30 گرام + بہمن سرخ 30 گرام + تخمِ کونچ (شیرِ مدار میں مصفیٰ) 30 گرام + ریگ ماہی 20 گرام + زعفران 5 گرام + کشتہ مرجان 10 گرام۔ باریک پیس کر سفوف بنائیں۔ 5 گرام صبح نہار منہ اور عصر کے وقت 1 گلاس نیم گرم دودھ کے ساتھ لیں۔ یہ مادہ منویہ کو شہد کی طرح گاڑھا کرتا ہے، ٹائمنگ کو قدرتی طور پر 15 سے 20 منٹ تک بڑھاتا ہے اور اعصاب میں نئی جان ڈالتا ہے۔ عضو کے دورانِ خون اور سختی کے لیے: روغنِ زیتون 50 ملی لیٹر میں لونگ 5 گرام اور دارچینی 5 گرام پکا کر چھان لیں، روزانہ رات کو عضو کے اگلے اور نچلے حصے کو چھوڑ کر سائیڈوں پر ہلکا مساج کریں۔ خون کی نالیاں کشادہ ہو کر قدرتی لمبائی اور موٹائی بحال ہوتی ہے۔',
      dietaryDosUrdu: [
        'خالص دیسی گھی، دیسی انڈے کی زردی، مچھلی اور بکرے کا مغز۔',
        'مغز پستہ، اخروٹ، چلغوزے، اور کاجو کا دودھ کے ساتھ شیک۔',
        'کیلے کا ملک شیک اور کھجور 5 عدد روزانہ۔',
        'روزانہ کیگل ایکسرسائز (Kegel Exercises) 10 منٹ۔'
      ],
      dietaryDontsUrdu: [
        'کھٹی چیزیں (اچار، املی، لیموں) اور فاسٹ فوڈ۔',
        'مشت زنی، پورنوگرافی اور کثرتِ جماع سے مکمل پرہیز (کم از کم 40 دن کا پرہیزِ جماع)۔',
        'سگریٹ، نسوار اور الکحل (یہ عضو کی خون کی نالیوں کو مستقل سکیڑ دیتی ہیں)۔'
      ],
      homeopathicSpecificUrdu: '1. Agnus Castus Q + Damiana Q - ہموزن ملا کر 15 قطرے آدھے کپ پانی میں دن میں 3 بار (انتشار کی کمی اور نامردی کا تریاق)۔ 2. Acid Phos 200 - اعصابی کمزوری، جریان اور منی کے اخراج کے بعد شدید نقاہت۔ 3. Selenium 200 - سرعتِ انزال (ٹائمنگ کی شدید کمی) اور قطرے آنا۔ 4. Yohimbinum Q - دورانِ خون کو عضو کی طرف بڑھانے کے لیے۔',
      scientificMechanismUrdu: 'ثعلب اور موصلی سفید میں موجود Saponins اور Polysaccharides نائٹرک آکسائیڈ سنتھیز (NOS) کو فعال کرتے ہیں جس سے کارپورا کیورنوسا (Corpora Cavernosa) میں خون کا دباؤ بڑھتا ہے اور انتشار طویل رہتا ہے۔'
    };
  } else if (selectedDiseaseId === 'female_hormonal_pcos_leucorrhoea') {
    diseaseSpecificProtocol = {
      diseaseTitleUrdu: 'امراضِ نسواں، لکوریہ، پی سی او ایس، ہارمونز کا بگاڑ، ماہواری کا خلل و بانجھ پن (Female Hormonal Harmony & PCOS)',
      rohaniAmalUrdu: 'سورۃ مریم کی ابتدائی 10 آیات «کهيعص ۚ ذِكْرُ رَحْمَتِ رَبِّكَ عَبْدَهُ زَكَرِيَّا...» 21 بار اور اسمِ الٰہی «يَا وَهَّابُ يَا خَالِقُ يَا بَارِئُ يَا مُصَوِّرُ» 313 بار پانی پر دم کر کے پیئیں۔ رحم کی تمام رسولیاں، لکوریہ اور بانجھ پن دور ہو کر اولادِ صالحہ کی نعمت نصیب ہوگی۔',
      tibbNabawiUrdu: 'حجامت (Cupping) کمر کے نچلے حصے پر کروانا اور روزانہ قسطِ بحری کا پاؤڈر شہد کے ساتھ لینا نسوانی ہارمونز (Estrogen & Progesterone) کو متوازن کرتا ہے۔',
      herbalSafeFormulaUrdu: 'شاہی تریاقِ رحم و مصفیٰ نسواں: ماجو پھل 40 گرام + سپاری کٹھی 40 گرام + گوند کیکر 40 گرام + موچرس 30 گرام + اسوگندھا 40 گرام + تخمِ حلبہ (میتھی دانہ) 30 گرام + ریوند چینی 20 گرام۔ باریک پیس کر سفوف بنائیں۔ آدھا چمچ صبح و شام نیم گرم دودھ کے ساتھ لیں۔ یہ لکوریہ (Leucorrhoea) کے پانی کو 3 دن میں بند کرتا ہے، رحم کی سوزش مٹاتا ہے اور بیضہ دانی (Ovaries) کے سسٹس کو ختم کر کے ماہواری کو باقاعدہ بناتا ہے۔',
      dietaryDosUrdu: [
        'میتھی دانہ اور دارچینی کا قہوہ روزانہ صبح نہار منہ۔',
        'انار، سیب، کھجور اور پالک کا استعمال۔',
        'روزانہ 30 منٹ تیز چہل قدمی (انسولین ریزسٹنس کم کر کے پی سی او ایس ختم کرتی ہے)۔'
      ],
      dietaryDontsUrdu: [
        'سفید چینی، بیکری بسکٹس، پیزا، برگر اور سوفٹ ڈرنکس۔',
        'چکن برائلر کا زیادہ استعمال (ہارمونل خرابی پیدا کرتا ہے)۔',
        'ٹھنڈے پانی سے نہانا اور کھٹی چیزیں کھانے سے پرہیز۔'
      ],
      homeopathicSpecificUrdu: '1. Pulsatilla 200 - ماہواری کا رک جانا، کم آنا یا تاخیر سے ہونا (ہفتے میں 1 بار)۔ 2. Sepia 200 - پی سی او ایس، چہرے پر بال، موٹاپا اور رحم کا نیچے گرنے کا احساس۔ 3. Oophorinum 30 - بیضہ دانی کے سسٹس اور ہارمونل امبیلنس کا ہومیوپیتھک ٹانک۔ 4. Calcarea Carb 200 - موٹی خواتین میں لکوریہ اور اعصابی کمزوری کے لیے۔',
      scientificMechanismUrdu: 'ماجو پھل اور میتھی دانے کے فائیٹو ایسٹروجینز (Phytoestrogens) پٹیوٹری گلینڈ سے LH اور FSH ہارمونز کے تناسب کو نارمل کرتے ہیں جس سے اوولیشن (Ovulation) باقاعدہ ہوتی ہے۔'
    };
  } else if (selectedDiseaseId === 'diabetes') {
    diseaseSpecificProtocol = {
      diseaseTitleUrdu: 'مرضِ ذیابیطس / شوگر کا شافی روحانی و جسمانی و ہومیوپیتھک علاج (Complete Diabetes Protocol)',
      rohaniAmalUrdu: 'سورۃ بنی اسرائیل (آیت 80): «وَقُل رَّبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ وَاجْعَل لِّي مِن لَّدُنكَ سُلْطَانًا نَّصِيرًا» روزانہ فجر اور عشاء کے بعد 41 بار پڑھ کر آبِ زمزم یا بارش کے پانی پر دم کر کے پیئیں۔ ساتھ میں اسمِ اعظم «يَا شَافِي يَا حَفِيظُ يَا سَلَامُ» 391 بار ورد کریں۔',
      tibbNabawiUrdu: 'فرمانِ نبوی ﷺ: "کلونجی میں موت کے علاوہ ہر بیماری کی شفا ہے۔" روزانہ نہار منہ 7 دانے کلونجی نیم گرم پانی یا ایک چٹکی زیتون کے تیل کے ساتھ نگلیں۔ ساتھ میں میتھی دانہ (Fenugreek) رات کو بھگو کر صبح اس کا پانی پینا لبلبے (Pancreas) کے لیے اکسیر ہے۔',
      herbalSafeFormulaUrdu: '100% محفوظ و سائیڈ ایفیکٹ سے پاک دیسی اکسیرِ شوگر نسخہ: گڑمار بوٹی اصلی (Gymnema Sylvestre) 50 گرام + تخمِ سرس (Albizia lebbeck) 50 گرام + جامن کی خشک گٹھلی (Syzygium Cumini) 50 گرام + میتھی دانہ 50 گرام + کلونجی 25 گرام + خشک کریلا کے بیج 25 گرام۔ باریک پیس کر سفوف بنائیں۔ آدھا چمچ صبح و شام کھانے سے آدھا گھنٹہ قبل پانی کے ساتھ لیں۔ یہ لبلبے کے بیٹا سیلز (Beta Cells) کو قدرتی طور پر متحرک کرتا ہے اور شوگر کو اعتدال پر لاتا ہے۔',
      dietaryDosUrdu: [
        'جامن، امرود، گریپ فروٹ، اور بیری کا پھل استعمال کریں۔',
        'کریلا، گھیا کدو، بھنڈی، میتھی ساگ، اور پالک کا بکثرت سالن۔',
        'دارچینی کا قہوہ روزانہ بعد از دوپہر کا کھانا (انسولین سینسیٹیوٹی بڑھاتا ہے)۔',
        'خالص بادام اور اخروٹ روزانہ 4 سے 5 عدد۔',
        'روزانہ صبح یا شام 30 تا 45 منٹ مسلسل تیز قدمی (Brisk Walk)۔'
      ],
      dietaryDontsUrdu: [
        'سفید چینی، بیکری اشیاء، مٹھائیاں، اور سوفٹ ڈرنکس سے 100 فیصد مکمل اجتناب۔',
        'ریفائنڈ میدہ، نان، سفید چاول، اور تلی ہوئی بازاری اشیاء۔',
        'آم، انگور، چیکو اور کیلا زیادہ مقدار میں کھانے سے پرہیز۔',
        'رات کو دیر سے کھانا اور کھانے کے فوراً بعد سو جانا۔'
      ],
      homeopathicSpecificUrdu: '1. Syzygium Jambolanum Q (جامن کا مدر ٹنکچر) - 10 قطرے صبح، دوپہر، شام آدھے کپ پانی میں (شوگر لیول کو فوری ڈاؤن کرتا ہے)۔ 2. Uranium Nitricum 30 - 5 قطرے صبح و رات (بار بار پیشاب آنا اور جسم سوکھنا)۔ 3. Gymnema Sylvestre Q - 10 قطرے (میٹھے کی طلب ختم کرتا ہے)۔ 4. Phosphoric Acid 30 - اعصابی کمزوری اور پاؤں کے تلووں کی جلن کے لیے۔',
      scientificMechanismUrdu: 'جدید سائنسی و بائیو کیمیکل تحقیق: گڑمار بوٹی میں موجود Gymnemic Acid آنتوں میں شوگر کے ریسیپٹرز کو بلاک کرتا ہے جس سے گلوکوز کا انجذاب کم ہو جاتا ہے، جبکہ جامن کے گٹھلی کے اجزاء (Jamboline) کاربوہائیڈریٹس کو تیزی سے شوگر میں تبدیل ہونے سے روکتے ہیں۔'
    };
  } else {
    // Default or fallback protocol
    diseaseSpecificProtocol = {
      diseaseTitleUrdu: `${foundDisease.labelUrdu} کا شافی و جامع پروٹوکول`,
      rohaniAmalUrdu: 'سورۃ الشعراء (آیت 80): «وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ» 111 بار اور سورۃ الفاتحہ 7 بار روزانہ پانی پر دم کر کے پیئیں۔ اسمِ الٰہی «يَا شَافِي يَا كَافِي يَا مُعَافِي» 313 بار۔',
      tibbNabawiUrdu: 'شہد کا نہار منہ نیم گرم پانی میں شربت بنا کر پینا اور کلونجی کے 7 دانے استعمال کرنا ہر مرض کے لیے شفاء ہے۔',
      herbalSafeFormulaUrdu: 'تخمِ کاسنی 30 گرام + بنفشہ 30 گرام + سونف 30 گرام + ملٹھی 20 گرام + کلونجی 20 گرام۔ جوشاندہ بنا کر صبح و شام پئیں۔ تمام اندرونی سوزشوں کو صاف کرتا ہے۔',
      dietaryDosUrdu: ['تازہ سبزیاں، مونگ کی دال کی کھچڑی، اور موسمی پھل۔', 'پانی کا وافر استعمال اور باقاعدہ ہلکی ورزش۔'],
      dietaryDontsUrdu: ['تلی ہوئی اشیاء، تیز مرچ اور مصنوعی کھانوں سے پرہیز۔', 'دیر رات کا کھانا اور بازاری فاسٹ فوڈ۔'],
      homeopathicSpecificUrdu: 'Arnica Montana 30 + Nux Vomica 30 بحسابِ علامات دن میں دو بار۔',
      scientificMechanismUrdu: 'قدرتی ادویہ خلیاتی سطح پر قوتِ مدافعت (Immune Response) کو بیدار کر کے بافتوں کی قدرتی مرمت کرتی ہیں۔'
    };
  }

  // Recommended Naqsh generation (نقشِ شفا و ابطال)
  const naqshAdad = combinedTotalAdad + 391; // Add 391 (عدد اسم الشافی)
  const generatedGrid = generateNaqsh(naqshAdad, 'musallas', chalType);

  return {
    patientName: cleanPatient,
    motherName: cleanMother,
    gender,
    genderUrdu: gender === 'male' ? 'مرد (مذکر)' : 'عورت (مونث)',
    selectedDiseaseId,
    selectedDiseaseNameUrdu: diseaseTitleUrdu,
    totalAdadPatient,
    totalAdadMother,
    combinedTotalAdad,
    tarahMod4Remainder: rem4,
    tarahMod7Remainder: rem7,
    tarahMod12Remainder: rem12,
    illnessNature,
    illnessNatureUrdu,
    temperamentMismatch: `عنصر ${burjObj.element} (${burjObj.nature}) - حاکم کوکب ${burjObj.planet}`,
    dominantElementUrdu: burjObj.element,
    governingPlanetUrdu: burjObj.planet,
    burjUrdu: burjObj.burj,
    rootCauseUrdu,
    detailedAnalysisUrdu,
    temperamentProfile: {
      mizajUrdu,
      khiltGhalibUrdu,
      affectedOrgansUrdu,
      safePrinciplesUrdu,
    },
    saharDiagnosisDetails: {
      saharTypeUrdu,
      timeOnsetDurationUrdu: calculatedDuration,
      perpetratorProfileUrdu,
      perpetratorElementUrdu,
      distinctionMethodUrdu,
      saharLocationOrBurialUrdu,
      evilEyeSeverityUrdu,
    },
    spiritualCure: {
      wazifaUrdu,
      wazifaCount,
      tilaawatUrdu,
      incenseUrdu,
      sadqahUrdu,
      favorableHourUrdu,
      bestDaysUrdu,
    },
    physicalHerbalCure: {
      herbalFormulaNameUrdu,
      herbsListUrdu,
      preparationMethodUrdu,
      dietaryPrecautionsUrdu,
      tibbEUnaniTemperamentNotes: tibbNotes,
    },
    homeopathicCure,
    allopathicGuidelines,
    diseaseSpecificProtocol,
    recommendedNaqsh: {
      type: 'musallas',
      typeNameUrdu: 'مثلثِ شفائے کامل مع اسمِ اعظم',
      chal: chalType,
      chalNameUrdu,
      totalAdad: naqshAdad,
      baseAdad: generatedGrid.baseAdad,
      grid: generatedGrid.grid,
      writingInk: 'زعفران و عرقِ گلاب اصلی',
      carryingMethodUrdu: 'بازو پر باندھیں یا گلے میں پہنیں اور روزانہ اس کا پانی صبح نہار منہ پیئیں۔',
      consecrationAzimat: 'بِسْمِ اللَّهِ الشَّافِي بِسْمِ اللَّهِ الْكَافِي بِسْمِ اللَّهِ الْمُعَافِي يَا مَنْ اسْمُهُ دَوَاءٌ وَذِكْرُهُ شِفَاءٌ',
    },
    kashAlBarniMedicalRule:
      'کاش البرنی (مفتاح الجفر و قوانینِ علاج): "جب تک مریض کے نام اور والدہ کے نام کا جفری میزان نکال کر یہ معلوم نہ کر لیا جائے کہ مرض روحانی ہے، جناتی ہے یا جسمانی و اخلاطی، اس وقت تک نہ دوا کام کرتی ہے اور نہ دعا۔ پس کامل طبیب و عامل وہ ہے جو جسم کے لیے مزاج کے موافق بے ضرر جڑی بوٹی، ہومیوپیتھک خوراک اور روح کے لیے اسمائے الٰہیہ کا نقش بیک وقت تجویز کرے۔"',
  };
}
