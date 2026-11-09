const BASE_URL = 'https://rickandmortyapi.com/api';

export async function fetchClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const config: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText || response.statusText}`);
  }

  return response.json();
}