import React from 'react';
import { Award, UserCheck, Sparkles, ChevronLeft, Mail, BookOpen, Info, Shield, Compass } from 'lucide-react';

interface StartingProfileBannerProps {
  onOpenFullProfile: () => void;
  onOpenAppGuide: () => void;
}

export const StartingProfileBanner: React.FC<StartingProfileBannerProps> = ({
  onOpenFullProfile,
  onOpenAppGuide
}) => {
  return (
    <div 
      id="banner-starting-author-profile"
      className="mb-6 rounded-3xl bg-gradient-to-r from-[#2c1e14] via-[#3a2719] to-[#283618] border-2 border-[#bc6c25] p-4 sm:p-5 text-[#fefae0] shadow-xl relative overflow-hidden transition-all duration-300"
      dir="rtl"
    >
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#dda15e_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Spiritual Seal Emblem + Name + Introduction */}
        <div className="flex items-center gap-4 text-right w-full md:w-auto">
          <div className="relative shrink-0">
            {/* Spiritual Calligraphic Seal Emblem (Replacing Photo) */}
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl ring-2 ring-[#dda15e] shadow-lg p-1 bg-gradient-to-br from-[#bc6c25] via-[#2c1e14] to-[#283618] flex flex-col items-center justify-center text-center border border-[#dda15e]/50">
              <span className="text-[9px] font-mono text-[#dda15e] font-bold">۷۸۶</span>
              <Award className="h-6 w-6 text-[#dda15e] my-0.5" />
              <span className="text-[8px] font-amiri text-[#faedcd] font-bold tracking-tight">مہرِ تحقیق</span>
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 bg-[#283618] text-[#dda15e] p-1 rounded-full border border-[#faedcd]">
              <Sparkles className="h-3 w-3" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-amiri text-lg sm:text-2xl font-bold text-[#faedcd]">
                حاجی ساجد علی گورگیج البلوشی
              </h3>
              <span className="bg-[#bc6c25]/80 text-[#fefae0] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#dda15e]/40">
                محققِ علم الجفر و سوفٹ ویئر ڈویلپر
              </span>
            </div>

            <p className="text-xs text-[#d4a373] leading-relaxed max-w-2xl">
              بانیِ کاشف الجفر ریسرچ سینٹر — علامہ کاش البرنی کے رموز و کتبِ جفریہ پر مبنی خودکار مستند ڈیجیٹل سسٹم مع ۱۲ جامع ماڈیولز و تنتر جنتر اسٹوڈیو۔
            </p>
          </div>
        </div>

        {/* Right Side: Quick Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
          <button
            id="btn-view-author-intro"
            onClick={onOpenFullProfile}
            className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#bc6c25] to-[#8c4a16] hover:from-[#a2591d] hover:to-[#743c10] text-[#fefae0] px-4 py-2.5 rounded-2xl font-bold text-xs shadow-md transition-all cursor-pointer transform hover:scale-105"
          >
            <UserCheck className="h-4 w-4 text-[#dda15e]" />
            <span>تعارف و پروفائل</span>
          </button>

          <button
            id="btn-view-app-guide"
            onClick={onOpenAppGuide}
            className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 bg-[#fefae0] hover:bg-[#faedcd] text-[#2c1e14] px-4 py-2.5 rounded-2xl font-bold text-xs shadow-md transition-all cursor-pointer transform hover:scale-105"
          >
            <Info className="h-4 w-4 text-[#bc6c25]" />
            <span>ایپ کی معلومات و رہنمائی</span>
          </button>
        </div>

      </div>
    </div>
  );
};
