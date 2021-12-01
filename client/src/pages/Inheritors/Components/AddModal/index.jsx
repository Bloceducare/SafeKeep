import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import { Modal, Form, Col, Row } from "react-bootstrap";
import { addInheritorAsync } from "../../state";
import CustomButton from "../../../../components/Button";
import MDBody from "../../../../components/Modal/ModalBody";
import ModalHeader from "../../../../components/Modal/ModalHeader";
import { FormControl } from "./style";
import { hideCreateInheritorsModal } from "../../../../state/ui";
import { inheritors } from "../../selector";

const prevData = [{ _weiShare: "", _newInheritors: "" }];
function AddModal() {
  const dispatch = useDispatch();
  const { crud } = useSelector(inheritors);
  const { createInheritorsModal } = useSelector((state) => state.ui);
  const [userInputs, setUserInputs] = useState(prevData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInputs({ ...userInputs, [name]: value });
  };

  const handleModal = () => {
    dispatch(hideCreateInheritorsModal());
  };

  const handleSubmit = (e) => {
    const { address, weiShare } = userInputs;
    e.preventDefault();
    if (!ethers.utils.getAddress(address)) return "invalid wallet address";
    if (!weiShare || !address) return;
    dispatch(addInheritorAsync(userInputs));
  };

  return (
    <>
      <Modal show={createInheritorsModal} onHide={handleModal}>
        <ModalHeader title="Add Inheritors" />
        <MDBody>
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group className="mt-4 mb-4" controlId="formGridAddress2">
    <FormControl placeholder="Paste Address" name ='address' onChange ={handleChange} />
  </Form.Group> */}

            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridPassword">
                <FormControl
                  type="number"
                  placeholder="Paste Address"
                  onChange={handleChange}
                  name="wei-share"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <FormControl
                  type="number"
                  placeholder="Eth Share"
                  onChange={handleChange}
                  name="wei-share"
                />
              </Form.Group>
            </Row>

            <div className="d-flex justify-content-center align-items-center">
              <CustomButton
                disabled={crud}
                text={`${crud ? "Loading..." : "Allocate"}`}
                size="small"
              />
            </div>
          </Form>
          <p className="my-3 mt-4 text-center text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tem Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tem
          </p>
        </MDBody>
      </Modal>
    </>
  );
}

export default AddModal;
