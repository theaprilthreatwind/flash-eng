import { DictionaryFilters } from "./DictionaryFilters";
import { useDictionary } from "../model/useDictionary";
import DictionaryList from "./DictionaryList";

export function Dictionary() {
  const state = useDictionary();
  return (
    <>
      <DictionaryFilters {...state} />
      <DictionaryList filteredWords={state.filteredWords} />
    </>
  );
}