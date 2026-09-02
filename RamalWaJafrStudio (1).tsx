import React, { useState, useMemo } from 'react';
import { 
  Dices, 
  Sparkles, 
  Flame, 
  Droplets, 
  Wind, 
  Mountain, 
  RefreshCw, 
  Layers, 
  BookOpen, 
  Award, 
  Copy, 
  Check,
  ChevronDown,
  ChevronUp,
  Compass,
  Zap,
  Printer
} from 'lucide-react';
import { calculateAbjad, generateNaqsh } from '../utils/jafrEngine';

// 16 Sacred Ramal Figures with elemental attributes, letters, and astrological rulership
export const RAMAL_FIGURES = [
  { id: 'lihyan', nameUrdu: 'لحیان', pattern: [1, 1, 1, 2], element: 'آتش', nature: 'سعد داخل', letters: 'ا ہ ط م', kabir: 55, rulingPlanet: 'مشتری', meaning: 'علم، حکمت، دولت، بلندیِ مراتب و حصولِ مقاصد', elementColor: 'text-red-700 bg-red-50 border-red-200' },
  { id: 'qabd_dakhil', nameUrdu: 'قبض الداخل', pattern: [2, 1, 2, 1], element: 'خاک', nature: 'سعد داخل', letters: 'ب و ی ن', kabir: 68, rulingPlanet: 'زحل', meaning: 'حصولِ مال، امانت، بقائے اقتدار و استحکام', elementColor: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { id: 'qabd_kharij', nameUrdu: 'قبض الخارج', pattern: [1, 2, 1, 2], element: 'باد', nature: 'نحس خارج', letters: 'ج ز ک س', kabir: 84, rulingPlanet: 'شمس', meaning: 'نقصانِ مال، خرچ، فراق و تبدیلیِ مکان', elementColor: 'text-amber-700 bg-amber-50 border-amber-200' },
  { id: 'jamaat', nameUrdu: 'جماعت', pattern: [2, 2, 2, 2], element: 'آب', nature: 'سعد ممتزج', letters: 'د ح ل ع', kabir: 115, rulingPlanet: 'قمر', meaning: 'مجمع، صلح، اتحاد، شادی، رفاقت و اتفاق', elementColor: 'text-blue-700 bg-blue-50 border-blue-200' },
  { id: 'farah', nameUrdu: 'بیاض (فرح)', pattern: [2, 2, 1, 2], element: 'آب', nature: 'سعد ثابت', letters: 'ف ق ر ش', kabir: 980, rulingPlanet: 'زہرہ', meaning: 'خوشی، بشارت، پاکیزگی، فتح و شادمانی', elementColor: 'text-blue-700 bg-blue-50 border-blue-200' },
  { id: 'humrah', nameUrdu: 'حمرہ', pattern: [1, 2, 2, 2], element: 'آتش', nature: 'نحس عارض', letters: 'ش ت ث خ', kabir: 1800, rulingPlanet: 'مریخ', meaning: 'جوش، غصہ، خون، قہر، دشمنی و مخالفت', elementColor: 'text-red-700 bg-red-50 border-red-200' },
  { id: 'ankees', nameUrdu: 'انکیس', pattern: [2, 2, 2, 1], element: 'خاک', nature: 'نحس منقلب', letters: 'ذ ض ظ غ', kabir: 3400, rulingPlanet: 'زحل', meaning: 'رکاوٹ، تاخیر، بوجھ، غم و پریشانی', elementColor: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { id: 'nasrat_dakhil', nameUrdu: 'نصرۃ الداخل', pattern: [2, 2, 1, 1], element: 'آتش', nature: 'سعد داخل', letters: 'ن ص ر ت', kabir: 740, rulingPlanet: 'شمس', meaning: 'کامیابی، غلبہ، تائیدِ غیبی و ظفر', elementColor: 'text-red-700 bg-red-50 border-red-200' },
  { id: 'nasrat_kharij', nameUrdu: 'نصرۃ الخارج', pattern: [1, 1, 2, 2], element: 'باد', nature: 'سعد خارج', letters: 'خ ر ج ن', kabir: 853, rulingPlanet: 'عطارد', meaning: 'سفر، رہائی، برآمدگیِ مطلوب و فتحِ بیرون', elementColor: 'text-amber-700 bg-amber-50 border-amber-200' },
  { id: 'utbat_dakhil', nameUrdu: 'عتبۃ الداخل', pattern: [2, 1, 1, 1], element: 'خاک', nature: 'سعد داخل', letters: 'ع ت ب ہ', kabir: 477, rulingPlanet: 'زہرہ', meaning: 'آمدِ مہمان، نئی امید، دروازہ کھلنا و آسانی', elementColor: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { id: 'utbat_kharij', nameUrdu: 'عتبۃ الخارج', pattern: [1, 1, 2, 1], element: 'آتش', nature: 'نحس خارج', letters: 'خ ر ج ع', kabir: 873, rulingPlanet: 'مریخ', meaning: 'اخراج، رخصت، زوال و رکاوٹ', elementColor: 'text-red-700 bg-red-50 border-red-200' },
  { id: 'naqi_al_khadd', nameUrdu: 'نقی الخد', pattern: [1, 2, 2, 1], element: 'آب', nature: 'سعد ثابت', letters: 'ن ق ی خ', kabir: 760, rulingPlanet: 'مشتری', meaning: 'خوبصورتی، صفائی، سچائی، کشف و پاکیزگی', elementColor: 'text-blue-700 bg-blue-50 border-blue-200' },
  { id: 'uqla', nameUrdu: 'عقلہ', pattern: [2, 1, 2, 2], element: 'باد', nature: 'ممتزج منقلب', letters: 'ع ق ل ہ', kabir: 205, rulingPlanet: 'عطارد', meaning: 'بندش، تدبیر، قید، عقد و گتھی سلجھنا', elementColor: 'text-amber-700 bg-amber-50 border-amber-200' },
  { id: 'ijtima', nameUrdu: 'اجتماع', pattern: [2, 1, 1, 2], element: 'خاک', nature: 'سعد ثابت', letters: 'ا ج ت م', kabir: 444, rulingPlanet: 'قمر', meaning: 'ملاقات، تکمیل، قرار داد و دوام', elementColor: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { id: 'tareeq', nameUrdu: 'طریق', pattern: [1, 1, 1, 1], element: 'باد', nature: 'ممتزج منقلب', letters: 'ط ر ی ق', kabir: 319, rulingPlanet: 'قمر', meaning: 'راستہ، پیشرفت، سفر، گردش و حرکت', elementColor: 'text-amber-700 bg-amber-50 border-amber-200' },
  { id: 'kousaj', nameUrdu: 'کوسج', pattern: [1, 2, 1, 1], element: 'آب', nature: 'نحس منقلب', letters: 'ک و س ج', kabir: 99, rulingPlanet: 'مریخ', meaning: 'نقص، قلت، پریشانی و کمیِ وسائل', elementColor: 'text-blue-700 bg-blue-50 border-blue-200' },
];

interface RamalWaJafrStudioProps {
  onSendToTakseer?: (text: string) => void;
  onSendToTakseerAflatoon?: (text: string) => void;
  onSendToNaqsh?: (adad: number) => void;
}

export const RamalWaJafrStudio: React.FC<RamalWaJafrStudioProps> = ({
  onSendToTakseer,
  onSendToTakseerAflatoon,
  onSendToNaqsh,
}) => {
  const [selectedFigureId, setSelectedFigureId] = useState<string>('lihyan');
  const [castFigures, setCastFigures] = useState<typeof RAMAL_FIGURES>(RAMAL_FIGURES.slice(0, 16));
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Cast Ramal Dice (قرعہ رمل)
  const rollRamal = () => {
    setIsRolling(true);
    setTimeout(() => {
      const shuffled = [...RAMAL_FIGURES].sort(() => 0.5 - Math.random());
      setCastFigures(shuffled);
      setSelectedFigureId(shuffled[0].id);
      setIsRolling(false);
    }, 500);
  };

  const activeFigure = useMemo(() => {
    return RAMAL_FIGURES.find((f) => f.id === selectedFigureId) || RAMAL_FIGURES[0];
  }, [selectedFigureId]);

  const activeFigureAbjad = useMemo(() => {
    return calculateAbjad(activeFigure.nameUrdu + ' ' + activeFigure.letters);
  }, [activeFigure]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 font-urdu text-[#2c1e14]">
      {/* Header Banner */}
      <div className="rounded-2xl border-2 border-[#bc6c25] bg-gradient-to-r from-[#7f5539] via-[#9c6644] to-[#b07d62] text-white p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Dices className="h-6 w-6 text-amber-200" />
              <span className="rounded bg-white/20 px-2.5 py-0.5 text-xs font-bold text-amber-100 border border-white/30">
                علمِ نقاط، اشکال و استخراجِ جفر
              </span>
            </div>
            <h2 className="font-amiri text-2xl md:text-3xl font-bold tracking-tight">
              علمِ رمل و جفر اسٹوڈیو (سولہ اشکالِ رمل و امتزاجِ تکسیر)
            </h2>
            <p className="text-xs sm:text-sm text-[#faedcd] mt-1 max-w-2xl leading-relaxed">
              سولہ اشکالِ رمل کے چاروں عناصر (آتش، باد، آب، خاک)، حروفِ ابجد، سعد و نحس کیفیات اور ان کے جفری نقوش و تکسیر کا مکمل خودکار نظام۔
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={rollRamal}
              disabled={isRolling}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isRolling ? 'animate-spin' : ''}`} />
              <span>قرعہ رمل ڈالیں (Cast Ramal)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 16 Figures Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-amiri text-xl font-bold text-[#5d4037] flex items-center gap-2">
            <Compass className="h-5 w-5 text-[#bc6c25]" />
            <span>سولہ اشکالِ رمل (زائچہ و تفاصیل)</span>
          </h3>
          <span className="text-xs text-gray-600 font-bold">
            منتخب شکل: {activeFigure.nameUrdu}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
          {castFigures.map((fig, idx) => {
            const isSelected = fig.id === selectedFigureId;
            return (
              <button
                key={`${fig.id}-${idx}`}
                onClick={() => setSelectedFigureId(fig.id)}
                className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#bc6c25] bg-[#faedcd] shadow-md scale-105'
                    : 'border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-50/40'
                }`}
              >
                {/* 4-tier Ramal Dots */}
                <div className="flex flex-col items-center gap-1 my-1.5">
                  {fig.pattern.map((dotCount, dotIdx) => (
                    <div key={dotIdx} className="flex gap-1">
                      {dotCount === 1 ? (
                        <div className="h-2 w-2 rounded-full bg-[#5d4037]" />
                      ) : (
                        <div className="flex gap-1.5">
                          <div className="h-2 w-2 rounded-full bg-[#5d4037]" />
                          <div className="h-2 w-2 rounded-full bg-[#5d4037]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="font-amiri text-base font-bold text-[#5d4037] mt-1">
                  {fig.nameUrdu}
                </div>
                <div className="text-[10px] text-gray-500 font-bold">
                  {fig.nature}
                </div>
                <div className="text-[10px] text-[#bc6c25] font-bold">
                  {fig.element}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Figure Detailed Dossier */}
      <div className="rounded-2xl border-2 border-[#bc6c25] bg-white p-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Visual Shape Box */}
          <div className="rounded-2xl border-2 border-[#faedcd] bg-[#fdfaf1] p-5 text-center flex flex-col items-center justify-center space-y-4">
            <h4 className="font-amiri text-2xl font-bold text-[#5d4037]">
              شکلِ {activeFigure.nameUrdu}
            </h4>

            {/* Enlarged Dot Representation */}
            <div className="p-4 rounded-2xl bg-white border border-[#d4a373] shadow-inner space-y-2 inline-block">
              {activeFigure.pattern.map((dots, dIdx) => (
                <div key={dIdx} className="flex justify-center gap-3">
                  {dots === 1 ? (
                    <div className="h-4 w-4 rounded-full bg-[#bc6c25] shadow-xs" />
                  ) : (
                    <div className="flex gap-3">
                      <div className="h-4 w-4 rounded-full bg-[#5d4037] shadow-xs" />
                      <div className="h-4 w-4 rounded-full bg-[#5d4037] shadow-xs" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${activeFigure.elementColor}`}>
                عنصر: {activeFigure.element} • طبیعت: {activeFigure.nature}
              </span>
              <p className="text-xs text-gray-600">
                حاکم کوکب: <strong>{activeFigure.rulingPlanet}</strong>
              </p>
            </div>
          </div>

          {/* Details & Attributes */}
          <div className="md:col-span-2 space-y-4 font-urdu">
            <div>
              <h4 className="font-amiri text-xl font-bold text-[#5d4037] border-b pb-2">
                حروفِ جفر، اعداد و معنوی تشریح
              </h4>
              <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                <strong>حکمت و تعبیر: </strong>
                {activeFigure.meaning}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-[11px] font-bold text-amber-800">حروفِ رمل</span>
                <div className="font-amiri text-xl font-bold text-amber-900 tracking-wider">
                  {activeFigure.letters}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                <span className="text-[11px] font-bold text-blue-800">اعدادِ ابجد کبیر</span>
                <div className="font-amiri text-xl font-bold text-blue-900">
                  {activeFigure.kabir}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[11px] font-bold text-emerald-800">موکلِ علوی</span>
                <div className="font-amiri text-base font-bold text-emerald-900">
                  {activeFigureAbjad.ulwiMuwakkil}
                </div>
              </div>
            </div>

            {/* Action Buttons to connect with Takseer and Naqsh */}
            <div className="pt-2 flex items-center gap-2 flex-wrap">
              <button
                onClick={() => onSendToTakseer?.(activeFigure.nameUrdu + ' ' + activeFigure.letters)}
                className="px-4 py-2 rounded-xl bg-[#5d4037] hover:bg-[#3e2723] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                تکسیرِ عام میں منتقل کریں
              </button>
              <button
                onClick={() => onSendToTakseerAflatoon?.(activeFigure.nameUrdu + ' ' + activeFigure.letters)}
                className="px-4 py-2 rounded-xl bg-[#1e40af] hover:bg-[#1e3a8a] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                تکسیرِ افلاطون میں منتقل کریں
              </button>
              <button
                onClick={() => onSendToNaqsh?.(activeFigure.kabir)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                نقش بنائیں ({activeFigure.kabir})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
