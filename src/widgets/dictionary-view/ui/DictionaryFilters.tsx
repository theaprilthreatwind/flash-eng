import { Search } from "lucide-react";
import { LessonItem } from "@/entities/lesson";

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedLesson: number | "all";
  setSelectedLesson: (val: number | "all") => void;
  lessons: LessonItem[];
}

export function DictionaryFilters({
  searchTerm,
  setSearchTerm,
  selectedLesson,
  setSelectedLesson,
  lessons,
}: FiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-muted" size={20} />
        <input
          type="text"
          placeholder="Search words or translations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-6 py-4 bg-white border border-indigo-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
        />
      </div>
      <select
        value={selectedLesson}
        onChange={(e) =>
          setSelectedLesson(e.target.value === "all" ? "all" : parseInt(e.target.value))
        }
        className="px-6 py-4 bg-white border border-indigo-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm text-navy font-bold appearance-none cursor-pointer"
      >
        <option value="all">All Lessons</option>
        {lessons.map((lesson) => (
          <option key={lesson.id} value={lesson.id}>
            Lesson {lesson.id}: {lesson.title}
          </option>
        ))}
      </select>
    </div>
  );
}

