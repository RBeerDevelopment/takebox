import type { PrismaClient } from "@flavoury/db";

import type { ReviewListItem } from "./review-list-item";

export async function selectOwnReviewsByRestaurantId(
  prisma: PrismaClient,
  restaurantId: string,
  userId: string,
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
        restaurant: {
          id: restaurantId,
        },
        userId: userId,
      },
    },
    orderBy: [{ date: "desc" }, { updatedAt: "desc" }],
    take: 5,
  });

  return reviews;
}
