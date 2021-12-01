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
    const { inheritors, _startingBal, _backupAddress } = data;
    const payableAmount = _startingBal;

    try {
      // const response =  await contract.createVault(inheritors, _startingBal, _backupAddress, {value:_startingBal})
      const t = await contract.createVault(
        inheritors,
        _startingBal,
        _backupAddress,
        { value: payableAmount }
      );
      dispatch(hideCreateVaultModal());
      return await t.wait();
    } catch (error) {
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
  async (data, { dispatch }) => {
    const contract = await getSafeKeepContract(true);
    const { _id, tokenDeps, _amounts } = data;

    const abi = [
      "function approve(address _spender, uint256 _value) public returns (bool success)",
    ];

    // const abi =   ["function allowance(address _owner, address _spender) public view returns (uint256 remaining)"]
    try {
      for (let i = 0; i < tokenDeps.length; i++) {
        const contr = getContractInstance(tokenDeps[i], abi);
        await contr.approve(
          "0x3b16c4985dFC8451c0337e68C0ddA52b0FB6b843",
          "100000000000000000000000000000000000000000000000000000000000"
        );

        //  const allow =    await contr.allowance('0xd5635C148df889B6dd89Eaa90eE886f4E733130A','0x3b16c4985dFC8451c0337e68C0ddA52b0FB6b843')
      }

      console.log(_id, tokenDeps, _amounts, "tokenDeps");
      const txn = await contract.depositTokens(_id, tokenDeps, _amounts, {
        from: "0xd5635C148df889B6dd89Eaa90eE886f4E733130A",
      });
      toast.success("Tokens Deposit Successful");
      dispatch(hideDepositWithdrawalModal());
      const despositConfirmation = await txn.wait();

      if (despositConfirmation?.events[0]?.data?.toString()) {
        toast.success(`token deposit confirmed`);
      }

      return dispatch(checkVaultAsync(_id));
    } catch (error) {
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
      const txn = await contract.depositEther(id, amount, { value: amount });
      toast.success("Deposit Successful");
      dispatch(hideDepositWithdrawalModal());
      const despositConfirmation = await txn.wait();

      if (despositConfirmation?.events[0]?.data?.toString()) {
        toast.success(`deposit confirmed`);
      }

      return dispatch(checkVaultAsync(id));
    } catch (error) {
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
      const txn = await contract.withdrawEth(id, amount);
      toast.success("Withdrawal Successful");
      dispatch(hideDepositWithdrawalModal());
      const withdrawalConfirmation = await txn.wait();

      if (withdrawalConfirmation?.events[0]?.data?.toString()) {
        toast.success(`withdrawal confirmed`);
      }

      return dispatch(checkVaultAsync(id));
    } catch (error) {
      toast.error("Withdraw Failed");
      console.log(error, "error");
    }
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
        state.crud = true;
      })
      .addCase(depositERC20TokenAsync.fulfilled, (state, { payload }) => {
        state.crud = false;
      })
      .addCase(depositERC20TokenAsync.rejected, (state, { payload }) => {
        state.crud = false;
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
