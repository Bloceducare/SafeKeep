import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { request, gql } from "graphql-request";
import { graphqlEndpoint } from "../../../config/constants/endpoints";
import { getSafeKeepContract } from "../../../config/constants/contractHelpers";
import { hidePingModal, showPingModal } from "../../../state/ui";
import getOwner from "../../../utils/getOwner";
import revealEthErr from "../../../utils/revealEthErr";

export const getPingsAsync = createAsyncThunk(
  "ping/getPings",
  async (othersPinging) => {
    const pinQuery = gql`
    {
      vaults(where: { owner: "${getOwner}" }) {
        pings {
          time
        }
      }
    }
  `;

    try {
      const data = await request(graphqlEndpoint, pinQuery);
      const result = data?.vaults[0]?.pings;
      return { othersPinging, result };
    } catch (error) {
      toast.error(revealEthErr(error));
      throw error;
    }
  }
);

let startPing;
let endPing;
export const pingVaultAsync = createAsyncThunk(
  "ping/pingVault",
  async (id, { dispatch }) => {
    const contract = await getSafeKeepContract(true);
    dispatch(startPing());
    try {
      if (id === "0") return;
      const response = await contract.ping(id);
      dispatch(showPingModal());
      dispatch(endPing());
      await response.wait();
      dispatch(hidePingModal());
      //return toast.success("ping submission confirmed");
      return dispatch(getPingsAsync(true));
    } catch (error) {
      dispatch(endPing());

      toast.error(error.message);
      dispatch(hidePingModal());
      console.log(error);
    }
  }
);

export const ping = createSlice({
  name: "ping",
  initialState: {
    status: null,
    crud: null,
    data: null,
    error: null,
  },
  reducers: {
    startPinging: (state) => {
      state.crud = true;
    },
    endPinging: (state) => {
      state.crud = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPingsAsync.pending, (state, payload) => {
        state.status = "pending";
        if (!payload.othersPinging) {
          state.loading = true;
        }
      })

      .addCase(getPingsAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.status = "success";
        state.data = payload?.result;
      })

      .addCase(getPingsAsync.rejected, (state, { payload }) => {
        state.status = "rejected";
        state.loading = false;
        state.error = payload;
      });
  },
});

const { startPinging, endPinging } = ping.actions;

startPing = startPinging;
endPing = endPinging;

export default ping.reducer;
