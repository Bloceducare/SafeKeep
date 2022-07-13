import styled from "styled-components";
import { BsX } from "react-icons/bs";

const Cross = ({ ...others }) => <CrossSybol {...others} />;

export default Cross;

const CrossSybol = styled(BsX)`
  position: absolute;
  transform: scale(1.3);

  &:hover {
    cursor: pointer;
  }
`;
