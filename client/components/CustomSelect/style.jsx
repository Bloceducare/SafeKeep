import styled from "styled-components";

export const Select = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 3rem;
  border-radius: 0.25rem;
  overflow: hidden;
  border: 1px solid white;

  select {
    /* Reset Select */
    appearance: none;
    outline: 0;
    border: 0;
    box-shadow: none;
    /* Personalize */
    flex: 1;
    padding: 0 1em;
    color: #fff;
    background-color: black;
    background-image: none;
    cursor: pointer;
  }
  /* Remove IE arrow */
  select::-ms-expand {
    display: none;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0.3rem;
    right: 2rem;
    padding: 0.5rem;
    transition: 0.25s all ease;
    pointer-events: none;
    color: white;
    height: 1px;
    width: 1px;
    background: white;
    border-top: 2px solid white;
    border-left: 2px solid white;
    transform: rotate(225deg);
  }

  &:after {
    content: "";
    position: absolute;
    padding: 0.4rem 0.8rem;
    transition: 0.25s all ease;
    pointer-events: none;
    color: white;
    height: 1px;
    width: 1px;
    background: black;
    top: 0.11rem;
    right: 1.8rem;
  }

  /* Transition */
  .select:hover::after {
    color: #f39c12;
  }
`;
