import React from 'react'
import { Link,Route, Switch } from 'react-router-dom';
import {  BtnDiv} from './style';
import Deposit from './Components/Deposit';
import Assets from './Components/Assets';
import CustomButton from '../../components/Button';


function Wallet() {


    return (
        <>
           <BtnDiv>
               <Link to = '/dashboard/wallet/deposit'>
                   <CustomButton text = 'Deposit' />
               </Link>
               <CustomButton text = 'Withdraw' outline />
           </BtnDiv>

<Switch>
<Route  path="/dashboard/wallet/assets" component={Assets} />
<Route  path="/dashboard/wallet/deposit" component={Deposit} />
</Switch>
        </>
    )
}

export default Wallet
