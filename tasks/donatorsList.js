require("@nomiclabs/hardhat-ethers");

const donationsArtefact = require("");
const donationsContractAddress = "";


task("donatorsList", "Return list of donators").setAction(async () => {
    console.log("Getting donators list");

    const [owner] = await ethers.getSigners();
    const donationsContract = new ethers.Contract(
      donationsContractAddress,
      DonationsArtefact.abi,
      owner
    );
    const result = await donationContract.getDonators();

    console.log("Donators:", result);
});