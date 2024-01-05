import { z } from "zod";

import { createPersonalNote } from "../functions/personal-note/create-personal-note";
import { deletePersonalNote } from "../functions/personal-note/delete-personal-note";
import { updatePersonalNote } from "../functions/personal-note/update-personal-note";
import { getNearbyRestaurantsByQuery } from "../functions/restaurant/get-nearby-restaurants-by-query";
import { getRestaurantDetails } from "../functions/restaurant/get-restaurant-details";
import { getRestaurantImageUrl } from "../functions/restaurant/get-restaurant-image-url";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const restaurantRouter = createTRPCRouter({
  nearbyRestaurantsByQuery: protectedProcedure
    .input(
      z.object({
        query: z.string(),
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
        radius: z.number().min(100).max(5000).default(3000),
      }),
    )
    .query(async ({ input, ctx }) => {
      return getNearbyRestaurantsByQuery(
        input.query,
        input.lat,
        input.lng,
        ctx.prisma,
      );
    }),
  getRestaurantDetails: protectedProcedure
    .input(
      z.object({
        placeId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return getRestaurantDetails(input.placeId, ctx.prisma);
    }),

  getImageUrl: protectedProcedure
    .input(
      z.object({
        placeId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return getRestaurantImageUrl(input.placeId, ctx.prisma);
    }),

  addPersonalNote: protectedProcedure
    .input(z.object({ restaurantId: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { restaurantId, content } = input;
      const { prisma, auth } = ctx;

      return createPersonalNote(restaurantId, auth.userId, content, prisma);
    }),
  deletePersonalNote: protectedProcedure
    .input(z.object({ restaurantId: z.string(), id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { restaurantId, id } = input;
      const { prisma, auth } = ctx;

      await deletePersonalNote(restaurantId, id, auth.userId, prisma);
    }),
  updatePersonalNote: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        restaurantId: z.string(),
        newContent: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, restaurantId, newContent } = input;
      const { prisma, auth } = ctx;

      await prisma.personalNote.update({
        data: { content: newContent },
        where: { userId: auth.userId, restaurantId, id },
      });
    }),
  getPersonalNotesForRestaurantId: protectedProcedure
    .input(z.object({ restaurantId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { restaurantId } = input;
      const { prisma, auth } = ctx;

      return await updatePersonalNote(restaurantId, auth.userId, prisma);
    }),
});
