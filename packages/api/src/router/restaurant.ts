import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { fetchNearbyRestaurants } from "../google-maps";

export const restaurantRouter = router({
  getRestaurantsByQuery: protectedProcedure
    .input(
      z.object({
        query: z.string().min(5),
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { query, lat, lng } = input;

      const restaurants = await fetchNearbyRestaurants(query, lat, lng);

      ctx.prisma.restaurant.createMany({
        skipDuplicates: true,
        data: [...restaurants],
      });

      return restaurants;
    }),
});
