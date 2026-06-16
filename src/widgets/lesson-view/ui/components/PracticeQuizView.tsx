import { XCircle } from "lucide-react";
import LessonHeader from "./LessonHeader";
import TaskCard from "./TaskCard";
import ActionArea from "./ActionArea";
import ChoiceBank from "./ChoiceBank";
import FloatingEmojisPortal from "./FloatingEmojisPortal";
import { useLessonPractice } from "../../model/useLessonPractice";

export default function PracticeQuizView({ state }: { state: ReturnType<typeof useLessonPractice> & { lessonId: string } }) {
  const {
    tasks, currentTask, currentTaskIndex, userInput, setUserInput,
    isCorrect, showHint, setShowHint, floatingEmojis, currentLessonTheme,
    handleCheck, advanceNext, handleSkip, cardRef, lessonId
  } = state;

  if (!currentTask) return <div>No tasks found for this lesson.</div>;
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isCorrect === true) {
        advanceNext();
      } else {
        handleCheck(cardRef.current);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 md:px-16 py-6 md:py-8 font-sans">
      <LessonHeader lessonId={lessonId} lessonTheme={currentLessonTheme} currentTaskIndex={currentTaskIndex} totalTasks={tasks.length} />
      <div className="w-full max-w-[850px] space-y-8 flex flex-col items-center">
        <TaskCard cardRef={cardRef} currentTask={currentTask} userInput={userInput} setUserInput={setUserInput} showHint={showHint} setShowHint={setShowHint} onKeyDown={onKeyDown} />
        <ActionArea isCorrect={isCorrect} handleSkip={handleSkip} advanceNext={advanceNext} handleCheck={() => handleCheck(cardRef.current)} />
        {(currentTask.type === "context-choice" || currentTask.type === "def-choice") && (
          <ChoiceBank options={currentTask.options || []} userInput={userInput} isCorrect={isCorrect} onSelectOption={setUserInput} />
        )}
        {isCorrect === false && (
          <div className="w-full bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
            <XCircle className="text-error" />
            <span className="text-red-700 font-bold uppercase text-[10px] tracking-widest">Incorrect. Try again or check the hint!</span>
          </div>
        )}
      </div>
      <FloatingEmojisPortal floatingEmojis={floatingEmojis} />
    </div>
  );
}
