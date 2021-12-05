import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'
import { getSafeKeepContract } from "../../../config/constants/contractHelpers";
import {hideBackupAddressModal, showBackupAddressModal} from '../../../state/ui'


let startAddInheritors;
let endAddInheritors
export const updateBackupAddressAsync = createAsyncThunk(
  "backupAddress/updateBackupAddress",
  async (data, {dispatch}) => {
    const {_vaultId, _newBackup} = data
    const contract = await getSafeKeepContract(true);
    try {
          dispatch(startAddInheritors())
          const response = await contract.transferBackup(_vaultId, _newBackup);
          dispatch(showBackupAddressModal())
            toast.success('backup address submitted successfully')
          response.wait()
          dispatch(hideBackupAddressModal())
          toast.success('backup address changes confirmed')
           return dispatch(endAddInheritors())
          
        } catch (error) {
          toast.error('Something updating your backup address')
          dispatch(endAddInheritors())
          console.log('error', error)
          
        }
  }
);

export const backupAddress = createSlice({
  name: "backupAddress",
  initialState: {
    data: [],
    status: null,
    error: null,
    crud: null,
  },
   
  reducers:{
    startAddingInheritors:(state)=>{
      state.crud=true
    },
    endAddingInheritors:(state)=>{
      state.crud=false
    }
  },
 
});


export const { startAddingInheritors, endAddingInheritors } = backupAddress.actions

startAddInheritors = startAddingInheritors
endAddInheritors = endAddingInheritors


export default backupAddress.reducer;
