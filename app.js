require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Transaction = require('./models/Transaction');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json()); // To parse JSON bodies

// Fetch transactions
app.get('/api/transactions/:address', async (req, res) => {
  try {
    const address = req.params.address;
    const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${process.env.ETHERSCAN_API_KEY}`);
    const transactions = response.data.result;

    // Store transactions in database
    for (const tx of transactions) {
      await Transaction.updateOne({ hash: tx.hash }, tx, { upsert: true });
    }

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'An error occurred while fetching transactions' });
  }
});

// Calculate expenses
app.get('/api/expenses/:address', async (req, res) => {
  try {
    const address = req.params.address;
    const transactions = await Transaction.find({ address });

    let totalExpenses = 0;
    transactions.forEach(transaction => {
      const gasUsed = transaction.gasUsed;
      const gasPrice = transaction.gasPrice;
      totalExpenses += (gasUsed * gasPrice) / 1e18; // Convert to ether
    });

    // Fetch current price of ether
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
    const etherPrice = response.data.ethereum.inr;

    res.json({
      totalExpenses,
      etherPrice
    });
  } catch (error) {
    console.error('Error calculating expenses:', error);
    res.status(500).json({ error: `An error occurred while calculating expenses: ${error.message}` });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
