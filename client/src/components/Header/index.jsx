import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMoralis } from "react-moralis";

//https://github.com/abdulmalik97/moralis-react-authentication
function Header() {
    const {   authenticate,
        isWeb3Enabled,
        isAuthenticated,
        user,
        enableWeb3,
        Moralis,
     } = useMoralis();
console.log(user, isAuthenticated)

async function authWalletConnect() {
    const user = authenticate({
      provider: "walletconnect",
      chainId: 56,
    //   mobileLinks: [
    //     "metamask",
    //     "trust",
    //     "rainbow",
    //     "argent",
    //     "imtoken",
    //     "pillar",
    //   ],
      signingMessage: "Welcome!",
    });
    console.log(user);
  }

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3({ provider: "walletconnect", chainId: 56 });
      console.log("web3 activated");
    }
  }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    }
  });

  const _authBtn = (
    (!isAuthenticated && !user) ? (
        <>
    <button 
    onClick={() => authenticate({ signingMessage: "Sign in to Safekeep" })}
    type="button" class="btn btn-outline-dark">Connect</button>
    <button  onClick={() => authWalletConnect()} >Wallet</button> 
    </>
    )
     :
    'logout'
  )

    return (  
<nav className="d-flex align-items-center justify-content-between container p-3">

    <div>Logo</div>
    <div>
        <ul className='d-flex list-unstyled align-items-center '>
            <li className='mx-2'>
            <Link to ={'/'}>Home
            </Link>      
            </li>
            <li className='mx-2' >
            <Link to ={'/about'}>About
            </Link>   
            </li>
            <li className='mx-2'>
            <Link to ={'/'}>Roadmap
            </Link>   
            </li>
            <li className='mx-2'>
           {_authBtn}
            </li>
        </ul>
    </div>

</nav>


        
    )
}

export default Header
