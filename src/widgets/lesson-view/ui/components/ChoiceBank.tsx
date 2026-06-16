import { cn } from "@/shared/lib/utils";

interface ChoiceBankProps {
  options: string[];
  userInput: string;
  isCorrect: boolean | null;
  onSelectOption: (option: string) => void;
}

export default function ChoiceBank({
  options,
  userInput,
  isCorrect,
  onSelectOption,
}: ChoiceBankProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {options.map((option) => (
        <button
          key={option}
          disabled={isCorrect === true}
          onClick={() => onSelectOption(option)}
          className={cn(
            "py-5 rounded-2xl text-navy font-bold transition-all border-2 active:scale-95 shadow-sm cursor-pointer",
            userInput === option
              ? "bg-primary text-white border-primary"
              : "bg-indigo-50 border-transparent hover:border-indigo-200",
            isCorrect === true && "opacity-75 cursor-not-allowed"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
