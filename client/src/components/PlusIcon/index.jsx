import styled from "styled-components";
import { BsPlusLg } from "react-icons/bs";

const PlusIcon = ({ disabled = false, text = "Add token", ...others }) => {
  return (
    <PlusContainer>
      <div
        style={{
          pointerEvents: `${disabled ? "none" : null}`,
        }}
        {...others}
      >
        {text}
        <Plus />
      </div>
    </PlusContainer>
  );
};

export default PlusIcon;

const PlusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  div {
    &:hover {
      cursor: pointer;
      opacity: 0.7;
      transition: all 0.5s ease-in-out;

      svg {
        transform: rotate(45deg);
      }
    }
  }
`;
const Plus = styled(BsPlusLg)`
  margin-left: 10px;
  opacity: 0.7;
  font-size: 0.8rem;
`;
