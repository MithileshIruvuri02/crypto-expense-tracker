const Price = require('../models/priceModel');
const { getEthereumPrice } = require('../services/coingeckoService');

const fetchAndStoreEthereumPrice = async () => {
    try {
        const priceInINR = await getEthereumPrice();
        const price = new Price({ priceInINR });
        await price.save();
        console.log('Ethereum price saved:', priceInINR);
    } catch (error) {
        console.error('Error fetching Ethereum price:', error.message);
    }
};

module.exports = {
    fetchAndStoreEthereumPrice,
};
