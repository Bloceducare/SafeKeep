import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export const LogoutButton = () => {
  const { logout, isAuthenticating } = useMoralis();
  return (
    <button onClick={() => logout()} disabled={isAuthenticating}>
      Logout
    </button>
  );
};

const AuthBtn = () => {
  const {
    authenticate,
    isWeb3Enabled,
    isAuthenticated,
    user,
    enableWeb3,
    Moralis,
  } = useMoralis();

  async function authWalletConnect() {
    const user = authenticate({
      provider: "walletconnect",
      chainId: 56,
      // mobileLinks: [
      //   "metamask",
      //   "trust",
      //   "rainbow",
      //   "argent",
      //   "imtoken",
      //   "pillar",
      // ],
      signingMessage: "Welcome!",
    });
  }

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3({ provider: "walletconnect", chainId: 56 });
    }
  }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    }
  });

  const _authBtn =
    !isAuthenticated && !user ? (
      <>
        <button
          onClick={() =>
            authenticate({ signingMessage: "Sign in to Safekeep" })
          }
          type="button"
          class="btn btn-outline-secondary text-white"
        >
          Connect
        </button>
        <button
          onClick={() => authWalletConnect()}
          type="button"
          class="btn btn-outline-secondary text-white mx-2"
        >
          Wallet Connect
        </button>
      </>
    ) : (
      <LogoutButton />
    );

  return <>{_authBtn}</>;
};

export default AuthBtn;
