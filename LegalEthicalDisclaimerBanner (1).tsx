import React from 'react';
import { AlertOctagon, ShieldCheck, Scale, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export const LegalEthicalDisclaimerBanner: React.FC = () => {
  return (
    <div 
      id="app-global-ethical-warning-disclaimer"
      className="my-8 rounded-3xl bg-gradient-to-br from-[#2c150e] via-[#3a1d12] to-[#1c2414] border-2 border-[#bc6c25] p-5 sm:p-7 text-[#fefae0] shadow-2xl relative overflow-hidden"
      dir="rtl"
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-[#bc6c25]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-[#283618]/30 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 space-y-4">
        
        {/* Header with Badges */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#bc6c25]/50 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-br from-red-600 to-[#bc6c25] text-white flex items-center justify-center shadow-lg shrink-0 border border-[#faedcd]/40">
              <AlertOctagon className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-amiri text-lg sm:text-2xl font-bold text-[#faedcd] tracking-wide">
                  اہم قانونی و شرعی انتباہ (Warning & Terms of Use)
                </h3>
                <span className="bg-red-900/80 text-red-200 border border-red-500/50 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                  عدمِ ذمہ داری کا اعلان
                </span>
              </div>
              <p className="text-xs text-[#dda15e] font-semibold">
                تمام صارفین و عاملین کے لیے شرعی و قانونی حلف نامہ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#dda15e] bg-[#1a0f0a]/80 px-3 py-1.5 rounded-xl border border-[#bc6c25]/40">
            <Scale className="h-4 w-4 text-[#dda15e]" />
            <span>وَمَا هُم بِضَارِّينَ بِهِ مِنْ أَحَدٍ إِلَّا بِإِذْنِ اللَّهِ</span>
          </div>
        </div>

        {/* Primary Statement as Mandated by the User */}
        <div className="bg-[#1f1008]/90 border border-red-500/40 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="font-amiri text-sm sm:text-base md:text-lg text-[#faedcd] leading-relaxed font-bold">
              اس ایپ میں موجود ہر قسم کے اعمال، عملیات، نقوش، اوراد اور منترات کے نفع و نقصان یا اچھے اور برے استعمال کا ذمہ دار صاحبِ ایپ (تخلیق کار و محقق) ہرگز نہیں ہے۔ اچھے اور برے استعمال کا ذمہ دار عمل کرنے والا خود ہے اور وہ روزِ قیامت اللہ رب العزت کے حضور خود جوابدہ ہے۔ صاحبِ ایپ (ایپ بنانے والے) پر اس کا کوئی گناہ نہیں ہے، اور نہ ہی کسی ناجائز یا غیر شرعی مقصد کے لیے ان کی طرف سے اجازت ہے۔ البتہ صحیح، شرعی اور جائز مقاصد کے لیے اجازتِ عام ہے۔
            </p>
          </div>
        </div>

        {/* Key Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1 text-xs">
          
          <div className="bg-[#2a170e]/80 border border-[#bc6c25]/40 rounded-2xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-[#dda15e] font-bold">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <span>جائز و شرعی استعمال کی اجازتِ عام:</span>
            </div>
            <p className="text-[#e9d8a6] leading-relaxed">
              میاں بیوی کے مابین باہمی محبت و صلح، سحر، آسیب و جنات کا شرعی علاج، رزقِ حلال کی وسعت، امراض سے شفایابی اور مظلوم کی داد رسی کے لیے اعمال کی شرعی اجازت عام ہے۔
            </p>
          </div>

          <div className="bg-[#2a170e]/80 border border-red-500/40 rounded-2xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-red-300 font-bold">
              <AlertOctagon className="h-4 w-4 text-red-400" />
              <span>ناجائز و غیر شرعی استعمال پر مکمل ممانعت:</span>
            </div>
            <p className="text-[#e9d8a6] leading-relaxed">
              کسی بے گناہ پر ظلم، ناجائز محبت، میاں بیوی میں تفریق یا حرام مقاصد کے لیے استعمال کرنے والا دنیا و آخرت میں اپنے کیے کا خود ذمہ دار ہے، صاحبِ ایپ بری الذمہ ہیں۔
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
