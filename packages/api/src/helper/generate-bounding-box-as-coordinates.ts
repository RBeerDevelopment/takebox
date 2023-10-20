import { EARTH_RADIUS, type Coordinates } from "./coordinates";

type BoundingBox = {
  min: Coordinates;
  max: Coordinates;
};

export function generateBoundingBoxAsCoordinates(
  coords: Coordinates,
  radiusInMeters = 1000,
): BoundingBox {
  const latDist = radiusInMeters / EARTH_RADIUS;
  const lonDist =
    radiusInMeters / (EARTH_RADIUS * Math.cos((coords.lat * Math.PI) / 180));

  const minCooords: Coordinates = {
    lat: coords.lat - (latDist * 180) / Math.PI,
    lng: coords.lng - (lonDist * 180) / Math.PI,
  };

  const maxCoodrds: Coordinates = {
    lat: coords.lat + (latDist * 180) / Math.PI,
    lng: coords.lng + (lonDist * 180) / Math.PI,
  };

  return { min: minCooords, max: maxCoodrds };
}
