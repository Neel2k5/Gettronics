import { Router } from "express";
import {
  handleAuth,
  handleDeauth,
  handleLogin,
  handleSignUp,
  handleUserDelete,
} from "../Controllers/UserControllers.js";

const UserRouter = Router();

/**
 * @route   POST /user/signup
 * @desc    Create a new user account
 * @body    {
 *   email: String (required),
 *   userName: String (required),
 *   password: String (required),
 *   role: String (optional, default: "user")
 * }
 * @access  Public
 * @returns {
 *   message: String
 * }
 */
UserRouter.post("/signup", handleSignUp);

/**
 * @route   POST /user/login
 * @desc    Log in a user and issue a JWT in an httpOnly cookie
 * @body    {
 *   userName: String (required),
 *   password: String (required)
 * }
 * @access  Public
 * @returns {
 *   message: String
 * }
 */
UserRouter.post("/login", handleLogin);

/**
 * @route   GET /user/auth/me
 * @desc    Validate current logged-in user via JWT
 * @access  Protected (JWT required in cookies)
 * @returns {
 *   message: String
 * }
 */
UserRouter.get("/auth/me", handleAuth);

/**
 * @route   GET /user/logout
 * @desc    Log out user and clear JWT cookie
 * @access  Protected (JWT required in cookies)
 * @returns {
 *   message: String
 * }
 */
UserRouter.get("/logout", handleDeauth);

/**
 * @route   DELETE /user/account/delete
 * @desc    Delete the logged-in user's account after validating credentials
 * @body    {
 *   userName: String (required),
 *   password: String (required)
 * }
 * @access  Protected
 * @returns {
 *   message: String
 * }
 */
UserRouter.delete("/account/delete", handleUserDelete);

export default UserRouter;
