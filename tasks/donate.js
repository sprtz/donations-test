require("@nomiclabs/hardhat-ethers");

const donationsArtefact = require("");
const donationsContractAddress = "";


task("donate", "Make a Donation")
.addParam("amount", "Amount ETH to donate ")
.setAction(async (taskArgs) => {
    console.log(`Donate ${taskArgs.amount} ETH`);

    const [owner, account2] = await ethers.getSigners();

    const donationContract = new ethers.Contract(
      donationsContractAddress,
      donationsArtefact.abi,
      account2
    );

    const result = await donationContract.donate(
      { value: ethers.utils.parseEther(taskArgs.amount) });

    result.wait();
    console.log("Tx hash:", result.hash);
});