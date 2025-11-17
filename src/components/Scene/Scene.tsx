import { useCallback, useState, useEffect, useRef } from "react";
import { TextTyper } from "../TextTyper/TextTyper";
import { story } from "../../data/story";
import { ActionButton } from "../ActionButton/ActionButton";
import { Puzzle } from "../Puzzle/Puzzle";
import { GameLayout } from "../Layout/GameLayout";
import { useGameStore } from "../../store/gameStore";
import type { SceneType } from "../../types/game";
import { StartScreen } from "../StartScreen/StartScreen";
import { images } from "../../data/assets";

const SILENT_MP3 =
  "data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAAwACAAAAAAAuQAA";

export function StoryScene() {
  const [isStarted, setIsStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isInPuzzle, setIsInPuzzle] = useState(false);

  const {
    availableActions,
    setAvailableActions,
    completeAction,
    isSoundEnabled,
  } = useGameStore();

  const current: SceneType | undefined = story[index];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  // -------------------------
  // Fade helpers
  // -------------------------
  const clearFade = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
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
      if (audio.volume + step < target) {
        audio.volume = Math.min(audio.volume + step, target);
      } else {
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
      if (audio.volume - step > 0.01) {
        audio.volume = Math.max(audio.volume - step, 0);
      } else {
        audio.volume = 0;
        audio.pause();
        clearFade();
      }
    }, 16);
  };

  // -------------------------
  // Start game — create audio here
  // -------------------------
  const startGame = useCallback(() => {
    setIsStarted(true);

    // Create audio strictly in user gesture
    if (!audioRef.current) {
      const a = new Audio();
      a.preload = "auto";
      a.loop = current.notSoundLoop ? false : true;
      a.volume = 0; // fade will set proper value
      audioRef.current = a;
    }

    // Unlock autoplay policy
    audioRef.current.src = SILENT_MP3;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, []);

  // -------------------------
  // Play scene sounds when scene changes
  // -------------------------
  useEffect(() => {
    // Do not play sound until Start clicked
    if (!isStarted) return;

    if (!current?.sound) {
      if (audioRef.current && !audioRef.current.paused) {
        fadeOutAudio(audioRef.current, 300);
      }
      return;
    }

    if (!isSoundEnabled) return;
    if (!audioRef.current) return;

    const audio = audioRef.current;

    audio.src = current.sound;
    audio.loop = current.notSoundLoop ? false : true;
    audio.currentTime = 0;

    audio
      .play()
      .then(() => fadeInAudio(audio, 500, 0.4))
      .catch(() => {});
  }, [current?.sound, isSoundEnabled, isStarted]);

  // -------------------------
  // React to global Mute / Unmute
  // -------------------------
  useEffect(() => {
    if (!audioRef.current) return;
    if (!isStarted) return;

    const audio = audioRef.current;

    if (!isSoundEnabled) {
      fadeOutAudio(audio, 300);
    } else {
      if (current?.sound) {
        audio.src = current.sound;
        audio.loop = current.notSoundLoop ? false : true;
        audio.currentTime = 0;
        audio
          .play()
          .then(() => fadeInAudio(audio, 400, 0.4))
          .catch(() => {});
      }
    }
  }, [isSoundEnabled, isStarted, current?.sound]);

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

  // -------------------------
  // Available actions
  // -------------------------
  useEffect(() => {
    if (!current) return;
    if (current.actions && current.actions.length > 1) {
      setAvailableActions(current.actions);
    }
  }, [current, setAvailableActions]);

  // -------------------------
  // START SCREEN
  // -------------------------
  if (!isStarted) {
    return (
      <GameLayout backgroundImg={images.startScreen} sceneKey="start-screen">
        <StartScreen onStart={startGame} />
      </GameLayout>
    );
  }

  // -------------------------
  // PUZZLE MODE
  // -------------------------
  if (isInPuzzle && current?.puzzle) {
    return (
      <GameLayout
        backgroundImg={current.backgroundImg}
        sceneKey={current.id}
        isPuzzle
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
  );
}
