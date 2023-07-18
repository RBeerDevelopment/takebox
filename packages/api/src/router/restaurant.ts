import { z } from "zod";

import { type Restaurant } from "@flavoury/db";

import { fetchRestaurantDetails } from "../google-maps/details/fetch-restaurant-details";
import { fetchGooglePhotoBlob } from "../google-maps/photos/fetch-google-photo-blob";
import { fetchNearbyRestaurants } from "../google-maps/search";
import { uploadImageBlob } from "../s3/upload-image-blob";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const restaurantRouter = createTRPCRouter({
  nearbyRestaurantsByQuery: protectedProcedure
    .input(
      z.object({
        query: z.string().min(3),
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
        radius: z.number().min(100).max(5000).default(3000),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { query, lat, lng } = input;

      // const dbQuery = buildRestaurantSearchQuery(query, lat, lng);
      // const restaurantsFromDb = await ctx.prisma.restaurant.findMany(dbQuery);
      const [restaurantsFromGoogle] = await Promise.all([
        fetchNearbyRestaurants(query, lat, lng),
      ]);

      await ctx.prisma.restaurant.createMany({
        skipDuplicates: true,
        data: [...restaurantsFromGoogle],
      });

      return restaurantsFromGoogle;
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
        where: { googleId: placeId },
      });

      console.log({ restaurantInDb });
      if (
        restaurantInDb &&
        (restaurantInDb.websiteUrl || restaurantInDb.googleUrl)
      )
        return restaurantInDb;

      const fetchedDetails = await fetchRestaurantDetails(placeId);
      if (!fetchedDetails) return;

      const restaurantDetails = await prisma.restaurant.update({
        where: { googleId: placeId },
        data: {
          websiteUrl: fetchedDetails.website,
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
        where: { googleId: placeId },
      });

      let imageUrl = restaurantInDb?.imageUrl;

      if (imageUrl) return imageUrl;

      if (restaurantInDb?.googlePhotoReference) {
        const image = await fetchGooglePhotoBlob(
          restaurantInDb.googlePhotoReference,
        );

        imageUrl = await uploadImageBlob(image, restaurantInDb.googleId);

        await ctx.prisma.restaurant.update({
          where: { googleId: restaurantInDb.googleId },
          data: { imageUrl: imageUrl },
        });
      }

      if (!imageUrl) throw new Error("could not retrieve image url");
      return imageUrl;
    }),
});
