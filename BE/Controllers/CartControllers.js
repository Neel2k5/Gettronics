import errorCode from "../lib/ErrorCodes.js";
import CartModel from "../Models/Cart.js";
import ProductModel from "../Models/Product.js";

const handleAddToCart = async (req, res) => {
  const { productID, productQuantity } = req.body;
  const { cartOwnerName } = req.query;
  const userData = req.userData;
    console.log(userData);

  if (!productID || !cartOwnerName) {
    return res.status(errorCode.BadRequest).json({
      message: "Invalid parameters or body",
    });
  }
  if (cartOwnerName !== userData.userName && userData.role !== "admin") {
    return res.status(errorCode.Unauthorised).json({
      message: "Cannot acess cart of another user",
    });
  }

  try {
    const existanceCheck = await ProductModel.findOne({
      productID: productID,
    });
    if (!existanceCheck) {
      return res.status(errorCode.NotFound).json({
        message: "Product Does Not Exist",
      });
    }
    if (existanceCheck.productQuantity < productQuantity) {
      return res.status(errorCode.NotFound).json({
        message: "Not enough stock",
      });
    }
    const existingCartEntry = await CartModel.findOne({
      productID,
      "cartOwner.ownerName": cartOwnerName,
      "cartOwner.ownerEmail": userData.email,
    });

    if (existingCartEntry) {
      existingCartEntry.productQuantity += productQuantity;
      await existingCartEntry.save();
    } else {
      const newCartEntry = new CartModel({
        productID,
        productQuantity,
        cartOwner: {
          ownerName: userData.userName,
          ownerEmail: userData.email,
        },
      });
      await newCartEntry.save();
    }
    return res.status(errorCode.Created).json({
      message: "Product added to cart",
    });
  } catch (error) {
    console.error(`Error while adding to cart\n${error}`);

    return res.status(errorCode.InternalServerError).json({
      message: "Internal Server Error",
    });
  }
};

const handleRemoveFromCart = async (req, res) => {
  const { productID } = req.body;
  const { cartOwnerName } = req.query;
  const userData = req.userData;

  if (!productID || !cartOwnerName) {
    return res.status(errorCode.BadRequest).json({
      message: "Invalid parameters or body",
    });
  }
  if (cartOwnerName !== userData.userName && userData.role !== "admin") {
    return res.status(errorCode.Unauthorised).json({
      message: "Cannot access cart of another user",
    });
  }

  try {
    const existanceCheck = await CartModel.findOne({
      productID: productID,
      "cartOwner.ownerName": cartOwnerName,
    });
    if (!existanceCheck) {
      return res.status(errorCode.NotFound).json({
        message: "Product not found in cart",
      });
    }
    await CartModel.findByIdAndDelete(existanceCheck._id);
    return res.status(errorCode.OK).json({
      message: "Product removed from cart",
    });
  } catch (error) {
    console.error(`Error while removing from cart\n${error}`);

    return res.status(errorCode.InternalServerError).json({
      message: "Internal Server Error",
    });
  }
};
const handleGetCart = async (req, res) => {
  const { cartOwnerName } = req.query;
  const userData = req.userData;

  if (!cartOwnerName) {
    return res.status(errorCode.BadRequest).json({
      message: "Invalid parameters",
    });
  }
  if (cartOwnerName !== userData.userName && userData.role !== "admin") {
    return res.status(errorCode.Unauthorised).json({
      message: "Cannot access cart of another user",
    });
  }

  try {
    const cart = await CartModel.find(
      {
        "cartOwner.ownerName": cartOwnerName,
        "cartOwner.ownerEmail": userData.email,
      },
      { _id: 0, __v: 0 }
    );

    if (cart.length === 0) {
      return res.status(errorCode.NotFound).json({
        message: "Cart is Empty",
      });
    }

    const productIDs = cart.map((c) => c.productID);

    const productsInCart = await ProductModel.find(
      { productID: { $in: productIDs } },
      { _id: 0, __v: 0,productQuantity:0 }
    );

    
    const Cart = cart.map((cartItem) => {
      const product = productsInCart.find(
        (p) => p.productID === cartItem.productID
      );
      return {
        ...product.toObject(),
        cartQuantity: cartItem.productQuantity,
      };
    });

    return res.status(errorCode.OK).json({
      Cart,
    });
  } catch (error) {
    console.error(`Error while fetching cart\n${error}`);

    return res.status(errorCode.InternalServerError).json({
      message: "Internal Server Error",
    });
  }
};


export { handleAddToCart, handleRemoveFromCart, handleGetCart };
