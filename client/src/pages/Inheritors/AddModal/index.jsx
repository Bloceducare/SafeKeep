import {Modal, Form,Col, Row} from 'react-bootstrap'
import CustomButton from '../../../components/Button';
import {ModalHeader, FormControl} from './style'
  
function AddModal({show, handleClose}) {

  
    return (
      <>  
        <Modal show={show} onHide={handleClose}>
          <ModalHeader closeButton className ='bg-dark' >
            <Modal.Title>Add Inheritors</Modal.Title>
          </ModalHeader>
          <Modal.Body className ='bg-dark'>  
              <Form>
  <Form.Group className="mb-4" controlId="formGridAddress1">
    <FormControl placeholder="Name"/>
  </Form.Group>

  <Form.Group className="mb-4" controlId="formGridAddress2">
    <FormControl placeholder="Paste Address"  />
  </Form.Group>

  <Row className="mb-4">
    <Form.Group as={Col} controlId="formGridEmail"  >
    <Form.Select defaultValue="Choose..." className ='bg-dark text-white'>
        <option>Choose...</option>
        <option>3</option>
        <option>4</option>
      </Form.Select>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <FormControl type="number" placeholder="Amount"/>
    </Form.Group>
  </Row>

<div className ='d-flex justify-content-center align-items-center'>
    <CustomButton text = 'Allocate' onClick = {handleClose}  size ='small' />
</div>
          </Form>
              <p className ='text-muted mt-4 text-center my-3'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem
              </p>
              </Modal.Body>
        </Modal>
      </>
    );
  }
  
export default AddModal