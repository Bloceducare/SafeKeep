import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { SiweMessage } from 'siwe'
import { useAccount, useConnect, useDisconnect, useNetwork, useSignMessage } from 'wagmi'
import {  userSelector, } from "@selectors/index";
import { hideConnectModal } from "@state/ui";
import { fetchNonceAsync, fetchUserAsync, logoutAsync, verifyNonceAsync } from "@state/auth";
import { signMessage } from "config/constants";



const useAuth =()=>{
    const dispatch = useDispatch()
    const router= useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState({message:''})
    
    const { isConnected, address:walletAddress} = useAccount()
    const {disconnectAsync} = useDisconnect()
    const { signMessageAsync } = useSignMessage()
    const {chain:activeChain} = useNetwork()
    const {
        connectors,
        error,
        pendingConnector,
        connectAsync
      } = useConnect();

   // Fetch user when:
  const mounted = useRef(false)
  const { error:loadingError, fetchingUser:loading, nonce} = useSelector(userSelector)

  const handler = async ()=>{
      await dispatch(fetchUserAsync())

  }
  useEffect(() => {
   // if(mounted.current) return;

    // 2. window is focused (in case user logs out of another window)
   window.addEventListener('focus', handler)
   // mounted.current = true
   return () => window.removeEventListener('focus', handler)
  }, [])


  const signIn = useCallback(async (chain, address) => {
      const chainId = chain?.id
         // Create SIWE message with pre-fetched nonce and sign with wallet
        const message = new SiweMessage({
          domain: window.location.host,
          address,
          uri: window.location.origin,
          ...signMessage,
          chainId,
          nonce,
        })

    try {
     
      if (!address || !chainId) return false
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })
      
      const data = {
        signature,
        message 
      }
      // Verify signature
      dispatch(verifyNonceAsync(data))
   return true
    } catch (error) { 
        dispatch(fetchNonceAsync())
        setIsLoading(false)
        return false
    }
  }, [nonce])


    const connect  = async(connector)=>{
        setIsError({message:''})
        setIsLoading(true)
        let userChain;
        let userAccount;
        if(isConnected) {
            userChain = activeChain
            userAccount = walletAddress
        } else {
            const { chain, account } =  await connectAsync(connector)
            userChain = chain
            userAccount = account
           
        }
      
       // login/signup user 
      const result =  await signIn(userChain, userAccount)
      if(!result) {
        setIsError({message:'error connecting wallet'})
        return
      }
       await router.push('/dashboard')
       .then(()=> {
        dispatch(hideConnectModal())
        setIsLoading(false)
       })
     

    }

    useEffect(()=>{
        // fetch Nonce
        dispatch(fetchNonceAsync())
    },[])

    const disconnect =async()=>{
        await disconnectAsync()
        .then(()=> dispatch(logoutAsync()) ) // disconnect wallet then signout user 
        await router.push('/')
     
    }
  
    return {   
        nonce,
        logout:disconnect,
        connect,
        pendingConnector,
        connectors,
        error:isError,
        isLoading,   
    }
}


export default useAuth