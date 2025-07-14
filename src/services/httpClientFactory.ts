const BASE_URL = "https://fake-api.tractian.com";

type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const createFetch = () => {
  return async (url: string, options: FetchOptions = {}) => {
    const finalOptions: FetchOptions = {
      ...options,
      headers: {
        ...options.headers,
        ...defaultHeaders,
      },
    };

    const response = await fetch(BASE_URL + url, finalOptions);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    return response.json();
  };
};
