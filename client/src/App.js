import {Component} from 'react';
import Nav from './component/Nav';
import Index from './component/index';
import './App.css';
import FooterPagePro from './component/footer'
import TokenList from './component/tokenList';
import Options from './component/options';
import Modal from 'react-bootstrap/Modal';
import DashBoard from './component/dashboard';
import ABI from './component/context/safeKeepAbi.json';



// import ProtectedRoute from './components/ProtectedRoute';

class App extends Component{

state = {
  currentState:"landing page",
  
  web3Info:{
    vaultId: null,
    web3: null,
    safekeepAddress: "0x6Cb9841F59045105B4f01960e0341308C957532c",
    safeKeepInstance: null,
    account: null
  }
}

  changePage = (page) =>{
    this.setState({
      currentState: page
    })
     
  }

  setVaultId=(id)=> {
    this.setState({
      web3Info:{
        ...this.state.web3Info,
        vaultId: id
      }
    })
  }

  SetWeb3 = async (web3)=> {
    this.setState({
      web3Info:{
          ...this.state.web3Info,
          web3
      }
      
    })
//check network id


   
    //instantiate contract
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const safeKeepInstance = new web3.eth.Contract(ABI, this.state.web3Info.safekeepAddress);
    this.setState({
      web3Info:{
          ...this.state.web3Info,
          safeKeepInstance,
          account
      }
      
    })

    


  }
  

render(){

 let currentPage;
    if(this.state.currentState=="landing page"){
      currentPage = <Index />
    }

    if(this.state.currentState=="token list"){
      currentPage = <TokenList
      web3Info={this.state.web3Info} 
      />
    }

    if(this.state.currentState=="options"){
      currentPage = <Options
      web3Info={this.state.web3Info}
      setPage={this.changePage}
      setVaultId={this.setVaultId}/>
    }

    if(this.state.currentState=="dashboard"){
      currentPage = <DashBoard
      web3Info={this.state.web3Info} 
      />
    }

  return (
    <>
     
     <Nav changePage={this.changePage}
       setWeb3={this.SetWeb3}/>
    {currentPage}
    <FooterPagePro/>
    </>
  );
}

}
export default App;
