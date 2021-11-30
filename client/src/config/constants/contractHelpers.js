import { ethers } from 'ethers'
import { getSafeKeepAddress } from '../../utils/addressHelper'

//adddress


//Abis
import safeKeepAbi from '../abi/safekeep.json'

const getContract = (abi, address, signer) => { 
   const provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/ba80361523fe423bb149026a490266f0')
  const signerOrProvider = signer ? signer : provider
  return new ethers.Contract(address, abi, signerOrProvider)
}

 const safeKeepContract = async (address, sign) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()
  const signIt = sign  && signer 
 sign &&  window.ethereum.enable()
  return getContract(safeKeepAbi, address, signIt)
}

export const getSafeKeepContract = async (useSigner)=>{
  return await safeKeepContract(getSafeKeepAddress(), useSigner)
}



export const getContractInstance = (address, abi) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()
  return  new ethers.Contract(address, abi, signer)

}