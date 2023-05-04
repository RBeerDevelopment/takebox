import { z } from "zod";

const fields = [
  "name",
  "current_opening_hours",
  "formatted_address",
  "website",
  "price_level",
  "url",
];

export function buildDetailUrl(placeId: string) {
  return `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields.join(
    ",",
  )}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
}
