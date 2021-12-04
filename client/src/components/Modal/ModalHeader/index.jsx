import React from "react";
import { ModalHeader as Head, ModalTitle } from "./style";

function ModalHeader({ title }) {
  return (
    <Head closeButton className="bg-dark">
      <ModalTitle>{title}</ModalTitle>
    </Head>
  );
}

export default ModalHeader;
