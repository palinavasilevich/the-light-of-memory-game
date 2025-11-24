import { useState, useCallback } from "react";
import { story } from "../data/story";
import type { SceneType } from "../types/game";

export function useSceneNavigation() {
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isInPuzzle, setIsInPuzzle] = useState(false);

  const current: SceneType | undefined = story[index];

  const handleTypingDone = useCallback(() => {
    setIsTyping(false);
  }, []);

  const goToSceneById = useCallback((sceneId: string) => {
    const nextIndex = story.findIndex((s) => s.id === sceneId);
    if (nextIndex === -1) return;

    setIndex(nextIndex);
    setIsTyping(true);
  }, []);

  const handleNext = useCallback(() => {
    if (!current) return;

    if (current.puzzle) {
      setIsInPuzzle(true);
      return;
    }

    if (current.nextSceneId) {
      goToSceneById(current.nextSceneId);
      return;
    }

    if (index < story.length - 1) {
      setIndex(index + 1);
    }

    setIsTyping(true);
  }, [current, index, goToSceneById]);

  const handleSolvedPuzzle = useCallback(() => {
    setIsInPuzzle(false);

    if (current?.puzzle?.nextSceneId) {
      goToSceneById(current.puzzle.nextSceneId);
    } else {
      handleNext();
    }
  }, [current, goToSceneById, handleNext]);

  return {
    index,
    current,
    isTyping,
    isInPuzzle,
    setIsTyping,
    setIsInPuzzle,
    handleTypingDone,
    goToSceneById,
    handleNext,
    handleSolvedPuzzle,
  };
}
