import { VocabularyItem, LessonTask, TaskType } from "@/entities/vocabulary";

export function generateTasks(currentLessonWords: VocabularyItem[]): LessonTask[] {
  const taskTypes: TaskType[] = [
    "context-input",
    "context-choice",
    "def-input",
    "def-choice",
  ];
  
  const shuffled = [...currentLessonWords].sort(() => Math.random() - 0.5);
  
  return shuffled.map((word) => {
    const randomType = taskTypes[Math.floor(Math.random() * taskTypes.length)];
    const task: LessonTask = {
      id: `${word.wordEn}-${randomType}`,
      type: randomType,
      item: word,
    };
    
    if (randomType === "context-choice") {
      const distractors = currentLessonWords
        .filter((w) => w.sentenceAnswer !== word.sentenceAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((w) => w.sentenceAnswer);
        
      task.options = [word.sentenceAnswer, ...distractors].sort(() => Math.random() - 0.5);
    } else if (randomType === "def-choice") {
      const distractors = currentLessonWords
        .filter((w) => w.wordEn !== word.wordEn)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((w) => w.wordEn);
        
      task.options = [word.wordEn, ...distractors].sort(() => Math.random() - 0.5);
    }
    
    return task;
  });
}
