import styled from "styled-components";
import Background from "../../assets/Vector.png";

export const Container = styled.div`
  text-align: center;
`;
export const Top = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(80vh);
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
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
`;
