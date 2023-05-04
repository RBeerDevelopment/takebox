import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { fetchNearbyRestaurants } from "../google-maps";
import { buildRestaurantSearchQuery } from "../helper/build-restaurant-search-query";

export const restaurantRouter = router({
  nearbyRestaurantsByQuery: protectedProcedure
    .input(
      z.object({
        query: z.string().min(5),
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
        radius: z.number().min(100).max(5000).default(1000),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { query, lat, lng } = input;

      const dbQuery = buildRestaurantSearchQuery(query, lat, lng);

      const [restaurantsInDb, restaurantsFromGoogle] = await Promise.all([
        ctx.prisma.restaurant.findMany(dbQuery),
        fetchNearbyRestaurants(query, lat, lng),
      ]);

      await ctx.prisma.restaurant.createMany({
        skipDuplicates: true,
        data: [...restaurantsFromGoogle],
      });

      return restaurantsFromGoogle;
    }),
});
