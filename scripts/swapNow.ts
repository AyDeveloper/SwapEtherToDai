/* eslint-disable prettier/prettier */
import { BigNumberish, Signer } from "ethers";
import { ethers } from "hardhat";

const linkHolder = "0x19184ab45c40c2920b0e0e31413b9434abd243ed";
const maticHolder = "0x7e23d0b5d68a43c7141a9f28b6419ca999231bc0";

// this function performs the swap.
async function swap() {
  // swap usdt to uni token;
  // this signer serves as the person initiating the transaction (msg.sender)
  const linkSigner: Signer = await ethers.getSigner(linkHolder);
  const maticSigner: Signer = await ethers.getSigner(maticHolder);
  // getting the instance of router contract

  // impersonating the account on the mainnet after forking the mainnet;
  // @ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [linkHolder],
  });

    // @ts-ignore
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [maticHolder],
    });

  // @ts-ignore
  await network.provider.send("hardhat_setBalance", [
    linkHolder,
    "0x2000000000000000000000000000000000000",
  ])

   // @ts-ignore
   await network.provider.send("hardhat_setBalance", [
    maticHolder,
    "0x2000000000000000000000000000000000000",
  ])
   
  const SwapNow = await ethers.getContractFactory("SwapNow");
  const daiContract = await ethers.getContractAt("IERC20","0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0")
  const linkContract = await ethers.getContractAt("IERC20","0x514910771AF9Ca656af840dff83E8264EcF986CA")

  const swapNow = await SwapNow.deploy();
  await swapNow.deployed();

  // console.log(await swapNow.getLatestPrice1());
  // console.log(await swapNow.getLatestPrice2());
  // console.log(await swapNow.getDaiQty(1));


  
  // approve the contract by linkHolder
  await linkContract.connect(linkSigner).approve(swapNow.address, "100");
  // check contract allowance
  console.log(await linkContract.allowance(linkHolder, swapNow.address));
  // send dai from an entity to the contract to hold enough.
  await daiContract.connect(maticSigner).transfer(swapNow.address, "1000000")
  console.log( await daiContract.balanceOf(swapNow.address));
  // check balance of aaverHolder before in dai
  console.log(`bal b4`,await daiContract.balanceOf(linkHolder));
  
  // swap now
  await swapNow.connect(linkSigner).swapLinkToDai(100);

  console.log(`bal after is`,await daiContract.balanceOf(linkHolder));

  // check balance of aaveHolder after in dai




   
    
    
}
swap().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
