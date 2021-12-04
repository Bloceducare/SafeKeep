import styled from "styled-components";
import CustomInput from "../../../../components/CustomInput";

const NormalizedInput = ({ ...others }) => {
  return <NormInput {...others} />;
};

export default NormalizedInput;

const NormInput = styled(CustomInput)`
  border-radius: 0;
  border: none;

  &:focus {
    box-shadow: none;
  }
`;
