import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Col, Row } from "react-bootstrap";
import { editInheritorAliasAsync, allocateEthAsync } from "../../state";
import CustomButton from "../../../../components/Button";
import MDBody from "../../../../components/Modal/ModalBody";
import ModalHeader from "../../../../components/Modal/ModalHeader";
import { FormControl } from "../AddModal/style";
import { hideAllocateSingleEthModal } from "../../../../state/ui";
import { inheritors } from "../../selector";
import { useEffect } from "react";

function AllocateSingleEthModal(props) {
  const { alias, address, ethAllocated} = props;
  const dispatch = useDispatch();
  const { crud } = useSelector(inheritors);
  const {ui:{ allocateSingleEthModal}, vault:{data:{id}} } = useSelector((state) =>state);
  const [userInputs, setUserInputs] = useState(0);

  const handleChange = (e) => {
    setUserInputs(e.target.value);
  };
  const handleModal = () => {
    dispatch(hideAllocateSingleEthModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      _inheritors:[address],
      _ethShares:[String(Number(userInputs)*10**18)],
      _vaultId:id
    };
    dispatch(allocateEthAsync(data))

  };

  useEffect(() => {
    setUserInputs(ethAllocated/(10**18));

    return () => dispatch(hideAllocateSingleEthModal());
  }, [ethAllocated]);

  return (
    <>
      <Modal show={allocateSingleEthModal} onHide={handleModal}>
        <ModalHeader title={`${true ? 'Add Allocation' : 'Update Allocation'}`} />
        <MDBody>
          <Form onSubmit={handleSubmit}>
            <Row className="mx-1 mt-4 mb-4">
              <FormControl
                placeholder="Addres"
                name="alias"
                className="mb-4 text-muted"
                value={address}
                disabled
                style={{ backgroundColor: "transparent" }}
              />

            { alias &&  <FormControl
                placeholder="Alias"
                name="alias"
                value={alias}
                className="text-muted"       
                style={{ backgroundColor: "transparent" }}             
              />}
            </Row>

            <FormControl
                placeholder="Addres"
                name="ethAllocated"
                className="mb-4 text-muted"
                value={ethAllocated}
                disabled ={crud}
                style={{ backgroundColor: "transparent" }}
                onChange={handleChange}
                value = {userInputs}
              />



            <div className="d-flex justify-content-center align-items-center">
              <CustomButton
                disabled={crud}
                text={`${crud ? "Allocating" : "Allocate"}`}
                size="small"
              />
            </div>
          </Form>
        </MDBody>
      </Modal>
    </>
  );
}

export default AllocateSingleEthModal;
