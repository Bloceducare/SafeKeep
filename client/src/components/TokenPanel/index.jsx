import { NoTokenImage } from "../../pages/Wallet/Components/DepositWithdrawal/NotokenImage";
import { tokenValue } from "../../utils/formatter";
import SpaceBetween from "../Layout/SpaceBetween";

const TokenPanel = ({ token, ...others }) => {
  return (
    <SpaceBetween className="py-2" {...others}>
      <div className="d-flex align-items-center">
        <div className="">
          {
            token?.logo ? <img src={token.logo} alt={token.name} width='40rem' style={{
              width: "2.5rem",
              height: "2.5rem",
              marginRight: "0.5rem",
              borderRadius: "50%",
            }} /> : <NoTokenImage />
          }
        </div>
        <div>
          <div>
            <span className="fs-5 text-uppercase">{token?.name}</span>
          </div>
          <div>
            <span className="text-muted text-capitalize ">
              
            {(token?.price ?? 0).toFixed(2)}/
              {token?.symbol}
            </span>
          </div>
          {/* <div className="text-muted fs-6">Available : 0</div> */}
        </div>
      </div>
      <div className="text-center">
        <div className="fs-5">
          {tokenValue(token?.amount ?? token?.amountAllocated).toFixed(2)}
          <span className=" text-capitalize "> {token?.symbol}</span>
        </div>
        <div>$ {
         (( token?.price ?? 0)  * tokenValue(token?.amount)).toFixed(2)
          }</div>
        {/* <div>Available : 0</div> */}
      </div>
      
    </SpaceBetween>
  );
};

export default TokenPanel;
