const connection = require('../config/connection');

const getUserByEmail = async (email) => {
  const user = await connection().then((db) =>
    db.collection('users').findOne({ email }),
  );
  return user;
};

const getAllUsers = async () => {
  const allUsers = await connection().then((db) =>
    db.collection('users').find().toArray(),
  );

  return allUsers;
};

const createUser = async (name, email, password) => {
  const user = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password }),
  );

  return { id: user.insertedId, name, email };
};

module.exports = { getUserByEmail, getAllUsers, createUser };
