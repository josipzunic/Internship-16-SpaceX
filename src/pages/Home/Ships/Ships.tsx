import { useEffect, useMemo, useRef, useState } from "react";
import { apiUrlForRocket } from "../../../constants/apiUrl";
import type { PaginatedResponse, Ship } from "../../../constants/types";
import { useFetch } from "../../../hooks/useFetch";
import styles from "./Ships.module.css";
import { ShipCard } from "../../../components/ShipCard/ShipCard";

export const Ships = () => {
  const url = `${apiUrlForRocket}/ships/query`;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debounceRef = useRef<number | undefined>(undefined);
  const searchRef = useRef<HTMLInputElement>(null);

  const options = useMemo(
    () => ({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: {},
        options: { limit: 5, page },
      }),
    }),
    [page],
  );

  const [ships, setShips] = useState<Ship[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data } = useFetch<PaginatedResponse<Ship>>(url, options);
  const loadedPagesRef = useRef<Set<number>>(new Set());
  const loadingRef = useRef(false);
  const hasNextPageRef = useRef(false);
  const totalResults = data?.totalDocs;

  useEffect(() => {
    if (searchRef.current) searchRef.current.focus();
  }, []);

  useEffect(() => {
    hasNextPageRef.current = data?.hasNextPage ?? false;
  }, [data]);

  useEffect(() => {
    if (!data?.docs || !data.page) return;
    if (loadedPagesRef.current.has(data.page)) return;

    loadedPagesRef.current.add(data.page);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShips((prev) => [...prev, ...data.docs]);

    loadingRef.current = false;
  }, [data]);

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
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "100px" },
    );

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchText(e.target.value);
    }, 300);
  };

  const displayedShips = useMemo(() => {
    return ships.filter((ship) =>
      ship.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [ships, searchText]);

  return (
    <section className={styles.shipsPage}>
      <div className={styles.totalResults}>
        <div className={styles.filters}>
          <input
            ref={searchRef}
            type="search"
            className={styles.input}
            placeholder="Search ships..."
            onChange={handleSearch}
          />
        </div>
        <p className={styles.resultNumber}>
          found {searchText === "" ? totalResults : displayedShips.length}{" "}
          results
        </p>
      </div>
      <div className={styles.ships}>
        {displayedShips.length === 0
          ? `No results for ${searchText}`
          : displayedShips.map((ship) => (
              <ShipCard key={ship.id} ship={ship} />
            ))}
      </div>
      <div ref={bottomRef} className={styles.bottomTrigger} />
    </section>
  );
};
