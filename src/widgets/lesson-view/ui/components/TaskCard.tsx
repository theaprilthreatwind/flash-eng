import { Lightbulb, Info } from "lucide-react";
import { LessonTask } from "@/entities/vocabulary";
import TaskCardContent from "./TaskCardContent";

interface TaskCardProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  currentTask: LessonTask;
  userInput: string;
  setUserInput: (val: string) => void;
  showHint: boolean;
  setShowHint: (val: boolean) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function TaskCard({
  cardRef,
  currentTask,
  userInput,
  setUserInput,
  showHint,
  setShowHint,
  onKeyDown,
}: TaskCardProps) {
  const word = currentTask.item;

  return (
    <div ref={cardRef} className="w-full bg-white border border-indigo-100/30 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
          <Info size={20} />
        </div>
        <span className="text-[12px] font-black text-slate/60 uppercase tracking-widest">
          {currentTask.type.replace("-", " ")}
        </span>
      </div>

      <TaskCardContent
        currentTask={currentTask}
        userInput={userInput}
        setUserInput={setUserInput}
        onKeyDown={onKeyDown}
      />

      <div className="flex items-center gap-4 mt-6">
        <div className="bg-sidebar px-4 py-3 rounded-xl flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-300 rounded-full"></div>
          <span className="text-[12px] font-bold text-slate uppercase">{word.partOfSpeech}</span>
        </div>
        <button
          onClick={() => setShowHint(!showHint)}
          className="px-4 py-3 rounded-xl flex items-center gap-2 text-primary font-black text-[12px] uppercase tracking-widest hover:bg-indigo-50 transition-all cursor-pointer"
        >
          <Lightbulb size={16} />
          {showHint ? word.wordRu : "Get a hint"}
        </button>
      </div>
    </div>
  );
}
