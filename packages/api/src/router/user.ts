import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  upsert: protectedProcedure
    .input(z.object({ username: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const { auth, prisma } = ctx;
      const { username } = input;

      await prisma.user.upsert({
        where: { id: auth.userId },
        update: { username },
        create: { username, id: auth.userId },
      });
    }),
});
