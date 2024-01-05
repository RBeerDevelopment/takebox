import { type PrismaClient } from "@flavoury/db";

export async function deleteReview(
  reviewId: string,
  userId: string,
  prisma: PrismaClient,
) {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    select: {
      userId: true,
    },
  });

  if (!review) throw new Error("Review not found");

  if (review.userId !== userId) throw new Error("Unauthorized");

  await prisma.review.delete({ where: { id: reviewId } });
}
