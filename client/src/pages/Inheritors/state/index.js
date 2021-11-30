import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { getSafeKeepContract } from '../../../config/constants/contractHelpers'


export const addInheritorAsync = createAsyncThunk(
    'inheritors/addInheritors',
    async (data)=>{ 
    const contract = await getSafeKeepContract()
    const response =  await contract.addInheritors(data)
    return response;
    }
)

export const inheritors = createSlice({
    name:'inheritors',
    initialState:{
        data:[],
        status:null,
        error:null,
        crud:null,
   
    },

    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle crud state as needed
        builder
        .addCase(addInheritorAsync.pending, (state) => {
         state.crud =true
        })
        .addCase(addInheritorAsync.fulfilled, (state, {payload}) => {
           state.crud = false
        })
        .addCase(addInheritorAsync.rejected, (state) => {
            state.crud = false    
        })
       
    }

})

export default inheritors.reducer;