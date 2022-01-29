import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { request, gql } from "graphql-request";
import { getSafeKeepContract } from "../../../config/constants/contractHelpers";
import {
  hideAllocateSingleEthModal,
  hideAllocateTokenModal,
  hideConfirmationModal,
  hideCreateInheritorsModal,
  hideEditAliasModal,
} from "../../../state/ui";

import revealEthErr from "../../../utils/revealEthErr";
import toastify from "../../../utils/toast";
import tokenDetails from "../../../utils/tokenDetails";
import {
  graphqlEndpoint,
  simpleBackendEndpoint,
} from "../../../utils/networkConfig";

export const getInheritorsAsync = createAsyncThunk(
  "inheritors/getInheritors",
  async (user, { _, getState }) => {
    const { address } = getState().user;

    const owner = user ?? address;
    const inheritorQuery = gql`
      {
        vaults(where: { owner: "${owner}" }) {
          inheritors {
            id
            ethAllocated
            tokens {id amountAllocated}
            
          }
        }
      }
    `;

    const data =
      graphqlEndpoint() && (await request(graphqlEndpoint(), inheritorQuery));
    if (!data?.vaults[0]?.inheritors) return [];
    const result = await data.vaults[0]?.inheritors;

    try {
      const emptyData = [];
      const emptyTokenData = [];
      for (let i = 0; i < result.length; i++) {
        const el = result[i]?.tokens;
        try {
          const resultArray = await Promise.all(
            el &&
              el.map(async (i) => {
                const token = await tokenDetails(i.id);
                return {
                  id: i.id,
                  amountAllocated: i.amountAllocated,
                  ...token,
                };
              })
          );

          emptyTokenData.push({ ...result[i], tokens: resultArray });
        } catch (error) {
          emptyTokenData.push({
            ...result[i],
            tokens: [
              {
                id: "",
                amountAllocated: 0,
                symbol: "",
                name: "",
                decimals: "",
                address: result[i].id,
              },
            ],
          });
        }
      }

      try {
        for (let i = 0; i < result.length; i++) {
          const element = result[i].id;
          const res = await axios.get(
            `${simpleBackendEndpoint()}inheritor/${element.toLowerCase()}`
          );
          emptyData.push({
            id: res?.data?.data?._id ?? "",
            alias: res?.data?.data?.alias ?? "",
          });
        }
      } catch (error) {
        console.log(error);
        // toast.error("Something went wrong getting your inheritors alias");
      }

      const inheritorsDetails = emptyTokenData.map((item, idx) => {
        return {
          ...item,
          address: item?.id,
          alias: emptyData[idx]?.alias ?? "",
        };
      });

      return inheritorsDetails;
    } catch (error) {
      toastify("error", revealEthErr(error));
      /*eslint-disable */
      throw { ...error, message: "inheritors failed" };
    }
  }
);

export const addInheritorAsync = createAsyncThunk(
  "inheritors/addInheritors",
  async (data, { dispatch, getState }) => {
    const userInfo = [];
    const contract = await getSafeKeepContract(true);
    const id = getState().vault.data.id;
    const owner = getState().user.address;
    const { share, inheritors, alias } = data;

    const aliasData = inheritors.map((inheritor, idx) => {
      return {
        alias: alias[idx],
        address: inheritor,
        ethAllocated: Number(share[idx]),
      };
    });

    try {
      const tx = await contract.addInheritors(id, inheritors, share);

      toastify("info", "pending  - txn sent to blockchain");
      dispatch(hideCreateInheritorsModal());
      const confirmations = await tx.wait();
      try {
        const response = await axios.post(
          `${simpleBackendEndpoint()}users/inheritors`,
          {
            data: aliasData,
            id: owner,
            ethAllocated: share,
          }
        );

        userInfo.push(response.data.data);
      } catch (error) {
        toastify("error", "inheritor alias submission failed");
        console.log(error);
      }
      toastify(
        "success",
        "inheritors submission confirmed 🚀",
        confirmations.transactionHash
      );

      const modifiedData = aliasData.map((item, idx) => {
        let id = userInfo[0][idx]?.id ?? "";
        return {
          ...item,
          id,
        };
      });
      return modifiedData;
    } catch (error) {
      if (error?.code === 4001) {
        toastify("error", error?.message);
      }

      if (
        revealEthErr(error).includes(
          "one or more of the addresses is already an active inheritor"
        )
      ) {
        toastify(
          "error",
          "one or more of the addresses is already an active inheritor"
        );
      }

      console.log(revealEthErr(error));
    }
  }
);

export const deleteInheritorAsync = createAsyncThunk(
  "inheritors/deleteInheritor",
  async (data, { dispatch }) => {
    const contract = await getSafeKeepContract(true);
    const { _vaultId, _inheritors, ids } = data;

    try {
      const tx = await contract.removeInheritors(_vaultId, _inheritors);
      toastify("info", "pending  - txn sent to blockchain");
      dispatch(hideConfirmationModal());
      const confirmations = await tx.wait();
      try {
        await axios.post(`${simpleBackendEndpoint}inheritor/delete`, {
          address: ids,
        });
      } catch (error) {
        toastify("error", "inheritor alias deletion failed");
        console.log(error);
      }

      toastify(
        "success",
        "inheritor deleted succefully 🚀",
        confirmations.transactionHash
      );

      return ids;
    } catch (error) {
      if (
        revealEthErr(error).includes(
          "one or more inheritor is already removed or does not exist"
        )
      ) {
        toastify(
          ("error",
          "one or more inheritor is already removed or does not exist")
        );
        return;
      }

      toastify("error", revealEthErr(error));
      console.log(error);
      if (revealEthErr(error).includes("transaction failed ")) {
        toastify("error", "transaction failed");
      }
    }
  }
);

export const editInheritorAliasAsync = createAsyncThunk(
  "inheritors/editInheritorAlias",
  async (data, { dispatch }) => {
    const { address, alias } = data;
    try {
      const result = await axios.put(`${simpleBackendEndpoint}inheritor/edit`, {
        address,
        alias,
      });

      dispatch(hideEditAliasModal());
      toastify("success", `${result?.data?.message}`);

      return { address, alias };
    } catch (error) {
      toastify("error", "error updating alias");
    }
  }
);

export const allocateEthAsync = createAsyncThunk(
  "inheritors/allocateEth",
  async (data, { dispatch }) => {
    const contract = await getSafeKeepContract(true);
    const { _vaultId, _inheritors, _ethShares } = data;

    try {
      const tx = await contract.allocateEther(
        _vaultId,
        _inheritors,
        _ethShares
      );

      dispatch(hideAllocateSingleEthModal());
      toastify("info", "pending  - txn sent to blockchain");

      const confirmations = await tx.wait();

      toastify(
        "success",
        "Eth allocated successfully 🚀",
        confirmations.transactionHash
      );

      return { _inheritors, _ethShares };
    } catch (error) {
      if (revealEthErr(error).includes("you are not the vault owner")) {
        return toastify(("error", "You are not the vault owner"));
      }

      toastify(("error", revealEthErr(error)));
    }
  }
);

export const allocateTokensAsync = createAsyncThunk(
  "inheritors/allocateTokens",
  async (data, { dispatch }) => {
    const contract = await getSafeKeepContract(true);
    const { _vaultId, _inheritors, _shares, tokenAdd } = data;

    try {
      const tx = await contract.allocateTokens(
        _vaultId,
        tokenAdd,
        _inheritors,
        _shares
      );
      dispatch(hideAllocateTokenModal());
      toastify("info", "pending  - txn sent to blockchain");
      const confirmations = await tx.wait();
      toastify(
        "success",
        "Tokens allocated successfully 🚀",
        confirmations.transactionHash
      );

      const { name, symbol, address, decimals } = await tokenDetails(tokenAdd);
      const modifiedShares = _inheritors.map((item) => Number(item * 10 ** 18));
      const tokenInfo = {
        address,
        symbol,
        name,
        shares: Number([_shares].toString()),
        decimals,
      };

      return { _inheritors, _shares: modifiedShares, tokenAdd, tokenInfo };
    } catch (error) {
      if (revealEthErr(error).includes("you are not the vault owner")) {
        return toastify(("error", "You are not the vault owner"));
      }

      toastify(("error", revealEthErr(error)));
    }
  }
);

export const inheritors = createSlice({
  name: "inheritors",
  initialState: {
    data: [{ address: "", alias: "", tokens: [], ethAllocated: 0 }],
    status: null,
    error: null,
    crud: null,
    loaded: null,
    loading: true,
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle crud state as needed
    builder
      .addCase(addInheritorAsync.pending, (state) => {
        state.crud = true;
      })
      .addCase(addInheritorAsync.fulfilled, (state, { payload }) => {
        if (payload) {
          let newData = [...state.data, ...payload];
          state.data = newData;
        }
        state.crud = false;
      })
      .addCase(addInheritorAsync.rejected, (state) => {
        state.crud = false;
      })
      .addCase(deleteInheritorAsync.pending, (state) => {
        state.crud = true;
      })
      .addCase(deleteInheritorAsync.fulfilled, (state, { payload }) => {
        let newDataCopy = [...state.data];
        if (payload) {
          payload.forEach((el) => {
            newDataCopy = newDataCopy.filter((item) => item.id !== el);
          });

          state.data = newDataCopy;
        }
        state.crud = false;
      })
      .addCase(getInheritorsAsync.pending, (state) => {
        if (!state.loaded) {
          // state.loading = true;
        }
        state.status = "pending";
      })
      .addCase(getInheritorsAsync.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.status = "success";
        state.loading = false;
        state.loaded = true;
      })
      .addCase(getInheritorsAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = "rejected";
        //  state.error = payload?.message;
      })
      .addCase(editInheritorAliasAsync.pending, (state) => {
        state.crud = true;
        state.status = "pending";
      })
      .addCase(editInheritorAliasAsync.fulfilled, (state, { payload }) => {
        if (payload) {
          let newData = [...state.data].map((item) => {
            let alias =
              payload.address === item.address ? payload.alias : item.alias;
            return {
              ...item,
              alias,
            };
          });

          state.data = newData;
        }
        state.crud = false;
        state.status = "success";
      })
      .addCase(editInheritorAliasAsync.rejected, (state) => {
        state.crud = false;
        state.status = "rejected";
      })
      .addCase(allocateEthAsync.pending, (state) => {
        state.crud = true;
        state.status = "pending";
      })
      .addCase(allocateEthAsync.fulfilled, (state, { payload }) => {
        if (payload) {
          payload._inheritors.forEach((inh, i) => {
            let newData = [...state.data].map((item) => {
              let ethAllocated =
                inh === item.address
                  ? payload._ethShares[i]
                  : item.ethAllocated;
              return {
                ...item,
                ethAllocated,
              };
            });

            state.data = newData;
          });
        }
        state.crud = false;
        state.status = "success";
      })
      .addCase(allocateEthAsync.rejected, (state, { payload }) => {
        state.crud = false;
        state.status = "rejected";
      })
      .addCase(allocateTokensAsync.pending, (state) => {
        state.crud = true;
        state.status = "pending";
      })
      .addCase(allocateTokensAsync.fulfilled, (state, { payload }) => {
        if (payload) {
          const {
            tokenInfo: { address, shares },
          } = payload;
          let em = [];
          let copy = [...state.data];
          for (let i = 0; i < copy.length; i++) {
            const el = copy[i];
            let c = el.tokens.map((e, ix) => {
              let amt = e.id === address ? shares : e.amountAllocated;
              return {
                ...e,
                amountAllocated: amt,
              };
            });
            em.push({ ...el, tokens: c });
          }
          state.data = em;
        }
        state.crud = false;
        state.status = "success";
      })
      .addCase(allocateTokensAsync.rejected, (state, { payload }) => {
        state.crud = false;
        state.status = "rejected";
      });
  },
});

export default inheritors.reducer;
