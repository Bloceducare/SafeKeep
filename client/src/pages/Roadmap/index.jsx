import { MDBAnimation } from "mdbreact";
import React from "react";
import { Container } from "react-bootstrap";
import { H1, Hr } from "./style";

const Roadmap = () => {
  return (
    <>
      <H1>RoadMap</H1>
      <Container className="roadmap-container">
        <div class="timeline-block timeline-block-right">
          <Hr />
          <div class="timeline-content">
            <MDBAnimation
              class="timeline-content"
              reveal
              type="fadeInRight"
              duration="3s"
            >
              <h5>May - December, 2021</h5>
              <ul>
                <li>Full beta testing</li>
                <li>Liquidity pool selection</li>
                <li>Full ERC20 support</li>
                <li>Support for BSC and DOT coin</li>
                <li>Layer 2 implementation-polygon</li>
                <li>Mobile implementation</li>
              </ul>
            </MDBAnimation>
          </div>
        </div>

        <div class="timeline-block timeline-block-left">
          <Hr />
          <div class="timeline-content">
            <MDBAnimation
              class="timeline-content"
              reveal
              type="fadeInLeft"
              duration="3s"
            >
              <h5>Q1 2022</h5>
              <ul>
                <li>Mainnet contract development</li>
                <li>Mainnet contract audit</li>
                <li>Mainnet contract testing</li>
              </ul>
            </MDBAnimation>
          </div>
        </div>

        <div class="timeline-block timeline-block-right">
          <Hr />
          <div class="timeline-content">
            <MDBAnimation
              class="timeline-content"
              reveal
              type="fadeInRight"
              duration="3s"
            >
              <h5>Q2 2022</h5>
              <ul>
                <li>Back-up distribution percentage</li>
                <li>Ping reminder notification</li>
                <li>Social backup</li>
                <li>Support for other web3 wallet</li>
              </ul>
            </MDBAnimation>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Roadmap;
