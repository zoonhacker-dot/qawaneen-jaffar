import React, { useState, useEffect } from 'react';
import { Cpu, Send, Sparkles, BookOpen, User, RefreshCw, AlertCircle, Wifi, WifiOff } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  isOfflineFallback?: boolean;
}

export const GeminiJafrConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: 'السلام علیکم ورحمۃ اللہ! میں کاش البرنی کی کتب (مفتاح الجفر، قوانین طلسم، قوانین افلاطون، رموز الجفر اور علم تکسیر) کی روشنی میں آپ کی رہنمائی کے لیے حاضر ہوں۔ یہ مشیر آن لائن جیمنائی ماڈل کے ساتھ ساتھ مکمل آف لائن جفری رولز پر بھی بلا تعطل کام کرتا ہے۔',
      time: new Date().toLocaleTimeString('ur-PK', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('عمومی سوال و قوانین');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const presetQueries = [
    'قوانین افلاطون کے تحت عناصر کے موافقت و تنافر کا اصول کیا ہے؟',
    'مفتاح الجفر کے مطابق موکل علوی اور عون سفلی کا استخراج کیسے کیا جاتا ہے؟',
    'نقش مثلث میں کسر واقع ہونے پر کاش البرنی کا کیا حکم ہے؟',
    'اعمال محبت و تسخیر قلوب کے لیے بہترین ساعت اور بخور کون سا ہے؟',
    'حروف صامتہ اور زبان بندی کا طلسماتی طریقہ کار واضح کریں۔',
    'پرہیز جلالی و جمالی کی مکمل شرائط اور حصار کا طریقہ کیا ہے؟',
  ];

  // Local Offline Smart Jafr Expert Rules Fallback
  const getOfflineJafrResponse = (query: string): string => {
    const lower = query.toLowerCase();
    if (query.includes('افلاطون') || query.includes('عناصر') || query.includes('موافقت')) {
      return `[آف لائن موڈ - قوانین افلاطون]\n\nکاش البرنی (قوانین افلاطون) کے مطابق:\nعناصر اربعہ کے مابین تعلقات کے دو اصول ہیں:\n1. موافقت: آتش و باد (گرم و خشک بمقابلہ گرم و تر) اور آب و خاک (سرد و تر بمقابلہ سرد و خشک) باہم دوست ہیں۔\n2. عداوت و تنافر: آتش و آب (ضد)، اور باد و خاک باہم دشمن ہیں۔ عمل کرتے وقت طالب و مطلوب کے عناصر میں موافقت پیدا کرنا لازم ہے۔`;
    }
    if (query.includes('موکل') || query.includes('عون') || query.includes('استخراج')) {
      return `[آف لائن موڈ - مفتاح الجفر]\n\nموکلات و اعوان کا استخراج:\n1. موکل علوی: مطلوبہ اسم یا آیت کے اعدادِ ابجد کبیر برآمد کریں اور آخر میں "ائیل" (جیسے جبرائیل، دردائیل) کا لاحقہ لگائیں۔\n2. عون سفلی: اعداد میں سے ناری، بادی، آبی یا خاکی عنصر نکال کر آخر میں "طیش" یا "لوش" کا اضافہ کریں۔ یہ طریقہ رموز الجفر میں مفصل درج ہے۔`;
    }
    if (query.includes('مثلث') || query.includes('کسر') || query.includes('نقش')) {
      return `[آف لائن موڈ - علم تکسیر و نقوش]\n\nنقش مثلث میں کسر کا ضابطہ:\nمجموعہ اعداد میں سے ۱۲ منہا (تفریق) کریں اور باقی کو ۳ پر تقسیم کریں۔\n- اگر باقی ۱ بچے تو خانہ نمبر ۷ میں ۱ عدد کا اضافہ کریں (اضافہ جبرائیل)۔\n- اگر باقی ۲ بچے تو خانہ نمبر ۴ میں ۱ عدد کا اضافہ کریں۔\n- کسر نہ ہونے کی صورت میں چال بالکل سیدھی اور متوازن رہے گی۔`;
    }
    if (query.includes('محبت') || query.includes('تسخیر') || query.includes('ساعت')) {
      return `[آف لائن موڈ - اعمال محبت و تسخیر]\n\nکاش البرنی کے مطابق:\n- ساعت: روزِ جمعہ یا دوشنبہ بوقتِ طلوعِ آفتاب (ساعتِ زہرہ یا مشتری)۔\n- بخور: صندل سرخ، عود، لوبان اور شکرِ سفید۔\n- سمت: قبلہ رخ یا مطلوب کے عنصر کی سمت بیٹھیں اور دل میں مکمل ارتکاز رکھیں (حصارِ اعظم لازمی ہے)۔`;
    }
    if (query.includes('زبان بندی') || query.includes('صامتہ') || query.includes('عداوت')) {
      return `[آف لائن موڈ - حروفِ صامتہ و زبان بندی]\n\nحروفِ صامتہ (بے نقط حروف: ا، ح، د، ر، س، ص، ط، ع، ک، ل، م، و، ہ) زبان بندی اور بدخواہوں کی شر سے حفاظت کے لیے تیر بہدف ہیں۔ ان حروف کے ساتھ سورۃ یس کی آیت 'اليوم نختم على افواههم' کا نقش مریخ یا زحل کی ساعت میں سیسے یا نیلے کاغذ پر لکھا جاتا ہے۔`;
    }
    if (query.includes('حصار') || query.includes('پرہیز') || query.includes('جلالی')) {
      return `[آف لائن موڈ - پرہیز جلالی و جمالی]\n\n- پرہیز جمالی: گوشت، انڈہ، مچھلی، دودھ، دہی اور چمڑے کی اشیاء سے مکمل اجتناب۔\n- پرہیز جلالی: پیاز، لہسن، ہینگ، اور بدبودار اشیاء سے پرہیز مع کم خوری، کم خوابی و کم گفتاری۔\n- حصار: آیت الکرسی اور چاروں قل شریف ۷ مرتبہ پڑھ کر اپنے گرد دائرہ کھینچیں۔`;
    }
    return `[آف لائن موڈ - کاش البرنی رولز انجن]\n\nآپ کا استفسار: "${query}"\nکاش البرنی کی کتب کے مطابق: ہر عمل کی کامیابی کا انحصار ابجد قمری کے درست میزان، قمر در عقرب سے پرہیز، اور صحیح ساعت (سعد برائے خیر، نحس برائے شر و زبان بندی) پر ہے۔ تمام مخصوص حسابات آپ اوپر دیے گئے متعلقہ ٹیبز سے آف لائن بھی بغیر کسی رکاوٹ کے کر سکتے ہیں۔`;
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString('ur-PK', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    if (!navigator.onLine) {
      // Offline immediate response from local Jafr Knowledge Engine
      setTimeout(() => {
        const offlineReply = getOfflineJafrResponse(textToSend);
        setMessages((prev) => [
          ...prev,
          {
            sender: 'assistant',
            text: offlineReply,
            time: new Date().toLocaleTimeString('ur-PK', { hour: '2-digit', minute: '2-digit' }),
            isOfflineFallback: true,
          },
        ]);
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      const response = await fetch('/api/jafr/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          topic: selectedTopic,
        }),
      });

      const data = await response.json();
      const botResponseText = data.response || data.error || getOfflineJafrResponse(textToSend);

      const assistantMsg: ChatMessage = {
        sender: 'assistant',
        text: botResponseText,
        time: new Date().toLocaleTimeString('ur-PK', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      // Fallback to local rules
      const offlineReply = getOfflineJafrResponse(textToSend);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: offlineReply,
          time: new Date().toLocaleTimeString('ur-PK', { hour: '2-digit', minute: '2-digit' }),
          isOfflineFallback: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border-2 border-[#d4a373] bg-[#f2e8cf] p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#bc6c25] text-white shadow-sm">
                <Cpu className="h-5 w-5" />
              </span>
              <h2 className="font-amiri text-2xl font-bold text-[#5d4037]">
                مستشار جفر و طلسمات AI (کاش البرنی مشیر)
              </h2>
            </div>
            <p className="mt-1 text-sm text-[#8d6e63] max-w-2xl font-medium">
              گوگل جیمنائی کے ساتھ کاش البرنی کے جامع جفری، طلسماتی و افلاطونی علمی ذخیرے سے مزین ذہین معاون۔
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isOnline ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#dce4c9] text-[#283618] border border-[#606c38]">
                <Wifi className="h-3.5 w-3.5 text-green-700" />
                <span>آن لائن موڈ (Gemini Live)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#faedcd] text-[#bc6c25] border border-[#bc6c25]">
                <WifiOff className="h-3.5 w-3.5 text-[#bc6c25]" />
                <span>آف لائن موڈ (Local Jafr Core)</span>
              </span>
            )}
          </div>
        </div>

        {/* Preset Query Chips */}
        <div className="mt-4 pt-3 border-t border-[#e7d8c9] flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#8d6e63] font-bold">مجوزہ استفسارات:</span>
          {presetQueries.map((q, qIdx) => (
            <button
              key={qIdx}
              id={`preset-query-${qIdx}`}
              onClick={() => handleSendMessage(q)}
              className="rounded-full border border-[#d4a373] bg-[#fdfaf1] px-3 py-1 text-xs font-semibold text-[#5d4037] hover:bg-[#faedcd] transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="rounded-2xl border-2 border-[#d4a373] bg-[#ffffff] shadow-md overflow-hidden flex flex-col h-[560px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#fdfaf1]/30">
          {messages.map((msg, idx) => {
            const isBot = msg.sender === 'assistant';
            return (
              <div key={idx} className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
                {isBot && (
                  <div className="h-8 w-8 rounded-full bg-[#bc6c25] flex items-center justify-center text-white font-amiri font-bold text-base shrink-0 shadow-xs">
                    ج
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                    isBot
                      ? 'bg-[#ffffff] border border-[#e7d8c9] text-[#2c1e14] shadow-xs font-medium'
                      : 'bg-[#bc6c25] text-white font-medium font-amiri text-base shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-2 font-sans ${
                      isBot ? 'text-[#8d6e63] text-left' : 'text-amber-100 text-right'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
                {!isBot && (
                  <div className="h-8 w-8 rounded-full bg-[#5d4037] flex items-center justify-center text-white shrink-0 shadow-xs">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center text-xs text-[#bc6c25] font-amiri font-bold">
              <div className="h-8 w-8 rounded-full bg-[#faedcd] border border-[#d4a373] flex items-center justify-center animate-spin">
                <RefreshCw className="h-4 w-4 text-[#bc6c25]" />
              </div>
              <span>کاش البرنی کی کتب و جفری قواعد سے استخراج جاری ہے...</span>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 bg-[#fdfaf1] border-t border-[#e7d8c9]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              id="gemini-chat-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="جفری یا طلسماتی سوال درج کریں..."
              disabled={isLoading}
              className="flex-1 rounded-xl border-2 border-[#d4a373] bg-[#ffffff] px-4 py-3 text-sm text-[#2c1e14] placeholder-[#a89078] focus:border-[#bc6c25] focus:outline-none font-amiri text-base shadow-inner"
            />
            <button
              type="submit"
              id="gemini-send-btn"
              disabled={!inputText.trim() || isLoading}
              className="flex items-center justify-center rounded-xl bg-[#bc6c25] hover:bg-[#a65d1e] px-5 py-3 text-white font-bold disabled:opacity-40 shadow-sm transition-all cursor-pointer"
            >
              <Send className="h-4 w-4 rotate-180" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
