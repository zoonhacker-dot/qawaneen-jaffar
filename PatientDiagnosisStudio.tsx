import React, { useState, useMemo } from 'react';
import { 
  diagnosePatientJafrAndTibb, 
  COMMON_SYMPTOMS,
  CHRONIC_DISEASES 
} from '../utils/patientDiagnosisEngine';
import { PatientDiagnosisResult } from '../types';
import { 
  HeartPulse, 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Flame, 
  Droplet, 
  Wind, 
  Mountain, 
  User, 
  CheckCircle, 
  AlertTriangle, 
  Printer, 
  ArrowRight,
  BookOpen,
  Clock,
  Pill,
  Activity,
  Stethoscope,
  Info,
  Search,
  Smile,
  Shield,
  Eye,
  Volume2
} from 'lucide-react';

interface PatientDiagnosisStudioProps {
  onSendToNaqsh?: (adad: number) => void;
  onSendToTakseer?: (text: string) => void;
}

export const PatientDiagnosisStudio: React.FC<PatientDiagnosisStudioProps> = ({
  onSendToNaqsh,
  onSendToTakseer,
}) => {
  const [patientName, setPatientName] = useState<string>('محمد علی');
  const [motherName, setMotherName] = useState<string>('فاطمہ');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>('heart_cardiovascular');
  const [diseaseSearchQuery, setDiseaseSearchQuery] = useState<string>('');
  const [diseaseCategoryFilter, setDiseaseCategoryFilter] = useState<string>('all');
  
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'unexplained_palpitation',
    'headache_heaviness',
    'stomach_digestive_heat',
  ]);
  const [activeTab, setActiveTab] = useState<'all' | 'disease_protocol' | 'herbal' | 'homeopathic' | 'allopathic' | 'spiritual' | 'sahar_investigation' | 'naqsh'>('all');

  const [diagnosisResult, setDiagnosisResult] = useState<PatientDiagnosisResult>(() => {
    return diagnosePatientJafrAndTibb(patientName, motherName, selectedSymptoms, gender, selectedDiseaseId);
  });

  const handleRunDiagnosis = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const res = diagnosePatientJafrAndTibb(patientName, motherName, selectedSymptoms, gender, selectedDiseaseId);
    setDiagnosisResult(res);
  };

  const handleSelectDisease = (id: string) => {
    setSelectedDiseaseId(id);
    const res = diagnosePatientJafrAndTibb(patientName, motherName, selectedSymptoms, gender, id);
    setDiagnosisResult(res);
  };

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const diseaseCategories = [
    { key: 'all', label: 'تمام امراض' },
    { key: 'heart_circulatory', label: 'دل و دورانِ خون' },
    { key: 'joints_bones', label: 'گھٹنے و جوڑ' },
    { key: 'chest_respiratory', label: 'سینہ، دمہ و کھانسی' },
    { key: 'liver_digestive', label: 'جگر و یرقان' },
    { key: 'brain_mental', label: 'دماغ، چڑچڑاہٹ و وسوسے' },
    { key: 'eyes_ears', label: 'آنکھ، کان و بہرہ پن' },
    { key: 'face_beauty', label: 'چہرہ، جھریاں و ہونٹ' },
    { key: 'male_health', label: 'صحتِ مردانہ و باہ' },
    { key: 'female_health', label: 'امراضِ نسواں' },
    { key: 'cancer_chronic', label: 'کینسر و شوگر و مزمنہ' },
  ];

  const filteredDiseases = useMemo(() => {
    return CHRONIC_DISEASES.filter((dis) => {
      const matchesCategory =
        diseaseCategoryFilter === 'all' || dis.categoryKey === diseaseCategoryFilter;
      const q = diseaseSearchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        dis.labelUrdu.toLowerCase().includes(q) ||
        dis.categoryUrdu.toLowerCase().includes(q) ||
        dis.descriptionUrdu.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [diseaseCategoryFilter, diseaseSearchQuery]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Top Banner */}
      <div className="rounded-3xl border-2 border-[#d4a373] bg-[#f2e8cf] p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-[#bc6c25] text-white shadow-sm">
                <HeartPulse className="h-6 w-6" />
              </span>
              <h2 className="font-amiri text-2xl md:text-3xl font-bold text-[#5d4037]">
                جامع کلینک: تشخیصِ امراض، طبِ نبوی ﷺ، یونانی اکسیر، ہومیوپیتھی و علاجِ کامل
              </h2>
            </div>
            <p className="mt-1 text-xs md:text-sm text-[#8d6e63] max-w-5xl font-medium leading-relaxed">
              دل کی بیماریاں، گھٹنے و جوڑ، سینہ، دمہ، نزلہ زکام، کھانسی، ٹونسلز، کالا و پیلا یرقان، جگر، دماغی کمزوری و چڑچڑا پن، آنکھ، بہرہ پن، کینسر و رسولیاں، چہرے کی رنگت، فائن لائنز، جھریاں، ڈھلکی جلد، کالے و موٹے ہونٹ، مردانہ کمزوری و ٹائمنگ اور امراضِ زنانہ و مردانہ کے 100% محفوظ و شافی پروٹوکولز۔
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#ffffff] border border-[#bc6c25] px-4 py-2 rounded-2xl text-xs font-bold text-[#5d4037] shadow-xs shrink-0">
            <ShieldCheck className="h-4 w-4 text-[#283618]" />
            <span>طب یونانی + طبِ نبوی ﷺ + ہومیوپیتھی + جفر</span>
          </div>
        </div>
      </div>

      {/* Input Form & Selection */}
      <div className="rounded-3xl border-2 border-[#bc6c25]/50 bg-[#ffffff] p-6 shadow-sm">
        <form onSubmit={handleRunDiagnosis} className="space-y-6">
          {/* Row 1: Patient Name, Mother Name, Gender */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Patient Name */}
            <div>
              <label className="block text-xs font-bold text-[#5d4037] mb-1.5 flex items-center gap-1.5">
                <User className="h-4 w-4 text-[#bc6c25]" />
                <span>مریض کا نام:</span>
              </label>
              <input
                id="input-patient-name"
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="مثلاً: محمد علی"
                className="w-full rounded-2xl border-2 border-[#d4a373] bg-[#fdfaf1] px-4 py-2.5 text-base font-amiri font-bold text-[#5d4037] focus:border-[#bc6c25] focus:outline-none"
                required
              />
            </div>

            {/* Mother Name */}
            <div>
              <label className="block text-xs font-bold text-[#5d4037] mb-1.5 flex items-center gap-1.5">
                <User className="h-4 w-4 text-[#bc6c25]" />
                <span>والدہ کا نام (Mother's Name):</span>
              </label>
              <input
                id="input-mother-name"
                type="text"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                placeholder="مثلاً: فاطمہ"
                className="w-full rounded-2xl border-2 border-[#d4a373] bg-[#fdfaf1] px-4 py-2.5 text-base font-amiri font-bold text-[#5d4037] focus:border-[#bc6c25] focus:outline-none"
                required
              />
              <span className="text-[10px] text-[#8d6e63] mt-1 block">
                * نامعلوم ہونے کی صورت میں "حوا" درج رہے گا۔
              </span>
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-xs font-bold text-[#5d4037] mb-1.5 flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-[#bc6c25]" />
                <span>مریض کی جنس (Gender):</span>
              </label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border-2 ${
                    gender === 'male'
                      ? 'bg-[#bc6c25] text-white border-[#bc6c25] shadow-xs'
                      : 'bg-[#fdfaf1] text-[#5d4037] border-[#d4a373] hover:bg-[#faedcd]'
                  }`}
                >
                  <span>👨 مرد (مذکر)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border-2 ${
                    gender === 'female'
                      ? 'bg-[#bc6c25] text-white border-[#bc6c25] shadow-xs'
                      : 'bg-[#fdfaf1] text-[#5d4037] border-[#d4a373] hover:bg-[#faedcd]'
                  }`}
                >
                  <span>👩 عورت (مونث)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Comprehensive Disease Library & Categorized Selector */}
          <div className="bg-[#fdfaf1] p-5 rounded-3xl border-2 border-[#d4a373]/70 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-[#e7d8c9]">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-[#bc6c25]" />
                <span className="font-bold text-sm text-[#5d4037]">
                  بیماری / مرض کا انتخاب کریں (جامع انسائیکلوپیڈیا):
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  value={diseaseSearchQuery}
                  onChange={(e) => setDiseaseSearchQuery(e.target.value)}
                  placeholder="مرض تلاش کریں (مثلاً: دل، گھٹنے، ہونٹ، کینسر، چہرہ)..."
                  className="w-full pl-3 pr-9 py-1.5 rounded-xl border border-[#d4a373] bg-white text-xs text-[#5d4037] focus:outline-none focus:border-[#bc6c25]"
                />
                <Search className="h-4 w-4 text-[#bc6c25] absolute right-2.5 top-2.5" />
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-1 scrollbar-thin">
              {diseaseCategories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setDiseaseCategoryFilter(cat.key)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    diseaseCategoryFilter === cat.key
                      ? 'bg-[#bc6c25] text-white shadow-xs'
                      : 'bg-white text-[#7f5539] border border-[#e7d8c9] hover:bg-[#faedcd]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid of Disease Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredDiseases.map((dis) => {
                const isSelected = selectedDiseaseId === dis.id;
                return (
                  <button
                    key={dis.id}
                    type="button"
                    onClick={() => handleSelectDisease(dis.id)}
                    className={`text-right p-3.5 rounded-2xl border-2 text-xs transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#faedcd] border-[#bc6c25] text-[#5d4037] shadow-sm ring-2 ring-[#bc6c25]/30'
                        : 'bg-white border-[#e7d8c9] text-[#7f5539] hover:bg-[#faedcd]/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1 w-full">
                      <span className="font-bold text-[#5d4037] text-xs leading-snug">
                        {dis.labelUrdu}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap shrink-0 ${isSelected ? 'bg-[#bc6c25] text-white' : 'bg-[#e7d8c9] text-[#5d4037]'}`}>
                        {dis.categoryUrdu}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8d6e63] leading-snug line-clamp-2 mt-1">
                      {dis.descriptionUrdu}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Common Symptoms Selector */}
          <div>
            <label className="block text-xs font-bold text-[#5d4037] mb-2 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#bc6c25]" />
              <span>مریض کی موجودہ علامات و کیفیات (مزاج و تشخیص کے لیے منتخب کریں):</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {COMMON_SYMPTOMS.map((symptom) => {
                const isSelected = selectedSymptoms.includes(symptom.id);
                return (
                  <button
                    key={symptom.id}
                    type="button"
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`text-right p-3 rounded-2xl border text-xs font-medium transition-all cursor-pointer flex items-start gap-2 ${
                      isSelected
                        ? 'bg-[#faedcd] border-[#bc6c25] text-[#5d4037] font-bold shadow-xs'
                        : 'bg-[#fdfaf1] border-[#e7d8c9] text-[#7f5539] hover:bg-[#faedcd]/40'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#bc6c25] border-[#bc6c25] text-white font-bold' : 'border-[#d4a373]'
                      }`}
                    >
                      {isSelected && '✓'}
                    </span>
                    <span className="leading-snug">{symptom.labelUrdu}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-[#8d6e63]">
              <Info className="h-4 w-4 text-[#bc6c25]" />
              <span>تمام نسخہ جات اور ہومیوپیتھک، نبوی ﷺ و یونانی تراکیب 100% بے ضرر اور آزمودہ ہیں۔</span>
            </div>
            <button
              id="btn-run-diagnosis"
              type="submit"
              className="flex items-center gap-2 bg-[#bc6c25] hover:bg-[#a2591d] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer transform hover:scale-[1.02]"
            >
              <HeartPulse className="h-5 w-5" />
              <span>تشخیص و شافی علاج (روحانی، جسمانی، ہومیوپیتھک) نکالیں</span>
            </button>
          </div>
        </form>
      </div>

      {/* DIAGNOSIS OUTPUT DASHBOARD */}
      {diagnosisResult && (
        <div className="space-y-6">
          {/* Action Bar (Print / Filter) */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#d4a373] shadow-xs">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold text-[#5d4037] shrink-0">دیکھیں:</span>
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'all' ? 'bg-[#bc6c25] text-white' : 'bg-[#fdfaf1] text-[#5d4037] hover:bg-[#faedcd]'
                }`}
              >
                تمام تفصیلات
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('disease_protocol')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'disease_protocol' ? 'bg-[#bc6c25] text-white' : 'bg-[#fdfaf1] text-[#5d4037] hover:bg-[#faedcd]'
                }`}
              >
                شافی پروٹوکول
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('herbal')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'herbal' ? 'bg-[#bc6c25] text-white' : 'bg-[#fdfaf1] text-[#5d4037] hover:bg-[#faedcd]'
                }`}
              >
                یونانی جڑی بوٹیاں
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('homeopathic')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'homeopathic' ? 'bg-[#bc6c25] text-white' : 'bg-[#fdfaf1] text-[#5d4037] hover:bg-[#faedcd]'
                }`}
              >
                ہومیوپیتھک علاج
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('spiritual')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'spiritual' ? 'bg-[#bc6c25] text-white' : 'bg-[#fdfaf1] text-[#5d4037] hover:bg-[#faedcd]'
                }`}
              >
                روحانی علاج و وظائف
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sahar_investigation')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'sahar_investigation' ? 'bg-[#bc6c25] text-white' : 'bg-[#fdfaf1] text-[#5d4037] hover:bg-[#faedcd]'
                }`}
              >
                تحقیقِ سحر و نظر
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-[#5d4037] hover:bg-[#3d2b1f] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
            >
              <Printer className="h-4 w-4 text-[#dda15e]" />
              <span>مریض نسخہ رپورٹ پرنٹ کریں</span>
            </button>
          </div>

          {/* Top Calculations Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="bg-[#ffffff] border border-[#d4a373] p-3.5 rounded-2xl shadow-xs text-center">
              <span className="text-[11px] text-[#8d6e63] font-bold block">مریض ({diagnosisResult.genderUrdu})</span>
              <span className="font-amiri text-2xl font-bold text-[#bc6c25] mt-0.5 block">
                {diagnosisResult.totalAdadPatient}
              </span>
              <span className="text-[10px] text-[#5d4037] font-medium">{diagnosisResult.patientName}</span>
            </div>

            <div className="bg-[#ffffff] border border-[#d4a373] p-3.5 rounded-2xl shadow-xs text-center">
              <span className="text-[11px] text-[#8d6e63] font-bold block">والدہ کے اعداد</span>
              <span className="font-amiri text-2xl font-bold text-[#bc6c25] mt-0.5 block">
                {diagnosisResult.totalAdadMother}
              </span>
              <span className="text-[10px] text-[#5d4037] font-medium">{diagnosisResult.motherName}</span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#bc6c25] p-3.5 rounded-2xl shadow-sm text-center bg-gradient-to-br from-[#fefae0] to-[#faedcd]">
              <span className="text-[11px] text-[#5d4037] font-bold block">میزانِ کل (مجموعہ اعداد)</span>
              <span className="font-amiri text-2xl font-bold text-[#283618] mt-0.5 block">
                {diagnosisResult.combinedTotalAdad}
              </span>
              <span className="text-[10px] text-[#8d6e63] font-medium">مجموعۂ ابجد</span>
            </div>

            <div className="bg-[#ffffff] border border-[#d4a373] p-3.5 rounded-2xl shadow-xs text-center">
              <span className="text-[11px] text-[#8d6e63] font-bold block">مزاج و خلطِ غالب</span>
              <span className="font-amiri text-lg font-bold text-[#5d4037] mt-0.5 block">
                {diagnosisResult.temperamentProfile.mizajUrdu}
              </span>
              <span className="text-[10px] text-[#bc6c25] font-bold">{diagnosisResult.temperamentProfile.khiltGhalibUrdu}</span>
            </div>

            <div className="bg-[#ffffff] border border-[#d4a373] p-3.5 rounded-2xl shadow-xs text-center col-span-2 sm:col-span-1">
              <span className="text-[11px] text-[#8d6e63] font-bold block">برج و کوکبِ حاکم</span>
              <span className="font-amiri text-base font-bold text-[#5d4037] mt-0.5 block">
                {diagnosisResult.burjUrdu}
              </span>
              <span className="text-[10px] text-[#bc6c25] font-bold">حاکم: {diagnosisResult.governingPlanetUrdu}</span>
            </div>
          </div>

          {/* 1. DEDICATED DISEASE SPECIFIC PROTOCOL (شافی پروٹوکول) */}
          {(activeTab === 'all' || activeTab === 'disease_protocol') && diagnosisResult.diseaseSpecificProtocol && (
            <div className="rounded-3xl border-2 border-[#bc6c25] bg-gradient-to-br from-[#fefae0] via-[#faedcd]/40 to-[#ffffff] p-6 shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#d4a373]">
                <div className="flex items-center gap-2.5">
                  <span className="p-2.5 rounded-2xl bg-[#bc6c25] text-white shadow-xs">
                    <HeartPulse className="h-6 w-6" />
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-[#bc6c25] block">
                      شافی و حتمی پروٹوکول برائے مریض: {diagnosisResult.patientName} ({diagnosisResult.genderUrdu})
                    </span>
                    <h3 className="font-amiri text-xl md:text-2xl font-bold text-[#5d4037]">
                      {diagnosisResult.diseaseSpecificProtocol.diseaseTitleUrdu}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-[#bc6c25] text-xs font-bold text-[#283618] shrink-0">
                  <CheckCircle className="h-4 w-4 text-[#283618]" />
                  <span>100% محفوظ و سائیڈ ایفیکٹس سے پاک</span>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {/* 1. Rohani Amal */}
                <div className="bg-white p-4 rounded-2xl border border-[#e7d8c9] shadow-xs">
                  <div className="flex items-center gap-2 text-[#bc6c25] font-bold text-xs mb-1.5">
                    <Sparkles className="h-4 w-4" />
                    <span>۱. شافی روحانی عمل، آیاتِ شفا و مسنون تلاوت (Spiritual Cure):</span>
                  </div>
                  <p className="font-amiri text-base font-bold text-[#5d4037] leading-relaxed">
                    {diagnosisResult.diseaseSpecificProtocol.rohaniAmalUrdu}
                  </p>
                </div>

                {/* 2. Tibb-e-Nabawi & Herbal Safe Formula */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-[#ccd5ae] shadow-xs">
                    <div className="flex items-center gap-2 text-[#283618] font-bold text-xs mb-1.5">
                      <Leaf className="h-4 w-4" />
                      <span>۲. طبِ نبوی ﷺ کا مسنون نسخہ (Prophetic Medicine):</span>
                    </div>
                    <p className="text-xs md:text-sm text-[#5d4037] font-medium leading-relaxed">
                      {diagnosisResult.diseaseSpecificProtocol.tibbNabawiUrdu}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#d4a373] shadow-xs">
                    <div className="flex items-center gap-2 text-[#bc6c25] font-bold text-xs mb-1.5">
                      <Pill className="h-4 w-4" />
                      <span>۳. محفوظ یونانی جڑی بوٹیوں کا تریاق نسخہ (Herbal Formulation):</span>
                    </div>
                    <p className="text-xs md:text-sm text-[#5d4037] font-medium leading-relaxed">
                      {diagnosisResult.diseaseSpecificProtocol.herbalSafeFormulaUrdu}
                    </p>
                  </div>
                </div>

                {/* 3. Homeopathic Specific & Mechanism */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-[#e7d8c9] shadow-xs">
                    <div className="flex items-center gap-2 text-[#023e8a] font-bold text-xs mb-1.5">
                      <Droplet className="h-4 w-4" />
                      <span>۴. ہومیوپیتھک خصوصی قطرے و دوائیں (Homeopathic Drops):</span>
                    </div>
                    <p className="text-xs md:text-sm text-[#5d4037] font-medium leading-relaxed">
                      {diagnosisResult.diseaseSpecificProtocol.homeopathicSpecificUrdu}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#e7d8c9] shadow-xs">
                    <div className="flex items-center gap-2 text-[#5d4037] font-bold text-xs mb-1.5">
                      <Activity className="h-4 w-4" />
                      <span>۵. سائنسی و حیاتیاتی میکانزم (Biological Action):</span>
                    </div>
                    <p className="text-xs md:text-sm text-[#5d4037] font-medium leading-relaxed">
                      {diagnosisResult.diseaseSpecificProtocol.scientificMechanismUrdu}
                    </p>
                  </div>
                </div>

                {/* 4. Dietary Dos and Donts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#f2f7ed] p-4 rounded-2xl border border-[#ccd5ae]">
                    <span className="text-xs font-bold text-[#283618] block mb-2">
                      ✅ مفید غذائیں و معمولات (Dietary Dos):
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#5d4037]">
                      {diagnosisResult.diseaseSpecificProtocol.dietaryDosUrdu.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-[#283618] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#fff1f2] p-4 rounded-2xl border border-[#fecdd3]">
                    <span className="text-xs font-bold text-[#9d0208] block mb-2">
                      ❌ سخت پرہیز و نقصان دہ اشیاء (Strict Prohibitions):
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#5d4037]">
                      {diagnosisResult.diseaseSpecificProtocol.dietaryDontsUrdu.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <AlertTriangle className="h-3.5 w-3.5 text-[#9d0208] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. TEMPERAMENT & MULTI-DISCIPLINE SECTION (یونانی + ہومیوپیتھک + ایلوپیتھک) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* HERBAL & TIBB-E-UNANI */}
            {(activeTab === 'all' || activeTab === 'herbal') && (
              <div className="bg-[#ffffff] rounded-3xl p-6 border-2 border-[#606c38] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#ccd5ae]">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-[#dce4c9] text-[#283618]">
                        <Leaf className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="font-amiri text-xl font-bold text-[#283618]">
                          جڑی بوٹیاں و یونانی نسخہ (بحسابِ مزاج)
                        </h4>
                        <span className="text-[11px] text-[#606c38] font-bold">
                          اصولِ علاج: {diagnosisResult.temperamentProfile.safePrinciplesUrdu}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-[#faedcd] text-[#5d4037] px-2.5 py-1 rounded-full">
                      {diagnosisResult.temperamentProfile.mizajUrdu}
                    </span>
                  </div>

                  <div className="mt-4 bg-[#fdfaf1] p-3 rounded-2xl border border-[#e7d8c9]">
                    <span className="text-[11px] font-bold text-[#8d6e63] block">تجویز کردہ یونانی فارمولا:</span>
                    <h5 className="font-amiri text-base font-bold text-[#5d4037] mt-0.5">
                      {diagnosisResult.physicalHerbalCure.herbalFormulaNameUrdu}
                    </h5>
                  </div>

                  {/* Herbs Table */}
                  <div className="mt-4 space-y-2">
                    <span className="text-xs font-bold text-[#283618] block">جڑی بوٹیوں کی تفصیل و مقدار:</span>
                    {diagnosisResult.physicalHerbalCure.herbsListUrdu.map((herb, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-[#ffffff] border border-[#e7d8c9] flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-bold text-[#5d4037]">{herb.name}</span>
                          <span className="text-[11px] text-[#8d6e63] block mt-0.5">{herb.benefits}</span>
                        </div>
                        <span className="font-bold bg-[#dce4c9] text-[#283618] px-2 py-0.5 rounded-md shrink-0">
                          {herb.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Preparation method */}
                  <div className="mt-4 p-3.5 bg-[#fdfaf1] rounded-2xl border border-[#e7d8c9] text-xs">
                    <span className="font-bold text-[#bc6c25] block mb-1">طریقۂ تیاری و استعمال:</span>
                    <p className="text-[#5d4037] leading-relaxed">
                      {diagnosisResult.physicalHerbalCure.preparationMethodUrdu}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#ccd5ae] text-[11px] text-[#606c38] italic">
                  {diagnosisResult.physicalHerbalCure.tibbEUnaniTemperamentNotes}
                </div>
              </div>
            )}

            {/* HOMEOPATHIC SYSTEM OF MEDICINE */}
            {(activeTab === 'all' || activeTab === 'homeopathic') && (
              <div className="bg-[#ffffff] rounded-3xl p-6 border-2 border-[#023e8a]/40 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#caf0f8]">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-[#e0f2fe] text-[#023e8a]">
                        <Droplet className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="font-amiri text-xl font-bold text-[#023e8a]">
                          ہومیوپیتھک علاج (Homeopathic System)
                        </h4>
                        <span className="text-[11px] text-[#0077b6] font-bold">
                          محفوظ قطرے، پوٹینسیز و بائیو کیمک نمکیات
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-[#e0f2fe] text-[#023e8a] px-2.5 py-1 rounded-full">
                      جرمن طریقۂ علاج
                    </span>
                  </div>

                  <div className="mt-4 bg-[#f0f9ff] p-3 rounded-2xl border border-[#bae6fd]">
                    <span className="text-[11px] font-bold text-[#0369a1] block">مرکبِ علاج:</span>
                    <h5 className="font-amiri text-base font-bold text-[#0c4a6e] mt-0.5">
                      {diagnosisResult.homeopathicCure.formulaTitleUrdu}
                    </h5>
                  </div>

                  {/* Remedies List */}
                  <div className="mt-4 space-y-2.5">
                    {diagnosisResult.homeopathicCure.remedies.map((rem, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-[#e0f2fe] shadow-xs text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[#023e8a] text-sm">{rem.name}</span>
                          <span className="bg-[#023e8a] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                            طاقت: {rem.potency}
                          </span>
                        </div>
                        <span className="text-[#5d4037] font-medium block">{rem.indicationUrdu}</span>
                        <span className="text-[#0369a1] font-bold text-[11px] block mt-1">مقدارِ خوراک: {rem.dosage}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3.5 bg-[#f0f9ff] rounded-2xl border border-[#bae6fd] text-xs">
                    <span className="font-bold text-[#0369a1] block mb-1">عام ہدایات برائے ہومیوپیتھی:</span>
                    <p className="text-[#5d4037] leading-relaxed">
                      {diagnosisResult.homeopathicCure.generalInstructionsUrdu}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#e0f2fe] text-[11px] text-[#0369a1] italic">
                  * تمام ہومیوپیتھک ادویات قدرتی توانائیوں کے اصول "Similia Similibus Curentur" پر کام کرتی ہیں۔
                </div>
              </div>
            )}
          </div>

          {/* 3. ALLOPATHIC & CLINICAL LAB GUIDELINES */}
          {(activeTab === 'all' || activeTab === 'allopathic') && (
            <div className="rounded-3xl border-2 border-[#457b9d] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#e7d8c9]">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-[#e0f2fe] text-[#457b9d]">
                    <Stethoscope className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-amiri text-xl font-bold text-[#1d3557]">
                      ایلوپیتھک رہنمائی و لیبارٹری ٹیسٹس (Allopathic Diagnostic Guidelines)
                    </h4>
                    <span className="text-[11px] text-[#457b9d] font-bold">
                      جدید میڈیکل سائنس و احتیاطی تدابیر
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-[#fdfaf1] p-4 rounded-2xl border border-[#e7d8c9]">
                  <span className="font-bold text-[#1d3557] block mb-1.5">کلینیکل جائزہ (Overview):</span>
                  <p className="text-[#5d4037] leading-relaxed">
                    {diagnosisResult.allopathicGuidelines.clinicalOverviewUrdu}
                  </p>
                </div>

                <div className="bg-[#fdfaf1] p-4 rounded-2xl border border-[#e7d8c9]">
                  <span className="font-bold text-[#1d3557] block mb-1.5">تجویز کردہ لیب ٹیسٹس:</span>
                  <ul className="space-y-1 text-[#5d4037]">
                    {diagnosisResult.allopathicGuidelines.recommendedLabTests.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-[#457b9d] font-bold">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#fdfaf1] p-4 rounded-2xl border border-[#e7d8c9]">
                  <span className="font-bold text-[#9d0208] block mb-1.5">حفاظتی احتیاط و طبی نگہداشت:</span>
                  <p className="text-[#5d4037] leading-relaxed">
                    {diagnosisResult.allopathicGuidelines.safetyPrecautionsUrdu}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. SPIRITUAL HEALING & REMEDIES (روحانی وظائف و صدقات) */}
          {(activeTab === 'all' || activeTab === 'spiritual') && (
            <div className="bg-[#ffffff] rounded-3xl p-6 border-2 border-[#bc6c25] shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#faedcd]">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-[#faedcd] text-[#bc6c25]">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-amiri text-xl font-bold text-[#5d4037]">
                      روحانی علاج، وظائف و صدقات
                    </h4>
                    <span className="text-[11px] text-[#8d6e63] font-bold">
                      ابطالِ سحر، دفعِ نظر، اور حصولِ شفاء
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold bg-[#dce4c9] text-[#283618] px-2.5 py-1 rounded-full">
                  اسمائے الٰہیہ
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Main Wazifa */}
                <div className="bg-[#fdfaf1] p-4 rounded-2xl border-2 border-[#bc6c25]/30 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#8d6e63] block">مخصوص ورد و اسمِ اعظم:</span>
                    <h5 className="font-amiri text-xl font-bold text-[#bc6c25] mt-1">
                      {diagnosisResult.spiritualCure.wazifaUrdu}
                    </h5>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#d4a373]/30">
                    <span className="text-xs font-bold bg-[#bc6c25] text-white px-2.5 py-0.5 rounded-full">
                      تعداد: {diagnosisResult.spiritualCure.wazifaCount} مرتبہ
                    </span>
                    {onSendToTakseer && (
                      <button
                        onClick={() => onSendToTakseer(diagnosisResult.spiritualCure.wazifaUrdu)}
                        className="flex items-center gap-1 text-xs font-bold text-[#bc6c25] hover:underline cursor-pointer"
                      >
                        <span>تکسیر میں لے جائیں</span>
                        <ArrowRight className="h-3 w-3 rotate-180" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Tilawat */}
                <div className="p-4 bg-[#fdfaf1] rounded-2xl border border-[#e7d8c9] text-xs">
                  <span className="font-bold text-[#5d4037] block mb-1">تلاوتِ کلامِ پاک و طریقۂ دم:</span>
                  <p className="text-[#5d4037] leading-relaxed">
                    {diagnosisResult.spiritualCure.tilaawatUrdu}
                  </p>
                </div>
              </div>

              {/* Sadqah, Incense, and Timing */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-[#fdfaf1] rounded-xl border border-[#e7d8c9]">
                  <span className="text-[#8d6e63] font-bold block mb-0.5">مستحب صدقہ:</span>
                  <span className="font-bold text-[#5d4037]">{diagnosisResult.spiritualCure.sadqahUrdu}</span>
                </div>

                <div className="p-3 bg-[#fdfaf1] rounded-xl border border-[#e7d8c9]">
                  <span className="text-[#8d6e63] font-bold block mb-0.5">مخصوص بخور (دھونی):</span>
                  <span className="font-bold text-[#bc6c25]">{diagnosisResult.spiritualCure.incenseUrdu}</span>
                </div>

                <div className="p-3 bg-[#fdfaf1] rounded-xl border border-[#e7d8c9]">
                  <span className="text-[#8d6e63] font-bold block mb-0.5">موافق دن:</span>
                  <span className="font-bold text-[#5d4037]">{diagnosisResult.spiritualCure.bestDaysUrdu}</span>
                </div>

                <div className="p-3 bg-[#fdfaf1] rounded-xl border border-[#e7d8c9]">
                  <span className="text-[#8d6e63] font-bold block mb-0.5">ساعتِ عمل:</span>
                  <span className="font-bold text-[#283618]">{diagnosisResult.spiritualCure.favorableHourUrdu}</span>
                </div>
              </div>
            </div>
          )}

          {/* 5. DEDICATED SAHAR & JADU DEEP INVESTIGATION PANEL */}
          {(activeTab === 'all' || activeTab === 'sahar_investigation') && diagnosisResult.saharDiagnosisDetails && (
            <div className="rounded-3xl border-2 border-[#9d0208] bg-gradient-to-br from-[#fff1f2] via-[#fff5eb] to-[#fefae0] p-6 shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#fecdd3]">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-[#9d0208] text-white shadow-xs">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-[#9d0208] block">جفری استخراجِ سحر و تفریقِ امراض</span>
                    <h3 className="font-amiri text-xl md:text-2xl font-bold text-[#5d4037]">
                      تفصیلی کشفِ سحر: کب سے لگا ہے؟ کرنے والا کون ہے؟ اور سحر بمقابلہ جسمانی مرض فرق
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-bold bg-[#9d0208] text-white px-3 py-1 rounded-full shrink-0">
                  قوانینِ سرّ المستور
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 1. Time Onset */}
                <div className="bg-white/90 p-4 rounded-2xl border border-[#fecdd3] shadow-xs">
                  <div className="flex items-center gap-2 text-[#9d0208] font-bold text-xs mb-1.5">
                    <Clock className="h-4 w-4" />
                    <span>کب سے مرض / سحر لگا ہے؟</span>
                  </div>
                  <p className="text-xs md:text-sm font-bold text-[#5d4037] leading-snug">
                    {diagnosisResult.saharDiagnosisDetails.timeOnsetDurationUrdu}
                  </p>
                  <span className="text-[10px] text-[#8d6e63] block mt-1">
                    * ادوارِ قمری و دورانیۂ اعدادِ ابجد کے مطابق استخراج
                  </span>
                </div>

                {/* 2. Perpetrator Characteristics */}
                <div className="bg-white/90 p-4 rounded-2xl border border-[#fecdd3] shadow-xs">
                  <div className="flex items-center gap-2 text-[#9d0208] font-bold text-xs mb-1.5">
                    <User className="h-4 w-4" />
                    <span>کرنے والے کی شناخت و طبع:</span>
                  </div>
                  <p className="text-xs md:text-sm font-bold text-[#5d4037] leading-snug">
                    {diagnosisResult.saharDiagnosisDetails.perpetratorProfileUrdu}
                  </p>
                  <span className="text-[10px] text-[#bc6c25] font-bold block mt-1">
                    سمت و عنصر: {diagnosisResult.saharDiagnosisDetails.perpetratorElementUrdu}
                  </span>
                </div>

                {/* 3. Sahar Category & Placement */}
                <div className="bg-white/90 p-4 rounded-2xl border border-[#fecdd3] shadow-xs">
                  <div className="flex items-center gap-2 text-[#9d0208] font-bold text-xs mb-1.5">
                    <Flame className="h-4 w-4" />
                    <span>نوعیتِ سحر و مقام:</span>
                  </div>
                  <p className="text-xs md:text-sm font-bold text-[#5d4037] leading-snug">
                    {diagnosisResult.saharDiagnosisDetails.saharTypeUrdu}
                  </p>
                  <span className="text-[10px] text-[#7f5539] block mt-1">
                    مقام: {diagnosisResult.saharDiagnosisDetails.saharLocationOrBurialUrdu}
                  </span>
                </div>
              </div>

              {/* 4. Full Distinction: Sahar vs Physical Illness Matrix */}
              <div className="mt-4 bg-white/95 p-4 rounded-2xl border-2 border-[#bc6c25]/40 shadow-xs">
                <div className="flex items-center gap-2 text-[#283618] font-bold text-xs mb-1.5">
                  <CheckCircle className="h-4 w-4 text-[#283618]" />
                  <span>کسوٹی: یہ سحر و آسیب ہے یا خالص جسمانی مرض؟ (Distinction Matrix)</span>
                </div>
                <p className="text-xs md:text-sm text-[#5d4037] font-medium leading-relaxed">
                  {diagnosisResult.saharDiagnosisDetails.distinctionMethodUrdu}
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#5d4037]">
                  <div className="p-2.5 rounded-xl bg-[#fdfaf1] border border-[#e7d8c9]">
                    <strong className="text-[#9d0208] block mb-0.5">علاماتِ سحرِ یقینی:</strong>
                    غروبِ آفتاب پر طبیعت خراب ہونا، تلاوتِ قرآن پر بے چینی، ادویات کا بے اثر ہونا، اور گھریلو نااتفاقی۔
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#fdfaf1] border border-[#e7d8c9]">
                    <strong className="text-[#283618] block mb-0.5">علاماتِ جسمانی مرض:</strong>
                    دوا کھانے پر مستقل افاقہ، غذا کی تبدیلی سے بہتری، اور تلاوت کے وقت دل کا پرسکون ہونا۔
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. RECOMMENDED NAQSH OF CURE (نقشِ شفاء مع مکمل جدول) */}
          {(activeTab === 'all' || activeTab === 'naqsh') && (
            <div className="rounded-3xl border-2 border-[#bc6c25] bg-gradient-to-br from-[#fefae0] to-[#faedcd] p-6 shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#d4a373]">
                <div>
                  <span className="text-xs font-bold bg-[#bc6c25] text-white px-3 py-0.5 rounded-full">
                    اکسیرِ شفاء
                  </span>
                  <h4 className="font-amiri text-2xl font-bold text-[#5d4037] mt-1">
                    {diagnosisResult.recommendedNaqsh.typeNameUrdu}
                  </h4>
                  <p className="text-xs text-[#7f5539] font-medium mt-0.5">
                    چال: <strong className="text-[#5d4037]">{diagnosisResult.recommendedNaqsh.chalNameUrdu}</strong> | مجموعی عدد مع اسم الشافی: <strong className="text-[#bc6c25]">{diagnosisResult.recommendedNaqsh.totalAdad}</strong>
                  </p>
                </div>

                {onSendToNaqsh && (
                  <button
                    onClick={() => onSendToNaqsh(diagnosisResult.recommendedNaqsh.totalAdad)}
                    className="flex items-center gap-2 bg-[#5d4037] hover:bg-[#3d2b1f] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer shrink-0"
                  >
                    <Printer className="h-4 w-4 text-[#dda15e]" />
                    <span>مکمل نقش سٹوڈیو میں دیکھیں و پرنٹ کریں</span>
                  </button>
                )}
              </div>

              {/* Visual 3x3 Grid Display */}
              <div className="mt-6 flex flex-col md:flex-row items-center justify-around gap-6">
                {/* Magic Square Table */}
                <div className="bg-[#ffffff] p-4 rounded-2xl border-2 border-[#bc6c25] shadow-md max-w-xs w-full">
                  <div className="text-center text-xs font-bold text-[#bc6c25] mb-2 font-amiri">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 bg-[#d4a373] p-1.5 rounded-xl">
                    {diagnosisResult.recommendedNaqsh.grid.map((row, rIdx) =>
                      row.map((val, cIdx) => (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          className="bg-[#fdfaf1] aspect-square flex items-center justify-center rounded-lg font-amiri text-lg font-bold text-[#5d4037] shadow-inner"
                        >
                          {val}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="text-center text-[10px] text-[#8d6e63] font-bold mt-2">
                    عنصر: {diagnosisResult.dominantElementUrdu} | سیاہی: {diagnosisResult.recommendedNaqsh.writingInk}
                  </div>
                </div>

                {/* Rules & Azimat */}
                <div className="space-y-3 max-w-lg text-xs">
                  <div className="bg-[#ffffff] p-3.5 rounded-2xl border border-[#d4a373]">
                    <span className="font-bold text-[#bc6c25] block mb-1">عزیمتِ تسخیر و دم بر نقش:</span>
                    <p className="font-amiri text-sm font-bold text-[#5d4037] leading-relaxed">
                      {diagnosisResult.recommendedNaqsh.consecrationAzimat}
                    </p>
                  </div>

                  <div className="bg-[#ffffff] p-3.5 rounded-2xl border border-[#d4a373]">
                    <span className="font-bold text-[#283618] block mb-1">طریقۂ استعمال و حمل:</span>
                    <p className="text-[#5d4037] leading-relaxed">
                      {diagnosisResult.recommendedNaqsh.carryingMethodUrdu}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Kash Al-Barni Classical Treatise Quote */}
          <div className="bg-[#fdfaf1] border-2 border-dashed border-[#bc6c25] p-5 rounded-3xl flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-[#bc6c25]/20 text-[#bc6c25] shrink-0 mt-0.5">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#bc6c25] block">
                قانونِ تشخیص از کتبِ کاش البرنی
              </span>
              <p className="text-xs md:text-sm text-[#5d4037] font-medium mt-1 leading-relaxed italic">
                {diagnosisResult.kashAlBarniMedicalRule}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
