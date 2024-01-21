import { z } from "zod";

import { createList } from "../functions/list/create-list";
import { deleteList } from "../functions/list/delete-list";
import { getListDetailsById } from "../functions/list/get-list-details-by-id";
import { getListIdsForRestaurant } from "../functions/list/get-list-ids-for-restaurant";
import { getOwnLists } from "../functions/list/get-own-lists";
import { toggleRestaurantInList } from "../functions/list/toggle-restaurant-in-list";
import { updateList } from "../functions/list/update-list";
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
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        newName: z.string().optional(),
        newDescription: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { auth, prisma } = ctx;
      return await updateList(
        input.id,
        auth.userId,
        input.newName,
        input.newDescription,
        prisma,
      );
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { auth, prisma } = ctx;
      return await deleteList(input.id, auth.userId, prisma);
    }),
  getOwn: protectedProcedure.query(async ({ ctx }) => {
    const { auth, prisma } = ctx;
    const lists = getOwnLists(auth.userId, prisma);
    return lists;
  }),
  getIdsForRestaurant: protectedProcedure
    .input(z.object({ restaurantId: z.string() }))
    .query(async ({ input, ctx }) => {
      return getListIdsForRestaurant(
        input.restaurantId,
        ctx.auth.userId,
        ctx.prisma,
      );
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
