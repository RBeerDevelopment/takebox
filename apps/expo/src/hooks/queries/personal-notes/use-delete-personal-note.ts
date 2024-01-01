import { api } from "~/utils/api";
import { showErrorToast } from "~/utils/interactions/show-toast";

export function useDeletePersonalNote(restaurantId?: string) {
  const utils = api.useContext();

  const { mutate } = api.restaurant.deletePersonalNote.useMutation({
    onMutate: ({ restaurantId, id }) => {
      void utils.restaurant.getPersonalNotesForRestaurantId.setData(
        { restaurantId },
        (old) => old?.filter((note) => note.id !== id),
      );
    },
    onSettled: () => {
      void utils.restaurant.getPersonalNotesForRestaurantId.invalidate({
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
