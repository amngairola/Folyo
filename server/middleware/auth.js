// Import the jsonwebtoken library to work with JWTs
import jwt from "jsonwebtoken";

//  authentication middleware function
const auth = (req, res, next) => {
  // Get the token from the 'authorization' header of the incoming request
  const token = req.headers.authorization;

  try {
    // Verify that the token is valid and was signed with our secret key
    jwt.verify(token, process.env.JWT_SECRET);

    // If the token is valid, call next() to pass the request to the next function (the actual route handler)
    next();
  } catch (error) {
    // If verification fails (e.g., invalid or expired token), send an error response
    res.json({ success: false, message: "Auth Failed" });
  }
};
export default auth;
