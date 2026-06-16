"use client";

import { useLessonPractice } from "../model/useLessonPractice";
import PracticeSkeleton from "./components/PracticeSkeleton";
import FinishedDashboard from "./components/FinishedDashboard";
import PracticeQuizView from "./components/PracticeQuizView";

export default function PracticeView({ lessonId }: { lessonId: string }) {
  const state = useLessonPractice(lessonId);

  if (!state.mounted) return <PracticeSkeleton />;

  if (state.isFinished) {
    return (
      <FinishedDashboard
        total={state.tasks.length}
        correctCount={state.correctCount}
        incorrectCount={state.incorrectCount}
        skippedCount={state.skippedCount}
        onRestart={state.handleRestart}
      />
    );
  }

  return <PracticeQuizView state={{ ...state, lessonId }} />;
}
