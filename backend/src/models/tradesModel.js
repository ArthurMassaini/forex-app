const { ObjectId } = require('mongodb');

const connection = require('../config/connection');

const createTrade = async (high, low, datetime, userId, quantity, type) => {
  const trade = await connection().then((db) =>
    db.collection('trades').insertOne({ high, low, datetime, userId, quantity, type, status: 'open' }),
  );

  if (type === 'buy') {
    await connection().then((db) =>
      db
        .collection('users')
        .updateOne(
          { _id: ObjectId(userId) },
          { $inc: { totalAmount: -quantity } },
        ),
    );
  }

  return { id: trade.insertedId, high, low, datetime, userId, quantity, type, status: 'open' };
};

const getTradeByUserId = async (userId) => {
  const trade = await connection().then((db) =>
    db.collection('trades').find({ userId }).toArray(),
  );
  return trade;
};

const updateTradeStatus = async (id, profritOrLoss, userId) => {
  const updatedTrade = await connection().then((db) =>
    db
      .collection('trades')
      .updateOne({ _id: ObjectId(id) }, { $set: { status: 'closed', profritOrLoss } }),
  );

  await connection().then((db) =>
      db
        .collection('users')
        .updateOne(
          { _id: ObjectId(userId) },
          { $inc: { totalAmount: Number(profritOrLoss) } },
        ),
    );
  
  return { profritOrLoss };
};

module.exports = { createTrade, getTradeByUserId, updateTradeStatus };
