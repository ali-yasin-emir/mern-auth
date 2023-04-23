import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';

const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) next(createError(401, 'You are not authenticated'));

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};

export default verifyToken;
