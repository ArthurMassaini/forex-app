const { ObjectId } = require('mongodb');

const tradesModel = require('../models/tradesModel');

// ----------------------------------------- Validate functions

const INVALID_ENTRIES_MESSAGE = 'No entry can be undefined';

const verifyEntries = (high, low, datetime, userId, quantity, type) => {
  const entries = [high, low, datetime, userId, quantity, type];
  const bool = entries.some((element) => element === undefined);

  if (bool) {
    throw new Error(INVALID_ENTRIES_MESSAGE);
  }
};

// ----------------------------------------- Services functions

const createTrade = async (high, low, datetime, userId, quantity, type) => {
  try {
    verifyEntries(high, low, datetime, userId, quantity, type);

    const newTrade = await tradesModel.createTrade(
      high,
      low,
      datetime,
      userId,
      quantity,
      type,
    );
    return newTrade;
  } catch (error) {
    return error.message;
  }
};

const getTradeByUserId = async (id) => {
  if (!ObjectId.isValid(id)) {
    return 'Invalid ID';
  }

  const trade = await tradesModel.getTradeByUserId(id);
  if (trade.length === 0) {
    return 'No past trades found';
  }

  return trade;
};

const updateTradeStatus = async (id, profritOrLoss, userId) => {
  if (id === undefined || profritOrLoss === undefined) {
    return 'Invalid Entry';
  }
  const updatedTrade = await tradesModel.updateTradeStatus(id, profritOrLoss, userId);
  return updatedTrade;
};

module.exports = { createTrade, getTradeByUserId, updateTradeStatus };
