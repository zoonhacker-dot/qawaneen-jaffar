import React, { useState, useMemo } from 'react';
import { 
  HeartPulse, 
  Sparkles, 
  Flame, 
  Droplets, 
  Wind, 
  Mountain, 
  Layers, 
  BookOpen, 
  Award, 
  Copy, 
  Check, 
  Compass, 
  Activity, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Clock, 
  Printer 
} from 'lucide-react';
import { calculateAbjad } from '../utils/jafrEngine';

// 4 Spiritual & Metaphysical Components in Traditional Jafr (روح، عقل، نفس، جسد)
export const HisabiyatRoohStudio: React.FC = () => {
  const [personName, setPersonName] = useState<string>('احمد');
  const [motherName, setMotherName] = useState<string>('مریم');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Metaphysical & Gematric Breakdown
  const analysis = useMemo(() => {
    const pAbjad = calculateAbjad(personName || '');
    const mAbjad = calculateAbjad(motherName || '');
    const totalKabir = pAbjad.totalKabir + mAbjad.totalKabir;
    
    // 4 Metaphysical Quad-Pillars (حسابیاتِ روح، عقل، نفس، جسد):
    // 1. روح (Rooh - Spirit): (Total * 4) % 360 or Base Formula in Kash Al-Barni
    const roohVal = (totalKabir * 7) % 1000 + 786;
    // 2. عقل (Aql - Intellect): (Total * 3)
    const aqlVal = (totalKabir * 3) % 800 + 444;
    // 3. نفس (Nafs - Desire/Ego): (Total * 2)
    const nafsVal = (totalKabir * 2) % 600 + 222;
    // 4. جسد (Jasad - Physical Body): Total Kabir
    const jasadVal = totalKabir;

    // Dominant Element (عنصرِ غالب) via Total % 4
    // 1: Fire (آتش), 2: Earth (خاک), 3: Air (باد), 0: Water (آب)
    const elemRemainder = totalKabir % 4;
    const elementalProfile = [
      { name: 'آبی (Water)', element: 'آب', color: 'text-blue-700 bg-blue-50 border-blue-300', nature: 'سرد و تر', temperament: 'حلیم، صابر، پرخلوص، صاحبِ وجدان و ہمدرد', stone: 'یاقوت، فیروزہ، درِ نجف', planet: 'قمر و زہرہ', saat: 'پیر و جمعہ' },
      { name: 'آتشی (Fire)', element: 'آتش', color: 'text-red-700 bg-red-50 border-red-300', nature: 'گرم و خشک', temperament: 'پرجوش، شجاع، غیور، صاحبِ ارادہ و قائدانہ صلاحیت', stone: 'عقیق سرخ، لعل، پکھراج', planet: 'شمس و مریخ', saat: 'اتوار و منگل' },
      { name: 'خاکی (Earth)', element: 'خاک', color: 'text-emerald-700 bg-emerald-50 border-emerald-300', nature: 'سرد و خشک', temperament: 'سنجیدہ، مستقل مزاج، محنتی، دور اندیش و متین', stone: 'زمرد، یشم، حجرِ مریم', planet: 'زحل و عطارد', saat: 'ہفتہ و بدھ' },
      { name: 'بادی (Air)', element: 'باد', color: 'text-amber-700 bg-amber-50 border-amber-300', nature: 'گرم و تر', temperament: 'ذہین، تیز فہم، متحرک، خوش اخلاق و فیاض', stone: 'مرجان، عقیق زرد، پخراج', planet: 'مشتری و عطارد', saat: 'جمعرات و بدھ' },
    ][elemRemainder];

    // Zodiac Sign (برج) via Total % 12
    const zodiacIndex = (totalKabir % 12) || 12;
    const zodiacs = [
      '',
      { name: 'حمل (Aries)', planet: 'مریخ', element: 'آتش', metal: 'تانبا' },
      { name: 'ثور (Taurus)', planet: 'زہرہ', element: 'خاک', metal: 'پیتل' },
      { name: 'جوزا (Gemini)', planet: 'عطارد', element: 'باد', metal: 'سیسہ' },
      { name: 'سرطان (Cancer)', planet: 'قمر', element: 'آب', metal: 'چاندی' },
      { name: 'اسد (Leo)', planet: 'شمس', element: 'آتش', metal: 'سونا' },
      { name: 'سنبلہ (Virgo)', planet: 'عطارد', element: 'خاک', metal: 'کانسی' },
      { name: 'میزان (Libra)', planet: 'زہرہ', element: 'باد', metal: 'سفید دھات' },
      { name: 'عقرب (Scorpio)', planet: 'مریخ', element: 'آب', metal: 'لوہا' },
      { name: 'قوس (Sagittarius)', planet: 'مشتری', element: 'آتش', metal: 'جست' },
      { name: 'جدی (Capricorn)', planet: 'زحل', element: 'خاک', metal: 'سیسہ سیاہ' },
      { name: 'دلو (Aquarius)', planet: 'زحل', element: 'باد', metal: 'فولاد' },
      { name: 'حوت (Pisces)', planet: 'مشتری', element: 'آب', metal: 'قلعی' },
    ];
    const userZodiac = zodiacs[zodiacIndex] || zodiacs[1];

    // Spiritual Angels & Moakkil extraction
    const muwakkilRooh = pAbjad.ulwiMuwakkil;
    const muwakkilJasad = mAbjad.sifliAwan;

    // Asma-ul-Husna corresponding with numerical weight
    const asmaMatches = [
      { name: 'يَا حَيُّ يَا قَيُّوْمُ', adad: 174, meaning: 'برائے حیاتِ قلب و قوتِ باطنی' },
      { name: 'يَا نُوْرُ يَا هَادِيْ', adad: 276, meaning: 'برائے صفائے عقل و ہدایت' },
      { name: 'يَا لَطِيْفُ يَا كَرِيْمُ', adad: 399, meaning: 'برائے تسکینِ نفس و حصولِ خیر' },
      { name: 'يَا فَتَّاحُ يَا رَزَّاقُ', adad: 797, meaning: 'برائے فتحِ ابواب و برکتِ رزق' },
    ];

    return {
      pAbjad,
      mAbjad,
      totalKabir,
      roohVal,
      aqlVal,
      nafsVal,
      jasadVal,
      elementalProfile,
      userZodiac,
      muwakkilRooh,
      muwakkilJasad,
      asmaMatches
    };
  }, [personName, motherName]);

  return (
    <div className="mx-auto max-w-4xl px-2 sm:px-4 py-4 font-urdu text-[#2c1e14] space-y-5">
      {/* Mobile & Desktop App Header */}
      <div className="rounded-2xl border-2 border-[#1e3a8a] bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#2563eb] text-white p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shadow-inner">
              ✨
            </div>
            <div>
              <h1 className="font-amiri text-2xl md:text-3xl font-bold tracking-tight">
                حسابیاتِ روح، عقل، نفس و جسد
              </h1>
              <p className="text-xs text-blue-200">
                علمِ تشریحِ باطن، عنصری توازن، بروج و کواکب اور روحانی موکلات کا مستند نظام
              </p>
            </div>
          </div>
          <span className="rounded-full bg-amber-400 text-gray-950 font-bold px-3 py-1 text-xs shadow-xs">
            سلسلۂ کتبِ کاش البرنی
          </span>
        </div>
      </div>

      {/* Input Card */}
      <div className="rounded-2xl border-2 border-blue-200 bg-white p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              اسمِ سائل / شخص:
            </label>
            <input
              type="text"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder="مثلاً: احمد، محمد، فاطمہ..."
              className="w-full rounded-xl border border-gray-300 p-2.5 text-base font-amiri text-gray-900 focus:outline-none focus:border-[#1e3a8a]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              اسمِ والدہ:
            </label>
            <input
              type="text"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              placeholder="مثلاً: مریم، حوا، آمنہ..."
              className="w-full rounded-xl border border-gray-300 p-2.5 text-base font-amiri text-gray-900 focus:outline-none focus:border-[#1e3a8a]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <span className="text-xs text-gray-500 font-bold">
            مجموعہ اعدادِ کبیر: <strong className="text-[#1e3a8a]">{analysis.totalKabir}</strong>
          </span>
          <button
            onClick={() => handleCopy(`نام: ${personName} بنت/بن ${motherName} | اعداد: ${analysis.totalKabir} | برج: ${analysis.userZodiac.name} | عنصر: ${analysis.elementalProfile.name}`, 'summary')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900 hover:bg-blue-100 cursor-pointer"
          >
            {copiedId === 'summary' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedId === 'summary' ? 'کاپی ہو گئی' : 'خلاصہ کاپی کریں'}</span>
          </button>
        </div>
      </div>

      {/* 4 Pillars Grid (روح، عقل، نفس، جسد) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* روح */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-blue-50 to-white border-2 border-blue-200 shadow-xs text-center">
          <div className="text-xs font-bold text-blue-900 mb-1">حسابِ روح (Spirit)</div>
          <div className="font-amiri text-2xl font-bold text-[#1e3a8a]">{analysis.roohVal}</div>
          <p className="text-[11px] text-gray-500 mt-1">حیاتِ باطنی و کشف</p>
        </div>

        {/* عقل */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-purple-50 to-white border-2 border-purple-200 shadow-xs text-center">
          <div className="text-xs font-bold text-purple-900 mb-1">حسابِ عقل (Intellect)</div>
          <div className="font-amiri text-2xl font-bold text-purple-800">{analysis.aqlVal}</div>
          <p className="text-[11px] text-gray-500 mt-1">حکمت، فہم و تدبیر</p>
        </div>

        {/* نفس */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-50 to-white border-2 border-amber-200 shadow-xs text-center">
          <div className="text-xs font-bold text-amber-900 mb-1">حسابِ نفس (Ego/Will)</div>
          <div className="font-amiri text-2xl font-bold text-amber-800">{analysis.nafsVal}</div>
          <p className="text-[11px] text-gray-500 mt-1">خواہشات و جذبات</p>
        </div>

        {/* جسد */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-emerald-50 to-white border-2 border-emerald-200 shadow-xs text-center">
          <div className="text-xs font-bold text-emerald-900 mb-1">حسابِ جسد (Body)</div>
          <div className="font-amiri text-2xl font-bold text-emerald-800">{analysis.jasadVal}</div>
          <p className="text-[11px] text-gray-500 mt-1">صحت، قوت و ثبات</p>
        </div>
      </div>

      {/* Elemental Profile & Zodiac Card */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h3 className="font-amiri text-xl font-bold text-[#1e3a8a] border-b pb-2 flex items-center justify-between">
          <span>عنصری مزاج، طالع، کوکب اور کواکبِ حاکمہ</span>
          <span className={`text-xs px-3 py-1 rounded-full font-bold border ${analysis.elementalProfile.color}`}>
            {analysis.elementalProfile.name}
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-center">
            <span className="text-xs text-gray-500 block">طالع و برج</span>
            <span className="font-amiri text-xl font-bold text-gray-900">{analysis.userZodiac.name}</span>
            <span className="text-[11px] text-gray-600 block mt-0.5">حاکم کوکب: {analysis.userZodiac.planet}</span>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-center">
            <span className="text-xs text-gray-500 block">موافق دھات و نگینہ</span>
            <span className="font-amiri text-lg font-bold text-gray-900">{analysis.elementalProfile.stone}</span>
            <span className="text-[11px] text-gray-600 block mt-0.5">دھات: {analysis.userZodiac.metal}</span>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-center">
            <span className="text-xs text-gray-500 block">سعد دن و اوقات</span>
            <span className="font-amiri text-lg font-bold text-emerald-800">{analysis.elementalProfile.saat}</span>
            <span className="text-[11px] text-gray-600 block mt-0.5">طبیعت: {analysis.elementalProfile.nature}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 text-xs sm:text-sm text-gray-800 leading-relaxed">
          <strong>خصوصیاتِ مزاج: </strong> {analysis.elementalProfile.temperament}
        </div>
      </div>

      {/* Moakkil & Recommended Wazaif */}
      <div className="rounded-2xl border-2 border-emerald-200 bg-white p-5 shadow-sm space-y-4">
        <h3 className="font-amiri text-xl font-bold text-emerald-900 border-b pb-2">
          موکلاتِ اسم اور موافق اسمائے حسنیٰ
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs font-bold text-emerald-800 block">موکلِ علوی (روحانی معاون)</span>
            <span className="font-amiri text-xl font-bold text-emerald-950">{analysis.muwakkilRooh}</span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs font-bold text-emerald-800 block">موکلِ سفلی (زمینی معاون)</span>
            <span className="font-amiri text-xl font-bold text-emerald-950">{analysis.muwakkilJasad}</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-gray-700 block">اسمائے حسنیٰ برائے روزانہ ورد:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {analysis.asmaMatches.map((asma, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between">
                <div>
                  <div className="font-amiri text-lg font-bold text-[#1e3a8a]">{asma.name}</div>
                  <div className="text-[11px] text-gray-600">{asma.meaning}</div>
                </div>
                <span className="font-mono text-xs font-bold bg-white px-2.5 py-1 rounded-lg border border-gray-300">
                  {asma.adad} بار
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
