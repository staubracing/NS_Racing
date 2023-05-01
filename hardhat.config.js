const { task } = require('hardhat/config');

require ('dotenv').config();
require ("@nomicfoundation/hardhat-toolbox");
require ("@nomicfoundation/hardhat-chai-matchers");

task ("accounts", "Prints the list of accounts", async () => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});



/** @type import('hardhat/config').HardhatUserConfig */

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.18",
 
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  
  etherscan: {
    apiKey: {
      sepolia: process.env.etherscan_API_KEY,
    }
}
};



