import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <T,>(url: string | null, options?: RequestInit) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    if (!url) return;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          signal: controller.signal,
          ...options,
        });

        if (!response.ok) throw new Error("Error with response");

        const data: T = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setState({
          data: null,
          loading: false,
          error: (error as Error).message,
        });
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, options]);

  return state;
};
