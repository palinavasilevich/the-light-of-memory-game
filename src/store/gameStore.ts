// store/gameStore.ts
import { create } from "zustand";
// import { persist } from "zustand/middleware";
import type { ActionType } from "../types/game";

interface GameState {
  availableActions: ActionType[];
  setAvailableActions: (actions: ActionType[]) => void;
  completeAction: (actionId: string) => void;
  resetActions: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  availableActions: [],
  setAvailableActions: (actions) => set({ availableActions: actions }),
  completeAction: (actionId) =>
    set((state) => ({
      availableActions: state.availableActions.filter((a) => a.id !== actionId),
    })),
  resetActions: () => set({ availableActions: [] }),
}));
