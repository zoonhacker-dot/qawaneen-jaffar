import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  Code, 
  CheckCircle, 
  Smartphone, 
  Download, 
  Layers, 
  Compass, 
  HeartPulse, 
  Sun, 
  Clock, 
  Activity, 
  Cpu, 
  Flame, 
  Atom, 
  FileText, 
  Check, 
  ExternalLink,
  ChevronRight,
  User,
  AlertTriangle,
  Shield,
  HelpCircle,
  Zap,
  Info,
  Dices,
  Heart
} from 'lucide-react';

interface AuthorAppProfileProps {
  onOpenApkModal?: () => void;
  onNavigateTab?: (tabId: string) => void;
}

export const AuthorAppProfile: React.FC<AuthorAppProfileProps> = ({ onOpenApkModal, onNavigateTab }) => {
  const [activeSection, setActiveSection] = useState<'profile' | 'app_guide' | 'modules' | 'rules'>('profile');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('zoonhacker@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const appModules = [
    {
      id: 'ramal-tashkhees',
      title: 'حساب و تشخیص بذریعہ علم الرمل (Ramal Diagnosis & Inquiries)',
      icon: Dices,
      color: 'from-[#bc6c25] to-[#7f5539]',
      desc: 'سولہ اشکالِ رمل، قرعہ اندازی، بیوتِ رمل اور ۵ بنیادی سوالات (شادی، ملازمت، بیماری، بیرون ملک سفر، پسند کی شادی) کا مستند حسابی حل مع وقت و مدت کا تعین۔'
    },
    {
      id: 'shadi-zaicha',
      title: 'شادی کا مستند زائچہ و باہمی موافقت (Shadi Ka Zaicha)',
      icon: Heart,
      color: 'from-[#9b2226] to-[#7f5539]',
      desc: 'لڑکا و لڑکی مع والدہ کے ناموں کی ۱۲ پر تقسیم سے بروج کا استخراج اور ۷۸ مصدقہ جوڑوں کے جدول کے تحت رشتہ کی قطعی منظوری یا تنبیہ۔'
    },
    {
      id: 'shams-al-maarif',
      title: 'شمس المعارف الکبریٰ ولطائف العوارف (امام البونیؒ)',
      icon: Sun,
      color: 'from-[#1b4332] to-[#2d6a4f]',
      desc: 'کتاب کے تمام ۴۰ ابواب، ۲۸ اسمائے برہتیہ کبریٰ (عہدِ قدیم)، قصیدہ جلجلوتیہ، سواقطِ فاتحہ، خواتمِ سلیمان، اور شق الارض و استخراجِ دفائن کا مکمل اردو ترجمہ و نقوش۔'
    },
    {
      id: 'takseer-articles',
      title: 'مقالاتِ تکسیر و ریاضیاتِ جفر (Takseer Advanced Articles)',
      icon: BookOpen,
      color: 'from-[#bc6c25] to-[#7f5539]',
      desc: 'تکسیر کے پرمیوٹیشن الگورتھم، ریاضیاتی گروپ تھیوری، افلاطونی عنصری ماتریس اور منہجِ کاش البرنی پر تفصیلی تحقیقی مقالات۔'
    },
    {
      id: 'operations-index',
      title: 'فہرستِ مقاصد و عملیاتِ جفر (Jafr Operations Index)',
      icon: Compass,
      color: 'from-[#5d4037] to-[#2c1e14]',
      desc: 'تمام مستند کتب کے اعمال کی مقصد وار درجہ بندی: ہلاکتِ ظالم، دفعِ دشمن، استخراجِ دفائن، محبت و الفت، زبان بندی، شفا اور حصار۔'
    },
    {
      id: 'tantra-jantra-mantra',
      title: 'تنتر، جنتر و منتر انسائیکلوپیڈیا (شرعی و سریع التاثیر)',
      icon: Flame,
      color: 'from-[#9b2226] to-[#6b1417]',
      desc: 'روحانی تراکیب، طلسماتی نقوش، قرآنی عزائم، تمام ضروری لوازمات، ساعات اور جائز و ناجائز کا مکمل شرعی فرق۔'
    },
    {
      id: 'matrix-suggester',
      title: 'مستخرج ماتریس تکسیر و نقوش (Auto-Suggester)',
      icon: Layers,
      color: 'from-[#bc6c25] to-[#a2591d]',
      desc: 'کسی بھی مقصد یا آیت کے خودکار نقوش (مثلث ۳×۳ سے لے کر معشر ۱۰×۱۰ تک) مع کسر کا علاج، چال اور مہرِ تکسیر۔'
    },
    {
      id: 'abjad',
      title: 'محاسب ابجد و جفر (Abjad & Jafr Calculator)',
      icon: Sparkles,
      color: 'from-[#283618] to-[#405423]',
      desc: 'ابجد کبیر، ابجد صغیر، ابجد وسیط، مستحصلہ، قطب، بسطِ حروف، لفظی و عددی تجزیہ اور عنصری تقسیم (آتش، باد، آب، خاک)۔'
    },
    {
      id: 'takseer',
      title: 'علم تکسیر و طلسمات (Takseer & Moukalat Engine)',
      icon: Flame,
      color: 'from-[#bc6c25] to-[#8c4a16]',
      desc: 'تکسیرِ صدر موخر، تمازجِ حروف، عزائم کی استخراجی تخلیق اور علوی و سفلی موکلات کے اسمائے اعظم کی خودکار ترکیب۔'
    },
    {
      id: 'aflatoon',
      title: 'تکسیرِ افلاطون (Aflatoon Planetary Matrix)',
      icon: Atom,
      color: 'from-[#606c38] to-[#283618]',
      desc: 'ساتوں کواکب کے عناصر اور قوانینِ افلاطون کے حسابی کلیات پر مبنی نادر و نایاب تکسیری جدول۔'
    },
    {
      id: 'diagnosis',
      title: 'تشخیصِ مریض و جڑی بوٹیاں (Diagnosis & Herbal Remedies)',
      icon: HeartPulse,
      color: 'from-[#9b2226] to-[#6b1417]',
      desc: 'نامِ سائل مع والدہ کے اعداد کے تحت روحانی عارضے کی تشخیص (سحر، آسیب، نظرِ بد) اور نبوی و قدرتی جڑی بوٹیوں کی رہنمائی۔'
    },
    {
      id: 'eclipse',
      title: 'رصدِ کواکب، گرہن (کسوف و خسوف) و قمر در عقرب',
      icon: Sun,
      color: 'from-[#ca6702] to-[#9b2226]',
      desc: 'سورج و چاند گرہن کے دوران الواحِ شمس و قمر کی تیاری، شرف و ہبوط کے درجات اور قمر در عقرب کے نحس اوقات سے تحفظ۔'
    },
    {
      id: 'prayer-map',
      title: 'نقشۂ قبلہ و اوقاتِ سعد و نحس (Qibla & Saat Clock)',
      icon: Compass,
      color: 'from-[#283618] to-[#1b2610]',
      desc: 'درست سمتِ قبلہ، قریبی مساجد کا نقشہ اور ۲۴ گھنٹوں کی سیاروی ساعتیں (سعدِ اکبر، سعدِ اصغر، نحسِ اکبر، نحسِ اصغر)۔'
    },
    {
      id: 'tracker',
      title: 'روزانہ تکسیر و وظائف ٹریکر (Daily Takseer Tracker)',
      icon: Activity,
      color: 'from-[#588157] to-[#3a5a40]',
      desc: 'روزانہ کے اوراد، تسبیحات اور تکسیری چلہ کشی کا منظم ریکارڈ و تسلسل تاکہ عمل میں ناغہ نہ ہو۔'
    },
    {
      id: 'books',
      title: 'کتب و انسائیکلوپیڈیا کاش البرنی (Library)',
      icon: BookOpen,
      color: 'from-[#8d6e63] to-[#5d4037]',
      desc: 'علامہ کاش البرنی کی تمام کتب کے مستند ابواب، حوالہ جات، اصطلاحات اور قواعدِ جفریہ کا جامع ذخیرہ۔'
    },
    {
      id: 'hisar',
      title: 'حصارِ اعظم و روحانی حفاظتی ڈھال (Hisar Shield)',
      icon: ShieldCheck,
      color: 'from-[#3a5a40] to-[#283618]',
      desc: 'عاملین کے لیے رجعت سے حفاظت، حصارِ آیت الکرسی، پرہیزِ جلالی و جمالی کی مکمل شرائط و تدابیر۔'
    },
    {
      id: 'consultant',
      title: 'مستشار جفر AI (Gemini Jafr Consultant)',
      icon: Cpu,
      color: 'from-[#bc6c25] to-[#5d4037]',
      desc: 'جدید مصنوعی ذہانت سے لیس مستشار جو جفری اصولوں، تکسیر کے سوالات اور عملیات کی رہنمائی فراہم کرتا ہے۔'
    },
    {
      id: 'istikhara',
      title: 'استخارہ و تعبیرِ خواب (Istikhara & Dream Guide)',
      icon: HelpCircle,
      color: 'from-[#606c38] to-[#405423]',
      desc: 'علم الحروف کے روایتی قرعہ جات اور خوابوں کی مستند روحانی تعبیرات کا مکمل نظام۔'
    }
  ];

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Top Hero Banner: Author Profile & Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2c1e14] via-[#3d2b1f] to-[#283618] p-6 sm:p-8 text-[#fefae0] shadow-2xl border-2 border-[#bc6c25]">
        
        {/* Subtle Decorative Pattern Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#dda15e_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8">
          
          {/* Spiritual Calligraphic Seal Frame (Replacing Photo) */}
          <div className="relative shrink-0">
            <div className="relative h-44 w-44 sm:h-52 sm:w-52 rounded-3xl overflow-hidden p-3 bg-gradient-to-tr from-[#bc6c25] via-[#dda15e] to-[#606c38] shadow-2xl ring-4 ring-[#bc6c25]/50 flex flex-col items-center justify-center bg-[#2c1e14] text-center border-2 border-[#faedcd]">
              <div className="w-full h-full rounded-2xl bg-[#1f150e] border border-[#dda15e]/60 flex flex-col items-center justify-center p-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#dda15e_1px,transparent_1px)] [background-size:10px_10px] opacity-20 pointer-events-none" />
                <span className="text-xs font-mono font-bold text-[#dda15e]">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
                <div className="my-2 p-2.5 rounded-full bg-[#bc6c25]/30 border border-[#dda15e]">
                  <Award className="h-10 w-10 text-[#dda15e]" />
                </div>
                <h3 className="font-amiri text-lg font-bold text-[#faedcd] leading-tight">
                  حاجی ساجد علی
                </h3>
                <p className="font-amiri text-xs text-[#dda15e] font-semibold">
                  گورگیج البلوشی
                </p>
                <span className="text-[10px] text-[#ccd5ae] mt-1 font-mono">
                  ۷۸۶ • ۹۲ • ۱۱۰
                </span>
              </div>
            </div>
            <div className="absolute -bottom-2.5 -right-2.5 bg-[#bc6c25] text-white p-2 rounded-2xl shadow-lg border border-[#faedcd] flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-[#fefae0]" />
            </div>
          </div>

          {/* Author Identity & Headlines */}
          <div className="flex-1 text-center md:text-right space-y-3">
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bc6c25]/80 text-[#fefae0] text-xs font-bold border border-[#dda15e]/50">
                <Sparkles className="h-3.5 w-3.5 text-[#dda15e]" />
                <span>بانی و محقق: کاشف الجفر ریسرچ سینٹر</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#283618]/90 text-green-200 text-xs font-bold border border-green-500/40">
                <Code className="h-3.5 w-3.5 text-[#dda15e]" />
                <span>چیف سوفٹ ویئر آرکیٹیکٹ</span>
              </span>
            </div>

            <h2 className="font-amiri text-2xl sm:text-4xl font-bold tracking-wide text-[#faedcd]">
              حاجی ساجد علی گورگیج البلوشی
            </h2>

            <p className="text-sm sm:text-base text-[#dda15e] font-medium leading-relaxed">
              محققِ علومِ جفر، علم التکسیر و طلسمات | ماہرِ روایتی و ڈیجیٹل علومِ مخفیہ
            </p>

            <p className="text-xs sm:text-sm text-[#d4a373] leading-relaxed max-w-3xl">
              جنھوں نے علامہ کاش البرنی کی نادر و نایاب کتب (رموز الجفر، مفتاح الجفر، قوانینِ افلاطون و علم التکسیر) کے صدیوں پرانے دقیق کلیات کو جدید ریاضیاتی الگورتھمز میں ڈھال کر شائقین و عاملین کے لیے اس مستند ڈیجیٹل شاہکار کی بنیاد رکھی۔
            </p>

            {/* Contact, Email & Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              
              <button
                id="btn-copy-author-email"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 bg-[#fefae0] text-[#2c1e14] hover:bg-[#faedcd] px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                title="ای میل کاپی کریں"
              >
                <Mail className="h-4 w-4 text-[#bc6c25]" />
                <span className="font-mono">zoonhacker@gmail.com</span>
                {copiedEmail ? <Check className="h-3.5 w-3.5 text-green-700 font-bold" /> : <span className="text-[10px] bg-[#bc6c25]/20 px-1.5 py-0.5 rounded text-[#5d4037]">کاپی</span>}
              </button>

              {onOpenApkModal && (
                <button
                  id="btn-profile-apk-download"
                  onClick={onOpenApkModal}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#bc6c25] to-[#8c4a16] hover:from-[#a2591d] hover:to-[#743c10] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <Download className="h-4 w-4 text-[#dda15e]" />
                  <span>ڈاؤن لوڈ مکمل ایپ و APK پیکیج</span>
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b-2 border-[#d4a373] pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveSection('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'profile'
              ? 'bg-[#bc6c25] text-white shadow-md'
              : 'bg-[#fefae0] text-[#5d4037] hover:bg-[#faedcd] border border-[#d4a373]'
          }`}
        >
          <User className="h-4 w-4" />
          <span>تفصیلی تعارف و خدمات</span>
        </button>

        <button
          onClick={() => setActiveSection('app_guide')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'app_guide'
              ? 'bg-[#bc6c25] text-white shadow-md'
              : 'bg-[#fefae0] text-[#5d4037] hover:bg-[#faedcd] border border-[#d4a373]'
          }`}
        >
          <Info className="h-4 w-4" />
          <span>اس ایپلیکیشن کی مکمل معلومات و رہنمائی</span>
        </button>

        <button
          onClick={() => setActiveSection('modules')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'modules'
              ? 'bg-[#bc6c25] text-white shadow-md'
              : 'bg-[#fefae0] text-[#5d4037] hover:bg-[#faedcd] border border-[#d4a373]'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>۱۲ مستند ماڈیولز کی فہرست</span>
        </button>

        <button
          onClick={() => setActiveSection('rules')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'rules'
              ? 'bg-[#bc6c25] text-white shadow-md'
              : 'bg-[#fefae0] text-[#5d4037] hover:bg-[#faedcd] border border-[#d4a373]'
          }`}
        >
          <Shield className="h-4 w-4" />
          <span>شرعی و اخلاقی رہنما اصول</span>
        </button>
      </div>

      {/* SECTION 1: DETAILED PROFILE & ACADEMIC ACHIEVEMENTS */}
      {activeSection === 'profile' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card 1: Research Vision */}
            <div className="bg-[#ffffff] border-2 border-[#bc6c25] rounded-3xl p-5 shadow-sm space-y-3">
              <div className="p-3 w-fit rounded-2xl bg-[#faedcd] text-[#bc6c25]">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-amiri text-lg font-bold text-[#5d4037]">
                علمی و تحقیقی وژن
              </h3>
              <p className="text-xs text-[#7f5539] leading-relaxed">
                علم الجفر اور علم الاعداد صدیوں سے اولیاء اور حکماء کا خاص موضوع رہا ہے۔ حاجی ساجد علی گورگیج البلوشی کا مقصد ان خفیہ و دقیق علوم کو کتابی الجھنوں اور انسانی حسابی غلطیوں سے پاک کر کے ہر محقق اور طالبِ علم کے لیے قابلِ فہم اور خودکار بنانا ہے۔
              </p>
            </div>

            {/* Card 2: Software Development & Accuracy */}
            <div className="bg-[#ffffff] border-2 border-[#283618] rounded-3xl p-5 shadow-sm space-y-3">
              <div className="p-3 w-fit rounded-2xl bg-[#dce4c9] text-[#283618]">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-amiri text-lg font-bold text-[#283618]">
                100% حسابی صحت و الگورتھم
              </h3>
              <p className="text-xs text-[#5d4037] leading-relaxed">
                نقوشِ مثلث و مربع کی چالوں، کسر کے خانوں، تکسیر کے صدر و موخر کے حروف، اور ابجد کے چاروں مراتب (کبیر، صغیر، وسیط، اکبر) کے ایسے مستحکم الگورتھمز وضع کیے ہیں جو صفر غلطی کی ضمانت دیتے ہیں۔
              </p>
            </div>

            {/* Card 3: Free & Resilient Access */}
            <div className="bg-[#ffffff] border-2 border-[#606c38] rounded-3xl p-5 shadow-sm space-y-3">
              <div className="p-3 w-fit rounded-2xl bg-[#fdfaf1] text-[#606c38] border border-[#d4a373]">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="font-amiri text-lg font-bold text-[#5d4037]">
                آف لائن و موبائل سپورٹ
              </h3>
              <p className="text-xs text-[#7f5539] leading-relaxed">
                عاملین اور صارفین کی سہولت کے لیے یہ ایپلیکیشن بغیر انٹرنیٹ کے مکمل طور پر چلتی ہے، اور اسے کسی بھی اینڈرائیڈ فون، ونڈوز یا میک پر باآسانی ڈاؤن لوڈ اور انسٹال کیا جا سکتا ہے۔
              </p>
            </div>

          </div>

          {/* Research Background Box */}
          <div className="bg-[#fefae0] border-2 border-[#d4a373] rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-amiri text-xl font-bold text-[#5d4037] flex items-center gap-2">
              <Award className="h-5 w-5 text-[#bc6c25]" />
              <span>کتبِ کاش البرنی پر خصوصی تحقیقی کام</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-[#ffffff] p-3.5 rounded-2xl border border-[#d4a373] space-y-1">
                <span className="font-bold text-[#bc6c25]">۱. رموز الجفر</span>
                <p className="text-[#8d6e63] text-[11px]">بسطِ حروف، قطب کے اصول، استخراجِ اسمائے حسنیٰ اور مستحصلہ کا مکمل احاطہ۔</p>
              </div>

              <div className="bg-[#ffffff] p-3.5 rounded-2xl border border-[#d4a373] space-y-1">
                <span className="font-bold text-[#bc6c25]">۲. قوانینِ افلاطون</span>
                <p className="text-[#8d6e63] text-[11px]">سیاروی طبائع اور عناصرِ اربعہ (آتش، باد، آب، خاک) کے باہمی امتزاج کا نچوڑ۔</p>
              </div>

              <div className="bg-[#ffffff] p-3.5 rounded-2xl border border-[#d4a373] space-y-1">
                <span className="font-bold text-[#bc6c25]">۳. مفتاح الجفر</span>
                <p className="text-[#8d6e63] text-[11px]">تکسیرِ تمازج، عزائم کی تیاری، اور ملکوتی موکلات کے نام بنانے کے قواعد۔</p>
              </div>

              <div className="bg-[#ffffff] p-3.5 rounded-2xl border border-[#d4a373] space-y-1">
                <span className="font-bold text-[#bc6c25]">۴. علم التکسیر و طلسمات</span>
                <p className="text-[#8d6e63] text-[11px]">نقوشِ مقدّسہ کے ضوابط، شرفِ کواکب اور گرہن کے نادر اوقات کے طلسمات۔</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: APP OVERVIEW & CAPABILITIES */}
      {activeSection === 'app_guide' && (
        <div className="space-y-5">
          <div className="bg-[#ffffff] border-2 border-[#bc6c25] rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-amiri text-2xl font-bold text-[#5d4037] flex items-center gap-2">
              <Info className="h-6 w-6 text-[#bc6c25]" />
              <span>مفتاح الجفر ایپلیکیشن کا تعارف و بنیادی مقاصد</span>
            </h3>

            <p className="text-xs sm:text-sm text-[#5d4037] leading-relaxed">
              <strong>مفتاح الجفر (قوانینِ کاش البرنی)</strong> ایک جامع، جدید اور ڈیجیٹل پلیٹ فارم ہے جو علومِ جفر، تکسیر، نجوم، ابجد اور روحانی حسابات کو ایک ہی جگہ یکجا کرتا ہے۔ روایتی طور پر ایک نقش یا تکسیر بنانے میں گھنٹوں کا وقت اور باریک بینی درکار ہوتی تھی، جہاں ایک حرف کی غلطی سے پورا عمل ضائع ہو جاتا تھا۔ یہ سافٹ ویئر اس تمام عمل کو سیکنڈوں میں 100% درستگی کے ساتھ انجام دیتا ہے۔
            </p>

            {/* Key Advantages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-3 bg-[#fdfaf1] p-3.5 rounded-2xl border border-[#d4a373]">
                <CheckCircle className="h-5 w-5 text-green-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-[#5d4037]">مکمل خودکار نقوش جنریٹر (۳×۳ سے ۱۰×۱۰)</h4>
                  <p className="text-[11px] text-[#8d6e63]">مثلث، مربع، مخمس، مسدس، مسبع، مثمن، متسع اور معشر کے نقوش مع خودکار کسر کنٹرول۔</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#fdfaf1] p-3.5 rounded-2xl border border-[#d4a373]">
                <CheckCircle className="h-5 w-5 text-green-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-[#5d4037]">رصدِ کواکب و گرہن (سورج و چاند گرہن)</h4>
                  <p className="text-[11px] text-[#8d6e63]">کسوف و خسوف کی لائیو رصد، شرفِ شمس و قمر کی لوح کی تیاری کے نادر لمحات۔</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#fdfaf1] p-3.5 rounded-2xl border border-[#d4a373]">
                <CheckCircle className="h-5 w-5 text-green-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-[#5d4037]">روحانی و طبّی تشخیصِ مریض مع جڑی بوٹیاں</h4>
                  <p className="text-[11px] text-[#8d6e63]">سحر، آسیب یا جسمانی خلط کی فوری تشخیص اور نبوی و قدرتی جڑی بوٹیوں سے علاج۔</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#fdfaf1] p-3.5 rounded-2xl border border-[#d4a373]">
                <CheckCircle className="h-5 w-5 text-green-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-[#5d4037]">حصارِ اعظم و حفاظتِ عامل</h4>
                  <p className="text-[11px] text-[#8d6e63]">رجعت سے بچاؤ، حصارِ آیت الکرسی اور پرہیزِ جلالی و جمالی کی جامع شرائط۔</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 3: 12 MODULES OVERVIEW */}
      {activeSection === 'modules' && (
        <div className="space-y-4">
          <div className="text-right">
            <h3 className="font-amiri text-xl font-bold text-[#5d4037]">
              ایپ کے تمام ۱۲ مستند ماڈیولز کی فہرست و تفصیل
            </h3>
            <p className="text-xs text-[#8d6e63]">
              کسی بھی ماڈیول پر کلک کر کے آپ براہِ راست اس سیکشن میں جا سکتے ہیں:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {appModules.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  onClick={() => onNavigateTab && onNavigateTab(mod.id)}
                  className="group bg-[#ffffff] border-2 border-[#d4a373] hover:border-[#bc6c25] rounded-3xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${mod.color} text-white shadow-sm`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold font-mono bg-[#faedcd] text-[#bc6c25] px-2 py-0.5 rounded-full">
                        نمبر {idx + 1}
                      </span>
                    </div>

                    <h4 className="font-amiri text-base font-bold text-[#5d4037] group-hover:text-[#bc6c25] transition-colors">
                      {mod.title}
                    </h4>

                    <p className="text-xs text-[#8d6e63] leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#f2e8cf] flex items-center justify-between text-xs text-[#bc6c25] font-bold">
                    <span>کھولیں و استعمال کریں</span>
                    <ChevronRight className="h-4 w-4 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 4: SHARIAH & ETHICAL GUIDELINES */}
      {activeSection === 'rules' && (
        <div className="space-y-4">
          <div className="bg-[#ffffff] border-2 border-[#606c38] rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-amiri text-2xl font-bold text-[#283618] flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-[#283618]" />
              <span>شرعی ضوابط، اخلاقیات اور انتباہِ عاملین</span>
            </h3>

            <div className="space-y-3 text-xs text-[#5d4037] leading-relaxed">
              {/* Prominent Warning Callout */}
              <div className="p-4 rounded-2xl bg-[#2c150e] border-2 border-red-500 text-[#faedcd] space-y-2 shadow-md">
                <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                  <AlertTriangle className="h-5 w-5" />
                  <span>انتباہ و شرعی اعلانِ براءت:</span>
                </div>
                <p className="font-amiri text-sm leading-relaxed font-bold">
                  اس ایپ میں موجود ہر اعمال کے نفع و نقصان یا اچھے اور برے استعمال کا ذمہ دار صاحبِ ایپ (بنانے والے) پر نہیں ہے۔ اچھے اور برے استعمال کا ذمہ دار وہ خود ہے اور روزِ قیامت اللہ تعالیٰ کے حضور وہ خود جوابدہ ہے۔ صاحبِ ایپ پر اس کا کوئی گناہ نہیں ہے، اور نہ ہی کسی ناجائز مقصد کے لیے ان کی طرف سے اجازت ہے۔ البتہ صحیح، شرعی اور جائز مقاصد کے لیے اجازتِ عام ہے۔
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#dce4c9] border border-[#606c38] text-[#283618] font-bold">
                قانونِ اوّل: یہ تمام نقوش، تکسیرات اور اعمال صرف اور صرف جائز، حلال اور فی سبیل اللہ مقاصد (جیسے شفائے امراض، حفاظتِ جان و مال، محبتِ زوجین، برکتِ رزق، ادائے قرض) کے لیے مخصوص ہیں۔
              </div>

              <ul className="list-disc list-inside space-y-2 text-[#7f5539] pr-2">
                <li>کسی بھی ناجائز، غیر شرعی، تفریق بین الاحباب، یا کسی مسلمان کو نقصان پہنچانے کے لیے اس سافٹ ویئر کا استعمال سختی سے ممنوع اور سخت گناہ ہے۔</li>
                <li>عمل شروع کرنے سے پہلے صدقہ دینا، باوضو ہونا، قبلہ رو بیٹھنا، اور آیت الکرسی کا حصار قائم کرنا لازمی شرائط میں شامل ہے۔</li>
                <li>جلالی و جمالی پرہیز (گوشت، پیاز، لہسن اور بدبودار اشیاء سے اجتناب) اعمالِ تکسیر کی کامیابی کے لیے ضروری ہے۔</li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
