pragma solidity 0.8.4;

import "../libraries/LibVaultStorage.sol";
import "../libraries/LibKeep.sol";

import "../libraries/LibTokens.sol";
import "../interfaces/IVaultFacet.sol";
import "../libraries/LibDiamond.sol";
import "../interfaces/IERC20.sol";

contract VaultFacet is IVaultFacet, StorageStead {
  error NotInheritor();
  error AmountMismatch();

  ///////////////////
  //VIEW FUNCTIONS//
  /////////////////

  function inspectVault() public view returns (VaultInfo memory info) {
    info.owner = vs.vaultOwner;
    info.weiBalance = address(this).balance;
    info.lastPing = vs.lastPing;
    info.id = vs.vaultID;
    info.backup = vs.backupAddress;
    info.inheritors = vs.inheritors;
  }

  function vaultOwner() public view returns (address) {
    return vs.vaultOwner;
  }

  function allEtherAllocations()
    public
    view
    returns (AllInheritorEtherAllocs[] memory eAllocs)
  {
    uint256 count = vs.inheritors.length;
    eAllocs = new AllInheritorEtherAllocs[](count);
    for (uint256 i; i < count; i++) {
      eAllocs[i].inheritor = vs.inheritors[i];
      eAllocs[i].weiAlloc = vs.inheritorWeishares[vs.inheritors[i]];
    }
  }

  function inheritorEtherAllocation(address _inheritor)
    public
    view
    returns (uint256 _allocatedEther)
  {
    if (!Guards._anInheritor(_inheritor)) revert NotInheritor();
    _allocatedEther = vs.inheritorWeishares[_inheritor];
  }

  function etherBalance() public view returns (uint256) {
    return address(this).balance;
  }

  //////////////////////
  ///WRITE FUNCTIONS///
  ////////////////////
  //note: owner restriction is in external fns
  function addInheritors(
    address[] calldata _newInheritors,
    uint256[] calldata _weiShare
  ) external {
    Guards._onlyVaultOwner();
    LibKeep._addInheritors(_newInheritors, _weiShare);
  }

  function removeInheritors(address[] calldata _inheritors) external {
    Guards._onlyVaultOwner();
    LibKeep._removeInheritors(_inheritors);
  }

  function depositEther(uint256 _amount) external payable {
    if (_amount != msg.value) revert AmountMismatch();
    emit EthDeposited(_amount,vs.vaultID);
  }

  function withdrawEther(uint256 _amount, address _to) external {
    Guards._onlyVaultOwner();
    LibKeep._withdrawEth(_amount, _to);
  }

  function allocateEther(
    address[] calldata _inheritors,
    uint256[] calldata _ethShares
  ) external {
    Guards._onlyVaultOwner();
    LibKeep._allocateEther(_inheritors, _ethShares);
  }

  function allocateERC20Tokens(
    address token,
    address[] calldata _inheritors,
    uint256[] calldata _shares
  ) external {
    Guards._onlyVaultOwner();
    LibKeep._allocateERC20Tokens(token, _inheritors, _shares);
  }
}