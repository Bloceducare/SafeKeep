import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import styled from "styled-components";
import { showConnectModal, hideConnectModal } from "@state/ui";
import { connectModalStatus } from "@selectors/index";
import { ConnectWalletModal } from "components/Header/Components/ConnectModal";


function Home() {
  const dispatch = useDispatch();
  const showModal = useSelector(connectModalStatus);

  const handleShowConnectModal = () => {
    dispatch(showConnectModal());
  };

  const handleClose = () => {
    dispatch(hideConnectModal());
  };

  return (
    <>
      <ConnectWalletModal
        showModal={showModal}
        handleShow={handleShowConnectModal}
        handleClose={handleClose}
      />
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
          <Fade right>
            <Image src="/assets/lock.png" fluid />
          </Fade>
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

export const Container = styled.div`
  text-align: center;
`;
export const Top = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh);
  margin: 0;
  align-items: center;
  justify-content: center;
`;
export const BigText = styled.h1`
  font-family: clash grotesk semibold;
  font-size: 80px;
`;

export const P = styled.p`
  line-height: 20px;
`;

export const BtnLeft = styled.button`
  padding: 8px 40px;
  background-color: #2b5bcf;
  margin: 30px 20px;
  box-shadow: 0px 20px 34px rgba(71, 121, 233, 0.5);
  outline: none;
  border: none;
  border-radius: 12px;
  color: #fff;
`;

export const BtnRight = styled.button`
  padding: 8px 40px;
  color: #fff;
  border-radius: 12px;
  background-color: transparent;
  outline: none;
  border: 0.4px solid #ffffff;
`;
export const DivImg = styled.div`
  height: 80vh;
  background-image: url("/assets/Vector.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
`;
