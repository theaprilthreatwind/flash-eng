import { apiFetch } from "@/shared/api/base";

export interface Lesson {
  id: number;
  theme: string;
  count: number;
}

export const getLessons = () => apiFetch<Lesson[]>("/lessons");
