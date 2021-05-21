const { ObjectId } = require('mongodb');

const connection = require('../config/connection');

const createTrade = async (high, low, datetime, userId, quantity, type) => {
  const trade = await connection().then((db) =>
    db.collection('trades').insertOne({ high, low, datetime, userId, quantity, type, status: 'open' }),
  );

  return { id: trade.insertedId, high, low, datetime, userId, quantity, type, status: 'open' };
};

const getTradeByUserId = async (userId) => {
  const trade = await connection().then((db) =>
    db.collection('trades').find({ userId }).toArray(),
  );
  return trade;
};

const updateTradeStatus = async (id) => {
  const updatedTrade = await connection().then((db) =>
    db
      .collection('trades')
      .updateOne({ _id: ObjectId(id) }, { $set: { status: 'closed' } }),
  );
  return updatedTrade;
};

module.exports = { createTrade, getTradeByUserId, updateTradeStatus };
