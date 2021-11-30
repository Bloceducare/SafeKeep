import addresses from "../config/constants/contracts";

export const getAddress = (address) => {
 // const chainId = 4;

  //  return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
  return "0x3b16c4985dFC8451c0337e68C0ddA52b0FB6b843";
};

export const getSafeKeepAddress = () => {
  //  console.log(addresses, 'address obj')
  return getAddress(addresses?.safeKeep);
};
