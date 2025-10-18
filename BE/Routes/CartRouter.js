import { Router } from "express";
import { handleAddToCart, handleGetCart, handleRemoveFromCart } from "../Controllers/CartControllers.js";

const CartRouter = Router();

/**
 * @route   GET /cart
 * @desc    Get all cart items for a user
 * @query   {string} cartOwnerName - The username of the cart owner
 * @access  User/Admin (only the cart owner or admin can access)
 * @returns {Object} JSON response with cart items
 * 
 * Example:
 * GET /cart?cartOwnerName=johndoe
 * 
 * Response:
 * {
 *   "data": [
 *     {
 *       "productID": "123",
 *       "productQuantity": 2,
 *       "cartOwner": {
 *         "ownerName": "johndoe",
 *         "ownerEmail": "john@example.com"
 *       }
 *     }
 *   ]
 * }
 */
CartRouter.get("/", handleGetCart);

/**
 * @route   POST /cart/add
 * @desc    Add a product to the cart
 * @query   {string} cartOwnerName - The username of the cart owner
 * @body    {string} productID - The ID of the product to add
 * @body    {number} productQuantity - The quantity to add
 * @access  User/Admin (only the cart owner or admin can add)
 * @returns {Object} JSON message about the operation
 * 
 * Example:
 * POST /cart/add?cartOwnerName=johndoe
 * Body:
 * {
 *   "productID": "123",
 *   "productQuantity": 2
 * }
 * 
 * Response:
 * {
 *   "message": "Product added to cart"
 * }
 */
CartRouter.post("/add", handleAddToCart);

/**
 * @route   DELETE /cart/remove
 * @desc    Remove a product from the cart
 * @query   {string} cartOwnerName - The username of the cart owner
 * @body    {string} productID - The ID of the product to remove
 * @access  User/Admin (only the cart owner or admin can remove)
 * @returns {Object} JSON message about the operation
 * 
 * Example:
 * DELETE /cart/remove?cartOwnerName=johndoe
 * Body:
 * {
 *   "productID": "123"
 * }
 * 
 * Response:
 * {
 *   "message": "Product removed from cart"
 * }
 */
CartRouter.delete("/remove", handleRemoveFromCart);

export default CartRouter;
