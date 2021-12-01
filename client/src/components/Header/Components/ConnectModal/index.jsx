import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMoralis } from "react-moralis";
import { Button, Modal } from "react-bootstrap";
import Metamask from "../../../../assets/metamaskIcon.svg";
import WalletConnect from "../../../../assets/walletConnectIcon.svg";
import { Wallet } from "./style";
import { connectModalStatus } from "../../../../selectors";
import { showConnectModal, hideConnectModal } from "../../../../state/ui";

function ConnectMOdal() {
  const dispatch = useDispatch();
  const { authenticate, isWeb3Enabled, isAuthenticated, enableWeb3 } =
    useMoralis();

  const showModal = useSelector(connectModalStatus);
  async function authWalletConnect() {
    // const user = authenticate({
    //   provider: "walletconnect",
    //   chainId: 56,
    //   // mobileLinks: [
    //   //   "metamask",
    //   //   "trust",
    //   //   "rainbow",
    //   //   "argent",
    //   //   "imtoken",
    //   //   "pillar",
    //   // ],
    //   signingMessage: "Welcome!",
    // });
  }

  const handleClose = () => {
    dispatch(hideConnectModal());
  };
  const handleShow = () => {
    dispatch(showConnectModal());
  };

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

  const handleConnect = (type) => {
    if (type === "metamask") {
      authenticate({ signingMessage: "Sign in to Safekeep" });
    }

    if (type === "walletconnect") {
      authWalletConnect();
    }
    handleClose();
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Connect
      </Button>
      <Modal show={showModal} onHide={handleClose} className="text-black">
        <Modal.Header closeButton>
          <h5> Connect to a wallet</h5>
        </Modal.Header>
        <Modal.Body>
          <div onClick={() => handleConnect("metamask")}>
            <Wallet>
              <div className="p-0">
                <h5>Metamask</h5>
              </div>
              <div>
                <img src={Metamask} alt="metamask" width="30" />
              </div>
            </Wallet>
          </div>
          <div onClick={() => handleConnect("walletconnect")}>
            <Wallet>
              <div>
                <h5>Wallet connect</h5>
              </div>
              <div>
                <img src={WalletConnect} alt="walletconnect" width="30" />
              </div>
            </Wallet>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ConnectMOdal;
