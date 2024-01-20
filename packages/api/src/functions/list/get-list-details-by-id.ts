import { type PrismaClient } from "@flavoury/db";

export async function getListDetailsById(listId: string, prisma: PrismaClient) {
  const list = await prisma.list.findUnique({
    where: {
      id: listId,
    },
    select: {
      users: {
        select: {
          id: true,
          username: true,
        },
      },
      restaurants: {
        select: {
          id: true,
          name: true,
          address: true,
          s3ImageKey: true,
        },
      },
    },
  });

  if (!list) {
    throw new Error("List not found");
  }

  return list;
}
