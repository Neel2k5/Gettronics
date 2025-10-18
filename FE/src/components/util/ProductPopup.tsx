import type { ProductType } from "../../types/product";

const ProductPopup = ({
  product,
  closeFunction,
}: {
  product: ProductType;
  closeFunction: () => void;
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-2 rounded-[10px] w-[95vw] sm:w-[850px] relative bg-white h-auto sm:h-[290px]">
      {/* Close Button */}
      <button
        onClick={closeFunction}
        className="absolute top-2 right-2 sm:top-4 sm:right-4
             h-10 w-10 sm:h-12 sm:w-12
             flex items-center justify-center
             rounded-full hover:bg-gray-200 active:bg-gray-300
             transition-colors z-[999] text-2xl sm:text-3xl font-light"
      >
        ✕
      </button>

      {/* Image */}
      <div className="mt-8 sm:mt-0 h-[220px] w-full sm:h-[270px] sm:w-[280px] rounded-[8px]  flex items-center justify-center overflow-hidden">
        <img
          src={product.productImage ? product.productImage : "empty"}
          alt={product.productName}
          className="object-contain h-full  w-full"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col p-0 mt-2 sm:mt-0">
        <div className="font-inter text-[25px] sm:text-[40px] font-semibold">
          {product.productName}
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-10 ">
          <div className="text-[#06B200] font-instrument-sans text-[25px] sm:text-[35px]">
            {"$" + product.productPrice}
          </div>
          <div className="text-[14px] sm:text-[20px] sm:pt-4 text-[#AA2A00] font-inconsolata">
            {product.productQuantity + " in stock"}
          </div>
        </div>

        <div className="opacity-70 text-[13px] sm:text-[17px] mt-1 sm:mt-0 max-h-[80px] sm:h-[25px] overflow-auto">
          {product.productDescription}
        </div>

        <div className="flex flex-col text-white font-bold font-inter gap-2 mt-3 sm:gap-1 sm:flex-1 sm:justify-end pb-2">
          <button
            onClick={() => {
              const bodyBoilerPlate = encodeURIComponent(
                `I would like to purchase ${product.productName} of product ID ${product.productID} listed in Gettronics with quantity 1.
Do further communication via this email address regarding order confirmation and delivery updates.`
              );

              const subjectBoilerPlate = encodeURIComponent(
                `Gettronics Order: ${product.productName} [${product.productID}]`
              );

              const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${product.productVendor.vendorEmail}&su=${subjectBoilerPlate}&body=${bodyBoilerPlate}`;
              window.open(gmailUrl, "_blank");
            }}
            className="h-[40px] sm:h-[50px] text-lg sm:text-2xl w-full sm:w-[500px] bg-[#5AF910] rounded-[5px] shadow-2xl hover:bg-[#047d00]"
          >
            Buy Now
          </button>
          <button className="h-[40px] sm:h-[50px] text-lg sm:text-2xl w-full sm:w-[500px] rounded-[5px] shadow-2xl hover:bg-[#ab7e00] bg-[#FFBB00]">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
