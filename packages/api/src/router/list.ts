import { z } from "zod";

import { createList } from "../functions/list/create-list";
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
});
