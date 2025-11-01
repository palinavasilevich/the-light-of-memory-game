export type Storyteller = {
  name: string;
  avatar?: string;
};

export type Action = {
  id: string;
  text: string;
  nextSceneId?: string;
  conditions?: Condition[];
};

export type Condition = {
  itemId: string;
  hasItem: boolean;
  nextSceneId: string;
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
  actions?: Action[];
  puzzle?: Puzzle;
  duration?: number; // автоматический переход через время
  backgroundMusicLoop?: boolean;
  specialEffects?: ("fade" | "shake" | "flash")[];
  conditions?: Condition[]; // условия для перехода
};
