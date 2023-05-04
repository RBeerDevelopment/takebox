export interface RestaurantResponseWrapper {
  html_attributions: string[];
  next_page_token: string;
  results: RestaurantResponse[];
  status: string;
}

export interface RestaurantResponse {
  business_status: string;
  formatted_address: string;
  name: string;
  geometry: Geometry;
  opening_hours: OpeningHours;
  place_id: string;
  price_level?: number;
  rating: number;
  reference: string;
  types: string[];
  user_ratings_total: number;
}

interface Geometry {
  location: Location;
}

interface Location {
  lat: number;
  lng: number;
}

interface OpeningHours {
  open_now: boolean;
}
