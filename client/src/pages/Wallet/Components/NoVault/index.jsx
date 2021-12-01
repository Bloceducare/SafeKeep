import { NoVault as NV } from "./style";

const NoVault = ({ onClick }) => {
  return (
    <NV>
      You have no vault created yet,
      <br />
      click below to create a vault
      <br />
      <button onClick={onClick}>Create a vault</button>
    </NV>
  );
};

export default NoVault;
