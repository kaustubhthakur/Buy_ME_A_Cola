
async function main() 
{

const cola = await hre.ethers.getContractFactory("Cola");
const contract = await cola.deploy();
await contract.deployed();

console.log("Address is deployed at :",contract.address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
