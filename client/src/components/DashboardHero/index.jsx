import React from "react";
import { Spinner, Button } from "react-bootstrap";
import CustomButton from "../Button";
import { Div } from "./style";

function DashboardHero({ btntext, text, src, margin, clickshow, crud }) {
  return (
    <div>
      <Div src={src} margin={margin}>
        <div>{text}</div>

        <div>
          {
            crud ? <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />

              <span style={{ marginLeft: '1rem' }}>Pinging
              </span>
            </Button> : <CustomButton onClick={clickshow} text={btntext} />
          }
        </div>
      </Div>
    </div>
  );
}

export default DashboardHero;
