import { loadFixture, time } from '@nomicfoundation/hardhat-network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';


describe('Token system', function () {
  async function deploy() {
    const 
      [owner, user1, user2, user3, user4, user5
    ] = await ethers.getSigners();

    const Token = await ethers.getContractFactory('Erc20Token'); 
    const token = await Token.deploy();

    return { owner, user1, user2, user3, user4, user5, token};
  }

  it('Test mint', async function () {
    const { owner, user1, user2, user3, user4, user5, token
       } = await loadFixture(deploy);  
    
    expect(await token.mint(user1.address, 1000)).to.ok;
    expect(await token.balanceOf(user1.address)).to.be.equals(1000);

    // reverted
    await expect(token.connect(user1).mint(user1.address, 1000)).to.be.rejectedWith("Ownable: caller is not the owner");

  });

  it('Test approve', async function () {
    const { owner, user1, user2, user3, user4, user5, token
       } = await loadFixture(deploy);  
    
    // mint
    expect(await token.mint(user1.address, 1000)).to.ok;

    // approve
    expect(await token.connect(user1).approve(user2.address, 1000)).to.ok;

    // transferFrom
    expect (await token.connect(user2).transferFrom(user1.address, user2.address, 1000)).to.ok;
    expect (await token.balanceOf(user2.address)).to.be.equals(1000);

    await expect(token.connect(user2).transferFrom(user1.address, user2.address, 100)).to.be.rejectedWith("ERC20: insufficient allowance");

  });

  it('Test burn', async function () {
    const { owner, user1, user2, user3, user4, user5, token
       } = await loadFixture(deploy);  
    
    expect(await token.mint(user1.address, 1000)).to.ok;
    expect(await token.balanceOf(user1.address)).to.be.equals(1000);

    // burn
    expect (await token.connect(user1).burn(1000)).to.ok;
    expect(await token.balanceOf(user1.address)).to.be.equals(0);

    // reverted
    await expect(token.connect(user1).burn(1000)).to.be.rejectedWith("ERC20: burn amount exceeds balance");
  });
});
