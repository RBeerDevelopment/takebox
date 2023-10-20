import { z } from "zod";

export const EARTH_RADIUS = 6378137;

export const coordinateSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

export type Coordinates = z.infer<typeof coordinateSchema>;
