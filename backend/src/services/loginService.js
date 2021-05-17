const jwt = require('jsonwebtoken');

const usersModel = require('../models/usersModel');

// ----------------------------------------- Validate functions

const FILLED_FIELDS_MESSAGE = 'All fields must be filled';
const INCORRECT_DATA_MESSAGE = 'Incorrect username or password';

const verifyEntries = (email, password, user) => {
  if (email === undefined || password === undefined) {
    throw new Error(FILLED_FIELDS_MESSAGE);
  } else if (user === null || user.password !== password) {
    throw new Error(INCORRECT_DATA_MESSAGE);
  }
};

// ----------------------------------------- Services functions

const secret = 'secret';

const loginUser = async (email, password) => {
  const user = await usersModel.getUserByEmail(email);

  try {
    verifyEntries(email, password, user);

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: user }, secret, jwtConfig);
    return [token, user];
  } catch (error) {
    return error.message;
  }
};

module.exports = { loginUser };
