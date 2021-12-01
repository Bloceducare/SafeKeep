import styled from "styled-components";

export const HasSearch = styled.div`
  position: relative;
  .form-control {
    padding-left: 2.375rem;
  }

  span {
    position: absolute;
    z-index: 2;
    display: inline-block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
    top: 4%;
  }

  input {
    border: 2px solid white;
    background: black;
    color: white;
    padding: 0.6rem 1rem;
    border-radius: 10px;
  }

  input:focus {
    color: white;
    background: black;
  }
`;
