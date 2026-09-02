import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Compass, 
  Clock, 
  ShieldCheck, 
  Flame, 
  Cpu, 
  Moon, 
  Atom, 
  HelpCircle,
  Activity,
  Award,
  Layers,
  Download,
  CheckCircle,
  ExternalLink,
  FolderArchive,
  X,
  HeartPulse,
  Smartphone,
  Sun,
  Wifi,
  WifiOff,
  UserCheck,
  Heart,
  Feather,
  Eye,
  Dices,
  FileSpreadsheet,
  Search,
  Globe
} from 'lucide-react';
import { calculatePlanetaryHoursForDay } from '../utils/jafrEngine';
import { GlobalSearchModal } from './GlobalSearchModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [currentSaatInfo, setCurrentSaatInfo] = useState<string>('ساعتِ شمس (سعد و باوقار)');
  const [currentDayUrdu, setCurrentDayUrdu] = useState<string>('جمعہ المبارک');
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Global shortcut Ctrl+K or Cmd+K for search
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowSearchModal((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);

    const daysUrdu = ['اتوار (یکشنبہ)', 'پیر (دوشنبہ)', 'منگل (سہ شنبہ)', 'بدھ (چہار شنبہ)', 'جمعرات (پنجشنبہ)', 'جمعہ (آدینہ)', 'ہفتہ (شنبہ)'];
    const now = new Date();
    const dayIdx = now.getDay();
    setCurrentDayUrdu(daysUrdu[dayIdx]);

    const hours = calculatePlanetaryHoursForDay(dayIdx);
    const hourOfDay = now.getHours();
    const saatIdx = Math.min(Math.max(0, Math.floor((hourOfDay >= 6 && hourOfDay < 18 ? hourOfDay - 6 : (hourOfDay + 6) % 12))), 11);
    const activeSaat = hours[saatIdx] || hours[0];
    setCurrentSaatInfo(`${activeSaat.planetUrdu} - ${activeSaat.natureUrdu}`);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  const handleDirectDownload = () => {
    setIsDownloading(true);
    const link = document.createElement('a');
    link.href = '/api/download-zip';
    link.setAttribute('download', 'kashif-ul-jafr-complete-project.zip');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  const navItems = [
    { id: 'profile-guide', label: 'تعارفِ مصنف و رہنما ایپ', icon: UserCheck },
    { id: 'planetary-loh', label: 'الواحِ کواکبِ سبعہ و اوقاتِ سعد و نحس (Planetary Plates)', icon: Award },
    { id: 'ramal-tashkhees', label: 'حساب و تشخیص بذریعہ علم الرمل (Ramal Diagnosis)', icon: Dices },
    { id: 'mokamal-hamzad', label: 'مکمل تسخیرِ ہمزاد و حاضرات (Mokamal Hamzad)', icon: Flame },
    { id: 'aaina-amliyat', label: 'آئینۂ عملیات (Aaina Amliyat Complete)', icon: BookOpen },
    { id: 'shadi-zaicha', label: 'شادی کا مستند زائچہ و موافقت (Shadi Ka Zaicha)', icon: Heart },
    { id: 'ruhani-hazirat', label: 'روحانی حاضرات و مراقبہ (Hazirat & Meditation)', icon: Eye },
    { id: 'quranic-operations', label: 'عملیات و نقوشِ قرآنی (Quranic Operations)', icon: BookOpen },
    { id: 'shams-al-maarif', label: 'شمس المعارف الکبریٰ (امام البونیؒ)', icon: Sun },
    { id: 'takseer-articles', label: 'مقالاتِ تکسیر و ریاضیاتِ جفر (Takseer Articles)', icon: BookOpen },
    { id: 'operations-index', label: 'فہرستِ مقاصد و عملیاتِ جفر (Operations Index)', icon: Compass },
    { id: 'jafr-symbolism', label: 'تحقیقِ رموز و اشاراتِ جفر (کاش البرنی)', icon: Sparkles },
    { id: 'mujarrabat-ibn-sina', label: 'مجربات ابن سینا (علومِ خمسہ و طلسمات)', icon: Atom },
    { id: 'sihr-al-ushaq', label: 'سحر العشاق و جنۃ المشتاق (امام البونیؒ)', icon: Heart },
    { id: 'tamtam-hindi', label: 'طلسماتِ طمطم ہندی و نوامیسِ کبار', icon: Feather },
    { id: 'shifa-al-asqam', label: 'شفاء الاسقام والاحزان (مولانا محمد عمر سربازیؒ)', icon: BookOpen },
    { id: 'moon-calendar', label: 'تقویمِ قمر و منازلِ ۲۸ (Moon Calendar)', icon: Moon },
    { id: 'talismi-qadeem', label: 'طلسمِ قدیم (ویدک منترات و تسخیرِ بعید)', icon: Sparkles },
    { id: 'tantra-jantra-mantra', label: 'تنتر، جنتر و منتر (شرعی و سریع التاثیر)', icon: Flame },
    { id: 'eclipse', label: 'رصدِ کواکب و گرہن (کسوف و خسوف)', icon: Sun },
    { id: 'diagnosis', label: 'تشخیصِ مریض و جڑی بوٹیاں', icon: HeartPulse },
    { id: 'prayer-map', label: 'نقشۂ قبلہ و اوقاتِ سعد', icon: Compass },
    { id: 'tracker', label: 'روزانہ تکسیر ٹریکر', icon: Activity },
    { id: 'matrix-suggester', label: 'مستخرج ماتریس تکسیر', icon: Layers },
    { id: 'abjad-arabi', label: 'ابجد عربی و حساب الجمل (Arabic Abjad Studio)', icon: Globe },
    { id: 'abjad', label: 'محاسب ابجد و جفر', icon: Sparkles },
    { id: 'hisabiyat-rooh', label: 'حسابیاتِ روح، عقل، نفس و جسد', icon: Sparkles },
    { id: 'istikhara', label: 'استخارہ و تعبیرِ خواب', icon: HelpCircle },
    { id: 'takseer', label: 'علم تکسیر و طلسمات', icon: Flame },
    { id: 'aflatoon', label: 'تکسیرِ افلاطون (تصرفاتِ جفریہ)', icon: Atom },
    { id: 'madarij-rijal-studio', label: 'مدارجِ زکوٰۃ و نقشۂ رجال الغیب', icon: Compass },
    { id: 'takleeb-video-studio', label: 'علم التکعیب (ویڈیو طلسمات)', icon: Smartphone },
    { id: 'rozana-jaffri-werd', label: 'روزانہ کا جفری ورد و تفکیکِ حروف', icon: Sparkles },
    { id: 'naqsh', label: 'مولد النقوش و الواح', icon: Award },
    { id: 'aamal', label: 'اعمال و عملیات', icon: Moon },
    { id: 'saat', label: 'ساعت و کواکب شناسی', icon: Clock },
    { id: 'books', label: 'کتب و قوانین کاش البرنی', icon: BookOpen },
    { id: 'hisar', label: 'حصار اعظم و پرہیز', icon: ShieldCheck },
    { id: 'consultant', label: 'مستشار جفر AI', icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#d4a373] bg-[#f2e8cf]/95 backdrop-blur-md text-[#2c1e14] shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 gap-3">
          {/* Logo / Branding */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#bc6c25] shadow-md ring-2 ring-[#d4a373]">
              <span className="font-amiri text-2xl font-bold text-white">ک</span>
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#ccd5ae] ring-2 ring-[#2c1e14]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-amiri text-xl md:text-2xl font-bold tracking-tight text-[#5d4037]">
                  مفتاح الجفر: قوانینِ کاش البرنی
                </h1>
                <span className="rounded bg-[#faedcd] px-2.5 py-0.5 text-xs font-bold text-[#bc6c25] border border-[#d4a373]">
                  رموزِ طلسمات
                </span>
              </div>
              <p className="text-xs text-[#8d6e63] hidden sm:block">
                ماخوذ از کتب: قوانین طلسم، قوانین افلاطون، رموز الجفر، علم تکسیر و اعمال تسخیر
              </p>
            </div>
          </div>

          {/* Right Header Widgets: Search Bar, Online/Offline Badge, Creator Badge, Planetary Saat & Download Button */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Global Search Bar Button */}
            <button
              id="btn-navbar-global-search"
              onClick={() => setShowSearchModal(true)}
              className="flex items-center gap-2 bg-[#ffffff] hover:bg-[#faedcd] border-2 border-[#bc6c25] text-[#5d4037] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer transform hover:scale-105 group"
              title="ایپ کے تمام سیکشنز اور کتب میں تلاش کریں (Ctrl+K)"
            >
              <Search className="h-4 w-4 text-[#bc6c25] group-hover:scale-110 transition-transform" />
              <span>تلاش کریں (Global Search)</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-gray-100 border border-gray-300 rounded text-gray-600">
                Ctrl+K
              </kbd>
            </button>

            {/* Online / Offline Status Badge */}
            <div
              id="status-online-offline-indicator"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-xs border ${
                isOnline
                  ? 'bg-[#dce4c9] text-[#283618] border-[#606c38]'
                  : 'bg-[#faedcd] text-[#bc6c25] border-[#bc6c25]'
              }`}
              title={isOnline ? 'ایپ آن لائن ہے (ضرورت پڑنے پر جیمنائی ماڈل بھی فعال ہے)' : 'ایپ مکمل آف لائن موڈ میں بلا تعطل فعال ہے'}
            >
              {isOnline ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                  </span>
                  <Wifi className="h-3 w-3 text-[#283618]" />
                  <span>آن لائن</span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-[#bc6c25]"></span>
                  <WifiOff className="h-3 w-3 text-[#bc6c25]" />
                  <span>آف لائن موڈ</span>
                </>
              )}
            </div>

            {/* Direct Download Button */}
            <button
              id="btn-navbar-download"
              onClick={() => setShowDownloadModal(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#283618] to-[#606c38] hover:from-[#1b2610] hover:to-[#4f592d] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md transition-all cursor-pointer transform hover:scale-105"
              title="ایپلیکیشن اور مکمل سورس کوڈ ڈاؤن لوڈ کریں"
            >
              <Download className="h-4 w-4 animate-bounce text-[#dda15e]" />
              <span>ڈاؤن لوڈ ایپ / ZIP</span>
            </button>

            {/* Creator Badge & Profile Link */}
            <button
              id="btn-navbar-creator-profile"
              onClick={() => setActiveTab('profile-guide')}
              className="flex items-center gap-2 bg-[#ffffff] hover:bg-[#faedcd] border border-[#bc6c25] rounded-full pl-3 pr-1.5 py-1 text-xs text-[#5d4037] shadow-xs transition-all cursor-pointer transform hover:scale-105 group"
              title="تعارفِ مصنف و رہنما ایپ دیکھیں"
            >
              <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-[#bc6c25] to-[#283618] flex items-center justify-center text-[#dda15e] ring-1.5 ring-[#bc6c25] shrink-0">
                <Award className="h-3.5 w-3.5" />
              </div>
              <span className="text-[11px] text-[#8d6e63] hidden md:inline">کریٹر:</span>
              <span className="font-amiri font-bold text-[#bc6c25] group-hover:underline">حاجی ساجد علی گورگیج البلوشی</span>
            </button>

            {/* Planetary Saat Widget Banner */}
            <div className="flex items-center gap-2 bg-[#f9f4e8] border border-[#d4a373] rounded-full px-3.5 py-1 text-xs text-[#5d4037] shadow-xs hidden sm:flex">
              <Clock className="h-3.5 w-3.5 text-[#bc6c25]" />
              <span className="text-[#8d6e63] font-medium">{currentDayUrdu} |</span>
              <span className="font-bold text-[#bc6c25]">{currentSaatInfo}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1 no-scrollbar border-t border-[#e7d8c9]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#bc6c25] text-[#fdfaf1] shadow-md'
                    : 'text-[#5d4037] hover:bg-[#faedcd] hover:text-[#2c1e14] border border-transparent'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-[#fdfaf1]' : 'text-[#8d6e63]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* GLOBAL SEARCH MODAL */}
      <GlobalSearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelectTab={(tabId) => setActiveTab(tabId)}
      />

      {/* DOWNLOAD APP / SOURCE CODE MODAL */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" dir="rtl">
          <div className="bg-[#fefae0] border-2 border-[#bc6c25] rounded-3xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#d4a373]">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-[#bc6c25] text-white shadow-sm">
                  <FolderArchive className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-amiri text-xl font-bold text-[#5d4037]">
                    ڈاؤن لوڈ مکمل ایپلی کیشن و سورس کوڈ
                  </h3>
                  <p className="text-xs text-[#8d6e63]">
                    Kashif-ul-Jafr & Takseer Suite (مکمل پراجیکٹ)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="p-1.5 rounded-full hover:bg-[#faedcd] text-[#5d4037] transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-4 space-y-4">
              {/* Option 1: Direct 1-Click ZIP Download */}
              <div className="bg-[#ffffff] border-2 border-[#606c38] rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-[#dce4c9] text-[#283618] px-2.5 py-0.5 rounded-full">
                    طریقہ نمبر 1: براہِ راست ڈاؤن لوڈ
                  </span>
                  <span className="text-xs text-[#8d6e63] font-bold">تمام فائلیں شامل ہیں</span>
                </div>
                <h4 className="font-amiri text-lg font-bold text-[#283618] mt-2">
                  مکمل پراجیکٹ ZIP فائل ڈاؤن لوڈ کریں
                </h4>
                <p className="text-xs text-[#5d4037] mt-1 leading-relaxed">
                  اس بٹن پر کلک کرنے سے پوری ویب سائٹ کا کوڈ، کتبِ جفر، تمام الگورتھمز اور ری ایکٹ ایپلیکیشن آپ کے کمپیوٹر یا موبائل پر فوراً ڈاؤن لوڈ ہو جائے گی۔
                </p>
                <button
                  id="btn-modal-trigger-download"
                  onClick={handleDirectDownload}
                  disabled={isDownloading}
                  className="mt-3 w-full flex items-center justify-center gap-2 bg-[#283618] hover:bg-[#1f2b13] text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Download className="h-4 w-4 text-[#dda15e]" />
                  <span>{isDownloading ? 'ڈاؤن لوڈ تیار ہو رہا ہے...' : 'ابھی ZIP ڈاؤن لوڈ کریں (Download .ZIP)'}</span>
                </button>
              </div>

              {/* Option 2: Mobile / Browser App Install Guide (APK / PWA) */}
              <div className="bg-[#ffffff] border-2 border-[#bc6c25] rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-[#faedcd] text-[#bc6c25] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Smartphone className="h-3.5 w-3.5" />
                    <span>طریقہ نمبر 2: موبائل میں انسٹالیشن (APK / PWA)</span>
                  </span>
                  <span className="text-xs text-[#283618] font-bold">بغیر انٹرنیٹ چلے گی</span>
                </div>
                <h4 className="font-amiri text-base font-bold text-[#5d4037] mt-2">
                  موبائل اسکرین پر انسٹال کریں (Add to Home Screen / WebAPK)
                </h4>
                <p className="text-xs text-[#7f5539] mt-1 leading-relaxed">
                  اپنے موبائل براؤزر (Chrome / Safari) کے تھری ڈاٹس مینو میں جائیں اور <strong className="text-[#bc6c25]">"Install App" یا "Add to Home screen"</strong> پر کلک کریں۔ گوگل کروم اس کی خودکار <strong>WebAPK</strong> بنا کر آپ کے موبائل میں اصلی اینڈرائیڈ ایپ کے طور پر محفوظ کر دیتا ہے۔
                </p>
                <div className="mt-2.5 bg-[#fdfaf1] p-2 rounded-xl border border-[#d4a373] text-[11px] text-[#5d4037]">
                  💡 <strong>اینڈرائیڈ APK فائل بنانے کے لیے:</strong> ڈاؤن لوڈ کردہ زپ فائل کو <span className="font-bold text-[#bc6c25]">Website2APK Builder</span> یا <span className="font-bold text-[#bc6c25]">Capacitor / Cordova</span> کے ذریعے صرف 1 منٹ میں آفیشل <code>.apk</code> فائل میں کنورٹ کر سکتے ہیں۔
                </div>
              </div>

              {/* Option 3: AI Studio Top Bar instructions */}
              <div className="bg-[#fdfaf1] border border-dashed border-[#bc6c25] rounded-xl p-3 text-xs text-[#5d4037]">
                <strong className="text-[#bc6c25] block mb-1">💡 متبادل طریقہ (Google AI Studio مینو):</strong>
                اسکرین کے اوپر دائیں کونے میں موجود <span className="font-bold">Settings (گیئر آئیکن ⚙️)</span> پر کلک کر کے بھی <span className="font-bold">"Export to ZIP"</span> یا <span className="font-bold">"Export to GitHub"</span> کر سکتے ہیں۔
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-[#d4a373]">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="px-4 py-2 bg-[#faedcd] hover:bg-[#d4a373] text-[#5d4037] font-bold text-xs rounded-xl cursor-pointer transition-colors"
              >
                بند کریں
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

