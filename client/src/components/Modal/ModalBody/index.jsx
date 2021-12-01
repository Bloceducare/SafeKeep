import React from "react";
import { Modal } from "react-bootstrap";

function ModalBody({ children }) {
  return <Modal.Body className="bg-dark">{children}</Modal.Body>;
}

export default ModalBody;
