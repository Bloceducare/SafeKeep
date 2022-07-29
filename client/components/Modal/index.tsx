import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  DialogCloseProps,
  DialogContentImplProps,
} from "@radix-ui/react-dialog";
import styled, { keyframes } from "styled-components";

const overlayShow = keyframes`
	0% { opacity: 0; };
	100%: { opacity: 1; };
`;

const contentShow = keyframes`
	 0% { opacity: 0; transform: translateY(10%); };
  20% { opacity: 0; transform: translateY(10%); };
  100%: { opacity: 1; transform: translateY(0%); };
`;

const contentHide = keyframes`
	0% { opacity: 1; transform: translateY(0%); };
  80% { opacity: 0; transform: translateY(10%); };
  100%{ opacity: 0; transform: translateY(10%); };
`;

const overlayHide = keyframes`
	0% { opacity: 1; };
	100%: { opacity: 0; };
`;

const StyledDialogPrimitiveOverlay = styled(DialogPrimitive.Overlay)`
  background-color: #04050399;
  position: fixed;
  z-index: 2000;
  inset: 0;
  overflow-y: auto;
  display: grid;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  &[data-state="open"] {
    animation: ${overlayShow} 250ms forwards;
  }
  &[data-state="closed"] {
    animation: ${overlayHide} 350ms forwards;
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
`;

const StyledDialogPrimitiveContent = styled(DialogPrimitive.Content)`
  background-color: white;
  border-radius: 6;
  z-index: 20;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25;
  &[data-state="open"] {
    animation: 360ms ${contentShow} forwards;
  }
  &[data-state="closed"] {
    animation: 250ms ${contentHide} forwards;
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
  &:focus {
    outline: none;
  }
`;

const DialogPrimitiveClose = styled(DialogPrimitive.Close)`
  position: absolute;
  font-family: inherit;
  border-radius: 100%;
  height: 25;
  width: 25;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  top: 10;
  right: 10;
  transition: 0.2s;
  &:hover {
    background-color: #04050311;
  }
  &:focus {
    box-shadow: 0 0 0 2px #04050311;
  }
`;
export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;

/*This component houses the modal content */

export const ModalContent = (
  props: CompiledJSXCustomProps<DialogContentImplProps>
) => {
  return (
    <DialogPrimitive.Portal>
      <StyledDialogPrimitiveOverlay>
        <StyledDialogPrimitiveContent {...props} />
      </StyledDialogPrimitiveOverlay>
    </DialogPrimitive.Portal>
  );
};

/* this component closes the modal */

export const ModalCloseButton = (
  props: CompiledJSXCustomProps<DialogCloseProps>
) => {
  return (
    <DialogPrimitiveClose {...props}>
      <Cross2Icon />
    </DialogPrimitiveClose>
  );
};

const Cross2Icon = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
