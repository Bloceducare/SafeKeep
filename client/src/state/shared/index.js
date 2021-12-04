import { createSlice } from "@reduxjs/toolkit";

export const SharedTxn = createSlice({
  name: "Shared",
  initialState: {
    approving: false,
    depositing: false,
    withdrawing: false,
  },
  reducers: {
    startApproving: (state) => {
      state.approving = true;
    },

    endApproving: (state) => {
      state.approving = false;
    },
    startDepositing: (state) => {
      state.depositing = true;
    },

    endDepositing: (state) => {
      state.depositing = false;
    },

    startWithdrawing: (state) => {
      state.withdrawing = true;
    },
    endWithdrawing: (state) => {
      state.withdrawing = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startApproving,
  endApproving,
  startDepositing,
  endDepositing,
  startWithdrawing,
  endWithdrawing,
} = SharedTxn.actions;

export default SharedTxn.reducer;
