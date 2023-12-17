import { type Restaurant as DbRestaurant } from "@flavoury/db";

import { request } from "../../helper/request";
import { GooglePlacesApi, trackGooglePlacesUsage } from "../../redis";
import { buildTextSearchRequest } from "./build-text-search-request";
import { type NearbyResponse } from "./nearby-response";
import { responseToRestaurant } from "./response-to-restaurant";

export type Restaurant = Omit<DbRestaurant, "id" | "createdAt" | "updatedAt">;

export async function fetchNearbyRestaurants(
  query: string,
  lat: number,
  lng: number,
): Promise<Restaurant[]> {
  const requestConfig = buildTextSearchRequest(query, lat, lng);

  if (!requestConfig) return [];

  const resp = await request<NearbyResponse>(
    requestConfig.url.toString(),
    requestConfig.config,
  );

  // void trackGooglePlacesUsage(GooglePlacesApi.Search);
  const restaurants = resp.places
    .filter((r) => r.businessStatus === "OPERATIONAL")
    .filter(
      (r) =>
        r.types.includes("restaurant") ||
        r.types.includes("food") ||
        r.types.includes("cafe"),
    )
    .map(responseToRestaurant);

  return restaurants;
}
