const baseUrl = new URL(
  "https://maps.googleapis.com/maps/api/place/textsearch/json",
);

export function buildTextSearchUrl(
  query: string,
  lat: number,
  lng: number,
  radius = 1000,
): URL | undefined {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) return;

  const url = new URL(baseUrl.toString());
  url.searchParams.set("query", query);
  url.searchParams.set("location", `${lat},${lng}`);
  url.searchParams.set("radius", radius.toString());
  url.searchParams.set("type", "restaurant");
  url.searchParams.set("key", apiKey);

  return url;
}
