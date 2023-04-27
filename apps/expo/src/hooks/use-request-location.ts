import { useEffect } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { useGeneralStore } from "../state";

export function useRequestLocation() {
  const setLocation = useGeneralStore((state) => state.setLocation);
  useEffect(() => {
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
}
