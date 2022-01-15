import { FaArrowRight } from "react-icons/fa";
import SpaceBetween from "../Layout/SpaceBetween";
import { getDate, tokenValue } from "../../utils/formatter";
import { currentNetworkConfig } from "../../utils/networkConfig";

const TokenHistoryPanel = ({
  name = "Eth",
  amount = 0,
  id = 0,
  status = "pending",
  type = "plus",
  createdAt = "0",
  tokenAddress,
}) => {
  return (
    <>
      <SpaceBetween className="my-3">
        <div
          className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
          style={{ padding: "0.8rem", marginRight: "0.5rem" }}
        >
          <FaArrowRight
            size={"1rem"}
            transform="rotate(20deg)"
            style={{
              transform: `${
                type === "plus"
                  ? "rotate(140deg)"
                  : type === "minus"
                  ? "rotate(-40deg)"
                  : ""
              }`,
            }}
          />
        </div>
        <div>
          {tokenAddress === "0x00"
            ? currentNetworkConfig.currencySymbol.toLocaleLowerCase()
            : name}
        </div>
        <div>{tokenValue(amount)?.toFixed(2)}</div>

        <div>{getDate(createdAt)?.combined}</div>
        <div>+</div>
      </SpaceBetween>
    </>
  );
};

export default TokenHistoryPanel;
