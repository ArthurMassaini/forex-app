const jwt = require('jsonwebtoken');
// const usersModel = require('../models/usersModel');

const STATUS_UNAUTHORIZED = 401;

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  const { secret } = process.env;

  if (!token) {
    res.status(STATUS_UNAUTHORIZED).json({ message: 'missing auth token' });
  } else {
    try {
      const decoded = jwt.verify(token, secret);

      // const user = await usersModel.getUserByEmail(decoded.data.email);
      // const { } = user;
      
      next();
    } catch (error) {
      res.status(STATUS_UNAUTHORIZED).json({ message: error.message });
    }
  }
};

module.exports = authMiddleware;
