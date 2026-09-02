import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  Sparkles, 
  Compass, 
  Flame, 
  Shield, 
  Clock, 
  Award, 
  Heart, 
  Eye, 
  HelpCircle, 
  Layers, 
  Activity, 
  Cpu, 
  UserCheck, 
  Dices, 
  Sun, 
  Moon, 
  HeartPulse, 
  Feather, 
  Atom, 
  Smartphone, 
  ShieldCheck, 
  ChevronRight,
  Zap,
  Bookmark
} from 'lucide-react';

export interface SearchResultItem {
  id: string;
  tabId: string;
  titleUrdu: string;
  categoryUrdu: string;
  categoryType: 'amulet' | 'book' | 'calc' | 'astronomy' | 'diagnosis' | 'operation';
  descriptionUrdu: string;
  keywords: string[];
  sourceBook?: string;
}

export const GLOBAL_SEARCH_INDEX: SearchResultItem[] = [
  // Planetary Loh & Saat
  {
    id: 'search-planetary-loh-shams',
    tabId: 'planetary-loh',
    titleUrdu: 'لوحِ شمسِ معظم (عزت، جاہ و منصب و تسخیرِ حکام)',
    categoryUrdu: 'الواحِ کواکب و ساعات',
    categoryType: 'amulet',
    descriptionUrdu: 'سونے یا پیتل پر کندہ کی جانے والی لوح برائے جاہ، رعب، حکومت و امتحانات مع طلسم و موکل روقیائیل۔',
    keywords: ['لوح شمس', 'سورج', 'سونا', 'پیتل', 'عزت', 'حاکم', 'شرف شمس', 'روقیائیل', 'اتوار', 'سعد اکبر'],
    sourceBook: 'قوانینِ طلسم و مفتاح الجفر'
  },
  {
    id: 'search-planetary-loh-jupiter',
    tabId: 'planetary-loh',
    titleUrdu: 'لوحِ مشتری و ثروت (رزقِ وسیع، دولت و برکت)',
    categoryUrdu: 'الواحِ کواکب و ساعات',
    categoryType: 'amulet',
    descriptionUrdu: 'پیتل پر جمعرات کی پہلی ساعت میں تیار کی جانے والی لوحِ غنا برائے وسعتِ رزق و خاتمۂ فقر۔',
    keywords: ['لوح مشتری', 'دولت', 'رزق', 'ثروت', 'پیتل', 'غنی', 'جمعرات', 'صرفیائیل', 'مفتاح الجفر'],
    sourceBook: 'مفتاح الجفر و شمس المعارف'
  },
  {
    id: 'search-planetary-loh-venus',
    tabId: 'planetary-loh',
    titleUrdu: 'لوحِ زہرہ و الفت (محبت، شادی و موافقتِ زوجین)',
    categoryUrdu: 'الواحِ کواکب و ساعات',
    categoryType: 'amulet',
    descriptionUrdu: 'تانبے پر جمعہ کی پہلی ساعت میں تیار کی جانے والی لوح برائے عشق، کشش اور نکاح میں آسانی۔',
    keywords: ['لوح زہرہ', 'محبت', 'عشق', 'شادی', 'تانبا', 'یا ودود', 'جمعہ', 'عنیائیل', 'الفت'],
    sourceBook: 'قوانین طلسم و سحر العشاق'
  },
  {
    id: 'search-planetary-loh-mars',
    tabId: 'planetary-loh',
    titleUrdu: 'لوحِ مریخ و قہر (دفعِ اعداء، ابطالِ سحر و فتح)',
    categoryUrdu: 'الواحِ کواکب و ساعات',
    categoryType: 'amulet',
    descriptionUrdu: 'لوہے پر منگل کی پہلی ساعت میں تیار کی جانے والی دفاعی لوح برائے ابطالِ سحر و غلبہ بر دشمنان۔',
    keywords: ['لوح مریخ', 'دشمن', 'جادو', 'ابطال سحر', 'لوہا', 'یا قہار', 'منگل', 'سمسمائیل', 'قہر'],
    sourceBook: 'قوانینِ طلسم و طمطم ہندی'
  },
  {
    id: 'search-planetary-loh-saturn',
    tabId: 'planetary-loh',
    titleUrdu: 'لوحِ زحل و ہیبت (زبان بندی، قفلِ اعداء و حصارِ شدید)',
    categoryUrdu: 'الواحِ کواکب و ساعات',
    categoryType: 'amulet',
    descriptionUrdu: 'سیسے پر ہفتہ کی ساعت میں کندہ کی جانے والی لوح برائے زبان بندی، قفلِ دشمن و دفعِ آسیب۔',
    keywords: ['لوح زحل', 'زبان بندی', 'سیسہ', 'قفل', 'حصار', 'یا مانع', 'ہفتہ', 'کسفیائیل', 'آسیب'],
    sourceBook: 'قوانینِ طلسم و شمس المعارف'
  },
  {
    id: 'search-planetary-loh-mercury',
    tabId: 'planetary-loh',
    titleUrdu: 'لوحِ عطارد و ذکاء (ذہانت، فصاحت، امتحانات و تجارت)',
    categoryUrdu: 'الواحِ کواکب و ساعات',
    categoryType: 'amulet',
    descriptionUrdu: 'کانسی پر بدھ کے دن تیار کی جانے والی لوح برائے حافظہ، امتحانات اور کاروبار میں منافع۔',
    keywords: ['لوح عطارد', 'ذہانت', 'حافظہ', 'امتحان', 'تجارت', 'کانسی', 'بدھ', 'میکائیل', 'علم'],
    sourceBook: 'رموز الجفر و مفتاح الجفر'
  },
  {
    id: 'search-planetary-loh-moon',
    tabId: 'planetary-loh',
    titleUrdu: 'لوحِ قمرِ منیر (تسخیرِ خلق، شفاء و حفاظتِ سفر)',
    categoryUrdu: 'الواحِ کواکب و ساعات',
    categoryType: 'amulet',
    descriptionUrdu: 'خالص چاندی پر پیر کے دن تیار کی جانے والی لوح برائے تسخیر، دلی سکون اور امراضِ باردہ۔',
    keywords: ['لوح قمر', 'چاند', 'چاندی', 'تسخیر', 'شفا', 'پیر', 'جبرائیل', 'منازل قمر'],
    sourceBook: 'منازلِ قمر و قوانین طلسم'
  },

  // Core Systems
  {
    id: 'search-ramal-tashkhees',
    tabId: 'ramal-tashkhees',
    titleUrdu: 'حساب و تشخیص بذریعہ علم الرمل (Ramal Diagnosis)',
    categoryUrdu: 'تشخیص و استخارہ',
    categoryType: 'diagnosis',
    descriptionUrdu: 'قرعۂ رمل، سولہ اشکالِ رمل، زائجۂ رمل اور سائل کی بیماری و سحر کا تفصیلی تجزیہ۔',
    keywords: ['رمل', 'اشکال رمل', 'تشخیص', 'قرعہ', 'زائچہ رمل', 'لحیان', 'حمرہ', 'نصرۃ الداخل'],
    sourceBook: 'علم الرمل کاش البرنی'
  },
  {
    id: 'search-mokamal-hamzad',
    tabId: 'mokamal-hamzad',
    titleUrdu: 'مکمل تسخیرِ ہمزاد و حاضرات (Mokamal Hamzad)',
    categoryUrdu: 'تسخیرات و حاضرات',
    categoryType: 'operation',
    descriptionUrdu: 'سایہ بینی، شمع بینی، چلہ کشی، عزائمِ ہمزاد اور شرعی حفاظت و پرہیز کے قوانین۔',
    keywords: ['ہمزاد', 'تسخیر ہمزاد', 'سایہ بینی', 'شمع بینی', 'حاضرات', 'چلہ', 'عزیمت ہمزاد'],
    sourceBook: 'تسخیرِ ہمزاد کاش البرنی'
  },
  {
    id: 'search-aaina-amliyat',
    tabId: 'aaina-amliyat',
    titleUrdu: 'آئینۂ عملیات (Aaina Amliyat Complete Manual)',
    categoryUrdu: 'کتب و مقالات',
    categoryType: 'book',
    descriptionUrdu: 'کاش البرنی کی شہرہ آفاق کتاب کے تمام ابواب، طلسمات، اعمالِ حب، زبان بندی، رزق و فتح۔',
    keywords: ['آئینہ عملیات', 'کتاب', 'کاش البرنی', 'طلسمات', 'نقوش', 'عمل حب', 'تسخیر'],
    sourceBook: 'آئینۂ عملیات'
  },
  {
    id: 'search-shadi-zaicha',
    tabId: 'shadi-zaicha',
    titleUrdu: 'شادی کا مستند زائچہ و موافقتِ زوجین (Shadi Ka Zaicha)',
    categoryUrdu: 'تشخیص و استخارہ',
    categoryType: 'calc',
    descriptionUrdu: 'لڑکے اور لڑکی کے نام و والدہ کے اعداد، ابجد قمری، بروج، عناصر اور باہمی موافقت کا مکمل حساب۔',
    keywords: ['شادی', 'نکاح', 'زائچہ شادی', 'موافقت', 'لڑکا لڑکی', 'برج', 'عنصر', 'استخارہ شادی'],
    sourceBook: 'قوانینِ کاش البرنی'
  },
  {
    id: 'search-ruhani-hazirat',
    tabId: 'ruhani-hazirat',
    titleUrdu: 'روحانی حاضرات و مراقبہ (Hazirat & Meditation)',
    categoryUrdu: 'تسخیرات و حاضرات',
    categoryType: 'operation',
    descriptionUrdu: 'ناخن بینی، شیشہ بینی، حاضراتِ ارواح، مراقبۂ جفریہ اور باطنی کشف کے اصول۔',
    keywords: ['حاضرات', 'مراقبہ', 'ناخن بینی', 'کشف', 'روحانیت', 'باطن', 'شیشہ بینی'],
    sourceBook: 'مفتاح الجفر و آئینہ عملیات'
  },
  {
    id: 'search-quranic-operations',
    tabId: 'quranic-operations',
    titleUrdu: 'عملیات و نقوشِ قرآنی (Quranic Operations)',
    categoryUrdu: 'عملیات و نقوش',
    categoryType: 'operation',
    descriptionUrdu: 'سورہ یٰسین، مزمل، واقعہ، اخلاص، کوثر، فلق و ناس کے مستند نقوش، اوفاق اور شرعی اعمال۔',
    keywords: ['قرآنی نقوش', 'سورہ یسین', 'سورہ مزمل', 'سورہ واقعہ', 'آیت الکرسی', 'سورۃ الفاتحہ', 'شفاء'],
    sourceBook: 'شفاء الاسقام و اعمالِ قرآنی'
  },
  {
    id: 'search-shams-al-maarif',
    tabId: 'shams-al-maarif',
    titleUrdu: 'شمس المعارف الکبریٰ (امام احمد بن علی البونیؒ)',
    categoryUrdu: 'کتب و مقالات',
    categoryType: 'book',
    descriptionUrdu: 'حروفِ نورانیہ، اسمائے حسنیٰ، اوفاقِ فلکیہ، خاتمِ سلیمانی اور الواحِ کواکب کے اسرار۔',
    keywords: ['شمس المعارف', 'البونی', 'حروف نورانیہ', 'خاتم سلیمانی', 'اوفاق', 'اسماء الحسنی', 'طلسم'],
    sourceBook: 'شمس المعارف الکبریٰ'
  },
  {
    id: 'search-takseer-articles',
    tabId: 'takseer-articles',
    titleUrdu: 'مقالاتِ تکسیر و ریاضیاتِ جفر (Takseer Articles)',
    categoryUrdu: 'علم تکسیر و ریاضیات',
    categoryType: 'calc',
    descriptionUrdu: 'تکسیر صدر موخر، تکسیرِ خطی، زمامہ، بسطِ حرفی، عددی اور ریاضیاتی جفر کے گہرے مضامین۔',
    keywords: ['تکسیر', 'صدر موخر', 'زمامہ', 'بسط حرفی', 'بسط عددی', 'جفر ریاضی', 'طرح و لقط'],
    sourceBook: 'علم تکسیر کاش البرنی'
  },
  {
    id: 'search-operations-index',
    tabId: 'operations-index',
    titleUrdu: 'فہرستِ مقاصد و عملیاتِ جفر (Operations Index)',
    categoryUrdu: 'عملیات و نقوش',
    categoryType: 'operation',
    descriptionUrdu: 'ہر مقصد (محبت، رزق، زبان بندی، شفا، حفاظت، ترقی) کے لیے براہِ راست اعمال و نقوش کی انڈیکس۔',
    keywords: ['فہرست مقاصد', 'انڈیکس', 'عملیات', 'رزق عمل', 'محبت عمل', 'حفاظت عمل', 'زبان بندی عمل'],
    sourceBook: 'مفتاح الجفر'
  },
  {
    id: 'search-jafr-symbolism',
    tabId: 'jafr-symbolism',
    titleUrdu: 'تحقیقِ رموز و اشاراتِ جفر (کاش البرنی)',
    categoryUrdu: 'علم جفر و ابجد',
    categoryType: 'calc',
    descriptionUrdu: 'حروفِ صامتہ، حروفِ نورانیہ، نظائر، ایقغ، ابتث، اہطم اور موکلین کے خفیہ اشارات۔',
    keywords: ['رموز جفر', 'اشارات', 'نظائر', 'ایقغ', 'اہطم', 'صامتہ', 'نورانیہ', 'موکلین'],
    sourceBook: 'رموز الجفر کاش البرنی'
  },
  {
    id: 'search-mujarrabat-ibn-sina',
    tabId: 'mujarrabat-ibn-sina',
    titleUrdu: 'مجربات ابن سینا (علومِ خمسہ و طلسمات)',
    categoryUrdu: 'کتب و مقالات',
    categoryType: 'book',
    descriptionUrdu: 'شیخ الرئیس بو علی سینا کے مجرب نسخہ جات، سیمیائی طلسمات اور جڑی بوٹیوں کے روحانی اثرات۔',
    keywords: ['ابن سینا', 'مجربات', 'کیمیا', 'سیمیا', 'ریمیا', 'لیما', 'ہیمیا', 'طب و علاج'],
    sourceBook: 'مجرباتِ ابن سینا'
  },
  {
    id: 'search-sihr-al-ushaq',
    tabId: 'sihr-al-ushaq',
    titleUrdu: 'سحر العشاق و جنۃ المشتاق (امام البونیؒ)',
    categoryUrdu: 'کتب و مقالات',
    categoryType: 'book',
    descriptionUrdu: 'محبتِ حلال، تسخیرِ زوجین، موافقتِ قلوب اور الفت کے خاص روحانی و فلکی طلسمات۔',
    keywords: ['سحر العشاق', 'محبت', 'الفت', 'زوجین', 'امام البونی', 'تسخیر قلوب', 'عشق حلال'],
    sourceBook: 'سحر العشاق امام البونی'
  },
  {
    id: 'search-tamtam-hindi',
    tabId: 'tamtam-hindi',
    titleUrdu: 'طلسماتِ طمطم ہندی و نوامیسِ کبار',
    categoryUrdu: 'کتب و مقالات',
    categoryType: 'book',
    descriptionUrdu: 'ہندوستان کے قدیم علوم، طلسمِ ہفت کوکب، ابطالِ موانع اور قاہر طلسمات کا خلاصہ۔',
    keywords: ['طمطم ہندی', 'طلسمات قدیم', 'نوامیس', 'ہندوستانی طلسم', 'ابطال سحر', 'عزائم'],
    sourceBook: 'طلسماتِ طمطم ہندی'
  },
  {
    id: 'search-shifa-al-asqam',
    tabId: 'shifa-al-asqam',
    titleUrdu: 'شفاء الاسقام والاحزان (مولانا محمد عمر سربازیؒ)',
    categoryUrdu: 'کتب و مقالات',
    categoryType: 'book',
    descriptionUrdu: 'امراضِ جسمانی و روحانی، جادو، جنات اور حزن و ملال سے شفائے کامل کے مستند نقوش و دعائیں (۱۱۶ ابواب)۔',
    keywords: ['شفاء الاسقام', 'سربازی', 'علاج امراض', 'جادو کا علاج', 'جنات', 'نقوش شفا', 'وظائف'],
    sourceBook: 'شفاء الاسقام والاحزان'
  },
  {
    id: 'search-moon-calendar',
    tabId: 'moon-calendar',
    titleUrdu: 'تقویمِ قمر و منازلِ ۲۸ (Moon Calendar)',
    categoryUrdu: 'فلکیات و تقویم',
    categoryType: 'astronomy',
    descriptionUrdu: 'چاند کی اٹھائیس منازل (شرطین تا بطین و رشا)، قمر در عقرب، شرف و ہبوط اور عملیات کے اوقات۔',
    keywords: ['تقویم قمر', 'منازل قمر', '۲۸ منازل', 'چاند', 'قمر در عقرب', 'ہلال', 'بدر', 'شرف قمر'],
    sourceBook: 'منازلِ قمر کاش البرنی'
  },
  {
    id: 'search-eclipse',
    tabId: 'eclipse',
    titleUrdu: 'رصدِ کواکب و گرہن (کسوف و خسوف)',
    categoryUrdu: 'فلکیات و تقویم',
    categoryType: 'astronomy',
    descriptionUrdu: 'سورج گرہن اور چاند گرہن کے دوران تیار کی جانے والی اکسیر الواح، طلاسم اور اعمال۔',
    keywords: ['گرہن', 'کسوف', 'خسوف', 'سورج گرہن', 'چاند گرہن', 'رصد', 'الواح گرہن'],
    sourceBook: 'قوانینِ طلسم'
  },
  {
    id: 'search-diagnosis-patient',
    tabId: 'diagnosis',
    titleUrdu: 'تشخیصِ مریض و جڑی بوٹیاں (Patient Diagnosis)',
    categoryUrdu: 'تشخیص و استخارہ',
    categoryType: 'diagnosis',
    descriptionUrdu: 'نامِ مریض و والدہ سے مرض کی اصلیت (جادو، جنات، نظربد یا جسمانی) اور نباتی و جفری علاج۔',
    keywords: ['تشخیص مریض', 'جادو یا مرض', 'نظر بد', 'جنات کی تشخیص', 'جڑی بوٹیاں', 'علاج مرض'],
    sourceBook: 'قوانینِ کاش البرنی'
  },
  {
    id: 'search-abjad-arabi-studio',
    tabId: 'abjad-arabi',
    titleUrdu: 'ابجد عربی و حساب الجمل المشرقی والمغاربی (Arabic Abjad Studio)',
    categoryUrdu: 'علم جفر و ابجد',
    categoryType: 'calc',
    descriptionUrdu: 'جامع انسائیکلوپیڈیا ابجد عربی: موازنۂ جمل کبیر مشرقی و مغربی (اندلسی و ابن عربیؒ)، ۲۸ حروف کا مکمل جدول، منازلِ قمر، ۱۴ حروفِ نورانیہ، بسط ملفوظی و استخراجات۔',
    keywords: ['ابجد عربی', 'حساب الجمل', 'ابجد مغربی', 'اندلسی', 'ابن عربی', 'شمس المعارف', 'حروف نورانیہ', 'مقطعات', 'بسط ملفوظی', 'منازل قمر ۲۸', 'موکل علوی', 'طبائع اربعہ', 'عربی ابجد'],
    sourceBook: 'شمس المعارف الکبریٰ و الفتوحات المکیہ'
  },
  {
    id: 'search-abjad-calculator',
    tabId: 'abjad',
    titleUrdu: 'محاسب ابجد و جفر (Abjad Calculator)',
    categoryUrdu: 'علم جفر و ابجد',
    categoryType: 'calc',
    descriptionUrdu: 'ابجدِ قمری، کبیر، صغیر، عناصرِ اربعہ، استخراجِ موکل علوی و سفلی اور سیارۂ حاکم۔',
    keywords: ['ابجد', 'اعداد', 'ابجد قمری', 'ابجد کبیر', 'ابجد صغیر', 'موکل', 'عنصر غالب'],
    sourceBook: 'مفتاح الجفر'
  },
  {
    id: 'search-hisabiyat-rooh',
    tabId: 'hisabiyat-rooh',
    titleUrdu: 'حسابیاتِ روح، عقل، نفس و جسد',
    categoryUrdu: 'علم جفر و ابجد',
    categoryType: 'calc',
    descriptionUrdu: 'انسان کے چاروں روحانی و مادی اجزاء (روح، عقل، نفس، جسد) کا سائنسی ابجدی تجزیہ اور موافق اسما۔',
    keywords: ['حسابیات روح', 'عقل', 'نفس', 'جسد', 'مزاج', 'موافق نگینہ', 'اسماء الحسنی'],
    sourceBook: 'رموز الجفر'
  },
  {
    id: 'search-naqsh-generator',
    tabId: 'naqsh',
    titleUrdu: 'مولد النقوش و الواح (Naqsh Generator 3x3 to 6x6)',
    categoryUrdu: 'عملیات و نقوش',
    categoryType: 'operation',
    descriptionUrdu: 'مثلث (3x3)، مربع (4x4)، مخمس (5x5) اور مسدس (6x6) نقوش خودکار تیار کرنے اور پرنٹ کرنے کا انجن۔',
    keywords: ['نقش جنریٹر', 'مثلث', 'مربع', 'مخمس', 'مسدس', 'چال نقش', 'پرنٹ نقش', 'کسر'],
    sourceBook: 'قوانینِ طلسم'
  },
  {
    id: 'search-saat-planetary-clock',
    tabId: 'saat',
    titleUrdu: 'ساعت و کواکب شناسی (Planetary Hours Clock)',
    categoryUrdu: 'فلکیات و تقویم',
    categoryType: 'astronomy',
    descriptionUrdu: 'روزانہ ۲۴ گھنٹوں کی ساعاتِ کواکب، سعد و نحس اوقات اور لائیو ساعت کا ٹریکر۔',
    keywords: ['ساعت', 'علم الساعات', 'کواکب', 'سعد گھنٹہ', 'نحس گھنٹہ', 'گھڑی', 'اوقات عمل'],
    sourceBook: 'قوانینِ طلسم'
  },
  {
    id: 'search-hisar-shield',
    tabId: 'hisar',
    titleUrdu: 'حصار اعظم، پرہیز و تحفظِ عامل (Hisar Shield)',
    categoryUrdu: 'حصار و تحفظ',
    categoryType: 'operation',
    descriptionUrdu: 'آیت الکرسی کا ہفت گانہ حصار، تلوار والا حصار، ترکِ حیوانات اور رجعت سے بچاؤ کے قواعد۔',
    keywords: ['حصار', 'حصار اعظم', 'آیت الکرسی', 'تحفظ', 'پرہیز جلالی', 'رجعت', 'خاتم سلیمانی'],
    sourceBook: 'مفتاح الجفر و آئینہ عملیات'
  },
  {
    id: 'search-gemini-consultant',
    tabId: 'consultant',
    titleUrdu: 'مستشار جفر AI (Gemini Jafr Consultant)',
    categoryUrdu: 'مصنوعی ذہانت و رہنمائی',
    categoryType: 'operation',
    descriptionUrdu: 'کاش البرنی کے جفری قوانین پر تربیت یافتہ AI مستشار برائے رہنمائی، استفسار اور رہنمائی۔',
    keywords: ['مستشار', 'AI', 'کنسلٹنٹ', 'سوال جواب', 'جفر بوٹ', 'رہنمائی'],
    sourceBook: 'کتب کاش البرنی'
  }
];

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTab
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered Results
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    
    return GLOBAL_SEARCH_INDEX.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.categoryType !== selectedCategory) {
        return false;
      }

      if (!query) return true;

      // Match query with title, description, keywords, source book
      const inTitle = item.titleUrdu.toLowerCase().includes(query);
      const inDesc = item.descriptionUrdu.toLowerCase().includes(query);
      const inCat = item.categoryUrdu.toLowerCase().includes(query);
      const inBook = item.sourceBook?.toLowerCase().includes(query) || false;
      const inKeywords = item.keywords.some((kw) => kw.toLowerCase().includes(query));

      return inTitle || inDesc || inCat || inBook || inKeywords;
    });
  }, [searchQuery, selectedCategory]);

  if (!isOpen) return null;

  const categoriesList = [
    { id: 'all', label: 'تمام موضوعات' },
    { id: 'amulet', label: 'الواح و طلاسم' },
    { id: 'operation', label: 'عملیات و نقوش' },
    { id: 'book', label: 'کتب و مضامین' },
    { id: 'calc', label: 'حسابیات و ابجد' },
    { id: 'astronomy', label: 'فلکیات و ساعات' },
    { id: 'diagnosis', label: 'تشخیص و استخارہ' },
  ];

  const handleItemClick = (tabId: string) => {
    onSelectTab(tabId);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 px-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
      dir="rtl"
    >
      <div 
        className="w-full max-w-3xl rounded-3xl border-2 border-[#d4a373] bg-[#fdfaf1] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-[#d4a373]/40 bg-[#faedcd]/60 flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-[#bc6c25] text-white shadow-xs">
            <Search className="h-5 w-5" />
          </span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="تلاش کریں: لوح، شمس، محبت، رزق، تکسیر، رمل، شفاء، استخارہ، ہمزاد، کتب..."
              className="w-full bg-white border-2 border-[#d4a373] rounded-2xl px-4 py-2.5 text-sm sm:text-base font-medium text-[#2c1e14] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bc6c25] shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
            title="بند کریں (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 p-3 overflow-x-auto border-b border-[#d4a373]/30 bg-[#f2e8cf]/50 text-xs shrink-0 no-scrollbar">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#bc6c25] text-white shadow-xs'
                  : 'bg-white/80 text-[#5d4037] hover:bg-white border border-[#d4a373]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-4 space-y-2.5 flex-1 divide-y divide-[#d4a373]/20">
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.tabId)}
                className="pt-2.5 first:pt-0 group p-3.5 rounded-2xl hover:bg-[#faedcd]/60 border border-transparent hover:border-[#d4a373] transition-all cursor-pointer flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-amiri text-base sm:text-lg font-bold text-[#5d4037] group-hover:text-[#bc6c25] transition-colors">
                      {item.titleUrdu}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#faedcd] border border-[#d4a373] text-[#bc6c25]">
                      {item.categoryUrdu}
                    </span>
                    {item.sourceBook && (
                      <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                        <Bookmark className="h-3 w-3 text-gray-400" />
                        <span>ماخوذ: {item.sourceBook}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-medium">
                    {item.descriptionUrdu}
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {item.keywords.slice(0, 5).map((kw, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-white/70 text-gray-500 border border-gray-200"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="self-center shrink-0 flex items-center gap-1 text-xs font-bold text-[#bc6c25] bg-white group-hover:bg-[#bc6c25] group-hover:text-white px-3 py-1.5 rounded-xl border border-[#d4a373] shadow-2xs transition-all">
                  <span>کھولیں</span>
                  <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="h-12 w-12 rounded-full bg-amber-100 text-[#bc6c25] flex items-center justify-center mx-auto">
                <Search className="h-6 w-6" />
              </div>
              <h4 className="font-amiri text-lg font-bold text-[#5d4037]">
                کوئی نتیجہ نہیں ملا
              </h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                برائے مہربانی کوئی دوسرا لفظ لکھیں جیسے: "لوح"، "محبت"، "رزق"، "تکسیر"، "رمل" یا "شمس"۔
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#f2e8cf] border-t border-[#d4a373]/40 text-center text-xs text-gray-600 font-medium flex items-center justify-between px-6">
          <span>مجموعی نتائج: {searchResults.length}</span>
          <span className="hidden sm:inline">کسی بھی موضوع پر کلک کر کے فوراً متعلقہ اسٹوڈیو میں پہنچیں</span>
        </div>
      </div>
    </div>
  );
};
