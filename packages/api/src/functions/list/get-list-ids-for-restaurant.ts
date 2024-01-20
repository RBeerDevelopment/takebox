import { type PrismaClient } from "@flavoury/db";

export async function getListIdsForRestaurant(
  restaurantId: string,
  userId: string,
  prisma: PrismaClient,
) {
  // TODO fix query to only show users own lists
  const listIds = await prisma.list.findMany({
    where: {
      restaurants: {
        some: {
          id: restaurantId,
        },
      },
      users: {
        some: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
    },
  });

  return listIds.map((list) => list.id);
}
