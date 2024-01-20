import { type PrismaClient } from "@flavoury/db";

export async function deleteList(
  listId: string,
  userId: string,
  prisma: PrismaClient,
) {
  return await prisma.list.delete({
    select: {
      id: true,
    },
    where: {
      id: listId,
      users: {
        some: {
          id: userId,
        },
      },
    },
  });
}
