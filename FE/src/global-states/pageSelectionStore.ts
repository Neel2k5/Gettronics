import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PageSelection } from "../types/pageSelection";
import { DEFAULT_PAGE } from "../lib/constants";
type PageSelectionType = {
  currentPage: PageSelection;
  setPage: (page: PageSelection) => void;
};

export const usePageSelectionStore = create(
  persist<PageSelectionType>(
    (set) => ({
      currentPage: DEFAULT_PAGE,
      setPage: (page: PageSelection) => set({ currentPage: page }),
    }),
    {
      name: "pageSelection",
    }
  )
);
