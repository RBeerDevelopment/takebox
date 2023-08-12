import { api } from "~/utils/api";

export function useCreateReview(restaurantId?: string) {
  const utils = api.useContext();
  const postReview = api.review.postReview.useMutation({
    onSuccess: () => {
      if (!restaurantId) return;
      void utils.review.reviewSummary.invalidate({ placeId: restaurantId });
      void utils.review.ownReviewsForRestaurant.invalidate({
        restaurantId: restaurantId,
      });
    },
  });

  return postReview;
}
