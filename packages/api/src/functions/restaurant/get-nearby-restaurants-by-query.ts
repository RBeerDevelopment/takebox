import { type PrismaClient } from "@flavoury/db";

import { selectRestarauntsWitAvgRatingByGoogleId } from "../../db/restaurant/select-restaurants-with-avg-rating-by-google-id";
import { fetchNearbyRestaurants } from "../../google-maps/search";
import { type Restaurant } from "../../google-maps/search/fetch-nearby-restaurants";
import { calculateDistanceFromCoordinates } from "../../helper/calculate-distance-from-coordinates";

export type RestaurantWithDistance = {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number | null;
};

export async function getNearbyRestaurantsByQuery(
  query: string,
  lat: number,
  lng: number,
  prisma: PrismaClient,
): Promise<RestaurantWithDistance[]> {
  // const dbQuery = buildRestaurantSearchQuery(query, lat, lng);
  // const restaurantsFromDb = await prisma.restaurant.findMany(dbQuery);
  let restaurantsFromGoogle: Restaurant[] = [];
  try {
    restaurantsFromGoogle = await fetchNearbyRestaurants(query, lat, lng);
  } catch (e) {
    console.error(e);
  }

  if (!restaurantsFromGoogle || restaurantsFromGoogle.length === 0) return [];

  await prisma.restaurant.createMany({
    skipDuplicates: true,
    data: [...restaurantsFromGoogle],
  });

  const restaurants = await selectRestarauntsWitAvgRatingByGoogleId(
    restaurantsFromGoogle.map((r) => r.googleId),
    prisma,
  );

  const restaurantsWithDistance = restaurants.map((restaurant) => ({
    id: restaurant.id,
    name: restaurant.name,
    address: restaurant.address,
    rating: restaurant.average_rating,
    distance: calculateDistanceFromCoordinates(
      { lat, lng },
      { lat: restaurant.lat, lng: restaurant.lng },
    ),
  }));

  return restaurantsWithDistance.sort((a, b) => a.distance - b.distance);
}
