const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("nsRacingToken", function () {
    let owner, addr1, addr2;
    

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners(); // getSigners() returns an array of Signer objects
        console.log(owner.address);
        nsRacingToken = await ethers.getContractFactory("nsRacingToken");
        nsRacingToken = await nsRacingToken.deploy();
        await nsRacingToken.deployed();    
    });

    it("Should return the correct name and symbol", async function () {
        expect(await nsRacingToken.name()).to.equal("nsRacingToken");
        expect(await nsRacingToken.symbol()).to.equal("NSRACE");
        console.log('Name:', (await nsRacingToken.name()), 'Symbol is:', (await nsRacingToken.symbol()));
    });

    it("Should return the correct total supply", async function () {
        expect(await nsRacingToken.totalSupply()).to.equal(ethers.utils.parseEther("1000000")); // 1 million tokens with 18 decimals
        console.log('Total supply is:', (await nsRacingToken.totalSupply()));
    });

    it("Should assign the total supply of tokens to the owner", async function () { // 1 million tokens with 18 decimals
        const ownerBalance = await nsRacingToken.balanceOf(await owner.getAddress()); // owner is the first account in the hardhat node list
        expect(await nsRacingToken.totalSupply()).to.equal(ownerBalance); // 1 million tokens with 18 decimals
        console.log('Owner balance is:', (await nsRacingToken.balanceOf(await owner.getAddress())), 'And the owner is:', (await owner.getAddress()));
    });

    it("Should transfer tokens between accounts", async function () {
        await nsRacingToken.transfer(await addr1.getAddress(), 50); // addr1 is the second account in the hardhat node list
        const addr1Balance = await nsRacingToken.balanceOf(await addr1.getAddress());
        expect(addr1Balance).to.equal(50);

        await nsRacingToken.connect(addr1).transfer(await addr2.getAddress(), 50);
        const addr2Balance = await nsRacingToken.balanceOf(await addr2.getAddress());
        expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesnt have enough tokens", async function () {
        const initialOwnerBalance = await nsRacingToken.balanceOf(await owner.getAddress());

        await expect(
            nsRacingToken.connect(addr1).transfer(await addr2.getAddress(), 1)
        ).to.be.revertedWith("Insufficient balance");

        expect(await nsRacingToken.balanceOf(await owner.getAddress())).to.equal(
            initialOwnerBalance
        );
    });


});

