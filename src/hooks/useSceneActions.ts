import { useState, useEffect, useCallback } from "react";
import { useGameStore } from "../store/gameStore";
import type { ActionType, SceneType } from "../types/game";

export function useSceneActions(params: {
  current: SceneType | undefined;
  isTyping: boolean;
  handleNext: () => void;
  goToSceneById: (id: string) => void;
}) {
  const { current, isTyping, handleNext, goToSceneById } = params;

  const { availableActions, setAvailableActions, completeAction } =
    useGameStore();

  const [extraContentAction, setExtraContentAction] = useState<{
    nextSceneId: string;
    text?: string;
    image?: string;
  } | null>(null);

  // ----------------------------
  // Update available actions when changing scene
  // ----------------------------
  useEffect(() => {
    if (!current) return;

    if (current.actions && current.actions.length > 1) {
      setAvailableActions(current.actions);
    }
  }, [current, setAvailableActions]);

  // ----------------------------
  // Auto transition by duration
  // ----------------------------
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
  }, [current, isTyping, goToSceneById, handleNext]);

  // ----------------------------
  // Processing a click on action
  // ----------------------------
  const handleActionClick = useCallback(
    (action: ActionType) => {
      completeAction(action.id);

      if (action.extraContent && action.nextSceneId) {
        setExtraContentAction({
          nextSceneId: action.nextSceneId,
          text: action.extraContent.text,
          image: action.extraContent.image,
        });
        return;
      }

      if (action.nextSceneId) {
        goToSceneById(action.nextSceneId);
        return;
      }

      handleNext();
    },
    [completeAction, goToSceneById, handleNext]
  );

  // ---------------------------
  // Calculate the list of actions to show
  // ----------------------------
  const actionsToShow = current?.showAvailableActions
    ? availableActions
    : current?.actions;

  const showContinueButton =
    !isTyping &&
    (!actionsToShow ||
      actionsToShow.length === 0 ||
      (current?.puzzle && !current.actions)) &&
    !current?.duration;

  return {
    actionsToShow,
    showContinueButton,
    handleActionClick,
    extraContentAction,
    setExtraContentAction,
  };
}
