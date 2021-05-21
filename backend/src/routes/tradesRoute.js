const express = require('express');
const rescue = require('express-rescue');

const tradesController = require('../controllers/tradesController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/trades/:id', authMiddleware, rescue(tradesController.getTradeByUserId));
router.post('/trades', authMiddleware, rescue(tradesController.createTrade));
router.put('/trades/:id', authMiddleware, rescue(tradesController.updateTradeStatus));

module.exports = router;
