/// @ title: deploy.js
/// @ author: Staub

const hre = require("hardhat"); // import hardhat

async function main() { // async function
  // const contract1 = await hre.ethers.getContractFactory("nsRacingToken"); // get contract factory
  // const c = await contract1.deploy(); // deploy contract
  // await c.deployed(); // wait for contract to be deployed
  // console.log("nsRacingToken deployed to:", c.address); // log contract address

  const contract2 = await hre.ethers.getContractFactory("nsRacingTokenMint"); // get contract factory
  const c2 = await contract2.deploy(); // deploy contract
  await c2.deployed(); // wait for contract to be deployed
  console.log("nsRacingTokenMint deployed to:", c2.address); // log contract address


  return /*c.address, */ c2.address; // return contract add
}

module.export = main; // export main function

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



  