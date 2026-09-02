import React, { useState, useEffect, useMemo, useRef } from 'react';
import { TakseerSession, DayActivityData, TakseerPracticeCategory } from '../types';
import { 
  Flame, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Award, 
  TrendingUp, 
  Plus, 
  Play, 
  RotateCcw, 
  Trash2, 
  Sparkles, 
  BarChart3, 
  Activity, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  ShieldCheck, 
  Atom, 
  Heart, 
  Check, 
  UserCheck, 
  ChevronLeft,
  ChevronRight,
  Filter,
  Save
} from 'lucide-react';

const STORAGE_KEY = 'miftah_jafr_takseer_sessions_v1';

// Initial sample sessions for the past 7 days if storage is empty
const getInitialSampleSessions = (): TakseerSession[] => {
  const sessions: TakseerSession[] = [];
  const now = new Date();
  
  const sampleTitles = [
    { title: 'تکسیرِ صدر و مؤخر (یا فتاح)', cat: 'sadr_muakhkhar' as TakseerPracticeCategory, catUrdu: 'صدر و مؤخر', count: 313, dur: 25, focus: 5, notes: 'بوقتِ فجر بعد از نماز، یکسوئی کامل' },
    { title: 'تکسیرِ افلاطونی برائے الفت', cat: 'aflatoon' as TakseerPracticeCategory, catUrdu: 'افلاطونی تکسیر', count: 500, dur: 35, focus: 4, notes: 'ساعتِ زہرہ میں قرطاسِ زعفرانی پر مشاہدہ' },
    { title: 'وردِ اسمِ اعظم و تکسیرِ انوار', cat: 'asmaul_husna' as TakseerPracticeCategory, catUrdu: 'اسمائے حسنیٰ', count: 1000, dur: 45, focus: 5, notes: 'بخورِ لبان و عود کے ساتھ' },
    { title: 'حصارِ اعظم و مراقبۂ قلبی', cat: 'hisar_riyazat' as TakseerPracticeCategory, catUrdu: 'حصار و مراقبہ', count: 100, dur: 20, focus: 4, notes: 'آیت الکرسی کا حصار و مراقبہ' },
    { title: 'تکسیرِ فتح و نصرت (یا علیم)', cat: 'sadr_muakhkhar' as TakseerPracticeCategory, catUrdu: 'صدر و مؤخر', count: 400, dur: 30, focus: 5, notes: 'ساعتِ شمس میں حصولِ فتح' },
    { title: 'ریاضتِ چلۂ تکسیر', cat: 'chilla_amal' as TakseerPracticeCategory, catUrdu: 'چلہ و عمل', count: 700, dur: 40, focus: 4, notes: 'روزِ جمعہ المبارک بعد نمازِ عشاء' },
  ];

  // Distribute over the past 6 days and today
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // 1 or 2 sessions per day for a rich starting chart
    const countSessions = i % 2 === 0 ? 2 : 1;
    for (let j = 0; j < countSessions; j++) {
      const sample = sampleTitles[(i + j) % sampleTitles.length];
      sessions.push({
        id: `sample-${i}-${j}-${Date.now()}`,
        date: dateStr,
        time: j === 0 ? '06:30' : '20:15',
        title: sample.title,
        category: sample.cat,
        categoryUrdu: sample.catUrdu,
        count: sample.count + (i * 20),
        durationMinutes: sample.dur,
        focusScore: sample.focus,
        associatedText: sample.title.split('(')[1]?.replace(')', '') || 'یا لطیف',
        notes: sample.notes,
        completedAt: new Date(d.setHours(j === 0 ? 6 : 20, 30, 0)).toISOString(),
      });
    }
  }

  return sessions;
};

interface TakseerTrackerProps {
  onSelectTakseerWord?: (word: string) => void;
}

export const TakseerTracker: React.FC<TakseerTrackerProps> = () => {
  // State for sessions
  const [sessions, setSessions] = useState<TakseerSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading saved sessions', e);
    }
    return getInitialSampleSessions();
  });

  // Save on state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Error saving sessions', e);
    }
  }, [sessions]);

  // Chart Metric Mode: Sessions count vs Minutes vs Recitations
  const [chartMetric, setChartMetric] = useState<'sessions' | 'minutes' | 'recitations'>('sessions');
  const [selectedDayDetail, setSelectedDayDetail] = useState<DayActivityData | null>(null);

  // Live Meditation Counter State
  const [isLiveActive, setIsLiveActive] = useState<boolean>(false);
  const [liveTitle, setLiveTitle] = useState<string>('تکسیرِ صدر و مؤخر (یا ودود)');
  const [liveCategory, setLiveCategory] = useState<TakseerPracticeCategory>('sadr_muakhkhar');
  const [liveTarget, setLiveTarget] = useState<number>(313);
  const [liveCount, setLiveCount] = useState<number>(0);
  const [liveSeconds, setLiveSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [liveNotes, setLiveNotes] = useState<string>('');

  // Quick Manual Log Form State
  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);
  const [logTitle, setLogTitle] = useState<string>('تکسیرِ صدر و مؤخر');
  const [logCategory, setLogCategory] = useState<TakseerPracticeCategory>('sadr_muakhkhar');
  const [logCount, setLogCount] = useState<number>(100);
  const [logDuration, setLogDuration] = useState<number>(20);
  const [logDate, setLogDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [logNotes, setLogNotes] = useState<string>('');
  const [logFocus, setLogFocus] = useState<number>(5);

  // Audio Context for soft spiritual chime
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, ctx.currentTime); // 528Hz Solfeggio frequency (Harmonious chime)
      osc.frequency.exponentialRampToValueAtTime(132, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  };

  // Timer Effect for Live Meditation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isLiveActive && isTimerRunning) {
      interval = setInterval(() => {
        setLiveSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLiveActive, isTimerRunning]);

  // Handle Tasbih increment
  const handleTasbihClick = () => {
    setLiveCount((prev) => {
      const next = prev + 1;
      playClickSound();
      if (!isTimerRunning) {
        setIsTimerRunning(true);
      }
      return next;
    });
  };

  // Save Live Session
  const handleSaveLiveSession = () => {
    const durationMins = Math.max(1, Math.round(liveSeconds / 60));
    const catMap: Record<TakseerPracticeCategory, string> = {
      sadr_muakhkhar: 'صدر و مؤخر',
      aflatoon: 'افلاطونی تکسیر',
      asmaul_husna: 'اسمائے حسنیٰ',
      hisar_riyazat: 'حصار و مراقبہ',
      qalb_meditation: 'مراقبۂ قلبی',
      chilla_amal: 'چلہ و عمل',
    };

    const newSession: TakseerSession = {
      id: `session-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('ur-PK', { hour: '2-digit', minute: '2-digit' }),
      title: liveTitle.trim() || 'تکسیر و ریاضت',
      category: liveCategory,
      categoryUrdu: catMap[liveCategory],
      count: liveCount,
      durationMinutes: durationMins,
      focusScore: 5,
      notes: liveNotes.trim(),
      completedAt: new Date().toISOString(),
    };

    setSessions((prev) => [newSession, ...prev]);
    setIsLiveActive(false);
    setIsTimerRunning(false);
    setLiveCount(0);
    setLiveSeconds(0);
    setLiveNotes('');
  };

  // Save Manual Form Session
  const handleSaveManualLog = (e: React.FormEvent) => {
    e.preventDefault();
    const catMap: Record<TakseerPracticeCategory, string> = {
      sadr_muakhkhar: 'صدر و مؤخر',
      aflatoon: 'افلاطونی تکسیر',
      asmaul_husna: 'اسمائے حسنیٰ',
      hisar_riyazat: 'حصار و مراقبہ',
      qalb_meditation: 'مراقبۂ قلبی',
      chilla_amal: 'چلہ و عمل',
    };

    const newSession: TakseerSession = {
      id: `session-${Date.now()}`,
      date: logDate,
      time: new Date().toLocaleTimeString('ur-PK', { hour: '2-digit', minute: '2-digit' }),
      title: logTitle.trim() || 'تکسیر و ورد',
      category: logCategory,
      categoryUrdu: catMap[logCategory],
      count: Number(logCount) || 1,
      durationMinutes: Number(logDuration) || 5,
      focusScore: logFocus,
      notes: logNotes.trim(),
      completedAt: new Date().toISOString(),
    };

    setSessions((prev) => [newSession, ...prev]);
    setIsLogModalOpen(false);
    setLogTitle('تکسیرِ صدر و مؤخر');
    setLogNotes('');
  };

  // Delete a session
  const handleDeleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  // Reset to initial sample
  const handleResetSessions = () => {
    if (window.confirm('کیا آپ تمام معمولات کو ری سیٹ کرنا چاہتے ہیں؟')) {
      const initial = getInitialSampleSessions();
      setSessions(initial);
    }
  };

  // Calculate Past 7 Days Activity Data
  const weeklyData: DayActivityData[] = useMemo(() => {
    const result: DayActivityData[] = [];
    const now = new Date();
    const urduDaysShort = ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'];
    const urduDaysFull = [
      'اتوار (یکشنبہ)',
      'پیر (دوشنبہ)',
      'منگل (سہ شنبہ)',
      'بدھ (چہار شنبہ)',
      'جمعرات (پنجشنبہ)',
      'جمعہ (آدینہ)',
      'ہفتہ (شنبہ)',
    ];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayOfWeek = d.getDay();
      
      const daySessions = sessions.filter((s) => s.date === dateStr);
      const totalMins = daySessions.reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0);
      const totalRecit = daySessions.reduce((acc, curr) => acc + (curr.count || 0), 0);

      const formatted = d.toLocaleDateString('ur-PK', {
        month: 'short',
        day: 'numeric',
      });

      result.push({
        dateStr,
        dayShortUrdu: urduDaysShort[dayOfWeek],
        dayFullUrdu: urduDaysFull[dayOfWeek],
        formattedDate: formatted,
        sessionsCount: daySessions.length,
        totalMinutes: totalMins,
        totalRecitations: totalRecit,
        isToday: i === 0,
        sessions: daySessions,
      });
    }

    return result;
  }, [sessions]);

  // Summary Metrics
  const summaryMetrics = useMemo(() => {
    const totalSessions = weeklyData.reduce((acc, d) => acc + d.sessionsCount, 0);
    const totalMinutes = weeklyData.reduce((acc, d) => acc + d.totalMinutes, 0);
    const totalRecitations = weeklyData.reduce((acc, d) => acc + d.totalRecitations, 0);

    // Calculate current streak (days with at least 1 session consecutively from today or yesterday backwards)
    let streak = 0;
    const sortedDates = [...weeklyData].reverse();
    for (const day of sortedDates) {
      if (day.sessionsCount > 0) {
        streak++;
      } else {
        // If today is empty, don't break streak yet if yesterday had activity
        if (day.isToday && streak === 0) {
          continue;
        }
        break;
      }
    }

    const avgMinutesPerDay = Math.round(totalMinutes / 7);
    const bestDay = [...weeklyData].sort((a, b) => b.sessionsCount - a.sessionsCount)[0];

    return {
      totalSessions,
      totalMinutes,
      totalRecitations,
      streak,
      avgMinutesPerDay,
      bestDay,
    };
  }, [weeklyData]);

  // Max value for bar scaling
  const maxBarValue = useMemo(() => {
    if (chartMetric === 'sessions') {
      const max = Math.max(...weeklyData.map((d) => d.sessionsCount), 1);
      return Math.max(max, 4);
    } else if (chartMetric === 'minutes') {
      const max = Math.max(...weeklyData.map((d) => d.totalMinutes), 1);
      return Math.max(max, 60);
    } else {
      const max = Math.max(...weeklyData.map((d) => d.totalRecitations), 1);
      return Math.max(max, 1000);
    }
  }, [weeklyData, chartMetric]);

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="takseer-tracker-root">
      {/* ========================================================================= */}
      {/* 1. TOP HERO & OFFICIAL CREATOR RECOGNITION (حاجی ساجد علی گورگیج البلوشی) */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-[#f9f4e8] p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 bg-[#bc6c25]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ccd5ae]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bc6c25]/15 border border-[#bc6c25]/30 text-xs font-bold text-[#8c5717] font-amiri">
              <Sparkles className="h-3.5 w-3.5" />
              <span>نظامِ مراقبت و محاسبۂ ریاضتِ جفر و تکسیر</span>
            </div>
            
            <h2 className="font-amiri text-2xl sm:text-3xl lg:text-4xl font-bold text-[#5d4037]">
              روزانہ تکسیر، ریاضت و مراقبہ ٹریکر
            </h2>
            
            <p className="text-xs sm:text-sm text-[#8d6e63] font-medium leading-relaxed">
              روزمرہ اذکارِ تکسیر، مشاہداتِ قلبی اور ریاضت کے معمولات کا باقاعدہ اندراج کریں اور گزشتہ ہفتے کی سرگرمیوں کا تجزیاتی گراف دیکھیں۔
            </p>
          </div>

          {/* Software Creator & Developer Card */}
          <div className="w-full lg:w-auto bg-[#ffffff]/90 rounded-2xl border-2 border-[#bc6c25] p-4 shadow-md backdrop-blur-xs flex items-center gap-4">
            <div className="shrink-0 relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#bc6c25] to-[#8c5717] flex items-center justify-center text-white shadow-md ring-2 ring-[#d4a373]">
                <Award className="h-7 w-7 text-[#faedcd]" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            </div>

            <div className="space-y-1 text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#faedcd] text-[#bc6c25] border border-[#d4a373]/50">
                  سافٹ ویئر کریٹر
                </span>
              </div>
              <h3 className="font-amiri text-base sm:text-lg font-bold text-[#5d4037] leading-snug">
                حاجی ساجد علی گورگیج البلوشی
              </h3>
              <p className="text-[11px] text-[#8d6e63] font-medium font-sans">
                Software Creator & Jafar Systems Architect
              </p>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="relative z-10 mt-6 pt-5 border-t border-[#d4a373]/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiveActive(true)}
              id="btn-start-live-takseer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#bc6c25] hover:bg-[#9c581e] text-white font-amiri font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>براہِ راست تسبیح و مراقبہ شروع کریں</span>
            </button>

            <button
              onClick={() => setIsLogModalOpen(true)}
              id="btn-add-manual-log"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#d4a373] bg-[#faedcd] hover:bg-[#f2e8cf] text-[#5d4037] font-amiri font-bold text-sm transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4 text-[#bc6c25]" />
              <span>سابقہ نشست درج کریں</span>
            </button>
          </div>

          <button
            onClick={handleResetSessions}
            className="text-xs text-[#8d6e63] hover:text-[#bc6c25] underline cursor-pointer font-sans"
            title="نمونہ ڈیٹا بحال کریں"
          >
            ڈیٹا ری سیٹ کریں
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. STATS & KEY METRICS CARDS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Current Streak */}
        <div className="rounded-2xl border border-[#d4a373] bg-[#ffffff] p-4 sm:p-5 shadow-sm text-center relative overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-2">
            <Flame className="h-5 w-5" />
          </div>
          <span className="text-[11px] sm:text-xs text-[#8d6e63] font-medium block">موجودہ تسلسل (Streak)</span>
          <div className="font-amiri text-2xl sm:text-3xl font-bold text-[#bc6c25] mt-0.5">
            {summaryMetrics.streak} <span className="text-xs font-sans text-[#8d6e63]">دن</span>
          </div>
          <p className="text-[10px] text-[#8d6e63] mt-1 font-sans">مسلسل ریاضت</p>
        </div>

        {/* Metric 2: Weekly Sessions */}
        <div className="rounded-2xl border border-[#d4a373] bg-[#ffffff] p-4 sm:p-5 shadow-sm text-center relative overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-[11px] sm:text-xs text-[#8d6e63] font-medium block">ہفتہ وار نشستیں</span>
          <div className="font-amiri text-2xl sm:text-3xl font-bold text-[#283618] mt-0.5">
            {summaryMetrics.totalSessions} <span className="text-xs font-sans text-[#8d6e63]">نشستیں</span>
          </div>
          <p className="text-[10px] text-[#8d6e63] mt-1 font-sans">گزشتہ ۷ ایام میں</p>
        </div>

        {/* Metric 3: Total Meditation Minutes */}
        <div className="rounded-2xl border border-[#d4a373] bg-[#ffffff] p-4 sm:p-5 shadow-sm text-center relative overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2">
            <Clock className="h-5 w-5" />
          </div>
          <span className="text-[11px] sm:text-xs text-[#8d6e63] font-medium block">کل دورانیہ (وقت)</span>
          <div className="font-amiri text-2xl sm:text-3xl font-bold text-[#8c5717] mt-0.5">
            {summaryMetrics.totalMinutes} <span className="text-xs font-sans text-[#8d6e63]">منٹ</span>
          </div>
          <p className="text-[10px] text-[#8d6e63] mt-1 font-sans">اوسطاً {summaryMetrics.avgMinutesPerDay} منٹ روزانہ</p>
        </div>

        {/* Metric 4: Total Recitations */}
        <div className="rounded-2xl border border-[#d4a373] bg-[#ffffff] p-4 sm:p-5 shadow-sm text-center relative overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="h-5 w-5" />
          </div>
          <span className="text-[11px] sm:text-xs text-[#8d6e63] font-medium block">کل تکرار و تسبیح</span>
          <div className="font-amiri text-2xl sm:text-3xl font-bold text-[#5d4037] mt-0.5">
            {summaryMetrics.totalRecitations.toLocaleString()}
          </div>
          <p className="text-[10px] text-[#8d6e63] mt-1 font-sans">تعدادِ تکرارِ حروف و اسم</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. WEEKLY FREQUENCY BAR CHART (گزشتہ ۷ ایام کی سرگرمی کا گراف) */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-[#ffffff] p-6 sm:p-8 shadow-lg space-y-6">
        {/* Chart Header & Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#d4a373]/30 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#bc6c25]">
              <BarChart3 className="h-5 w-5" />
              <h3 className="font-amiri text-xl font-bold text-[#5d4037]">
                ہفتہ وار تعدد و پیش رفت کا بار چارٹ (Weekly Frequency Chart)
              </h3>
            </div>
            <p className="text-xs text-[#8d6e63]">
              گزشتہ ۷ دنوں میں آپ کی روزانہ تکسیر و مراقبہ کی سرگرمی کی بصری نمائندگی
            </p>
          </div>

          {/* Metric Selector Buttons */}
          <div className="flex items-center gap-1.5 bg-[#fdfaf1] p-1.5 rounded-xl border border-[#d4a373]">
            <button
              onClick={() => setChartMetric('sessions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-amiri font-bold transition-all cursor-pointer ${
                chartMetric === 'sessions'
                  ? 'bg-[#bc6c25] text-white shadow-xs'
                  : 'text-[#5d4037] hover:bg-[#faedcd]'
              }`}
            >
              تعدادِ نشستیں
            </button>
            <button
              onClick={() => setChartMetric('minutes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-amiri font-bold transition-all cursor-pointer ${
                chartMetric === 'minutes'
                  ? 'bg-[#bc6c25] text-white shadow-xs'
                  : 'text-[#5d4037] hover:bg-[#faedcd]'
              }`}
            >
              کل وقت (منٹ)
            </button>
            <button
              onClick={() => setChartMetric('recitations')}
              className={`px-3 py-1.5 rounded-lg text-xs font-amiri font-bold transition-all cursor-pointer ${
                chartMetric === 'recitations'
                  ? 'bg-[#bc6c25] text-white shadow-xs'
                  : 'text-[#5d4037] hover:bg-[#faedcd]'
              }`}
            >
              تعدادِ تکرار
            </button>
          </div>
        </div>

        {/* The Visual Bar Chart Container */}
        <div className="relative pt-6 pb-2">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-x-0 top-6 bottom-14 flex flex-col justify-between pointer-events-none opacity-30">
            <div className="border-b border-dashed border-[#d4a373]" />
            <div className="border-b border-dashed border-[#d4a373]" />
            <div className="border-b border-dashed border-[#d4a373]" />
            <div className="border-b border-dashed border-[#d4a373]" />
          </div>

          {/* Columns Grid for the 7 Days */}
          <div className="grid grid-cols-7 gap-2 sm:gap-4 h-64 sm:h-72 items-end relative z-10 px-2 sm:px-4">
            {weeklyData.map((day, idx) => {
              const currentVal =
                chartMetric === 'sessions'
                  ? day.sessionsCount
                  : chartMetric === 'minutes'
                  ? day.totalMinutes
                  : day.totalRecitations;

              // Calculate height percentage (min 4% so empty bar is still slightly visible)
              const heightPercent = currentVal > 0 
                ? Math.min(100, Math.max(12, Math.round((currentVal / maxBarValue) * 100))) 
                : 4;

              const isSelected = selectedDayDetail?.dateStr === day.dateStr;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDayDetail(isSelected ? null : day)}
                  className="group flex flex-col items-center h-full justify-end cursor-pointer transition-all"
                >
                  {/* Value Tooltip / Label above Bar */}
                  <div className="mb-2 text-center opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className={`text-[11px] sm:text-xs font-bold font-sans px-2 py-0.5 rounded-md shadow-xs ${
                      day.isToday
                        ? 'bg-[#bc6c25] text-white'
                        : currentVal > 0
                        ? 'bg-[#f4e6c8] text-[#5d4037] border border-[#d4a373]'
                        : 'text-neutral-400'
                    }`}>
                      {currentVal > 0 ? (chartMetric === 'minutes' ? `${currentVal}م` : currentVal) : '۰'}
                    </span>
                  </div>

                  {/* The Bar Pillar */}
                  <div className="w-full max-w-[48px] bg-[#f9f4e8] rounded-t-xl overflow-hidden border border-[#d4a373]/40 p-1 flex items-end shadow-inner h-full max-h-[190px]">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-lg transition-all duration-500 relative ${
                        day.isToday
                          ? 'bg-gradient-to-t from-[#bc6c25] to-[#d4a373] shadow-md ring-2 ring-[#bc6c25]/50'
                          : currentVal > 0
                          ? 'bg-gradient-to-t from-[#606c38] to-[#a3b18a] group-hover:from-[#bc6c25] group-hover:to-[#d4a373]'
                          : 'bg-neutral-200'
                      }`}
                    >
                      {/* Top highlight glow */}
                      {currentVal > 0 && (
                        <div className="w-full h-1 bg-white/40 rounded-t-lg" />
                      )}
                    </div>
                  </div>

                  {/* Day Label & Date */}
                  <div className="mt-2.5 text-center space-y-0.5">
                    <span className={`block font-amiri text-xs sm:text-sm font-bold ${
                      day.isToday ? 'text-[#bc6c25]' : 'text-[#5d4037]'
                    }`}>
                      {day.dayShortUrdu}
                    </span>
                    <span className="block text-[10px] text-[#8d6e63] font-sans">
                      {day.formattedDate}
                    </span>
                    {day.isToday && (
                      <span className="inline-block text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#bc6c25] text-white">
                        آج
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Inspector Panel */}
        {selectedDayDetail && (
          <div className="rounded-2xl border-2 border-[#bc6c25] bg-[#fdfaf1] p-4 sm:p-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#d4a373] pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#bc6c25]" />
                <h4 className="font-amiri text-base font-bold text-[#5d4037]">
                  تفصیلاتِ یوم: {selectedDayDetail.dayFullUrdu} — ({selectedDayDetail.formattedDate})
                </h4>
              </div>
              <button
                onClick={() => setSelectedDayDetail(null)}
                className="text-xs text-[#8d6e63] hover:text-[#5d4037] cursor-pointer"
              >
                بند کریں ✕
              </button>
            </div>

            {selectedDayDetail.sessions.length === 0 ? (
              <p className="text-xs text-[#8d6e63] text-center py-2">
                اس دن کوئی ریاضت ریکارڈ نہیں ہوئی۔
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedDayDetail.sessions.map((s) => (
                  <div key={s.id} className="bg-white p-3 rounded-xl border border-[#d4a373] shadow-xs flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-[#5d4037] block font-amiri text-sm">{s.title}</span>
                      <span className="text-[11px] text-[#8d6e63]">{s.categoryUrdu} | {s.time}</span>
                      {s.notes && <p className="text-[10px] text-[#8c5717] mt-0.5 italic">"{s.notes}"</p>}
                    </div>
                    <div className="text-left shrink-0">
                      <span className="font-bold text-[#bc6c25] block font-sans">{s.count} بار</span>
                      <span className="text-[10px] text-[#8d6e63] font-sans">{s.durationMinutes} منٹ</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. LIVE DIGITAL MEDITATION & TASBIH ROOM */}
      {/* ========================================================================= */}
      {isLiveActive && (
        <div className="rounded-3xl border-2 border-[#bc6c25] bg-[#2c1e14] text-[#fdfaf1] p-6 sm:p-10 shadow-2xl relative overflow-hidden animate-fadeIn">
          {/* Ambient Spiritual Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#bc6c25]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#d4a373]/30 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bc6c25]/30 border border-[#bc6c25]/60 text-xs font-bold text-[#faedcd]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>براہِ راست ریاضت و تسبیح موڈ</span>
                </div>
                <h3 className="font-amiri text-2xl font-bold text-[#faedcd]">
                  حجرۂ ذکر و تکسیرِ روحانی
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-2.5 rounded-xl border border-[#d4a373]/50 transition-colors cursor-pointer ${
                    soundEnabled ? 'bg-[#bc6c25] text-white' : 'bg-black/30 text-neutral-400'
                  }`}
                  title={soundEnabled ? 'صوتی بیپ فعال ہے' : 'صوتی بیپ غیر فعال ہے'}
                >
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>

                <button
                  onClick={() => setIsLiveActive(false)}
                  className="px-4 py-2 rounded-xl border border-[#d4a373]/50 bg-black/30 hover:bg-black/50 text-xs font-bold text-[#faedcd] cursor-pointer"
                >
                  منسوخ کریں
                </button>
              </div>
            </div>

            {/* Practice Setup Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-[#d4a373] block mb-1 font-amiri">عنوانِ عمل / تکسیر:</label>
                <input
                  type="text"
                  value={liveTitle}
                  onChange={(e) => setLiveTitle(e.target.value)}
                  className="w-full bg-[#3d2b1f] border border-[#d4a373]/50 rounded-xl px-3 py-2 text-sm text-white focus:outline-hidden focus:border-[#bc6c25]"
                  placeholder="مثلاً: تکسیرِ یا ودود"
                />
              </div>

              <div>
                <label className="text-xs text-[#d4a373] block mb-1 font-amiri">قسمِ ریاضت:</label>
                <select
                  value={liveCategory}
                  onChange={(e) => setLiveCategory(e.target.value as TakseerPracticeCategory)}
                  className="w-full bg-[#3d2b1f] border border-[#d4a373]/50 rounded-xl px-3 py-2 text-sm text-white focus:outline-hidden focus:border-[#bc6c25]"
                >
                  <option value="sadr_muakhkhar">تکسیرِ صدر و مؤخر</option>
                  <option value="aflatoon">تکسیرِ افلاطونی (عناصر)</option>
                  <option value="asmaul_husna">اسمائے حسنیٰ و آیات</option>
                  <option value="hisar_riyazat">حصار و مراقبہ</option>
                  <option value="qalb_meditation">مراقبۂ قلبی</option>
                  <option value="chilla_amal">چلہ و عملِ تسخیر</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#d4a373] block mb-1 font-amiri">ہدف (تعدادِ تکرار):</label>
                <div className="flex items-center gap-1.5">
                  {[33, 100, 313, 1000].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setLiveTarget(t)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        liveTarget === t
                          ? 'bg-[#bc6c25] text-white shadow-xs'
                          : 'bg-[#3d2b1f] text-[#d4a373] border border-[#d4a373]/30 hover:bg-[#4d3829]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Central Interactive Clicker */}
            <div className="flex flex-col items-center justify-center py-6 space-y-6">
              {/* Live Timer Clock */}
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#d4a373]/40 text-xs font-sans text-[#faedcd]">
                <Clock className="h-4 w-4 text-[#bc6c25]" />
                <span>دورانیہ: {formatTimer(liveSeconds)}</span>
                <span className="mx-1">•</span>
                <span>ہدف: {liveTarget}</span>
              </div>

              {/* Huge Circular Counter Button */}
              <button
                onClick={handleTasbihClick}
                id="btn-tasbih-clicker"
                className="group relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-[#bc6c25] to-[#7f4f24] hover:from-[#d4a373] hover:to-[#bc6c25] active:scale-95 text-white flex flex-col items-center justify-center shadow-2xl ring-8 ring-[#bc6c25]/30 transition-all cursor-pointer select-none"
              >
                <span className="text-xs sm:text-sm text-[#faedcd] font-amiri font-bold mb-1">
                  تسبیح / کلک کریں
                </span>
                <span className="font-amiri text-5xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md">
                  {liveCount}
                </span>
                <span className="text-[11px] text-[#faedcd]/80 font-sans mt-1">
                  {liveTarget > 0 ? `${Math.round((liveCount / liveTarget) * 100)}% مکمل` : 'جاری'}
                </span>

                {/* Pulsing ring */}
                <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping pointer-events-none opacity-20" />
              </button>

              {/* Quick Adjustment Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLiveCount((p) => Math.max(0, p - 1))}
                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-[#d4a373]/30 text-xs text-[#faedcd] hover:bg-black/60 cursor-pointer"
                >
                  -1 کم کریں
                </button>
                <button
                  onClick={() => setLiveCount(0)}
                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-[#d4a373]/30 text-xs text-[#faedcd] hover:bg-black/60 cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>صفر کریں</span>
                </button>
                <button
                  onClick={() => setLiveCount((p) => p + 10)}
                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-[#d4a373]/30 text-xs text-[#faedcd] hover:bg-black/60 cursor-pointer"
                >
                  +10 بڑھائیں
                </button>
              </div>
            </div>

            {/* Notes & Save Bottom Bar */}
            <div className="pt-4 border-t border-[#d4a373]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <input
                type="text"
                value={liveNotes}
                onChange={(e) => setLiveNotes(e.target.value)}
                placeholder="مشاہدات، کیفیات یا نیت نوٹ کریں (اختیاری)..."
                className="w-full sm:w-2/3 bg-[#3d2b1f] border border-[#d4a373]/50 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-400 focus:outline-hidden"
              />

              <button
                onClick={handleSaveLiveSession}
                id="btn-save-live-session"
                disabled={liveCount === 0}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white font-amiri font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>ریاضت مکمل و محفوظ کریں</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MANUAL SESSION LOG MODAL */}
      {/* ========================================================================= */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#fdfaf1] rounded-2xl border-2 border-[#d4a373] shadow-2xl p-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#d4a373] pb-3">
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-[#bc6c25]" />
                <h3 className="font-amiri text-xl font-bold text-[#5d4037]">
                  نشستِ ریاضت کا اندراج
                </h3>
              </div>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="text-[#8d6e63] hover:text-[#5d4037] text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveManualLog} className="space-y-4 text-xs sm:text-sm font-amiri">
              <div>
                <label className="block text-[#5d4037] font-bold mb-1">عنوان / کلمۂ تکسیر:</label>
                <input
                  type="text"
                  required
                  value={logTitle}
                  onChange={(e) => setLogTitle(e.target.value)}
                  className="w-full bg-white border border-[#d4a373] rounded-xl px-3 py-2 text-[#2c1e14] focus:outline-hidden focus:ring-1 focus:ring-[#bc6c25]"
                  placeholder="مثلاً: تکسیرِ صدر و مؤخر برائے رزق"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5d4037] font-bold mb-1">قسمِ ریاضت:</label>
                  <select
                    value={logCategory}
                    onChange={(e) => setLogCategory(e.target.value as TakseerPracticeCategory)}
                    className="w-full bg-white border border-[#d4a373] rounded-xl px-3 py-2 text-[#2c1e14]"
                  >
                    <option value="sadr_muakhkhar">صدر و مؤخر</option>
                    <option value="aflatoon">افلاطونی تکسیر</option>
                    <option value="asmaul_husna">اسمائے حسنیٰ</option>
                    <option value="hisar_riyazat">حصار و مراقبہ</option>
                    <option value="qalb_meditation">مراقبۂ قلبی</option>
                    <option value="chilla_amal">چلہ و عمل</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#5d4037] font-bold mb-1">تاریخِ عمل:</label>
                  <input
                    type="date"
                    required
                    value={logDate}
                    onChange={(e) => setLogDate(e.target.value)}
                    className="w-full bg-white border border-[#d4a373] rounded-xl px-3 py-2 text-[#2c1e14]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5d4037] font-bold mb-1">تعدادِ تکرار (تسبیح):</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={logCount}
                    onChange={(e) => setLogCount(Number(e.target.value))}
                    className="w-full bg-white border border-[#d4a373] rounded-xl px-3 py-2 text-[#2c1e14]"
                  />
                </div>

                <div>
                  <label className="block text-[#5d4037] font-bold mb-1">دورانیہ (منٹ):</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={logDuration}
                    onChange={(e) => setLogDuration(Number(e.target.value))}
                    className="w-full bg-white border border-[#d4a373] rounded-xl px-3 py-2 text-[#2c1e14]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#5d4037] font-bold mb-1">وارداتِ قلبی / کیفیات و نوٹس:</label>
                <textarea
                  rows={2}
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  placeholder="ریاضت کے دوران حاصل ہونے والی کیفیات..."
                  className="w-full bg-white border border-[#d4a373] rounded-xl px-3 py-2 text-[#2c1e14]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#d4a373]">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#d4a373] bg-[#faedcd] text-[#5d4037] font-bold cursor-pointer"
                >
                  منسوخ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#bc6c25] hover:bg-[#9c581e] text-white font-bold shadow-md cursor-pointer"
                >
                  محفوظ کریں
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. HISTORY OF SESSIONS LIST */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-[#ffffff] p-6 sm:p-8 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-[#d4a373]/30 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#bc6c25]" />
            <h3 className="font-amiri text-xl font-bold text-[#5d4037]">
              سابقہ ریکارڈ و تاریخچۂ ریاضت (Practice Logbook)
            </h3>
          </div>
          <span className="text-xs text-[#8d6e63] font-sans">
            کل ریکارڈز: {sessions.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#f4e6c8] border-b-2 border-[#d4a373] text-[#5d4037] font-amiri font-bold">
                <th className="py-2.5 px-3">تاریخ و وقت</th>
                <th className="py-2.5 px-3">عنوانِ تکسیر و عمل</th>
                <th className="py-2.5 px-3">قسم</th>
                <th className="py-2.5 px-3 text-center">تعدادِ تکرار</th>
                <th className="py-2.5 px-3 text-center">دورانیہ</th>
                <th className="py-2.5 px-3">کیفیات و نوٹس</th>
                <th className="py-2.5 px-2 text-center w-12">حذف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d4a373]/30 font-amiri">
              {sessions.slice(0, 15).map((s) => (
                <tr key={s.id} className="hover:bg-[#fdfaf1] transition-colors">
                  <td className="py-2 px-3 text-[#5d4037] font-sans font-medium text-xs whitespace-nowrap">
                    {s.date} <span className="text-[#8d6e63]">({s.time})</span>
                  </td>
                  <td className="py-2 px-3 font-bold text-[#5d4037]">
                    {s.title}
                  </td>
                  <td className="py-2 px-3">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#faedcd] text-[#bc6c25] border border-[#d4a373]/40 text-xs">
                      {s.categoryUrdu}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center font-sans font-bold text-[#bc6c25]">
                    {s.count.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-center font-sans text-[#8d6e63]">
                    {s.durationMinutes} منٹ
                  </td>
                  <td className="py-2 px-3 text-[11px] text-[#8d6e63] max-w-xs truncate">
                    {s.notes || '---'}
                  </td>
                  <td className="py-2 px-2 text-center">
                    <button
                      onClick={() => handleDeleteSession(s.id)}
                      className="p-1 rounded text-red-400 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                      title="حذف کریں"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
