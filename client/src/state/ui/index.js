import { createSlice } from "@reduxjs/toolkit";

export const UI = createSlice({
  name: "UI",
  initialState: {
    createVaultModal: false,
    createInheritorsModal: false,
    depositWithdrawalModal: false,
    connectModal: false,
    pingModal: false,
    backupAddressModal: false,
    confirmationModal: false,
    editAliasModal: false,
    allocateSingleEthModal: false,
    allocateTokenModal: false,
  },
  reducers: {
    showCreateVaultModal: (state) => {
      state.createVaultModal = true;
    },

    showConfirmationModal: (state) => {
      state.confirmationModal = true;
    },

    hideConfirmationModal: (state) => {
      state.confirmationModal = false;
    },

    hideCreateVaultModal: (state) => {
      state.createVaultModal = false;
    },

    showCreateInheritorsModal: (state) => {
      state.createInheritorsModal = true;
    },

    hideCreateInheritorsModal: (state) => {
      state.createInheritorsModal = false;
    },

    showDepositWithdrawalModal: (state) => {
      state.depositWithdrawalModal = true;
    },

    hideDepositWithdrawalModal: (state) => {
      state.depositWithdrawalModal = false;
    },
    showConnectModal: (state) => {
      state.connectModal = true;
    },

    hideConnectModal: (state) => {
      state.connectModal = false;
    },
    showPingModal: (state) => {
      state.pingModal = true;
    },

    hidePingModal: (state) => {
      state.pingModal = false;
    },
    showBackupAddressModal: (state) => {
      state.backupAddressModal = true;
    },

    hideBackupAddressModal: (state) => {
      state.backupAddressModal = false;
    },
    showEditAliasModal: (state) => {
      state.editAliasModal = true;
    },
    hideEditAliasModal: (state) => {
      state.editAliasModal = false;
    },
    showAllocateEthSingleModal: (state) => {
      state.allocateSingleEthModal = true;
    },
    hideAllocateSingleEthModal: (state) => {
      state.allocateSingleEthModal = false;
    },
    hideAllocateTokenModal: (state) => {
      state.allocateTokenModal = false;
    },
    showAllocateTokenModal: (state) => {
      state.allocateTokenModal = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  showCreateVaultModal,
  hideCreateVaultModal,
  hideCreateInheritorsModal,
  showCreateInheritorsModal,
  showDepositWithdrawalModal,
  hideDepositWithdrawalModal,
  showConnectModal,
  hideConnectModal,
  showPingModal,
  hidePingModal,
  showBackupAddressModal,
  hideBackupAddressModal,
  showConfirmationModal,
  hideConfirmationModal,
  showEditAliasModal,
  hideEditAliasModal,
  showAllocateEthSingleModal,
  hideAllocateSingleEthModal,
  hideAllocateTokenModal,
  showAllocateTokenModal,
} = UI.actions;

export default UI.reducer;
