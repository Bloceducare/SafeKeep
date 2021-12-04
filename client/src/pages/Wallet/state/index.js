import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formatVaultData } from "../../../utils/formatBigNumberToString";
import {
  getContractInstance,
  getSafeKeepContract,
} from "../../../config/constants/contractHelpers";
import {
  hideCreateVaultModal,
  hideDepositWithdrawalModal,
} from "../../../state/ui";
import { toast } from "react-toastify";
import { getSafeKeepAddress } from "../../../utils/addressHelper";
import {
  startApproving,
  endApproving,
  startDepositing,
  endDepositing,
  startWithdrawing,
  endWithdrawing,
} from "../../../state/shared";

export const getUserWalletAsset = createAsyncThunk(
  "wallet/getUserWalletAsset",
  async (payload) => {
    return payload;
  }
);

export const checkVaultIdAsync = createAsyncThunk(
  "vault/getVaultId",
  async (address) => {
    const contract = await getSafeKeepContract();
    const response = await contract.checkOwnerVault(address);
    return response.toString();
  }
);

export const getNativeAsync = createAsyncThunk(
  "tokenPrice/getTokenPrice",
  async (data, { dispatch }) => {
    //  const contract = await getSafeKeepContract(true)
    //dispatch an action to hide modal
    //  const {inheritors, _startingBal, _backupAddress} = data
    //  const payableAmount = _startingBal

    try {
      // const response =  await contract.createVault(inheritors, _startingBal, _backupAddress, {value:_startingBal})
      //    const t = await contract.createVault(inheritors, _startingBal, _backupAddress, {value:payableAmount})
      dispatch(hideCreateVaultModal());
      //    return await t.wait();
    } catch (error) {
      console.log(error, "error");
    }
  }
);

export const createVaultAsync = createAsyncThunk(
  "vault/createVault",
  async (data, { dispatch }) => {
    const contract = await getSafeKeepContract(true);
    //dispatch an action to hide modal
    const { inheritors, _startingBal, _backupAddress, walletAddress } = data;
    const payableAmount = _startingBal;

    try {
      const t = await contract.createVault(
        inheritors,
        _startingBal,
        _backupAddress,
        { value: payableAmount }
      );
      toast.success("vault created pending for confirmation");
      dispatch(hideCreateVaultModal());
      await t.wait();
      toast.success("vault creation confirmed");
      dispatch(checkVaultIdAsync(walletAddress));
      return;
    } catch (error) {
      toast.error("Something happened while creating vault");
      console.log(error, "error");
    }
  }
);

export const checkVaultAsync = createAsyncThunk(
  "vault/getUserVaultDetails",
  async (id) => {
    const contract = await getSafeKeepContract();
    const response = await contract.checkVault(id);
    return response;
  }
);

export const depositERC20TokenAsync = createAsyncThunk(
  "vault/depositTokens",
  async (data, { dispatch, getState }) => {
    const contract = await getSafeKeepContract(true);
    const { _id, tokenDeps, _amounts } = data;

    const abi = [
      "function approve(address _spender, uint256 _value) public returns (bool success)",
    ];

    const abiAllowance = [
      "function allowance(address _owner, address _spender) public view returns (uint256 remaining)",
    ];

    try {
      dispatch(startDepositing());
      for (let i = 0; i < tokenDeps.length; i++) {
        const contrAllowance = getContractInstance(tokenDeps[i], abiAllowance);
        const { vault } = getState(); //get vault owner address to check allowance
        const safeKeepContractAddress = getSafeKeepAddress();
        const allowance = await contrAllowance.allowance(
          vault.data.owner,
          safeKeepContractAddress
        );

        //convert allowwance to number
        const allowed = Number(allowance.toString());
        if (allowed <= 0) {
          dispatch(startApproving());
          //show approving to ui
          //dispatch approving txn
          const contr = getContractInstance(tokenDeps[i], abi);

          //try and catch to end all process if one tkoen is disapproved
          try {
            const approveTransaction = await contr.approve(
              safeKeepContractAddress,
              "1000000000000000000000000000000000000000000000000000000000000000"
            );
            const confirmApprove = await approveTransaction.wait();

            if (confirmApprove?.events[0]?.data?.toString()) {
              toast.success("Approved successfully");
            }

            dispatch(endApproving());
          } catch (error) {
            dispatch(endDepositing());
            return dispatch(endApproving());
          }
        }
      }

      const txn = await contract.depositTokens(_id, tokenDeps, _amounts);
      toast.success("Tokens Deposit Successful");
      dispatch(hideDepositWithdrawalModal());
      const despositConfirmation = await txn.wait();

      if (despositConfirmation?.events[0]?.data?.toString()) {
        toast.success(`token deposit confirmed`);
      }

      return dispatch(checkVaultAsync(_id));
    } catch (error) {
      dispatch(endDepositing());
      toast.error(error.TokenDeposit);
      console.log(error, "error");
    }
  }
);

export const depositEtherAsync = createAsyncThunk(
  "vault/depositEther",
  async (data, { dispatch }) => {
    const contract = await getSafeKeepContract(true);

    const { id, amount } = data;

    try {
      dispatch(startDepositing());
      const txn = await contract.depositEther(id, amount, { value: amount });
      toast.success("Deposit Successful");
      dispatch(hideDepositWithdrawalModal());
      const despositConfirmation = await txn.wait();

      if (despositConfirmation?.events[0]?.data?.toString()) {
        toast.success(`deposit confirmed`);
      }
      dispatch(endDepositing());
      return dispatch(checkVaultAsync(id));
    } catch (error) {
      dispatch(endDepositing());
      toast.error("Deposit Failed");
      console.log(error, "error");
    }
  }
);
export const withdrawEtherAsync = createAsyncThunk(
  "vault/withdrawEther",
  async (data, { dispatch }) => {
    const contract = await getSafeKeepContract(true);

    const { id, amount } = data;

    try {
      dispatch(startWithdrawing());
      const txn = await contract.withdrawEth(id, amount);
      toast.success("Withdrawal Successful");
      dispatch(hideDepositWithdrawalModal());
      const withdrawalConfirmation = await txn.wait();

      if (withdrawalConfirmation?.events[0]?.data?.toString()) {
        toast.success(`withdrawal confirmed`);
      }

      dispatch(checkVaultAsync(id));
      return dispatch(endWithdrawing());
    } catch (error) {
      dispatch(endWithdrawing());
      toast.error("Withdraw Failed");
      console.log(error, "error");
    }
  }
);

export const vault = createSlice({
  name: "vault",
  initialState: {
    data: [],
    status: null,
    error: null,
    crud: null,
    id: null,
    idError: null,
    receipt: null,
    createError: null,
    fetchError: null,
    loading: null,
    userAssets: [],
  },

  reducers: {
    clearCreateError: (state) => {
      state.createError = null;
    },
    clearFetchError: (state) => {
      state.fetchError = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      //create vault
      .addCase(createVaultAsync.pending, (state) => {
        state.crud = true;
      })

      .addCase(createVaultAsync.fulfilled, (state, { payload }) => {
        state.receipt = payload;
        state.crud = false;
      })
      .addCase(createVaultAsync.rejected, (state, { payload }) => {
        state.createError = payload;
      })
      //deposit ether to vault
      .addCase(depositEtherAsync.pending, (state) => {
        state.crud = true;
      })
      .addCase(depositEtherAsync.fulfilled, (state, { payload }) => {
        state.crud = false;
      })
      .addCase(depositEtherAsync.rejected, (state, { payload }) => {
        state.crud = false;
      })
      //deposit tokens to vault
      .addCase(depositERC20TokenAsync.pending, (state) => {
        //  state.crud = true;
      })
      .addCase(depositERC20TokenAsync.fulfilled, (state, { payload }) => {
        //  state.crud = false;
      })
      .addCase(depositERC20TokenAsync.rejected, (state, { payload }) => {
        //  state.crud = false;
      })

      //withdraw ether from vault
      .addCase(withdrawEtherAsync.pending, (state) => {
        state.crud = true;
      })
      .addCase(withdrawEtherAsync.fulfilled, (state, { payload }) => {
        state.crud = false;
      })
      .addCase(withdrawEtherAsync.rejected, (state, { payload }) => {
        state.crud = false;
      })

      .addCase(checkVaultAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkVaultAsync.fulfilled, (state, { payload }) => {
        state.data = formatVaultData(payload);
        state.loading = false;
      })
      .addCase(checkVaultAsync.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getUserWalletAsset.fulfilled, (state, { payload }) => {
        state.userAssets = payload;
      })

      //vault id reducers
      .addCase(checkVaultIdAsync.pending, (state) => {
        // state.crud =true
      })
      .addCase(checkVaultIdAsync.fulfilled, (state, { payload }) => {
        state.id = payload;
      })
      .addCase(checkVaultIdAsync.rejected, (state, { payload }) => {
        state.idError = payload;
      });
  },
});

export const { clearCreateError } = vault.actions;
export default vault.reducer;
