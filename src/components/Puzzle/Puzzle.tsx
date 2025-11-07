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
  let content;

  if (puzzleType === "sentence") {
    content = <PuzzleSentenceBuilder onSolved={onSolved} />;
  } else if (puzzleType === "scorpion") {
    content = <PuzzleScorpion onSolved={onSolved} />;
  } else if (puzzleType === "lantern") {
    content = <PuzzleLantern key="puzzle-lantern" onSolved={onSolved} />;
  } else {
    content = (
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

  return <div className="flex h-screen">{content}</div>;
};
