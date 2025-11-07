export type Storyteller = {
  name: "Storyteller" | "Player";
  avatar?: string;
};

export type ActionType = {
  id: string;
  text: string;
  nextSceneId?: string;
  conditions?: Condition[];
};

export type Condition = {
  item: string;
  hasItem?: boolean;
  nextSceneId?: string;
};

export type PuzzleTypes = "sentence" | "scorpion" | "lantern";

export type Puzzle = {
  id: string;
  type: PuzzleTypes;
  nextSceneId?: string;
};

// type Content = {
//   id: string | number;
//   text: string;
// };

export type SceneType = {
  id: string;
  groupId?: string;
  backgroundImg?: string;
  text: string;
  // content: Content;
  sound?: string;
  storyteller?: Storyteller;
  actions?: ActionType[];
  puzzle?: Puzzle;
  duration?: number; // автоматический переход через время
  backgroundMusicLoop?: boolean;
  specialEffects?: ("fade" | "shake" | "flash")[];
  conditions?: Condition[]; // условия для перехода
  showAvailableActions?: boolean;
  nextSceneId?: string;
};
