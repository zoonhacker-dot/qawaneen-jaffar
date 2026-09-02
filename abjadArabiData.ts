// Complete Arabic Abjad (ابجد عربی) Reference Database & Extractions
// Based on classical Arab Jafr texts: Shams al-Ma'arif al-Kubra (Al-Buni), 
// Al-Futuhat al-Makkiyya (Ibn Arabi), Ilm al-Huruf, and Kash al-Barny.

export interface ArabicLetterDetail {
  letter: string;
  nameArabic: string;
  nameUrdu: string;
  malfootiLetters: string[];
  malfootiAdad: number;
  abjadKabirMashriqi: number;
  abjadMaghribi: number;
  abjadSaghir: number;
  abjadWaseet: number;
  abjadAkbar: number; // Malfooti of Malfooti
  isNoorani: boolean; // 14 Noorani letters of Muqatta'at (نص حكيم قاطع له سر)
  element: 'fire' | 'earth' | 'air' | 'water';
  elementArabic: string;
  elementUrdu: string;
  elementNature: string; // حار یابس، بارد رطب، حار رطب، بارد یابس
  planetArabic: string;
  planetUrdu: string;
  lunarMansionNumber: number;
  lunarMansionName: string;
  bodyOrgan: string;
  spiritualDomain: string;
  mizanWeight: number;
}

export const ARABIC_LETTERS_DATABASE: ArabicLetterDetail[] = [
  {
    letter: 'ا',
    nameArabic: 'أَلِف',
    nameUrdu: 'الف',
    malfootiLetters: ['ا', 'ل', 'ف'],
    malfootiAdad: 111,
    abjadKabirMashriqi: 1,
    abjadMaghribi: 1,
    abjadSaghir: 1,
    abjadWaseet: 1,
    abjadAkbar: 433,
    isNoorani: true,
    element: 'fire',
    elementArabic: 'ناري',
    elementUrdu: 'آتشی',
    elementNature: 'حار يابس (گرم و خشک)',
    planetArabic: 'الشمس',
    planetUrdu: 'شمس (سورج)',
    lunarMansionNumber: 1,
    lunarMansionName: 'الشرطين (برج حمل)',
    bodyOrgan: 'الرأس والمخ (سر و دماغ)',
    spiritualDomain: 'الوحدانية والفيض الإلهي والقيادة',
    mizanWeight: 1
  },
  {
    letter: 'ب',
    nameArabic: 'بَاء',
    nameUrdu: 'باء (بے)',
    malfootiLetters: ['ب', 'ا'],
    malfootiAdad: 3,
    abjadKabirMashriqi: 2,
    abjadMaghribi: 2,
    abjadSaghir: 2,
    abjadWaseet: 2,
    abjadAkbar: 114,
    isNoorani: false,
    element: 'earth',
    elementArabic: 'ترابي',
    elementUrdu: 'خاکی',
    elementNature: 'بارد يابس (سرد و خشک)',
    planetArabic: 'القمر',
    planetUrdu: 'قمر (چاند)',
    lunarMansionNumber: 2,
    lunarMansionName: 'البطين',
    bodyOrgan: 'الصدر والقلب (سینہ و دل)',
    spiritualDomain: 'نقطة البداية والرحمة الباطنة والقبول',
    mizanWeight: 2
  },
  {
    letter: 'ج',
    nameArabic: 'جِيم',
    nameUrdu: 'جیم',
    malfootiLetters: ['ج', 'ی', 'م'],
    malfootiAdad: 53,
    abjadKabirMashriqi: 3,
    abjadMaghribi: 3,
    abjadSaghir: 3,
    abjadWaseet: 3,
    abjadAkbar: 164,
    isNoorani: false,
    element: 'air',
    elementArabic: 'هوائي',
    elementUrdu: 'بادی (ہوائی)',
    elementNature: 'حار رطب (گرم و تر)',
    planetArabic: 'المريخ',
    planetUrdu: 'مریخ',
    lunarMansionNumber: 3,
    lunarMansionName: 'الثريا',
    bodyOrgan: 'البطن والكبد (پیٹ و جگر)',
    spiritualDomain: 'الجمع والتأليف والجمال والجود',
    mizanWeight: 3
  },
  {
    letter: 'د',
    nameArabic: 'دَال',
    nameUrdu: 'دال',
    malfootiLetters: ['د', 'ا', 'ل'],
    malfootiAdad: 35,
    abjadKabirMashriqi: 4,
    abjadMaghribi: 4,
    abjadSaghir: 4,
    abjadWaseet: 4,
    abjadAkbar: 146,
    isNoorani: false,
    element: 'water',
    elementArabic: 'مائي',
    elementUrdu: 'آبی',
    elementNature: 'بارد رطب (سرد و تر)',
    planetArabic: 'عطارد',
    planetUrdu: 'عطارد',
    lunarMansionNumber: 4,
    lunarMansionName: 'الدبران',
    bodyOrgan: 'الساق والقدم (پنڈلی و پاؤں)',
    spiritualDomain: 'الدوام والدلالة والدرجات العلية',
    mizanWeight: 4
  },
  {
    letter: 'ہ',
    nameArabic: 'هَاء',
    nameUrdu: 'ھاء',
    malfootiLetters: ['ہ', 'ا'],
    malfootiAdad: 6,
    abjadKabirMashriqi: 5,
    abjadMaghribi: 5,
    abjadSaghir: 5,
    abjadWaseet: 5,
    abjadAkbar: 117,
    isNoorani: true,
    element: 'fire',
    elementArabic: 'ناري',
    elementUrdu: 'آتشی',
    elementNature: 'حار يابس (گرم و خشک)',
    planetArabic: 'المشتري',
    planetUrdu: 'مشتری',
    lunarMansionNumber: 5,
    lunarMansionName: 'الهقعة',
    bodyOrgan: 'الحنجرة والتنفس (گلا و سانس)',
    spiritualDomain: 'الهداية والهيبة والإحاطة الإلهية',
    mizanWeight: 5
  },
  {
    letter: 'و',
    nameArabic: 'وَاو',
    nameUrdu: 'واؤ',
    malfootiLetters: ['و', 'ا', 'و'],
    malfootiAdad: 13,
    abjadKabirMashriqi: 6,
    abjadMaghribi: 6,
    abjadSaghir: 6,
    abjadWaseet: 6,
    abjadAkbar: 124,
    isNoorani: false,
    element: 'earth',
    elementArabic: 'ترابي',
    elementUrdu: 'خاکی',
    elementNature: 'بارد يابس (سرد و خشک)',
    planetArabic: 'الزهرة',
    planetUrdu: 'زہرہ',
    lunarMansionNumber: 6,
    lunarMansionName: 'الهنعة',
    bodyOrgan: 'الظهر والعمود الفقري (کمر و ریڑھ)',
    spiritualDomain: 'الوصل والولاية والمحبة والوفاق',
    mizanWeight: 6
  },
  {
    letter: 'ز',
    nameArabic: 'زَاي',
    nameUrdu: 'زائے',
    malfootiLetters: ['ز', 'ا', 'ی'],
    malfootiAdad: 18,
    abjadKabirMashriqi: 7,
    abjadMaghribi: 7,
    abjadSaghir: 7,
    abjadWaseet: 7,
    abjadAkbar: 129,
    isNoorani: false,
    element: 'air',
    elementArabic: 'هوائي',
    elementUrdu: 'بادی',
    elementNature: 'حار رطب (گرم و تر)',
    planetArabic: 'زحل',
    planetUrdu: 'زحل',
    lunarMansionNumber: 7,
    lunarMansionName: 'الذراع',
    bodyOrgan: 'الطحال والمفاصل (تلی و جوڑ)',
    spiritualDomain: 'الزهد والزيادة في الخير والصفاء',
    mizanWeight: 7
  },
  {
    letter: 'ح',
    nameArabic: 'حَاء',
    nameUrdu: 'حائے حطی',
    malfootiLetters: ['ح', 'ا'],
    malfootiAdad: 9,
    abjadKabirMashriqi: 8,
    abjadMaghribi: 8,
    abjadSaghir: 8,
    abjadWaseet: 8,
    abjadAkbar: 120,
    isNoorani: true,
    element: 'water',
    elementArabic: 'مائي',
    elementUrdu: 'آبی',
    elementNature: 'بارد رطب (سرد و تر)',
    planetArabic: 'الشمس',
    planetUrdu: 'شمس',
    lunarMansionNumber: 8,
    lunarMansionName: 'النثرة',
    bodyOrgan: 'العين والحواس (آنکھ و بینائی)',
    spiritualDomain: 'الحياة والحكمة والحفظ والحصانة',
    mizanWeight: 8
  },
  {
    letter: 'ط',
    nameArabic: 'طَاء',
    nameUrdu: 'طائے',
    malfootiLetters: ['ط', 'ا'],
    malfootiAdad: 10,
    abjadKabirMashriqi: 9,
    abjadMaghribi: 9,
    abjadSaghir: 9,
    abjadWaseet: 9,
    abjadAkbar: 121,
    isNoorani: true,
    element: 'fire',
    elementArabic: 'ناري',
    elementUrdu: 'آتشی',
    elementNature: 'حار يابس (گرم و خشک)',
    planetArabic: 'القمر',
    planetUrdu: 'قمر',
    lunarMansionNumber: 9,
    lunarMansionName: 'الطرف',
    bodyOrgan: 'الرئتان والصوت (پھیپھڑے و آواز)',
    spiritualDomain: 'الطهور والطمأنينة والتأييد العلوي',
    mizanWeight: 9
  },
  {
    letter: 'ی',
    nameArabic: 'يَاء',
    nameUrdu: 'یاء',
    malfootiLetters: ['ی', 'ا'],
    malfootiAdad: 11,
    abjadKabirMashriqi: 10,
    abjadMaghribi: 10,
    abjadSaghir: 1,
    abjadWaseet: 1,
    abjadAkbar: 122,
    isNoorani: true,
    element: 'earth',
    elementArabic: 'ترابي',
    elementUrdu: 'خاکی',
    elementNature: 'بارد يابس (سرد و خشک)',
    planetArabic: 'المريخ',
    planetUrdu: 'مریخ',
    lunarMansionNumber: 10,
    lunarMansionName: 'الجبهة',
    bodyOrgan: 'اليد والأصابع (ہاتھ و انگلیاں)',
    spiritualDomain: 'اليقين واليمن والبركة والتيسير',
    mizanWeight: 10
  },
  {
    letter: 'ک',
    nameArabic: 'كَاف',
    nameUrdu: 'کاف',
    malfootiLetters: ['ک', 'ا', 'ف'],
    malfootiAdad: 101,
    abjadKabirMashriqi: 20,
    abjadMaghribi: 20,
    abjadSaghir: 2,
    abjadWaseet: 2,
    abjadAkbar: 212,
    isNoorani: true,
    element: 'air',
    elementArabic: 'هوائي',
    elementUrdu: 'بادی',
    elementNature: 'حار رطب (گرم و تر)',
    planetArabic: 'عطارد',
    planetUrdu: 'عطارد',
    lunarMansionNumber: 11,
    lunarMansionName: 'الزبرة',
    bodyOrgan: 'الذراعان والكتف (بازو و کندھے)',
    spiritualDomain: 'الكفاية والكرم والكنز المخفي',
    mizanWeight: 20
  },
  {
    letter: 'ل',
    nameArabic: 'لَام',
    nameUrdu: 'لام',
    malfootiLetters: ['ل', 'ا', 'م'],
    malfootiAdad: 71,
    abjadKabirMashriqi: 30,
    abjadMaghribi: 30,
    abjadSaghir: 3,
    abjadWaseet: 3,
    abjadAkbar: 182,
    isNoorani: true,
    element: 'water',
    elementArabic: 'مائي',
    elementUrdu: 'آبی',
    elementNature: 'بارد رطب (سرد و تر)',
    planetArabic: 'المشتري',
    planetUrdu: 'مشتری',
    lunarMansionNumber: 12,
    lunarMansionName: 'الصرفة',
    bodyOrgan: 'الفخذان والأوراك (رانیں و کولہے)',
    spiritualDomain: 'اللطف واللين واللسان الفصيح',
    mizanWeight: 30
  },
  {
    letter: 'م',
    nameArabic: 'مِيم',
    nameUrdu: 'میم',
    malfootiLetters: ['م', 'ی', 'م'],
    malfootiAdad: 90,
    abjadKabirMashriqi: 40,
    abjadMaghribi: 40,
    abjadSaghir: 4,
    abjadWaseet: 4,
    abjadAkbar: 201,
    isNoorani: true,
    element: 'fire',
    elementArabic: 'ناري',
    elementUrdu: 'آتشی',
    elementNature: 'حار يابس (گرم و خشک)',
    planetArabic: 'الزهرة',
    planetUrdu: 'زہرہ',
    lunarMansionNumber: 13,
    lunarMansionName: 'العواء',
    bodyOrgan: 'الوجه والجبين (چہرہ و پیشانی)',
    spiritualDomain: 'الملك والكمال المحمدي والمغفرة',
    mizanWeight: 40
  },
  {
    letter: 'ن',
    nameArabic: 'نُون',
    nameUrdu: 'نون',
    malfootiLetters: ['ن', 'و', 'ن'],
    malfootiAdad: 106,
    abjadKabirMashriqi: 50,
    abjadMaghribi: 50,
    abjadSaghir: 5,
    abjadWaseet: 5,
    abjadAkbar: 217,
    isNoorani: true,
    element: 'earth',
    elementArabic: 'ترابي',
    elementUrdu: 'خاکی',
    elementNature: 'بارد يابس (سرد و خشک)',
    planetArabic: 'زحل',
    planetUrdu: 'زحل',
    lunarMansionNumber: 14,
    lunarMansionName: 'السماك',
    bodyOrgan: 'الأنف والشم (ناک و سونگھنا)',
    spiritualDomain: 'النور والنصرة والنبوة والقلم',
    mizanWeight: 50
  },
  {
    letter: 'س',
    nameArabic: 'سِين',
    nameUrdu: 'سین',
    malfootiLetters: ['س', 'ی', 'ن'],
    malfootiAdad: 120,
    abjadKabirMashriqi: 60,
    abjadMaghribi: 300, // Western Abjad Maghribi difference!
    abjadSaghir: 6,
    abjadWaseet: 6,
    abjadAkbar: 231,
    isNoorani: true,
    element: 'air',
    elementArabic: 'هوائي',
    elementUrdu: 'بادی',
    elementNature: 'حار رطب (گرم و تر)',
    planetArabic: 'الشمس',
    planetUrdu: 'شمس',
    lunarMansionNumber: 15,
    lunarMansionName: 'الغفر',
    bodyOrgan: 'الأسنان واللسان (دانت و گفتگو)',
    spiritualDomain: 'السر والسلامة والسيادة والسكينة',
    mizanWeight: 60
  },
  {
    letter: 'ع',
    nameArabic: 'عَيْن',
    nameUrdu: 'عین',
    malfootiLetters: ['ع', 'ی', 'ن'],
    malfootiAdad: 130,
    abjadKabirMashriqi: 70,
    abjadMaghribi: 70,
    abjadSaghir: 7,
    abjadWaseet: 7,
    abjadAkbar: 241,
    isNoorani: true,
    element: 'water',
    elementArabic: 'مائي',
    elementUrdu: 'آبی',
    elementNature: 'بارد رطب (سرد و تر)',
    planetArabic: 'القمر',
    planetUrdu: 'قمر',
    lunarMansionNumber: 16,
    lunarMansionName: 'الزبانا',
    bodyOrgan: 'الأذنان والسمع (کان و سماعت)',
    spiritualDomain: 'العلم والعزة والعناية الربانية',
    mizanWeight: 70
  },
  {
    letter: 'ف',
    nameArabic: 'فَاء',
    nameUrdu: 'فاء',
    malfootiLetters: ['ف', 'ا'],
    malfootiAdad: 81,
    abjadKabirMashriqi: 80,
    abjadMaghribi: 80,
    abjadSaghir: 8,
    abjadWaseet: 8,
    abjadAkbar: 192,
    isNoorani: false,
    element: 'fire',
    elementArabic: 'ناري',
    elementUrdu: 'آتشی',
    elementNature: 'حار يابس (گرم و خشک)',
    planetArabic: 'المريخ',
    planetUrdu: 'مریخ',
    lunarMansionNumber: 17,
    lunarMansionName: 'الإكليل',
    bodyOrgan: 'الفم والشفاه (منہ و ہونٹ)',
    spiritualDomain: 'الفتح والفهم والفضل والفطنة',
    mizanWeight: 80
  },
  {
    letter: 'ص',
    nameArabic: 'صَاد',
    nameUrdu: 'صاد',
    malfootiLetters: ['ص', 'ا', 'د'],
    malfootiAdad: 95,
    abjadKabirMashriqi: 90,
    abjadMaghribi: 60, // Western Maghribi difference!
    abjadSaghir: 9,
    abjadWaseet: 9,
    abjadAkbar: 206,
    isNoorani: true,
    element: 'earth',
    elementArabic: 'ترابي',
    elementUrdu: 'خاکی',
    elementNature: 'بارد يابس (سرد و خشک)',
    planetArabic: 'عطارد',
    planetUrdu: 'عطارد',
    lunarMansionNumber: 18,
    lunarMansionName: 'القلب',
    bodyOrgan: 'الكلى والخاصرة (گردے و کوکھ)',
    spiritualDomain: 'الصدق والصبر والصفاء والصيانة',
    mizanWeight: 90
  },
  {
    letter: 'ق',
    nameArabic: 'قَاف',
    nameUrdu: 'قاف',
    malfootiLetters: ['ق', 'ا', 'ف'],
    malfootiAdad: 181,
    abjadKabirMashriqi: 100,
    abjadMaghribi: 100,
    abjadSaghir: 1,
    abjadWaseet: 1,
    abjadAkbar: 292,
    isNoorani: true,
    element: 'air',
    elementArabic: 'هوائي',
    elementUrdu: 'بادی',
    elementNature: 'حار رطب (گرم و تر)',
    planetArabic: 'المشتري',
    planetUrdu: 'مشتری',
    lunarMansionNumber: 19,
    lunarMansionName: 'الشولة',
    bodyOrgan: 'المثانة والمسالك (مثانہ و مجاری)',
    spiritualDomain: 'القدرة والقبول والقهر على الباطل',
    mizanWeight: 100
  },
  {
    letter: 'ر',
    nameArabic: 'رَاء',
    nameUrdu: 'راء',
    malfootiLetters: ['ر', 'ا'],
    malfootiAdad: 201,
    abjadKabirMashriqi: 200,
    abjadMaghribi: 200,
    abjadSaghir: 2,
    abjadWaseet: 2,
    abjadAkbar: 312,
    isNoorani: true,
    element: 'water',
    elementArabic: 'مائي',
    elementUrdu: 'آبی',
    elementNature: 'بارد رطب (سرد و تر)',
    planetArabic: 'الزهرة',
    planetUrdu: 'زہرہ',
    lunarMansionNumber: 20,
    lunarMansionName: 'النعائم',
    bodyOrgan: 'الكبد والطاقة الحيوية (جگر و حرارتِ غریزی)',
    spiritualDomain: 'الرحمة والرفعة والروحانية العالية',
    mizanWeight: 200
  },
  {
    letter: 'ش',
    nameArabic: 'شِين',
    nameUrdu: 'شین',
    malfootiLetters: ['ش', 'ی', 'ن'],
    malfootiAdad: 360,
    abjadKabirMashriqi: 300,
    abjadMaghribi: 1000, // Western Maghribi difference!
    abjadSaghir: 3,
    abjadWaseet: 3,
    abjadAkbar: 471,
    isNoorani: false,
    element: 'fire',
    elementArabic: 'ناري',
    elementUrdu: 'آتشی',
    elementNature: 'حار يابس (گرم و خشک)',
    planetArabic: 'زحل',
    planetUrdu: 'زحل',
    lunarMansionNumber: 21,
    lunarMansionName: 'البلدة',
    bodyOrgan: 'الأعصاب والنخاع (اعصاب و نخاع)',
    spiritualDomain: 'الشكر والشفاء والشهود والشرف',
    mizanWeight: 300
  },
  {
    letter: 'ت',
    nameArabic: 'تَاء',
    nameUrdu: 'تاء',
    malfootiLetters: ['ت', 'ا'],
    malfootiAdad: 401,
    abjadKabirMashriqi: 400,
    abjadMaghribi: 400,
    abjadSaghir: 4,
    abjadWaseet: 4,
    abjadAkbar: 512,
    isNoorani: false,
    element: 'earth',
    elementArabic: 'ترابي',
    elementUrdu: 'خاکی',
    elementNature: 'بارد يابس (سرد و خشک)',
    planetArabic: 'الشمس',
    planetUrdu: 'شمس',
    lunarMansionNumber: 22,
    lunarMansionName: 'سعد الذابح',
    bodyOrgan: 'العظام والهيكل (ہڈیاں و ڈھانچہ)',
    spiritualDomain: 'التوبة والتوفيق والتمكين الثابت',
    mizanWeight: 400
  },
  {
    letter: 'ث',
    nameArabic: 'ثَاء',
    nameUrdu: 'ثاء',
    malfootiLetters: ['ث', 'ا'],
    malfootiAdad: 501,
    abjadKabirMashriqi: 500,
    abjadMaghribi: 500,
    abjadSaghir: 5,
    abjadWaseet: 5,
    abjadAkbar: 612,
    isNoorani: false,
    element: 'air',
    elementArabic: 'هوائي',
    elementUrdu: 'بادی',
    elementNature: 'حار رطب (گرم و تر)',
    planetArabic: 'القمر',
    planetUrdu: 'قمر',
    lunarMansionNumber: 23,
    lunarMansionName: 'سعد بلع',
    bodyOrgan: 'الجلد والبشرة (جلد و مسام)',
    spiritualDomain: 'الثبات والثواب والثناء الجميل',
    mizanWeight: 500
  },
  {
    letter: 'خ',
    nameArabic: 'خَاء',
    nameUrdu: 'خاء',
    malfootiLetters: ['خ', 'ا'],
    malfootiAdad: 601,
    abjadKabirMashriqi: 600,
    abjadMaghribi: 600,
    abjadSaghir: 6,
    abjadWaseet: 6,
    abjadAkbar: 712,
    isNoorani: false,
    element: 'water',
    elementArabic: 'مائي',
    elementUrdu: 'آبی',
    elementNature: 'بارد رطب (سرد و تر)',
    planetArabic: 'المريخ',
    planetUrdu: 'مریخ',
    lunarMansionNumber: 24,
    lunarMansionName: 'سعد السعود',
    bodyOrgan: 'الأوردة والشرايين (رگیں و شریانیں)',
    spiritualDomain: 'الخير والخشوع والخلاص من الشدائد',
    mizanWeight: 600
  },
  {
    letter: 'ذ',
    nameArabic: 'ذَال',
    nameUrdu: 'ذال',
    malfootiLetters: ['ذ', 'ا', 'ل'],
    malfootiAdad: 731,
    abjadKabirMashriqi: 700,
    abjadMaghribi: 700,
    abjadSaghir: 7,
    abjadWaseet: 7,
    abjadAkbar: 842,
    isNoorani: false,
    element: 'fire',
    elementArabic: 'ناري',
    elementUrdu: 'آتشی',
    elementNature: 'حار يابس (گرم و خشک)',
    planetArabic: 'عطارد',
    planetUrdu: 'عطارد',
    lunarMansionNumber: 25,
    lunarMansionName: 'سعد الأخبية',
    bodyOrgan: 'المعدة والهضم (معدہ و قوتِ ہاضمہ)',
    spiritualDomain: 'الذكر والذخيرة والغنى المعنوي',
    mizanWeight: 700
  },
  {
    letter: 'ض',
    nameArabic: 'ضَاد',
    nameUrdu: 'ضاد',
    malfootiLetters: ['ض', 'ا', 'د'],
    malfootiAdad: 805,
    abjadKabirMashriqi: 800,
    abjadMaghribi: 90, // Western Maghribi difference!
    abjadSaghir: 8,
    abjadWaseet: 8,
    abjadAkbar: 916,
    isNoorani: false,
    element: 'earth',
    elementArabic: 'ترابي',
    elementUrdu: 'خاکی',
    elementNature: 'بارد يابس (سرد و خشک)',
    planetArabic: 'المشتري',
    planetUrdu: 'مشتری',
    lunarMansionNumber: 26,
    lunarMansionName: 'فرغ الدلو المقدم',
    bodyOrgan: 'الدماغ والقوى الفكرية (دماغ و قوتِ متخیلہ)',
    spiritualDomain: 'الضياء والضمانة وحماية الحقوق',
    mizanWeight: 800
  },
  {
    letter: 'ظ',
    nameArabic: 'ظَاء',
    nameUrdu: 'ظائے',
    malfootiLetters: ['ظ', 'ا'],
    malfootiAdad: 901,
    abjadKabirMashriqi: 900,
    abjadMaghribi: 800, // Western Maghribi difference!
    abjadSaghir: 9,
    abjadWaseet: 9,
    abjadAkbar: 1012,
    isNoorani: false,
    element: 'air',
    elementArabic: 'هوائي',
    elementUrdu: 'بادی',
    elementNature: 'حار رطب (گرم و تر)',
    planetArabic: 'الزهرة',
    planetUrdu: 'زہرہ',
    lunarMansionNumber: 27,
    lunarMansionName: 'فرغ الدلو المؤخر',
    bodyOrgan: 'الجهاز العصبي الطرفي (اعصاب و حواس)',
    spiritualDomain: 'الظفر والغلبة والظهور بالحق',
    mizanWeight: 900
  },
  {
    letter: 'غ',
    nameArabic: 'غَيْن',
    nameUrdu: 'غین',
    malfootiLetters: ['غ', 'ی', 'ن'],
    malfootiAdad: 1060,
    abjadKabirMashriqi: 1000,
    abjadMaghribi: 900, // Western Maghribi difference!
    abjadSaghir: 1,
    abjadWaseet: 1,
    abjadAkbar: 1171,
    isNoorani: false,
    element: 'water',
    elementArabic: 'مائي',
    elementUrdu: 'آبی',
    elementNature: 'بارد رطب (سرد و تر)',
    planetArabic: 'زحل',
    planetUrdu: 'زحل',
    lunarMansionNumber: 28,
    lunarMansionName: 'بطن الحوت (الرشاء)',
    bodyOrgan: 'الدم وجهاز الدوران (خون و دورانِ خون)',
    spiritualDomain: 'الغنى والغلبة والغفران والستر',
    mizanWeight: 1000
  }
];

// Lookup Map for instant O(1) letter analysis
export const ARABIC_LETTERS_MAP: Record<string, ArabicLetterDetail> = {};
ARABIC_LETTERS_DATABASE.forEach(item => {
  ARABIC_LETTERS_MAP[item.letter] = item;
});

// Normalized Mapping for all Arabic variants (hamza, ta marbuta, alif maqsura, maddah)
export const ARABIC_NORMALIZATION_MAP: Record<string, string> = {
  'آ': 'ا',
  'أ': 'ا',
  'إ': 'ا',
  'ا': 'ا',
  'ء': 'ا',
  'ئ': 'ی',
  'ؤ': 'و',
  'ة': 'ت',
  'ى': 'ی',
  'ي': 'ی',
  'ی': 'ی',
  'پ': 'ب',
  'ٹ': 'ت',
  'چ': 'ج',
  'ڈ': 'د',
  'ڑ': 'ر',
  'ژ': 'ز',
  'گ': 'ک',
  'ں': 'ن',
  'ے': 'ی',
  'ه': 'ہ',
  'ہ': 'ہ',
  'ھ': 'ہ'
};

// Classical Comparative Abjad Systems Information
export interface AbjadSystemRule {
  id: 'mashriqi' | 'maghribi' | 'saghir' | 'waseet' | 'malfooti';
  titleArabic: string;
  titleUrdu: string;
  historicalContext: string;
  rhymeSequence: string;
  keyDifferences: string[];
}

export const ARABIC_ABJAD_SYSTEMS_INFO: AbjadSystemRule[] = [
  {
    id: 'mashriqi',
    titleArabic: 'حساب الجمل الكبير (المشرقي / العام)',
    titleUrdu: 'ابجد کبیر مشرقی (مشرقِ اسلامی و برصغیر کا معیار)',
    historicalContext: 'یہ ترتیبِ ابجد مشرقِ وسطیٰ، عراق، شام، ایران اور برصغیر ہند و پاک میں رائج ہے، جس میں کلمات: أبجد هوز حطي كلمن سعفص قرشت ثخذ ضظغ ہیں۔',
    rhymeSequence: 'أَبْجَدْ هَوَّزْ حُطِّي كَلَمُنْ سَعْفَصْ قَرَشَتْ ثَخَذْ ضَظَغْ',
    keyDifferences: [
      'س = ۶۰، ص = ۹۰، ض = ۸۰۰، ظ = ۹۰۰، غ = ۱۰۰۰',
      'اہلِ جفر و نجومِ مشرق میں سب سے زیادہ مروج و معتبر۔'
    ]
  },
  {
    id: 'maghribi',
    titleArabic: 'حساب الجمل المغاربي (الأندلسي / ابن عربي)',
    titleUrdu: 'ابجد مغربی و اندلسی (مراکش، تونس، الجزائر، اندلس و شیخ اکبر ابن عربیؒ)',
    historicalContext: 'شمالی افریقہ (مغربِ اسلامی)، تیونس، مراکش اور اندلس کے کبار علماءِ جفر و تصوف (امام ابن عربیؒ، شیخ احمد زروقؒ اور ابن خلدونؒ) کے مطابق حروف کی ترتیب اور بعض اعداد میں فرق ہے۔ کلمات: أبجد هوز حطي كلمن صعفض قرست ثخذ ظغش۔',
    rhymeSequence: 'أَبْجَدْ هَوَّزْ حُطِّي كَلَمُنْ صَعْفَضْ قَرَسَتْ ثَخَذْ ظَغَشْ',
    keyDifferences: [
      'ص = ۶۰ (بجائے ۹۰)',
      'ض = ۹۰ (بجائے ۸۰۰)',
      'س = ۳۰۰ (بجائے ۶۰)',
      'ش = ۱۰۰۰ (بجائے ۳۰۰)',
      'ظ = ۸۰۰ (بجائے ۹۰۰)',
      'غ = ۹۰۰ (بجائے ۱۰۰۰)'
    ]
  },
  {
    id: 'saghir',
    titleArabic: 'حساب الجمل الصغير (العددي الأولي)',
    titleUrdu: 'ابجد صغیر عربی (اعدادِ وضعی و اصغر)',
    historicalContext: 'اعدادِ کبیر کو ۹ کے پیمانے پر سمیٹ کر اکائیوں میں تبدیل کرنے کا طریقہ جس سے طبعی اور عنصری جوہر ظاہر ہوتا ہے۔',
    rhymeSequence: 'ا=۱، ب=۲، ج=۳، د=۴، ہ=۵، و=۶، ز=۷، ح=۸، ط=۹، ی=۱ ... غ=۱',
    keyDifferences: [
      'دہائیوں اور سینکڑوں کے صفر گرا کر صرف اکائی (۱ تا ۹) شمار ہوتی ہے۔',
      'فوری عنصری مزاج اور باطنی کسر معلوم کرنے کے لیے اکسیر۔'
    ]
  },
  {
    id: 'waseet',
    titleArabic: 'حساب الجمل الوسيط (المسقطات)',
    titleUrdu: 'ابجد وسیط (اسقاط و درجاتِ دہائی)',
    historicalContext: 'طرحِ ۹ یا طرحِ ۱۲ کے بعد باقی ماندہ اعداد سے استخراج کا حسابی علم۔',
    rhymeSequence: 'قواعدِ اسقاط بر ۹ و ۱۲ و ۲۸',
    keyDifferences: [
      'استخراجِ بروج، موکلین اور کواکب کے طالع میں مستعمل ہے۔'
    ]
  },
  {
    id: 'malfooti',
    titleArabic: 'حساب البسط الملفوظي (بسط الحروف بأسمائها)',
    titleUrdu: 'ابجد ملفوظی (حروف کے پورے تلفظ کا بسط)',
    historicalContext: 'جب حرف کو اس کے مکمل تلفظ کے ساتھ کھولا جائے (جیسے الف = ا ل ف = ۱۱۱، میم = م ی م = ۹۰)، تو یہ اس حرف کی باطنی روح کہلاتی ہے۔',
    rhymeSequence: 'ألف (۱۱۱)، باء (۳)، جيم (۵۳)، دال (۳۵) ... غين (۱۰۶۰)',
    keyDifferences: [
      'حرف کے ظاہری جسد کے اندر موجود باطنی موکلات کو جگانے کا عظیم راز۔'
    ]
  }
];

// Presets of sacred Arabic texts
export interface ArabicSacredPreset {
  id: string;
  category: 'quran' | 'asma' | 'dua' | 'muqattaat';
  categoryUrdu: string;
  titleArabic: string;
  titleUrdu: string;
  text: string;
  significance: string;
}

export const ARABIC_SACRED_PRESETS: ArabicSacredPreset[] = [
  {
    id: 'p-basmalah',
    category: 'quran',
    categoryUrdu: 'آیاتِ قرآنیہ',
    titleArabic: 'البسملة الشريفة',
    titleUrdu: 'بسم اللہ الرحمن الرحیم',
    text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    significance: '۱۹ حروف پر مشتمل، تمام خیر و برکت کی کنجی اور شفا و کشائش کا سرچشمہ۔'
  },
  {
    id: 'p-ayat-kursi',
    category: 'quran',
    categoryUrdu: 'آیاتِ قرآنیہ',
    titleArabic: 'آية الكرسي الشريفة',
    titleUrdu: 'آیۃ الکرسی',
    text: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
    significance: 'اعظم آیاتِ قرآن، حفاظت، تسخیر اور تمام سحر و جنات کے قلع قمع کے لیے۔'
  },
  {
    id: 'p-muqattaat-1',
    category: 'muqattaat',
    categoryUrdu: 'حروفِ مقطعات',
    titleArabic: 'كهيعص حمعسق',
    titleUrdu: 'کہیعص حمعسق (اسمِ اعظمِ اعظم)',
    text: 'كهيعص حمعسق',
    significance: '۱۰ نورانی حروف جن میں تمام کائنات کے اسرار اور حاجت روائی کا قاطع راز مخفی ہے۔'
  },
  {
    id: 'p-muqattaat-2',
    category: 'muqattaat',
    categoryUrdu: 'حروفِ مقطعات',
    titleArabic: 'نص حكيم قاطع له سر',
    titleUrdu: '۱۴ حروفِ نورانیہ (نص حکیم قاطع لہ سر)',
    text: 'نص حكيم قاطع له سر',
    significance: 'قرآن کریم کے وہ ۱۴ حروف جن سے تمام مقطعات تشکیل پاتے ہیں اور جو نورانی کواکب سے وابستہ ہیں۔'
  },
  {
    id: 'p-asma-1',
    category: 'asma',
    categoryUrdu: 'اسماء الحسنیٰ',
    titleArabic: 'يا ودود يا حبيب يا جامع',
    titleUrdu: 'یا ودود یا حبیب یا جامع (الفت و محبت)',
    text: 'يَا وَدُودُ يَا حَبِيبُ يَا جَامِعُ',
    significance: 'دلوں کو الفت و موافقت میں جوڑنے اور نفرتوں کو ختم کرنے کا اکسیر عمل۔'
  },
  {
    id: 'p-asma-2',
    category: 'asma',
    categoryUrdu: 'اسماء الحسنیٰ',
    titleArabic: 'يا فتاح يا رزاق يا غني يا كريم',
    titleUrdu: 'یا فتاح یا رزاق یا غنی یا کریم (وسعتِ رزق)',
    text: 'يَا فَتَّاحُ يَا رَزَّاقُ يَا غَنِيُّ يَا كَرِيمُ',
    significance: 'بندشِ رزق کا توڑ، دولت کی فراوانی اور فقر و تنگدستی کا خاتمہ۔'
  },
  {
    id: 'p-asma-3',
    category: 'asma',
    categoryUrdu: 'اسماء الحسنیٰ',
    titleArabic: 'يا قهار يا جبار يا منتقم يا قوي',
    titleUrdu: 'یا قہار یا جبار یا منتقم یا قوی (ابطالِ سحر و غلبہ)',
    text: 'يَا قَهَّارُ يَا جَبَّارُ يَا مُنْتَقِمُ يَا قَوِيُّ',
    significance: 'دشمنوں کی زبان بندی، بدخواہوں پر غلبہ اور جادو کے اثرات کا فوری الٹاؤ۔'
  },
  {
    id: 'p-ikhlas',
    category: 'quran',
    categoryUrdu: 'آیاتِ قرآنیہ',
    titleArabic: 'سورة الإخلاص',
    titleUrdu: 'قل ہو اللہ احد',
    text: 'قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    significance: 'توحیدِ خالص، ثلثِ قرآن اور جملہ آفات و بلیات سے امان۔'
  }
];

// Clean Arabic text for Jafr computation
export function sanitizeArabicJafrText(raw: string): string {
  if (!raw) return '';
  return raw
    .trim()
    .replace(/[َُِّْٰٓـًٌٍ]/g, '') // remove Arabic harakat, tashkeel, tatweel
    .replace(/[\s\d\p{P}\p{S}]/gu, ''); // remove punctuation, spaces, symbols
}

// Compute comprehensive Arabic Abjad Analysis
export interface ArabicAbjadFullAnalysis {
  cleanedText: string;
  lettersList: string[];
  totalLettersCount: number;
  uniqueLettersCount: number;

  // Abjad Scores
  totalKabirMashriqi: number;
  totalMaghribi: number;
  totalSaghir: number;
  totalWaseet: number;
  totalMalfooti: number;
  totalAkbar: number;

  // Breakdown Table for each character
  letterBreakdown: Array<{
    char: string;
    normalizedChar: string;
    nameArabic: string;
    kabirMashriqi: number;
    maghribi: number;
    saghir: number;
    malfooti: number;
    isNoorani: boolean;
    element: 'fire' | 'earth' | 'air' | 'water';
    elementUrdu: string;
    planetUrdu: string;
    lunarMansion: string;
  }>;

  // Elemental Proportions (طبائع اربعہ)
  elementsCount: {
    fire: number;
    earth: number;
    air: number;
    water: number;
  };
  elementsAdad: {
    fire: number;
    earth: number;
    air: number;
    water: number;
  };
  dominantElement: 'fire' | 'earth' | 'air' | 'water';
  dominantElementUrdu: string;
  elementMizanSummary: string;

  // Noorani vs Zulmani Classification (نورانی بمقابلہ ظلمانی)
  nooraniCount: number;
  zulmaniCount: number;
  nooraniPercentage: number;

  // Spiritual Extractions (المستخرجات الروحانیة)
  muwakkilUlwi: string; // علوی فرشتہ (طھطائیل)
  muwakkilSifli: string; // سفلی موکل (کینطوش)
  talsamWord: string; // کلمہ طلسم
  matchingDivineNames: Array<{ name: string; adad: number; diff: number }>;
  bestPlanet: string;
  bestHour: string;
  bestDay: string;
}

// Map of 99 Divine Names with Abjad Kabir for Arabic Extractions
export const ARABIC_DIVINE_NAMES_LIST: Array<{ name: string; adad: number; urduMeaning: string }> = [
  { name: 'الله', adad: 66, urduMeaning: 'سب کا حقیقی معبود' },
  { name: 'الرحمن', adad: 298, urduMeaning: 'بے پایاں رحمت والا' },
  { name: 'الرحيم', adad: 258, urduMeaning: 'نہایت مہربان' },
  { name: 'الملك', adad: 90, urduMeaning: 'حقیقی بادشاہ' },
  { name: 'القدوس', adad: 170, urduMeaning: 'نہایت پاکیزہ' },
  { name: 'السلام', adad: 131, urduMeaning: 'سلامتی دینے والا' },
  { name: 'المؤمن', adad: 136, urduMeaning: 'امان بخشنے والا' },
  { name: 'المهيمن', adad: 145, urduMeaning: 'نگہبان' },
  { name: 'العزيز', adad: 94, urduMeaning: 'غالب و زبردست' },
  { name: 'الجبار', adad: 206, urduMeaning: 'بگڑے کام بنانے والا' },
  { name: 'المتكبر', adad: 662, urduMeaning: 'بزرگی والا' },
  { name: 'الخالق', adad: 731, urduMeaning: 'پیدا فرمانے والا' },
  { name: 'البارئ', adad: 213, urduMeaning: 'عدم سے وجود لانے والا' },
  { name: 'المصور', adad: 336, urduMeaning: 'صورت گری کرنے والا' },
  { name: 'الغفار', adad: 1281, urduMeaning: 'بخشنے والا' },
  { name: 'القهار', adad: 306, urduMeaning: 'سب پر غالب' },
  { name: 'الوهاب', adad: 14, urduMeaning: 'عطا فرمانے والا' },
  { name: 'الرزاق', adad: 308, urduMeaning: 'روزی رساں' },
  { name: 'الفتاح', adad: 489, urduMeaning: 'راہیں کھولنے والا' },
  { name: 'العليم', adad: 150, urduMeaning: 'سب کچھ جاننے والا' },
  { name: 'القابض', adad: 903, urduMeaning: 'تنگ کرنے والا' },
  { name: 'الباسط', adad: 72, urduMeaning: 'فراخی دینے والا' },
  { name: 'الرافع', adad: 351, urduMeaning: 'بلند کرنے والا' },
  { name: 'المعز', adad: 117, urduMeaning: 'عزت دینے والا' },
  { name: 'المذل', adad: 770, urduMeaning: 'رسوا کرنے والا' },
  { name: 'السميع', adad: 180, urduMeaning: 'سننے والا' },
  { name: 'البصير', adad: 302, urduMeaning: 'دیکھنے والا' },
  { name: 'الحكم', adad: 68, urduMeaning: 'فیصلہ فرمانے والا' },
  { name: 'العدل', adad: 104, urduMeaning: 'انصاف والا' },
  { name: 'اللطيف', adad: 129, urduMeaning: 'باریک بین و کرم فرما' },
  { name: 'الخبير', adad: 812, urduMeaning: 'خبردار' },
  { name: 'الحليم', adad: 88, urduMeaning: 'بردبار' },
  { name: 'العظيم', adad: 1020, urduMeaning: 'عظمت والا' },
  { name: 'الغفور', adad: 1286, urduMeaning: 'معاف فرمانے والا' },
  { name: 'الشكور', adad: 526, urduMeaning: 'قدردان' },
  { name: 'العلي', adad: 110, urduMeaning: 'عالی مرتبت' },
  { name: 'الكبير', adad: 232, urduMeaning: 'بزرگ و برتر' },
  { name: 'الحفيظ', adad: 998, urduMeaning: 'حفاظت فرمانے والا' },
  { name: 'المقيت', adad: 550, urduMeaning: 'روزی دینے والا' },
  { name: 'الحسيب', adad: 80, urduMeaning: 'حساب لینے والا' },
  { name: 'الجليل', adad: 73, urduMeaning: 'بزرگی والا' },
  { name: 'الكريم', adad: 270, urduMeaning: 'کرم فرمانے والا' },
  { name: 'الرقيب', adad: 312, urduMeaning: 'نگران' },
  { name: 'المجيب', adad: 55, urduMeaning: 'دعائیں قبول کرنے والا' },
  { name: 'الواسع', adad: 137, urduMeaning: 'وسعت والا' },
  { name: 'الحكيم', adad: 78, urduMeaning: 'حکمت والا' },
  { name: 'الودود', adad: 20, urduMeaning: 'محبت فرمانے والا' },
  { name: 'المجيد', adad: 57, urduMeaning: 'شرف والا' },
  { name: 'الباعث', adad: 573, urduMeaning: 'دوبارہ اٹھانے والا' },
  { name: 'الشهيد', adad: 319, urduMeaning: 'حاضر و ناظر' },
  { name: 'الحق', adad: 108, urduMeaning: 'سچا' },
  { name: 'الوكيل', adad: 66, urduMeaning: 'کارساز' },
  { name: 'القوي', adad: 116, urduMeaning: 'قوت والا' },
  { name: 'المتين', adad: 500, urduMeaning: 'مضبوط' },
  { name: 'الولي', adad: 46, urduMeaning: 'مددگار' },
  { name: 'الحميد', adad: 62, urduMeaning: 'تعریف والا' },
  { name: 'المحصي', adad: 148, urduMeaning: 'گننے والا' },
  { name: 'المبدئ', adad: 56, urduMeaning: 'پہلی بار پیدا کرنے والا' },
  { name: 'المعيد', adad: 124, urduMeaning: 'دوبارہ لوٹانے والا' },
  { name: 'المحيي', adad: 68, urduMeaning: 'زندہ کرنے والا' },
  { name: 'المميت', adad: 490, urduMeaning: 'موت دینے والا' },
  { name: 'الحي', adad: 18, urduMeaning: 'ہمیشہ زندہ' },
  { name: 'القيوم', adad: 156, urduMeaning: 'قائم رہنے والا' },
  { name: 'الواجد', adad: 14, urduMeaning: 'پا لینے والا' },
  { name: 'الماجد', adad: 48, urduMeaning: 'بزرگی والا' },
  { name: 'الواحد', adad: 19, urduMeaning: 'ایک' },
  { name: 'الصمد', adad: 134, urduMeaning: 'بے نیاز' },
  { name: 'القادر', adad: 305, urduMeaning: 'قدرت والا' },
  { name: 'المقتدر', adad: 744, urduMeaning: 'اقتدار والا' },
  { name: 'المقدم', adad: 184, urduMeaning: 'آگے کرنے والا' },
  { name: 'المؤخر', adad: 846, urduMeaning: 'پیچھے کرنے والا' },
  { name: 'الأول', adad: 37, urduMeaning: 'سب سے پہلا' },
  { name: 'الآخر', adad: 801, urduMeaning: 'سب کے بعد رہنے والا' },
  { name: 'الظاهر', adad: 1106, urduMeaning: 'ظاہر' },
  { name: 'الباطن', adad: 62, urduMeaning: 'پوشیدہ' },
  { name: 'الوالي', adad: 47, urduMeaning: 'والی و حاکم' },
  { name: 'المتعالي', adad: 541, urduMeaning: 'سب سے بلند' },
  { name: 'البر', adad: 202, urduMeaning: 'احسان فرمانے والا' },
  { name: 'التواب', adad: 409, urduMeaning: 'توبہ قبول کرنے والا' },
  { name: 'المنتقم', adad: 630, urduMeaning: 'بدلہ لینے والا' },
  { name: 'العفو', adad: 156, urduMeaning: 'معاف کرنے والا' },
  { name: 'الرؤوف', adad: 286, urduMeaning: 'شفقت فرمانے والا' },
  { name: 'مالك الملك', adad: 212, urduMeaning: 'حکومتوں کا مالک' },
  { name: 'ذو الجلال والإكرام', adad: 1100, urduMeaning: 'عظمت و کرم والا' },
  { name: 'المقسط', adad: 209, urduMeaning: 'عدل کرنے والا' },
  { name: 'الجامع', adad: 114, urduMeaning: 'اکٹھا کرنے والا' },
  { name: 'الغني', adad: 1060, urduMeaning: 'بے پرواہ و غنی' },
  { name: 'المغني', adad: 1100, urduMeaning: 'بے نیاز کرنے والا' },
  { name: 'المانع', adad: 161, urduMeaning: 'روکنے والا' },
  { name: 'الضار', adad: 1001, urduMeaning: 'نقصان کا مالک' },
  { name: 'النافع', adad: 201, urduMeaning: 'نفع پہنچانے والا' },
  { name: 'النور', adad: 256, urduMeaning: 'روشن کرنے والا' },
  { name: 'الهادي', adad: 20, urduMeaning: 'ہدایت دینے والا' },
  { name: 'البديع', adad: 86, urduMeaning: 'انوکھا پیدا کرنے والا' },
  { name: 'الباقي', adad: 113, urduMeaning: 'ہمیشہ رہنے والا' },
  { name: 'الوارث', adad: 707, urduMeaning: 'وارثِ حقیقی' },
  { name: 'الرشيد', adad: 514, urduMeaning: 'رہنما' },
  { name: 'الصبور', adad: 298, urduMeaning: 'صبر والا' }
];

// Helper to convert number to Arabic Letters (بسط عددی)
export function numberToArabicJafrLetters(num: number): string {
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
    { val: 1, char: 'ا' }
  ];

  for (const item of values) {
    while (remaining >= item.val) {
      result += item.char;
      remaining -= item.val;
    }
  }
  return result;
}

// Master Analysis Function for Arabic Abjad
export function computeArabicAbjad(rawText: string): ArabicAbjadFullAnalysis {
  const sanitized = sanitizeArabicJafrText(rawText);
  const chars = Array.from(sanitized);

  let totalKabir = 0;
  let totalMaghribi = 0;
  let totalSaghir = 0;
  let totalWaseet = 0;
  let totalMalfooti = 0;
  let totalAkbar = 0;

  const elementsCount = { fire: 0, earth: 0, air: 0, water: 0 };
  const elementsAdad = { fire: 0, earth: 0, air: 0, water: 0 };
  let nooraniCount = 0;

  const breakdown: ArabicAbjadFullAnalysis['letterBreakdown'] = [];

  chars.forEach(c => {
    const norm = ARABIC_NORMALIZATION_MAP[c] || c;
    const detail = ARABIC_LETTERS_MAP[norm] || ARABIC_LETTERS_DATABASE[0];

    totalKabir += detail.abjadKabirMashriqi;
    totalMaghribi += detail.abjadMaghribi;
    totalSaghir += detail.abjadSaghir;
    totalWaseet += detail.abjadWaseet;
    totalMalfooti += detail.malfootiAdad;
    totalAkbar += detail.abjadAkbar;

    elementsCount[detail.element] += 1;
    elementsAdad[detail.element] += detail.abjadKabirMashriqi;

    if (detail.isNoorani) {
      nooraniCount += 1;
    }

    breakdown.push({
      char: c,
      normalizedChar: norm,
      nameArabic: detail.nameArabic,
      kabirMashriqi: detail.abjadKabirMashriqi,
      maghribi: detail.abjadMaghribi,
      saghir: detail.abjadSaghir,
      malfooti: detail.malfootiAdad,
      isNoorani: detail.isNoorani,
      element: detail.element,
      elementUrdu: detail.elementUrdu,
      planetUrdu: detail.planetUrdu,
      lunarMansion: detail.lunarMansionName
    });
  });

  const totalChars = chars.length || 1;
  const zulmaniCount = totalChars - nooraniCount;
  const nooraniPercentage = Math.round((nooraniCount / totalChars) * 100);

  // Determine dominant element
  let dominantElement: 'fire' | 'earth' | 'air' | 'water' = 'fire';
  let maxCount = -1;
  (Object.keys(elementsCount) as Array<'fire' | 'earth' | 'air' | 'water'>).forEach(el => {
    if (elementsCount[el] > maxCount) {
      maxCount = elementsCount[el];
      dominantElement = el;
    }
  });

  const elementNamesUrdu = {
    fire: 'آتشی (حار یابس - فوری عمل، جاہ و غلبہ)',
    earth: 'خاکی (بارد یابس - استحکام، بقا و ثبات)',
    air: 'بادی / ہوائی (حار رطب - تسخیرِ قلوب و محبت)',
    water: 'آبی (بارد رطب - شفاء، وسعتِ رزق و برکت)'
  };

  const dominantElementUrdu = elementNamesUrdu[dominantElement];

  const elementMizanSummary = `آتشی: ${elementsCount.fire} (${elementsAdad.fire} عدد) | خاکی: ${elementsCount.earth} (${elementsAdad.earth} عدد) | بادی: ${elementsCount.air} (${elementsAdad.air} عدد) | آبی: ${elementsCount.water} (${elementsAdad.water} عدد)`;

  // Extractions
  const lettersFromTotal = numberToArabicJafrLetters(totalKabir || 66) || 'طھط';
  const muwakkilUlwi = `${lettersFromTotal}ائیل (الملك الروحاني العلوي)`;
  const muwakkilSifli = `${numberToArabicJafrLetters(totalSaghir * 10 + 7) || 'کین'}طوش (الخادم الأرضي)`;
  const talsamWord = `${lettersFromTotal}شلعفص`;

  // Match Divine Names closest in Adad
  const matchedDivine = ARABIC_DIVINE_NAMES_LIST
    .map(dn => ({
      name: dn.name,
      adad: dn.adad,
      diff: Math.abs(dn.adad - totalKabir)
    }))
    .sort((a, b) => a.diff - b.diff)
    .slice(0, 5);

  // Astrological correlation
  const planetAssignments = [
    { planet: 'شمس (سورج)', day: 'اتوار', hour: 'ساعتِ شمس (طلوعِ آفتاب)', reason: 'شرف و وقار' },
    { planet: 'قمر (چاند)', day: 'پیر', hour: 'ساعتِ قمر (شبِ اول یا اول ساعت)', reason: 'محبت و شفا' },
    { planet: 'مریخ', day: 'منگل', hour: 'ساعتِ مریخ', reason: 'دفاع و قہر' },
    { planet: 'عطارد', day: 'بدھ', hour: 'ساعتِ عطارد', reason: 'عقل و تجارت' },
    { planet: 'مشتری', day: 'جمعرات', hour: 'ساعتِ مشتری', reason: 'رزق و دولت' },
    { planet: 'زہرہ', day: 'جمعہ', hour: 'ساعتِ زہرہ', reason: 'الفت و کشش' },
    { planet: 'زحل', day: 'ہفتہ', hour: 'ساعتِ زحل', reason: 'حصار و بندش' }
  ];

  const planetIndex = (totalKabir || 1) % 7;
  const matchedAstrology = planetAssignments[planetIndex];

  return {
    cleanedText: sanitized,
    lettersList: chars,
    totalLettersCount: chars.length,
    uniqueLettersCount: new Set(chars).size,
    totalKabirMashriqi: totalKabir,
    totalMaghribi: totalMaghribi,
    totalSaghir: totalSaghir,
    totalWaseet: totalWaseet,
    totalMalfooti: totalMalfooti,
    totalAkbar: totalAkbar,
    letterBreakdown: breakdown,
    elementsCount,
    elementsAdad,
    dominantElement,
    dominantElementUrdu,
    elementMizanSummary,
    nooraniCount,
    zulmaniCount,
    nooraniPercentage,
    muwakkilUlwi,
    muwakkilSifli,
    talsamWord,
    matchingDivineNames: matchedDivine,
    bestPlanet: matchedAstrology.planet,
    bestHour: matchedAstrology.hour,
    bestDay: matchedAstrology.day
  };
}
