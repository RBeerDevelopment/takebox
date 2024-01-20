import { type PrismaClient } from "@flavoury/db";

export async function updateList(
  listId: string,
  userId: string,
  name: string | undefined,
  description: string | undefined,
  prisma: PrismaClient,
) {
  return await prisma.list.update({
    select: {
      id: true,
      name: true,
      description: true,
    },
    data: {
      ...(name ? { name } : {}),
      ...(description ? { description } : {}),
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
