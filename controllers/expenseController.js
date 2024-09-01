const Transaction = require('../models/transactionModel');
const Price = require('../models/priceModel');

const calculateExpenses = async (req, res) => {
    try {
        const userAddress = req.params.address;
        const transactions = await Transaction.find({ userAddress });

        const totalExpenses = transactions.reduce((total, tx) => {
            const gasUsed = parseInt(tx.gasUsed);
            const gasPrice = parseInt(tx.gasPrice);
            return total + (gasUsed * gasPrice) / 1e18;
        }, 0);

        const latestPrice = await Price.findOne().sort({ timestamp: -1 });

        res.status(200).json({
            success: true,
            totalExpenses,
            currentEtherPrice: latestPrice.priceInINR,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    calculateExpenses,
};
