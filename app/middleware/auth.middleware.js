import jwt from 'jsonwebtoken';

// Authentication middleware
export async function authenticate(req, res, next) {
  // Get the token from the request cookies
  const token = await req.header('authorization');
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authentication failed. JWT missing.' });
  }

  // Verify and decode the token
  try {
    const decoded = jwt.verify(token, 'secret-key');
    req.user = decoded.user; // Attach user data to the request
    next(); // Proceed to the protected route
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Authentication failed. Invalid JWT.' });
  }
}
