import { LessonCard } from "@/entities/lesson/ui/LessonCard";

export default function LessonsPage() {
  const lessons = [
    {
      title: "entertainment/art/films",
      id: 1,
      vocabulary: [],
    },
  ];

  return (
    <div className="p-16 space-y-12 bg-background text-foreground">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-navy">Lessons Catalog</h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lessons.map((lesson, index) => (
          <LessonCard key={index} id={lesson.id} title={lesson.title} />
        ))}
      </div>
    </div>
  );
}
