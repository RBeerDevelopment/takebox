import { z } from "zod";

import { createList } from "../functions/list/create-list";
import { getListDetailsById } from "../functions/list/get-list-details-by-id";
import { getOwnLists } from "../functions/list/get-own-lists";
import { toggleRestaurantInList } from "../functions/list/toggle-restaurant-in-list";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const listRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newList = await createList(
        input.name,
        input.description,
        ctx.auth.userId,
        ctx.prisma,
      );

      return newList.id;
    }),
  getOwn: protectedProcedure.query(async ({ ctx }) => {
    const { auth, prisma } = ctx;
    return getOwnLists(auth.userId, prisma);
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return getListDetailsById(input.id, ctx.prisma);
    }),
  addRestaurant: protectedProcedure
    .input(z.object({ listId: z.string(), restaurantId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { auth, prisma } = ctx;
      return await toggleRestaurantInList(
        "add",
        input.listId,
        input.restaurantId,
        auth.userId,
        prisma,
      );
    }),
  removeRestaurant: protectedProcedure
    .input(z.object({ listId: z.string(), restaurantId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { auth, prisma } = ctx;
      return await toggleRestaurantInList(
        "remove",
        input.listId,
        input.restaurantId,
        auth.userId,
        prisma,
      );
    }),
});
