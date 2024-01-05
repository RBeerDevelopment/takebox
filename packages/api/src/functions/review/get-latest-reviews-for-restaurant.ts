import { type PrismaClient } from "@flavoury/db";

export async function getLatestReviewsForRestaurant(
  restaurantId: string,
  take: number,
  prisma: PrismaClient,
) {
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
      restaurantId: restaurantId,
    },
    orderBy: [{ date: "desc" }, { updatedAt: "desc" }],
    take,
  });

  return reviews;
}
