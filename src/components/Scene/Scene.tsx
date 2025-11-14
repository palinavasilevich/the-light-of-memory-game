import { useCallback, useState, useEffect } from "react";
import { TextTyper } from "../TextTyper/TextTyper";
import { story } from "../../data/story";
import { ActionButton } from "../ActionButton/ActionButton";
import { Puzzle } from "../Puzzle/Puzzle";
import { GameLayout } from "../Layout/GameLayout";
import { useGameStore } from "../../store/gameStore";
import type { SceneType } from "../../types/game";
import { PuzzleLantern } from "../Puzzle/PuzzleLantern";

export function StoryScene() {
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isInPuzzle, setIsInPuzzle] = useState(false);

  const { availableActions, setAvailableActions, completeAction } =
    useGameStore();

  const current: SceneType | undefined = story[index];

  const handleTypingDone = useCallback(() => setIsTyping(false), []);

  const goToSceneById = useCallback((sceneId: string) => {
    const nextIndex = story.findIndex((s) => s.id === sceneId);
    if (nextIndex === -1) return;
    setIndex(nextIndex);
    setIsTyping(true);
  }, []);

  const handleNext = useCallback(() => {
    if (!current) return;

    // Если это сцена с puzzle — запускаем игру по клику на Continue
    if (current.puzzle) {
      setIsInPuzzle(true);
      return;
    }

    // Если есть nextSceneId — идём туда
    if (current.nextSceneId) return goToSceneById(current.nextSceneId);

    // Иначе — следующая сцена по порядку
    if (index < story.length - 1) setIndex(index + 1);
    setIsTyping(true);
  }, [current, goToSceneById, index]);

  const handleActionClick = useCallback(
    (actionId: string, nextSceneId?: string) => {
      completeAction(actionId);
      if (nextSceneId) goToSceneById(nextSceneId);
      else handleNext();
    },
    [completeAction, goToSceneById, handleNext]
  );

  const handleSolvedPuzzle = useCallback(() => {
    setIsInPuzzle(false);
    if (current?.puzzle?.nextSceneId) goToSceneById(current.puzzle.nextSceneId);
    else handleNext();
  }, [current, goToSceneById, handleNext]);

  useEffect(() => {
    if (!current) return;
    if (current.actions && current.actions.length > 1) {
      setAvailableActions(current.actions);
    }
  }, [current, setAvailableActions]);

  if (!current) return <div>Loading...</div>;

  if (isInPuzzle && current.puzzle) {
    return (
      <GameLayout backgroundImg={current.backgroundImg} sceneKey={current.id}>
        <Puzzle
          puzzleType={current.puzzle.type}
          onSolved={handleSolvedPuzzle}
        />
      </GameLayout>
    );
  }

  const actionsToShow = current.showAvailableActions
    ? availableActions
    : current.actions;

  const showContinueButton =
    !isInPuzzle &&
    !isTyping &&
    (!actionsToShow ||
      actionsToShow.length === 0 ||
      (current.puzzle && !current.actions));

  return (
    <GameLayout backgroundImg={current.backgroundImg} sceneKey={current.id}>
      <TextTyper
        text={current.text ?? ""}
        speed={40}
        onComplete={handleTypingDone}
      />

      <div className="mt-6">
        {!isTyping ? (
          <>
            {actionsToShow && actionsToShow.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {actionsToShow.map((a) => (
                  <ActionButton
                    key={a.id}
                    text={a.text}
                    onClick={() => handleActionClick(a.id, a.nextSceneId)}
                  />
                ))}
              </div>
            )}

            {showContinueButton && (
              <ActionButton text="Continue" onClick={handleNext} />
            )}
          </>
        ) : (
          <div className="mt-3 text-gray-400 text-sm italic animate-pulse"></div>
        )}
      </div>
    </GameLayout>
    // <PuzzleLantern onSolved={() => {}} />
  );
}
