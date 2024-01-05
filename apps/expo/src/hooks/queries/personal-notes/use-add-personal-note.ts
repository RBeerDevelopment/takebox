import { api } from "~/utils/api";
import { showErrorToast } from "~/utils/interactions/show-toast";

export function useAddPersonalNote(restaurantId?: string) {
  const utils = api.useContext();

  const { mutate } = api.restaurant.addPersonalNote.useMutation({
    onMutate: ({ restaurantId, content }) => {
      void utils.restaurant.getPersonalNoteForRestaurantId.setData(
        { restaurantId },
        (old) => ({
          id: "temp",
          content,
        }),
      );
    },
    onSettled: () => {
      void utils.restaurant.getPersonalNoteForRestaurantId.invalidate({
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
