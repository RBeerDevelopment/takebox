import { type PrismaClient } from "@flavoury/db";

export async function deletePersonalNote(
  restaurantId: string,
  noteId: string,
  userId: string,
  prisma: PrismaClient,
) {
  return await prisma.personalNote.delete({
    where: { restaurantId, id: noteId, userId },
    select: undefined,
  });
}
