import { type PrismaClient } from "@flavoury/db";

import { type CreateReviewInput } from "../../query-builder/build-create-review-query";
import { generateReviewImageKey } from "../../s3/generate-review-image-key";

export async function editReview(
  reviewId: string,
  input: CreateReviewInput,
  removeImage: boolean,
  userId: string,
  prisma: PrismaClient,
): Promise<{ reviewId: string; s3UploadUrl: string | null }> {
  const { rating, content, isTakeout, tags, date, hasImage, placeId } = input;

  const imageKey =
    hasImage && !removeImage ? generateReviewImageKey(placeId, userId) : null;

  // reset tags/foodNames before updating
  await prisma.review.update({
    where: { id: reviewId },
    data: { tags: { set: [] }, foodName: { set: [] } },
  });

  const query = {
    data: {
      rating,
      content,
      isTakeout,
      date,
      ...(removeImage ? { s3ImageKey: null } : { s3ImageKey: imageKey }),
      tags: {
        connectOrCreate: tags?.map((t) => ({
          where: {
            name_userId: {
              name: t,
              userId: userId,
            },
          },
          create: {
            name: t,
            userId: userId,
          },
        })),
      },
    },
    where: {
      id: reviewId,
    },
  } as const;

  const { id } = await prisma.review.update(query);

  return {
    reviewId: id,
    s3UploadUrl: imageKey,
  };
}
