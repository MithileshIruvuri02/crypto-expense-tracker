# Crypto Expense Tracker

## Description

Crypto Expense Tracker is a Node.js application that tracks Ethereum transactions and calculates expenses based on gas used. It fetches Ethereum transactions for a given address, retrieves the price of Ethereum at regular intervals, and provides an API to query total expenses and current Ethereum price.

## Features

- **Fetch Ethereum Transactions:** Retrieve normal transactions for a given Ethereum address using the Etherscan API.
- **Store Transactions:** Store transaction data in MongoDB.
- **Fetch Ethereum Price:** Retrieve the price of Ethereum every 10 minutes using the CoinGecko API.
- **Calculate Expenses:** Calculate and return total expenses for a given address.
- **API Endpoints:** Provides endpoints for fetching transactions, expenses, and Ethereum price.

## Technologies Used

- **Node.js:** Runtime environment for executing JavaScript server-side.
- **Express.js:** Web framework for building RESTful APIs.
- **MongoDB:** NoSQL database for storing transaction data.
- **Mongoose:** ODM for MongoDB and Node.js.
- **Etherscan API:** For fetching Ethereum transactions.
- **CoinGecko API:** For fetching Ethereum price.

