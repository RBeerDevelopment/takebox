import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { client } from "./client";

const PresignedUrlType = ["getObject", "putObject"] as const;
type PresignedUrlType = (typeof PresignedUrlType)[number];

export async function createPresignedUrl(type: PresignedUrlType, key: string) {
  const commandOptions = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
  };

  const command =
    type === "getObject"
      ? new GetObjectCommand(commandOptions)
      : new PutObjectCommand(commandOptions);

  return await getSignedUrl(client, command, {
    expiresIn: 3600,
  });
}
