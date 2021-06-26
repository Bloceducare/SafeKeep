//SPDX-License-Identifier: Unlicense
//2020 Safekeep Finance v1


pragma solidity ^0.8.0;

import "hardhat/console.sol";
//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract SafeKeep is Ownable,ReentrancyGuard{
using SafeMath for uint256;
//using SafeERC20 for IERC20;

//safekeepV1 Vaults will only support eth and erc20 tokens for now

struct Vault{
    address _owner;
    uint256 _VAULT_WEI_BALANCE;
    uint256  _lastPing;
    uint256 _id;
    address backup;
    address[] _inheritors;
    address[] tokensDeposited;
    mapping(address=>uint256) _VAULT_TOKEN_BALANCES;     
    mapping(address=>uint256) _inheritorWeishares;
    mapping(address=>mapping(address=>uint)) _inheritorTokenShares;
    mapping(address=>mapping(address=>bool)) _inheritorActiveTokens;
    mapping(address=>bool) activeInheritors;
    mapping(address=>bool) activeTokens;
    mapping(address=> address[]) inheritorAllocatedTokens; 
} 

struct tokenAllocs{
    address token;
    uint256 amount;
    
}

struct allInheritorTokenAllocs{
    address inheritor_;
    address token_;
    uint256 amount_;
}

struct allInheritorEtherAllocs{
    address inheritor_;
    uint256 weiAlloc_;
}

struct tokenBal{
    address token_;
    uint256 bal_;
}


//using a central struct
struct SFStorage{
   //Vault[] vaults;
   uint256 VAULT_ID;
   address _mediator;
   mapping(address=> bool) hasVault;
}

bytes32 private _contractIdentifier= keccak256(abi.encodePacked('SAFEKEEPV1'));


mapping(address=>bool) public _whitelistedAssets;
mapping(uint256=>Vault) public vaultDefaultIndex;
mapping(bytes32=> SFStorage) private contractStore;


modifier vaultOwner(uint vaultID){
    require(msg.sender==vaultDefaultIndex[vaultID]._owner,'vaultOwner: you are not the vault owner');
    _;
} 

modifier vaultExists(uint vaultId){
    require(vaultDefaultIndex[vaultId]._owner!=address(0),"vault does not exist");
    _;
}

modifier vaultBackup(uint vaultID){
    require(vaultDefaultIndex[vaultID].backup==msg.sender,'vaultBackup: you are not the vault backup address');
    _;
}  

modifier notExpired(uint vaultID){
    require(block.timestamp.sub(vaultDefaultIndex[vaultID]._lastPing)<=24 weeks,'Has expired');
    console.log('still has',block.timestamp.sub(vaultDefaultIndex[vaultID]._lastPing),'seconds left');
    _;
}

receive() external payable {
    }
/////////////    
///EVENTS///
////////////
event vaultCreated(address indexed owner,address indexed backup,uint256 indexed startingBalance, address[] inheritors_);
event inheritorsAdded(address[] indexed newInheritors);
event inheritorsRemoved(address[] indexed inheritors);
event EthAllocated(address[] indexed inheritors,uint[] amounts);
event tokenAllocated(address indexed token,address[] indexed inheritors,uint[] amounts);
event EthDeposited(uint _amount);
event tokensDeposited(address[] indexed tokens,uint[] amounts);
event claimedTokens(address indexed inheritor,address indexed token,uint amount);
event claimedEth(address indexed inheritor, uint _amount);


///////////////////
//VIEW FUNCTIONS//
/////////////////

function checkAllMyTokenAllocations(uint256 _vaultId) public view returns(tokenAllocs[] memory tAllocs){
    Vault storage v=vaultDefaultIndex[_vaultId];
    require(v.inheritorAllocatedTokens[msg.sender].length>0,'ClaimTokens: you do not have any allocated tokens in this vault');
    require(msg.sender!=v._owner,'you are the owner');
    uint256 count=v.inheritorAllocatedTokens[msg.sender].length;
    tAllocs=new tokenAllocs[](count);
    for(uint256 i;i<count;i++){
      address _t=v.inheritorAllocatedTokens[msg.sender][i];
      tAllocs[i].amount=v._inheritorTokenShares[msg.sender][_t];
      tAllocs[i].token=_t;
    }
}

function checkAllEtherAllocations(uint256 _vaultId) public view returns(allInheritorEtherAllocs[] memory eAllocs){
    Vault storage v=vaultDefaultIndex[_vaultId];
    require(v._owner!=address(0),'Vault has not been created yet');
    uint256 inheritorCount=v._inheritors.length;
    eAllocs=new allInheritorEtherAllocs[](inheritorCount);
    for(uint256 i;i<inheritorCount;i++){
        eAllocs[i].inheritor_=v._inheritors[i];
        eAllocs[i].weiAlloc_=v._inheritorWeishares[v._inheritors[i]];
    }
} 

function checkMyEtherAllocation(uint256 _vaultId) public view returns(uint256 _allocated){
    Vault storage v=vaultDefaultIndex[_vaultId];
    require(msg.sender!=v._owner,'you are the owner');
    require(v._inheritorWeishares[msg.sender]>0,'ClaimTokens: you do not have any allocated ether in this vault');
    require(anInheritor(_vaultId,msg.sender)==true,'Check: you are not an inheritor');
    _allocated=v._inheritorWeishares[msg.sender];
}

function checkVaultEtherBalance(uint256 _vaultId) public view vaultExists(_vaultId) returns(uint256 etherBalance){
    etherBalance=vaultDefaultIndex[_vaultId]._VAULT_WEI_BALANCE;
}


//because of multiple dimensions, only displays the first token
function checkAllAllocatedTokens(uint256 _vaultId) public view returns(allInheritorTokenAllocs[] memory allTokenAllocs){
    Vault storage v=vaultDefaultIndex[_vaultId];
    require(v._owner!=address(0),'Vault has not been created yet');
    //require(msg.sender!=v._owner,'you are the owner');
    uint256 inheritorCount=v._inheritors.length;
    allTokenAllocs=new allInheritorTokenAllocs[](inheritorCount);
    for(uint256 i;i<inheritorCount;i++){
        allTokenAllocs[i].inheritor_=v._inheritors[i];
        address currentInheritor=v._inheritors[i];
        for(uint256 j;j<v.inheritorAllocatedTokens[allTokenAllocs[i].inheritor_].length;j++){
            uint256 _bal=v._inheritorTokenShares[currentInheritor][v.inheritorAllocatedTokens[currentInheritor][j]];
            address _tok=v.inheritorAllocatedTokens[currentInheritor][j];
            allTokenAllocs[i].amount_=_bal;
            allTokenAllocs[i].token_=_tok;
        }
    }
}

    
    function checkActive(address _add) public view returns(bool act){
        act=vaultDefaultIndex[0].activeTokens[_add];
    }
    

function checkVaultTokenBalance(uint256 _vaultId,address token) public view returns(uint256 bal_){
    bal_=vaultDefaultIndex[_vaultId]._VAULT_TOKEN_BALANCES[token];
}

function checkMyVaultTokenBalance(uint256 _vaultId,address token) public view returns(uint256 bal_){
    require(anInheritor(_vaultId,msg.sender)==true,'Check: you are not an inheritor in this vault');
    bal_=vaultDefaultIndex[_vaultId]._inheritorTokenShares[msg.sender][token];
}


function checkAllVaultTokenBalances(uint256 _vaultId) public view returns(tokenBal[] memory _tBal){
    Vault storage v=vaultDefaultIndex[_vaultId];
    require(v.tokensDeposited.length>0,"Vault does not contain any tokens");
    uint tokenCount=v.tokensDeposited.length;
    _tBal=new tokenBal[](tokenCount);
    for(uint256 k;k<v.tokensDeposited.length;k++){
        if(v.activeTokens[v.tokensDeposited[k]]==true){
            address _addr=v.tokensDeposited[k];
            uint256 _balance=v._VAULT_TOKEN_BALANCES[_addr];
            _tBal[k].token_= _addr;
            _tBal[k].bal_=_balance;
        }
    }
    
}

function checkVaultDepositedTokens(uint256 _vaultId) public view returns(address[] memory _tok){
    _tok=vaultDefaultIndex[_vaultId].tokensDeposited;
}

function getAllInheritors(uint256 _vaultId) public view returns(address[] memory inheritors_){
    inheritors_=vaultDefaultIndex[_vaultId]._inheritors;
}


//////////////////////
///WRITE FUNCTIONS///
////////////////////
function createVault(address[] calldata inheritors,uint256 _startingBal,address _backupAddress) public payable returns(uint){
    require(msg.value==_startingBal,'CreateVault: Sent ether does not match inputted ether');
    require(_backupAddress!=msg.sender,"you cannot be the backup address");
    SFStorage storage s=contractStore[_contractIdentifier];
    require(s.hasVault[msg.sender]==false,'you already have a vault');
    vaultDefaultIndex[s.VAULT_ID]._id=s.VAULT_ID;
    vaultDefaultIndex[s.VAULT_ID]._owner=msg.sender;
    vaultDefaultIndex[s.VAULT_ID]._VAULT_WEI_BALANCE=_startingBal;
   // vaultDefaultIndex[s.VAULT_ID]._OWNER_WEI_SHARE=_startingBal; //allocate all ether to owner
    vaultDefaultIndex[s.VAULT_ID]._inheritors=inheritors;
    vaultDefaultIndex[s.VAULT_ID]._lastPing=block.timestamp;
    vaultDefaultIndex[s.VAULT_ID].backup=_backupAddress;
    s.hasVault[msg.sender]=true;//you now have a vault
    for(uint256 k;k<inheritors.length;k++){
        vaultDefaultIndex[s.VAULT_ID].activeInheritors[inheritors[k]]=true;//all new inheritors are active by default
    }
    s.VAULT_ID++;
    emit vaultCreated(msg.sender,_backupAddress,_startingBal,inheritors);
    emit inheritorsAdded(inheritors);
    return vaultDefaultIndex[s.VAULT_ID]._id;
    
  
    
}

function addInheritors(uint256 _vaultId,address[] calldata _newInheritors,uint256[] calldata _weiShare) external notExpired(_vaultId) returns(address[] memory, uint256[] memory){
    Vault storage v=vaultDefaultIndex[_vaultId];
    require(msg.sender==v._owner,'AddInheritors:you are not the vault owner');
    require(_newInheritors.length==_weiShare.length,'AddInheritors: Length of arguments do not match');
    uint256 _total;
    uint256 _existingallocated=getCurrentAllocatedEth(_vaultId);
    for(uint256 k;k<_newInheritors.length;k++){
         _total+=_weiShare[k];
        require(v.activeInheritors[_newInheritors[k]]==false,'AddInheritors: one or more of the addresses is already an active inheritor');
        require((_total.add(_existingallocated))<=v._VAULT_WEI_BALANCE,'AddInheritors:you do not have that much ether to allocate,unallocate or deposit more ether');
        v._inheritorWeishares[_newInheritors[k]]=_weiShare[k];
        //append the inheritors for a vault
        (v._inheritors).push(_newInheritors[k]);
        v.activeInheritors[_newInheritors[k]]=true;
    }
    _ping(_vaultId);
    emit inheritorsAdded(_newInheritors);
    return(_newInheritors,_weiShare); 
}

function removeInheritors(uint256 _vaultId,address[] calldata _inheritors) external notExpired(_vaultId) returns(address[] memory ){
    Vault storage v=vaultDefaultIndex[_vaultId];
    require(msg.sender==v._owner,'activateInheritors:you are not the vault owner');
    for(uint256 k;k<_inheritors.length;k++){
        require(v.activeInheritors[_inheritors[k]]==true,'activateInheritors:one or more inheritor is already removed or does not exist');
        v.activeInheritors[_inheritors[k]]=false;
        //pop out the address from the array
        removeAddress(v._inheritors,_inheritors[k]);
        reset(_vaultId,_inheritors[k]);
    }
    _ping(_vaultId);
    emit inheritorsAdded(_inheritors);
    return _inheritors;
    
}

function depositEther(uint256 _vaultId,uint256 _amount) external payable vaultOwner(_vaultId) notExpired(_vaultId) nonReentrant returns(uint currentEtherBalance){
    Vault storage v=vaultDefaultIndex[_vaultId];
    require(_amount==msg.value,'DepositEther:Amount sent does not equal amount entered');
    v._VAULT_WEI_BALANCE+=_amount;
    _ping(_vaultId);
    emit EthDeposited(_amount);
    return v._VAULT_WEI_BALANCE;
}

function depositTokens(uint256 _id,address[] calldata tokenDeps, uint256[] calldata _amounts) external vaultOwner(_id) notExpired(_id) nonReentrant returns(address[] memory,uint256[] memory){
    Vault storage v=vaultDefaultIndex[_id];
    require(tokenDeps.length==_amounts.length,'TokenDeposit: number of tokens does not match number of amounts');
    for(uint256 j;j<tokenDeps.length;j++){
        IERC20 _j=IERC20(tokenDeps[j]);
        require(_j.allowance(msg.sender,address(this))>=_amounts[j],'TokenDeposit: you have not approved safekeep to spend one or more of your tokens');
        require(_j.transferFrom(msg.sender,address(this),_amounts[j]));
        v._VAULT_TOKEN_BALANCES[tokenDeps[j]]+=_amounts[j];
        if(v.activeTokens[tokenDeps[j]]==false){
            v.tokensDeposited.push(tokenDeps[j]);
            v.activeTokens[tokenDeps[j]]=true;
            //require(v.activeTokens[tokenDeps[j]]==true,"didn't do it, sorry");
        }
    }
    emit tokensDeposited(tokenDeps,_amounts);
     return(tokenDeps,_amounts);
    _ping(_id);
}    
    

function allocateTokens(uint256 _vaultId,address tokenAdd,address[] calldata _inheritors,uint256[] calldata _shares) external nonReentrant returns(address[] memory,uint256[] memory){
    Vault storage v=vaultDefaultIndex[_vaultId];
    require(msg.sender==v._owner,'AllocateTokens:you are not the vault owner');
    require(_inheritors.length==_shares.length,'AllocateTokens: Length of arguments do not match');
    uint256 _total=0;
    uint existingAllocated;
    for(uint256 k;k<_inheritors.length;k++){
        _total+=_shares[k];
        existingAllocated=getCurrentAllocatedTokens(_vaultId,tokenAdd);
        require(_total<=v._VAULT_TOKEN_BALANCES[tokenAdd],'AllocateTokens: you do not have that much tokens to allocate,unallocate or deposit more tokens');
        require(v.activeInheritors[_inheritors[k]]==true,'AllocateTokens: one of the addresses is not an active inheritor');
        v._inheritorTokenShares[_inheritors[k]][tokenAdd]=_shares[k];
        if(v._inheritorActiveTokens[_inheritors[k]][tokenAdd]==false){
            v.inheritorAllocatedTokens[_inheritors[k]].push(tokenAdd);
            v._inheritorActiveTokens[_inheritors[k]][tokenAdd]=true;
        }
    }
    _ping(_vaultId);
     emit tokenAllocated(tokenAdd,_inheritors,_shares);
 return (_inheritors,_shares);   
}

function allocateEther(uint256 _vaultId,address[] calldata _inheritors,uint256[] calldata _ethShares) external nonReentrant returns(address[] memory,uint256[] memory){
    Vault storage v=vaultDefaultIndex[_vaultId];
    require(msg.sender==v._owner,'AllocateEther:you are not the vault owner');
    require(_inheritors.length==_ethShares.length,'AllocateEther: Length of arguments do not match');
    uint256 _total=0;
  //  uint256 _allocated=getCurrentAllocatedEth(_vaultId);
    for(uint256 k;k<_inheritors.length;k++){
        _total+=_ethShares[k];
        require(_total<=v._VAULT_WEI_BALANCE,'AllocateEther: you do not have that much Ether to allocate,unallocate or deposit more ether');
        require(v.activeInheritors[_inheritors[k]]==true,'AllocateEther: one of the addresses is not an active inheritor');
        v._inheritorWeishares[_inheritors[k]]=_ethShares[k];
     //   v._OWNER_WEI_SHARE-=_ethShares[k];
    }
    _ping(_vaultId);
    emit EthAllocated(_inheritors,_ethShares);
    return(_inheritors,_ethShares);
    
}

function checkEthLimit(uint256 _vaultId) internal view returns(uint256 _unallocated){
     Vault storage v=vaultDefaultIndex[_vaultId];
     uint256 totalEthAllocated;
        for(uint256 x;x<v._inheritors.length;x++){
            totalEthAllocated+=v._inheritorWeishares[v._inheritors[x]];
        }
        require(v._VAULT_WEI_BALANCE>=totalEthAllocated,'WEI:Overflow, unallocate some ether');
        return v._VAULT_WEI_BALANCE.sub(totalEthAllocated);
}

function checkTokenLimit(uint256 _vaultId,address token) internal view returns(uint256 _unallocated){
    Vault storage v=vaultDefaultIndex[_vaultId];
    uint256 totalTokensAllocated;
    for(uint256 x;x<v._inheritors.length;x++){
        totalTokensAllocated+=v._inheritorTokenShares[v._inheritors[x]][token];
    }
    require(v._VAULT_TOKEN_BALANCES[token]>=totalTokensAllocated,'TOKEN: Overflow, unallocate some tokens');
    return v._VAULT_TOKEN_BALANCES[token].sub(totalTokensAllocated);
}


function findAddIndex(address _item,address[] memory addressArray) internal pure returns(uint i){
      for( i;i<addressArray.length;i++){
        //using the conventional method since we cannot have duplicate addresses
        if(addressArray[i]==_item){
            return i;
        }
    }
}
function removeAddress(address[] storage _array,address _add)internal{
    uint index=findAddIndex(_add,_array);
    for(uint256 i=index;i<_array.length;i++){
        _array[i]=_array[i-1];
    }
    _array.pop();
}

//only used for multiple elemented arrays
function reset(uint _vaultId,address _inheritor) internal returns(uint unAllocatedWei){
    Vault storage v=vaultDefaultIndex[_vaultId];
    unAllocatedWei=v._inheritorWeishares[_inheritor];
    v._inheritorWeishares[_inheritor]=0;
    //resetting all token allocations
    for(uint256 x;x<v.inheritorAllocatedTokens[_inheritor].length;x++){
        v._inheritorTokenShares[_inheritor][v.inheritorAllocatedTokens[_inheritor][x]]=0;
        v._inheritorActiveTokens[_inheritor][v.inheritorAllocatedTokens[_inheritor][x]]=false;
    }
    //remove all token addresses
    delete v.inheritorAllocatedTokens[_inheritor];
}  
 
function getCurrentAllocatedEth(uint256 _vaultId) internal view returns(uint256){
    Vault storage v=vaultDefaultIndex[_vaultId];
    uint totalEthAllocated;
    for(uint256 x;x<v._inheritors.length;x++){
    totalEthAllocated+=v._inheritorWeishares[v._inheritors[x]];
    }
    return totalEthAllocated;
}

function getCurrentAllocatedTokens(uint256 _vaultId,address _token) internal view returns(uint256){
    Vault storage v=vaultDefaultIndex[_vaultId];
    uint totalTokensAllocated;
    for(uint256 x;x<v._inheritors.length;x++){
    totalTokensAllocated+=v._inheritorTokenShares[v._inheritors[x]][_token];
    }
    return totalTokensAllocated;
}

function withdrawEth(uint256 _vaultId,uint256 _amount) public vaultOwner(_vaultId) nonReentrant returns(uint){
    Vault storage v=vaultDefaultIndex[_vaultId];
    uint256 _avail=v._VAULT_WEI_BALANCE.sub(getCurrentAllocatedEth(_vaultId));
    require(_amount<=_avail,'withdrawEth: Not enough eth, Unallocate from some inheritors or deposit more');
    //reduce balance after checks
    (v._VAULT_WEI_BALANCE-=_amount);
    payable(v._owner).transfer(_amount);
    _ping(_vaultId);
    return(v._VAULT_WEI_BALANCE);
}

function withdrawTokens(uint256 _vaultId,address[] calldata tokenAdds,uint256[] calldata _amounts) public vaultOwner(_vaultId) nonReentrant returns(bool){
    Vault storage v=vaultDefaultIndex[_vaultId];
    for(uint256 x;x<tokenAdds.length;x++){
    uint  _availableTokens=v._VAULT_TOKEN_BALANCES[tokenAdds[x]].sub(getCurrentAllocatedTokens(_vaultId,tokenAdds[x]));
    require(_availableTokens>=_amounts[x],'withdrawToken:Not enough tokens, unallocate from some inheritors or deposit more');
    //transfer tokens after checks then reduce balance
    IERC20 _j=IERC20(tokenAdds[x]);
    require(_j.transfer(v._owner,_amounts[x]));
    v._VAULT_TOKEN_BALANCES[tokenAdds[x]]-=(_amounts[x]);
    //if there is just a token and balance is 0
    if(v.tokensDeposited.length==1 && v._VAULT_TOKEN_BALANCES[v.tokensDeposited[0]]==0){
        v.activeTokens[v.tokensDeposited[0]]=false;
        v.tokensDeposited.pop();
        continue;
    }
    //if no tokens remain,delete the array
    if (v.tokensDeposited.length>1 && v._VAULT_TOKEN_BALANCES[tokenAdds[x]]==0){
        v.activeTokens[tokenAdds[x]]=false;
        removeAddress(v.tokensDeposited,tokenAdds[x]);
    }
    
    }
    _ping(_vaultId);
    return true;
}

function _ping(uint256 _vaultId) private vaultOwner(_vaultId) returns(uint256){
    vaultDefaultIndex[_vaultId]._lastPing=block.timestamp;
    return(vaultDefaultIndex[_vaultId]._lastPing);
}

function ping(uint256 _vaultId) external {
    _ping(_vaultId);
}

function anInheritor(uint256 vaultId,address inheritor_) internal view returns(bool) {
    Vault storage v=vaultDefaultIndex[vaultId];
    for(uint256 i;i<v._inheritors.length;i++){
        if(inheritor_==v._inheritors[i]){
            return true;
        }
    }
}

//////////
//DANGER//
/////////
function transferOwner(uint256 _vaultId,address _newOwner) public vaultOwner(_vaultId) returns(address){
    vaultDefaultIndex[_vaultId]._owner=_newOwner;
  //  _ping(_vaultId);
    return _newOwner;
}

function transferBackup(uint256 _vaultId,address _newBackup) public vaultBackup(_vaultId) returns(address){
    vaultDefaultIndex[_vaultId].backup=_newBackup;
    return _newBackup;
}

function claimOwnership(uint256 _vaultId,address _backup) public vaultBackup(_vaultId) returns(address){
    require(block.timestamp.sub(vaultDefaultIndex[_vaultId]._lastPing)>24 weeks,'Has not expired');
    vaultDefaultIndex[_vaultId]._owner=msg.sender;
    vaultDefaultIndex[_vaultId].backup=_backup;
    return msg.sender;
}
//////////
//CLAIMS//
//////////
function claimAllTokens(uint256 _vaultId) internal {
    Vault storage v=vaultDefaultIndex[_vaultId];
    //this is used for testing
    require(block.timestamp.sub(v._lastPing)>10 seconds,'Has not expired');
    require(v.inheritorAllocatedTokens[msg.sender].length>0,'ClaimTokens: you do not have any allocated tokens in this vault');
    for(uint256 i;i<v.inheritorAllocatedTokens[msg.sender].length;i++){
        IERC20 _t=IERC20(v.inheritorAllocatedTokens[msg.sender][i]);
        require(_t.transfer(msg.sender,v._inheritorTokenShares[msg.sender][v.inheritorAllocatedTokens[msg.sender][i]]));
        v._inheritorActiveTokens[msg.sender][v.inheritorAllocatedTokens[msg.sender][i]]=false;
        v._VAULT_TOKEN_BALANCES[v.inheritorAllocatedTokens[msg.sender][i]]-=v._inheritorTokenShares[msg.sender][v.inheritorAllocatedTokens[msg.sender][i]];
        emit claimedTokens(msg.sender,v.inheritorAllocatedTokens[msg.sender][i],v._inheritorTokenShares[msg.sender][v.inheritorAllocatedTokens[msg.sender][i]]);
    }
    removeAddress(v._inheritors,msg.sender);
    reset(_vaultId,msg.sender);
    
}

function claim(uint256 _vaultId) public nonReentrant returns(uint256){
    Vault storage v=vaultDefaultIndex[_vaultId];
    require(block.timestamp.sub(v._lastPing)>10 seconds,'Has not expired');
    require(v._inheritorWeishares[msg.sender]>0,'ClaimEth: you do not have allocated eth this vault');
    uint256 _toClaim=v._inheritorWeishares[msg.sender];
    v._VAULT_WEI_BALANCE-=_toClaim;
    //reset balance
    v._inheritorWeishares[msg.sender]=0;
    v._VAULT_WEI_BALANCE.sub(_toClaim);
    //send out balance
    payable(msg.sender).transfer(_toClaim);
    if(v.inheritorAllocatedTokens[msg.sender].length>0){
        claimAllTokens(_vaultId);
    }
    emit claimedEth(msg.sender, _toClaim);
    return _toClaim;
}





}