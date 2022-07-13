import React from "react";
import { ModalHeader as Head, ModalTitle } from "./style";

function ModalHeader({ title, ...others }) {
  return (
    <Head closeButton className="bg-dark" {...others}>
      <ModalTitle>{title}</ModalTitle>
    </Head>
  );
}

export default ModalHeader;
