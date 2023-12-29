import { api } from "~/utils/api";
import { useLocationStore } from "~/state";

export function useNearbyReviews() {
  const coords = useLocationStore((state) => state.location?.coords);
  const {
    data: reviews,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = api.review.latestReviews.useQuery(
    { lat: coords?.latitude ?? 0, lng: coords?.longitude ?? 0 },
    { enabled: Boolean(coords) },
  );

  return {
    reviews,
    isLoading,
    isRefetching,
    isError,
    refetch,
  };
}
