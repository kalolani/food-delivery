import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // console.log("Authorization Header:", authHeader); // Log the Authorization header

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // console.log("Authorization header missing or improperly formatted");
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized Login Again" });
  }

  const token = authHeader.split(" ")[1];
  // console.log("Extracted Token:", token); // Log the extracted token

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token:", token_decode); // Log the decoded token

    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    // console.log("Token verification error:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Not Authorized Login Again" });
  }
};

export default authMiddleware;
