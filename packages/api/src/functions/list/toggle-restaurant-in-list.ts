import { type PrismaClient } from "@flavoury/db";

type ActionType = "add" | "remove";

export async function toggleRestaurantInList(
  actionType: ActionType,
  listId: string,
  restaurantId: string,
  userId: string,
  prisma: PrismaClient,
) {
  await prisma.list.update({
    where: {
      id: listId,
      users: {
        some: {
          id: userId,
        },
      },
    },
    data: {
      restaurants: {
        ...(actionType === "add"
          ? {
              connect: {
                id: restaurantId,
              },
            }
          : {
              disconnect: {
                id: restaurantId,
              },
            }),
      },
    },
  });
}
