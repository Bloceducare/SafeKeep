// import { useMoralis } from "react-moralis";
import { Modal } from "react-bootstrap";
import { useConnect } from 'wagmi'
function IsAuthenticating() {
  const { isConnecting:isAuthenticating } = useConnect()
  // const { isAuthenticating } = useMoralis();
  return (
    <>
      <Modal show={isAuthenticating}>
        <Modal.Body style={{ color: "black" }}>'isAuthenticating'</Modal.Body>
      </Modal>
    </>
  );
}

export default IsAuthenticating;
