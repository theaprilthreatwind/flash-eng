import { VocabularyItem } from "@/shared/types/vocabulary";

export default function WordCard({ word }: { word: VocabularyItem }) {
  return (
    <div className="bg-white border border-indigo-50 rounded-3xl p-6 md:p-8 hover:shadow-lg transition-all group flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-baseline gap-2">
            <h2 className="text-2xl md:text-3xl font-black text-navy leading-tight">{word.wordEn}</h2>
            <span className="text-sm md:text-base font-medium text-slate-muted italic shrink-0">{word.partOfSpeech}</span>
          </div>
          <span className="px-3 py-1 bg-indigo-50 text-primary rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest shrink-0">
            Lesson {word.lessonId}
          </span>
        </div>

        <div className="text-xl md:text-2xl font-bold text-primary">{word.wordRu}</div>

        <div className="space-y-1">
          <div className="text-navy font-bold uppercase text-[9px] tracking-widest block mb-0.5">Definition</div>
          <p className="text-slate text-sm md:text-base font-medium leading-relaxed">{word.definitionEn}</p>
        </div>

        <div className="bg-sidebar/50 p-4 md:p-6 rounded-2xl border border-indigo-100/50 space-y-1">
          <span className="text-navy font-bold uppercase text-[9px] tracking-widest block mb-1">Usage Example</span>
          <p className="text-navy font-bold italic text-base md:text-lg leading-relaxed mb-0.5">&quot;{word.exampleEn}&quot;</p>
          <p className="text-slate text-xs md:text-sm font-medium">{word.exampleRu}</p>
        </div>
      </div>
    </div>
  );
}
