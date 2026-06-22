import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface LessonHeaderProps {
  lessonId: string;
  lessonTheme: string;
  currentTaskIndex: number;
  totalTasks: number;
}

export default function LessonHeader({
  lessonId,
  lessonTheme,
  currentTaskIndex,
  totalTasks,
}: LessonHeaderProps) {
  const progress = Math.round((currentTaskIndex / totalTasks) * 100);

  return (
    <div className="w-full max-w-[1200px] flex flex-col gap-6 mb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/lessons" className="p-2 hover:bg-indigo-50 rounded-full transition-all">
            <ChevronLeft size={20} className="text-navy" />
          </Link>
          <div className="flex flex-col">
            <h2 className="text-2xl font-black text-navy uppercase tracking-tight">
              Lesson {lessonId}
            </h2>
            <span className="text-slate font-medium">{lessonTheme}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-2 w-full bg-primary/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate">
          <span>Task {currentTaskIndex + 1} / {totalTasks}</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
