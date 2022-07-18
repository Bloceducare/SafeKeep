import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { showConnectModal } from "@state/ui";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import useAuth from "@hooks/useAuth";

interface IConnectWalletModal {
  showModal: boolean;
  handleClose?: () => void;
  handleShow?: () => void;
}

export const ConnectWalletModal = ({
  showModal,
  handleClose,
}: IConnectWalletModal) => {


  const { connect:connectAuth, pendingConnector, connectors, error, isLoading} = useAuth()

  return (
    <>
      <Modal show={showModal} onHide={handleClose} className="text-black ">
        <Modal.Header closeButton>
          <div className="d-flex ">
            <MdOutlineAccountBalanceWallet className="fs-3 mr-3" />{" "}
            <h5> Choose to a wallet</h5>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            {connectors.map((connector) => (
              <button
                disabled={isLoading || !connector.ready}
                key={connector.id}
                className="w-100 text-center d-block border my-2 p-1 btn"
                onClick={async () => {
                  connectAuth({connector})
                 
                }}
              >
                
                {connector.name}
                {!connector.ready && " (unsupported)"}
                {isLoading &&
                  connector.id === pendingConnector?.id &&
                  "(connecting)"}
              </button>
            ))}
            {!!error?.message && <div className="text-danger text-center text-capitalize">{error?.message ?? 'Error Connecting Wallet'}</div>}
          </div>  
        </Modal.Body>
      </Modal>
    </>
  );
};

function ConnectMOdal() {
  const dispatch = useDispatch();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();

  const handleClose = async () => {
    await disconnectAsync();
 
  };
  const handleShow = () => {
    dispatch(showConnectModal());
  };

  const handleAction = () => {
    if (isConnected) return handleClose();
    return handleShow();
  };

  return (
    <>
      <Button variant="secondary" onClick={handleAction}>
        <div>{isConnected ? "Disconnect" : "Connect"}</div>
      </Button>
    </>
  );
}

export default ConnectMOdal;
