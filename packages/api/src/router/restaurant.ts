import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const restaurantRouter = router({
  getRestaurantsByQuery: protectedProcedure
    .input(
      z.object({
        query: z.string().min(5),
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
        limit: z.number().min(1).max(30).default(10),
      }),
    )
    .query(({ input, ctx }) => {
      const { query, lat, lng, limit } = input;
      const { userId } = ctx.auth;

      return [];
    }),
});
