import Toast from "react-native-toast-message";

import { api } from "~/utils/api";

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
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error updating note. Please try again.",
        position: "bottom",
        visibilityTime: 3000,
      });
    },
  });

  return (noteId: string, newContent: string) => {
    if (!restaurantId) return;
    mutate({ restaurantId, id: noteId, newContent });
  };
}
