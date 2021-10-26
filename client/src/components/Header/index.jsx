import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMoralis } from "react-moralis";
import {Container,Navbar,Nav, Image} from "react-bootstrap"
import { Logo } from './header.style';

//https://github.com/abdulmalik97/moralis-react-authentication
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
    //   mobileLinks: [
    //     "metamask",
    //     "trust",
    //     "rainbow",
    //     "argent",
    //     "imtoken",
    //     "pillar",
    //   ],
      signingMessage: "Welcome!",
    });
    console.log(user);
  }

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3({ provider: "walletconnect", chainId: 56 });
      console.log("web3 activated");
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
        type="button" class="btn btn-outline-dark">Connect</button>
      <button  onClick={() => authWalletConnect()} >Wallet</button> 
    </>
    )
     :
    'logout'
  )

    return (
      <>
        <Navbar bg="dark" variant="dark" expand="md">
          <Container>
            <Navbar.Brand href="#home">
              <Logo src={`images/logo.png`} fluid/>{` `}
              SafeKeep         
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-center">
              <Nav.Item>
                <Nav.Link href="#home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#home">About us</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#home">Roadmap</Nav.Link>
              </Nav.Item>
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>

// {_authBtn}   
    )
}

export default Header
