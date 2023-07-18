import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersistedState {
  isFirstUsage: boolean;
  setIsFirstUsage: (newValue: boolean) => void;
}

export const usePersistedStore = create<PersistedState>()(
  persist(
    (set) => ({
      isFirstUsage: true,
      setIsFirstUsage: (newValue) => set({ isFirstUsage: newValue }),
    }),
    {
      name: "persisted-storage",
      getStorage: () => AsyncStorage,
    },
  ),
);
