import { cn } from "@/shared/lib/utils";
import { SkipForward, CheckCircle2 } from "lucide-react";

interface ActionAreaProps {
  isCorrect: boolean | null;
  handleSkip: () => void;
  advanceNext: () => void;
  handleCheck: () => void;
}

export default function ActionArea({
  isCorrect,
  handleSkip,
  advanceNext,
  handleCheck,
}: ActionAreaProps) {
  return (
    <div className="w-full flex items-center justify-between gap-4">
      {isCorrect !== true && (
        <button
          onClick={handleSkip}
          className="flex-1 md:flex-initial flex items-center justify-center gap-3 px-4 md:px-8 py-3 border-2 border-primary/20 text-primary rounded-xl font-black uppercase text-xs tracking-widest hover:bg-indigo-50 transition-all active:scale-95 cursor-pointer"
        >
          <SkipForward size={20} /> Skip
        </button>
      )}

      {isCorrect === true ? (
        <button
          onClick={advanceNext}
          className="flex-1 flex items-center justify-center gap-3 px-4 md:px-12 py-3 bg-success text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-soft hover:opacity-90 transition-all active:scale-95 animate-in fade-in zoom-in-95 duration-200 cursor-pointer"
        >
          Next <SkipForward size={20} />
        </button>
      ) : (
        <button
          onClick={handleCheck}
          className={cn(
            "flex-1 flex items-center justify-center gap-3 px-4 md:px-12 py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-soft transition-all active:scale-95 cursor-pointer",
            isCorrect === false ? "bg-error text-white hover:opacity-90" : "bg-primary text-white hover:opacity-90"
          )}
        >
          Check <CheckCircle2 size={20} />
        </button>
      )}
    </div>
  );
}
