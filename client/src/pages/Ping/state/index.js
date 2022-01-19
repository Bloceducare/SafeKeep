import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { request, gql } from "graphql-request";
import { graphqlEndpoint } from "../../../config/constants/endpoints";
import { getSafeKeepContract } from "../../../config/constants/contractHelpers";
import revealEthErr from "../../../utils/revealEthErr";
import toastify from "../../../utils/toast";

export const getPingsAsync = createAsyncThunk(
  "ping/getPings",
  async (walletAddress) => {
    const pinQuery = gql`
    {
      vaults(where: { owner: "${walletAddress}" }) {
        pings {
          time
        }
      }
    }
  `;

    try {
      const data = await request(graphqlEndpoint, pinQuery);

      const result = data?.vaults[0]?.pings;

      return { result };
    } catch (error) {
      toast.error(revealEthErr(error));
      throw error;
    }
  }
);

export const pingVaultAsync = createAsyncThunk(
  "ping/pingVault",
  async (data, { dispatch }) => {
    const { id } = data;
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
      return { confirmations, time: Date.now() / 1000 };
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
    loaded: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPingsAsync.pending, (state, payload) => {
        state.status = "pending";
      })

      .addCase(getPingsAsync.fulfilled, (state, { payload }) => {
        if (!state.loaded) {
          state.loading = false;
        }
        state.loaded = true;
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
        const newData = [{ time: payload?.time }, ...state.data];
        state.data = newData;
      })
      .addCase(pingVaultAsync.rejected, (state, { payload }) => {
        state.crud = false;
        state.error = payload;
      });
  },
});

export default ping.reducer;
