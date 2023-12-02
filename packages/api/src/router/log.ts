import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const logRouter = createTRPCRouter({
  logError: protectedProcedure
    .input(
      z.object({
        message: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      const { auth, prisma } = ctx;
      prisma.errorLog.create({
        data: {
          message: input.message,
          userId: auth.userId,
        },
      });
    }),
});
