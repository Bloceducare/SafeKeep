import styled from "styled-components";
import { BsCaretDownFill } from "react-icons/bs";

const CaretDown = ({ ...others }) => {
  return (
    <>
      <CaretContainer {...others}>
        <CaretDownIcon />
      </CaretContainer>
    </>
  );
};

export default CaretDown;

const CaretContainer = styled.div`
  top: 20%;
  right: 0%;
  position: absolute;
  transform: ${(props) => (props.selected ? "rotate(180deg)" : "")};
  padding: 0rem 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const CaretDownIcon = styled(BsCaretDownFill)``;
