require("@nomiclabs/hardhat-ethers");

const donationsArtefact = require("./DonationsContractAbi.json");
const donationsContractAddress = "0x9c8F1353Db32fAa6419C033b592a19adA809BC4a";


task("donate", "Make a Donation")
.addParam("amount", "Amount ETH to donate")
.setAction(async (taskArgs) => {
    console.log(`Donate ${taskArgs.amount} ETH`);

    const [owner, account2] = await ethers.getSigners();

    const donationsCsontract = new ethers.Contract(
      donationsContractAddress,
      donationsArtefact.abi,
      account2
    );

    const result = await donationsCsontract.donate(
      { value: ethers.utils.parseEther(taskArgs.amount) });

    result.wait();
    console.log("Tx hash:", result.hash);
});