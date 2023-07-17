import { type Prisma } from "@flavoury/db";

import { generateBoundingBoxAsCoordinates } from "./generate-bounding-box-as-coordinates";

export function buildRestaurantSearchQuery(
  queryStr: string,
  lat: number,
  lng: number,
  radius = 1000,
): Prisma.RestaurantFindManyArgs {
  const boundingBox = generateBoundingBoxAsCoordinates({ lat, lng }, radius);

  const searchQuery: Prisma.RestaurantFindManyArgs = {
    where: {
      name: {
        search: queryStr,
      },

      address: {
        search: queryStr,
      },
      lat: {
        gte: boundingBox.min.lat,
        lte: boundingBox.max.lat,
      },
      lng: {
        gte: boundingBox.min.lng,
        lte: boundingBox.max.lng,
      },
    },
  };

  return searchQuery;
}
