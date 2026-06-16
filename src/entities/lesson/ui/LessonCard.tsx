import Link from "next/link";
import { Play } from "lucide-react";

interface LessonCardProps {
  id: number;
  title: string;
}

export function LessonCard({ id, title }: LessonCardProps) {
  return (
    <div className="group bg-white border border-indigo-50 rounded-3xl p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>

      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-primary font-black text-2xl group-hover:bg-primary group-hover:text-white transition-colors">
          {id}
        </div>
      </div>

      <h3 className="text-xl font-bold text-navy mb-2">{title}</h3>
      <div className="flex items-center justify-between">

        <Link 
          href={`/lessons/${id}`} 
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all group/btn shrink-0"
        >
          Start
          <Play size={14} className="fill-white group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
