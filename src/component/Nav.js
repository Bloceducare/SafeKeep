import { NavLink, useHistory } from 'react-router-dom';
import { Navbar, Container, Col, Row, Card, Button  } from 'react-bootstrap';



const Nav = () => {
 
return (
<>
<Navbar bg="light" variant="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home">
        <img
          alt="SafeKeep logo"
          src="/images/LogoWhite.png"
          width="40"
          height="40"
          className="d-inline-block align-top  animate__animated animate__swing logo"
        />{' '}
        <div className= "d-inline-block pt-2 text-muted" style={{ fontSize: '16px'}}>
      SafeKeep
      </div>
      </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto"   />
  <Navbar.Collapse id="basic-navbar-nav" className="nav justify-content-end" >
  <ul className="nav justify-content-end"  style={{ fontSize: '18px'}}>
  <li className="nav-item px-3 ">
    <a className="nav-link text-muted" href="#">HOME</a>
  </li>
  <li className="nav-item px-3">
    <a className="nav-link text-muted " href="#">ABOUT US</a>
  </li>
  <li className="nav-item px-3 text-muted">
    <a className="nav-link text-muted" href="#">ROAD MAP</a>
  </li>
 
</ul>
</Navbar.Collapse>
<ul className="nav justify-content-end">
<li className="nav-item">
    <Button variant="outline-dark  animate__animated animate__pulse pulse" >CONNECT</Button>
  </li>
</ul>
    </Container>
  </Navbar>
  <img  />
</>

)

}

export default Nav;