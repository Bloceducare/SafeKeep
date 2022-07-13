import { FaArrowRight } from "react-icons/fa";
import SpaceBetween from "../Layout/SpaceBetween";
import { getDate, tokenValue } from "../../utils/formatter";
import { currentNetworkConfig } from "../../utils/networkConfig";

const TokenHistoryPanel = ({
  name = "Eth",
  amount = 0,
  id = 0,
  status = "pending",
  type = "",
  createdAt = "0",
  tokenAddress,
  showName = true,
  decimals = 18,
  ...others
}) => {
  //console.log(others, amount, name, id, status, type, createdAt);

  return (
    <>
      <SpaceBetween className="my-3" {...others}>
        <div
          className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
          style={{ padding: "0.8rem", marginRight: "0.5rem" }}
        >
          <FaArrowRight
            size={"1rem"}
            style={{
              transform: `${
                type === "in"
                  ? "rotate(140deg)"
                  : type === "out"
                  ? "rotate(-40deg)"
                  : ""
              }`,
            }}
          />
        </div>
        {showName && (
          <div>
            {tokenAddress === "0x00"
              ? currentNetworkConfig.currencySymbol.toLocaleLowerCase()
              : name}
          </div>
        )}
        <div>{tokenValue(amount)?.toFixed(2)}</div>

        <div>{getDate(createdAt)?.combined}</div>
        <div>+</div>
      </SpaceBetween>
    </>
  );
};

export default TokenHistoryPanel;
