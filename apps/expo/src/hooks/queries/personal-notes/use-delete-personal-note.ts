import { api } from "~/utils/api";
import { showErrorToast } from "~/utils/interactions/show-toast";

export function useDeletePersonalNote(restaurantId?: string) {
  const utils = api.useContext();

  const { mutate } = api.restaurant.deletePersonalNote.useMutation({
    onMutate: ({ restaurantId }) => {
      void utils.restaurant.getPersonalNoteForRestaurantId.setData(
        { restaurantId },
        () => undefined,
      );
    },
    onSettled: () => {
      void utils.restaurant.getPersonalNoteForRestaurantId.invalidate({
        restaurantId,
      });
    },
    onError: () => showErrorToast("Error deleting note. Please try again."),
  });

  return (noteId: string) => {
    if (!restaurantId) return;
    mutate({ restaurantId, id: noteId });
  };
}
