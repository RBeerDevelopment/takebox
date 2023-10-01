import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  emptyRatingCountMap,
  possibleRatings,
  type PossibleRating,
  type RatingCountMap,
} from "../utils/rating-count-map";

export const reviewRouter = createTRPCRouter({
  reviewSummary: protectedProcedure
    .input(z.object({ placeId: z.string() }))
    .query(async ({ input, ctx }) => {
      const restaurant = await ctx.prisma.restaurant.findUnique({
        where: { googleId: input.placeId },
        select: { id: true },
      });

      if (!restaurant) throw new Error("Restaurant not found");

      // TODO check if it's just calculate the summary from the ratingCounts here
      const [summary, ratingCounts] = await Promise.all([
        ctx.prisma.review.aggregate({
          _avg: {
            rating: true,
          },
          _count: {
            rating: true,
          },
          where: {
            restaurantId: restaurant.id,
          },
        }),
        ctx.prisma.review.groupBy({
          by: ["rating"],
          where: {
            restaurantId: restaurant.id,
          },
          _count: {
            rating: true,
          },
        }),
      ]);

      // empty rating count map
      const ratingCountMap: RatingCountMap = { ...emptyRatingCountMap };

      ratingCounts.forEach((ratingCount) => {
        if (possibleRatings.includes(ratingCount.rating as PossibleRating))
          ratingCountMap[ratingCount.rating as PossibleRating] =
            ratingCount._count.rating;
      });

      const response = {
        averageRating: summary?._avg?.rating ? summary._avg.rating / 2 : null,
        reviewCount: summary?._count?.rating || null,
        ratingCounts: ratingCountMap,
      };

      return response;
    }),

  postReview: protectedProcedure
    .input(
      z.object({
        placeId: z.string(),
        rating: z.number().min(1).max(10).step(1),
        content: z.string().min(5),
        date: z.date(),
        tags: z.array(z.string()).optional(),
        foods: z.array(z.string()).optional(),
        isTakeout: z.boolean(),
      }),
    )
    .output(z.boolean())
    .mutation(async ({ input, ctx }) => {
      const { userId } = ctx.auth;

      const { placeId, rating, content, foods, isTakeout, date } = input;

      const foodNames = foods || [];
      const tags = input.tags || [];

      const review = await ctx.prisma.review.create({
        data: {
          rating,
          content,
          isTakeout,
          date,
          foodName: {
            create: [
              ...foodNames.map((f) => ({
                name: f,
              })),
            ],
          },
          tags: {
            connectOrCreate: [
              ...tags?.map((t) => ({
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

  usersOwnReviews: protectedProcedure.query(async ({ ctx }) => {
    const {
      prisma,
      auth: { userId },
    } = ctx;

    const reviews = await prisma.review.findMany({
      select: {
        id: true,
        rating: true,
        updatedAt: true,
        restaurant: {
          select: {
            name: true,
          },
        },
        content: true,
      },
      where: { userId: userId },
      take: 10,
      orderBy: {
        updatedAt: "desc",
      },
    });

    return reviews;
  }),

  latestReviews: protectedProcedure
    .input(z.object({ take: z.number().min(1).max(50).default(12) }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const reviews = await prisma.review.findMany({
        select: {
          id: true,
          rating: true,
          date: true,
          updatedAt: true,
          restaurant: {
            select: {
              name: true,
              googleId: true,
            },
          },
          content: true,
        },
        take: input.take,
        orderBy: [{ date: "desc" }, { updatedAt: "desc" }],
      });

      return reviews;
    }),
  ownReviewsForRestaurant: protectedProcedure
    .input(z.object({ restaurantId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma, auth } = ctx;
      const { restaurantId } = input;

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
          content: true,
        },
        where: {
          AND: {
            restaurant: {
              googleId: restaurantId,
            },
            userId: auth.userId,
          },
        },
        orderBy: {
          date: "desc",
        },
      });

      return reviews;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma, auth } = ctx;
      const { id } = input;

      const review = await prisma.review.findUnique({ where: { id } });

      if (!review) throw new Error("Review not found");
      if (review.userId !== auth.userId) throw new Error("Unauthorized");

      await prisma.review.delete({ where: { id } });

      return;
    }),
});
