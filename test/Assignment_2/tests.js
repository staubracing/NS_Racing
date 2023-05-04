const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("staubTokenMint", function () {
    let owner, addr1, addr2;
    

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners(); // getSigners() returns an array of Signer objects
        console.log(owner.address);
        StaubToken = await ethers.getContractFactory("StaubTokenMint");
        StaubToken = await StaubToken.deploy();
        await StaubToken.deployed();    
    });

    it("Should return the correct name and symbol", async function () {
        expect(await StaubToken.name()).to.equal("StaubTokenMint");
        expect(await StaubToken.symbol()).to.equal("SCM");
    });

    it("Should return the correct total supply", async function () {
        expect(await StaubToken.totalSupply()).to.equal(ethers.utils.parseEther("1000000")); // 1 million tokens with 18 decimals
    });

    it("Should assign the total supply of tokens to the owner", async function () { // 1 million tokens with 18 decimals
        const ownerBalance = await StaubToken.balanceOf(await owner.getAddress()); // owner is the first account in the hardhat node list
        expect(await StaubToken.totalSupply()).to.equal(ownerBalance); // 1 million tokens with 18 decimals
    });

    it("Should transfer tokens between accounts", async function () {
        await StaubToken.transfer(await addr1.getAddress(), 50); // addr1 is the second account in the hardhat node list
        const addr1Balance = await StaubToken.balanceOf(await addr1.getAddress());
        expect(addr1Balance).to.equal(50);

        await StaubToken.connect(addr1).transfer(await addr2.getAddress(), 50);
        const addr2Balance = await StaubToken.balanceOf(await addr2.getAddress());
        expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesnt have enough tokens", async function () {
        const initialOwnerBalance = await StaubToken.balanceOf(await owner.getAddress());

        await expect(
            StaubToken.connect(addr1).transfer(await addr2.getAddress(), 1)
        ).to.be.revertedWith("Insufficient balance");

        expect(await StaubToken.balanceOf(await owner.getAddress())).to.equal(
            initialOwnerBalance
        );
    });

    it("should mint tokens", async function () {
        await StaubToken.mint(await addr1.getAddress(), 100);
        expect(await StaubToken.balanceOf(await addr1.getAddress())).to.equal(100);
        console.log(await StaubToken.balanceOf(await addr1.getAddress()));
    });
   


});

