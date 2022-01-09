import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { request, gql } from "graphql-request";
import { getSafeKeepContract } from "../../../config/constants/contractHelpers";
import {
  hideBackupAddressModal,
  showBackupAddressModal,
} from "../../../state/ui";
import { graphqlEndpoint } from "../../../config/constants/endpoints";
import getOwner from "../../../utils/getOwner";
import revealEthErr from "../../../utils/revealEthErr";

export const getBackupAddressAsync = createAsyncThunk(
  "ping/getBackupAddress",
  async (notFirstLoading) => {
    const backupAddressQuery = gql`
    {
      vaults(where: { owner: "${getOwner}" }) {
        backup
        currentBackupTime
        backups   {
          id
          address
          createdAt
        }
      }
    }
  `;

    try {
      const data = await request(graphqlEndpoint, backupAddressQuery);
      console.log(data, "backup data");
      const currentBackup = data?.vaults[0]?.backup;
      const result = data?.vaults[0]?.backups;
      const currentBackupTime = data?.vaults[0]?.currentBackupTime;
      return { notFirstLoading, currentBackup, result, currentBackupTime };
    } catch (error) {
      //  toast.error(revealEthErr(error));
      throw error;
    }
  }
);

let startAddInheritors;
let endAddInheritors;

export const updateBackupAddressAsync = createAsyncThunk(
  "backupAddress/updateBackupAddress",
  async (data, { dispatch }) => {
    const { _vaultId, _newBackup } = data;
    const contract = await getSafeKeepContract(true);
    try {
      dispatch(startAddInheritors());
      const response = await contract.transferBackup(_vaultId, _newBackup);
      dispatch(showBackupAddressModal());
      toast.info("pending -  backup address txn sent to blockchain");
      // dispatch ({type:"CLEAR_BACKUP_ADDRESS_INPUTS"})
      await response.wait();
      dispatch(hideBackupAddressModal());
      toast.success("backup address changes confirmed");
      /**@param boolean
       * @returns {Promise<void>}
       * @description - this is a hack to get the new backup address to show up in the UI without having to refresh the page
       */
      dispatch(getBackupAddressAsync(true)); //prevent page from reloading
      return dispatch(endAddInheritors());
    } catch (error) {
      toast.error("Something happened updating your backup address");
      dispatch(endAddInheritors());
      console.log("error", error);
      throw error;
    }
  }
);

export const backupAddress = createSlice({
  name: "backupAddress",
  initialState: {
    data: [],
    error: null,
    crud: null,
    status: null,
    loading: false,
    currentBackup: "",
    currentBackupTime: "",
  },

  reducers: {
    startAddingInheritors: (state) => {
      state.crud = true;
    },
    endAddingInheritors: (state) => {
      state.crud = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getBackupAddressAsync.pending, (state, { payload }) => {
        if (!payload?.notFirstLoading) {
          state.loading = true;
        }
        state.status = "pending";
      })
      .addCase(getBackupAddressAsync.fulfilled, (state, { payload }) => {
        state.data = payload.result;
        state.currentBackup = payload.currentBackup;
        state.currentBackupTime = payload.currentBackupTime;
        state.loading = false;
        state.status = "success";
      })
      .addCase(getBackupAddressAsync.rejected, (state, payload) => {
        state.error = payload;
        state.loading = false;
        state.status = "rejected";
      });
  },
});

export const { startAddingInheritors, endAddingInheritors } =
  backupAddress.actions;

startAddInheritors = startAddingInheritors;
endAddInheritors = endAddingInheritors;

export default backupAddress.reducer;
