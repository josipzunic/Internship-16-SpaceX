import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "./useDebounce";
import type { Launch } from "../constants/types";

export const useLaunchFilter = (launches: Launch[] | undefined) => {
  const defaultFilterOption = "all";
  const [filterOption, setFilterOption] = useState(defaultFilterOption);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get("search") ?? "";
  const debounce = useDebounce(300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = e.target.value;
    debounce(() => setSearchParams({ search: newSearchText }));
  };

  const displayedLaunches = useMemo(() => {
    let filtered = launches?.filter((launch) =>
      launch.name.toLowerCase().includes(searchText.toLowerCase())
    );
    if (filterOption !== "all") {
      filtered = filtered?.filter(
        (launch) => String(launch.success) === filterOption
      );
    }
    return filtered;
  }, [searchText, launches, filterOption]);

  return {
    searchText,
    filterOption,
    setFilterOption,
    handleSearch,
    displayedLaunches,
    defaultFilterOption,
  };
};