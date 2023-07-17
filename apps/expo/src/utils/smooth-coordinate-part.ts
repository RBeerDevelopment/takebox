/**
 * Round cooridnate part to 3 decimal places (~100 meters) to allow for caching etc.
 * @param part lat or lng
 * @returns part rounded to 3 decimal places
 */
export function smoothCoordinatePart(part?: number) {
  if (!part) return 0;
  return +part.toFixed(3);
}
