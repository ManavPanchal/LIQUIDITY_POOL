# LIQUIDITY_POOL

This is a  Liquidity Pool project that is a clone of Uniswap (V2) and allows providers to add liquidity, withdraw liquidity, and users to swap tokens in different pools. The tokens used in the pools are ERC20 tokens. LP (Liquidity Provider) tokens are provided to the providers each time they add liquidity. The project utilizes Solidity for smart contract development and uses PostgreSQL as the database. The project relies on Wagmi and Ethers libraries, with the frontend implemented using React and Node.js for APIs. Hardhat is used for developing and testing smart contract

## Features

- Supported in Sepolia and Mumbai Test Networks
- Uniswap V2 Clone
- Liquidity Provider Actions:
  - Add Liquidity
  - Withdraw Liquidity
- Token Swapping
- Test ERC20 Tokens
- LP Tokens
- Activity Section
- Tokens Page
- Responsive

## Technologies Used

- Solidity
- PostgreSQL
- Wagmi
- Ethers
- React
- Node.js
- Hardhat

## Getting Started

1. Clone the repository: `git clone https://github.com/ManavPanchal/LIQUIDITY_POOL/`
2. Install the project dependencies: `npm install`
3. Set up the PostgreSQL database and configure the connection settings.
4. Deploy the smart contracts to the desired test network using Hardhat.
5. Start the backend server: `nodemon app`
6. Start the frontend development server: `npm start`
7. Access the Liquidity Pool project in your browser at `http://localhost:3000`.

## Testing

To run the tests, use the following command: `npx hardhat test`


