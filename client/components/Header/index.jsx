import Link from "next/link";
import { Navbar, Nav, Button } from "react-bootstrap";
import { AuthenticatedHead, HeadWrapper, Logo } from "./style";
import { maskAddress } from "../../utils/maskAddress";
import { useAccount, useDisconnect } from "wagmi";
import useAuth from "@hooks/useAuth";
import { ConnectWalletModal } from "./Components/ConnectModal";
import styled from "styled-components";
import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerTrigger,
} from "../Drawer";

export function AuthenticatedHe({ children }) {
  const { address } = useAccount();
  const { logout } = useAuth();

  return (
    <>
      <HeadWrapper>
        <AuthenticatedHead>
          <div>
            <Logo src="/assets/logo.png" fluid />
            {` `}
          </div>
          <div className="d-flex align-items-center">
            {maskAddress(address)}
            <Button variant="dark" onClick={logout} className="mx-2">
              Logout
            </Button>
          </div>
        </AuthenticatedHead>
      </HeadWrapper>
      {children}
    </>
  );
}

export function UnAuthenticatedHeader({ children }) {
  // const connector = useAccount()

  return (
    <div style={{ position: "relative" }}>
      <Container>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Logo src="/assets/logo.png" fluid />
          {` `}
          <p style={{ margin: 0, marginLeft: "13px" }}>SafeKeep</p>
        </div>
        <NavContainer>
          <NavItem>
            <Link href="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link href="/about">About us</Link>
          </NavItem>
          <NavItem>
            <Link href="/road-map">Roadmap</Link>
          </NavItem>
          <ConnectWalletModal />
        </NavContainer>
        <DrawerContainer>
          <Drawer>
            <StyledDrawerTrigger>
              <img
                src="../assets/nav-button.svg"
                style={{ width: "29px", height: "19px" }}
              ></img>
            </StyledDrawerTrigger>
            <DrawerContent>
              <NavContainerSmall>
                <DrawerCloseButton
                  css={{
                    width: "42px",
                    height: "42px",
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                  }}
                >
                  {" "}
                </DrawerCloseButton>
                <NavItem>
                  <Link href="/">Home</Link>
                </NavItem>
                <NavItem>
                  <Link href="/about">About us</Link>
                </NavItem>
                <NavItem>
                  <Link href="/road-map">Roadmap</Link>
                </NavItem>
                <ConnectWalletModal />
              </NavContainerSmall>
            </DrawerContent>
          </Drawer>
        </DrawerContainer>
      </Container>
      {children}
    </div>
  );
}

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  padding: 28px 30px 20px;
  background-color: #000000;
  font-family: clash grotesk regular;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
`;

export const NavContainer = styled.div`
  max-width: 700px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 915px) {
    display: none;
  }
`;

export const NavContainerSmall = styled.div`
  width: 100%;
  position: relative;
  padding: 80px 30px 30px;
`;
export const DrawerContainer = styled.div`
  display: none;
  @media (max-width: 915px) {
    display: flex;
    align-items: center;
  }
`;
export const NavItem = styled.div`
  font-family: clash grotesk regular;
  padding-right: 20px;
  font-size: 30px;
  line-height: 34px;
  color: #ffffff;
  &:hover {
    color: #2b5ccf;
  }
  @media (max-width: 915px) {
    margin-bottom: 35px;
  }
`;

export const StyledDrawerTrigger = styled(DrawerTrigger)`
  border-width: 0;
  background-color: transparent;
  &:focus {
    border: none;
    border-width: 0;
    outline: none;
  }
  &[data-state="open"] {
    border: none;
    outline: none;
  }
  &[data-state="closed"] {
    border: none;
  }
`;
