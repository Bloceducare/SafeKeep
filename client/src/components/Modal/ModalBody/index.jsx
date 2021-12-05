import React from "react";
import { Modal } from "react-bootstrap";

function ModalBody({ children, ...props }) {
  return (
    <Modal.Body className="bg-dark" {...props}>
      {children}
    </Modal.Body>
  );
}

export default ModalBody;
