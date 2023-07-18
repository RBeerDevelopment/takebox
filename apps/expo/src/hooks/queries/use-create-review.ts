import { api } from "~/utils/api";

export function useCreateReview(restaurantId?: string) {
  const utils = api.useContext();
  const postReview = api.review.postReview.useMutation({
    onSuccess: async () => {
      if (!restaurantId) return;
      await utils.review.reviewSummary.invalidate({ placeId: restaurantId });
      await utils.review.ownReviewsForRestaurant.invalidate({
        restaurantId: restaurantId,
      });
    },
  });

  return postReview;
}
