import { z } from "zod";

import { generateReviewImageKey } from "../s3/generate-review-image-key";

export const CreateReviewInput = z.object({
  placeId: z.string(),
  rating: z.number().min(1).max(10).step(1),
  content: z.string(),
  date: z.date(),
  tags: z.array(z.string()).optional(),
  foods: z.array(z.string()).optional(),
  isTakeout: z.boolean(),
  hasImage: z.boolean(),
});

export type CreateReviewInput = z.infer<typeof CreateReviewInput>;

export function buildCreateReviewQuery(
  input: CreateReviewInput,
  userId: string,
) {
  const { placeId, rating, content, foods, isTakeout, date, hasImage } = input;

  const foodNames = foods || [];
  const tags = input.tags || [];

  const imageKey = hasImage ? generateReviewImageKey(placeId, userId) : null;

  const query = {
    data: {
      rating,
      content,
      isTakeout,
      date,
      s3ImageKey: imageKey,
      foodName: {
        create: [
          ...foodNames.map((f) => ({
            name: f,
          })),
        ],
      },
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
      user: {
        connectOrCreate: {
          where: {
            id: userId,
          },
          create: {
            id: userId,
          },
        },
      },
      restaurant: {
        connect: {
          id: placeId,
        },
      },
    },
  };

  return query;
}
