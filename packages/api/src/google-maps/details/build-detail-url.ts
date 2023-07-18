const fields = ["current_opening_hours", "website", "url"];

export function buildDetailUrl(placeId: string) {
  return `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields.join(
    ",",
  )}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
}
