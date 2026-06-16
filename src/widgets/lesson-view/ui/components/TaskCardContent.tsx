import { LessonTask } from "@/shared/types/vocabulary";

interface TaskCardContentProps {
  currentTask: LessonTask;
  userInput: string;
  setUserInput: (val: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function TaskCardContent({
  currentTask,
  userInput,
  setUserInput,
  onKeyDown,
}: TaskCardContentProps) {
  const word = currentTask.item;

  if (currentTask.type === "context-input" || currentTask.type === "context-choice") {
    const parts = word.sentenceEn.split("{{target}}");
    return (
      <div className="py-6 md:py-8 text-center md:text-left text-2xl md:text-[42px] font-black text-navy leading-[1.2] tracking-tight flex flex-wrap items-baseline justify-center md:justify-start gap-3">
        <span>{parts[0]}</span>
        {currentTask.type === "context-input" ? (
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="........"
            autoFocus
            className="bg-transparent border-b-4 border-primary text-primary focus:outline-none min-w-[180px] text-center placeholder:text-indigo-100"
          />
        ) : (
          <span className="text-primary border-b-4 border-primary min-w-[120px] text-center inline-block">
            {userInput || "........"}
          </span>
        )}
        <span>{parts[1]}</span>
      </div>
    );
  }

  return (
    <div className="py-6 md:py-8 text-center space-y-6">
      <div className="text-navy font-bold uppercase text-[10px] md:text-[12px] tracking-widest block text-slate-muted">
        Definition
      </div>
      <div className="text-xl md:text-3xl font-black text-navy leading-relaxed">
        &quot;{word.definitionEn}&quot;
      </div>
      {currentTask.type === "def-input" && (
        <div className="flex justify-center pt-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type the word..."
            autoFocus
            className="bg-transparent border-b-4 border-primary text-primary focus:outline-none min-w-[250px] text-center text-2xl font-bold placeholder:text-indigo-100"
          />
        </div>
      )}
    </div>
  );
}
