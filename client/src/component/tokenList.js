import React,{Component} from 'react';
import './styles/tokenList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Col, Row, Card, Button,  Modal,Form  } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


class TokenList extends Component{

  constructor(props) {
    super(props);
    this.state={
       
        show: false,
        ethBal: '',
        withrdaw_amount: undefined,
        withdrawModal: false,
        web3: this.props.web3Info.web3,
        vaultId: props.web3Info.vaultId,
        safeKeepInstance: props.web3Info.safeKeepInstance,
        owner : props.web3Info.account,
        ether_amount: undefined,

       

    }
    
}
componentDidMount=async()=> {
  const ethBal = await this.state.safeKeepInstance.methods.checkVaultEtherBalance(this.state.vaultId).call();
    const bal = this.state.web3.utils.fromWei(ethBal, 'ether');
    console.log(bal, 'eth balance')
    this.setState({
      ethBal: bal
    })

}

etherInput=(e)=> {
 
  this.setState({ 
    [e.target.name]: e.target.value
      
  });
 
 
}

handleClose=()=> {
  this.setState({
      show: false,
      withdrawModal: false
  })
}


 

depositEther=async(e)=>{
  e.preventDefault();
  const amount = this.state.web3.utils.toWei(this.state.ether_amount);
  toast.info(`${this.state.ether_amount} ` +'eth deposit sent!, Please wait for confirmation', {
    autoClose: true,
    position: "top-center"
});
  
 const res = await this.state.safeKeepInstance.methods.depositEther(this.state.vaultId, amount ).send({
    from: this.state.owner,
    value: amount
  })
  console.log(res, 'deposit result')

  //update balance
  if(res.status = true){
    toast(`${this.state.ether_amount} ` +'eth deposit successful', {
      autoClose: true,
      position: "top-center"
  });

  }
  else{
    toast.error('something seems wrong', {
      autoClose: true,
      position: "top-center"
  });

  }
  
  const ethBal = await this.state.safeKeepInstance.methods.checkVaultEtherBalance(this.state.vaultId).call();
  const bal = this.state.web3.utils.fromWei(ethBal, 'ether');
  console.log(bal, 'eth balance')
  this.setState({
    ethBal: bal
  })

  this.setState({
    show: false
  })
 
 } 

 withdrawEther=async(e)=>{
  e.preventDefault();
  const amount = this.state.web3.utils.toWei(this.state.withdraw_amount);
  console.log(amount, 'withdrwal')

  toast.info(`${this.state.withdraw_amount} ` +'eth withrawal sent!, Please wait for confirmation', {
    autoClose: true,
    position: "top-center"
});
  
  const res = await this.state.safeKeepInstance.methods.withdrawEth(this.state.vaultId, amount ).send({
    from: this.state.owner,
    
  })

    //update balance
    if(res.status = true){
      toast(`${this.state.withdraw_amount} ` +'eth withdrawal successful', {
        autoClose: true,
        position: "top-center"
    });
  
    }
    else{
      toast.error('something seems wrong', {
        autoClose: true,
        position: "top-center"
    });
  
    }

  //update balance

  const ethBal = await this.state.safeKeepInstance.methods.checkVaultEtherBalance(this.state.vaultId).call();
  const bal = this.state.web3.utils.fromWei(ethBal, 'ether');
  console.log(bal, 'eth balance')
  this.setState({
    ethBal: bal
  })

  this.setState({
    withdrawModal: false
  })
 
 } 




  render(){
    return(
      <div className="token_list_page">
   
          
             <Modal show={this.state.show} onHide={this.handleClose}>
                       <Modal.Body>
                           <form onSubmit={this.depositEther}>
                               <h3> Deposit Ether</h3>
                               <div className="input-field">
                                   <input 
                                   type="text" 
                                   name="ether_amount" 
                                   value={this.state.ether_amount}
                                   id="ether_amount"
                                   placeholder="amount in ether"
                                   onChange={this.etherInput}/>
   
                               </div>
   
                               <button 
                               className="create_vault_btn"
                               >
                                   Deposit
                               </button>
   
   
                           </form>
   
                       </Modal.Body>
                     </Modal>

                     <Modal show={this.state.withdrawModal} onHide={this.handleClose}>
                       <Modal.Body>
                           <form onSubmit={this.withdrawEther}>
                               <h3> Withrdaw Ether</h3>
                               <div className="input-field">
                                   <input 
                                   type="text" 
                                   name="withdraw_amount" 
                                   value={this.state.withdraw_amount}
                                   id="withrdaw_amount"
                                   placeholder="amount in ether"
                                   onChange={this.etherInput}/>
   
                               </div>
   
                               <button 
                               className="create_vault_btn"
                               >
                                   withdraw
                               </button>
   
   
                           </form>
   
                       </Modal.Body>
                     </Modal>
   
   
   
   
   
   
   
   
   
   
    
   
         <div className="token_list">
             <h2>Token List</h2>
             <Card  style={{ width: '30rem', height: '13rem', } }>
             <Card.Body>
             <Row>
               <Col sm={7}>
                 <h4 className="pt-4 ">ETH Balance</h4>
                 <h4>{this.state.ethBal} ETH</h4>
               </Col>
               <Col sm={5}>
                   <h4 className="pt-4 "></h4>
                   <div border="dark"  className= "box" style={{ width: '6rem', height: '2.5rem'}} >4.5%</div>
               </Col>
             </Row>
             <div className="pt-3 mt-2">
           <Button variant="outline-dark" style={{ width: '8rem'} } className=" mx-4" 
            onClick={()=>{this.setState({
              show: true
          })}}>Deposit</Button>{' '}
          
               <Button variant="outline-dark" style={{ width: '8rem'}} 
               onClick={()=>{this.setState({
                withdrawModal: true
            })}}>Withdraw</Button>
             </div>  
             </Card.Body>
           </Card>
   
             </div>
             
           </div>
    )

  }

 
}

export default TokenList;

