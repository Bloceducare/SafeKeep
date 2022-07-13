import { useEffect, useState } from "react";
// import { useMoralis } from "react-moralis";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi"

export const LogoutButton = () => {
  const {  isConnecting:isAuthenticating} = useAccount()
  const  { } = useConnect()
  const  { disconnect:logout } = useDisconnect()
  // const { logout, isAuthenticating } = useMoralis();
  return (
    <button onClick={() => logout()} disabled={isAuthenticating}>
      Logout
    </button>
  );
};

const AuthBtn = () => {
  // const {
  //   authenticate,
  //   isWeb3Enabled,
    // isAuthenticated,
    // user,
  //   enableWeb3,
  //   Moralis,
  // } = useMoralis();

  const { address:user, data:isAuthenticated, isConnecting} = useAccount()
  const {signMessage} = useSignMessage({ message: "Sign in to Safekeep" })

  // async function authWalletConnect() {
  //   const user = authenticate({
  //     provider: "walletconnect",
  //     chainId: 56,
  //     // mobileLinks: [
  //     //   "metamask",
  //     //   "trust",
  //     //   "rainbow",
  //     //   "argent",
  //     //   "imtoken",
  //     //   "pillar",
  //     // ],
  //     signingMessage: "Welcome!",
  //   });
  // }

  useEffect(() => {
    // if (!isWeb3Enabled && isAuthenticated) {
    //   enableWeb3({ provider: "walletconnect", chainId: 56 });
    // }
  }, []);

  // document.addEventListener("visibilitychange", () => {
  //   if (document.visibilityState === "hidden") {
  //     window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
  //   }
  // });

  const _authBtn =
    !isAuthenticated && !user ? (
      <>
        <button
          onClick={() => signMessage()
          }
          type="button"
          className="btn btn-outline-secondary text-white"
        >
          Connect
        </button>
        {/* <button
          onClick={() => authWalletConnect()}
          type="button"
          className="btn btn-outline-secondary text-white mx-2"
        >
          Wallet Connect
        </button> */}
      </>
    ) : (
      <LogoutButton />
    );

  return <>{_authBtn}</>;
};

export default AuthBtn;
