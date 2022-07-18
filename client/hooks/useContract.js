import safeKeepAbi from "../config/abi/safekeep.json";
//import contract from '../config/constants/contractHelpers'

// const web3 = await Moralis.enableWeb3();
// const contract = new web3.eth.Contract(contractAbi, contractAddress);

// const getContract = (chainId)=>{
//     return contract.safekeep[chainId]
// }

// const options = {
//     contractAddress: getContract(4),
//     abi: safeKeepAbi,
//     awaitReceipt: false
//   };

export const useContract = (name, ...args) => {
  //await Moralis.enableWeb3();
  const runContract = async () => {
    //   const tx = await Moralis.executeFunction({ functionName: name, ...args, ...options })
    //   return tx
  };

  return runContract();
};
