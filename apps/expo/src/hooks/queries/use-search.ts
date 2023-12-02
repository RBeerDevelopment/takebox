import { useEffect } from "react";

import { api } from "../../utils/api";
import { smoothCoordinatePart } from "../../utils/smooth-coordinate-part";
import { useErrorLogging } from "../use-error-logging";

export function useSearch(query?: string, lat?: number, lng?: number) {
  const roundedLat = smoothCoordinatePart(lat);
  const roundedLng = smoothCoordinatePart(lng);

  const cleanedQuery = query?.trim().toLowerCase() || "";

  const logError = useErrorLogging();

  const {
    data: restaurants,

    isFetching,
    isError,
    error,
  } = api.restaurant.nearbyRestaurantsByQuery.useQuery(
    {
      query: cleanedQuery,
      lat: roundedLat,
      lng: roundedLng,
    },
    {
      enabled:
        Boolean(cleanedQuery) &&
        cleanedQuery !== "" &&
        Boolean(lat) &&
        Boolean(lng),
      staleTime: Infinity,
    },
  );

  useEffect(() => {
    if (!error?.message || error?.message.length === 0) return;
    logError(String(error?.message) + String(error?.data));
  }, [error?.message]);

  return {
    restaurants,
    isFetching,
    isError,
    error,
  };
}
