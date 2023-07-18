import { useEffect } from "react";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

import { useLocationStore } from "../state";

export function useRequestLocation() {
  const setLocation = useLocationStore((state) => state.setLocation);
  useEffect(() => {
    void (async () => {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }

        const location = await getCurrentPositionAsync({});
        setLocation(location);
      } catch (e) {
        console.error("Error requesting location", e);
      }
    })();
  }, [setLocation]);
}
