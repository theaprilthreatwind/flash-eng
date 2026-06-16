import Link from "next/link";
import { Trophy, RotateCcw, Home } from "lucide-react";

interface FinishedProps {
  total: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  onRestart: () => void;
}

export default function FinishedDashboard({
  total,
  correctCount,
  incorrectCount,
  skippedCount,
  onRestart,
}: FinishedProps) {
  const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const stats = [
    { value: correctCount, label: "Correct", text: "text-success", bg: "bg-green-50/50", border: "border-green-100/50" },
    { value: incorrectCount, label: "Incorrect", text: "text-error", bg: "bg-red-50/50", border: "border-red-100/50" },
    { value: skippedCount, label: "Skipped", text: "text-slate", bg: "bg-indigo-50/50", border: "border-indigo-100/50" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12 font-sans w-full">
      <div className="w-full max-w-[600px] bg-white border border-indigo-100/30 rounded-[32px] p-6 sm:p-10 shadow-soft text-center space-y-8 relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-success/5 rounded-full blur-2xl"></div>

        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-bounce">
            <Trophy size={44} className="stroke-[1.5]" />
          </div>
          <h2 className="text-3xl font-black text-navy uppercase tracking-tight">Lesson Completed!</h2>
          <p className="text-slate font-medium text-lg">Here is how you performed on this lesson:</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {stats.map((s, idx) => (
            <div key={idx} className={`${s.bg} ${s.border} border p-6 rounded-2xl flex flex-col items-center`}>
              <span className={`${s.text} text-3xl font-black`}>{s.value}</span>
              <span className={`${s.text} text-[10px] font-black uppercase tracking-widest mt-2`}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="py-4 flex flex-col items-center justify-center space-y-2">
          <div className="text-5xl font-black text-primary">{percent}%</div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-muted">Accuracy Score</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button onClick={onRestart} className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-navy py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-indigo-100/80 transition-all active:scale-95 cursor-pointer">
            <RotateCcw size={16} /> Try Again
          </button>
          <Link href="/lessons" className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-soft text-center cursor-pointer">
            <Home size={16} /> Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
