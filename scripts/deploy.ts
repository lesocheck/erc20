import hardhat, { ethers } from "hardhat";

const owner = "0xE3e860b37b3e27fBFA39a952E27f31cC8B940111"
const otherAddress = "0x73FFbf176633E8da706BE52620cd5A25e996B505"

async function main() {

  const [signer] = await ethers.getSigners();

  const Token = await ethers.getContractFactory('Erc20Token', signer);
  const token = await Token.deploy('Erc20Token', "E20TK");

  await token.deployed();
  console.log(`Erc20Token deployed to ${token.address}`);

  console.log("Waiting for 10 confirmations");
  await token.deployTransaction.wait(10);
  console.log("Confirmed!");

  console.log("Verifying...");
  await hardhat.run("verify:verify", {
    address: token.address,
    constructorArguments: [],
  });

  // mint Erc20Token
  console.log("Mint Erc20Token")
  await token.mint(owner, 100000000);

  console.log("Approve Erc20Token")
  await token.approve(otherAddress, 100000000);

  console.log("Burn Erc20Token")
  await token.burn(1000);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
