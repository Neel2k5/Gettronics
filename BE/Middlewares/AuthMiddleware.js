import jsonwebtoken from "jsonwebtoken";
import errorCode from "../lib/ErrorCodes.js";
//req.userData will contain the decoded token for external use

const verifyUserAuth = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(errorCode.Unauthorised).json({
      message: "Route restricted to logged in users, Token not found",
    });
  }
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.error(`Error while loading JWT_SECRET env variable`);
    return res.status(errorCode.InternalServerError).json({
      message: "Internal Server Error",
    });
  }
  jsonwebtoken.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(errorCode.Forbidden).json({
        message: "Route restricted to logged in users, Invalid token",
      });
    }
    if (decodedToken.role !== "user" && decodedToken.role !== "admin") {
      return res.status(errorCode.Forbidden).json({
        message: "Route restricted to logged in users only",
      });
    }
    req.userData = decodedToken;
  });

  next();
};
const verifyAdminAuth = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(errorCode.Unauthorised).json({
      message: "Route restricted to admins Token not found",
    });
  }
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.error(`Error while loading JWT_SECRET env variable`);
    return res.status(errorCode.InternalServerError).json({
      message: "Internal Server Error",
    });
  }
  jsonwebtoken.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(errorCode.Forbidden).json({
        message: "Route restricted to admins, Invalid token",
      });
    }
    if (decodedToken.role !== "admin") {
      return res.status(errorCode.Forbidden).json({
        message: "Route restricted to admins only",
      });
    }
    req.userData = decodedToken;
  });

  next();
};

export { verifyUserAuth, verifyAdminAuth };
