import { VocabularyItem } from "@/entities/vocabulary";

export default function WordCard({ word }: { word: VocabularyItem }) {
  return (
    <div className="bg-white border border-indigo-50 rounded-3xl p-6 md:p-8 hover:shadow-lg transition-all group flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="text-lg sm:text-2xl md:text-3xl">
          <div className=" mb-4">
            <span className="font-bold">
              {word.wordEn} ({word.partOfSpeech})
            </span>{" "}
            - {word.definitionEn}
          </div>
          <div className="text-lg md:text-2xl font-bold text-primary">{word.wordRu}</div>
        </div>

        <span className="px-3 py-1 bg-indigo-50 text-primary rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest shrink-0">
          Lesson {word.lessonId}
        </span>

        <div className="space-y-1"></div>

        <div className="bg-indigo-50 p-4 border border-indigo-100 rounded-xl">
          <span className="text-navy font-bold uppercase text-[9px] tracking-widest block mb-1">
            Usage Example
          </span>
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
