import { useCallback, useState } from "react";
import { TextTyper } from "../TextTyper/TextTyper";
import { story } from "../../data/story";
import { ActionButton } from "../ActionButton/ActionButton";
import { Puzzle } from "../Puzzle/Puzzle";
import type { SceneType } from "../../types/game";

export function StoryScene() {
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isInPuzzle, setIsInPuzzle] = useState(false);

  const current: SceneType | undefined = story[index];

  const handleTypingDone = useCallback(() => {
    setIsTyping(false);
  }, []);

  const goToSceneById = useCallback((sceneId: string) => {
    const nextIndex = story.findIndex((s) => s.id === sceneId);
    if (nextIndex !== -1) {
      setIndex(nextIndex);
      setIsTyping(true);
    }
  }, []);

  const handleNext = useCallback(
    (actionId?: string) => {
      setIsTyping(true);

      if (!current) return;

      // Если есть пазл, открываем его вместо перехода
      if (current.puzzle) {
        setIsInPuzzle(true);
        return;
      }

      if (actionId) {
        // Здесь можно добавить логику ветвления или условий
        console.log("Action chosen:", actionId);

        // Пробуем перейти по nextSceneId, если задан в действии
        const action = current.actions?.find((a) => a.id === actionId);
        if (action?.nextSceneId) {
          goToSceneById(action.nextSceneId);
          return;
        }
      }

      // Иначе просто идём к следующей сцене по порядку
      if (index < story.length - 1) {
        setIndex((prev) => prev + 1);
      }
    },
    [current, index, goToSceneById]
  );

  const handleSolvedPuzzle = useCallback(() => {
    setIsInPuzzle(false);

    if (!current) return;

    // Переход по nextSceneId пазла
    if (current.puzzle?.nextSceneId) {
      goToSceneById(current.puzzle.nextSceneId);
      return;
    }

    // Иначе просто следующая сцена
    if (index < story.length - 1) {
      setIndex((prev) => prev + 1);
      setIsTyping(true);
    }
  }, [current, index, goToSceneById]);

  if (!current) return <div>Loading...</div>;

  // Рендер пазла, если открыт
  if (isInPuzzle && current.puzzle) {
    return (
      <Puzzle puzzleType={current.puzzle.type} onSolved={handleSolvedPuzzle} />
    );
  }

  return (
    <div className="p-6 text-lg text-gray-100 bg-black/50 rounded-xl">
      {current.backgroundImg && (
        <img
          src={current.backgroundImg}
          alt="background"
          className="w-full h-64 object-cover rounded-lg mb-4 opacity-70"
        />
      )}

      <TextTyper
        text={current.text ?? ""}
        speed={35}
        onComplete={handleTypingDone}
      />

      <div className="mt-4">
        {!isTyping && current.actions && (
          <div className="flex flex-col gap-2">
            {current.actions.map((action) => (
              <ActionButton
                key={action.id}
                text={action.text}
                onClick={() => handleNext(action.id)}
              />
            ))}
          </div>
        )}

        {!isTyping && !current.actions && !current.puzzle && (
          <ActionButton text="Continue" onClick={() => handleNext()} />
        )}

        {isTyping && (
          <div className="mt-2 text-gray-400 text-sm italic">...</div>
        )}
      </div>
    </div>
  );
}
