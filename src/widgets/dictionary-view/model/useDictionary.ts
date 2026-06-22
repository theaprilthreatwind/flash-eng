import { useEffect, useState } from "react";
import { VocabularyItem } from "@/entities/vocabulary";
import { LessonItem } from "@/entities/lesson";

export function useDictionary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLesson, setSelectedLesson] = useState<number | "all">("all");
  
  const [lessons, setLessons] = useState<LessonItem[] | undefined>(undefined);
  const [vocabularyItems, setVocabularyItems] = useState<
    VocabularyItem[] | undefined
  >(undefined);

  useEffect(() => {
    fetch("/lessons.json")
      .then((response) => response.json())
      .then((data) => setLessons(data))
      .catch((error: Error) => console.error(error.message));
  }, []);

  useEffect(() => {
    fetch("/vocabularyItems.json")
      .then((response) => response.json())
      .then((data) => setVocabularyItems(data))
      .catch((error: Error) => console.error(error.message));
  }, []);

  if (vocabularyItems === undefined || lessons === undefined) {
    return {
      searchTerm,
      setSearchTerm,
      selectedLesson,
      setSelectedLesson,
      lessons: [],
      filteredWords: undefined,
    };
  }

  const filteredWords = vocabularyItems.filter(
    (word) =>
      (word.wordEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.wordRu.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedLesson === "all" || word.lessonId === selectedLesson),
  );

  return {
    searchTerm,
    setSearchTerm,
    selectedLesson,
    setSelectedLesson,
    lessons,
    filteredWords,
  };
}

