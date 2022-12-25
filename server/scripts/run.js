const hre = require("hardhat");
async function getBalance(address){
  const balanceBigInt = await hre.ethers.provider.getBalance(address)
  return hre.ethers.utils.formatEther(balanceBigInt);
}
async function consoleBalances(addresses)
{
  let counter =0;
  for(const address of addresses)
  {
    console.log(`Address ${counter} balance`,await getBalance(address))
 counter++;
  }
}
async function consoleMemos(memos){
  for(const memo of memos){
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(`at ${timestamp} ,name ${name} ,address ${from},messgae ${message}`)
  }
}
async function main() 
{
const [owner,from1,from2,from3] = await hre.ethers.getSigners();
const cola = await hre.ethers.getContractFactory("Cola");
const contract = await cola.deploy();
await contract.deployed();


console.log("adress is deployed at :",contract.address);

const addresses = [owner.address,from1.address];
console.log("before buying ");
await consoleBalances(addresses);


const amount = {value:hre.ethers.utils.parseEther("1")}
await contract.connect(from1).buyCola("from1","fucking goood cola",amount);

console.log("after buying ");
await consoleBalances(addresses);

const memos = await contract.getMemos();
consoleMemos(memos);



}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
