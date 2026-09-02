import React, { useState } from 'react';
import { ShieldCheck, Flame, Moon, Check, AlertCircle, Compass, HeartHandshake } from 'lucide-react';

export const HisarShield: React.FC = () => {
  const [hisarStep, setHisarStep] = useState<number>(0);

  const hisarDirections = [
    { dir: 'دائیں جانب (مشرق/یمین)', desc: 'آیت الکرسی ایک بار پڑھ کر دائیں جانب پھونک ماریں۔' },
    { dir: 'بائیں جانب (مغرب/یسار)', desc: 'آیت الکرسی دوسری بار پڑھ کر بائیں جانب پھونک ماریں۔' },
    { dir: 'سامنے (شمال/امام)', desc: 'آیت الکرسی تیسری بار پڑھ کر سامنے کی سمت دم کریں۔' },
    { dir: 'پیچھے (جنوب/خلف)', desc: 'آیت الکرسی چوتھی بار پڑھ کر پشت کی سمت دم کریں۔' },
    { dir: 'اوپر (آسمان/فوق)', desc: 'آیت الکرسی پانچویں بار پڑھ کر اوپر کی جانب دم کریں۔' },
    { dir: 'نیچے (زمین/تحت)', desc: 'آیت الکرسی چھٹی بار پڑھ کر زمین پر دم کریں۔' },
    { dir: 'اپنے سینے پر (حصارِ باطن)', desc: 'آیت الکرسی ساتویں بار پڑھ کر اپنے سینے اور پورے بدن پر دم کریں۔' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border-2 border-[#d4a373] bg-[#f2e8cf] p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#283618] text-white shadow-sm">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h2 className="font-amiri text-2xl font-bold text-[#5d4037]">
                حصارِ اعظم، پرہیز جلالی و جمالی اور آدابِ ریاضت
              </h2>
            </div>
            <p className="mt-1 text-sm text-[#8d6e63] max-w-2xl font-medium">
              کاش البرنی کی تصنیف "رموز الجفر و ریاضات جنات" کے مطابق عملیات و جفر کے دوران باطنی حفاظت، پرہیز، اور رجعت (Spiritual Backlash) سے بچاؤ کا کامل دستور۔
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Hisar Ayat al-Kursi Generator */}
        <div className="rounded-2xl border-2 border-[#606c38] bg-[#ffffff] p-6 shadow-md space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#e7d8c9]">
            <h3 className="font-amiri text-xl font-bold text-[#283618] flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#606c38]" />
              <span>طریقہ حصارِ ہفت گانہ (آیت الکرسی)</span>
            </h3>
            <span className="text-xs text-[#283618] font-bold bg-[#dce4c9] px-3 py-1 rounded-full">
              مرحلہ {hisarStep + 1} از 7
            </span>
          </div>

          <p className="text-xs text-[#2c1e14] leading-relaxed bg-[#fdfaf1] p-3.5 rounded-xl border border-[#e7d8c9] font-medium">
            کاش البرنی فرماتے ہیں: "کوئی بھی عمل، چلہ یا تسخیر شروع کرنے سے پہلے 7 جہات کا حصار قائم کرنا فرضِ عین ہے۔ اس کے بغیر رجعت یا آسیب کا شدید خطرہ رہتا ہے۔"
          </p>

          {/* Interactive Steps List */}
          <div className="space-y-2">
            {hisarDirections.map((step, idx) => {
              const isDone = idx <= hisarStep;
              const isCurrent = idx === hisarStep;
              return (
                <div
                  key={idx}
                  onClick={() => setHisarStep(idx)}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    isCurrent
                      ? 'border-[#606c38] bg-[#dce4c9] text-[#283618] shadow-sm'
                      : isDone
                      ? 'border-[#d4a373]/50 bg-[#fdfaf1] text-[#2c1e14]'
                      : 'border-[#e7d8c9] bg-[#ffffff] text-[#a89078]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isDone ? 'bg-[#283618] text-white' : 'bg-[#e7d8c9] text-[#8d6e63]'
                      }`}
                    >
                      {isDone ? <Check className="h-3.5 w-3.5" /> : idx + 1}
                    </div>
                    <div>
                      <span className="font-bold text-sm block font-amiri text-[#5d4037]">{step.dir}</span>
                      <span className="text-xs text-[#8d6e63] font-medium">{step.desc}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setHisarStep(Math.max(0, hisarStep - 1))}
              disabled={hisarStep === 0}
              className="rounded-xl border border-[#d4a373] bg-[#fdfaf1] px-4 py-2 text-xs font-bold text-[#5d4037] hover:bg-[#faedcd] disabled:opacity-40 cursor-pointer"
            >
              پچھلا مرحلہ
            </button>
            <button
              onClick={() => setHisarStep(Math.min(6, hisarStep + 1))}
              disabled={hisarStep === 6}
              className="rounded-xl bg-[#283618] hover:bg-[#384628] px-4 py-2 text-xs font-bold text-white shadow-sm disabled:opacity-40 cursor-pointer"
            >
              اگلا مرحلہ
            </button>
          </div>
        </div>

        {/* Parhez Jalali & Jamali Guidelines */}
        <div className="space-y-6">
          {/* Jalali & Jamali Card */}
          <div className="rounded-2xl border-2 border-[#d4a373] bg-[#ffffff] p-6 shadow-md space-y-4">
            <h3 className="font-amiri text-xl font-bold text-[#5d4037] flex items-center gap-2 pb-3 border-b border-[#e7d8c9]">
              <Flame className="h-5 w-5 text-[#bc6c25]" />
              <span>قواعدِ پرہیز جلالی و جمالی (کاش البرنی)</span>
            </h3>

            {/* Parhez Jamali */}
            <div className="p-4 rounded-xl bg-[#f9f4e8] border border-[#d4a373]">
              <h4 className="font-bold text-sm text-[#bc6c25] mb-1 flex items-center gap-1.5">
                <Moon className="h-4 w-4" /> پرہیز جمالی (ترکِ حیوانات):
              </h4>
              <p className="text-xs text-[#2c1e14] leading-relaxed font-medium">
                ہر ایسی چیز سے مکمل اجتناب جس میں جان ہو یا جو جاندار سے پیدا ہوئی ہو: جیسے ہر قسم کا گوشت، مچھلی، انڈے، دودھ، مکھن، دہی، شہد اور چمڑے کی اشیاء۔ صرف نباتاتی غذائیں (جو، چاول، دالیں، پھل) کھائی جائیں۔
              </p>
            </div>

            {/* Parhez Jalali */}
            <div className="p-4 rounded-xl bg-[#fae1dd] border border-[#9d0208]">
              <h4 className="font-bold text-sm text-[#9d0208] mb-1 flex items-center gap-1.5">
                <Flame className="h-4 w-4" /> پرہیز جلالی (ترکِ بو دار و محرک اشیاء):
              </h4>
              <p className="text-xs text-[#780000] leading-relaxed font-medium">
                بدبودار، تیز اور حواس کو مکدر کرنے والی اشیاء سے پرہیز: جیسے کچا پیاز، لہسن، ہینگ، تمباکو نوشی، جھوٹ، غیبت، شہوانی خیالات اور بلا ضرورت کلام کرنا۔
              </p>
            </div>
          </div>

          {/* Golden Safety Rules to Avoid Raj'at */}
          <div className="rounded-2xl border-2 border-[#9d0208] bg-[#ffffff] p-6 shadow-md space-y-3">
            <h4 className="font-amiri text-lg font-bold text-[#9d0208] flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-[#9d0208]" />
              <span>انسدادِ رجعت (باطنی صدمے سے بچاؤ کے سنہری اصول)</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#2c1e14] list-disc list-inside leading-relaxed font-medium">
              <li>کبھی بھی کسی عمل کو دورانِ ریاضت ادھورا نہ چھوڑیں۔</li>
              <li>خلوت گاہ میں بغیر حصار کے نہ بیٹھیں اور نہ ہی کسی خوفزدہ شکل کو دیکھ کر چیخیں۔</li>
              <li>ہر نماز کے بعد 11 بار درود شریف اور 11 بار استغفار کا ورد حائلِ رجعت ہے۔</li>
              <li>عمل کی تکمیل پر حسبِ توفیق صدقہ اور شیرینی بچوں میں تقسیم کریں۔</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
