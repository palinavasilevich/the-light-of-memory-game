import React from "react";
import { PuzzleSentenceBuilder } from "./PuzzleSentenceBuilder";

import { PuzzleScorpion } from "./PuzzleScorpion";
import { PuzzleLantern } from "./PuzzleLantern";

import type { PuzzleTypes } from "../../types/game";

export interface PuzzleProps {
  puzzleType: PuzzleTypes;
  // onSolved: (result?: any) => void;

  // onFailed?: () => void;
  onSolved: () => void;
}

export const Puzzle: React.FC<PuzzleProps> = ({ puzzleType, onSolved }) => {
  if (puzzleType === "sentence") {
    return <PuzzleSentenceBuilder onSolved={onSolved} />;
  } else if (puzzleType === "scorpion") {
    return <PuzzleScorpion onSolved={onSolved} />;
  } else if (puzzleType === "lantern") {
    return <PuzzleLantern key="puzzle-lantern" onSolved={onSolved} />;
  } else {
    return (
      <div className="p-6 bg-gray-900 text-gray-200 rounded-xl text-center">
        <p>⚙️ This type of mini-game is not yet implemented.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          // onClick={() => onFailed?.()}
        >
          Continue
        </button>
      </div>
    );
  }
};
