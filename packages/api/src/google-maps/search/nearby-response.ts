import { z } from "zod";

const businessStatus = z.enum([
  "OPERATIONAL",
  "CLOSED_TEMPORARILY",
  "CLOSED_PERMANENTLY",
]);

const NearbyResponse = z.object({
  places: z.array(
    z.object({
      id: z.string(),
      types: z.array(z.string()),
      formattedAddress: z.string(),
      location: z.object({ latitude: z.number(), longitude: z.number() }),
      googleMapsUri: z.string().url(),
      websiteUri: z.string().url().optional(),
      businessStatus: businessStatus,
      displayName: z.object({ text: z.string(), languageCode: z.string() }),
      photos: z.array(
        z.object({
          name: z.string(),
          widthPx: z.number(),
          heightPx: z.number(),
          authorAttributions: z.array(
            z.object({
              displayName: z.string(),
              uri: z.string(),
              photoUri: z.string(),
            }),
          ),
        }),
      ),
    }),
  ),
});

export type NearbyResponse = z.infer<typeof NearbyResponse>;
