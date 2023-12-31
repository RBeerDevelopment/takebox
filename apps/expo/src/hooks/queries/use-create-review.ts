import { api } from "~/utils/api";
import { showErrorToast } from "~/utils/show-toast";

export function useCreateReview(restaurantId?: string) {
  const utils = api.useContext();

  const postReview = api.review.postReview.useMutation({
    onSuccess: () => {
      void utils.review.reviewSummary.invalidate({ placeId: restaurantId });
      void utils.review.ownReviewsForRestaurant.invalidate({
        restaurantId,
      });
      void utils.review.ownReviews.invalidate();
    },
    onError: () => showErrorToast("Error posting review. Please try again."),
  });

  return postReview;
}
