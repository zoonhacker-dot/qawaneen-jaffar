import React, { useState } from 'react';
import { KASH_AL_BARNY_CHAPTERS } from '../data/kashAlBarnyBooks';
import { BookChapter } from '../types';
import { BookOpen, Search, Quote, CheckCircle2, ChevronLeft, Bookmark } from 'lucide-react';

export const BooksEncyclopedia: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(KASH_AL_BARNY_CHAPTERS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredChapters = KASH_AL_BARNY_CHAPTERS.filter(
    (ch) =>
      ch.title.includes(searchQuery) ||
      ch.bookSource.includes(searchQuery) ||
      ch.summary.includes(searchQuery)
  );

  const currentChapter =
    KASH_AL_BARNY_CHAPTERS.find((ch) => ch.id === selectedChapterId) || KASH_AL_BARNY_CHAPTERS[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border-2 border-[#d4a373] bg-[#f2e8cf] p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#bc6c25] text-white shadow-sm">
                <BookOpen className="h-5 w-5" />
              </span>
              <h2 className="font-amiri text-2xl font-bold text-[#5d4037]">
                کتب و متونِ اصلی کاش البرنی
              </h2>
            </div>
            <p className="mt-1 text-sm text-[#8d6e63] max-w-2xl font-medium">
              کاش البرنی کی مستند تصانیف: قوانین طلسم، قوانین افلاطون، مفتاح الجفر، رموز الجفر اور علم التکسیر کے اصل ابواب، قواعد اور حوالہ جات۔
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 relative">
          <input
            type="text"
            id="book-search-query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="کتب یا ابواب میں تلاش کریں (مثلاً: قوانین افلاطون، تکسیر، موکل، عناصر)..."
            className="w-full rounded-xl border-2 border-[#d4a373] bg-[#ffffff] px-4 py-2.5 text-sm text-[#2c1e14] placeholder-[#a89078] focus:border-[#bc6c25] focus:outline-none shadow-inner"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#8d6e63]" />
        </div>
      </div>

      {/* Main Reader View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chapters List (1 col) */}
        <div className="space-y-3">
          <h3 className="font-amiri text-base font-bold text-[#5d4037] flex items-center gap-2 px-1">
            <Bookmark className="h-4 w-4 text-[#bc6c25]" />
            <span>فہرست ابواب و کتب</span>
          </h3>

          <div className="space-y-2">
            {filteredChapters.map((ch) => {
              const isSelected = ch.id === currentChapter.id;
              return (
                <button
                  key={ch.id}
                  id={`chapter-item-${ch.id}`}
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`w-full text-right p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#faedcd] border-2 border-[#bc6c25] text-[#5d4037] shadow-sm font-bold'
                      : 'bg-[#ffffff] border-[#e7d8c9] text-[#5d4037] hover:bg-[#fdfaf1]'
                  }`}
                >
                  <span className="text-[11px] font-bold text-[#bc6c25] block mb-1">
                    {ch.bookSource}
                  </span>
                  <span className="font-amiri text-base font-bold block text-[#5d4037]">{ch.title}</span>
                  <p className="text-xs text-[#8d6e63] line-clamp-2 mt-1 font-medium">{ch.summary}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Chapter Content Reader (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border-2 border-[#d4a373] bg-[#ffffff] p-6 sm:p-8 shadow-md space-y-6">
          {/* Header */}
          <div className="pb-4 border-b border-[#e7d8c9]">
            <span className="text-xs font-bold text-[#bc6c25] bg-[#faedcd] px-2.5 py-1 rounded-md border border-[#d4a373]">
              {currentChapter.bookSource}
            </span>
            <h2 className="font-amiri text-2xl sm:text-3xl font-bold text-[#5d4037] mt-2">
              {currentChapter.title}
            </h2>
            <p className="text-sm text-[#8d6e63] mt-2 leading-relaxed font-medium">{currentChapter.summary}</p>
          </div>

          {/* Golden Quote */}
          {currentChapter.kashAlBarnyQuote && (
            <div className="rounded-xl border-2 border-[#d4a373] bg-[#f9f4e8] p-5 shadow-xs flex items-start gap-3">
              <Quote className="h-6 w-6 text-[#bc6c25] shrink-0 mt-1" />
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#bc6c25]">فرمانِ کاش البرنی:</span>
                <p className="font-amiri text-lg text-[#5d4037] italic font-semibold leading-relaxed">
                  "{currentChapter.kashAlBarnyQuote}"
                </p>
              </div>
            </div>
          )}

          {/* Detailed Paragraphs */}
          <div className="space-y-4 text-sm text-[#2c1e14] leading-relaxed font-medium">
            {currentChapter.content.map((paragraph, pIdx) => (
              <p key={pIdx} className="bg-[#fdfaf1] p-4 rounded-xl border border-[#e7d8c9] shadow-xs">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Rules Checklist */}
          {currentChapter.keyRules && currentChapter.keyRules.length > 0 && (
            <div className="rounded-xl border border-[#606c38] bg-[#dce4c9] p-5 space-y-3">
              <h4 className="font-amiri text-base font-bold text-[#283618]">
                اہم ضوابط و قوانین (خلاصہ):
              </h4>
              <ul className="space-y-2 text-xs text-[#283618] font-medium">
                {currentChapter.keyRules.map((rule, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#606c38] shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
