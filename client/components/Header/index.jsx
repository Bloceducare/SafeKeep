import { Link, withRouter } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { AuthenticatedHead, HeadWrapper, Logo } from "./style";
import ConnectModal from "./Components/ConnectModal";
import { maskAddress } from "../../utils/maskAddress";
// import Logoimg from "../../assets/logo.png";
import isWebe3Enabled from "../../hooks/useWeb3Enabled";
import { useAccount, useDisconnect } from 'wagmi'


function AuthenticatedHeade() {
  const { address} = useAccount()
  const {disconnect} = useDisconnect()

  const handleLogout = async () => {
    disconnect()
   // window.localStorage.removeItem("safekeepAddress");
    // return window.location.assign("/");
  };
  return (
    <HeadWrapper>
      <AuthenticatedHead>
      
        <div>
          <Logo src='/assets/logo.png' fluid />
          {` `}
        </div>
        <div className="d-flex align-items-center">
          {maskAddress(address)}
          <Button variant="dark" onClick={handleLogout} className="mx-2">
            Logout
          </Button>
        </div>
      </AuthenticatedHead>
    </HeadWrapper>
  );
}

export const AuthenticatedHea = withRouter(AuthenticatedHeade);

export function UnAuthenticatedHeader() {
  // const connector = useAccount()

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="/">
            <Logo src='/assets/logo.png' fluid />
            {` `}
            SafeKeep
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-end">
              <Nav.Item>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/about" className="nav-link">
                  About us
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/road-map" className="nav-link">
                  Roadmap
                </Link>
              </Nav.Item>

              <ConnectModal />

            {/* <Nav.Item className="text-danger">
                Install a wallet to use SafeKeep
              </Nav.Item> */}
              {/* {
                !!connector ?  <ConnectModal /> :  <Nav.Item className="text-danger">
                Install a wallet to use SafeKeep
              </Nav.Item>
              } */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
