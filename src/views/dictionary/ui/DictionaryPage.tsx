"use client";

import { useDictionary } from "../model/useDictionary";
import DictionaryHeader from "./components/DictionaryHeader";
import DictionaryFilters from "./components/DictionaryFilters";
import DictionaryList from "./components/DictionaryList";

export default function DictionaryPage() {
  const state = useDictionary();

  return (
    <div className="p-6 md:p-16 space-y-8 md:space-y-12 bg-background min-h-screen text-foreground">
      <DictionaryHeader />
      <DictionaryFilters {...state} />
      <DictionaryList filteredWords={state.filteredWords} />
    </div>
  );
}
