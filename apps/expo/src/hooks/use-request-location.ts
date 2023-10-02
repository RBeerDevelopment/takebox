import { useCallback, useEffect } from "react";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

import { useLocationStore } from "../state";

export function useRequestLocation() {
  const setLocation = useLocationStore((state) => state.setLocation);

  const refreshLocation = useCallback(async () => {
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
  }, [setLocation]);

  useEffect(() => {
    void refreshLocation();

    const interval = setInterval(() => void refreshLocation(), 1000 * 60 * 5);

    return () => clearInterval(interval);
  }, [refreshLocation]);
}
