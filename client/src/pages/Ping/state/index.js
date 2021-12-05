import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'
import { getSafeKeepContract } from "../../../config/constants/contractHelpers";
import { hidePingModal, showPingModal } from "../../../state/ui";

let startPing;
let endPing;
export const pingVaultAsync = createAsyncThunk("ping/pingVault", async (id, {dispatch}) => {
  const contract = await getSafeKeepContract(true);
  dispatch(startPing())
  try {
    if(id ==='0') return;
    const response = await contract.ping(id);
    dispatch(showPingModal())
    dispatch(endPing())
    await response.wait()
    dispatch(hidePingModal())
    return toast.success('ping submission confirmed')

  } catch (error) {
    dispatch(endPing())
    toast.error('Error pinging your vault')
   dispatch(hidePingModal())
    console.log(error)   
  }
 
});

export const ping = createSlice({
  name: "ping",
  initialState: {
    status: null,
    crud: null,
  },
  reducers: {
    startPinging: (state) => {
      state.crud = true;
    },
    endPinging: (state) => {
      state.crud = false;
    },
  },
});


const {
  startPinging,
  endPinging,
} = ping.actions;

startPing = startPinging;
endPing = endPinging;


export default ping.reducer;
