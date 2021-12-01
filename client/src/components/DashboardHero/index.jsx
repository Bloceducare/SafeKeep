import React from "react";
import CustomButton from "../Button";
import { Div } from "./style";

function DashboardHero({ btntext, text, src, margin, clickshow }) {
  return (
    <div>
      <Div src={src} margin={margin}>
        <div>{text}</div>

        <div>
          <CustomButton onClick={clickshow} text={btntext} />
        </div>
      </Div>
    </div>
  );
}

export default DashboardHero;
