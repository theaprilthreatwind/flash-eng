"use client";

import { useEffect, useState } from "react";
import { LessonCard } from "@/entities/lesson/ui/LessonCard";
import { LessonItem } from "@/entities/lesson";

export default function LessonsPage() {
  const [lessons, setLessons] = useState<LessonItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/lessons.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load lessons");
        return res.json();
      })
      .then((data) => {
        setLessons(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 md:p-16 space-y-8 md:space-y-12 bg-background text-foreground">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-black text-navy">Lessons Catalog</h1>
      </div>

      {loading && (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-indigo-200">
          <p className="text-slate font-medium">Loading lessons...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-24 bg-red-50 rounded-3xl border border-dashed border-red-200">
          <p className="text-red-600 font-medium">Error: {error}</p>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && lessons && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {lessons.map((lesson, index) => (
            <LessonCard key={index} id={lesson.id} title={lesson.title} />
          ))}
        </div>
      )}
    </div>
  );
}

