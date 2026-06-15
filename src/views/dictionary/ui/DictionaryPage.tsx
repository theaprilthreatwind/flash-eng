"use client";

import { useState } from "react";
import { Search, BookOpen, ChevronRight } from "lucide-react";
import { vocabularyMockData as mockWords } from "@/shared/vocabularyItems/vocabularyItems";
export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLesson, setSelectedLesson] = useState<number | "all">("all");

  const filteredWords = mockWords.filter(
    (word) =>
      (word.wordEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.wordRu.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedLesson === "all" || word.lessonNumber === selectedLesson),
  );

  return (
    <div className="p-16 space-y-12 bg-background min-h-screen text-foreground">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-navy">Dictionary</h1>
          <p className="text-slate font-medium mt-2">
            Explore and search your vocabulary library
          </p>
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <BookOpen size={24} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-muted"
            size={20}
          />
          <input
            type="text"
            placeholder="Search words or translations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-indigo-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
          />
        </div>
        <select
          value={selectedLesson}
          onChange={(e) =>
            setSelectedLesson(
              e.target.value === "all" ? "all" : parseInt(e.target.value),
            )
          }
          className="px-6 py-4 bg-white border border-indigo-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm text-navy font-bold appearance-none cursor-pointer"
        >
          <option value="all">All Lessons</option>
          {Array.from({ length: 18 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Lesson {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredWords.map((word, index) => (
          <div
            key={index}
            className="bg-white border border-indigo-50 rounded-3xl p-8 hover:shadow-lg transition-all group"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-black text-navy">
                    {word.wordEn}
                  </h2>
                  <span className="text-lg font-medium text-slate-muted italic">
                    {word.partOfSpeech}
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    — {word.wordRu}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-navy font-bold uppercase text-[10px] tracking-widest block mb-1">
                    Definition
                  </div>
                  <p className="text-slate font-medium leading-relaxed">
                    {word.definitionEn}
                  </p>
                </div>

                <div className="bg-sidebar/50 p-6 rounded-2xl border border-indigo-100/50">
                  <span className="text-navy font-bold uppercase text-[10px] tracking-widest block mb-2">
                    Usage Example
                  </span>
                  <p className="text-navy font-bold italic text-lg leading-relaxed mb-1">
                    &quot;{word.exampleEn}&quot;
                  </p>
                  <p className="text-slate text-sm font-medium">
                    {word.exampleRu}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="px-4 py-2 bg-indigo-50 text-primary rounded-full text-[12px] font-black uppercase tracking-widest">
                  Lesson {word.lessonNumber}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredWords.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-indigo-200">
            <p className="text-slate font-medium">
              No words found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
