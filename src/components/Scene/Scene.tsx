import { useState } from "react";
import { GameLayout } from "../Layout/GameLayout";
import { StartScreen } from "../StartScreen/StartScreen";
import { TextTyper } from "../TextTyper/TextTyper";
import { Puzzle } from "../Puzzle/Puzzle";
import { ActionButton } from "../ActionButton/ActionButton";
import { ExtraContentModal } from "../Modal/ExtraContentModal";
import { images } from "../../data/assets";

import { useSceneAudio } from "../../hooks/useSceneAudio";
import { useSceneNavigation } from "../../hooks/useSceneNavigation";
import { useSceneActions } from "../../hooks/useSceneActions";
import { useGameStore } from "../../store/gameStore";

export function StoryScene() {
  const [isStarted, setIsStarted] = useState(false);
  const isSoundEnabled = useGameStore((s) => s.isSoundEnabled);

  // -----------------------------
  // Navigation
  // -----------------------------
  const {
    current,
    isTyping,
    isInPuzzle,
    handleTypingDone,
    handleNext,
    handleSolvedPuzzle,
    goToSceneById,
  } = useSceneNavigation();

  // -----------------------------
  // Audio
  // -----------------------------
  const { initAudio } = useSceneAudio({
    currentScene: current,
    isStarted,
    isSoundEnabled,
  });

  const startGame = () => {
    initAudio(); // user gesture → unlock audio
    setIsStarted(true);
  };

  // -----------------------------
  // Actions & modals
  // -----------------------------
  const {
    actionsToShow,
    showContinueButton,
    handleActionClick,
    extraContentAction,
    setExtraContentAction,
  } = useSceneActions({
    current,
    isTyping,
    handleNext,
    goToSceneById,
  });

  // -----------------------------
  // RENDER
  // -----------------------------
  if (!isStarted) {
    return (
      <GameLayout backgroundImg={images.startScreen} sceneKey="start-screen">
        {/* НИКАКОГО <audio ref={audioRef} /> ЗДЕСЬ */}
        <StartScreen onStart={startGame} />
      </GameLayout>
    );
  }

  if (!current) return <div>Loading...</div>;

  // Puzzle scene
  if (isInPuzzle && current.puzzle) {
    return (
      <GameLayout
        backgroundImg={current.backgroundImg}
        sceneKey={current.id}
        isPuzzle
        classNameContentBlock={
          current.puzzle.type === "lantern" ? "max-w-4xl" : "max-w-3xl"
        }
      >
        <Puzzle
          puzzleType={current.puzzle.type}
          onSolved={handleSolvedPuzzle}
        />
      </GameLayout>
    );
  }

  return (
    <GameLayout backgroundImg={current.backgroundImg} sceneKey={current.id}>
      <TextTyper
        text={current.text ?? ""}
        speed={40}
        onComplete={handleTypingDone}
      />

      <div className="mt-6">
        {!isTyping &&
          !current.isEndOfGame &&
          actionsToShow &&
          actionsToShow.length > 0 &&
          !current.duration && (
            <div className="flex gap-3 flex-wrap">
              {actionsToShow.map((a) => (
                <ActionButton
                  key={a.id}
                  text={a.text}
                  onClick={() => handleActionClick(a)}
                />
              ))}
            </div>
          )}

        {!current.isEndOfGame && showContinueButton && (
          <ActionButton text="Continue" onClick={handleNext} />
        )}
      </div>

      {extraContentAction && (
        <ExtraContentModal
          text={extraContentAction.text}
          image={extraContentAction.image}
          onContinue={() => {
            goToSceneById(extraContentAction.nextSceneId);
            setExtraContentAction(null);
          }}
        />
      )}
    </GameLayout>
  );
}
