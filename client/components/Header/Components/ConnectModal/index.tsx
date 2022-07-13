import { useSelector, useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { connectModalStatus } from "../../../../selectors";
import { showConnectModal, hideConnectModal } from "@state/ui";
import { useAccount, useConnect, } from 'wagmi'
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useRouter } from 'next/router'


interface IConnectWalletModal {
  showModal:boolean
  handleClose?:()=>void
  handleShow?:()=>void
}

export const ConnectWalletModal = ({showModal, handleClose, handleShow}:IConnectWalletModal)=>{
  const router = useRouter()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const {isConnected} = useAccount()
  return (<>
   <Modal show={showModal} onHide={handleClose} className="text-black ">
        <Modal.Header closeButton>
          <div className="d-flex ">
         <MdOutlineAccountBalanceWallet className='fs-3 mr-3' /> <h5> Choose to a wallet</h5>
          </div>
        </Modal.Header>
        <Modal.Body>
            
    <div className="">
    {connectors.map((connector) => (
     <button
      disabled={!connector.ready}
      key={connector.id}
      className='w-100 text-center d-block border my-2 p-1 btn'
      onClick={async() =>  {
      await connect({ connector })
      router.push('/dashboard') 
      handleClose()
       
      // isConnected
      } }
      >
        {connector.name}
        {!connector.ready && ' (unsupported)'}
        {isLoading &&
          connector.id === pendingConnector?.id &&
          '(connecting)'}
      </button>
    
    ))
    }
    {error && <div>{error.message}</div>}
  </div>

        </Modal.Body>
      </Modal>
  
  </>)
}


function ConnectMOdal() {
  const dispatch = useDispatch();
  const showModal = useSelector(connectModalStatus);
  const handleClose = () => {
    dispatch(hideConnectModal());
  };
  const handleShow = () => {
    dispatch(showConnectModal());
  };


  // const handleConnect = async (type) => {
  //   if (type === "metamask") {
  //     if (supportedChains.some((i) => i === chain?.chainId)) {
  //       // console.log("chainId", chain?.chainId, chain, chain?.networkId);
  //       localStorage.setItem("safeKeepCurrentChainId", chain?.networkId);
  //       //console.log(supportedChains.some((i) => i === chain?.chainId), 'chainId');
  //       // supportedChains.some((i) => i === chain?.chainId)
  //       await authenticate({ signingMessage: "Sign in to Safekeep" });
  //     } else {
  //       await enableWeb3();
  //       await switchNetwork(0x4);
  //       await authenticate({ signingMessage: "Sign in to Safekeep" });
  //     }
  //   }

  //   if (type === "walletconnect") {
  //     authWalletConnect();
  //   }
  //   handleClose();
  // };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Connect
      </Button>
      <ConnectWalletModal  showModal={showModal ?? false} handleClose={handleClose} handleShow={handleShow}/>
    </>
  );
}

export default ConnectMOdal;
