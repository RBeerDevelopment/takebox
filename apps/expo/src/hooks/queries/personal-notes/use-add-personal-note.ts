import { api } from "~/utils/api";
import { showErrorToast } from "~/utils/interactions/show-toast";

export function useAddPersonalNote(restaurantId?: string) {
  const utils = api.useContext();

  const { mutate } = api.restaurant.addPersonalNote.useMutation({
    onMutate: ({ restaurantId, content }) => {
      void utils.restaurant.getPersonalNotesForRestaurantId.setData(
        { restaurantId },
        (old) => old?.concat({ id: "temp", content }),
      );
    },
    onSettled: () => {
      void utils.restaurant.getPersonalNotesForRestaurantId.invalidate({
        restaurantId,
      });
    },
    onError: () => showErrorToast("Error adding note. Please try again."),
  });

  return (content: string) => {
    if (!restaurantId) return;
    mutate({ restaurantId, content });
  };
}
