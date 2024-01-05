import { type PrismaClient } from "@flavoury/db";

import {
  buildCreateReviewQuery,
  type CreateReviewInput,
} from "../../query-builder/build-create-review-query";
import { createPresignedUrl } from "../../s3/create-presigned-url";
import { generateReviewImageKey } from "../../s3/generate-review-image-key";

export async function createReview(
  input: CreateReviewInput,
  userId: string,
  prisma: PrismaClient,
) {
  const query = buildCreateReviewQuery(input, userId);

  const { placeId, hasImage } = input;
  const imageKey = hasImage ? generateReviewImageKey(placeId, userId) : null;

  const review = await prisma.review.create(query);

  if (!imageKey) {
    return {
      reviewId: review.id,
    };
  }
  const s3UploadUrl = await createPresignedUrl("putObject", imageKey);

  return {
    reviewId: review.id,
    s3UploadUrl,
  };
}
