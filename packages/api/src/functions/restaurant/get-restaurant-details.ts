import { type PrismaClient } from "@flavoury/db";

//TODO periodially update restaurant details
export async function getRestaurantDetails(
  placeId: string,
  prisma: PrismaClient,
) {
  const restaurantInDb = await prisma.restaurant.findUnique({
    select: {
      googleId: true,
      websiteUrl: true,
      googleUrl: true,
      address: true,
      name: true,
    },
    where: { id: placeId },
  });

  return restaurantInDb;
}
