import { useEffect, useState } from "react";
// import { useMoralis } from "react-moralis";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";

export const LogoutButton = () => {
  const { isConnecting: isAuthenticating } = useAccount();
  const {} = useConnect();
  const { disconnect: logout } = useDisconnect();

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

  const { address: user, data: isAuthenticated, isConnecting } = useAccount();
  const { signMessage } = useSignMessage({ message: "Sign in to Safekeep" });

  useEffect(() => {}, []);

  const _authBtn =
    !isAuthenticated && !user ? (
      <>
        <button
          onClick={() => signMessage()}
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
