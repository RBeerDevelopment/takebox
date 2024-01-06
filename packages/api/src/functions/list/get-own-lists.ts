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
  });
  return lists;
}
