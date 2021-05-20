const tradesService = require('../services/tradesService');

const {
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
} = require('./statusResponses');

const createTrade = async (req, res) => {
  const { high, low, datetime, userId } = req.body;

  const result = await tradesService.createTrade(high, low, datetime, userId);

  if (typeof result === 'string') {
    res.status(STATUS_BAD_REQUEST).json({ message: result });
  } else {
    res
      .status(STATUS_CREATED)
      .json({ trade: result, message: 'Trade successfully placed!' });
  }
};

const getTradeByUserId = async (req, res) => {
  const { id } = req.params;

  const result = await tradesService.getTradeByUserId(id);

  if (typeof result === 'string') {
    res.status(STATUS_NOT_FOUND).json({ message: result });
  } else {
    res.status(STATUS_OK).json(result);
  }
};

module.exports = { createTrade, getTradeByUserId };
