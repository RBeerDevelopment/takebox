import { PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";

import { client } from "./client";

export async function uploadImageBlob(blob: Blob, key: string) {
  const randomId = nanoid(5);

  const fullKey = `${key}-${randomId}`;
  const bucketName = process.env.AWS_BUCKET;

  if (!bucketName)
    throw new Error(
      "Bucket name not found, please set AWS_BUCKET environment variable to your bucket",
    );

  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fullKey,
    Body: buffer,
    ACL: "private",
  });

  await client.send(command);

  return fullKey;
}
