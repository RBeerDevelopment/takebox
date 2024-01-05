import { type PrismaClient } from "@flavoury/db";

import { fetchGooglePhotoBlob } from "../../google-maps/photos/fetch-google-photo-blob";
import { createPresignedUrl } from "../../s3/create-presigned-url";
import { uploadImageBlob } from "../../s3/upload-image-blob";

export async function getRestaurantImageUrl(
  restaurantId: string,
  prisma: PrismaClient,
) {
  const restaurantInDb = await prisma.restaurant.findUnique({
    select: { s3ImageKey: true, googlePhotoReference: true },
    where: { id: restaurantId },
  });

  let s3ImageKey = restaurantInDb?.s3ImageKey;

  if (s3ImageKey) return createPresignedUrl("getObject", s3ImageKey);

  if (restaurantInDb?.googlePhotoReference) {
    const image = await fetchGooglePhotoBlob(
      restaurantInDb.googlePhotoReference,
    );

    s3ImageKey = await uploadImageBlob(image, restaurantId);

    void prisma.restaurant.update({
      where: { id: restaurantId },
      data: { s3ImageKey },
    });
  }

  if (!s3ImageKey) throw new Error("could not retrieve image url");
  return createPresignedUrl("getObject", s3ImageKey);
}
