/// @ title: deploy.js
/// @ author: Staub

const hre = require("hardhat"); // import hardhat

async function main() { // async function
  const contract = await hre.ethers.getContractFactory("StaubToken"); // get contract factory
  const c = await contract.deploy(); // deploy contract
  await c.deployed(); // wait for contract to be deployed
  console.log("staubtoken deployed to:", c.address); // log contract address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



  