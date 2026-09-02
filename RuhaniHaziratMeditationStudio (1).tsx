import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Flame,
  Eye,
  Activity,
  Compass,
  CheckCircle2,
  BookOpen,
  Volume1,
  Sun,
  Layers,
  Award
} from 'lucide-react';
import { spiritualAudio, SOUNDSCAPE_OPTIONS, FrequencyType } from '../utils/spiritualAudioEngine';

interface BreathingPattern {
  id: string;
  nameUrdu: string;
  nameEn: string;
  inhale: number;
  hold: number;
  exhale: number;
  holdEmpty: number;
  description: string;
  tradition: string;
}

const BREATHING_PATTERNS: BreathingPattern[] = [
  {
    id: 'biruni_habas',
    nameUrdu: 'حبسِ دمِ کاش البرنی (قوتِ تسخیر و ارادہ)',
    nameEn: 'Kaash Al-Biruni Habas-e-Dam (2-8-4-2)',
    inhale: 2,
    hold: 8,
    exhale: 4,
    holdEmpty: 2,
    description: 'کاش البرنی کی تصنیف "قوانینِ طلسم" کے مطابق: سانس روکنے سے ارواح و موکلین کے سامنے قوتِ متخیلہ اور ارادی مقناطیسیت انتہا تک پہنچتی ہے۔',
    tradition: 'روایت: قوانینِ طلسم و رموز الجفر'
  },
  {
    id: 'box_breathing',
    nameUrdu: 'تنفسِ مربع (۴-۴-۴-۴)',
    nameEn: 'Box Breathing (Murabba Nafas)',
    inhale: 4,
    hold: 4,
    exhale: 4,
    holdEmpty: 4,
    description: 'چار عناصر (آتش، باد، آب، خاک) کے توازن کے لیے۔ اعصابی نظام کو پرسکون اور ذہن کو پتھر کی طرح ساکن کرتا ہے۔',
    tradition: 'روایت: ائمہ جفر و ریاضت'
  },
  {
    id: 'deep_calm',
    nameUrdu: 'تنفسِ سکونِ باطن (۴-۷-۸)',
    nameEn: 'Deep Spiritual Calm (4-7-8)',
    inhale: 4,
    hold: 7,
    exhale: 8,
    holdEmpty: 0,
    description: 'خوف، وہم اور رجعت کے وساوس کو جڑ سے ختم کرنے کے لیے۔ گہرا سکون پیدا کرتا ہے۔',
    tradition: 'روایت: مشائخِ تصوف'
  },
  {
    id: 'sufi_lataif',
    nameUrdu: 'تنفسِ لطائفِ ستہ (۳-۹-۶-۰)',
    nameEn: 'Sufi Lataif Activation (3-9-6)',
    inhale: 3,
    hold: 9,
    exhale: 6,
    holdEmpty: 0,
    description: 'قلب، روح اور سر کے لطائف کو روشن کرنے اور باطنی کشف کے لیے مخصوص تنفس۔',
    tradition: 'روایت: سلسلہ چشتیہ و قادریہ'
  }
];

export const RuhaniHaziratMeditationStudio: React.FC = () => {
  // Audio State
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [selectedSoundscape, setSelectedSoundscape] = useState<FrequencyType>('432hz');
  const [volume, setVolume] = useState<number>(0.4);

  // Breathing State
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(BREATHING_PATTERNS[0]);
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdEmpty'>('inhale');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState<number>(BREATHING_PATTERNS[0].inhale);
  const [breathCycleCount, setBreathCycleCount] = useState<number>(0);

  // Visual Focal Point State
  const [focalType, setFocalType] = useState<'point_noor' | 'candle_flame' | 'sacred_yantra' | 'abjad_circle' | 'breathing_mandala'>('point_noor');
  const [focalBrightness, setFocalBrightness] = useState<number>(100);

  // Preparation Protocol State
  const [selectedAmalGoal, setSelectedAmalGoal] = useState<string>('mahabbat');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  // Chanting Counter State
  const [chantCount, setChantCount] = useState<number>(0);
  const [chantTarget, setChantTarget] = useState<number>(100);

  // Timer Ref
  const breathTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio Play/Pause Handler
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      spiritualAudio.stop();
      setIsPlayingAudio(false);
    } else {
      spiritualAudio.play(selectedSoundscape, volume);
      setIsPlayingAudio(true);
    }
  };

  const handleSoundscapeChange = (type: FrequencyType) => {
    setSelectedSoundscape(type);
    if (isPlayingAudio) {
      spiritualAudio.play(type, volume);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    spiritualAudio.setVolume(newVol);
  };

  // Breathing Loop
  useEffect(() => {
    if (!isBreathingActive) {
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
      setBreathPhase('inhale');
      setPhaseSecondsLeft(selectedPattern.inhale);
      return;
    }

    breathTimerRef.current = setInterval(() => {
      setPhaseSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Transition to next phase
        if (breathPhase === 'inhale') {
          if (selectedPattern.hold > 0) {
            setBreathPhase('hold');
            spiritualAudio.playChime(639);
            return selectedPattern.hold;
          } else {
            setBreathPhase('exhale');
            spiritualAudio.playChime(432);
            return selectedPattern.exhale;
          }
        } else if (breathPhase === 'hold') {
          setBreathPhase('exhale');
          spiritualAudio.playChime(432);
          return selectedPattern.exhale;
        } else if (breathPhase === 'exhale') {
          if (selectedPattern.holdEmpty > 0) {
            setBreathPhase('holdEmpty');
            spiritualAudio.playChime(396);
            return selectedPattern.holdEmpty;
          } else {
            setBreathPhase('inhale');
            setBreathCycleCount(c => c + 1);
            spiritualAudio.playChime(528);
            return selectedPattern.inhale;
          }
        } else if (breathPhase === 'holdEmpty') {
          setBreathPhase('inhale');
          setBreathCycleCount(c => c + 1);
          spiritualAudio.playChime(528);
          return selectedPattern.inhale;
        }
        return selectedPattern.inhale;
      });
    }, 1000);

    return () => {
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
    };
  }, [isBreathingActive, breathPhase, selectedPattern]);

  const toggleBreathing = () => {
    if (isBreathingActive) {
      setIsBreathingActive(false);
    } else {
      setBreathPhase('inhale');
      setPhaseSecondsLeft(selectedPattern.inhale);
      setIsBreathingActive(true);
      spiritualAudio.playChime(528);
    }
  };

  const resetBreathing = () => {
    setIsBreathingActive(false);
    setBreathPhase('inhale');
    setPhaseSecondsLeft(selectedPattern.inhale);
    setBreathCycleCount(0);
  };

  // Step Toggle
  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  // Get Phase Label in Urdu
  const getPhaseUrdu = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'سانس اندر کھینچیں (Inhale)';
      case 'hold':
        return 'حبسِ دم: سانس روکیں (Hold - Habas)';
      case 'exhale':
        return 'سانس آہستہ خارج کریں (Exhale)';
      case 'holdEmpty':
        return 'خالی رکھیں و سکون پائیں (Empty Void)';
      default:
        return '';
    }
  };

  // Get phase scale multiplier for visual animation
  const getVisualScale = () => {
    if (!isBreathingActive) return 1;
    switch (breathPhase) {
      case 'inhale':
        return 1.4;
      case 'hold':
        return 1.45;
      case 'exhale':
        return 0.85;
      case 'holdEmpty':
        return 0.8;
      default:
        return 1;
    }
  };

  const getVisualTransitionDuration = () => {
    switch (breathPhase) {
      case 'inhale':
        return `${selectedPattern.inhale}s`;
      case 'hold':
        return `${selectedPattern.hold}s`;
      case 'exhale':
        return `${selectedPattern.exhale}s`;
      case 'holdEmpty':
        return `${selectedPattern.holdEmpty}s`;
      default:
        return '1s';
    }
  };

  return (
    <div id="ruhani-hazirat-studio-root" className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border-2 border-[#d4a373] bg-gradient-to-r from-[#2c1e14] via-[#3e2723] to-[#1a120b] p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bc6c25]/30 border border-[#d4a373] text-[#faedcd] text-xs font-bold mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[#e9c46a]" />
              روایتِ کاش البرنی، قوانینِ طلسم و کتبِ صوفیاء
            </div>
            <h2 className="font-amiri text-2xl md:text-3xl font-bold text-[#faedcd]">
              روحانی حاضرات، مراقبہ و ریاضت برائے تیاریِ اعمال
            </h2>
            <p className="text-sm text-[#e0cfc8] max-w-3xl mt-1 leading-relaxed">
              عمل کے آغاز سے قبل باطنی قوت کو مجتمع کرنے، قوتِ ارادی و متخیلہ کو بیدار کرنے، حبسِ دم (Breathing Mastery) اور صوتی لہروں کے ذریعے دل و دماغ کو یکسو کرنے کا خودکار نظام۔
            </p>
          </div>

          {/* Quick Sound Toggle Button */}
          <div className="flex items-center gap-3 bg-[#1e1510]/80 p-3 rounded-xl border border-[#d4a373]/50">
            <button
              id="audio-toggle-btn"
              onClick={handleToggleAudio}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md ${
                isPlayingAudio
                  ? 'bg-[#bc6c25] text-white hover:bg-[#a55b1f] ring-2 ring-[#e9c46a]'
                  : 'bg-[#faedcd] text-[#2c1e14] hover:bg-white'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="h-4 w-4 text-[#faedcd] animate-pulse" />
                  صوت جاری ہے (روکیں)
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 text-[#bc6c25]" />
                  روحانی لے سنیں (Play Audio)
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Visual Focal Chamber & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Visual Focal Chamber (نقطۂ توجہ و مراقبہ گاہ) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="rounded-2xl border-2 border-[#d4a373] bg-[#1a120b] p-6 shadow-xl flex flex-col items-center justify-between min-h-[460px] relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#2c1e14]/50 via-transparent to-[#1a120b] pointer-events-none" />

            {/* Chamber Top Bar */}
            <div className="w-full flex items-center justify-between z-10 text-xs text-[#faedcd]/80 pb-2 border-b border-[#5d4037]">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-[#e9c46a]" />
                <span className="font-bold">مرکزِ نگاہ (Focal Point):</span>
                <span className="text-[#e9c46a]">
                  {focalType === 'point_noor' && 'نقطۂ نور (Point of Noor)'}
                  {focalType === 'candle_flame' && 'شمعِ حاضرات (Candle Flame)'}
                  {focalType === 'sacred_yantra' && 'خاتمِ سلیمانی (Sacred Geometry)'}
                  {focalType === 'abjad_circle' && 'دائرۂ حروفِ ابجد (28 Letters Wheel)'}
                  {focalType === 'breathing_mandala' && 'حلقۂ تنفّس (Breathing Ring)'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-400">سائیکل:</span>
                <span className="font-mono font-bold text-[#e9c46a]">{breathCycleCount}</span>
              </div>
            </div>

            {/* CENTER FOCAL VISUAL */}
            <div className="my-auto py-10 flex flex-col items-center justify-center relative w-full h-[280px]">
              
              {/* 1. Point of Noor (نقطۂ نور) */}
              {focalType === 'point_noor' && (
                <div className="relative flex items-center justify-center">
                  <div
                    className="rounded-full bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-300 shadow-[0_0_80px_rgba(250,237,205,0.85)] transition-all ease-in-out"
                    style={{
                      width: '42px',
                      height: '42px',
                      transform: `scale(${getVisualScale()})`,
                      transitionDuration: getVisualTransitionDuration(),
                      opacity: focalBrightness / 100,
                    }}
                  />
                  <div
                    className="absolute rounded-full border border-amber-300/30 transition-all ease-in-out animate-ping"
                    style={{
                      width: '120px',
                      height: '120px',
                      animationDuration: '4s'
                    }}
                  />
                  <div
                    className="absolute rounded-full border border-amber-400/20 transition-all ease-in-out"
                    style={{
                      width: '200px',
                      height: '200px',
                      transform: `scale(${getVisualScale() * 1.1})`,
                      transitionDuration: getVisualTransitionDuration(),
                    }}
                  />
                </div>
              )}

              {/* 2. Candle Flame (شمعِ حاضرات) */}
              {focalType === 'candle_flame' && (
                <div className="flex flex-col items-center justify-center relative">
                  {/* Flame Glow */}
                  <div
                    className="rounded-full bg-amber-400/20 blur-xl absolute"
                    style={{
                      width: '160px',
                      height: '160px',
                      transform: `scale(${getVisualScale()})`,
                      transitionDuration: getVisualTransitionDuration(),
                    }}
                  />
                  {/* Animated Candle Flame */}
                  <div
                    className="w-8 h-16 bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 rounded-full shadow-[0_0_45px_#f59e0b] animate-bounce transition-transform"
                    style={{
                      borderRadius: '50% 50% 35% 35% / 60% 60% 40% 40%',
                      transform: `scale(${getVisualScale()})`,
                      transitionDuration: getVisualTransitionDuration(),
                      animationDuration: '2.5s'
                    }}
                  />
                  {/* Wick */}
                  <div className="w-1.5 h-3 bg-zinc-800 rounded-t" />
                  {/* Candle Wax Body */}
                  <div className="w-12 h-20 bg-gradient-to-b from-amber-50 to-amber-200 rounded-b-md shadow-lg border border-amber-300/40 flex items-center justify-center">
                    <span className="text-[9px] font-mono text-[#bc6c25] font-bold">حاضرات</span>
                  </div>
                </div>
              )}

              {/* 3. Sacred Yantra / Khatam Sulaimani (خاتمِ سلیمانی) */}
              {focalType === 'sacred_yantra' && (
                <div
                  className="relative flex items-center justify-center transition-transform ease-in-out"
                  style={{
                    transform: `scale(${getVisualScale()})`,
                    transitionDuration: getVisualTransitionDuration(),
                  }}
                >
                  <div className="w-48 h-48 rounded-full border-2 border-[#d4a373] border-dashed animate-spin flex items-center justify-center" style={{ animationDuration: '30s' }}>
                    <div className="w-36 h-36 rounded-full border border-[#e9c46a] flex items-center justify-center">
                      <div className="w-24 h-24 border-2 border-[#faedcd] rotate-45 flex items-center justify-center">
                        <div className="w-24 h-24 border-2 border-[#bc6c25] -rotate-45 flex items-center justify-center">
                          <span className="font-amiri font-bold text-amber-200 text-xl shadow-sm">ھُـوَ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Inner glowing core */}
                  <div className="absolute w-6 h-6 rounded-full bg-amber-300 shadow-[0_0_30px_#f59e0b]" />
                </div>
              )}

              {/* 4. Abjad Circle (دائرۂ حروفِ ۲۸) */}
              {focalType === 'abjad_circle' && (
                <div
                  className="relative flex items-center justify-center transition-transform ease-in-out"
                  style={{
                    transform: `scale(${getVisualScale()})`,
                    transitionDuration: getVisualTransitionDuration(),
                  }}
                >
                  <div className="w-52 h-52 rounded-full border border-amber-400/40 animate-spin flex items-center justify-center" style={{ animationDuration: '45s' }}>
                    {['ا','ب','ج','د','ہ','و','ز','ح','ط','ی','ک','ل','م','ن','س','ع','ف','ص','ق','ر','ش','ت','ث','خ','ذ','ض','ظ','غ'].map((letter, idx) => {
                      const angle = (idx / 28) * 360;
                      return (
                        <span
                          key={idx}
                          className="absolute text-xs font-bold text-[#faedcd] font-amiri select-none"
                          style={{
                            transform: `rotate(${angle}deg) translate(95px) rotate(-${angle}deg)`,
                          }}
                        >
                          {letter}
                        </span>
                      );
                    })}
                  </div>
                  <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-[#bc6c25] to-[#e9c46a] flex items-center justify-center text-white font-amiri font-bold text-base shadow-[0_0_20px_#d4a373]">
                    الله
                  </div>
                </div>
              )}

              {/* 5. Breathing Mandala (حلقۂ تنفّس) */}
              {focalType === 'breathing_mandala' && (
                <div className="relative flex items-center justify-center">
                  <div
                    className="rounded-full border-4 border-[#e9c46a] bg-[#bc6c25]/20 shadow-[0_0_60px_rgba(233,196,106,0.5)] transition-all ease-in-out flex items-center justify-center"
                    style={{
                      width: '140px',
                      height: '140px',
                      transform: `scale(${getVisualScale()})`,
                      transitionDuration: getVisualTransitionDuration(),
                    }}
                  >
                    <span className="font-amiri text-lg font-bold text-[#faedcd] text-center">
                      {breathPhase === 'inhale' && 'جذب'}
                      {breathPhase === 'hold' && 'حبس'}
                      {breathPhase === 'exhale' && 'اخراج'}
                      {breathPhase === 'holdEmpty' && 'فراغ'}
                    </span>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Breathing HUD Overlay */}
            <div className="w-full bg-[#2c1e14]/90 rounded-xl p-3 border border-[#d4a373]/40 z-10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-[#faedcd]/80 block">کیفیتِ تنفّس (Current Rhythm Phase):</span>
                  <span className="text-sm md:text-base font-bold text-[#e9c46a] font-amiri">
                    {isBreathingActive ? getPhaseUrdu() : 'ریاضتِ تنفس شروع کرنے کے لیے بٹن دبائیں'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isBreathingActive && (
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#bc6c25] text-white font-mono font-bold text-lg ring-2 ring-[#e9c46a]">
                      {phaseSecondsLeft}
                    </div>
                  )}

                  <button
                    id="breathing-toggle-btn"
                    onClick={toggleBreathing}
                    className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
                      isBreathingActive
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-[#e9c46a] hover:bg-[#d4a373] text-[#2c1e14]'
                    }`}
                  >
                    {isBreathingActive ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    {isBreathingActive ? 'توقف (Pause)' : 'شروع کریں (Start Breathing)'}
                  </button>

                  <button
                    id="breathing-reset-btn"
                    onClick={resetBreathing}
                    className="p-2 rounded-lg bg-[#3e2723] hover:bg-[#4e342e] text-[#faedcd] border border-[#d4a373]/40"
                    title="دوبارہ شروع کریں"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Focal Point Selector Tabs */}
          <div className="rounded-xl border border-[#d4a373] bg-[#faedcd]/60 p-3">
            <span className="text-xs font-bold text-[#5d4037] block mb-2">مرکزِ بصارت (Visual Focal Pattern منتخب کریں):</span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => setFocalType('point_noor')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  focalType === 'point_noor'
                    ? 'bg-[#bc6c25] text-white shadow-sm'
                    : 'bg-white text-[#5d4037] hover:bg-[#faedcd] border border-[#d4a373]/50'
                }`}
              >
                نقطۂ نور (Noor)
              </button>
              <button
                onClick={() => setFocalType('candle_flame')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  focalType === 'candle_flame'
                    ? 'bg-[#bc6c25] text-white shadow-sm'
                    : 'bg-white text-[#5d4037] hover:bg-[#faedcd] border border-[#d4a373]/50'
                }`}
              >
                شمعِ حاضرات
              </button>
              <button
                onClick={() => setFocalType('sacred_yantra')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  focalType === 'sacred_yantra'
                    ? 'bg-[#bc6c25] text-white shadow-sm'
                    : 'bg-white text-[#5d4037] hover:bg-[#faedcd] border border-[#d4a373]/50'
                }`}
              >
                خاتمِ سلیمانی
              </button>
              <button
                onClick={() => setFocalType('abjad_circle')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  focalType === 'abjad_circle'
                    ? 'bg-[#bc6c25] text-white shadow-sm'
                    : 'bg-white text-[#5d4037] hover:bg-[#faedcd] border border-[#d4a373]/50'
                }`}
              >
                دائرۂ ابجد ۲۸
              </button>
              <button
                onClick={() => setFocalType('breathing_mandala')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  focalType === 'breathing_mandala'
                    ? 'bg-[#bc6c25] text-white shadow-sm'
                    : 'bg-white text-[#5d4037] hover:bg-[#faedcd] border border-[#d4a373]/50'
                }`}
              >
                حلقۂ تنفّس
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Audio Frequencies & Breathing Settings */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Soundscapes & Frequencies */}
          <div className="rounded-2xl border-2 border-[#d4a373] bg-[#faedcd]/40 p-4 shadow-md">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#d4a373]/60">
              <div className="flex items-center gap-2">
                <Volume1 className="h-4 w-4 text-[#bc6c25]" />
                <h3 className="font-amiri text-base font-bold text-[#5d4037]">
                  صوتی لہریں و فریکوئنسی جنریٹر (Sacred Frequencies)
                </h3>
              </div>
              <div className="flex items-center gap-1">
                {volume === 0 ? <VolumeX className="h-3.5 w-3.5 text-zinc-500" /> : <Volume2 className="h-3.5 w-3.5 text-[#bc6c25]" />}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-16 h-1.5 bg-[#d4a373] rounded-lg appearance-none cursor-pointer accent-[#bc6c25]"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
              {SOUNDSCAPE_OPTIONS.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => handleSoundscapeChange(opt.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    selectedSoundscape === opt.id
                      ? 'border-[#bc6c25] bg-[#faedcd] shadow-xs ring-1 ring-[#bc6c25]'
                      : 'border-[#d4a373]/40 bg-white/70 hover:bg-white'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-[#2c1e14] block font-amiri">
                      {opt.nameUrdu}
                    </span>
                    <span className="text-[11px] text-[#8d6e63] block">
                      {opt.purpose}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#e9c46a]/30 text-[#bc6c25] border border-[#d4a373]/50">
                    {opt.freq} Hz
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Breathing Patterns (قواعدِ حبسِ دم و تنفّس) */}
          <div className="rounded-2xl border-2 border-[#d4a373] bg-[#faedcd]/40 p-4 shadow-md">
            <div className="flex items-center gap-2 pb-2 mb-3 border-b border-[#d4a373]/60">
              <Activity className="h-4 w-4 text-[#bc6c25]" />
              <h3 className="font-amiri text-base font-bold text-[#5d4037]">
                طریقۂ تنفّس و حبسِ دم (Breathing Ratios)
              </h3>
            </div>

            <div className="space-y-2">
              {BREATHING_PATTERNS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedPattern(p);
                    resetBreathing();
                  }}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    selectedPattern.id === p.id
                      ? 'border-[#bc6c25] bg-[#faedcd] shadow-xs ring-1 ring-[#bc6c25]'
                      : 'border-[#d4a373]/40 bg-white/70 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2c1e14] font-amiri">
                      {p.nameUrdu}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#bc6c25] bg-white px-1.5 py-0.5 rounded border border-[#d4a373]/50">
                      {p.inhale}-{p.hold}-{p.exhale}-{p.holdEmpty}s
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5d4037] mt-1 leading-snug">
                    {p.description}
                  </p>
                  <span className="text-[10px] text-[#8d6e63] font-semibold block mt-0.5">
                    {p.tradition}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Preparation Steps Protocol for Specific Aamal (مخصوص اعمال کی روحانی تیاری) */}
      <div className="rounded-2xl border-2 border-[#d4a373] bg-[#faedcd]/50 p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 mb-4 border-b border-[#d4a373]">
          <div>
            <h3 className="font-amiri text-xl font-bold text-[#5d4037] flex items-center gap-2">
              <Award className="h-5 w-5 text-[#bc6c25]" />
              رہنمائے تیاری برائے مخصوص اعمال (Pre-Amal Spiritual Protocol)
            </h3>
            <p className="text-xs text-[#8d6e63]">
              عمل شروع کرنے سے قبل ان مراحل کو مکمل کرنا کامیابی اور تاثیر کی قطعی ضمانت ہے۔
            </p>
          </div>

          {/* Goal Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#5d4037]">مقصدِ عمل:</span>
            <select
              value={selectedAmalGoal}
              onChange={(e) => setSelectedAmalGoal(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-[#d4a373] bg-white text-xs font-bold text-[#5d4037] focus:outline-none focus:ring-2 focus:ring-[#bc6c25]"
            >
              <option value="mahabbat">اعمالِ محبت، تسخیر و رشتہ</option>
              <option value="kashf">اعمالِ کشف، خواب و حاضرات</option>
              <option value="fatah">اعمالِ فتح، مقدمات و دفعِ دشمن</option>
              <option value="shifa">اعمالِ شفاء و سحر کشائی</option>
              <option value="rizq">اعمالِ وسعتِ رزق و برکت</option>
              <option value="jalali">ریاضت و چلہ کشی (جلالی/جمالی)</option>
            </select>
          </div>
        </div>

        {/* Dynamic Checklist Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          
          <div
            onClick={() => toggleStep('step1')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              completedSteps['step1'] ? 'bg-emerald-50 border-emerald-400' : 'bg-white border-[#d4a373]/50 hover:bg-[#faedcd]/40'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className={`h-5 w-5 shrink-0 ${completedSteps['step1'] ? 'text-emerald-600' : 'text-zinc-300'}`} />
              <div>
                <span className="text-xs font-bold text-[#2c1e14] block">۱. طہارتِ کامل و خوشبو (Purity & Incense)</span>
                <p className="text-[11px] text-[#5d4037] mt-0.5 leading-snug">
                  غسل یا تازہ وضو کریں، پاکیزہ لباس پہنیں اور حسبِ عمل مخصوص بخور (لوبان/عود/صندل) سلگائیں۔
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => toggleStep('step2')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              completedSteps['step2'] ? 'bg-emerald-50 border-emerald-400' : 'bg-white border-[#d4a373]/50 hover:bg-[#faedcd]/40'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className={`h-5 w-5 shrink-0 ${completedSteps['step2'] ? 'text-emerald-600' : 'text-zinc-300'}`} />
              <div>
                <span className="text-xs font-bold text-[#2c1e14] block">۲. قبلہ رخ دو زانو نشست (Seating Alignment)</span>
                <p className="text-[11px] text-[#5d4037] mt-0.5 leading-snug">
                  ریڑھ کی ہڈی بالکل سیدھی رکھ کر قبلہ کی جانب منہ کر کے بیٹھیں اور آنکھیں نیم وا رکھیں۔
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => toggleStep('step3')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              completedSteps['step3'] ? 'bg-emerald-50 border-emerald-400' : 'bg-white border-[#d4a373]/50 hover:bg-[#faedcd]/40'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className={`h-5 w-5 shrink-0 ${completedSteps['step3'] ? 'text-emerald-600' : 'text-zinc-300'}`} />
              <div>
                <span className="text-xs font-bold text-[#2c1e14] block">۳. حصارِ نفس و قفلِ بدن (Protection Barrier)</span>
                <p className="text-[11px] text-[#5d4037] mt-0.5 leading-snug">
                  آیۃ الکرسی شریف ۷ بار پڑھ کر اپنے چاروں طرف دم کر کے حصار قائم کریں تاکہ رجعت سے حفاظت رہے۔
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => toggleStep('step4')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              completedSteps['step4'] ? 'bg-emerald-50 border-emerald-400' : 'bg-white border-[#d4a373]/50 hover:bg-[#faedcd]/40'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className={`h-5 w-5 shrink-0 ${completedSteps['step4'] ? 'text-emerald-600' : 'text-zinc-300'}`} />
              <div>
                <span className="text-xs font-bold text-[#2c1e14] block">۴. ۱۰ منٹ حبسِ دم و مراقبہ (10m Breath Control)</span>
                <p className="text-[11px] text-[#5d4037] mt-0.5 leading-snug">
                  اوپر موجود حبسِ دم کے نظام کو چلا کر ۱۰ منٹ تک دل کو ساکن کریں اور خیالات کو ختم کریں۔
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => toggleStep('step5')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              completedSteps['step5'] ? 'bg-emerald-50 border-emerald-400' : 'bg-white border-[#d4a373]/50 hover:bg-[#faedcd]/40'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className={`h-5 w-5 shrink-0 ${completedSteps['step5'] ? 'text-emerald-600' : 'text-zinc-300'}`} />
              <div>
                <span className="text-xs font-bold text-[#2c1e14] block">۵. ارتکازِ چشم بر مرکزِ نور (Visual Fixation)</span>
                <p className="text-[11px] text-[#5d4037] mt-0.5 leading-snug">
                  نقطۂ نور یا شمع کی لو پر نظر جمائیں، پلک جھپکائے بغیر تصور کو مطلوب یا مقصد پر باندھیں۔
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => toggleStep('step6')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              completedSteps['step6'] ? 'bg-emerald-50 border-emerald-400' : 'bg-white border-[#d4a373]/50 hover:bg-[#faedcd]/40'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className={`h-5 w-5 shrink-0 ${completedSteps['step6'] ? 'text-emerald-600' : 'text-zinc-300'}`} />
              <div>
                <span className="text-xs font-bold text-[#2c1e14] block">۶. القائے نیت و آغازِ عزیمت (Intention & Invocation)</span>
                <p className="text-[11px] text-[#5d4037] mt-0.5 leading-snug">
                  مضبوط عزم کے ساتھ قرآنی آیت یا نقش کی کتابت و تلاوت شروع کریں۔ تیر نشانہ پر لگے گا۔
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Built-in Digital Tasbih / Chanting Counter (شمارندۂ عزیمت و ذکر) */}
      <div className="rounded-2xl border-2 border-[#d4a373] bg-[#faedcd]/40 p-5 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
              <Flame className="h-5 w-5 text-[#bc6c25]" />
              شمارندۂ ذکر و تکرارِ عزیمت (Spiritual Digital Tasbih)
            </h3>
            <p className="text-xs text-[#8d6e63]">
              مراقبے کے دوران آنکھیں بند رکھ کر کلک یا ٹیپ کر کے تعداد مکمل کریں۔
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#5d4037]">ہدف (Target):</span>
            <div className="flex items-center gap-1">
              {[41, 100, 313, 1001].map(target => (
                <button
                  key={target}
                  onClick={() => setChantTarget(target)}
                  className={`px-2 py-1 rounded text-xs font-mono font-bold transition-all ${
                    chantTarget === target
                      ? 'bg-[#bc6c25] text-white'
                      : 'bg-white text-[#5d4037] border border-[#d4a373]/50'
                  }`}
                >
                  {target}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="text-center">
            <span className="text-xs text-[#8d6e63] block font-bold">موجودہ تعداد / ہدف</span>
            <div className="font-mono text-3xl font-bold text-[#2c1e14]">
              <span className="text-[#bc6c25]">{chantCount}</span> / <span className="text-zinc-500">{chantTarget}</span>
            </div>
          </div>

          <button
            id="tasbih-tap-btn"
            onClick={() => {
              setChantCount(c => c + 1);
              spiritualAudio.playChime(741);
            }}
            className="w-full sm:w-64 py-4 rounded-xl bg-gradient-to-r from-[#bc6c25] to-[#a55b1f] hover:from-[#a55b1f] hover:to-[#8c4611] text-white font-amiri text-xl font-bold shadow-lg ring-2 ring-[#e9c46a]/50 active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <Sparkles className="h-5 w-5 text-[#faedcd]" />
            ذکر شمار کریں (+1)
          </button>

          <button
            onClick={() => setChantCount(0)}
            className="px-3 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-700 text-xs font-bold"
          >
            ری سیٹ (0)
          </button>
        </div>
      </div>

      {/* Classical Wisdom Excerpt from Kash Al-Biruni */}
      <div className="rounded-2xl border border-[#d4a373] bg-[#2c1e14] p-5 text-[#faedcd] shadow-md">
        <div className="flex items-center gap-2 mb-2 text-[#e9c46a]">
          <BookOpen className="h-4 w-4" />
          <span className="text-xs font-bold tracking-wide uppercase">قانونِ تاثیر از کتابِ "قوانینِ طلسم" (کاش البرنی)</span>
        </div>
        <blockquote className="font-amiri text-base md:text-lg leading-relaxed text-[#faedcd] border-r-4 border-[#bc6c25] pr-4 italic">
          "جان لو کہ عمل کی کامیابی زبان کے الفاظ سے زیادہ باطن کے ارتکاز پر موقوف ہے۔ جب تک عامل اپنے سانس (حبسِ دم) اور نگاہ کو کسی ایک نقطہ پر مرتکز نہ کرے، اس کی متخیلہ منتشر رہتی ہے۔ جو شخص کامل یکسوئی اور حضورِ قلب کے ساتھ نقش یا عزیمت پر متوجہ ہوتا ہے، کائنات کے عناصر اور ارواحِ علویہ اس کے تابعِ فرمان ہو جاتی ہیں۔"
        </blockquote>
      </div>

    </div>
  );
};
