import { useCallback, useEffect, useRef } from "react";

export const useInfiniteScroll = (onLoadMore: () => void) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const hasNextPageRef = useRef(false);

  const setHasNextPage = useCallback((value: boolean) => {
    hasNextPageRef.current = value;
  }, []);

  const setLoading = useCallback((value: boolean) => {
    loadingRef.current = value;
  }, []);

  useEffect(() => {
    if (!bottomRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasNextPageRef.current &&
          !loadingRef.current
        ) {
          loadingRef.current = true;
          onLoadMore();
        }
      },
      { rootMargin: "100px" },
    );
    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [onLoadMore]);

  return { bottomRef, setHasNextPage, setLoading };
};
