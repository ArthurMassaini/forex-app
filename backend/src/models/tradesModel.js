const connection = require('../config/connection');

const createTrade = async (high, low, datetime, userId) => {
  const trade = await connection().then((db) =>
    db.collection('trades').insertOne({ high, low, datetime, userId }),
  );

  return { id: trade.insertedId, high, low, datetime, userId };
};

const getTradeByUserId = async (userId) => {
  const trade = await connection().then((db) =>
    db.collection('trades').find({ userId }).toArray(),
  );
  return trade;
};

module.exports = { createTrade, getTradeByUserId };
