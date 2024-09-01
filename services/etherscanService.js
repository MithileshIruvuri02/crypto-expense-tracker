const axios = require('axios');

const getTransactions = async (userAddress) => {
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${userAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`;
    const response = await axios.get(url);
    return response.data.result;
};

module.exports = {
    getTransactions,
};
