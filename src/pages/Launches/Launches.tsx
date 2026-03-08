import { useEffect, useMemo, useState } from "react";
import { pageNames } from "../../constants/pageNames";
import { useFetch } from "../../hooks/useFetch";
import { apiUrl } from "../../constants/apiUrl";
import type { Launch, PaginatedResponse } from "../../constants/types";
import { LaunchCard } from "../../components/LaunchCard/LaunchCard";
import styles from "./Launches.module.css";

export const Launches = () => {
  useEffect(() => {
    document.title = pageNames.launches;
  }, []);

  const url = `${apiUrl}/launches/query`;
  const [page, setPage] = useState(1);

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
  console.log(data?.docs);

  const launches = data?.docs;
  const hasNextPage = data?.hasNextPage;
  const hasPrevPage = data?.hasPrevPage;
  const totalPages = data?.totalPages;
  const totalResults = data?.totalDocs;

  return (
    <>
      <section className={styles.launchPage}>
        <div className={styles.totalResults}>
          <p>showing {totalResults} results</p>
        </div>
        <div className={styles.launches}>
          {launches?.map((launch: Launch) => (
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
