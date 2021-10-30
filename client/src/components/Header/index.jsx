import { Link } from 'react-router-dom';
import { useMoralis } from "react-moralis";
import {Container,Navbar,Nav, Button} from "react-bootstrap"
import { AuthenticatedHead, HeadWrapper, Logo } from './style';
import ConnectModal from './Components/ConnectModal';
import IsAuthenticating from './Components/ConnectModal/isAuthenticating';
import { maskAddress } from '../../utils/maskAddress';
import Logoimg from "../../assets/logo.png"


function Header() {
    const { isAuthenticated} = useMoralis();  
  const _header = !isAuthenticated ?   <UnAuthenticatedHeader  />: <AuthenticatedHeader />
    return (
      <>
      <IsAuthenticating text={null} />
      {_header}
      </>   
    )
}

export default Header


function AuthenticatedHeader(){
  const { user, logout} = useMoralis();
  return (
    
    <HeadWrapper >
   <AuthenticatedHead>

     <div>
     <Logo src={Logoimg} fluid/>{` `}
     </div>
     <div className ='d-flex align-items-center'>
     {maskAddress(user.get('ethAddress'))}
     <Button variant="dark" onClick ={logout} className ='mx-2'>Logout</Button>

       
  </div>
   </AuthenticatedHead>
   </HeadWrapper>
  
  )
}

function UnAuthenticatedHeader(){
  return (
    <>
       <Navbar bg="dark" variant="dark" expand="md">
          <Container>
            <Navbar.Brand href="/">
              <Logo src={Logoimg} fluid/>{` `}
              SafeKeep
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-end">
              <Nav.Item>
              <Link to='/' className ='nav-link'>Home</Link> 
              </Nav.Item>
              <Nav.Item>
              <Link to='/about' className ='nav-link'>About us</Link> 
              </Nav.Item>
              <Nav.Item>
              <Link to='/road-map' className ='nav-link'>Roadmap</Link> 
              </Nav.Item>
              <Nav.Item>
              <Link to='/dashboard/wallet' className ='nav-link'>Dashboard</Link> 
              </Nav.Item>
            <ConnectModal />
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </>
  )
}