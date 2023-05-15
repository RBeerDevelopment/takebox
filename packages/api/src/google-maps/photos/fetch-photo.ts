import { buildPhotoUrl } from "./build-photo-url";

export async function fetchPhoto(
  reference: string,
  maxWidth = 400,
): Promise<Blob> {
  const url = buildPhotoUrl(reference, maxWidth);
  const resp = await fetch(url);
  const image = await resp.blob();
  console.log(image.length, image.type, image.size);

  const buffer = Buffer.from(await image.text());
  console.log("data:" + image.type + ";base64," + buffer.toString("base64"));

  return image;
}
