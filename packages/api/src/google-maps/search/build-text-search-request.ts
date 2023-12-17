type TextSearchRequest = {
  url: URL;
  config: RequestInit;
};

const textSearchURL = new URL(
  "https://places.googleapis.com/v1/places:searchText",
);
const textSearchFieldMasks = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.googleMapsUri",
  "places.location",
  "places.photos",
  "places.websiteUri",
  // "places.currentOpeningHours",
  "places.nationalPhoneNumber",
  "places.businessStatus",
];

export function buildTextSearchRequest(
  query: string,
  lat: number,
  lng: number,
  radius = 5000,
): TextSearchRequest | undefined {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) return;

  const config: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-FieldMask": textSearchFieldMasks.join(","),
      "X-Goog-Api-Key": apiKey,
    },
    body: JSON.stringify({
      textQuery: query,
      locationBias: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng,
          },
          radius: radius,
        },
      },
      languageCode: "en",
      // currently not set since this would exclude things like cafes etc.
      // includedType: "restaurant"
    }),
  };

  return { url: textSearchURL, config };
}
