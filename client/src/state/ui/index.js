import { createSlice } from "@reduxjs/toolkit";

export const UI = createSlice({
  name: "UI",
  initialState: {
    createVaultModal: false,
    createInheritorsModal: false,
    depositWithdrawalModal:false
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
  },
});

// Action creators are generated for each case reducer function
export const {
  showCreateVaultModal,
  hideCreateVaultModal,
  hideCreateInheritorsModal,
  showCreateInheritorsModal,
  showDepositWithdrawalModal,
  hideDepositWithdrawalModal
} = UI.actions;

export default UI.reducer;
