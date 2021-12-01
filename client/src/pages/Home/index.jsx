import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Image } from "react-bootstrap";
import { BigText, BtnLeft, BtnRight, Container, Top, DivImg } from "./style";
import { MDBAnimation } from "mdbreact";
import { useMoralis } from "react-moralis";
import Lock from "../../assets/lock.png";
import { showConnectModal } from "../../state/ui";

function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useMoralis();
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const handleShowConnectModal = () => {
    dispatch(showConnectModal());
  };

  return (
    <>
      <Container>
        <Top>
          <BigText>SAFEKEEP</BigText>

          <h5>Provide guaranteed storage</h5>
          <h5>and safety backup for crypto assets</h5>
          <div>
            <BtnLeft onClick={handleShowConnectModal}>Connect</BtnLeft>
            <BtnRight>Lite Paper</BtnRight>
          </div>
        </Top>
        <DivImg className="container-fluid">
          <MDBAnimation reveal type="fadeInRight" duration="3s">
            <Image src={Lock} fluid />
          </MDBAnimation>
        </DivImg>
        <div>
          <p>
            Built on &nbsp;&nbsp;
            <Image src={`images/eth.png`} />
          </p>
        </div>
      </Container>
    </>
  );
}

export default Home;
