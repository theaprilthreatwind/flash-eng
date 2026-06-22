import { useState, useMemo, useEffect, useRef } from "react";
import { LessonItem } from "@/entities/lesson";
import { generateTasks } from "../lib/taskGenerator";
import { playSound } from "../lib/sound";
import { generateFloatingEmojis, FloatingEmoji } from "../lib/emojis";
import { VocabularyItem } from "@/entities/vocabulary";

export function useLessonPractice(lessonId: string) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [answeredTasks, setAnsweredTasks] = useState<{
    [index: number]: "correct" | "incorrect" | "skipped";
  }>({});
  const [isFinished, setIsFinished] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [mounted, setMounted] = useState(false);
  
  const [lessonsList, setLessonsList] = useState<LessonItem[] | undefined>(undefined);
  const [vocabularyItems, setVocabularyItems] = useState<
    VocabularyItem[] | undefined
  >(undefined);

  useEffect(() => {
    fetch("/lessons.json")
      .then((response) => response.json())
      .then((data) => setLessonsList(data))
      .catch((error: Error) => console.error(error.message));
  }, []);

  useEffect(() => {
    fetch("/vocabularyItems.json")
      .then((response) => response.json())
      .then((data) => {
        setVocabularyItems(data);
      })
      .catch((error: Error) => console.error(error.message));
  }, []);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const currentLessonWords = useMemo(
    () => vocabularyItems ? vocabularyItems.filter((w) => w.lessonId === parseInt(lessonId)) : [],
    [vocabularyItems, lessonId],
  );
  const currentLessonTheme = useMemo(() => {
    if (!lessonsList) return "";
    const l = lessonsList.find((item) => item.id === parseInt(lessonId));
    return l ? l.title : "";
  }, [lessonsList, lessonId]);

  const tasks = useMemo(
    () => generateTasks(currentLessonWords),
    [currentLessonWords],
  );
  const currentTask = tasks[currentTaskIndex];

  if (vocabularyItems === undefined || lessonsList === undefined) {
    return { mounted: false };
  }

  const handleCheck = (cardElement: HTMLDivElement | null) => {
    if (!currentTask) return;
    const targetAnswer = (currentTask.type === "def-input" || currentTask.type === "def-choice")
      ? currentTask.item.wordEn
      : currentTask.item.sentenceAnswer;

    const isRight =
      userInput.trim().toLowerCase() ===
      targetAnswer.toLowerCase();
    setIsCorrect(isRight);

    if (!(currentTaskIndex in answeredTasks)) {
      if (isRight) {
        setAnsweredTasks((prev) => ({
          ...prev,
          [currentTaskIndex]: "correct",
        }));
        setCorrectCount((c) => c + 1);
      } else {
        setAnsweredTasks((prev) => ({
          ...prev,
          [currentTaskIndex]: "incorrect",
        }));
        setIncorrectCount((i) => i + 1);
      }
    }
    playSound(isRight ? "correct" : "incorrect");
    const newEmojis = generateFloatingEmojis(isRight, cardElement);
    setFloatingEmojis((prev) => [...prev, ...newEmojis]);
    setTimeout(() => {
      setFloatingEmojis((prev) =>
        prev.filter((item) => !newEmojis.find((n) => n.id === item.id)),
      );
    }, 1400);
  };

  const advanceNext = () => {
    setIsCorrect(null);
    setUserInput("");
    setShowHint(false);
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleSkip = () => {
    if (!(currentTaskIndex in answeredTasks)) {
      setAnsweredTasks((prev) => ({ ...prev, [currentTaskIndex]: "skipped" }));
      setSkippedCount((s) => s + 1);
    }
    advanceNext();
  };

  const handleRestart = () => {
    setCurrentTaskIndex(0);
    setUserInput("");
    setIsCorrect(null);
    setShowHint(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setSkippedCount(0);
    setAnsweredTasks({});
    setIsFinished(false);
    setFloatingEmojis([]);
  };

  return {
    tasks,
    currentTask,
    currentTaskIndex,
    userInput,
    setUserInput,
    isCorrect,
    showHint,
    setShowHint,
    correctCount,
    incorrectCount,
    skippedCount,
    isFinished,
    floatingEmojis,
    currentLessonTheme,
    handleCheck,
    advanceNext,
    handleSkip,
    handleRestart,
    mounted,
    cardRef,
  };
}
