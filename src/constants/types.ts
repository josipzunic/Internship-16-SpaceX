export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  links: {
    patch: {
      small: string | undefined;
      large: string | undefined;
    };
    youtube_id: string | null;
  };
  failures: {
    time: number;
    altitude: number | null;
    reason: string;
  }[];
  rocket: string;
}

export interface Rocket {
  id: string;
  name: string;
}
