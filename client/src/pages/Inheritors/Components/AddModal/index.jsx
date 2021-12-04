import { useState, Fragment } from "react";
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
import PlusIcon from "../../../../components/PlusIcon";
import Cross from "../../../../components/Cross";

const prevData = [{ _weiShare: "", _newInheritors: "" }];
function AddModal() {
  const dispatch = useDispatch();
  const { crud } = useSelector(inheritors);
  const { createInheritorsModal } = useSelector((state) => state.ui);
  const [userInputs, setUserInputs] = useState(prevData);

  const handleChange = (e, idx) => {
    const { name, value } = e.target;
    const newSelected = [...userInputs];
    newSelected[idx][name] = value;
    setUserInputs(newSelected);
  };

  const handleModal = () => {
    dispatch(hideCreateInheritorsModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  if (!ethers.utils.getAddress(address)) return "invalid wallet address";
    //if (!_weiShare || !_newInheritors) return;
    const share = userInputs.map((item) =>
      ethers.utils.parseEther(item._weiShare)
    );
    const inheritors = userInputs.map((item) => item._newInheritors);
    const data = { share, inheritors };
    dispatch(addInheritorAsync(data));
  };

  const handleAdd = () => {
    setUserInputs([...userInputs, { _weiShare: "", _newInheritors: "" }]);
  };

  const handleRemove = (idx) => {
    const userInputsCopy = [...userInputs];
    userInputsCopy.splice(idx, 1);
    setUserInputs(userInputsCopy);
  };
  return (
    <>
      <Modal show={createInheritorsModal} onHide={handleModal}>
        <ModalHeader title="Add Inheritors" />
        <MDBody>
          <PlusIcon text="Inheritors" onClick={handleAdd} />
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group className="mt-4 mb-4" controlId="formGridAddress2">
    <FormControl placeholder="Paste Address" name ='address' onChange ={handleChange} />
  </Form.Group> */}

            {userInputs.map((item, idx) => {
              return (
                <Fragment key={`${item._newInheritors}-${idx}`}>
                  <Row
                    className="mx-1 mt-4 mb-4"
                    style={{ transform: "translate(-1rem)" }}
                  >
                    <Form.Group as={Col} controlId="formGridPassword">
                      <FormControl
                        placeholder="Paste Address"
                        onChange={(e) => handleChange(e, idx)}
                        name="_newInheritors"
                        value={userInputs[idx]._inheritors}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="formGridPassword"
                      className="relative"
                    >
                      <FormControl
                        placeholder="Eth Share"
                        onChange={(e) => handleChange(e, idx)}
                        name="_weiShare"
                        value={userInputs[idx]._weiShare}
                      />
                      <Cross
                        style={{
                          position: "absolute",
                          right: "-1rem",
                          top: "20%",
                        }}
                        onClick={() => handleRemove(idx)}
                      />
                    </Form.Group>
                  </Row>
                </Fragment>
              );
            })}

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
