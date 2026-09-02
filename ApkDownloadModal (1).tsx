import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Download, 
  CheckCircle, 
  Copy, 
  ShieldCheck, 
  X, 
  FolderArchive, 
  Sparkles, 
  Wifi, 
  WifiOff, 
  Pause, 
  Play, 
  RotateCcw, 
  FileCheck, 
  Check, 
  Radio, 
  Zap, 
  Info,
  History,
  Trash2,
  Clock,
  HardDrive,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useDownload } from '../context/DownloadContext';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [showHistoryView, setShowHistoryView] = useState<boolean>(false);

  const {
    downloadStatus,
    downloadedBytes,
    totalBytes,
    downloadSpeed,
    progressPercentage,
    isNetworkOffline,
    autoResumeTimer,
    downloadHistory,
    startDownload,
    pauseDownload,
    resumeDownload,
    restartDownload,
    simulateNetworkDrop,
    clearDownloadHistory,
    formatBytes,
    formatSpeed,
    getRemainingTime,
  } = useDownload();

  // Track PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    } else {
      alert('اینڈرائیڈ پر انسٹال کرنے کے لیے براؤزر کے اوپر دائیں تھری ڈاٹس (⋮) مینو میں جائیں اور "Install App" یا "Add to Home Screen" منتخب کریں۔');
    }
  };

  const handleCopyDirectUrl = () => {
    const directUrl = window.location.origin + '/api/download-zip';
    navigator.clipboard.writeText(directUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs" dir="rtl">
      <div className="bg-[#fefae0] border-2 border-[#bc6c25] rounded-3xl max-w-xl w-full p-6 shadow-2xl relative overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#d4a373]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#283618] text-white shadow-sm">
              <Smartphone className="h-6 w-6 text-[#dda15e]" />
            </div>
            <div>
              <h3 className="font-amiri text-2xl font-bold text-[#5d4037]">
                ڈاؤن لوڈ ایپ، APK و سورس پیکیج
              </h3>
              <p className="text-xs text-[#8d6e63] font-medium">
                Kashif-ul-Jafr Suite | آف لائن پیکیج مع Resume Download سہولت
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="btn-view-download-history"
              onClick={() => setShowHistoryView(!showHistoryView)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                showHistoryView
                  ? 'bg-[#bc6c25] text-white border-[#bc6c25]'
                  : 'bg-[#faedcd] hover:bg-[#d4a373] text-[#5d4037] border-[#d4a373]'
              }`}
              title="ڈاؤن لوڈ ہسٹری دیکھیں"
            >
              <History className="h-3.5 w-3.5" />
              <span>{showHistoryView ? 'واپس ڈاؤن لوڈ مینو' : 'View Download History'}</span>
              {downloadHistory.length > 0 && (
                <span className="bg-[#283618] text-[#dda15e] text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                  {downloadHistory.length}
                </span>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#faedcd] text-[#5d4037] transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* IF HISTORY VIEW IS ACTIVE */}
        {showHistoryView ? (
          <div className="mt-4 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between bg-[#fdfaf1] border border-[#d4a373] p-3 rounded-2xl">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#bc6c25] text-white">
                  <History className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-amiri text-base font-bold text-[#5d4037]">
                    براؤزر ڈاؤن لوڈ ہسٹری و سابقہ ورژنز
                  </h4>
                  <p className="text-[11px] text-[#8d6e63]">
                    آپ کے براؤزر اسٹوریج (Local Storage) میں محفوظ کی گئی ڈاؤن لوڈ کوششیں
                  </p>
                </div>
              </div>
              {downloadHistory.length > 0 && (
                <button
                  onClick={clearDownloadHistory}
                  className="flex items-center gap-1 text-[11px] text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  title="ہسٹری صاف کریں"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>صاف کریں</span>
                </button>
              )}
            </div>

            {/* History List */}
            {downloadHistory.length === 0 ? (
              <div className="text-center py-8 bg-white border border-dashed border-[#d4a373] rounded-2xl p-4">
                <HardDrive className="h-8 w-8 text-[#d4a373] mx-auto mb-2 opacity-60" />
                <p className="text-xs text-[#8d6e63]">فی الوقت کوئی ڈاؤن لوڈ لاگ موجود نہیں ہے۔</p>
                <button
                  onClick={() => setShowHistoryView(false)}
                  className="mt-3 inline-flex items-center gap-1 bg-[#283618] text-white px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5 text-[#dda15e]" />
                  <span>ابھی ڈاؤن لوڈ کریں</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                {downloadHistory.map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-white border border-[#d4a373] hover:border-[#bc6c25] rounded-2xl p-3.5 shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                        rec.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {rec.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-xs text-[#5d4037] font-amiri text-sm">
                            {rec.version}
                          </span>
                          <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                            rec.status === 'completed'
                              ? 'bg-green-100 text-green-800 border border-green-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}>
                            {rec.statusUrdu}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#8d6e63] font-mono flex items-center gap-2">
                          <span>{rec.fileName}</span>
                          <span>•</span>
                          <span>{rec.fileSize}</span>
                        </p>
                        <p className="text-[10px] text-[#a89078]">
                          تاریخ و وقت: {rec.formattedDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => {
                          setShowHistoryView(false);
                          startDownload();
                        }}
                        className="flex items-center gap-1 bg-[#283618] hover:bg-[#1b2610] text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                        title="دوبارہ ڈاؤن لوڈ کریں"
                      >
                        <RefreshCw className="h-3 w-3 text-[#dda15e]" />
                        <span>ڈاؤن لوڈ</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 flex justify-between items-center text-xs">
              <button
                onClick={() => setShowHistoryView(false)}
                className="flex items-center gap-1 text-[#bc6c25] hover:underline font-bold cursor-pointer"
              >
                <ArrowRight className="h-3.5 w-3.5" />
                <span>واپس ڈاؤن لوڈ پینل پر جائیں</span>
              </button>
            </div>
          </div>
        ) : (
          /* STANDARD DOWNLOAD VIEW */
          <>
            {/* Security & Offline Resilient verified badge */}
            <div className="mt-4 flex items-center justify-between gap-2 bg-[#dce4c9] border border-[#606c38] p-3 rounded-2xl text-xs text-[#283618]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#283618]" />
                <span>
                  <strong>محفوظ و قابلِ بحالی ڈاؤن لوڈ (Resumable Download):</strong> انٹرنیٹ بند ہونے پر فائل دوبارہ شروع سے ڈاؤن لوڈ کرنے کی ضرورت نہیں پڑے گی!
                </span>
              </div>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 ${
                isNetworkOffline ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-green-100 text-green-800'
              }`}>
                {isNetworkOffline ? <WifiOff className="h-3.5 w-3.5 text-amber-700" /> : <Wifi className="h-3.5 w-3.5 text-green-700" />}
                <span>{isNetworkOffline ? 'انٹرنیٹ منقطع' : 'آن لائن'}</span>
              </div>
            </div>

            {/* Main Options */}
            <div className="mt-5 space-y-4">
              
              {/* Option 1: Resumable Full Source & Package Downloader */}
              <div className="bg-[#ffffff] border-2 border-[#bc6c25] rounded-2xl p-4 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-[#faedcd] text-[#bc6c25] px-3 py-0.5 rounded-full flex items-center gap-1">
                    <FolderArchive className="h-3.5 w-3.5" />
                    <span>طریقہ نمبر ۱: مکمل پراجیکٹ (.ZIP) مع Resume Download</span>
                  </span>
                  <span className="text-[11px] text-[#283618] font-bold bg-[#dce4c9] px-2 py-0.5 rounded-md">
                    نیٹ ورک ڈراپ محفوظ
                  </span>
                </div>

                <h4 className="font-amiri text-lg font-bold text-[#5d4037] mt-2">
                  مکمل آف لائن پیکیج فائل (.ZIP) ڈاؤن لوڈ کریں
                </h4>
                <p className="text-xs text-[#7f5539] mt-1 leading-relaxed">
                  تمام جفری انجن، کاش البرنی قواعد، تنتر جنتر موڈیول، نوڈ سرور اور آف لائن ڈیٹا بیس شامل ہے۔ کمزور انٹرنیٹ یا کنکشن ڈراپ ہونے پر وہیں سے جاری کرنے کی سہولت فعال ہے۔
                </p>

                {/* Interactive Resumable Downloader Box */}
                <div className="mt-3.5 p-3.5 rounded-xl bg-[#fdfaf1] border border-[#d4a373]">
                  
                  {/* IDLE STATE */}
                  {downloadStatus === 'idle' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#5d4037]">
                        <span>کل حجم: <strong>{formatBytes(totalBytes)}</strong></span>
                        <span className="text-[#283618] font-bold flex items-center gap-1">
                          <Zap className="h-3.5 w-3.5 text-[#bc6c25]" />
                          <span>چنک سپورٹ و خودکار ریکوری</span>
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          id="btn-start-resumable-download"
                          onClick={startDownload}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#283618] hover:bg-[#1b2610] text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
                        >
                          <Download className="h-4 w-4 text-[#dda15e]" />
                          <span>ڈاؤن لوڈ شروع کریں (Start Download)</span>
                        </button>

                        <button
                          id="btn-copy-direct-link"
                          onClick={handleCopyDirectUrl}
                          className="flex items-center justify-center gap-1.5 bg-[#fefae0] border border-[#d4a373] hover:bg-[#faedcd] text-[#5d4037] font-bold text-xs py-2.5 px-3 rounded-xl transition-all cursor-pointer shrink-0"
                          title="ڈاؤن لوڈ لنک کاپی کریں"
                        >
                          {copiedLink ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-[#bc6c25]" />}
                          <span>{copiedLink ? 'لنک کاپی ہو گیا!' : 'لنک کاپی کریں'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* CONNECTING / DOWNLOADING / PAUSED / NETWORK DROPPED STATES */}
                  {(downloadStatus === 'connecting' || downloadStatus === 'downloading' || downloadStatus === 'paused' || downloadStatus === 'network_dropped') && (
                    <div className="space-y-3">
                      
                      {/* Status Banner */}
                      {downloadStatus === 'network_dropped' && (
                        <div 
                          id="alert-network-dropped"
                          className="p-3 bg-amber-50 border-2 border-amber-500 rounded-xl text-xs text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 animate-pulse"
                        >
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-amber-200 text-amber-900 shrink-0">
                              <WifiOff className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-bold text-amber-900">
                                انٹرنیٹ رابطہ منقطع ہو گیا ہے! (Connection Dropped)
                              </p>
                              <p className="text-[11px] text-amber-800">
                                فکر نہ کریں! {formatBytes(downloadedBytes)} ({progressPercentage}%) محفوظ ہے۔ انٹرنیٹ بحال ہونے پر بٹن دبائیں۔
                              </p>
                            </div>
                          </div>

                          {autoResumeTimer !== null && (
                            <div className="text-xs bg-amber-200 px-2.5 py-1 rounded-lg font-bold text-amber-900 shrink-0">
                              خودکار بحالی: {autoResumeTimer} سیکنڈ
                            </div>
                          )}
                        </div>
                      )}

                      {downloadStatus === 'paused' && (
                        <div className="p-2.5 bg-gray-100 border border-gray-400 rounded-xl text-xs text-gray-800 flex items-center gap-2">
                          <Pause className="h-4 w-4 text-gray-600 shrink-0" />
                          <span>ڈاؤن لوڈ روکا گیا ہے۔ آپ کسی بھی وقت دوبارہ جاری کر سکتے ہیں۔</span>
                        </div>
                      )}

                      {downloadStatus === 'downloading' && (
                        <div className="flex items-center justify-between text-xs font-bold text-[#5d4037]">
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#bc6c25] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#bc6c25]"></span>
                            </span>
                            <span>ڈاؤن لوڈنگ جاری ہے...</span>
                          </div>
                          <span className="text-[#283618] font-mono">{formatSpeed(downloadSpeed)}</span>
                        </div>
                      )}

                      {downloadStatus === 'connecting' && (
                        <div className="flex items-center gap-2 text-xs font-bold text-[#bc6c25]">
                          <Radio className="h-4 w-4 animate-spin text-[#bc6c25]" />
                          <span>سرور سے محفوظ رابطہ قائم کیا جا رہا ہے...</span>
                        </div>
                      )}

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono text-[#5d4037]">
                          <span>{formatBytes(downloadedBytes)} / {formatBytes(totalBytes)}</span>
                          <span className="font-bold text-[#bc6c25]">{progressPercentage}%</span>
                        </div>

                        <div className="w-full bg-[#e9d8a6] h-3.5 rounded-full overflow-hidden p-0.5 border border-[#d4a373]">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${
                              downloadStatus === 'network_dropped' 
                                ? 'bg-amber-600' 
                                : downloadStatus === 'paused'
                                  ? 'bg-gray-500'
                                  : 'bg-gradient-to-r from-[#bc6c25] to-[#606c38]'
                            }`}
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-[#8d6e63]">
                          <span>باقی وقت: {getRemainingTime()}</span>
                          <span>ریکوری بائٹس محفوظ: {downloadedBytes}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        
                        {(downloadStatus === 'network_dropped' || downloadStatus === 'paused') && (
                          <button
                            id="btn-resume-download"
                            onClick={resumeDownload}
                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#283618] to-[#405423] hover:from-[#1b2610] hover:to-[#283618] text-white font-bold py-2.5 px-4 rounded-xl shadow-lg transition-all cursor-pointer transform hover:scale-[1.02] ring-2 ring-[#dda15e]"
                          >
                            <Play className="h-4 w-4 text-[#dda15e] fill-[#dda15e]" />
                            <span>ڈاؤن لوڈ دوبارہ جاری کریں (Resume Download)</span>
                          </button>
                        )}

                        {downloadStatus === 'downloading' && (
                          <button
                            id="btn-pause-download"
                            onClick={pauseDownload}
                            className="flex-1 flex items-center justify-center gap-2 bg-[#faedcd] border border-[#bc6c25] hover:bg-[#d4a373] text-[#5d4037] font-bold py-2 px-3 rounded-xl transition-all cursor-pointer text-xs"
                          >
                            <Pause className="h-4 w-4 text-[#bc6c25]" />
                            <span>عارضی طور پر روکیں (Pause)</span>
                          </button>
                        )}

                        {downloadStatus === 'downloading' && (
                          <button
                            id="btn-simulate-network-drop"
                            onClick={simulateNetworkDrop}
                            className="flex items-center justify-center gap-1 bg-amber-100 border border-amber-400 hover:bg-amber-200 text-amber-900 font-bold py-2 px-3 rounded-xl transition-all cursor-pointer text-[11px]"
                            title="کنکشن ڈراپ اور Resume کا تجربہ کریں"
                          >
                            <WifiOff className="h-3.5 w-3.5 text-amber-700" />
                            <span>ٹیسٹ: نیٹ ورک ڈراپ آزمائیں</span>
                          </button>
                        )}

                        <button
                          id="btn-restart-download"
                          onClick={restartDownload}
                          className="flex items-center justify-center gap-1 bg-[#fdfaf1] border border-[#d4a373] hover:bg-[#faedcd] text-[#8d6e63] hover:text-[#5d4037] py-2 px-3 rounded-xl transition-all cursor-pointer text-xs"
                          title="شروع سے ڈاؤن لوڈ کریں"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>نئے سرے سے</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* COMPLETED STATE */}
                  {downloadStatus === 'completed' && (
                    <div className="space-y-3 text-center py-2">
                      <div className="flex items-center justify-center gap-2 text-green-800 font-bold text-sm">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>مبارک ہو! پیکیج مکمل ڈاؤن لوڈ ہو چکا ہے (100%)</span>
                      </div>

                      <div className="bg-green-50 border border-green-300 p-2.5 rounded-xl text-xs text-green-900 text-right space-y-1">
                        <p className="flex items-center gap-1.5 font-bold">
                          <FileCheck className="h-4 w-4 text-green-700" />
                          <span>فائل محفوظ کر دی گئی: kashif-ul-jafr-complete-source.zip ({formatBytes(totalBytes)})</span>
                        </p>
                        <p className="text-[11px] text-green-800">
                          تمام سورس فائلیں، جفری انجن اور ڈیٹا بیس محفوظ سلامت منتقل ہو چکی ہیں۔
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-1">
                        <button
                          onClick={startDownload}
                          className="flex items-center gap-1.5 bg-[#283618] hover:bg-[#1b2610] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                        >
                          <RotateCcw className="h-3.5 w-3.5 text-[#dda15e]" />
                          <span>دوبارہ ڈاؤن لوڈ کریں</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Option 2: Direct APK / PWA Mobile Install */}
              <div className="bg-[#ffffff] border-2 border-[#606c38] rounded-2xl p-4 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-[#dce4c9] text-[#283618] px-3 py-0.5 rounded-full flex items-center gap-1">
                    <Smartphone className="h-3.5 w-3.5" />
                    <span>طریقہ نمبر ۲: موبائل میں انسٹالیشن (WebAPK / Native App)</span>
                  </span>
                  <span className="text-[11px] text-[#283618] font-bold">بغیر انٹرنیٹ چلے گی</span>
                </div>

                <h4 className="font-amiri text-lg font-bold text-[#283618] mt-2">
                  اینڈرائیڈ موبائل پر براہِ راست انسٹال کریں (Install App)
                </h4>
                <p className="text-xs text-[#5d4037] mt-1 leading-relaxed">
                  گوگل کروم یا سام سنگ انٹرنیٹ کے ذریعے ایپ کو فون کی ہوم اسکرین پر انسٹال کریں، یہ خودکار طور پر فل اسکرین اصلی ایپ (APK) میں تبدیل ہو جائے گی۔
                </p>

                <button
                  id="btn-install-apk-pwa"
                  onClick={handleInstallPWA}
                  className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#bc6c25] to-[#a2591d] hover:from-[#a2591d] hover:to-[#8c4a16] text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
                >
                  <Smartphone className="h-4 w-4" />
                  <span>ابھی فون میں انسٹال کریں (Install WebAPK)</span>
                </button>
              </div>

              {/* Instructions to generate standalone .apk file */}
              <div className="bg-[#fdfaf1] border border-dashed border-[#bc6c25] rounded-2xl p-3.5 text-xs text-[#5d4037]">
                <div className="flex items-center gap-1.5 font-bold text-[#bc6c25] mb-1">
                  <Sparkles className="h-4 w-4" />
                  <span>مستقل آفیشل اینڈرائیڈ APK بنانے کا طریقہ:</span>
                </div>
                <p className="leading-relaxed text-[11px]">
                  ڈاؤن لوڈ کردہ زپ فائل سے اینڈرائیڈ موبائل کی <code className="bg-[#faedcd] px-1.5 py-0.5 rounded text-[#5d4037] font-bold">.apk</code> فائل بنانے کے لیے مفت سافٹ ویئر <strong>Website2APK Builder</strong>، <strong>Capacitor</strong> یا <strong>Android Studio</strong> میں یہ فولڈر منتخب کریں اور صرف 1 کلک میں اپنی ذاتی اینڈرائیڈ ایپ فائل بنا لیں۔
                </p>
              </div>
            </div>
          </>
        )}

        {/* Modal Footer */}
        <div className="mt-5 flex items-center justify-between pt-3 border-t border-[#d4a373]">
          <div className="flex items-center gap-3 text-[11px] text-[#8d6e63]">
            <button
              onClick={() => setShowHistoryView(!showHistoryView)}
              className="text-[#bc6c25] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <History className="h-3.5 w-3.5" />
              <span>{showHistoryView ? 'واپس ڈاؤن لوڈ پر جائیں' : 'View Download History (ہسٹری لاگ)'}</span>
            </button>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Info className="h-3.5 w-3.5 text-[#bc6c25]" />
              <span>HTTP Range 206 Partial Content</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#faedcd] hover:bg-[#d4a373] text-[#5d4037] font-bold text-xs rounded-xl cursor-pointer transition-colors"
          >
            بند کریں (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
