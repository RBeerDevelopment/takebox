import { type Restaurant as DbRestaurant } from "@flavoury/db";

import { request } from "../../helper/request";
import { buildTextSearchUrl } from "./build-text-search-url";
import { type NearbyResponse } from "./nearby-response";
import { responseToRestaurant } from "./response-to-restaurant";

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
