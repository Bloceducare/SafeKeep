import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { ethers } from 'ethers';
import {createVaultAsync} from '../../../state'
import {Modal, Form,Col, Row} from 'react-bootstrap'
import CustomButton from '../../../../../components/Button';
import MDBody from '../../../../../components/Modal/ModalBody'
import ModalHeader from '../../../../../components/Modal/ModalHeader';
import {FormControl} from './style'
import MultiSelect from './MultiSelect';
import {hideCreateVaultModal} from '../../../../../state/ui'
 


const colourOptions = [
    { value: '0x0D2eE7dAB13330455b7f1b7898448cA2d3d78C41', label: '0x0D2eE7dAB13330455b7f1b7898448cA2d3d78C41' },
    { value: '0x0D2eE7dAB13330455b7f1b7898448cA2d3d78C41', label: '0x0D2eE7dAB13330455b7f1b7898448cA2d3d78C41' },
    { value: '0x0D2eE7dAB13330455b7f1b7898448cA2d3d78C41', label: '0x0D2eE7dAB13330455b7f1b7898448cA2d3d78C41' },
    { value: '0x0D2eE7dAB13330455b7f1b7898448cA2d3d78C41', label: '0x0D2eE7dAB13330455b7f1b7898448cA2d3d78C41' },
    { value: '0x0D2eE7dAB13330455b7f1b7898448cA2d3d78C41', label: '0x0D2eE7dAB13330455b7f1b7898448cA2d3d78C41' }
  ]


const prevData = {inheritors:[], _startingBal:'', _backupAddress:'', }
function CreateVaultModal() {
  const dispatch = useDispatch();
  const {crud} = useSelector(state => state.inheritors);
  const { createVaultModal } = useSelector(state => state.ui)
  const [userInputs, setUserInputs] = useState(prevData);

  const handleHideModal = ()=> dispatch(hideCreateVaultModal())

const handleChange = (e) => {
  const {name, value} = e.target
 setUserInputs({...userInputs, [name]: value})
}

const handleInheritors = (value) => {
    const b = value.map(item => item.value);
    setUserInputs({...userInputs, inheritors: b})
}

const handleSubmit = (e) => {
  e.preventDefault();
  const {inheritors, _startingBal, _backupAddress} = userInputs
  
  for (let i = 0; i < inheritors.length; i++) {
    if(!ethers.utils.getAddress(inheritors[i]))return 'one or more invalid wallet address'
  }

  if(!ethers.utils.getAddress(_backupAddress))return 'invalid backup wallet address'
 if( !_startingBal || !inheritors || _backupAddress )return;
 
const data = {
    ...userInputs,
    _startingBal: ethers.utils.parseEther(userInputs._startingBal)
}

  dispatch(createVaultAsync(data));
}

    return (
      <>  
        <Modal show={createVaultModal} onHide={handleHideModal}>
          <ModalHeader title = 'Create Vault' />
          <MDBody >  
    <Form onSubmit = {handleSubmit}>


  <Row className="my-4">
    <Form.Group as={Col} controlId="formGridPassword">
      <FormControl  placeholder="Starting Balance" onChange = {handleChange} name ='_startingBal'/>
    </Form.Group>
  </Row>

  <Form.Group className="mt-4 mb-4" controlId="formGridAddress2">
    <FormControl placeholder="Backup Address" name ='_backupAddress' onChange ={handleChange} />
  </Form.Group>

<MultiSelect setChange = {handleInheritors} options = {colourOptions} name ='inheritors' />

<div className ='d-flex justify-content-center align-items-center'>
    <CustomButton disabled = {crud} text = {`${crud ? 'Loading...':'Create Vault'}`} size ='small' />
</div>
          </Form>
              <p className ='my-3 mt-4 text-center text-muted'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem
              </p>
              </MDBody>
        </Modal>
      </>
    );
  }
  
export default CreateVaultModal