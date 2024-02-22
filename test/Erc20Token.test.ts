import { loadFixture, time } from '@nomicfoundation/hardhat-network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';


describe('Token system', function () {
  async function deploy() {
    const 
      [owner, user1] = await ethers.getSigners();

    const Token = await ethers.getContractFactory('Erc20Token'); 
    const token = await Token.deploy('Erc20Token', "E20TK", 0);

    return { owner, user1, token};
  }

  it('Test mint', async function () {
    const { owner, user1, token
       } = await loadFixture(deploy);  
    
    expect(await token.mint(owner.address, 1000)).to.ok;
    expect(await token.balanceOf(owner.address)).to.be.equals(1000);

    // reverted
    await expect(token.connect(user1).mint(user1.address, 1000)).to.be.rejectedWith("Access denied!");
  });

  it('Test approve', async function () {
    const { owner, user1, token
       } = await loadFixture(deploy);  
    
    // mint
    expect(await token.mint(owner.address, 1000)).to.ok;

    // approve
    expect(await token.connect(owner).approve(user1.address, 1000)).to.ok;

    // transferFrom
    expect (await token.connect(user1).transferFrom(owner.address, user1.address, 1000)).to.ok;
    expect (await token.balanceOf(user1.address)).to.be.equals(1000);

    await expect(token.connect(user1).transferFrom(owner.address, user1.address, 100)).to.be.rejectedWith("Arithmetic operation overflowed outside of an unchecked block");
  });

  it('Test burn', async function () {
    const { owner, token
       } = await loadFixture(deploy);  
    
    expect(await token.mint(owner.address, 1000)).to.ok;
    expect(await token.balanceOf(owner.address)).to.be.equals(1000);

    // burn
    expect (await token.connect(owner).burn(owner.address, 1000)).to.ok;
    expect(await token.balanceOf(owner.address)).to.be.equals(0);

    // reverted
    await expect(token.connect(owner).burn(owner.address, 1000)).to.be.rejectedWith("Arithmetic operation overflowed outside of an unchecked block");
  });
});
