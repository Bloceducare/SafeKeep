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
      <Container>
        <Top>
          <BigText>SAFEKEEP</BigText>

          <P>
            Provide guaranteed storage <br /> and safety backup for crypto
            assets
          </P>
          <ButtonContainer>
            <BtnLeft onClick={handleShowConnectModal}>Connect</BtnLeft>
            <BtnRight>Lite Paper</BtnRight>
          </ButtonContainer>
        </Top>
        <DivImg>
          <LargeScreen>
            {/* <Fade right>
              <Image src="/assets/lock.png" fluid />
            </Fade> */}

            <RightImage src="/assets/lights2.png" />
            <Fade bottom>
              <KeyImage src="/assets/lock.png" />
            </Fade>
            <LeftImage src="/assets/lights.png" />
          </LargeScreen>
          <SmallScreen>
            <Fade bottom>
              <KeyImage src="/assets/key_small.png" />
            </Fade>
          </SmallScreen>
        </DivImg>
        <div>
          <p>
            Built on &nbsp;&nbsp;
            <BuiltImage src={`images/eth.png`} />
          </p>
        </div>
      </Container>
    </>
  );
}

export default Home;

export const Container = styled.div`
  text-align: center;
  background-color: #000000;
`;
export const Top = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(90vh);
  margin: 0;
  align-items: center;
  justify-content: center;
  max-width: 789px;
  width: 100%;
  margin: 0 auto;
  padding: 0px 40px;
  @media (max-width: 900px) {
    padding-top: 106px;
    padding-bottom: 80px;
    height: auto;
  }
  @media (max-width: 768px) {
    height: auto;
    padding-top: 106px;
  }
`;
export const BigText = styled.h1`
  font-family: clash grotesk semibold;
  font-size: 145px;
  line-height: 178px;
  @media (max-width: 768px) {
    font-size: 60px;
    line-height: 73px;
    margin-bottom: 0px;
  }
`;

export const P = styled.div`
  font-family: "clash grotesk regular";
  font-size: 40px;
  line-height: 49px;
  max-width: 605px;
  width: 100%;
  text-align: center;
  margin-bottom: 82px;
  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 23px;
  }
`;

export const ButtonContainer = styled.div`
  max-width: 557px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    margin-bottom: 114px;
  }
  @media (max-width: 668px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 114px;
  }
`;

export const BtnLeft = styled.button`
  padding: 16px 67px;
  background-color: #2b5bcf;
  margin-right: 20px;
  box-shadow: 0px 20px 34px rgba(71, 121, 233, 0.5);
  outline: none;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-family: "clash grotesk regular";
  font-size: 30px;
  line-height: 37px;
  @media (max-width: 668px) {
    margin-bottom: 20px;
    max-width: 205px;
    padding: 13px 52px;
    width: 100%;
    font-size: 27px;
    line-height: 33px;
    margin-right: 0px;
  }
`;

export const BtnRight = styled.button`
  padding: 16px 67px;
  color: #fff;
  border-radius: 12px;
  background-color: rgba(51, 61, 83, 0.18);
  outline: none;
  border: 0.4px solid #ffffff;
  font-family: "clash grotesk regular";
  font-size: 30px;
  line-height: 37px;
  border-width: 0.4px;
  @media (max-width: 668px) {
    max-width: 205px;
    padding: 13px 52px;
    width: 100%;
    font-size: 23px;
    line-height: 33px;
  }
`;
export const DivImg = styled.div`
  height: 700px;
  background-image: url("/assets/Vector.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
  position: relative;
  @media (max-width: 700px) {
    background-image: url("/assets/world_map.png");
    height: 300px;
    paddingtop: 40px;
  }
`;

export const LargeScreen = styled.div`
  @media (max-width: 700px) {
    display: none;
  }
`;

export const SmallScreen = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const LeftImage = styled.img`
  position: absolute;
  right: 0;
  top: 20px;
  z-index: 3;
  @media (max-width: 1327px) {
    display: none;
  }
`;

export const RightImage = styled.img`
  position: absolute;
  left: 0;
  top: 20px;
  @media (max-width: 1327px) {
    display: none;
  }
`;

export const KeyImage = styled.img`
  max-width: 523px;
  width: 100%;
  height: 528px;
  @media (max-width: 1327px) {
    max-width: 245px;
    width: 100%;
    height: 245px;
  }
`;

export const BuiltImage = styled.img`
  @media (max-width: 1327px) {
    width: 30px;
    height: 50px;
  }
`;
