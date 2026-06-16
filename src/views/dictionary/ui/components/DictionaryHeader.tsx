import { BookOpen } from "lucide-react";

export default function DictionaryHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-navy">Dictionary</h1>
        <p className="text-slate font-medium mt-2">
          Explore and search your vocabulary library
        </p>
      </div>
      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
        <BookOpen size={24} />
      </div>
    </div>
  );
}
