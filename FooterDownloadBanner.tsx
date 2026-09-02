import React from 'react';
import { 
  Smartphone, 
  Download, 
  Play, 
  Pause, 
  WifiOff, 
  CheckCircle, 
  Radio, 
  RotateCcw,
  Sparkles,
  Zap,
  HardDrive
} from 'lucide-react';
import { useDownload } from '../context/DownloadContext';

interface FooterDownloadBannerProps {
  onOpenModal: () => void;
}

export const FooterDownloadBanner: React.FC<FooterDownloadBannerProps> = ({ onOpenModal }) => {
  const {
    downloadStatus,
    downloadedBytes,
    totalBytes,
    downloadSpeed,
    progressPercentage,
    startDownload,
    pauseDownload,
    resumeDownload,
    logDownloadAttempt,
    formatBytes,
    formatSpeed,
    getRemainingTime,
  } = useDownload();

  const isTransferActive = downloadStatus !== 'idle';

  const handleFooterDownloadClick = () => {
    logDownloadAttempt('v2.4.0 (اینڈرائیڈ APK و آف لائن مکمل پیکیج)');
    onOpenModal();
  };

  return (
    <div className="bg-[#3d2b1f] border-2 border-[#bc6c25] rounded-3xl p-4 sm:p-5 max-w-4xl mx-auto shadow-2xl relative overflow-hidden transition-all duration-300">
      
      {/* Background Subtle Progress Glow when active */}
      {isTransferActive && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#bc6c25]/10 via-[#dda15e]/5 to-transparent pointer-events-none transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      )}

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Left / Info Side */}
        <div className="text-right flex items-center gap-3 w-full lg:w-auto">
          <div className={`p-3 rounded-2xl text-white shadow-md shrink-0 transition-colors ${
            downloadStatus === 'downloading'
              ? 'bg-[#606c38] ring-2 ring-[#dda15e] animate-pulse'
              : downloadStatus === 'network_dropped'
                ? 'bg-amber-700 ring-2 ring-amber-400 animate-bounce'
                : downloadStatus === 'completed'
                  ? 'bg-green-700'
                  : 'bg-[#bc6c25]'
          }`}>
            {downloadStatus === 'completed' ? (
              <CheckCircle className="h-6 w-6 text-green-200" />
            ) : downloadStatus === 'network_dropped' ? (
              <WifiOff className="h-6 w-6 text-amber-200" />
            ) : (
              <Smartphone className="h-6 w-6 text-[#dda15e]" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-amiri text-lg sm:text-xl font-bold text-[#faedcd]">
                اینڈرائیڈ APK و آف لائن مکمل پیکیج
              </h4>

              {/* Live Status Pill */}
              {downloadStatus === 'downloading' && (
                <span className="inline-flex items-center gap-1 bg-green-950/80 text-green-300 border border-green-500/50 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" />
                  <span>منتقلی جاری ہے</span>
                </span>
              )}

              {downloadStatus === 'network_dropped' && (
                <span className="inline-flex items-center gap-1 bg-amber-950/90 text-amber-300 border border-amber-500 text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
                  <WifiOff className="h-3 w-3" />
                  <span>انٹرنیٹ منقطع (Resume دستیاب)</span>
                </span>
              )}

              {downloadStatus === 'paused' && (
                <span className="inline-flex items-center gap-1 bg-gray-800 text-gray-300 border border-gray-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  <Pause className="h-3 w-3" />
                  <span>موقوف (Paused)</span>
                </span>
              )}

              {downloadStatus === 'completed' && (
                <span className="inline-flex items-center gap-1 bg-green-900 text-green-200 border border-green-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  <CheckCircle className="h-3 w-3 text-green-300" />
                  <span>مکمل محفوظ شد</span>
                </span>
              )}
            </div>

            <p className="text-[11px] text-[#d4a373] mt-0.5 leading-relaxed">
              بغیر انٹرنیٹ، موبائل اور کمپیوٹر پر مکمل جفری سافٹ ویئر (۴۲ ایم بی پیکیج) مع ریزیومیبل ریکوری
            </p>
          </div>
        </div>

        {/* Right / Button & Action Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto shrink-0">
          
          {/* If Network Dropped or Paused: Quick Resume Action Button */}
          {(downloadStatus === 'network_dropped' || downloadStatus === 'paused') && (
            <button
              id="btn-footer-resume-download"
              onClick={resumeDownload}
              className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-4 py-2.5 rounded-2xl font-bold text-xs shadow-lg transition-all cursor-pointer transform hover:scale-105 ring-2 ring-amber-300 animate-pulse"
              title="ڈاؤن لوڈ وہیں سے جاری کریں"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>Resume Download</span>
            </button>
          )}

          {/* If Downloading: Quick Pause Action Button */}
          {downloadStatus === 'downloading' && (
            <button
              id="btn-footer-pause-download"
              onClick={pauseDownload}
              className="flex items-center justify-center gap-1 bg-[#283618] hover:bg-[#1b2610] text-[#dda15e] border border-[#dda15e]/40 px-3 py-2 rounded-2xl font-bold text-xs shadow-sm transition-all cursor-pointer"
              title="عارضی طور پر روکیں"
            >
              <Pause className="h-3.5 w-3.5" />
              <span className="text-[11px]">Pause</span>
            </button>
          )}

          {/* MAIN BUTTON: #btn-footer-apk-download */}
          <button
            id="btn-footer-apk-download"
            onClick={handleFooterDownloadClick}
            className="relative group overflow-hidden flex items-center justify-between gap-3 bg-gradient-to-r from-[#283618] via-[#384920] to-[#606c38] hover:from-[#1b2610] hover:to-[#283618] text-[#fefae0] px-5 py-2.5 rounded-2xl font-bold text-xs shadow-md transition-all cursor-pointer transform hover:scale-[1.02] border border-[#dda15e]/50 min-w-[210px]"
          >
            {/* Embedded Progress Fill inside Button */}
            {isTransferActive && (
              <div 
                className={`absolute inset-0 transition-all duration-300 pointer-events-none ${
                  downloadStatus === 'network_dropped'
                    ? 'bg-amber-600/40'
                    : downloadStatus === 'paused'
                      ? 'bg-gray-600/40'
                      : 'bg-[#bc6c25]/50'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            )}

            <div className="relative z-10 flex items-center gap-2">
              {downloadStatus === 'downloading' ? (
                <Radio className="h-4 w-4 text-[#dda15e] animate-spin" />
              ) : downloadStatus === 'completed' ? (
                <CheckCircle className="h-4 w-4 text-green-300" />
              ) : (
                <Download className="h-4 w-4 text-[#dda15e] transition-transform group-hover:translate-y-0.5" />
              )}
              <span className="font-amiri text-sm">
                {downloadStatus === 'downloading'
                  ? `منتقلی: ${progressPercentage}%`
                  : downloadStatus === 'network_dropped'
                    ? 'ڈاؤن لوڈ رکا (Resume کریں)'
                    : downloadStatus === 'completed'
                      ? 'پیکیج تیار ہے'
                      : 'ڈاؤن لوڈ APK پیکیج'}
              </span>
            </div>

            <div className="relative z-10 bg-[#bc6c25]/90 text-white text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold tracking-tight shadow-xs flex items-center gap-1">
              <HardDrive className="h-3 w-3" />
              <span>{isTransferActive ? `${progressPercentage}%` : '~42 MB'}</span>
            </div>
          </button>
        </div>
      </div>

      {/* VISUAL PROGRESS BAR INSIDE CONTAINER: Displays during and after transfer */}
      {isTransferActive && (
        <div 
          id="container-footer-apk-progress"
          className="mt-3.5 pt-3 border-t border-[#bc6c25]/40 space-y-2 relative z-10"
        >
          {/* Metrics Row: Transferred MB vs Total 42MB, Percentage & Speed */}
          <div className="flex flex-wrap items-center justify-between text-xs text-[#faedcd] font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[#dda15e] font-bold">منتقل شدہ حجم:</span>
              <span className="bg-[#2c1e14] px-2 py-0.5 rounded-md border border-[#bc6c25]/60 text-white font-bold tracking-wider">
                {formatBytes(downloadedBytes)} / {formatBytes(totalBytes)} (~42 MB)
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              {downloadStatus === 'downloading' && (
                <span className="text-green-300 font-bold flex items-center gap-1">
                  <Zap className="h-3 w-3 text-[#dda15e]" />
                  <span>رفتار: {formatSpeed(downloadSpeed)}</span>
                </span>
              )}
              
              {downloadStatus === 'downloading' && (
                <span className="text-[#d4a373]">
                  باقی: {getRemainingTime()}
                </span>
              )}

              <span className="text-[#dda15e] font-bold bg-[#283618] px-2 py-0.5 rounded-md border border-[#dda15e]/40">
                {progressPercentage}% مکمل
              </span>
            </div>
          </div>

          {/* Visual Progress Bar Track & Glow Fill */}
          <div className="w-full bg-[#1b120c] h-3.5 rounded-full overflow-hidden p-0.5 border border-[#bc6c25] shadow-inner relative">
            <div
              id="bar-footer-apk-progress-fill"
              className={`h-full rounded-full transition-all duration-300 relative overflow-hidden ${
                downloadStatus === 'network_dropped'
                  ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 animate-pulse'
                  : downloadStatus === 'paused'
                    ? 'bg-gray-500'
                    : downloadStatus === 'completed'
                      ? 'bg-gradient-to-r from-green-600 to-green-500'
                      : 'bg-gradient-to-r from-[#bc6c25] via-[#dda15e] to-[#606c38]'
              }`}
              style={{ width: `${progressPercentage}%` }}
            >
              {/* Subtle light shimmer sweep on active download */}
              {downloadStatus === 'downloading' && (
                <div className="absolute inset-0 bg-white/25 w-full h-full animate-pulse" />
              )}
            </div>
          </div>

          {/* Micro Footer Notice inside Container */}
          <div className="flex items-center justify-between text-[10px] text-[#a89078]">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-[#dda15e]" />
              <span>HTTP Range Resumable Chunked Stream (42MB Full Repository)</span>
            </span>
            <button
              onClick={onOpenModal}
              className="text-[#dda15e] hover:underline cursor-pointer font-bold"
            >
              تفصیلات و ڈاؤن لوڈ مینو کھولیں ⇦
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
