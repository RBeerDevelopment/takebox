import { router } from "../trpc";
import { authRouter } from "./auth";
import { restaurantRouter } from "./restaurant";
import { reviewRouter } from "./review";

export const appRouter = router({
  auth: authRouter,
  restaurant: restaurantRouter,
  review: reviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
