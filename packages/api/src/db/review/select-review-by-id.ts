import type { PrismaClient } from "@flavoury/db";

import { createPresignedUrl } from "../../s3/create-presigned-url";
import type { ReviewDetail } from "./review-detail";

export async function selectReviewById(
  prisma: PrismaClient,
  reviewId: string,
): Promise<ReviewDetail | null> {
  const queryResult = await prisma.review.findUnique({
    select: {
      id: true,
      rating: true,
      date: true,
      s3ImageKey: true,
      restaurant: {
        select: {
          name: true,
          id: true,
        },
      },
      user: {
        select: {
          username: true,
          id: true,
        },
      },
      tags: true,
      content: true,
    },
    where: {
      id: reviewId,
    },
  });

  if (!queryResult) return null;

  const { s3ImageKey, ...review } = queryResult;

  const imageUrl = s3ImageKey
    ? await createPresignedUrl("getObject", s3ImageKey)
    : null;

  return { ...review, imageUrl, tags: review.tags.map((tag) => tag.name) };
}
