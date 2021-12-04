import styled from "styled-components";
import { Form } from "react-bootstrap";

export const FormControl = styled(Form.Control)`
  background: transparent;
  color: white;

  &:focus {
    color: white;
    background: transparent;
  }
`;
