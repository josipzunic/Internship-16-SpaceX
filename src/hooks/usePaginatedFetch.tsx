import { useEffect, useMemo, useRef, useState } from "react";
import { useFetch } from "./useFetch";
import type { PaginatedResponse } from "../constants/types";

export const usePaginatedFetch = <T,>(url: string, extraOptions?: object) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<T[]>([]);
  const loadedPagesRef = useRef<Set<number>>(new Set());

  const options = useMemo(() => ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: {},
      options: { limit: 5, page, ...extraOptions },
    }),
  }), [page, extraOptions]);

  const { data, loading, error } = useFetch<PaginatedResponse<T>>(url, options);

  useEffect(() => {
    if (!data?.docs || !data.page) return;
    if (loadedPagesRef.current.has(data.page)) return;
    loadedPagesRef.current.add(data.page);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems((prev) => [...prev, ...data.docs]);
  }, [data]);

  const loadMore = () => setPage((prev) => prev + 1);

  return {
    items,
    loading,
    error,
    hasNextPage: data?.hasNextPage ?? false,
    totalDocs: data?.totalDocs,
    loadMore,
  };
};