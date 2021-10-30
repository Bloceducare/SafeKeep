import styled from 'styled-components'
import {Modal, Form} from 'react-bootstrap'
import img from '../../../assets/check.svg'


export const ModalHeader = styled(Modal.Header)`
background:black;
border-bottom:0;
button {
  background-image: url(${img});
  border:1px solid white;
  border-radius:200px;
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