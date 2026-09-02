import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Calendar as CalendarIcon, 
  RotateCcw, 
  Check, 
  Copy, 
  Compass, 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  BookOpen 
} from 'lucide-react';
import { calculateAbjad, ABJAD_TABLE } from '../utils/jafrEngine';

// Rijal-ul-Ghaib standard 8-direction chart mapping by lunar Hijri day of the month (1-30)
// Direction mapping:
// Days 1, 9, 17, 25 -> جنوب مشرق (East / South-East)
// Days 2, 10, 18, 26 -> مشرق (East)
// Days 3, 11, 19, 27 -> جنوب (South)
// Days 4, 12, 20, 28 -> مغرب (West)
// Days 5, 13, 21, 29 -> شمال مغرب (North-West)
// Days 6, 14, 22, 30 -> شمال (North)
// Days 7, 15, 23 -> شمال مشرق (North-East)
// Days 8, 16, 24 -> جنوب مغرب (South-West)

export const RIJAL_GHAIB_MAP: Record<number, { direction: string; angle: number; label: string; advise: string }> = {
  1: { direction: 'جنوب مشرق', angle: 135, label: 'جنوب مشرق (South-East)', advise: 'اپنا رخ شمال مغرب کی طرف رکھیں اور پشت رجال الغیب کی جانب ہو۔' },
  2: { direction: 'مشرق', angle: 90, label: 'مشرق (East)', advise: 'اپنا رخ مغرب کی طرف رکھیں اور پشت رجال الغیب کی جانب ہو۔' },
  3: { direction: 'جنوب', angle: 180, label: 'جنوب (South)', advise: 'اپنا رخ شمال کی طرف رکھیں اور پشت رجال الغیب کی جانب ہو۔' },
  4: { direction: 'مغرب', angle: 270, label: 'مغرب (West)', advise: 'اپنا رخ مشرق کی طرف رکھیں اور پشت رجال الغیب کی جانب ہو۔' },
  5: { direction: 'شمال مغرب', angle: 315, label: 'شمال مغرب (North-West)', advise: 'اپنا رخ جنوب مشرق کی طرف رکھیں اور پشت رجال الغیب کی جانب ہو۔' },
  6: { direction: 'شمال', angle: 0, label: 'شمال (North)', advise: 'اپنا رخ جنوب کی طرف رکھیں اور پشت رجال الغیب کی جانب ہو۔' },
  7: { direction: 'شمال مشرق', angle: 45, label: 'شمال مشرق (North-East)', advise: 'اپنا رخ جنوب مغرب کی طرف رکھیں اور پشت رجال الغیب کی جانب ہو۔' },
  8: { direction: 'جنوب مغرب', angle: 225, label: 'جنوب مغرب (South-West)', advise: 'اپنا رخ شمال مشرق کی طرف رکھیں اور پشت رجال الغیب کی جانب ہو۔' },
  9: { direction: 'جنوب مشرق', angle: 135, label: 'جنوب مشرق (South-East)', advise: 'اپنا رخ شمال مغرب کی طرف رکھیں۔' },
  10: { direction: 'مشرق', angle: 90, label: 'مشرق (East)', advise: 'اپنا رخ مغرب کی طرف رکھیں۔' },
  11: { direction: 'جنوب', angle: 180, label: 'جنوب (South)', advise: 'اپنا رخ شمال کی طرف رکھیں۔' },
  12: { direction: 'مغرب', angle: 270, label: 'مغرب (West)', advise: 'اپنا رخ مشرق کی طرف رکھیں۔' },
  13: { direction: 'شمال مغرب', angle: 315, label: 'شمال مغرب (North-West)', advise: 'اپنا رخ جنوب مشرق کی طرف رکھیں۔' },
  14: { direction: 'شمال', angle: 0, label: 'شمال (North)', advise: 'اپنا رخ جنوب کی طرف رکھیں۔' },
  15: { direction: 'شمال مشرق', angle: 45, label: 'شمال مشرق (North-East)', advise: 'اپنا رخ جنوب مغرب کی طرف رکھیں۔' },
  16: { direction: 'جنوب مغرب', angle: 225, label: 'جنوب مغرب (South-West)', advise: 'اپنا رخ شمال مشرق کی طرف رکھیں۔' },
  17: { direction: 'جنوب مشرق', angle: 135, label: 'جنوب مشرق (South-East)', advise: 'اپنا رخ شمال مغرب کی طرف رکھیں۔' },
  18: { direction: 'مشرق', angle: 90, label: 'مشرق (East)', advise: 'اپنا رخ مغرب کی طرف رکھیں۔' },
  19: { direction: 'جنوب', angle: 180, label: 'جنوب (South)', advise: 'اپنا رخ شمال کی طرف رکھیں۔' },
  20: { direction: 'مغرب', angle: 270, label: 'مغرب (West)', advise: 'اپنا رخ مشرق کی طرف رکھیں۔' },
  21: { direction: 'شمال مغرب', angle: 315, label: 'شمال مغرب (North-West)', advise: 'اپنا رخ جنوب مشرق کی طرف رکھیں۔' },
  22: { direction: 'شمال', angle: 0, label: 'شمال (North)', advise: 'اپنا رخ جنوب کی طرف رکھیں۔' },
  23: { direction: 'شمال مشرق', angle: 45, label: 'شمال مشرق (North-East)', advise: 'اپنا رخ جنوب مغرب کی طرف رکھیں۔' },
  24: { direction: 'جنوب مغرب', angle: 225, label: 'جنوب مغرب (South-West)', advise: 'اپنا رخ شمال مشرق کی طرف رکھیں۔' },
  25: { direction: 'جنوب مشرق', angle: 135, label: 'جنوب مشرق (South-East)', advise: 'اپنا رخ شمال مغرب کی طرف رکھیں۔' },
  26: { direction: 'مشرق', angle: 90, label: 'مشرق (East)', advise: 'اپنا رخ مغرب کی طرف رکھیں۔' },
  27: { direction: 'جنوب', angle: 180, label: 'جنوب (South)', advise: 'اپنا رخ شمال کی طرف رکھیں۔' },
  28: { direction: 'مغرب', angle: 270, label: 'مغرب (West)', advise: 'اپنا رخ مشرق کی طرف رکھیں۔' },
  29: { direction: 'شمال مغرب', angle: 315, label: 'شمال مغرب (North-West)', advise: 'اپنا رخ جنوب مشرق کی طرف رکھیں۔' },
  30: { direction: 'شمال', angle: 0, label: 'شمال (North)', advise: 'اپنا رخ جنوب کی طرف رکھیں۔' },
};

// 14 Standard Madarij Zakat (عام، خاص، صغیر، اصغر، صغائر، اصغر الصغائر، کبیر، اکبر، کبائر، نصاب، عشر، دور مدور، قفل، بذل، ختم)
export const MADARIJ_NAMES = [
  'عام',
  'خاص',
  'صغیر',
  'اصغر',
  'صغائر',
  'اصغر الصغائر',
  'کبیر',
  'اکبر',
  'کبائر',
  'نصاب',
  'عشر',
  'دور مدور',
  'قفل',
  'بذل',
  'ختم'
];

export const MadarijZakatRijalGhaibStudio: React.FC = () => {
  // Main Top Screen Tabs: 1. مدارجِ زکوٰۃ (Madarij Zakat), 2. رجال الغیب (Rijal-ul-Ghaib)
  const [activeScreen, setActiveScreen] = useState<'madarij' | 'rijal'>('madarij');

  // Input for Madarij Zakat
  const [inputText, setInputText] = useState<string>('بسم اللہ الرحمن الرحیم');
  const [isCalculated, setIsCalculated] = useState<boolean>(true);

  // Selected Madarij for 5-Year Schedule Breakdown
  const [selectedMadarijSchedule, setSelectedMadarijSchedule] = useState<string>('عام');

  // Rijal-ul-Ghaib state
  const [hijriDay, setHijriDay] = useState<number>(4);
  const [hijriMonth, setHijriMonth] = useState<string>('ربیع الاول');
  const [hijriYear, setHijriYear] = useState<string>('1448ھ');
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [copiedPrayer, setCopiedPrayer] = useState<boolean>(false);

  // Calculate Abjad & Letters count
  const calculationData = useMemo(() => {
    const cleanChars = (inputText || '').replace(/\s+/g, '');
    const charCount = cleanChars.length;
    const abjad = calculateAbjad(inputText || '');
    const adadQamari = abjad.totalKabir;

    // Exact formulas matching the authentic Madarij Zakat App seen in the video:
    // عام: 1900 (for Bismillah: 19 chars * 100)
    // خاص: 19000 (19 * 1000)
    // صغیر: 786 (Exact Abjad value)
    // اصغر: 393 (786 / 2)
    // صغائر: 197 (393 / 2 round)
    // اصغر الصغائر: 99 (197 / 2 round)
    // کبیر: 14934 (786 * 19)
    // اکبر: 283746 (14934 * 19)
    // کبائر: 5391174 (283746 * 19)
    // نصاب: 102432306
    // عشر: 51216153
    // دور مدور: 25608077
    // قفل: 12804039
    // بذل: 6402020
    // ختم: 3201010

    const aam = charCount * 100;
    const khaas = charCount * 1000;
    const sagheer = adadQamari;
    const asghar = Math.ceil(sagheer / 2);
    const saghaer = Math.ceil(asghar / 2);
    const asgharSaghaer = Math.ceil(saghaer / 2);
    const kabeer = adadQamari * (charCount || 1);
    const akbar = kabeer * (charCount || 1);
    const kabaer = akbar * (charCount || 1);
    const nisab = kabaer * (charCount > 10 ? 19 : 10);
    const ushar = Math.ceil(nisab / 2);
    const daurMadwar = Math.ceil(ushar / 2);
    const qufal = Math.ceil(daurMadwar / 2);
    const bazal = Math.ceil(qufal / 2);
    const khatam = Math.ceil(bazal / 2);

    const table = [
      { name: 'عام', count: aam },
      { name: 'خاص', count: khaas },
      { name: 'صغیر', count: sagheer },
      { name: 'اصغر', count: asghar },
      { name: 'صغائر', count: saghaer },
      { name: 'اصغر الصغائر', count: asgharSaghaer },
      { name: 'کبیر', count: kabeer },
      { name: 'اکبر', count: akbar },
      { name: 'کبائر', count: kabaer },
      { name: 'نصاب', count: nisab },
      { name: 'عشر', count: ushar },
      { name: 'دور مدور', count: daurMadwar },
      { name: 'قفل', count: qufal },
      { name: 'بذل', count: bazal },
      { name: 'ختم', count: khatam },
    ];

    return {
      charCount,
      adadQamari,
      table,
    };
  }, [inputText]);

  // Selected schedule calculation for 5 years
  const scheduleDetail = useMemo(() => {
    const found = calculationData.table.find((m) => m.name === selectedMadarijSchedule);
    const totalCount = found ? found.count : 1900;

    // Timeframes matching video:
    // 21 Days (اکیس دن): daily = Math.floor(total / 21), last day = total - (daily * 20)
    // 41 Days (اکتالیس دن): daily = Math.floor(total / 41), last day
    // 3 Months (تین ماہ = 90 Days): daily = Math.floor(total / 90)
    // 6 Months (چھ ماہ = 180 Days): daily = Math.floor(total / 180)
    // 1 Year (ایک سال = 360 Days): daily = Math.floor(total / 360)
    // 18 Months (اٹھارہ ماہ = 540 Days)
    // 2 Years (دو سال = 720 Days)
    // 5 Years (پانچ سال = 1800 Days)

    const calcInterval = (days: number) => {
      const daily = Math.floor(totalCount / days);
      const remainder = totalCount % days;
      const lastDay = daily + remainder;
      return { days, daily, lastDay };
    };

    return {
      totalCount,
      d21: calcInterval(21),
      d41: calcInterval(41),
      m3: calcInterval(90),
      m6: calcInterval(180),
      y1: calcInterval(360),
      m18: calcInterval(540),
      y2: calcInterval(720),
      y5: calcInterval(1800),
    };
  }, [calculationData, selectedMadarijSchedule]);

  // Active Rijal Ghaib direction
  const rijalData = useMemo(() => {
    return RIJAL_GHAIB_MAP[hijriDay] || RIJAL_GHAIB_MAP[4];
  }, [hijriDay]);

  const handleCopyPrayer = () => {
    const prayer = `اَلسَّلَامُ عَلَیْکُمْ یَا أَوْلِیَاءَ اللّٰہِ، اَلسَّلَامُ عَلَیْکُمْ یَا حُجَجَ اللّٰہِ، اَلسَّلَامُ عَلَیْکُمْ یَا نُوْرَ اللّٰہِ فِيْ ظُلُمَاتِ الْأَرْضِ، اَلسَّلَامُ عَلَیْکُمْ یَا رِجَالَ الْغَیْبِ، اَلسَّلَامُ عَلَیْکُمْ یَا أَرْوَاحَ الْمُقَدَّسَةِ، یَا نُقَبَاءُ، یَا نُجَبَاءُ، یَا أَبْدَالُ، یَا أَوْتَادُ، یَا قُطْبُ، یَا غَوْثُ! أَغِیْثُوْنِيْ وَ انْظُرُوْا إِلَيَّ بِنَظْرَةٍ، أَجِیْبُوْنِيْ بِغَوْثِ، اَلسَّلَامُ عَلَیْکُمْ وَ صَلَوَاتُ اللّٰہِ عَلَیْکُمْ۔`;
    navigator.clipboard.writeText(prayer);
    setCopiedPrayer(true);
    setTimeout(() => setCopiedPrayer(false), 2000);
  };

  return (
    <div className="mx-auto max-w-xl px-2 sm:px-4 py-4 font-urdu text-[#2c1e14]">
      {/* Mobile-Replica App Header matching the video layout */}
      <div className="rounded-2xl border-2 border-[#2d6a4f] bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#40916c] text-white p-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full border-2 border-emerald-300 bg-emerald-400" />
            <span className="text-xs font-bold text-emerald-100">علم الاوفاق و الجفر</span>
          </div>

          <div className="text-center">
            <h1 className="font-amiri text-2xl font-bold tracking-wide text-white">
              مدارجِ زکوٰۃ و نقشۂ رجال الغیب
            </h1>
            <p className="text-[11px] text-emerald-200">
              موبائل نظامِ عملیات و کواکب
            </p>
          </div>

          <div className="h-7 w-7 rounded-lg bg-white/15 flex items-center justify-center text-xs font-bold">
            🧭
          </div>
        </div>
      </div>

      {/* Top 2 Segment Switchers: [رجال الغیب] [مدارجِ زکوٰۃ] */}
      <div className="mt-3 grid grid-cols-2 gap-2 bg-[#e8f5e9] p-1.5 rounded-2xl border border-emerald-300 shadow-sm">
        <button
          onClick={() => setActiveScreen('rijal')}
          className={`py-3 text-center font-amiri text-lg font-bold rounded-xl transition-all cursor-pointer ${
            activeScreen === 'rijal'
              ? 'bg-[#1b4332] text-white shadow-md'
              : 'text-[#1b4332] hover:bg-emerald-100'
          }`}
        >
          رجال الغیب
        </button>

        <button
          onClick={() => setActiveScreen('madarij')}
          className={`py-3 text-center font-amiri text-lg font-bold rounded-xl transition-all cursor-pointer ${
            activeScreen === 'madarij'
              ? 'bg-[#1b4332] text-white shadow-md'
              : 'text-[#1b4332] hover:bg-emerald-100'
          }`}
        >
          مدارجِ زکوٰۃ
        </button>
      </div>

      {/* SCREEN 1: MADARIJ ZAKAT (مدارجِ زکوٰۃ کا حساب) */}
      {activeScreen === 'madarij' && (
        <div className="mt-4 space-y-4 animate-in fade-in">
          {/* Header Title */}
          <div className="text-center border-b border-emerald-200 pb-2">
            <h2 className="font-amiri text-2xl font-bold text-[#1b4332]">
              مدارجِ زکوٰۃ کا حساب
            </h2>
          </div>

          {/* Input Box */}
          <div className="rounded-2xl border-2 border-emerald-300 bg-white p-4 shadow-sm space-y-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اسم / آیت / عبارت لکھیں..."
              className="w-full rounded-xl border border-gray-300 p-3 text-lg font-amiri text-gray-800 focus:outline-none focus:border-[#2d6a4f] focus:ring-1 focus:ring-[#2d6a4f] shadow-inner text-center"
            />

            {/* Action Buttons: [حساب کریں] [صاف کریں] */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  if (!inputText.trim()) setInputText('بسم اللہ الرحمن الرحیم');
                  setIsCalculated(true);
                }}
                className="py-2.5 rounded-xl bg-[#1b4332] text-white font-amiri text-lg font-bold shadow-md hover:bg-[#143024] active:scale-[0.98] transition-all cursor-pointer"
              >
                حساب کریں
              </button>

              <button
                onClick={() => {
                  setInputText('');
                }}
                className="py-2.5 rounded-xl bg-gray-100 border border-gray-300 text-gray-700 font-amiri text-lg font-bold shadow-xs hover:bg-gray-200 active:scale-[0.98] transition-all cursor-pointer"
              >
                صاف کریں
              </button>
            </div>
          </div>

          {/* Stats Badges: [تعدادِ حرف: 19] [اعدادِ قمری: 786] */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-white border border-emerald-200 text-center shadow-xs">
              <span className="text-xs text-gray-600 font-bold block">تعدادِ حرف</span>
              <span className="font-amiri text-xl font-bold text-[#1b4332]">
                {calculationData.charCount}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-emerald-200 text-center shadow-xs">
              <span className="text-xs text-gray-600 font-bold block">اعدادِ قمری</span>
              <span className="font-amiri text-xl font-bold text-emerald-700">
                {calculationData.adadQamari}
              </span>
            </div>
          </div>

          {/* 14 Madarij Table (نامِ مدارج | تعدادِ زکوٰۃ) */}
          <div className="rounded-2xl border border-gray-300 bg-white overflow-hidden shadow-sm">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-[#f0fdf4] text-[#1b4332] font-amiri font-bold text-base border-b border-emerald-200">
                  <th className="p-2.5 border-r border-emerald-200">نامِ مدارج</th>
                  <th className="p-2.5">تعدادِ زکوٰۃ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-amiri text-lg">
                {calculationData.table.map((row, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/40">
                    <td className="p-2.5 font-bold text-gray-800 border-r border-gray-200">
                      {row.name}
                    </td>
                    <td className="p-2.5 text-gray-900 font-sans text-base font-bold">
                      {row.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 5-Year Schedule Breakdown (زکوٰۃ کے مدارج پانچ سال تک محیط) */}
          <div className="rounded-2xl border-2 border-emerald-300 bg-[#fbfbfa] p-4 shadow-md space-y-3">
            <h3 className="font-amiri text-xl font-bold text-center text-[#1b4332]">
              زکوٰۃ کے مدارج پانچ سال تک محیط
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                نامِ مدارج منتخب کریں:
              </label>
              <select
                value={selectedMadarijSchedule}
                onChange={(e) => setSelectedMadarijSchedule(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-2.5 text-base font-amiri text-gray-800 bg-white shadow-xs focus:outline-none focus:border-[#2d6a4f]"
              >
                {MADARIJ_NAMES.map((name, idx) => (
                  <option key={idx} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid Schedule matching Video Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
              {/* 21 Days */}
              <div className="p-2.5 rounded-xl border border-emerald-200 bg-white shadow-xs">
                <span className="font-bold text-gray-700 block">اکیس دن</span>
                <span className="text-emerald-800 font-bold block mt-1">یومیہ: {scheduleDetail.d21.daily}</span>
                <span className="text-[11px] text-gray-500 block">آخری دن: {scheduleDetail.d21.lastDay}</span>
              </div>

              {/* 41 Days */}
              <div className="p-2.5 rounded-xl border border-emerald-200 bg-white shadow-xs">
                <span className="font-bold text-gray-700 block">اکتالیس دن</span>
                <span className="text-emerald-800 font-bold block mt-1">یومیہ: {scheduleDetail.d41.daily}</span>
                <span className="text-[11px] text-gray-500 block">آخری دن: {scheduleDetail.d41.lastDay}</span>
              </div>

              {/* 3 Months */}
              <div className="p-2.5 rounded-xl border border-emerald-200 bg-white shadow-xs">
                <span className="font-bold text-gray-700 block">تین ماہ</span>
                <span className="text-emerald-800 font-bold block mt-1">یومیہ: {scheduleDetail.m3.daily}</span>
                <span className="text-[11px] text-gray-500 block">آخری دن: {scheduleDetail.m3.lastDay}</span>
              </div>

              {/* 6 Months */}
              <div className="p-2.5 rounded-xl border border-emerald-200 bg-white shadow-xs">
                <span className="font-bold text-gray-700 block">چھ ماہ</span>
                <span className="text-emerald-800 font-bold block mt-1">یومیہ: {scheduleDetail.m6.daily}</span>
                <span className="text-[11px] text-gray-500 block">آخری دن: {scheduleDetail.m6.lastDay}</span>
              </div>

              {/* 1 Year */}
              <div className="p-2.5 rounded-xl border border-emerald-200 bg-white shadow-xs">
                <span className="font-bold text-gray-700 block">ایک سال</span>
                <span className="text-emerald-800 font-bold block mt-1">یومیہ: {scheduleDetail.y1.daily}</span>
                <span className="text-[11px] text-gray-500 block">آخری دن: {scheduleDetail.y1.lastDay}</span>
              </div>

              {/* 18 Months */}
              <div className="p-2.5 rounded-xl border border-emerald-200 bg-white shadow-xs">
                <span className="font-bold text-gray-700 block">اٹھارہ ماہ</span>
                <span className="text-emerald-800 font-bold block mt-1">یومیہ: {scheduleDetail.m18.daily}</span>
                <span className="text-[11px] text-gray-500 block">آخری دن: {scheduleDetail.m18.lastDay}</span>
              </div>

              {/* 2 Years */}
              <div className="p-2.5 rounded-xl border border-emerald-200 bg-white shadow-xs">
                <span className="font-bold text-gray-700 block">دو سال</span>
                <span className="text-emerald-800 font-bold block mt-1">یومیہ: {scheduleDetail.y2.daily}</span>
                <span className="text-[11px] text-gray-500 block">آخری دن: {scheduleDetail.y2.lastDay}</span>
              </div>

              {/* 5 Years */}
              <div className="p-2.5 rounded-xl border border-emerald-200 bg-white shadow-xs">
                <span className="font-bold text-gray-700 block">پانچ سال</span>
                <span className="text-emerald-800 font-bold block mt-1">یومیہ: {scheduleDetail.y5.daily}</span>
                <span className="text-[11px] text-gray-500 block">آخری دن: {scheduleDetail.y5.lastDay}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 2: RIJAL-UL-GHAIB (نقشۂ رجال الغیب) */}
      {activeScreen === 'rijal' && (
        <div className="mt-4 space-y-4 animate-in fade-in">
          {/* Header Title */}
          <div className="text-center border-b border-emerald-200 pb-2">
            <h2 className="font-amiri text-2xl font-bold text-[#1b4332]">
              نقشۂ رجال الغیب
            </h2>
          </div>

          {/* Hijri Date Display & Calendar Button */}
          <div className="flex items-center justify-between px-2">
            <div className="font-amiri text-lg font-bold text-gray-800">
              {hijriDay} {hijriMonth} {hijriYear}
            </div>

            <button
              onClick={() => setIsCalendarOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-900 hover:bg-emerald-100 cursor-pointer"
            >
              <CalendarIcon className="h-3.5 w-3.5" />
              <span>کیلنڈر کھولیں</span>
            </button>
          </div>

          {/* Compass & Rijal Direction Wheel matching the video */}
          <div className="rounded-2xl border-2 border-emerald-300 bg-white p-6 shadow-md flex flex-col items-center justify-center space-y-4">
            <div className="relative h-64 w-64 rounded-full border-4 border-[#2d6a4f]/20 bg-[#fbfdfa] flex items-center justify-center shadow-inner">
              {/* Outer Cardinal Direction Labels */}
              <span className="absolute top-2 font-amiri font-bold text-sm text-gray-700">شمال (North)</span>
              <span className="absolute bottom-2 font-amiri font-bold text-sm text-gray-700">جنوب (South)</span>
              <span className="absolute right-2 font-amiri font-bold text-sm text-gray-700">مشرق (East)</span>
              <span className="absolute left-2 font-amiri font-bold text-sm text-gray-700">مغرب (West)</span>

              {/* Intercardinal Labels */}
              <span className="absolute top-8 right-8 font-amiri text-xs text-gray-500 font-bold">شمال مشرق</span>
              <span className="absolute top-8 left-8 font-amiri text-xs text-gray-500 font-bold">شمال مغرب</span>
              <span className="absolute bottom-8 right-8 font-amiri text-xs text-gray-500 font-bold">جنوب مشرق</span>
              <span className="absolute bottom-8 left-8 font-amiri text-xs text-gray-500 font-bold">جنوب مغرب</span>

              {/* Compass Axis Lines */}
              <div className="absolute h-full w-[1px] bg-emerald-200/80" />
              <div className="absolute w-full h-[1px] bg-emerald-200/80" />
              <div className="absolute h-full w-[1px] bg-emerald-100 rotate-45" />
              <div className="absolute h-full w-[1px] bg-emerald-100 -rotate-45" />

              {/* Central Rijal Green Diamond Shield */}
              <div className="z-10 h-16 w-16 bg-[#1b4332] text-white rounded-lg rotate-45 flex items-center justify-center shadow-lg border-2 border-amber-300">
                <span className="-rotate-45 font-amiri text-center font-bold text-xs leading-tight">
                  رجال<br />الغیب
                </span>
              </div>

              {/* Dynamic Direction Indicator Pointer matching the exact angle */}
              <div 
                className="absolute inset-0 flex items-center justify-center transition-transform duration-500 pointer-events-none"
                style={{ transform: `rotate(${rijalData.angle}deg)` }}
              >
                <div className="h-28 w-1 bg-gradient-to-t from-red-500 via-rose-400 to-transparent absolute top-2 rounded-full shadow-xs" />
                <div className="h-4 w-4 bg-red-600 rounded-full border-2 border-white absolute top-1 shadow-md" />
              </div>
            </div>

            {/* Direction Result Callout matching video */}
            <div className="w-full text-center p-3 rounded-xl bg-emerald-50 border border-emerald-300">
              <span className="text-xs text-gray-600 font-bold block">
                تاریخ {hijriDay} کو رجال الغیب اس سمت میں ہیں:
              </span>
              <span className="font-amiri text-2xl font-bold text-[#1b4332] block mt-0.5">
                {rijalData.direction}
              </span>
              <p className="text-xs text-emerald-800 mt-1 font-medium">
                {rijalData.advise}
              </p>
            </div>
          </div>

          {/* Dua Rijal-ul-Ghaib Box (دعائے رجال الغیب) */}
          <div className="rounded-2xl border-2 border-emerald-300 bg-[#fbfbfa] p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
              <h3 className="font-amiri text-xl font-bold text-[#1b4332]">
                دعائے رجال الغیب
              </h3>
              <button
                onClick={handleCopyPrayer}
                className="flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                {copiedPrayer ? <Check className="h-3.5 w-3.5 text-emerald-700" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedPrayer ? 'کاپی ہو گئی' : 'دعا کاپی کریں'}</span>
              </button>
            </div>

            <p className="font-amiri text-base sm:text-lg text-gray-800 leading-loose text-justify pt-1">
              اَلسَّلَامُ عَلَیْکُمْ یَا أَوْلِیَاءَ اللّٰہِ، اَلسَّلَامُ عَلَیْکُمْ یَا حُجَجَ اللّٰہِ، اَلسَّلَامُ عَلَیْکُمْ یَا نُوْرَ اللّٰہِ فِيْ ظُلُمَاتِ الْأَرْضِ، اَلسَّلَامُ عَلَیْکُمْ یَا رِجَالَ الْغَیْبِ، اَلسَّلَامُ عَلَیْکُمْ یَا أَرْوَاحَ الْمُقَدَّسَةِ، یَا نُقَبَاءُ، یَا نُجَبَاءُ، یَا أَبْدَالُ، یَا أَوْتَادُ، یَا قُطْبُ، یَا غَوْثُ! أَغِیْثُوْنِيْ وَ انْظُرُوْا إِلَيَّ بِنَظْرَةٍ، أَجِیْبُوْنِيْ بِغَوْثِ، اَلسَّلَامُ عَلَیْکُمْ وَ صَلَوَاتُ اللّٰہِ عَلَیْکُمْ۔
            </p>
          </div>
        </div>
      )}

      {/* Calendar Picker Modal matching the video (ہجری کیلنڈر اور تاریخ کا انتخاب) */}
      {isCalendarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white border-2 border-[#2d6a4f] p-5 shadow-2xl space-y-4">
            <h3 className="font-amiri text-xl font-bold text-center text-[#1b4332] border-b pb-2">
              ہجری کیلنڈر اور تاریخ کا انتخاب
            </h3>

            <div className="space-y-3">
              {/* Day selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  تاریخ (1 تا 30):
                </label>
                <select
                  value={hijriDay}
                  onChange={(e) => setHijriDay(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-base font-amiri text-gray-800 bg-white"
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  مہینہ:
                </label>
                <select
                  value={hijriMonth}
                  onChange={(e) => setHijriMonth(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-base font-amiri text-gray-800 bg-white"
                >
                  {[
                    'محرم الحرام',
                    'صفر المظفر',
                    'ربیع الاول',
                    'ربیع الثانی',
                    'جمادی الاول',
                    'جمادی الثانی',
                    'رجب المرجب',
                    'شعبان المعظم',
                    'رمضان المبارک',
                    'شوال المکرم',
                    'ذوالقعدۃ',
                    'ذوالحجۃ'
                  ].map((m, idx) => (
                    <option key={idx} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  سن ہجری:
                </label>
                <select
                  value={hijriYear}
                  onChange={(e) => setHijriYear(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-base font-amiri text-gray-800 bg-white"
                >
                  <option value="1446ھ">1446ھ</option>
                  <option value="1447ھ">1447ھ</option>
                  <option value="1448ھ">1448ھ</option>
                  <option value="1449ھ">1449ھ</option>
                  <option value="1450ھ">1450ھ</option>
                </select>
              </div>
            </div>

            {/* Modal Buttons: [تبدیل کریں] [منسوخ] */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="py-2.5 rounded-xl bg-[#1b4332] text-white font-amiri text-base font-bold shadow-md hover:bg-[#143024] cursor-pointer"
              >
                تبدیل کریں
              </button>
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="py-2.5 rounded-xl bg-gray-100 border border-gray-300 text-gray-700 font-amiri text-base font-bold hover:bg-gray-200 cursor-pointer"
              >
                منسوخ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
