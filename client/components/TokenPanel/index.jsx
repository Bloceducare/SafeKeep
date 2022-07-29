import { NoTokenImage } from "../../views/Wallet/Components/DepositWithdrawal/NotokenImage";
import { tokenValue } from "../../utils/formatter";
import SpaceBetween from "../Layout/SpaceBetween";
import styled from "styled-components";

const TokenPanel = ({ token, ...others }) => {
  return (
    <SpaceBetween className="py-2" {...others}>
      <LogoContainer>
        <div className="">
          {token?.logo ? (
            <img
              src={token.logo}
              alt={token.name}
              width="40rem"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                marginRight: "0.5rem",
                borderRadius: "50%",
              }}
            />
          ) : (
            <NoTokenImage />
          )}
        </div>
        <TokenText>
          <div>
            <span style={{ textTransform: "uppercase", color: "#B6B6B6" }}>
              {token?.name}
            </span>
          </div>
          <div>
            <span style={{ textTransform: "capitalize", color: "#B6B6B6" }}>
              {(token?.price ?? 0).toFixed(2)}/{token?.symbol}
            </span>
          </div>
          <div style={{ color: "#B6B6B6" }}>Allocated</div>
        </TokenText>
      </LogoContainer>
      <div
        style={{
          display: "flex",
          alignContentItems: "center",
          maxWidth: "65%",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <TokenPrice>
          <div
            style={{ fontSize: "22px", lineHeight: "27px", color: "#FFFFFF" }}
          >
            {tokenValue(token?.amount ?? token?.amountAllocated).toFixed(2)}
            <span className=" text-capitalize "> {token?.symbol}</span>
          </div>
          <div>
            $ {((token?.price ?? 0) * tokenValue(token?.amount)).toFixed(2)}
            {/* <span className="badge badge-success">
            0.01
          </span> */}
          </div>
          <div>{tokenValue(token?.allocated).toFixed(2)}</div>
        </TokenPrice>
        <TokenRate>
          <p>7.65%</p>
        </TokenRate>
      </div>
    </SpaceBetween>
  );
};

export default TokenPanel;

export const LogoContainer = styled.div`
  display: flex;
  max-width: 30%;
  width: 100%;
  align-items: center;
`;

export const TokenText = styled.div`
  max-width: 30%;
  width: 100%;
  font-family: "clash grotesk regular";
  // font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

export const TokenPrice = styled.div`
  display: flex;
  max-width: 30%;
  width: 100%;
  align-items: center;
  flex-direction: column;
  color: #b6b6b6;
`;

export const TokenRate = styled.div`
  display: flex;
  max-width: 30%;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: rgba(5, 209, 26, 0.6);
  font-family: "clash grotesk regular";
  font-size: 14px;
  line-height: 17px;
  color: #b6b6b6;
`;
