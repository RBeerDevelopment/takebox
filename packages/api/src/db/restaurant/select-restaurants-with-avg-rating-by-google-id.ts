import { type PrismaClient } from "@flavoury/db";

type RestaurantWithAvgRating = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  average_rating: number;
};

export async function selectRestarauntsWitAvgRatingByGoogleId(
  ids: string[],
  prisma: PrismaClient,
) {
  const idString = ids.map((id) => `'${id}'`).join(",");

  const restaurants = await prisma.$queryRawUnsafe<RestaurantWithAvgRating[]>(`
    SELECT
        restaurant.id,
        restaurant.name,
        restaurant.address,
        restaurant.lat,
        restaurant.lng,
        AVG(review.rating) as average_rating
    FROM 
        Restaurant restaurant
    LEFT JOIN 
        Review review ON restaurant.id = review.restaurantId
    WHERE
        restaurant.googleId IN(${idString})
    GROUP BY 
        restaurant.id;
  `);

  return restaurants;
}
