import { Buffer } from "buffer";
import * as FileSystem from "expo-file-system";

export async function imageUrToBase64Buffer(
  imageUri: string,
): Promise<{ buffer: Buffer; fileType: string }> {
  const picture = await fetch(imageUri);
  const blob = await picture.blob();
  const base64 = await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const buffer = Buffer.from(base64, "base64");

  return { buffer, fileType: blob.type };
}
