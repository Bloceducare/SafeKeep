import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSafeKeepContract } from "../../../config/constants/contractHelpers";
import { toast } from "react-toastify";
import { hideCreateInheritorsModal } from "../../../state/ui";

export const addInheritorAsync = createAsyncThunk(
  "inheritors/addInheritors",
  async (data, { dispatch, getState }) => {
    const contract = await getSafeKeepContract(true);
    const id = getState().vault.data.id;
    const { share, inheritors } = data;

    try {
      const tx = await contract.addInheritors(id, inheritors, share);
      toast.success("inheritors submitted successfully");
      dispatch(hideCreateInheritorsModal());
      const confirmations = await tx.wait();
      toast.success("inheritors submission confirmed");
      return confirmations;
    } catch (error) {
      toast.error("inheritors submission failed");
      console.log(error);
    }
  }
);

export const inheritors = createSlice({
  name: "inheritors",
  initialState: {
    data: [],
    status: null,
    error: null,
    crud: null,
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle crud state as needed
    builder
      .addCase(addInheritorAsync.pending, (state) => {
        state.crud = true;
      })
      .addCase(addInheritorAsync.fulfilled, (state, { payload }) => {
        state.crud = false;
      })
      .addCase(addInheritorAsync.rejected, (state) => {
        state.crud = false;
      });
  },
});

export default inheritors.reducer;
