import React,{useState, useEffect} from 'react';
import TokenList from './tokenList';
import VaultDetails from './vaultDetails';
import './styles/dashboard.css';

const DashBoard = (props)=> {
    const [page, setPage] = useState('vault details');
    console.log(props.web3Info, 'should include vaultId')
      
    
    let current_page;
    if(page == 'vault details'){
        current_page = <VaultDetails 
        web3Info={props.web3Info}/>

    }

    if(page == 'token list'){
        current_page = <TokenList 
        web3Info={props.web3Info}/>

    }

    const setToVaultPage=()=>{
        setPage('vault details');
    }

    const setToTokenPage=()=>{
        setPage('token list');
    }
    


    return(
        <div className="dashboard">
            <div className="switch-tabs">
                <div className="switch-btns">
                    <span className="tab-btn"
                    onClick={setToVaultPage}>Vault Details</span>
                    <span className="tab-btn"
                    onClick={setToTokenPage}>tokenList</span>
                </div>

            </div>
            {current_page}

        </div>
    )

}

export default DashBoard;