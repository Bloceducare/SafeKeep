import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import MDBody from "../Modal/ModalBody";
import ModalHeader from "../Modal/ModalHeader";
import { hideConfirmationModal } from "../../state/ui";
import CustomButton from "../Button";

const ConfirmationModalComponent = (props) => {
  const {
    label = "record",
    children,
    operationInProgrss,
    yesOperation,
    ...others
  } = props;
  const dispatch = useDispatch();
  const { confirmationModal } = useSelector((state) => state.ui);
  const handleModal = () => {
    dispatch(hideConfirmationModal());
  };
  return (
    <div {...others} className="text-center" style={{ textAlign: "center" }}>
      <Modal show={confirmationModal} onHide={handleModal}>
        <ModalHeader title="" />
        <MDBody>
          <p className="my-3 mt-0 text-center text-muted text-3xl">
            <h4>Are you sure you want to delete this {label}</h4>
          </p>
          {children}

          <div className="text-center">
            <CustomButton
              disabled={operationInProgrss}
              onClick={yesOperation}
              className="btn btn-danger"
              text={operationInProgrss ? "Busy" : "Yes"}
            />
            <CustomButton
              disabled={operationInProgrss}
              onClick={handleModal}
              text="No"
            />
          </div>
        </MDBody>
      </Modal>
    </div>
  );
};

export default ConfirmationModalComponent;
