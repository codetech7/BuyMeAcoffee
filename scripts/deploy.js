const hre = require('hardhat');

async function main(){
    const BuyMeACoffee = await hre.ethers.getContractFactory('buyMeACoffee');
    const buyMeACoffee = await BuyMeACoffee.deploy();
    
    await buyMeACoffee.deployed();
    
    console.log('Contract was deployd to ', buyMeACoffee.address);
}

main().then(() => {
    console.log('success');
//   process.exit(0);
 
}).catch(() => {
  process.exit(1);
})

