import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const reviewRouter = router({
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
        rating: z.number().min(0.5).max(5).step(0.5),
        content: z.string().min(5),
        foods: z.array(z.string()),
      }),
    )
    .mutation(async ({ input, ctx }) => {}),
});
