import { Share } from "react-native";

export async function shareRestaurant(restaurantId: string) {
  await Share.share({
    message: `Check out this restaurant on Flavoury!`,
    url: `https://flavoury.app/restaurant/${restaurantId}`,
  });
}
