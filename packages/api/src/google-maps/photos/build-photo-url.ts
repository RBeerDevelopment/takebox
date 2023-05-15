export function buildPhotoUrl(reference: string, maxWidth = 400) {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${reference}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
}
