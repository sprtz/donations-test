require("@nomiclabs/hardhat-ethers");

const donationsArtefact = require("./DonationsContractAbi.json");
const donationsContractAddress = "0x9c8F1353Db32fAa6419C033b592a19adA809BC4a";


task("donatorsList", "Return list of donators")
.setAction(async () => {
    console.log("Getting donators list");

    const [owner] = await ethers.getSigners();
    const donationsContract = new ethers.Contract(
      donationsContractAddress,
      donationsArtefact.abi,
      owner
    );
    const result = await donationsContract.getDonators();

    console.log("Donators: ", result);
});