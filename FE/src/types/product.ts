export type ProductType = {
  productID: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productImage: string;
  productType: ProductType;
  productDescription: string;
  productVendor: {
    vendorName: string;
    vendorEmail: string;
  };
};
