import { type PrismaClient } from "@flavoury/db";

import {
  emptyRatingCountMap,
  possibleRatings,
  type PossibleRating,
  type RatingCountMap,
} from "../../utils/rating-count-map";

export async function getReviewSummary(
  restaurantId: string,
  prisma: PrismaClient,
) {
  const [summary, ratingCounts] = await Promise.all([
    prisma.review.aggregate({
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
      where: {
        restaurantId,
      },
    }),
    prisma.review.groupBy({
      by: ["rating"],
      where: {
        restaurantId,
      },
      _count: {
        rating: true,
      },
    }),
  ]);

  const ratingCountMap: RatingCountMap = { ...emptyRatingCountMap };

  ratingCounts.forEach((ratingCount) => {
    if (possibleRatings.includes(ratingCount.rating as PossibleRating))
      ratingCountMap[ratingCount.rating as PossibleRating] =
        ratingCount._count.rating;
  });

  const average = summary?._avg?.rating;
  const count = summary?._count?.rating;

  const response = {
    // devide by 2 because the rating is stored as 1-10
    averageRating: average ? average / 2 : null,
    reviewCount: count ?? null,
    ratingCounts: ratingCountMap,
  };

  return response;
}
