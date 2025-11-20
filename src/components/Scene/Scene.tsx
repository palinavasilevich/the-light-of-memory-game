import { useCallback, useState, useEffect, useRef } from "react";
import { TextTyper } from "../TextTyper/TextTyper";
import { story } from "../../data/story";
import { ActionButton } from "../ActionButton/ActionButton";
import { Puzzle } from "../Puzzle/Puzzle";
import { GameLayout } from "../Layout/GameLayout";
import { useGameStore } from "../../store/gameStore";
import type { ActionType, SceneType } from "../../types/game";
import { StartScreen } from "../StartScreen/StartScreen";
import { images } from "../../data/assets";
import { ExtraContentModal } from "../Modal/ExtraContentModal";

const SILENT_MP3 =
  "data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAAwACAAAAAAAuQAA";

export function StoryScene() {
  const [isStarted, setIsStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isInPuzzle, setIsInPuzzle] = useState(false);
  const [extraContentAction, setExtraContentAction] = useState<{
    nextSceneId: string;
    text?: string;
    image?: string;
  } | null>(null);

  const [actionsLocked, setActionsLocked] = useState(false);

  const {
    availableActions,
    setAvailableActions,
    completeAction,
    isSoundEnabled,
  } = useGameStore();

  const current: SceneType | undefined = story[index];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  const isEndOfGame = current.isEndOfGame;

  // -------------------------
  // Audio fade helpers
  // -------------------------
  const clearFade = () => {
    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const fadeInAudio = (
    audio: HTMLAudioElement,
    duration = 500,
    target = 0.4
  ) => {
    clearFade();
    audio.volume = 0;
    const step = target / (duration / 16);
    fadeIntervalRef.current = window.setInterval(() => {
      if (audio.volume + step < target)
        audio.volume = Math.min(audio.volume + step, target);
      else {
        audio.volume = target;
        clearFade();
      }
    }, 16);
  };

  const fadeOutAudio = (audio: HTMLAudioElement, duration = 400) => {
    clearFade();
    const start = audio.volume;
    const step = start / (duration / 16 || 1);
    fadeIntervalRef.current = window.setInterval(() => {
      if (audio.volume - step > 0.01)
        audio.volume = Math.max(audio.volume - step, 0);
      else {
        audio.volume = 0;
        audio.pause();
        clearFade();
      }
    }, 16);
  };

  // -------------------------
  // Start game
  // -------------------------
  const startGame = useCallback(() => {
    setIsStarted(true);

    if (!audioRef.current) {
      const a = new Audio();
      a.preload = "auto";
      a.loop = true;
      a.volume = 0;
      audioRef.current = a;
    }

    // Unlock autoplay
    audioRef.current.src = SILENT_MP3;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, []);

  // -------------------------
  // Play scene sound
  // -------------------------
  useEffect(() => {
    if (!isStarted || !audioRef.current) return;

    const audio = audioRef.current;

    if (!current?.sound || !isSoundEnabled) {
      fadeOutAudio(audio, 300);
      return;
    }

    audio.src = current.sound;
    audio.loop = !current.notSoundLoop;
    audio.currentTime = 0;
    audio
      .play()
      .then(() => fadeInAudio(audio, 500, 0.4))
      .catch(() => {});
  }, [current?.sound, isSoundEnabled, isStarted]);

  // -------------------------
  // Scene navigation
  // -------------------------
  const handleTypingDone = useCallback(() => setIsTyping(false), []);

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
    if (current.nextSceneId) return goToSceneById(current.nextSceneId);
    if (index < story.length - 1) setIndex(index + 1);
    setIsTyping(true);
  }, [current, goToSceneById, index]);

  const handleActionClick = useCallback(
    (action: ActionType) => {
      completeAction(action.id);

      if (action.extraContent && action.nextSceneId) {
        setExtraContentAction({
          nextSceneId: action.nextSceneId,
          text: action.extraContent.text,
          image: action.extraContent.image,
        });
      } else if (action.nextSceneId) {
        goToSceneById(action.nextSceneId);
      } else {
        handleNext();
      }
    },
    [completeAction, goToSceneById, handleNext]
  );

  const handleSolvedPuzzle = useCallback(() => {
    setIsInPuzzle(false);
    if (current?.puzzle?.nextSceneId) goToSceneById(current.puzzle.nextSceneId);
    else handleNext();
  }, [current, goToSceneById, handleNext]);

  // -------------------------
  // Available actions & delayed actions
  // -------------------------
  useEffect(() => {
    if (!current) return;

    if (current.actions && current.actions.length > 1) {
      setAvailableActions(current.actions);
    }

    // if (current.duration) {
    //   setActionsLocked(true);
    //   const timeout = window.setTimeout(() => {
    //     setActionsLocked(false);
    //   }, current.duration);
    //   return () => clearTimeout(timeout);
    // } else {
    //   setActionsLocked(false);
    // }
  }, [current, setAvailableActions]);

  useEffect(() => {
    if (!current) return;

    if (isTyping) return;

    if (current.puzzle) return;

    if (!current.duration) return;

    const timeout = window.setTimeout(() => {
      if (current.nextSceneId) {
        goToSceneById(current.nextSceneId);
      } else {
        handleNext();
      }
    }, current.duration);

    return () => clearTimeout(timeout);
  }, [current, isTyping, availableActions, goToSceneById, handleNext]);

  // -------------------------
  // Render
  // -------------------------
  if (!isStarted) {
    return (
      <GameLayout backgroundImg={images.startScreen} sceneKey="start-screen">
        <StartScreen onStart={startGame} />
      </GameLayout>
    );
  }

  if (isInPuzzle && current?.puzzle) {
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

  if (!current) return <div>Loading...</div>;

  const actionsToShow = current.showAvailableActions
    ? availableActions
    : current.actions;

  const showContinueButton =
    !isTyping &&
    (!actionsToShow ||
      actionsToShow.length === 0 ||
      (current.puzzle && !current.actions)) &&
    !current.duration;

  return (
    <GameLayout backgroundImg={current.backgroundImg} sceneKey={current.id}>
      <TextTyper
        text={current.text ?? ""}
        speed={40}
        onComplete={handleTypingDone}
      />

      <div className="mt-6">
        {!isTyping &&
          !isEndOfGame &&
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

        {!isEndOfGame && showContinueButton && (
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
