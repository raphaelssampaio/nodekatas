import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Language, Trail, UserProgress } from "@/lib/types";

const STORAGE_KEY = "nodekatas-storage";

const INITIAL_PROGRESS: UserProgress = {
  completedIds: [],
  currentId: "01-hello-node",
  trail: "zero",
};

interface StoreActions {
  markCompleted: (exerciseId: string, nextId?: string) => void;
  setCurrentExercise: (id: string) => void;
  setTrail: (trail: Trail) => void;
  setLanguage: (lang: Language) => void;
  resetProgress: () => void;
  isCompleted: (exerciseId: string) => boolean;
}

interface StoreState {
  progress: UserProgress;
  lang: Language;
  actions: StoreActions;
}

type PersistedState = Pick<StoreState, "progress" | "lang">;

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      progress: INITIAL_PROGRESS,
      lang: "en",
      actions: {
        markCompleted: (exerciseId, nextId) =>
          set((state) => {
            const completedIds = state.progress.completedIds.includes(
              exerciseId,
            )
              ? state.progress.completedIds
              : [...state.progress.completedIds, exerciseId];

            return {
              progress: {
                ...state.progress,
                completedIds,
                currentId: nextId ?? exerciseId,
              },
            };
          }),
        setCurrentExercise: (id) =>
          set((state) => ({ progress: { ...state.progress, currentId: id } })),
        setTrail: (trail) =>
          set((state) => ({ progress: { ...state.progress, trail } })),
        setLanguage: (lang) => set({ lang }),
        resetProgress: () =>
          set({ progress: { ...INITIAL_PROGRESS }, lang: "en" }),
        isCompleted: (exerciseId) =>
          get().progress.completedIds.includes(exerciseId),
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : noopStorage,
      ),
      partialize: (state): PersistedState => ({
        progress: state.progress,
        lang: state.lang,
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as PersistedState),
      }),
    },
  ),
);

export function hasPersistedState(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) !== null;
}
