"use client";

import DictionaryHeader from "./DictionaryHeader";
import { Dictionary } from "@/widgets/dictionary-view";

export default function DictionaryPage() {
  return (
    <div className="p-6 md:p-16 space-y-8 md:space-y-12 bg-background min-h-screen text-foreground">
      <DictionaryHeader />
      <Dictionary />
    </div>
  );
}
