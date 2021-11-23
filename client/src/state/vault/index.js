import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import { getSafeKeepContract } from '../../config/constants/contractHelpers'


export const checkVaultAsync = createAsyncThunk(
    'vault/getUserVaultDetails',
    async (id)=>{ 
    const contract = await getSafeKeepContract()
    const response =  await contract.checkVault(id)
    return response;
    }
)

export const checkVaultIdAsync = createAsyncThunk(
    'vault/getVaultId',
    async (address)=>{
    const contract = await getSafeKeepContract()
    const response =  await contract.checkOwnerVault(address)
    return response.toString();
    }
)





export const vault = createSlice({
    name:'vault',
    initialState:{
        data:[],
        status:null,
        error:null,
        crud:null,
        id:null,
        idError:null
    },

    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
        .addCase(checkVaultAsync.pending, (state) => {
         state.crud =true
        })
        .addCase(checkVaultAsync.fulfilled, (state, {payload}) => {
       
           state.data=[...payload]
           state.crud = false
        })
        .addCase(checkVaultAsync.rejected, (state) => {
            state.crud = false    
        })

        //vault id reducers
        .addCase(checkVaultIdAsync.pending, (state) => {
        // state.crud =true
        })
        .addCase(checkVaultIdAsync.fulfilled, (state, {payload}) => {
           state.id = payload
        })
        .addCase(checkVaultIdAsync.rejected, (state, {payload}) => {
           state.idError =   payload
        })


       
    }

})

export default vault.reducer;