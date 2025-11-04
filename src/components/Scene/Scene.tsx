import { useCallback, useState, useEffect } from "react";
import { TextTyper } from "../TextTyper/TextTyper";
import { story } from "../../data/story";
import { ActionButton } from "../ActionButton/ActionButton";
import { Puzzle } from "../Puzzle/Puzzle";
import { GameLayout } from "../Layout/GameLayout";
import { useGameStore } from "../../store/gameStore";
import type { SceneType } from "../../types/game";

export function StoryScene() {
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isInPuzzle, setIsInPuzzle] = useState(false);
  const current: SceneType | undefined = story[index];

  const { availableActions, setAvailableActions, completeAction } =
    useGameStore();

  const handleTypingDone = useCallback(() => setIsTyping(false), []);

  const goToSceneById = useCallback((sceneId: string) => {
    const nextIndex = story.findIndex((s) => s.id === sceneId);
    if (nextIndex === -1) return;

    setIndex(nextIndex);
    setIsTyping(true);
  }, []);

  const handleNext = useCallback(() => {
    if (!current) return;
    if (current.puzzle) return setIsInPuzzle(true);

    if (current.nextSceneId && availableActions.length === 0)
      return goToSceneById(current.nextSceneId);

    if (index < story.length - 1) {
      setIndex(index + 1);
      setIsTyping(true);
    }
  }, [current, index, availableActions, goToSceneById]);

  const handleActionClick = useCallback(
    (actionId: string, nextSceneId?: string) => {
      completeAction(actionId);
      if (nextSceneId) goToSceneById(nextSceneId);
    },
    [completeAction, goToSceneById]
  );

  const handleSolvedPuzzle = useCallback(() => {
    setIsInPuzzle(false);
    if (current?.puzzle?.nextSceneId) goToSceneById(current.puzzle.nextSceneId);
    else handleNext();
  }, [current, goToSceneById, handleNext]);

  // При загрузке сцены обновляем список доступных действий
  useEffect(() => {
    if (!current) return;

    if (current.actions && current.actions.length > 1) {
      setAvailableActions(current.actions);
    }
    // если это промежуточная сцена (без действий) — ничего не сбрасываем
  }, [current, setAvailableActions]);

  if (!current) return <div>Loading...</div>;

  if (isInPuzzle && current.puzzle)
    return (
      <Puzzle puzzleType={current.puzzle.type} onSolved={handleSolvedPuzzle} />
    );

  const actionsToShow = current.showAvailableActions
    ? availableActions
    : current.actions;

  const showContinueButton =
    current.showAvailableActions &&
    current.actions &&
    current.actions.length > 0 &&
    availableActions.length === 0;

  return (
    // <GameLayout backgroundImg={current.backgroundImg} sceneKey={current.id}>
    //   <TextTyper
    //     text={current.text ?? ""}
    //     speed={35}
    //     onComplete={handleTypingDone}
    //   />
    //   <div className="mt-6">
    //     {!isTyping && current.actions ? (
    //       <div className="flex gap-3">
    //         {current.actions.map((a) => (
    //           <ActionButton
    //             key={a.id}
    //             text={a.text}
    //             onClick={() => handleActionClick(a.id, a.nextSceneId)}
    //           />
    //         ))}
    //       </div>
    //     ) : !isTyping && !current.actions && !current.puzzle ? (
    //       <ActionButton text="Continue" onClick={() => handleNext()} />
    //     ) : (
    //       <div className="mt-3 text-gray-400 text-sm italic animate-pulse">
    //         ...
    //       </div>
    //     )}
    //   </div>
    // </GameLayout>

    <GameLayout backgroundImg={current.backgroundImg} sceneKey={current.id}>
      <TextTyper
        text={current.text ?? ""}
        speed={35}
        onComplete={handleTypingDone}
      />

      <div className="mt-6">
        {!isTyping && actionsToShow && actionsToShow.length > 0 ? (
          <div className="flex gap-3 flex-wrap">
            {actionsToShow.map((a) => (
              <ActionButton
                key={a.id}
                text={a.text}
                onClick={() => handleActionClick(a.id, a.nextSceneId)}
              />
            ))}

            {showContinueButton && (
              <ActionButton text="Continue" onClick={handleNext} />
            )}
          </div>
        ) : !isTyping &&
          (!actionsToShow || actionsToShow.length === 0) &&
          !current.puzzle ? (
          <ActionButton text="Continue" onClick={handleNext} />
        ) : (
          <div className="mt-3 text-gray-400 text-sm italic animate-pulse">
            ...
          </div>
        )}
      </div>
    </GameLayout>
  );
}
