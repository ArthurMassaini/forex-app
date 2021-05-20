const express = require('express');
const rescue = require('express-rescue');

const tradesController = require('../controllers/tradesController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// router.get('/sales', authMiddleware, rescue(salesController.getAllSales));
// router.put('/sales/:id', authMiddleware, rescue(salesController.changeSaleStatus));

router.get('/trades/:id', authMiddleware, rescue(tradesController.getTradeByUserId));
router.post('/trades', authMiddleware, rescue(tradesController.createTrade));

module.exports = router;
