type FetchError = {
  data?: {
    message?: string;
  };
} | null;

type Meta = {
  limit: number;
  page: number;
  pages: number;
  total: number;
};
