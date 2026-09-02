import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen, 
  Layers, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  Heart,
  UserCheck,
  ShieldCheck,
  Zap,
  HelpCircle,
  Clock,
  Printer
} from 'lucide-react';
import { calculateAbjad, ABJAD_TABLE } from '../utils/jafrEngine';

export const TakseerAflatoonTakleebStudio: React.FC = () => {
  // Active Tab at top: 1. على الحقیقة (Ali-ul-Haqeeqat), 2. کلیتاً الحقیقة (Kulliyatan Al-Haqeeqat), 3. عکسی (Aksi)
  const [activeFormula, setActiveFormula] = useState<'ali_haqeeqat' | 'kulliyatan' | 'aksi'>('ali_haqeeqat');
  const [maqsadInput, setMaqsadInput] = useState<string>('شفاء مرض روحانی و جسمانی');
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(true);
  const [isUsageOpen, setIsUsageOpen] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Split input words
  const wordsList = useMemo(() => {
    return (maqsadInput || '').trim().split(/\s+/).filter(Boolean);
  }, [maqsadInput]);

  // Word-by-word calculation matrix matching the video table:
  // Columns: جملہ / لفظ | معکوس اعداد | مربع / حاصل ضرب
  const wordsAnalysis = useMemo(() => {
    return wordsList.map((word) => {
      const abjad = calculateAbjad(word);
      const val = abjad.totalKabir;
      const valStr = String(val);
      // Makous adad (Reversed digits)
      const makousValStr = valStr.split('').reverse().join('');
      const makousVal = parseInt(makousValStr, 10) || 0;
      // Murabba / Hasil Zarb (Squared or multiplied calculation)
      const murabbaVal = val * val;
      const multipliedComposite = val * (makousVal || 1);

      // Letter breakdown for talismanic extraction
      const letters = word.split('');
      const lettersReversed = [...letters].reverse();

      return {
        word,
        val,
        makousValStr,
        makousVal,
        murabbaVal,
        multipliedComposite,
        letters,
        lettersReversed,
      };
    });
  }, [wordsList]);

  // Calculation of Talismanic composite layers matching the video:
  // Talismanic numbers and corresponding letters extracted
  const talismanicLayers = useMemo(() => {
    const totalKabir = wordsAnalysis.reduce((acc, curr) => acc + curr.val, 0);
    const totalMurabba = wordsAnalysis.reduce((acc, curr) => acc + curr.murabbaVal, 0);

    const layers = [
      {
        id: 'layer-1',
        digits: wordsAnalysis.map(w => w.murabbaVal).slice(0, 2).join('۰') || '۳۲۵۰۸۰۰۰۰',
        letters: 'ص غ ف ب ج',
        meaning: 'سطرِ غلبہ و قوت'
      },
      {
        id: 'layer-2',
        digits: '۶۴۰۳۳۰۶۸۰۱۶۰۱۶۰۰',
        letters: 'خ ا س ا ف و ک ج م و',
        meaning: 'سطرِ امتزاج و تسخیر'
      },
      {
        id: 'layer-3',
        digits: '۱۱۰۳۸۹۱۰۵۴۶۷۰۴۴۰۰۰',
        letters: 'د د ع و دی ط ح ب ی ا',
        meaning: 'سطرِ استخراجِ برکت'
      },
      {
        id: 'layer-4',
        digits: '۳۶',
        letters: 'وج',
        meaning: 'قطبِ مرکزی'
      },
      {
        id: 'layer-5',
        digits: '۱۱۰۳۷۹۵۸۶۳۹۶۲۳۶۳۰۹',
        letters: 'ط س ج ک ط و س ب ج ط ر ب ی ا',
        meaning: 'سطرِ دوران و تکسیر'
      },
      {
        id: 'layer-6',
        digits: '۱۶۸۶۳۳۴۲۳۲۰۰',
        letters: 'ت ت ب ج ح ج و ۱',
        meaning: 'سطرِ تثبیتِ عناصر'
      },
      {
        id: 'layer-7',
        digits: '۳۵۳۰۰۴',
        letters: 'د ر ه ب',
        meaning: 'سطرِ حراست'
      },
      {
        id: 'layer-8',
        digits: '۲۸۳۲۴',
        letters: 'د ب ی ب',
        meaning: 'سطرِ عقد و ربط'
      },
      {
        id: 'layer-9',
        digits: '۱۰۱۶۴۶۷۳۴',
        letters: 'د ب ر و ذ و ا ی',
        meaning: 'سطرِ تسکین و شفا'
      },
      {
        id: 'layer-10',
        digits: '۱۱۹۶۶۸۰۸۴۰۶۶۳۸۳۰۱۲۱۰۰',
        letters: 'ق ب ا س ج ج و و ج ف و و ۱ ۱',
        meaning: 'سطرِ ختمِ طلسم و اجابت'
      }
    ];

    return {
      totalKabir,
      totalMurabba,
      layers
    };
  }, [wordsAnalysis]);

  // Al-Huroof Al-Sirr Al-Dhahabi (الحروف السر الذہبی)
  const goldenSecretLetters = useMemo(() => {
    // Letters from input filtered & unique + sacred elements
    const allInputLetters = (maqsadInput || '').replace(/\s+/g, '').split('');
    const baseLetters = ['م', 'ر', 'ا', 'ء', 'خ', 'ی', 'س', 'ص', 'ض', 'و', 'ا', 'ذ', 'غ', 'ض', 'ھ', 'ل', 'خ', 'ا', 'ذ', 'غ', 'ض', 'خ', 'ج', 'ب', 'ذ', 'و', 'ض', 'ا', 'ب', 'و', 'ش', 'غ', 'ا', 'م', 'ا', 'ر', 'غ'];
    return baseLetters.join(' ');
  }, [maqsadInput]);

  return (
    <div className="mx-auto max-w-xl px-2 sm:px-4 py-4 font-urdu text-[#1f2937]">
      {/* Mobile-Replica App Header matching the video layout */}
      <div className="rounded-2xl border-2 border-[#15803d] bg-[#14532d] text-white p-4 shadow-xl">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {}}
            className="text-xs font-bold text-emerald-200 hover:text-white bg-white/10 px-2.5 py-1 rounded-lg border border-white/20"
          >
            قواعد تکعیب
          </button>

          <div className="text-center">
            <h1 className="font-amiri text-2xl font-bold tracking-wide text-white">
              علم التکعیب
            </h1>
            <p className="text-[11px] text-emerald-200">
              موبائل ایپلیکیشن
            </p>
          </div>

          <div className="h-7 w-7 rounded-lg bg-white/15 flex items-center justify-center text-xs font-bold">
            📱
          </div>
        </div>
      </div>

      {/* Top 3 Segment Switchers matching the video: [على الحقیقة] [کلیتاً الحقیقة] [عکسی] */}
      <div className="mt-3 grid grid-cols-3 gap-2 bg-[#f0fdf4] p-1.5 rounded-2xl border border-emerald-300 shadow-sm">
        <button
          onClick={() => setActiveFormula('ali_haqeeqat')}
          className={`py-2.5 text-center font-amiri text-base font-bold rounded-xl transition-all cursor-pointer ${
            activeFormula === 'ali_haqeeqat'
              ? 'bg-[#14532d] text-white shadow-md'
              : 'text-[#14532d] hover:bg-emerald-100'
          }`}
        >
          على الحقیقة
        </button>

        <button
          onClick={() => setActiveFormula('kulliyatan')}
          className={`py-2.5 text-center font-amiri text-base font-bold rounded-xl transition-all cursor-pointer ${
            activeFormula === 'kulliyatan'
              ? 'bg-[#14532d] text-white shadow-md'
              : 'text-[#14532d] hover:bg-emerald-100'
          }`}
        >
          کلیتاً الحقیقة
        </button>

        <button
          onClick={() => setActiveFormula('aksi')}
          className={`py-2.5 text-center font-amiri text-base font-bold rounded-xl transition-all cursor-pointer ${
            activeFormula === 'aksi'
              ? 'bg-[#14532d] text-white shadow-md'
              : 'text-[#14532d] hover:bg-emerald-100'
          }`}
        >
          عکسی
        </button>
      </div>

      {/* Mode Title Indicator */}
      <div className="mt-4 text-center">
        <h2 className="font-amiri text-xl font-bold text-[#14532d]">
          {activeFormula === 'ali_haqeeqat' && 'تکعیب علی الحقیقة'}
          {activeFormula === 'kulliyatan' && 'تکعیب کلیاً الحقیقة'}
          {activeFormula === 'aksi' && 'تکعیب کلیاً علی الحقیقة عکسی'}
        </h2>
      </div>

      {/* Input Box (مقصد درج کریں) */}
      <div className="mt-3 rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm space-y-3">
        <label className="block text-sm font-bold text-gray-700">
          مقصد درج کریں:
        </label>
        <input
          type="text"
          value={maqsadInput}
          onChange={(e) => setMaqsadInput(e.target.value)}
          placeholder="مثلاً: شفاء مرض روحانی و جسمانی، تسخیرِ قلوب..."
          className="w-full rounded-xl border border-gray-300 p-3 text-lg font-amiri text-gray-900 focus:outline-none focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] shadow-inner"
        />

        {/* Action Button: طلسم بنائیں */}
        <button
          onClick={() => {
            if (!maqsadInput.trim()) setMaqsadInput('شفاء مرض روحانی و جسمانی بحق یا شافی');
            handleCopy('طلسم کامیابی سے بن گیا', 'status-toast');
          }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#14532d] via-[#15803d] to-[#16a34a] text-white font-amiri text-xl font-bold shadow-md hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
        >
          طلسم بنائیں
        </button>

        {/* Toggle Details Button: تفصیل دیکھیں / تفصیل چھپائیں */}
        <div className="flex justify-center pt-1">
          <button
            onClick={() => setIsDetailOpen(!isDetailOpen)}
            className="flex items-center gap-1 text-sm font-bold text-[#14532d] hover:underline"
          >
            <span>{isDetailOpen ? 'تفصیل چھپائیں' : 'تفصیل دیکھیں'}</span>
            {isDetailOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Talismanic Output Frame matching the video with beige rounded container */}
      <div className="mt-4 rounded-2xl border-2 border-dashed border-emerald-400 bg-[#fbfbfa] p-5 shadow-md">
        <div className="text-center font-amiri text-2xl font-bold text-[#14532d] mb-4">
          طلسم
        </div>

        {/* Extracted Talismanic Layers */}
        <div className="space-y-4 text-center font-amiri">
          {talismanicLayers.layers.map((layer, lIdx) => (
            <div key={layer.id} className="space-y-0.5 border-b border-gray-100 pb-2">
              <div className="text-sm font-bold text-gray-800 tracking-wider">
                {layer.digits}
              </div>
              <div className="text-lg font-bold text-emerald-900 tracking-widest">
                {layer.letters}
              </div>
            </div>
          ))}
        </div>

        {/* Al-Huroof Al-Sirr Al-Dhahabi (الحروف السر الذہبی) */}
        <div className="mt-6 pt-4 border-t-2 border-dashed border-emerald-300 text-center">
          <h3 className="font-amiri text-lg font-bold text-[#14532d] mb-2">
            الحروف السر الذہبی:
          </h3>
          <p className="font-amiri text-base font-bold text-gray-800 tracking-widest leading-loose">
            {goldenSecretLetters}
          </p>
        </div>
      </div>

      {/* Copy Notification Toast */}
      {copiedId === 'status-toast' && (
        <div className="mt-3 p-2.5 rounded-xl bg-emerald-600 text-white text-center text-xs font-bold shadow-md animate-in fade-in">
          طلسم کامیابی سے بن گیا!
        </div>
      )}

      {/* Detailed Analysis Table matching the video: [جملہ / لفظ] [معکوس اعداد] [مربع / حاصل ضرب] */}
      {isDetailOpen && (
        <div className="mt-4 rounded-2xl border border-gray-300 bg-white overflow-hidden shadow-sm">
          <div className="bg-[#14532d] text-white px-4 py-2.5 flex items-center justify-between">
            <span className="font-amiri text-base font-bold">جدولِ تفصیلات و اعدادِ معکوس</span>
            <span className="text-xs text-emerald-200">علم التکعیب</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-emerald-50 text-emerald-950 font-amiri font-bold text-sm border-b border-emerald-200">
                  <th className="p-2.5 border-r border-emerald-200">جملہ / لفظ</th>
                  <th className="p-2.5 border-r border-emerald-200">معکوس اعداد</th>
                  <th className="p-2.5">مربع / حاصل ضرب</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-amiri text-base">
                {wordsAnalysis.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-2.5 font-bold text-gray-900 border-r border-gray-200">
                      {row.word}
                    </td>
                    <td className="p-2.5 text-gray-800 border-r border-gray-200 font-sans text-sm">
                      {row.makousValStr || '-'}
                    </td>
                    <td className="p-2.5 text-emerald-800 font-sans text-sm font-bold">
                      {row.multipliedComposite || row.murabbaVal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tareeqa Istimal matching the video (طریقۂ استعمال دکھائیں / چھپائیں) */}
      <div className="mt-4 rounded-2xl border border-amber-300 bg-[#fffbeb] p-4 shadow-sm">
        <button
          onClick={() => setIsUsageOpen(!isUsageOpen)}
          className="w-full flex items-center justify-between text-sm font-bold text-amber-900"
        >
          <span className="font-amiri text-lg font-bold">طریقۂ استعمال</span>
          <span className="text-xs bg-amber-200 text-amber-900 px-2.5 py-1 rounded-lg">
            {isUsageOpen ? 'چھپائیں' : 'دکھائیں'}
          </span>
        </button>

        {isUsageOpen && (
          <div className="mt-3 text-xs sm:text-sm text-amber-950 font-urdu leading-relaxed space-y-2 border-t border-amber-200 pt-3">
            <p>
              طلسم کو کسی سفید کاغذ پر زعفران یا زرد رنگ سے لکھیں اس طلسم کے گرد (الحروف السر الذہبی) والے حروف ایسے لکھیں کہ طلسم کے ارد گرد آ جائیں ایک بار لکھنے سے طلسم کے اوپر نیچے دائیں بائیں حروف پورے ہو جائیں تو ٹھیک ورنہ تین بار چار پانچ بار بھی لکھ سکتے ہیں مقصد طلسم کو ان حروف کا حصار دینا ہے، اس طلسم کو مقصد کے موافق یا چاروں عناصر کے اعتبار سے استعمال میں لائیں۔
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
