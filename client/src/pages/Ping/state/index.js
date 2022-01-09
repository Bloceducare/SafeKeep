import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { request, gql } from "graphql-request";
import { graphqlEndpoint } from "../../../config/constants/endpoints";
import { getSafeKeepContract } from "../../../config/constants/contractHelpers";
import getOwner from "../../../utils/getOwner";
import revealEthErr from "../../../utils/revealEthErr";
import toastify from "../../../utils/toast";

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

export const pingVaultAsync = createAsyncThunk(
  "ping/pingVault",
  async (id, { dispatch }) => {
    const contract = await getSafeKeepContract(true);

    try {
      if (id === "0") return;
      const response = await contract.ping(id);

      toastify("info", "Ping sent successfully");
      const confirmations = await response.wait();

      toastify(
        "success",
        "vailt pinged successfully 🚀",
        confirmations.transactionHash
      );
      dispatch(getPingsAsync());
    } catch (error) {
      toast.error(error.message);

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
      })
      .addCase(pingVaultAsync.pending, (state, payload) => {
        state.crud = true;
      })
      .addCase(pingVaultAsync.fulfilled, (state, { payload }) => {
        state.crud = false;
        // state.data = payload;
      })
      .addCase(pingVaultAsync.rejected, (state, { payload }) => {
        state.crud = false;
        state.error = payload;
      });
  },
});

export default ping.reducer;
