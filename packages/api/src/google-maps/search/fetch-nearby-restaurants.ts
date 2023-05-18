import { Restaurant as DbRestaurant } from "@acme/db";
import { buildTextSearchUrl } from "./build-text-search-url";
import { request } from "../../helper/request";
import { responseToRestaurant } from "./response-to-restaurant";
import { NearbyResponse } from "./nearby-response";

export type Restaurant = Omit<DbRestaurant, "id" | "createdAt" | "updatedAt">;

export async function fetchNearbyRestaurants(
  query: string,
  lat: number,
  lng: number,
): Promise<Restaurant[]> {
  const url = buildTextSearchUrl(query, lat, lng);

  if (!url) return [];

  const resp = await request<NearbyResponse>(url.toString());

  const restaurants = resp.results
    .filter((r) => r.business_status === "OPERATIONAL")
    .map(responseToRestaurant);

  return restaurants;
}
