import { api } from "~/utils/api";
import { showErrorToast } from "~/utils/show-toast";

export function useUpdatePersonalNote(restaurantId?: string) {
  const utils = api.useContext();

  const { mutate } = api.restaurant.updatePersonalNote.useMutation({
    onMutate: ({ restaurantId, id, newContent }) => {
      void utils.restaurant.getPersonalNotesForRestaurantId.setData(
        { restaurantId },
        (old) =>
          old?.map((note) => {
            if (note.id === id) return { ...note, content: newContent };
            return note;
          }),
      );
    },
    onSettled: () => {
      void utils.restaurant.getPersonalNotesForRestaurantId.invalidate({
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
