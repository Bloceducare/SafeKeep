import React from "react";
import { Wrapper } from "./style";

function SpaceBetween({ children, ...others }) {
  return <Wrapper {...others}>{children}</Wrapper>;
}

export default SpaceBetween;
