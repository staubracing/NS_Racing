## Assignment #1: Deploy an ERC20 Coin to Sepolia Testnet

In this assignment, you will learn how to deploy an ERC20 coin to the Sepolia testnet using Solidity and Hardhat. The purpose of this assignment is to get you familiar with the Solidity programming language and the deployment process for Ethereum-based tokens using Hardhat.
        
### Prerequisites:
Before you begin this assignment, you should have:

- Basic knowledge of the Solidity programming language
- A working knowledge of the Ethereum network
- An understanding of how to use a command-line interface
- MateaMask wallet (suggest a dedicated address for development)
- You will need a alchemy account (This will allow you acess to more Sepolis ETH from the faucet) https://www.alchemy.com/
- Sepolia Faucet (This is for test ETH) https://sepoliafaucet.com/
- Node.js installed on your computer

### Instructions:
1. Create a new directory on your computer for this assignment. This directory should contain a subdirectory called `/contracts` and a subdirectory called `/scripts`.

2. Initialize a new Node.js project in this directory: >`npm init -y`

3. Create a new project using Hardhat: >`npm install --save-dev hardhat` and run the initialization script: >`npx hardhat`

4. Create a new contract file called `<yourlastname>.sol` in the contracts / directory. This file should contain the code for your ERC20 token.

5. In the scripts/ directory, create a new JavaScript file called `deploy_my_token.js`. This file should contain the code to deploy your ERC20 token to the Sepolia testnet.

6. Compile your contract in your terminal. `npx hardhat compile`

7. Deploy your contract to the Sepolia testnet.

8. Confirm that your ERC20 token has been successfully deployed to the Sepolia testnet by checking the Sepolia block explorer.

### Submission:
To submit this assignment, please push your final code to your GitHub repository:

- The Solidity code for your ERC20 token (`<yourlastname>.sol`) This can be in the repo, be sure to submit GitHub repo link
- The JavaScript code to deploy your token to the Sepolia testnet (`2_deploy_my_token.js`) This can be in the repo, be sure to submit GitHub repo link
- A screenshot or link to your token on the Sepolia block explorer. 

- Extra credit: Verify your contract on etherscan so the code, read adn write options are avaiable on etherscan.
- Your new coin imported to your metamask wallet

Please make sure that your code is well-documented and that your repository is organized and easy to navigate.

### Joe's Deployment Tips:
```shell
npx hardhat run --network sepolia scripts/deploy_my_token.js
```

```shell
npx hardhat verify --network sepolia <enter_contract_address>
```
