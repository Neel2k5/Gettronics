import { useState } from "react";
import Logo from "./Logo";
import NavArrow from "./NavArrow";
import Cart from "./Cart";
import { usePageSelectionStore } from "../../global-states/pageSelectionStore";
import { useProductCategoryStore } from "../../global-states/productCategoryStore";
import type { PageSelection } from "../../types/pageSelection";
import type { ProductCategory } from "../../types/productCategory";

const NavBar = () => {
  const [expandedNav, setExpandedNav] = useState<boolean>(false);

  const pageEditor: (page: PageSelection) => void = usePageSelectionStore(
    (state) => state.setPage
  );
  const currentPage = usePageSelectionStore((state) => state.currentPage);

  const { setCurrentCategory } = useProductCategoryStore();

  const categoryList: ProductCategory[] = [
    "general",
    "smartphones",
    "tablets",
    "acessories",
    "others",
  ];

  return (
    <div className="relative z-50">
      <div className="sm:h-[60px] h-[81px] flex justify-between p-[10px] px-[30px] items-center sm:px-[25px]">
        <div
          onClick={() => {
            pageEditor("HOME");
          }}
        >
          <Logo height={"28px"} />
        </div>

        <div
          onClick={() => {
            setExpandedNav((prev) => !prev);
          }}
        >
          <NavArrow
            className={` transition-all duration-500 sm:hidden ${
              expandedNav ? " rotate-180 opacity-65 " : ""
            }`}
            height={"48px"}
          />
        </div>

        {/* Big screen section */}
        <div className="hidden sm:flex gap-5 mr-[120px] ">
          <div
            onClick={() => pageEditor("LOGIN")}
            className={`cursor-pointer font-inter font-light hover:underline ${
              currentPage === "LOGIN" ? "text-[#FF4000]" : "text-black"
            }`}
          >
            login
          </div>
          <div
            onClick={() => pageEditor("SIGNUP")}
            className={`cursor-pointer font-inter font-light hover:underline ${
              currentPage === "SIGNUP" ? "text-[#FF4000]" : "text-black"
            }`}
          >
            signup
          </div>
          <div
            onClick={() => pageEditor("PROFILE")}
            className={`cursor-pointer font-inter font-light hover:underline ${
              currentPage === "PROFILE" ? "text-[#FF4000]" : "text-black"
            }`}
          >
            profile
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`fixed top-[81px] left-0 flex flex-col z-[999]`}>
        <div
          className={`sm:hidden bg-[#FFFFFF] overflow-hidden flex flex-col transition-all duration-500 w-screen ${
            expandedNav ? "h-[500px] outline-1 shadow-2xl " : " h-0"
          }`}
        >
          {categoryList.map((category) => {
            const isSelected =
              currentPage === "HOME" &&
              useProductCategoryStore.getState().currentCategory === category;

            return (
              <div
                key={category}
                onClick={() => {
                  if (currentPage === "HOME") {
                    setCurrentCategory(category);
                  }
                  setExpandedNav(false); // always close menu
                }}
                className={`h-[65px] bg-[#FFFFFF] text-2xl text-center p-4 outline-1 active:bg-[#C8C8C8] cursor-pointer
        ${isSelected ? "text-[#FF4000]" : "text-black"}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </div>
            );
          })}

          <div className="flex bg-[#FFFFFF] justify-center gap-1 m-2">
            <button
              onClick={() => {
                pageEditor("LOGIN");
                setExpandedNav(false);
              }}
              className={`text-4xl p-4 text-white ${
                currentPage === "LOGIN" ? "bg-[#7A1E00]" : "bg-[#FF4000]"
              }`}
            >
              login
            </button>
            <button
              onClick={() => {
                pageEditor("SIGNUP");
                setExpandedNav(false);
              }}
              className={`text-4xl p-4 text-white ${
                currentPage === "SIGNUP" ? "bg-[#7A1E00]" : "bg-[#FF4000]"
              }`}
            >
              signup
            </button>
            <button
              onClick={() => {
                pageEditor("PROFILE");
                setExpandedNav(false);
              }}
              className={`text-4xl p-4 text-white ${
                currentPage === "PROFILE" ? "bg-[#7A1E00]" : "bg-[#FF4000]"
              }`}
            >
              profile
            </button>
          </div>

          <button className=" bg-[#FF4000] justify-center gap-3 text-4xl p-4 mx-2 flex text-white ">
            <Cart height={30} className="mt-2" />
            Cart
          </button>
        </div>

        {/* Backdrop */}
        <div
          className={`h-[calc(100vh-500px-81px)] transition-all duration-500 bg-black ${
            expandedNav ? " opacity-50 " : " opacity-0"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default NavBar;
