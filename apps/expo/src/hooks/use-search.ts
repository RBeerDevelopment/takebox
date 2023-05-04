import { smoothCoordinatePart } from "../utils/smooth-coordinate-part";
import { trpc } from "../utils/trpc";

export function useSearch(query?: string, lat?: number, lng?: number) {
  const roundedLat = smoothCoordinatePart(lat);
  const roundedLng = smoothCoordinatePart(lng);

  const {
    data: restaurants,
    isFetching,
    isError,
  } = trpc.restaurant.nearbyRestaurantsByQuery.useQuery(
    {
      query: query as string,
      lat: roundedLat,
      lng: roundedLng,
    },
    {
      enabled: Boolean(query) && query !== "" && Boolean(lat) && Boolean(lng),
      staleTime: Infinity,
    },
  );

  return {
    restaurants,
    isFetching,
    isError,
  };
}
