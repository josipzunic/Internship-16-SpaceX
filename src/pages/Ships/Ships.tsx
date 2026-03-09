import { useEffect, useMemo, useRef } from "react";
import { apiUrlForRocket } from "../../constants/apiUrl";
import styles from "./Ships.module.css";
import { ShipCard } from "../../components/ShipCard/ShipCard";
import { useSearchParams } from "react-router-dom";
import type { Ship } from "../../constants/types";
import { usePaginatedFetch } from "../../hooks/usePaginatedFetch";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useDebounce } from "../../hooks/useDebounce";
import { pageNames } from "../../constants/pageNames";
import { withPageTitle } from "../../hocs/withPageTitle";

export const Ships = () => {

  const url = `${apiUrlForRocket}/ships/query`;
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get("search") ?? "";

  const {
    items: ships,
    hasNextPage,
    totalDocs,
    loadMore,
  } = usePaginatedFetch<Ship>(url);

  const { bottomRef, setHasNextPage, setLoading } = useInfiniteScroll(loadMore);

  useEffect(() => {
    setHasNextPage(hasNextPage);
    setLoading(false);
  }, [hasNextPage, setLoading, setHasNextPage]);

  useEffect(() => {
    if (searchRef.current) searchRef.current.focus();
  }, []);

  const debounce = useDebounce(300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      setSearchParams({ search: e.target.value });
    });
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
          found {searchText === "" ? totalDocs : displayedShips.length} results
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

export const ShipsWithTitle = withPageTitle(Ships, pageNames.ships);