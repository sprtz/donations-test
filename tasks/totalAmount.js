require("@nomiclabs/hardhat-ethers");

const donationsArtefact = require("");
const donationsContractAddress = "";


task("totalAmountFrom", "Return total amount from address")
.addParams("address", "donator address")
.setAction(async (taskArgs) => {
    console.log("Getting total amount from: ", taskArgs.address);

    const [owner] = await ethers.getSigners();
    const donationsContract = new ethers.Contract(
      donationsContractAddress,
      donationsArtefact.abi,
      owner
    );
    const result = await donationContract.totalAmount(taskArgs.address);
    
    console.log("Total amount: ", result);
});