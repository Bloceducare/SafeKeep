import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa";

export const DepositWrapper = styled.div`
  border: 1px solid white;
  background: #212121;
  border-radius: 10px;
  padding: 1rem;
  max-width: 30rem;
  margin: auto;
`;

export const Input = styled.input`
  text-align: right;
  border: 0;
  background: transparent;
  color: white;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  outline: none;
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const DepositDiv = styled.div`
  border: 1px solid #ffffff54;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
`;

export const DepositBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
`;

export const SelectToken = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0.3rem;
  border-radius: 5px;

  .token-name {
    margin: auto 0.2rem;
  }
`;

export const ArrowDown = styled(FaAngleDown)`
  transform: translateY(-0.2rem) scale(1.3);
  margin-left: 0.5rem;
  opacity: 0.7;
`;

export const Balance = styled.div`
  opacity: 0.7;
  font-size: 0.8rem;
`;
