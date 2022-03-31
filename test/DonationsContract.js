const { ethers } = require("hardhat");
const { expect } = require("chai");


describe("DonationContract", function () {

  let contractFactory;
  let donationContract;

  let owner;
  let account1;
  let account2;

  const specifiedAmount = ethers.utils.parseEther("0.05");
  const amount = ethers.utils.parseEther("0.01");


  beforeEach(async function () {
    contractFactory = await ethers.getContractFactory("DonationsContract");
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

      const totalAmountFromAccount1 = await donationContract.totalAmount(account1.address);
      const totalAmountToContractBalance = amount.add(amount);
      expect(totalAmountFromAccount1).to.equal(totalAmountToContractBalance);

      const donatorsList = await donationContract.getDonators();
      expect(donatorsList).to.include(account1.address);
    });

  });


  describe("Withdraw", function() {
    it("Should be owner to withdraw", async function() {
      await expect(donationContract.connect(account1).withdraw(account1.address, amount)).to.be.revertedWith("Only owner can do this")
    });

    it("Should withdraws any amount to specified address", async function () {

      await donationContract.connect(owner).donate({ value: specifiedAmount });

      const tx = await donationContract.connect(owner).withdraw(account2.address, specifiedAmount);

      await expect(() => tx).to.changeEtherBalance(account2, specifiedAmount);
      await tx.wait();
    });

    it("Should revert if amount greather than balance", async function() {
       await expect(donationContract.connect(owner).withdraw(account2.address, specifiedAmount)).to.be.revertedWith("Not enough tokens");
    });
  });


  describe("GetDonators", function() {
    it("Should return donators addresses list, values in list must be unique", async function () {

      await donationContract.connect(account1).donate({ value: amount });
      await donationContract.connect(account1).donate({ value: amount });
      await donationContract.connect(account2).donate({ value: amount });
      await donationContract.connect(account2).donate({ value: amount });

      const donatorsList = await donationContract.getDonators();
      const hasDublicates = new Set(donatorsList).size !== donatorsList.lenght;
      expect(!hasDublicates);
    });
  });


  describe("GetDonationAmountFromAddress", function() {
    it("Should return total amount for donator address", async function () {
      await donationContract.connect(account1).donate({ value: amount });
      await donationContract.connect(account1).donate({ value: amount });

      const totalAmountFromAccount1 = await donationContract.totalAmount(account1.address);
      const totalAmountToContract = amount.add(amount);

      expect(totalAmountToContract).to.equal(totalAmountFromAccount1);
    });
  });


});