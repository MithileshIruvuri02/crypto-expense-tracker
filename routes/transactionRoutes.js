const express = require('express');
const { fetchAndStoreTransactions } = require('../controllers/transactionController');

const router = express.Router();

router.get('/transactions/:address', fetchAndStoreTransactions);

module.exports = router;
