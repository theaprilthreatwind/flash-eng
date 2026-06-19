import { VocabularyItem } from "@/entities/vocabulary";
import WordCard from "./WordCard";

interface ListProps {
  filteredWords: VocabularyItem[];
}

export default function DictionaryList({ filteredWords }: ListProps) {
  if (filteredWords.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-indigo-200">
        <p className="text-slate font-medium">No words found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredWords.map((word, index) => (
        <WordCard key={index} word={word} />
      ))}
    </div>
  );
}
