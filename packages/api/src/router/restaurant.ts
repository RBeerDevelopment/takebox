import { z } from "zod";

import { fetchRestaurantDetails } from "../google-maps/details/fetch-restaurant-details";
import { fetchGooglePhotoBlob } from "../google-maps/photos/fetch-google-photo-blob";
import { fetchNearbyRestaurants } from "../google-maps/search";
import { calculateDistanceFromCoordinates } from "../helper/calculate-distance-from-coordinates";
import { createPresignedUrl } from "../s3/create-presigned-url";
import { uploadImageBlob } from "../s3/upload-image-blob";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { shortenUrlForDb } from "../utils/shorten-url-for-db";

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
      const restaurantsFromGoogle = await fetchNearbyRestaurants(
        query,
        lat,
        lng,
      );

      if (!restaurantsFromGoogle || restaurantsFromGoogle.length === 0)
        return [];

      await ctx.prisma.restaurant.createMany({
        skipDuplicates: true,
        data: [...restaurantsFromGoogle],
      });

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

      if (
        restaurantInDb &&
        (restaurantInDb.websiteUrl || restaurantInDb.googleUrl)
      )
        return restaurantInDb;

      if (!restaurantInDb?.googleId) return;

      const fetchedDetails = await fetchRestaurantDetails(
        restaurantInDb?.googleId,
      );
      if (!fetchedDetails) return;

      const restaurantDetails = await prisma.restaurant.update({
        where: { id: placeId },
        data: {
          websiteUrl: fetchedDetails.website
            ? shortenUrlForDb(fetchedDetails.website)
            : undefined,
          googleUrl: fetchedDetails.url,
        },
      });

      return restaurantDetails;
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

        await ctx.prisma.restaurant.update({
          where: { id: placeId },
          data: { s3ImageKey },
        });
      }

      if (!s3ImageKey) throw new Error("could not retrieve image url");
      return createPresignedUrl("getObject", s3ImageKey);
    }),
});
