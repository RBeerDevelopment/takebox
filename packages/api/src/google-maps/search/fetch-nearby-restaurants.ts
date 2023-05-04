import { Restaurant } from "@acme/db";
import { buildTextSearchUrl } from "./build-text-search-url";
import { request } from "../../helper/request";
import { RestaurantResponseWrapper } from "./google-restaurant-response";
import { responseToRestaurant } from "./response-to-restaurant";

export type GoogleRestaurant = Omit<
  Restaurant,
  "id" | "createdAt" | "updatedAt"
>;

export async function fetchNearbyRestaurants(
  query: string,
  lat: number,
  lng: number,
): Promise<GoogleRestaurant[]> {
  const url = buildTextSearchUrl(query, lat, lng);

  if (!url) return [];

  const resp = await request<RestaurantResponseWrapper>(url.toString());

  const restaurants = resp.results
    .filter((r) => r.business_status === "OPERATIONAL")
    .map(responseToRestaurant);

  return restaurants;
}
