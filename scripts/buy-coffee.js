// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalance(address) {
  const balance = await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balance);
}

async function printBalances(addresses){
  let idx = 0;

  for(const address of addresses){
   const balances = await getBalance(address);
   console.log(`the balance of address ${idx} is ${balances}`)
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
  const BuyMeACoffee = await hre.ethers.getContractFactory('buyMeACoffee'); //fetch the buyMeACoffee.sol file.
  const buyMeACoffee = BuyMeACoffee.deploy();

  //actually depploy the contract
  await buyMeACoffee.deployed();

  const addresses = [owner.address, giver1.address, buyMeACoffee.address]

  console.log('=-Start-=');//print the balances before donation
  printBalances(addresses);

  //perform donation.
  const tip = {value : hre.ethers.utils.parseEther('1')}
  buyMeACoffee.connect(giver1).buyCoffee("Dad",'I love you son', tip);
  buyMeACoffee.connect(giver2).buyCoffee("Lizzy", 'The feminist says hi', tip);
  buyMeACoffee.connect(giver3).buyCoffee("Aasa", 'Take Life Easy Man', tip);
  
console.log('=-After Donations-=');
printBalances(addresses);

buyMeACoffee.connect(owner).withdrawDonations();

console.log("=-After withdrawing the donations-=");
printBalances(addresses);

//getting out all the memos
const memos = buyMeACoffee.getMemos();
const miner  = buyMeACoffee.getMiner();
printMemo(memos, miner);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => {
  console.log(success);
  process.exit(0);
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
