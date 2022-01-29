import { ethers } from "ethers";
import { getSafeKeepAddress } from "../../utils/addressHelper";

//adddress

//Abis
import safeKeepAbi from "../abi/safekeep.json";
import erc20Abi from "../abi/erc20abi.json";
import { currrentChainId, networkConfigs } from "../../utils/networkConfig";

const getContract = (abi, address, signer) => {
  let rpcUrl = networkConfigs[currrentChainId()].rpcUrl;
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const signerOrProvider = signer ? signer : provider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

const safeKeepContract = async (address, sign) => {
  console.log("safeKeepContract address", address);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const signIt = sign && signer;
  sign && window.ethereum.request({ method: "eth_requestAccounts" });
  return getContract(safeKeepAbi, address, signIt);
};

export const getSafeKeepContract = async (useSigner) => {
  return await safeKeepContract(getSafeKeepAddress(), useSigner);
};

export const getErc20Contract = async (address) => {
  return getContract(erc20Abi, address);
};

export const getContractInstance = (address, abi) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(address, abi, signer);
};
