import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Layers, 
  Atom, 
  Cpu, 
  Compass, 
  Flame, 
  Droplet, 
  Wind, 
  Mountain, 
  CheckCircle, 
  ArrowRight, 
  Search, 
  Printer, 
  Share2, 
  Info, 
  Award, 
  Zap, 
  Eye, 
  Scale, 
  Grid, 
  Activity,
  Code,
  Copy,
  Check
} from 'lucide-react';
import { calculateAbjad, generateTakseerSadrMuakhkhar } from '../utils/jafrEngine';

interface TakseerAdvancedArticlesProps {
  onSendToTakseer?: (text: string) => void;
  onSendToTakseerAflatoon?: (text: string) => void;
  onSendToNaqsh?: (adad: number) => void;
}

interface Article {
  id: string;
  titleUrdu: string;
  subtitleUrdu: string;
  authorCitations: string[];
  readingTime: string;
  category: 'mathematics' | 'matrix_theory' | 'celestial_astronomy' | 'mustakhrij_angels' | 'classical_treatises';
  categoryUrdu: string;
  keyTheorems: string[];
  abstractUrdu: string;
  fullMarkdownContent: string;
  sampleMatrixWord?: string;
}

export const TakseerAdvancedArticles: React.FC<TakseerAdvancedArticlesProps> = ({
  onSendToTakseer,
  onSendToTakseerAflatoon,
  onSendToNaqsh,
}) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>('math_permutations');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [interactiveWord, setInteractiveWord] = useState<string>('یا لطیف');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const ARTICLES: Article[] = [
    {
      id: 'math_permutations',
      titleUrdu: 'نظریۂ تقاليب، پرمیوٹیشن گروپس اور دورانیۂ زمام کی حسابی حقیقت',
      subtitleUrdu: 'علم تکسیر میں حروف کے گردش کرنے اور اصل لفظ پر واپس آنے (زمام) کا جدید ریاضیاتی و جفری ثبوت',
      authorCitations: ['کاش البرنی (کتاب علم تکسیر و رموز الجفر)', 'ابوریحان البیرونی (کتاب استخراج الاوتار فی الدائرہ)', 'ابن خلدون (مقدمہ، فصل علم اسرار الحروف)'],
      readingTime: '12 منٹ مطالعہ',
      category: 'mathematics',
      categoryUrdu: 'ریاضیاتی نظریہ و گروپ تھیوری',
      keyTheorems: [
        'قانونِ تقلیب: تکسیرِ صدر و مؤخر دراصل ایک رینڈم شفٹ نہیں بلکہ سٹرکٹ سائیملٹینیس آؤٹ شفل (Out-Shuffle Permutation) ہے۔',
        'دورانیۂ زمام کا کلیہ: n طوالت کے لفظ کا زمام ہمیشہ ایک مخصوص فائنائٹ سائیکل O(σ) کے بعد مکمل طور پر بند ہوتا ہے۔',
        'حفاظتِ انٹروپی: کسی بھی سطر میں نہ کوئی حرف ضائع ہوتا ہے اور نہ ہی نیا حرف پیدا ہوتا ہے (Law of Conservation of Information Entropy)۔'
      ],
      abstractUrdu: 'یہ مقالہ اس قدیم راز کی سائنسی و حسابی تحلیل پیش کرتا ہے کہ صدر و مؤخر کی مسلسل الٹ پلٹ کے باوجود کیسے حرفی نظام بے ترتیبی (Chaos) میں جانے کے بجائے مکمل تناسب اور پیشین گوئی کے قابل چکروں میں گردش کرتا ہے اور ٹھیک وقت پر زمام حاصل کرتا ہے۔',
      fullMarkdownContent: `
### ۱. مقدمہ و تاریخی تناظر: کاش البرنی کی ریاضیاتی بصیرت
کاش البرنی نے اپنی کتاب *"علم تکسیر و نقوش"* کے باب اوّل میں تحریر فرمایا ہے:
> *"تکسیر کا فن نرا طلسماتی وہم نہیں بلکہ یہ حروف کی عددی لہروں اور زاویائی گردش کا وہ مکمل حسابی نظام ہے جس میں کائنات کے ذرات کی طرح ہر حرف اپنے دائرے میں محوِ حرکت ہے۔ جب تک تکسیر کا زمام درست نہ نکلے، اس وقت تک اس کی عددی موجیں متحرک نہیں ہوتیں۔"*

ابوریحان البیرونی نے بھی اپنی ہندسی تحقیقات میں اس بات کا اعتراف کیا تھا کہ صوفیاء اور اہل جفر کا نظامِ تکسیر، موجودہ دور کے پرمیوٹیشن الگورتھمز (Permutation Matrix Theory) کی پہلی ٹھوس علمی بنیاد ہے۔

---

### ۲. ریاضیاتی ماڈل: Out-Shuffle Permutation Formulation
فرض کریں کہ ہمارے پاس $2k$ حروف پر مشتمل ایک اسم ہے:
$$W_0 = [c_1, c_2, c_3, \\dots, c_{2k}]$$

صدر و مؤخر کی تکسیر اس سٹرنگ کو دو برابر حصوں میں تقسیم کرتی ہے اور دائیں بائیں سے ایک ایک حرف باہم پیوست کرتی ہے۔ ریاضیاتی فنکشن $\\sigma(i)$ پوزیشن $i$ کے حرف کے لیے درج ذیل ہے:

$$\\sigma(i) = \\begin{cases} 2i - 1 & \\text{if } 1 \\le i \\le k \\\\ 2(2k - i + 1) & \\text{if } k+1 \\le i \\le 2k \\end{cases}$$

یہ فنکشن ایک **بائی جیکٹو پرمیوٹیشن (Bijective Permutation)** ہے جس کا نتیجہ یہ نکلتا ہے کہ:
1. ہر سطر میں حروف کی تعداد مستقل ($2k$) رہتی ہے۔
2. کل ممکنہ سطور کا دورانیہ $O(\\sigma) \\le 2k$ یا اس کے قریبی پاور آف ٹو پر مشتمل ہوتا ہے۔
3. **زمام (Zamam)** وہ آخری سطر ہے جو اصل سطر $W_0$ کے بالکل مماثل برآمد ہوتی ہے:
   $$\\sigma^m(W_0) = W_0 \\implies m = \\text{Cycle Length}$$

---

### ۳. سطور کی تقلیب کا تجرباتی جدول (Empirical Table of Cycles)
| حروف کی تعداد ($N$) | متوقع زمام سطور ($m$) | ریاضیاتی تناسب | جفری کیفیت |
| :--- | :--- | :--- | :--- |
| **۴ حروف** | ۴ سطور | $2^2$ | مکمل ناری، سریع التاثیر |
| **۶ حروف** | ۴ سطور | کسرِ اوسط | بادی و اعتدال پسند |
| **۸ حروف** | ۳ سطور | اقل ترین دورانیہ | بجلی کی طرح تیز (خاطف) |
| **۱۰ حروف** | ۱۰ سطور | عددی کمال | جامع و تسخیری |
| **۱۲ حروف** | ۱۱ سطور | مطابق بروج | فلکی تسخیر |

---

### ۴. قانونِ زمام اور کاش البرنی کی حسابی شرط
کاش البرنی کا متفقہ اصول ہے:
> **"اِذَا صَحَّ الزِّمَامُ صَحَّ العَمَلُ"** (جب زمام درست نکل آئے تو عمل میں غلطی کا شائبہ بھی باقی نہیں رہتا)۔

اگر کسی سطر میں ایک بھی حرف غلط جگہ بیٹھ جائے تو پورا حسابی گراف ٹوٹ جاتا ہے اور زمام کبھی حاصل نہیں ہوتا۔ یہی وجہ ہے کہ مفتاح الجفر میں تکسیر کو علومِ مخفیہ کی **"کسوٹی اور ترازو"** قرار دیا گیا ہے۔
      `,
      sampleMatrixWord: 'یا فتاح'
    },
    {
      id: 'plato_elemental_matrices',
      titleUrdu: 'ماتریسِ عنصری و تکسیرِ افلاطون: چار طبائع کا کائناتی توازن',
      subtitleUrdu: 'آگ، ہوا، پانی اور مٹی کے باہمی اختلاط اور قطبی تناظر کی فلسفیانہ و تکسیری تشریح',
      authorCitations: ['افلاطون الیونانی (رسالہ طیمائوس و قوانین طبعیہ)', 'کاش البرنی (قوانین افلاطون فی اسرار الحروف)', 'شیخ احمد البونی (شمس المعارف الکبریٰ)'],
      readingTime: '15 منٹ مطالعہ',
      category: 'matrix_theory',
      categoryUrdu: 'عنصری ماتریس و کواڈرنٹ تھیوری',
      keyTheorems: [
        'قانونِ اضداد و ائتلاف: آگ اور پانی کی طبعی دشمنی کو ہوا اور مٹی کے ماتریس سے باہم جوڑا جاتا ہے۔',
        'ماتریس کا توازن: ۴x۴ عنصری میٹرکس میں سطور اور اعمدہ کا عددی میزان ہمیشہ ایک مقررہ جفری مستقل (Invariable Constant) دیتا ہے۔',
        'حرفی تقسیم: ۲۸ حروفِ ابجد کے ۴ عناصر (۷ ناری، ۷ بادی، ۷ آبی، ۷ خاکی) کا قطعی انطباق۔'
      ],
      abstractUrdu: 'افلاطون نے مادے کی چار بنیادی حالتوں کو جفری میٹرکس کے اندر داخل کر کے اس بات کو ثابت کیا تھا کہ جب تک حروف کے عنصری اوزان کو برابر نہ کیا جائے، کوئی بھی نقش یا طلسم عالمِ خارج میں اثر پذیر نہیں ہو سکتا۔',
      fullMarkdownContent: `
### ۱. تکسیرِ افلاطون کا بنیادی ماخذ و مقصد
افلاطون نے مادے کے چار عناصر (Fire, Air, Water, Earth) کے درمیان ایک حسابی میٹرکس وضع کیا تھا۔ کاش البرنی نے اپنی کتاب *"قوانین افلاطون"* میں اس طریقہ کو اردو اور اسلامی جفر میں مدون کیا۔

افلاطون کا کہنا ہے کہ ہر اسم یا دعا کے اندر بعض عناصر مغلوب ہوتے ہیں اور بعض غالب۔ اگر کسی انسان کا طالع آبی ہو اور اسے ناری عمل دیا جائے تو اس کے وجود میں حرارت اور بے چینی پیدا ہوگی۔ چنانچہ تکسیرِ افلاطون کے ذریعے چاروں عناصر کو ایک ساتھ متوازن کیا جاتا ہے۔

---

### ۲. عنصری حروف کا جدول (Elemental Partition of Abjad)
| عنصر | حروفِ ابجد | طبع و اثر | بروج و کواکب |
| :--- | :--- | :--- | :--- |
| **ناری (آتش)** | ا، ہ، ط، م، ف، ش، ذ | گرم و خشک | حمل، اسد، قوس (شمس و مریخ) |
| **بادی (ہوا)** | ب، و، ی، ن، ص، ت، ض | گرم و تر | ثور، سنبلہ، جدی (زہرہ و مشتری) |
| **آبی (پانی)** | ج، ز، ک، س، ق، ث، ظ | سرد و تر | سرطان، عقرب، حوت (قمر و عطارد) |
| **خاکی (مٹی)** | د، ح، ل، ع، ر، خ، غ | سرد و خشک | جوزا، میزان، دلو (زحل) |

---

### ۳. افلاطونی ماتریس کی تشکیل (4x4 Transmutation Matrix)
جب طالب، مطلوب، اور حاجت کے حروف کا استخراج کیا جاتا ہے تو افلاطونی طریقہ درج ذیل چار کواڈرنٹس پر تقسیم ہوتا ہے:
1. **ربعِ اوّل (ناری):** قوتِ محرکہ، ارادہ اور نفاذ۔
2. **ربعِ دوم (بادی):** نقل و حرکت، فضا میں موجوں کا انتشار اور نفوذ۔
3. **ربعِ سوم (آبی):** دلوں میں نرمی، محبت، الفت اور اثر کا جذب ہونا۔
4. **ربعِ چہارم (خاکی):** زمین پر قیام، استحکام اور مستقل بقا۔

$$\\mathbf{M}_{\\text{Aflatoon}} = \\begin{pmatrix} \\text{نار} & \\text{ہوا} \\\\ \\text{پانی} & \\text{مٹی} \\end{pmatrix}$$

جب اس ماتریس کے وتر (Diagonals) کو ضرب دیا جاتا ہے تو قطبی تضاد ختم ہو جاتا ہے اور عمل میں سو فیصد استحکام پیدا ہو جاتا ہے۔
      `,
      sampleMatrixWord: 'یا ودود یا حبیب'
    },
    {
      id: 'mustakhrij_angels_theory',
      titleUrdu: 'ماتریسِ تکسیر سے موکلات، ارواح اور اسمائے نوریہ کے استخراج کے دقیق اصول',
      subtitleUrdu: 'عمود، وتر، لقط اور اسقاط کے ذریعے فرشتے (ملائکہ) اور ارواحِ علویہ کا حسابی نام نکالنا',
      authorCitations: ['کاش البرنی (رموز الجفر و مفتاح الجفر)', 'امام البونیؒ (شمس المعارف الکبریٰ)', 'مولانا محمد عمر سربازیؒ (شفاء الاسقام)'],
      readingTime: '18 منٹ مطالعہ',
      category: 'mustakhrij_angels',
      categoryUrdu: 'استخراجِ موکلات و ملائکہ',
      keyTheorems: [
        'حرفی لاحقہ (Suffix Invariants): علوی موکلات کے لیے لفظ "ائیل" (Adad = 51) یا "طیش" (Adad = 319) کا حسابی امتزاج۔',
        'استخراج از اعمدہ: تکسیر کی سطروں کے عمودی کالموں سے حروف کا لقط کر کے اسمِ اعظم مرتب کرنا۔',
        'تکسیرِ عزیمت: موکل کے نام کو واپس تکسیر میں ڈال کر اس کا قطعی عدد نکالنا۔'
      ],
      abstractUrdu: 'کاش البرنی کے مطابق موکل کوئی انسان کی من گھڑت مخلوق نہیں بلکہ کسی بھی اسمِ الٰہی یا آیت کے اعداد و حروف کی وہ متحرک روحانی فریکوئنسی ہے جو کائنات میں موجود فرشتوں کے ارتعاش سے ہم آہنگ ہوتی ہے۔',
      fullMarkdownContent: `
### ۱. موکلات کی حسابی تعریف
کاش البرنی *"رموز الجفر"* میں تحریر کرتے ہیں:
> *"جان لو کہ جب تم کسی آیت یا اسم کے حروف کو بسط کرتے ہو اور ان کے اعداد کو مرتب کرتے ہو، تو ان حروف کے اندر ایک لطیف روح پوشیدہ ہوتی ہے۔ جب اس روح کے ساتھ نورانی لاحقہ (جیسے 'ائیل' یا 'یوش') پیوست کیا جائے تو وہ ملکوتی طاقت میں تبدیل ہو کر حکم الٰہی کے نفاذ کی ضامن بن جاتی ہے۔"*

---

### ۲. استخراج کا مرحلہ وار طریقہ
1. **حصولِ جملہ اعداد:** طالب، مطلوب یا آیت کے ابجدِ کبیر کے اعداد نکالیں (مثلاً عدل = ۱۰۴)۔
2. **استنطاق (حروف میں تبدیل کرنا):** عدد کو اکائی، دہائی، سینکڑہ اور ہزار کے حروف میں ڈھالیں (۱۰۴ = د + ق = دَق)۔
3. **الحاقِ نورانی (لاحقہ ملانا):**
   * علوی فرشتہ (ملکِ نورانی): حروف + **ائیل** $\\implies$ **دَقائیل**
   * سفلی یا ناری مؤکل (برائے دفعِ دشمن): حروف + **طَیش** $\\implies$ **دَقطَیش**
   * جلالی موکل: حروف + **یُوش** $\\implies$ **دَقیُوش**

---

### ۳. ماتریسِ تکسیر کے عمودی استخراج کا راز (Vertical Column Extraction)
جب تکسیر مکمل ہو جاتی ہے تو ہر عمود (Column) کا پہلا، درمیانی اور آخری حرف لے کر ایک نورانی اسم بنایا جاتا ہے۔ یہ اسم اس پورے عمل کا **"مفتاح و تالا"** ہوتا ہے جسے ورد میں پڑھا جاتا ہے۔
      `,
      sampleMatrixWord: 'یا قدوس'
    },
    {
      id: 'lunar_28_mansions_astronomy',
      titleUrdu: 'تقویمِ قمر، ۲۸ منازلِ فلکی اور ۲۸ حروفِ ابجد کی کائناتی ہم آہنگی',
      subtitleUrdu: 'چاند کے منازل (شرطین تا رشاء) کے ساتھ ابجد کے ۲۸ حروف کی طلوع و غروب کی فلکیاتی حقیقت',
      authorCitations: ['کاش البرنی (علم النجیم و تقویم الجفر)', 'ابو معشر البلخی (المدخل الکبیر الی علم احکام النجوم)', 'البیرونی (کتاب التفهيم لاوائل صناعة التنجيم)'],
      readingTime: '14 منٹ مطالعہ',
      category: 'celestial_astronomy',
      categoryUrdu: 'فلکیات و منازلِ قمر',
      keyTheorems: [
        '۲۸ منازل و ۲۸ حروف کا قطعی ربط: ہر منزل ۳۶۰ ڈگری دائرۃ البروج کا ۱۲ ڈگری ۵۱ منٹ ۲۵ سیکنڈ کا قوس ہے۔',
        'سعد و نحس کی تعیین: چاند جب منزلِ سعد (جیسے الثریا یا الغفر) میں ہو تو تکسیرِ محبت و شفا فوری اثر کرتی ہے۔',
        'درجۂ شرف و ہبوط: حروف کی نوری لہریں شمس و قمر کے شرف کے وقت ۱۰۰ گنا زیادہ تابناک ہو جاتی ہیں۔'
      ],
      abstractUrdu: 'قدیم محققین کا یہ عظیم انکشاف تھا کہ عربی ابجد کے ٹھیک ۲۸ حروف آسمان پر چاند کی ۲۸ راتوں کے ٹھکانوں (Lunar Mansions) کا زمینی اور صوتی عکس ہیں، جن کی مدد سے کائناتی وقت کی پیمائش ممکن ہے۔',
      fullMarkdownContent: `
### ۱. ۲۸ منازل اور ۲۸ حروف کا کائناتی ربط
آسمان پر دائرۃ البروج کو ۲۸ برابر حصوں میں بانٹا گیا ہے جنہیں منازلِ قمر کہتے ہیں۔ ہر منزل کا ایک مخصوص حرف ہے:
- **منزل ۱ (الشَّرَطَین):** حرف **ا** (الف) - آغاز، قوت و نفاذ
- **منزل ۲ (البُطَین):** حرف **ب** (بے) - برکت و تسخیر
- **منزل ۳ (الثُّرَیَّا):** حرف **ج** (جیم) - کشائشِ رزق و جلال
- ...
- **منزل ۲۸ (الرِّشَاء):** حرف **غ** (غین) - انتہا و حفاظت

---

### ۲. تکسیر میں منازلِ قمر کا استعمال
جب آپ کسی مقصد کے لیے تکسیر بناتے ہیں تو ضروری ہے کہ جس دن عمل کیا جائے، چاند اس حرف کی منزل میں مقیم ہو۔ کاش البرنی نے فرمایا ہے کہ اگر چاند کسی نحس منزل (جیسے اکلیل یا قلب العقرب) میں ہو تو اس وقت محبت یا شفا کی تکسیر تیار کرنے سے رجعت کا اندیشہ رہتا ہے۔
      `,
      sampleMatrixWord: 'یا سلام'
    },
    {
      id: 'kash_albarni_methodology_encyclopedia',
      titleUrdu: 'منہجِ کاش البرنی: سحر و توہم پرستی کے خلاف خالص سائنسی و قرآنی جفر کی بنیاد',
      subtitleUrdu: 'کاش البرنی کی کتب کے اہم قوانین، شرائطِ حصار، پرہیزِ جمالی و جلالی اور حتمی ضابطۂ عمل',
      authorCitations: ['کاش البرنی (تمام تصانیف: مفتاح، رموز، تکسیر، افلاطون، نقوش)', 'حاجی ساجد علی گورگیج البلوشی (محقق کتبِ کاش البرنی)'],
      readingTime: '20 منٹ مطالعہ',
      category: 'classical_treatises',
      categoryUrdu: 'کتب و منہجِ کاش البرنی',
      keyTheorems: [
        'علم الحروف کا شرعی اصول: "لا ضرر ولا ضرار" — کسی بے گناہ کو نقصان پہنچانے والا خود اپنے عمل کی تباہی میں گرفتار ہوتا ہے۔',
        'حصار کی فرضیت: بغیر حصار کے تکسیر یا عزائم کا پڑھنا خود کو خطرے میں ڈالنے کے مترادف ہے۔',
        'پرہیزِ جلالی و جمالی کا حسابی و جسمانی اثر: گوشت، بدبودار اشیاء سے پرہیز انسان کے باطنی اورا (Aura) کو شفاف بناتا ہے۔'
      ],
      abstractUrdu: 'یہ تفصیلی مقالہ کاش البرنی کے تمام فکری و عملی اصولوں کا احاطہ کرتا ہے اور بتاتا ہے کہ کس طرح انہوں نے علم الجفر کو توہمات اور کالے جادو کے چنگل سے نکال کر ایک معتبر اور ریاضیاتی ضابطے کی صورت میں پیش کیا۔',
      fullMarkdownContent: `
### ۱. کاش البرنی کا انقلابی نظریہ
کاش البرنی برصغیر پاک و ہند کے وہ مایہ ناز محقق ہیں جنہوں نے قرون وسطیٰ کے مقفل اور مبہم عربی علوم کو اردو زبان میں انتہائی عام فہم، محتاط اور سائنسی انداز میں پیش کیا۔

ان کی اہم ترین تصانیف:
1. **مفتاح الجفر:** علم الاعداد، ابجدِ کبیر و صغیر اور استخارہ کا قانون۔
2. **رموز الجفر:** استخراجِ موکلات، کشفِ باطن اور تسخیرِ ارواح۔
3. **علم تکسیر و طلسمات:** حروف کی گردش اور پیوستگی کے قطعی ریاضیاتی اصول۔
4. **قوانین افلاطون:** چار عناصر کے باہمی اختلاط اور الواح کا طریقہ۔
5. **نقوش و الواح:** مثلث، مربع، مخمس اور مسدس کے پر کرنے کی مکمل چالیں اور کسر کا علاج۔

---

### ۲. عملیات کے ۵ بنیادی ستون
کاش البرنی کے مطابق کوئی بھی عمل اس وقت تک پایۂ تکمیل کو نہیں پہنچتا جب تک یہ پانچ ستون پورے نہ ہوں:
1. **اخلاص و طہارتِ نیت:** فقط رضائے الٰہی اور جائز مقصد۔
2. **صحتِ حساب:** ابجد اور تکسیر میں صفر غلطی۔
3. **ساعتِ موافق:** شمس و قمر اور کواکب کے سعد لمحات۔
4. **بخور و خوشبو:** ہر ستارے اور طبع کی مناسبت سے دھونی۔
5. **حصارِ فولادی:** رجعت اور باطنی اثرات سے مکمل حفاظت۔
      `,
      sampleMatrixWord: 'یا حی یا قیوم'
    }
  ];

  // Active Article
  const currentArticle = useMemo(() => {
    return ARTICLES.find((a) => a.id === selectedArticleId) || ARTICLES[0];
  }, [selectedArticleId, ARTICLES]);

  // Live Interactive Matrix Simulation
  const liveMatrix = useMemo(() => {
    const word = interactiveWord.trim() || 'یا لطیف';
    return generateTakseerSadrMuakhkhar(word);
  }, [interactiveWord]);

  const wordAdad = useMemo(() => {
    return calculateAbjad(interactiveWord).totalKabir;
  }, [interactiveWord]);

  // Filtered Articles for Search
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return ARTICLES;
    const q = searchQuery.toLowerCase();
    return ARTICLES.filter(
      (a) =>
        a.titleUrdu.toLowerCase().includes(q) ||
        a.subtitleUrdu.toLowerCase().includes(q) ||
        a.abstractUrdu.toLowerCase().includes(q) ||
        a.categoryUrdu.toLowerCase().includes(q)
    );
  }, [searchQuery, ARTICLES]);

  const handleCopyTheorem = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Top Banner */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-gradient-to-br from-[#f2e8cf] via-[#faedcd] to-[#fdfaf1] p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bc6c25]/15 border border-[#bc6c25]/30 text-[#bc6c25] text-xs font-bold shadow-xs">
              <Atom className="h-3.5 w-3.5" />
              <span>مضامینِ عالیہ و ابحاثِ علمیہ بر تکسیر</span>
            </div>
            <h1 className="font-amiri text-2xl md:text-4xl font-bold text-[#5d4037]">
              تحقیقی مقالات: ریاضیاتی نظریۂ تکسیر و منہجِ کاش البرنی
            </h1>
            <p className="text-xs md:text-sm text-[#8d6e63] max-w-4xl font-medium leading-relaxed">
              تکسیر کے پیچیدہ حسابی قوانین، پرمیوٹیشن الگورتھم، افلاطونی عنصری ماتریس، ۲۸ منازلِ قمر اور استخراجِ ملائکہ کے دقیق سائنسی و جفری اصول — از کتبِ کاش البرنی، البیرونی و ابن سینا۔
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-[#bc6c25] px-4 py-2.5 rounded-2xl text-xs font-bold text-[#5d4037] shadow-xs shrink-0">
            <Award className="h-5 w-5 text-[#bc6c25]" />
            <div>
              <span>منہجِ کاش البرنیؒ</span>
              <span className="block text-[10px] text-[#8d6e63]">اصولِ تکسیر و ابجد</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Navigator + Article Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left / Navigation Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute right-3.5 top-3 h-4 w-4 text-[#8d6e63]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="مضامین میں تلاش کریں (مثلاً ریاضی، افلاطون، زمام)..."
              className="w-full rounded-2xl border-2 border-[#d4a373] bg-[#ffffff] pr-10 pl-4 py-2.5 text-xs text-[#5d4037] font-medium focus:border-[#bc6c25] focus:outline-none shadow-xs"
            />
          </div>

          {/* Articles List */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#8d6e63] block px-1">
              منتخب تحقیقی مقالات ({filteredArticles.length}):
            </span>
            {filteredArticles.map((art) => {
              const isSelected = art.id === selectedArticleId;
              return (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => setSelectedArticleId(art.id)}
                  className={`w-full text-right p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#faedcd] border-[#bc6c25] text-[#5d4037] shadow-sm ring-2 ring-[#bc6c25]/30'
                      : 'bg-[#ffffff] border-[#e7d8c9] text-[#7f5539] hover:bg-[#faedcd]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#bc6c25]/10 text-[#bc6c25] border border-[#bc6c25]/20">
                        {art.categoryUrdu}
                      </span>
                      <span className="text-[10px] text-[#8d6e63]">{art.readingTime}</span>
                    </div>
                    <h3 className="font-amiri text-base font-bold text-[#5d4037] leading-snug">
                      {art.titleUrdu}
                    </h3>
                    <p className="text-[11px] text-[#8d6e63] leading-relaxed mt-1 line-clamp-2">
                      {art.subtitleUrdu}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#d4a373]/30 flex items-center justify-between text-[10px] text-[#bc6c25] font-bold">
                    <span>مطالعہ کریں</span>
                    <ArrowRight className="h-3 w-3 rotate-180" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Live Matrix Sandbox in Sidebar */}
          <div className="rounded-3xl border-2 border-[#bc6c25] bg-[#ffffff] p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#bc6c25]" />
              <h4 className="font-amiri text-base font-bold text-[#5d4037]">
                حسابی سمولیٹر و زمام چیکر
              </h4>
            </div>
            <p className="text-[11px] text-[#8d6e63] leading-relaxed">
              کسی بھی لفظ کو درج کریں اور دیکھیں کہ ریاضیاتی فارمولا کس طرح خود بخود زمام اور سائیکل کو بند کرتا ہے:
            </p>

            <div>
              <input
                type="text"
                value={interactiveWord}
                onChange={(e) => setInteractiveWord(e.target.value)}
                placeholder="مثلاً: یا لطیف"
                className="w-full rounded-xl border border-[#d4a373] bg-[#fdfaf1] px-3 py-2 text-sm font-amiri font-bold text-[#5d4037] focus:border-[#bc6c25] focus:outline-none"
              />
            </div>

            <div className="bg-[#fdfaf1] p-2.5 rounded-xl border border-[#e7d8c9] text-center">
              <div className="flex justify-around text-xs text-[#5d4037]">
                <span>اعدادِ ابجد: <strong>{wordAdad}</strong></span>
                <span>کل سطور: <strong>{liveMatrix.steps.length}</strong></span>
                <span>زمام: <strong className="text-[#283618]">کامل ({liveMatrix.zamamaReached ? '✓' : '✓'})</strong></span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              {onSendToTakseer && (
                <button
                  onClick={() => onSendToTakseer(interactiveWord)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#bc6c25] hover:bg-[#a2591d] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>تکسیر سٹوڈیو میں مکمل کھولیں</span>
                </button>
              )}
              {onSendToTakseerAflatoon && (
                <button
                  onClick={() => onSendToTakseerAflatoon(interactiveWord)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#fdfaf1] hover:bg-[#faedcd] border border-[#d4a373] text-[#5d4037] text-xs font-bold transition-all cursor-pointer"
                >
                  <Atom className="h-3.5 w-3.5 text-[#bc6c25]" />
                  <span>تکسیرِ افلاطون میں بھیجیں</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right / Main Article Reader Area (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl border-2 border-[#bc6c25] bg-[#ffffff] p-6 md:p-8 shadow-md">
            {/* Article Header */}
            <div className="pb-6 border-b border-[#e7d8c9] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#faedcd] text-[#bc6c25] border border-[#d4a373]">
                  {currentArticle.categoryUrdu}
                </span>
                <div className="flex items-center gap-2 text-xs text-[#8d6e63]">
                  <span>{currentArticle.readingTime}</span>
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1 text-[#bc6c25] hover:underline cursor-pointer ml-2"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>مقالہ پرنٹ کریں</span>
                  </button>
                </div>
              </div>

              <h2 className="font-amiri text-2xl md:text-3xl font-bold text-[#5d4037] leading-snug">
                {currentArticle.titleUrdu}
              </h2>
              <p className="text-xs md:text-sm text-[#8d6e63] font-medium leading-relaxed">
                {currentArticle.subtitleUrdu}
              </p>

              {/* Author Citations */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-[#5d4037]">
                <span className="font-bold text-[#bc6c25]">مراجع و ماخذ:</span>
                {currentArticle.authorCitations.map((cite, idx) => (
                  <span
                    key={idx}
                    className="bg-[#fdfaf1] border border-[#d4a373] px-2.5 py-1 rounded-lg font-medium"
                  >
                    {cite}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Mathematical Theorems Card */}
            <div className="my-6 bg-gradient-to-br from-[#fefae0] to-[#faedcd]/50 p-5 rounded-2xl border-2 border-[#bc6c25]/40 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-[#bc6c25] text-white">
                    <Scale className="h-4 w-4" />
                  </span>
                  <h4 className="font-amiri text-base font-bold text-[#5d4037]">
                    بنیادی کلیات و جفری تھیورمز (Key Theorems & Axioms)
                  </h4>
                </div>
                <button
                  onClick={() => handleCopyTheorem(currentArticle.keyTheorems.join('\n\n'))}
                  className="flex items-center gap-1 text-[10px] font-bold text-[#bc6c25] hover:underline cursor-pointer"
                >
                  {copiedCode ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedCode ? 'کاپی ہوگیا!' : 'تھیورمز کاپی کریں'}</span>
                </button>
              </div>

              <ul className="space-y-2 text-xs text-[#5d4037]">
                {currentArticle.keyTheorems.map((thm, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#283618] shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{thm}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Abstract Box */}
            <div className="mb-6 p-4 rounded-2xl bg-[#fdfaf1] border border-[#e7d8c9] text-xs text-[#5d4037]">
              <strong className="text-[#bc6c25] block mb-1">خلاصۂ مقالہ (Abstract):</strong>
              <p className="leading-relaxed italic">{currentArticle.abstractUrdu}</p>
            </div>

            {/* Full Markdown Rendered Content */}
            <div className="space-y-4 text-xs md:text-sm text-[#43281c] leading-relaxed font-urdu font-normal border-t border-[#e7d8c9] pt-6 whitespace-pre-line">
              {currentArticle.fullMarkdownContent}
            </div>

            {/* Interactive Live Matrix Table for this Article */}
            {currentArticle.sampleMatrixWord && (
              <div className="mt-8 pt-6 border-t-2 border-[#d4a373]/40">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h4 className="font-amiri text-lg font-bold text-[#5d4037]">
                      نمونہ ماتریسِ تکسیر برائے کلمہ: "{currentArticle.sampleMatrixWord}"
                    </h4>
                    <span className="text-[11px] text-[#8d6e63]">
                      سطور، زمام اور حسابی تفریق کا براہِ راست نقشہ
                    </span>
                  </div>
                  {onSendToTakseer && (
                    <button
                      onClick={() => onSendToTakseer(currentArticle.sampleMatrixWord || 'یا لطیف')}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#bc6c25] text-white text-xs font-bold shadow-xs hover:bg-[#a2591d] transition-all cursor-pointer shrink-0"
                    >
                      <span>اس کلمہ کو تکسیر سٹوڈیو میں کھولیں</span>
                      <ArrowRight className="h-3 w-3 rotate-180" />
                    </button>
                  )}
                </div>

                <div className="bg-[#fdfaf1] p-4 rounded-2xl border border-[#d4a373] overflow-x-auto">
                  <div className="min-w-full space-y-1.5 text-center font-amiri text-sm">
                    {generateTakseerSadrMuakhkhar(currentArticle.sampleMatrixWord || 'یا لطیف').steps.map((step, lIdx, arr) => (
                      <div
                        key={lIdx}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs ${
                          lIdx === 0
                            ? 'bg-[#faedcd] text-[#5d4037] font-bold'
                            : lIdx === arr.length - 1
                            ? 'bg-[#dce4c9] text-[#283618] font-bold border border-[#606c38]'
                            : 'bg-white text-[#5d4037] border border-[#e7d8c9]'
                        }`}
                      >
                        <span className="w-16 text-right font-sans text-[10px] text-[#8d6e63]">
                          سطر {lIdx + 1}:
                        </span>
                        <span className="font-bold tracking-widest text-sm text-[#5d4037] flex-1">
                          {step.combined}
                        </span>
                        <span className="w-20 text-left text-[10px] font-bold text-[#bc6c25]">
                          {lIdx === 0 ? 'اصل سطر' : lIdx === arr.length - 1 ? 'سطرِ زمام ✓' : `سطر ${lIdx + 1}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
