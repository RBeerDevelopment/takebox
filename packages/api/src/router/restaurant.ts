import { z } from "zod";

import { fetchGooglePhotoBlob } from "../google-maps/photos/fetch-google-photo-blob";
import { fetchNearbyRestaurants } from "../google-maps/search";
import { type Restaurant } from "../google-maps/search/fetch-nearby-restaurants";
import { calculateDistanceFromCoordinates } from "../helper/calculate-distance-from-coordinates";
import { createPresignedUrl } from "../s3/create-presigned-url";
import { uploadImageBlob } from "../s3/upload-image-blob";
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
      const { query, lat, lng } = input;

      // const dbQuery = buildRestaurantSearchQuery(query, lat, lng);
      // const restaurantsFromDb = await ctx.prisma.restaurant.findMany(dbQuery);
      let restaurantsFromGoogle: Restaurant[] = [];
      try {
        restaurantsFromGoogle = await fetchNearbyRestaurants(query, lat, lng);
      } catch (e) {
        console.error(e);
      }

      if (!restaurantsFromGoogle || restaurantsFromGoogle.length === 0)
        return [];

      await ctx.prisma.restaurant.createMany({
        skipDuplicates: true,
        data: [...restaurantsFromGoogle],
      });

      // TODO: this is a hack to always have updatedgoogle photo reference in the db,
      // however this should be done in a more elegant way
      for (const restaurant of restaurantsFromGoogle) {
        await ctx.prisma.restaurant.update({
          where: { googleId: restaurant.googleId },
          data: { googlePhotoReference: restaurant.googlePhotoReference },
        });
      }

      const restaurants = await ctx.prisma.restaurant.findMany({
        select: {
          id: true,
          name: true,
          address: true,
          lat: true,
          lng: true,
        },
        where: {
          googleId: { in: restaurantsFromGoogle.map((r) => r.googleId) },
        },
      });

      const restaurantsWithDistance = restaurants.map((restaurant) => ({
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        distance: calculateDistanceFromCoordinates(
          { lat, lng },
          { lat: restaurant.lat, lng: restaurant.lng },
        ),
      }));

      return restaurantsWithDistance.sort((a, b) => a.distance - b.distance);
    }),
  getRestaurantDetails: protectedProcedure
    .input(
      z.object({
        placeId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      //TODO periodially update restaurant details
      const { placeId } = input;
      const { prisma } = ctx;

      const restaurantInDb = await prisma.restaurant.findUnique({
        select: {
          googleId: true,
          websiteUrl: true,
          googleUrl: true,
          address: true,
          name: true,
        },
        where: { id: placeId },
      });

      return restaurantInDb;
    }),

  getImageUrl: protectedProcedure
    .input(
      z.object({
        placeId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { placeId } = input;

      const restaurantInDb = await ctx.prisma.restaurant.findUnique({
        select: { s3ImageKey: true, googlePhotoReference: true },
        where: { id: placeId },
      });

      let s3ImageKey = restaurantInDb?.s3ImageKey;

      if (s3ImageKey) return createPresignedUrl("getObject", s3ImageKey);

      if (restaurantInDb?.googlePhotoReference) {
        const image = await fetchGooglePhotoBlob(
          restaurantInDb.googlePhotoReference,
        );

        s3ImageKey = await uploadImageBlob(image, placeId);

        void ctx.prisma.restaurant.update({
          where: { id: placeId },
          data: { s3ImageKey },
        });
      }

      if (!s3ImageKey) throw new Error("could not retrieve image url");
      return createPresignedUrl("getObject", s3ImageKey);
    }),

  addPersonalNote: protectedProcedure
    .input(z.object({ restaurantId: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { restaurantId, content } = input;
      const { prisma, auth } = ctx;

      await prisma.personalNote.create({
        data: { restaurantId, userId: auth.userId, content: content },
      });
    }),
  deletePersonalNote: protectedProcedure
    .input(z.object({ restaurantId: z.string(), id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { restaurantId, id } = input;
      const { prisma, auth } = ctx;

      await prisma.personalNote.delete({
        where: { restaurantId, userId: auth.userId, id },
      });
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

      const personalNotes = await prisma.personalNote.findMany({
        select: { id: true, content: true },
        where: { AND: { restaurantId, userId: auth.userId } },
      });

      return personalNotes;
    }),
});
