import { buildPhotoUrl } from "./build-photo-url";

export async function fetchGooglePhotoBlob(
  reference: string,
  maxWidth = 400,
): Promise<Blob> {
  const url = buildPhotoUrl(reference, maxWidth);
  const resp = await fetch(url);
  const image = await resp.blob();
  console.log(image.type);
  return image;
}
