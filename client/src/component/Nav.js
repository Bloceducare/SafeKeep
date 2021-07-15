import { NavLink, useHistory } from 'react-router-dom';
import { Navbar, Container, Col, Row, Card, Button  } from 'react-bootstrap';
import Web3 from "web3";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Authereum from "authereum";
import React, { useState } from 'react';


const providerOptions = {
  portis: {
    package: Portis, // required
    options: {
      id: "fe80483c-8da3-46f6-b5a2-92be1bc0fcb9",
      network: "mainnet"
    }
  },
  
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "8c7e5f2b4151492cb90848faa879264d" // required
    }
  },
  authereum: {
    package: Authereum // required
  }
  
};

let provider = null;
let web3 = null;
let accounts = null;

const Nav = (props) => {


  
  const [isToggleOn, handleToggle ] = useState(false);
  
  const handleClick=() => {
    handleToggle (true)
  }

  async function showWeb3Modal() {
    if (!provider) {
      const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions // required
      });
      web3 = await connect(web3Modal);
      props.setWeb3(web3);
    }

   // providerOPtions.portis.showWeb3Modal();

    if (!accounts) {
      accounts = await web3.eth.getAccounts();
   //   print(`Wallet address: ${accounts[0].toLowerCase()}`);
    }
  }

  async function connect(web3Modal) {
    provider = await web3Modal.connect();
    return new Web3(provider);
  }

/*  function print(str) {
    const p = document.createElement("p");
    p.innerText = str;
    document.getElementById("userWalletAddress").appendChild(p);
  } */
 // const [page, setPage]= React.useState("dashboard");

  let page = "dashboard";

  const makePage = (displayPage)=> {
    displayPage = page;
    props.changePage(displayPage);
  }

  async function bindClick (){
    await showWeb3Modal()
    await handleClick()
    makePage ()
  }


 
return (
<>
<Navbar bg="" variant="light" expand="lg" className='w-100 '>
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
  <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto"/>
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
    <Button variant="outline-dark  animate__animated animate__pulse pulse" onClick={bindClick} > {isToggleOn ? 'Connected' : 'Connect'}</Button>
  </li>
  <pre id="userWalletAddress"></pre>
</ul>
    </Container>
</Navbar>

</>

)

}

export default Nav;