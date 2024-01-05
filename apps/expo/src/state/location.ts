import { type LocationObject } from "expo-location";
import { create } from "zustand";

type LocationState = {
  location?: LocationObject;
  setLocation: (newLocation: LocationObject) => void;
};

export const useLocationStore = create<LocationState>()((set) => ({
  location: undefined,
  setLocation: (newLocation) => set({ location: newLocation }),
}));
