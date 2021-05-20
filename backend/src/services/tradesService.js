const tradesModel = require('../models/tradesModel');

// ----------------------------------------- Validate functions

const INVALID_ENTRIES_MESSAGE = 'No entry can be undefined';

const verifyEntries = (high, low, datetime, userId) => {
  const entries = [high, low, datetime, userId];
  const bool = entries.some((element) => element === undefined);

  if (bool) {
    throw new Error(INVALID_ENTRIES_MESSAGE);
  }
};

// ----------------------------------------- Services functions

const createTrade = async (high, low, datetime, userId) => {
  try {
    verifyEntries(high, low, datetime, userId);

    const newTrade = await tradesModel.createTrade(high, low, datetime, userId);
    return newTrade;
  } catch (error) {
    return error.message;
  }
};

const getTradeByUserId = async (id) => {
  const trade = await tradesModel.getTradeByUserId(id);

  if (trade === null) {
    return 'No past trades found';
  }

  return trade;
};

module.exports = { createTrade, getTradeByUserId };
