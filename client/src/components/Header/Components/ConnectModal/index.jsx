import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import {Button, Modal, Container, Row, Col} from "react-bootstrap"
import Metamask from '../../../../assets/metamaskIcon.svg'
import WalletConnect from '../../../../assets/walletConnectIcon.svg'
import { Wallet } from "./style";


function ConnectMOdal() {
    const {   authenticate,
        isWeb3Enabled,
        isAuthenticated,
        user,
        enableWeb3,
        Moralis,
        isAuthenticating
     } = useMoralis();

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
       
      }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
  
      const handleConnect = (type)=>{
          if(type ==='metamask') {
              authenticate({ signingMessage: "Sign in to Safekeep" })
          }

          if (type ==='walletconnect'){
              authWalletConnect()
          }
          handleClose()
      }

  
     
    return (
      <>
        <Button variant="secondary" onClick={handleShow}>
          Connect
        </Button>
        <Modal show={show} onHide={handleClose}className='text-black' >
          <Modal.Header closeButton>
           <h5>   Connect to a wallet
               </h5>
          </Modal.Header>
          <Modal.Body>
        <div  onClick = {()=> handleConnect('metamask')}>
    <Wallet>
          <div className ='p-0'>
        <h5>Metamask</h5>
          </div>
          <div>
        <img src ={Metamask} alt ='metamask' width ='30' />
          </div>
    </Wallet>
        </div>
        <div  onClick = {()=> handleConnect('walletconnect')}>
    <Wallet>
          <div >
        <h5>Wallet connect</h5>
          </div>
          <div>
        <img src ={WalletConnect} alt ='walletconnect' width ='30' />
          </div>
    </Wallet>
        </div>

  </Modal.Body>
        </Modal>
      </>
    );
  }
  

  export default ConnectMOdal


  