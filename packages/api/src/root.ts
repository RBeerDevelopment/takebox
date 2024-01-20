import { listRouter } from "./router/list";
import { restaurantRouter } from "./router/restaurant";
import { reviewRouter } from "./router/review";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  restaurant: restaurantRouter,
  review: reviewRouter,
  user: userRouter,
  list: listRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
