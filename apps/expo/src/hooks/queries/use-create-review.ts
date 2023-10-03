import { api } from "~/utils/api";

interface MutationInput {
  placeId: string;
  date: Date;
  rating: number;
  content: string;
  isTakeout: boolean;
  tags?: string[];
  foods?: string[];
  imageUri: string | null;
}

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

  // async function createReview(input: MutationInput) {
  //   if(input.imageUri !== null) {
  //     uploadImageBlob
  //   }
  //   await postReview.mutateAsync(input);
  // }

  return postReview;
}
