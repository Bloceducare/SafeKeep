import styled from "styled-components";
import WrapAddress from "../../components/WrapAddress";

export const CurrentAddress = styled(WrapAddress)`
  background: #a8c2ff;
  border-radius: 10px;
  color: black;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`;

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0px 20px;
  color: white;

  td {
    border-bottom-width: 0;
  }

  tr {
    border: 1px solid red;
    border-radius: 15px !important;
    background: rgb(33, 37, 41);
    font-weight: 800;
    vertical-align: middle;
  }

  p {
    margin-bottom: -1rem;
  }

  td {
    border: solid 1px rgb(33, 37, 41);
  }
  tr:first-child td:first-child {
    border-top-left-radius: 10px;
  }

  tr:first-child td:last-child {
    border-top-right-radius: 10px;
  }

  tr:last-child td:first-child {
    border-bottom-left-radius: 10px;
  }

  tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
  }
`;
