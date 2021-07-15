
import Nav from './component/Nav';
import Index from './component/index';
import './App.css';
import FooterPagePro from './component/footer'
import {Component} from 'react';
import Dashboard from './component/Dashboard';
import { render } from '@testing-library/react';


// import ProtectedRoute from './components/ProtectedRoute';

class App extends Component{

state = {
  currentState:"landing page"
}

  changePage = (page) =>{
    this.setState({
      currentState: page
    })
     
  }
  

render(){

 let currentPage;
    if(this.state.currentState=="landing page"){
      currentPage = <Index />
    }

    if(this.state.currentState=="dashboard"){
      currentPage = <Dashboard
      web3Instance={this.state.web3} 
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
