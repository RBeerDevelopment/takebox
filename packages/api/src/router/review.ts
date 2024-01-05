import { z } from "zod";

import { selectLastestReviews } from "../db/review/select-latest-reviews";
import { selectOwnReviews } from "../db/review/select-own-reviews";
import { selectReviewById } from "../db/review/select-review-by-id";
import { createReview } from "../functions/review/create-review";
import { deleteReview } from "../functions/review/delete-review";
import { getLatestReviewsForRestaurant } from "../functions/review/get-latest-reviews-for-restaurant";
import { getReviewSummary } from "../functions/review/get-review-summary";
import { CreateReviewInput } from "../query-builder/build-create-review-query";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const reviewRouter = createTRPCRouter({
  reviewSummary: protectedProcedure
    .input(z.object({ placeId: z.string() }))
    .query(async ({ input, ctx }) => {
      return getReviewSummary(input.placeId, ctx.prisma);
    }),
  postReview: protectedProcedure
    .input(CreateReviewInput)
    .output(
      z.object({
        reviewId: z.string(),
        s3UploadUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return createReview(input, ctx.auth.userId, ctx.prisma);
    }),

  latestReviews: protectedProcedure
    .input(
      z.object({
        take: z.number().min(1).max(50).default(12),
        lat: z.number(),
        lng: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      return selectLastestReviews(prisma, input.lat, input.lng, input.take);
    }),

  reviewById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;

      return await selectReviewById(prisma, id);
    }),
  latestReviewsForRestaurant: protectedProcedure
    .input(z.object({ restaurantId: z.string(), take: z.number().default(5) }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { restaurantId, take } = input;

      return getLatestReviewsForRestaurant(restaurantId, take, prisma);
    }),

  ownReviewsForRestaurant: protectedProcedure
    .input(z.object({ restaurantId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma, auth } = ctx;
      const { restaurantId } = input;

      const reviews = selectOwnReviews(prisma, auth.userId, restaurantId);

      return reviews;
    }),

  ownReviews: protectedProcedure.query(async ({ ctx }) => {
    const { prisma, auth } = ctx;

    const reviews = selectOwnReviews(prisma, auth.userId);

    return reviews;
  }),
  deleteReview: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma, auth } = ctx;
      const { id } = input;

      await deleteReview(id, auth.userId, prisma);
    }),
});
