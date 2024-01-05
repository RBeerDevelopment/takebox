import { type PrismaClient } from "@flavoury/db";

import { fetchNearbyRestaurants } from "../../google-maps/search";
import { type Restaurant } from "../../google-maps/search/fetch-nearby-restaurants";
import { calculateDistanceFromCoordinates } from "../../helper/calculate-distance-from-coordinates";

export async function getNearbyRestaurantsByQuery(
  query: string,
  lat: number,
  lng: number,
  prisma: PrismaClient,
) {
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

  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      lat: true,
      lng: true,
    },
    where: {
      googleId: { in: restaurantsFromGoogle.map((r) => r.googleId) },
    },
  });

  const restaurantsWithDistance = restaurants.map((restaurant) => ({
    id: restaurant.id,
    name: restaurant.name,
    address: restaurant.address,
    distance: calculateDistanceFromCoordinates(
      { lat, lng },
      { lat: restaurant.lat, lng: restaurant.lng },
    ),
  }));

  return restaurantsWithDistance.sort((a, b) => a.distance - b.distance);
}
