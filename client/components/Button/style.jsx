import styled, { css } from "styled-components";

const smallsize = `
 padding:0.2rem 0.8rem;
font-size:1rem;
`;

const largesize = `
margin-left:2rem;
`;

const noOutline = `
    color: #fff;
    outline: 0.4px solid #2B5BCF;
    background-color: #2B5BCF;

    &:hover{
        background-color: transparent;
    }
`;
const outline = `
    color: #2B5BCF;
    background-color: transparent;

    &:hover{
        outline: 0.4px solid #2B5BCF;
        color: white;
        background-color: #2B5BCF;
    }
`;
export const Btn = styled.button`
  padding: 8px 30px;
  background-color: #2b5bcf;
  margin: ${(props) => (props.noMargin ? 0 : " 20px 20px")};
  font-family: "clash grotesk regular";
  font-size: "24px";
  line-height: "29px";
  outline: 0.4px solid #2b5bcf;
  border: none;
  border-radius: 12px;
  transition: all 0.3s ease-out;
  opacity: ${(props) => props.disabled && 0.4};

  &:hover {
    outline: 0.4px solid #2b5bcf;
  }

  ${(props) =>
    props.size === "small"
      ? css`
          ${smallsize}
        `
      : css`
          ${largesize}
        `}
  ${(props) =>
    props.outline
      ? css`
          ${outline}
        `
      : css`
          ${noOutline}
        `}
`;
