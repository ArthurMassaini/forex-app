const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const STATUS_UNAUTHORIZED = 401;
const secret = 'secret';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(STATUS_UNAUTHORIZED).json({ message: 'missing auth token' });
  } else {
    try {
      const decoded = jwt.verify(token, secret);

      const user = await usersModel.getUserByEmail(decoded.data.email);
      const { _id: id, role } = user;
      req.userId = id;
      req.role = role;
      
      next();
    } catch (error) {
      res.status(STATUS_UNAUTHORIZED).json({ message: error.message });
    }
  }
};

module.exports = authMiddleware;
