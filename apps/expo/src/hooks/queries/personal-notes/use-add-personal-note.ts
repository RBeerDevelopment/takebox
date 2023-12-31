import Toast from "react-native-toast-message";

import { api } from "~/utils/api";

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
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error adding note. Please try again.",
        position: "bottom",
        visibilityTime: 3000,
      });
    },
  });

  return (content: string) => {
    if (!restaurantId) return;
    mutate({ restaurantId, content });
  };
}
