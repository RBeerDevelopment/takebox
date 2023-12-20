export function buildPhotoUrl(reference: string, maxWidth = 400) {
  return `https://places.googleapis.com/v1/${reference}/media?maxWidthPx=${maxWidth}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
}
