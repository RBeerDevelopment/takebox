import { PrismaClient } from "@flavoury/db";

import { ReviewListItem } from "./review-list-item";

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
          name: true,
          googleId: true,
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
