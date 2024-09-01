const Transaction = require('../models/transactionModel');
const { getTransactions } = require('../services/etherscanService');

const fetchAndStoreTransactions = async (req, res) => {
    try {
        const userAddress = req.params.address;
        const transactions = await getTransactions(userAddress);

        // Store each transaction in MongoDB
        transactions.forEach(async (tx) => {
            const transaction = new Transaction({ ...tx, userAddress });
            await transaction.save();
        });

        res.status(200).json({
            success: true,
            message: 'Transactions fetched and stored successfully',
            transactions,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    fetchAndStoreTransactions,
};
