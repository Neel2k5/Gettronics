import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
  productID: {
    type: String,
    required: true,
  },
  productQuantity:{
    type:Number,
    required:true,
  },
  cartOwner: {
    ownerName: {
      type: String,
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
  },
});

const CartModel = mongoose.model("Cart", CartSchema);
export default CartModel;
