/**
 * Shortens a URL to a maximum length of 191 characters for storage in a database.
 * If the URL is already shorter than 191 characters, it is returned unchanged.
 * If the URL is longer than 191 characters, any query parameters are removed and the resulting URL is returned.
 * If the resulting URL is still longer than 191 characters, undefined is returned.
 * @param url The URL to shorten.
 * @returns The shortened URL, or undefined if the URL could not be shortened to 191 characters or less.
 */
export function shortenUrlForDb(url: string): string | undefined {
  if (url.length < 191) return url;
  // remove any query params
  const urlWithoutQueryParams = url.split("?")[0] ?? url;

  if (urlWithoutQueryParams.length < 191) return urlWithoutQueryParams;
  return undefined;
}
