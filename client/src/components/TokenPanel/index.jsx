import { NoTokenImage } from "../../pages/Wallet/Components/DepositWithdrawal/NotokenImage";
import { tokenValue } from "../../utils/formatter";
import SpaceBetween from "../Layout/SpaceBetween";

const TokenPanel = ({ token, ...others }) => {
  return (
    <SpaceBetween className="mb-2" {...others}>
      <div className="d-flex align-items-center">
        <div className="">
          <NoTokenImage />
        </div>
        <div>
          <div>
            <span>{token?.name}</span>
          </div>
          <div>
            <span>$0.00</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div>
          {tokenValue(token?.amount ?? token?.amountAllocated)} {token?.symbol}
        </div>
        <div>Value</div>
      </div>
    </SpaceBetween>
  );
};

export default TokenPanel;
