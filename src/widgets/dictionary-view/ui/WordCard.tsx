import { Volume2 } from "lucide-react";
import { speak } from "@/shared/lib/speech";
import { VocabularyItem } from "@/entities/vocabulary";

export default function WordCard({ word }: { word: VocabularyItem }) {
  return (
    <div className="bg-white border border-indigo-50 rounded-3xl p-6 md:p-8 hover:shadow-lg transition-all group flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="text-lg sm:text-2xl md:text-3xl">
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <span className="font-bold text-navy">
              {word.wordEn} ({word.partOfSpeech})
            </span>
            <button
              onClick={() => speak(word.wordEn)}
              className="inline-flex items-center justify-center p-1.5 rounded-full text-indigo-400 hover:text-primary hover:bg-indigo-50 active:scale-90 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/35"
              title="Listen pronunciation"
              aria-label={`Pronounce ${word.wordEn}`}
            >
              <Volume2 size={18} className="stroke-[2.5]" />
            </button>
            <span className="text-slate-600 font-medium">
              - {word.definitionEn}
            </span>
          </div>
          <div className="text-lg md:text-2xl font-bold text-primary">{word.wordRu}</div>
        </div>

        <span className="px-3 py-1 bg-indigo-50 text-primary rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest shrink-0">
          Lesson {word.lessonId}
        </span>

        <div className="space-y-1"></div>

        <div className="bg-indigo-50 p-4 border border-indigo-100 rounded-xl">
          <div className="flex justify-between items-center mb-1">
            <span className="text-navy font-bold uppercase text-[9px] tracking-widest block">
              Usage Example
            </span>
            <button
              onClick={() => speak(word.exampleEn)}
              className="inline-flex items-center justify-center p-1.5 rounded-lg text-indigo-400 hover:text-primary hover:bg-indigo-100 active:scale-90 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
              title="Listen example sentence pronunciation"
              aria-label={`Pronounce example sentence`}
            >
              <Volume2 size={14} className="stroke-[2.5]" />
            </button>
          </div>
          <p className="text-navy font-bold italic text-base md:text-lg leading-relaxed mb-0.5">
            &quot;{word.exampleEn}&quot;
          </p>
          <p className="text-slate text-base italic md:text-lg font-medium">
            {word.exampleRu}
          </p>
        </div>
      </div>
    </div>
  );
}

