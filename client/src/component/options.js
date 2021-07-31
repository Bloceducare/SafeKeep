import React,{Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import '../component/styles/options.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


class Options extends Component{

    constructor(props) {
        super(props);
        this.state={
            tx: null,
            show: false,
            page: 'options',
            
            vaultDetails: {
                vaultId: null,
                inheritors: null,
                starting_bal: null,
                backup_address: null

            }
    
        }
        this.handleInput = this.handleInput.bind(this);
        this.changePage = this.changePage.bind(this);
        this.createVault = this.createVault.bind(this);
        this.setVaultId = this.setVaultId.bind(this);
    }

     
    handleInheritorsAddresses=(e)=> {
        //convert address list to String
        const inheritors = String(e.target.value);
        //split init individual element in an array
        const inheritorsArray = inheritors.split(' ');
        console.log(inheritorsArray, 'input')
        //set state
        this.setState({
            vaultDetails:{
            ...this.state.vaultDetails,
            [e.target.name]: inheritorsArray
            }
        })
        
        
    }

    handleInput=(e)=> {
        this.setState({
            vaultDetails:{
            ...this.state.vaultDetails,
          [e.target.name]: e.target.value
            }
        });
      }

    handleClose=()=> {
        this.setState({
            show: false
        })
    }

    changePage=(page)=> {
        
        this.props.setPage(page)
    }

    setVaultId=async()=> {
        const safeKeepInstance = this.props.web3Info.safeKeepInstance;
        const user = this.props.web3Info.account;
        const vaultId = await safeKeepInstance.methods.checkOwnerVault(user).call();
        
        this.props.setVaultId(vaultId);
    }

    goToDashBoard=async()=> {
        const safeKeepInstance = this.props.web3Info.safeKeepInstance;
        const user = this.props.web3Info.account;
        const vaultId = await safeKeepInstance.methods.checkOwnerVault(user).call();
        console.log(vaultId, 'id vault')
        if(vaultId !== null || vaultId !== undefined){
            this.props.setPage('dashboard')
        }
        else{
            toast.error('You dont have a vault yet', {
                autoClose: true,
                position: "top-center"
            });
            
        }
        

    }

    createVault =async (e)=> {
        e.preventDefault();
        const safeKeepInstance = this.props.web3Info.safeKeepInstance;
        const user = this.props.web3Info.account;
        const web3 = this.props.web3Info.web3;
        const inheritors = this.state.vaultDetails.inheritors;
        const amount = this.state.vaultDetails.starting_bal;
        const starting_bal = web3.utils.toWei(amount)
        const backup_address = this.state.vaultDetails.backup_address;
       

        const vaultId_check = await safeKeepInstance.methods.checkOwnerVault(user).call();
        if(vaultId_check !== undefined || vaultId_check !== null){
            alert('You already have a vault, we can help you see it');
            this.setState({
                show: false
            })
            const vaultId = await safeKeepInstance.methods.checkOwnerVault(user).call();
        
            this.props.setVaultId(vaultId);
            this.changePage('dashboard');
            toast('Here is your exisiting vault', {
                autoClose: true,
                position: "top-center"
            });
        }

        
        else{
            try{
                this.setState({
                    show: false
                })
        toast.info(' We are creating your vault, kindly await confirmation before clicking to see your vault', {
            autoClose: true,
            position: "top-center"
        });

        await safeKeepInstance.methods.createVault(
            inheritors,
            starting_bal,
            backup_address
        ).send({
            from: user,
            value:starting_bal
        })

        const vaultId = await safeKeepInstance.methods.checkOwnerVault(user).call();
        
            this.props.setVaultId(vaultId);
            this.changePage('dashboard');
       
            toast.info('Vault created', {
                autoClose: true,
                position: "top-center"
            });

    }
    catch{
        console.error(e)
    }
     /* finally{
        const vaultId = await safeKeepInstance.methods.checkOwnerVault(user).call();
        
        console.log(vaultId, 'id');
        this.setState({
           vaultDetails:{
                ...this.state.vaultDetails,
                vaultId
            }
        })
        this.setVaultId();

        console.log(this.state.vaultDetails, 'vault d')

        if(vaultId !== null){
            this.changePage('dashboard');
        }
        else{
            alert('something seems wrong');
        } 
        console.log('finally')
        

      } */




        }
       
        
        
    
               
    }

    

    

    render(){
        

        return(

            <div className="options">
               
                
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                        <form onSubmit={this.createVault}>
                            <h3> Create vault</h3>
                            <div className="input-field">
                                <label htmlFor="inheritors">Inheritors</label>
                                <input 
                                type="text" 
                                name="inheritors" 
                                id="inheritors"
                                placeholder="0x..000 0x..000 0x..000"
                                onChange={this.handleInheritorsAddresses}/>

                            </div>

                            <div className="input-field">
                                <label htmlFor="starting_bal">Starting Balance(ETH)</label>
                                <input type="text" 
                                placeholder="deposit eth" 
                                name="starting_bal"
                                id="starting_bal"
                                value={this.state.vaultDetails.starting_bal}
                                onChange={this.handleInput}/>

                            </div>

                            <div className="input-field">
                                <label htmlFor="backup_address">BackUp Address</label>
                                <input type="text" 
                                name="backup_address"
                                id="backup_address" 
                                placeholder="0x000..000"
                                value={this.state.vaultDetails.backup_address}
                                onChange={this.handleInput}/>

                            </div>

                            <button 
                            className="create_vault_btn"
                            >
                                Create Vault
                            </button>


                        </form>

                    </Modal.Body>
                </Modal>


                <div className="options-main">
                    <div className="row" >
                        <div className="option create-vault"
                        onClick={()=>{this.setState({
                            show: true
                        })}}>
                            <img src="https://cdn1.iconfinder.com/data/icons/google-products/512/31_Google_Vault_Google_Product_Logo_Brand-512.png"/>
                            <h3>Create Your Vault</h3>
                            <span>
                            Assign backup and inheritor addresses.
                            </span>
                        
    
                        </div>
    
                        <div className="option create-vault"
                        onClick={this.goToDashBoard}>
                            <img src="https://banzaicloud.com/img/product/bank-vaults.svg"/>
                            <h3>My Vault</h3>
                            <span>
                            See Your Vault, its details and other activities
                            </span>
                        
    
                        </div>
    
                    </div>
    
                    <div className="row row2">
                        <div className="option create-vault">
                            <img src="https://zohowebstatic.com/sites/default/files/ogimage/vault-logo.png"/>
                            <h3>Associated Vaults</h3>
                            <span>
                            Check if you were made an inheritor or a backup for any vault
                            </span>
                        
    
                        </div>
    
                        <div className="option create-vault">
                            <img src="/images/LogoWhite.png"/>
                            <h3>Other Features</h3>
                            <span>
                            Check to See other features
                            </span>
                        
    
                        </div>
    
                    </div>
                   
    
                    
    
                </div>
    
            </div>
    
        )

    }
    

}

export default Options;