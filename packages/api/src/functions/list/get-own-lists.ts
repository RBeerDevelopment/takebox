import { type PrismaClient } from "@flavoury/db";

export async function getOwnLists(userId: string, prisma: PrismaClient) {
  const lists = await prisma.list.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
      _count: {
        select: { restaurants: true },
      },
    },
  });

  return lists
    .map((list) => ({
      id: list.id,
      name: list.name,
      description: list.description,
      nrOfRestaurants: list._count.restaurants,
    }))
    .sort((a, b) => a.nrOfRestaurants - b.nrOfRestaurants);
}
