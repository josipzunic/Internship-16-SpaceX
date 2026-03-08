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
      <section className={styles.launches}>
        {launches?.map((launch: Launch) => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}
      </section>
      <footer>
        <button
          disabled={!hasPrevPage}
          onClick={() => setPage((current) => current - 1)}
        >
          Previous
        </button>
        <button
          disabled={!hasNextPage}
          onClick={() => setPage((current) => current + 1)}
        >
          Next
        </button>
      </footer>
      <p>total pages {totalPages}</p>
      <p>showing {totalResults} results</p>
    </>
  );
};
