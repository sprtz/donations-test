require("@nomiclabs/hardhat-ethers");

const donationsArtefact = require("./DonationsContractAbi.json");
const donationsContractAddress = "0x9c8F1353Db32fAa6419C033b592a19adA809BC4a";

task("withdraw", "Withdraws specified amound of funds to the address")
  .addParam("address", "The address to receive funds")
  .addParam("amount", "The amount of funds to be withdrawed")
  .setAction(async (taskArgs) => {
    console.log(`Withdrawing ${taskArgs.amount} ETH to ${taskArgs.address}`);

    const [owner] = await ethers.getSigners();

    const donationsContract = new ethers.Contract(
      donationsContractAddress,
      donationsArtefact.abi,
      owner
    );

    const result = await donationsContract.withdraw(taskArgs.address, ethers.utils.parseEther(taskArgs.amount));
    result.wait();

    console.log(`Tx hash: ${result.hash}`);

  });