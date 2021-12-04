import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSafeKeepContract } from "../../../config/constants/contractHelpers";

export const updateBackupAddressAsync = createAsyncThunk(
  "backupAddress/updateBackupAddress",
  async (_vaultId, _newBackup) => {
    const contract = await getSafeKeepContract();

    const response = await contract.transferBackup(_vaultId, _newBackup);
    return response;
  }
);

export const backupAddress = createSlice({
  name: "backupAddress",
  initialState: {
    data: [],
    status: null,
    error: null,
    crud: null,
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(updateBackupAddressAsync.pending, (state) => {
        state.crud = true;
      })
      .addCase(updateBackupAddressAsync.fulfilled, (state, { payload }) => {
        state.data = [...payload];
        state.crud = false;
      })
      .addCase(updateBackupAddressAsync.rejected, (state) => {
        state.crud = false;
      });

    // .addCase(updateBackupAddressAsync.pending, (state) => {
    //  state.status ='pending'
    // })
    // .addCase(updateBackupAddressAsync.fulfilled, (state, {payload}) => {

    //    state.data=[...payload]
    //    state.status = 'fulfilled'
    // })
    // .addCase(updateBackupAddressAsync.rejected, (state) => {
    //     state.status = 'rejected'
    // })
  },
});

export default backupAddress.reducer;
