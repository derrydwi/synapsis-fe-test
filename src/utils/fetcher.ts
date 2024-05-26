const BASE_URL = "https://gorest.co.in/public/v2";

export const fetchData = <Response = unknown>(
  url: string,
  init?: RequestInit,
) => {
  return new Promise<{ data: Response; meta: Meta }>(
    async (resolve, reject) => {
      try {
        const response = await fetch(BASE_URL + url, {
          ...init,
          headers: {
            Authorization: `Bearer ${process.env.TOKEN ?? process.env.NEXT_PUBLIC_TOKEN}`,
          },
          cache: "no-store",
        });

        const meta = {
          limit: Number(response.headers.get("X-Pagination-Limit")),
          page: Number(response.headers.get("X-Pagination-Page")),
          pages: Number(response.headers.get("X-Pagination-Pages")),
          total: Number(response.headers.get("X-Pagination-Total")),
        };

        let data: Response;
        if (response.status === 204) {
          data = {} as Response;
        } else {
          data = await response.json();
        }

        if (response.status >= 400) {
          reject({ data, meta });
        }

        resolve({ data, meta });
      } catch (error) {
        console.log("error", error);
        reject(error);
      }
    },
  );
};
