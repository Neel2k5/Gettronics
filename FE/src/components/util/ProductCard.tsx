import type { ProductType } from "../../types/product";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div
      className="bg-white h-[135px] w-[380px] sm:h-[300px] sm:w-[250px] rounded-[5px] flex sm:flex-col gap-2 justify-evenly p-2"
      key={product.productID}
    >
      <div className="h-[120px] w-[150px] sm:h-[130px] sm:w-[230px]   p-[1px]">
        <img className="w-full h-full object-contain" src={product.productImage?product.productImage:"empty"} alt={product.productName} />
      </div>
      <div>
        <div className="flex gap-2 h-[30px] overflow-auto ">
          <div className="font-inter w-[190px] text-[15px] sm:text-[18px] font-semibold">
            {product.productName}
          </div>
          <div className="text-[#06B200] font-instrument-sans ">
            {"$" + product.productPrice}
          </div>
        </div>
        <div className="opacity-50 text-[10px] sm:text-[14px] ">
          {product.productDescription}
        </div>

        <div className="flex flex-col p-1 text-white font-bold font-inter  gap-1">
          <button className=" sm:h-[32px] bg-[#5AF910]  rounded-[5px] shadow-2xl hover:bg-[#047d00]">
            Buy Now
          </button>
          <button className=" sm:h-[32px] rounded-[5px] shadow-2xl hover:bg-[#ab7e00] bg-[#FFBB00]">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
