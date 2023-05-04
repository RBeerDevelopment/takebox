export async function request<TResponse>(
  url: string,
  config: RequestInit = {},
): Promise<TResponse> {
  const response = await fetch(url, config);
  const data = await response.json();
  return data as TResponse;
}
