import { useEffect, useRef, useCallback } from "react";
import type { SceneType } from "../types/game";
import { SILENT_MP3 } from "../constants";

type Props = {
  currentScene?: SceneType;
  isStarted: boolean;
  isSoundEnabled: boolean;
};

export function useSceneAudio({
  currentScene,
  isStarted,
  isSoundEnabled,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);

  // -------------------------
  // Fade helpers
  // -------------------------
  const clearFade = useCallback(() => {
    if (fadeRef.current) {
      window.clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  const fadeIn = useCallback(
    (audio: HTMLAudioElement, duration = 500, target = 0.4) => {
      clearFade();
      audio.volume = 0;
      const step = target / (duration / 16);

      fadeRef.current = window.setInterval(() => {
        if (audio.volume + step < target) {
          audio.volume = Math.min(audio.volume + step, target);
        } else {
          audio.volume = target;
          clearFade();
        }
      }, 16);
    },
    [clearFade]
  );

  const fadeOut = useCallback(
    (audio: HTMLAudioElement, duration = 400) => {
      clearFade();
      const start = audio.volume;
      const step = start / (duration / 16 || 1);

      fadeRef.current = window.setInterval(() => {
        if (audio.volume - step > 0.01) {
          audio.volume = Math.max(audio.volume - step, 0);
        } else {
          audio.volume = 0;
          audio.pause();
          clearFade();
        }
      }, 16);
    },
    [clearFade]
  );

  // -------------------------
  // Init audio (call in user gesture)
  // -------------------------
  const initAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "auto";
      audio.loop = true;
      audio.volume = 0;
      audioRef.current = audio;
    }

    const audio = audioRef.current;
    audio.src = SILENT_MP3;
    audio.currentTime = 0;

    // разблокируем воспроизведение
    audio.play().catch(() => {});
  }, []);

  // -------------------------
  // Play scene sound on change
  // -------------------------
  useEffect(() => {
    if (!isStarted || !audioRef.current) return;

    const audio = audioRef.current;

    if (!currentScene?.sound || !isSoundEnabled) {
      fadeOut(audio, 300);
      return;
    }

    audio.src = currentScene.sound;
    audio.loop = !currentScene.notSoundLoop;
    audio.currentTime = 0;

    audio
      .play()
      .then(() => fadeIn(audio))
      .catch(() => {});
  }, [
    currentScene?.sound,
    currentScene?.notSoundLoop,
    isStarted,
    isSoundEnabled,
    fadeIn,
    fadeOut,
  ]);

  return { audioRef, initAudio };
}
