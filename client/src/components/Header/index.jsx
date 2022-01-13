import { Link, withRouter } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { AuthenticatedHead, HeadWrapper, Logo } from "./style";
import ConnectModal from "./Components/ConnectModal";
// import IsAuthenticating from "./Components/ConnectModal/isAuthenticating";
import { maskAddress } from "../../utils/maskAddress";
import Logoimg from "../../assets/logo.png";
import isWebe3Enabled from "../../hooks/useWeb3Enabled";

function AuthenticatedHeade(props) {
  const { user, logout } = useMoralis();

  const handleLogout = async () => {
    await logout();
    window.localStorage.removeItem("safekeepAddress");
    return window.location.assign("/");
    //return props.history.push("/");
  };
  return (
    <HeadWrapper>
      <AuthenticatedHead>
        <div>
          <Logo src={Logoimg} fluid />
          {` `}
        </div>
        <div className="d-flex align-items-center">
          {maskAddress(user?.get("ethAddress"))}
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
  const isWalletAvailable = isWebe3Enabled();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="/">
            <Logo src={Logoimg} fluid />
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

              {isWalletAvailable === false && (
                <Nav.Item className="text-danger">
                  Install a wallet to use SafeKeep
                </Nav.Item>
              )}

              {isWalletAvailable && <ConnectModal />}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
