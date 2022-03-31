require("@nomiclabs/hardhat-ethers");

const donationsArtefact = require("./DonationsContractAbi.json");
const donationsContractAddress = "0x9c8F1353Db32fAa6419C033b592a19adA809BC4a";


task("totalAmount", "Return total amount from address")
.addParam("address", "The address of donator")
.setAction(async (taskArgs) => {
    console.log("Getting total amount from: ", taskArgs.address);

    const [owner] = await ethers.getSigners();
    const donationsContract = new ethers.Contract(
      donationsContractAddress,
      donationsArtefact.abi,
      owner
    );
    const result = await donationsContract.totalAmount(taskArgs.address);
    
    console.log("Total amount: ", result);
});