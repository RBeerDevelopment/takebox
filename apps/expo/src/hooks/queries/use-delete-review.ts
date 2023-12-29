import Toast from "react-native-toast-message";

import { api } from "~/utils/api";

export function useDeleteReview(restaurantId: string, reviewId: string) {
  const utils = api.useContext();

  const deleteReview = api.review.delete.useMutation({
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
      Toast.show({
        type: "error",
        text1: "Error deleting review. Try again",
        position: "bottom",
        visibilityTime: 3000,
      });

      if (!context?.previousOwnReviews) return;
      utils.review.ownReviewsForRestaurant.setData(
        { restaurantId },
        () => context.previousOwnReviews,
      );
    },
  });

  return () => deleteReview.mutate({ id: reviewId });
}
