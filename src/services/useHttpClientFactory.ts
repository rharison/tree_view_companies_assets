const BASE_URL = "https://fake-api.tractian.com";

type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

export const useHttpClientFactory = () => {
  const createFetch = () => {
    return async <T = unknown>(
      url: string,
      options: FetchOptions = {}
    ): Promise<T> => {
      const finalOptions: FetchOptions = {
        ...options,
        headers: {
          ...options.headers,
        },
      };

      const response = await fetch(BASE_URL + url, finalOptions);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      return response.json() as Promise<T>;
    };
  };

  return {
    fetch: createFetch(),
  };
};
