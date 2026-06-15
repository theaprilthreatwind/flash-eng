import { apiFetch } from "@/shared/api/base";
import { VocabularyItem } from "@/shared/types/vocabulary";

export const getVocabularyByLesson = (lessonId: number) => 
  apiFetch<VocabularyItem[]>(`/vocabulary?lesson=${lessonId}`);

export const searchVocabulary = (query: string) => 
  apiFetch<VocabularyItem[]>(`/vocabulary/search?q=${query}`);
