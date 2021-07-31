import React, {useState, useEffect} from 'react';
import moment from 'moment';
import './styles/vaultDetails.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar, Container, Col, Row, Card, Button,  Modal,Form  } from 'react-bootstrap';
toast.configure();


const VaultDetails =(props)=> {
    const [inheritorsAllocation, setInheritorsAllocation] = useState([]);
    const [backupAddress, setBackUp] = useState('');
    const [lastPing, setPing]= useState();
    const [ethBal, setEthBal] = useState();
    const [allocateModalShow, setAllocateModalShow] = useState(false);
    const [inheritorsArray, setInheritorsArray] = useState([]);
    const [inheritorEtherAllocation, setInheritorEtherAllocation]= useState([]);
   

        let web3 = props.web3Info.web3;
        let vaultId = props.web3Info.vaultId;
        let safeKeepInstance = props.web3Info.safeKeepInstance;
        let owner = props.web3Info.account;
        let inheritorsArrayOnly = [];
      
      

        const allInheritors=async()=> {
            
            const inheritorsAlloc = await safeKeepInstance.methods.checkAllEtherAllocations(vaultId).call();
            setInheritorsAllocation(inheritorsAlloc);
           // console.log(inheritorsAllocation, 'yeap');
       }

      const inheritorAlloc  = inheritorsAllocation.map(inheritor => {
          const inheritors = String(inheritor[0]);
         inheritorsArrayOnly.push(inheritors);
         const alloc_eth = web3.utils.fromWei(inheritor[1], 'ether');
            return(
            <div className="inheritor-detail">
                <p> {inheritor[0].slice(0,6).concat('...').concat(inheritor[0].slice(12,18)) }</p>
                <p> {alloc_eth}</p>

            </div>
            )
            
        });
     //   console.log(inheritorsArrayOnly, 'new inheritor addresses array');
        


        const ping=async ()=> {
           const newPing = await safeKeepInstance.methods.ping(vaultId).send({from: owner})
           
           toast.info('ping updated successfully', {
            autoClose: true,
            position: "top-center"
        });

           const time = moment.unix(newPing);
           const convertedPing = time.toString();
           setPing(convertedPing);
        }

        const etherBal=async ()=> {
          const ethBal = await safeKeepInstance.methods.checkVaultEtherBalance(vaultId).call();
          const bal = web3.utils.fromWei(ethBal, 'ether');
          setEthBal(bal);
          
        }

        const pingAndBackup=async()=> {
            const res = await safeKeepInstance.methods.checkBackupAddressAndPing(vaultId).call();
            setBackUp(res._backup);
            const time = moment.unix(res._p);
            const convertedPing = time.toString()
          
            setPing(convertedPing)
        }

        useEffect(() => {
            etherBal();
            pingAndBackup();
            allInheritors();

          },[pingAndBackup, allInheritors]);

         
            
        const showAllocateModal=()=> {
            setAllocateModalShow(true);
        }

      const handleClose =()=> {
          setAllocateModalShow(false)
      }

      const handleAllocationInput=(e)=> {
         // console.log(e.target.value)
         
          const allocation = String(e.target.value);
          const a_array = allocation.split(' ');
          let allocationArray = [];
          a_array.map((alloc)=> {
           const wei_amount = web3.utils.toWei(alloc);
            allocationArray.push(wei_amount);
          })
          setInheritorEtherAllocation(allocationArray);
          console.log(allocationArray, 'alooc')
      }

      const allocateEtherToInheritors=async(e)=> {
          e.preventDefault();
          toast.info('sending request for ether allocation,please wait for confirmation', {
            autoClose: true,
            position: "top-center"
        });
        setAllocateModalShow(false);
          try{ 
            
            await safeKeepInstance.methods.allocateEther(vaultId, inheritorsArrayOnly, inheritorEtherAllocation).send({
            from: owner
        });
        //update on page
        const inheritorsAlloc = await safeKeepInstance.methods.checkAllEtherAllocations(vaultId).call();
        setInheritorsAllocation(inheritorsAlloc);
        //update ping
        const res = await safeKeepInstance.methods.checkBackupAddressAndPing(vaultId).call();
        const time = moment.unix(res._p);
        const convertedPing = time.toString();
      
        setPing(convertedPing)
        


          }
          catch{
              console.error(e)
          }
         
      }
  
       

    return(
        <div className="vaultDetails">

        <Modal show={allocateModalShow} onHide={handleClose}>
                       <Modal.Body>
                           <form onSubmit={allocateEtherToInheritors} >
                               <h3> Allocate Ether</h3>
                               <p> ether amount will be deposited respectively</p>
                               <div className="input-field">
                                   <input 
                                   type="text" 
                                   name="ether_amount" 
                                   id="ether_amount"
                                   placeholder=" 0.1 2 1"
                                   onChange={handleAllocationInput}/>
   
                               </div>
   
                               <button 
                               className="create_vault_btn"
                               >
                                   Deposit
                               </button>
   
   
                           </form>
   
                       </Modal.Body>
                     </Modal>
            
            <div className=" card owner-card">
                <span>Owner</span>
                <p>{owner.slice(0,6).concat('...').concat(owner.slice(12,18)) }</p>

            </div>

            <div className=" card backup-card">
                <span>Back Up Addresses</span>
                <p>{backupAddress.slice(0,6).concat('...').concat(backupAddress.slice(12,18)) }</p>

                <div className="update-btn-div">
                    <button className="update-btn update-backup">Update</button>
                </div>
                

            </div>

            <div className=" card inheritors-card">
                <span>Inheritors Details</span>
            <div className="inheritor-detail heading">
                <p> inheritor</p>
                <p> allocated Eth</p>

            </div>
                

                {inheritorAlloc}

                <div className="update-btn-div">
                    <button className="update-btn update-inheritor"
                    onClick={showAllocateModal}>Allocate Eth</button>
                </div>
                

            </div>

            <div className="card ping-box">
                <span>Last Ping</span>
                <div>{lastPing}</div>
                <div className="update-btn-div">
                    <button 
                    className="update-btn update-ping"
                    onClick={ping}>Ping</button>
                </div>


            </div>

            <div className="card balance-box">
                <span>Eth Balance</span>
                <p>{ethBal} Eth</p>
                
            </div>


        </div>
    )



}


export default VaultDetails;
