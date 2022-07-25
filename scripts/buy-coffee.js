// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalance(address) {
  // console.log(hre.ethers);
  console.log(await address.getBalance());
  // const balance = await hre.waffle.provider.getBalance(address);
  // return hre.ethers.utils.formatEther(balance);
}

async function printBalances(accounts) {
  let idx = 0;

  for(const account of accounts){
   const balances = await account.getBalance();
   console.log(`the balance of address ${idx} is ${balances}`);
   idx++;
  
  }

}

async function printMemo(memos, miner){
  for (const memo of memos){
    const timestamp = memo.timeStamp;
    const giver = memo._name;
    const giverAddress = memo.from;
    const message = memo._message;
    const amount = memo._amount;
    console.log(`${giver} gave you ${amount} ether at ${timestamp}. ${giver}'s address is at ${giverAddress}. ${giver} left a message saying: ${message}. This transcation was mined by ${miner}`);
  }

}


async function main(){
  const [owner, giver1, giver2, giver3] = await hre.ethers.getSigners();
  const accounts = [owner, giver1, giver2, giver3];
 
  console.log(await owner.getBalance());
  console.log(owner.address);
  const BuyMeACoffee = await hre.ethers.getContractFactory('buyMeACoffee'); //fetch the buyMeACoffee.sol file.
  const buyMeACoffee = await BuyMeACoffee.deploy();

  //actually depploy the contract
  await buyMeACoffee.deployed();

  console.log(`the contract was deployed to ${buyMeACoffee.address}`);

  // const addresses = [owner.address, giver1.address, buyMeACoffee.address]

  console.log('=-Start-=');//print the balances before donation
  // await  printBalances(owner);
  await printBalances(accounts);

  //perform donation.
  const tip = {value : hre.ethers.utils.parseEther('1')}
  buyMeACoffee.connect(giver1).buyCoffee("Dad",'I love you son', tip);
  buyMeACoffee.connect(giver2).buyCoffee("Lizzy", 'The feminist says hi', tip);
  buyMeACoffee.connect(giver3).buyCoffee("Aasa", 'Take Life Easy Man', tip);
  
  console.log('=-After Donations-=');
  await printBalances(accounts);

  await buyMeACoffee.connect(owner).withdrawDonations();

  // console.log(`the amount that is found in the contract is ${}`);
  console.log("=-After withdrawing the donations-=");
  await printBalances(accounts);

  //getting out all the memos
  const memos = await  buyMeACoffee.getMemos();
  const miner  = await  buyMeACoffee.getMiner();
  await printMemo(memos, miner);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => {
  console.log('success');
  process.exit(0);
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
