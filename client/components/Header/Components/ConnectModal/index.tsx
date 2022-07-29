import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { showConnectModal } from "@state/ui";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import useAuth from "@hooks/useAuth";
import {
  ModalContent,
  ModalTrigger,
  Modal,
  ModalCloseButton,
} from "@components/Modal";
import styled from "styled-components";

interface IConnectWalletModal {
  showModal: boolean;
  handleClose?: () => void;
  handleShow?: () => void;
}

export const ConnectWalletModal = ({
  showModal,
  handleClose,
}: IConnectWalletModal) => {
  const {
    connect: connectAuth,
    pendingConnector,
    connectors,
    error,
    isLoading,
  } = useAuth();

  return (
    <>
      <Modal>
        <StyledModalTrigger>
          <TriggerButton>Connect</TriggerButton>
        </StyledModalTrigger>
        <ModalContent>
          <ButtonContainer>
            <StyledClosedButton>
              <ModalCloseButton />
            </StyledClosedButton>
            {/* <div className="d-flex ">
              <h5> Choose to a wallet</h5>
            </div> */}
            <div className="">
              {connectors.map((connector) => (
                <ConnectButton
                  disabled={isLoading || !connector.ready}
                  key={connector.id}
                  onClick={async () => {
                    connectAuth({ connector });
                  }}
                >
                  {connector.name}
                  {!connector.ready && " (unsupported)"}
                  {isLoading &&
                    connector.id === pendingConnector?.id &&
                    "(connecting)"}
                </ConnectButton>
              ))}
              {!!error?.message && (
                <ErrorText>
                  {error?.message ?? "Error Connecting Wallet"}
                </ErrorText>
              )}
            </div>
          </ButtonContainer>
        </ModalContent>
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

export const ButtonContainer = styled.div`
  font-family: clash grotesk regular;
  padding: 40px 60px;
  position: relative;
  font-size: 20px;
  line-height: 27px;
`;

export const StyledClosedButton = styled.div`
  position: absolute;
  top: 10px;
  right: 30px;
`;

export const ConnectButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 5px;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  line-height: 12px;
  font-family: clash grotesk regular;
  text-align: center;
  text-transform: capitalize;
`;

export const TriggerButton = styled.div`
  border: 0.4px solid #ffffff;
  padding: 16px 63px;
  max-width: 243px;
  width: 100%;
  border-radius: 12px;
  background-color: rgba(51, 61, 83, 0.18);
  color: #ffffff;
`;

export const StyledModalTrigger = styled(ModalTrigger)`
  border-width: 0;
  background-color: transparent;
  &:focus {
    border: none;
    border-width: 0;
    outline: none;
  }
  &[data-state="open"] {
    border: none;
    outline: none;
  }
  &[data-state="closed"] {
    border: none;
  }
`;
