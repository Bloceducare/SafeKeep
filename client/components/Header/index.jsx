import Link from "next/link";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { AuthenticatedHead, HeadWrapper, Logo } from "./style";
import ConnectModal from "./Components/ConnectModal";
import { maskAddress } from "../../utils/maskAddress";
import { useAccount } from "wagmi";
import useAuth from "@hooks/useAuth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export function AuthenticatedHe({ children }) {
  const { address } = useAccount();
  const { logout} = useAuth();


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
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="/">
            <Logo src="/assets/logo.png" fluid />
            {` `}
            SafeKeep
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-end">
              <Nav.Item>
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/about" className="nav-link">
                  About us
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/road-map" className="nav-link">
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
      {children}
    </>
  );
}



