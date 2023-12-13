import type { PrismaClient } from "@flavoury/db";

import { generateBoundingBoxAsCoordinates } from "../../helper/generate-bounding-box-as-coordinates";
import type { ReviewListItem } from "./review-list-item";

export async function selectLastestReviews(
  prisma: PrismaClient,
  lat: number,
  lng: number,
  take: number,
): Promise<ReviewListItem[]> {
  const boundingBox = generateBoundingBoxAsCoordinates({ lat, lng }, 5_000);

  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      rating: true,
      date: true,
      restaurant: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          username: true,
        },
      },
      content: true,
    },
    where: {
      restaurant: {
        lat: {
          gte: boundingBox.min.lat,
          lte: boundingBox.max.lat,
        },
        lng: {
          gte: boundingBox.min.lng,
          lte: boundingBox.max.lng,
        },
      },
    },
    orderBy: [{ date: "desc" }, { updatedAt: "desc" }],
    take,
  });

  return reviews;
}
