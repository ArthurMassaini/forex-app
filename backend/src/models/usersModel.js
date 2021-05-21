const { ObjectId } = require('mongodb');

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
    db
      .collection('users')
      .insertOne({ name, email, password, totalAmount: 50000 }),
  );

  return { id: user.insertedId, name, email };
};

const getUserById = async (id) => {
  const user = await connection().then((db) =>
    db.collection('users').findOne({ _id: ObjectId(id) }),
  );
  return user;
};

module.exports = { getUserByEmail, getAllUsers, createUser, getUserById };
