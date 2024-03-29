import { api } from "~/utils/api";
import { showErrorToast } from "~/utils/interactions/show-toast";

export function useDeleteReview(restaurantId: string, reviewId: string) {
  const utils = api.useContext();

  const deleteReview = api.review.deleteReview.useMutation({
    onMutate: async () => {
      await utils.review.ownReviewsForRestaurant.cancel();

      const previousOwnReviews = utils.review.ownReviewsForRestaurant.getData({
        restaurantId,
      });

      if (!previousOwnReviews) return;
      utils.review.ownReviewsForRestaurant.setData({ restaurantId }, () =>
        previousOwnReviews.filter((review) => review.id !== reviewId),
      );

      return { previousOwnReviews };
    },
    onSuccess: () => {
      void utils.review.invalidate();
      void utils.review.ownReviews.invalidate();
    },
    onError: (_, __, context) => {
      showErrorToast("Error deleting review. Try again.");

      if (!context?.previousOwnReviews) return;
      utils.review.ownReviewsForRestaurant.setData(
        { restaurantId },
        () => context.previousOwnReviews,
      );
    },
  });

  return () => deleteReview.mutate({ id: reviewId });
}
