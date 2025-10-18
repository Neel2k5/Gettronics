import { useEffect, useState } from "react";
import Cart from "./Cart";
import SearchIcon from "./SearchIcon";
import { useProductCategoryStore } from "../../global-states/productCategoryStore";
import type { ProductCategory } from "../../types/productCategory";
import { useLoadProductFeed } from "../../hooks/useLoadProductFeed";

const BACKEND_URI = import.meta.env.VITE_BE_URI;

const SearchBar = () => {
  const categoryList: ProductCategory[] = [
    "general",
    "laptops",
    "smartphones",
    "tablets",
    "acessories",
    "others",
  ];

  const [inputValue, setInputValue] = useState(""); // input field state
  const [searchParam, setSearchParam] = useState(""); // active search state
  const { currentCategory, setCurrentCategory } = useProductCategoryStore();
  const [pageIdx] = useState(0);

  const generateReq = () => {
    const page = pageIdx + 1; // default API uses 1-based indexing
    const limit = 10;

    let reqParam = `${BACKEND_URI}/product/all?productType=${currentCategory}&page=${page}&limit=${limit}`;

    if (searchParam.trim().length > 0) {
      reqParam += `&productName=${encodeURIComponent(searchParam.trim())}`;
    }

    return reqParam;
  };

  // Trigger feed load whenever the active searchParam changes
  useLoadProductFeed(searchParam, currentCategory, pageIdx);

  useEffect(() => {
    const req = generateReq();
    console.log(req);
    // later: fetch products array and render cards
  }, [searchParam, currentCategory, pageIdx]);

  const handleSearchClick = () => {
    setSearchParam(inputValue); // update searchParam only when button is clicked
  };

  return (
    <div>
      <div className="bg-[#AA2A00] shadow-xl flex items-center h-[60px] sm:px-20 justify-center sm:justify-end w-screen">
        <div className="flex gap-5">
          <div className="flex items-center justify-center">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="eg: Apple Laptops..."
              className="w-[300px] shadow-2xl sm:w-[650px] font-inconsolata text-xl bg-white p-2 outline-0"
              type="text"
            />
            <div
              onClick={handleSearchClick}
              className="bg-[#434343] shadow-2xl p-[3px] w-[50px] h-auto flex hover:bg-[#2c2c2c] justify-center cursor-pointer"
            >
              <SearchIcon width={30} />
            </div>
          </div>
          <button className="hidden shadow-2xl sm:flex justify-center items-center font-kdam-thmor text-2xl font-medium text-white gap-2 w-[200px] h-[48px] bg-[#FF4000] hover:bg-[#d93600]">
            <Cart width={39} />
            Cart
          </button>
        </div>
      </div>
      <div className="h-[75px] px-10 bg-white hidden sm:flex justify-end items-center">
        <div className="flex gap-10">
          {categoryList.map((v, i) => {
            const isSelected = currentCategory === v;
            return (
              <div
                key={i}
                onClick={() => setCurrentCategory(v)}
                className={`cursor-pointer font-inter text-md font-light
          hover:text-[#FF4000] hover:underline
          ${isSelected ? "text-[#FF4000]" : ""}`}
              >
                {v}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
