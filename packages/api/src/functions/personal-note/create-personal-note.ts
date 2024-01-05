import { type PrismaClient } from "@flavoury/db";

export async function createPersonalNote(
  restaurantId: string,
  userId: string,
  content: string,
  prisma: PrismaClient,
) {
  return await prisma.personalNote.create({
    data: { restaurantId, userId, content },
  });
}
