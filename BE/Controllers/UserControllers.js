import errorCode from "../lib/ErrorCodes.js";
import CartModel from "../Models/Cart.js";
import UserModel from "../Models/User.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const handleSignUp = async (req, res) => {
  const { email, userName, password, role } = req.body;
  if (!email || !userName || !password) {
    return res.status(errorCode.BadRequest).json({
      message: "Bad request body",
    });
  }

  const existanceCheck = await UserModel.findOne({
    userName: userName,
    email: email,
  });
  if (existanceCheck) {
    return res.status(errorCode.Conflict).json({
      message: "User Already Exists",
    });
  }

  try {
    const hashedPwd = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      userName: userName,
      email: email,
      password: hashedPwd,
      role: role || "user",
    });

    await newUser.save();
    return res.status(errorCode.Created).json({
      message: "User Sucessfully Created",
    });
  } catch (error) {
    console.error(`Error while processing user creation\n${error}`);

    return res.status(errorCode.InternalServerError).json({
      message: "Internal Server Error",
    });
  }
};

const handleLogin = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(errorCode.BadRequest).json({
      message: "Bad request body",
    });
  }

  const existanceCheck = await UserModel.findOne({
    userName: userName,
  });
  if (!existanceCheck) {
    return res.status(errorCode.Conflict).json({
      message: "User Does Not Exist",
    });
  }
  try {
    const validity = await bcrypt.compare(password, existanceCheck.password);
    if (!validity) {
      return res.status(errorCode.Unauthorised).json({
        message: "Invalid Credentials",
      });
    }

    //JWT generation
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error(`Error while loading JWT_SECRET env variable`);
      return res.status(errorCode.InternalServerError).json({
        message: "Internal Server Error",
      });
    }
    //JWT PAYLOAD
    const token = jsonwebtoken.sign(
      {
        userName: existanceCheck.userName,
        email: existanceCheck.email,
        role: existanceCheck.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    //Assign jwt
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, //for dev
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 1000, //24h
    });
    return res.status(errorCode.Created).json({
      message: "User Sucessfully Logged In",
    });
  } catch (error) {
    console.error(`Error while processing user login\n${error}`);

    return res.status(errorCode.InternalServerError).json({
      message: "Internal Server Error",
    });
  }
};

const handleAuth = (req, res) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(errorCode.Unauthorised).json({
      message: "No authToken",
    });
  }
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.error(`Error while loading JWT_SECRET env variable`);
    return res.status(errorCode.InternalServerError).json({
      message: "Internal Server Error",
    });
  }
  jsonwebtoken.verify(token, JWT_SECRET, (err, _) => {
    if (err) {
      return res.status(errorCode.Forbidden).json({
        message: "Invalid token",
      });
    }
    return res.status(errorCode.OK).json({
      message: "Valid Logged in User",
    });
  });
};

const handleDeauth = (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: false, //for dev
    sameSite: "strict",
  });
  return res.status(errorCode.OK).json({ message: "Sucessfully logged out" });
};

const handleUserDelete = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(errorCode.BadRequest).json({
      message: "Bad request body",
    });
  }

  const existanceCheck = await UserModel.findOne({
    userName: userName,
  });
  if (!existanceCheck) {
    return res.status(errorCode.Conflict).json({
      message: "User Does Not Exist",
    });
  }

  try {
    const validity = await bcrypt.compare(password, existanceCheck.password);
    if (!validity) {
      return res.status(errorCode.Unauthorised).json({
        message: "Invalid Credentials",
      });
    }

    await UserModel.findByIdAndDelete(existanceCheck._id);
    await CartModel.deleteMany({
      "cartOwner.ownerName": existanceCheck.userName,
      "cartOwner.ownerEmail": existanceCheck.email,
    });
    //delete cart
    res.clearCookie("authToken"); //deauth

    return res.status(errorCode.Created).json({
      message: "User Sucessfully Deleted",
    });
  } catch (error) {
    console.error(`Error while processing user deletion\n${error}`);

    return res.status(errorCode.InternalServerError).json({
      message: "Internal Server Error",
    });
  }
};

export {
  handleSignUp,
  handleLogin,
  handleAuth,
  handleDeauth,
  handleUserDelete,
};
