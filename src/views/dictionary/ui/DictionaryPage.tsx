"use client";

import { useDictionary } from "../model/useDictionary";
import DictionaryHeader from "./components/DictionaryHeader";
import DictionaryFilters from "./components/DictionaryFilters";
import DictionaryList from "./components/DictionaryList";
import { VocabularyItem } from "@/entities/vocabulary";
import { Suspense } from "react"
export default function DictionaryPage() {
  const dictionary = getDictionary()
  const state = useDictionary();

  return (
    <div className="p-6 md:p-16 space-y-8 md:space-y-12 bg-background min-h-screen text-foreground">
      <DictionaryHeader />
      <DictionaryFilters {...state} />
      <Suspense>
        <DictionaryList filteredWords={state.filteredWords} />
      </Suspense>
    </div>
  );
}

async function getDictionary() {
  const response = await fetch("/vocabularyItems.json");

  if (!response.ok) {
    throw new Error("Failed to fetch dictionary: " + response.statusText);
  }

  const data: VocabularyItem[] = await response.json();
  return data
}