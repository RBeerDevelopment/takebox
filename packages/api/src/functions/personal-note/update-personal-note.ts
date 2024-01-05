import { type PrismaClient } from "@flavoury/db";

export async function updatePersonalNote(
  noteId: string,
  restaurantId: string,
  userId: string,
  newContent: string,
  prisma: PrismaClient,
) {
  return await prisma.personalNote.update({
    data: { content: newContent },
    where: { id: noteId, restaurantId, userId },
  });
}
