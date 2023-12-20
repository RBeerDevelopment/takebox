import { GooglePlacesApi, trackGooglePlacesUsage } from "../../redis";
import { buildPhotoUrl } from "./build-photo-url";

export async function fetchGooglePhotoBlob(
  reference: string,
  maxWidth = 400,
): Promise<Blob> {
  const url = buildPhotoUrl(reference, maxWidth);

  // void trackGooglePlacesUsage(GooglePlacesApi.Photo);

  const resp = await fetch(url);
  const image = await resp.blob();
  return image;
}
