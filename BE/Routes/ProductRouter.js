import { Router } from "express";
import {
  handleAddNewProduct,
  handleBulkAddProducts,
  handleDeleteProduct,
  handleGetAllProducts,
  handleUpdateExistingProduct,
} from "../Controllers/ProductControllers.js";
import { verifyUserAuth } from "../Middlewares/AuthMiddleware.js";

const ProductRouter = Router();

/**
 * @route   GET /product/all
 * @desc    Get all products with pagination and optional filters
 * @query   page        - Optional, Number, page number (default: 1)
 *          limit       - Optional, Number, number of products per page (default: 10)
 *          vendorName  - Optional, String, filter products by vendor name
 *          productName - Optional, String, filter products by product name (case-insensitive, partial match)
 *          productType - Optional, String, filter products by product type (e.g., "Laptop", "Smartphone")
 * @access  Public (no auth required, anyone can view products)
 * @returns {
 *   page: Number,
 *   limit: Number,
 *   totalPages: Number,
 *   totalProducts: Number,
 *   data: [
 *     {
 *       productID: String,
 *       productName: String,
 *       productPrice: Number,
 *       productQuantity: Number,
 *       productImage: String,
 *       productType: String,
 *       productDescription: String,
 *       productVendor: {
 *         vendorName: String,
 *         vendorEmail: String
 *       }
 *     },
 *     ...
 *   ]
 * }
 */
ProductRouter.get("/all", handleGetAllProducts);

/**
 * @route   POST /product/new
 * @desc    Add a new product
 * @body    {
 *   productName: String (required),
 *   productPrice: Number (required),
 *   productQuantity: Number (required),
 *   productType: String (required, must be one of the allowed categories),
 *   productDescription: String (required),
 *   productVendorName: String (required),
 *   productVendorEmail: String (required)
 * }
 * @access  Protected (JWT required; vendor must match logged-in user OR role = "admin")
 * @returns {
 *   message: String
 * }
 */
ProductRouter.post("/new", verifyUserAuth, handleAddNewProduct);

/**
 * @route   PATCH /product/patch/:productID
 * @desc    Update an existing product
 * @params  productID: String (required, in URL)
 * @body    {
 *   productName: String (optional),
 *   productPrice: Number (optional),
 *   productQuantity: Number (optional),
 *   productImage: String (optional, base64),
 *   productType: String (optional),
 *   productDescription: String (optional)
 * }
 * @access  Protected (JWT required; only admin or the vendor of the product can update)
 * @returns {
 *   message: String
 * }
 */
ProductRouter.patch(
  "/patch/:productID",
  verifyUserAuth,
  handleUpdateExistingProduct
);

/**
 * @route   DELETE /product/delete/:productID
 * @desc    Delete an existing product
 * @params  productID: String (required, in URL)
 * @access  Protected (JWT required; only admin or the vendor of the product can delete)
 * @returns {
 *   message: String
 * }
 * @example
 * DELETE /product/delete/123e4567-e89b-12d3-a456-426614174000
 * Response:
 * {
 *   "message": "Product Successfully Deleted"
 * }
 */
ProductRouter.delete("/delete/:productID", verifyUserAuth, handleDeleteProduct);

/**
 * @route   POST /product/new/bulk
 * @desc    Add multiple products in a single request
 * @body    {
 *   products: [
 *     {
 *       productName: String (required),
 *       productPrice: Number (required),
 *       productQuantity: Number (required),
 *       productImage: String (optional, base64),
 *       productType: String (required, must be one of the allowed categories),
 *       productDescription: String (required),
 *       productVendorName: String (required),
 *       productVendorEmail: String (required)
 *     },
 *     ...
 *   ]
 * }
 * @access  Protected (JWT required; vendor must match logged-in user OR role = "admin")
 * @returns {
 *   message: String,
 *   count: Number
 * }
 * @example
 * POST /product/new/bulk
 * Request:
 * {
 *   "products": [
 *     {
 *       "productName": "Dell XPS 15",
 *       "productPrice": 1500,
 *       "productQuantity": 5,
 *       "productType": "Laptop",
 *       "productDescription": "High-performance laptop with Intel i7 and 16GB RAM",
 *       "productVendorName": "TechVendor1",
 *       "productVendorEmail": "vendor1@example.com"
 *     },
 *     {
 *       "productName": "iPhone 15",
 *       "productPrice": 999,
 *       "productQuantity": 10,
 *       "productType": "Smartphone",
 *       "productDescription": "Latest iPhone model with A17 chip and advanced camera",
 *       "productVendorName": "TechVendor1",
 *       "productVendorEmail": "vendor1@example.com"
 *     }
 *   ]
 * }
 * Response:
 * {
 *   "message": "Products successfully added",
 *   "count": 2
 * }
 */
ProductRouter.post("/new/bulk", verifyUserAuth, handleBulkAddProducts);

export default ProductRouter;
