const { ethers } = require("hardhat");
const { expect } = require("chai");


describe("DonationContract", function () {

  let contractFactory;
  let donationContract;

  let owner;
  let account1;
  let account2;

  const amount = ethers.utils.parseEther("0.01");


  beforeEach(async function () {
    contractFactory = await ethers.getContractFactory("DonationContract");
    [owner, account1, account2] = await ethers.getSigners();
    donationContract = await contractFactory.deploy();
    await donationContract.deployed();
  });


  describe("Deployment", function() {
    it("Should set the right owner", async function() {
      expect(await donationContract.owner()).to.equal(owner.address);
    });
  });


  describe("Donate", function() {
    it("Should receive donation, save donator address to list and total amount to mapping", async function() {
      await donationContract.connect(account1).donate({ value: amount });
      await donationContract.connect(account1).donate({ value: amount });

      const totalAmountFromAccount1 = await donationContract.donations(account1.address); 
      const totalAmountToContractBalance = amount.add(amount);
      expect(totalAmountFromAccount1).to.equal(totalAmountToContractBalance);

      const donatorsList = await donationContract.getDonators();
      expect(donatorsList.to.include(account1.address));
    });

  });


  describe("Transfer", function() {
    it("Should be owner to withdraw", async function() {
      await expect(donationContract.connect(account1).withdraw(account1.address, amount)).to.be.revertedWith("You should be owner to withdraw")
    });

    it("Should withdraws any amount to specified address", async function () {
      await donationContract.connect(account1).donate({ value: amount });

      const specifiedAmount = ethers.utils.parseEther("0.05");
      const tx = await donationsContract.connect(owner).withdraw(account2.address, specifiedAmount);

      await expect(() => tx).to.changeEtherBalance(addr2, specifiedAmount);
      await tx.wait();
    });

    it("Should revert if amount greather than balance", async function() {
      let withdrawAmount = ethers.utils.parseEther('0.05');
       await expect(donationsContract.connect(owner).withdraw(account2.address, withdrawAmount)).to.be.revertedWith("Contract don't have enought funds");
    });
  });


  describe("GetDonators", function() {
    it("Should return donators addresses list, values in list must be unique", async function () {
      await donationContract.connect(account1).donate({ value: amount });
      await donationContract.connect(account1).donate({ value: amount });
      await donationContract.connect(account2).donate({ value: amount });
      await donationContract.connect(account2).donate({ value: amount });

      const donatorsList = await donationContract.getDonators();
      
      expect(donatorsList).to.equal([account1.address, account2.address]); 
    });
  });


  describe("GetDonationAmountFromAddress", function() {
    it("Should return total amount for donator address", async function () {
      await donationContract.connect(account1).donate({  value: amount });
      await donationContract.connect(account1).donate({  value: amount });

      const totalAmountFromAccount1 = await donationContract.donations(account1.address);
      const totalAmountToContract = amount.add(amount);

      expect(totalAmountToContract).to.equal(totalAmountFromAccount1);
    });
  });


});