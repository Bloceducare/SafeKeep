import React from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";
import { List } from "@components/DashboardLayout/style";

function About() {
  const Question = [
    {
      title: `This is the question that brought about
SafeKeep. What happens to you
cryptocurrencies when you die?
What happens to your cryptocurrencies 
if you lose your key or your hard drive
crashes? You should not lose access to your hard earned and valuable cryptos just like that.
`,
    },
    {
      title: `With the SafeKeep Dapp, you
can  be rest assured that your crypto is not lost forever, 
no matter what happens.`,
    },
  ];

  const Steps = [
    {
      title: `How do we ensure this you ask?, it's simple`,
      description: ` When depositing money into your SafeKeep Wallet, you are also
                mandated to supply a backup address, preferrably but not limited
                to a hardware wallet or a paper wallet that can be kept from
                disasters such as fire or a flood`,
      image: "./assets/man.png",
    },
    {
      title: `How do I get my crypto sent to my backup address if/when I lose access?`,
      description: `Once we notice that there is no transation on your account for 6 months from the date you performed your last transaction, then
we send all your crypto holdings with us to your backup wallet.
In a case where you don't want to perform any transactions for a
long time but want us to know you still have access to your
account, all you have to do is send a Ping from the Dapp.
Most importantly, you can choose to withdraw all your funds
any time you want`,
      image: "./assets/plug.png",
    },
  ];

  const listItems = [
    "We advise you use SafeKeep with Google Chrome browser and also download the MetaMask extensionhere and set it up (We'll add support for other wallets soon)",
    "Once that is done, Click on the Connect button on the Navbar or homepage to connect your MetaMask wallet to SafeKeep Dapp",
    "You should see a balance of 0 ETH if this is your first time; All you have to do now is click on the Withdraw button to open the Withdraw Modal",
    "Enter the Amount you want to deposit and enter a valid backup address and then click on Deposit and wait for your transaction to be completed Hurray! if you got a success message, then you have officially become a SafeKeep User!.",
  ];
  return (
    <Container>
      <HeroContainer>
        <HeroTextContainer>
          <p>What happens to your Cryptocurrencies when you die</p>
        </HeroTextContainer>

        <ImageContainer>
          <EthContainer>
            {" "}
            <img
              src="./assets/eth.png"
              alt="eth"
              width={"100%"}
              style={{
                transform: "translateX(2rem)",
              }}
            />
          </EthContainer>
          <div style={{ maxWidth: "500px", width: "100%", marginLeft: "40px" }}>
            {" "}
            <img
              src="./assets/bitcoin.png"
              alt="btc"
              width={"100%"}
              style={{ transform: "scale(1.4)" }}
            />
          </div>
          <MoneroContainer>
            {" "}
            <img
              src={"./assets/monero.png"}
              alt="monero"
              width={"100%"}
              style={{ transform: "translateX(-2rem)" }}
            />
          </MoneroContainer>
        </ImageContainer>
        <SmallImageContainer>
          <div>
            {" "}
            <img src="./assets/bitcoin2.png" alt="btc" width={"100%"} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ maxWidth: "200px", width: "100%" }}>
              {" "}
              <img
                src="./assets/eth.png"
                alt="eth"
                width={"100%"}
                // style={{
                //   transform: "translateX(2rem)",
                // }}
              />
            </div>
            <div style={{ maxWidth: "200px", width: "100%" }}>
              {" "}
              <img
                src={"./assets/monero.png"}
                alt="monero"
                width={"100%"}
                // style={{ transform: "translateX(2rem)" }}
              />
            </div>
          </div>
        </SmallImageContainer>
      </HeroContainer>
      <QuestionContainer>
        {Question.map((question) => {
          return (
            <SingleQuestionContainer key={question.title}>
              <img
                src="./assets/shield.png"
                alt="connect"
                style={{
                  transform: "scale(0.7)",
                  // marginRight: "10px",
                }}
              />
              <p>{question.title}</p>
            </SingleQuestionContainer>
          );
        })}
      </QuestionContainer>

      <StepsContainer>
        {Steps.map((step) => {
          return (
            <SingleStep key={step.title}>
              <TopicText>
                <FaArrowUp
                  height="50px"
                  style={{
                    marginRight: "10px",
                    height: "50px",
                    color: "#2b5ccf",
                  }}
                />
                <p style={{ marginBottom: "0px" }}>{step.title}</p>
              </TopicText>

              <StepImg src={step.image} />

              <p>{step.description}</p>
            </SingleStep>
          );
        })}
      </StepsContainer>

      <section>
        <TopicText style={{ alignItems: "center", justifyContent: "center" }}>
          <FaArrowUp
            height="50px"
            style={{
              marginRight: "10px",
              height: "50px",
              color: "#2b5ccf",
            }}
          />
          <p style={{ marginBottom: "0px" }}>How do I get started?</p>
        </TopicText>
        <ListContainer>
          {listItems.map((item) => {
            return (
              <SingleList className="custom-ul">
                <span>{item}</span>
              </SingleList>
            );
          })}
        </ListContainer>
      </section>
    </Container>
  );
}

export default About;

export const Container = styled.div`
  max-width: 1290px;
  padding: 0 30px;
  width: 100%;
  margin: 0 auto;
`;

export const HeroContainer = styled.div`
  padding-top: 100px;
  @media (max-width: 768px) {
    padding-top: 80px;
  }
`;
export const HeroTextContainer = styled.div`
  max-width: 829px;
  width: 100%;
  margin: 0 auto;
  font-family: clash grotesk semibold;
  font-size: 64px;
  line-height: 78px;
  padding-bottom: 102px;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
  @media (max-width: 768px) {
    font-size: 30px;
    line-height: 36px;
  }
  @media (max-width: 600px) {
    padding-bottom: 33px;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  padding-bottom: 100px;
  justify-content: space-between;
  @media (max-width: 600px) {
    display: none;
  }
`;

export const SmallImageContainer = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 80px;
    margin: 0 auto;
  }
`;

export const MoneroContainer = styled.div`
  margin-top: -100px;
`;
export const EthContainer = styled.div`
    marginLeft: 40px;
    marginTop: 70px;
    @media (max-width: 600px): {
      display: none;
    },
`;

export const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SingleQuestionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 47%;
  width: 100%;
  font-family: "clash grotesk regular";
  font-size: 22px;
  line-height: 27px;
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    font-size: 12px;
    line-height: 14px;
  }
`;

export const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 115px;
  @media (max-width: 868px) {
    flex-direction: column;
    margin-top: 55px;
  }
`;

export const SingleStep = styled.div`
  max-width: 47%;
  width: 100%;
  font-family: "clash grotesk regular";
  font-size: 22px;
  line-height: 27px;
  color: #9d9d9d;
  @media (max-width: 868px) {
    width: 100%;
    max-width: 100%;
    margin-top: 50px;
  }
  @media (max-width: 600px) {
    font-size: 17px;
    line-height: 20px;
  }
`;
export const TopicText = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-family: "clash grotesk regular";
  font-size: 25px;
  color: #ffffff;
  line-height: 30px;
  margin-bottom: 70px;
  @media (max-width: 868px) {
    margin-bottom: 30px;
  }
  @media (max-width: 600px) {
    font-size: 17px;
    line-height: 20px;
    margin-bottom: 30px;
  }
`;

export const StepImg = styled.img`
  margin-bottom: 43px;
  height: 688px;
  width: 100%;
  @media (max-width: 768px) {
    height: 352px;
  }
`;

export const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 71px;
  flex-wrap: wrap;
  @media (max-width: 868px) {
    flex-direction: column;
    margin-top: 0px;
  }
`;

export const SingleList = styled.div`
  max-width: 47%;
  width: 100%;
  font-family: "clash grotesk regular";
  font-size: 19px;
  line-height: 23px;
  color: #9d9d9d;
  padding-left: 40px;
  margin-top: 30px;
  align-items: center;
  @media (max-width: 868px) {
    width: 100%;
    max-width: 100%;
    margin-top: 30px;
  }
  @media (max-width: 600px) {
    font-size: 17px;
    line-height: 20px;
  }
`;
