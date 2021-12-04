import { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMoralis } from 'react-moralis'
import { ethers } from "ethers";
import { createVaultAsync } from "../../../state";
import { Modal, Form, Col, Row} from "react-bootstrap";
import CustomButton from "../../../../../components/Button";
import MDBody from "../../../../../components/Modal/ModalBody";
import ModalHeader from "../../../../../components/Modal/ModalHeader";
import { FormControl } from "./style";
import MultiSelect from "./MultiSelect";
import { hideCreateVaultModal } from "../../../../../state/ui";
import { vault, } from "../../../selectors";
import { toast, ToastContainer } from "react-toastify";
// import validEthAddress from "../../../../../utils/validEthAddress";


function CreateVaultModal() {
  const { user } = useMoralis();
  const walletAddress = user?.get("ethAddress");

  const dispatch = useDispatch();
  const { createVaultModal } = useSelector((state) => state.ui);
  const {
    data: { backup, inheritors: inh, id },
    crud
  } = useSelector(vault);
  const [userInputs, setUserInputs] = useState({});
  const [fieldError, setFieldError] = useState({})
  //const [addressArray, setAddressArray] = useState([{}])

  // const normalizeInput = () => {
  //   if(id ==='0') return []
  //   const result =
  //     inh &&
  //     inh.map((i) => {
  //       return {
  //         label: i,
  //         value: i,
  //       };
  //     });

  //   //setAddressArray(result)
  //   return result ?? [];
  // };

  useEffect(() => {
    setUserInputs({
      inheritors: id==='0'  ? [] : inh ? inh.map(i=> { return { label:i, value:i }}):[],
      _startingBal: "",
      _backupAddress:   id ==='0' ? '': backup,
    });
  }, [inh, backup, id]);

  const handleHideModal = () => dispatch(hideCreateVaultModal());


  const valid = (name, value)=>{
    setFieldError({...fieldError, [name]:value})
    return fieldError?.name
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInputs({ ...userInputs, [name]: value });
    valid(name, value)
  };

  const handleInheritors = (value) => {
    for (let i = 0; i < value.length; i++) {
      if (!value[i].value) return;
    }
    setUserInputs({ ...userInputs, inheritors: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { inheritors, _startingBal, _backupAddress } = userInputs;
     if(!_startingBal || !inheritors.length || !_backupAddress) return;
    for (let i = 0; i < inheritors.length; i++) {
    
    }
    const check =ethers?.utils?.getAddress(_backupAddress)
    if (!check)return toast.error("invalid backup wallet address");

    const inherit = inheritors.map((item) => item.value);

    const data = {
      ...userInputs,
      inheritors:inherit, 
     _startingBal: _startingBal && ethers?.utils?.parseEther(_startingBal),
      walletAddress
    };
   
    dispatch(createVaultAsync(data));
  };

 

  return (
    <>
      <ToastContainer />
      <Modal show={createVaultModal} onHide={handleHideModal}>
        <ModalHeader title="Create Vault" />
        <MDBody>
          <form onSubmit={handleSubmit}>

            <h6 className ='text-center' > 🎉 Create a vault to get started! 🎉 </h6>
            <Row className="my-4">
              <Form.Group as={Col} controlId="formGridPassword">
                <FormControl
                  placeholder="Starting Balance"
                  onChange={handleChange}
                  name="_startingBal"
                required
                />
              {/* <Form.Control.Feedback type="invalid">
    Please choose a username.
  </Form.Control.Feedback> */}
              </Form.Group>
            </Row>

            <Form.Group className="mt-4 mb-4" controlId="formGridAddress2">
              <FormControl
                placeholder="Backup Address"
                name="_backupAddress"
                onChange={handleChange}
                value={userInputs._backupAddress}
              />
            </Form.Group>

            <MultiSelect
              setChange={handleInheritors}
              options={userInputs?.inheritors}
              name="inheritors"
            />

            <div className="d-flex justify-content-center align-items-center">
              <CustomButton
                disabled={crud}
                text={crud ? "Creating" : "Create Vault"}
                size="small"
                style ={{
                  padding:'0.4rem 1rem'
                }}
              />
            </div>
          </form>
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

export default CreateVaultModal;
