"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  Flame,
  Info,
  Lightbulb,
  SkipForward,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  VocabularyItem,
  TaskType,
  LessonTask,
} from "@/shared/types/vocabulary";
import { cn } from "@/shared/lib/utils";
import { vocabularyMockData } from "@/shared/vocabularyItems/vocabularyItems";
import Link from "next/link";

export default function PracticeView({ lessonId }: { lessonId: string }) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showResultOverlay, setShowResultOverlay] = useState(false);

  // Filter words for the current lesson
  const currentLessonWords = useMemo(
    () =>
      vocabularyMockData.filter((w) => w.lessonNumber === parseInt(lessonId)),
    [lessonId],
  );

  // Generate tasks for the lesson
  const tasks: LessonTask[] = useMemo(() => {
    const allTasks: LessonTask[] = [];
    currentLessonWords.forEach((word) => {
      // TASK-1: Context Input
      allTasks.push({ id: `${word.id}-1`, type: "context-input", item: word });

      // TASK-2: Context Choice
      const distractors = currentLessonWords
        .filter((w) => w.id !== word.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((w) => w.wordEn);

      allTasks.push({
        id: `${word.id}-2`,
        type: "context-choice",
        item: word,
        options: [word.wordEn, ...distractors].sort(() => Math.random() - 0.5),
      });

      // TASK-3: Def Input
      allTasks.push({ id: `${word.id}-3`, type: "def-input", item: word });

      // TASK-4: Def Choice
      allTasks.push({
        id: `${word.id}-4`,
        type: "def-choice",
        item: word,
        options: [word.wordEn, ...distractors].sort(() => Math.random() - 0.5),
      });
    });
    // Shuffle tasks
    return allTasks.sort(() => Math.random() - 0.5);
  }, [currentLessonWords]);

  const currentTask = tasks[currentTaskIndex];

  if (!currentTask) return <div>No tasks found for this lesson.</div>;

  const word = currentTask.item;
  const progress = Math.round((currentTaskIndex / tasks.length) * 100);

  const handleCheck = () => {
    const correct = word.wordEn.toLowerCase();
    const isRight = userInput.trim().toLowerCase() === correct;
    setIsCorrect(isRight);
    if (isRight) {
      setShowResultOverlay(true);
    }
  };

  const handleNext = () => {
    setShowResultOverlay(false);
    setIsCorrect(null);
    setUserInput("");
    setShowHint(false);
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex((prev) => prev + 1);
    } else {
      alert("Lesson complete!");
    }
  };

  const renderTaskContent = () => {
    if (
      currentTask.type === "context-input" ||
      currentTask.type === "context-choice"
    ) {
      const parts = word.sentenceEn.split("{{target}}");
      return (
        <div className="py-8 text-center md:text-left">
          <div className="text-[42px] font-black text-navy leading-[1.2] tracking-tight flex flex-wrap items-baseline justify-center md:justify-start gap-3">
            <span>{parts[0]}</span>
            <div className="relative inline-block">
              {currentTask.type === "context-input" ? (
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="........"
                  autoFocus
                  className="bg-transparent border-b-4 border-primary text-primary focus:outline-none min-w-[180px] text-center placeholder:text-indigo-100"
                />
              ) : (
                <span className="text-primary border-b-4 border-primary min-w-[120px] text-center inline-block">
                  {userInput || "........"}
                </span>
              )}
            </div>
            <span>{parts[1]}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="py-8 text-center space-y-6">
          <div className="text-navy font-bold uppercase text-[12px] tracking-widest block text-slate-muted">
            Definition
          </div>
          <div className="text-3xl font-black text-navy leading-relaxed">
            &quot;{word.definitionEn}&quot;
          </div>
          {currentTask.type === "def-input" && (
            <div className="flex justify-center pt-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type the word..."
                autoFocus
                className="bg-transparent border-b-4 border-primary text-primary focus:outline-none min-w-[250px] text-center text-2xl font-bold placeholder:text-indigo-100"
              />
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-16 py-8 font-sans">
      {/* Exercise Header */}
      <div className="w-full max-w-[1200px] flex flex-col gap-6 mb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/lessons"
              className="p-2 hover:bg-indigo-50 rounded-full transition-all"
            >
              <ChevronLeft size={20} className="text-navy" />
            </Link>
            <div className="flex flex-col">
              <h2 className="text-2xl font-black text-navy uppercase tracking-tight">
                Lesson {lessonId}
              </h2>
              <span className="text-slate font-medium">{word.lessonTheme}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl">
            <Flame size={18} className="text-success fill-success" />
            <span className="text-success font-bold uppercase text-xs tracking-widest">
              8 Day Streak
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-2 w-full bg-primary/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate">
            <span>
              Task {currentTaskIndex + 1} / {tasks.length}
            </span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Main Exercise Card */}
      <div className="w-full max-w-[850px] space-y-8 flex flex-col items-center">
        <div className="w-full bg-white border border-indigo-100/30 rounded-3xl p-10 shadow-sm relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
              <Info size={20} />
            </div>
            <span className="text-[12px] font-black text-slate/60 uppercase tracking-widest">
              {currentTask.type.replace("-", " ")}
            </span>
          </div>

          {renderTaskContent()}

          <div className="flex items-center gap-4 mt-6">
            <div className="bg-sidebar px-4 py-3 rounded-xl flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-300 rounded-full"></div>
              <span className="text-[12px] font-bold text-slate uppercase">
                {word.partOfSpeech}
              </span>
            </div>
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-3 rounded-xl flex items-center gap-2 text-primary font-black text-[12px] uppercase tracking-widest hover:bg-indigo-50 transition-all"
            >
              <Lightbulb size={16} />
              {showHint ? word.wordRu : "Get a hint"}
            </button>
          </div>
        </div>

        {/* Action Area */}
        <div className="w-full flex items-center justify-between">
          <button
            onClick={() =>
              setCurrentTaskIndex((prev) => (prev + 1) % tasks.length)
            }
            className="flex items-center gap-3 px-8 py-3 border-2 border-primary/20 text-primary rounded-xl font-black uppercase text-xs tracking-widest hover:bg-indigo-50 transition-all"
          >
            <SkipForward size={20} />
            Skip
          </button>

          <button
            onClick={handleCheck}
            className="flex items-center gap-3 px-12 py-3 bg-primary text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-soft hover:opacity-90 transition-all active:scale-95"
          >
            Check
            <CheckCircle2 size={20} />
          </button>
        </div>

        {/* Choice Bank */}
        {(currentTask.type === "context-choice" ||
          currentTask.type === "def-choice") && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {currentTask.options?.map((option) => (
              <button
                key={option}
                onClick={() => setUserInput(option)}
                className={cn(
                  "py-5 rounded-2xl text-navy font-bold transition-all border-2 active:scale-95 shadow-sm",
                  userInput === option
                    ? "bg-primary text-white border-primary"
                    : "bg-indigo-50 border-transparent hover:border-indigo-200",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Error Feedback */}
        {isCorrect === false && (
          <div className="w-full bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
            <XCircle className="text-error" />
            <span className="text-red-700 font-bold uppercase text-[10px] tracking-widest">
              Incorrect. Try again or check the hint!
            </span>
          </div>
        )}
      </div>

      {/* Success Feedback Overlay */}
      {showResultOverlay && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300 p-6">
          <div className="bg-white border-2 border-green-100 p-10 rounded-[40px] shadow-2xl flex flex-col items-center gap-8 max-w-[500px] text-center">
            <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center shadow-lg shadow-green-100">
              <CheckCircle2 size={48} className="text-success" />
            </div>
            <div className="space-y-3">
              <h3 className="text-4xl font-black text-success uppercase tracking-tight">
                Excellent!
              </h3>
              <p className="text-slate font-medium text-lg leading-relaxed">
                &quot;{word.wordEn}&quot; is correct!
              </p>
              <div className="mt-4 p-6 bg-sidebar rounded-2xl text-sm italic text-navy border border-indigo-100/50">
                {word.exampleEn}
                <div className="mt-2 text-[10px] not-italic font-black text-slate-muted uppercase tracking-widest">
                  {word.exampleRu}
                </div>
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <button className="flex-1 bg-indigo-50 py-4 rounded-2xl text-navy font-black uppercase text-xs tracking-widest hover:bg-indigo-100 transition-all">
                See Usage
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-primary text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-soft hover:opacity-90 transition-all"
              >
                Next Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
