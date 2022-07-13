import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    address: "",
  },
  reducers: {
    getUserAddress: (state, { payload }) => {
      state.address = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUserAddress } = user.actions;

export default user.reducer;
