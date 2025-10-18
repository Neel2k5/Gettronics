import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductType } from "../types/product";

type ProductFeedType = {
  productFeed: ProductType[];
  loading: boolean;
  error: string | null;

  // actions
  appendFeed: (newProductPage: ProductType[]) => void;
  clearFeed: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useProductFeedStore = create(
  persist<ProductFeedType>(
    (set) => ({
      productFeed: [],
      loading: false,
      error: null,

      appendFeed: (newProductPage) =>
        set((state) => ({
          productFeed: [...state.productFeed, ...newProductPage],
        })),
      clearFeed: () => set({ productFeed: [] }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: "productFeed",
    }
  )
);
