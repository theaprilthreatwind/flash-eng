import { LessonCard } from "@/entities/lesson/ui/LessonCard";
import { lessons } from "@/shared/lessons/lessons";

export default function LessonsPage() {


  return (
    <div className="p-6 md:p-16 space-y-8 md:space-y-12 bg-background text-foreground">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-black text-navy">Lessons Catalog</h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {lessons.map((lesson, index) => (
          <LessonCard key={index} id={lesson.id} title={lesson.title} />
        ))}
      </div>
    </div>
  );
}
