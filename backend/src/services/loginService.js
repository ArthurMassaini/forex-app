const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const usersModel = require('../models/usersModel');

// ----------------------------------------- Validate functions

const FILLED_FIELDS_MESSAGE = 'All fields must be filled';
const INCORRECT_DATA_MESSAGE = 'Incorrect username or password';

const verifyEntries = (email, password, user) => {
  const isMatch = bcrypt.compareSync(password, user.password);

  if (email === undefined || password === undefined) {
    throw new Error(FILLED_FIELDS_MESSAGE);
  } else if (user === null || !isMatch) {
    throw new Error(INCORRECT_DATA_MESSAGE);
  }
};

// ----------------------------------------- Services functions

const loginUser = async (email, password) => {
  const user = await usersModel.getUserByEmail(email);

  try {
    verifyEntries(email, password, user);

    const { secret } = process.env;
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: user.email }, secret, jwtConfig);
    return [token, user];
  } catch (error) {
    return error.message;
  }
};

module.exports = { loginUser };
