import { ethers } from 'ethers'
import { getSafeKeepAddress } from '../../utils/addressHelper'

//adddress


//Abis
import safeKeepAbi from '../abi/safekeep.json'

const getContract = (abi, address) => { 
   const provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/ba80361523fe423bb149026a490266f0')
 // const signerOrProvider = signer
  return new ethers.Contract(address, abi, provider)
}

 const safeKeepContract = (address, signer) => {
  return getContract(safeKeepAbi, address, signer)
}

export const getSafeKeepContract = async ()=>{
  return await safeKeepContract(getSafeKeepAddress())
}

