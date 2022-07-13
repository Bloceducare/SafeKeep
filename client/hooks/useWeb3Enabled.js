import { useState, useEffect, useCallback } from "react";

export default function useWeb3Enabled() {
  const [web3Enabled, setWeb3Enabled] = useState(null);

  const checkWeb3 = useCallback(async () => {
    // if (
    //   typeof window.ethereum !== "undefined" ||
    //   typeof window.web3 !== "undefined"
    // ) {
    //   return setWeb3Enabled(true);
    // }

    return setWeb3Enabled(true);
  }, []);
  useEffect(() => {
    checkWeb3();
  }, [checkWeb3]);

  return web3Enabled;
}
