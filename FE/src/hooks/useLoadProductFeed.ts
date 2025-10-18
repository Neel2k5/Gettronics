import { useEffect } from "react";
import { useProductFeedStore } from "../global-states/productFeedStore";

const BACKEND_URI = import.meta.env.VITE_BE_URI;

export const useLoadProductFeed = (
  searchParam: string,
  category: string,
  page = 1
) => {
  const { appendFeed, clearFeed, setLoading, setError } = useProductFeedStore();

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = `${BACKEND_URI}/product/all?productType=${category}&page=${page}&limit=10`;
        if (searchParam.trim().length > 2) {
          url += `&productName=${encodeURIComponent(searchParam.trim())}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);

        const data = await res.json();
        clearFeed();
        appendFeed(data.data);
      } catch (err: any) {
        console.error("Error fetching product feed:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [searchParam, category, page]);
};
