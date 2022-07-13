import styled from "styled-components";
import { Modal } from "react-bootstrap";
// import img from "../../../assets/close.svg";

export const ModalTitle = styled(Modal.Title)`
  position: absolute;
  left: 33%;
  margin-top: 0.8rem;
`;

export const ModalHeader = styled(Modal.Header)`
  background: black;
  border-bottom: 0;
  button {
    background-image: url('/assets/close.svg');
  }
`;
