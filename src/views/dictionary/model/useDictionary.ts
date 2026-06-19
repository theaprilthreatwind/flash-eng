import { useState } from "react";
import { VocabularyItem } from "@/entities/vocabulary";
import { vocabularyItems } from "@/shared/vocabularyItems/vocabularyItems";

export function useDictionary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLesson, setSelectedLesson] = useState<number | "all">("all");

  const filteredWords = vocabularyItems.filter(
    (word) =>
      (word.wordEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.wordRu.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedLesson === "all" || word.lessonId === selectedLesson)
  );

  return {
    searchTerm,
    setSearchTerm,
    selectedLesson,
    setSelectedLesson,
    filteredWords,
  };
}
