import styled from 'styled-components'
import {Modal, Form} from 'react-bootstrap'
import img from '../../../assets/close.svg'


export const ModalHeader = styled(Modal.Header)`
background:black;
border-bottom:0;

button {
  background-image: url(${img});
}


`


export const FormControl = styled(Form.Control)`
background:#212121;
color:white;

&:focus {
  color:white;
  background:#212121;
}

`