import { create } from "zustand";
import type { ProductCategory } from "../types/productCategory";

type ProductCategoryType = {
  currentCategory: ProductCategory;
  setCurrentCategory: (category: ProductCategory) => void;
};

export const useProductCategoryStore = create<ProductCategoryType>((set) => ({
  currentCategory: "general",
  setCurrentCategory: (category) => set({ currentCategory: category }),
}));
