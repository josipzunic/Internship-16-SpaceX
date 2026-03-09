import { useEffect, useMemo, useRef, useState } from "react";
import { apiUrlForRocket } from "../../../constants/apiUrl";
import type { PaginatedResponse, Ship } from "../../../constants/types";
import { useFetch } from "../../../hooks/useFetch";
import styles from "./Ships.module.css";

export const Ships = () => {
  const url = `${apiUrlForRocket}/ships/query`;
  const [page, setPage] = useState(1);

  const options = useMemo(() => {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: {},
        options: { limit: 10, page },
      }),
    };
  }, [page]);

  const [ships, setShips] = useState<Ship[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data } = useFetch<PaginatedResponse<Ship>>(url, options);

  const loadedPagesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!data?.docs || !data.page) return;
    if (loadedPagesRef.current.has(data.page)) return;
    loadedPagesRef.current.add(data.page);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShips((prev) => [...prev, ...data.docs]);
  }, [data]);

  const hasNextPage = data?.hasNextPage ?? false;

  useEffect(() => {
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        observer.disconnect();
        setPage((prev) => prev + 1);
      }
    });

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [hasNextPage]);

  return (
    <div className={styles.test}>
      {ships.map((ship) => (
        <div key={ship.id}>{ship.name}</div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
