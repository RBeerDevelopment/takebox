import type { PrismaClient } from "@flavoury/db";

import type { ReviewListItem } from "./review-list-item";

export async function selectLastestReviews(
  prisma: PrismaClient,
  take: number,
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
    orderBy: [{ date: "desc" }, { updatedAt: "desc" }],
    take,
  });

  return reviews;
}
