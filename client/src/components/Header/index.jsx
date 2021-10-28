import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMoralis } from "react-moralis";
import {Container,Navbar,Nav, Button, Image} from "react-bootstrap"
import { AuthenticatedHead, Logo } from './style';
import AuthBtn, { LogoutButton } from './Components/AuthBtn';
import ConnectModal from './Components/ConnectModal';

import IsAuthenticating from './Components/ConnectModal/isAuthenticating';
import { maskAddress } from '../../utils/maskAddress';

function AuthenticatedHeader(){
  const { user, logout} = useMoralis();

  return (
    <Container className ='p-3'>

   <AuthenticatedHead>
     <div>
     <Logo src={`images/logo.png`} fluid/>{` `}
     </div>
     <div className ='d-flex align-items-center'>
     {maskAddress(user.get('ethAddress'))}
     <Button variant="dark" onClick ={logout} className ='mx-2'>Logout</Button>

       
  </div>
   </AuthenticatedHead>
    </Container>
  )
}

function UnAuthenticatedHeader(){
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
              <Link to='/' className ='nav-link'>Home</Link> 
              </Nav.Item>
              <Nav.Item>
              <Link to='/about' className ='nav-link'>About us</Link> 
              </Nav.Item>
              <Nav.Item>
              <Link to='/road-map' className ='nav-link'>Roadmap</Link> 
              </Nav.Item>
              <Nav.Item>
              <Link to='/dashboard' className ='nav-link'>Dashboard</Link> 
              </Nav.Item>
            <ConnectModal />
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </>
  )
}


function Header() {
    const { isAuthenticated} = useMoralis();
    
  const _header = !isAuthenticated ?   <UnAuthenticatedHeader  />: <AuthenticatedHeader />

    return (
      <>
      <IsAuthenticating />
      {_header}
      </>   
    )
}

export default Header
