import { safekeepContractAddress } from "./networkConfig";

export const getAddress = (address) => {
  // const chainId = 4;

  //  return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
  //return "0x10cF4DEB8D84f03fAe9319900ce257E3C407870C";
  // return "0xD861D6f60D21c9C7b50C0954E6f46795dFc6c6fD";
  //return "0xD8c8615293915f992Bca99f050F71048A20CD676";
  //return "0xe23513Bd0C6BaE57A2847DF684D9F89a678AFc14";
  //return "0xb839E43e5942d027F2AcB0a327Ee715EbD351BC1";
  //return "0x1946a0212A1eE66D2a5d7752850b30Ae4af500F3";
  //return "0x33A005A5A8cEA00bB9fA54341e742419A43Ef253";
  //return "0x70Ab81EB592185B314676EA36Ed2FE8c3eC35e31";
  return "0x1e63ba99ab74D0796dd897CBc58A0e741a8a1acc";
};

export const getSafeKeepAddress = () => safekeepContractAddress();
