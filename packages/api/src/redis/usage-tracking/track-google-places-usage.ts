import { redis } from "../redis-connector";

export enum GooglePlacesApi {
  Photo = "photo",
  Detail = "detail",
  Search = "search",
}
export async function trackGooglePlacesUsage(api: GooglePlacesApi) {
  const key = `google-places-usage-${api}`;
  const oldValue = (await redis.get<number>(key)) || 0;
  await redis.set(key, oldValue + 1);
}
