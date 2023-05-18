import { z } from "zod";

const businessStatus = z.enum([
  "OPERATIONAL",
  "CLOSED_TEMPORARILY",
  "CLOSED_PERMANENTLY",
]);

const nearbyResponse = z.object({
  next_page_token: z.string(),
  results: z.array(
    z.object({
      business_status: businessStatus,
      formatted_address: z.string(),
      name: z.string(),
      opening_hours: z.object({
        open_now: z.boolean(),
      }),
      photos: z
        .array(
          z.object({
            height: z.number(),
            width: z.number(),
            html_attributions: z.array(z.string()),
            photo_reference: z.string(),
          }),
        )
        .length(1),
      geometry: z.object({
        location: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
      }),
      place_id: z.string(),
      price_level: z.number().min(0).max(4).optional(),
    }),
  ),
});

export type NearbyResponse = z.infer<typeof nearbyResponse>;
