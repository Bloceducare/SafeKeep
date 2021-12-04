const ethereum_address = require('ethereum-address');

export const validEthAddress = (address)=>{
    if(ethereum_address.isAddress(address)) return true;
    return false;
}

export default validEthAddress;
