const usersService = require('../services/usersService');

const {
  STATUS_CREATED,
  STATUS_CONFLICT,
  STATUS_BAD_REQUEST,
} = require('./statusResponses');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const result = await usersService.createUser(name, email, password);

  if (result === 'Invalid entries. Try again.') {
    res.status(STATUS_BAD_REQUEST).json({ message: result });
  } else if (result === 'Already have an user with that email.') {
    res.status(STATUS_CONFLICT).json({ message: result });
  } else {
    res
      .status(STATUS_CREATED)
      .json({ user: result, message: 'Registration successfully completed' });
  }
};

module.exports = { createUser };
