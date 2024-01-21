import { z } from "zod";

import { type PrismaClient } from "@flavoury/db";

// ignoring images for now
export const EditReviewInput = z.object({
  reviewId: z.string(),
  rating: z.number().min(1).max(10).step(1).optional(),
  content: z.string().optional().nullable(),
  date: z.date().optional(),
  tags: z.array(z.string()).optional(),
  isTakeout: z.boolean().optional(),
});

export type EditReviewInput = z.infer<typeof EditReviewInput>;

export async function editReview(
  input: EditReviewInput,
  userId: string,
  prisma: PrismaClient,
) {
  const { reviewId, rating, content, isTakeout, date, tags } = input;

  const query = {
    data: {
      ...(rating !== undefined ? { rating } : {}),
      content: content ?? "",
      isTakeout,
      ...(date ? { date } : {}),
      ...(tags !== undefined
        ? {
            tags: {
              connectOrCreate: tags.map((t) => ({
                where: {
                  name_userId: {
                    name: t,
                    userId,
                  },
                },
                create: {
                  name: t,
                  userId,
                },
              })),
            },
          }
        : {}),
    },
    where: {
      id: reviewId,
    },
  } as const;

  const review = await prisma.review.update(query);

  return {
    reviewId: review.id,
  };
}
