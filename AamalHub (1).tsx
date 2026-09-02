import React, { useState, useMemo } from 'react';
import { KASH_AL_BARNY_OPERATIONS } from '../data/kashAlBarnyBooks';
import { calculateCompatibility } from '../utils/jafrEngine';
import { OperationProtocol } from '../types';
import { Heart, Users, Lock, ShieldAlert, Sparkles, Flame, Droplets, Wind, Mountain, AlertTriangle, BookOpen, Clock } from 'lucide-react';

interface AamalHubProps {
  onNavigateToNaqsh?: (adad: number) => void;
  onNavigateToEclipse?: () => void;
  onNavigateToOperationsIndex?: () => void;
}

export const AamalHub: React.FC<AamalHubProps> = ({ 
  onNavigateToNaqsh, 
  onNavigateToEclipse,
  onNavigateToOperationsIndex 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('mahabbat');

  // Interactive Seeker & Target Compatibility State
  const [talibName, setTalibName] = useState<string>('محمد علی');
  const [talibMother, setTalibMother] = useState<string>('فاطمہ');
  const [matloobName, setMatloobName] = useState<string>('زینب');
  const [matloobMother, setMatloobMother] = useState<string>('مریم');

  const compatibilityReport = useMemo(() => {
    return calculateCompatibility(talibName, talibMother, matloobName, matloobMother);
  }, [talibName, talibMother, matloobName, matloobMother]);

  const categories = [
    { id: 'mahabbat', label: 'اعمال محبت و دوستی', icon: Heart, color: 'text-[#9d0208]' },
    { id: 'zaban_bandi', label: 'اعمال زبان بندی و صلح', icon: Lock, color: 'text-[#bc6c25]' },
    { id: 'taskheer_khalaiq', label: 'تسخیر خلائق و امراء', icon: Users, color: 'text-[#1d3557]' },
    { id: 'taskheer_jinn', label: 'تسخیر جنات و ارواح', icon: Sparkles, color: 'text-[#5d4037]' },
    { id: 'adawat', label: 'اعمال تفریق و عزلِ ظالم', icon: ShieldAlert, color: 'text-[#9d0208]' },
  ];

  const filteredOperations: OperationProtocol[] = useMemo(() => {
    return KASH_AL_BARNY_OPERATIONS.filter((op) => op.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border-2 border-[#d4a373] bg-[#f2e8cf] p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#bc6c25] text-white shadow-sm">
                <BookOpen className="h-5 w-5" />
              </span>
              <h2 className="font-amiri text-2xl font-bold text-[#5d4037]">
                دستور العمل و عملیات کاش البرنی
              </h2>
            </div>
            <p className="mt-1 text-sm text-[#8d6e63] max-w-2xl font-medium">
              کاش البرنی کی کتب (قوانین طلسم، قوانین افلاطون، رموز الجفر، و مفتاح الجفر) سے ماخوذ اعمال محبت، الفت، زبان بندی، تسخیر خلائق، تسخیر جنات، اور تفریق اعداء کے مکمل قواعد و شرائط۔
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onNavigateToOperationsIndex && (
              <button
                id="btn-aamal-to-operations-index"
                onClick={onNavigateToOperationsIndex}
                className="flex items-center gap-1.5 bg-[#5d4037] hover:bg-[#43281c] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
              >
                <BookOpen className="h-4 w-4 text-[#ffd166]" />
                <span>فہرستِ مقاصد و عملیات (انڈیکس)</span>
              </button>
            )}

            {onNavigateToEclipse && (
              <button
                id="btn-aamal-to-eclipse"
                onClick={onNavigateToEclipse}
                className="flex items-center gap-1.5 bg-[#bc6c25] hover:bg-[#a2591d] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>اعمالِ گرہن (کسوف و خسوف) و کواکب</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-[#e7d8c9]">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#bc6c25] text-white shadow-md'
                    : 'bg-[#fdfaf1] text-[#5d4037] hover:bg-[#faedcd] border border-[#d4a373]'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : cat.color}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Interactive Sub-Section: Compatibility Calculator for Mahabbat */}
      {activeCategory === 'mahabbat' && (
        <div className="rounded-2xl border-2 border-[#d4a373] bg-[#ffffff] p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-[#9d0208]" />
            <h3 className="font-amiri text-xl font-bold text-[#5d4037]">
              حسابِ تقابل و موافقتِ عناصر طالب و مطلوب (قوانین افلاطون)
            </h3>
          </div>
          <p className="text-xs text-[#8d6e63] mb-6 leading-relaxed font-medium">
            کاش البرنی کی کتاب "قوانین افلاطون" کے مطابق محبت کے عمل سے قبل دونوں کے عناصر (آتش، باد، آب، خاک) کا باہمی توازن دیکھنا شرطِ لازم ہے تاکہ دائمی الفت قائم ہو۔
          </p>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-[#5d4037] mb-1">نام طالب (خواہش مند):</label>
              <input
                type="text"
                id="input-talib-name"
                value={talibName}
                onChange={(e) => setTalibName(e.target.value)}
                className="w-full rounded-xl border-2 border-[#d4a373] bg-[#fdfaf1] px-3 py-2 text-sm text-[#2c1e14] font-amiri focus:border-[#bc6c25] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#5d4037] mb-1">والدہ طالب:</label>
              <input
                type="text"
                id="input-talib-mother"
                value={talibMother}
                onChange={(e) => setTalibMother(e.target.value)}
                className="w-full rounded-xl border-2 border-[#d4a373] bg-[#fdfaf1] px-3 py-2 text-sm text-[#2c1e14] font-amiri focus:border-[#bc6c25] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#9d0208] mb-1">نام مطلوب (جس کی محبت مقصود ہو):</label>
              <input
                type="text"
                id="input-matloob-name"
                value={matloobName}
                onChange={(e) => setMatloobName(e.target.value)}
                className="w-full rounded-xl border-2 border-[#d4a373] bg-[#fdfaf1] px-3 py-2 text-sm text-[#2c1e14] font-amiri focus:border-[#bc6c25] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#9d0208] mb-1">والدہ مطلوب:</label>
              <input
                type="text"
                id="input-matloob-mother"
                value={matloobMother}
                onChange={(e) => setMatloobMother(e.target.value)}
                className="w-full rounded-xl border-2 border-[#d4a373] bg-[#fdfaf1] px-3 py-2 text-sm text-[#2c1e14] font-amiri focus:border-[#bc6c25] focus:outline-none"
              />
            </div>
          </div>

          {/* Compatibility Results Card */}
          <div className="rounded-xl border border-[#d4a373] bg-[#f9f4e8] p-5 shadow-xs">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-[#e7d8c9]">
              <div>
                <span className="text-xs text-[#8d6e63] font-bold block">درجہ موافقت و کششِ قلوب:</span>
                <span className="font-amiri text-2xl font-bold text-[#9d0208]">
                  {compatibilityReport.harmonyStatus} ({compatibilityReport.harmonyScore}%)
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#5d4037] font-semibold">
                <div>
                  عنصر طالب: <span className="font-bold text-[#bc6c25]">{compatibilityReport.talibElementUrdu}</span> ({compatibilityReport.talibAdad})
                </div>
                <div>•</div>
                <div>
                  عنصر مطلوب: <span className="font-bold text-[#9d0208]">{compatibilityReport.matloobElementUrdu}</span> ({compatibilityReport.matloobAdad})
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs text-[#2c1e14]">
              <p className="leading-relaxed bg-[#ffffff] p-3.5 rounded-xl border border-[#e7d8c9] font-medium">
                <strong className="text-[#bc6c25]">تجزیہ افلاطونی: </strong>
                {compatibilityReport.harmonyAnalysis}
              </p>
              <p className="leading-relaxed bg-[#ffffff] p-3.5 rounded-xl border border-[#e7d8c9] font-medium">
                <strong className="text-[#283618]">نسخہ و تدبیرِ کاش البرنی: </strong>
                {compatibilityReport.remedyRecommendation}
              </p>
            </div>

            {onNavigateToNaqsh && (
              <div className="mt-4 pt-3 flex justify-end">
                <button
                  id="btn-compatibility-create-naqsh"
                  onClick={() => onNavigateToNaqsh(compatibilityReport.totalCombinedAdad)}
                  className="flex items-center gap-2 rounded-xl bg-[#bc6c25] hover:bg-[#a65d1e] px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>اس مشترکہ عدد ({compatibilityReport.totalCombinedAdad}) کا نقشِ حب تیار کریں</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Warning Alert for Adawat */}
      {activeCategory === 'adawat' && (
        <div className="rounded-2xl border-2 border-[#9d0208] bg-[#fae1dd] p-5 text-[#9d0208] shadow-md flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-[#9d0208] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs font-medium">
            <h4 className="font-amiri text-lg font-bold text-[#9d0208]">
              سخت انتباہ و شرعی تنبیہ از کاش البرنی
            </h4>
            <p className="leading-relaxed text-[#780000]">
              کاش البرنی فرماتے ہیں: "اعمال تفریق و عزلِ ظالم کو کبھی بھی کسی بے گناہ یا ذاتی بغض و حسد کے لیے استعمال نہ کریں۔ اگر ناحق کیا جائے تو رجعت کا تیر پلٹ کر عامل کے اپنے سینے میں پیوست ہو جاتا ہے اور عامل خود تباہ ہو جاتا ہے۔ یہ عمل صرف ظالم کے ظلم کو روکنے اور مظلوم کے دفاع کے لیے مشروط ہے۔"
            </p>
          </div>
        </div>
      )}

      {/* Detailed Operations Cards List */}
      <div className="space-y-6">
        {filteredOperations.map((op) => (
          <div
            key={op.id}
            className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-6 shadow-sm space-y-5 transition-all hover:border-[#d4a373]"
          >
            {/* Operation Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#e7d8c9]">
              <div>
                <span className="text-xs font-bold text-[#bc6c25] bg-[#faedcd] px-2.5 py-0.5 rounded-md border border-[#d4a373]">
                  {op.categoryUrdu}
                </span>
                <h3 className="font-amiri text-xl font-bold text-[#5d4037] mt-2">{op.title}</h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#5d4037] font-semibold bg-[#fdfaf1] px-3 py-1.5 rounded-xl border border-[#e7d8c9]">
                <Clock className="h-3.5 w-3.5 text-[#bc6c25]" />
                <span>{op.requiredSaat}</span>
              </div>
            </div>

            {/* Purpose */}
            <p className="text-sm text-[#2c1e14] leading-relaxed bg-[#fdfaf1] p-3.5 rounded-xl border border-[#e7d8c9] font-medium">
              <strong className="text-[#bc6c25]">مقصد و تاثیر: </strong>
              {op.purpose}
            </p>

            {/* Protocols Grid (Timing, Incense, Ink, Direction) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#f9f4e8] border border-[#e7d8c9]">
                <span className="text-[#8d6e63] font-medium block mb-1">مبارک دن:</span>
                <span className="font-bold text-[#bc6c25]">{op.suitableDay}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#f9f4e8] border border-[#e7d8c9]">
                <span className="text-[#8d6e63] font-medium block mb-1">مخصوص بخور (دھونی):</span>
                <span className="font-bold text-[#bc6c25]">{op.incense}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#f9f4e8] border border-[#e7d8c9]">
                <span className="text-[#8d6e63] font-medium block mb-1">سیاہی و کاغذ:</span>
                <span className="font-bold text-[#bc6c25]">{op.inkAndPaper}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#f9f4e8] border border-[#e7d8c9]">
                <span className="text-[#8d6e63] font-medium block mb-1">سمت و بیٹھک:</span>
                <span className="font-bold text-[#bc6c25]">{op.direction}</span>
              </div>
            </div>

            {/* Preconditions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#5d4037]">لازمی شرائط و پیشگی تیاری:</h4>
              <ul className="space-y-1 text-xs text-[#2c1e14] list-disc list-inside font-medium">
                {op.preconditions.map((pre, pIdx) => (
                  <li key={pIdx}>{pre}</li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Procedure */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#5d4037]">مرحلہ وار طریقہ کار (طریقہ عمل):</h4>
              <div className="space-y-2">
                {op.steps.map((step, sIdx) => (
                  <div key={sIdx} className="p-3 rounded-xl bg-[#fdfaf1] border border-[#e7d8c9] text-xs text-[#2c1e14] font-medium">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Azimat or Recitation */}
            <div className="rounded-xl border-2 border-[#d4a373] bg-[#faedcd] p-4 shadow-inner">
              <span className="text-xs text-[#8d6e63] font-bold block mb-1">عزیمت یا کلماتِ ورد:</span>
              <p className="font-amiri text-xl font-bold text-[#5d4037] text-center tracking-wide">
                {op.azimatOrNaqsh}
              </p>
            </div>

            {/* Protection & Reference */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t border-[#e7d8c9] text-[11px] text-[#8d6e63]">
              <div>
                <span className="font-bold text-[#283618]">تدابیرِ حفاظت: </span>
                {op.protectionMeasures.join(' | ')}
              </div>
              <div className="text-[#8d6e63] italic font-amiri font-bold">
                {op.kashAlBarnyReference}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
