import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const token =
    req.cookies?.accessTokens ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized request" });
  }
  //
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedToken;
    next();
    //
  } catch (error) {
    return res.status(500).json({
      error: error,
      message: "SOmething went wrong while verifying user token",
    });
  }
};
