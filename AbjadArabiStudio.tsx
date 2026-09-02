import React, { useState, useMemo } from 'react';
import { 
  ARABIC_LETTERS_DATABASE, 
  ArabicLetterDetail, 
  ARABIC_ABJAD_SYSTEMS_INFO, 
  AbjadSystemRule, 
  ARABIC_SACRED_PRESETS, 
  ArabicSacredPreset, 
  computeArabicAbjad, 
  ArabicAbjadFullAnalysis,
  numberToArabicJafrLetters,
  ARABIC_DIVINE_NAMES_LIST
} from '../data/abjadArabiData';
import { ArabicAbjadOneTable } from './ArabicAbjadOneTable';
import { AbjadDiagnosisStudio } from './AbjadDiagnosisStudio';
import { 
  Table,
  HeartPulse,
  Sparkles, 
  BookOpen, 
  Copy, 
  Check, 
  Printer, 
  Flame, 
  Droplets, 
  Wind, 
  Mountain, 
  Award, 
  Compass, 
  Layers, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  Info, 
  Zap, 
  Globe, 
  Sun, 
  Moon, 
  Sliders, 
  ShieldCheck, 
  HelpCircle,
  Clock,
  Feather
} from 'lucide-react';

interface AbjadArabiStudioProps {
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
  onSendToTakseerAflatoon?: (text: string) => void;
  onSendToIstikhara?: (text: string) => void;
}

export const AbjadArabiStudio: React.FC<AbjadArabiStudioProps> = ({
  onSendToNaqsh,
  onSendToTakseer,
  onSendToTakseerAflatoon,
  onSendToIstikhara
}) => {
  // Main Navigation Tabs
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'one-table' | 'analysis' | 'alphabet-matrix' | 'spiritual-extractions' | 'bast-workshop' | 'history-rules'>('diagnosis');

  // Input Text State
  const [inputText, setInputText] = useState<string>('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('p-basmalah');

  // 28 Letter Table Filter States
  const [letterSearchQuery, setLetterSearchQuery] = useState<string>('');
  const [elementFilter, setElementFilter] = useState<'all' | 'fire' | 'earth' | 'air' | 'water'>('all');
  const [nooraniFilter, setNooraniFilter] = useState<'all' | 'noorani' | 'zulmani'>('all');
  const [selectedModalLetter, setSelectedModalLetter] = useState<ArabicLetterDetail | null>(null);

  // Bast Custom Number Input
  const [customAdadInput, setCustomAdadInput] = useState<number>(786);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Master Computation
  const analysis: ArabicAbjadFullAnalysis = useMemo(() => {
    return computeArabicAbjad(inputText);
  }, [inputText]);

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSelectPreset = (preset: ArabicSacredPreset) => {
    setSelectedPresetId(preset.id);
    setInputText(preset.text);
  };

  // Filtered 28 Letters
  const filteredLetters = useMemo(() => {
    return ARABIC_LETTERS_DATABASE.filter(item => {
      const matchSearch = 
        item.letter.includes(letterSearchQuery) || 
        item.nameArabic.includes(letterSearchQuery) || 
        item.nameUrdu.includes(letterSearchQuery) ||
        item.spiritualDomain.includes(letterSearchQuery) ||
        item.planetUrdu.includes(letterSearchQuery);
      
      const matchElement = elementFilter === 'all' || item.element === elementFilter;
      const matchNoorani = 
        nooraniFilter === 'all' || 
        (nooraniFilter === 'noorani' && item.isNoorani) || 
        (nooraniFilter === 'zulmani' && !item.isNoorani);

      return matchSearch && matchElement && matchNoorani;
    });
  }, [letterSearchQuery, elementFilter, nooraniFilter]);

  // Generated Arabic Azimah for this text
  const customArabicAzimah = useMemo(() => {
    const text = analysis.cleanedText || 'الاسم الشريف';
    return `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ، أَقْسَمْتُ عَلَيْكُمْ أَيَّتُهَا الْأَرْوَاحُ الرُّوحَانِيَّةُ الْعُلْوِيَّةُ وَالْأَرْضِيَّةُ، بِحَقِّ هَٰذِهِ الْحُرُوفِ الْمُبَارَكَةِ (${analysis.lettersList.join('، ')}) وَبِحَقِّ سِرِّ أَعْدَادِهَا الْمَشْرِقِيَّةِ (${analysis.totalKabirMashriqi}) وَالْمَغَارِبِيَّةِ (${analysis.totalMaghribi})، وَبِطَاعَةِ السَّيِّدِ ${analysis.muwakkilUlwi}، وَالْخَادِمِ ${analysis.muwakkilSifli}، أَنْ تُسَخِّرُوا لِي رُوحَانِيَّةَ هَٰذَا الْعَمَلِ فِي جَلْبِ الْخَيْرِ وَالْبَرَكَةِ وَحُصُولِ الْمَقَاصِدِ، بِحَقِّ اسْمِ اللَّهِ الْأَعْظَمِ، الْعَجَلَ الْعَجَلَ السَّاعَةَ السَّاعَةَ بَارَكَ اللَّهُ فِيكُمْ وَعَلَيْكُمْ۔`;
  }, [analysis]);

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header Banner */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-gradient-to-r from-[#fefae0] via-[#faedcd] to-[#f4ebe1] p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2.5 rounded-2xl bg-[#bc6c25] text-white shadow-sm ring-2 ring-[#d4a373]">
                <Globe className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-amiri text-2xl md:text-3xl font-bold text-[#5d4037]">
                  الأبجدية العربية وحساب الجمل المشرقي والمغاربي
                </h2>
                <span className="text-xs text-[#bc6c25] font-bold">
                  (تحقيق شامل على منهج شمس المعارف الكبرى، الفتوحات المكية لابن عربي ومفتاح الجفر)
                </span>
              </div>
            </div>
            <p className="mt-2 text-sm text-[#8d6e63] max-w-4xl leading-relaxed font-medium">
              محاسب ابجد عربی کا اختصاصی اسٹوڈیو: حساب جمل کبیر مشرقی، ابجد مغربی و اندلسی (صعفض قرست)، ابجد صغیر، بسط ملفوظی، ۲۸ منازلِ قمر، ۱۴ حروفِ نورانیہ، طبائع اربعہ اور استخراج موکلات۔
            </p>
          </div>

          {/* Quick Stats Badges Header */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-2xl border border-[#d4a373] bg-white/90 px-3.5 py-2 text-center shadow-xs">
              <span className="text-[10px] text-gray-500 font-bold block">جمل کبیر (مشرقی)</span>
              <span className="font-amiri text-xl font-bold text-[#bc6c25]">{analysis.totalKabirMashriqi}</span>
            </div>
            <div className="rounded-2xl border border-amber-300 bg-amber-50/90 px-3.5 py-2 text-center shadow-xs">
              <span className="text-[10px] text-amber-800 font-bold block">جمل مغربی (اندلسی)</span>
              <span className="font-amiri text-xl font-bold text-amber-900">{analysis.totalMaghribi}</span>
            </div>
            <div className="rounded-2xl border border-[#d4a373] bg-white/90 px-3.5 py-2 text-center shadow-xs">
              <span className="text-[10px] text-gray-500 font-bold block">بسط ملفوظی</span>
              <span className="font-amiri text-xl font-bold text-[#5d4037]">{analysis.totalMalfooti}</span>
            </div>
            <button
              id="btn-print-arabic-abjad"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#bc6c25] hover:bg-[#a2591d] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>پرنٹ خاکہ</span>
            </button>
          </div>
        </div>

        {/* Input Box and Presets */}
        <div className="mt-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <label className="text-xs font-bold text-[#5d4037] flex items-center gap-1.5">
              <Feather className="h-4 w-4 text-[#bc6c25]" />
              <span>عربی عبارت، اسمِ الٰہی، آیت یا عزیمت درج فرمائیں:</span>
            </label>
            <div className="flex items-center gap-1 text-[11px] text-[#8d6e63]">
              <span>تعدادِ حروف: <strong>{analysis.totalLettersCount}</strong></span>
              <span className="mx-1">•</span>
              <span>حروفِ مفردہ: <strong>{analysis.uniqueLettersCount}</strong></span>
              <span className="mx-1">•</span>
              <span className="text-emerald-700 font-bold">نورانی: {analysis.nooraniCount} ({analysis.nooraniPercentage}%)</span>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              id="arabic-abjad-input-field"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="یہاں عربی یا اردو عبارت تحریر کریں..."
              className="w-full rounded-2xl border-2 border-[#d4a373] bg-white px-4 py-3 text-lg md:text-xl text-[#2c1e14] placeholder-[#a89078] focus:border-[#bc6c25] focus:outline-none focus:ring-2 focus:ring-[#bc6c25]/20 font-amiri shadow-inner"
            />
            {inputText && (
              <button
                onClick={() => setInputText('')}
                className="absolute left-3 top-3.5 text-xs text-[#5d4037] hover:text-[#2c1e14] bg-[#e7d8c9] hover:bg-[#d4a373] px-2.5 py-1 rounded-lg font-medium cursor-pointer"
              >
                صاف کریں
              </button>
            )}
          </div>

          {/* Quick Presets Bar */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-[#5d4037] ml-1">نمونہ متون:</span>
            {ARABIC_SACRED_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedPresetId === preset.id
                    ? 'bg-[#bc6c25] text-white shadow-xs'
                    : 'bg-white/80 hover:bg-white text-[#5d4037] border border-[#d4a373]/50'
                }`}
              >
                {preset.titleUrdu}
              </button>
            ))}
          </div>
        </div>

        {/* Studio Sub-Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-[#d4a373]/40 pt-4">
          <button
            onClick={() => setActiveTab('diagnosis')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'diagnosis'
                ? 'bg-red-800 text-white shadow-md ring-2 ring-red-300'
                : 'bg-red-50 hover:bg-red-100 text-red-950 border border-red-300'
            }`}
          >
            <HeartPulse className="h-4 w-4 text-red-300 animate-pulse" />
            <span>★ تشخیصِ امراض و فارمولہ 4.3.7.12.6 (Diagnosis & Cure)</span>
          </button>

          <button
            onClick={() => setActiveTab('one-table')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'one-table'
                ? 'bg-[#bc6c25] text-white shadow-md ring-2 ring-amber-300'
                : 'bg-white/90 hover:bg-white text-[#5d4037] border border-[#d4a373]'
            }`}
          >
            <Table className="h-4 w-4 text-amber-300" />
            <span>جدول الأعداد الشامل والنسخ (One Table)</span>
          </button>

          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'analysis'
                ? 'bg-[#5d4037] text-white shadow-md'
                : 'bg-white/80 hover:bg-white text-[#5d4037] border border-[#d4a373]/60'
            }`}
          >
            <Sliders className="h-4 w-4 text-amber-400" />
            <span>۱. التحليل الفوري والنظام المقارن (Live Comparison)</span>
          </button>

          <button
            onClick={() => setActiveTab('alphabet-matrix')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'alphabet-matrix'
                ? 'bg-amber-700 text-white shadow-md'
                : 'bg-amber-100/70 hover:bg-amber-100 text-amber-900 border border-amber-300'
            }`}
          >
            <BookOpen className="h-4 w-4 text-amber-600" />
            <span>۲. بطاقات الحروف الـ ۲۸ (28 Letter Cards)</span>
          </button>

          <button
            onClick={() => setActiveTab('spiritual-extractions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'spiritual-extractions'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300'
            }`}
          >
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>۳. المستخرجات الروحانية والأسماء (Spiritual Extractions)</span>
          </button>

          <button
            onClick={() => setActiveTab('bast-workshop')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'bast-workshop'
                ? 'bg-indigo-800 text-white shadow-md'
                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200'
            }`}
          >
            <Layers className="h-4 w-4 text-indigo-600" />
            <span>۴. بسط الحروف والتكسير (Bast & Expansions)</span>
          </button>

          <button
            onClick={() => setActiveTab('history-rules')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'history-rules'
                ? 'bg-[#bc6c25] text-white shadow-md'
                : 'bg-white/80 hover:bg-white text-[#5d4037] border border-[#d4a373]/60'
            }`}
          >
            <HelpCircle className="h-4 w-4 text-[#bc6c25]" />
            <span>۵. قواعد وتاريخ حساب الجمل (Historical Rules)</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          VIEW DIAGNOSIS: MEDICAL & SPIRITUAL DIAGNOSIS STUDIO (تشخيص الأمراض والفورمولا 4.3.7.12.6)
         ========================================================================= */}
      {activeTab === 'diagnosis' && (
        <AbjadDiagnosisStudio
          onSendToNaqsh={onSendToNaqsh}
          onSendToTakseer={onSendToTakseer}
          onSendToIstikhara={onSendToIstikhara}
        />
      )}

      {/* =========================================================================
          VIEW 0: MASTER ONE TABLE & COPY HUB (جدول الأعداد الشامل والنسخ)
         ========================================================================= */}
      {activeTab === 'one-table' && (
        <ArabicAbjadOneTable
          onSendToNaqsh={onSendToNaqsh}
          onSendToTakseer={onSendToTakseer}
        />
      )}

      {/* =========================================================================
          VIEW 1: LIVE ANALYSIS & SYSTEM COMPARISON (التحليل الفوري و مقارنة النظم)
         ========================================================================= */}
      {activeTab === 'analysis' && (
        <div className="space-y-6">
          {/* Comparative Numerical System Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Mashriqi Standard */}
            <div className="rounded-2xl border-2 border-[#d4a373] bg-white p-4 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#bc6c25]">ابجد کبیر (مشرقی)</span>
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">ابجد ہوز حطی</span>
              </div>
              <div className="font-amiri text-3xl font-bold text-[#5d4037]">
                {analysis.totalKabirMashriqi}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                اہلِ مشرق و برصغیر کا معیار (س=۶۰، ص=۹۰، ض=۸۰۰، ظ=۹۰۰، غ=۱۰۰۰)
              </p>
            </div>

            {/* 2. Maghribi Andalusian */}
            <div className="rounded-2xl border-2 border-amber-400 bg-amber-50/70 p-4 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-900">ابجد مغربی (اندلسی)</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md font-bold">صعفض قرست</span>
              </div>
              <div className="font-amiri text-3xl font-bold text-amber-900 flex items-center gap-2">
                <span>{analysis.totalMaghribi}</span>
                {analysis.totalMaghribi !== analysis.totalKabirMashriqi && (
                  <span className="text-xs text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-full font-bold">
                    فرق: {Math.abs(analysis.totalMaghribi - analysis.totalKabirMashriqi)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-amber-800 mt-1">
                طریقہ مغاربہ و ابن عربی (ص=۶۰، ض=۹۰، س=۳۰۰، ش=۱۰۰۰، ظ=۸۰۰، غ=۹۰۰)
              </p>
            </div>

            {/* 3. Abjad Saghir */}
            <div className="rounded-2xl border-2 border-[#d4a373] bg-white p-4 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#5d4037]">ابجد صغیر (وضعی)</span>
                <span className="text-[10px] bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md font-bold">طرحِ اصفار</span>
              </div>
              <div className="font-amiri text-3xl font-bold text-[#5d4037]">
                {analysis.totalSaghir}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                اعدادِ اصغر و اکائیاں (۱ تا ۹) برائے دریافتِ باطنی کسر و مزاج
              </p>
            </div>

            {/* 4. Malfooti Expansion */}
            <div className="rounded-2xl border-2 border-[#d4a373] bg-white p-4 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#5d4037]">بسطِ ملفوظی (روح)</span>
                <span className="text-[10px] bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-md font-bold">کامل تلفظ</span>
              </div>
              <div className="font-amiri text-3xl font-bold text-indigo-900">
                {analysis.totalMalfooti}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                حروف کے ناموں کے تلفظ کے باطنی اعداد (الف=۱۱۱، لام=۷۱، میم=۹۰...)
              </p>
            </div>
          </div>

          {/* Elemental Balance & Noorani/Zulmani Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Elements Quad Breakdown (LG: 7 cols) */}
            <div className="lg:col-span-7 rounded-2xl border-2 border-[#d4a373] bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#d4a373]/30">
                <h3 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
                  <Compass className="h-5 w-5 text-[#bc6c25]" />
                  <span>میزانِ طبائع و عناصرِ اربعہ (Elemental Distribution)</span>
                </h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#faedcd] text-[#5d4037]">
                  طالع غالب: {analysis.dominantElementUrdu.split(' ')[0]}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Fire */}
                <div className="p-3 rounded-xl bg-red-50/80 border border-red-200 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1 text-xs font-bold text-red-900">
                    <Flame className="h-4 w-4 text-red-600" />
                    <span>آتشی (ناری)</span>
                  </div>
                  <div className="font-amiri text-xl font-bold text-red-900">{analysis.elementsCount.fire} حروف</div>
                  <div className="text-[10px] text-red-700 font-medium">مجموعہ: {analysis.elementsAdad.fire} عدد</div>
                  <div className="text-[9px] text-gray-500 font-urdu">ا، ہ، ط، م، ف، ش، ذ</div>
                </div>

                {/* Earth */}
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1 text-xs font-bold text-amber-900">
                    <Mountain className="h-4 w-4 text-amber-700" />
                    <span>خاکی (ترابی)</span>
                  </div>
                  <div className="font-amiri text-xl font-bold text-amber-900">{analysis.elementsCount.earth} حروف</div>
                  <div className="text-[10px] text-amber-700 font-medium">مجموعہ: {analysis.elementsAdad.earth} عدد</div>
                  <div className="text-[9px] text-gray-500 font-urdu">ب، و، ی، ن، ص، ت، ض</div>
                </div>

                {/* Air */}
                <div className="p-3 rounded-xl bg-yellow-50/80 border border-yellow-200 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1 text-xs font-bold text-yellow-900">
                    <Wind className="h-4 w-4 text-yellow-600" />
                    <span>بادی (ہوائی)</span>
                  </div>
                  <div className="font-amiri text-xl font-bold text-yellow-900">{analysis.elementsCount.air} حروف</div>
                  <div className="text-[10px] text-yellow-700 font-medium">مجموعہ: {analysis.elementsAdad.air} عدد</div>
                  <div className="text-[9px] text-gray-500 font-urdu">ج، ز، ک، س، ق، ث، ظ</div>
                </div>

                {/* Water */}
                <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1 text-xs font-bold text-blue-900">
                    <Droplets className="h-4 w-4 text-blue-600" />
                    <span>آبی (مائی)</span>
                  </div>
                  <div className="font-amiri text-xl font-bold text-blue-900">{analysis.elementsCount.water} حروف</div>
                  <div className="text-[10px] text-blue-700 font-medium">مجموعہ: {analysis.elementsAdad.water} عدد</div>
                  <div className="text-[9px] text-gray-500 font-urdu">د، ح، ل، ع، ر، خ، غ</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#fdfaf1] border border-[#d4a373]/40 text-xs text-[#5d4037] leading-relaxed">
                <strong>حکمِ جفری:</strong> طبعِ غالب <strong>{analysis.dominantElementUrdu}</strong> ہے۔ اس عبارت یا اسم کا ورد، تعویذ یا نقش بناتے وقت اسی عنصر کی رعایت رکھی جائے۔
              </div>
            </div>

            {/* Noorani vs Zulmani + Astrological Matching (LG: 5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border-2 border-[#d4a373] bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#d4a373]/30">
                <h3 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <span>الحروف النورانية والظلمانية</span>
                </h3>
                <span className="text-[10px] font-bold text-gray-500">نص حكيم قاطع له سر</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-emerald-700 flex items-center gap-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span>حروفِ نورانیہ: {analysis.nooraniCount} ({analysis.nooraniPercentage}%)</span>
                  </span>
                  <span className="text-gray-600 flex items-center gap-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                    <span>حروفِ ظلمانیہ: {analysis.zulmaniCount} ({100 - analysis.nooraniPercentage}%)</span>
                  </span>
                </div>

                {/* Visual Progress Bar */}
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500" 
                    style={{ width: `${analysis.nooraniPercentage}%` }} 
                  />
                  <div 
                    className="h-full bg-gradient-to-r from-amber-700 to-stone-700 transition-all duration-500" 
                    style={{ width: `${100 - analysis.nooraniPercentage}%` }} 
                  />
                </div>

                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs space-y-1.5">
                  <div className="font-bold text-amber-900">طالع و ساعاتِ فلکیہ:</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-700">
                    <div><strong>کوکبِ حاکم:</strong> {analysis.bestPlanet}</div>
                    <div><strong>موزوں ترین دن:</strong> {analysis.bestDay}</div>
                    <div className="col-span-2"><strong>ساعتِ عمل:</strong> {analysis.bestHour}</div>
                  </div>
                </div>
              </div>

              {/* Quick Transfer Actions */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => setActiveTab('diagnosis')}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-red-800 hover:bg-red-700 text-white p-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <HeartPulse className="h-3.5 w-3.5 animate-pulse text-red-200" />
                  <span>تشخیصِ امراض و فارمولہ 4.3.7.12.6</span>
                </button>
                {onSendToNaqsh && (
                  <button
                    id="btn-transfer-arabic-to-naqsh"
                    onClick={() => onSendToNaqsh(analysis.totalKabirMashriqi)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#bc6c25] hover:bg-[#a2591d] text-white p-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Award className="h-3.5 w-3.5" />
                    <span>نقش جنریٹر ({analysis.totalKabirMashriqi})</span>
                  </button>
                )}
                {onSendToTakseer && (
                  <button
                    id="btn-transfer-arabic-to-takseer"
                    onClick={() => onSendToTakseer(analysis.cleanedText)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#5d4037] hover:bg-[#4a332a] text-white p-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Flame className="h-3.5 w-3.5" />
                    <span>تکسیر اسٹوڈیو</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Letter by Letter Breakdown Table */}
          <div className="rounded-2xl border-2 border-[#d4a373] bg-white p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#d4a373]/30">
              <h3 className="font-amiri text-lg font-bold text-[#5d4037] flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#bc6c25]" />
                <span>تفکیک و جدولِ تفصیلی برائے ہر حرف (Individual Letter Decomposition)</span>
              </h3>
              <span className="text-xs text-gray-500 font-bold">
                تعداد: {analysis.letterBreakdown.length} حروف
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs border-collapse">
                <thead>
                  <tr className="bg-[#faedcd] text-[#5d4037] border-b-2 border-[#d4a373]">
                    <th className="p-2.5 font-bold">نمبر</th>
                    <th className="p-2.5 font-bold">حرف</th>
                    <th className="p-2.5 font-bold">اسم الحرف</th>
                    <th className="p-2.5 font-bold">جمل کبیر (مشرقی)</th>
                    <th className="p-2.5 font-bold">جمل مغربی</th>
                    <th className="p-2.5 font-bold">بسط ملفوظی</th>
                    <th className="p-2.5 font-bold">عنصر و طبع</th>
                    <th className="p-2.5 font-bold">کوکب</th>
                    <th className="p-2.5 font-bold">منزلِ قمر</th>
                    <th className="p-2.5 font-bold">نوعیت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d4a373]/30">
                  {analysis.letterBreakdown.map((row, idx) => {
                    const isDiff = row.kabirMashriqi !== row.maghribi;
                    return (
                      <tr key={idx} className="hover:bg-[#fefae0]/60 transition-colors">
                        <td className="p-2.5 text-gray-500 font-mono">{idx + 1}</td>
                        <td className="p-2.5 font-amiri text-lg font-bold text-[#bc6c25]">{row.char}</td>
                        <td className="p-2.5 font-bold text-[#5d4037]">{row.nameArabic}</td>
                        <td className="p-2.5 font-mono font-bold text-[#5d4037]">{row.kabirMashriqi}</td>
                        <td className={`p-2.5 font-mono font-bold ${isDiff ? 'text-amber-800 bg-amber-100/70 rounded-md' : 'text-gray-700'}`}>
                          {row.maghribi}
                          {isDiff && <span className="text-[9px] mr-1 text-amber-700 font-normal">★مغربی</span>}
                        </td>
                        <td className="p-2.5 font-mono text-indigo-900 font-bold">{row.malfooti}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            row.element === 'fire' ? 'bg-red-100 text-red-800' :
                            row.element === 'earth' ? 'bg-amber-100 text-amber-800' :
                            row.element === 'air' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {row.elementUrdu}
                          </span>
                        </td>
                        <td className="p-2.5 font-medium text-gray-700">{row.planetUrdu}</td>
                        <td className="p-2.5 text-gray-600 text-[11px]">{row.lunarMansion}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            row.isNoorani ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {row.isNoorani ? 'نورانی' : 'ظلمانی'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: 28 ARABIC LETTERS MASTER MATRIX (جدول الحروف ۲۸ الکامل)
         ========================================================================= */}
      {activeTab === 'alphabet-matrix' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="rounded-2xl border-2 border-[#d4a373] bg-white p-4 shadow-sm space-y-3">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative flex-1 w-full">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={letterSearchQuery}
                  onChange={(e) => setLetterSearchQuery(e.target.value)}
                  placeholder="حرف، نام، کوکب یا خاصیت تلاش کریں..."
                  className="w-full rounded-xl border border-[#d4a373] pr-9 pl-4 py-2 text-xs text-[#2c1e14] focus:outline-none focus:ring-2 focus:ring-[#bc6c25]/30"
                />
              </div>

              {/* Element Filter */}
              <div className="flex items-center gap-1 bg-[#faedcd]/60 p-1 rounded-xl border border-[#d4a373]/50 text-xs">
                <button
                  onClick={() => setElementFilter('all')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    elementFilter === 'all' ? 'bg-[#bc6c25] text-white shadow-xs' : 'text-[#5d4037]'
                  }`}
                >
                  تمام عناصر
                </button>
                <button
                  onClick={() => setElementFilter('fire')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    elementFilter === 'fire' ? 'bg-red-700 text-white shadow-xs' : 'text-red-900'
                  }`}
                >
                  آتشی
                </button>
                <button
                  onClick={() => setElementFilter('earth')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    elementFilter === 'earth' ? 'bg-amber-800 text-white shadow-xs' : 'text-amber-900'
                  }`}
                >
                  خاکی
                </button>
                <button
                  onClick={() => setElementFilter('air')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    elementFilter === 'air' ? 'bg-yellow-700 text-white shadow-xs' : 'text-yellow-900'
                  }`}
                >
                  بادی
                </button>
                <button
                  onClick={() => setElementFilter('water')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    elementFilter === 'water' ? 'bg-blue-700 text-white shadow-xs' : 'text-blue-900'
                  }`}
                >
                  آبی
                </button>
              </div>

              {/* Noorani / Zulmani Filter */}
              <div className="flex items-center gap-1 bg-[#faedcd]/60 p-1 rounded-xl border border-[#d4a373]/50 text-xs">
                <button
                  onClick={() => setNooraniFilter('all')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    nooraniFilter === 'all' ? 'bg-[#5d4037] text-white shadow-xs' : 'text-[#5d4037]'
                  }`}
                >
                  تمام حروف (۲۸)
                </button>
                <button
                  onClick={() => setNooraniFilter('noorani')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    nooraniFilter === 'noorani' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-900'
                  }`}
                >
                  نورانی (۱۴)
                </button>
                <button
                  onClick={() => setNooraniFilter('zulmani')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    nooraniFilter === 'zulmani' ? 'bg-stone-700 text-white shadow-xs' : 'text-stone-900'
                  }`}
                >
                  ظلمانی (۱۴)
                </button>
              </div>
            </div>
          </div>

          {/* 28 Letter Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredLetters.map((letter) => {
              const isDiff = letter.abjadKabirMashriqi !== letter.abjadMaghribi;
              return (
                <div
                  key={letter.letter}
                  className="rounded-2xl border-2 border-[#d4a373]/70 bg-white p-4 shadow-xs hover:shadow-md transition-all hover:border-[#bc6c25] flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-amiri text-3xl font-bold text-[#bc6c25]">{letter.letter}</span>
                        <div>
                          <h4 className="font-amiri text-base font-bold text-[#5d4037]">{letter.nameArabic}</h4>
                          <span className="text-[10px] text-gray-500 font-bold">{letter.nameUrdu}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        letter.isNoorani ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {letter.isNoorani ? 'نورانی' : 'ظلمانی'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        letter.element === 'fire' ? 'bg-red-100 text-red-800' :
                        letter.element === 'earth' ? 'bg-amber-100 text-amber-800' :
                        letter.element === 'air' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {letter.elementUrdu}
                      </span>
                    </div>
                  </div>

                  {/* Numbers Grid */}
                  <div className="grid grid-cols-3 gap-1.5 text-center p-2 rounded-xl bg-[#fdfaf1] border border-[#d4a373]/30 text-xs">
                    <div>
                      <span className="text-[9px] text-gray-500 font-bold block">مشرقی</span>
                      <span className="font-mono font-bold text-[#5d4037]">{letter.abjadKabirMashriqi}</span>
                    </div>
                    <div className={isDiff ? 'bg-amber-200/60 rounded-md' : ''}>
                      <span className="text-[9px] text-amber-800 font-bold block">مغربی</span>
                      <span className="font-mono font-bold text-amber-900">{letter.abjadMaghribi}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-500 font-bold block">ملفوظی</span>
                      <span className="font-mono font-bold text-indigo-900">{letter.malfootiAdad}</span>
                    </div>
                  </div>

                  {/* Planetary & Lunar Mansion Info */}
                  <div className="text-[11px] text-gray-700 space-y-1 font-medium border-t border-[#d4a373]/20 pt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">کوکب:</span>
                      <span className="font-bold text-[#5d4037]">{letter.planetUrdu}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">منزل:</span>
                      <span className="font-bold text-[#bc6c25]">{letter.lunarMansionName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">عضو:</span>
                      <span className="text-gray-800">{letter.bodyOrgan}</span>
                    </div>
                  </div>

                  {/* Spiritual Domain */}
                  <div className="text-[10px] text-emerald-900 bg-emerald-50/70 p-1.5 rounded-lg font-medium line-clamp-1" title={letter.spiritualDomain}>
                    {letter.spiritualDomain}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: SPIRITUAL EXTRACTIONS & DIVINE NAMES (المستخرجات الروحانیة)
         ========================================================================= */}
      {activeTab === 'spiritual-extractions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Extractions Cards (LG: 7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Muwakkil & Spirits Card */}
              <div className="rounded-2xl border-2 border-emerald-600 bg-gradient-to-br from-emerald-50 via-teal-50 to-white p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                  <h3 className="font-amiri text-xl font-bold text-emerald-950 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-emerald-600" />
                    <span>المستخرجات النورانية والملائكية (Angelic & Spiritual Extractions)</span>
                  </h3>
                  <span className="text-xs bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full font-bold">
                    قواعدِ جفرِ عربی
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Upper Angel */}
                  <div className="p-3.5 rounded-xl bg-white border border-emerald-300 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800">الملك الروحاني العلوي (موکلِ علوی):</span>
                      <button
                        onClick={() => handleCopy(analysis.muwakkilUlwi, 'muwakkil-ulwi')}
                        className="text-[11px] text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-bold cursor-pointer"
                      >
                        {copiedKey === 'muwakkil-ulwi' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>کاپی</span>
                      </button>
                    </div>
                    <div className="font-amiri text-2xl font-bold text-emerald-900">
                      {analysis.muwakkilUlwi}
                    </div>
                    <p className="text-[11px] text-gray-600">
                      اسمِ عبارت کے کل اعدادِ جمل ({analysis.totalKabirMashriqi}) کے استخراجی حروف مع لاحقہ "ائیل"۔
                    </p>
                  </div>

                  {/* Lower Servant */}
                  <div className="p-3.5 rounded-xl bg-white border border-amber-300 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900">الخادم الأرضي والسفلي (عونِ ارضی):</span>
                      <button
                        onClick={() => handleCopy(analysis.muwakkilSifli, 'muwakkil-sifli')}
                        className="text-[11px] text-amber-700 hover:text-amber-900 flex items-center gap-1 font-bold cursor-pointer"
                      >
                        {copiedKey === 'muwakkil-sifli' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>کاپی</span>
                      </button>
                    </div>
                    <div className="font-amiri text-2xl font-bold text-amber-900">
                      {analysis.muwakkilSifli}
                    </div>
                    <p className="text-[11px] text-gray-600">
                      اعدادِ صغیر و عناصر کی باطنی روح مع لاحقہ "طوش"۔
                    </p>
                  </div>

                  {/* Talismanic Word */}
                  <div className="p-3.5 rounded-xl bg-white border border-purple-200 shadow-2xs space-y-1">
                    <span className="text-xs font-bold text-purple-900 block">الكلمة الطلسمية الجامعة (طلسمِ کلمہ):</span>
                    <div className="font-amiri text-2xl font-bold text-purple-900">
                      {analysis.talsamWord}
                    </div>
                  </div>
                </div>
              </div>

              {/* Complete Arabic Azimah Box */}
              <div className="rounded-2xl border-2 border-[#d4a373] bg-[#fdfaf1] p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#d4a373]/30">
                  <h4 className="text-xs font-bold text-[#5d4037] flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-[#bc6c25]" />
                    <span>العزيمة العربية الجامعة للعمل (عزیمتِ استخراجِ عربیہ)</span>
                  </h4>
                  <button
                    onClick={() => handleCopy(customArabicAzimah, 'azimah-arabic')}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#bc6c25] hover:bg-[#a2591d] text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    {copiedKey === 'azimah-arabic' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>عزیمت کاپی کریں</span>
                  </button>
                </div>
                <p className="font-amiri text-base font-bold text-[#2c1e14] leading-relaxed p-3 bg-white rounded-xl border border-[#d4a373]/40 shadow-inner">
                  {customArabicAzimah}
                </p>
              </div>
            </div>

            {/* Right Column: Closest Divine Names & Numerological Compatibility (LG: 5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border-2 border-amber-400 bg-white p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                  <h3 className="font-amiri text-lg font-bold text-amber-950 flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-600" />
                    <span>أسماء الله الحسنى المتوافقة بالعدد</span>
                  </h3>
                  <span className="text-xs text-amber-800 font-bold">
                    عدد مطلوب: {analysis.totalKabirMashriqi}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {analysis.matchingDivineNames.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-amiri text-lg font-bold text-[#5d4037] block">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-gray-600">
                          {ARABIC_DIVINE_NAMES_LIST.find(d => d.name === item.name)?.urduMeaning}
                        </span>
                      </div>
                      <div className="text-left font-mono">
                        <span className="font-bold text-amber-900 block">{item.adad} عدد</span>
                        <span className="text-[10px] text-gray-500">
                          {item.diff === 0 ? '★ مطابقتِ تامہ' : `فرق: ${item.diff}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 4: BAST & ARABIC EXPANSION WORKSHOP (بسط الحروف والتکسیر)
         ========================================================================= */}
      {activeTab === 'bast-workshop' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bast Malfooti Card */}
            <div className="rounded-2xl border-2 border-indigo-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
                <h3 className="font-amiri text-xl font-bold text-indigo-950 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-indigo-600" />
                  <span>۱. البسط الملفوظي والعددي للعبارة</span>
                </h3>
                <span className="text-xs text-indigo-800 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-full">
                  تلفظِ حروف
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-1">
                  <span className="font-bold text-indigo-900 block">حروفِ ملفوظی کا بسط:</span>
                  <div className="font-amiri text-lg font-bold text-[#5d4037] leading-relaxed">
                    {analysis.letterBreakdown.map(l => l.nameArabic).join(' - ')}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#fdfaf1] border border-[#d4a373]/30 space-y-1">
                  <span className="font-bold text-[#5d4037] block">تفريد الحروف (تفکیکِ حروف):</span>
                  <div className="font-amiri text-xl font-bold text-[#bc6c25] tracking-widest">
                    {analysis.lettersList.join(' ')}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-900 block">معکوسِ عبارت (تکسیر معکوس):</span>
                  <div className="font-amiri text-xl font-bold text-amber-950 tracking-widest">
                    {[...analysis.lettersList].reverse().join(' ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Adad to Arabic Letters Converter */}
            <div className="rounded-2xl border-2 border-[#d4a373] bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#d4a373]/30">
                <h3 className="font-amiri text-xl font-bold text-[#5d4037] flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#bc6c25]" />
                  <span>۲. تحويل الأعداد إلى حروف جفرية (Adad to Letters)</span>
                </h3>
                <span className="text-xs text-[#bc6c25] font-bold">استخراجِ مراتب</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#5d4037] mb-1">
                    کوئی بھی حسابی عدد درج کریں جس کے جفری حروف نکالنے ہیں:
                  </label>
                  <input
                    type="number"
                    value={customAdadInput}
                    onChange={(e) => setCustomAdadInput(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl border border-[#d4a373] px-3 py-2 text-sm font-mono font-bold text-[#5d4037]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-center space-y-1">
                  <span className="text-xs text-amber-800 font-bold block">مستخرج جفری حروف:</span>
                  <div className="font-amiri text-3xl font-bold text-[#bc6c25] tracking-widest">
                    {numberToArabicJafrLetters(customAdadInput) || 'صفر'}
                  </div>
                  <div className="text-[11px] text-gray-600 mt-1">
                    موکلِ علوی: <strong>{numberToArabicJafrLetters(customAdadInput)}ائیل</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 5: HISTORICAL RULES & MAGHRIBI ESSENCE (قواعد و تاریخ)
         ========================================================================= */}
      {activeTab === 'history-rules' && (
        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-[#d4a373] bg-white p-5 shadow-sm space-y-4">
            <h3 className="font-amiri text-2xl font-bold text-[#5d4037] border-b border-[#d4a373]/30 pb-2">
              تاریخ، اصول و موازنۂ ابجدِ مشرقی بمقابلہ ابجدِ مغربی
            </h3>

            <div className="space-y-4 text-xs text-[#5d4037] leading-relaxed">
              {ARABIC_ABJAD_SYSTEMS_INFO.map((sys) => (
                <div key={sys.id} className="p-4 rounded-2xl bg-[#fdfaf1] border border-[#d4a373]/50 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-amiri text-lg font-bold text-[#bc6c25]">
                      {sys.titleUrdu}
                    </h4>
                    <span className="text-[11px] bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-bold">
                      {sys.rhymeSequence}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {sys.historicalContext}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 pr-2">
                    {sys.keyDifferences.map((kd, i) => (
                      <li key={i} className="font-medium">{kd}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
