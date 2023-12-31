import Toast from "react-native-toast-message";

import { api } from "~/utils/api";

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
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error deleting note. Please try again.",
        position: "bottom",
        visibilityTime: 3000,
      });
    },
  });

  return (noteId: string) => {
    if (!restaurantId) return;
    mutate({ restaurantId, id: noteId });
  };
}
