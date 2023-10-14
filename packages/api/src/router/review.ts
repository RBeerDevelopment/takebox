import { z } from "zod";

import {
  buildCreateReviewQuery,
  createReviewInput,
} from "../query-builder/build-create-review-query";
import { buildReviewListQuery } from "../query-builder/build-review-list-query";
import { createPresignedUrl } from "../s3/create-presigned-url";
import { generateReviewImageKey } from "../s3/generate-review-image-key";
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
    .input(createReviewInput)
    .output(
      z.object({
        reviewId: z.string(),
        s3UploadUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { userId } = ctx.auth;
      const { placeId, hasImage } = input;

      const query = buildCreateReviewQuery(input, userId);

      const imageKey = hasImage
        ? generateReviewImageKey(placeId, userId)
        : null;

      const review = await ctx.prisma.review.create(query);

      if (!imageKey) {
        return {
          reviewId: review.id,
        };
      }

      const s3UploadUrl = await createPresignedUrl("putObject", imageKey);
      return {
        reviewId: review.id,
        s3UploadUrl,
      };
    }),

  latestReviews: protectedProcedure
    .input(z.object({ take: z.number().min(1).max(50).default(12) }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const query = buildReviewListQuery({ otherArgs: { take: input.take } });

      const reviews = await prisma.review.findMany({ ...query });

      return reviews;
    }),

  reviewById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;

      const query = {
        where: { id },
        select: {
          id: true,
          rating: true,
          date: true,
          s3ImageKey: true,
          restaurant: {
            select: {
              name: true,
              googleId: true,
            },
          },
          user: {
            select: {
              username: true,
              id: true,
            },
          },
          content: true,
        },
      } as const;

      const reviewResult = await prisma.review.findUnique(query);

      if (!reviewResult) return null;

      const { s3ImageKey, ...review } = reviewResult;
      const imageUrl = s3ImageKey
        ? await createPresignedUrl("getObject", s3ImageKey)
        : null;

      return { ...review, imageUrl };
    }),

  ownReviewsForRestaurant: protectedProcedure
    .input(z.object({ restaurantId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma, auth } = ctx;
      const { restaurantId } = input;

      const query = buildReviewListQuery({
        where: {
          AND: {
            restaurant: {
              googleId: restaurantId,
            },
            userId: auth.userId,
          },
        },
      });

      const reviews = await prisma.review.findMany({
        ...query,
      });

      const reviewsWithUrl = await Promise.all(
        reviews.map(async (review) => {
          const { s3ImageKey, ...reviewWithoutS3 } = review;
          if (!s3ImageKey) return { ...reviewWithoutS3, imageUrl: null };

          const url = await createPresignedUrl("getObject", s3ImageKey);

          return {
            ...reviewWithoutS3,
            imageUrl: url,
          };
        }),
      );

      return reviewsWithUrl;
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
