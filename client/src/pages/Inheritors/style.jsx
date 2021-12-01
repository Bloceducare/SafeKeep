import styled from "styled-components";
import img from "../../assets/check.svg";

const bg = (props) => {
  if (props.bvar === "danger") return "#9f373755";
  if (props.bvar === "edit") return "#6185DC55";
};

const color = (props) => {
  if (props.cvar === "danger") return "#FF1A1A";
  if (props.cvar === "edit") return "#2B5BCF";
};

export const Btn = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border: 0;
  padding: 0.2rem 0.4rem;
  background: ${(props) => bg(props)};
  color: ${(props) => color(props)};
  margin: auto 0.3rem;
  border-radius: 5px;

  svg {
    font-size: 0.6rem;
  }
`;

export const Tbody = styled.tbody`
  td:first-child {
    position: relative;
    padding-left: 2rem;

    &:before {
      display: flex;
      align-items: center;
      margin-top: -0.2rem;
      margin-left: -2rem;
      content: "";
      position: absolute;
      width: 1.5rem;
      height: 1.5rem;
      background-image: url(${img});
      background-size: contain;
    }
  }
`;
