import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

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

      const response = {
        averageRating: result?._avg?.rating ? result._avg.rating / 2 : null,
        reviewCount: result?._count?.rating || null,
      };

      return response;
    }),

  postReview: protectedProcedure
    .input(
      z.object({
        placeId: z.string(),
        rating: z.number().min(1).max(10).step(1),
        content: z.string().min(5),
        foods: z.array(z.string()).optional(),
        isTakeout: z.boolean(),
      }),
    )
    .output(z.boolean())
    .mutation(async ({ input, ctx }) => {
      const { userId } = ctx.auth;

      const { placeId, rating, content, foods, isTakeout } = input;

      const foodNames = foods || [];

      const review = await ctx.prisma.review.create({
        data: {
          rating,
          content,
          isTakeout,
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
        orderBy: {
          updatedAt: "desc",
        },
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
          updatedAt: true,
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
          updatedAt: "desc",
        },
      });

      return reviews;
    }),
});
