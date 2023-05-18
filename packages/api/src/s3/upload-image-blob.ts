import { PutObjectCommand } from "@aws-sdk/client-s3";
import { client } from "./client";
import { nanoid } from "nanoid";

export async function uploadImageBlob(blob: Blob, key: string) {
  const randomId = nanoid(5);

  const fullKey = `${key}-${randomId}`;
  const bucketName = process.env.AWS_BUCKET;

  if (!bucketName)
    throw new Error(
      "Bucket name not found, please set AWS_BUCKET environment variable to your bucket",
    );

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fullKey,
    Body: blob,
    ACL: "public-read",
  });

  await client.send(command);

  return `https://${bucketName}.s3.amazonaws.com/${fullKey}`;
}
