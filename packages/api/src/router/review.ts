import { z } from "zod";
import { protectedProcedure, createTRPCRouter } from "../trpc";

export const reviewRouter = createTRPCRouter({
  reviewSummary: protectedProcedure
    .input(z.object({ placeId: z.string() }))
    .query(async ({ input, ctx }) => {
      const restaurant = await ctx.prisma.restaurant.findUnique({
        where: { googleId: input.placeId },
        select: { id: true },
      });

      if (!restaurant) throw new Error("Restaurant not found");

      const result = await ctx.prisma.review.aggregate({
        _avg: {
          rating: true,
        },
        _count: {
          rating: true,
        },
        where: {
          restaurantId: restaurant.id,
        },
      });

      return result;
    }),

  postReview: protectedProcedure
    .input(
      z.object({
        placeId: z.string(),
        rating: z.number().min(1).max(10).step(1),
        content: z.string().min(5),
        foods: z.array(z.string()).optional(),
        isPrivate: z.boolean(),
      }),
    )
    .output(z.boolean())
    .mutation(async ({ input, ctx }) => {
      const { userId } = ctx.auth;

      const { placeId, rating, content, foods, isPrivate } = input;

      const foodNames = foods || [];

      const review = await ctx.prisma.review.create({
        data: {
          rating,
          content,
          isPrivate,
          foodName: {
            create: [
              ...foodNames.map((f) => ({
                name: f,
              })),
            ],
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
              googleId: placeId,
            },
          },
        },
      });

      return Boolean(review);

    }),
});
