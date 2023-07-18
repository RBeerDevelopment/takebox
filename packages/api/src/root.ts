import { authRouter } from "./router/auth";
import { restaurantRouter } from "./router/restaurant";
import { reviewRouter } from "./router/review";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  restaurant: restaurantRouter,
  review: reviewRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
