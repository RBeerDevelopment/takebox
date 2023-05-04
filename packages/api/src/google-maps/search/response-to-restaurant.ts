import { RestaurantResponse } from "./google-restaurant-response";
import { GoogleRestaurant } from "./fetch-nearby-restaurants";

export function responseToRestaurant(r: RestaurantResponse): GoogleRestaurant {
  return {
    googleId: r.place_id,
    name: r.name,
    address: r.formatted_address,
    lat: r.geometry.location.lat,
    lng: r.geometry.location.lng,
  };
}
