require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("dotenv").config();
require("./tasks/tasks");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`${process.env.RINKEBY_PRIVATE_KEY_1}`,`${process.env.RINKEBY_PRIVATE_KEY_2}`]
    }
  }
};
