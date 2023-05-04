/**
 * Round cooridnate part to 4 decimal places (11.1 meters) to allow for caching etc
 * @param part lat or lng
 * @returns part rounded to 4 decimal places
 */
export function smoothCoordinatePart(part?: number) {
  if (!part) return 0;
  return +part.toFixed(4);
}
