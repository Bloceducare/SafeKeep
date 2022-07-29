import React from "react";
import styled, { keyframes } from "styled-components";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { useDraggable } from "./use-draggable-scroll";

export interface TabsProps
  extends Omit<
    CompiledJSXPropsOmitRef<HTMLDivElement>,
    "value" | "defaultValue" | "dir" | "as"
  > {
  index?: number;
  defaultIndex?: number;
}

export const StyledTabsPrimitiveRoot = styled(TabsPrimitive.Root)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledTabsPrimitiveTabsList = styled(TabsPrimitive.TabsList)`
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 792px) {
    height: auto;
  }
`;

export const StyledTabsPrimitiveTrigger = styled(TabsPrimitive.Trigger)`
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  padding-top: 12px;
  // margin-right: 40px;
  width: 100% !important;
  padding-bottom: 12px;
  background-color: transparent;
  border: none;
  color: #ffffff;
  &:last-of-type {
    margin-right: 0px;
  }
  &:focus {
		outline: none;
    	border: none;
    }
  @media (max-width: 612px) {
    //   margin-right: 40px;
  }
  @media (max-width: 384px) {
    padding-top: 8px;
    margin-right: 16px;
    padding-bottom: 8px;
  }
   &[data-state="active"]  {
		border: none;
		outline: none;
    }

  &[data-state="active"] span{
    &:before {
      transform: scale(1);
      transform-origin: bottom left;
    }
}
  }
`;

export const Span = styled.span`
 		 color: #ffffff;
          font-style: normal;
          text-transform: capitalize;
          position: relative;
          cursor: pointer;
          width: 100%;
		  font-family: "clash grotesk regular";
  		  font-weight: 600;
          font-size: 30px;
          line-height: 37px;
		  padding-bottom: 8px;
          &:before{
            content: "";
            position: absolute;
            width: 100%;
            transform: scale(0);
            height: 2px;
            bottom: 0;
            right: 0;
            // top: 24px;
            background-color:  #2B5BCF;
            transform-origin: bottom right;
            transition: transform 0.3s ease-out;
          }
          &:hover:before {
            transform: "scale(1)",
            transform-origin: bottom left;
          }
          @media (max-width: 612px) {
            fontSize: 16px;
            lineHeight: 1.5;
          }
          @media (max-width: 384px){
            fontSize: 8px;
            lineHeight: 12px;
          }
`;

const fadeIn = keyframes`
  0% { opacity: 0;};
 100% { opacity: 1; };
`;

export const Tabs = ({
  className,
  index,
  defaultIndex = 0,
  ...props
}: TabsProps) => {
  return (
    <StyledTabsPrimitiveRoot
      className={className}
      value={index ? `tabs-${index}` : undefined}
      defaultValue={`tabs-${defaultIndex ? defaultIndex : index ? index : 0}`}
      {...props}
    />
  );
};

export interface TabListProps
  extends Omit<
    CompiledJSXPropsOmitRef<HTMLDivElement>,
    "value" | "defaultValue" | "dir" | "as"
  > {}

export const TabList = ({ className, children, ...props }: TabListProps) => {
  const containerRef = React.useRef(null);
  const { events } = useDraggable(containerRef, {
    applyRubberBandEffect: true,
  });

  return (
    <StyledTabsPrimitiveTabsList
      ref={containerRef}
      {...events}
      className={className}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        // @ts-ignore
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value: `tabs-${index}` });
        }
        // @ts-ignore
        if (
          process.env.NODE_ENV === "development" &&
          child?.type?.name !== "Tab"
        ) {
          throw new Error(
            "Audal Primitives: Only <Tab /> components may be used within an TabList."
          );
        }
        return null;
      })}
    </StyledTabsPrimitiveTabsList>
  );
};

export interface TabPanelsProps {
  children: React.ReactNode[] | React.ReactNode;
}

export const TabPanels = ({ children }: TabPanelsProps) => {
  return (
    <>
      {React.Children.map(children, (child, index) => {
        // @ts-ignore
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value: `tabs-${index}` });
        }
        // @ts-ignore
        if (
          process.env.NODE_ENV === "development" &&
          child?.type?.name !== "TabPanel"
        ) {
          throw new Error(
            "Audal Primitives: Only <TabPanel /> components may be used within an TabPanels."
          );
        }
        return null;
      })}
    </>
  );
};

export interface TabProps
  extends Omit<
    CompiledJSXPropsOmitRef<HTMLButtonElement>,
    "value" | "defaultValue" | "dir" | "as" | "type"
  > {
  value?: string;
}

export const Tab = ({ className, ...props }: TabProps) => {
  return (
    <StyledTabsPrimitiveTrigger
      value={props?.value}
      className="keen-slider__slide"
    >
      <Span className={className} {...props} />
    </StyledTabsPrimitiveTrigger>
  );
};
export interface TabPanelProps
  extends Omit<
    CompiledJSXPropsOmitRef<HTMLDivElement>,
    "value" | "defaultValue" | "dir" | "as"
  > {
  value?: string;
}

export const TabPanel = ({ className, ...props }: TabPanelProps) => {
  return (
    <TabsPrimitive.Content
      value={props?.value}
      style={{
        flexGrow: 1,
        padding: 0,
        outline: "none",
        // animation: `${fadeIn} 300ms ease`,
      }}
      className={className}
      {...props}
    />
  );
};

export default Tabs;
