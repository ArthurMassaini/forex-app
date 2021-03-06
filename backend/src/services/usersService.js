const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

const usersModel = require('../models/usersModel');

// ----------------------------------------- Validate functions

const INVALID_ENTRIES_MESSAGE = 'Invalid entries. Try again.';
const ALREADY_EXISTS_MESSAGE = 'Already have an user with that email.';

const verifyName = (name) => {
  if (name === undefined) {
    throw new Error(INVALID_ENTRIES_MESSAGE);
  }
};

const verifyPassword = (password) => {
  if (password === undefined) {
    throw new Error(INVALID_ENTRIES_MESSAGE);
  }
};

const verifyEmail = (email, allUsers) => {
  const regexEmail = new RegExp('.+@[A-z]+[.](com|io)');

  const userAlreadyExists = allUsers.some((element) => element.email === email);

  if (email === undefined || !regexEmail.test(email)) {
    throw new Error(INVALID_ENTRIES_MESSAGE);
  } else if (userAlreadyExists) {
    throw new Error(ALREADY_EXISTS_MESSAGE);
  }
};

// ----------------------------------------- Services functions

const createUser = async (name, email, password) => {
  const allUsers = await usersModel.getAllUsers();

  try {
    verifyName(name);
    verifyPassword(password);
    verifyEmail(email, allUsers);

    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);

    const newUser = await usersModel.createUser(name, email, encryptedPassword);
    return newUser;
  } catch (error) {
    return error.message;
  }
};

const getUserById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return 'Invalid Params Entry';
  }
  const user = await usersModel.getUserById(id);
  if (user === null) {
    return 'User not found';
  }
  return user;
};

module.exports = { createUser, getUserById };
