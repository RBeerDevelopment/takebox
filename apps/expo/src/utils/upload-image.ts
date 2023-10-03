import { imageUrToBase64Buffer } from "./image-uri-to-base64-buffer";

export async function uploadImage(imageUri: string, s3ImageUrl: string) {
  const { buffer, fileType } = await imageUrToBase64Buffer(imageUri);
  await fetch(s3ImageUrl, {
    method: "PUT",
    body: buffer,
    headers: {
      "Content-Type": fileType,
    },
  });
}
