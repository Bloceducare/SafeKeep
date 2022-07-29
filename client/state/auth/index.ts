import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SiweMessage } from 'siwe'


export const fetchNonceAsync = createAsyncThunk(
  "auth/fetchNonce",
  async () => {

    try {
     
      const nonceRes = await fetch('/api/nonce')
      const nonce = await nonceRes.text()
     return nonce ;

    } catch (error) { 
        throw new Error(error)  
    }
  }
);
export const fetchUserAsync = createAsyncThunk(
  "auth/fetchUser",
  async () => {
    try {
      const res = await fetch('/api/me') 
      const json = await res.json()
      return {address:json.address}
     
    } catch (error) { 
       throw new Error(error)   
    }
  }
);
export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async () => {

    try {
      await fetch('/api/logout')   

      // const json = await res.json()
      // setState((x) => ({ ...x, address: json.address }))
    } catch (error) { 
    
    }
  }
);

export const verifyNonceAsync = createAsyncThunk(
  "auth/verifyNonce",
  async (data:any) => {
    const {message, signature} = data
    try { 

           // Verify signature
          const verifyRes = await fetch('/api/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, signature }),
          })
         if (!verifyRes.ok) throw new Error('Error verifying message')
         return true

    } catch (error) { 
        throw new Error(error)  
    }
  }
);


export const auth = createSlice({
  name: "auth",
  initialState: {
    nonce:'',
    isLoggingOut:false,
    isAuthenticated:false,
    error:false,
    address:'',
    fetchingUser:false
  },
  reducers: {
    setJwt: (state, { payload }) => {
      state.jwt = payload;
    },

    authenticate:(state)=>{
      state.isAuthenticated =true
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(logoutAsync.pending, (state)=>{
      state.error= false
      state.isLoggingOut=true
    })
    .addCase(logoutAsync.fulfilled, (state)=>{
      state.isLoggingOut = false
      state.address=""
      state.nonce=""
      state.isAuthenticated=false
    })
    .addCase(logoutAsync.rejected, (state)=>{
      state.error= true
      state.isLoggingOut = false
    })
    .addCase(fetchUserAsync.pending, (state)=>{
      state.error= false
      state.fetchingUser = true
    })
    .addCase(fetchUserAsync.fulfilled, (state, {payload})=>{
      state.fetchingUser = false
      state.address = payload.address
    })
    .addCase(fetchUserAsync.rejected, (state)=>{
      
      state.error= true
      state.fetchingUser = true
    })
    .addCase(fetchNonceAsync.pending, (state)=>{
      state.error= false
     // state.fetchingUser = true
    })
    .addCase(fetchNonceAsync.fulfilled, (state, {payload})=>{
      console.log(payload)
    //  state.fetchingUser = false
      state.nonce = payload
    })
    .addCase(fetchNonceAsync.rejected, (state)=>{
      state.error= true
    //  state.fetchingUser = false
    })
    
  }
});

// Action creators are generated for each case reducer function
export const { setJwt, authenticate } = auth.actions;

export default auth.reducer;
