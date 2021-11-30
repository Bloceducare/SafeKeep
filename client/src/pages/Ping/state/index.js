import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSafeKeepContract } from "../../../config/constants/contractHelpers";

export const pingAsync = createAsyncThunk("ping/pingVault", async (id) => {
  const contract = await getSafeKeepContract();
  const response = await contract.ping(id);
  return await response.wait();
});

export const ping = createSlice({
  name: "vault",
  initialState: {
    data: [],
    status: null,
    error: null,
    crud: null,
    receipt: null,
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(pingAsync.pending, (state) => {
        state.crud = true;
      })
      .addCase(pingAsync.fulfilled, (state, { payload }) => {
        (state.crud = false), (state.receipt = payload);
      })
      .addCase(pingAsync.rejected, (state) => {
        state.crud = false;
      });
  },
});

export default ping.reducer;
