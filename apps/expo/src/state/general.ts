import { create } from "zustand";
import { LocationObject } from "expo-location";

interface GeneralState {
  location?: LocationObject;
  setLocation: (newLocation: LocationObject) => void;
}

export const useGeneralStore = create<GeneralState>()((set) => ({
  location: undefined,
  setLocation: (newLocation) => set({ location: newLocation }),
}));
