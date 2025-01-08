import jwt from 'jsonwebtoken';

export async function authentication(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).send("Access denied. No token provided.");

  const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decryptedtoken = jwt.verify(token, "YTClone");
    req.user = decryptedtoken;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
}