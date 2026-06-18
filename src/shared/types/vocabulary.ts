export interface VocabularyItem {
  lessonId: number;
  wordEn: string;
  wordRu: string;
  partOfSpeech: string;
  definitionEn: string;
  sentenceEn: string;
  sentenceAnswer: string;
  exampleEn: string;
  exampleRu: string;
}

export type TaskType = 'context-input' | 'context-choice' | 'def-input' | 'def-choice';

export interface LessonTask {
  id: string;
  type: TaskType;
  item: VocabularyItem;
  options?: string[];
}
