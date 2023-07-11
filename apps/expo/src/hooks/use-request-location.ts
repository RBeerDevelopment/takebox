import { useEffect } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { useGeneralStore } from "../state";

export function useRequestLocation() {
  const setLocation = useGeneralStore((state) => state.setLocation);
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
