import LessonPage from "@/views/lesson/ui/LessonPage";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <LessonPage params={params} />;
}
