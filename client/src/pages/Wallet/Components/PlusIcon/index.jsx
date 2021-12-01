import styled from "styled-components";
import { BsPlusLg } from "react-icons/bs";

const PlusIcon = ({ ...others }) => {
  return (
    <PlusContainer {...others}>
      Add tokens
      <Plus />
    </PlusContainer>
  );
};

export default PlusIcon;

const PlusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &:hover {
    cursor: pointer;
  }
`;
const Plus = styled(BsPlusLg)`
  margin-left: 10px;
  opacity: 0.7;
  font-size: 0.8rem;
`;
