import { useEffect, useMemo, useState } from "react";
import { pageNames } from "../../constants/pageNames";
import { useFetch } from "../../hooks/useFetch";
import { apiUrl } from "../../constants/apiUrl";
import type { PaginatedResponse } from "../../constants/types";

interface Launch {
  id: string;
  name: string;
  dateUtc: string;
  success: boolean;
}

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
        query: { upcoming: true },
        options: { limit: 5, sort: { date_utc: "asc" }, page },
      }),
    };
  }, [page]);

  const { data } = useFetch<PaginatedResponse<Launch>>(
    url,
    options,
  );

  //const launches = data?.docs;
  const hasNextPage = data?.hasNextPage;
  const hasPrevPage = data?.hasPrevPage;
  const totalPages = data?.totalPages;
  const totalResults = data?.totalDocs;

  return <div>
    <button disabled={!hasPrevPage} onClick={() => setPage((current) => current-1)}>Previous</button>
    <button disabled={!hasNextPage} onClick={() => setPage((current) => current+1)}>Next</button>
    <p>total pages {totalPages}</p>
    <p>showing {totalResults} results</p>
  </div>;
};
