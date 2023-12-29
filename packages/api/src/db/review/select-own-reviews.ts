import type { PrismaClient } from "@flavoury/db";

import type { ReviewListItem } from "./review-list-item";

export async function selectOwnReviews(
  prisma: PrismaClient,
  userId: string,
  restaurantId?: string,
): Promise<ReviewListItem[]> {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      rating: true,
      date: true,
      restaurant: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          username: true,
        },
      },
      content: true,
    },
    where: {
      AND: {
        ...(restaurantId
          ? {
              restaurant: {
                id: restaurantId,
              },
            }
          : {}),
        userId: userId,
      },
    },
    orderBy: [{ date: "desc" }, { updatedAt: "desc" }],
    take: 5,
  });

  return reviews;
}
