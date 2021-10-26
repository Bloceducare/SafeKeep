import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMoralis } from "react-moralis";
import {Container,Navbar,Nav, Image} from "react-bootstrap"
import { Logo } from './header.style';


const LogoutButton = () => {
  const { logout, isAuthenticating } = useMoralis();
  return (
    <button
      onClick={() => logout()}
      disabled={isAuthenticating}>
      Logout
    </button>
  );
};
function Header() {
    const {   authenticate,
        isWeb3Enabled,
        isAuthenticated,
        user,
        enableWeb3,
        Moralis,
     } = useMoralis();
console.log(user, isAuthenticated)

async function authWalletConnect() {
    const user = authenticate({
      provider: "walletconnect",
      chainId: 56,
      mobileLinks: [
        "metamask",
        "trust",
        "rainbow",
        "argent",
        "imtoken",
        "pillar",
      ],
      signingMessage: "Welcome!",
    });
    console.log(user);
  }

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3({ provider: "walletconnect", chainId: 56 });
    }
  }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    }
  });

  const _authBtn = (
    (!isAuthenticated && !user) ? (
        <>
    <button 
    onClick={() => authenticate({ signingMessage: "Sign in to Safekeep" })}
    type="button" class="btn btn-outline-secondary text-white">Connect</button>
    <button 
    onClick={() => authWalletConnect()}
    type="button" class="btn btn-outline-secondary text-white mx-2" >Wallet Connect</button>

   
    </>
    )
     :
    <LogoutButton />
  )

    return (
      <>
        <Navbar bg="dark" variant="dark" expand="md">
          <Container>
            <Navbar.Brand href="/">
              <Logo src={`images/logo.png`} fluid/>{` `}
              SafeKeep         
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-end">
              <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/About">About us</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/Roadmap">Roadmap</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              {_authBtn}
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>   
    )
}

export default Header
