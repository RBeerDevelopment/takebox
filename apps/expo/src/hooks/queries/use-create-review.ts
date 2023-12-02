import Toast from "react-native-toast-message";

import { api } from "~/utils/api";
import { useErrorLogging } from "../use-error-logging";

export function useCreateReview(restaurantId?: string) {
  const utils = api.useContext();

  const logError = useErrorLogging();

  const postReview = api.review.postReview.useMutation({
    onSuccess: () => {
      void utils.review.reviewSummary.invalidate({ placeId: restaurantId });
      void utils.review.ownReviewsForRestaurant.invalidate({
        restaurantId,
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error posting review. Please try again.",
        position: "bottom",
        visibilityTime: 3000,
      });

      if (!error?.message || error?.message.length === 0) return;
      logError(String(error?.message) + String(error?.data));
    },
  });

  return postReview;
}
