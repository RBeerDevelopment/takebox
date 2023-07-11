import { type Restaurant } from "./fetch-nearby-restaurants";
import { type NearbyResponse } from "./nearby-response";

export function responseToRestaurant(
  r: NearbyResponse["results"][0],
): Restaurant {
  return {
    googleId: r.place_id,
    name: r.name,
    address: r.formatted_address,
    lat: r.geometry.location.lat,
    lng: r.geometry.location.lng,
    googlePhotoReference: r.photos[0]?.photo_reference || null,
    imageUrl: null,
    websiteUrl: null,
    googleUrl: null
  };
}
