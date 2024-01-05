import { type PrismaClient } from "@flavoury/db";

export async function updatePersonalNote(
  restaurantId: string,
  userId: string,
  prisma: PrismaClient,
) {
  return await prisma.personalNote.findMany({
    select: { id: true, content: true },
    where: { restaurantId, userId },
  });
}
