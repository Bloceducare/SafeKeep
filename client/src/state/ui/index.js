import { createSlice } from "@reduxjs/toolkit";

export const UI = createSlice({
  name: "UI",
  initialState: {
    createVaultModal: false,
    createInheritorsModal: false,
    depositWithdrawalModal:false,
    connectModal:false
  },
  reducers: {
    showCreateVaultModal: (state) => {
      state.createVaultModal = true;
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
} = UI.actions;

export default UI.reducer;
