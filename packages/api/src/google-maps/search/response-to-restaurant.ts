import { type Restaurant } from "./fetch-nearby-restaurants";
import { type NearbyResponse } from "./nearby-response";

export function responseToRestaurant(
  r: NearbyResponse["places"][0],
): Restaurant {
  return {
    googleId: r.id,
    name: r.displayName.text,
    address: r.formattedAddress,
    lat: r.location.latitude,
    lng: r.location.longitude,
    googlePhotoReference:
      r.photos.find(
        (photo) =>
          photo.widthPx ===
          r.photos
            .map((p) => p.widthPx)
            .sort()
            .at(0),
      )?.name ?? null,
    s3ImageKey: null,
    websiteUrl: r.websiteUri ?? null,
    googleUrl: r.googleMapsUri ?? null,
  };
}
