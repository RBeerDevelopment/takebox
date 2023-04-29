import { z } from "zod";

const coordinateSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

type Cooridnates = z.infer<typeof coordinateSchema>;

const earthRadius = 6378137;

type BoundingBox = {
  min: Cooridnates;
  max: Cooridnates;
};

export function generateBoundingBoxAsCoordinates(
  coords: Cooridnates,
  radiusInMeters = 1000,
): BoundingBox {
  const latDist = radiusInMeters / earthRadius;
  const lonDist =
    radiusInMeters / (earthRadius * Math.cos((coords.lat * Math.PI) / 180));

  const minCooords: Cooridnates = {
    lat: coords.lat - (latDist * 180) / Math.PI,
    lng: coords.lng - (lonDist * 180) / Math.PI,
  };

  const maxCoodrds: Cooridnates = {
    lat: coords.lat + (latDist * 180) / Math.PI,
    lng: coords.lng + (lonDist * 180) / Math.PI,
  };

  return { min: minCooords, max: maxCoodrds };
}
