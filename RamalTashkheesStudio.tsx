import React, { useState, useMemo, useRef } from 'react';
import {
  Dices,
  Sparkles,
  Heart,
  Briefcase,
  Thermometer,
  Plane,
  HeartHandshake,
  HelpCircle,
  Clock,
  ShieldAlert,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Compass,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Printer,
  Copy,
  Check,
  Send,
  RefreshCw,
  Award,
  BookOpen,
  Info,
  ChevronDown,
  ChevronUp,
  Layers,
  Search,
  Eye,
  FileText
} from 'lucide-react';
import {
  ALL_16_RAMAL_FIGURES,
  RAMAL_FIGURES_ARRAY,
  RAMAL_16_HOUSES,
  POSTER_PRIMARY_QUESTIONS,
  POSTER_SECONDARY_TOPICS,
  RamalFigureDef,
  generateFullZaicha16,
  getRamalSpiritualRemedies
} from '../data/ramalTashkheesData';
import { calculateAbjad } from '../utils/jafrEngine';

interface RamalTashkheesStudioProps {
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
}

export const RamalTashkheesStudio: React.FC<RamalTashkheesStudioProps> = ({
  onSendToNaqsh,
  onSendToTakseer
}) => {
  // Primary Question Selection
  const [selectedTopicId, setSelectedTopicId] = useState<string>('marriage_general');
  const [selectedSecondaryId, setSelectedSecondaryId] = useState<string | null>(null);

  // Inquirer details
  const [inquirerName, setInquirerName] = useState<string>('محمد علی');
  const [motherName, setMotherName] = useState<string>('فاطمہ');
  const [customQuestionText, setCustomQuestionText] = useState<string>('');

  // Casting Mode: 'dice' | 'manual_dots' | 'abjad_time'
  const [castingMode, setCastingMode] = useState<'dice' | 'manual_dots' | 'abjad_time'>('dice');

  // Manual dot tapping state for 4 mothers (each has 4 rows)
  const [dotCounts, setDotCounts] = useState<number[][]>([
    [7, 8, 9, 6], // Mother 1
    [8, 7, 6, 8], // Mother 2
    [9, 9, 8, 7], // Mother 3
    [6, 8, 7, 9]  // Mother 4
  ]);

  // Selected or generated 4 Mothers
  const [motherFigures, setMotherFigures] = useState<[RamalFigureDef, RamalFigureDef, RamalFigureDef, RamalFigureDef]>([
    ALL_16_RAMAL_FIGURES.lihyan,
    ALL_16_RAMAL_FIGURES.qabd_dakhil,
    ALL_16_RAMAL_FIGURES.nasrat_dakhil,
    ALL_16_RAMAL_FIGURES.farah
  ]);

  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showEncyclopedia, setShowEncyclopedia] = useState<boolean>(false);
  const [selectedHouseView, setSelectedHouseView] = useState<number>(15); // Default to Qazi/Judge
  const printRef = useRef<HTMLDivElement>(null);

  // Derive the 16 full Zaicha houses
  const fullZaicha16 = useMemo(() => {
    return generateFullZaicha16(
      motherFigures[0],
      motherFigures[1],
      motherFigures[2],
      motherFigures[3]
    );
  }, [motherFigures]);

  // Active topic object
  const activePrimaryTopic = useMemo(() => {
    return POSTER_PRIMARY_QUESTIONS.find(q => q.id === selectedTopicId) || POSTER_PRIMARY_QUESTIONS[0];
  }, [selectedTopicId]);

  const activeSecondaryTopic = useMemo(() => {
    if (!selectedSecondaryId) return null;
    return POSTER_SECONDARY_TOPICS.find(s => s.id === selectedSecondaryId) || null;
  }, [selectedSecondaryId]);

  // The primary house to inspect for the chosen topic
  const targetHouseIndex = useMemo(() => {
    if (activeSecondaryTopic) {
      return activeSecondaryTopic.houseNum - 1;
    }
    return activePrimaryTopic.primaryHouseNum - 1;
  }, [activePrimaryTopic, activeSecondaryTopic]);

  const targetFigure = fullZaicha16[targetHouseIndex] || fullZaicha16[14] || RAMAL_FIGURES_ARRAY[0];
  const qaziFigure = fullZaicha16[14] || fullZaicha16[0] || RAMAL_FIGURES_ARRAY[0];
  const aaqibatFigure = fullZaicha16[15] || fullZaicha16[1] || RAMAL_FIGURES_ARRAY[1];

  // Abjad calculations
  const nameAbjad = useMemo(() => calculateAbjad(inquirerName).totalKabir, [inquirerName]);
  const motherAbjad = useMemo(() => calculateAbjad(motherName).totalKabir, [motherName]);
  const totalAbjad = nameAbjad + motherAbjad;

  // Roll Ramal Dice (قرعہ رمل)
  const handleRollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      const shuffled = [...RAMAL_FIGURES_ARRAY].sort(() => 0.5 - Math.random());
      setMotherFigures([shuffled[0], shuffled[1], shuffled[2], shuffled[3]]);
      setIsRolling(false);
    }, 600);
  };

  // Convert dot counts into 4 mother figures
  const handleDotIncrement = (motherIdx: number, rowIdx: number) => {
    setDotCounts(prev => {
      const updated = prev.map(m => [...m]);
      updated[motherIdx][rowIdx] = (updated[motherIdx][rowIdx] + 1);
      return updated;
    });
  };

  const handleApplyDotCounts = () => {
    const newMothers: RamalFigureDef[] = [];
    for (let m = 0; m < 4; m++) {
      const pattern: [number, number, number, number] = [
        dotCounts[m][0] % 2 === 0 ? 2 : 1,
        dotCounts[m][1] % 2 === 0 ? 2 : 1,
        dotCounts[m][2] % 2 === 0 ? 2 : 1,
        dotCounts[m][3] % 2 === 0 ? 2 : 1,
      ];
      const match = RAMAL_FIGURES_ARRAY.find(f => f.pattern.join('-') === pattern.join('-')) || ALL_16_RAMAL_FIGURES.lihyan;
      newMothers.push(match);
    }
    setMotherFigures([newMothers[0], newMothers[1], newMothers[2], newMothers[3]]);
  };

  // Abjad + Time based deterministic casting
  const handleCastByAbjadTime = () => {
    const base = totalAbjad > 0 ? totalAbjad : 450;
    const now = new Date();
    const timeVal = now.getHours() * 60 + now.getMinutes() + now.getSeconds();
    
    const idx1 = (base + timeVal) % 16;
    const idx2 = (base * 2 + timeVal + 5) % 16;
    const idx3 = (base * 3 + timeVal + 11) % 16;
    const idx4 = (base * 5 + timeVal + 17) % 16;

    setMotherFigures([
      RAMAL_FIGURES_ARRAY[idx1] || RAMAL_FIGURES_ARRAY[0],
      RAMAL_FIGURES_ARRAY[idx2] || RAMAL_FIGURES_ARRAY[1],
      RAMAL_FIGURES_ARRAY[idx3] || RAMAL_FIGURES_ARRAY[2],
      RAMAL_FIGURES_ARRAY[idx4] || RAMAL_FIGURES_ARRAY[3]
    ]);
  };

  // Diagnostic verdict logic
  const verdict = useMemo(() => {
    const isTargetSaad = targetFigure?.natureGrade?.includes('saad');
    const isQaziSaad = qaziFigure?.natureGrade?.includes('saad');
    const isAaqibatSaad = aaqibatFigure?.natureGrade?.includes('saad');

    const saadCount = [targetFigure, qaziFigure, aaqibatFigure].filter(f => f?.natureGrade?.includes('saad')).length;
    const nahasCount = [targetFigure, qaziFigure, aaqibatFigure].filter(f => f?.natureGrade?.includes('nahas')).length;

    let status: 'positive' | 'negative' | 'delayed' | 'conditional' = 'positive';
    let verdictTextUrdu = '';
    let colorBadge = '';

    if (saadCount >= 2) {
      status = 'positive';
      verdictTextUrdu = 'بفضلِ تعالیٰ مراد حاصل ہوگی۔ سعدِ قوی اور کامیابی کی روشن بشارت و خوشخبری ہے۔';
      colorBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    } else if (nahasCount >= 2) {
      status = 'negative';
      verdictTextUrdu = 'شدید رکاوٹ، نحوست اور بندش کا سامنا ہے۔ فوری اقدام نہ کریں اور علاج کریں۔';
      colorBadge = 'bg-rose-100 text-rose-800 border-rose-300';
    } else if (targetFigure?.nature?.includes('خارج') || qaziFigure?.nature?.includes('منقلب')) {
      status = 'delayed';
      verdictTextUrdu = 'تاخیر درپیش ہے، مگر صدقہ و دعا سے رکاوٹ دور ہو کر کام بن جائے گا۔';
      colorBadge = 'bg-amber-100 text-amber-800 border-amber-300';
    } else {
      status = 'conditional';
      verdictTextUrdu = 'معاملہ درمیانی ہے، حکمتِ عملی اور صبر سے کام لیں تو بہتری ممکن ہے۔';
      colorBadge = 'bg-blue-100 text-blue-800 border-blue-300';
    }

    return {
      status,
      verdictTextUrdu,
      colorBadge,
      saadCount,
      nahasCount,
      remedies: getRamalSpiritualRemedies(targetFigure?.natureGrade || 'neutral', selectedTopicId)
    };
  }, [targetFigure, qaziFigure, aaqibatFigure, selectedTopicId]);

  // Timeline estimation
  const timelineEstimate = useMemo(() => {
    const speed = targetFigure?.speed;
    if (speed === 'fast') {
      return {
        durationUrdu: '۳ سے ۷ ایام تا ۲ سے ۴ ہفتے',
        subtextUrdu: 'چونکہ شکل سعد و سریع ہے، لہٰذا کام جلد از جلد پایہ تکمیل کو پہنچے گا۔'
      };
    } else if (speed === 'medium') {
      return {
        durationUrdu: '۱ سے ۳ ماہ کے اندر',
        subtextUrdu: 'معتدل رفتاری سے معاملات سازگار ہوں گے، صبر و استقامت رکھیں۔'
      };
    } else if (speed === 'delayed') {
      return {
        durationUrdu: '۶ ماہ سے ۱ سال یا بندش کٹنے تک',
        subtextUrdu: 'ثقیل سیارے اور رکاوٹ کی وجہ سے تاخیر ہے، روحانی علاج ضروری ہے۔'
      };
    } else {
      return {
        durationUrdu: '۴ سے ۸ ہفتے',
        subtextUrdu: 'کوشش اور توجہ کے تناسب سے وقت کا تعین ہوگا۔'
      };
    }
  }, [targetFigure]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Render a visual 4-level Ramal Figure symbol
  const renderRamalSymbol = (pattern: [number, number, number, number], size: 'sm' | 'md' | 'lg' = 'md') => {
    const dotSize = size === 'sm' ? 'h-2 w-2' : size === 'lg' ? 'h-3.5 w-3.5' : 'h-2.5 w-2.5';
    const gapSize = size === 'sm' ? 'gap-1' : size === 'lg' ? 'gap-2' : 'gap-1.5';
    const rowGap = size === 'sm' ? 'space-y-1' : size === 'lg' ? 'space-y-1.5' : 'space-y-1';

    return (
      <div className={`flex flex-col items-center justify-center ${rowGap} bg-[#2c1e14]/90 text-amber-300 p-2 rounded-lg border border-amber-500/40 shadow-inner min-w-[36px]`}>
        {pattern.map((dots, rIdx) => (
          <div key={rIdx} className={`flex items-center justify-center ${gapSize}`}>
            {dots === 1 ? (
              <div className={`${dotSize} rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]`} />
            ) : (
              <>
                <div className={`${dotSize} rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]`} />
                <div className={`${dotSize} rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]`} />
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 font-urdu text-[#2c1e14]">
      {/* 1. MASTER POSTER HEADER - Authentic Islamic & Spiritual Geomancy Theme */}
      <div className="relative overflow-hidden rounded-3xl border-3 border-[#bc6c25] bg-gradient-to-b from-[#1a120b] via-[#2c1e14] to-[#3d271d] text-white p-6 sm:p-8 shadow-2xl">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4a373_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          {/* Bismillah Header */}
          <div className="border-b border-amber-500/40 pb-2 mb-1 w-full max-w-md">
            <span className="font-amiri text-lg sm:text-2xl text-amber-200 tracking-wider">
              بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ
            </span>
          </div>

          {/* Main Title Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600/30 via-amber-500/40 to-amber-600/30 px-5 py-1.5 border border-amber-400/50 shadow-md">
            <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
            <span className="font-bold text-sm sm:text-base text-amber-200">
              استخراجِ غیب بذریعہ قرعہ رمل و اشکالِ شانزدہ گانہ
            </span>
          </div>

          <h2 className="font-amiri text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 drop-shadow-md">
            حساب و تشخیص بذریعہ علم الرمل
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-amber-100">
            <span className="rounded-md bg-white/10 px-3 py-1 border border-white/20">
              آپ کے سوال کا جواب، علم الرمل سے
            </span>
            <span className="text-amber-400">•</span>
            <span className="rounded-md bg-amber-500/20 px-3 py-1 border border-amber-400/30 text-amber-200 font-bold">
              ماضی، حال، مستقبل، حل اور ہر حال کی مستند رہنمائی
            </span>
          </div>

          {/* Spiritual Center Medallion (فیضِ چشتیہ / فیضِ روحانی) */}
          <div className="mt-2 flex items-center justify-center">
            <div className="relative flex items-center justify-center h-20 w-44 rounded-2xl bg-gradient-to-br from-[#8a5a36] via-[#d4a373] to-[#7f5539] p-[2px] shadow-lg">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#23150d]/90 px-4 text-center">
                <div>
                  <span className="font-amiri text-xl sm:text-2xl font-bold text-amber-300 tracking-wide">
                    فیضِ چشتیہ
                  </span>
                  <p className="text-[10px] text-amber-100/80">فیوضاتِ روحانی و انوارِ جفریہ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE 5 SIGNATURE PRIMARY QUESTIONS (From Poster Badges) */}
      <div className="rounded-2xl border-2 border-[#d4a373] bg-[#fdfbf7] p-5 sm:p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#e9edc9] pb-3 mb-4">
          <div>
            <h3 className="font-amiri text-xl sm:text-2xl font-bold text-[#5d4037] flex items-center gap-2">
              <Compass className="h-6 w-6 text-[#bc6c25]" />
              اہم سوالات و استخاراتِ رمل (منتخب فرمائیں)
            </h3>
            <p className="text-xs sm:text-sm text-[#7f5539]">
              پوسٹر کے ۵ بنیادی سوالات جن کا جواب علم الرمل کے بیوت اور اشکال سے فوراً دیا جاتا ہے۔
            </p>
          </div>
          <span className="rounded-full bg-[#bc6c25]/10 px-3 py-1 text-xs font-bold text-[#bc6c25] border border-[#bc6c25]/20">
            ۵ کڑے سوالات
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {POSTER_PRIMARY_QUESTIONS.map((topic) => {
            const isSelected = selectedTopicId === topic.id && !selectedSecondaryId;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  setSelectedSecondaryId(null);
                }}
                className={`relative flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-[#bc6c25] bg-gradient-to-b from-[#faedcd] to-[#fefae0] shadow-md scale-[1.02] ring-2 ring-[#bc6c25]/30'
                    : 'border-[#e9edc9] bg-white hover:border-[#d4a373] hover:bg-[#faedcd]/40'
                }`}
              >
                {/* Badge Top */}
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2 ${
                  isSelected ? 'bg-[#bc6c25] text-white' : 'bg-[#e9edc9] text-[#5d4037]'
                }`}>
                  {topic.badgeUrdu}
                </span>

                {/* Icon */}
                <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-2 shadow-inner ${
                  isSelected ? 'bg-[#bc6c25] text-white' : 'bg-[#fefae0] text-[#bc6c25] border border-[#d4a373]'
                }`}>
                  {topic.iconName === 'HeartHandshake' && <HeartHandshake className="h-6 w-6" />}
                  {topic.iconName === 'Briefcase' && <Briefcase className="h-6 w-6" />}
                  {topic.iconName === 'Thermometer' && <Thermometer className="h-6 w-6" />}
                  {topic.iconName === 'Plane' && <Plane className="h-6 w-6" />}
                  {topic.iconName === 'Heart' && <Heart className="h-6 w-6" />}
                </div>

                {/* Title */}
                <h4 className="font-amiri text-base sm:text-lg font-bold text-[#2c1e14] leading-snug">
                  {topic.titleUrdu}
                </h4>

                <p className="text-[11px] text-[#7f5539] mt-1 line-clamp-2">
                  {topic.questionUrdu}
                </p>

                {isSelected && (
                  <div className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-[#bc6c25] text-white flex items-center justify-center text-xs shadow">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* 3. THE 9 SECONDARY TOPICS (From Starry Box on Poster) */}
        <div className="mt-6 pt-4 border-t border-[#e9edc9]">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <h4 className="font-bold text-sm sm:text-base text-[#5d4037]">
              دیگر تخصصی موضوعات و تشخیصات (نقصان، شراکت، گمشدہ مال، سحر و بندش):
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
            {POSTER_SECONDARY_TOPICS.map((sec) => {
              const isSelected = selectedSecondaryId === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    setSelectedSecondaryId(sec.id);
                  }}
                  className={`p-2.5 rounded-lg text-center text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-[#7f5539] text-white border-[#5d4037] shadow-sm scale-105'
                      : 'bg-[#fefae0] text-[#5d4037] border-[#d4a373]/50 hover:bg-[#faedcd]'
                  }`}
                  title={sec.descUrdu}
                >
                  <span className="block text-amber-600 text-xs mb-0.5">✦</span>
                  {sec.titleUrdu}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. INQUIRER DATA & CASTING CONTROLS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1 Col: Inquirer Details */}
        <div className="rounded-2xl border-2 border-[#d4a373] bg-white p-5 shadow-sm space-y-4">
          <h4 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2 border-b pb-2 border-[#e9edc9]">
            <Layers className="h-5 w-5 text-[#bc6c25]" />
            سائل کے کوائف و سوال کا اندراج
          </h4>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#7f5539] mb-1">
                سائل / سائلہ کا نام:
              </label>
              <input
                type="text"
                value={inquirerName}
                onChange={(e) => setInquirerName(e.target.value)}
                className="w-full rounded-lg border-2 border-[#d4a373] p-2 text-sm font-bold bg-[#fdfbf7] focus:outline-none focus:ring-2 focus:ring-[#bc6c25]"
                placeholder="مثلاً: محمد علی"
              />
              <span className="text-[11px] text-[#8d6e63]">اعدادِ نام: {nameAbjad}</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#7f5539] mb-1">
                والدہ کا نام:
              </label>
              <input
                type="text"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                className="w-full rounded-lg border-2 border-[#d4a373] p-2 text-sm font-bold bg-[#fdfbf7] focus:outline-none focus:ring-2 focus:ring-[#bc6c25]"
                placeholder="مثلاً: فاطمہ"
              />
              <span className="text-[11px] text-[#8d6e63]">اعدادِ والدہ: {motherAbjad}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#faedcd]/40 border border-[#d4a373]/40 text-xs">
              <span className="font-bold text-[#5d4037]">مجموعہ اعداد (سائل + والدہ): </span>
              <span className="font-mono font-bold text-[#bc6c25] text-sm">{totalAbjad}</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#7f5539] mb-1">
                اضافی یا ذاتی سوال (اختیاری):
              </label>
              <textarea
                rows={2}
                value={customQuestionText}
                onChange={(e) => setCustomQuestionText(e.target.value)}
                placeholder="مثلاً: کیا میرا بیرون ملک ویزا اس سال منظور ہوگا یا کوئی خفیہ رکاوٹ ہے؟"
                className="w-full rounded-lg border-2 border-[#d4a373] p-2 text-xs bg-[#fdfbf7] focus:outline-none focus:ring-2 focus:ring-[#bc6c25]"
              />
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Ramal Dices / Casting Engine */}
        <div className="lg:col-span-2 rounded-2xl border-2 border-[#bc6c25] bg-gradient-to-br from-[#fefae0] via-[#faedcd] to-[#fdfbf7] p-5 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#d4a373]/40 pb-3 mb-4">
              <div>
                <h4 className="font-amiri text-lg sm:text-xl font-bold text-[#5d4037] flex items-center gap-2">
                  <Dices className="h-6 w-6 text-[#bc6c25]" />
                  قرعہ اندازی و استخراجِ رمل (Casting Modes)
                </h4>
                <p className="text-xs text-[#7f5539]">
                  چار امہات (Mothers) کا استخراج کر کے مکمل ۱۶ بیوت کا زائچہ ترتیب دیں۔
                </p>
              </div>

              {/* Mode Switcher */}
              <div className="flex rounded-lg bg-white p-1 border border-[#d4a373] text-xs">
                <button
                  onClick={() => setCastingMode('dice')}
                  className={`px-3 py-1 rounded-md font-bold transition-all ${
                    castingMode === 'dice' ? 'bg-[#bc6c25] text-white shadow' : 'text-[#5d4037]'
                  }`}
                >
                  قرعہ رمل (Dices)
                </button>
                <button
                  onClick={() => setCastingMode('manual_dots')}
                  className={`px-3 py-1 rounded-md font-bold transition-all ${
                    castingMode === 'manual_dots' ? 'bg-[#bc6c25] text-white shadow' : 'text-[#5d4037]'
                  }`}
                >
                  ضربِ رمل (Dot Tapping)
                </button>
                <button
                  onClick={() => setCastingMode('abjad_time')}
                  className={`px-3 py-1 rounded-md font-bold transition-all ${
                    castingMode === 'abjad_time' ? 'bg-[#bc6c25] text-white shadow' : 'text-[#5d4037]'
                  }`}
                >
                  ساعت و ابجد
                </button>
              </div>
            </div>

            {/* Mode 1: Virtual Brass Ramal Dices (قرعہ رمل) */}
            {castingMode === 'dice' && (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-3 text-center">
                  {motherFigures.map((fig, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border-2 border-amber-600/40 bg-gradient-to-b from-[#2c1e14] to-[#1a120b] p-3 text-white shadow-lg flex flex-col items-center justify-between"
                    >
                      <span className="text-[11px] font-bold text-amber-300 mb-1">
                        اُمّ {idx + 1} ({['آتش', 'باد', 'آب', 'خاک'][idx]})
                      </span>

                      {/* Visual Ramal Figure */}
                      <div className="my-2">
                        {renderRamalSymbol(fig.pattern, 'md')}
                      </div>

                      <div className="w-full pt-1 border-t border-amber-500/30">
                        <span className="font-amiri text-base font-bold text-amber-200 block">
                          {fig.nameUrdu}
                        </span>
                        <span className="text-[10px] text-amber-300/80 block">
                          {fig.nature}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    onClick={handleRollDice}
                    disabled={isRolling}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#bc6c25] via-[#a2581c] to-[#8a4914] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:from-[#a2581c] hover:to-[#7f4211] transition-all flex items-center justify-center gap-2 border border-amber-300/40 active:scale-95"
                  >
                    <Dices className={`h-5 w-5 ${isRolling ? 'animate-spin' : ''}`} />
                    {isRolling ? 'قرعہ اندازی جاری ہے...' : 'قرعہ رمل پھینکیں (Cast Ramal Dice)'}
                  </button>

                  <span className="text-xs text-[#7f5539] text-center sm:text-right">
                    قرعہ گھمانے پر خودکار طریقے سے ۴ امہات، ۴ بنات، ۴ متولدات اور شاہدین و قاضی برآمد ہوں گے۔
                  </span>
                </div>
              </div>
            )}

            {/* Mode 2: Manual Dot Tapping (ضربِ رمل / خطوط اندازی) */}
            {castingMode === 'manual_dots' && (
              <div className="space-y-3">
                <p className="text-xs text-[#7f5539]">
                  ہر سطر میں اپنی نیت کے مطابق انگلیاں لگائیں یا کلک کریں۔ طاق عدد پر ایک نقطہ (فرد) اور جفت پر دو نقطے (زوج) بنیں گے۔
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[0, 1, 2, 3].map((mIdx) => (
                    <div key={mIdx} className="p-3 rounded-xl bg-white border border-[#d4a373] space-y-1.5">
                      <span className="text-xs font-bold text-[#5d4037] block mb-1">
                        اُمّ {mIdx + 1}: ۴ سطور کی ضرب
                      </span>
                      {[0, 1, 2, 3].map((rIdx) => (
                        <div key={rIdx} className="flex items-center justify-between gap-2 text-xs">
                          <span className="text-[11px] text-[#7f5539] w-12">
                            سطر {rIdx + 1} ({['آتش', 'باد', 'آب', 'خاک'][rIdx]}):
                          </span>
                          <div className="flex-1 flex items-center gap-1 overflow-hidden">
                            {Array.from({ length: Math.min(dotCounts[mIdx][rIdx], 12) }).map((_, d) => (
                              <span key={d} className="h-2 w-2 rounded-full bg-[#bc6c25] inline-block" />
                            ))}
                            {dotCounts[mIdx][rIdx] > 12 && (
                              <span className="text-[10px] font-bold text-[#bc6c25]">+{dotCounts[mIdx][rIdx] - 12}</span>
                            )}
                          </div>
                          <span className="font-mono text-xs font-bold text-[#5d4037] w-6 text-center">
                            {dotCounts[mIdx][rIdx]}
                          </span>
                          <button
                            onClick={() => handleDotIncrement(mIdx, rIdx)}
                            className="px-2 py-0.5 rounded bg-[#faedcd] hover:bg-[#d4a373] text-[#5d4037] font-bold border border-[#d4a373]"
                          >
                            + نقطہ
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleApplyDotCounts}
                  className="w-full py-2.5 rounded-xl bg-[#bc6c25] text-white font-bold text-xs sm:text-sm shadow hover:bg-[#a2581c] transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  نقاط کا حساب لگا کر اشکال بنائیں
                </button>
              </div>
            )}

            {/* Mode 3: Deterministic Abjad & Hour of Saat */}
            {castingMode === 'abjad_time' && (
              <div className="space-y-4 p-4 rounded-xl bg-white border border-[#d4a373]">
                <div className="space-y-2">
                  <h5 className="font-bold text-sm text-[#5d4037]">
                    وقت، ساعت اور ابجد کے امتزاج سے سائنسی استخراج
                  </h5>
                  <p className="text-xs text-[#7f5539] leading-relaxed">
                    یہ طریقہ قدیم جفری رمل کے اصول پر سائل کے نام، والدہ کے نام کے کل اعداد اور استخارہ کے لمحے کے وقت (گھنٹہ و منٹ) کی ضرب دے کر ۴ امہات اخذ کرتا ہے۔
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#fefae0] border border-[#e9edc9] text-xs">
                  <div>
                    <span className="font-bold text-[#5d4037]">کل اعداد: </span>
                    <span className="font-mono font-bold text-[#bc6c25]">{totalAbjad}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#5d4037]">موجودہ وقت: </span>
                    <span className="font-mono text-[#7f5539]">{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCastByAbjadTime}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#5d4037] to-[#7f5539] text-white font-bold text-xs sm:text-sm shadow hover:from-[#4e342e] hover:to-[#6d4c41] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  حسابِ ابجد و وقت کے مطابق زائچہ اخذ کریں
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. DIAGNOSTIC RESULT REPORT & VERDICT PANEL */}
      <div ref={printRef} className="rounded-3xl border-3 border-[#bc6c25] bg-white p-6 sm:p-8 shadow-xl space-y-6">
        {/* Report Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-[#e9edc9] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded bg-[#bc6c25] px-2.5 py-0.5 text-xs font-bold text-white">
                مصدقہ رپورٹِ رمل
              </span>
              <span className="text-xs text-[#7f5539]">
                بتاریخ: {new Date().toLocaleDateString('ur-PK')}
              </span>
            </div>
            <h3 className="font-amiri text-2xl sm:text-3xl font-black text-[#5d4037]">
              تفصیلی تشخیص و حتمی جوابِ سوال
            </h3>
            <p className="text-xs sm:text-sm text-[#7f5539]">
              سائل: <span className="font-bold text-[#2c1e14]">{inquirerName} بن/بنت {motherName}</span>
              {' '} | موضوعِ سوال: <span className="font-bold text-[#bc6c25]">{activeSecondaryTopic ? activeSecondaryTopic.titleUrdu : activePrimaryTopic.titleUrdu}</span>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#faedcd] hover:bg-[#d4a373] text-[#5d4037] font-bold text-xs border border-[#d4a373] transition-all shadow-sm"
            >
              <Printer className="h-4 w-4" />
              پرنٹ / PDF رپورٹ
            </button>
            <button
              onClick={() => handleCopy(`تشخیص رمل: ${verdict.verdictTextUrdu} - مدت: ${timelineEstimate.durationUrdu}`, 'verdict')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#fefae0] hover:bg-[#faedcd] text-[#5d4037] font-bold text-xs border border-[#d4a373] transition-all"
            >
              {copiedId === 'verdict' ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              کاپی
            </button>
          </div>
        </div>

        {/* Highlighted Verdict Banner */}
        <div className={`p-5 rounded-2xl border-2 ${verdict.colorBadge} shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-white shadow flex items-center justify-center flex-shrink-0">
              {verdict.status === 'positive' && <CheckCircle2 className="h-8 w-8 text-emerald-600" />}
              {verdict.status === 'negative' && <XCircle className="h-8 w-8 text-rose-600" />}
              {verdict.status === 'delayed' && <Clock className="h-8 w-8 text-amber-600" />}
              {verdict.status === 'conditional' && <AlertTriangle className="h-8 w-8 text-blue-600" />}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block opacity-80">
                حتمی فیصلہ (Verdict of Ramal)
              </span>
              <h4 className="font-amiri text-xl sm:text-2xl font-bold leading-tight mt-0.5">
                {verdict.verdictTextUrdu}
              </h4>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-xl p-3 border border-current/20 text-center flex-shrink-0 sm:min-w-[180px]">
            <span className="text-[11px] block font-bold text-gray-700">میزان / قاضی کی گواہی</span>
            <span className="font-amiri text-lg font-bold text-[#5d4037] block">{qaziFigure.nameUrdu}</span>
            <span className="text-[10px] text-[#7f5539]">{qaziFigure.nature}</span>
          </div>
        </div>

        {/* 4 Diagnostic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pillar 1: Timeline (کب تک ہوگا؟) */}
          <div className="p-4 rounded-xl border border-[#d4a373]/60 bg-[#fdfbf7] shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-[#bc6c25]">
              <Clock className="h-5 w-5" />
              <h5 className="font-bold text-sm text-[#5d4037]">کب تک ہوگا؟ (مدت و وقت)</h5>
            </div>
            <p className="font-amiri text-lg font-bold text-[#bc6c25]">
              {timelineEstimate.durationUrdu}
            </p>
            <p className="text-xs text-[#7f5539] leading-relaxed">
              {timelineEstimate.subtextUrdu}
            </p>
          </div>

          {/* Pillar 2: Past & Present State */}
          <div className="p-4 rounded-xl border border-[#d4a373]/60 bg-[#fdfbf7] shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700">
              <Eye className="h-5 w-5" />
              <h5 className="font-bold text-sm text-[#5d4037]">ماضی و حال کے احوال</h5>
            </div>
            <p className="text-xs text-[#2c1e14] leading-relaxed">
              سائل کے دل میں اس معاملے کی شدید بے چینی رہی ہے۔ ماضی میں چند وعدے یا کوششیں التواء کا شکار رہیں، جس سے وسوسہ پیدا ہوا۔
            </p>
            <span className="text-[11px] font-bold text-indigo-800 block">
              طبیعت: {targetFigure.element} (عنصرِ {targetFigure.rulingPlanet})
            </span>
          </div>

          {/* Pillar 3: Obstacles & Root Causes */}
          <div className="p-4 rounded-xl border border-[#d4a373]/60 bg-[#fdfbf7] shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-rose-700">
              <ShieldAlert className="h-5 w-5" />
              <h5 className="font-bold text-sm text-[#5d4037]">وجوہات و رکاوٹیں</h5>
            </div>
            <p className="text-xs text-[#2c1e14] leading-relaxed">
              {activePrimaryTopic.possibleCausesUrdu.slice(0, 2).join('، ')} کا اثر دکھائی دیتا ہے۔ حاسدین کی نگاہِ بد یا وقتی بندش مانع رہی ہے۔
            </p>
            <span className="text-[11px] font-bold text-rose-800 block">
              حاکم سیارہ: {targetFigure.rulingPlanet}
            </span>
          </div>

          {/* Pillar 4: Recommended Gemstone & Metal */}
          <div className="p-4 rounded-xl border border-[#d4a373]/60 bg-[#fdfbf7] shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-emerald-700">
              <Award className="h-5 w-5" />
              <h5 className="font-bold text-sm text-[#5d4037]">موافق نگینہ و صدقہ</h5>
            </div>
            <p className="text-xs font-bold text-emerald-900">
              {verdict.remedies.gemstoneUrdu}
            </p>
            <p className="text-[11px] text-[#7f5539] leading-relaxed">
              {verdict.remedies.sadqahUrdu}
            </p>
          </div>
        </div>

        {/* Spiritual Remedies & Wazifa Section */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#faedcd]/60 via-[#fefae0] to-[#faedcd]/60 border-2 border-[#d4a373] space-y-3">
          <h4 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#bc6c25]" />
            روحانی حل، وظیفہ و مجرب عمل (مجرباتِ فیضِ چشتیہ)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-[#d4a373]/40 space-y-1">
              <span className="font-bold text-[#bc6c25] block">وظیفہ و کلماتِ شفاء و کشائش:</span>
              <p className="text-sm font-amiri font-bold text-[#2c1e14] leading-relaxed">
                {verdict.remedies.wazifaUrdu}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#d4a373]/40 space-y-1">
              <span className="font-bold text-[#bc6c25] block">رہنمائی و تدبیر:</span>
              <p className="text-xs text-[#2c1e14] leading-relaxed">
                {verdict.remedies.adviceUrdu}
              </p>
            </div>
          </div>

          {/* Quick Transfer to Naqsh & Takseer buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {onSendToNaqsh && (
              <button
                onClick={() => onSendToNaqsh(totalAbjad > 0 ? totalAbjad : 786)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#bc6c25] text-white font-bold text-xs hover:bg-[#a2581c] shadow transition-all"
              >
                <Send className="h-4 w-4" />
                اس سوال کا نقش تیار کریں (مولد النقوش)
              </button>
            )}
            {onSendToTakseer && (
              <button
                onClick={() => onSendToTakseer(`${inquirerName} ${motherName} فتح نصرت`)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7f5539] text-white font-bold text-xs hover:bg-[#5d4037] shadow transition-all"
              >
                <Flame className="h-4 w-4 text-amber-300" />
                تکسیرِ طلسمات میں ارسال کریں
              </button>
            )}
          </div>
        </div>

        {/* 6. COMPLETE 16-HOUSE ZAICHA GRID (مکمل ۱۶ بیوتِ رمل کا نقشہ) */}
        <div className="space-y-4 pt-4 border-t-2 border-[#e9edc9]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-amiri text-xl font-bold text-[#5d4037] flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#bc6c25]" />
                مکمل زائچہ رمل (سولہ بیوت و اشکالِ شانزدہ گانہ)
              </h4>
              <p className="text-xs text-[#7f5539]">
                کسی بھی خانے پر کلک کر کے اس گھر کے تفصیلی احوال اور دائرۂ کار کا مشاہدہ کریں۔
              </p>
            </div>
            <button
              onClick={() => setShowEncyclopedia(!showEncyclopedia)}
              className="px-3 py-1.5 rounded-lg bg-[#faedcd] text-[#5d4037] font-bold text-xs border border-[#d4a373] hover:bg-[#d4a373] transition-all flex items-center gap-1.5"
            >
              <BookOpen className="h-4 w-4" />
              {showEncyclopedia ? 'انسائیکلوپیڈیا چھپائیں' : 'سولہ اشکال کی لغت و خواص'}
            </button>
          </div>

          {/* 16 Houses Bento Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {fullZaicha16.map((fig, idx) => {
              const houseDef = RAMAL_16_HOUSES[idx];
              const isSelectedHouse = selectedHouseView === idx + 1;
              const isTargetForTopic = targetHouseIndex === idx;

              let borderClass = 'border-[#d4a373]/40 bg-white';
              if (isTargetForTopic) {
                borderClass = 'border-2 border-[#bc6c25] bg-amber-50/80 ring-2 ring-[#bc6c25]/30 shadow-md';
              } else if (idx === 14) {
                // Judge
                borderClass = 'border-2 border-indigo-500 bg-indigo-50/60 shadow';
              } else if (idx === 15) {
                // Final
                borderClass = 'border-2 border-emerald-500 bg-emerald-50/60 shadow';
              }

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedHouseView(idx + 1)}
                  className={`p-2.5 rounded-xl text-center transition-all flex flex-col items-center justify-between min-h-[140px] ${borderClass} hover:border-[#bc6c25] hover:scale-[1.02]`}
                >
                  <div className="w-full flex items-center justify-between text-[10px] font-bold text-[#7f5539] border-b border-gray-100 pb-1 mb-1">
                    <span>بیت {idx + 1}</span>
                    {isTargetForTopic && (
                      <span className="rounded bg-[#bc6c25] text-white px-1 text-[9px]">سوال</span>
                    )}
                    {idx === 14 && (
                      <span className="rounded bg-indigo-700 text-white px-1 text-[9px]">قاضی</span>
                    )}
                    {idx === 15 && (
                      <span className="rounded bg-emerald-700 text-white px-1 text-[9px]">عاقبت</span>
                    )}
                  </div>

                  {/* Figure Pattern */}
                  <div className="my-1">
                    {renderRamalSymbol(fig.pattern, 'sm')}
                  </div>

                  <div className="w-full pt-1">
                    <span className="font-amiri text-sm font-bold text-[#2c1e14] block leading-tight">
                      {fig.nameUrdu}
                    </span>
                    <span className="text-[9px] text-[#7f5539] truncate block">
                      {houseDef.nameUrdu.split(' ')[1]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected House Inspection Drawer */}
          {selectedHouseView && RAMAL_16_HOUSES[selectedHouseView - 1] && (
            <div className="p-4 rounded-2xl bg-[#fefae0] border-2 border-[#d4a373] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-amiri text-base font-bold text-[#5d4037] flex items-center gap-2">
                  <Info className="h-4 w-4 text-[#bc6c25]" />
                  {RAMAL_16_HOUSES[selectedHouseView - 1]?.nameUrdu} (تعلق: {fullZaicha16[selectedHouseView - 1]?.nameUrdu || 'نامعلوم'})
                </span>
                <span className="rounded-full bg-[#bc6c25] text-white px-2.5 py-0.5 text-[10px] font-bold">
                  {fullZaicha16[selectedHouseView - 1]?.nature || 'معتدل'}
                </span>
              </div>
              <p className="text-[#2c1e14]">
                <strong className="text-[#5d4037]">دائرۂ کار: </strong>
                {RAMAL_16_HOUSES[selectedHouseView - 1]?.domainUrdu}
              </p>
              <p className="text-[#7f5539]">
                <strong className="text-[#5d4037]">معنی و مفہومِ شکل: </strong>
                {fullZaicha16[selectedHouseView - 1]?.generalMeaning || ''}
              </p>
            </div>
          )}
        </div>

        {/* 7. ENCYCLOPEDIA OF 16 RAMAL FIGURES (سولہ اشکال کی مفصل لغت) */}
        {showEncyclopedia && (
          <div className="mt-6 pt-6 border-t-2 border-[#d4a373] space-y-4">
            <h4 className="font-amiri text-xl font-bold text-[#5d4037] flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#bc6c25]" />
              انسائیکلوپیڈیا اشکالِ رمل (تمام ۱۶ اشکال کے خواص، بروج و عناصر)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {RAMAL_FIGURES_ARRAY.map((fig) => (
                <div
                  key={fig.id}
                  className="p-3 rounded-xl border border-[#d4a373]/60 bg-[#fdfbf7] flex items-start gap-3 shadow-sm"
                >
                  <div className="flex-shrink-0">
                    {renderRamalSymbol(fig.pattern, 'sm')}
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-amiri font-bold text-sm text-[#5d4037]">{fig.nameUrdu}</span>
                      <span className="text-[10px] font-bold text-[#bc6c25]">{fig.element}</span>
                    </div>
                    <p className="text-[11px] text-[#7f5539] font-bold">{fig.nature} | {fig.rulingZodiacUrdu}</p>
                    <p className="text-[10px] text-[#2c1e14] leading-relaxed line-clamp-2">{fig.generalMeaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
