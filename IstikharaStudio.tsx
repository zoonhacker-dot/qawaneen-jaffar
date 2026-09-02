import React, { useState, useMemo } from 'react';
import { 
  calculateMarriageIstikhara, 
  calculateBusinessIstikhara, 
  calculateGeneralIstikhara, 
  calculateAbjad 
} from '../utils/jafrEngine';
import { 
  IstikharaMarriageResult, 
  IstikharaBusinessResult, 
  IstikharaGeneralResult 
} from '../types';
import { DreamInterpretationStudio } from './DreamInterpretationStudio';
import { 
  Compass, 
  Heart, 
  Briefcase, 
  Plane, 
  HelpCircle, 
  Sparkles, 
  Flame, 
  Wind, 
  Droplets, 
  Mountain, 
  Check, 
  Copy, 
  BookOpen, 
  ShieldAlert, 
  Scale, 
  Star, 
  Calendar, 
  Clock, 
  Layers, 
  Award,
  ChevronLeft,
  ChevronRight,
  Info,
  Moon
} from 'lucide-react';

type IstikharaMode = 'shadi' | 'karobar' | 'safar' | 'aam' | 'dream';

interface IstikharaStudioProps {
  onSendToMatrixSuggester?: (text: string) => void;
  onSendToTakseer?: (text: string) => void;
}

export const IstikharaStudio: React.FC<IstikharaStudioProps> = ({
  onSendToMatrixSuggester,
  onSendToTakseer,
}) => {
  const [activeMode, setActiveMode] = useState<IstikharaMode>('shadi');
  const [copied, setCopied] = useState<boolean>(false);

  // Marriage Inputs
  const [p1Name, setP1Name] = useState<string>('محمد');
  const [p1Mother, setP1Mother] = useState<string>('آمنہ');
  const [p2Name, setP2Name] = useState<string>('فاطمہ');
  const [p2Mother, setP2Mother] = useState<string>('خدیجہ');

  // Business Inputs
  const [bizPersonName, setBizPersonName] = useState<string>('احمد');
  const [bizMotherName, setBizMotherName] = useState<string>('مریم');
  const [bizName, setBizName] = useState<string>('تجارتِ ملبوسات و پارچہ بافی');

  // Travel / General Inputs
  const [genPersonName, setGenPersonName] = useState<string>('علی');
  const [genMotherName, setGenMotherName] = useState<string>('فاطمہ');
  const [genTopic, setGenTopic] = useState<string>('سفر برائے حصولِ روزگار و تعلیم');

  // Calculation Results
  const marriageResult: IstikharaMarriageResult = useMemo(() => {
    return calculateMarriageIstikhara(p1Name, p1Mother, p2Name, p2Mother);
  }, [p1Name, p1Mother, p2Name, p2Mother]);

  const businessResult: IstikharaBusinessResult = useMemo(() => {
    return calculateBusinessIstikhara(bizPersonName, bizMotherName, bizName);
  }, [bizPersonName, bizMotherName, bizName]);

  const travelResult: IstikharaGeneralResult = useMemo(() => {
    return calculateGeneralIstikhara(genPersonName, genMotherName, genTopic, 'safar');
  }, [genPersonName, genMotherName, genTopic]);

  const generalResult: IstikharaGeneralResult = useMemo(() => {
    return calculateGeneralIstikhara(genPersonName, genMotherName, genTopic, 'aam');
  }, [genPersonName, genMotherName, genTopic]);

  // Sample Presets for Quick Testing
  const marriagePresets = [
    { p1: 'محمد', m1: 'آمنہ', p2: 'فاطمہ', m2: 'خدیجہ', label: 'رشتہ الفت و خیر' },
    { p1: 'علی', m1: 'فاطمہ', p2: 'زینب', m2: 'مریم', label: 'رشتہ باوقار و ہم آہنگ' },
    { p1: 'عمران', m1: 'شبانہ', p2: 'عائشہ', m2: 'پروین', label: 'رشتہ برائے تفتیش' },
    { p1: 'حمزہ', m1: 'سائرہ', p2: 'نور', m2: 'ثمین', label: 'رشتہ باہمی توازن' },
  ];

  const businessPresets = [
    { name: 'احمد', mother: 'مریم', biz: 'تجارتِ کتب و تعلیم', label: 'ایجوکیشن و کتب' },
    { name: 'طارق', mother: 'کلثوم', biz: 'خرید و فروختِ املاک و جائیداد', label: 'پراپرٹی و تعمیرات' },
    { name: 'سلمان', mother: 'ناہید', biz: 'سافٹ ویئر و ٹیکنالوجی', label: 'آئی ٹی و آن لائن' },
    { name: 'وقار', mother: 'عصمت', biz: 'ریسٹورنٹ و اشیاء خوردونوش', label: 'فوڈ و ہوٹلنگ' },
  ];

  const copyReport = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border-2 border-[#d4a373] bg-[#f2e8cf] p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#bc6c25] text-white shadow-sm">
                <Compass className="h-6 w-6" />
              </span>
              <h2 className="font-amiri text-2xl sm:text-3xl font-bold text-[#5d4037]">
                استخارۂ جفری و ابجدی (شادی، کاروبار، سفر و جملہ مقاصد)
              </h2>
            </div>
            <p className="mt-1 text-sm text-[#8d6e63] max-w-3xl font-medium">
              ماخوذ از قوانینِ کاش البرنی (<span className="font-bold text-[#bc6c25]">رموز الجفر، قوانین طلسم و التوافق العددی</span>)۔ علم الحروف، بروج، عناصر اربعہ اور قواعدِ غالب و مغلوب کی روشنی میں شادی و رشتے، تجارت و شراکت، سفر اور ہر اہم مہم کا ریاضیاتی و روحانی استخارہ۔
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-xl border border-[#d4a373] bg-[#fdfaf1] px-4 py-2 text-center shadow-xs">
              <span className="text-xs text-[#8d6e63] block font-medium">قاعدۂ استخارہ</span>
              <span className="font-amiri text-base font-bold text-[#bc6c25]">علم الحروف و البروج</span>
            </div>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[#d4a373]">
          {[
            { id: 'shadi', label: 'استخارہ برائے شادی و رشتہ', icon: Heart, desc: 'توافقِ زوجین و الفت' },
            { id: 'karobar', label: 'استخارہ برائے کاروبار و تجارت', icon: Briefcase, desc: 'نفع و وسعتِ رزق' },
            { id: 'safar', label: 'استخارہ برائے سفر و رہائش', icon: Plane, desc: 'سلامتی و مقاصد' },
            { id: 'aam', label: 'استخارۂ عامہ برائے ہر مہم', icon: HelpCircle, desc: 'خیر و کشفِ ضمیر' },
            { id: 'dream', label: 'تعبیر الرؤیا و اشاراتِ خواب', icon: Moon, desc: 'علامات بعد از استخارہ و عمل' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeMode === tab.id;
            return (
              <button
                key={tab.id}
                id={`btn-istikhara-${tab.id}`}
                onClick={() => setActiveMode(tab.id as IstikharaMode)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#bc6c25] text-white shadow-md border border-[#9c581e]'
                    : 'bg-[#fdfaf1] text-[#5d4037] border border-[#d4a373] hover:bg-[#faedcd]'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-[#bc6c25]'}`} />
                <div className="text-right">
                  <div className="font-amiri">{tab.label}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: MARRIAGE & RISHTA COMPATIBILITY (استخارہ شادی و رشتہ) */}
      {/* ========================================================================= */}
      {activeMode === 'shadi' && (
        <div className="space-y-6">
          {/* Dual Party Input Box */}
          <div className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-6 shadow-sm">
            <h3 className="font-amiri text-lg font-bold text-[#5d4037] mb-4 flex items-center justify-between pb-3 border-b border-[#e7d8c9]">
              <span className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span>کوائفِ فریقین (طالب مع والدہ و مطلوبہ مع والدہ)</span>
              </span>
              <span className="text-xs text-[#8d6e63] font-sans font-medium">
                قاعدہ: جمل کبیر + بروج + عناصر اربعہ + قاعدہ ۹ (غالب و مغلوب)
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Person 1 (لڑکا / طالب) */}
              <div className="p-4 rounded-xl border border-[#d4a373] bg-[#fdfaf1] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-amiri text-base font-bold text-[#bc6c25]">
                    فریقِ اول (لڑکا / طالب)
                  </span>
                  <span className="text-xs text-[#8d6e63] font-sans">
                    مجموعی عدد: <strong className="text-[#5d4037]">{marriageResult.person1.totalAbjad}</strong>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#5d4037] font-bold mb-1">نامِ طالب:</label>
                    <input
                      type="text"
                      id="input-shadi-p1-name"
                      value={p1Name}
                      onChange={(e) => setP1Name(e.target.value)}
                      placeholder="مثلاً: محمد"
                      className="w-full rounded-lg border border-[#d4a373] bg-white px-3 py-2 text-base font-amiri text-[#2c1e14] focus:border-[#bc6c25] focus:outline-none shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5d4037] font-bold mb-1">نامِ والدۂ طالب:</label>
                    <input
                      type="text"
                      id="input-shadi-p1-mother"
                      value={p1Mother}
                      onChange={(e) => setP1Mother(e.target.value)}
                      placeholder="مثلاً: آمنہ"
                      className="w-full rounded-lg border border-[#d4a373] bg-white px-3 py-2 text-base font-amiri text-[#2c1e14] focus:border-[#bc6c25] focus:outline-none shadow-inner"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#e7d8c9] text-xs text-[#5d4037]">
                  <span>طالع: <strong>{marriageResult.person1.zodiacSign}</strong></span>
                  <span>عنصر: <strong>{marriageResult.person1.dominantElementUrdu}</strong></span>
                  <span>حاکم: <strong>{marriageResult.person1.zodiacPlanet}</strong></span>
                </div>
              </div>

              {/* Person 2 (لڑکی / مطلوبہ) */}
              <div className="p-4 rounded-xl border border-[#d4a373] bg-[#fdfaf1] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-amiri text-base font-bold text-[#bc6c25]">
                    فریقِ ثانی (لڑکی / مطلوبہ)
                  </span>
                  <span className="text-xs text-[#8d6e63] font-sans">
                    مجموعی عدد: <strong className="text-[#5d4037]">{marriageResult.person2.totalAbjad}</strong>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#5d4037] font-bold mb-1">نامِ مطلوبہ:</label>
                    <input
                      type="text"
                      id="input-shadi-p2-name"
                      value={p2Name}
                      onChange={(e) => setP2Name(e.target.value)}
                      placeholder="مثلاً: فاطمہ"
                      className="w-full rounded-lg border border-[#d4a373] bg-white px-3 py-2 text-base font-amiri text-[#2c1e14] focus:border-[#bc6c25] focus:outline-none shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5d4037] font-bold mb-1">نامِ والدۂ مطلوبہ:</label>
                    <input
                      type="text"
                      id="input-shadi-p2-mother"
                      value={p2Mother}
                      onChange={(e) => setP2Mother(e.target.value)}
                      placeholder="مثلاً: خدیجہ"
                      className="w-full rounded-lg border border-[#d4a373] bg-white px-3 py-2 text-base font-amiri text-[#2c1e14] focus:border-[#bc6c25] focus:outline-none shadow-inner"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#e7d8c9] text-xs text-[#5d4037]">
                  <span>طالع: <strong>{marriageResult.person2.zodiacSign}</strong></span>
                  <span>عنصر: <strong>{marriageResult.person2.dominantElementUrdu}</strong></span>
                  <span>حاکم: <strong>{marriageResult.person2.zodiacPlanet}</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#8d6e63] font-bold">نمونہ جوڑے برائے جانچ:</span>
              {marriagePresets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setP1Name(p.p1);
                    setP1Mother(p.m1);
                    setP2Name(p.p2);
                    setP2Mother(p.m2);
                  }}
                  className="rounded-full border border-[#d4a373] bg-[#f9f4e8] px-3 py-1 text-xs text-[#5d4037] font-medium hover:bg-[#bc6c25] hover:text-white transition-colors cursor-pointer"
                >
                  {p.p1} + {p.p2} ({p.label})
                </button>
              ))}
            </div>
          </div>

          {/* Compatibility Score & Final Verdict Card */}
          <div className={`rounded-2xl border-2 p-6 shadow-md transition-all ${
            marriageResult.verdict === 'saad_mubarak'
              ? 'border-[#283618] bg-[#dce4c9]'
              : marriageResult.verdict === 'muwafiq_ba_sadqa'
              ? 'border-[#d4a373] bg-[#faedcd]'
              : 'border-[#bc6c25] bg-[#f2e8cf]'
          }`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#5d4037] uppercase tracking-wider block mb-1">
                  حتمی فیصلہ و نتیجۂ استخارہ برائے نکاح
                </span>
                <h3 className="font-amiri text-2xl sm:text-3xl font-bold text-[#2c1e14] flex items-center gap-2">
                  <Star className="h-6 w-6 text-[#bc6c25] fill-[#bc6c25]" />
                  <span>{marriageResult.verdictUrdu}</span>
                </h3>
                <p className="mt-2 text-sm text-[#5d4037] font-medium leading-relaxed max-w-2xl">
                  {marriageResult.elementalRelation}
                </p>
              </div>

              {/* Score Meter */}
              <div className="text-center p-4 bg-white/80 rounded-2xl border border-[#d4a373] shadow-sm min-w-36">
                <span className="text-xs text-[#8d6e63] font-bold block">موافقت کا تناسب</span>
                <div className="font-amiri text-4xl font-bold text-[#bc6c25] mt-1">
                  {marriageResult.verdictScore}%
                </div>
                <span className="text-[11px] text-[#5d4037] font-sans block mt-0.5">
                  {marriageResult.verdictScore >= 80 ? 'نہایت موافق' : marriageResult.verdictScore >= 65 ? 'اچھی موافقت' : 'محتاجِ تدبیر'}
                </span>
              </div>
            </div>
          </div>

          {/* Deep Mathematical & Spiritual Analysis Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1: Elements Harmony (عناصر اربعہ التوافق) */}
            <div className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#5d4037] border-b border-[#e7d8c9] pb-2">
                <Flame className="h-4 w-4 text-[#bc6c25]" />
                <span>عناصر کا باہمی ربط (قاعدہ ۴)</span>
              </div>
              <p className="text-xs text-[#8d6e63] leading-relaxed">
                میزانِ اعداد ({marriageResult.combinedTotal}) تقسیم بر ۴ کا باقی: <strong className="text-[#5d4037]">{marriageResult.remainder4}</strong>
              </p>
              <div className="p-3 bg-[#fdfaf1] rounded-xl border border-[#e7d8c9] text-xs text-[#2c1e14] font-medium leading-relaxed">
                {marriageResult.remainder4 === 1 && 'باقی ۱ (آتشی): رشتہ میں کشش و جوش غالب رہے گا، آغاز میں باہمی تحمل لازم ہے۔'}
                {marriageResult.remainder4 === 2 && 'باقی ۲ (بادی): خوش طبع، باہمی گفتار و مسرت سے بھرپور خوشحال رشتہ۔'}
                {marriageResult.remainder4 === 3 && 'باقی ۳ (آبی): دلی سکون، لازوال الفت و محبت اور قلبی تسکین۔'}
                {marriageResult.remainder4 === 4 && 'باقی ۴ (خاکی): پائیدار تعلق، ٹھوس گھریلو بنیاد، صبر و اولاد میں برکت۔'}
              </div>
            </div>

            {/* Box 2: Dominance & Influence (حسابِ غلبہ قاعدہ ۹) */}
            <div className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#5d4037] border-b border-[#e7d8c9] pb-2">
                <Scale className="h-4 w-4 text-[#bc6c25]" />
                <span>حسابِ غلبہ و توازن (قاعدہ ۹)</span>
              </div>
              <div className="text-xs text-[#8d6e63] flex justify-between">
                <span>باقی {marriageResult.person1.name}: <strong>{marriageResult.person1.totalAbjad % 9 || 9}</strong></span>
                <span>باقی {marriageResult.person2.name}: <strong>{marriageResult.person2.totalAbjad % 9 || 9}</strong></span>
              </div>
              <div className="p-3 bg-[#fdfaf1] rounded-xl border border-[#e7d8c9] text-xs text-[#2c1e14] font-medium leading-relaxed">
                {marriageResult.ghalibMaghloob.description}
              </div>
            </div>

            {/* Box 3: Auspicious Timings & Days (سعد ایام و ساعات) */}
            <div className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#5d4037] border-b border-[#e7d8c9] pb-2">
                <Calendar className="h-4 w-4 text-[#bc6c25]" />
                <span>سازگار ایام برائے نسبت و عقد</span>
              </div>
              <div className="space-y-1.5">
                {marriageResult.auspiciousDays.map((day, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#5d4037] font-medium">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{day}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-[#e7d8c9] text-[11px] text-[#8d6e63]">
                برجِ میزان: <strong>{marriageResult.zodiacRelation}</strong>
              </div>
            </div>
          </div>

          {/* Spiritual Remedies, Sadqa & Zikr for Marriage */}
          <div className="rounded-2xl border-2 border-[#d4a373] bg-[#fdfaf1] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#d4a373] pb-3">
              <h4 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#bc6c25]" />
                <span>تدابیر، صدقات و دعائے خیر برائے الفتِ دائمی</span>
              </h4>
              <button
                onClick={() => copyReport(`استخارہ رشتہ: ${p1Name} مع ${p2Name}\nنتیجہ: ${marriageResult.verdictUrdu}\nموافقت: ${marriageResult.verdictScore}%\nورد: ${marriageResult.recommendedZikr}\nصدقہ: ${marriageResult.recommendedSadqa}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d4a373] bg-[#faedcd] text-xs font-bold text-[#5d4037] hover:bg-[#f2e8cf] cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-[#bc6c25]" />}
                <span>{copied ? 'نقل ہو گیا' : 'مکمل رپورٹ نقل کریں'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-[#e7d8c9] bg-white">
                <span className="text-xs font-bold text-[#bc6c25] block mb-1">تجویز کردہ وظیفہ و وردِ مسنون:</span>
                <p className="font-amiri text-base font-bold text-[#5d4037] leading-relaxed">
                  {marriageResult.recommendedZikr}
                </p>
                <span className="text-[11px] text-[#8d6e63] block mt-1">
                  طریقہ: دونوں فریقین یا ان کے والدین اول و آخر درود شریف کے ساتھ بعد نمازِ عشاء ورد کریں۔
                </span>
              </div>

              <div className="p-4 rounded-xl border border-[#e7d8c9] bg-white">
                <span className="text-xs font-bold text-[#bc6c25] block mb-1">تجویز کردہ صدقہ برائے دفعِ موانع:</span>
                <p className="font-amiri text-sm font-bold text-[#5d4037] leading-relaxed">
                  {marriageResult.recommendedSadqa}
                </p>
                <span className="text-[11px] text-[#8d6e63] block mt-1">
                  کاش البرنی: صدقہ ہر قسم کی نحوسات اور شیاطین کی بدنگاہی کا قاطع ہے۔
                </span>
              </div>
            </div>

            {/* Kash Al-Barny Rule Quote */}
            <div className="p-3 bg-[#f2e8cf] rounded-xl border border-[#d4a373] text-xs text-[#5d4037] leading-relaxed">
              <span className="font-bold text-[#bc6c25] block mb-0.5">قاعدۂ کاش البرنی:</span>
              {marriageResult.kashAlBarnyRule}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: BUSINESS & TRADE ISTIKHARA (استخارہ کاروبار و تجارت) */}
      {/* ========================================================================= */}
      {activeMode === 'karobar' && (
        <div className="space-y-6">
          {/* Business Input Box */}
          <div className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-6 shadow-sm">
            <h3 className="font-amiri text-lg font-bold text-[#5d4037] mb-4 flex items-center justify-between pb-3 border-b border-[#e7d8c9]">
              <span className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#bc6c25]" />
                <span>کوائفِ سائل و تجارت / شراکت دار</span>
              </span>
              <span className="text-xs text-[#8d6e63] font-sans font-medium">
                قاعدہ: حسابِ نفع و نقصان + حاکم سیارۂ رزق + سازگار شعبہ جات
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-[#5d4037] font-bold mb-1">نامِ سائل / تاجر:</label>
                <input
                  type="text"
                  id="input-biz-person-name"
                  value={bizPersonName}
                  onChange={(e) => setBizPersonName(e.target.value)}
                  placeholder="مثلاً: احمد"
                  className="w-full rounded-lg border border-[#d4a373] bg-white px-3 py-2 text-base font-amiri text-[#2c1e14] focus:border-[#bc6c25] focus:outline-none shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs text-[#5d4037] font-bold mb-1">نامِ والدۂ سائل:</label>
                <input
                  type="text"
                  id="input-biz-mother-name"
                  value={bizMotherName}
                  onChange={(e) => setBizMotherName(e.target.value)}
                  placeholder="مثلاً: مریم"
                  className="w-full rounded-lg border border-[#d4a373] bg-white px-3 py-2 text-base font-amiri text-[#2c1e14] focus:border-[#bc6c25] focus:outline-none shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs text-[#5d4037] font-bold mb-1">نامِ کاروبار / جنسِ تجارت:</label>
                <input
                  type="text"
                  id="input-biz-name"
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  placeholder="مثلاً: تجارتِ ملبوسات"
                  className="w-full rounded-lg border border-[#d4a373] bg-white px-3 py-2 text-base font-amiri text-[#2c1e14] focus:border-[#bc6c25] focus:outline-none shadow-inner"
                />
              </div>
            </div>

            {/* Quick Business Presets */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#8d6e63] font-bold">نمونہ کاروبار برائے جانچ:</span>
              {businessPresets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setBizPersonName(p.name);
                    setBizMotherName(p.mother);
                    setBizName(p.biz);
                  }}
                  className="rounded-full border border-[#d4a373] bg-[#f9f4e8] px-3 py-1 text-xs text-[#5d4037] font-medium hover:bg-[#bc6c25] hover:text-white transition-colors cursor-pointer"
                >
                  {p.biz} ({p.label})
                </button>
              ))}
            </div>
          </div>

          {/* Business Verdict Banner */}
          <div className={`rounded-2xl border-2 p-6 shadow-md transition-all ${
            businessResult.verdict === 'saad_mubarak'
              ? 'border-[#283618] bg-[#dce4c9]'
              : businessResult.verdict === 'muwafiq_ba_sadqa'
              ? 'border-[#d4a373] bg-[#faedcd]'
              : 'border-[#bc6c25] bg-[#f2e8cf]'
          }`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#5d4037] uppercase tracking-wider block mb-1">
                  حتمی فیصلہ و نتیجۂ استخارہ برائے کاروبار
                </span>
                <h3 className="font-amiri text-2xl sm:text-3xl font-bold text-[#2c1e14] flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-[#bc6c25]" />
                  <span>{businessResult.verdictUrdu}</span>
                </h3>
                <p className="mt-2 text-sm text-[#5d4037] font-medium leading-relaxed max-w-2xl">
                  {businessResult.profitPotentialUrdu}
                </p>
              </div>

              <div className="text-center p-4 bg-white/80 rounded-2xl border border-[#d4a373] shadow-sm min-w-36">
                <span className="text-xs text-[#8d6e63] font-bold block">امکانِ نفع و کامیابی</span>
                <div className="font-amiri text-4xl font-bold text-[#bc6c25] mt-1">
                  {businessResult.verdictScore}%
                </div>
                <span className="text-[11px] text-[#5d4037] font-sans block mt-0.5">
                  حاکم: {businessResult.dominantPlanetUrdu}
                </span>
              </div>
            </div>
          </div>

          {/* Business Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1: Planetary Influence */}
            <div className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#5d4037] border-b border-[#e7d8c9] pb-2">
                <Star className="h-4 w-4 text-[#bc6c25]" />
                <span>حاکم سیارۂ رزق و تجارت</span>
              </div>
              <div className="font-amiri text-lg font-bold text-[#bc6c25]">
                {businessResult.dominantPlanetUrdu} ({businessResult.planetNatureUrdu})
              </div>
              <p className="text-xs text-[#8d6e63] leading-relaxed">
                میزانِ اعداد ({businessResult.combinedTotal}) تقسیم بر ۷ کا باقی: <strong className="text-[#5d4037]">{businessResult.remainder7}</strong>
              </p>
            </div>

            {/* Box 2: Best Opening Timings */}
            <div className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#5d4037] border-b border-[#e7d8c9] pb-2">
                <Clock className="h-4 w-4 text-[#bc6c25]" />
                <span>بہترین دن و ساعتِ افتتاح / معاہدہ</span>
              </div>
              <div className="font-amiri text-base font-bold text-[#283618]">
                {businessResult.bestOpeningDay}
              </div>
              <p className="text-xs text-[#8d6e63] leading-relaxed">
                اس ساعت میں دکان کا افتتاح یا تجارتی معاہدہ دستخط کرنے سے کاروبار میں برکت اور ثبات رہتا ہے۔
              </p>
            </div>

            {/* Box 3: Sector & Category */}
            <div className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#5d4037] border-b border-[#e7d8c9] pb-2">
                <Layers className="h-4 w-4 text-[#bc6c25]" />
                <span>سازگار نوعیتِ تجارت</span>
              </div>
              <div className="text-xs text-[#2c1e14] font-medium leading-relaxed">
                {businessResult.remainder4 === 1 && 'آتشی تجارت: کھانے پینے، دھات، ٹیکنالوجی و انرجی۔'}
                {businessResult.remainder4 === 2 && 'بادی تجارت: ای کامرس، میڈیا، ٹرانسپورٹ و مواصلات۔'}
                {businessResult.remainder4 === 3 && 'آبی تجارت: مائعات، فارمیسی، درآمدات و پبلک سروسز۔'}
                {businessResult.remainder4 === 4 && 'خاکی تجارت: جائیداد، زراعت، میٹریل و طویل مدتی اثاثے۔'}
              </div>
            </div>
          </div>

          {/* Business Sadqa & Zikr Panel */}
          <div className="rounded-2xl border-2 border-[#d4a373] bg-[#fdfaf1] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#d4a373] pb-3">
              <h4 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#bc6c25]" />
                <span>وظائفِ وسعتِ رزق و صدقات برائے برکتِ مال</span>
              </h4>
              <button
                onClick={() => copyReport(`استخارہ کاروبار: ${bizName} برائے ${bizPersonName}\nنتیجہ: ${businessResult.verdictUrdu}\nامکان نفع: ${businessResult.verdictScore}%\nبہترین وقت: ${businessResult.bestOpeningDay}\nوظیفہ: ${businessResult.recommendedZikr}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d4a373] bg-[#faedcd] text-xs font-bold text-[#5d4037] hover:bg-[#f2e8cf] cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-[#bc6c25]" />}
                <span>{copied ? 'نقل ہو گیا' : 'رپورٹ نقل کریں'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-[#e7d8c9] bg-white">
                <span className="text-xs font-bold text-[#bc6c25] block mb-1">وردِ جفری برائے کشادگیِ دکان و کاروبار:</span>
                <p className="font-amiri text-lg font-bold text-[#5d4037] leading-relaxed">
                  {businessResult.recommendedZikr}
                </p>
                <span className="text-[11px] text-[#8d6e63] block mt-1">
                  طریقہ: صبح دکان کھولنے یا کام شروع کرنے سے قبل ۱۲۹ مرتبہ پڑھ کر اپنے ہاتھ اور مال پر دم کریں۔
                </span>
              </div>

              <div className="p-4 rounded-xl border border-[#e7d8c9] bg-white">
                <span className="text-xs font-bold text-[#bc6c25] block mb-1">تجویز کردہ صدقہ برائے حفاظتِ مال:</span>
                <p className="font-amiri text-sm font-bold text-[#5d4037] leading-relaxed">
                  {businessResult.recommendedSadqa}
                </p>
                <span className="text-[11px] text-[#8d6e63] block mt-1">
                  کاش البرنی: ہر نئے کاروبار کے آغاز پر صدقہ دینے سے دیوالیہ پن اور خسارہ ٹل جاتا ہے۔
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: TRAVEL & RELOCATION ISTIKHARA (استخارہ سفر و رہائش) */}
      {/* ========================================================================= */}
      {activeMode === 'safar' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-6 shadow-sm">
            <h3 className="font-amiri text-lg font-bold text-[#5d4037] mb-4 flex items-center justify-between pb-3 border-b border-[#e7d8c9]">
              <span className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-[#bc6c25]" />
                <span>کوائفِ مسافر و منزل / سفر</span>
              </span>
              <span className="text-xs text-[#8d6e63] font-sans font-medium">
                قاعدہ: حسابِ امان و برکتِ سفر + استخراجِ آیۃِ حفاظت
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-[#5d4037] font-bold mb-1">نامِ مسافر / سائل:</label>
                <input
                  type="text"
                  id="input-safar-person-name"
                  value={genPersonName}
                  onChange={(e) => setGenPersonName(e.target.value)}
                  placeholder="مثلاً: علی"
                  className="w-full rounded-lg border border-[#d4a373] bg-white px-3 py-2 text-base font-amiri text-[#2c1e14] focus:border-[#bc6c25] focus:outline-none shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs text-[#5d4037] font-bold mb-1">نامِ والدۂ مسافر:</label>
                <input
                  type="text"
                  id="input-safar-mother-name"
                  value={genMotherName}
                  onChange={(e) => setGenMotherName(e.target.value)}
                  placeholder="مثلاً: فاطمہ"
                  className="w-full rounded-lg border border-[#d4a373] bg-white px-3 py-2 text-base font-amiri text-[#2c1e14] focus:border-[#bc6c25] focus:outline-none shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs text-[#5d4037] font-bold mb-1">منزل / ملک / مقصدِ سفر:</label>
                <input
                  type="text"
                  id="input-safar-topic"
                  value={genTopic}
                  onChange={(e) => setGenTopic(e.target.value)}
                  placeholder="مثلاً: سفر برائے لندن"
                  className="w-full rounded-lg border border-[#d4a373] bg-white px-3 py-2 text-base font-amiri text-[#2c1e14] focus:border-[#bc6c25] focus:outline-none shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Travel Verdict Banner */}
          <div className="rounded-2xl border-2 border-[#d4a373] bg-[#faedcd] p-6 shadow-md">
            <span className="text-xs font-bold text-[#5d4037] uppercase tracking-wider block mb-1">
              حکمِ استخارہ برائے سفر و نقلِ مکانی
            </span>
            <h3 className="font-amiri text-2xl sm:text-3xl font-bold text-[#2c1e14] flex items-center gap-2">
              <Plane className="h-6 w-6 text-[#bc6c25]" />
              <span>{travelResult.verdictUrdu}</span>
            </h3>
            <p className="mt-2 text-sm text-[#5d4037] font-medium leading-relaxed max-w-3xl">
              {travelResult.guidanceText}
            </p>
          </div>

          {/* Travel Protection Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[#e7d8c9] bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#5d4037] border-b border-[#e7d8c9] pb-2">
                <BookOpen className="h-4 w-4 text-[#bc6c25]" />
                <span>آیۃِ مبارکہ برائے امان و سلامتیِ سفر</span>
              </div>
              <div className="p-3 bg-[#fdfaf1] rounded-xl border border-[#d4a373] font-amiri text-base text-center text-[#5d4037] font-bold leading-relaxed shadow-inner">
                "{travelResult.recommendedAyah}"
              </div>
              <p className="text-xs text-[#8d6e63]">
                سوار ہوتے وقت تین مرتبہ تلاوت کر کے دائیں بائیں اور سینے پر دم کریں۔
              </p>
            </div>

            <div className="rounded-2xl border border-[#e7d8c9] bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#5d4037] border-b border-[#e7d8c9] pb-2">
                <Sparkles className="h-4 w-4 text-[#bc6c25]" />
                <span>اسمِ اعظم و حصارِ سفر</span>
              </div>
              <div className="p-3 bg-[#fdfaf1] rounded-xl border border-[#d4a373] font-amiri text-lg text-center text-[#bc6c25] font-bold shadow-inner">
                {travelResult.recommendedZikr}
              </div>
              <p className="text-xs text-[#8d6e63]">
                صدقہ: {travelResult.recommendedSadqa}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 4: GENERAL UNIVERSAL ISTIKHARA (استخارۂ عامہ برائے ہر مہم) */}
      {/* ========================================================================= */}
      {activeMode === 'aam' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#e7d8c9] bg-[#ffffff] p-6 shadow-sm">
            <h3 className="font-amiri text-lg font-bold text-[#5d4037] mb-4 flex items-center justify-between pb-3 border-b border-[#e7d8c9]">
              <span className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[#bc6c25]" />
                <span>کوائفِ سائل و مطلوبہ ارادہ / مہم</span>
              </span>
              <span className="text-xs text-[#8d6e63] font-sans font-medium">
                قاعدہ: خیر و شر و توقف + استخراجِ کلامِ الٰہی
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-[#5d4037] font-bold mb-1">نامِ سائل:</label>
                <input
                  type="text"
                  id="input-gen-person-name"
                  value={genPersonName}
                  onChange={(e) => setGenPersonName(e.target.value)}
                  placeholder="مثلاً: علی"
                  className="w-full rounded-lg border border-[#d4a373] bg-white px-3 py-2 text-base font-amiri text-[#2c1e14] focus:border-[#bc6c25] focus:outline-none shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs text-[#5d4037] font-bold mb-1">نامِ والدۂ سائل:</label>
                <input
                  type="text"
                  id="input-gen-mother-name"
                  value={genMotherName}
                  onChange={(e) => setGenMotherName(e.target.value)}
                  placeholder="مثلاً: فاطمہ"
                  className="w-full rounded-lg border border-[#d4a373] bg-white px-3 py-2 text-base font-amiri text-[#2c1e14] focus:border-[#bc6c25] focus:outline-none shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs text-[#5d4037] font-bold mb-1">مقصد / ارادہ / سوال:</label>
                <input
                  type="text"
                  id="input-gen-topic"
                  value={genTopic}
                  onChange={(e) => setGenTopic(e.target.value)}
                  placeholder="مثلاً: خرید مکان یا تبدیلی ملازمت"
                  className="w-full rounded-lg border border-[#d4a373] bg-white px-3 py-2 text-base font-amiri text-[#2c1e14] focus:border-[#bc6c25] focus:outline-none shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* General Verdict Banner */}
          <div className="rounded-2xl border-2 border-[#d4a373] bg-[#faedcd] p-6 shadow-md">
            <span className="text-xs font-bold text-[#5d4037] uppercase tracking-wider block mb-1">
              حکمِ استخارہ برائے مطلوبہ امر
            </span>
            <h3 className="font-amiri text-2xl sm:text-3xl font-bold text-[#2c1e14] flex items-center gap-2">
              <Star className="h-6 w-6 text-[#bc6c25]" />
              <span>{generalResult.verdictUrdu}</span>
            </h3>
            <p className="mt-2 text-sm text-[#5d4037] font-medium leading-relaxed max-w-3xl">
              {generalResult.guidanceText}
            </p>
          </div>

          {/* Masnoon Istikhara Dua & Method */}
          <div className="rounded-2xl border-2 border-[#d4a373] bg-[#fdfaf1] p-6 shadow-sm space-y-4">
            <h4 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2 border-b border-[#d4a373] pb-3">
              <BookOpen className="h-5 w-5 text-[#bc6c25]" />
              <span>دعائے استخارۂ مسنونہ مع اردو ترجمہ و طریقۂ عمل</span>
            </h4>

            {/* Arabic Dua */}
            <div className="p-4 bg-white rounded-xl border border-[#d4a373] font-amiri text-lg text-center text-[#2c1e14] leading-loose shadow-inner">
              {generalResult.masnoonIstikharaGuide.duaaArabic}
            </div>

            {/* Urdu Translation */}
            <div className="p-4 bg-[#f9f4e8] rounded-xl border border-[#e7d8c9] text-xs sm:text-sm text-[#5d4037] leading-relaxed font-medium">
              <span className="font-bold text-[#bc6c25] block mb-1">اردو مفہوم و ترجمہ:</span>
              {generalResult.masnoonIstikharaGuide.duaaUrdu}
            </div>

            {/* Method Box */}
            <div className="p-4 bg-[#f2e8cf] rounded-xl border border-[#d4a373] text-xs text-[#5d4037] leading-relaxed font-medium space-y-2">
              <div>
                <span className="font-bold text-[#bc6c25] block mb-0.5">طریقۂ خواب و علاماتِ باطنی:</span>
                {generalResult.masnoonIstikharaGuide.method} اگر خواب میں سفید یا سبز رنگ، آبِ رواں، روشنی یا خوشگوار چیزیں نظر آئیں تو یہ علامتِ خیر و قبولیت ہے۔ اگر سرخ یا سیاہ رنگ، آگ، گندگی یا خوف محسوس ہو تو یہ اشارۂ ممانعت و توقف ہے۔
              </div>
              <button
                onClick={() => setActiveMode('dream')}
                className="px-4 py-2 rounded-xl bg-[#5d4037] text-white font-amiri text-xs font-bold hover:bg-[#43281c] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Moon className="h-3.5 w-3.5 text-[#d4a373]" />
                <span>دیکھے گئے خواب کی تفصیلی تعبیر و محاسبہ کریں ↗</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 5: DREAM INTERPRETATION & POST-ISTIKHARA SIGNS (تعبیر الرؤیا) */}
      {/* ========================================================================= */}
      {activeMode === 'dream' && (
        <DreamInterpretationStudio
          onSendToMatrixSuggester={onSendToMatrixSuggester}
          onSendToTakseer={onSendToTakseer}
        />
      )}
    </div>
  );
};
