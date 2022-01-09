import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Col, Row } from "react-bootstrap";
import { editInheritorAliasAsync } from "../../state";
import CustomButton from "../../../../components/Button";
import MDBody from "../../../../components/Modal/ModalBody";
import ModalHeader from "../../../../components/Modal/ModalHeader";
import { FormControl } from "../AddModal/style";
import { hideEditAliasModal } from "../../../../state/ui";
import { inheritors } from "../../selector";
import { useEffect } from "react";

function EditAliasModal(props) {
  const { alias, address, aliasNotAvailable } = props;
  const dispatch = useDispatch();
  const { crud } = useSelector(inheritors);
  const { editAliasModal } = useSelector((state) => state.ui);
  const [userInputs, setUserInputs] = useState("");

  const handleChange = (e) => {
    setUserInputs(e.target.value);
  };
  const handleModal = () => {
    dispatch(hideEditAliasModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      alias: userInputs,
      address,
    };
    dispatch(editInheritorAliasAsync(data));
  };

  useEffect(() => {
    setUserInputs(alias);

    return () => dispatch(hideEditAliasModal());
  }, [alias]);

  return (
    <>
      <Modal show={editAliasModal} onHide={handleModal}>
        <ModalHeader title={`${aliasNotAvailable ? 'Add Alias' : ' Edit Alias'}`} />
        <MDBody>
          <Form onSubmit={handleSubmit}>
            <Row className="mx-1 mt-2 mb-2">
              <FormControl
                placeholder="Addres"
                name="alias"
                className="mb-4 text-muted"
                value={address}
                disabled
                style={{ backgroundColor: "transparent" }}
              />

              <FormControl
                placeholder="Alias"
                name="alias"
                value={userInputs}
                className="text-muted"
                onChange={handleChange}
                disabled={crud}
              />
            </Row>

            <div className="d-flex justify-content-center align-items-center">
              <CustomButton
                disabled={crud}
                text={`${crud ? "Saving" : "Save"}`}
                size="small"
              />
            </div>
          </Form>
        </MDBody>
      </Modal>
    </>
  );
}

export default EditAliasModal;
