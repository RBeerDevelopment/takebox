import Toast from "react-native-toast-message";

import { api } from "~/utils/api";

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
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error posting review. Please try again.",
        position: "bottom",
        visibilityTime: 3000,
      });
    },
  });

  return postReview;
}
