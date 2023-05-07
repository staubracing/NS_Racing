const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("nsRacingTokenMint", function () {
    let owner, addr1, addr2;
    

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners(); // getSigners() returns an array of Signer objects
        console.log(owner.address);
        nsRacingTokenMint = await ethers.getContractFactory("nsRacingTokenMint");
        nsRacingTokenMint = await nsRacingTokenMint.deploy();
        await nsRacingTokenMint.deployed();    
    });

    it("Should return the correct name and symbol", async function () {
        expect(await nsRacingTokenMint.name()).to.equal("nsRacingTokenMint");
        expect(await nsRacingTokenMint.symbol()).to.equal("NSRACE");
    });

    it("Should return the correct total supply", async function () {
        expect(await nsRacingTokenMint.totalSupply()).to.equal(ethers.utils.parseEther("1000000")); // 1 million tokens with 18 decimals
    });

    it("Should assign the total supply of tokens to the owner", async function () { // 1 million tokens with 18 decimals
        const ownerBalance = await nsRacingTokenMint.balanceOf(await owner.getAddress()); // owner is the first account in the hardhat node list
        expect(await nsRacingTokenMint.totalSupply()).to.equal(ownerBalance); // 1 million tokens with 18 decimals
    });

    it("Should transfer tokens between accounts", async function () {
        await nsRacingTokenMint.transfer(await addr1.getAddress(), 50); // addr1 is the second account in the hardhat node list
        const addr1Balance = await nsRacingTokenMint.balanceOf(await addr1.getAddress());
        expect(addr1Balance).to.equal(50);

        await nsRacingTokenMint.connect(addr1).transfer(await addr2.getAddress(), 50);
        const addr2Balance = await nsRacingTokenMint.balanceOf(await addr2.getAddress());
        expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesnt have enough tokens", async function () {
        const initialOwnerBalance = await nsRacingTokenMint.balanceOf(await owner.getAddress());

        await expect(
            nsRacingTokenMint.connect(addr1).transfer(await addr2.getAddress(), 1)
        ).to.be.revertedWith("Insufficient balance");

        expect(await nsRacingTokenMint.balanceOf(await owner.getAddress())).to.equal(
            initialOwnerBalance
        );
    });

    it("should mint tokens", async function () {
        await nsRacingTokenMint.mint(await addr1.getAddress(), 100, {value: ethers.utils.parseEther("1")});
        expect(await nsRacingTokenMint.balanceOf(await addr1.getAddress())).to.equal(100);
        console.log(await nsRacingTokenMint.balanceOf(await addr1.getAddress()));
        console.log(await nsRacingTokenMint.totalSupply());
        console.log(await nsRacingTokenMint.balanceOf(await owner.getAddress()));
    });
   


});

