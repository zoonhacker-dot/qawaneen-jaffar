import React, { useState, useMemo } from 'react';
import { ARABIC_LETTERS_DATABASE, ArabicLetterDetail } from '../data/abjadArabiData';
import { 
  Table, 
  Copy, 
  Check, 
  Search, 
  Printer, 
  Sparkles, 
  Layers, 
  FileText, 
  FileSpreadsheet, 
  Code, 
  Flame, 
  Mountain, 
  Wind, 
  Droplets, 
  ArrowUpDown, 
  ExternalLink,
  ShieldAlert,
  Info,
  Compass,
  Award,
  SlidersHorizontal,
  Eye,
  CheckCheck
} from 'lucide-react';

interface ArabicAbjadOneTableProps {
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
}

export const ArabicAbjadOneTable: React.FC<ArabicAbjadOneTableProps> = ({
  onSendToNaqsh,
  onSendToTakseer
}) => {
  // Search and Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [elementFilter, setElementFilter] = useState<'all' | 'fire' | 'earth' | 'air' | 'water'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'noorani' | 'zulmani' | 'diff-only'>('all');
  const [sortBy, setSortBy] = useState<'abjad-order' | 'mashriqi-asc' | 'mashriqi-desc' | 'maghribi-asc' | 'malfooti-desc' | 'element'>('abjad-order');
  const [viewDensity, setViewDensity] = useState<'detailed' | 'compact'>('detailed');

  // Copy Feedback state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2200);
  };

  // Filtered & Sorted Letters
  const processedLetters = useMemo(() => {
    let list = ARABIC_LETTERS_DATABASE.filter((item) => {
      // Search
      const q = searchQuery.trim();
      const matchSearch = !q || 
        item.letter.includes(q) || 
        item.nameArabic.includes(q) || 
        item.nameUrdu.includes(q) ||
        item.abjadKabirMashriqi.toString().includes(q) ||
        item.abjadMaghribi.toString().includes(q) ||
        item.malfootiAdad.toString().includes(q) ||
        item.planetUrdu.includes(q) ||
        item.planetArabic.includes(q) ||
        item.lunarMansionName.includes(q) ||
        item.bodyOrgan.includes(q) ||
        item.spiritualDomain.includes(q);

      // Element
      const matchElement = elementFilter === 'all' || item.element === elementFilter;

      // Category
      let matchCat = true;
      if (categoryFilter === 'noorani') matchCat = item.isNoorani;
      if (categoryFilter === 'zulmani') matchCat = !item.isNoorani;
      if (categoryFilter === 'diff-only') matchCat = item.abjadKabirMashriqi !== item.abjadMaghribi;

      return matchSearch && matchElement && matchCat;
    });

    // Sorting
    list = [...list].sort((a, b) => {
      if (sortBy === 'mashriqi-asc') return a.abjadKabirMashriqi - b.abjadKabirMashriqi;
      if (sortBy === 'mashriqi-desc') return b.abjadKabirMashriqi - a.abjadKabirMashriqi;
      if (sortBy === 'maghribi-asc') return a.abjadMaghribi - b.abjadMaghribi;
      if (sortBy === 'malfooti-desc') return b.malfootiAdad - a.malfootiAdad;
      if (sortBy === 'element') return a.element.localeCompare(b.element);
      return 0; // default abjad order
    });

    return list;
  }, [searchQuery, elementFilter, categoryFilter, sortBy]);

  // Generators for Full Table Export Formats
  const fullTableFormattedText = useMemo(() => {
    let txt = `=========================================================================================\n`;
    txt += `جدول حساب الجمل وأعداد الأبجدية العربية الموحد (مشرقي، مغاربي، بسط، عناصر، كواكب ومنازل)\n`;
    txt += `تحقيق: شمس المعارف الكبرى، الفتوحات المكية لابن عربي، ومفتاح الجفر\n`;
    txt += `=========================================================================================\n`;
    txt += `رقم | الحرف | اسم الحرف | جمل مشرق | جمل مغرب | صغير | وسيط | ملفوظي | أكبر | عنصر | نورانية | كوكب | منزلة قمر | عضو وخاصية\n`;
    txt += `----+-------+-----------+----------+----------+------+------+--------+------+------+---------+------+-----------+------------\n`;
    ARABIC_LETTERS_DATABASE.forEach((l, idx) => {
      const diffTag = l.abjadKabirMashriqi !== l.abjadMaghribi ? '*' : ' ';
      txt += `${(idx + 1).toString().padEnd(3)} | ${l.letter}     | ${l.nameArabic.padEnd(9)} | ${l.abjadKabirMashriqi.toString().padEnd(8)} | ${l.abjadMaghribi.toString().padEnd(7)}${diffTag} | ${l.abjadSaghir.toString().padEnd(4)} | ${l.abjadWaseet.toString().padEnd(4)} | ${l.malfootiAdad.toString().padEnd(6)} | ${l.abjadAkbar.toString().padEnd(4)} | ${l.elementUrdu.padEnd(4)} | ${(l.isNoorani ? 'نوراني' : 'ظلماني').padEnd(7)} | ${l.planetUrdu.padEnd(6)} | ${l.lunarMansionName} | ${l.bodyOrgan} (${l.spiritualDomain})\n`;
    });
    txt += `=========================================================================================\n`;
    txt += `مجموع أعداد الأبجدية المشرقية = 5995 | مجموع أعداد الأبجدية المغاربية = 5995 | الحروف المختلفة = 6 (س، ص، ض، ظ، غ، ش)\n`;
    return txt;
  }, []);

  const fullTableMarkdown = useMemo(() => {
    let md = `### جدول حساب الجمل الشامل للأبجدية العربية (الأعداد المشرقية والمغاربية)\n\n`;
    md += `| الرقم | الحرف | اسم الحرف | بسط ملفوظي | جمل كبير (مشرقي) | جمل مغاربي (أندلسي) | جمل صغير | جمل وسيط | عدد ملفوظي | جمل أكبر | العنصر والطبع | النورانية | الكوكب | منزلة القمر |\n`;
    md += `| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n`;
    ARABIC_LETTERS_DATABASE.forEach((l, idx) => {
      const diffBadge = l.abjadKabirMashriqi !== l.abjadMaghribi ? `**${l.abjadMaghribi}** (مختلف)` : `${l.abjadMaghribi}`;
      md += `| ${idx + 1} | **${l.letter}** | ${l.nameArabic} (${l.nameUrdu}) | ${l.malfootiLetters.join('-')} | ${l.abjadKabirMashriqi} | ${diffBadge} | ${l.abjadSaghir} | ${l.abjadWaseet} | ${l.malfootiAdad} | ${l.abjadAkbar} | ${l.elementUrdu} (${l.elementNature}) | ${l.isNoorani ? 'نوراني' : 'ظلماني'} | ${l.planetUrdu} | ${l.lunarMansionName} |\n`;
    });
    return md;
  }, []);

  const fullTableCSV = useMemo(() => {
    let csv = `Number,Letter,NameArabic,NameUrdu,MalfootiLetters,AbjadMashriqi,AbjadMaghribi,AbjadSaghir,AbjadWaseet,MalfootiAdad,AbjadAkbar,Element,ElementNature,IsNoorani,Planet,LunarMansion,BodyOrgan,SpiritualDomain\n`;
    ARABIC_LETTERS_DATABASE.forEach((l, idx) => {
      csv += `${idx + 1},"${l.letter}","${l.nameArabic}","${l.nameUrdu}","${l.malfootiLetters.join('-')}",${l.abjadKabirMashriqi},${l.abjadMaghribi},${l.abjadSaghir},${l.abjadWaseet},${l.malfootiAdad},${l.abjadAkbar},"${l.elementUrdu}","${l.elementNature}",${l.isNoorani ? 'Noorani' : 'Zulmani'},"${l.planetUrdu}","${l.lunarMansionName}","${l.bodyOrgan}","${l.spiritualDomain}"\n`;
    });
    return csv;
  }, []);

  const fullTableJSON = useMemo(() => {
    return JSON.stringify(ARABIC_LETTERS_DATABASE, null, 2);
  }, []);

  // Quick Sequence Strings
  const sequenceMashriqi = useMemo(() => {
    return ARABIC_LETTERS_DATABASE.map(l => `${l.letter}=${l.abjadKabirMashriqi}`).join('، ');
  }, []);

  const sequenceMaghribi = useMemo(() => {
    return ARABIC_LETTERS_DATABASE.map(l => `${l.letter}=${l.abjadMaghribi}`).join('، ');
  }, []);

  const sequenceNoorani = useMemo(() => {
    const noorani = ARABIC_LETTERS_DATABASE.filter(l => l.isNoorani);
    const sum = noorani.reduce((acc, curr) => acc + curr.abjadKabirMashriqi, 0);
    return `الحروف النورانية الـ 14 (نص حكيم قاطع له سر):\n` +
      noorani.map(l => `${l.letter}=${l.abjadKabirMashriqi}`).join('، ') +
      `\n(مجموع أعدادها = ${sum})`;
  }, []);

  const sequenceZulmani = useMemo(() => {
    const zulmani = ARABIC_LETTERS_DATABASE.filter(l => !l.isNoorani);
    const sum = zulmani.reduce((acc, curr) => acc + curr.abjadKabirMashriqi, 0);
    return `الحروف الظلمانية الـ 14:\n` +
      zulmani.map(l => `${l.letter}=${l.abjadKabirMashriqi}`).join('، ') +
      `\n(مجموع أعدادها = ${sum})`;
  }, []);

  const sequenceElements = useMemo(() => {
    const fire = ARABIC_LETTERS_DATABASE.filter(l => l.element === 'fire').map(l => `${l.letter}=${l.abjadKabirMashriqi}`).join('، ');
    const earth = ARABIC_LETTERS_DATABASE.filter(l => l.element === 'earth').map(l => `${l.letter}=${l.abjadKabirMashriqi}`).join('، ');
    const air = ARABIC_LETTERS_DATABASE.filter(l => l.element === 'air').map(l => `${l.letter}=${l.abjadKabirMashriqi}`).join('، ');
    const water = ARABIC_LETTERS_DATABASE.filter(l => l.element === 'water').map(l => `${l.letter}=${l.abjadKabirMashriqi}`).join('، ');

    return `العناصر الأربعة وطبائع الحروف مع الأعداد:\n\n🔥 الحروف النارية (أ، هـ، ط، م، ف، ش، ذ): ${fire}\n\n⛰️ الحروف الترابية (ب، و، ي، ن، ص، ت، ض): ${earth}\n\n💨 الحروف الهوائية (ج، ز، ك، س، ق، ث، ظ): ${air}\n\n💧 الحروف المائية (د، ح، ل، ع، ر، خ، غ): ${water}`;
  }, []);

  const sequenceMansions = useMemo(() => {
    return ARABIC_LETTERS_DATABASE.map(l => `${l.lunarMansionNumber}. ${l.lunarMansionName} (${l.letter} = ${l.abjadKabirMashriqi})`).join('\n');
  }, []);

  return (
    <div className="space-y-6" dir="rtl">
      {/* Top Banner & Fast Copy Bar */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-gradient-to-br from-[#fefae0] via-[#faedcd] to-[#f4ebe1] p-5 md:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-[#5d4037] text-white shadow-sm ring-2 ring-[#d4a373]">
                <Table className="h-6 w-6 text-amber-300" />
              </span>
              <div>
                <h3 className="font-amiri text-2xl md:text-3xl font-bold text-[#5d4037]">
                  جدول أعداد الأبجدية العربية الشامل الموحد (Master Abjad Table)
                </h3>
                <span className="text-xs text-[#bc6c25] font-bold">
                  جدول متكامل يضم الـ ۲۸ حرفاً مع سائر المراتب العددية، المنظومة المشرقية والمغاربية، وبسط الحروف وخيارات النسخ الفوري.
                </span>
              </div>
            </div>
          </div>

          {/* Quick Print & Copy Hub Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCopy(fullTableFormattedText, 'full-text')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#bc6c25] hover:bg-[#a2591d] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="نسخ الجدول بالكامل كنص مرتب للمفكرة والرسائل"
            >
              {copiedKey === 'full-text' ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
              <span>{copiedKey === 'full-text' ? 'تم نسخ الجدول!' : 'نسخ الجدول كاملاً'}</span>
            </button>

            <button
              onClick={() => handleCopy(fullTableMarkdown, 'full-md')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#faedcd] text-[#5d4037] border border-[#d4a373] text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="نسخ جدول ماركداون للتوثيق"
            >
              {copiedKey === 'full-md' ? <Check className="h-4 w-4 text-emerald-600" /> : <FileText className="h-4 w-4 text-indigo-700" />}
              <span>{copiedKey === 'full-md' ? 'تم نسخ Markdown' : 'ماركداون'}</span>
            </button>

            <button
              onClick={() => handleCopy(fullTableCSV, 'full-csv')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#faedcd] text-[#5d4037] border border-[#d4a373] text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="نسخ بيانات CSV لبرنامج إكسل"
            >
              {copiedKey === 'full-csv' ? <Check className="h-4 w-4 text-emerald-600" /> : <FileSpreadsheet className="h-4 w-4 text-emerald-700" />}
              <span>{copiedKey === 'full-csv' ? 'تم نسخ CSV' : 'CSV / إكسل'}</span>
            </button>

            <button
              onClick={() => handleCopy(fullTableJSON, 'full-json')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#faedcd] text-[#5d4037] border border-[#d4a373] text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="نسخ كائن البيانات JSON"
            >
              {copiedKey === 'full-json' ? <Check className="h-4 w-4 text-emerald-600" /> : <Code className="h-4 w-4 text-amber-700" />}
              <span>JSON</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-700 hover:bg-stone-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="طباعة الجدول"
            >
              <Printer className="h-4 w-4" />
              <span>طباعة</span>
            </button>
          </div>
        </div>

        {/* Quick Sequence Copy Bar (الأزرار السريعة لنسخ السلاسل والمنظومات) */}
        <div className="mt-5 pt-4 border-t border-[#d4a373]/40">
          <span className="text-[11px] font-bold text-[#5d4037] block mb-2">
            خيارات النسخ السريع للسلاسل والمنظومات الأبجدية:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCopy(sequenceMashriqi, 'seq-mashriqi')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-xs font-bold text-[#5d4037] border border-[#d4a373] shadow-2xs transition-all cursor-pointer"
            >
              {copiedKey === 'seq-mashriqi' ? <CheckCheck className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-[#bc6c25]" />}
              <span>نسخ الأبجدية المشرقية (أ=1...غ=1000)</span>
            </button>

            <button
              onClick={() => handleCopy(sequenceMaghribi, 'seq-maghribi')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-xs font-bold text-amber-950 border border-amber-300 shadow-2xs transition-all cursor-pointer"
            >
              {copiedKey === 'seq-maghribi' ? <CheckCheck className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-amber-700" />}
              <span>نسخ الأبجدية المغربية (صعفض قرست)</span>
            </button>

            <button
              onClick={() => handleCopy(sequenceNoorani, 'seq-noorani')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-xs font-bold text-emerald-950 border border-emerald-300 shadow-2xs transition-all cursor-pointer"
            >
              {copiedKey === 'seq-noorani' ? <CheckCheck className="h-3.5 w-3.5 text-emerald-600" /> : <Sparkles className="h-3.5 w-3.5 text-emerald-700" />}
              <span>نسخ الحروف النورانية الـ 14 مع أعدادها</span>
            </button>

            <button
              onClick={() => handleCopy(sequenceZulmani, 'seq-zulmani')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-900 border border-stone-300 shadow-2xs transition-all cursor-pointer"
            >
              {copiedKey === 'seq-zulmani' ? <CheckCheck className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-stone-700" />}
              <span>الحروف الظلمانية (14)</span>
            </button>

            <button
              onClick={() => handleCopy(sequenceElements, 'seq-elements')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-xs font-bold text-red-950 border border-red-200 shadow-2xs transition-all cursor-pointer"
            >
              {copiedKey === 'seq-elements' ? <CheckCheck className="h-3.5 w-3.5 text-emerald-600" /> : <Flame className="h-3.5 w-3.5 text-red-600" />}
              <span>نسخ حروف العناصر الأربعة (نار، تراب، هواء، ماء)</span>
            </button>

            <button
              onClick={() => handleCopy(sequenceMansions, 'seq-mansions')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-xs font-bold text-blue-950 border border-blue-200 shadow-2xs transition-all cursor-pointer"
            >
              {copiedKey === 'seq-mansions' ? <CheckCheck className="h-3.5 w-3.5 text-emerald-600" /> : <Compass className="h-3.5 w-3.5 text-blue-600" />}
              <span>منازل القمر الـ 28</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="rounded-2xl border-2 border-[#d4a373] bg-white p-4 shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن حرف، عدد، اسم، كوكب، منزلة، عضو أو خاصية..."
              className="w-full rounded-xl border border-[#d4a373] pr-9 pl-4 py-2.5 text-xs text-[#2c1e14] focus:outline-none focus:ring-2 focus:ring-[#bc6c25]/30 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-2.5 text-xs text-gray-400 hover:text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded cursor-pointer"
              >
                مسح
              </button>
            )}
          </div>

          {/* Element Filter */}
          <div className="flex items-center gap-1 bg-[#faedcd]/60 p-1 rounded-xl border border-[#d4a373]/50 text-xs flex-wrap">
            <span className="text-[10px] text-gray-500 font-bold px-1.5">العنصر:</span>
            <button
              onClick={() => setElementFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                elementFilter === 'all' ? 'bg-[#bc6c25] text-white shadow-xs' : 'text-[#5d4037] hover:bg-white/50'
              }`}
            >
              الكل (۲۸)
            </button>
            <button
              onClick={() => setElementFilter('fire')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                elementFilter === 'fire' ? 'bg-red-700 text-white shadow-xs' : 'text-red-900 hover:bg-red-100/50'
              }`}
            >
              <Flame className="h-3 w-3" />
              <span>ناري (۷)</span>
            </button>
            <button
              onClick={() => setElementFilter('earth')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                elementFilter === 'earth' ? 'bg-amber-800 text-white shadow-xs' : 'text-amber-900 hover:bg-amber-100/50'
              }`}
            >
              <Mountain className="h-3 w-3" />
              <span>ترابي (۷)</span>
            </button>
            <button
              onClick={() => setElementFilter('air')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                elementFilter === 'air' ? 'bg-yellow-700 text-white shadow-xs' : 'text-yellow-900 hover:bg-yellow-100/50'
              }`}
            >
              <Wind className="h-3 w-3" />
              <span>هوائي (۷)</span>
            </button>
            <button
              onClick={() => setElementFilter('water')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                elementFilter === 'water' ? 'bg-blue-700 text-white shadow-xs' : 'text-blue-900 hover:bg-blue-100/50'
              }`}
            >
              <Droplets className="h-3 w-3" />
              <span>مائي (۷)</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-[#faedcd]/60 p-1 rounded-xl border border-[#d4a373]/50 text-xs flex-wrap">
            <span className="text-[10px] text-gray-500 font-bold px-1.5">النوع:</span>
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                categoryFilter === 'all' ? 'bg-[#5d4037] text-white shadow-xs' : 'text-[#5d4037] hover:bg-white/50'
              }`}
            >
              الجميع
            </button>
            <button
              onClick={() => setCategoryFilter('noorani')}
              className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                categoryFilter === 'noorani' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-900 hover:bg-emerald-100/50'
              }`}
            >
              نوراني (۱۴)
            </button>
            <button
              onClick={() => setCategoryFilter('zulmani')}
              className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                categoryFilter === 'zulmani' ? 'bg-stone-700 text-white shadow-xs' : 'text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              ظلماني (۱۴)
            </button>
            <button
              onClick={() => setCategoryFilter('diff-only')}
              className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                categoryFilter === 'diff-only' ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-900 hover:bg-amber-200/50'
              }`}
              title="عرض الـ 6 حروف المختلفة بين الحساب المشرقي والمغاربي فقط"
            >
              <span>المختلفة (۶)</span>
            </button>
          </div>
        </div>

        {/* Secondary Row: Sorting & View Density */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#d4a373]/30 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-500 font-bold flex items-center gap-1">
              <ArrowUpDown className="h-3.5 w-3.5 text-[#bc6c25]" />
              <span>الترتيب حسب:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-lg border border-[#d4a373] bg-white px-2.5 py-1 text-xs text-[#5d4037] font-bold focus:outline-none"
            >
              <option value="abjad-order">الترتيب الأبجدي الأصلي (أ ب ج د...)</option>
              <option value="mashriqi-asc">الأعداد المشرقية (تصاعدي 1 ← 1000)</option>
              <option value="mashriqi-desc">الأعداد المشرقية (تنازلي 1000 ← 1)</option>
              <option value="maghribi-asc">الأعداد المغاربية (تصاعدي)</option>
              <option value="malfooti-desc">الأعداد الملفوظية (الأعلى أولاً)</option>
              <option value="element">حسب العناصر الأربعة</option>
            </select>

            <span className="text-gray-400 text-xs">|</span>

            <span className="text-gray-600 text-xs">
              النتائج المعروضة: <strong>{processedLetters.length}</strong> من أصل ۲۸ حرفاً
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewDensity(viewDensity === 'detailed' ? 'compact' : 'detailed')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#faedcd] text-[#5d4037] hover:bg-[#e7d8c9] font-bold text-xs transition-all cursor-pointer border border-[#d4a373]/50"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>{viewDensity === 'detailed' ? 'عرض مدمج (Compact)' : 'عرض تفصيلي شامل (Detailed)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Single Master Table */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-white shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-[#faedcd] via-[#fefae0] to-[#faedcd] text-[#5d4037] border-b-2 border-[#d4a373] select-none">
                <th className="p-3 font-bold text-center w-12">#</th>
                <th className="p-3 font-bold text-center w-16">الحرف</th>
                <th className="p-3 font-bold">اسم الحرف ونطقه</th>
                <th className="p-3 font-bold">بسط ملفوظي</th>
                <th className="p-3 font-bold text-center bg-amber-100/50">
                  <div className="flex flex-col items-center">
                    <span>جمل كبير مشرقي</span>
                    <span className="text-[9px] text-[#bc6c25] font-normal">(أبجد هوز حطي)</span>
                  </div>
                </th>
                <th className="p-3 font-bold text-center bg-amber-200/50">
                  <div className="flex flex-col items-center">
                    <span>جمل مغاربي أندلسي</span>
                    <span className="text-[9px] text-amber-800 font-normal">(صعفض قرست)</span>
                  </div>
                </th>
                <th className="p-3 font-bold text-center">جمل صغير</th>
                <th className="p-3 font-bold text-center">جمل وسيط</th>
                <th className="p-3 font-bold text-center bg-indigo-50">عدد ملفوظي</th>
                <th className="p-3 font-bold text-center">جمل أكبر</th>
                <th className="p-3 font-bold">العنصر والطبع</th>
                <th className="p-3 font-bold text-center">النورانية</th>
                {viewDensity === 'detailed' && (
                  <>
                    <th className="p-3 font-bold">الكوكب</th>
                    <th className="p-3 font-bold">منزلة القمر الـ ۲۸</th>
                    <th className="p-3 font-bold">العضو والخاصية</th>
                  </>
                )}
                <th className="p-3 font-bold text-center">نسخ وإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d4a373]/30">
              {processedLetters.map((letter, idx) => {
                const isDifferent = letter.abjadKabirMashriqi !== letter.abjadMaghribi;
                const rowKey = `row-${letter.letter}`;

                const rowSummaryText = `الحرف: ${letter.letter} (${letter.nameArabic}) | جمل مشرقي: ${letter.abjadKabirMashriqi} | جمل مغاربي: ${letter.abjadMaghribi} | ملفوظي: ${letter.malfootiLetters.join('-')} (${letter.malfootiAdad}) | عنصر: ${letter.elementUrdu} (${letter.elementNature}) | كوكب: ${letter.planetUrdu} | منزلة: ${letter.lunarMansionName} | خاصية: ${letter.spiritualDomain}`;

                return (
                  <tr 
                    key={letter.letter} 
                    className={`hover:bg-[#fefae0]/80 transition-colors ${
                      isDifferent ? 'bg-amber-50/30' : ''
                    }`}
                  >
                    {/* Index */}
                    <td className="p-3 text-center text-gray-500 font-mono font-bold">
                      {idx + 1}
                    </td>

                    {/* Letter */}
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleCopy(letter.letter, `let-${letter.letter}`)}
                        className="group relative inline-flex items-center justify-center p-1 rounded-xl hover:bg-[#faedcd] transition-all cursor-pointer"
                        title="انقر لنسخ الحرف"
                      >
                        <span className="font-amiri text-2xl font-bold text-[#bc6c25] group-hover:scale-110 transition-transform">
                          {letter.letter}
                        </span>
                        {copiedKey === `let-${letter.letter}` && (
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-[10px] px-2 py-0.5 rounded shadow font-bold whitespace-nowrap z-10">
                            تم النسخ!
                          </span>
                        )}
                      </button>
                    </td>

                    {/* Name */}
                    <td className="p-3">
                      <div className="font-bold text-[#5d4037] font-amiri text-sm">{letter.nameArabic}</div>
                      <span className="text-[10px] text-gray-500 font-medium">{letter.nameUrdu}</span>
                    </td>

                    {/* Malfooti Expansion */}
                    <td className="p-3 font-mono font-bold text-gray-700">
                      <span className="bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200">
                        {letter.malfootiLetters.join(' - ')}
                      </span>
                    </td>

                    {/* Mashriqi Value */}
                    <td className="p-3 text-center bg-amber-50/40">
                      <button
                        onClick={() => handleCopy(letter.abjadKabirMashriqi.toString(), `mash-${letter.letter}`)}
                        className="group relative font-mono font-bold text-sm text-[#5d4037] hover:text-[#bc6c25] hover:bg-amber-100/60 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                        title="انقر لنسخ العدد المشرقي"
                      >
                        <span>{letter.abjadKabirMashriqi}</span>
                        {copiedKey === `mash-${letter.letter}` && (
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-[10px] px-2 py-0.5 rounded shadow font-bold whitespace-nowrap z-10">
                            تم النسخ!
                          </span>
                        )}
                      </button>
                    </td>

                    {/* Maghribi Value */}
                    <td className="p-3 text-center bg-amber-100/30">
                      <button
                        onClick={() => handleCopy(letter.abjadMaghribi.toString(), `magh-${letter.letter}`)}
                        className={`group relative font-mono font-bold text-sm px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          isDifferent 
                            ? 'bg-amber-200/80 text-amber-950 ring-1 ring-amber-400 font-extrabold shadow-2xs' 
                            : 'text-gray-700 hover:bg-amber-100/60'
                        }`}
                        title={isDifferent ? 'مختلف عن المشرقي (انقر للنسخ)' : 'انقر لنسخ العدد المغاربي'}
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span>{letter.abjadMaghribi}</span>
                          {isDifferent && (
                            <span className="text-[8px] bg-amber-800 text-white px-1 py-0.2 rounded font-normal">
                              مغاربي
                            </span>
                          )}
                        </div>
                        {copiedKey === `magh-${letter.letter}` && (
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-[10px] px-2 py-0.5 rounded shadow font-bold whitespace-nowrap z-10">
                            تم النسخ!
                          </span>
                        )}
                      </button>
                    </td>

                    {/* Saghir */}
                    <td className="p-3 text-center font-mono text-gray-700 font-medium">
                      {letter.abjadSaghir}
                    </td>

                    {/* Waseet */}
                    <td className="p-3 text-center font-mono text-gray-700 font-medium">
                      {letter.abjadWaseet}
                    </td>

                    {/* Malfooti Adad */}
                    <td className="p-3 text-center bg-indigo-50/50">
                      <button
                        onClick={() => handleCopy(letter.malfootiAdad.toString(), `malf-${letter.letter}`)}
                        className="group relative font-mono font-bold text-indigo-900 hover:bg-indigo-100/70 px-2 py-1 rounded-md transition-all cursor-pointer"
                        title="انقر لنسخ العدد الملفوظي"
                      >
                        <span>{letter.malfootiAdad}</span>
                        {copiedKey === `malf-${letter.letter}` && (
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-[10px] px-2 py-0.5 rounded shadow font-bold whitespace-nowrap z-10">
                            تم النسخ!
                          </span>
                        )}
                      </button>
                    </td>

                    {/* Akbar */}
                    <td className="p-3 text-center font-mono text-gray-600 text-[11px]">
                      {letter.abjadAkbar}
                    </td>

                    {/* Element */}
                    <td className="p-3">
                      <div className="flex flex-col gap-0.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 w-fit ${
                          letter.element === 'fire' ? 'bg-red-100 text-red-800' :
                          letter.element === 'earth' ? 'bg-amber-100 text-amber-800' :
                          letter.element === 'air' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {letter.element === 'fire' && <Flame className="h-2.5 w-2.5" />}
                          {letter.element === 'earth' && <Mountain className="h-2.5 w-2.5" />}
                          {letter.element === 'air' && <Wind className="h-2.5 w-2.5" />}
                          {letter.element === 'water' && <Droplets className="h-2.5 w-2.5" />}
                          <span>{letter.elementUrdu} ({letter.elementArabic})</span>
                        </span>
                        <span className="text-[9px] text-gray-500">{letter.elementNature}</span>
                      </div>
                    </td>

                    {/* Noorani Status */}
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        letter.isNoorani ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {letter.isNoorani ? '✨ نوراني' : 'ظلماني'}
                      </span>
                    </td>

                    {/* Detailed Columns */}
                    {viewDensity === 'detailed' && (
                      <>
                        <td className="p-3 font-medium text-gray-700">
                          <div>{letter.planetUrdu}</div>
                          <span className="text-[10px] text-gray-400">{letter.planetArabic}</span>
                        </td>

                        <td className="p-3 text-[11px] text-gray-700">
                          <div className="font-bold text-[#bc6c25]">{letter.lunarMansionName}</div>
                          <span className="text-[9px] text-gray-400">منزلة #{letter.lunarMansionNumber}</span>
                        </td>

                        <td className="p-3 text-[11px] text-gray-700 max-w-xs">
                          <div className="font-medium text-gray-800">{letter.bodyOrgan}</div>
                          <div className="text-[10px] text-emerald-800 line-clamp-1" title={letter.spiritualDomain}>
                            {letter.spiritualDomain}
                          </div>
                        </td>
                      </>
                    )}

                    {/* Action & Copy Cell */}
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleCopy(rowSummaryText, rowKey)}
                          className="p-1.5 rounded-lg bg-gray-100 hover:bg-[#bc6c25] text-gray-700 hover:text-white transition-all cursor-pointer"
                          title="نسخ جميع بيانات هذا الحرف"
                        >
                          {copiedKey === rowKey ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>

                        {onSendToNaqsh && (
                          <button
                            onClick={() => onSendToNaqsh(letter.abjadKabirMashriqi)}
                            className="px-1.5 py-1 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-bold transition-all cursor-pointer"
                            title="إرسال عدد الحرف إلى مولد النقوش"
                          >
                            نقش
                          </button>
                        )}

                        {onSendToTakseer && (
                          <button
                            onClick={() => onSendToTakseer(letter.letter)}
                            className="px-1.5 py-1 rounded bg-indigo-100 hover:bg-indigo-200 text-indigo-900 text-[10px] font-bold transition-all cursor-pointer"
                            title="إرسال الحرف إلى التكسير"
                          >
                            تكسير
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer Stats Summary */}
        <div className="p-4 bg-gradient-to-r from-[#faedcd]/80 via-[#fefae0] to-[#faedcd]/80 border-t-2 border-[#d4a373] text-xs text-[#5d4037] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="text-gray-600">مجموع الأعداد المشرقية الكلي: </span>
              <strong className="font-mono text-sm text-[#bc6c25]">5995</strong>
            </div>
            <div>
              <span className="text-gray-600">مجموع الأعداد المغاربية الكلي: </span>
              <strong className="font-mono text-sm text-amber-900">5995</strong>
            </div>
            <div>
              <span className="text-gray-600">مجموع الـ 14 حرفاً النورانية: </span>
              <strong className="font-mono text-sm text-emerald-800">693</strong>
            </div>
            <div>
              <span className="text-gray-600">الحروف الـ 6 المختلفة: </span>
              <strong className="font-amiri text-sm text-amber-950 font-bold">س (60/300)، ص (90/60)، ض (800/90)، ظ (900/800)، غ (1000/900)، ش (300/1000)</strong>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 font-medium">
            (تم التحقيق والمطابقة بدقة وفق المصادر الجفرية الكلاسيكية)
          </div>
        </div>
      </div>
    </div>
  );
};
