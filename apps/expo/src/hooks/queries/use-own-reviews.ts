import { api } from "~/utils/api";

export function useOwnReviews() {
  const {
    data: reviews,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = api.review.ownReviews.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  return {
    reviews,
    isLoading,
    isRefetching,
    isError,
    refetch,
  };
}
