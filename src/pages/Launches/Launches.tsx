import { useEffect, useMemo, useRef, useState } from "react";
import { pageNames } from "../../constants/pageNames";
import { useFetch } from "../../hooks/useFetch";
import { apiUrlForLaunch } from "../../constants/apiUrl";
import type { Launch, PaginatedResponse } from "../../constants/types";
import { LaunchCard } from "../../components/LaunchCard/LaunchCard";
import styles from "./Launches.module.css";
import { useLaunchFilter } from "../../hooks/useLaunchFilter";
import { withPageTitle } from "../../hocs/withPageTitle";
import { Loading } from "../../components/Loading/Loading";

export const Launches = () => {
  const url = `${apiUrlForLaunch}/launches/query`;
  const [page, setPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchRef.current) searchRef.current.focus();
  }, []);

  const options = useMemo(
    () => ({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: {},
        options: { limit: 10, sort: { date_utc: "asc" }, page },
      }),
    }),
    [page],
  );

  const { data, loading } = useFetch<PaginatedResponse<Launch>>(url, options);

  const {
    searchText,
    filterOption,
    setFilterOption,
    handleSearch,
    displayedLaunches,
    defaultFilterOption,
  } = useLaunchFilter(data?.docs);

  const hasNextPage = data?.hasNextPage;
  const hasPrevPage = data?.hasPrevPage;
  const totalPages = data?.totalPages;
  const totalResults = data?.totalDocs;

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
              onChange={handleSearch}
            />
            <select
              className={styles.select}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="all">No filter</option>
              <option value="false">Failed missions</option>
              <option value="true">Successful missions</option>
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
          {loading ? (
            <Loading />
          ) : displayedLaunches?.length === 0 ? (
            `No results for ${searchText}`
          ) : (
            displayedLaunches?.map((launch: Launch) => (
              <LaunchCard key={launch.id} launch={launch} />
            ))
          )}
        </div>
      </section>
      <footer className={styles.footer}>
        <button
          disabled={!hasPrevPage}
          onClick={() => setPage((p) => p - 1)}
          className={styles.button}
        >
          &lt; Previous
        </button>
        <p className={styles.pageNumber}>{page}</p>
        <button
          disabled={!hasNextPage}
          onClick={() => setPage((p) => p + 1)}
          className={styles.button}
        >
          Next &gt;
        </button>
        <p className={styles.totalPages}>total pages: {totalPages}</p>
      </footer>
    </>
  );
};

export const LaunchesWithTitle = withPageTitle(Launches, pageNames.launches);
