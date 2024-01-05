import { type PrismaClient } from "@flavoury/db";

export async function getPersonalNote(
  restaurantId: string,
  userId: string,
  prisma: PrismaClient,
) {
  return await prisma.personalNote.findFirst({
    select: { id: true, content: true },
    where: { restaurantId, userId },
  });
}
