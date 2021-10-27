import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMoralis } from "react-moralis";
import {Container,Navbar,Nav, Image} from "react-bootstrap"
import { Logo } from './style';


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
      // mobileLinks: [
      //   "metamask",
      //   "trust",
      //   "rainbow",
      //   "argent",
      //   "imtoken",
      //   "pillar",
      // ],
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
    type="button" className="btn btn-connect text-white">Connect</button>
    <button 
    onClick={() => authWalletConnect()}
    type="button" className="btn btn-connect text-white mx-2" >Wallet Connect</button>

   
    </>
    )
     :
    <LogoutButton />
  )

    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <Logo src={`images/logo.png`} fluid/>{` `}
              SafeKeep
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-end">
              <Nav.Item>
              <Link to='/' className ='nav-link'>Home</Link> 
                {/* <Nav.Link href="/">Home</Nav.Link> */}
              </Nav.Item>
              <Nav.Item>
              <Link to='/about' className ='nav-link'>About us</Link> 
                {/* <Nav.Link href="/About">About us</Nav.Link> */}
              </Nav.Item>
              <Nav.Item>
              <Link to='/road-map' className ='nav-link'>Roadmap</Link> 
                {/* <Nav.Link href="/Roadmap">Roadmap</Nav.Link> */}
              </Nav.Item>
              <Nav.Item>
              <Link to='/dashboard' className ='nav-link'>Dashboard</Link> 
                {/* <Nav.Link href="/Dashboard">Dashboard</Nav.Link> */}
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
