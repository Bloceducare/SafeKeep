import { createContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Container, Col, Row, Card, Button  } from 'react-bootstrap';
import fitext from 'fitext'
 
 




const Home= () => {
    fitext(true);


  return (
    <div>
        <div className="bodi">
<Container style={{ height: '100vh', }}>
  <Row  >
  
    <Col sm={8}>
    
            <div className="header pt-5">
              <p className="font display-1 animate__animated animate__slideInDown text-sm-left"  >SafeKeep</p>
              <span className="blockquote-footer font2 display-4 pb-3 animate__animated animate__slideInRight  section1" >Guaranteed storage and safety backup for your Ethereum &<br /> ERC-20 tokens</span>
              <p className="sponsored-by animate__animated animate__slideInLeft animate__swing section2 ">Built on  <img src="https://cryptologos.cc/logos/versions/ethereum-eth-logo-full-horizontal.svg?v=010" width="150px"  alt="Etherum log"/></p>
            </div>
        
    </Col>
    <Col sm={4}>
    <div className="">
            <div className="w-50">
              <img className="w-100 mh-100 animate__animated animate__bounce BgLogo pt-5 hidden-sm-down" src="/images/LogoBlack.png" alt="eth logo" />
            </div>
          </div>
    </Col>
  </Row>
  </Container>
  </div>
    </div>
 )

}


export default Home;
