const { ethers } = require("hardhat");
const { expect } = require("chai");



describe("nsRacingTokenMint", function () {
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners(); // getSigners() returns an array of Signer objects
        console.log('owner = ', (owner.address));
        console.log('addr1 = ', (addr1.address));
        console.log('addr2 = ', (addr2.address));
        nsRacingTokenMint = await ethers.getContractFactory("nsRacingTokenMint");
        nsRacingTokenMint = await nsRacingTokenMint.deploy();
        await nsRacingTokenMint.deployed();
    });

    // it("Should return the correct name and symbol", async function () {
    //     expect(await nsRacingTokenMint.name()).to.equal("nsRacingTokenMint");
    //     expect(await nsRacingTokenMint.symbol()).to.equal("NSRACE");
    // });

    // it("Should return the correct total supply", async function () {
    //     expect(await nsRacingTokenMint.totalSupply()).to.equal(ethers.utils.parseEther("1000000")); // 1 million tokens with 18 decimals
    //     console.log('Total supply is:', (await nsRacingTokenMint.totalSupply()));
    // });

    it("Should assign the total supply of tokens to the owner", async function () { // 1 million tokens with 18 decimals
        const ownerBalance = await nsRacingTokenMint.balanceOf(await owner.address); // owner is the first account in the hardhat node list
        expect(await nsRacingTokenMint.totalSupply()).to.equal(ownerBalance); // 1 million tokens with 18 decimals
        console.log('Owner balance is:', (await nsRacingTokenMint.balanceOf(await owner.address)));
    });

    // it("Should transfer tokens between accounts", async function () {
    //     await nsRacingTokenMint.transfer(await addr1.address, 50); // addr1 is the second account in the hardhat node list
    //     const addr1Balance = await nsRacingTokenMint.balanceOf(await addr1.address);
    //     expect(addr1Balance).to.equal(50);

    //     await nsRacingTokenMint.connect(addr1).transfer(await addr2.address, 50);
    //     const addr2Balance = await nsRacingTokenMint.balanceOf(await addr2.address);
    //     expect(addr2Balance).to.equal(50);
    // });

    // it("Should fail if sender doesnt have enough tokens", async function () {
    //     const initialOwnerBalance = await nsRacingTokenMint.balanceOf(await owner.address);
    //     await expect(nsRacingTokenMint.connect(addr1).transfer(await addr2.address, 1)).to.be.revertedWith("Insufficient balance");
    //     expect(await nsRacingTokenMint.balanceOf(await owner.address)).to.equal(initialOwnerBalance);
    //     console.log('Owner balance is:', (await nsRacingTokenMint.balanceOf(await owner.address)), 'And the owner is:', (await owner.address));
    // });


    it("should mint tokens", async function () {
        // Mint 100 tokens to the first account and pay the required price
        await nsRacingTokenMint.mint(await addr1.address, 100, { value: ethers.utils.parseEther("1") });
        console.log('Minted 100 tokens to address - ', (await addr1.address));


        // Verify that the first account's balance was updated correctly
        expect(await nsRacingTokenMint.balanceOf(await addr1.address)).to.equal(100);
        console.log('addr1 balance is:', (await nsRacingTokenMint.balanceOf(addr1.address)), 'account#:', (await addr1.address));

        // // Verify that the total supply was updated correctly
        const expectedTotalSupply = ethers.utils.parseEther("1000000").add(100);
        expect(await nsRacingTokenMint.totalSupply()).to.equal(expectedTotalSupply);
        console.log('Total supply after Mint:', (await nsRacingTokenMint.totalSupply()));




        // Verify that the contract received the correct amount of ether

        const expectedFee = ethers.utils.parseEther("0.01");

        // Get the initial balance of the fee receiver address
        const initialFeeReceiverBalance = await ethers.provider.getBalance(owner.address);
        console.log('Initial fee receiver balance is:', (await ethers.provider.getBalance(owner.address)), (await owner.address));

        // Send a transaction to the contract


        // Get the final balances of the fee receiver and contract owner addresses
        const finalFeeReceiverBalance = await ethers.provider.getBalance(owner.address);
        const finalOwnerBalance = await ethers.provider.getBalance(await owner.getAddress());
        console.log('Final fee receiver balance is:', (await ethers.provider.getBalance(owner.address)));

        // Check that the fee was transferred correctly
        // expect(finalFeeReceiverBalance.sub(initialFeeReceiverBalance)).to.equal(expectedFee);
        // expect(finalOwnerBalance).to.equal(expectedFee);


        // // Verify that the first account received the remainder of the payment
        // const expectedReceived = ethers.utils.parseEther("0.99");
        // expect(await ethers.provider.getBalance(await addr1.address)).to.equal(expectedReceived);
    });


});

