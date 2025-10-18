import { useEffect, useState } from "react";
import ProductCard from "../components/util/ProductCard";
import SearchBar from "../components/util/SearchBar";
import { useProductFeedStore } from "../global-states/productFeedStore";
import type { ProductType } from "../types/product";
import ProductPopup from "../components/util/ProductPopup";
import { ProductCardSkeleton } from "../components/util/ProductCardSkeleton";

const Home = () => {
  const { productFeed, loading, error } = useProductFeedStore();
  const [fadeUILoading, setfadeUILoading] = useState(false);
  const [productPopUp, setProductPopUp] = useState(false);
  const [productPopUpData, setProductPopUpData] = useState<ProductType>(
    productFeed[0]
  );

  useEffect(() => {
    const t = setTimeout(() => setfadeUILoading(loading), 200);
    return clearTimeout(t);
  }, [loading]);
  
  const skeletonCount = 5;
  return (
    <div className="flex flex-col bg-[#C5C5C5] overflow-y-auto overflow-x-hidden">
      <SearchBar />

      {/* Loading state */}

      {fadeUILoading && (
        <div className="text-center text-gray-500 mt-4">
          <div className="flex gap-1  flex-wrap justify-center">
            {Array.from({ length: skeletonCount }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center text-red-500 mt-4">
          Failed to load products: {error}
        </div>
      )}

      {/* Product list */}
      {!fadeUILoading && !error && (
        <div className="mt-4 flex gap-1 p-1 flex-wrap">
          {productFeed.length === 0 ? (
            <div className="text-center text-gray-400">No products found</div>
          ) : (
            productFeed.map((v) => (
              <div
                key={v.productID}
                onClick={() => {
                  setProductPopUpData(v);
                  setProductPopUp(true);
                }}
              >
                <ProductCard product={v} />
              </div>
            ))
          )}
          {productPopUp && (
            <div
              className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
              onClick={() => setProductPopUp(false)} // close on backdrop click
            >
              <div
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
              >
                <ProductPopup
                  closeFunction={() => setProductPopUp(false)}
                  product={productPopUpData}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
