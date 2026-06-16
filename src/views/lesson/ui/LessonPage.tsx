"use client";

import { use } from "react";
import PracticeView from "@/widgets/lesson-view/ui/PracticeView";

interface LessonPageProps {
  params: Promise<{ id: string }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  const { id } = use(params);

  return <PracticeView lessonId={id} />;
}
