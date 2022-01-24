import { Modal } from "react-bootstrap";
import MDBody from "../Modal/ModalBody";
import ModalHeader from "../Modal/ModalHeader";

const TransactionDetailsModalComp = (props) => {
  const { showModal, currentData, hideModal } = props;

  console.log("curret Data dfdfd", currentData);
  return (
    <div className="text-center" style={{ textAlign: "center" }}>
      <Modal show={showModal} onHide={hideModal}>
        <ModalHeader title="Transaction Details" />
        <MDBody>
          Txn Details
          <div className="text-center"></div>
        </MDBody>
      </Modal>
    </div>
  );
};

export default TransactionDetailsModalComp;
