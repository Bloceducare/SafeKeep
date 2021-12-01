import React from "react";
import { Btn } from "./style";

function CustomButton({
  text,
  onClick,
  size,
  className,
  outline,
  noMargin,
  ...others
}) {
  return (
    <Btn
      className={className}
      onClick={onClick}
      size={size}
      outline={outline}
      noMargin={noMargin}
      {...others}
    >
      {text}
    </Btn>
  );
}

export default CustomButton;
