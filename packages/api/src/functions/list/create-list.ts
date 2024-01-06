import { type PrismaClient } from "@flavoury/db";

export async function createList(
  name: string,
  description: string | undefined,
  userId: string,
  prisma: PrismaClient,
) {
  const list = await prisma.list.create({
    data: {
      name,
      description,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return list;
}
