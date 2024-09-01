const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  price: Number,
  timestamp: { type: Date, default: Date.now }
});

const EthereumPrice = mongoose.model('EthereumPrice', priceSchema);

module.exports = EthereumPrice;
