import { api } from "~/utils/api";
import { showErrorToast } from "~/utils/interactions/show-toast";

export function useUpdatePersonalNote(restaurantId?: string) {
  const utils = api.useContext();

  const { mutate } = api.restaurant.updatePersonalNote.useMutation({
    onMutate: ({ restaurantId, newContent }) => {
      void utils.restaurant.getPersonalNoteForRestaurantId.setData(
        { restaurantId },
        (oldNote) => {
          if (!oldNote) return;
          return { ...oldNote, content: newContent };
        },
      );
    },
    onSettled: () => {
      void utils.restaurant.getPersonalNoteForRestaurantId.invalidate({
        restaurantId,
      });
    },
    onError: () => showErrorToast("Error updating note. Please try again."),
  });

  return (noteId: string, newContent: string) => {
    if (!restaurantId) return;
    mutate({ restaurantId, id: noteId, newContent });
  };
}
