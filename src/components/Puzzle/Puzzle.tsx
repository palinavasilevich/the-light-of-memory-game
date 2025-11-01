import React from "react";
import { PuzzleSentenceBuilder } from "./PuzzleSentenceBuilder";

import { PuzzleScorpion } from "./PuzzleScorpion";
import { PuzzleLantern } from "./PuzzleLantern";

import type { PuzzleTypes } from "../../types/game";

export interface PuzzleProps {
  puzzleType: PuzzleTypes;
  onSolved: (result?: any) => void;
  onFailed?: () => void;
}

export const Puzzle: React.FC<PuzzleProps> = ({
  puzzleType,
  onSolved,
  onFailed,
}) => {
  switch (puzzleType) {
    case "sentence":
      return <PuzzleSentenceBuilder onSolved={onSolved} />;
    case "scorpion":
      return <PuzzleScorpion onSolved={onSolved} />;

    case "lantern":
      return <PuzzleLantern key="puzzle-lantern" onSolved={onSolved} />;
    default:
      return (
        <div className="p-6 bg-gray-900 text-gray-200 rounded-xl text-center">
          <p>⚙️ Мини-игра этого типа пока не реализована.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
            onClick={() => onFailed?.()}
          >
            Продолжить
          </button>
        </div>
      );
  }
};
