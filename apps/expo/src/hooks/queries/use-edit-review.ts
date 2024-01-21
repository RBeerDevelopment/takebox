import { api } from "~/utils/api";
import { showErrorToast } from "~/utils/interactions/show-toast";

export function useEditReview(restaurantId?: string) {
  const utils = api.useContext();

  const postReview = api.review.editReview.useMutation({
    onSuccess: ({ reviewId }) => {
      void utils.review.reviewSummary.invalidate({ placeId: restaurantId });
      void utils.review.ownReviewsForRestaurant.invalidate({
        restaurantId,
      });
      void utils.review.ownReviews.invalidate();
      void utils.review.reviewById.invalidate({ id: reviewId });
    },
    onError: () => showErrorToast("Error updating review. Please try again."),
  });

  return postReview;
}
