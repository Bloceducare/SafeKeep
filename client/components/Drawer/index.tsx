import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ModalCloseButton } from "../Modal";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
	0% { opacity: 0; };
	100%: { opacity: 1; };
`;
const fadeOut = keyframes`
	0% { opacity: 1; };
	100%: { opacity: 0; };
`;

const slideIn = keyframes`
	  0% { 
	transform: translate3d(-100%,0,0); 
}
  100% { 
	transform: translate3d(0,0,0);
}
`;
const slideOut = keyframes`
	 0% { transform: translate3d(0,0,0);  }
  	100% { transform: translate3d(-100%,0,0); }
`;

const StyledDialogPrimitiveOverlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.48);
  z-index: 200;
  &[data-state="open"] {
    animation: ${fadeIn} 250ms forwards;
  }
  &[data-state="closed"] {
    animation: ${fadeOut} 350ms forwards;
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
`;

const DialogPrimitiveContent = styled(DialogPrimitive.Content)`
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  z-index: 2000;
  &[data-state="open"] {
    animation: ${slideIn} 360ms forwards;
  }
  &[data-state="closed"] {
    animation: ${slideOut} 250ms forwards;
  }
`;

/**
 * Drawer Overlay component -does not accept any props
 */
const DrawerOverlay: () => React.ReactElement = () => (
  <StyledDialogPrimitiveOverlay />
);

interface DrawerContentProps {
  /**
   * The content of the drawer in JSX
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * This can either be an explicit className or
   * classNames generated as a result of using css prop
   * i.e. css={{width: "100%", height: "auto"}}
   *
   * You can use css prop to style the drawer content. e.g. if you want to change
   * the background color from white to any other color
   */
  className?: string;
  /**
   * Positioning of the drawer. The default value is left
   */
  placement: "top" | "bottom" | "left" | "right";
  /**
   * The size of the drawer. For horizontally positioned drawers (i.e. left, right), this will affect the width.
   * For vertically positioned drawers, this will affect the height(i.e. top, bottom). THe default value is xs
   */
  size: "xs" | "sm" | "md" | "lg" | "xl" | "full";
}

/**
 * <DrawerContent /> Component. It has a white background by default.
 * It must be a direct child of the <Drawer /> component
 * You can
 * @param {CompiledJSXCustomProps<DrawerContentProps>}
 * @returns {React.ReactElement}
 *
 *
 *
 *
 */

export const DrawerCloseOnClick = ({ children }) => {
  return <DialogPrimitive.Close asChild>{children}</DialogPrimitive.Close>;
};

export const DrawerContent = ({
  children,
  className,
}: CompiledJSXCustomProps<DrawerContentProps>): React.ReactElement => {
  return (
    <DialogPrimitive.Portal>
      <DrawerOverlay />
      <DialogPrimitiveContent className={className}>
        {children}
      </DialogPrimitiveContent>
    </DialogPrimitive.Portal>
  );
};

type DialogRootPrimitiveProps = React.FunctionComponent<
  React.ComponentProps<typeof DialogPrimitive.Root>
>;
type DialogTriggerPrimitiveProps = React.FunctionComponent<
  React.ComponentProps<typeof DialogPrimitive.Trigger>
>;
type DrawerCloseButtonProps = React.FunctionComponent<
  React.ComponentProps<typeof ModalCloseButton>
>;

/**
 * <Drawer /> component - This is the root component that houses
 * both the DrawerTrigger and DrawerContent component when creating a Drawer
 *
 */
export const Drawer: DialogRootPrimitiveProps = DialogPrimitive.Root;
/**
 * <DrawerTrigger /> component - This is the button that opens the Drawer when clicked
 * It must have a child that determines the look of the button
 * (i.e. text and styling), preferably a div element which can be styled using css prop.
 *
 * This button must be a direct child of the <Drawer /> component
 *
 */
export const DrawerTrigger: DialogTriggerPrimitiveProps =
  DialogPrimitive.Trigger;
/**
 * <DrawerCloseButton /> component.
 * This component must always be the first child of <DrawerContent /> component.
 * You can modify the style with css prop e.g. css={{width: "100px", height: "100px"}}
 */
export const DrawerCloseButton: DrawerCloseButtonProps = ModalCloseButton;
