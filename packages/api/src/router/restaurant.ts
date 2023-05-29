import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { fetchNearbyRestaurants } from "../google-maps/search";
import { buildRestaurantSearchQuery } from "../helper/build-restaurant-search-query";
import { fetchRestaurantDetails } from "../google-maps/details/fetch-restaurant-details";
import { fetchGooglePhotoBlob } from "../google-maps/photos/fetch-google-photo-blob";
import { uploadImageBlob } from "../s3/upload-image-blob";

export const restaurantRouter = router({
  nearbyRestaurantsByQuery: protectedProcedure
    .input(
      z.object({
        query: z.string().min(3),
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
        radius: z.number().min(100).max(5000).default(1000),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { query, lat, lng } = input;

      const dbQuery = buildRestaurantSearchQuery(query, lat, lng);

      return await ctx.prisma.restaurant.findMany(dbQuery);
      // const [restaurantsInDb, restaurantsFromGoogle] = await Promise.all([
      //   ctx.prisma.restaurant.findMany(dbQuery),
      //   fetchNearbyRestaurants(query, lat, lng),
      // ]);

      // await ctx.prisma.restaurant.createMany({
      //   skipDuplicates: true,
      //   data: [...restaurantsFromGoogle],
      // });

      // return restaurantsFromGoogle;
    }),
  getRestaurantDetails: protectedProcedure
    .input(
      z.object({
        placeId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { placeId } = input;

      const restaurantDetails = await fetchRestaurantDetails(placeId);

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

        ctx.prisma.restaurant.update({
          where: { googleId: restaurantInDb.googleId },
          data: { imageUrl: imageUrl },
        });
      }

      if (!imageUrl) throw new Error("could not retrieve image url");
      return imageUrl;
    }),
});
