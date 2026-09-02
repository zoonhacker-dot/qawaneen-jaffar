import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  analyzeAndSuggestTakseerMatrix, 
  calculateAbjad,
  adadToLetters
} from '../utils/jafrEngine';
import { 
  AbjadTakseerAnalysis, 
  TakseerMatrixSuggestion, 
  MatrixObjective, 
  ChalCellStep,
  ElementType 
} from '../types';
import { 
  Sparkles, 
  Compass, 
  Flame, 
  Wind, 
  Droplets, 
  Mountain, 
  ArrowLeft, 
  Copy, 
  Check, 
  Info, 
  Play, 
  Pause, 
  RotateCcw, 
  Award, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Printer, 
  HelpCircle, 
  ExternalLink,
  Zap,
  TrendingUp,
  Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TakseerMatrixSuggesterProps {
  initialText?: string;
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
  onSendToAflatoon?: (text: string) => void;
  onOpenPrintModal?: (title: string, content: string) => void;
}

export const TakseerMatrixSuggester: React.FC<TakseerMatrixSuggesterProps> = ({
  initialText = 'یا ودود یا حبیب',
  onSendToNaqsh,
  onSendToTakseer,
  onSendToAflatoon,
  onOpenPrintModal,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [selectedObjective, setSelectedObjective] = useState<MatrixObjective>('universal');
  const [activeMatrixId, setActiveMatrixId] = useState<string>('');
  const [isPlayingChal, setIsPlayingChal] = useState<boolean>(false);
  const [currentChalStepIndex, setCurrentChalStepIndex] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(600); // ms per step
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Analysis result based on input text & objective
  const analysis: AbjadTakseerAnalysis = useMemo(() => {
    return analyzeAndSuggestTakseerMatrix(inputText, selectedObjective);
  }, [inputText, selectedObjective]);

  // Set active matrix to supreme match on analysis change if not manually chosen
  const activeMatrix: TakseerMatrixSuggestion = useMemo(() => {
    if (activeMatrixId) {
      const found = analysis.allSuggestions.find((s) => s.id === activeMatrixId);
      if (found) return found;
    }
    return analysis.supremeSuggestion;
  }, [analysis, activeMatrixId]);

  // Reset playback step when active matrix changes
  useEffect(() => {
    setIsPlayingChal(false);
    setCurrentChalStepIndex(activeMatrix.chalSteps.length > 0 ? activeMatrix.chalSteps.length : 0);
  }, [activeMatrix.id]);

  // Chal Step animation loop
  useEffect(() => {
    if (isPlayingChal && activeMatrix.chalSteps.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentChalStepIndex((prev) => {
          if (prev >= activeMatrix.chalSteps.length) {
            setIsPlayingChal(false);
            return activeMatrix.chalSteps.length;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlayingChal, playbackSpeed, activeMatrix.chalSteps.length]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const samplePhrases = [
    { text: 'یا ودود یا حبیب', desc: 'محبت و الفت' },
    { text: 'بسم اللہ الرحمن الرحیم', desc: 'برکت و جامعیت' },
    { text: 'یا رزاق یا فتاح یا وہاب', desc: 'رزق و کشائش' },
    { text: 'نصر من اللہ وفتح قریب', desc: 'فتح و ظفر' },
    { text: 'فَسَيَكْفِيكَهُمُ اللَّهُ', desc: 'حفاظت و کفایت' },
    { text: 'کہیعص حمعسق', desc: 'رموزِ اعظم' },
    { text: 'سلام قولا من رب رحیم', desc: 'سلامتی و شفا' },
  ];

  const objectivesList: { id: MatrixObjective; label: string; icon: string }[] = [
    { id: 'universal', label: 'جملہ مقاصد و توازن', icon: '🌟' },
    { id: 'rizq_wealth', label: 'رزق و دولت و کشائش', icon: '💰' },
    { id: 'love_harmony', label: 'محبت، الفت و تسخیر', icon: '❤️' },
    { id: 'victory_conquest', label: 'فتح، نصرت و غلبہ', icon: '⚔️' },
    { id: 'healing_health', label: 'شفا، تسکین و صحت', icon: '🌿' },
    { id: 'protection_shield', label: 'حصار، حفاظت و دفعِ شر', icon: '🛡️' },
    { id: 'honor_majesty', label: 'عزت، جاہ و وجاہت', icon: '👑' },
  ];

  const getElementBadgeColor = (el: ElementType) => {
    switch (el) {
      case 'fire':
        return 'bg-[#fae1dd] text-[#9d0208] border-[#f4a261]';
      case 'air':
        return 'bg-[#faedcd] text-[#854d0e] border-[#d4a373]';
      case 'water':
        return 'bg-[#e0fbfc] text-[#1d3557] border-[#90e0ef]';
      case 'earth':
        return 'bg-[#dce4c9] text-[#283618] border-[#606c38]';
    }
  };

  const getElementIcon = (el: ElementType) => {
    switch (el) {
      case 'fire':
        return <Flame className="h-4 w-4 text-[#9d0208]" />;
      case 'air':
        return <Wind className="h-4 w-4 text-[#854d0e]" />;
      case 'water':
        return <Droplets className="h-4 w-4 text-[#1d3557]" />;
      case 'earth':
        return <Mountain className="h-4 w-4 text-[#283618]" />;
    }
  };

  // Find step information for a specific grid cell
  const getCellStepInfo = (rIdx: number, cIdx: number) => {
    return activeMatrix.chalSteps.find((s) => s.row === rIdx && s.col === cIdx);
  };

  const activeStepDetail = useMemo(() => {
    if (currentChalStepIndex > 0 && currentChalStepIndex <= activeMatrix.chalSteps.length) {
      return activeMatrix.chalSteps[currentChalStepIndex - 1];
    }
    return null;
  }, [currentChalStepIndex, activeMatrix.chalSteps]);

  return (
    <div className="space-y-8">
      {/* Top Banner & Header */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-[#f2e8cf] p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#bc6c25]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-12 w-48 h-48 bg-[#d4a373]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bc6c25] text-white text-xs font-bold shadow-sm mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>مستخرج ماتریسِ تکسیر و ابجد کبیر</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">کاش البرنی ایڈیشن</span>
            </div>
            <h1 className="font-amiri text-3xl sm:text-4xl font-bold text-[#5d4037] leading-tight">
              خودکار تبدیل کنندۂ ابجد و تجویز کنندۂ ماتریسِ تکسیر
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#8d6e63] font-medium max-w-3xl leading-relaxed">
              نام یا عبارت تحریر فرمائیں؛ یہ نظام فوراً <strong className="text-[#5d4037]">ابجدِ کبیر</strong> کا حساب لگا کر ریاضیاتی میزان، تناسبِ عناصر اور تقسیم کے مطابق سب سے زیادہ طاقتور اور اثر انگیز <strong className="text-[#bc6c25]">ماتریسِ تکسیر</strong> تجویز کرے گا۔
            </p>
          </div>

          {/* Quick Real-Time Metrics */}
          <div className="flex flex-wrap items-center gap-3 self-stretch lg:self-auto">
            <div className="flex-1 sm:flex-initial rounded-2xl border-2 border-[#d4a373] bg-[#fdfaf1] px-5 py-3 text-center shadow-md">
              <span className="text-xs text-[#8d6e63] font-bold block mb-0.5">اعدادِ ابجدِ کبیر</span>
              <span className="font-amiri text-3xl font-extrabold text-[#bc6c25]">{analysis.totalKabir}</span>
            </div>
            <div className="flex-1 sm:flex-initial rounded-2xl border-2 border-[#d4a373] bg-[#fdfaf1] px-5 py-3 text-center shadow-md">
              <span className="text-xs text-[#8d6e63] font-bold block mb-0.5">عنصرِ غالب</span>
              <span className="font-amiri text-lg font-bold text-[#5d4037] flex items-center justify-center gap-1">
                {getElementIcon(analysis.dominantElement)}
                <span>{analysis.dominantElementUrdu}</span>
              </span>
            </div>
            <div className="flex-1 sm:flex-initial rounded-2xl border-2 border-[#d4a373] bg-[#fdfaf1] px-5 py-3 text-center shadow-md">
              <span className="text-xs text-[#8d6e63] font-bold block mb-0.5">حاکم کوکب</span>
              <span className="font-amiri text-lg font-bold text-[#bc6c25]">{analysis.governingPlanetUrdu}</span>
            </div>
          </div>
        </div>

        {/* Input Field Section */}
        <div className="mt-8 pt-6 border-t border-[#d4a373]/50">
          <label htmlFor="interactive-takseer-input" className="block text-xs font-bold text-[#5d4037] mb-2">
            نام، اسمِ اعظم، آیتِ مبارکہ یا نیت تحریر فرمائیں:
          </label>
          <div className="relative">
            <input
              id="interactive-takseer-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="مثلاً: یا ودود یا حبیب، طالب بن والدہ و مطلوب بنت والدہ..."
              className="w-full rounded-2xl border-2 border-[#d4a373] bg-white px-5 py-4 text-xl text-[#2c1e14] placeholder-[#a89078] focus:border-[#bc6c25] focus:outline-none focus:ring-4 focus:ring-[#bc6c25]/20 font-amiri shadow-inner"
            />
            {inputText && (
              <button
                onClick={() => setInputText('')}
                className="absolute left-4 top-4 text-xs text-[#5d4037] hover:text-[#2c1e14] bg-[#e7d8c9] hover:bg-[#d4a373] px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer"
              >
                صاف کریں
              </button>
            )}
          </div>

          {/* Quick Presets */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#8d6e63] font-bold flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-[#bc6c25]" />
              <span>فوری نمونے:</span>
            </span>
            {samplePhrases.map((phrase, idx) => (
              <button
                key={idx}
                id={`takseer-sample-${idx}`}
                onClick={() => setInputText(phrase.text)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                  inputText === phrase.text
                    ? 'bg-[#bc6c25] text-white border-[#bc6c25] shadow-sm'
                    : 'bg-[#fdfaf1] text-[#5d4037] border-[#d4a373] hover:bg-[#faedcd]'
                }`}
              >
                <span className="font-amiri text-sm">{phrase.text}</span>
                <span className="text-[10px] opacity-75 font-sans">({phrase.desc})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Intention / Niyat Filter Tabs */}
        <div className="mt-6 pt-5 border-t border-[#d4a373]/50">
          <span className="text-xs font-bold text-[#5d4037] block mb-2">
            مقصد و نیت کا تعین فرمائیں (ماتریس کی ترتیب اس کے مطابق موزوں ترین ہو جائے گی):
          </span>
          <div className="flex flex-wrap gap-2">
            {objectivesList.map((obj) => (
              <button
                key={obj.id}
                id={`obj-btn-${obj.id}`}
                onClick={() => setSelectedObjective(obj.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  selectedObjective === obj.id
                    ? 'bg-[#5d4037] text-white border-[#5d4037] shadow-md scale-102'
                    : 'bg-[#fdfaf1] text-[#5d4037] border-[#d4a373] hover:bg-[#e7d8c9]'
                }`}
              >
                <span>{obj.icon}</span>
                <span>{obj.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Supreme Match Showcase Card */}
      <div className="rounded-3xl border-3 border-[#bc6c25] bg-gradient-to-br from-[#fdfaf1] via-[#fffbf2] to-[#f9f4e8] p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#bc6c25]/10 rounded-bl-full pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#d4a373]/40">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-gradient-to-tr from-[#bc6c25] to-[#d4a373] text-white shadow-md">
              <Award className="h-7 w-7" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#bc6c25] text-white text-[11px] font-bold">
                  ★ ماتریسِ اعظم و قوی ترین تجویز
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#faedcd] text-[#854d0e] border border-[#d4a373] text-[11px] font-bold">
                  قوت و تاثیر: {analysis.supremeSuggestion.powerScore}%
                </span>
              </div>
              <h2 className="font-amiri text-2xl sm:text-3xl font-extrabold text-[#5d4037] mt-1">
                {analysis.supremeSuggestion.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveMatrixId(analysis.supremeSuggestion.id);
                setCurrentChalStepIndex(analysis.supremeSuggestion.chalSteps.length);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-amiri transition-all flex items-center gap-2 cursor-pointer ${
                activeMatrix.id === analysis.supremeSuggestion.id
                  ? 'bg-[#bc6c25] text-white shadow-md'
                  : 'bg-[#faedcd] text-[#5d4037] hover:bg-[#bc6c25] hover:text-white border border-[#d4a373]'
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>اس ماتریس کا تفصیلی جائزہ لیں</span>
            </button>
          </div>
        </div>

        {/* Detailed Explanation for Supreme Suggestion */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white/80 rounded-2xl p-5 border border-[#d4a373]/40 shadow-xs">
              <h4 className="text-xs font-bold text-[#8d6e63] mb-1.5 flex items-center gap-1.5">
                <Info className="h-4 w-4 text-[#bc6c25]" />
                <span>دلیلِ انتخاب و ریاضیاتی انطباق (Rationale & Classical Rule):</span>
              </h4>
              <p className="text-sm sm:text-base text-[#2c1e14] leading-relaxed font-medium">
                {analysis.supremeSuggestion.rationale}
              </p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f2e8cf] text-[#5d4037] text-xs font-bold">
                <Hash className="h-3.5 w-3.5 text-[#bc6c25]" />
                <span>معادلۂ حسابی: {analysis.supremeSuggestion.formulaEquation}</span>
              </div>
            </div>

            <div className="bg-white/80 rounded-2xl p-5 border border-[#d4a373]/40 shadow-xs">
              <h4 className="text-xs font-bold text-[#8d6e63] mb-1.5">
                قانونِ کاش البرنی (کتاب قوانین طلسمات و مفتاح الجفر):
              </h4>
              <p className="text-xs sm:text-sm text-[#5d4037] leading-relaxed italic">
                "{analysis.supremeSuggestion.kashAlBarniRule}"
              </p>
            </div>
          </div>

          <div className="space-y-3 bg-[#faedcd]/60 p-5 rounded-2xl border border-[#d4a373]/60">
            <h4 className="text-xs font-bold text-[#5d4037] border-b border-[#d4a373] pb-2">
              خواص و روحانی لوازمات:
            </h4>
            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8d6e63] font-medium">موکل علوی:</span>
                <span className="font-amiri font-bold text-[#bc6c25] text-sm">{analysis.supremeSuggestion.angelMuwakkil}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d6e63] font-medium">عون سفلی:</span>
                <span className="font-amiri font-bold text-[#9d0208] text-sm">{analysis.supremeSuggestion.servantAwan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d6e63] font-medium">کوکب و ساعت:</span>
                <span className="font-bold text-[#5d4037]">{analysis.supremeSuggestion.planetUrdu}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d6e63] font-medium">مخصوص بخور:</span>
                <span className="font-bold text-[#5d4037]">{analysis.supremeSuggestion.incense}</span>
              </div>
              <div className="pt-2 border-t border-[#d4a373]/40">
                <span className="text-[11px] text-[#8d6e63] block mb-1 font-bold">دستورِ تحریر:</span>
                <span className="text-xs text-[#2c1e14]">{analysis.supremeSuggestion.consecrationGuide}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Matrix Visualizer & Chal Step-Through Player */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-white p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#e7d8c9]">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getElementBadgeColor(activeMatrix.element)}`}>
                {activeMatrix.elementUrdu}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#faedcd] text-[#5d4037] border border-[#d4a373] text-xs font-bold">
                {activeMatrix.chalNameUrdu}
              </span>
            </div>
            <h3 className="font-amiri text-2xl sm:text-3xl font-extrabold text-[#5d4037] mt-1 flex items-center gap-2">
              <span>{activeMatrix.title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#8d6e63] font-medium mt-0.5">
              {activeMatrix.subtitleUrdu}
            </p>
          </div>

          {/* Chal Playback Controls */}
          {activeMatrix.chalSteps.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 bg-[#fdfaf1] p-2 rounded-2xl border border-[#d4a373]">
              <button
                onClick={() => setIsPlayingChal(!isPlayingChal)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#bc6c25] hover:bg-[#a65d1e] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {isPlayingChal ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                <span>{isPlayingChal ? 'توقفِ چال' : 'چال چلائیں (Play)'}</span>
              </button>

              <button
                onClick={() => {
                  setIsPlayingChal(false);
                  setCurrentChalStepIndex(1);
                }}
                title="شروع سے دیکھیں"
                className="p-1.5 rounded-xl bg-[#e7d8c9] hover:bg-[#d4a373] text-[#5d4037] text-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => {
                  setIsPlayingChal(false);
                  setCurrentChalStepIndex(activeMatrix.chalSteps.length);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-[#e7d8c9] hover:bg-[#d4a373] text-[#5d4037] text-xs font-bold transition-colors cursor-pointer"
              >
                مکمل نقش
              </button>

              <div className="flex items-center gap-1 text-[11px] text-[#8d6e63] font-bold px-2">
                <span>رفتار:</span>
                <button
                  onClick={() => setPlaybackSpeed(900)}
                  className={`px-1.5 py-0.5 rounded ${playbackSpeed === 900 ? 'bg-[#bc6c25] text-white' : 'hover:bg-gray-200'}`}
                >
                  آہستہ
                </button>
                <button
                  onClick={() => setPlaybackSpeed(500)}
                  className={`px-1.5 py-0.5 rounded ${playbackSpeed === 500 ? 'bg-[#bc6c25] text-white' : 'hover:bg-gray-200'}`}
                >
                  عام
                </button>
                <button
                  onClick={() => setPlaybackSpeed(250)}
                  className={`px-1.5 py-0.5 rounded ${playbackSpeed === 250 ? 'bg-[#bc6c25] text-white' : 'hover:bg-gray-200'}`}
                >
                  تیز
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Visual Grid & Side Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): The Visual Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#fdfaf1] to-[#f9f4e8] border-2 border-[#d4a373] shadow-inner flex flex-col items-center justify-center min-h-[380px]">
              
              {/* If Numerical Grid (3x3, 4x4, 5x5, 7x7) */}
              {activeMatrix.matrixCategory === 'numerical_magic_square' && (
                <div className="w-full max-w-md mx-auto space-y-3">
                  <div
                    className="grid gap-2.5 sm:gap-3.5 mx-auto"
                    style={{
                      gridTemplateColumns: `repeat(${activeMatrix.dimension}, minmax(0, 1fr))`,
                    }}
                  >
                    {activeMatrix.grid.map((row, rIdx) =>
                      row.map((val, cIdx) => {
                        const stepInfo = getCellStepInfo(rIdx, cIdx);
                        const isRevealed = !stepInfo || stepInfo.step <= currentChalStepIndex;
                        const isCurrentActive = stepInfo && stepInfo.step === currentChalStepIndex;

                        return (
                          <motion.div
                            key={`${rIdx}-${cIdx}`}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ 
                              scale: isCurrentActive ? 1.06 : 1, 
                              opacity: 1 
                            }}
                            transition={{ duration: 0.2 }}
                            className={`relative aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all shadow-sm ${
                              isCurrentActive
                                ? 'border-[#9d0208] bg-[#fae1dd] ring-4 ring-[#9d0208]/30 z-10'
                                : isRevealed
                                ? 'border-[#d4a373] bg-white hover:border-[#bc6c25] hover:bg-[#fdfaf1]'
                                : 'border-dashed border-[#d4a373]/50 bg-white/40 opacity-40'
                            }`}
                          >
                            {/* Step Indicator Badge */}
                            {stepInfo && (
                              <span className="absolute top-1 right-1 text-[9px] font-bold text-[#8d6e63] bg-[#f2e8cf] rounded-md px-1">
                                {stepInfo.step}
                              </span>
                            )}

                            {/* Main Value */}
                            <span className="font-amiri text-lg sm:text-2xl font-extrabold text-[#5d4037]">
                              {isRevealed ? val : '•'}
                            </span>

                            {/* Letter Equivalent */}
                            {isRevealed && typeof val === 'number' && (
                              <span className="text-[10px] font-amiri text-[#bc6c25] font-bold opacity-85">
                                {adadToLetters(val).slice(0, 3)}
                              </span>
                            )}
                          </motion.div>
                        );
                      })
                    )}
                  </div>

                  {/* Row & Column Sums Verification Bar */}
                  {activeMatrix.rowSums.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-[#d4a373]/40 flex flex-wrap items-center justify-between gap-2 text-xs text-[#8d6e63] font-bold">
                      <span className="flex items-center gap-1 text-[#283618]">
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span>میزانِ اضلاع (سطر، ستون و وتر): {activeMatrix.rowSums[0]}</span>
                      </span>
                      <span className="text-[11px] text-[#bc6c25]">
                        تطبیقِ کامل با ابجدِ کبیر ({analysis.totalKabir})
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* If Letter Takseer Grid */}
              {activeMatrix.matrixCategory === 'letter_takseer' && (
                <div className="w-full space-y-3">
                  <div className="flex flex-col gap-2 mx-auto max-w-lg">
                    {activeMatrix.grid.map((row, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#d4a373] shadow-xs"
                      >
                        <span className="text-xs font-bold text-[#8d6e63] bg-[#faedcd] px-2.5 py-1 rounded-xl">
                          سطر {rIdx + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          {(row as string[]).map((letter, lIdx) => (
                            <span
                              key={lIdx}
                              className="font-amiri text-2xl font-extrabold text-[#5d4037] bg-[#fdfaf1] border border-[#e7d8c9] w-10 h-10 rounded-xl flex items-center justify-center shadow-xs"
                            >
                              {letter}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs font-amiri font-bold text-[#bc6c25]">
                          {(row as string[]).slice(0, 3).join('')}ائیل
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Live Step Callout Box */}
            {activeStepDetail && (
              <div className="bg-[#faedcd] border-2 border-[#d4a373] rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-[#bc6c25] text-white rounded-xl text-xs font-bold">
                    خانہ {activeStepDetail.step}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-[#5d4037] block">
                      {activeStepDetail.description}
                    </span>
                    <span className="text-[11px] text-[#8d6e63]">
                      عنصر: {activeStepDetail.elementUrdu} | سمت: {activeStepDetail.directionUrdu}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#8d6e63] block">کل مراحل</span>
                  <span className="text-sm font-bold text-[#5d4037]">
                    {currentChalStepIndex} / {activeMatrix.chalSteps.length}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Matrix Properties, Muwakkilat & Actions */}
          <div className="lg:col-span-5 space-y-4">
            {/* Quick Summary Card */}
            <div className="rounded-2xl border border-[#d4a373] bg-[#fdfaf1] p-5 shadow-xs space-y-3">
              <h4 className="font-amiri text-lg font-bold text-[#5d4037] border-b border-[#d4a373]/50 pb-2">
                میزانِ ریاضی و تقسیمِ تکسیر
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#e7d8c9]">
                  <span className="text-[#8d6e63] font-medium">نوعیتِ ماتریس:</span>
                  <span className="font-bold text-[#5d4037]">
                    {activeMatrix.dimension} × {activeMatrix.dimension} ({activeMatrix.dimension * activeMatrix.dimension} خانے)
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#e7d8c9]">
                  <span className="text-[#8d6e63] font-medium">مفتاح (Base Quotient):</span>
                  <span className="font-bold text-[#bc6c25] text-sm">{activeMatrix.quotient}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#e7d8c9]">
                  <span className="text-[#8d6e63] font-medium">کسر و باقی (Remainder):</span>
                  <span className="font-bold text-[#5d4037]">{activeMatrix.kasr} ({activeMatrix.kasrExplanation || 'تام'})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#e7d8c9]">
                  <span className="text-[#8d6e63] font-medium">چال و ترتیب:</span>
                  <span className="font-bold text-[#5d4037]">{activeMatrix.chalNameUrdu}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8d6e63] font-medium">مقاصدِ اختصاصی:</span>
                  <span className="font-bold text-[#283618]">{activeMatrix.targetIntents.join('، ')}</span>
                </div>
              </div>
            </div>

            {/* Muwakkilat & Consecration Card */}
            <div className="rounded-2xl border border-[#d4a373] bg-[#fdfaf1] p-5 shadow-xs space-y-3">
              <h4 className="font-amiri text-lg font-bold text-[#5d4037] border-b border-[#d4a373]/50 pb-2">
                موکلات و بخورِ ساعت
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#e7d8c9]">
                  <span className="text-[10px] text-[#8d6e63] block">موکل علوی:</span>
                  <span className="font-amiri text-base font-bold text-[#bc6c25]">{activeMatrix.angelMuwakkil}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#e7d8c9]">
                  <span className="text-[10px] text-[#8d6e63] block">عون سفلی:</span>
                  <span className="font-amiri text-base font-bold text-[#9d0208]">{activeMatrix.servantAwan}</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#e7d8c9] text-xs">
                <span className="text-[10px] text-[#8d6e63] block mb-0.5">بخور و خوشبو:</span>
                <span className="font-bold text-[#5d4037]">{activeMatrix.incense}</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#e7d8c9] text-xs">
                <span className="text-[10px] text-[#8d6e63] block mb-0.5">ساعتِ عمل:</span>
                <span className="font-bold text-[#5d4037]">{activeMatrix.favorableSaat}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  const matrixText = `ماتریس: ${activeMatrix.title}\nعبارت: ${inputText}\nاعداد: ${analysis.totalKabir}\nمفتاح: ${activeMatrix.quotient} | کسر: ${activeMatrix.kasr}\nموکل: ${activeMatrix.angelMuwakkil}\nساعت: ${activeMatrix.favorableSaat}\nبخور: ${activeMatrix.incense}`;
                  copyToClipboard(matrixText, 'matrix-copy');
                }}
                className="w-full py-2.5 rounded-xl border-2 border-[#d4a373] bg-[#faedcd] hover:bg-[#f2e8cf] text-xs sm:text-sm font-bold text-[#5d4037] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copiedKey === 'matrix-copy' ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-[#bc6c25]" />}
                <span>{copiedKey === 'matrix-copy' ? 'ماتریس کاپی ہو گئی' : 'ماتریس کی تمام تفصیلات کاپی کریں'}</span>
              </button>

              {onSendToNaqsh && (
                <button
                  onClick={() => onSendToNaqsh(analysis.totalKabir)}
                  className="w-full py-2.5 rounded-xl bg-[#bc6c25] hover:bg-[#a65d1e] text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Compass className="h-4 w-4" />
                  <span>مولد النقوش میں یہ نقش کھولیں</span>
                </button>
              )}

              {onSendToTakseer && (
                <button
                  onClick={() => onSendToTakseer(inputText)}
                  className="w-full py-2.5 rounded-xl border-2 border-[#283618] bg-[#dce4c9] hover:bg-[#ccd5ae] text-xs sm:text-sm font-bold text-[#283618] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Flame className="h-4 w-4 text-[#283618]" />
                  <span>مکمل تکسیر صدر و مؤخر میں لے جائیں</span>
                </button>
              )}

              {onSendToAflatoon && (
                <button
                  onClick={() => onSendToAflatoon(inputText)}
                  className="w-full py-2.5 rounded-xl border-2 border-[#1d3557] bg-[#e0fbfc] hover:bg-[#c8f0f4] text-xs sm:text-sm font-bold text-[#1d3557] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="h-4 w-4 text-[#1d3557]" />
                  <span>تکسیرِ افلاطون (عناصرِ اربعہ) میں بھیجیں</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Matrices Comparison Gallery */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-[#f9f4e8] p-6 sm:p-8 shadow-md">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#d4a373]/50">
          <div>
            <h3 className="font-amiri text-2xl font-bold text-[#5d4037] flex items-center gap-2">
              <Layers className="h-5 w-5 text-[#bc6c25]" />
              <span>تمام متبادل ماتریسیں (Alternative Takseer Matrices)</span>
            </h3>
            <p className="text-xs text-[#8d6e63] font-medium mt-0.5">
              کسی بھی ماتریس پر کلک کر کے اس کے اضلاع، چال اور روحانی قواعد کا مشاہدہ کریں۔
            </p>
          </div>
          <span className="text-xs font-bold text-[#5d4037] bg-[#faedcd] border border-[#d4a373] px-3 py-1 rounded-full">
            کل تجاویز: {analysis.allSuggestions.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analysis.allSuggestions.map((sug, idx) => {
            const isSelected = activeMatrix.id === sug.id;
            return (
              <div
                key={sug.id}
                onClick={() => {
                  setActiveMatrixId(sug.id);
                  setCurrentChalStepIndex(sug.chalSteps.length);
                }}
                className={`rounded-2xl p-5 border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#bc6c25] shadow-lg ring-2 ring-[#bc6c25]/30'
                    : 'bg-[#fdfaf1] border-[#d4a373]/60 hover:border-[#bc6c25] hover:bg-white shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-[#8d6e63] bg-[#faedcd] px-2.5 py-0.5 rounded-full">
                      رینک #{sug.matchRank}
                    </span>
                    <span className="text-[11px] font-bold text-[#bc6c25] flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>قوت: {sug.powerScore}%</span>
                    </span>
                  </div>

                  <h4 className="font-amiri text-lg font-bold text-[#5d4037] leading-snug">
                    {sug.title}
                  </h4>
                  <p className="text-xs text-[#8d6e63] mt-1 line-clamp-2">
                    {sug.subtitleUrdu}
                  </p>

                  <div className="mt-3 pt-3 border-t border-[#e7d8c9] space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#8d6e63]">معادلہ:</span>
                      <span className="font-bold text-[#5d4037]">{sug.formulaEquation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8d6e63]">کوکب:</span>
                      <span className="font-bold text-[#5d4037]">{sug.planetUrdu}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#e7d8c9] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#bc6c25] flex items-center gap-1">
                    <span>{isSelected ? 'فعال ہے ✓' : 'منتخب کریں ←'}</span>
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getElementBadgeColor(sug.element)}`}>
                    {sug.elementUrdu}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
