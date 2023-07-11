import { smoothCoordinatePart } from "../utils/smooth-coordinate-part";
import { api } from "../utils/api";

export function useSearch(query?: string, lat?: number, lng?: number) {
  const roundedLat = smoothCoordinatePart(lat);
  const roundedLng = smoothCoordinatePart(lng);

  const cleanedQuery = query?.trim().toLowerCase() || "";

  const {
    data: restaurants,
    isFetching,
    isError,
  } = api.restaurant.nearbyRestaurantsByQuery.useQuery(
    {
      query: cleanedQuery ,
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

  return {
    restaurants,
    isFetching,
    isError,
  };
}
