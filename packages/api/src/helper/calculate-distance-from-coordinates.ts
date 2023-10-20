import { EARTH_RADIUS, type Coordinates } from "./coordinates";

export function calculateDistanceFromCoordinates(
  coord1: Coordinates,
  coord2: Coordinates,
): number {
  const lat1 = coord1.lat;
  const lat2 = coord2.lat;
  const long1 = coord1.lng;
  const long2 = coord2.lng;

  const dLat = toRadians(lat2 - lat1);
  const dLong = toRadians(long2 - long1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = EARTH_RADIUS * c;

  return Math.abs(Math.round(distance));
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
