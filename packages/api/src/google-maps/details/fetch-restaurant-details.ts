import { z } from "zod";
import { request } from "../../helper/request";
import { buildDetailUrl } from "./build-detail-url";

const placeDetailResponse = z.object({
  result: z.object({
    current_opening_hours: z
      .object({
        open_now: z.boolean(),
        periods: z.array(
          z.object({
            open: z.object({
              day: z.number().min(0).max(6),
              time: z.string(),
            }),
          }),
        ),
      })
      .optional(),
    formatted_address: z.string(),
    name: z.string(),
    price_level: z.number().min(0).max(4).optional(),
    url: z.string().url(),
    website: z.string().url().optional(),
  }),
});

type PlaceDetailResponse = z.infer<typeof placeDetailResponse>;

export async function fetchRestaurantDetails(placeId: string) {
  const url = buildDetailUrl(placeId);
  if (!url) return;

  const resp = await request<PlaceDetailResponse>(url.toString());

  return placeDetailResponse.parse(resp).result;
}
