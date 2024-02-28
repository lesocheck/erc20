import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter";
import { constants } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const MUMBAI_API_URL = process.env.MUMBAI_API_URL ?? constants.HashZero;
const POLYGON_API_URL = process.env.POLYGON_API_URL ?? constants.HashZero;

const MUMBAI_PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY ?? constants.HashZero;
const POLYGON_PRIVATE_KEY =
  process.env.POLYGON_PRIVATE_KEY ?? constants.HashZero;

const MUMBAI_ETHERSCAN_API_KEY = process.env.MUMBAI_ETHERSCAN_API_KEY;
const POLYGON_ETHERSCAN_API_KEY = process.env.POLYGON_ETHERSCAN_API_KEY;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
        {
            version: "0.8.20",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
            },
        },
        {
            version: "0.8.0",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
            },
        },
    ],
},
  networks: {
    hardhat: {},
    polygon: {
      url: POLYGON_API_URL,
      accounts: [POLYGON_PRIVATE_KEY],
    },
    mumbai: {
      url: MUMBAI_API_URL,
      accounts: [MUMBAI_PRIVATE_KEY],
    },
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 30,
    coinmarketcap: process.env.COINMARKETCAP_KEY,
    enabled: true,
  },
  etherscan: {
    apiKey: {
      polygon: POLYGON_ETHERSCAN_API_KEY!,
      mumbai: MUMBAI_ETHERSCAN_API_KEY!,
    },
    customChains: [
      {
        network: "mumbai",
        chainId: 80001,
        urls: {
          apiURL: "https://api-testnet.polygonscan.com/api",
          browserURL: "https://mumbai.polygonscan.com/",
        },
      },
    ],
  },
};


task("mint", "Mints tokens to a specified address")
  .addParam("address", "The address to mint tokens to")
  .addParam("amount", "The amount of tokens to mint")
  .setAction(async (taskArgs, hre) => {
      const { address, amount } = taskArgs;
      const Token = await hre.ethers.getContractFactory("Erc20Token"); 
      const token = await Token.deploy('Erc20Token', "E20TK");

      await token.mint(address, amount);
      console.log(`Minted ${amount} tokens to address ${address}`);
  });

task("approve", "Approves spender to spend tokens on behalf of the owner")
  .addParam("address", "The address of the spender")
  .addParam("amount", "The amount of tokens to approve")
  .setAction(async (taskArgs, hre) => {
      const { address, amount } = taskArgs;
      const Token = await hre.ethers.getContractFactory("Erc20Token"); 
      const token = await Token.deploy('Erc20Token', "E20TK");

      await token.mint(address, amount);
      await token.approve(address, amount);
      console.log(`Approved ${amount} tokens for spender ${address}`);
  });

task("burn", "Burns tokens from the account")
  .addParam("address", "The address to burn tokens to")
  .addParam("amount", "The amount of tokens to burn")
  .setAction(async (taskArgs, hre) => {
      const { address, amount } = taskArgs;
      const Token = await hre.ethers.getContractFactory("Erc20Token"); 
      const token = await Token.deploy('Erc20Token', "E20TK");

      await token.mint(address, amount);
      await token.burn(address, amount);
      console.log(`Burned ${amount} tokens`);
  });


export default config;
