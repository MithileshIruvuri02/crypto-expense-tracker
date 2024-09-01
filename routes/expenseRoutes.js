const express = require('express');
const { calculateExpenses } = require('../controllers/expenseController');

const router = express.Router();

router.get('/expenses/:address', calculateExpenses);

module.exports = router;
