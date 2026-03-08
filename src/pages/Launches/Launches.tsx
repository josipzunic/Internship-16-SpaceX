import { useEffect, useMemo, useRef, useState } from "react";
import { pageNames } from "../../constants/pageNames";
import { useFetch } from "../../hooks/useFetch";
import { apiUrl } from "../../constants/apiUrl";
import type { Launch, PaginatedResponse } from "../../constants/types";
import { LaunchCard } from "../../components/LaunchCard/LaunchCard";
import styles from "./Launches.module.css";
import { useSearchParams } from "react-router-dom";

export const Launches = () => {
  useEffect(() => {
    document.title = pageNames.launches;
  }, []);

  const url = `${apiUrl}/launches/query`;
  const [page, setPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number | undefined>(undefined);
  const defaultFilterOption = "all";
  const [filterOption, setFilterOption] = useState(defaultFilterOption);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get("search") ?? "";

  useEffect(() => {
    if (searchRef.current) searchRef.current.focus();
  }, []);

  const options = useMemo(() => {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: {},
        options: { limit: 10, sort: { date_utc: "asc" }, page },
      }),
    };
  }, [page]);

  const { data } = useFetch<PaginatedResponse<Launch>>(url, options);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = e.target.value;

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchParams({search: newSearchText});
    }, 300);
  };

  const launches = data?.docs;
  const hasNextPage = data?.hasNextPage;
  const hasPrevPage = data?.hasPrevPage;
  const totalPages = data?.totalPages;
  const totalResults = data?.totalDocs;

  const displayedLaunches = useMemo(() => {
    let filteredLaunches = launches?.filter((launch: Launch) => {
      return launch.name.toLowerCase().includes(searchText.toLowerCase());
    });

    if (filterOption !== "all") {
      filteredLaunches = filteredLaunches?.filter(
        (launch) => String(launch.success) === filterOption,
      );
    }

    return filteredLaunches;
  }, [searchText, launches, filterOption]);

  return (
    <>
      <section className={styles.launchPage}>
        <div className={styles.totalResults}>
          <div className={styles.filters}>
            <input
              ref={searchRef}
              type="search"
              className={styles.input}
              placeholder="Search launches..."
              defaultValue={searchText}
              onChange={(e) => handleSearch(e)}
            />
            <select
              className={styles.select}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="all">No filter</option>
              <option value="false">Failed missions</option>
              <option value="true">Sucessful missions</option>
            </select>
          </div>
          <p className={styles.resultNumber}>
            showing{" "}
            {searchText === "" && filterOption === defaultFilterOption
              ? totalResults
              : displayedLaunches?.length}{" "}
            results
          </p>
        </div>
        <div className={styles.launches}>
          {displayedLaunches?.length === 0
            ? `No results for ${searchText}`
            : displayedLaunches?.map((launch: Launch) => (
                <LaunchCard key={launch.id} launch={launch} />
              ))}
        </div>
      </section>
      <footer className={styles.footer}>
        <button
          disabled={!hasPrevPage}
          onClick={() => setPage((current) => current - 1)}
          className={styles.button}
        >
          &lt; Previous
        </button>
        <p className={styles.pageNumber}>{page}</p>
        <button
          disabled={!hasNextPage}
          onClick={() => setPage((current) => current + 1)}
          className={styles.button}
        >
          Next &gt;
        </button>
        <p className={styles.totalPages}>total pages: {totalPages}</p>
      </footer>
    </>
  );
};
